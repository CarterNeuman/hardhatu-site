import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllContent, getBySlug } from "@/lib/content";
import type { CareerMatchQuiz as CareerMatchQuizContent } from "@/lib/types";
import { TypeBadge } from "@/components/TypeBadge";
import { CareerMatchQuiz, type QuizCareer, type QuizLesson } from "@/components/CareerMatchQuiz";

export function generateStaticParams() {
  const { quizzes } = getAllContent();
  return quizzes.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getBySlug("quiz", slug) as CareerMatchQuizContent | undefined;
  if (!quiz) return {};
  const description = quiz.metaDescription || quiz.tagline;
  return {
    title: quiz.title,
    description,
    openGraph: { title: quiz.title, description },
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const quiz = getBySlug("quiz", slug) as CareerMatchQuizContent | undefined;
  if (!quiz) notFound();

  const { careers, lessons } = getAllContent();
  // Slimmed to just what the result screen renders -- CareerMatchQuiz is
  // a client component, so everything passed here is serialized into the
  // page. Passing full career/lesson objects shipped all of that content
  // to every visitor's phone for no reason.
  const careersByCategory: Record<string, QuizCareer[]> = {};
  for (const career of careers) {
    (careersByCategory[career.category] ??= []).push({
      id: career.id,
      type: career.type,
      slug: career.slug,
      title: career.title,
      tagline: career.tagline,
    });
  }
  const lessonsById: Record<string, QuizLesson> = {};
  for (const lesson of lessons) {
    lessonsById[lesson.id] = {
      id: lesson.id,
      type: lesson.type,
      slug: lesson.slug,
      title: lesson.title,
      minutes: lesson.minutes,
    };
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <TypeBadge type="quiz" tier={quiz.tier} />
      <h1 className="mt-2 font-display text-4xl font-bold text-ink">{quiz.title}</h1>
      <p className="mt-3 text-lg leading-relaxed text-ink">{quiz.tagline}</p>

      <CareerMatchQuiz
        questions={quiz.questions}
        careersByCategory={careersByCategory}
        lessonsById={lessonsById}
        category={quiz.category}
      />
    </article>
  );
}
