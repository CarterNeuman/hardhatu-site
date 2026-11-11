"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { SignInButton, useUser } from "@clerk/nextjs";
import { urlFor } from "@/lib/content-client";
import { CAREER_CATEGORY_ORDER } from "@/lib/types";
import type { Career, Lesson } from "@/lib/types";
import { CATEGORY_SLUG } from "@/components/Header";
import { Icon } from "@/components/Icon";

const MAX_MATCHES = 4;

// Google sign-in (unlike Clerk's email-code flow, which stays inside the
// modal with no navigation) redirects the whole tab out to Google and
// back, a real page reload that wipes any state held only in React
// memory. A visitor who finishes the quiz, hits the sign-in gate, and
// signs in with Google would otherwise land back on a blank quiz instead
// of their result. Fix: stash the finished result in sessionStorage the
// moment it's computed, and restore it on mount if present, so a page
// reload (OAuth redirect included) picks up right where it left off.
// sessionStorage, not localStorage, deliberately: this should survive a
// same-tab reload, not persist indefinitely across visits.
const PENDING_RESULT_KEY = "hhu_quiz_pending_result";

type StoredQuizResult = {
  result: string;
  categoryScores: Record<string, number>;
  careerScores: Record<string, number>;
};

function readStoredResult(): StoredQuizResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(PENDING_RESULT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.result === "string") return parsed as StoredQuizResult;
    return null;
  } catch {
    return null;
  }
}

// Only the handful of fields the result screen actually renders. The
// quiz page used to hand this client component every career and every
// lesson in full (pay timelines, lesson sections, the lot) -- well over
// a megabyte of data serialized into the page for a screen that shows a
// title and one line of text per item. See app/quizzes/[slug]/page.tsx.
export type QuizCareer = Pick<Career, "id" | "type" | "slug" | "title" | "tagline">;
export type QuizLesson = Pick<Lesson, "id" | "type" | "slug" | "title" | "minutes">;

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

// Which lessons to recommend per matched category, and a short line tying
// each one back to that category. Hand-picked rather than purely derived
// from each lesson's own strongest career-category count, since this is
// about a good first few lessons to try, not a mechanical tally. Like
// CATEGORY_BLURB above, worth promoting into the quiz's own frontmatter if
// a second, more specific quiz ever gets built. Lesson ids are checked
// against the real content at render time, so a renamed/removed lesson
// just drops out instead of breaking the page.
const CATEGORY_LESSONS: Record<string, { id: string; blurb: string }[]> = {
  "Field & Trades": [
    { id: "lesson-a-day-as-a-laborer", blurb: "A front-row seat to every trade above." },
    { id: "lesson-jobsite-safety-in-practice", blurb: "The JHAs and stop-work calls that keep this work survivable." },
    { id: "lesson-framing-and-rough-carpentry", blurb: "Headers and span tables, from the carpenter's side." },
    { id: "lesson-heavy-equipment-and-earthwork", blurb: "Where the equipment operator match spends its day." },
  ],
  "Project & Operations": [
    { id: "lesson-whos-actually-running-the-job", blurb: "The chain of command a super and PM actually answer to." },
    { id: "lesson-coordinating-subs-as-a-superintendent", blurb: "Catching a scheduling conflict before it hits the field." },
    { id: "lesson-jobsite-safety-in-practice", blurb: "What a safety manager's day actually looks like." },
    { id: "lesson-project-closeout", blurb: "The punch list and paperwork that end a job well." },
  ],
  "Preconstruction & Estimating": [
    { id: "lesson-a-day-in-the-life-of-an-estimator", blurb: "Building the number behind the number." },
    { id: "lesson-bidding-and-winning-work", blurb: "Why the lowest bid doesn't always win the job." },
    { id: "lesson-the-estimate-becomes-the-budget", blurb: "What happens to an estimate the day after it's signed." },
    { id: "lesson-value-engineering", blurb: "Cutting cost without cutting what the owner actually needs." },
  ],
  Business: [
    { id: "lesson-getting-paid", blurb: "The real chain between a pay application and a check." },
    { id: "lesson-procurement-and-long-lead-logistics", blurb: "Keeping an early head start from slipping away." },
    { id: "lesson-subcontractor-buyout-and-scope-gaps", blurb: "Closing the cracks between one trade's scope and the next." },
    { id: "lesson-financing-and-feasibility", blurb: "Deciding whether a project is worth building at all." },
  ],
  "Technology & Design": [
    { id: "lesson-bim-and-clash-detection", blurb: "Catching a beam-and-ductwork conflict before it hits the field." },
    { id: "lesson-drones-scanning-and-mapping", blurb: "Turning a flyover into a survey-grade map." },
    { id: "lesson-3d-modeling-in-practice", blurb: "What a model needs before anyone trusts its clash report." },
  ],
  "Specialized Construction": [
    { id: "lesson-a-day-as-an-owners-rep", blurb: "Translating and protecting the owner's interests on-site." },
    { id: "lesson-green-building-certification", blurb: "How a building actually earns a LEED certification." },
    { id: "lesson-choosing-how-to-build-it", blurb: "Why the same project can be delivered several different ways." },
  ],
  "Insurance & Claims": [
    { id: "lesson-claim-to-restoration", blurb: "How a hailstorm claim becomes a finished repair." },
    { id: "lesson-whos-on-the-hook", blurb: "Bonds, insurance, and who actually pays when something goes wrong." },
  ],
  "Consultants & Advisory": [
    { id: "lesson-schedule-delay-dispute", blurb: "How a late delivery becomes a formal claim." },
    { id: "lesson-permits-inspections-and-the-paper-trail", blurb: "Why a permit can stay open long after the crew moves on." },
    { id: "lesson-reading-a-set-of-plans", blurb: "The sheet numbers and symbols every plan review starts with." },
    { id: "lesson-when-its-not-the-storms-fault", blurb: "Sorting a design defect from a construction one." },
  ],
};

