import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllContent, getBySlug, getRelated } from "@/lib/content";
import type { ResumeGuide } from "@/lib/types";
import { TypeBadge } from "@/components/TypeBadge";
import { SectionLabel } from "@/components/SectionLabel";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Prose } from "@/components/Prose";
import { EmailGate } from "@/components/EmailGate";
import { JobHuntRail } from "@/components/JobHuntRail";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { urlFor } from "@/lib/content-client";

export function generateStaticParams() {
  const { resumes } = getAllContent();
  return resumes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resume = getBySlug("resume", slug) as ResumeGuide | undefined;
  if (!resume) return {};
  const description = resume.metaDescription || resume.tagline;
  return {
    title: resume.title,
    description,
    openGraph: { title: resume.title, description },
  };
}

export default async function ResumeGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resume = getBySlug("resume", slug) as ResumeGuide | undefined;
  if (!resume) notFound();
  const related = getRelated(resume);
  // The matching Get Hired guide for this category -- mirrors the
  // "Resume Guide for this trade" button on the Get Hired page, so the
  // two guides link to each other from the top of the page, not just
  // from the "Explore next" row at the bottom.
  const { getHiredGuides } = getAllContent();
  const matchingGetHired = resume.category
    ? getHiredGuides.find((g) => g.category === resume.category && !g.comingSoon)
    : undefined;

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <TypeBadge type="resume" tier={resume.tier} />
      <div className="mt-2 flex flex-col items-start gap-3 sm:flex-row sm:justify-between sm:gap-4">
        <h1 className="font-display text-4xl font-bold text-ink">{resume.title}</h1>
        {matchingGetHired && (
          <Link
            href={urlFor(matchingGetHired)}
            className="group flex shrink-0 items-center gap-2 border border-navy px-3 py-2 text-navy transition-colors hover:bg-navy/5"
          >
            <Icon kind="gethired" size={20} />
            <span className="text-xs font-semibold uppercase tracking-wide text-amber">
              Get Hired guide for this trade
            </span>
          </Link>
        )}
      </div>
      <p className="mt-3 text-lg leading-relaxed text-ink">{resume.tagline}</p>

      <EmailGate source={`resume:${resume.slug}`} variant="immediate">
      {resume.body && (
        <div className="mt-4">
          <Prose text={resume.body} />
        </div>
      )}

      {resume.sections.map((section, i) => (
        <div key={i}>
          <SectionLabel>{section.heading}</SectionLabel>
          <div className="mt-2">
            <Prose text={section.content} />
          </div>
        </div>
      ))}

      {resume.exampleBullets.length > 0 && (
        <>
          <SectionLabel>Bullets worth adapting</SectionLabel>
          <ul className="mt-2 flex flex-col gap-2">
            {resume.exampleBullets.map((bullet, i) => (
              <li
                key={i}
                className="border-l-2 border-hairline pl-4 text-sm leading-relaxed text-ink"
              >
                {bullet}
              </li>
            ))}
          </ul>
        </>
      )}

      <JobHuntRail
        category={resume.category}
        careerId={resume.careerId}
        current="resume"
        heading="Resume done? Keep the momentum"
      />

      <RelatedLinks items={related} />
      </EmailGate>
    </article>
  );
}
