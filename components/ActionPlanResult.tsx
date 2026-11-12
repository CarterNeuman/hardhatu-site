"use client";

// The Blueprint result screen: everything a generated plan shows once
// the form has been submitted (or a saved plan resumed). Purely
// presentational -- ActionPlanBuilder owns the plan, the saved progress,
// and every network call, and hands this component data plus callbacks.
//
// Layout, top to bottom:
//   1. Header band   -- what this plan is, how far along it is, the
//                       three things you can do with it.
//   2. Stat strip    -- length, steps, pay, how much of it is this site.
//   3. Up next       -- the single next unchecked step, with its links.
//   4. Schedule      -- every dated step, grouped by week, each one
//                       linked to the lesson/guide/program it refers to;
//                       beside it, the toolkit of everything on this
//                       site the plan draws on.
//   5. Reference     -- the longer material (pay detail, credentials,
//                       resume bullets, openings, outreach templates) as
//                       dropdowns, so the schedule stays the main event.
import { useMemo, useState } from "react";
import Link from "next/link";
import type { GeneratedDayItem, GeneratedPlan, PlanResource, ResourceKind } from "@/lib/action-plan-generator";
import { Icon, type IconKind } from "@/components/Icon";
import { LiveJobResults } from "@/components/LiveJobResults";
import { Disclaimer } from "@/components/Disclaimer";
import { GlossaryText, buildGlossaryIndex } from "@/components/GlossaryText";
import { ActionPlanAccordionSection, AccordionSubLabel } from "@/components/ActionPlanAccordion";
import { BLUEPRINT_GRID } from "@/lib/blueprint-style";

const MONO = { fontFamily: "'IBM Plex Mono', monospace" } as const;

const RESOURCE_ICON: Record<ResourceKind, IconKind> = {
  career: "career",
  lesson: "lesson",
  software: "software",
  examPrep: "exam",
  program: "program",
  concept: "concept",
  guide: "gethired",
  section: "actionplan",
};

const STEP_KIND_LABEL: Record<NonNullable<GeneratedDayItem["kind"]>, string> = {
  lesson: "Lesson",
  software: "Software",
  examPrep: "Exam prep",
  program: "Program",
  concept: "Vocabulary",
  career: "Start here",
  guide: "Start here",
};

// Mirrors PayTimeline.tsx's own formatter so the same figure reads the
// same way wherever it shows up on the site.
function formatPay(n: number, unit: "annual" | "hourly"): string {
  if (unit === "hourly") return `$${n.toFixed(2)}/hr`;
  return `$${Math.round(n / 1000)}k/yr`;
}

const SHORT_DATE: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", SHORT_DATE);
}
function formatDateRange(start: Date, end: Date): string {
  const a = formatDate(start);
  const b = formatDate(end);
  return a === b ? a : `${a} – ${b}`;
}
function addDays(base: Date, days: number): Date {
  const next = new Date(base.getTime());
  next.setDate(next.getDate() + days);
  return next;
}

// A link to a site page, or (href starting with "#") a jump to one of
// the reference dropdowns further down this same screen -- which opens
// the dropdown first, since scrolling to a closed <details> lands on a
// title with nothing under it.
function ResourceChip({ resource, onDark = false }: { resource: PlanResource; onDark?: boolean }) {
  const className = onDark
    ? "inline-flex items-center gap-1.5 border border-paper/30 bg-paper/10 px-2.5 py-1 text-xs font-medium text-paper transition-colors hover:border-amber-soft hover:text-amber-soft"
    : "inline-flex items-center gap-1.5 border border-hairline bg-white/70 px-2.5 py-1 text-xs font-medium text-navy transition-colors hover:border-navy hover:bg-white";
  const body = (
    <>
      <Icon kind={RESOURCE_ICON[resource.kind]} size={13} className="shrink-0" />
      <span>{resource.label}</span>
      <span aria-hidden="true">{resource.href.startsWith("#") ? "↓" : "→"}</span>
    </>
  );
  if (resource.href.startsWith("#")) {
    return (
      <a
        href={resource.href}
        className={className}
        onClick={(e) => {
          const target = document.getElementById(resource.href.slice(1));
          if (!target) return;
          e.preventDefault();
          if (target instanceof HTMLDetailsElement) target.open = true;
          const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        }}
      >
        {body}
      </a>
    );
  }
  return (
    <Link href={resource.href} className={className}>
      {body}
    </Link>
  );
}

