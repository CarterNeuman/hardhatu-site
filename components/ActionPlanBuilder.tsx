"use client";

// The action-plan generator's intake form and result screen. Pure
// client-side: no accounts, no database, no network call beyond the page
// load that already happened -- generation itself is lib/action-plan-
// generator.ts's buildActionPlan() running on data this component already
// has in memory. Per the build-sequencing decision, a generated plan
// lives only in this component's state (plus, for the day-by-day
// checkboxes, nothing persisted at all) -- closing the tab loses it, and
// that's a known, intentional tradeoff for this phase, not a bug.
import { useMemo, useState } from "react";
import Link from "next/link";
import { CAREER_CATEGORY_ORDER } from "@/lib/types";
import { SectionLabel } from "@/components/SectionLabel";
import {
  buildActionPlan,
  type ActionPlanIntake,
  type ApplicationStatus,
  type GeneratedPlan,
} from "@/lib/action-plan-generator";
import { buildIcs, downloadIcs } from "@/lib/ics";
import { ActionPlanPrintCalendar } from "@/components/ActionPlanPrintCalendar";
import type { ActionPlan, GetHired, ResumeGuide } from "@/lib/types";

export type SlimCareer = { id: string; title: string; slug: string };
export type SlimLesson = { id: string; slug: string; title: string; minutes: number };

export type CategoryData = {
  category: string;
  careers: SlimCareer[];
  skeleton?: ActionPlan;
  getHiredGuide?: Pick<GetHired, "whereToLook" | "credentialsToHaveReady">;
  resumeGuide?: { slug: string; exampleBullets: string[] };
  lessonsByCareerId: Record<string, SlimLesson[]>;
  // Shown when no specific career is picked (or that career has no
  // lessons tied to it yet) -- a few lessons for the category as a
  // whole, so "Not sure yet, keep it general" still gets real course
  // suggestions instead of an empty section.
  fallbackLessons: SlimLesson[];
};

const DEFAULT_HOURS = 10;

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
          className="print:hidden text-xs font-semibold text-navy hover:underline"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="mt-2 whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink">{text}</pre>
    </div>
  );
}

function formatDateRange(start: Date, end: Date): string {
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const startLabel = start.toLocaleDateString("en-US", opts);
  const endLabel = end.toLocaleDateString("en-US", opts);
  return startLabel === endLabel ? startLabel : `${startLabel}–${endLabel}`;
}

