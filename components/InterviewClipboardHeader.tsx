"use client";

import { useEffect, useState } from "react";

// Mock-up: a small cycling "what they might ask" readout that sits next to
// a category's heading on the Interview Prep index, so the category feels
// like something you can preview before clicking in rather than a plain
// text label. Pulls real opening questions from that category's own
// interview guides (passed in by the page) — nothing invented here.
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
    <div className="flex max-w-xs items-start gap-2 border border-hairline bg-white/50 px-3 py-2 text-left">
      <ClipboardIcon />
      <p
        className="text-xs leading-snug text-steel transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <span className="font-semibold uppercase tracking-wide text-ink">They might ask:</span>{" "}
        &ldquo;{current}&rdquo;
      </p>
    </div>
  );
}

function ClipboardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={18}
      height={18}
      aria-hidden="true"
      focusable="false"
      className="mt-0.5 shrink-0 text-clay"
    >
      <rect x={5} y={4} width={14} height={18} fill="none" stroke="currentColor" strokeWidth={1.5} />
      <rect x={9} y={2.5} width={6} height={3} fill="currentColor" />
      <line x1={8} y1={10} x2={16} y2={10} stroke="currentColor" strokeWidth={1.3} />
      <line x1={8} y1={13.5} x2={16} y2={13.5} stroke="currentColor" strokeWidth={1.3} />
      <line x1={8} y1={17} x2={13} y2={17} stroke="currentColor" strokeWidth={1.3} />
    </svg>
  );
}
