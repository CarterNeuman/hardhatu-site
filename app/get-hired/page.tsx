import Link from "next/link";
import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { urlFor } from "@/lib/content-client";
import { CAREER_CATEGORY_ORDER } from "@/lib/types";
import type { GetHired } from "@/lib/types";
import { ContentCard } from "@/components/ContentCard";

export const metadata: Metadata = {
  title: "How to Actually Get Hired",
  description:
    "A real step-by-step checklist for getting hired in construction, one guide per career umbrella, covering how hiring actually works, where to actually look, and what to do today.",
};

// ---------------------------------------------------------------------------
// Hub-and-spoke diagram geometry (desktop/xl+ only — see the plain grid
// fallback below for everything narrower). The general guide (gethired-
// general) sits in the center; the 8 category guides sit in a ring around
// it at 45-degree intervals, joined by steel I-beam connectors. All the
// pixel math below is just trigonometry around one center point (CX, CY) —
// change R/NODE_W/NODE_H/HUB_SIZE and everything else follows.
// ---------------------------------------------------------------------------
const R = 420; // center-to-node-center radius
const NODE_W = 212;
const NODE_H = 180;
const HUB_SIZE = 300;
const BEAM_START_R = 160; // just outside the hub's edge
const BEAM_END_R = 325; // short of the node card, so the beam doesn't run under it
const BEAM_WIDTH = 18;
const BEAM_OUTLINE_WIDTH = BEAM_WIDTH + 2;
const HIGHLIGHT_WIDTH = 6;
const FLANGE_LENGTH = 34;
const FLANGE_THICKNESS = 6;
const DIAGRAM_MARGIN = 20;

// Colors mirror tailwind.config.ts's navy/amber-soft tokens. Inline <div>
// beams can't reference Tailwind's color tokens directly (no `bg-navy` on a
// computed rotated element), so the hexes are repeated here deliberately.
const BEAM_NAVY = "#1F3F52";
const BEAM_NAVY_OUTLINE = "#162C3A"; // a touch darker than navy, for contrast against the paper background
const BEAM_AMBER_SOFT = "#F1E1BC";

// An octagon via corner-cut percentages of a square box — used for both the
// hub's clip-path and the small bolt dots marking its 8 vertices.
const OCTAGON_CLIP = "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";
const OCTAGON_VERTEX_PCT: [number, number][] = [
  [30, 0],
  [70, 0],
  [100, 30],
  [100, 70],
  [70, 100],
  [30, 100],
  [0, 70],
  [0, 30],
];

type Point = { x: number; y: number };

type NodeGeometry = {
  category: string;
  left: number;
  top: number;
  beamStart: Point;
  beamEnd: Point;
  beamAngleDeg: number;
  beamLength: number;
  perp: Point; // unit vector perpendicular to the beam, used for the flange caps and the highlight offset
};

function buildNodeGeometry(cx: number, cy: number): NodeGeometry[] {
  return CAREER_CATEGORY_ORDER.map((category, i) => {
    // -90deg starts at the top, then clockwise every 45deg around the ring.
    const angleDeg = -90 + 45 * i;
    const angleRad = (angleDeg * Math.PI) / 180;
    const dirX = Math.cos(angleRad);
    const dirY = Math.sin(angleRad);
    const perp: Point = { x: -dirY, y: dirX };
    const nodeCenter: Point = { x: cx + R * dirX, y: cy + R * dirY };
    const beamStart: Point = { x: cx + BEAM_START_R * dirX, y: cy + BEAM_START_R * dirY };
    const beamEnd: Point = { x: cx + BEAM_END_R * dirX, y: cy + BEAM_END_R * dirY };
    const beamLength = Math.hypot(beamEnd.x - beamStart.x, beamEnd.y - beamStart.y);
    const beamAngleDeg = (Math.atan2(beamEnd.y - beamStart.y, beamEnd.x - beamStart.x) * 180) / Math.PI;
    return {
      category,
      left: nodeCenter.x - NODE_W / 2,
      top: nodeCenter.y - NODE_H / 2,
      beamStart,
      beamEnd,
      beamAngleDeg,
      beamLength,
      perp,
    };
  });
}

