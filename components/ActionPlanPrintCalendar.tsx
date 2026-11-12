// The print-only deliverable for the Blueprint: a one-page-per-month
// calendar meant to be printed or saved as a PDF and kept on the fridge
// or in the truck. Deliberately NOT the whole result screen -- the full
// plan stays online, so the printed sheet carries only what someone
// needs away from a screen: which step lands on which day, a box to
// tick, and where to pick the plan back up.
//
// Styled as a companion to the on-screen Blueprint (same type, same
// mono labels, same navy/amber accents) but drawn for paper: white
// background, hairline rules, and color used only for small accents, so
// it stays legible on a black-and-white printer and doesn't drain a
// cartridge. The few tinted fills are forced to print via
// print-color-adjust (browsers drop backgrounds by default); nothing
// here depends on them to be readable.
//
// Prints landscape via the named `blueprint` page in app/globals.css,
// which leaves every other page on the site printing as it always has.
import { BlueprintMark } from "@/components/BlueprintMark";
import type { GeneratedDayItem } from "@/lib/action-plan-generator";

const DAYS_PER_ROW = 7;
// Hard ceiling on how many days this prints -- this is meant to stay a
// compact, grab-and-go physical schedule, not grow into a booklet for a
// visitor who picked a long timeline. A longer plan keeps going online;
// the print view covers its first four weeks.
const MAX_PRINT_DAYS = 28;

const MONO = { fontFamily: "'IBM Plex Mono', monospace" } as const;

const KIND_TAG: Partial<Record<NonNullable<GeneratedDayItem["kind"]>, string>> = {
  lesson: "Lesson",
  software: "Software",
  examPrep: "Exam prep",
  program: "Program",
  concept: "Vocab",
};

function addDays(base: Date, days: number): Date {
  const next = new Date(base.getTime());
  next.setDate(next.getDate() + days);
  return next;
}

function shortDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// "Reach out to your next leads... (round 3 of 8)" -> the title plus a
// compact "R3" marker, so a repeating step doesn't spend a third of its
// tiny cell on the round counter.
function splitRound(title: string): { text: string; round?: string } {
  const match = title.match(/^(.*)\s+\(round (\d+) of \d+\)$/);
  return match ? { text: match[1], round: `R${match[2]}` } : { text: title };
}

