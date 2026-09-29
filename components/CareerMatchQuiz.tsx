"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { urlFor } from "@/lib/content-client";
import { CAREER_CATEGORY_ORDER } from "@/lib/types";
import type { Career } from "@/lib/types";
import { CATEGORY_SLUG } from "@/components/Header";
import { ContentCard } from "@/components/ContentCard";
import { EmailGate } from "@/components/EmailGate";

const MAX_MATCHES = 4;

type QuizOption = { label: string; pointsToCategories: string[]; pointsToCareerIds: string[] };
type QuizQuestion = { question: string; options: QuizOption[] };

// Short, plain-language blurbs per category, shown on the result screen.
// Not stored in content since this is the one quiz on the site today —
// worth promoting into the quiz's own frontmatter if a second, more
// specific quiz ever gets built (the schema already supports it).
const CATEGORY_BLURB: Record<string, string> = {
  "Field & Trades":
    "Hands-on work: building, wiring, welding, running equipment. You're the reason something exists that wasn't there yesterday.",
  "Project & Operations":
    "Keeping the whole job on track: schedules, crews, safety, and a hundred moving pieces landing on the same day.",
  "Preconstruction & Estimating":
    "Numbers before the first shovel hits dirt: bids, budgets, and figuring out exactly what a project will cost.",
  Business: "Contracts, sales, payroll, and the deals that decide who gets hired and who gets paid what.",
  "Technology & Design":
    "3D models, drones, and data, the tools that catch problems before they cost anyone real money.",
  "Specialized Construction":
    "Niche, high-stakes work: environmental cleanup, facilities, and projects that need a specialist's eye.",
  "Insurance & Claims":
    "Figuring out what got damaged, what it's worth, and how to make it right after something goes wrong.",
  "Consultants & Advisory":
    "Called in when things get complicated: disputes, delays, and expert opinions that carry real weight.",
};

export function CareerMatchQuiz({
  questions,
  careersByCategory,
}: {
  questions: QuizQuestion[];
  careersByCategory: Record<string, Career[]>;
}) {
  const [step, setStep] = useState(0);
  const [categoryScores, setCategoryScores] = useState<Record<string, number>>({});
  const [careerScores, setCareerScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<string | null>(null);

  const allCareers = useMemo(() => Object.values(careersByCategory).flat(), [careersByCategory]);

  function pick(option: QuizOption) {
    const nextCategoryScores = { ...categoryScores };
    for (const category of option.pointsToCategories) {
      nextCategoryScores[category] = (nextCategoryScores[category] ?? 0) + 1;
    }
    const nextCareerScores = { ...careerScores };
    for (const careerId of option.pointsToCareerIds) {
      nextCareerScores[careerId] = (nextCareerScores[careerId] ?? 0) + 1;
    }
    setCategoryScores(nextCategoryScores);
    setCareerScores(nextCareerScores);

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      let winner = CAREER_CATEGORY_ORDER[0];
      let best = -1;
      for (const category of CAREER_CATEGORY_ORDER) {
        const score = nextCategoryScores[category] ?? 0;
        if (score > best) {
          best = score;
          winner = category;
        }
      }
      setResult(winner);
    }
  }

  function restart() {
    setStep(0);
    setCategoryScores({});
    setCareerScores({});
    setResult(null);
  }

  if (result) {
    const slug = CATEGORY_SLUG[result] ?? "";

    // Lead with whichever specific careers the actual answers pointed
    // toward (via pointsToCareerIds), highest-scored first. If that
    // didn't produce enough signal, one hard fallback: the winning
    // category's other careers fill the remaining slots.
    const scored = allCareers
      .filter((career) => (careerScores[career.id] ?? 0) > 0)
      .sort((a, b) => (careerScores[b.id] ?? 0) - (careerScores[a.id] ?? 0));

    const matches: Career[] = [];
    const seen = new Set<string>();
    for (const career of scored) {
      if (matches.length >= MAX_MATCHES) break;
      matches.push(career);
      seen.add(career.id);
    }
    if (matches.length < MAX_MATCHES) {
      for (const career of careersByCategory[result] ?? []) {
        if (matches.length >= MAX_MATCHES) break;
        if (!seen.has(career.id)) {
          matches.push(career);
          seen.add(career.id);
        }
      }
    }

    return (
      <EmailGate variant="immediate" source="quiz-result">
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-clay">Your best-fit area</p>
          <h2 className="mt-1 font-display text-3xl font-bold text-ink">{result}</h2>
          <p className="mt-2 max-w-[55ch] leading-relaxed text-ink">{CATEGORY_BLURB[result]}</p>

          {matches.length > 0 && (
            <>
              <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-steel">
                Careers that fit your answers
              </p>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {matches.map((career) => (
                  <ContentCard key={career.id} item={career} description={career.tagline} />
                ))}
              </div>
            </>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link href={`/careers#${slug}`} className="text-sm font-semibold text-navy hover:underline">
              See all careers in {result} →
            </Link>
            <button
              onClick={restart}
              className="border border-ink px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Take the quiz again
            </button>
          </div>
        </div>
      </EmailGate>
    );
  }

  const question = questions[step];

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-steel">
          Question {step + 1} of {questions.length}
        </p>
      </div>
      <div className="mt-2 h-1 w-full bg-hairline">
        <div
          className="h-1 bg-navy transition-all"
          style={{ width: `${(step / questions.length) * 100}%` }}
        />
      </div>

      <p className="mt-5 font-display text-2xl font-bold text-ink">{question.question}</p>
      <div className="mt-4 flex flex-col gap-2.5">
        {question.options.map((option) => (
          <button
            key={option.label}
            onClick={() => pick(option)}
            className="border border-hairline bg-white/40 px-4 py-3 text-left text-sm text-ink transition-colors hover:border-navy hover:bg-white/70"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
