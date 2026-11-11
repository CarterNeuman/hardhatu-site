"use client";

// Shared "is this lesson done" state for the Lesson page (2026-11-10,
// added because the standalone MarkCompleteButton only showed its own
// completed state at the very bottom of a lesson, after everything
// else -- nothing near the title told a returning reader they'd
// already finished it. One provider now fetches /api/progress once
// and both LessonCompletionBadge (shown right next to the title) and
// MarkCompleteButton (the actual toggle, still at the bottom) read
// from it, so checking the box instantly flips the badge up top too,
// no reload needed.
//
// Signed-out visitors never see either piece: both call sites sit
// behind EmailGate's "immediate" variant, and this provider itself
// guards on isSignedIn, so it fails closed rather than firing an
// unauthenticated fetch that would just 401.
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useUser } from "@clerk/nextjs";

type ProgressRow = { contentType: string; contentId: string };

type LessonCompletionValue = {
  completed: boolean;
  ready: boolean;
  pending: boolean;
  isSignedIn: boolean;
  toggle: () => void;
};

const LessonCompletionCtx = createContext<LessonCompletionValue | null>(null);

export function LessonCompletionProvider({
  contentType,
  contentId,
  children,
}: {
  contentType: string;
  contentId: string;
  children: ReactNode;
}) {
  const { isLoaded, isSignedIn } = useUser();
  const [completed, setCompleted] = useState(false);
  const [ready, setReady] = useState(false);
  const [pending, setPending] = useState(false);
  // Guards against a slow GET resolving after the user has already
  // toggled the button by hand -- without this, the fetch's .then()
  // could stomp an optimistic update that landed first.
  const loadedOnce = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    let cancelled = false;
    fetch("/api/progress")
      .then((res) => res.json())
      .then((data: { ok?: boolean; progress?: ProgressRow[] }) => {
        if (cancelled || loadedOnce.current || !data?.ok) return;
        const match = (data.progress ?? []).some(
          (row) => row.contentType === contentType && row.contentId === contentId
        );
        setCompleted(match);
      })
      .catch(() => {
        // Network hiccup: leave it showing "not complete" rather than
        // blocking the page on a retry loop. The user can still toggle
        // it by hand, which re-asserts the real state server-side.
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, contentType, contentId]);

  async function toggle() {
    if (!isSignedIn || pending) return;
    loadedOnce.current = true;
    const next = !completed;
    setCompleted(next);
    setPending(true);
    try {
      const res = await fetch("/api/progress", {
        method: next ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType, contentId }),
      });
      if (!res.ok) throw new Error("request failed");
    } catch {
      // Revert the optimistic flip so neither the badge nor the button
      // ever lies about what's actually saved.
      setCompleted(!next);
    } finally {
      setPending(false);
    }
  }

  return (
    <LessonCompletionCtx.Provider
      value={{ completed, ready, pending, isSignedIn: Boolean(isLoaded && isSignedIn), toggle }}
    >
      {children}
    </LessonCompletionCtx.Provider>
  );
}

function useLessonCompletion() {
  const ctx = useContext(LessonCompletionCtx);
  if (!ctx) {
    throw new Error("useLessonCompletion must be used inside a LessonCompletionProvider");
  }
  return ctx;
}

// Small pill shown right next to the Lesson type badge at the top of
// the page -- the first thing a returning reader sees, so they don't
// have to scroll down to the button to know they already finished
// this one. Same small-pill language the "Premium" tag already uses
// next to TypeBadge, just in the navy "done" color instead of amber.
export function LessonCompletionBadge() {
  const { completed, ready, isSignedIn } = useLessonCompletion();
  if (!isSignedIn || !ready || !completed) return null;
  return (
    <span className="inline-flex items-center gap-1 border border-navy bg-navy px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-paper">
      <span className="inline-block h-1.5 w-1.5 shrink-0 bg-paper" aria-hidden="true" />
      Completed
    </span>
  );
}

export function useLessonCompletionButton() {
  return useLessonCompletion();
}
