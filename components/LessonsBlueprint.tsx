"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import type { Lesson } from "@/lib/types";
import {
  BLUEPRINT_LAYOUT,
  BLUEPRINT_TIERS,
  BLUEPRINT_BRANCHES,
  BLUEPRINT_ICONS,
  smoothPath,
  type BlueprintLayoutStop,
  type BlueprintBranch,
} from "@/lib/lessons-blueprint-data";
import styles from "./LessonsBlueprint.module.css";

// A stop on the sheet is either one of the 22 main-road lessons or one of
// the lessons inside one of the 8 branches. Both render as the same badge
// + icon + title shape (branch stops just smaller), and both can open the
// same hover/focus tooltip, so they're normalized into one shape here
// rather than carrying two parallel render paths.
type Stop = {
  kind: "main" | "branch";
  n: number; // 1-22 for a main stop; 1-based position within its own branch otherwise
  total: number; // 22 for a main stop; that branch's lesson count otherwise
  slug: string;
  title: string; // full real lesson title — used in the tooltip and aria-label only
  label: string; // short curated text drawn on the badge itself
  minutes: number;
  href: string;
  x: number;
  y: number;
  icon: keyof typeof BLUEPRINT_ICONS;
  teaser: string;
  tier?: 1 | 2 | 3 | 4;
  labelWordsPerLine?: number;
  branchLabel?: string;
};

type Branch = BlueprintBranch & {
  attach: Stop;
  stops: Stop[]; // in the branch's own declared order (for numbering)
  spurD: string; // through the attach point, trailhead, and stops left-to-right
  labelX: number;
  labelY: number;
};

const SHEET_W = 3000;
const SHEET_H = 878;
const TOOLTIP_W = 252;
const TOOLTIP_H = 190;
const MAIN_BADGE_R = 34;
const BRANCH_BADGE_R = 24;

