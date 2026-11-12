"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SoftwareDeskIntro.module.css";

// Mock-up: plays once per browser session (sessionStorage flag), never for
// anyone with prefers-reduced-motion on, and can be skipped at any time.
//
// Accessibility/SEO fix (2026-11-11): the real content (`children`) used
// to only get rendered once the component had decided, client-side,
// whether to show the intro — meaning the server-rendered HTML, and
// anything that reads the page before that JS runs (a no-JS browser, a
// screen reader racing hydration, a crawler's initial HTML parse), saw an
// empty, aria-hidden placeholder instead of the actual software list and
// its links. Real content is now ALWAYS rendered in normal flow, with the
// animation as a purely decorative, always-aria-hidden overlay on top of
// it that fades away — never the only copy of the content.
const SESSION_KEY = "hhu-software-intro-seen";

export type SoftwarePreviewGroup = { category: string; tools: string[] };

export function SoftwareDeskIntro({
  preview,
  children,
}: {
  // A lightweight, real (not placeholder) version of the same category/
  // tool names shown in `children`, used to render the tiny on-screen
  // preview that scales up with the zoom. See MiniScreenContent below.
  preview: SoftwarePreviewGroup[];
  children: React.ReactNode;
}) {
  const [showIntro, setShowIntro] = useState(false);
  const settledRef = useRef(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = window.sessionStorage.getItem(SESSION_KEY) === "1";

    if (reducedMotion || alreadySeen) return;

    setShowIntro(true);

    // Fallback in case onAnimationEnd doesn't fire for some reason (e.g. a
    // browser that skips the animation under heavy load) — matches the
    // CSS animation-duration below.
    const fallback = window.setTimeout(() => settle(), 3100);
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
    // straight past it — a dev-only bug that would never show up in a
    // production build, but made it look broken in `npm run dev`.
    window.sessionStorage.setItem(SESSION_KEY, "1");
    setShowIntro(false);
  }

  return (
    <div className={styles.wrapper}>
      {/* The real content — always present, regardless of JS/animation state. */}
      <ScreenFrame>{children}</ScreenFrame>

      {/* Purely decorative overlay. aria-hidden unconditionally: there is
          nothing here a screen reader needs, since the content it's
          standing in front of is already accessible underneath. */}
      {showIntro && (
        <div className={styles.stage} aria-hidden="true">
          <div className={styles.deskLayer} onAnimationEnd={settle}>
            <div className={styles.computerBox}>
              <DeskComputerSvg />
              <div className={styles.screenPreview}>
                <MiniScreenContent preview={preview} />
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={settle}
            className={`${styles.skipButton} border border-ink/20 bg-paper/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink hover:border-ink/40`}
          >
            Skip intro →
          </button>
        </div>
      )}
    </div>
  );
}

// The permanent "glass" treatment: scanlines + a dark vignette around the
// actual page content.
function ScreenFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden border-4 border-ink bg-ink px-4 py-6 sm:px-8 sm:py-8">
      <ScreenTexture />
      <div className="relative">{children}</div>
    </div>
  );
}

function ScreenTexture() {
  return (
    <>
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
    </>
  );
}

// The genuinely tiny preview rendered inside the monitor's screen for the
// whole intro — real category/tool names, not a placeholder graphic, so
// growing it with the zoom reads as "the same screen getting closer"
// instead of "a different thing appeared." Purely decorative (it's inside
// the aria-hidden overlay) — the real, interactive version of this same
// data is what's actually underneath, in `children`.
function MiniScreenContent({ preview }: { preview: SoftwarePreviewGroup[] }) {
  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden"
      style={{ padding: "4%", gap: "3%" }}
    >
      <ScreenTexture />
      {preview.map((group) => (
        <div key={group.category} className="relative">
          <div
            className="truncate font-semibold uppercase tracking-wide text-amber-soft/80"
            style={{ fontSize: "4.2px", marginBottom: "1.2px" }}
          >
            {group.category}
          </div>
          <div className="flex flex-wrap" style={{ gap: "1px" }}>
            {group.tools.map((tool) => (
              <div
                key={tool}
                className="truncate border border-amber-soft/20 bg-white/5 text-amber-soft/70"
                style={{ fontSize: "3.2px", padding: "1px 2px", maxWidth: "31%" }}
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// A flat, thin-stroke illustration of an old boxy CRT monitor + keyboard on
// a desk, in the same visual language as Icon.tsx. The screen rectangle is
// deliberately centered in the 400x320 viewBox, and .computerBox is given
// the matching 400/320 aspect ratio, so the SVG maps 1:1 onto the box with
// no letterboxing — which is what lets .screenPreview line up with the
// drawn screen using plain percentages instead of guesswork.
function DeskComputerSvg() {
  return (
    <svg viewBox="0 0 400 320" className={styles.computerSvg} aria-hidden="true" focusable="false">
      {/* Desk surface */}
      <rect x="0" y="300" width="400" height="20" fill="#8A4A31" opacity="0.5" />
      {/* Monitor bezel, concentric with the screen */}
      <rect x="95" y="79" width="210" height="162" fill="#D6D0C2" stroke="#1C2B33" strokeWidth="2" />
      {/* Screen — centered in the viewBox on purpose */}
      <rect x="117" y="101" width="166" height="118" fill="#1C2B33" stroke="#1C2B33" strokeWidth="2" />
      {/* Power light */}
      <circle cx="285" cy="230" r="3" fill="#8C6217" />
      {/* Monitor stand + base */}
      <rect x="178" y="241" width="44" height="18" fill="#D6D0C2" stroke="#1C2B33" strokeWidth="2" />
      <rect x="150" y="259" width="100" height="10" fill="#D6D0C2" stroke="#1C2B33" strokeWidth="2" />
      {/* Keyboard */}
      <rect x="120" y="281" width="160" height="30" fill="#EFEDE6" stroke="#1C2B33" strokeWidth="2" />
      <line x1="135" y1="291" x2="265" y2="291" stroke="#1C2B33" strokeWidth="1.2" opacity="0.4" />
      <line x1="135" y1="299" x2="265" y2="299" stroke="#1C2B33" strokeWidth="1.2" opacity="0.4" />
      {/* Mouse */}
      <rect x="296" y="289" width="18" height="24" fill="#EFEDE6" stroke="#1C2B33" strokeWidth="2" />
    </svg>
  );
}