export function ActionPlanPrintCalendar({
  days,
  title,
  totalDays,
  status,
}: {
  days: GeneratedDayItem[];
  title: string;
  // The plan's full length in days (may exceed what fits on the sheet).
  totalDays?: number;
  status?: "browsing" | "applying";
}) {
  const first = days[0];
  if (!first) return null;
  const planStart = addDays(first.startDate, -(first.dayStart - 1));
  const planLength = totalDays ?? days.reduce((max, item) => Math.max(max, item.dayEnd), 0);
  const printedDays = Math.min(MAX_PRINT_DAYS, Math.max(DAYS_PER_ROW, Math.ceil(planLength / DAYS_PER_ROW) * DAYS_PER_ROW));
  const isTruncated = planLength > printedDays;
  const weekCount = printedDays / DAYS_PER_ROW;
  const stepsOnSheet = days.filter((item) => item.dayStart <= printedDays).length;

  return (
    <div
      className="hidden bg-white text-ink print:block"
      style={{ page: "blueprint", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
    >
      {/* Header: mark and title left, the plan's vitals right, over a
          heavy rule with a short amber tab -- the same accent the site's
          section labels use. */}
      <div className="flex items-end justify-between gap-6">
        <div className="flex items-center gap-3">
          <BlueprintMark size={46} />
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-clay" style={MONO}>
              Your Blueprint{status ? ` · ${status === "applying" ? "Actively applying" : "Just looking"}` : ""}
            </p>
            <p className="font-display text-[30px] font-bold leading-none text-ink">{title}</p>
          </div>
        </div>
        <dl className="flex gap-6 text-right">
          {[
            { label: "Dates", value: `${shortDate(planStart)} – ${shortDate(addDays(planStart, printedDays - 1))}` },
            { label: "On this sheet", value: `${stepsOnSheet} steps` },
            { label: "Plan length", value: `${planLength} days` },
          ].map((item) => (
            <div key={item.label}>
              <dt className="text-[8px] font-semibold uppercase tracking-[0.16em] text-steel">{item.label}</dt>
              <dd className="font-display text-[15px] font-bold leading-tight text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="relative mt-2.5 border-t-[3px] border-ink">
        <span aria-hidden="true" className="absolute -top-[3px] left-0 block h-[3px] w-16 bg-amber" />
      </div>

      {/* One row per week: a narrow label column, then seven day cells. */}
      <div className="mt-3 flex flex-col gap-2">
        {Array.from({ length: weekCount }, (_, w) => {
          const weekStart = addDays(planStart, w * DAYS_PER_ROW);
          return (
            <div key={w} className="flex gap-2" style={{ breakInside: "avoid" }}>
              <div className="flex w-[0.62in] shrink-0 flex-col justify-between border-l-[3px] border-navy py-1 pl-2">
                <div>
                  <p className="text-[7.5px] font-semibold uppercase tracking-[0.18em] text-steel">Week</p>
                  <p className="font-display text-[26px] font-bold leading-none text-navy">{w + 1}</p>
                </div>
                <p className="text-[7.5px] leading-tight text-steel" style={MONO}>
                  {shortDate(weekStart)}
                  <br />
                  {shortDate(addDays(weekStart, 6))}
                </p>
              </div>

              <div className="grid flex-1 grid-cols-7 border-l border-t border-hairline">
                {Array.from({ length: DAYS_PER_ROW }, (_, d) => {
                  const dayNum = w * DAYS_PER_ROW + d + 1;
                  const date = addDays(planStart, dayNum - 1);
                  const beyondPlan = dayNum > planLength;
                  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                  const starting = days.filter((item) => item.dayStart === dayNum);
                  const continuing = days.filter((item) => item.dayStart < dayNum && dayNum <= item.dayEnd);
                  return (
                    <div
                      key={dayNum}
                      className={`flex min-h-[1.4in] flex-col border-b border-r border-hairline ${
                        isWeekend ? "bg-paper/60" : "bg-white"
                      }`}
                    >
                      <div className="flex items-baseline justify-between border-b border-hairline px-1.5 py-1">
                        <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-ink" style={MONO}>
                          {date.toLocaleDateString("en-US", { weekday: "short" })}{" "}
                          <span className="text-steel">{shortDate(date)}</span>
                        </p>
                        {!beyondPlan && (
                          <p className="text-[7px] uppercase tracking-wide text-steel" style={MONO}>
                            Day {dayNum}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col gap-1.5 px-1.5 py-1.5">
                        {starting.map((task) => {
                          const { text, round } = splitRound(task.title);
                          const tag = round ?? (task.kind ? KIND_TAG[task.kind] : undefined);
                          return (
                            <div key={task.key} className="flex items-start gap-1.5">
                              <span aria-hidden="true" className="mt-px inline-block h-[9px] w-[9px] shrink-0 border border-ink bg-white" />
                              <span className="min-w-0 text-[8.5px] leading-[1.25] text-ink">
                                {tag && (
                                  <span className="mr-1 text-[7px] font-semibold uppercase tracking-wide text-clay" style={MONO}>
                                    {tag}
                                  </span>
                                )}
                                <span className="line-clamp-3">{text}</span>
                              </span>
                            </div>
                          );
                        })}
                        {/* A step that started on an earlier day carries
                            over as a lighter line with no second box --
                            one step, one box to tick. */}
                        {continuing.map((task) => (
                          <p key={task.key} className="line-clamp-1 pl-[15px] text-[7.5px] italic leading-tight text-steel">
                            &hellip; {splitRound(task.title).text}
                          </p>
                        ))}
                        {starting.length === 0 && continuing.length === 0 && !beyondPlan && (
                          <p className="text-[7.5px] italic text-steel/80">Open day. Catch up or rest.</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-start justify-between gap-6 border-t border-hairline pt-2">
        <p className="max-w-[62%] text-[8px] leading-snug text-steel">
          Tick each box as you finish a step, then check it off online so your progress saves.
          {isTruncated ? ` This sheet covers the first ${printedDays} days of your ${planLength}-day plan; the rest continues online.` : ""}{" "}
          Informational, not a guarantee of being hired.
        </p>
        <p className="shrink-0 text-right text-[8px] leading-snug text-steel">
          Lessons, guides, and outreach templates for every step:
          <br />
          <span className="font-semibold text-ink" style={MONO}>
            breakgroundu.com/action-plan
          </span>
        </p>
      </div>
    </div>
  );
}
