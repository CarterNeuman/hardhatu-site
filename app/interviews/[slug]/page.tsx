import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllContent, getBySlug, getRelated } from "@/lib/content";
import type { InterviewPrep } from "@/lib/types";
import { TypeBadge } from "@/components/TypeBadge";
import { SectionLabel } from "@/components/SectionLabel";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Prose } from "@/components/Prose";
import { EmailGate } from "@/components/EmailGate";

export function generateStaticParams() {
  const { interviews } = getAllContent();
  return interviews.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const interview = getBySlug("interview", slug) as InterviewPrep | undefined;
  if (!interview) return {};
  const description = interview.metaDescription || interview.tagline;
  return {
    title: interview.title,
    description,
    openGraph: { title: interview.title, description },
  };
}

export default async function InterviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const interview = getBySlug("interview", slug) as InterviewPrep | undefined;
  if (!interview) notFound();
  const related = getRelated(interview);

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <TypeBadge type="interview" tier={interview.tier} />
      <h1 className="mt-2 font-display text-4xl font-bold text-ink">{interview.title}</h1>
      <p className="mt-3 text-lg leading-relaxed text-ink">{interview.tagline}</p>

      <EmailGate source={`interview:${interview.slug}`}>
      {interview.body && (
        <div className="mt-4">
          <Prose text={interview.body} />
        </div>
      )}

      <SectionLabel>Questions to expect</SectionLabel>
      <div className="mt-2 flex flex-col gap-6">
        {interview.questions.map((q, i) => (
          <div key={i} className="border-l-2 border-hairline pl-4">
            <p className="font-medium text-ink">{q.question}</p>
            {q.whatTheyreAssessing && (
              <p className="mt-1.5 text-sm text-steel">
                <span className="font-semibold text-clay">What they're really asking: </span>
                {q.whatTheyreAssessing}
              </p>
            )}
            {q.strongAnswerTips && (
              <p className="mt-1.5 text-sm text-ink">
                <span className="font-semibold text-navy">Tip: </span>
                {q.strongAnswerTips}
              </p>
            )}
          </div>
        ))}
      </div>

      <RelatedLinks items={related} />
      </EmailGate>
    </article>
  );
}
