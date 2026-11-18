import type { Lesson } from "@/lib/types";
import { Prose } from "@/components/Prose";

// The paper version of a lesson, rendered alongside the interactive page
// but only visible when printing (see the .print-lesson / .print-key rules
// in app/globals.css and LessonPrintButtons).
//
//  - .print-lesson: a classroom worksheet. The reading, with each check-in
//    question printed as a numbered multiple-choice item with blank boxes
//    and no answer shown. This is also what a plain Ctrl+P / Cmd+P prints.
//  - .print-key: a separate answer key -- every question with the correct
//    letter, the answer text and the explanation. Only printed when someone
//    clicks "Print answer key", never alongside the worksheet.
const letter = (i: number) => String.fromCharCode(65 + i);

export function PrintableLesson({ lesson }: { lesson: Lesson }) {
  const questions = lesson.sections.flatMap((s) => (s.quiz ? [s.quiz] : []));
  let n = 0;

  return (
    <div className="print-sheet hidden print:block">
      <div className="print-lesson">
        <p className="text-xs font-semibold uppercase tracking-wide">BreakGroundU &middot; Lesson</p>
        <h1 className="mt-1 font-display text-3xl font-bold">{lesson.title}</h1>
        <p className="mt-1 text-sm">{lesson.minutes} min read</p>
        {questions.length > 0 && (
          <p className="mt-4 text-sm">
            Name ______________________________ &nbsp;&nbsp; Date ______________ &nbsp;&nbsp; Class ____________
          </p>
        )}

        {lesson.sections.map((section, i) => {
          const q = section.quiz;
          const num = q ? ++n : 0;
          return (
            <div key={i} className="mt-4">
              <Prose text={section.content} />
              {q && (
                <div className="mt-4 border border-black px-4 py-3" style={{ breakInside: "avoid" }}>
                  <p className="font-semibold">
                    {num}. {q.question}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {q.options.map((opt, j) => (
                      <li key={j} className="flex gap-2">
                        <span aria-hidden="true">&#9744;</span>
                        <span>
                          {letter(j)}. {opt}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}

        <p className="mt-8 text-xs">From breakgroundu.com &middot; Free to print and share for classroom use.</p>
      </div>

      {questions.length > 0 && (
        <div className="print-key">
          <p className="text-xs font-semibold uppercase tracking-wide">BreakGroundU &middot; Answer key</p>
          <h1 className="mt-1 font-display text-3xl font-bold">{lesson.title}</h1>
          <p className="mt-1 text-sm">
            {questions.length} question{questions.length === 1 ? "" : "s"}. For the teacher, not the student copy.
          </p>
          <ol className="mt-6 space-y-5">
            {questions.map((q, i) => (
              <li key={i} style={{ breakInside: "avoid" }}>
                <p className="font-semibold">
                  {i + 1}. {q.question}
                </p>
                <p className="mt-1">
                  <span className="font-semibold">Answer: {letter(q.answerIndex)}.</span> {q.options[q.answerIndex]}
                </p>
                {q.explanation && <p className="mt-1 text-sm">Why: {q.explanation}</p>}
              </li>
            ))}
          </ol>
          <p className="mt-8 text-xs">From breakgroundu.com</p>
        </div>
      )}
    </div>
  );
}
