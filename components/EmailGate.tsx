"use client";

// A soft, non-authenticated engagement gate wrapping real content. Not a
// security boundary: the site is statically generated, so gated content is
// still present in the page's HTML, this only blurs/covers it on the
// client and blocks a visitor from reading on without signing in. Real
// server-side enforcement (route-level auth checks so the HTML itself
// never ships to a signed-out request) is a separate, bigger piece of work,
// tracked in the launch checklist -- this is the UX layer only.
//
// Reworked 2026-11-10 for the full site-wide gating pass:
//  - Signed-in visitors never see this at all.
//  - `allowGuest` controls whether there's a way past it without signing
//    in. true -> a "No thanks, keep reading" link dismisses it (persisted
//    in localStorage so it doesn't reshow for that browser); used on
//    Career and Concept pages, which stay genuinely free to browse. false
//    (the default) -> no dismiss link at all, the gate simply blocks the
//    content until the visitor signs in; used on every other gated page
//    (Lessons, Interview Prep, Exam Prep, Get Hired, Software, Resumes,
//    Phases, the Action Plan builder).
//  - The Home page and the Career Match Quiz don't use this component at
//    all -- there's no gate on them, by design, not an oversight.
//
// Two timing variants (orthogonal to allowGuest):
//  - "timed" (default): content is visible for `delaySeconds`, then the
//    gate appears over it. Used on the soft-gated (allowGuest) pages, so
//    a visitor gets a few seconds to see what they'd be signing up for --
//    and, since 2026-11-11, on Lessons too (hard-gated, no dismiss link,
//    just a delay instead of an immediate block). The clock itself is
//    reload-resistant: the first time a given `source` is seen, this
//    browser's start time is stashed in localStorage, so refreshing the
//    same page picks up where it left off instead of granting another
//    full `delaySeconds` every reload. A different `source` (a
//    different lesson) still starts its own fresh clock.
//  - "immediate": the gate appears right away, no delay. Used on the
//    hard-gated pages that don't offer a timed preview at all.

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { HardHatMark } from "@/components/Header";

// Dismissing the gate ("No thanks, keep reading") hides it for this
// browser -- only reachable when allowGuest is true.
const STORAGE_KEY = "hhu_gate_dismissed";
// Per-source clock start time for the "timed" variant (see the comment
// above) -- keyed by `source` so each lesson/page gets its own fresh
// delay the first time it's seen, but reloading that same page doesn't.
const TIMER_KEY_PREFIX = "hhu_gate_started:";

export function EmailGate({
  source,
  variant = "timed",
  delaySeconds = 10,
  allowGuest = false,
  children,
}: {
  // A short tag identifying where this gate was shown, e.g.
  // "lesson:building-sequence" or "career:electrician". Not sent anywhere
  // today, kept on the prop so call sites don't all need touching and in
  // case per-location tagging is useful again later.
  source: string;
  variant?: "timed" | "immediate";
  delaySeconds?: number;
  allowGuest?: boolean;
  children: ReactNode;
}) {
  const { isLoaded, isSignedIn } = useUser();
  const [showGate, setShowGate] = useState(false);
  const headingId = useId();
  const signInButtonRef = useRef<HTMLButtonElement>(null);

  // Move focus into the dialog as soon as it appears, so a keyboard or
  // screen-reader user lands on the Sign In button instead of wherever
  // focus happened to be on the (now inert) page behind it.
  useEffect(() => {
    if (showGate) {
      signInButtonRef.current?.focus();
    }
  }, [showGate]);

  useEffect(() => {
    // Wait for Clerk to actually report auth state before deciding
    // anything, so a signed-in visitor never sees even a flash of the gate
    // while the page loads. Once we know someone's signed in, never show it.
    if (!isLoaded || isSignedIn) {
      setShowGate(false);
      return;
    }

    let dismissed = false;
    if (allowGuest) {
      try {
        dismissed = localStorage.getItem(STORAGE_KEY) === "1";
      } catch {
        // Private browsing / storage blocked: fall back to showing the
        // gate like a first-time visitor rather than crashing.
        dismissed = false;
      }
    }
    if (dismissed) return;

    if (variant === "immediate") {
      setShowGate(true);
      return;
    }

    const timerKey = `${TIMER_KEY_PREFIX}${source}`;
    let startedAt: number;
    try {
      const stored = localStorage.getItem(timerKey);
      const parsed = stored ? Number(stored) : NaN;
      if (Number.isFinite(parsed)) {
        startedAt = parsed;
      } else {
        startedAt = Date.now();
        localStorage.setItem(timerKey, String(startedAt));
      }
    } catch {
      // Storage blocked (private browsing, etc.): fall back to a plain
      // full delay every mount, same as before this existed.
      startedAt = Date.now();
    }

    const remainingMs = delaySeconds * 1000 - (Date.now() - startedAt);
    if (remainingMs <= 0) {
      setShowGate(true);
      return;
    }
    const timer = setTimeout(() => setShowGate(true), remainingMs);
    return () => clearTimeout(timer);
  }, [isLoaded, isSignedIn, variant, delaySeconds, allowGuest, source]);

  function dismiss() {
    if (!allowGuest) return;
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Storage blocked: the gate will just reappear next page, not fatal.
    }
    setShowGate(false);
  }

  return (
    <div className="relative">
      {/* `inert` (not just aria-hidden) is what actually keeps this content
          out of the tab order while the gate is up -- aria-hidden alone hides
          it from screen readers but doesn't stop keyboard focus from
          landing on a link that's invisible and blurred behind the modal. */}
      <div
        className={showGate ? "pointer-events-none select-none blur-sm" : undefined}
        aria-hidden={showGate}
        inert={showGate ? true : undefined}
      >
        {children}
      </div>

      {showGate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
        >
          <div className="w-full max-w-sm border border-hairline bg-paper p-7 shadow-lg">
            {/* Corner badge: logo mark + wordmark, same pairing as the
                header, so the gate reads as unmistakably this site's own
                even when someone lands on it mid-article from a link. */}
            <div className="flex items-center gap-2">
              <HardHatMark size={22} />
              <span className="font-display text-[17px] font-extrabold text-ink">
                breakground<span className="text-amber">U</span>
              </span>
            </div>

            <div className="mt-4 h-px bg-hairline" />

            <div className="mt-4 flex flex-col gap-1.5">
              <p id={headingId} className="font-display text-2xl font-bold leading-tight text-ink">
                Sign in to keep reading
              </p>
              <p className="text-sm leading-relaxed text-steel">
                Create a free account to save your progress and pick up where you left off, on any
                device.
              </p>
            </div>

            <SignInButton mode="modal">
              <button
                ref={signInButtonRef}
                type="button"
                className="mt-4 w-full bg-navy px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-ink"
              >
                Sign In
              </button>
            </SignInButton>

            {allowGuest && (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  dismiss();
                }}
                className="mt-3 block text-center text-xs text-steel hover:underline"
              >
                No thanks, keep reading
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
