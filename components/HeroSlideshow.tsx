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

  return (
    <div className="relative aspect-[3/4] w-full max-w-[320px] overflow-hidden border border-hairline">
      {SLIDES.map((slide, i) => (
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
      ))}
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
