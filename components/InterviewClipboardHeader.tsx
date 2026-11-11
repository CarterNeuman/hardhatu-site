"use client";

import { useEffect, useState } from "react";

// Mock-up v2: an actual small clipboard graphic (metal clip + ruled paper)
// instead of a plain bordered box, sitting in the same spot next to the
// category heading. Fixed width/height so the clipboard never resizes as
// the rotating question changes length — line-clamp caps the text inside
// a box that's already sized for the worst case.
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
    <div className="relative w-64 pt-2.5">
      {/* Metal clip + rivets, overlapping the top edge of the pad */}
      <div className="absolute left-1/2 top-0 z-10 h-4 w-16 -translate-x-1/2 border border-ink/30 bg-steel" />
      <div className="absolute left-1/2 top-0.5 z-10 h-1.5 w-1.5 -translate-x-3.5 rounded-full bg-ink/40" />
      <div className="absolute left-1/2 top-0.5 z-10 h-1.5 w-1.5 translate-x-2 rounded-full bg-ink/40" />

      <div
        className="flex h-28 flex-col gap-1 border border-hairline bg-[#FBF8EF] p-3 pt-4 shadow-[0_2px_4px_rgba(28,43,51,0.1)]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 16px, #D6D0C2 16px, #D6D0C2 17px)",
        }}
      >
        <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-clay">
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
    <svg viewBox="0 0 24 24" width={12} height={12} aria-hidden="true" focusable="false" className="shrink-0">
      <rect x={5} y={4} width={14} height={18} fill="none" stroke="currentColor" strokeWidth={1.5} />
      <rect x={9} y={2.5} width={6} height={3} fill="currentColor" />
    </svg>
  );
}
