"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import type { Lesson } from "@/lib/types";
import {
  BLUEPRINT_LAYOUT,
  BLUEPRINT_TIERS,
  BLUEPRINT_ICONS,
  smoothPath,
  type BlueprintLayoutStop,
} from "@/lib/lessons-blueprint-data";
import styles from "./LessonsBlueprint.module.css";

type Stop = BlueprintLayoutStop & { title: string; minutes: number; href: string };

const SHEET_W = 3050;
const SHEET_H = 700;
const TOOLTIP_W = 252;
const TOOLTIP_H = 190;

// Splits a title into lines for the SVG <tspan> stack below each stop's
// icon. Default (no wordsPerLine) is an even split at the halfway word,
// which fits most 2-3 word titles on 2 reasonably balanced lines. Passing
// wordsPerLine (lessons-blueprint-data.ts's titleWordsPerLine) instead
// groups a fixed number of words per line from the start — used for
// stops packed close enough to a neighbor that the default split is too
// wide to fit without overlapping it.
function wrapTitle(title: string, wordsPerLine?: number): string[] {
  const words = title.split(" ");
  if (!wordsPerLine) {
    const mid = Math.ceil(words.length / 2);
    return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")].filter(Boolean);
  }
  const lines: string[] = [];
  for (let i = 0; i < words.length; i += wordsPerLine) {
    lines.push(words.slice(i, i + wordsPerLine).join(" "));
  }
  return lines;
}

function StopIcon({ name }: { name: keyof typeof BLUEPRINT_ICONS }) {
  return (
    <g
      className={styles.icon}
      transform="translate(-15,-15) scale(1.25)"
      dangerouslySetInnerHTML={{ __html: BLUEPRINT_ICONS[name] }}
    />
  );
}

