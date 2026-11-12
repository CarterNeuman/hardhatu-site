import Link from "next/link";
import { getProgramsLinkedTo, urlFor } from "@/lib/content";
import { SectionLabel } from "@/components/SectionLabel";

// "Where to train": real programs that name this page (a concept, an
// exam, a lesson, a Get Hired guide) in their own relatedIds -- see
// getProgramsLinkedTo in lib/content.ts. Renders nothing when no program
// points here, so it's safe to drop onto any detail page. Capped, with a
// link to the full directory, because a page like the apprenticeship
// concept is named by nearly every program on the site.
const MAX_SHOWN = 4;

export function ProgramsBox({ id, heading }: { id: string; heading?: string }) {
  const programs = getProgramsLinkedTo(id);
  if (programs.length === 0) return null;
  const shown = programs.slice(0, MAX_SHOWN);

  return (
    <section className="print:hidden">
      <SectionLabel>{heading ?? "Where to train"}</SectionLabel>
      <p className="mt-2 text-sm text-steel">
        Real apprenticeships, trade schools, and certificate programs connected to this page.
      </p>
      <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {shown.map((program) => (
          <li key={program.id}>
            <Link
              href={urlFor(program)}
              className="group flex h-full flex-col gap-1 border border-hairline bg-white/40 px-4 py-3 transition-colors hover:border-navy hover:bg-white/70"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wide text-clay">{program.programType}</span>
              <span className="font-display text-base font-semibold leading-snug text-ink group-hover:text-navy">
                {program.title}
              </span>
              <span className="text-xs leading-snug text-steel">
                {[program.durationNote, program.costNote].filter(Boolean).join(" · ") || program.organization}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/programs" className="mt-3 inline-block text-sm font-semibold text-navy hover:underline">
        {programs.length > shown.length ? `Browse all ${programs.length} connected programs` : "Browse the program directory"} &rarr;
      </Link>
    </section>
  );
}
