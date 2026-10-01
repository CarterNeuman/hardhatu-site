"use client";

// A soft, non-authenticated email-capture gate. Not a real login and not a
// security boundary: the site is statically generated, so the gated content
// is still present in the page's HTML, this only blurs/covers it on the
// client until the visitor's browser has a "subscribed" flag in
// localStorage. That's intentional for now, this is a lead-capture step,
// not the real account-based paywall planned for a future "premium" tier.
//
// Two variants:
//  - "timed" (default): content is visible for `delaySeconds`, then the
//    gate appears over it. Used on Lessons/Interview Prep/Get Qualified/
//    Phases/Software detail pages.
//  - "immediate": the gate appears right away, no delay. Used on the
//    Career Match Quiz's result screen, where the result itself is the
//    thing being gated rather than a page someone's already reading.

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";

const STORAGE_KEY = "hhu_subscribed";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailGate({
  source,
  variant = "timed",
  delaySeconds = 10,
  children,
}: {
  // A short tag identifying where this gate was shown, e.g.
  // "lesson:building-sequence" or "quiz-result". Sent along with the
  // submitted email so the list can be segmented by what someone was
  // reading when they signed up.
  source: string;
  variant?: "timed" | "immediate";
  delaySeconds?: number;
  children: ReactNode;
}) {
  const [showGate, setShowGate] = useState(false);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot, real visitors never fill this
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const headingId = useId();
  const emailInputId = useId();
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Move focus into the dialog as soon as it appears, so a keyboard or
  // screen-reader user lands on the email field instead of wherever
  // focus happened to be on the (now inert) page behind it.
  useEffect(() => {
    if (showGate) {
      emailInputRef.current?.focus();
    }
  }, [showGate]);

  useEffect(() => {
    let alreadySubscribed = false;
    try {
      alreadySubscribed = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // Private browsing / storage blocked: fall back to showing the gate
      // like a first-time visitor rather than crashing.
      alreadySubscribed = false;
    }
    if (alreadySubscribed) return;

    if (variant === "immediate") {
      setShowGate(true);
      return;
    }
    const timer = setTimeout(() => setShowGate(true), delaySeconds * 1000);
    return () => clearTimeout(timer);
  }, [variant, delaySeconds]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setErrorMsg("Enter a valid email address.");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, company }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Try again in a moment.");
        return;
      }
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // Storage blocked: the gate will just reappear next page, not fatal.
      }
      setShowGate(false);
      setStatus("idle");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Try again in a moment.");
    }
  }

  return (
    <div className="relative">
      {/* `inert` (not just aria-hidden) is what actually keeps this content
          out of the tab order while the gate is up — aria-hidden alone hides
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
              {variant === "immediate" ? "Enter your email to see your result" : "Keep learning, it's free"}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-steel">
              Drop your email to keep going. No password, no spam, just your next step into
              construction.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <label htmlFor={emailInputId} className="sr-only">
                Email address
              </label>
              <input
                ref={emailInputRef}
                id={emailInputId}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="border border-hairline bg-white/60 px-3 py-2 text-sm text-ink focus:border-navy focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-navy"
              />
              {status === "error" && <p className="text-xs text-clay">{errorMsg}</p>}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-1 bg-navy px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-ink disabled:opacity-60"
              >
                {status === "submitting" ? "Submitting..." : "Continue reading"}
              </button>
            </form>
            <a href="/" className="mt-3 block text-center text-xs text-steel hover:underline">
              No thanks, take me back
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
