"use client";

import { useEffect, useState } from "react";

// Mock-up v3: a smaller, tighter clipboard — cork backing peeking out
// around the edges (so the clip reads as actually holding something
// against a board), plain paper with no ruled lines (the lines read as
// visual noise at this size), and line-clamp-2 so the box stays the same
// size across rotations without needing a tall fixed height that leaves
// blank space for short questions.
export function InterviewClipboardHeader({ questions }: { questions: string[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (questions.length < 2) return;
    const fade = setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % questions.length);
        setVisible(true);
      }, 220);
    }, 3400);
    return () => clearInterval(fade);
  }, [questions.length]);

  if (questions.length === 0) return null;
  const current = questions[index % questions.length];

  return (
    <div className="relative w-52 pt-2">
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
      <div className="relative z-10 m-1.5 mt-3 flex min-h-[4.25rem] flex-col gap-1 bg-[#FBF8EF] p-2.5 shadow-[0_2px_4px_rgba(28,43,51,0.18)]">
        <p className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-clay">
          <ClipboardIcon />
          They might ask
        </p>
        <p
          className="line-clamp-2 text-xs leading-snug text-ink transition-opacity duration-200"
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
