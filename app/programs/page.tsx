import type { Metadata } from "next";
import Link from "next/link";
import { getAllContent } from "@/lib/content";
import { STATE_GUIDES } from "@/lib/state-guides";
import { ProgramsDirectory, type SearchableProgram } from "@/components/ProgramsDirectory";

export const metadata: Metadata = {
  title: "Find a Program",
  description:
    "National apprenticeships, training programs and courses in construction: union and non-union programs, certifications and online courses you can find anywhere in the U.S.",
};

// Scope rule (decided 2026-11-13): this directory lists NATIONAL programs
// only: apprenticeship systems with locals across the country, national
// certifications, and courses open anywhere. Local schools, specific union
// locals and state grants belong on the state guides (/states/[slug]),
// which get more specific state by state.
export default function ProgramsIndexPage() {
  const { programs, byId } = getAllContent();

  // Derive each program's career category (e.g. "Field & Trades") from its
  // careerIds, since Program has no native category field of its own.
  // Passed down so the client-side search box can match a category name
  // even when that word doesn't appear in the program's title or tagline.
  const enriched: SearchableProgram[] = programs.map((program) => {
    const categories = Array.from(
      new Set(
        program.careerIds
          .map((id) => byId.get(id))
          .filter((node) => node?.type === "career")
          .map((node) => (node as { category: string }).category)
      )
    );
    return { ...program, categories };
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <p className="mb-2 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wide text-amber">
        <span aria-hidden="true" className="h-px w-5 bg-amber" />
        Training Directory
      </p>
      <h1 className="font-display text-4xl font-bold text-ink">Find an apprenticeship or training program</h1>
      <p className="mt-3 max-w-2xl text-steel">
        {programs.length} national programs: apprenticeship systems with training centers across the
        country, certifications and courses you can take anywhere. Each one explains how the program works
        and how to find your local office.
      </p>

      <div className="mt-6 flex max-w-3xl flex-wrap items-center gap-x-4 gap-y-2 border-l-4 border-[#1B5E3B] bg-white px-5 py-4">
        <p className="text-sm text-ink">
          <span className="font-semibold">Want the local version?</span> State guides name the actual training
          centers, schools and free state programs near you.
        </p>
        {STATE_GUIDES.map((g) => (
          <Link key={g.slug} href={`/states/${g.slug}`} className="text-sm font-semibold text-[#1B5E3B] hover:underline">
            {g.name} guide →
          </Link>
        ))}
      </div>

      <ProgramsDirectory programs={enriched} />

      <p className="mt-12 border-t border-hairline pt-6 text-sm text-steel">
        Know a national program we&rsquo;re missing?{" "}
        <a href="mailto:contact@breakgroundu.com" className="font-semibold text-navy hover:underline">
          Tell us what&rsquo;s missing
        </a>
        .
      </p>
    </div>
  );
}
