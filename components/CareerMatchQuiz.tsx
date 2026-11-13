"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { SignInButton, useUser } from "@clerk/nextjs";
import { urlFor, CATEGORY_QUIZ_SLUG } from "@/lib/content-client";
import { CAREER_CATEGORY_ORDER } from "@/lib/types";
import type { Career, Lesson } from "@/lib/types";
import { CATEGORY_SLUG } from "@/components/Header";
import { Icon } from "@/components/Icon";

const MAX_MATCHES_FULL = 6;
const MAX_MATCHES_COMPACT = 3;

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

// Quiz v2: a small, hand-picked accent color per career category, used
// only inside this component rather than added to the global Tailwind
// palette -- everywhere else on the site stays on the real brand tokens
// (paper/ink/navy/amber/clay/steel). This is a deliberate, scoped
// exception for the quizzes specifically, the same way the /get-hired
// hub's arched "jobsite entry gate" tiles are the one place that page
// breaks from sharp corners. The quiz keeps sharp corners throughout;
// color carries the "eye-catching, colorful" feel instead of shape.
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
const DEFAULT_ACCENT = CATEGORY_ACCENT["Project & Operations"];

// The quiz's full-bleed diagonal gradient backdrop, matching the
// approved quiz v2 mockup exactly: real site navy at one end, a fixed
// near-black anchor in the middle (keeps every category's gradient
// reading as "the same quiz" rather than 8 unrelated color schemes),
// and the category's own accent at the other end.
function quizGradient(accent: string) {
  return `linear-gradient(135deg, #1F3F52 0%, #14233A 48%, ${accent} 160%)`;
}


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
  accent = "#8A4A31",
}: {
  href: string;
  iconKind: "career" | "lesson";
  shape: "circle" | "square";
  title: string;
  meta?: string;
  blurb: string;
  // Defaults to the original clay-ish tone so any other caller of this
  // component (there are none today) keeps its original look.
  accent?: string;
}) {
  return (
    <Link
      href={href}
      style={{ "--accent": accent } as React.CSSProperties}
      className="group flex w-full flex-col items-center gap-2 text-center sm:w-40"
    >
      <span
        className={`flex h-14 w-14 shrink-0 items-center justify-center border-2 bg-white transition-colors group-hover:[border-color:var(--accent)] ${
          shape === "circle" ? "rounded-full" : "rounded-xl"
        }`}
        style={{ borderColor: "#E4DED2" }}
      >
        <Icon kind={iconKind} size={22} className="[color:var(--accent)]" />
      </span>
      <span className="font-display text-base font-bold text-ink group-hover:[color:var(--accent)]">{title}</span>
      {meta && <span className="text-xs font-semibold uppercase tracking-wide text-steel">{meta}</span>}
      <span className="line-clamp-2 text-sm leading-snug text-steel">{blurb}</span>
    </Link>
  );
}

// The dashed connector between two trail stops: a vertical dash on narrow
// screens (the stops stack), a horizontal one once they sit in a row.
function TrailConnector({ connectorKey, accent = "#8A4A31" }: { connectorKey: string; accent?: string }) {
  return (
    <span
      key={connectorKey}
      aria-hidden="true"
      style={{ borderColor: accent }}
      className="h-6 w-0.5 self-center border-l-2 border-dashed sm:h-0.5 sm:w-auto sm:flex-1 sm:border-l-0 sm:border-t-2"
    />
  );
}

