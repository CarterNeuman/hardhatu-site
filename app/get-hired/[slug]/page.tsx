import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllContent, getBySlug, getRelated } from "@/lib/content";
import type { GetHired } from "@/lib/types";
import { TypeBadge } from "@/components/TypeBadge";
import { SectionLabel } from "@/components/SectionLabel";
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

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <TypeBadge type="gethired" tier={guide.tier} />
      <h1 className="mt-2 font-display text-4xl font-bold text-ink">{guide.title}</h1>
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
        </>
      )}

      <RelatedLinks items={related} />
      </EmailGate>
    </article>
  );
}