function CheckBox({
  checked,
  locked,
  label,
  onClick,
  large = false,
}: {
  checked: boolean;
  locked?: boolean;
  label: string;
  onClick: () => void;
  large?: boolean;
}) {
  const size = large ? "h-7 w-7" : "h-5 w-5";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={locked}
      aria-pressed={checked}
      aria-label={label}
      title={locked ? "Completed on the lesson page" : undefined}
      className={`${size} flex shrink-0 items-center justify-center border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${
        checked ? "border-navy bg-navy text-paper" : "border-steel/60 bg-white/70 text-transparent hover:border-navy"
      } ${locked ? "cursor-default" : ""}`}
    >
      <svg viewBox="0 0 16 16" className={large ? "h-4 w-4" : "h-3 w-3"} aria-hidden="true">
        <path d="M3 8.5l3.2 3.2L13 4.8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
      </svg>
    </button>
  );
}

function ProgressRing({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const r = 40;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 100 100" className="h-24 w-24 shrink-0" role="img" aria-label={`${pct} percent complete`}>
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(239,237,230,0.16)" strokeWidth="9" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="#F1E1BC"
          strokeWidth="9"
          strokeDasharray={`${(pct / 100) * c} ${c}`}
          transform="rotate(-90 50 50)"
        />
        <text x="50" y="57" textAnchor="middle" fill="#EFEDE6" fontSize="24" fontWeight="700" fontFamily="'Big Shoulders Display', sans-serif">
          {pct}%
        </text>
      </svg>
      <div>
        <p className="font-display text-2xl font-bold leading-none text-paper">
          {done} <span className="text-paper/60">of {total}</span>
        </p>
        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-paper/70">steps done</p>
      </div>
    </div>
  );
}

function StatTile({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="bg-white/60 px-4 py-4 sm:px-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold leading-none text-ink">{value}</p>
      {note && <p className="mt-1.5 text-xs leading-snug text-steel">{note}</p>}
    </div>
  );
}

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
    <div className="mt-3 border border-hairline bg-white/60">
      <div className="flex items-center justify-between border-b border-hairline px-3 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-steel">{label}</p>
        <button
          onClick={copy}
          type="button"
          aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
          className="border border-navy px-2 py-0.5 text-xs font-semibold text-navy transition-colors hover:bg-navy hover:text-paper"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="whitespace-pre-wrap px-3 py-3 font-sans text-sm leading-relaxed text-ink">{text}</pre>
    </div>
  );
}

function ToolkitGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-hairline px-4 py-4 first:border-t-0">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-clay">{title}</p>
      <ul className="mt-2 flex flex-col gap-2">{children}</ul>
    </div>
  );
}

function ToolkitLink({
  href,
  kind,
  title,
  note,
  done,
}: {
  href: string;
  kind: ResourceKind;
  title: string;
  note?: string;
  done?: boolean;
}) {
  return (
    <li>
      <Link href={href} className="group flex items-start gap-2.5">
        <Icon kind={RESOURCE_ICON[kind]} size={15} className="mt-0.5 shrink-0 text-navy" />
        <span className="min-w-0">
          <span className="block text-sm font-medium leading-snug text-ink group-hover:text-navy group-hover:underline">
            {title}
          </span>
          {(note || done) && (
            <span className="block text-xs leading-snug text-steel">
              {done && <span className="font-semibold text-navy">Completed{note ? " · " : ""}</span>}
              {note}
            </span>
          )}
        </span>
      </Link>
    </li>
  );
}