// One stop on the result screen's career/lesson "trail": a circle (career)
// or square (lesson) icon tile, a title, and a short line underneath, wired
// up as a real link. Shared by both trail rows below so they stay visually
// identical apart from the icon shape.
function TrailStop({
  href,
  iconKind,
  shape,
  title,
  meta,
  blurb,
}: {
  href: string;
  iconKind: "career" | "lesson";
  shape: "circle" | "square";
  title: string;
  meta?: string;
  blurb: string;
}) {
  return (
    <Link href={href} className="group flex w-full flex-col items-center gap-2 text-center sm:w-40">
      <span
        className={`flex h-14 w-14 shrink-0 items-center justify-center border-2 border-hairline bg-paper transition-colors group-hover:border-navy ${
          shape === "circle" ? "rounded-full" : ""
        }`}
      >
        <Icon kind={iconKind} size={22} className="text-clay" />
      </span>
      <span className="font-display text-base font-bold text-ink group-hover:text-navy">{title}</span>
      {meta && <span className="text-xs font-semibold uppercase tracking-wide text-steel">{meta}</span>}
      <span className="line-clamp-2 text-sm leading-snug text-steel">{blurb}</span>
    </Link>
  );
}

// The dashed connector between two trail stops: a vertical dash on narrow
// screens (the stops stack), a horizontal one once they sit in a row.
function TrailConnector({ connectorKey }: { connectorKey: string }) {
  return (
    <span
      key={connectorKey}
      aria-hidden="true"
      className="h-6 w-0.5 self-center border-l-2 border-dashed border-clay sm:h-0.5 sm:w-auto sm:flex-1 sm:border-l-0 sm:border-t-2"
    />
  );
}

