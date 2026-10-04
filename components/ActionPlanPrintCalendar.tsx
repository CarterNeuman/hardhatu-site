// The print-only deliverable for the action-plan generator: a compact,
// two-week-by-default calendar grid with a task and a checkbox for each
// day, meant to be printed or saved as a PDF and kept on a fridge or in a
// truck. This is deliberately NOT the whole results page -- once sign-in
// exists the full plan stays reachable online, so the printed artifact only
// needs the day-by-day tasks, not the overview, qualifications, or outreach
// templates. Day numbers are generic ("Day 1", "Day 2", ...) rather than
// real dates or weekdays, since the start date is arbitrary and the point
// is pacing, not a specific calendar week.
import { HardHatMark } from "@/components/Header";
import type { GeneratedDayItem } from "@/lib/action-plan-generator";

const DEFAULT_SPAN_DAYS = 14;
const DAYS_PER_ROW = 7;

export function ActionPlanPrintCalendar({ days, title }: { days: GeneratedDayItem[]; title: string }) {
  const maxDayEnd = days.reduce((max, item) => Math.max(max, item.dayEnd), 0);
  const totalDays = Math.max(DEFAULT_SPAN_DAYS, maxDayEnd);
  const rowCount = Math.ceil(totalDays / DAYS_PER_ROW);
  const dayNumbers = Array.from({ length: rowCount * DAYS_PER_ROW }, (_, i) => i + 1);

  function tasksForDay(dayNum: number): GeneratedDayItem[] {
    return days.filter((item) => item.dayStart <= dayNum && dayNum <= item.dayEnd);
  }

  return (
    <div className="hidden print:block">
      <div className="flex items-center gap-3 border-b-2 border-navy pb-3">
        <HardHatMark size={34} />
        <p className="font-display text-xl font-bold text-ink">
          hardhat<span className="text-amber">U</span>
        </p>
        <div className="ml-auto text-right">
          <p className="font-display text-lg font-bold text-ink">{title}</p>
          <p className="text-xs text-steel">
            {rowCount * DAYS_PER_ROW}-day schedule &middot; check off each task as you finish it
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-2">
        {dayNumbers.map((dayNum) => {
          const tasks = tasksForDay(dayNum);
          return (
            <div key={dayNum} className="border border-hairline" style={{ breakInside: "avoid" }}>
              <div className="bg-navy px-2 py-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-paper">Day {dayNum}</p>
              </div>
              <div className="flex min-h-[1.5in] flex-col gap-1.5 p-1.5">
                {tasks.length === 0 ? (
                  <p className="text-[9px] italic text-steel">Open day</p>
                ) : (
                  tasks.map((task, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span aria-hidden="true" className="mt-0.5 inline-block h-2.5 w-2.5 shrink-0 border border-ink" />
                      <span className="text-[9px] leading-snug text-ink">{task.title}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-[9px] text-steel">
        hardhatU &middot; this schedule is informational, not a guarantee of being hired.
      </p>
    </div>
  );
}
