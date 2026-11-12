"use client";

// The action-plan generator's intake form and result screen. Generation
// itself is lib/action-plan-generator.ts's buildActionPlan() running on
// data this component already has in memory -- no database involved, and
// a generated plan still lives only in this component's state, so closing
// the tab loses the plan itself (intentional for this phase, not a bug).
// The two exceptions: LiveJobResults below makes its own client-side call
// to /api/jobs for live listings, and the day-by-day checkboxes below
// persist to /api/progress for the signed-in user (see the hydration
// effect and toggleStep), so re-generating the same plan later picks the
// checkmarks back up even though the plan text itself is rebuilt fresh.
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { CAREER_CATEGORY_ORDER } from "@/lib/types";
import { type ApplicationStatus, type GeneratedPlan } from "@/lib/action-plan-generator";
import { buildIcs, downloadIcs } from "@/lib/ics";
import { ActionPlanPrintCalendar } from "@/components/ActionPlanPrintCalendar";
import { ActionPlanForm } from "@/components/ActionPlanForm";
import { ActionPlanResult } from "@/components/ActionPlanResult";
import { generateActionPlan } from "@/lib/action-plan-generate";
import { ActionPlanLoading } from "@/components/ActionPlanLoading";
import type { CategoryData } from "@/lib/action-plan-data";

export type { SlimCareer, SlimLesson, SlimConcept, SlimSoftware, CategoryData } from "@/lib/action-plan-data";

// The "Build my plan" loading screen runs for a randomized duration in
// this range (never the exact same length twice -- see handleSubmit),
// so the site reads as actually doing work rather than faking a fixed
// delay.
const BUILD_DURATION_MS_RANGE: [number, number] = [4000, 5000];
function randomBuildDurationMs(): number {
  const [min, max] = BUILD_DURATION_MS_RANGE;
  return min + Math.random() * (max - min);
}

// A saved plan's intake, as handed down from app/action-plan/page.tsx
// when a resume link (?plan=&career=) matched a row in the database --
// see that page and the resume effect below. createdAt travels as an
// ISO string (Server Component props must be serializable) and is
// turned back into a real Date only where buildActionPlan needs one.
export type InitialPlan = {
  category: string;
  careerId: string; // "general" when no specific career was picked
  status: ApplicationStatus;
  location: string;
  hoursPerWeek: number;
  timelineWeeks: number;
  certsHeld: string;
  createdAt: string;
};

// A head start from a "Build a Blueprint" link elsewhere on the site
// (see app/action-plan/page.tsx): pre-selects the category and, when
// the link came from a career page, the career. careerId is "" for
// "no specific career".
export type PlanPrefill = { category: string; careerId: string };

const DEFAULT_HOURS = 10;

