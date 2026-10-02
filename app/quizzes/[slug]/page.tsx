import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllContent, getBySlug } from "@/lib/content";
import type { CareerMatchQuiz as CareerMatchQuizContent } from "@/lib/types";
import { TypeBadge } from "@/components/TypeBadge";
import { CareerMatchQuiz } from "@/components/CareerMatchQuiz";

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
  const careersByCategory: Record<string, typeof careers> = {};
  for (const career of careers) {
    (careersByCategory[career.category] ??= []).push(career);
  }
  const lessonsById: Record<string, typeof lessons[number]> = {};
  for (const lesson of lessons) {
    lessonsById[lesson.id] = lesson;
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
      />
    </article>
  );
}
