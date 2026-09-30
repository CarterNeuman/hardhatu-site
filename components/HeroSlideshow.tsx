"use client";

import { useEffect, useState } from "react";

// Cross-fades through a handful of real jobsite photos in the hero box.
// Same box the static hero image used to sit in (aspect-[3/4], hairline
// border, object-cover) — this just cycles what's inside it. Respects
// prefers-reduced-motion by freezing on the first image.
const SLIDES = [
  { src: "/images/hero.jpg", alt: "Construction crew working on an active jobsite" },
  { src: "/images/hero-2.jpg", alt: "Aerial view of an active excavation site" },
  { src: "/images/hero-3.jpg", alt: "Construction crew pouring concrete with a mixer truck" },
  { src: "/images/hero-4.jpg", alt: "Workers on scaffolding on a jobsite" },
  { src: "/images/hero-5.jpg", alt: "Worker on rope access equipment on a building facade" },
];

const INTERVAL_MS = 4500;

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  // Which slides have actually been mounted as a real <img> yet. Starts
  // with the first two — the other three are all absolutely positioned
  // inside the same on-screen box as slide 0 (only opacity separates
  // them), so native loading="lazy" doesn't defer them: the browser's
  // viewport-distance heuristic sees them as already on-screen and fetches
  // all five on page load regardless of the attribute. Mounting the NEXT
  // slide as soon as the current one becomes active (rather than at the
  // instant it's about to be shown) gives it that current slide's full
  // ~4.5s on screen to load in the background, so the cross-fade never has
  // to wait on a fetch — while still never mounting more than two photos
  // at once.
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0, 1 % SLIDES.length]));

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [reducedMotion]);

  // Every time a new slide becomes active, unlock the slide after next so
  // it starts loading quietly in the background during the current
  // slide's display window, ready well before its own turn comes up.
  useEffect(() => {
    const upcoming = (index + 1) % SLIDES.length;
    setLoaded((prev) => (prev.has(upcoming) ? prev : new Set(prev).add(upcoming)));
  }, [index]);

  return (
    <div className="relative aspect-[3/4] w-full max-w-[320px] overflow-hidden border border-hairline">
      {SLIDES.map((slide, i) =>
        loaded.has(i) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            aria-hidden={i !== index}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ) : null
      )}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
        {SLIDES.map((slide, i) => (
          <span
            key={slide.src}
            className={`h-1.5 w-1.5 border border-paper transition-colors ${
              i === index ? "bg-paper" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
