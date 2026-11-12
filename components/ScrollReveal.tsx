"use client";

import { useEffect, useRef, useState } from "react";

// Fades/slides an element into place the first time it scrolls into view.
// Used on the homepage so the page feels alive as you scroll instead of
// dumping every section on screen at once -- each band's entrance is the
// "format changes" cue, no scroll-linked JS or extra dependency needed.
// Respects prefers-reduced-motion by reporting visible immediately (so
// there's nothing to "catch up on" and nothing ever stays hidden).
//
// A hook rather than a wrapper component on purpose: spreading the
// returned ref/className straight onto the real <section> keeps that
// element as the actual landmark, instead of nesting it inside an extra
// non-semantic <div> just to attach an observer.
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(delayMs = 0) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setSkipAnimation(true);
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const revealClassName = skipAnimation
    ? ""
    : `transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`;

  return {
    ref,
    className: revealClassName,
    style: !skipAnimation && delayMs ? { transitionDelay: `${delayMs}ms` } : undefined,
  };
}
