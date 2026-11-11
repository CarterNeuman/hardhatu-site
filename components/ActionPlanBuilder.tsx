"use client";

// The action-plan generator's intake form and result screen. Generation
// itself is lib/action-plan-generator.ts's buildActionPlan() running on
// data this component already has in memory -- no database involved, and
// a generated plan still lives only in this component's state, so closing
// the tab loses the plan itself (intentional for this phase, not a bug).
// The two exceptions: LiveJobResults below makes its own client-side call
// to /api/jobs for live listings, and the day-by-day checkboxes below
// persist to /api/progress for the signed-in user (see the hydration
// effect and toggleDay), so re-generating the same plan later picks the
// checkmarks back up even though the plan text itself is rebuilt fresh.
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { CAREER_CATEGORY_ORDER } from "@/lib/types";
import { SectionLabel } from "@/components/SectionLabel";
import { type ApplicationStatus, type GeneratedPlan } from "@/lib/action-plan-generator";
import { buildIcs, downloadIcs } from "@/lib/ics";
import { ActionPlanPrintCalendar } from "@/components/ActionPlanPrintCalendar";
import { LiveJobResults } from "@/components/LiveJobResults";
import { Disclaimer } from "@/components/Disclaimer";
import { GlossaryText, buildGlossaryIndex } from "@/components/GlossaryText";
import {
  ActionPlanAccordionSection,
  AccordionSubLabel,
  useActionPlanAccordionControls,
} from "@/components/ActionPlanAccordion";
import { generateActionPlan } from "@/lib/action-plan-generate";
import type { CategoryData } from "@/lib/action-plan-data";

export type { SlimCareer, SlimLesson, SlimConcept, SlimSoftware, CategoryData } from "@/lib/action-plan-data";

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

const DEFAULT_HOURS = 10;

// Small badge text for a skill-building day-by-day item (see
// GeneratedDayItem's `kind` in lib/action-plan-generator.ts) -- lets the
// calendar visually distinguish "go learn this" tasks from the authored
// paperwork/outreach/certification items around them.
const SKILL_KIND_LABEL: Record<"lesson" | "software" | "examPrep", string> = {
  lesson: "Lesson",
  software: "Software",
  examPrep: "Exam Prep",
};

function TemplateBlock({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API blocked (permissions, insecure context) -- the text
      // is already visible and selectable, so this just means the person
      // copies it by hand instead of a broken experience.
    }
  }
  return (
    <div className="mt-3 border border-hairline bg-white/50 p-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-steel">{label}</p>
        <button
          onClick={copy}
          type="button"
          aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
          className="print:hidden text-xs font-semibold text-navy hover:underline"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="mt-2 whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink">{text}</pre>
    </div>
  );
}

// Mirrors PayTimeline.tsx's own formatter so the same figure reads the
// same way wherever it shows up on the site.
function formatPay(n: number, unit: "annual" | "hourly"): string {
  if (unit === "hourly") return `$${n.toFixed(2)}/hr`;
  return `$${Math.round(n / 1000)}k/yr`;
}

function formatDateRange(start: Date, end: Date): string {
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const startLabel = start.toLocaleDateString("en-US", opts);
  const endLabel = end.toLocaleDateString("en-US", opts);
  return startLabel === endLabel ? startLabel : `${startLabel}–${endLabel}`;
}

