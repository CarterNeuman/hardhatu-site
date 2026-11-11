"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
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

const SHEET_W = 900;
const SHEET_H = 2030;
// A handful of branch stops (the ones in the outer-most columns) have
// titles long enough that their wrapped text ran right up to -- a couple
// past -- the drafting border and the sheet's own edge at the old
// SHEET_W. Rather than re-run the coordinate generator (which would move
// every stop), this adds blank margin on both sides of the drawing: the
// background/grid/border now span the wider SIDE_MARGIN-padded canvas,
// while every stop keeps its exact authored x/y from lessons-blueprint-data.ts
// and is just drawn inside a group shifted right by SIDE_MARGIN, so the
// whole picture sits centered with real breathing room on both edges.
const SIDE_MARGIN = 48;
const CANVAS_W = SHEET_W + SIDE_MARGIN * 2;
const TOOLTIP_W = 252;
const TOOLTIP_H = 190;
const MAIN_BADGE_R = 31.875; // 42.5 decreased 25%, per request -- branch badges (BRANCH_BADGE_R) are untouched
const BRANCH_BADGE_R = 30;

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

function StopIcon({ name, scale = 1.5625 }: { name: keyof typeof BLUEPRINT_ICONS; scale?: number }) {
  const t = -12 * scale;
  return (
    <g
      className={styles.icon}
      transform={`translate(${t},${t}) scale(${scale})`}
      dangerouslySetInnerHTML={{ __html: BLUEPRINT_ICONS[name] }}
    />
  );
}

// Only what the road draws -- the lessons page used to pass every
// lesson's full text into this client component.
export type BlueprintLesson = Pick<Lesson, "slug" | "title" | "minutes">;