// Bounding box: the furthest any node card edge reaches from the center,
// plus a fixed margin, on each axis — computed once so CX/CY/DIAGRAM_W/H
// stay correct if the constants above ever change.
function computeDiagramBounds() {
  const probe = buildNodeGeometry(0, 0);
  let minX = 0;
  let maxX = 0;
  let minY = 0;
  let maxY = 0;
  for (const n of probe) {
    minX = Math.min(minX, n.left);
    maxX = Math.max(maxX, n.left + NODE_W);
    minY = Math.min(minY, n.top);
    maxY = Math.max(maxY, n.top + NODE_H);
  }
  const width = maxX - minX + DIAGRAM_MARGIN * 2;
  const height = maxY - minY + DIAGRAM_MARGIN * 2;
  const cx = -minX + DIAGRAM_MARGIN;
  const cy = -minY + DIAGRAM_MARGIN;
  return { width, height, cx, cy };
}

const DIAGRAM = computeDiagramBounds();
const NODE_GEOMETRY = buildNodeGeometry(DIAGRAM.cx, DIAGRAM.cy);

export default function GetHiredIndexPage() {
  const { getHiredGuides } = getAllContent();
  const generalGuide = getHiredGuides.find((g) => g.id === "gethired-general");
  const categoryGuides = getHiredGuides.filter((g) => g.id !== "gethired-general");
  const ordered = [...categoryGuides].sort(
    (a, b) => CAREER_CATEGORY_ORDER.indexOf(a.category) - CAREER_CATEGORY_ORDER.indexOf(b.category)
  );
  const byCategory = new Map(ordered.map((g) => [g.category, g]));

  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <h1 className="font-display text-4xl font-bold text-ink">How to Actually Get Hired</h1>
        <p className="mt-3 max-w-2xl text-steel">
          Getting hired in construction doesn't look the same everywhere. A trade apprenticeship,
          an office role, and a licensed profession all hire through different channels. Pick your
          umbrella below for a real, specific checklist instead of generic job-search advice.
        </p>
      </div>

      {/* Desktop/xl+: the hub-and-spoke diagram. Below xl there isn't room for
          eight satellite cards and the text stays legible, so it's replaced
          entirely by the plain grid further down. */}
      {generalGuide && (
        <div className="mx-auto mt-10 hidden max-w-[1180px] px-6 xl:block">
          <div className="relative mx-auto" style={{ width: DIAGRAM.width, height: DIAGRAM.height }}>
            {NODE_GEOMETRY.map((geometry) => (
              <Beam key={geometry.category} geometry={geometry} />
            ))}
            <HubCard guide={generalGuide} />
            {NODE_GEOMETRY.map((geometry, i) => {
              const guide = byCategory.get(geometry.category);
              if (!guide) return null;
              return <CategoryNode key={geometry.category} geometry={geometry} guide={guide} index={i} />;
            })}
          </div>
        </div>
      )}

      {/* Below xl: the same guides as a plain responsive grid. */}
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-8 xl:hidden">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {generalGuide && (
            <div className="sm:col-span-2 lg:col-span-3">
              <ContentCard
                item={generalGuide}
                description={generalGuide.comingSoon ? "Coming soon." : generalGuide.tagline}
                badge={
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-amber">
                    Start here
                  </span>
                }
              />
            </div>
          )}
          {ordered.map((guide) => (
            <ContentCard
              key={guide.id}
              item={guide}
              description={guide.comingSoon ? "Coming soon." : guide.tagline}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// A single straight steel-beam segment, drawn as a plain rotated <div> (not
// an svg): width = its length, height = its thickness, rotated around its
// left-center origin so (x, y) is exactly where the beam starts. Four of
// these per spoke — a dark outline, the navy web, an amber-soft highlight
// stripe along one edge, and two perpendicular flange caps — are what reads
// as a wide-flange I-beam rather than a plain line.
function Bar({
  x,
  y,
  length,
  thickness,
  angleDeg,
  color,
}: {
  x: number;
  y: number;
  length: number;
  thickness: number;
  angleDeg: number;
  color: string;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: x,
        top: y - thickness / 2,
        width: length,
        height: thickness,
        background: color,
        transform: `rotate(${angleDeg}deg)`,
        transformOrigin: "0 50%",
      }}
    />
  );
}

function Beam({ geometry }: { geometry: NodeGeometry }) {
  const { beamStart, beamEnd, beamAngleDeg, beamLength, perp } = geometry;
  // The highlight stripe sits along one edge of the beam (always the same
  // side, so every spoke reads as lit from the same direction) rather than
  // down the centerline.
  const highlightOffset = BEAM_WIDTH / 2 - HIGHLIGHT_WIDTH / 2 + 1;
  const highlightStart: Point = {
    x: beamStart.x - highlightOffset * perp.x,
    y: beamStart.y - highlightOffset * perp.y,
  };
  const flangeAngleDeg = (Math.atan2(perp.y, perp.x) * 180) / Math.PI;

  return (
    <>
      <Bar x={beamStart.x} y={beamStart.y} length={beamLength} thickness={BEAM_OUTLINE_WIDTH} angleDeg={beamAngleDeg} color={BEAM_NAVY_OUTLINE} />
      <Bar x={beamStart.x} y={beamStart.y} length={beamLength} thickness={BEAM_WIDTH} angleDeg={beamAngleDeg} color={BEAM_NAVY} />
      <Bar x={highlightStart.x} y={highlightStart.y} length={beamLength} thickness={HIGHLIGHT_WIDTH} angleDeg={beamAngleDeg} color={BEAM_AMBER_SOFT} />
      {[beamStart, beamEnd].map((point, i) => (
        <Bar
          key={i}
          x={point.x - (perp.x * FLANGE_LENGTH) / 2}
          y={point.y - (perp.y * FLANGE_LENGTH) / 2}
          length={FLANGE_LENGTH}
          thickness={FLANGE_THICKNESS}
          angleDeg={flangeAngleDeg}
          color={BEAM_NAVY}
        />
      ))}
    </>
  );
}

function HubCard({ guide }: { guide: GetHired }) {
  return (
    <Link
      href={urlFor(guide)}
      className="group absolute flex items-center justify-center border-2 border-amber bg-navy text-center transition-colors hover:border-amber-soft"
      style={{
        left: DIAGRAM.cx - HUB_SIZE / 2,
        top: DIAGRAM.cy - HUB_SIZE / 2,
        width: HUB_SIZE,
        height: HUB_SIZE,
        clipPath: OCTAGON_CLIP,
      }}
    >
      <div className="flex w-[196px] flex-col items-center gap-2.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-soft">Start here</span>
        <span className="font-display text-xl font-bold leading-tight text-paper">{guide.category}</span>
        <span className="text-xs leading-snug text-amber-soft/85">{guide.tagline}</span>
        <span className="mt-0.5 text-xs font-bold uppercase tracking-wide text-amber-soft group-hover:underline">
          View the guide &rarr;
        </span>
      </div>
      {OCTAGON_VERTEX_PCT.map(([px, py], i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute h-[9px] w-[9px] rounded-full bg-amber-soft"
          style={{ left: `calc(${px}% - 4.5px)`, top: `calc(${py}% - 4.5px)` }}
        />
      ))}
    </Link>
  );
}

function CategoryNode({
  geometry,
  guide,
  index,
}: {
  geometry: NodeGeometry;
  guide: GetHired;
  index: number;
}) {
  const Icon = CATEGORY_ICONS[guide.category] ?? CategoryIconHands;
  const accentClass = index % 2 === 0 ? "border-t-amber" : "border-t-navy";
  const dotClass = index % 2 === 0 ? "bg-amber" : "bg-navy";

  return (
    <Link
      href={urlFor(guide)}
      className={`group absolute flex flex-col gap-2 border border-hairline bg-white/40 p-4 pt-[18px] transition-colors hover:border-navy hover:bg-white/70 ${accentClass}`}
      style={{ left: geometry.left, top: geometry.top, width: NODE_W, height: NODE_H, borderTopWidth: 3 }}
    >
      <span aria-hidden="true" className={`absolute left-2.5 top-2.5 h-[6px] w-[6px] rounded-full ${dotClass}`} />
      <div className="flex items-start justify-between">
        <Icon className="text-clay" />
        <span className="text-[10px] text-steel">0{index + 1}</span>
      </div>
      <h3 className="font-display text-base font-bold leading-snug text-ink group-hover:text-navy">
        {guide.category}
      </h3>
      <p className="line-clamp-2 flex-1 text-xs leading-snug text-steel">{guide.tagline}</p>
      <span className="text-[11px] font-bold uppercase tracking-wide text-navy">View guide &rarr;</span>
    </Link>
  );
}

// Thin-stroke icons, one per career umbrella, same visual language as the
// homepage's PathIcon* set (1.6px strokes, currentColor, rounded caps/
// joins) — kept local to this page since they're specific to these eight
// categories rather than a reusable content-type icon.
type IconProps = { className?: string };

function iconSvgProps() {
  return {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
  };
}

function CategoryIconHands({ className }: IconProps) {
  return (
    <svg {...iconSvgProps()} className={className}>
      <path d="M14.5 3.5l6 6-2 2-6-6 2-2z" />
      <path d="M12.5 5.5l-8 8v3h3l8-8" />
      <path d="M3 20.5h6" />
    </svg>
  );
}

function CategoryIconOrg({ className }: IconProps) {
  return (
    <svg {...iconSvgProps()} className={className}>
      <circle cx="12" cy="8" r="3" />
      <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
      <path d="M3 8.5l2 1M21 8.5l-2 1" />
    </svg>
  );
}

function CategoryIconScale({ className }: IconProps) {
  return (
    <svg {...iconSvgProps()} className={className}>
      <path d="M4 19L12 5l8 14z" />
      <path d="M8 19v-6M12 19V9M16 19v-4" />
    </svg>
  );
}

function CategoryIconBriefcase({ className }: IconProps) {
  return (
    <svg {...iconSvgProps()} className={className}>
      <rect x="3.5" y="8" width="17" height="11" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3.5 13h17" />
    </svg>
  );
}

function CategoryIconMonitor({ className }: IconProps) {
  return (
    <svg {...iconSvgProps()} className={className}>
      <rect x="3.5" y="4" width="17" height="12" />
      <path d="M8 20h8M12 16v4" />
      <path d="M7 8.5l2.5 2.5L7 13.5M13 13.5h4" />
    </svg>
  );
}

function CategoryIconGear({ className }: IconProps) {
  return (
    <svg {...iconSvgProps()} className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </svg>
  );
}

function CategoryIconShield({ className }: IconProps) {
  return (
    <svg {...iconSvgProps()} className={className}>
      <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function CategoryIconCompass({ className }: IconProps) {
  return (
    <svg {...iconSvgProps()} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.8 9.2l-2 4.6-4.6 2 2-4.6z" />
    </svg>
  );
}

const CATEGORY_ICONS: Record<string, (props: IconProps) => React.ReactElement> = {
  "Field & Trades": CategoryIconHands,
  "Project & Operations": CategoryIconOrg,
  "Preconstruction & Estimating": CategoryIconScale,
  Business: CategoryIconBriefcase,
  "Technology & Design": CategoryIconMonitor,
  "Specialized Construction": CategoryIconGear,
  "Insurance & Claims": CategoryIconShield,
  "Consultants & Advisory": CategoryIconCompass,
};
