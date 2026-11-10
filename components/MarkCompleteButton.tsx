"use client";

// A small, reusable "mark complete" control backed by /api/progress
// (GET to load initial state, POST to mark done, DELETE to un-mark).
// Used on Lesson pages today; the Action Plan builder's day-by-day
// checkboxes talk to the same endpoint directly (see ActionPlanBuilder)
// since they need a list of independent toggles, not one button.
//
// Signed-out visitors never see this: both call sites (Lessons, Action
// Plan) sit behind EmailGate's "immediate" variant, which blocks
// interaction with the content until sign-in. This component still
// guards on isSignedIn itself and renders nothing until Clerk confirms
// a session, so it fails closed rather than flashing an unusable button
// or firing an unauthenticated fetch that would just 401.
import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";

type ProgressRow = { contentType: string; contentId: string };

export function MarkCompleteButton({
  contentType,
  contentId,
}: {
  contentType: string;
  contentId: string;
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
      // Revert the optimistic flip so the button never lies about
      // what's actually saved.
      setCompleted(!next);
    } finally {
      setPending(false);
    }
  }

  if (!isLoaded || !isSignedIn || !ready) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      aria-pressed={completed}
      className={
        completed
          ? "inline-flex items-center gap-2 border border-navy bg-navy px-4 py-2 text-sm font-semibold text-paper transition-colors disabled:opacity-60"
          : "inline-flex items-center gap-2 border border-ink px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-60"
      }
    >
      <span
        className={
          completed
            ? "inline-block h-3 w-3 shrink-0 border border-paper bg-paper"
            : "inline-block h-3 w-3 shrink-0 border border-current"
        }
        aria-hidden="true"
      />
      {completed ? "Completed" : "Mark complete"}
    </button>
  );
}