export function CareerMatchQuiz({
  questions,
  careersByCategory,
  lessonsById,
  category,
}: {
  questions: QuizQuestion[];
  careersByCategory: Record<string, QuizCareer[]>;
  lessonsById: Record<string, QuizLesson>;
  // Set for one of the 8 category-scoped quizzes (content/quizzes/*-match.md).
  // Undefined for the original general quiz, which keeps its existing
  // category-vs-category tie-break behavior untouched.
  category?: string;
}) {
  const accent = CATEGORY_ACCENT[category ?? ""] ?? DEFAULT_ACCENT;
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
  // One entry per question actually answered so far (length === step),
  // kept so goBack() can undo exactly the points the last pick added
  // rather than wiping the whole attempt -- see goBack() below.
  const [answerHistory, setAnswerHistory] = useState<QuizOption[]>([]);
  // The two-stage select animation from the approved quiz v2 mockup:
  // clicking an option highlights it in place for a beat, then the
  // whole panel fades/slides out, and only once it's fully gone does
  // the real scoring and step/result change happen -- see pick() and
  // applyAnswer() below.
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [leaving, setLeaving] = useState(false);

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
    // Show the full 6-wide trail only when there are enough real
    // (answer-driven) matches to earn it -- otherwise a thinner 3-wide
    // trail reads as a tighter, more confident result instead of
    // padding a weak match list out with generic category filler.
    const target = scored.length >= MAX_MATCHES_FULL ? MAX_MATCHES_FULL : MAX_MATCHES_COMPACT;
    const out: QuizCareer[] = [];
    const seen = new Set<string>();
    for (const career of scored) {
      if (out.length >= target) break;
      out.push(career);
      seen.add(career.id);
    }
    if (out.length < target) {
      for (const career of careersByCategory[result] ?? []) {
        if (out.length >= target) break;
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

  // The actual scoring + step/result advance, unchanged from before --
  // just pulled out of pick() so pick() can run it after the exit
  // animation finishes instead of immediately on click.
  function applyAnswer(option: QuizOption) {
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
    setAnswerHistory((prev) => [...prev, option]);

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else if (category) {
      // Category-scoped quiz: the category is fixed going in, so
      // there's no category-vs-category tie-break to run here. The
      // `matches` memo below ranks this category's own careers by
      // nextCareerScores -- its top entry is the real result.
      setResult(category);
    } else {
      // Highest category score wins. Ties used to go to whichever
      // category came first in CAREER_CATEGORY_ORDER, which meant every
      // tie landed on Field & Trades no matter what else the answers
      // said. Ties are now settled by the answers themselves: the tied
      // category whose specific careers collected the most points wins,
      // then the one holding the single strongest career match. Only if
      // the answers truly can't separate them does list order decide.
      const best = Math.max(0, ...CAREER_CATEGORY_ORDER.map((c) => nextCategoryScores[c] ?? 0));
      const tied = CAREER_CATEGORY_ORDER.filter((c) => (nextCategoryScores[c] ?? 0) === best);
      const careerPoints = (cat: string) =>
        (careersByCategory[cat] ?? []).map((career) => nextCareerScores[career.id] ?? 0);
      let winner: string = tied[0] ?? CAREER_CATEGORY_ORDER[0];
      let winnerTotal = -1;
      let winnerPeak = -1;
      for (const cat of tied) {
        const points = careerPoints(cat);
        const total = points.reduce((sum, n) => sum + n, 0);
        const peak = points.length > 0 ? Math.max(...points) : 0;
        if (total > winnerTotal || (total === winnerTotal && peak > winnerPeak)) {
          winner = cat;
          winnerTotal = total;
          winnerPeak = peak;
        }
      }
      setResult(winner);
    }
  }

  // Highlights the clicked option, waits a beat, fades the panel out,
  // then actually applies the answer and swaps in the next question or
  // result -- the same two-stage feel as the approved mockup. Clicks
  // are ignored while a panel is already mid-exit so a fast double
  // click can't double-score a question.
  function pick(option: QuizOption) {
    if (leaving) return;
    setSelectedOption(option);
    window.setTimeout(() => {
      setLeaving(true);
      window.setTimeout(() => {
        applyAnswer(option);
        setSelectedOption(null);
        setLeaving(false);
      }, 340);
    }, 400);
  }

  // Undoes the most recently answered question -- subtracts exactly the
  // points that pick added (so earlier answers are untouched) and steps
  // back to it so it can be answered again. Only reachable mid-quiz
  // (step > 0); once a result exists, "Take the quiz again" is the way
  // back, not this.
  function goBack() {
    if (step === 0 || leaving) return;
    const lastOption = answerHistory[answerHistory.length - 1];
    if (lastOption) {
      const nextCategoryScores = { ...categoryScores };
      for (const category of lastOption.pointsToCategories) {
        nextCategoryScores[category] = (nextCategoryScores[category] ?? 0) - 1;
      }
      const nextCareerScores = { ...careerScores };
      for (const careerId of lastOption.pointsToCareerIds) {
        nextCareerScores[careerId] = (nextCareerScores[careerId] ?? 0) - 1;
      }
      setCategoryScores(nextCategoryScores);
      setCareerScores(nextCareerScores);
      setAnswerHistory((prev) => prev.slice(0, -1));
    }
    setStep(step - 1);
  }

  function restart() {
    setStep(0);
    setCategoryScores({});
    setCareerScores({});
    setResult(null);
    setSavedAt(null);
    setAnswerHistory([]);
    setSelectedOption(null);
    setLeaving(false);
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

  // A unique-per-screen key -- the current question (by index) or the
  // final result -- so the fade/slide transition below re-triggers
  // every time the quiz actually moves to a new screen, not on every
  // re-render. Unique transitions per screen were part of the quiz v2
  // brainstorm; this is the one mechanism driving all of them, done in
  // plain CSS transitions (no animation library in this project) and
  // skipped outright for prefers-reduced-motion.
  const screenKey = result ?? `step-${step}`;
  const [screenVisible, setScreenVisible] = useState(false);
  useEffect(() => {
    setScreenVisible(false);
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setScreenVisible(true);
      return;
    }
    const raf = requestAnimationFrame(() => setScreenVisible(true));
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenKey]);
  const screenTransitionClass = `transition-all duration-300 ease-out ${
    screenVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
  }`;

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
        <div
          className={`mt-6 rounded-[28px] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.28)] sm:p-8 ${screenTransitionClass}`}
          style={{ background: quizGradient(accent) }}
        >
          <div className="rounded-[20px] bg-paper px-6 py-10 text-center sm:px-10">
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
                  className="rounded-full px-6 py-3 text-base font-semibold text-paper transition-opacity hover:opacity-90"
                  style={{ backgroundColor: accent }}
                >
                  Sign In to See My Results
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      );
    }

    const slug = CATEGORY_SLUG[result] ?? "";
    // Category-scoped quiz: the headline result is the top-scored
    // specific career (matches[0]), with the rest of `matches` shown as
    // runners-up. General quiz: unchanged, matches are all shown as a
    // flat "careers that fit" list under the category-level headline.
    const topMatch = category ? matches[0] : null;
    const otherMatches = category ? matches.slice(1) : matches;

    const recommendedLessons = (CATEGORY_LESSONS[result] ?? [])
      .map((rec) => {
        const lesson = lessonsById[rec.id];
        return lesson ? { lesson, blurb: rec.blurb } : null;
      })
      .filter((entry): entry is { lesson: QuizLesson; blurb: string } => entry !== null)
      .slice(0, 3);

    return (
      <div
        className={`mt-6 rounded-[28px] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.28)] sm:p-8 ${screenTransitionClass}`}
        style={{ background: quizGradient(accent) }}
      >
        <div className="flex items-center justify-between px-1 pb-4">
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-paper">
            {category ? `${result} Quiz` : "Career Quiz"}
          </span>
          <span className="text-xs text-paper/85">Your match</span>
        </div>

        <div className="relative overflow-hidden rounded-[20px] bg-paper px-6 py-10 sm:px-10">
          {/* Two slow-floating blurred circles behind the hero copy --
              the one bit of pure decoration the approved mockup asked
              for, reused here exactly (same two keyframes, see
              app/globals.css). */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-7 -top-9 h-28 w-28 rounded-full opacity-25 [animation:quizFloatA_6s_ease-in-out_infinite]"
            style={{ backgroundColor: accent }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 -right-8 h-40 w-40 rounded-full opacity-[0.18] [animation:quizFloatB_7s_ease-in-out_infinite]"
            style={{ backgroundColor: "#1F3F52" }}
          />

          <div className="relative text-center">
            <p className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: accent }}>
              Your best fit
            </p>
            <h2 className="mx-auto mt-2 max-w-[30ch] font-display text-4xl font-bold leading-[0.95] text-ink sm:text-5xl">
              {topMatch ? topMatch.title : result}
            </h2>
            <p className="mx-auto mt-4 max-w-[48ch] leading-relaxed text-steel">
              {topMatch?.tagline || CATEGORY_BLURB[result]}
            </p>
            {savedAt && (
              <p className="mx-auto mt-4 max-w-[48ch] text-sm text-steel">
                Your saved result from{" "}
                {new Date(savedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.
                Want a fresh read? Take the quiz again below.
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={topMatch ? urlFor(topMatch) : `/careers#${slug}`}
                className="rounded-full px-6 py-3 text-sm font-bold text-paper transition-opacity hover:opacity-90"
                style={{ backgroundColor: accent }}
              >
                {topMatch ? `View ${topMatch.title}` : `See all careers in ${result}`} &rarr;
              </Link>
              <button
                type="button"
                onClick={restart}
                className="rounded-full border-2 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink/5"
                style={{ borderColor: "#E4DED2" }}
              >
                Retake
              </button>
            </div>
            {!category && CATEGORY_QUIZ_SLUG[result] && (
              <div
                className="mx-auto mt-6 flex max-w-[46ch] flex-col items-center gap-2 rounded-2xl border-2 px-5 py-4"
                style={{ borderColor: accent }}
              >
                <p className="text-sm text-steel">
                  Now that you know which category fits, let&apos;s dive deeper and find the exact role for you.
                </p>
                <Link
                  href={`/quizzes/${CATEGORY_QUIZ_SLUG[result]}`}
                  className="text-sm font-bold hover:underline"
                  style={{ color: accent }}
                >
                  Narrow it down to a specific career &rarr;
                </Link>
              </div>
            )}
          </div>

          {otherMatches.length > 0 && (
            <div className="relative mt-10">
              <p className="text-sm font-semibold uppercase tracking-wide text-steel">
                {category ? `Other strong fits in ${result}` : "Careers that fit your answers"}
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                {otherMatches.flatMap((career, i) => {
                  const stop = (
                    <TrailStop
                      key={career.id}
                      href={urlFor(career)}
                      iconKind="career"
                      shape="circle"
                      title={career.title}
                      blurb={career.tagline ?? ""}
                      accent={accent}
                    />
                  );
                  if (i === otherMatches.length - 1) return [stop];
                  return [stop, <TrailConnector key={`${career.id}-connector`} connectorKey={`${career.id}-connector`} accent={accent} />];
                })}
              </div>
            </div>
          )}

          {recommendedLessons.length > 0 && (
            <>
              <div className="relative my-8 flex justify-center">
                <span aria-hidden="true" className="h-6 w-0.5 border-l-2 border-dashed" style={{ borderColor: accent }} />
              </div>
              <p className="relative -mt-6 text-center text-sm font-semibold uppercase tracking-wide text-steel">
                Then, start learning
              </p>

              <div className="relative mt-6">
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
                        accent={accent}
                      />
                    );
                    if (i === recommendedLessons.length - 1) return [stop];
                    return [
                      stop,
                      <TrailConnector key={`${lesson.id}-connector`} connectorKey={`${lesson.id}-connector`} accent={accent} />,
                    ];
                  })}
                </div>
              </div>
            </>
          )}

          <div className="relative mt-10 border-t pt-6 text-center" style={{ borderColor: "#E4DED2" }}>
            <p className="mx-auto max-w-[62ch] text-base italic leading-relaxed text-steel">
              And if none of this is the path for you, every other field in construction stays just as
              open, all it really takes to switch tracks is commitment and a willingness to learn.
            </p>
          </div>

          <div className="relative mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-6" style={{ borderColor: "#E4DED2" }}>
            {/* The quiz result's natural next step: a dated plan,
                with the category -- and for a category quiz, the
                specific matched career too -- already picked on the
                Blueprint form. */}
            <Link
              href={
                topMatch
                  ? `/action-plan?category=${slug}&role=${topMatch.slug}`
                  : `/action-plan?category=${slug}`
              }
              className="rounded-full px-5 py-2.5 text-sm font-bold text-paper transition-opacity hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              Build a Blueprint for {topMatch ? topMatch.title : result} &rarr;
            </Link>
            <Link href={`/careers#${slug}`} className="text-sm font-semibold hover:underline" style={{ color: accent }}>
              See all careers in {result} &rarr;
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[step];
  // The panel's own exit animation (set by pick(), see above) --
  // separate from screenTransitionClass, which handles the fade IN of
  // whatever panel is current. Together they reproduce the mockup's
  // two-stage feel: pick an option, it highlights, the panel fades/
  // slides out, then the next one fades in.
  const panelExitStyle: React.CSSProperties = leaving
    ? { opacity: 0, transform: "translateY(16px) scale(0.98)" }
    : { opacity: 1, transform: "translateY(0) scale(1)" };

  return (
    <div
      className={`mt-6 rounded-[28px] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.28)] sm:p-8 ${screenTransitionClass}`}
      style={{ background: quizGradient(accent) }}
    >
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-paper">
          {category ? `${category} Quiz` : "Career Quiz"}
        </span>
        <span className="text-xs text-paper/85">
          Question {step + 1} of {questions.length}
        </span>
      </div>
      {/* A dash per question, filled in as you go, rather than one
          continuous bar -- reads at a glance how many are left, and
          matches the mockup's rounded progress pill. */}
      <div className="mt-3 flex gap-1.5 px-1">
        {questions.map((_, i) => (
          <div key={i} className="h-2 flex-1 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full transition-colors duration-300"
              style={{ backgroundColor: i <= step ? accent : "transparent" }}
            />
          </div>
        ))}
      </div>

      <div
        key={step}
        className="relative mt-4 rounded-[20px] bg-paper px-6 py-9 transition-all duration-300 ease-out sm:px-10"
        style={panelExitStyle}
      >
        <div className="flex items-center justify-between">
          <span className="sr-only">Quiz question</span>
          {step > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="text-xs font-semibold text-steel hover:text-ink hover:underline"
            >
              &larr; Back
            </button>
          )}
        </div>
        <p className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-[28px]">
          {question.question}
        </p>
        <div className="mt-6 flex flex-col gap-3">
          {question.options.map((option) => {
            const isSelected = selectedOption?.label === option.label;
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => pick(option)}
                disabled={leaving}
                style={{
                  backgroundColor: isSelected ? accent : "#FFFFFF",
                  borderColor: isSelected ? accent : "#E4DED2",
                  transform: isSelected ? "scale(0.98)" : "scale(1)",
                  "--accent": accent,
                } as React.CSSProperties}
                className={`rounded-2xl border-2 px-5 py-4 text-left text-[15px] leading-snug transition-all duration-200 ${
                  isSelected ? "text-paper" : "text-ink hover:[border-color:var(--accent)]"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
