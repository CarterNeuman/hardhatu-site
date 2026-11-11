import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllContent, getBySlug, getRelated } from "@/lib/content";
import type { Program } from "@/lib/types";
import { TypeBadge } from "@/components/TypeBadge";
import { SectionLabel } from "@/components/SectionLabel";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Disclaimer } from "@/components/Disclaimer";
import { Prose } from "@/components/Prose";
import { EmailGate } from "@/components/EmailGate";

export function generateStaticParams() {
  const { programs } = getAllContent();
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getBySlug("program", slug) as Program | undefined;
  if (!program) return {};
  const description = program.metaDescription || program.tagline;
  return {
    title: program.title,
    description,
    openGraph: { title: program.title, description },
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getBySlug("program", slug) as Program | undefined;
  if (!program) notFound();
  const related = getRelated(program);

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <Link href="/programs" className="text-sm font-semibold text-steel hover:text-navy hover:underline">
        &larr; All programs
      </Link>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <TypeBadge type="program" tier={program.tier} />
        <span className="inline-flex items-center border border-hairline bg-white/40 px-2 py-0.5 text-xs font-semibold text-steel">
          {program.programType}
        </span>
      </div>
      <h1 className="mt-2 font-display text-4xl font-bold text-ink">{program.title}</h1>
      <p className="mt-1 text-sm font-semibold text-clay">
        {program.organization} &middot; {program.location}
      </p>
      <p className="mt-3 text-lg leading-relaxed text-ink">{program.tagline}</p>

      <EmailGate source={`program:${program.slug}`} allowGuest>
        <div className="mt-6 grid grid-cols-1 gap-4 border border-hairline bg-white/40 p-5 sm:grid-cols-2">
          {program.costNote && (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-steel">Cost</dt>
              <dd className="mt-0.5 text-sm text-ink">{program.costNote}</dd>
            </div>
          )}
          {program.durationNote && (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-steel">Duration</dt>
              <dd className="mt-0.5 text-sm text-ink">{program.durationNote}</dd>
            </div>
          )}
        </div>

        {program.whatToExpect && (
          <>
            <SectionLabel>What to expect</SectionLabel>
            <Prose text={program.whatToExpect} />
          </>
        )}

        {program.website && (
          <a
            href={program.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-ink/90"
          >
            Visit program website &rarr;
          </a>
        )}

        <Disclaimer lastReviewed={program.lastReviewed} />

        <RelatedLinks items={related} />
      </EmailGate>
    </article>
  );
}
