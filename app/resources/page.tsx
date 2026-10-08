import type { Metadata } from "next";
import Link from "next/link";
import { getAllContent } from "@/lib/content";
import { Icon } from "@/components/Icon";
import type { IconKind } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Interview prep, certification study guides, the software you'll actually use on the job, and resume guidance -- every HardHatU resource in one place.",
};

type PinColor = "amber" | "clay";

type ResourceItem = {
  href: string;
  kind: IconKind;
  title: string;
  description: string;
  count: string;
  pin: PinColor;
  rotate: string;
};

export default function ResourcesIndexPage() {
  const { interviews, exams, software, resumes } = getAllContent();

  const items: ResourceItem[] = [
    {
      href: "/interviews",
      kind: "interview",
      title: "Interview Prep",
      description: "General basics plus a detailed guide for every career category.",
      count: `${interviews.length} guide${interviews.length === 1 ? "" : "s"}`,
      pin: "clay",
      rotate: "-1.6deg",
    },
    {
      href: "/exams",
      kind: "exam",
      title: "Get Qualified",
      description: "Independent study material for real certifications like OSHA-10 and the PMP.",
      count: `${exams.length} certification${exams.length === 1 ? "" : "s"}`,
      pin: "amber",
      rotate: "1.1deg",
    },
    {
      href: "/software",
      kind: "software",
      title: "Software",
      description: "The tools that actually show up in job postings and day-to-day work.",
      count: `${software.length} tool${software.length === 1 ? "" : "s"}`,
      pin: "clay",
      rotate: "-0.9deg",
    },
    {
      href: "/resumes",
      kind: "resume",
      title: "Resume Guide",
      description: "What recruiters actually look for, by category, and what to leave off.",
      count: `${resumes.length} guide${resumes.length === 1 ? "" : "s"}`,
      pin: "amber",
      rotate: "1.5deg",
    },
  ];

  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <p className="mb-2 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wide text-amber">
          <span aria-hidden="true" className="h-px w-5 bg-amber" />
          Resources
        </p>
        <h1 className="font-display text-4xl font-bold text-ink">Everything outside the lessons</h1>
        <p className="mt-3 max-w-2xl text-steel">
          The reference material people reach for once they already know where they're headed:
          how to talk through an interview, which certifications are worth sitting for, the
          software you'll actually touch, and how to put all of it on a resume.
        </p>
      </div>

      {/* The "pinboard" -- a textured board standing in for the jobsite
          trailer wall these four things would actually be tacked up on.
          Each card gets its own slight, fixed tilt plus a push-pin, and
          straightens out on hover like you're lifting it off the board. */}
      <div
        className="mt-8 border-y border-hairline bg-amber-soft/25 py-12"
        style={{
          backgroundImage: "radial-gradient(circle, #D6D0C2 1px, transparent 1.6px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-8 gap-y-12 px-6 sm:grid-cols-2">
          {items.map((item) => (
            <ResourceCard key={item.href} {...item} />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-steel">
        Not sure which of these you need yet?{" "}
        <Link href="/action-plan" className="font-semibold text-navy hover:underline">
          Build your Action Plan
        </Link>{" "}
        and we'll point you to the right ones for where you are.
      </div>
    </div>
  );
}

function ResourceCard({ href, kind, title, description, count, pin, rotate }: ResourceItem) {
  return (
    <Link
      href={href}
      style={{ "--card-rotate": rotate } as React.CSSProperties}
      className="group relative block rotate-[var(--card-rotate)] border border-hairline bg-white p-5 pt-8 shadow-[0_8px_16px_rgba(28,43,51,0.14)] transition-all duration-200 hover:-translate-y-1 hover:rotate-0 hover:border-navy hover:shadow-[0_16px_26px_rgba(28,43,51,0.2)]"
    >
      <PushPin
        className={`absolute -top-2.5 left-1/2 -translate-x-1/2 ${pin === "amber" ? "text-amber" : "text-clay"}`}
      />
      <div className="flex items-center justify-between gap-2">
        <Icon kind={kind} size={22} className="text-clay" />
        <span className="text-[0.68rem] font-semibold uppercase tracking-wide text-clay">{count}</span>
      </div>
      <h3 className="mt-3 font-display text-xl font-bold text-ink group-hover:text-navy">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-steel">{description}</p>
      <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-wide text-navy">Browse →</span>
    </Link>
  );
}

function PushPin({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false" className={className}>
      <circle cx="9" cy="9" r="7" fill="currentColor" />
      <circle cx="6.6" cy="6.6" r="2" fill="white" fillOpacity="0.4" />
    </svg>
  );
}