export function CareerMatchQuiz({
  questions,
  careersByCategory,
  lessonsById,
}: {
  questions: QuizQuestion[];
  careersByCategory: Record<string, QuizCareer[]>;
  lessonsById: Record<string, QuizLesson>;
}) {
  // Deliberately plain defaults here, not a sessionStorage read -- the
  // server has no access to sessionStorage, so seeding these from it on
  // first render would make the client's first render disagree with
  // what the server sent down, a hydration mismatch (React requires the
  // two to match exactly). Restoring a stashed result happens in the
  // effect below instead, which only ever runs after hydration.
  const [step, setStep] = useState(0);
  const [categoryScores, setCategoryScores] = useState<Record<string, number>>({});
  const [careerScores, setCareerScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<string | null>(null);

  const allCareers = useMemo(() => Object.values(careersByCategory).flat(), [careersByCategory]);
  const { isSignedIn, isLoaded, user } = useUser();
  const savedResultRef = useRef<string | null>(null);
  const lastUserIdRef = useRef<string | null>(null);
  // When the result on screen was loaded from the visitor's account
  // (see the "returning visitor" effect below) rather than just earned,
  // this holds the date it was saved, for the small note on the result
  // screen. Null for a result produced in this sitting.
  const [savedAt, setSavedAt] = useState<string | null>(null);
  // Mirrors of state for the async fetch below, which must check the
  // CURRENT values when it resolves, not the ones from when it started.
  const resultRef = useRef<string | null>(null);
  const stepRef = useRef(0);
  resultRef.current = result;
  stepRef.current = step;
  const fetchedForUserRef = useRef<string | null>(null);

  // Returning visitor: a signed-in person who already took the quiz
  // sees their last saved result instead of a blank quiz (it used to be
  // lost on any reload, even though it was sitting in the database).
  // Runs once per signed-in account, and never overrides anything in
  // progress: it only applies if no result is showing and the visitor
  // hasn't answered a question yet by the time the fetch comes back.
  // "Take the quiz again" still works -- restart() doesn't re-trigger it.
  useEffect(() => {
    const userId = user?.id;
    if (!isLoaded || !userId) return;
    if (fetchedForUserRef.current === userId) return;
    fetchedForUserRef.current = userId;
    if (resultRef.current) return;
    let cancelled = false;
    fetch("/api/quiz-results")
      .then((res) => res.json())
      .then(
        (data: {
          ok?: boolean;
          result?: { resultCategory: string; matchedCareerIds: string[]; createdAt: string } | null;
        }) => {
          if (cancelled || !data?.ok || !data.result) return;
          if (resultRef.current || stepRef.current !== 0) return;
          const saved = data.result;
          if (!careersByCategory[saved.resultCategory]) return;
          // Only the category and the matched careers were stored, not
          // the raw answer tallies -- rebuild a score map that ranks the
          // saved careers in their saved order, which is all the result
          // screen's matching logic needs to show the same list again.
          const ids = Array.isArray(saved.matchedCareerIds) ? saved.matchedCareerIds : [];
          const rebuiltScores: Record<string, number> = {};
          ids.forEach((id, i) => {
            rebuiltScores[id] = ids.length - i;
          });
          // Mark as already saved BEFORE showing it, so the save effect
          // doesn't write this same result back as a brand-new attempt.
          savedResultRef.current = saved.resultCategory;
          setCareerScores(rebuiltScores);
          setCategoryScores({ [saved.resultCategory]: 1 });
          setSavedAt(saved.createdAt);
          setResult(saved.resultCategory);
        }
      )
      .catch(() => {
        // Best effort -- a failed lookup just means the quiz starts
        // blank, exactly as it did before this existed.
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, user?.id]);

  // A result belongs to whoever was signed in when it was produced. If
  // the account changes while this page stays mounted (sign out, or
  // sign out and a different person signs in through the modal, which
  // doesn't reload the page), wipe the quiz back to the start so one
  // account's result can never be shown to -- or saved under -- another.
  // A signed-out visitor finishing the quiz and THEN signing in is the
  // normal flow and is left alone (previous id is null in that case).
  useEffect(() => {
    if (!isLoaded) return;
    const currentId = user?.id ?? null;
    const previousId = lastUserIdRef.current;
    lastUserIdRef.current = currentId;
    if (previousId && previousId !== currentId) {
      restart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, user?.id]);

  // Runs once after mount (post-hydration, client-only), restoring a
  // stashed result if a sign-in redirect reloaded the page mid-quiz.
  // Cleared immediately after being read -- its only job is surviving
  // that one reload, and leaving it in sessionStorage any longer let a
  // second person who signs into a different account in the same
  // browser tab see (and silently re-save under their own account) the
  // first person's result. See the save effect below for the other
  // half of this fix -- it also clears the stash once a result is
  // actually saved, so a result that was never restored this way still
  // can't outlive the session that produced it.
  useEffect(() => {
    const stored = readStoredResult();
    if (!stored) return;
    setCategoryScores(stored.categoryScores);
    setCareerScores(stored.careerScores);
    setResult(stored.result);
    try {
      window.sessionStorage.removeItem(PENDING_RESULT_KEY);
    } catch {
      // Non-fatal -- worst case the stash lingers until the next clear.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the stash fresh any time a result exists, so it's there to
  // restore from if a sign-in redirect reloads the page next.
  // Signed-out visitors only: once someone is signed in, their result is
  // saved to (or was loaded from) their account, so there's nothing a
  // stash needs to carry -- and leaving one behind is exactly what let a
  // result bleed into the next account used in the same tab.
  useEffect(() => {
    if (!result || isSignedIn) return;
    try {
      window.sessionStorage.setItem(
        PENDING_RESULT_KEY,
        JSON.stringify({ result, categoryScores, careerScores })
      );
    } catch {
      // sessionStorage can throw (private browsing, storage disabled) --
      // worst case the restart-after-reload bug returns, not fatal.
    }
  }, [result, categoryScores, careerScores, isSignedIn]);

  // Computed here (not inside the `if (result)` block below) so this hook
  // always runs in the same order regardless of whether a result exists
  // yet -- React requires that. Same matching logic as before: specific
  // careers the answers pointed to, highest-scored first, falling back to
  // the winning category's other careers if that doesn't fill all slots.
  const matches = useMemo<QuizCareer[]>(() => {
    if (!result) return [];
    const scored = allCareers
      .filter((career) => (careerScores[career.id] ?? 0) > 0)
      .sort((a, b) => (careerScores[b.id] ?? 0) - (careerScores[a.id] ?? 0));
    const out: QuizCareer[] = [];
    const seen = new Set<string>();
    for (const career of scored) {
      if (out.length >= MAX_MATCHES) break;
      out.push(career);
      seen.add(career.id);
    }
    if (out.length < MAX_MATCHES) {
      for (const career of careersByCategory[result] ?? []) {
        if (out.length >= MAX_MATCHES) break;
        if (!seen.has(career.id)) {
          out.push(career);
          seen.add(career.id);
        }
      }
    }
    return out;
  }, [result, careerScores, allCareers, careersByCategory]);

  // Save the result once per completed attempt, signed-in users only.
  // Best-effort: a failed save never affects the quiz UX, it's analytics,
  // not a feature the visitor depends on.
  useEffect(() => {
    if (!result || !isSignedIn) return;
    if (savedResultRef.current === result) return;
    savedResultRef.current = result;
    fetch("/api/quiz-results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resultCategory: result, matchedCareerIds: matches.map((c) => c.id) }),
    })
      .then(() => {
        // Once a result is actually saved for this signed-in account,
        // the reload-survival stash has done its job -- clear it so it
        // can never bleed into a different account signing in later in
        // the same browser tab (see the restore effect above).
        try {
          window.sessionStorage.removeItem(PENDING_RESULT_KEY);
        } catch {
          // Non-fatal.
        }
      })
      .catch(() => {
        // Swallowed deliberately, see lib/buttondown.ts for the same pattern.
      });
  }, [result, isSignedIn, matches]);

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
    setSavedAt(null);
    // A retake is a new attempt even if it lands on the same category
    // as last time -- without this reset the save effect's "already
    // saved this result" guard silently skipped it.
    savedResultRef.current = null;
    try {
      window.sessionStorage.removeItem(PENDING_RESULT_KEY);
    } catch {
      // Non-fatal, see the stash effect above.
    }
  }

  if (result) {
    // Don't flash the sign-in gate for a split second while Clerk is
    // still figuring out whether someone's signed in -- wait for
    // isLoaded first. Once loaded, a signed-out visitor sees a short
    // sign-in prompt instead of the real result; the quiz logic above
    // has already run either way, so signing in doesn't mean retaking it.
    if (!isLoaded) {
      return <div className="mt-6" aria-hidden="true" />;
    }

    if (!isSignedIn) {
      return (
        <div className="mt-6 border border-hairline bg-amber-soft px-6 py-10 text-center sm:px-10">
          <h2 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Your results are ready.
          </h2>
          <p className="mx-auto mt-3 max-w-[48ch] leading-relaxed text-ink">
            Sign in free to see which careers match your answers, plus where to start learning.
          </p>
          <div className="mt-6 flex justify-center">
            <SignInButton mode="modal">
              <button
                type="button"
                className="bg-navy px-6 py-3 text-base font-semibold text-paper transition-colors hover:bg-ink"
              >
                Sign In to See My Results
              </button>
            </SignInButton>
          </div>
        </div>
      );
    }

    const slug = CATEGORY_SLUG[result] ?? "";

    const recommendedLessons = (CATEGORY_LESSONS[result] ?? [])
      .map((rec) => {
        const lesson = lessonsById[rec.id];
        return lesson ? { lesson, blurb: rec.blurb } : null;
      })
      .filter((entry): entry is { lesson: QuizLesson; blurb: string } => entry !== null);

    return (
        <div className="mt-6">
          <div className="border border-hairline bg-amber-soft px-6 py-8 sm:px-10 sm:py-10">
            <h2 className="font-display text-4xl font-bold leading-[0.95] text-ink sm:text-5xl">
              You&rsquo;re built for
              <br />
              {result}.
            </h2>
            <p className="mt-4 max-w-[58ch] leading-relaxed text-ink">{CATEGORY_BLURB[result]}</p>
            {savedAt && (
              <p className="mt-4 text-sm text-steel">
                Your saved result from{" "}
                {new Date(savedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.
                Want a fresh read? Take the quiz again below.
              </p>
            )}
          </div>

          {matches.length > 0 && (
            <div className="mt-10">
              <p className="text-sm font-semibold uppercase tracking-wide text-steel">
                Careers that fit your answers
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                {matches.flatMap((career, i) => {
                  const stop = (
                    <TrailStop
                      key={career.id}
                      href={urlFor(career)}
                      iconKind="career"
                      shape="circle"
                      title={career.title}
                      blurb={career.tagline ?? ""}
                    />
                  );
                  if (i === matches.length - 1) return [stop];
                  return [stop, <TrailConnector key={`${career.id}-connector`} connectorKey={`${career.id}-connector`} />];
                })}
              </div>
            </div>
          )}

          {recommendedLessons.length > 0 && (
            <>
              <div className="my-8 flex justify-center">
                <span aria-hidden="true" className="h-6 w-0.5 border-l-2 border-dashed border-clay" />
              </div>
              <p className="-mt-6 text-center text-sm font-semibold uppercase tracking-wide text-steel">
                Then, start learning
              </p>

              <div className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-steel">Where to start, in order</p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                  {recommendedLessons.flatMap(({ lesson, blurb }, i) => {
                    const stop = (
                      <TrailStop
                        key={lesson.id}
                        href={urlFor(lesson)}
                        iconKind="lesson"
                        shape="square"
                        title={lesson.title}
                        meta={`${lesson.minutes} min`}
                        blurb={blurb}
                      />
                    );
                    if (i === recommendedLessons.length - 1) return [stop];
                    return [
                      stop,
                      <TrailConnector key={`${lesson.id}-connector`} connectorKey={`${lesson.id}-connector`} />,
                    ];
                  })}
                </div>
              </div>
            </>
          )}

          <div className="mt-10 border-t border-hairline pt-6 text-center">
            <p className="mx-auto max-w-[62ch] text-base italic leading-relaxed text-steel">
              And if none of this is the path for you, every other field in construction stays just as
              open, all it really takes to switch tracks is commitment and a willingness to learn.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6">
            <Link href={`/careers#${slug}`} className="text-base font-semibold text-navy hover:underline">
              See all careers in {result} &rarr;
            </Link>
            <button
              onClick={restart}
              className="border border-ink px-4 py-2 text-base font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Take the quiz again
            </button>
          </div>
        </div>
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
