import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllContent, getBySlug, getRelated } from "@/lib/content";
import type { Lesson } from "@/lib/types";
import { TypeBadge } from "@/components/TypeBadge";
import { RelatedLinks } from "@/components/RelatedLinks";
import { QuizBlock } from "@/components/LessonQuiz";
import { Prose } from "@/components/Prose";
import { ContentPhoto } from "@/components/ContentPhoto";
import { EmailGate } from "@/components/EmailGate";

export function generateStaticParams() {
  const { lessons } = getAllContent();
  return lessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getBySlug("lesson", slug) as Lesson | undefined;
  if (!lesson) return {};
  const description = lesson.metaDescription || lesson.sections[0]?.content.slice(0, 155);
  return {
    title: lesson.title,
    description,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getBySlug("lesson", slug) as Lesson | undefined;
  if (!lesson) notFound();
  const related = getRelated(lesson);

  // Number check-in questions across the whole lesson (1 of 3, 2 of 3, …)
  // rather than per-section, so the reader can see how far through the
  // whole set of checks they are.
  const quizTotal = lesson.sections.filter((s) => s.quiz).length;
  let quizSeen = 0;

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <TypeBadge type="lesson" tier={lesson.tier} />
      <h1 className="mt-2 font-display text-4xl font-bold text-ink">{lesson.title}</h1>
      <p className="mt-1 text-xs uppercase tracking-wide text-steel">{lesson.minutes} min read</p>

      {lesson.image && <ContentPhoto src={lesson.image} alt={lesson.title} />}

      <EmailGate source={`lesson:${lesson.slug}`}>
        {lesson.sections.map((section, i) => {
          const quizIndex = section.quiz ? quizSeen++ : -1;
          return (
            <div key={i} className="mt-4">
              <Prose text={section.content} />
              {section.quiz && <QuizBlock quiz={section.quiz} index={quizIndex} total={quizTotal} />}
            </div>
          );
        })}

        <RelatedLinks items={related} />
      </EmailGate>
    </article>
  );
}
