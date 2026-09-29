"use client";

import { useState } from "react";

export type QuizQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
};

// One check-in question, dropped in after a couple of minutes of reading
// rather than all questions piling up at the end. Tests judgment, not
// recall, and always explains its reasoning once answered — the
// explanation is the actual lesson; the click is just what earns it.
export function QuizBlock({
  quiz,
  index,
  total,
}: {
  quiz: QuizQuestion;
  index: number;
  total: number;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const isCorrect = selected === quiz.answerIndex;

  return (
    <div className="my-8 border border-hairline bg-white/50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-steel">
        Quick check{total > 1 ? `: ${index + 1} of ${total}` : ""}
      </p>
      <p className="mt-2 font-medium text-ink">{quiz.question}</p>
      <div className="mt-3 flex flex-col gap-2">
        {quiz.options.map((option, i) => {
          const isThisCorrect = i === quiz.answerIndex;
          const isThisSelected = selected === i;
          return (
            <button
              key={option}
              onClick={() => setSelected(i)}
              disabled={answered}
              className={`border px-3 py-2 text-left text-sm transition-colors ${
                answered && isThisCorrect
                  ? "border-navy bg-amber-soft text-ink"
                  : answered && isThisSelected && !isThisCorrect
                    ? "border-clay text-clay"
                    : "border-hairline text-ink enabled:hover:border-navy"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {answered && (
        <p className="mt-3 text-sm text-steel">
          {isCorrect ? "Correct. " : `Not quite: the correct answer is "${quiz.options[quiz.answerIndex]}". `}
          {quiz.explanation}
        </p>
      )}
    </div>
  );
}