export function ActionPlanBuilder({
  dataByCategory,
  initialPlan,
}: {
  dataByCategory: Record<string, CategoryData>;
  // When set (a resume link matched a saved plan server-side -- see
  // app/action-plan/page.tsx), the form is skipped entirely and this
  // plan renders immediately on mount instead -- see the resume effect
  // below.
  initialPlan?: InitialPlan;
}) {
  const categories = CAREER_CATEGORY_ORDER.filter((c) => dataByCategory[c]);
  const [category, setCategory] = useState(initialPlan?.category ?? categories[0] ?? "");
  const [careerId, setCareerId] = useState(
    initialPlan ? (initialPlan.careerId === "general" ? "" : initialPlan.careerId) : ""
  );
  const [status, setStatus] = useState<ApplicationStatus>(initialPlan?.status ?? "applying");
  const [location, setLocation] = useState(initialPlan?.location ?? "");
  const [hoursPerWeek, setHoursPerWeek] = useState(initialPlan?.hoursPerWeek ?? DEFAULT_HOURS);
  const [timelineWeeks, setTimelineWeeks] = useState(initialPlan?.timelineWeeks ?? 2);
  const [certsHeld, setCertsHeld] = useState(initialPlan?.certsHeld ?? "");
  const [plan, setPlan] = useState<GeneratedPlan | "coming-soon" | null>(null);
  const [checkedDays, setCheckedDays] = useState<Set<number>>(new Set());
  const accordionControls = useActionPlanAccordionControls();
  // Day-by-day checkboxes persist to the signed-in user's account via
  // /api/progress (see the hydration effect and toggleDay below) --
  // the page itself is hard-gated (EmailGate, variant="immediate"), so
  // in practice this is always true by the time someone can click a
  // checkbox, but it's still checked defensively rather than assumed.
  const { isSignedIn } = useUser();
  // Set false whenever a fresh plan is generated, true the moment the
  // visitor clicks a checkbox -- lets the hydration fetch below avoid
  // clobbering a click that landed before it resolved.
  const toggledSincePlanRef = useRef(false);
  // The resume effect below (which auto-generates initialPlan on
  // mount) must only ever run once, even though React can re-run
  // effects -- this guards against generating twice or fighting a
  // visitor's own first click on the fresh plan.
  const resumedRef = useRef(false);

  const categoryData = dataByCategory[category];
  const careerOptions = categoryData?.careers ?? [];

  const glossaryIndex = useMemo(() => {
    if (!plan || plan === "coming-soon") return [];
    return buildGlossaryIndex(plan.glossaryConcepts);
  }, [plan]);

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

  // Resume a saved plan on first render: skips the form and jumps
  // straight to the result screen, with the day-by-day calendar pinned
  // to the ORIGINAL date the plan was built (not today), so a plan
  // someone started a week ago still reads as "day 8 of 14" instead of
  // restarting. The hydration effect below then picks up its saved
  // checkmarks once `plan` is set, same as it does for a fresh submit.
  useEffect(() => {
    if (!initialPlan || resumedRef.current) return;
    resumedRef.current = true;
    const car = initialPlan.careerId === "general" ? "" : initialPlan.careerId;
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
    setCheckedDays(new Set());
    toggledSincePlanRef.current = false;
    setPlan(generated);
    // Deliberately runs once on mount only -- initialPlan is a one-shot
    // server-provided prop, not something that changes while this
    // component is alive. See resumedRef above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pull back which day-by-day steps this user already checked off for
  // this exact plan (same category + career), so re-opening a Blueprint
  // picks up where they left off instead of starting blank. Keyed by
  // array index, not a persisted plan id, since the plan itself is
  // regenerated fresh each time rather than stored -- see toggleDay.
  useEffect(() => {
    if (!plan || plan === "coming-soon" || !isSignedIn) return;
    let cancelled = false;
    const prefix = `${category}:${careerId || "general"}:`;
    fetch("/api/progress")
      .then((res) => res.json())
      .then((data: { ok?: boolean; progress?: Array<{ contentType: string; contentId: string }> }) => {
        if (cancelled || !data?.ok) return;
        if (toggledSincePlanRef.current) return;
        const done = new Set<number>();
        for (const row of data.progress ?? []) {
          if (row.contentType !== "actionPlanStep" || !row.contentId.startsWith(prefix)) continue;
          const index = Number(row.contentId.slice(prefix.length));
          if (Number.isInteger(index)) done.add(index);
        }
        setCheckedDays(done);
      })
      .catch(() => {
        // Leave checkedDays as the freshly-reset empty set from
        // handleSubmit -- a failed load just means a blank-looking
        // plan the user can still re-check by hand.
      });
    return () => {
      cancelled = true;
    };
  }, [plan, isSignedIn, category, careerId]);

  function toggleDay(index: number) {
    toggledSincePlanRef.current = true;
    const nowChecked = !checkedDays.has(index);
    setCheckedDays((prev) => {
      const next = new Set(prev);
      if (nowChecked) next.add(index);
      else next.delete(index);
      return next;
    });

    if (!isSignedIn || !plan || plan === "coming-soon") return;
    const contentId = `${category}:${careerId || "general"}:${index}`;
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
    const editingResumedPlan =
      initialPlan !== undefined &&
      initialPlan.category === category &&
      initialPlan.careerId === (careerId || "general");
    const generated = generatePlanFor(
      category,
      careerId,
      { status, location, hoursPerWeek, timelineWeeks, certsHeld },
      editingResumedPlan ? new Date(initialPlan.createdAt) : undefined
    );
    setCheckedDays(new Set());
    toggledSincePlanRef.current = false;
    setPlan(generated);

    // Auto-save: a signed-in visitor's plan is remembered without a
    // separate "Save" button, so coming back to the same category+
    // career later resumes it instead of starting over. Upserts (see
    // /api/action-plans), so tweaking the hours/timeline/location for
    // the SAME category+career is an edit to the existing saved plan,
    // not a new one -- only a different category or career creates a
    // genuinely new saved plan.
    if (generated !== "coming-soon" && isSignedIn) {
      fetch("/api/action-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          careerId: careerId || "general",
          status,
          location: location.trim(),
          hoursPerWeek: Math.max(1, hoursPerWeek || DEFAULT_HOURS),
          timelineWeeks: Math.max(0, timelineWeeks || 0),
          certsHeld,
        }),
      }).catch(() => {
        // Best effort -- the plan is already showing in this tab; if
        // the save fails silently, it just won't be there to resume
        // later, not a broken UI right now.
      });
    }
  }

  function reset() {
    setPlan(null);
  }

  function handleDownloadIcs() {
    if (!plan || plan === "coming-soon") return;
    const name = plan.careerTitle ? `${plan.careerTitle} Blueprint` : `${plan.category} Blueprint`;
    downloadIcs(`breakgroundu-${plan.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-plan.ics`, buildIcs(plan.days, name));
  }

  if (plan === "coming-soon") {
    return (
      <div className="mt-8 border border-hairline bg-amber-soft/40 p-6">
        <p className="font-display text-xl font-bold text-ink">This category's plan isn't ready yet</p>
        <p className="mt-2 text-sm leading-relaxed text-steel">
          {category} doesn't have a Blueprint written yet. In the meantime, the Get Hired guide for{" "}
          {category} covers the same ground in checklist form.
        </p>
        <button
          onClick={reset}
          type="button"
          className="mt-4 border border-ink px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          Try a different category
        </button>
      </div>
    );
  }

  if (plan) {
    const { containerRef: accordionContainerRef, label: accordionToggleLabel, toggleAll: toggleAllAccordions } =
      accordionControls;

    const hasPay = Boolean(plan.entryPay);
    const hasQualificationsSection =
      plan.qualifications.length > 0 || plan.courses.length > 0 || plan.goFurther.length > 0;
    const hasResumePrepSection =
      plan.resumeBullets.length > 0 || Boolean(plan.interviewPrepHref) || Boolean(plan.examPrepHref);
    const hasFindOpeningsSection =
      plan.targetEmployerTypes.length > 0 || plan.whereToLook.length > 0 || plan.jobBoardLinks.length > 0;

    // Shown under Overview so a first-time visitor knows what each
    // dropdown below actually answers before opening any of them --
    // built from which sections this specific plan actually has rather
    // than a fixed list, since a category like Consultants & Advisory
    // never gets a "Where to Find Openings" section at all.
    const legendItems = [
      hasPay && { title: "Pay", blurb: "what to actually expect to earn, so you know if it's worth it to you." },
      hasQualificationsSection && {
        title: "Qualifications & Courses",
        blurb: "what to have ready, and where to learn what you're missing.",
      },
      hasResumePrepSection && {
        title: "Resume & Interview Prep",
        blurb: "get your application and talking points in order.",
      },
      {
        title: "Your Day-by-Day Plan",
        blurb: "the actual schedule, start here once you're ready to move.",
      },
      hasFindOpeningsSection && {
        title: "Where to Find Openings",
        blurb: "your target employers, plus live postings near you.",
      },
      {
        title: "Reach Out to Recruiters & Hiring Managers",
        blurb: "exactly what to say, and to whom.",
      },
    ].filter((item): item is { title: string; blurb: string } => Boolean(item));

    const payTeaser = plan.entryPay
      ? `${formatPay(plan.entryPay.low, plan.entryPay.unit).replace(/\/(yr|hr)$/, "")}–${formatPay(plan.entryPay.high, plan.entryPay.unit)}`
      : undefined;

    const qualificationsTeaserParts: string[] = [];
    if (plan.qualifications.length > 0) {
      const needCount = plan.qualifications.filter((q) => !q.have).length;
      qualificationsTeaserParts.push(needCount === 0 ? "all set" : `${needCount} to line up`);
    }
    if (plan.courses.length > 0) {
      qualificationsTeaserParts.push(`${plan.courses.length} course${plan.courses.length === 1 ? "" : "s"}`);
    }
    if (plan.goFurther.length > 0) {
      qualificationsTeaserParts.push(`${plan.goFurther.length} go further`);
    }
    const qualificationsTeaser = qualificationsTeaserParts.join(" \u00b7 ") || undefined;

    const resumePrepTeaserParts: string[] = [];
    if (plan.resumeBullets.length > 0) {
      resumePrepTeaserParts.push(`${plan.resumeBullets.length} bullet${plan.resumeBullets.length === 1 ? "" : "s"}`);
    }
    const guideCount = [plan.resumeGuideHref, plan.interviewPrepHref, plan.examPrepHref].filter(Boolean).length;
    if (guideCount > 0) {
      resumePrepTeaserParts.push(`${guideCount} guide${guideCount === 1 ? "" : "s"}`);
    }
    const resumePrepTeaser = resumePrepTeaserParts.join(" \u00b7 ") || undefined;

    const dayByDayTeaser = `${plan.days.length} step${plan.days.length === 1 ? "" : "s"} \u00b7 ${checkedDays.size} of ${plan.days.length} done`;

    const findOpeningsTeaserParts: string[] = [];
    if (plan.targetEmployerTypes.length > 0) {
      findOpeningsTeaserParts.push(
        `${plan.targetEmployerTypes.length} employer type${plan.targetEmployerTypes.length === 1 ? "" : "s"}`
      );
    }
    if (plan.jobBoardLinks.length > 0 && location.trim()) {
      findOpeningsTeaserParts.push("live openings near you");
    }
    const findOpeningsTeaser = findOpeningsTeaserParts.join(" \u00b7 ") || undefined;

    const outreachTeaser = `${plan.recruiterOutreach.tips.length} tip${plan.recruiterOutreach.tips.length === 1 ? "" : "s"} \u00b7 3 templates`;

    return (
      <div className="mt-8">
        <ActionPlanPrintCalendar days={plan.days} title={plan.careerTitle ?? plan.category} />

        <div className="print:hidden">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-steel">
              {plan.status === "applying" ? "Actively applying" : "Just looking"}
            </p>
            <h2 className="font-display text-3xl font-bold text-ink">
              {plan.careerTitle ?? plan.category} Blueprint
            </h2>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-steel">{plan.headline}</p>
          </div>
          <div className="print:hidden flex gap-2">
            <button
              onClick={reset}
              type="button"
              className="border border-ink px-3 py-2 text-xs font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Edit your answers
            </button>
          </div>
        </div>

        <SectionLabel>Overview</SectionLabel>
        <p className="mt-2 leading-relaxed text-ink">{plan.overview}</p>
        {legendItems.length > 0 && (
          <>
            <p className="mt-3 text-sm leading-relaxed text-ink">
              Everything below is sorted into sections so you can jump straight to what you're
              wondering about. Nothing here assumes you've already read what's above it.
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-sm leading-relaxed text-ink">
              {legendItems.map((item) => (
                <li key={item.title}>
                  <span className="font-semibold text-navy">{item.title}</span> &ndash; {item.blurb}
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-7 flex items-baseline justify-between gap-3">
          <SectionLabel>Your Personalized Blueprint</SectionLabel>
          <button
            type="button"
            onClick={toggleAllAccordions}
            className="shrink-0 border border-hairline px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-navy transition-colors hover:border-navy print:hidden"
          >
            {accordionToggleLabel}
          </button>
        </div>

        <div ref={accordionContainerRef} className="mt-2 flex flex-col print:hidden">
          {plan.entryPay && (
            <ActionPlanAccordionSection title="Pay" teaser={payTeaser} defaultOpen>
              <p className="text-2xl font-bold text-navy">
                {formatPay(plan.entryPay.low, plan.entryPay.unit)}&ndash;{formatPay(plan.entryPay.high, plan.entryPay.unit)}
              </p>
              <Disclaimer
                lastReviewed={plan.entryPay.asOf}
                message={
                  plan.isEntryRole === false
                    ? `${plan.careerTitle ?? "This role"} is typically reached through promotion or years of experience in a related role, not a day-one starting point. This is the lower end of the national wage distribution for people already working in it (${plan.entryPay.source}), not a promise for any one job and not what someone brand new to the field would start at. Real pay varies by state, metro area, union status, and employer, so scale this for your market. Base pay only: overtime and shift differentials are standard across most construction trades.`
                    : `Entry-level pay from the national wage distribution for this occupation (${plan.entryPay.source}), not a promise for any one job. Real pay varies by state, metro area, union status, and employer, so scale this for your market. Base pay only: overtime and shift differentials are standard across most construction trades.`
                }
              />
            </ActionPlanAccordionSection>
          )}

          {(plan.qualifications.length > 0 || plan.courses.length > 0 || plan.goFurther.length > 0) && (
            <ActionPlanAccordionSection title="Qualifications & Courses" teaser={qualificationsTeaser}>
              {plan.qualifications.length > 0 && (
                <>
                  <AccordionSubLabel>Have these ready</AccordionSubLabel>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {plan.qualifications.map((q, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink">
                        <span
                          className={
                            q.have
                              ? "mt-0.5 inline-block h-3 w-3 shrink-0 border border-navy bg-navy"
                              : "mt-0.5 inline-block h-3 w-3 shrink-0 border border-hairline"
                          }
                          aria-hidden="true"
                        />
                        <span>
                          {q.label}
                          {q.have ? <span className="ml-2 text-xs font-semibold uppercase text-navy">Have it</span> : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {plan.courses.length > 0 && (
                <>
                  <AccordionSubLabel>Courses to take</AccordionSubLabel>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {plan.courses.map(({ lesson, href }) => (
                      <li key={lesson.id} className="text-sm text-ink">
                        <Link href={href} className="font-medium text-navy hover:underline">
                          {lesson.title}
                        </Link>
                        <span className="text-steel"> &middot; {lesson.minutes} min</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {plan.goFurther.length > 0 && (
                <>
                  <AccordionSubLabel>Go further</AccordionSubLabel>
                  <p className="mt-1 text-xs italic text-steel">
                    Beyond what's required to get in the door, but worth understanding deeply to stand out once you're there.
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {plan.goFurther.map(({ concept, href }) => (
                      <li key={concept.id} className="text-sm text-ink">
                        <Link href={href} className="font-medium text-navy hover:underline">
                          {concept.title}
                        </Link>
                        <span className="text-steel"> &mdash; {concept.definition}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </ActionPlanAccordionSection>
          )}

          {(plan.resumeBullets.length > 0 || plan.interviewPrepHref || plan.examPrepHref) && (
            <ActionPlanAccordionSection title="Resume & Interview Prep" teaser={resumePrepTeaser}>
              {plan.resumeBullets.length > 0 && (
                <>
                  <AccordionSubLabel>Resume bullets to use for inspiration</AccordionSubLabel>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {plan.resumeBullets.map((bullet, i) => (
                      <li key={i} className="text-sm text-ink">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  {plan.resumeGuideHref && (
                    <Link href={plan.resumeGuideHref} className="mt-2 inline-block text-sm font-semibold text-navy hover:underline">
                      See the full resume guide &rarr;
                    </Link>
                  )}
                </>
              )}

              {(plan.interviewPrepHref || plan.examPrepHref) && (
                <>
                  <AccordionSubLabel>Keep going</AccordionSubLabel>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {plan.interviewPrepHref && (
                      <Link
                        href={plan.interviewPrepHref}
                        className="border border-hairline px-3 py-1.5 text-xs font-semibold text-navy transition-colors hover:border-navy"
                      >
                        Interview Prep guide &rarr;
                      </Link>
                    )}
                    {plan.examPrepHref && (
                      <Link
                        href={plan.examPrepHref}
                        className="border border-hairline px-3 py-1.5 text-xs font-semibold text-navy transition-colors hover:border-navy"
                      >
                        Exam Prep guide &rarr;
                      </Link>
                    )}
                  </div>
                </>
              )}
            </ActionPlanAccordionSection>
          )}

          <ActionPlanAccordionSection title="Your Day-by-Day Plan" teaser={dayByDayTeaser}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-xs italic text-steel">
                Checking an item off saves to your account, so it'll still be checked next time you come
                back to this plan.
              </p>
              {checkedDays.size > 0 && (
                <p className="shrink-0 text-xs font-semibold uppercase tracking-wide text-navy">
                  {checkedDays.size} of {plan.days.length} done
                </p>
              )}
            </div>
            <ol className="mt-3 flex flex-col gap-3">
              {plan.days.map((item, i) => (
                <li key={i} className="flex gap-3 border-l-2 border-hairline pl-4">
                  <button
                    type="button"
                    onClick={() => toggleDay(i)}
                    className="print:hidden mt-1 h-4 w-4 shrink-0 border border-hairline"
                    aria-pressed={checkedDays.has(i)}
                    aria-label={`${checkedDays.has(i) ? "Mark not done" : "Mark done"}: ${item.title}`}
                  >
                    {checkedDays.has(i) && <span className="block h-full w-full bg-navy" />}
                  </button>
                  <div className={checkedDays.has(i) ? "opacity-50" : undefined}>
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-clay">
                      {formatDateRange(item.startDate, item.endDate)}
                      {item.kind && (
                        <span className="border border-navy px-1.5 py-0.5 text-navy">
                          {SKILL_KIND_LABEL[item.kind]}
                        </span>
                      )}
                    </p>
                    <p className={`font-medium text-ink ${checkedDays.has(i) ? "line-through" : ""}`}>
                      {item.href ? (
                        <Link href={item.href} className="hover:underline">
                          {item.title}
                        </Link>
                      ) : (
                        <GlossaryText text={item.title} index={glossaryIndex} />
                      )}
                    </p>
                    <p className="mt-0.5 text-sm text-steel">
                      <GlossaryText text={item.detail} index={glossaryIndex} />
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </ActionPlanAccordionSection>

          {(plan.targetEmployerTypes.length > 0 || plan.whereToLook.length > 0 || plan.jobBoardLinks.length > 0) && (
            <ActionPlanAccordionSection title="Where to Find Openings" teaser={findOpeningsTeaser}>
              {plan.targetEmployerTypes.length > 0 && (
                <>
                  <AccordionSubLabel>Companies worth targeting</AccordionSubLabel>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {plan.targetEmployerTypes.map((type, i) => (
                      <li key={i} className="text-sm text-ink">
                        {type}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {plan.whereToLook.length > 0 && (
                <>
                  <AccordionSubLabel>Where to actually look</AccordionSubLabel>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {plan.whereToLook.map((place, i) => (
                      <li key={i} className="text-sm text-ink">
                        {place}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {plan.jobBoardLinks.length > 0 && location.trim() && (
                <LiveJobResults trade={plan.careerTitle ?? plan.category} location={location} entryPay={plan.entryPay} />
              )}
              {plan.jobBoardLinks.length > 0 && (
                <>
                  <AccordionSubLabel>Or search these yourself</AccordionSubLabel>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {plan.jobBoardLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-hairline px-3 py-1.5 text-xs font-semibold text-navy transition-colors hover:border-navy"
                      >
                        {link.label} &rarr;
                      </a>
                    ))}
                  </div>
                </>
              )}
            </ActionPlanAccordionSection>
          )}

          <ActionPlanAccordionSection title="Reach Out to Recruiters & Hiring Managers" teaser={outreachTeaser}>
            <ul className="flex flex-col gap-1.5">
              {plan.recruiterOutreach.tips.map((tip, i) => (
                <li key={i} className="text-sm text-ink">
                  {tip}
                </li>
              ))}
            </ul>
            <TemplateBlock label="Email template" text={plan.recruiterOutreach.emailTemplate} />
            <TemplateBlock label="LinkedIn message template" text={plan.recruiterOutreach.linkedinTemplate} />
            <TemplateBlock label="Follow-up template" text={plan.recruiterOutreach.followUpTemplate} />
          </ActionPlanAccordionSection>
        </div>

        <div className="mt-8 border border-amber bg-amber-soft/40 px-4 py-3 print:hidden">
          <p className="text-xs font-semibold uppercase tracking-wide text-clay">A plan, not a promise</p>
          <p className="mt-1 text-sm text-ink">
            This plan is informational, not a guarantee of being hired. Confirm any licensing or
            certification requirement yourself before relying on it.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 print:hidden">
          <button
            onClick={handleDownloadIcs}
            type="button"
            className="bg-navy px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-ink"
          >
            Download as calendar (.ics)
          </button>
          <button
            onClick={() => window.print()}
            type="button"
            className="border border-ink px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Print your schedule
          </button>
        </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
      <div>
        <label htmlFor="ap-category" className="text-sm font-semibold text-ink">
          Career category
        </label>
        <select
          id="ap-category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCareerId("");
          }}
          className="mt-1 block w-full border border-hairline bg-white/60 px-3 py-2 text-sm text-ink focus:border-navy focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-navy"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
              {dataByCategory[c]?.skeleton?.comingSoon !== false ? " (coming soon)" : ""}
            </option>
          ))}
        </select>
      </div>

      {careerOptions.length > 0 && (
        <div>
          <label htmlFor="ap-career" className="text-sm font-semibold text-ink">
            Specific career (optional)
          </label>
          <select
            id="ap-career"
            value={careerId}
            onChange={(e) => setCareerId(e.target.value)}
            className="mt-1 block w-full border border-hairline bg-white/60 px-3 py-2 text-sm text-ink focus:border-navy focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-navy"
          >
            <option value="">Not sure yet, keep it general</option>
            {careerOptions.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <fieldset>
        <legend className="text-sm font-semibold text-ink">Where are you in the process?</legend>
        <div className="mt-1 flex gap-4">
          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="radio"
              name="status"
              value="browsing"
              checked={status === "browsing"}
              onChange={() => setStatus("browsing")}
            />
            Just looking
          </label>
          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="radio"
              name="status"
              value="applying"
              checked={status === "applying"}
              onChange={() => setStatus("applying")}
            />
            Actively applying
          </label>
        </div>
      </fieldset>

      <div>
        <label htmlFor="ap-location" className="text-sm font-semibold text-ink">
          Location
        </label>
        <input
          id="ap-location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, State"
          maxLength={100}
          className="mt-1 block w-full border border-hairline bg-white/60 px-3 py-2 text-sm text-ink focus:border-navy focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-navy"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="ap-hours" className="text-sm font-semibold text-ink">
            Hours per week available
          </label>
          <input
            id="ap-hours"
            type="number"
            min={1}
            max={60}
            required
            // Shown blank (not "0") while the field is empty, so clearing
            // it to type a new number doesn't leave a stuck leading zero.
            value={hoursPerWeek === 0 ? "" : hoursPerWeek}
            onChange={(e) => setHoursPerWeek(Number(e.target.value))}
            className="mt-1 block w-full border border-hairline bg-white/60 px-3 py-2 text-sm text-ink focus:border-navy focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-navy"
          />
        </div>
        <div>
          <label htmlFor="ap-timeline" className="text-sm font-semibold text-ink">
            Target timeline (weeks)
          </label>
          <input
            id="ap-timeline"
            type="number"
            min={0}
            max={52}
            value={timelineWeeks}
            onChange={(e) => setTimelineWeeks(Number(e.target.value))}
            className="mt-1 block w-full border border-hairline bg-white/60 px-3 py-2 text-sm text-ink focus:border-navy focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-navy"
          />
        </div>
      </div>

      <div>
        <label htmlFor="ap-certs" className="text-sm font-semibold text-ink">
          Certifications or experience you already have
        </label>
        <textarea
          id="ap-certs"
          value={certsHeld}
          onChange={(e) => setCertsHeld(e.target.value)}
          placeholder="e.g. OSHA 10, valid driver's license"
          rows={2}
          maxLength={500}
          className="mt-1 block w-full border border-hairline bg-white/60 px-3 py-2 text-sm text-ink focus:border-navy focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-navy"
        />
      </div>

      <button
        type="submit"
        className="mt-2 bg-navy px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-ink"
      >
        Build my plan
      </button>
    </form>
  );
}
