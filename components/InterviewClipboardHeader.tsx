"use client";

import { useEffect, useState } from "react";

// Mock-up v4: widened considerably so the rotating question fits without
// being chopped mid-sentence — 3 lines at this width covers all but the
// rare outlier (the page itself filters those out before handing
// questions here). Still a fixed min-height + line-clamp so the box
// doesn't resize as it rotates.
//
// Accessibility fix (2026-11-11): this used to auto-rotate forever with
// no way to stop it and no check for reduced-motion — WCAG 2.2.2
// ("Pause, Stop, Hide") requires one or the other for anything that
// auto-updates and keeps moving past 5 seconds. Simplest correct fix:
// anyone with prefers-reduced-motion on gets the first real question
// shown plainly, with no rotation and no fade, same as if JS never ran.
export function InterviewClipboardHeader({ questions }: { questions: string[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reducedMotion || questions.length < 2) return;
    const fade = setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % questions.length);
        setVisible(true);
      }, 220);
    }, 3800);
    return () => clearInterval(fade);
  }, [questions.length, reducedMotion]);

  if (questions.length === 0) return null;
  const current = questions[index % questions.length];

  return (
    <div className="relative w-full max-w-md pt-2">
      {/* Cork board backing — shows as a thin frame around the paper */}
      <div
        className="absolute inset-x-0 bottom-0 top-2"
        style={{
          backgroundColor: "#AD8653",
          backgroundImage:
            "radial-gradient(circle, rgba(28,43,51,0.3) 1px, transparent 1.4px)",
          backgroundSize: "9px 9px",
        }}
        aria-hidden="true"
      />

      {/* Metal clip + rivets, overlapping the top edge */}
      <div className="absolute left-1/2 top-0 z-20 h-3.5 w-14 -translate-x-1/2 border border-ink/30 bg-steel" />
      <div className="absolute left-1/2 top-0.5 z-20 h-1.5 w-1.5 -translate-x-3 rounded-full bg-ink/40" />
      <div className="absolute left-1/2 top-0.5 z-20 h-1.5 w-1.5 translate-x-1.5 rounded-full bg-ink/40" />

      {/* Paper, inset from the board so the cork shows around the edges */}
      <div className="relative z-10 m-1.5 mt-3 flex min-h-[4.75rem] flex-col gap-1 bg-[#FBF8EF] p-2.5 shadow-[0_2px_4px_rgba(28,43,51,0.18)]">
        <p className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-clay">
          <ClipboardIcon />
          They might ask
        </p>
        <p
          className="line-clamp-3 text-xs leading-snug text-ink transition-opacity duration-200"
          style={{ opacity: visible ? 1 : 0 }}
        >
          &ldquo;{current}&rdquo;
        </p>
      </div>
    </div>
  );
}

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 24 24" width={10} height={10} aria-hidden="true" focusable="false" className="shrink-0">
      <rect x={5} y={4} width={14} height={18} fill="none" stroke="currentColor" strokeWidth={1.5} />
      <rect x={9} y={2.5} width={6} height={3} fill="currentColor" />
    </svg>
  );
}