export function ActionPlanResult({
  plan,
  location,
  doneKeys,
  doneLessons,
  onToggle,
  onEdit,
  onRestart,
  restarting,
  onDownloadIcs,
  now,
}: {
  plan: GeneratedPlan;
  // The visitor's location, as typed on the form -- only used to decide
  // whether live job listings can be shown.
  location: string;
  // Step keys (GeneratedDayItem.key) the visitor has checked off.
  doneKeys: Set<string>;
  // Slugs of lessons completed anywhere on the site; a lesson step
  // counts as done when its lesson is in here, checked or not.
  doneLessons: Set<string>;
  onToggle: (key: string) => void;
  onEdit: () => void;
  onRestart: () => void;
  restarting: boolean;
  onDownloadIcs: () => void;
  // Overridable clock, for rendering a plan at a fixed date.
  now?: Date;
}) {
  const glossaryIndex = useMemo(() => buildGlossaryIndex(plan.glossaryConcepts), [plan.glossaryConcepts]);

  const lessonLocked = (day: GeneratedDayItem) =>
    day.lessonSlug !== undefined && doneLessons.has(day.lessonSlug) && !doneKeys.has(day.key);
  const isDone = (day: GeneratedDayItem) =>
    doneKeys.has(day.key) || (day.lessonSlug !== undefined && doneLessons.has(day.lessonSlug));

  const total = plan.days.length;
  const doneCount = plan.days.filter(isDone).length;
  const nextUp = plan.days.find((day) => !isDone(day));

  const today = new Date(now ?? new Date());
  today.setHours(0, 0, 0, 0);
  const firstDay = plan.days[0];
  const lastDay = plan.days[plan.days.length - 1];
  const planStart = firstDay ? addDays(firstDay.startDate, -(firstDay.dayStart - 1)) : today;
  const planEnd = addDays(planStart, plan.totalDays - 1);
  const scheduleIsOver = Boolean(lastDay) && planEnd.getTime() < today.getTime();
  const scheduleHasStarted = planStart.getTime() < today.getTime();

  // Dated steps grouped into calendar weeks of the plan (week 1 = days
  // 1-7), in order. A step that spans a week boundary sits in the week
  // it starts in.
  const weeks = useMemo(() => {
    const groups: { index: number; days: GeneratedDayItem[] }[] = [];
    for (const day of plan.days) {
      const index = Math.floor((day.dayStart - 1) / 7);
      const last = groups[groups.length - 1];
      if (last && last.index === index) last.days.push(day);
      else groups.push({ index, days: [day] });
    }
    return groups;
  }, [plan.days]);

  // Everything on this site the plan points at, counted once each --
  // the header's "from this site" figure.
  const siteLinkCount = useMemo(() => {
    const hrefs = new Set<string>();
    for (const day of plan.days) for (const r of day.resources) if (!r.href.startsWith("#")) hrefs.add(r.href);
    for (const c of plan.courses) hrefs.add(c.href);
    for (const p of plan.programs) hrefs.add(p.href);
    for (const g of plan.goFurther) hrefs.add(g.href);
    for (const s of plan.software) hrefs.add(s.href);
    for (const e of plan.exams) hrefs.add(e.href);
    for (const h of [plan.resumeGuideHref, plan.interviewPrepHref, plan.getHiredHref, plan.careerHref]) if (h) hrefs.add(h);
    return hrefs.size;
  }, [plan]);

  const trade = plan.careerTitle ?? plan.category;
  const hasOpenings =
    plan.targetEmployerTypes.length > 0 || plan.whereToLook.length > 0 || plan.jobBoardLinks.length > 0;
  const needCount = plan.qualifications.filter((q) => !q.have).length;

  const actionButton =
    "border border-paper/40 px-3.5 py-2 text-xs font-semibold uppercase tracking-wide text-paper transition-colors hover:border-amber-soft hover:text-amber-soft";

  return (
    <div className="print:hidden">
      {/* 1. Header band */}
      <header className="bg-ink text-paper" style={BLUEPRINT_GRID}>
        <div className="flex flex-col gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-soft" style={MONO}>
              <span>Your Blueprint</span>
              <span aria-hidden="true" className="h-px w-6 bg-amber-soft/60" />
              <span>{plan.status === "applying" ? "Actively applying" : "Just looking"}</span>
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] text-paper sm:text-5xl">{trade}</h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-paper/85">{plan.headline}</p>
            <p className="mt-4 text-xs text-paper/70" style={MONO}>
              {formatDateRange(planStart, planEnd)} &nbsp;&middot;&nbsp; {plan.totalDays} days &nbsp;&middot;&nbsp; {total} steps
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-5">
            <ProgressRing done={doneCount} total={total} />
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={onDownloadIcs} className={actionButton}>
                Add to calendar
              </button>
              <button type="button" onClick={() => window.print()} className={actionButton}>
                Print
              </button>
              <button type="button" onClick={onEdit} className={actionButton}>
                Edit answers
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Stat strip */}
      <div className="grid grid-cols-2 gap-px border border-t-0 border-hairline bg-hairline lg:grid-cols-4">
        <StatTile label="Timeline" value={`${plan.totalDays} days`} note={`Wraps up ${formatDate(planEnd)}`} />
        <StatTile
          label="Dated steps"
          value={String(total)}
          note={`${plan.days.filter((d) => d.kind === "lesson").length} lessons worked into the calendar`}
        />
        <StatTile label="From this site" value={String(siteLinkCount)} note="Lessons, guides, and programs linked from your steps" />
        {plan.entryPay ? (
          <StatTile
            label={plan.isEntryRole === false ? "Pay, low end" : "Entry pay"}
            value={`${formatPay(plan.entryPay.low, plan.entryPay.unit).replace(/\/(yr|hr)$/, "")}–${formatPay(plan.entryPay.high, plan.entryPay.unit)}`}
            note="National range, base pay only"
          />
        ) : (
          <StatTile
            label="To line up"
            value={plan.qualifications.length > 0 ? String(needCount) : "—"}
            note={plan.qualifications.length > 0 ? "Credentials still to get ready" : "Pick a specific career to see pay"}
          />
        )}
      </div>

      {scheduleIsOver && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border border-amber bg-amber-soft/50 px-5 py-4">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-clay">This plan&rsquo;s dates have passed</p>
            <p className="mt-1 text-sm text-ink">
              Life happens. Restart the calendar and every step gets a fresh date starting today. Anything you
              already checked off stays checked.
            </p>
          </div>
          <button
            type="button"
            onClick={onRestart}
            disabled={restarting}
            className="bg-navy px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-ink disabled:opacity-60"
          >
            {restarting ? "Restarting…" : "Restart the calendar from today"}
          </button>
        </div>
      )}

      {/* 3. Up next */}
      <section aria-label="Up next" className="mt-6 border border-ink/20 bg-white/70">
        {nextUp ? (
          <div className="flex gap-4 px-5 py-5 sm:gap-5 sm:px-6">
            <CheckBox
              large
              checked={false}
              label={`Mark done: ${nextUp.title}`}
              onClick={() => onToggle(nextUp.key)}
            />
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-clay" style={MONO}>
                <span>Up next</span>
                <span className="text-steel">{formatDateRange(nextUp.startDate, nextUp.endDate)}</span>
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold leading-tight text-ink">
                {nextUp.href ? (
                  <Link href={nextUp.href} className="hover:text-navy hover:underline">
                    {nextUp.title}
                  </Link>
                ) : (
                  nextUp.title
                )}
              </h3>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-steel">
                <GlossaryText text={nextUp.detail} index={glossaryIndex} />
              </p>
              {nextUp.resources.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {nextUp.resources.map((r) => (
                    <ResourceChip key={r.href} resource={r} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="px-6 py-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-clay" style={MONO}>
              All {total} steps done
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold text-ink">You finished the whole Blueprint.</h3>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-steel">
              Keep the warm conversations going, and keep learning while you wait on callbacks.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <ResourceChip resource={{ label: "Pick your next lesson", href: "/lessons", kind: "lesson" }} />
              <ResourceChip resource={{ label: "See your progress", href: "/my-progress", kind: "section" }} />
            </div>
          </div>
        )}
      </section>

      {/* 4. Schedule + toolkit */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section aria-label="Your schedule" className="min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-ink pb-2">
            <h3 className="font-display text-2xl font-bold text-ink">Your schedule</h3>
            <p className="text-xs text-steel">Checked steps save to your account.</p>
          </div>
          {scheduleHasStarted && !scheduleIsOver && (
            <p className="mt-3 text-xs text-steel">
              Fallen behind?{" "}
              <button
                type="button"
                onClick={onRestart}
                disabled={restarting}
                className="font-semibold text-navy underline-offset-2 hover:underline disabled:opacity-60"
              >
                {restarting ? "Restarting…" : "Restart the calendar from today"}
              </button>
              . Your checked-off steps stay checked.
            </p>
          )}

          {weeks.map((week) => {
            const weekStart = addDays(planStart, week.index * 7);
            const weekEnd = addDays(planStart, Math.min(plan.totalDays, week.index * 7 + 7) - 1);
            const weekDone = week.days.filter(isDone).length;
            return (
              <div key={week.index} className="mt-6">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-display text-lg font-bold uppercase tracking-wide text-navy">
                    Week {week.index + 1}
                    <span className="ml-2 text-xs font-normal normal-case tracking-normal text-steel" style={MONO}>
                      {formatDateRange(weekStart, weekEnd)}
                    </span>
                  </p>
                  <p className="text-xs text-steel" style={MONO}>
                    {weekDone}/{week.days.length}
                  </p>
                </div>
                <ol className="mt-2 border border-hairline bg-white/50">
                  {week.days.map((day) => {
                    const done = isDone(day);
                    const isToday = day.startDate.getTime() <= today.getTime() && today.getTime() <= day.endDate.getTime();
                    const overdue = !done && day.endDate.getTime() < today.getTime();
                    return (
                      <li
                        key={day.key}
                        className={`flex gap-3.5 border-t border-hairline px-4 py-4 first:border-t-0 sm:px-5 ${
                          isToday && !done ? "bg-amber-soft/25" : ""
                        }`}
                      >
                        <div className="pt-0.5">
                          <CheckBox
                            checked={done}
                            locked={lessonLocked(day)}
                            label={`${done ? "Mark not done" : "Mark done"}: ${day.title}`}
                            onClick={() => onToggle(day.key)}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-semibold uppercase tracking-wide">
                            <span className={overdue ? "text-clay" : "text-steel"} style={MONO}>
                              {formatDateRange(day.startDate, day.endDate)}
                            </span>
                            {day.kind && (
                              <span className="border border-navy/50 px-1.5 py-px text-navy">{STEP_KIND_LABEL[day.kind]}</span>
                            )}
                            {isToday && !done && <span className="bg-ink px-1.5 py-px text-paper">Today</span>}
                            {overdue && <span className="text-clay">Past due</span>}
                          </p>
                          <p className={`mt-1 font-medium leading-snug ${done ? "text-steel line-through" : "text-ink"}`}>
                            {day.href ? (
                              <Link href={day.href} className="hover:text-navy hover:underline">
                                {day.title}
                              </Link>
                            ) : day.kind === "concept" ? (
                              // The terms are already linked as chips
                              // right below; auto-linking them in the
                              // title too would underline only some.
                              day.title
                            ) : (
                              <GlossaryText text={day.title} index={glossaryIndex} />
                            )}
                          </p>
                          {!done && (
                            <>
                              <p className="mt-1 text-sm leading-relaxed text-steel">
                                <GlossaryText text={day.detail} index={glossaryIndex} />
                              </p>
                              {day.resources.length > 0 && (
                                <div className="mt-2.5 flex flex-wrap gap-2">
                                  {day.resources.map((r) => (
                                    <ResourceChip key={r.href} resource={r} />
                                  ))}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            );
          })}
        </section>

        {/* Toolkit: everything on this site the plan draws on, in one
            place, so nothing has to be hunted for inside a step. */}
        <aside aria-label="Your toolkit" className="lg:sticky lg:top-6 lg:self-start">
          <div className="border border-ink/20 bg-white/60">
            <div className="bg-ink px-4 py-3" style={BLUEPRINT_GRID}>
              <p className="font-display text-lg font-bold text-paper">Your toolkit</p>
              <p className="text-xs text-paper/70">Everything this plan pulls from the site.</p>
            </div>

            <ToolkitGroup title="Guides">
              {plan.careerHref && <ToolkitLink href={plan.careerHref} kind="career" title={`${trade} career page`} />}
              {plan.getHiredHref && <ToolkitLink href={plan.getHiredHref} kind="guide" title={`${plan.category} Get Hired guide`} />}
              {plan.resumeGuideHref && <ToolkitLink href={plan.resumeGuideHref} kind="guide" title="Resume Guide" />}
              {plan.interviewPrepHref && <ToolkitLink href={plan.interviewPrepHref} kind="guide" title="Interview Prep" />}
            </ToolkitGroup>

            {plan.courses.length > 0 && (
              <ToolkitGroup title="Lessons">
                {plan.courses.map(({ lesson, href }) => (
                  <ToolkitLink
                    key={lesson.id}
                    href={href}
                    kind="lesson"
                    title={lesson.title}
                    note={`${lesson.minutes} min`}
                    done={doneLessons.has(lesson.slug)}
                  />
                ))}
              </ToolkitGroup>
            )}

            {plan.programs.length > 0 && (
              <ToolkitGroup title="Where to train">
                {plan.programs.map(({ program, href }) => (
                  <ToolkitLink
                    key={program.id}
                    href={href}
                    kind="program"
                    title={program.title}
                    note={[program.durationNote, program.costNote].filter(Boolean).join(" · ") || program.organization}
                  />
                ))}
                <ToolkitLink href="/programs" kind="program" title="Browse all programs" />
              </ToolkitGroup>
            )}

            {plan.exams.length > 0 && (
              <ToolkitGroup title="Exam prep">
                {plan.exams.map((exam) => (
                  <ToolkitLink
                    key={exam.href}
                    href={exam.href}
                    kind="examPrep"
                    title={exam.title}
                    note={exam.entryLevel === false ? "Further down the road" : undefined}
                  />
                ))}
              </ToolkitGroup>
            )}

            {plan.software.length > 0 && (
              <ToolkitGroup title="Software to know">
                {plan.software.map(({ software, href }) => (
                  <ToolkitLink key={software.id} href={href} kind="software" title={software.title} />
                ))}
              </ToolkitGroup>
            )}

            {plan.goFurther.length > 0 && (
              <ToolkitGroup title="Go further">
                {plan.goFurther.map(({ concept, href }) => (
                  <ToolkitLink key={concept.id} href={href} kind="concept" title={concept.title} />
                ))}
              </ToolkitGroup>
            )}
          </div>
        </aside>
      </div>

      {/* 5. Reference material */}
      <section aria-label="Reference" className="mt-10">
        <div className="border-b-2 border-ink pb-2">
          <h3 className="font-display text-2xl font-bold text-ink">The details behind your steps</h3>
          <p className="mt-1 text-sm text-steel">
            Pay, credentials, resume bullets, where to look, and what to say. Open what you need.
          </p>
        </div>
        <div className="mt-4 flex flex-col">
          {plan.overview && (
            <ActionPlanAccordionSection title="How this plan is paced">
              <p className="text-sm leading-relaxed text-ink">{plan.overview}</p>
            </ActionPlanAccordionSection>
          )}
          {plan.entryPay && (
            <ActionPlanAccordionSection
              title="What you can expect to earn"
              teaser={`${formatPay(plan.entryPay.low, plan.entryPay.unit).replace(/\/(yr|hr)$/, "")}–${formatPay(plan.entryPay.high, plan.entryPay.unit)}`}
            >
              <p className="font-display text-3xl font-bold text-navy">
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

          {plan.qualifications.length > 0 && (
            <ActionPlanAccordionSection
              title="Credentials to have ready"
              teaser={needCount === 0 ? "all set" : `${needCount} to line up`}
            >
              <ul className="flex flex-col gap-2">
                {plan.qualifications.map((q, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-ink">
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border ${
                        q.have ? "border-navy bg-navy text-paper" : "border-steel/60 bg-white/70 text-transparent"
                      }`}
                    >
                      <svg viewBox="0 0 16 16" className="h-2.5 w-2.5">
                        <path d="M3 8.5l3.2 3.2L13 4.8" fill="none" stroke="currentColor" strokeWidth="2.4" />
                      </svg>
                    </span>
                    <span>
                      {q.label}
                      {q.have && <span className="ml-2 text-xs font-semibold uppercase text-navy">Have it</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </ActionPlanAccordionSection>
          )}

          {plan.resumeBullets.length > 0 && (
            <ActionPlanAccordionSection
              title="Resume bullets to adapt"
              teaser={`${plan.resumeBullets.length} bullet${plan.resumeBullets.length === 1 ? "" : "s"}`}
            >
              <ul className="flex flex-col gap-2">
                {plan.resumeBullets.map((bullet, i) => (
                  <li key={i} className="border-l-2 border-hairline pl-3 text-sm leading-relaxed text-ink">
                    {bullet}
                  </li>
                ))}
              </ul>
              {plan.resumeGuideHref && (
                <div className="mt-3">
                  <ResourceChip resource={{ label: "The full Resume Guide", href: plan.resumeGuideHref, kind: "guide" }} />
                </div>
              )}
            </ActionPlanAccordionSection>
          )}

          {hasOpenings && (
            <ActionPlanAccordionSection
              id="openings"
              title="Where to find openings"
              teaser={
                [
                  plan.targetEmployerTypes.length > 0
                    ? `${plan.targetEmployerTypes.length} employer type${plan.targetEmployerTypes.length === 1 ? "" : "s"}`
                    : "",
                  plan.jobBoardLinks.length > 0 && location.trim() ? "live openings near you" : "",
                ]
                  .filter(Boolean)
                  .join(" · ") || undefined
              }
            >
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
                <LiveJobResults trade={trade} location={location} entryPay={plan.entryPay} />
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
                        className="border border-hairline bg-white/70 px-3 py-1.5 text-xs font-semibold text-navy transition-colors hover:border-navy"
                      >
                        {link.label} &rarr;
                      </a>
                    ))}
                  </div>
                </>
              )}
            </ActionPlanAccordionSection>
          )}

          <ActionPlanAccordionSection
            id="outreach"
            title="What to say when you reach out"
            teaser={`${plan.recruiterOutreach.tips.length} tip${plan.recruiterOutreach.tips.length === 1 ? "" : "s"} · 3 templates`}
          >
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
      </section>

      <p className="mt-8 border-l-[3px] border-amber pl-3 text-sm leading-relaxed text-steel">
        <span className="font-semibold text-ink">A plan, not a promise.</span> This Blueprint is informational, not
        a guarantee of being hired. Confirm any licensing or certification requirement yourself before relying on
        it.
      </p>
    </div>
  );
}
