import Link from "next/link";
import { getAllContent, stripWikiLinks, urlFor } from "@/lib/content";
import { Icon } from "@/components/Icon";
import { CATEGORY_SLUG } from "@/lib/content-client";
import { SiteSearch, type SearchItem } from "@/components/SiteSearch";
import { HomeReveal } from "@/components/HomeReveal";
import { BLUEPRINT_GRID } from "@/lib/blueprint-style";

const LEARN_SECTIONS = [
  {
    href: "/concepts",
    label: "Concepts",
    kind: "concept" as const,
    blurb: "The terms people actually use on a jobsite, what they mean and why they matter.",
  },
  {
    href: "/lessons",
    label: "Lessons",
    kind: "lesson" as const,
    blurb: "Real scenarios with check-in questions along the way.",
  },
  {
    href: "/interviews",
    label: "Interview Prep",
    kind: "interview" as const,
    blurb: "General basics plus a detailed guide for every career category.",
  },
  {
    href: "/exams",
    label: "Get Qualified",
    kind: "exam" as const,
    blurb: "Independent study material for real certifications like OSHA-10 and the PMP.",
  },
];

// The hero's "what sounds most like you" tiles -- also the site's main
// category picker, so each option maps to a real CAREER_CATEGORY_ORDER
// bucket via CATEGORY_SLUG and jumps straight into content that already
// exists, rather than needing its own taxonomy. Previously a separate
// "Choose your path" section further down the page; moved into the hero
// itself (mockup B direction, chat 2026-11-11) so answering it is the
// page's first move, not its fourth.
const PATH_OPTIONS = [
  {
    label: "Working with my hands",
    blurb:
      "Framing, wiring, pouring concrete, running equipment, being the reason something exists that wasn't there yesterday.",
    goesTo: "Field & Trades",
    href: `/careers#${CATEGORY_SLUG["Field & Trades"]}`,
    icon: PathIconHands,
  },
  {
    label: "Running the job",
    blurb: "Schedules, budgets, crews, and making sure a hundred moving pieces land on the same day.",
    goesTo: "Project & Operations",
    href: `/careers#${CATEGORY_SLUG["Project & Operations"]}`,
    icon: PathIconOrg,
  },
  {
    label: "Numbers and planning",
    blurb: "Bids, budgets, payments, and the deals that decide who gets hired and who gets paid what.",
    goesTo: "Business & Estimating",
    href: `/careers#${CATEGORY_SLUG["Business"]}`,
    icon: PathIconLedger,
  },
  {
    label: "Tech and design",
    blurb: "3D models, drones, and software that catches problems before they cost anyone real money.",
    goesTo: "Technology & Design",
    href: `/careers#${CATEGORY_SLUG["Technology & Design"]}`,
    icon: PathIconMonitor,
  },
];

// The three-step "how it works" band, each paired with a real photo and
// alternating sides as you scroll (the "format changes" effect, chat
// 2026-11-11) rather than a repeating card grid. Step 1's photo is a real
// career photo already on the site (Field & Trades, the most common
// starting point); steps 2-3 use photos from the project's own photo set
// that weren't in use anywhere yet.
const HOW_IT_WORKS = [
  {
    step: "01",
    title: "See what's out there",
    body: "Construction is a lot bigger than \"the trades.\" Estimating, project management, safety, tech, insurance, design: browse real careers and see what a normal week actually looks like in each one.",
    href: "/careers",
    cta: "Browse careers",
    image: "/images/careers/electrician.jpg",
    alt: "Electrician working on jobsite wiring",
  },
  {
    step: "02",
    title: "Learn the basics",
    body: "Every career links to the terms, tools, and processes it actually touches, and those link right back. Twenty minutes here gets you more real jobsite vocabulary than most people pick up in a summer on site.",
    href: "/concepts",
    cta: "Learn the terms",
    image: "/images/homepage/step-learn.jpg",
    alt: "Construction professional reviewing blueprints",
  },
  {
    step: "03",
    title: "Get a plan",
    body: "Answer a few questions about your schedule and where you're starting from, and get a real, week-by-week plan: what to learn, which credential to chase first, and how to put yourself in front of people who are hiring.",
    href: "/action-plan",
    cta: "Build my plan",
    image: "/images/homepage/step-plan.jpg",
    alt: "Two workers reviewing plans on a jobsite",
  },
];

