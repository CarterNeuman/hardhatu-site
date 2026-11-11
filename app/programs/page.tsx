import type { Metadata } from "next";
import Link from "next/link";
import { getAllContent } from "@/lib/content";
import { urlFor } from "@/lib/content-client";
import { ProgramTypeBadge } from "@/components/ProgramTypeBadge";
import type { Program } from "@/lib/types";

export const metadata: Metadata = {
  title: "Find a Program",
  description:
    "Registered apprenticeships, trade schools, union programs, and certificate courses — real places to start, not just career descriptions.",
};

// Display order for the type-grouped sections below. A programType not
// listed here (there will be more as the directory grows) still shows,
// just sorted after these -- same "known order first, everything else
// still visible" convention as CAREER_CATEGORY_ORDER/CONCEPT_CATEGORY_ORDER
// in lib/types.ts, just kept local here since programType is free text,
// not a fixed enum, and nothing else needs this grouping yet.
const PROGRAM_TYPE_ORDER = [
  "Registered Apprenticeship",
  "Union Program",
  "Trade School",
  "Certificate Program",
  "Online Course",
];

function groupByType(programs: Program[]): { type: string; items: Program[] }[] {
  const groups = new Map<string, Program[]>();
  for (const program of programs) {
    const list = groups.get(program.programType) ?? [];
    list.push(program);
    groups.set(program.programType, list);
  }
  return Array.from(groups.entries())
    .map(([type, items]) => ({ type, items }))
    .sort((a, b) => {
      const ai = PROGRAM_TYPE_ORDER.indexOf(a.type);
      const bi = PROGRAM_TYPE_ORDER.indexOf(b.type);
      if (ai === -1 && bi === -1) return a.type.localeCompare(b.type);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
}

// A single program listing card. Richer than the generic ContentCard used
// elsewhere -- programs carry enough directory-specific metadata (type,
// org, location, cost, duration) that a plain title+description card
// undersells how different these are from one another. Kept local to this
// page rather than folded into ContentCard, since no other listing page
// needs a programType badge or a cost/duration row.
function ProgramCard({ program }: { program: Program }) {
  return (
    <Link
      href={urlFor(program)}
      className="group flex flex-col gap-3 border border-hairline bg-white/40 p-4 transition-colors hover:border-navy hover:bg-white/70"
    >
      <div className="flex items-start justify-between gap-2">
        <ProgramTypeBadge programType={program.programType} />
        <span className="text-right text-[0.68rem] font-semibold uppercase tracking-wide text-steel">
          {program.location}
        </span>
      </div>

      <div>
        <h3 className="break-words font-display text-lg font-semibold leading-snug text-ink group-hover:text-navy">
          {program.title}
        </h3>
        <p className="mt-0.5 text-sm font-semibold text-clay">{program.organization}</p>
      </div>

      <p className="line-clamp-3 text-sm leading-snug text-steel">{program.tagline}</p>

      {(program.costNote || program.durationNote) && (
        <ul className="mt-auto flex flex-col gap-1 border-t border-hairline pt-3 text-xs text-steel">
          {program.durationNote && (
            <li className="flex gap-1.5">
              <span className="font-semibold uppercase tracking-wide text-ink">Duration</span>
              {program.durationNote}
            </li>
          )}
          {program.costNote && (
            <li className="flex gap-1.5">
              <span className="font-semibold uppercase tracking-wide text-ink">Cost</span>
              {program.costNote}
            </li>
          )}
        </ul>
      )}

      <span className="mt-1 text-sm font-semibold text-navy">View program &rarr;</span>
    </Link>
  );
}

export default function ProgramsIndexPage() {
  const { programs } = getAllContent();
  const grouped = groupByType(programs);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <p className="mb-2 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wide text-amber">
        <span aria-hidden="true" className="h-px w-5 bg-amber" />
        Training Directory
      </p>
      <h1 className="font-display text-4xl font-bold text-ink">Find an apprenticeship or training program</h1>
      <p className="mt-3 max-w-2xl text-steel">
        {programs.length} program{programs.length === 1 ? "" : "s"} so far: registered apprenticeships,
        trade schools, union programs, and certificate courses — real places to start, not just career
        descriptions. This grows one verified program at a time, so it won&rsquo;t cover every region yet.
      </p>

      <div className="mt-10 space-y-12">
        {grouped.map((group) => (
          <section key={group.type}>
            <h2 className="font-display text-xl font-bold text-ink">{group.type}</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-12 border-t border-hairline pt-6 text-sm text-steel">
        Don&rsquo;t see a program near you?{" "}
        <a href="mailto:contact@breakgroundu.com" className="font-semibold text-navy hover:underline">
          Tell us what&rsquo;s missing
        </a>
        .
      </p>
    </div>
  );
}
