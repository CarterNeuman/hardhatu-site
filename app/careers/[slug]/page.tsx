import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllContent, getBySlug, getRelated, getRecommended } from "@/lib/content";
import type { Career } from "@/lib/types";
import { TypeBadge } from "@/components/TypeBadge";
import { Tag } from "@/components/Tag";
import { SectionLabel } from "@/components/SectionLabel";
import { RelatedLinks } from "@/components/RelatedLinks";
import { ContentPhoto } from "@/components/ContentPhoto";
import { PayTimeline } from "@/components/PayTimeline";
import { Disclaimer } from "@/components/Disclaimer";
import { Callout } from "@/components/Callout";

export function generateStaticParams() {
  const { careers } = getAllContent();
  return careers.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const career = getBySlug("career", slug) as Career | undefined;
  if (!career) return {};
  const description = career.metaDescription || career.tagline;
  return {
    title: career.title,
    description,
    openGraph: { title: career.title, description },
  };
}

export default async function CareerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const career = getBySlug("career", slug) as Career | undefined;
  if (!career) notFound();
  const related = getRelated(career);
  const recommended = getRecommended(career);

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <TypeBadge type="career" tier={career.tier} />
      <h1 className="mt-2 font-display text-4xl font-bold text-ink">{career.title}</h1>
      <p className="mt-1 text-xs uppercase tracking-wide text-steel">{career.category}</p>
      <p className="mt-2 text-lg text-steel">{career.tagline}</p>

      {career.image && <ContentPhoto src={career.image} alt={career.title} />}

      <SectionLabel>What is a {career.title}?</SectionLabel>
      <p className="mt-2 leading-relaxed text-ink">{career.whatIs}</p>

      {career.payTimeline && (
        <>
          <PayTimeline payTimeline={career.payTimeline} />
          <Disclaimer
            lastReviewed={career.payTimeline.asOf}
            message="Pay reflects the national wage distribution for this occupation, not a promise for any one job: entry level is the lower part of that range, 5 years in sits around the national median, and 20 years in is the upper part, since pay isn't actually tracked by years of experience. Real pay varies a lot by state, metro area, union status, and employer — scale these up or down for your market. These figures are base pay only: overtime, shift differentials, and per-project bonuses are standard across most construction trades and routinely push real earnings above what's shown here."
          />
          {career.ownerPayNote && (
            <Callout label="What this chart doesn't capture" tone="navy" text={career.ownerPayNote} />
          )}
        </>
      )}

      {career.whatTheyDo.length > 0 && (
        <>
          <SectionLabel>What they do</SectionLabel>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-ink">
            {career.whatTheyDo.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {career.typicalDay.length > 0 && (
        <>
          <SectionLabel>A typical day</SectionLabel>
          <ul className="mt-2 space-y-1 text-ink">
            {career.typicalDay.map((slot) => (
              <li key={slot.time} className="flex gap-3">
                <span className="w-20 shrink-0 font-medium text-steel">{slot.time}</span>
                <span>{slot.activity}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {career.skills.length > 0 && (
        <>
          <SectionLabel>Skills</SectionLabel>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {career.skills.map((skill) => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </div>
        </>
      )}

      {career.software.length > 0 && (
        <>
          <SectionLabel>Software</SectionLabel>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {career.software.map((sw) => (
              <Tag key={sw}>{sw}</Tag>
            ))}
          </div>
        </>
      )}

      {career.education && (
        <>
          <SectionLabel>Education</SectionLabel>
          <dl className="mt-2 space-y-1 text-sm text-ink">
            {career.education.required && (
              <div>
                <dt className="inline font-semibold">Required: </dt>
                <dd className="inline">{career.education.required}</dd>
              </div>
            )}
            {career.education.preferred && (
              <div>
                <dt className="inline font-semibold">Preferred: </dt>
                <dd className="inline">{career.education.preferred}</dd>
              </div>
            )}
            {career.education.helpful && (
              <div>
                <dt className="inline font-semibold">Helpful: </dt>
                <dd className="inline">{career.education.helpful}</dd>
              </div>
            )}
            {career.education.notNecessary && (
              <div>
                <dt className="inline font-semibold">Not necessary: </dt>
                <dd className="inline">{career.education.notNecessary}</dd>
              </div>
            )}
          </dl>
        </>
      )}

      {career.progression.length > 0 && (
        <>
          <SectionLabel>Career progression</SectionLabel>
          <ol className="mt-2 space-y-1 text-ink">
            {career.progression.map((step, i) => (
              <li key={step} className="flex gap-2">
                <span className="text-steel">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </>
      )}

      {career.hirerTypes.length > 0 && (
        <>
          <SectionLabel>Who hires for this role</SectionLabel>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {career.hirerTypes.map((hirer) => (
              <Tag key={hirer}>{hirer}</Tag>
            ))}
          </div>
        </>
      )}

      <RelatedLinks items={related} recommended={recommended} />
    </article>
  );
}
