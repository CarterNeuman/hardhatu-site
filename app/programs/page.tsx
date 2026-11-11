import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { ContentCard } from "@/components/ContentCard";
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
                <ContentCard
                  key={program.id}
                  item={program}
                  description={`${program.organization} — ${program.tagline}`}
                  badge={
                    <span className="text-[0.68rem] font-semibold uppercase tracking-wide text-steel">
                      {program.location}
                    </span>
                  }
                />
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
