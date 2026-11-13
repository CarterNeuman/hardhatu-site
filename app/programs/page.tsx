import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { ProgramsDirectory, type SearchableProgram } from "@/components/ProgramsDirectory";

export const metadata: Metadata = {
  title: "Find a Program",
  description:
    "Registered apprenticeships, trade schools, union programs, and certificate courses — real places to start, not just career descriptions.",
};

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
        {programs.length} program{programs.length === 1 ? "" : "s"} so far: registered apprenticeships,
        trade schools, union programs, and certificate courses — real places to start, not just career
        descriptions. This grows one verified program at a time, so it won&rsquo;t cover every region yet.
      </p>

      <ProgramsDirectory programs={enriched} />

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
