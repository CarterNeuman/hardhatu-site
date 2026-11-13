import Link from "next/link";
import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { urlFor } from "@/lib/content-client";
import { CAREER_CATEGORY_ORDER } from "@/lib/types";
import type { CareerMatchQuiz } from "@/lib/types";

export const metadata: Metadata = {
  title: "Career Quizzes",
  description:
    "Not sure where to start? Take the full career quiz, or jump straight to a quiz scoped to one category, like Field & Trades or Business.",
};

// A small, hand-picked accent per category, matching the ones
// CareerMatchQuiz.tsx uses on the quiz pages themselves -- kept as a
// separate copy rather than a shared import since this is the only
// other file that needs it, and duplicating eight hex strings is
// simpler than introducing a shared module for them.
const CATEGORY_ACCENT: Record<string, string> = {
  "Field & Trades": "#8C6217",
  "Project & Operations": "#1F3F52",
  "Preconstruction & Estimating": "#8A4A31",
  Business: "#2C6E66",
  "Technology & Design": "#3B4F7A",
  "Specialized Construction": "#3F6B3F",
  "Insurance & Claims": "#A6472B",
  "Consultants & Advisory": "#6B4068",
};

export default function QuizzesIndexPage() {
  const { quizzes } = getAllContent();
  const generalQuiz = quizzes.find((quiz) => !quiz.category);
  const categoryQuizzes = quizzes
    .filter((quiz): quiz is CareerMatchQuiz & { category: string } => Boolean(quiz.category))
    .sort((a, b) => CAREER_CATEGORY_ORDER.indexOf(a.category) - CAREER_CATEGORY_ORDER.indexOf(b.category));

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-5xl font-bold text-ink">Career Quizzes</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-steel">
        Not sure where you fit yet? Start with the full quiz below. Already know your category and just
        want the specific career inside it? Jump straight to that one.
      </p>

      {generalQuiz && (
        <Link
          href={urlFor(generalQuiz)}
          className="mt-10 flex flex-col gap-4 border-2 border-navy bg-navy px-8 py-10 text-paper transition-colors hover:border-amber-soft sm:flex-row sm:items-center sm:justify-between sm:gap-10"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber-soft">Start here</span>
            <h2 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl">{generalQuiz.title}</h2>
            <p className="mt-2 max-w-xl text-base leading-relaxed text-paper/80 sm:text-lg">{generalQuiz.tagline}</p>
          </div>
          <span className="shrink-0 text-sm font-bold uppercase tracking-wide text-amber-soft group-hover:underline">
            Take the quiz &rarr;
          </span>
        </Link>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categoryQuizzes.map((quiz) => {
          const accent = CATEGORY_ACCENT[quiz.category] ?? "#1F3F52";
          return (
            <Link
              key={quiz.id}
              href={urlFor(quiz)}
              style={{ borderColor: accent }}
              className="group flex h-full flex-col gap-3 border-2 bg-white/40 px-6 py-7 transition-colors hover:bg-white/70"
            >
              <span className="h-1.5 w-10 shrink-0" style={{ backgroundColor: accent }} aria-hidden="true" />
              <h3 className="font-display text-xl font-bold leading-snug text-ink">{quiz.category}</h3>
              <p className="flex-1 text-sm leading-snug text-steel">{quiz.tagline}</p>
              <span className="text-xs font-bold uppercase tracking-wide" style={{ color: accent }}>
                Take the quiz &rarr;
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