export default function HomePage() {
  const { careers, concepts, phases, software, lessons, exams, interviews } = getAllContent();

  // One flattened list across every real content type, for the hero's
  // sitewide search (see chat: 2026-10-16). Each type's own index page
  // already picks a short "description" field per type for its cards
  // (career -> tagline, concept -> definition, etc.); this reuses exactly
  // those same fields so a search result reads the same way its own
  // listing page already does.
  const searchItems: SearchItem[] = [
    ...careers.map((c) => ({ id: c.id, title: c.title, description: c.tagline, type: "career" as const, href: urlFor(c) })),
    ...concepts.map((c) => ({ id: c.id, title: c.title, description: c.definition, type: "concept" as const, href: urlFor(c) })),
    ...lessons.map((l) => {
      const firstParagraph =
        stripWikiLinks(l.sections[0]?.content ?? "").split(/\n\s*\n/)[0]?.trim() ?? "";
      return {
        id: l.id,
        title: l.title,
        description: `${l.minutes} min: ${firstParagraph}`,
        type: "lesson" as const,
        href: urlFor(l),
      };
    }),
    ...software.map((s) => ({ id: s.id, title: s.title, description: s.whatItIs, type: "software" as const, href: urlFor(s) })),
    ...exams.map((e) => ({ id: e.id, title: e.title, description: e.tagline, type: "exam" as const, href: urlFor(e) })),
    ...interviews.map((i) => ({ id: i.id, title: i.title, description: i.tagline, type: "interview" as const, href: urlFor(i) })),
    ...phases.map((p) => ({
      id: p.id,
      title: p.title,
      description: stripWikiLinks(p.whatHappens).slice(0, 140),
      type: "phase" as const,
      href: urlFor(p),
    })),
  ];

  return (
    <div>
      {/* ---------- hero: lead with the question, not a stat (mockup B,
          chat 2026-11-11) ---------- */}
      <section className="border-b border-hairline bg-paper">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center md:py-20">
          <p className="mb-3 flex items-center justify-center gap-2.5 text-xs font-semibold uppercase tracking-wide text-navy">
            <span aria-hidden="true" className="h-px w-5 bg-navy" />
            Construction careers, explained
            <span aria-hidden="true" className="h-px w-5 bg-navy" />
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.08] text-ink md:text-5xl">
            Looking for work that's actually hiring?{" "}
            <span className="text-amber">Start with one question.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[52ch] text-lg leading-relaxed text-ink">
            A lot of fields feel uncertain right now. Construction isn't one of them: the
            industry is actively trying to hire, and there's a real path in whether you're
            starting from zero or already have your hands dirty.
          </p>
        </div>
        <div className="mx-auto max-w-5xl px-6 pb-14 md:pb-20">
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wide text-steel">
            What sounds most like you?
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PATH_OPTIONS.map((option) => {
              const PathIcon = option.icon;
              return (
                <Link
                  key={option.goesTo}
                  href={option.href}
                  className="group flex flex-col gap-2.5 border border-hairline border-t-2 border-t-amber bg-white/40 p-4 text-left transition-colors hover:border-navy hover:border-t-navy hover:bg-white/70"
                >
                  <PathIcon className="text-clay" />
                  <h3 className="font-display text-base font-semibold text-ink group-hover:text-navy">
                    {option.label}
                  </h3>
                  <p className="text-xs leading-snug text-steel">{option.blurb}</p>
                  <span className="mt-auto text-xs font-semibold uppercase tracking-wide text-navy">
                    {option.goesTo} →
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/quizzes/find-your-career" className="font-semibold text-navy hover:underline">
              Prefer a few quick questions? Take the career quiz →
            </Link>
          </div>
          <div className="mx-auto mt-5 max-w-md">
            <SiteSearch items={searchItems} />
          </div>
        </div>
      </section>

      {/* ---------- full-bleed photo + stat band: the hook, in one
          number ---------- */}
      <HomeReveal as="section" className="relative overflow-hidden">
        <div className="relative h-[280px] w-full sm:h-[340px] md:h-[400px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/homepage/stat-band.jpg"
            alt="Construction crew standing on a reinforced concrete deck under construction"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-ink/75" />
          <div className="relative mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center">
            <p className="font-display text-5xl font-bold text-amber-soft md:text-6xl">
              349,000
            </p>
            <p className="mt-2 max-w-[42ch] text-lg leading-snug text-paper md:text-xl">
              new construction workers the industry needs to hire in 2026 alone, and that
              number only grows in 2027. That's not a problem for you, that's room.
            </p>
            <p className="mt-4 text-xs text-paper/60">
              Source: Associated Builders and Contractors, 2026 workforce shortage analysis
            </p>
          </div>
        </div>
      </HomeReveal>

      {/* ---------- how it works: three steps, alternating layout as you
          scroll ---------- */}
      <section className="border-b border-hairline bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-14 md:py-16">
          <p className="mb-2 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wide text-amber">
            <span aria-hidden="true" className="h-px w-5 bg-amber" />
            How it works
          </p>
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
            From curious to hired, in three steps
          </h2>
          <div className="mt-10 flex flex-col gap-14">
            {HOW_IT_WORKS.map((item, i) => (
              <HomeReveal
                key={item.step}
                as="div"
                delayMs={i * 80}
                className={`grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-10 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden border border-hairline bg-steel/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="font-display text-sm font-bold text-amber">{item.step}</span>
                  <h3 className="mt-1 font-display text-xl font-semibold text-ink md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 max-w-[48ch] text-steel">{item.body}</p>
                  <Link
                    href={item.href}
                    className="mt-4 inline-block text-sm font-semibold text-navy hover:underline"
                  >
                    {item.cta} →
                  </Link>
                </div>
              </HomeReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- start learning ---------- */}
      <HomeReveal as="section" className="border-b border-hairline">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="font-display text-2xl font-bold text-ink">Start Learning</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LEARN_SECTIONS.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group flex flex-col gap-2.5 border border-hairline p-5 transition-colors hover:border-navy hover:bg-white/50"
              >
                <Icon kind={section.kind} size={20} className="text-amber" />
                <h3 className="font-display text-lg font-semibold text-ink group-hover:text-navy">
                  {section.label}
                </h3>
                <p className="text-sm leading-snug text-steel">{section.blurb}</p>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-steel">
            Plus {phases.length} process phase{phases.length === 1 ? "" : "s"} and{" "}
            {software.length} software profile{software.length === 1 ? "" : "s"}:{" "}
            <Link href="/phases" className="font-semibold text-navy hover:underline">
              see how a project moves
            </Link>{" "}
            or{" "}
            <Link href="/software" className="font-semibold text-navy hover:underline">
              browse the tools
            </Link>
            .
          </p>
        </div>
      </HomeReveal>

      {/* ---------- closing CTA band: same dark blueprint-grid treatment
          as the Action Plan and Get Qualified heroes, for one consistent
          "dark band" language sitewide ---------- */}
      <HomeReveal as="section" className="bg-ink text-paper" style={BLUEPRINT_GRID}>
        <div className="mx-auto max-w-3xl px-6 py-16 text-center md:py-20">
          <h2 className="font-display text-2xl font-bold text-paper md:text-3xl">
            Not sure where you'd fit? Most people aren't.
          </h2>
          <p className="mx-auto mt-3 max-w-[48ch] text-paper/75">
            Two minutes of questions is enough to point you somewhere real, and the plan
            that comes out of it pulls straight from everything on this site.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/quizzes/find-your-career"
              className="border border-amber-soft bg-amber-soft px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-paper"
            >
              Take the quiz →
            </Link>
            <Link
              href="/action-plan"
              className="border border-paper px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              Build my plan →
            </Link>
          </div>
        </div>
      </HomeReveal>

      <p className="border-t border-hairline bg-paper px-6 py-3 text-center font-mono text-[11px] text-steel">
        {careers.length} careers · {concepts.length} concepts · {lessons.length} lessons, and
        growing
      </p>
    </div>
  );
}

// Thin-stroke ("blueprint line-art") icons for the hero tiles, same visual
// language as Icon.tsx / HardHatMark: 1.6px strokes, currentColor,
// rounded caps/joins, minimal fill. Kept local to this page since they're
// specific to these four options, not a reusable content-type icon.
function PathIconHands({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M14.5 3.5l6 6-2 2-6-6 2-2z" />
      <path d="M12.5 5.5l-8 8v3h3l8-8" />
      <path d="M3 20.5h6" />
    </svg>
  );
}

function PathIconOrg({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="8" r="3" />
      <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
      <path d="M3 8.5l2 1M21 8.5l-2 1" />
    </svg>
  );
}

function PathIconLedger({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="4" y="5" width="16" height="14" rx="0" />
      <path d="M8 9h8M8 13h8M8 17h4" />
    </svg>
  );
}

function PathIconMonitor({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3.5" y="4" width="17" height="12" rx="0" />
      <path d="M8 20h8M12 16v4" />
      <path d="M7 8.5l2.5 2.5L7 13.5M13 13.5h4" />
    </svg>
  );
}
