"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SoftwareDeskIntro.module.css";

// Mock-up: plays once per browser session (sessionStorage flag), never for
// anyone with prefers-reduced-motion on, and can be skipped at any time.
// After it finishes (or is skipped, or never plays), what's left behind is
// a permanent CRT-screen-styled frame around the actual page content
// (passed in as `children`), which is the part that sticks around for the
// rest of the visit.
const SESSION_KEY = "hhu-software-intro-seen";

export function SoftwareDeskIntro({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"checking" | "intro" | "done">("checking");
  const settledRef = useRef(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = window.sessionStorage.getItem(SESSION_KEY) === "1";

    if (reducedMotion || alreadySeen) {
      setPhase("done");
      return;
    }

    setPhase("intro");

    // Fallback in case onAnimationEnd doesn't fire for some reason (e.g. a
    // browser that skips the animation under heavy load) — matches the
    // CSS animation-duration below.
    const fallback = window.setTimeout(() => settle(), 2500);
    return () => window.clearTimeout(fallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function settle() {
    if (settledRef.current) return;
    settledRef.current = true;
    // Marked "seen" only once the intro actually finishes (or is skipped),
    // not the moment it starts. Marking it at the start meant React 18
    // Strict Mode's dev-only double effect invocation (mount, cleanup,
    // mount again) saw the flag already set on its second pass and skipped
    // straight to "done" — a dev-only bug that would never show up in a
    // production build, but made it look broken in `npm run dev`.
    window.sessionStorage.setItem(SESSION_KEY, "1");
    setPhase("done");
  }

  // Avoid a flash of the final state before the session/motion check runs.
  if (phase === "checking") {
    return <div className={styles.stage} aria-hidden="true" />;
  }

  if (phase === "intro") {
    return (
      <div className={styles.stage} role="img" aria-label="Zooming in on a desktop computer screen">
        <div className={styles.deskLayer}>
          <DeskComputerIllustration />
        </div>
        <div className={styles.screenLayer} onAnimationEnd={settle}>
          <ScreenFrame>{children}</ScreenFrame>
        </div>
        <button
          type="button"
          onClick={settle}
          className={`${styles.skipButton} border border-ink/20 bg-paper/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink hover:border-ink/40`}
        >
          Skip intro →
        </button>
      </div>
    );
  }

  return <ScreenFrame>{children}</ScreenFrame>;
}

// The permanent "glass" treatment: scanlines + a dark vignette around
// whatever content sits inside the screen. Rendered both as the intro's
// final crossfade target and as the only thing shown once the intro is
// done (or skipped, or never played).
function ScreenFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden border-4 border-ink bg-ink px-4 py-6 sm:px-8 sm:py-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1px, transparent 1px, transparent 3px)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 70px 24px rgba(0,0,0,0.6)" }}
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </div>
  );
}

// A flat, thin-stroke illustration of an old boxy CRT monitor + keyboard on
// a desk, in the same visual language as Icon.tsx. The screen rectangle is
// centered in the viewBox on purpose, so a CSS scale() on the whole SVG
// (transform-origin: center, the default) zooms straight into it without
// needing to hand-tune an off-center transform-origin.
function DeskComputerIllustration() {
  return (
    <svg viewBox="0 0 400 300" width="78%" height="78%" aria-hidden="true" focusable="false">
      {/* Desk surface */}
      <rect x="0" y="230" width="400" height="70" fill="#8A4A31" opacity="0.5" />
      {/* Monitor bezel */}
      <rect x="95" y="40" width="210" height="170" fill="#D6D0C2" stroke="#1C2B33" strokeWidth="2" />
      {/* Screen (centered in the viewBox) */}
      <rect x="117" y="60" width="166" height="118" fill="#1C2B33" stroke="#1C2B33" strokeWidth="2" />
      {/* Power light */}
      <circle cx="285" cy="196" r="3" fill="#8C6217" />
      {/* Monitor stand + base */}
      <rect x="178" y="210" width="44" height="18" fill="#D6D0C2" stroke="#1C2B33" strokeWidth="2" />
      <rect x="150" y="226" width="100" height="10" fill="#D6D0C2" stroke="#1C2B33" strokeWidth="2" />
      {/* Keyboard */}
      <rect x="120" y="250" width="160" height="30" fill="#EFEDE6" stroke="#1C2B33" strokeWidth="2" />
      <line x1="135" y1="260" x2="265" y2="260" stroke="#1C2B33" strokeWidth="1.2" opacity="0.4" />
      <line x1="135" y1="268" x2="265" y2="268" stroke="#1C2B33" strokeWidth="1.2" opacity="0.4" />
      {/* Mouse */}
      <rect x="296" y="258" width="18" height="24" fill="#EFEDE6" stroke="#1C2B33" strokeWidth="2" />
    </svg>
  );
}