export function LessonsBlueprint({ lessons }: { lessons: BlueprintLesson[] }) {
  const bySlug = useMemo(() => new Map(lessons.map((l) => [l.slug, l])), [lessons]);

  // Which lesson slugs are already marked complete, so each stop's icon
  // on the road can show it (2026-11-10) -- same /api/progress GET
  // LessonCompletionProvider uses on a lesson's own page, just read
  // here for every lesson at once instead of one at a time. Signed-out
  // visitors never see a completed stop (completedSlugs stays empty),
  // same fail-closed behavior as the rest of the progress features.
  const { isLoaded, isSignedIn } = useUser();
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    let cancelled = false;
    fetch("/api/progress")
      .then((res) => res.json())
      .then((data: { ok?: boolean; progress?: { contentType: string; contentId: string }[] }) => {
        if (cancelled || !data?.ok) return;
        const slugs = (data.progress ?? [])
          .filter((row) => row.contentType === "lesson")
          .map((row) => row.contentId);
        setCompletedSlugs(new Set(slugs));
      })
      .catch(() => {
        // Network hiccup: the road just shows nothing as completed
        // rather than blocking on a retry loop.
      });
    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn]);

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
      // The road runs top-to-bottom now, so a branch's own stops are
      // ordered by y (how far along the branch they sit) rather than x
      // (the old along-shelf axis), or the spur would zigzag between
      // them instead of drawing a single path through in sequence.
      const byProgress = [...stops].sort((a, b) => a.y - b.y);
      const spurD = smoothPath([
        { x: attach.x, y: attach.y },
        branch.trailhead,
        ...byProgress.map((s) => ({ x: s.x, y: s.y })),
      ]);
      const ys = stops.map((s) => s.y);
      const xs = stops.map((s) => s.x);
      // The road now runs top-to-bottom, so each branch's own lessons
      // stack vertically beside it rather than sitting in a horizontal
      // row. A label centered among them (like the old above/below
      // placement) would land right on top of one of their title
      // texts, so instead it sits like a small trailhead sign: centered
      // over the branch's stops left-to-right, just above the topmost
      // one, clear of every stop's badge and title underneath it.
      const labelX = (Math.min(...xs) + Math.max(...xs)) / 2;
      const labelY = Math.min(...ys) - 60;
      return { ...branch, attach, stops, spurD, labelX, labelY };
    }).filter((b): b is Branch => b !== null);
  }, [mainBySlug, bySlug]);

  const [activeKey, setActiveKey] = useState<string | null>(null);
  const roadRef = useRef<SVGPathElement>(null);
  const spurRefs = useRef<(SVGPathElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // The road runs top-to-bottom, so scrolling straight down from the top
  // already starts at lesson 1 — nothing special needed there. The sheet
  // now scales to the container's own width (see the CSS), so there's no
  // horizontal scroll to center: every switchback and branch is already
  // on screen at the current scroll position, just narrower or wider.

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
    const isCompleted = completedSlugs.has(stop.slug);
    const labelLines = wrapLabel(stop.label, stop.labelWordsPerLine);
    const classNames = [
      styles.stop,
      stop.kind === "branch" ? styles.branch : "",
      isActive ? styles.active : "",
      isCompleted ? styles.completed : "",
    ]
      .filter(Boolean)
      .join(" ");
    // Top-left corner of this stop's badge, same distance-from-center
    // the main stops already use for their number badge (just mirrored
    // to the opposite corner so the two never collide).
    const checkOff = radius * 0.72;
    const checkR = radius * 0.34;

    // The dotted road/spur line runs straight through where a stop's own
    // title sits (it has to pass close by on its way to the next stop),
    // so without this the dashes read as cutting through the words. This
    // backdrop — sized a little generously, same color as the sheet
    // behind it — blanks that one small patch, leaving the dashes visibly
    // running up to the title and picking up again after it, the way a
    // trail marker's label breaks a dashed line on a map.
    const titleFontPx = stop.kind === "main" ? 16 : 13;
    const longestLine = Math.max(...labelLines.map((l) => l.length));
    const backdropW = longestLine * titleFontPx * 0.62 + 14;
    const backdropTop = radius + 22 - titleFontPx * 0.75 - 4;
    const backdropH =
      (labelLines.length - 1) * 18 + titleFontPx * 1.5 + 8;

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
            (stop.kind === "main"
              ? `Lesson ${stop.n}: ${stop.title}`
              : `${stop.branchLabel} branch, lesson ${stop.n} of ${stop.total}: ${stop.title}`) +
            (isCompleted ? " (completed)" : "")
          }
        >
          <circle className={styles.badge} r={radius} />
          <StopIcon name={stop.icon} scale={iconScale} />
          {stop.kind === "main" && (
            <>
              <circle className={styles.numBg} cx={22.5} cy={-22.5} r={11.25} />
              <text className={styles.num} x={22.5} y={-18.3} textAnchor="middle">
                {stop.n}
              </text>
            </>
          )}
          {isCompleted && (
            <g className={styles.completeBadge}>
              <circle className={styles.completeMark} cx={-checkOff} cy={-checkOff} r={checkR} />
              <path
                className={styles.completeCheck}
                d={`M ${-checkOff - checkR * 0.5} ${-checkOff} L ${-checkOff - checkR * 0.1} ${-checkOff + checkR * 0.45} L ${-checkOff + checkR * 0.55} ${-checkOff - checkR * 0.55}`}
                fill="none"
              />
            </g>
          )}
          <rect
            className={styles.titleBackdrop}
            x={-backdropW / 2}
            y={backdropTop}
            width={backdropW}
            height={backdropH}
            pointerEvents="none"
          />
          <text className={styles.title} x={0} y={radius + 22} textAnchor="middle">
            {labelLines.map((line, i) => (
              <tspan key={i} x={0} dy={i === 0 ? 0 : 18}>
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
    <div className={styles.sheetScroll} id="sheetScroll" ref={scrollRef}>
      <svg
        viewBox={`0 0 ${CANVAS_W} ${SHEET_H}`}
        role="img"
        aria-label="The Learning Blueprint: a winding road connecting all 22 main lessons, grouped into four tiers from orientation basics to advanced practice, with 8 themed branches running their own short side roads out to 17 more lessons."
      >
        <defs>
          <pattern id="hhu-grid" width={40} height={40} patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="rgba(207,232,242,.06)" strokeWidth={1} />
          </pattern>
        </defs>
        <rect x={0} y={0} width={CANVAS_W} height={SHEET_H} fill="var(--blue)" />
        <rect x={0} y={0} width={CANVAS_W} height={SHEET_H} fill="url(#hhu-grid)" />
        <rect
          x={14}
          y={14}
          width={CANVAS_W - 28}
          height={SHEET_H - 28}
          fill="none"
          stroke="var(--line-dim)"
          strokeWidth={2}
        />

        {/* Everything below is positioned using the authored coordinate
            space (0..SHEET_W), unchanged from lessons-blueprint-data.ts --
            this group just centers that whole drawing inside the wider,
            SIDE_MARGIN-padded canvas above. */}
        <g transform={`translate(${SIDE_MARGIN},0)`}>
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
            ["PROJECT", "BreakGroundU Learning Path"],
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

        {mainStops.map((stop, idx) => renderStop(stop, idx, MAIN_BADGE_R, 1.171875))}

        {branches.map((branch) =>
          branch.stops.map((stop, idx) => renderStop(stop, idx, BRANCH_BADGE_R, 1.1))
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
        </g>
      </svg>
    </div>
  );
}
