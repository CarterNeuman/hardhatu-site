import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllContent, getBySlug, getRelated } from "@/lib/content";
import type { Concept } from "@/lib/types";
import { TypeBadge } from "@/components/TypeBadge";
import { SectionLabel } from "@/components/SectionLabel";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Disclaimer } from "@/components/Disclaimer";
import { Callout } from "@/components/Callout";
import { ContentPhoto } from "@/components/ContentPhoto";

export function generateStaticParams() {
  const { concepts } = getAllContent();
  return concepts.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const concept = getBySlug("concept", slug) as Concept | undefined;
  if (!concept) return {};
  const description = concept.metaDescription || concept.definition;
  return {
    title: concept.title,
    description,
    openGraph: { title: concept.title, description },
  };
}

export default async function ConceptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = getBySlug("concept", slug) as Concept | undefined;
  if (!concept) notFound();
  const related = getRelated(concept);
  const hasStaleRisk = Boolean(concept.typicalCost) || Boolean(concept.lastReviewed);

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <TypeBadge type="concept" tier={concept.tier} />
      <h1 className="mt-2 font-display text-4xl font-bold text-ink">{concept.title}</h1>
      {concept.csiDivision && (
        <p className="mt-1 text-xs uppercase tracking-wide text-steel">
          CSI Division {concept.csiDivision}
        </p>
      )}

      <p className="mt-4 text-lg leading-relaxed text-ink">{concept.definition}</p>

      {concept.image && <ContentPhoto src={concept.image} alt={concept.title} />}

      {concept.whyItMatters && (
        <>
          <SectionLabel>Why it matters</SectionLabel>
          <p className="mt-2 leading-relaxed text-ink">{concept.whyItMatters}</p>
        </>
      )}

      {concept.example && (
        <>
          <SectionLabel>On a real project</SectionLabel>
          <p className="mt-2 leading-relaxed text-ink">{concept.example}</p>
        </>
      )}

      <Callout label="Who this matters most to" tone="amber" text={concept.careerAngle} />
      <Callout label="Where this goes wrong" tone="clay" text={concept.whatGoesWrong} />

      {concept.typicalCost && (
        <>
          <SectionLabel>Typical cost</SectionLabel>
          <p className="mt-2 text-ink">
            {concept.typicalCost.range} {concept.typicalCost.unit}
            <span className="ml-2 text-xs text-steel">as of {concept.typicalCost.asOf}</span>
          </p>
        </>
      )}

      {hasStaleRisk && <Disclaimer lastReviewed={concept.lastReviewed} />}

      <RelatedLinks items={related} />
    </article>
  );
}