export function LessonsBlueprint({ lessons }: { lessons: Lesson[] }) {
  const stops = useMemo<Stop[]>(() => {
    const bySlug = new Map(lessons.map((l) => [l.slug, l]));
    return BLUEPRINT_LAYOUT.map((layout) => {
      const lesson = bySlug.get(layout.slug);
      return {
        ...layout,
        title: lesson?.title ?? layout.slug,
        minutes: lesson?.minutes ?? 0,
        href: `/lessons/${layout.slug}`,
      };
    });
  }, [lessons]);

  const [activeN, setActiveN] = useState<number | null>(null);
  const roadRef = useRef<SVGPathElement>(null);
  const spurRef = useRef<SVGPathElement>(null);

  // Draw-in animation: the road and spur "draw themselves" on mount by
  // animating stroke-dashoffset from the path's full length to zero. This
  // needs a real measured path length (getTotalLength), so it's the one
  // piece of this component that has to run imperatively in an effect
  // rather than declaratively in CSS.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const paths = [roadRef.current, spurRef.current];
    const timers: number[] = [];
    paths.forEach((p, i) => {
      if (!p) return;
      const len = p.getTotalLength();
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = String(len);
      p.getBoundingClientRect(); // force layout before transitioning
      p.style.transition = `stroke-dashoffset ${1.8 + i * 0.4}s ease-out ${i * 0.3}s`;
      requestAnimationFrame(() => {
        if (p) p.style.strokeDashoffset = "0";
      });
      timers.push(
        window.setTimeout(() => {
          if (!p) return;
          p.style.strokeDasharray = "";
          p.style.transition = "";
        }, 2600 + i * 500)
      );
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  const mainPts = stops.filter((s) => !s.branch);
  const branchStop = stops.find((s) => s.branch);
  const lastMain = mainPts[mainPts.length - 1];

  const roadD = smoothPath(mainPts);
  const spurD =
    branchStop && lastMain
      ? smoothPath([
          { x: lastMain.x, y: lastMain.y },
          { x: (lastMain.x + branchStop.x) / 2, y: lastMain.y + 120 },
          branchStop,
        ])
      : "";

  const active = stops.find((s) => s.n === activeN) ?? null;
  let tipX = 0;
  let tipY = 0;
  if (active) {
    tipX = active.x > 2400 ? active.x - 270 : active.x + 46;
    tipY = active.y > 1000 ? active.y - 210 : active.y - 40;
    tipY = Math.max(10, tipY);
    tipX = Math.max(10, Math.min(tipX, SHEET_W - TOOLTIP_W - 10));
  }

  return (
    <div className={styles.sheetScroll} id="sheetScroll">
      <svg
        viewBox={`0 0 ${SHEET_W} ${SHEET_H}`}
        role="img"
        aria-label="The Learning Blueprint: a winding road connecting all 20 lessons, grouped into four tiers from orientation basics to advanced practice."
      >
        <defs>
          <pattern id="hhu-grid" width={40} height={40} patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="rgba(207,232,242,.06)" strokeWidth={1} />
          </pattern>
        </defs>
        <rect x={0} y={0} width={SHEET_W} height={SHEET_H} fill="var(--blue)" />
        <rect x={0} y={0} width={SHEET_W} height={SHEET_H} fill="url(#hhu-grid)" />
        <rect
          x={14}
          y={14}
          width={SHEET_W - 28}
          height={SHEET_H - 28}
          fill="none"
          stroke="var(--line-dim)"
          strokeWidth={2}
        />

        {BLUEPRINT_TIERS.map((t) => (
          <g key={t.n}>
            <text className={styles.tierLabel} x={t.x} y={t.y} textAnchor="middle">
              {t.label}
            </text>
            <text className={styles.tierSub} x={t.x} y={t.y + 22} textAnchor="middle">
              {t.sub}
            </text>
          </g>
        ))}

        <path ref={roadRef} className={styles.road} d={roadD} />
        {spurD && <path ref={spurRef} className={styles.spur} d={spurD} />}

        <g className={styles.titleblock} transform="translate(30,24)">
          <rect x={0} y={0} width={252} height={70} strokeWidth={1.5} />
          {[
            ["PROJECT", "HardHatU Learning Path"],
            ["STOPS", `${stops.length} of ${stops.length} lessons`],
          ].map(([label, value], i) => {
            const ry = 24 + i * 32;
            return (
              <g key={label}>
                <text className={styles.tbLabel} x={12} y={ry - 11}>
                  {label}
                </text>
                <text x={12} y={ry + 5}>
                  {value}
                </text>
                {i < 1 && <line x1={0} y1={ry + 14} x2={252} y2={ry + 14} />}
              </g>
            );
          })}
        </g>

        {stops.map((stop, idx) => {
          // Always placed below the badge (never above): every tier
          // label sits above every one of its own stops (see
          // lessons-blueprint-data.ts), so keeping titles below the badge
          // guarantees they read away from the tier labels instead of
          // toward them, and keeps every stop's title on the same side
          // instead of flipping partway across the sheet.
          const ty = 52;
          const titleLines = wrapTitle(stop.title, stop.titleWordsPerLine);
          const isActive = stop.n === activeN;

          return (
            <g key={stop.n} transform={`translate(${stop.x},${stop.y})`}>
              <Link
                href={stop.href}
                className={[styles.stop, stop.branch ? styles.branch : "", isActive ? styles.active : ""]
                  .filter(Boolean)
                  .join(" ")}
                style={{ "--i": idx } as CSSProperties}
                onMouseEnter={() => setActiveN(stop.n)}
                onMouseLeave={() => setActiveN((n) => (n === stop.n ? null : n))}
                onFocus={() => setActiveN(stop.n)}
                onBlur={() => setActiveN((n) => (n === stop.n ? null : n))}
                aria-label={`Lesson ${stop.n}: ${stop.title}`}
              >
                <circle className={styles.badge} r={34} />
                <StopIcon name={stop.icon} />
                <circle className={styles.numBg} cx={24} cy={-24} r={12} />
                <text className={styles.num} x={24} y={-19.5} textAnchor="middle">
                  {stop.n}
                </text>
                <text className={styles.title} x={0} y={ty} textAnchor="middle">
                  {titleLines.map((line, i) => (
                    <tspan key={i} x={0} dy={i === 0 ? 0 : 16}>
                      {line}
                    </tspan>
                  ))}
                </text>
                <circle className={styles.hit} r={42} />
              </Link>
            </g>
          );
        })}

        {active && (
          <foreignObject
            width={TOOLTIP_W}
            height={TOOLTIP_H}
            x={tipX}
            y={tipY}
            style={{ pointerEvents: "none" }}
          >
            <div className={styles.tooltipCard}>
              <div className={styles.ttTier}>
                Tier {active.tier} &middot; Lesson {active.n} of {stops.length}
              </div>
              <h3>{active.title}</h3>
              <div>{active.teaser}</div>
              <span className={styles.ttMinutes}>{active.minutes} min read</span>
            </div>
          </foreignObject>
        )}
      </svg>
    </div>
  );
}
