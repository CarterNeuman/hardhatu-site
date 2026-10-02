import Link from "next/link";
import { getAllContent } from "@/lib/content";
import { Icon } from "@/components/Icon";
import { CATEGORY_SLUG } from "@/components/Header";
import { HeroSlideshow } from "@/components/HeroSlideshow";

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

// The homepage's guided alternative to a flat category list (see chat: the
// hook should inspire someone to take the next step, not just explain the
// site). Each option maps to a real CAREER_CATEGORY_ORDER bucket via
// CATEGORY_SLUG so it jumps straight into content that already exists,
// rather than needing its own taxonomy or content.
const PATH_OPTIONS = [
  {
    label: "Building things with your hands",
    blurb:
      "Framing, wiring, pouring concrete, running equipment, being the reason something exists that wasn't there yesterday.",
    goesTo: "Field & Trades",
    href: `/careers#${CATEGORY_SLUG["Field & Trades"]}`,
    icon: PathIconHands,
  },
  {
    label: "Running the job, keeping it organized",
    blurb: "Schedules, budgets, crews, and making sure a hundred moving pieces land on the same day.",
    goesTo: "Project & Operations",
    href: `/careers#${CATEGORY_SLUG["Project & Operations"]}`,
    icon: PathIconOrg,
  },
  {
    label: "Numbers, contracts, and the business side",
    blurb: "Bids, budgets, payments, and the deals that decide who gets hired and who gets paid what.",
    goesTo: "Business & Estimating",
    href: `/careers#${CATEGORY_SLUG["Business"]}`,
    icon: PathIconLedger,
  },
  {
    label: "Tech, design, and data",
    blurb: "3D models, drones, and software that catches problems before they cost anyone real money.",
    goesTo: "Technology & Design",
    href: `/careers#${CATEGORY_SLUG["Technology & Design"]}`,
    icon: PathIconMonitor,
  },
];

export default function HomePage() {
  const { careers, phases, software } = getAllContent();

  return (
    <div>
      {/* ---------- hero ---------- */}
      <section className="border-b border-hairline bg-[linear-gradient(var(--tw-gradient-stops))] from-paper to-paper bg-hero-grid">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-16">
          <div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] text-ink md:text-5xl">
              Every building you've ever stood in started with someone's first day on a
              jobsite.
            </h1>
            <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-ink">
              You already know more about construction than you think, you just don't have
              the vocabulary yet. HardHatU teaches you the real careers, the terms people actually
              use on a jobsite, and the concepts that build your foundation, so you walk in
              already speaking the language.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/quizzes/find-your-career"
                className="border border-ink bg-ink px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-navy hover:border-navy"
              >
                Find Where You'd Fit
              </Link>
              <Link
                href="/concepts"
                className="border border-ink px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                Learn the Terms
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <HeroSlideshow />
          </div>
        </div>
      </section>

      {/* ---------- choose your path ---------- */}
      <section id="path" className="scroll-mt-16 border-b border-hairline">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="font-display text-2xl font-bold text-ink">What sounds more like you?</h2>
          <p className="mt-2 max-w-[60ch] text-steel">
            Pick whichever one feels closest. There's no wrong answer, and you can always
            look around at everything else after. Prefer a few quick questions instead?{" "}
            <Link href="/quizzes/find-your-career" className="whitespace-nowrap font-semibold text-navy hover:underline">
              Take the career quiz →
            </Link>
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PATH_OPTIONS.map((option) => {
              const PathIcon = option.icon;
              return (
                <Link
                  key={option.goesTo}
                  href={option.href}
                  className="group flex flex-col gap-2.5 border border-hairline bg-white/40 p-4 transition-colors hover:border-navy hover:bg-white/70"
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
          <p className="mt-6 text-sm text-steel">
            Already know what you're after?{" "}
            <Link href="/careers" className="font-semibold text-navy hover:underline">
              Skip the guessing and browse all {careers.length} careers →
            </Link>
          </p>
        </div>
      </section>

      {/* ---------- start learning ---------- */}
      <section className="border-b border-hairline">
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
      </section>

      {/* ---------- what you walk away with ---------- */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="font-display text-2xl font-bold text-ink">What you walk away with</h2>
          <p className="mt-2 max-w-[60ch] text-steel">
            This isn't generic career advice. It's built the way the industry actually talks,
            so the time you spend here is time that actually transfers.
          </p>
          <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3">
            <Benefit icon={BenefitIconHelmet} title="The real language, not a textbook version">
              Every term, tool, and certification here ties back to what OSHA, the PMI, NCCCO,
              and the people on an actual jobsite call it, not a simplified stand-in. Walk into
              an interview or a first day already speaking the language instead of catching up
              for six months.
            </Benefit>
            <Benefit icon={BenefitIconNetwork} title="Everything connects, so it actually sticks">
              A career links to the concepts and software it touches, and those link right back.
              You're not memorizing a glossary, you're building the same mental map someone with
              five years in the field already carries around, just faster.
            </Benefit>
            <Benefit icon={BenefitIconCompass} title="Find out before you commit to anything">
              No tuition, no application, no quitting a job to "try it out" first. Explore a
              dozen careers in an evening and find out which one actually fits before you spend
              real time or money finding out the hard way.
            </Benefit>
          </div>
        </div>
      </section>
    </div>
  );
}

function Benefit({
  icon: BenefitIcon,
  title,
  children,
}: {
  icon: (props: { className?: string }) => React.ReactElement;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-hairline bg-white/40 p-5">
      <BenefitIcon className="text-clay" />
      <h3 className="mt-3 font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-steel">{children}</p>
    </div>
  );
}

// "What you walk away with" icons, same thin-line blueprint language as the
// PathIcon* set above (22px, 1.6px stroke, currentColor). The helmet keeps
// the small filled "rivet" dot already used as an accent elsewhere on the
// site (see FoldRuleIcon in CategorySection.tsx), here standing in for the
// hat's top button.
function BenefitIconHelmet({ className }: { className?: string }) {
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
      <path d="M4 15.5C4 9 7.5 5.5 12 5.5s8 3.5 8 10" />
      <path d="M2.5 15.5h19" />
      <path d="M9.5 15.5v-5M14.5 15.5v-5" />
      <circle cx="12" cy="5.2" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BenefitIconNetwork({ className }: { className?: string }) {
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
      <path d="M7.6 8.3L15.8 7M9.3 9.6l3 6M14.8 9.4l-2.9 6.2" />
      <circle cx="6" cy="7" r="2.3" />
      <circle cx="18" cy="7" r="2.3" />
      <circle cx="12" cy="18" r="2.3" />
    </svg>
  );
}

function BenefitIconCompass({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.8 9.2l-2 4.6-4.6 2 2-4.6z" />
    </svg>
  );
}

// Thin-stroke ("blueprint line-art") icons for the "choose your path" tiles,
// same visual language as Icon.tsx / HardHatMark: 1.6px strokes, currentColor,
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
