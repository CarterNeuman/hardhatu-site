import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllContent, getBySlug, getRelated } from "@/lib/content";
import type { ExamPrep } from "@/lib/types";
import { TypeBadge } from "@/components/TypeBadge";
import { SectionLabel } from "@/components/SectionLabel";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Disclaimer } from "@/components/Disclaimer";
import { ExamDisclaimer } from "@/components/ExamDisclaimer";
import { QuizBlock } from "@/components/LessonQuiz";
import { Prose } from "@/components/Prose";
import { EmailGate } from "@/components/EmailGate";

export function generateStaticParams() {
  const { exams } = getAllContent();
  return exams.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exam = getBySlug("exam", slug) as ExamPrep | undefined;
  if (!exam) return {};
  const description = exam.metaDescription || exam.tagline;
  return {
    title: `${exam.examName} Prep`,
    description,
    openGraph: { title: exam.title, description },
  };
}

export default async function ExamPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exam = getBySlug("exam", slug) as ExamPrep | undefined;
  if (!exam) notFound();
  const related = getRelated(exam);

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <TypeBadge type="exam" tier={exam.tier} />
      <h1 className="mt-2 font-display text-4xl font-bold text-ink">{exam.title}</h1>
      <p className="mt-1 text-xs uppercase tracking-wide text-steel">{exam.examName}</p>
      <p className="mt-3 text-lg leading-relaxed text-ink">{exam.tagline}</p>

      <EmailGate source={`exam:${exam.slug}`}>
      {exam.body && (
        <div className="mt-4">
          <Prose text={exam.body} />
        </div>
      )}

      <ExamDisclaimer
        examName={exam.examName}
        organization={exam.organization}
        officialUrl={exam.officialUrl}
      />

      <SectionLabel>Practice questions</SectionLabel>
      {exam.comingSoon || exam.questions.length === 0 ? (
        <p className="mt-2 text-sm italic text-steel">
          A full practice question bank for the {exam.examName} is coming soon. Check
          back, or explore the related pages below in the meantime.
        </p>
      ) : (
        exam.questions.map((quiz, i) => (
          <QuizBlock key={i} quiz={quiz} index={i} total={exam.questions.length} />
        ))
      )}

      {(exam.lastReviewed || exam.category) && <Disclaimer lastReviewed={exam.lastReviewed} />}

      <RelatedLinks items={related} />
      </EmailGate>
    </article>
  );
}
