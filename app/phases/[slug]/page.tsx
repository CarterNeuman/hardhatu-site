import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllContent, getBySlug, getRelated } from "@/lib/content";
import type { Phase } from "@/lib/types";
import { TypeBadge } from "@/components/TypeBadge";
import { Tag } from "@/components/Tag";
import { SectionLabel } from "@/components/SectionLabel";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Prose } from "@/components/Prose";
import { Callout } from "@/components/Callout";
import { ContentPhoto } from "@/components/ContentPhoto";
import { EmailGate } from "@/components/EmailGate";

export function generateStaticParams() {
  const { phases } = getAllContent();
  return phases.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const phase = getBySlug("phase", slug) as Phase | undefined;
  if (!phase) return {};
  const description = phase.metaDescription || phase.whatHappens.slice(0, 155);
  return {
    title: phase.title,
    description,
    openGraph: { title: phase.title, description },
  };
}

export default async function PhasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const phase = getBySlug("phase", slug) as Phase | undefined;
  if (!phase) notFound();
  const related = getRelated(phase);

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <TypeBadge type="phase" tier={phase.tier} />
      <h1 className="mt-2 font-display text-4xl font-bold text-ink">{phase.title}</h1>
      <p className="mt-1 text-xs uppercase tracking-wide text-steel">
        Step {phase.order} in the construction process
      </p>

      {phase.image && <ContentPhoto src={phase.image} alt={phase.title} />}

      <EmailGate source={`phase:${phase.slug}`}>
      <SectionLabel>What happens</SectionLabel>
      <Prose text={phase.whatHappens} />

      {phase.timeline && (
        <>
          <SectionLabel>How long this takes</SectionLabel>
          <Prose text={phase.timeline} />
        </>
      )}

      {phase.costOfChangeCurve && (
        <Callout label="Why this timing matters" tone="navy" text={phase.costOfChangeCurve} />
      )}

      {phase.whoIsInvolved.length > 0 && (
        <>
          <SectionLabel>Who's involved</SectionLabel>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {phase.whoIsInvolved.map((who) => (
              <Tag key={who}>{who}</Tag>
            ))}
          </div>
        </>
      )}

      {phase.commonMisconception && (
        <Callout label="Common misconception" tone="clay" text={phase.commonMisconception} />
      )}

      {phase.whatCanGoWrong && (
        <>
          <SectionLabel>What can go wrong</SectionLabel>
          <Prose text={phase.whatCanGoWrong} />
        </>
      )}

      {phase.nonLinearReality && (
        <Callout label="In practice" tone="steel" text={phase.nonLinearReality} />
      )}

      <RelatedLinks items={related} />
      </EmailGate>
    </article>
  );
}
