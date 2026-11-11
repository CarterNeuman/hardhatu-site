import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllContent, getBySlug, getRelated } from "@/lib/content";
import type { Program } from "@/lib/types";
import { ProgramTypeBadge } from "@/components/ProgramTypeBadge";
import { ContentCard } from "@/components/ContentCard";
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
  // Careers this program leads to -- pulled out of the general relatedIds
  // list (every program's frontmatter includes its career-* ids there) so
  // they get their own panel instead of blending into the generic "Explore
  // next" chip row below.
  const careers = related.filter((item) => item.type === "career");
  const rest = related.filter((item) => item.type !== "career");

  return (
    <article className="mx-auto max-w-6xl px-6 py-10">
      <Link href="/programs" className="text-sm font-semibold text-steel hover:text-navy hover:underline">
        &larr; All programs
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        <div>
          <ProgramTypeBadge programType={program.programType} />
          <h1 className="mt-3 font-display text-4xl font-bold text-ink">{program.title}</h1>
          <p className="mt-1 text-sm font-semibold text-clay">
            {program.organization} &middot; {program.location}
          </p>
          <p className="mt-3 text-lg leading-relaxed text-ink">{program.tagline}</p>

          <EmailGate source={`program:${program.slug}`} allowGuest>
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

            {careers.length > 0 && (
              <div className="mt-10 border-t border-hairline pt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-steel">
                  Careers this leads to
                </p>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {careers.map((career) => (
                    <ContentCard key={career.id} item={career} description={career.tagline} />
                  ))}
                </div>
              </div>
            )}

            <Disclaimer lastReviewed={program.lastReviewed} />

            <RelatedLinks items={rest} />
          </EmailGate>
        </div>

        {/* Quick-facts side panel -- cost/duration pulled out of the body
            copy into a sticky card, so the two numbers someone actually
            scans for aren't buried mid-paragraph. */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="border border-hairline bg-white/40 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-steel">Quick facts</p>
            <dl className="mt-3 flex flex-col gap-4">
              {program.durationNote && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-steel">Duration</dt>
                  <dd className="mt-0.5 text-sm text-ink">{program.durationNote}</dd>
                </div>
              )}
              {program.costNote && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-steel">Cost</dt>
                  <dd className="mt-0.5 text-sm text-ink">{program.costNote}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-steel">Organization</dt>
                <dd className="mt-0.5 text-sm text-ink">{program.organization}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-steel">Location</dt>
                <dd className="mt-0.5 text-sm text-ink">{program.location}</dd>
              </div>
            </dl>
            {program.website && (
              <a
                href={program.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 border border-ink bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-ink/90"
              >
                Visit website &rarr;
              </a>
            )}
          </div>
        </aside>
      </div>
    </article>
  );
}
