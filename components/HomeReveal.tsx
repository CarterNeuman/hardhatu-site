"use client";

import { useScrollReveal } from "./ScrollReveal";

// Client wrapper around useScrollReveal() for use directly inside
// app/page.tsx, a Server Component -- hooks can't run there directly, so
// the handful of homepage sections that should fade/slide in on scroll
// are wrapped in this instead. `as` picks the real landmark element so
// each section stays a proper <section>/<div>, not a meaningless extra
// wrapper.
export function HomeReveal({
  children,
  as: Tag = "div",
  className = "",
  delayMs = 0,
  style,
}: {
  children: React.ReactNode;
  as?: "div" | "section";
  className?: string;
  delayMs?: number;
  style?: React.CSSProperties;
}) {
  const reveal = useScrollReveal<HTMLDivElement>(delayMs);
  return (
    <Tag
      ref={reveal.ref as React.RefObject<HTMLDivElement>}
      className={`${reveal.className} ${className}`}
      style={{ ...style, ...reveal.style }}
    >
      {children}
    </Tag>
  );
}