export function ActionPlanBuilder({
  dataByCategory,
  initialPlan,
  prefill,
  intro,
}: {
  // The page's own headline block (app/action-plan/page.tsx), shown
  // above the form only -- once a plan is on screen its header band
  // takes over, so the pitch for building one steps aside.
  intro?: React.ReactNode;
  dataByCategory: Record<string, CategoryData>;
  prefill?: PlanPrefill;
  // When set (a resume link matched a saved plan server-side -- see
  // app/action-plan/page.tsx), the form is skipped entirely and this
  // plan renders immediately on mount instead -- see the resume effect
  // below.
  initialPlan?: InitialPlan;
}) {
  const categories = CAREER_CATEGORY_ORDER.filter((c) => dataByCategory[c]);
  const [category, setCategory] = useState(initialPlan?.category ?? prefill?.category ?? categories[0] ?? "");
  const [careerId, setCareerId] = useState(
    initialPlan ? (initialPlan.careerId === "general" ? "" : initialPlan.careerId) : prefill?.careerId ?? ""
  );
  const [status, setStatus] = useState<ApplicationStatus>(initialPlan?.status ?? "applying");
  const [location, setLocation] = useState(initialPlan?.location ?? "");
  const [hoursPerWeek, setHoursPerWeek] = useState(initialPlan?.hoursPerWeek ?? DEFAULT_HOURS);
  const [timelineWeeks, setTimelineWeeks] = useState(initialPlan?.timelineWeeks ?? 2);
  const [certsHeld, setCertsHeld] = useState(initialPlan?.certsHeld ?? "");
  const [plan, setPlan] = useState<GeneratedPlan | "coming-soon" | null>(null);
  // True from the moment "Build my plan" is submitted until the
  // randomized build duration elapses -- see handleSubmit and
  // ActionPlanLoading. Separate from `plan` itself so the loading
  // screen can render while `plan` is still null.
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildDurationMs, setBuildDurationMs] = useState(0);
  const buildTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const buildDurationRef = useRef(0);
  // Clear any pending build timeout if this component unmounts
  // mid-build (navigating away while "Building your blueprint..." is
  // showing) -- otherwise the timeout would still fire and call
  // setState on an unmounted component.
  useEffect(() => {
    return () => {
      if (buildTimeoutRef.current) clearTimeout(buildTimeoutRef.current);
    };
  }, []);
  // Which steps are checked off, by GeneratedDayItem.key (stable across
  // edits to hours/timeline, unlike the list position this used to be
  // keyed on), and which lessons this account has completed anywhere on
  // the site -- a lesson step shows as done once its lesson is.
  const [checkedKeys, setCheckedKeys] = useState<Set<string>>(new Set());
  const [doneLessons, setDoneLessons] = useState<Set<string>>(new Set());
  // Day-by-day checkboxes persist to the signed-in user's account via
  // /api/progress (see the hydration effect and toggleStep below) --
  // the page itself is hard-gated (EmailGate, variant="immediate"), so
  // in practice this is always true by the time someone can click a
  // checkbox, but it's still checked defensively rather than assumed.
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  // Someone who opens this page signed out (say, from a saved-plan link)
  // and then signs in through the modal never reloads the page, so the
  // server's view of them -- their saved plans, and the specific plan a
  // ?plan=&career= link asked for -- was computed for a signed-out
  // visitor and stays that way. Asking the server to re-render the
  // moment they sign in hands this component the right `initialPlan`
  // (picked up by the resume effect below) and makes the "View your
  // saved plans" button appear, with no manual refresh. Only fires on a
  // real signed-out -> signed-in change, never on a normal page load.
  const wasSignedInRef = useRef<boolean | null>(null);
  useEffect(() => {
    if (!isLoaded) return;
    const signedIn = Boolean(isSignedIn);
    const before = wasSignedInRef.current;
    wasSignedInRef.current = signedIn;
    if (before === false && signedIn) {
      router.refresh();
    }
  }, [isLoaded, isSignedIn, router]);
  // Set false whenever a fresh plan is generated, true the moment the
  // visitor clicks a checkbox -- lets the hydration fetch below avoid
  // clobbering a click that landed before it resolved.
  const toggledSincePlanRef = useRef(false);
  // The resume effect below (which auto-generates initialPlan on
  // mount) must only ever run once, even though React can re-run
  // effects -- this guards against generating twice or fighting a
  // visitor's own first click on the fresh plan.
  const resumedRef = useRef(false);
  // Which saved plan the calendar is currently pinned to, and the date
  // it's pinned to start on. Seeded from a resumed plan, then kept in
  // step with the server (see savePlan): the server never moves a saved
  // plan's start date on an ordinary edit, so the screen shouldn't
  // either. "Restart the calendar from today" is the one thing that
  // moves it.
  const pinnedRef = useRef<{ category: string; careerId: string; startIso: string } | null>(
    initialPlan
      ? { category: initialPlan.category, careerId: initialPlan.careerId, startIso: initialPlan.createdAt }
      : null
  );
  // Bumped every time a plan is generated or the form is reopened, so a
  // slow save response can tell it's stale and leave the screen alone.
  const planTokenRef = useRef(0);
  const [restarting, setRestarting] = useState(false);

  // The actual generation step shared by a fresh "Build my plan" submit
  // and resuming a saved plan on mount -- delegates to the same
  // generateActionPlan the "your saved plans" list page also uses (see
  // lib/action-plan-data.ts), so this category/career lookup lives in
  // exactly one place. Returns "coming-soon" the same way handleSubmit
  // always has, for a category with no skeleton written yet.
  function generatePlanFor(
    cat: string,
    car: string,
    fields: { status: ApplicationStatus; location: string; hoursPerWeek: number; timelineWeeks: number; certsHeld: string },
    startDate?: Date
  ): GeneratedPlan | "coming-soon" {
    return generateActionPlan(dataByCategory, cat, car, fields, startDate);
  }

  // Resume a saved plan as soon as one is handed down: skips the form and jumps
  // straight to the result screen, with the day-by-day calendar pinned
  // to the ORIGINAL date the plan was built (not today), so a plan
  // someone started a week ago still reads as "day 8 of 14" instead of
  // restarting. The hydration effect below then picks up its saved
  // checkmarks once `plan` is set, same as it does for a fresh submit.
  useEffect(() => {
    if (!initialPlan || resumedRef.current) return;
    resumedRef.current = true;
    // Never yank someone out of a plan they've already built in this
    // sitting -- only the untouched form gets replaced.
    if (plan !== null) return;
    const car = initialPlan.careerId === "general" ? "" : initialPlan.careerId;
    // On a normal load these already match (the form state is seeded
    // from initialPlan). They only differ when initialPlan arrived
    // AFTER mount -- the sign-in refresh above -- in which case the form
    // state still holds its blank defaults and has to catch up, since
    // the checkbox ids, the save call, and "Edit your answers" all read
    // from it.
    setCategory(initialPlan.category);
    setCareerId(car);
    setStatus(initialPlan.status);
    setLocation(initialPlan.location);
    setHoursPerWeek(initialPlan.hoursPerWeek);
    setTimelineWeeks(initialPlan.timelineWeeks);
    setCertsHeld(initialPlan.certsHeld);
    pinnedRef.current = {
      category: initialPlan.category,
      careerId: initialPlan.careerId,
      startIso: initialPlan.createdAt,
    };
    planTokenRef.current += 1;
    const generated = generatePlanFor(
      initialPlan.category,
      car,
      {
        status: initialPlan.status,
        location: initialPlan.location,
        hoursPerWeek: initialPlan.hoursPerWeek,
        timelineWeeks: initialPlan.timelineWeeks,
        certsHeld: initialPlan.certsHeld,
      },
      new Date(initialPlan.createdAt)
    );
    setCheckedKeys(new Set());
    toggledSincePlanRef.current = false;
    setPlan(generated);
    // Runs on mount and again if initialPlan goes from absent to present
    // (the sign-in refresh above); resumedRef keeps it to one resume.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPlan !== undefined]);

  // Pull back what this account has already done: the steps checked off
  // for this exact plan (same category + career), and every lesson
  // completed anywhere on the site. Steps are matched by their stable
  // key (GeneratedDayItem.key), so re-opening a Blueprint -- or editing
  // its hours and timeline -- picks up where they left off. Rows saved
  // under the old position-based ids (a bare number) match no key and
  // are simply ignored.
  useEffect(() => {
    if (!plan || plan === "coming-soon" || !isSignedIn) return;
    let cancelled = false;
    const prefix = `${category}:${careerId || "general"}:`;
    fetch("/api/progress")
      .then((res) => res.json())
      .then((data: { ok?: boolean; progress?: Array<{ contentType: string; contentId: string }> }) => {
        if (cancelled || !data?.ok) return;
        const keys = new Set<string>();
        const lessons = new Set<string>();
        for (const row of data.progress ?? []) {
          if (row.contentType === "lesson") lessons.add(row.contentId);
          else if (row.contentType === "actionPlanStep" && row.contentId.startsWith(prefix)) {
            keys.add(row.contentId.slice(prefix.length));
          }
        }
        setDoneLessons(lessons);
        // A click that landed before this resolved wins over the fetch.
        if (!toggledSincePlanRef.current) setCheckedKeys(keys);
      })
      .catch(() => {
        // Leave the freshly-reset empty set from handleSubmit -- a
        // failed load just means a blank-looking plan the user can
        // still re-check by hand.
      });
    return () => {
      cancelled = true;
    };
  }, [plan, isSignedIn, category, careerId]);

  function toggleStep(key: string) {
    toggledSincePlanRef.current = true;
    const nowChecked = !checkedKeys.has(key);
    setCheckedKeys((prev) => {
      const next = new Set(prev);
      if (nowChecked) next.add(key);
      else next.delete(key);
      return next;
    });

    if (!isSignedIn || !plan || plan === "coming-soon") return;
    const contentId = `${category}:${careerId || "general"}:${key}`;
    fetch("/api/progress", {
      method: nowChecked ? "POST" : "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contentType: "actionPlanStep", contentId }),
    }).catch(() => {
      // Best effort -- the checkbox already reflects what the user
      // asked for in this tab; if the save fails silently, the next
      // visit's hydration just won't carry it, not a broken UI now.
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Editing the answers of a plan that was opened from the saved-plans
    // list keeps its original start date, same as the server does (it
    // never moves createdAt on an edit). Without this, the calendar
    // jumped to "starting today" right after an edit and then snapped
    // back to the original dates the next time the plan was opened.
    const pinned = pinnedRef.current;
    const editingPinnedPlan =
      pinned !== null && pinned.category === category && pinned.careerId === (careerId || "general");
    const generated = generatePlanFor(
      category,
      careerId,
      { status, location, hoursPerWeek, timelineWeeks, certsHeld },
      editingPinnedPlan ? new Date(pinned.startIso) : undefined
    );
    planTokenRef.current += 1;
    const token = planTokenRef.current;

    // Nothing is actually being "built" for a category with no skeleton
    // yet -- show the coming-soon message right away rather than faking
    // a build for content that doesn't exist.
    if (generated === "coming-soon") {
      setIsBuilding(false);
      if (buildTimeoutRef.current) clearTimeout(buildTimeoutRef.current);
      setCheckedKeys(new Set());
      toggledSincePlanRef.current = false;
      setPlan(generated);
      return;
    }

    // Hold the real plan behind a randomized loading screen (see
    // ActionPlanLoading) instead of swapping it in instantly -- a
    // different length every time (BUILD_DURATION_MS_RANGE) so it reads
    // as actually assembling the plan, not a fixed canned delay.
    // planTokenRef guards against a stale timeout applying a plan from
    // an earlier submit if the visitor resubmits (or the component
    // unmounts) before this one finishes.
    if (buildTimeoutRef.current) clearTimeout(buildTimeoutRef.current);
    const duration = randomBuildDurationMs();
    buildDurationRef.current = duration;
    setPlan(null);
    setBuildDurationMs(duration);
    setIsBuilding(true);
    buildTimeoutRef.current = setTimeout(() => {
      if (planTokenRef.current !== token) return;
      setCheckedKeys(new Set());
      toggledSincePlanRef.current = false;
      setPlan(generated);
      setIsBuilding(false);

      // Auto-save: a signed-in visitor's plan is remembered without a
      // separate "Save" button, so coming back to the same category+
      // career later resumes it instead of starting over. Upserts (see
      // /api/action-plans), so tweaking the hours/timeline/location for
      // the SAME category+career is an edit to the existing saved plan,
      // not a new one -- only a different category or career creates a
      // genuinely new saved plan.
      if (isSignedIn) {
        savePlan(false);
      }
    }, duration);
  }

  // Saves the current form answers as this account's plan for this
  // category+career, and lines the on-screen calendar up with the start
  // date the server holds for it. That matters when someone rebuilds a
  // plan they already saved earlier without going through the saved-
  // plans list: the server keeps the ORIGINAL start date, so without
  // this the screen showed "starting today" now and the old dates the
  // next time the plan was opened. `restartClock` asks the server to
  // move that start date to now instead.
  function savePlan(restartClock: boolean): Promise<void> {
    const token = planTokenRef.current;
    const savedCategory = category;
    const savedCareerId = careerId || "general";
    return fetch("/api/action-plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: savedCategory,
        careerId: savedCareerId,
        status,
        location: location.trim(),
        hoursPerWeek: Math.max(1, hoursPerWeek || DEFAULT_HOURS),
        timelineWeeks: Math.max(0, timelineWeeks || 0),
        certsHeld,
        restartClock,
      }),
    })
      .then((res) => res.json())
      .then((data: { ok?: boolean; plan?: { createdAt?: string } }) => {
        const startIso = data?.ok ? data.plan?.createdAt : undefined;
        if (!startIso) return;
        pinnedRef.current = { category: savedCategory, careerId: savedCareerId, startIso };
        // The visitor has moved on (edited again, reopened the form):
        // remember the date, but don't touch what's on screen.
        if (planTokenRef.current !== token) return;
        const serverStart = new Date(startIso);
        if (Number.isNaN(serverStart.getTime())) return;
        if (!restartClock && serverStart.toDateString() === new Date().toDateString()) return;
        const regenerated = generatePlanFor(
          savedCategory,
          careerId,
          { status, location, hoursPerWeek, timelineWeeks, certsHeld },
          serverStart
        );
        setPlan(regenerated);
      })
      .catch(() => {
        // Best effort -- the plan is already showing in this tab; if
        // the save fails silently, it just won't be there to resume
        // later, not a broken UI right now.
      });
  }

  // "Restart the calendar from today": same answers, same checked-off
  // steps, new start date. Shown once a plan's dates have started to
  // slip into the past (see scheduleIsOver / scheduleHasStarted below).
  function restartFromToday() {
    if (restarting || !plan || plan === "coming-soon") return;
    setRestarting(true);
    const regenerated = generatePlanFor(category, careerId, { status, location, hoursPerWeek, timelineWeeks, certsHeld });
    planTokenRef.current += 1;
    setPlan(regenerated);
    if (!isSignedIn) {
      setRestarting(false);
      return;
    }
    savePlan(true).finally(() => setRestarting(false));
  }

  function reset() {
    planTokenRef.current += 1;
    if (buildTimeoutRef.current) clearTimeout(buildTimeoutRef.current);
    setIsBuilding(false);
    setPlan(null);
  }

  function handleDownloadIcs() {
    if (!plan || plan === "coming-soon") return;
    const name = plan.careerTitle ? `${plan.careerTitle} Blueprint` : `${plan.category} Blueprint`;
    downloadIcs(
      `breakgroundu-${plan.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-plan.ics`,
      buildIcs(plan.days, name, window.location.origin)
    );
  }

  if (isBuilding) {
    return <ActionPlanLoading durationMs={buildDurationMs} />;
  }

  if (plan === "coming-soon") {
    const getHiredHref = dataByCategory[category]?.getHiredHref;
    return (
      <div className="mt-8 border border-hairline bg-amber-soft/40 p-6">
        <p className="font-display text-2xl font-bold text-ink">This category&rsquo;s plan isn&rsquo;t ready yet</p>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-steel">
          {category} doesn&rsquo;t have a Blueprint written yet. In the meantime, the Get Hired guide for{" "}
          {category} covers the same ground in checklist form.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {getHiredHref && (
            <a
              href={getHiredHref}
              className="bg-navy px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-ink"
            >
              Open the Get Hired guide &rarr;
            </a>
          )}
          <button
            onClick={reset}
            type="button"
            className="border border-ink px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Try a different category
          </button>
        </div>
      </div>
    );
  }

  if (plan) {
    return (
      <div>
        <ActionPlanPrintCalendar days={plan.days} title={plan.careerTitle ?? plan.category} />
        <ActionPlanResult
          plan={plan}
          location={location}
          doneKeys={checkedKeys}
          doneLessons={doneLessons}
          onToggle={toggleStep}
          onEdit={reset}
          onRestart={restartFromToday}
          restarting={restarting}
          onDownloadIcs={handleDownloadIcs}
        />
      </div>
    );
  }

  return (
    <>
      {intro}
      <ActionPlanForm
        dataByCategory={dataByCategory}
        categories={categories}
        category={category}
        onCategoryChange={(next) => {
          setCategory(next);
          setCareerId("");
        }}
        careerId={careerId}
        onCareerChange={setCareerId}
        status={status}
        onStatusChange={setStatus}
        location={location}
        onLocationChange={setLocation}
        hoursPerWeek={hoursPerWeek}
        onHoursChange={setHoursPerWeek}
        timelineWeeks={timelineWeeks}
        onTimelineChange={setTimelineWeeks}
        certsHeld={certsHeld}
        onCertsChange={setCertsHeld}
        onSubmit={handleSubmit}
      />
    </>
  );
}