export function ActionPlanBuilder({ dataByCategory }: { dataByCategory: Record<string, CategoryData> }) {
  const categories = CAREER_CATEGORY_ORDER.filter((c) => dataByCategory[c]);
  const [category, setCategory] = useState(categories[0] ?? "");
  const [careerId, setCareerId] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("applying");
  const [location, setLocation] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState(DEFAULT_HOURS);
  const [timelineWeeks, setTimelineWeeks] = useState(2);
  const [certsHeld, setCertsHeld] = useState("");
  const [plan, setPlan] = useState<GeneratedPlan | "coming-soon" | null>(null);
  const [checkedDays, setCheckedDays] = useState<Set<number>>(new Set());

  const categoryData = dataByCategory[category];
  const careerOptions = categoryData?.careers ?? [];

  function toggleDay(index: number) {
    setCheckedDays((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = dataByCategory[category];
    if (!data?.skeleton || data.skeleton.comingSoon) {
      setPlan("coming-soon");
      return;
    }
    const career = data.careers.find((c) => c.id === careerId);
    const lessons = careerId ? data.lessonsByCareerId[careerId] ?? [] : [];
    const intake: ActionPlanIntake = {
      category,
      careerId: careerId || undefined,
      status,
      location: location.trim(),
      hoursPerWeek: Math.max(1, hoursPerWeek || DEFAULT_HOURS),
      timelineWeeks: Math.max(0, timelineWeeks || 0),
      certsHeld,
    };
    const generated = buildActionPlan({
      skeleton: data.skeleton,
      getHiredGuide: data.getHiredGuide as GetHired | undefined,
      resumeGuide: data.resumeGuide as ResumeGuide | undefined,
      lessonsForCareer: lessons,
      categoryFallbackLessons: data.fallbackLessons,
      career,
      intake,
    });
    setCheckedDays(new Set());
    setPlan(generated);
  }

  function reset() {
    setPlan(null);
  }

  function handleDownloadIcs() {
    if (!plan || plan === "coming-soon") return;
    const name = plan.careerTitle ? `${plan.careerTitle} action plan` : `${plan.category} action plan`;
    downloadIcs(`hardhatu-${plan.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-plan.ics`, buildIcs(plan.days, name));
  }

  if (plan === "coming-soon") {
    return (
      <div className="mt-8 border border-hairline bg-amber-soft/40 p-6">
        <p className="font-display text-xl font-bold text-ink">This category's plan isn't ready yet</p>
        <p className="mt-2 text-sm leading-relaxed text-steel">
          {category} doesn't have an action-plan skeleton written yet. The Field & Trades plan is the first
          one built, the rest are coming. In the meantime, the Get Hired guide for {category} covers the
          same ground in checklist form.
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
              {plan.careerTitle ?? plan.category} action plan
            </h2>
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

        {plan.qualifications.length > 0 && (
          <>
            <SectionLabel>Qualifications</SectionLabel>
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
            <SectionLabel>Courses to take</SectionLabel>
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

        {plan.resumeBullets.length > 0 && (
          <>
            <SectionLabel>Resume bullets to borrow</SectionLabel>
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

        <SectionLabel>Your day-by-day plan</SectionLabel>
        <p className="mt-1 text-xs italic text-steel print:hidden">
          Checking an item off only lasts while this tab stays open, nothing here saves yet.
        </p>
        <ol className="mt-3 flex flex-col gap-3">
          {plan.days.map((item, i) => (
            <li key={i} className="flex gap-3 border-l-2 border-hairline pl-4">
              <button
                type="button"
                onClick={() => toggleDay(i)}
                className="print:hidden mt-1 h-4 w-4 shrink-0 border border-hairline"
                aria-pressed={checkedDays.has(i)}
                aria-label={checkedDays.has(i) ? "Mark not done" : "Mark done"}
              >
                {checkedDays.has(i) && <span className="block h-full w-full bg-navy" />}
              </button>
              <div className={checkedDays.has(i) ? "opacity-50" : undefined}>
                <p className="text-xs font-semibold uppercase tracking-wide text-clay">
                  {formatDateRange(item.startDate, item.endDate)}
                </p>
                <p className={`font-medium text-ink ${checkedDays.has(i) ? "line-through" : ""}`}>{item.title}</p>
                <p className="mt-0.5 text-sm text-steel">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <SectionLabel>Companies worth targeting</SectionLabel>
        <ul className="mt-2 flex flex-col gap-1.5">
          {plan.targetEmployerTypes.map((type, i) => (
            <li key={i} className="text-sm text-ink">
              {type}
            </li>
          ))}
        </ul>
        {plan.whereToLook.length > 0 && (
          <>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-steel">
              Where to actually look
            </p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {plan.whereToLook.map((place, i) => (
                <li key={i} className="text-sm text-ink">
                  {place}
                </li>
              ))}
            </ul>
          </>
        )}
        {plan.jobBoardLinks.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 print:hidden">
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
        )}

        <SectionLabel>Reaching out to recruiters and hiring managers</SectionLabel>
        <ul className="mt-2 flex flex-col gap-1.5">
          {plan.recruiterOutreach.tips.map((tip, i) => (
            <li key={i} className="text-sm text-ink">
              {tip}
            </li>
          ))}
        </ul>
        <TemplateBlock label="Email template" text={plan.recruiterOutreach.emailTemplate} />
        <TemplateBlock label="LinkedIn message template" text={plan.recruiterOutreach.linkedinTemplate} />
        <TemplateBlock label="Follow-up template" text={plan.recruiterOutreach.followUpTemplate} />

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
            value={hoursPerWeek}
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
