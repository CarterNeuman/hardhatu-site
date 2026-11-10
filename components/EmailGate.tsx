"use client";

// A soft, non-authenticated engagement gate. Not a real login and not a
// security boundary: the site is statically generated, so the gated content
// is still present in the page's HTML, this only blurs/covers it on the
// client. That's intentional for now, this is a soft nudge, not the real
// account-based paywall planned for a future "premium" tier.
//
// Behavior (reworked 2026-11-10, now that Clerk sign-in exists):
//  - Signed-in visitors never see this at all -- they already have an
//    account, there's nothing left to ask them for.
//  - Signed-out visitors get a "create a free account" nudge that opens
//    Clerk's sign-in modal, instead of the old separate email-capture form.
//    Every real signup also joins the Buttondown mailing list automatically
//    now (see app/api/webhooks/clerk/route.ts), so this still feeds the same
//    list the old email form did, just through the real account path.
//
// Two variants:
//  - "timed" (default): content is visible for `delaySeconds`, then the
//    gate appears over it. Used on Lessons/Interview Prep/Get Qualified/
//    Phases/Software detail pages.
//  - "immediate": the gate appears right away, no delay. Used on the
//    Career Match Quiz's result screen, where the result itself is the
//    thing being gated rather than a page someone's already reading.

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { SignInButton, useUser } from "@clerk/nextjs";

// Dismissing the gate ("No thanks, keep reading") just hides it for this
// browser, same as before. Renamed from the old "hhu_subscribed" key since
// the meaning changed -- this no longer means "gave us an email," it means
// "chose not to see the sign-in nudge."
const STORAGE_KEY = "hhu_gate_dismissed";

export function EmailGate({
  source,
  variant = "timed",
  delaySeconds = 10,
  children,
}: {
  // A short tag identifying where this gate was shown, e.g.
  // "lesson:building-sequence" or "quiz-result". Not sent anywhere today
  // (the old /api/subscribe call is gone from this component), kept on the
  // prop so call sites don't all need touching, and in case per-location
  // tagging is useful again later (e.g. passed into the sign-in flow).
  source: string;
  variant?: "timed" | "immediate";
  delaySeconds?: number;
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
    try {
      dismissed = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // Private browsing / storage blocked: fall back to showing the gate
      // like a first-time visitor rather than crashing.
      dismissed = false;
    }
    if (dismissed) return;

    if (variant === "immediate") {
      setShowGate(true);
      return;
    }
    const timer = setTimeout(() => setShowGate(true), delaySeconds * 1000);
    return () => clearTimeout(timer);
  }, [isLoaded, isSignedIn, variant, delaySeconds]);

  function dismiss() {
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
          <div className="w-full max-w-sm border border-hairline bg-paper p-6 shadow-lg">
            <p id={headingId} className="font-display text-xl font-bold text-ink">
              {variant === "immediate" ? "Sign in to see your result" : "Keep learning, it's free"}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-steel">
              Create a free account to save your progress and pick up where you left off, on any
              device.
            </p>
            <SignInButton mode="modal">
              <button
                ref={signInButtonRef}
                type="button"
                className="mt-4 w-full bg-navy px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-ink"
              >
                Sign In
              </button>
            </SignInButton>
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
          </div>
        </div>
      )}
    </div>
  );
}