// Splits a short on-diagram label into lines for the SVG <tspan> stack
// below each stop's icon. Default (no wordsPerLine) is an even split at
// the halfway word, which fits most 2-3 word labels on 2 reasonably
// balanced lines. Passing wordsPerLine (lessons-blueprint-data.ts's
// labelWordsPerLine) instead groups a fixed number of words per line from
// the start — used for stops packed close enough to a neighbor that the
// default split is too wide to fit without overlapping it.
function wrapLabel(label: string, wordsPerLine?: number): string[] {
  const words = label.split(" ");
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

function StopIcon({ name, scale = 1.25 }: { name: keyof typeof BLUEPRINT_ICONS; scale?: number }) {
  const t = -12 * scale;
  return (
    <g
      className={styles.icon}
      transform={`translate(${t},${t}) scale(${scale})`}
      dangerouslySetInnerHTML={{ __html: BLUEPRINT_ICONS[name] }}
    />
  );
}

export function LessonsBlueprint({ lessons }: { lessons: Lesson[] }) {
  const bySlug = useMemo(() => new Map(lessons.map((l) => [l.slug, l])), [lessons]);

  const mainStops = useMemo<Stop[]>(() => {
    return BLUEPRINT_LAYOUT.map((layout: BlueprintLayoutStop) => {
      const lesson = bySlug.get(layout.slug);
      return {
        kind: "main",
        n: layout.n,
        total: BLUEPRINT_LAYOUT.length,
        slug: layout.slug,
        title: lesson?.title ?? layout.label,
        label: layout.label,
        minutes: lesson?.minutes ?? 0,
        href: `/lessons/${layout.slug}`,
        x: layout.x,
        y: layout.y,
        icon: layout.icon,
        teaser: layout.teaser,
        tier: layout.tier,
        labelWordsPerLine: layout.labelWordsPerLine,
      };
    });
  }, [bySlug]);

  const mainBySlug = useMemo(() => new Map(mainStops.map((s) => [s.slug, s])), [mainStops]);

  const branches = useMemo<Branch[]>(() => {
    return BLUEPRINT_BRANCHES.map((branch) => {
      const attach = mainBySlug.get(branch.attachSlug);
      if (!attach) return null;
      const stops: Stop[] = branch.lessons.map((bl, i) => {
        const lesson = bySlug.get(bl.slug);
        return {
          kind: "branch",
          n: i + 1,
          total: branch.lessons.length,
          slug: bl.slug,
          title: lesson?.title ?? bl.label,
          label: bl.label,
          minutes: lesson?.minutes ?? 0,
          href: `/lessons/${bl.slug}`,
          x: bl.x,
          y: bl.y,
          icon: bl.icon,
          teaser: bl.teaser,
          branchLabel: branch.label,
        };
      });
      const byX = [...stops].sort((a, b) => a.x - b.x);
      const spurD = smoothPath([
        { x: attach.x, y: attach.y },
        branch.trailhead,
        ...byX.map((s) => ({ x: s.x, y: s.y })),
      ]);
      const ys = stops.map((s) => s.y);
      const xs = stops.map((s) => s.x);
      // A branch below the road (side 1) places its label past the
      // stops' own title text, not just past their badges — otherwise
      // the label collides with the title of whichever stop is
      // lowest. One above the road (side -1) only needs to clear the
      // badges themselves, since the titles there hang below the
      // badges, away from the label.
      const labelY = branch.side === -1 ? Math.min(...ys) - 50 : Math.max(...ys) + 90;
      const labelX = (Math.min(...xs) + Math.max(...xs)) / 2;
      return { ...branch, attach, stops, spurD, labelX, labelY };
    }).filter((b): b is Branch => b !== null);
  }, [mainBySlug, bySlug]);

  const [activeKey, setActiveKey] = useState<string | null>(null);
  const roadRef = useRef<SVGPathElement>(null);
  const spurRefs = useRef<(SVGPathElement | null)[]>([]);

  // Draw-in animation: the road and every branch spur "draw themselves" on
  // mount by animating stroke-dashoffset from the path's full length to
  // zero. This needs a real measured path length (getTotalLength), so
  // it's the one piece of this component that has to run imperatively in
  // an effect rather than declaratively in CSS.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const paths = [roadRef.current, ...spurRefs.current];
    const timers: number[] = [];
    paths.forEach((p, i) => {
      if (!p) return;
      const len = p.getTotalLength();
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = String(len);
      p.getBoundingClientRect(); // force layout before transitioning
      p.style.transition = `stroke-dashoffset ${1.8 + Math.min(i, 3) * 0.3}s ease-out ${Math.min(i, 8) * 0.12}s`;
      requestAnimationFrame(() => {
        if (p) p.style.strokeDashoffset = "0";
      });
      timers.push(
        window.setTimeout(() => {
          if (!p) return;
          p.style.strokeDasharray = "";
          p.style.transition = "";
        }, 2600 + Math.min(i, 8) * 150)
      );
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [branches.length]);

  const roadD = smoothPath(mainStops);

  const allStops = useMemo(() => [...mainStops, ...branches.flatMap((b) => b.stops)], [mainStops, branches]);
  const activeStop = allStops.find((s) => `${s.kind}:${s.slug}` === activeKey) ?? null;

  let tipX = 0;
  let tipY = 0;
  if (activeStop) {
    const nearRight = activeStop.x > SHEET_W - TOOLTIP_W - 80;
    tipX = nearRight ? activeStop.x - TOOLTIP_W - 20 : activeStop.x + 46;
    tipX = Math.max(10, Math.min(tipX, SHEET_W - TOOLTIP_W - 10));

    const spaceBelow = SHEET_H - activeStop.y - 40;
    tipY = spaceBelow > TOOLTIP_H + 20 ? activeStop.y + 40 : activeStop.y - TOOLTIP_H - 30;
    tipY = Math.max(10, Math.min(tipY, SHEET_H - TOOLTIP_H - 10));
  }

  let spurIndex = 0;

  function renderStop(stop: Stop, idx: number, radius: number, iconScale: number) {
    const key = `${stop.kind}:${stop.slug}`;
    const isActive = activeKey === key;
    const labelLines = wrapLabel(stop.label, stop.labelWordsPerLine);
    const classNames = [
      styles.stop,
      stop.kind === "branch" ? styles.branch : "",
      isActive ? styles.active : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <g key={key} transform={`translate(${stop.x},${stop.y})`}>
        <Link
          href={stop.href}
          className={classNames}
          style={{ "--i": idx } as CSSProperties}
          onMouseEnter={() => setActiveKey(key)}
          onMouseLeave={() => setActiveKey((k) => (k === key ? null : k))}
          onFocus={() => setActiveKey(key)}
          onBlur={() => setActiveKey((k) => (k === key ? null : k))}
          aria-label={
            stop.kind === "main"
              ? `Lesson ${stop.n}: ${stop.title}`
              : `${stop.branchLabel} branch, lesson ${stop.n} of ${stop.total}: ${stop.title}`
          }
        >
          <circle className={styles.badge} r={radius} />
          <StopIcon name={stop.icon} scale={iconScale} />
          {stop.kind === "main" && (
            <>
              <circle className={styles.numBg} cx={24} cy={-24} r={12} />
              <text className={styles.num} x={24} y={-19.5} textAnchor="middle">
                {stop.n}
              </text>
            </>
          )}
          <text className={styles.title} x={0} y={radius + 18} textAnchor="middle">
            {labelLines.map((line, i) => (
              <tspan key={i} x={0} dy={i === 0 ? 0 : 16}>
                {line}
              </tspan>
            ))}
          </text>
          <circle className={styles.hit} r={radius + 8} />
        </Link>
      </g>
    );
  }

  return (
    <div className={styles.sheetScroll} id="sheetScroll">
      <svg
        viewBox={`0 0 ${SHEET_W} ${SHEET_H}`}
        role="img"
        aria-label="The Learning Blueprint: a winding road connecting all 22 main lessons, grouped into four tiers from orientation basics to advanced practice, with 8 themed branches running their own short side roads out to 17 more lessons."
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

        {branches.map((branch) => {
          const i = spurIndex++;
          return (
            <g key={branch.id}>
              <path
                ref={(el) => {
                  spurRefs.current[i] = el;
                }}
                className={styles.spur}
                d={branch.spurD}
              />
              <circle className={styles.trailheadDot} cx={branch.trailhead.x} cy={branch.trailhead.y} r={5} />
              <circle
                className={styles.trailheadRing}
                cx={branch.trailhead.x}
                cy={branch.trailhead.y}
                r={9}
                fill="none"
              />
              <text className={styles.branchLabel} x={branch.labelX} y={branch.labelY} textAnchor="middle">
                {branch.label}
              </text>
            </g>
          );
        })}

        <g className={styles.titleblock} transform="translate(30,24)">
          <rect x={0} y={0} width={252} height={74} strokeWidth={1.5} />
          {[
            ["PROJECT", "HardHatU Learning Path"],
            ["STOPS", `${allStops.length} lessons`],
          ].map(([label, value], i) => {
            const ry = 24 + i * 36;
            return (
              <g key={label}>
                <text className={styles.tbLabel} x={12} y={ry - 11}>
                  {label}
                </text>
                <text x={12} y={ry + 5}>
                  {value}
                </text>
                {i < 1 && <line x1={0} y1={ry + 16} x2={252} y2={ry + 16} />}
              </g>
            );
          })}
        </g>

        {mainStops.map((stop, idx) => renderStop(stop, idx, MAIN_BADGE_R, 1.25))}

        {branches.map((branch) =>
          branch.stops.map((stop, idx) => renderStop(stop, idx, BRANCH_BADGE_R, 0.88))
        )}

        {activeStop && (
          <foreignObject
            width={TOOLTIP_W}
            height={TOOLTIP_H}
            x={tipX}
            y={tipY}
            style={{ pointerEvents: "none" }}
          >
            <div className={styles.tooltipCard}>
              <div className={styles.ttTier}>
                {activeStop.kind === "main"
                  ? `Tier ${activeStop.tier} · Lesson ${activeStop.n} of ${activeStop.total}`
                  : `${activeStop.branchLabel} branch · ${activeStop.n} of ${activeStop.total}`}
              </div>
              <h3>{activeStop.title}</h3>
              <div>{activeStop.teaser}</div>
              <span className={styles.ttMinutes}>{activeStop.minutes} min read</span>
            </div>
          </foreignObject>
        )}
      </svg>
    </div>
  );
}
