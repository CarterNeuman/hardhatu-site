import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllContent, getBySlug, getRelated } from "@/lib/content";
import { urlFor } from "@/lib/content-client";
import type { GetHired } from "@/lib/types";
import { TypeBadge } from "@/components/TypeBadge";
import { Icon } from "@/components/Icon";
import { SectionLabel } from "@/components/SectionLabel";
import { Disclaimer } from "@/components/Disclaimer";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Prose } from "@/components/Prose";
import { EmailGate } from "@/components/EmailGate";

export function generateStaticParams() {
  const { getHiredGuides } = getAllContent();
  return getHiredGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getBySlug("gethired", slug) as GetHired | undefined;
  if (!guide) return {};
  const description = guide.metaDescription || guide.tagline;
  return {
    title: guide.title,
    description,
    openGraph: { title: guide.title, description },
  };
}

export default async function GetHiredPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getBySlug("gethired", slug) as GetHired | undefined;
  if (!guide) notFound();
  const related = getRelated(guide);
  const { resumes } = getAllContent();
  const matchingResume = resumes.find((r) => r.category === guide.category);

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <TypeBadge type="gethired" tier={guide.tier} size="lg" />
      <div className="mt-2 flex items-start justify-between gap-4">
        <h1 className="font-display text-4xl font-bold text-ink">{guide.category}</h1>
        {matchingResume && (
          <Link
            href={urlFor(matchingResume)}
            className="group flex shrink-0 items-center gap-2 border border-navy px-3 py-2 text-navy transition-colors hover:bg-navy/5"
          >
            <Icon kind="resume" size={20} />
            <span className="text-xs font-semibold uppercase tracking-wide text-amber">
              Resume Guide for this trade
            </span>
          </Link>
        )}
      </div>
      <p className="mt-3 text-lg leading-relaxed text-ink">{guide.tagline}</p>

      <EmailGate source={`gethired:${guide.slug}`}>
      {guide.comingSoon ? (
        <p className="mt-6 text-sm italic text-steel">
          This guide is coming soon. Check back, or explore the related pages below in the
          meantime.
        </p>
      ) : (
        <>
          {guide.body && (
            <div className="mt-4">
              <Prose text={guide.body} />
            </div>
          )}

          <SectionLabel>How hiring actually works</SectionLabel>
          <div className="mt-2">
            <Prose text={guide.howHiringWorks} />
          </div>

          <SectionLabel>The checklist</SectionLabel>
          <ol className="mt-2 flex flex-col gap-4">
            {guide.checklist.map((item, i) => (
              <li key={i} className="border-l-2 border-hairline pl-4">
                <p className="font-medium text-ink">
                  <span className="text-clay">{i + 1}.</span> {item.step}
                </p>
                <p className="mt-1 text-sm text-steel">{item.detail}</p>
              </li>
            ))}
          </ol>

          <SectionLabel>Where to actually look</SectionLabel>
          <ul className="mt-2 flex flex-col gap-1.5">
            {guide.whereToLook.map((place, i) => (
              <li key={i} className="text-sm text-ink">
                {place}
              </li>
            ))}
          </ul>

          {guide.credentialsToHaveReady.length > 0 && (
            <>
              <SectionLabel>Credentials worth having ready</SectionLabel>
              <ul className="mt-2 flex flex-col gap-1.5">
                {guide.credentialsToHaveReady.map((item, i) => (
                  <li key={i} className="text-sm text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}

          <SectionLabel>Common mistakes</SectionLabel>
          <ul className="mt-2 flex flex-col gap-1.5">
            {guide.commonMistakes.map((mistake, i) => (
              <li key={i} className="text-sm text-ink">
                {mistake}
              </li>
            ))}
          </ul>

          <div className="mt-8 border border-amber bg-amber-soft/40 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-clay">
              Your first step today
            </p>
            <p className="mt-1 text-ink">{guide.firstStepToday}</p>
          </div>

          {guide.lastReviewed && (
            <Disclaimer
              lastReviewed={guide.lastReviewed}
              message="Hiring demand, wage, and labor-market figures shift over time and vary by region. Treat these as a general picture, not a guarantee."
            />
          )}
        </>
      )}

      <RelatedLinks items={related} />
      </EmailGate>
    </article>
  );
}
