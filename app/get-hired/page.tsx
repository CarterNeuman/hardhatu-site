import Link from "next/link";
import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { urlFor } from "@/lib/content-client";
import { CAREER_CATEGORY_ORDER } from "@/lib/types";
import type { GetHired } from "@/lib/types";
import { HomeReveal } from "@/components/HomeReveal";

export const metadata: Metadata = {
  title: "How to Actually Get Hired",
  description:
    "A real step-by-step checklist for getting hired in construction, one guide per career umbrella, covering how hiring actually works, where to actually look, and what to do today.",
};

export default function GetHiredIndexPage() {
  const { getHiredGuides } = getAllContent();
  const generalGuide = getHiredGuides.find((g) => g.id === "gethired-general");
  const categoryGuides = getHiredGuides.filter((g) => g.id !== "gethired-general");
  const ordered = [...categoryGuides].sort(
    (a, b) => CAREER_CATEGORY_ORDER.indexOf(a.category) - CAREER_CATEGORY_ORDER.indexOf(b.category)
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-5xl font-bold text-ink">How to Actually Get Hired</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-steel">
        Getting hired in construction doesn&rsquo;t look the same everywhere. A trade apprenticeship,
        an office role, and a licensed profession all hire through different channels. Pick your
        door below for a real, specific checklist instead of generic job-search advice.
      </p>

      {generalGuide && (
        <div className="mt-10">
          <EntranceGate guide={generalGuide} />
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ordered.map((guide, i) => (
          <CategoryGate key={guide.id} guide={guide} index={i} />
        ))}
      </div>
    </div>
  );
}

// The general guide rendered as one big, wide gate up top: the "pick this
// one first if you're not sure" entrance, before the 8 specific doors
// below it. Full-width, dark, and the largest single element on the page
// on purpose -- it's the one guide every visitor should at least glance
// at regardless of which of the 8 paths they end up choosing.
function EntranceGate({ guide }: { guide: GetHired }) {
  return (
    <HomeReveal>
      <Link
        href={urlFor(guide)}
        className="group flex flex-col gap-4 rounded-t-[48px] border-2 border-amber bg-navy px-8 py-10 text-paper transition-colors hover:border-amber-soft sm:flex-row sm:items-center sm:justify-between sm:gap-10"
      >
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber-soft">
            Start here
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl">
            {guide.category}
          </h2>
          <p className="mt-2 max-w-xl text-base leading-relaxed text-paper/80 sm:text-lg">
            {guide.tagline}
          </p>
        </div>
        <span className="shrink-0 text-sm font-bold uppercase tracking-wide text-amber-soft group-hover:underline">
          Read the groundwork &rarr;
        </span>
      </Link>
    </HomeReveal>
  );
}

// One of the 8 career-umbrella doors. Deliberately plain: a big icon, a
// big name, one short line, and a "walk through" prompt -- no diagram
// math, no connectors, just a large, legible tile. The rounded arch top
// is the one visual nod to "a door you walk through," kept to a single
// border-radius rather than anything more literal.
function CategoryGate({ guide, index }: { guide: GetHired; index: number }) {
  const Icon = CATEGORY_ICONS[guide.category] ?? CategoryIconHands;
  const blurb = CATEGORY_BLURBS[guide.category] ?? guide.tagline;
  const isAmber = index % 2 === 0;

  return (
    <HomeReveal delayMs={100 + index * 70}>
      <Link
        href={urlFor(guide)}
        className="group flex h-full flex-col items-center gap-4 rounded-t-[32px] border border-hairline bg-white/40 px-6 pb-7 pt-9 text-center transition-colors hover:border-navy hover:bg-white/70"
      >
        <span
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 ${
            isAmber ? "border-amber bg-amber-soft/40" : "border-navy bg-navy/5"
          }`}
        >
          <Icon className={isAmber ? "text-clay" : "text-navy"} size={30} />
        </span>
        <div className="flex-1">
          <h3 className="font-display text-xl font-bold leading-snug text-ink group-hover:text-navy">
            {guide.category}
          </h3>
          <p className="mt-2 text-sm leading-snug text-steel">{blurb}</p>
        </div>
        <span className="text-xs font-bold uppercase tracking-wide text-navy">
          Walk through &rarr;
        </span>
      </Link>
    </HomeReveal>
  );
}

// Short, hand-written lines for the entrance and the 8 doors -- purpose-
// built to actually fit and read cleanly here, rather than a truncated
// slice of the guide's full tagline (which still shows in full on the
// guide's own page; these are a separate, catchier blurb just for this
// index).
const CATEGORY_BLURBS: Record<string, string> = {
  "Field & Trades": "Union or open shop — two real doors into the trades.",
  "Project & Operations": "80% of firms can't fill these roles fast enough.",
  "Preconstruction & Estimating": "One of the industry's hardest roles to fill in 2026.",
  Business: "The back office is aging out — and hiring fast.",
  "Technology & Design": "Hired on proof, not pedigree.",
  "Specialized Construction": "Solar and disaster restoration are booming right now.",
  "Insurance & Claims": "Licensed, storm-ready adjusters are in real demand.",
  "Consultants & Advisory": "A booming field, but you need a track record first.",
};

// Thin-stroke icons, one per career umbrella, same visual language as the
// homepage's PathIcon* set (1.6px strokes, currentColor, rounded caps/
// joins) — kept local to this page since they're specific to these eight
// categories rather than a reusable content-type icon.
type IconProps = { className?: string; size?: number };

function iconSvgProps(size: number) {
  return {
    width: size,
    height: size,
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

function CategoryIconHands({ className, size = 18 }: IconProps) {
  return (
    <svg {...iconSvgProps(size)} className={className}>
      <path d="M14.5 3.5l6 6-2 2-6-6 2-2z" />
      <path d="M12.5 5.5l-8 8v3h3l8-8" />
      <path d="M3 20.5h6" />
    </svg>
  );
}

function CategoryIconOrg({ className, size = 18 }: IconProps) {
  return (
    <svg {...iconSvgProps(size)} className={className}>
      <circle cx="12" cy="8" r="3" />
      <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
      <path d="M3 8.5l2 1M21 8.5l-2 1" />
    </svg>
  );
}

function CategoryIconScale({ className, size = 18 }: IconProps) {
  return (
    <svg {...iconSvgProps(size)} className={className}>
      <path d="M4 19L12 5l8 14z" />
      <path d="M8 19v-6M12 19V9M16 19v-4" />
    </svg>
  );
}

function CategoryIconBriefcase({ className, size = 18 }: IconProps) {
  return (
    <svg {...iconSvgProps(size)} className={className}>
      <rect x="3.5" y="8" width="17" height="11" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3.5 13h17" />
    </svg>
  );
}

function CategoryIconMonitor({ className, size = 18 }: IconProps) {
  return (
    <svg {...iconSvgProps(size)} className={className}>
      <rect x="3.5" y="4" width="17" height="12" />
      <path d="M8 20h8M12 16v4" />
      <path d="M7 8.5l2.5 2.5L7 13.5M13 13.5h4" />
    </svg>
  );
}

function CategoryIconGear({ className, size = 18 }: IconProps) {
  return (
    <svg {...iconSvgProps(size)} className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </svg>
  );
}

function CategoryIconShield({ className, size = 18 }: IconProps) {
  return (
    <svg {...iconSvgProps(size)} className={className}>
      <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function CategoryIconCompass({ className, size = 18 }: IconProps) {
  return (
    <svg {...iconSvgProps(size)} className={className}>
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
