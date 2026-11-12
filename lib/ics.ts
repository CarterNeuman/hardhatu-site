// Builds a minimal, valid .ics calendar file from a generated action
// plan's day-by-day items and triggers a browser download. Deliberately
// has no server/account dependency -- the literal, no-login-needed answer
// to "print a calendar/schedule" from the feature's original brief. Each
// plan item becomes an all-day event spanning its start/end dates.
import type { GeneratedDayItem } from "./action-plan-generator";

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

// All-day events use a plain YYYYMMDD date value (no time/timezone), and
// per the iCalendar spec DTEND on an all-day event is exclusive, so a
// one-day item's end date gets bumped forward by one day.
function toIcsDate(date: Date): string {
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
}

function escapeIcsText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function foldLine(line: string): string {
  // iCalendar lines are supposed to wrap at 75 octets per line, and that
  // budget includes the leading space RFC 5545 requires on a continuation
  // line -- so each continuation carries 74 octets of content, not 75.
  // Most calendar apps tolerate a line that runs one octet over, but
  // folding at the spec-correct width keeps stricter importers happy.
  if (line.length <= 75) return line;
  let result = line.slice(0, 75);
  let rest = line.slice(75);
  while (rest.length > 0) {
    result += "\r\n " + rest.slice(0, 74);
    rest = rest.slice(74);
  }
  return result;
}

// `origin` (e.g. "https://www.breakgroundu.com") turns each step's site
// links into full URLs inside the calendar event, so the lesson or guide
// a step refers to is one tap away from the phone's calendar app, not
// just named. Links to sections of the plan page itself ("#outreach")
// are left out -- they mean nothing outside that page.
export function buildIcs(days: GeneratedDayItem[], calendarName: string, origin = ""): string {
  const now = toIcsDate(new Date());
  // Separate from `now` (date-only, used for DTSTAMP below) on purpose:
  // a UID only needs to be unique, and two downloads made later the same
  // day used to produce identical UIDs since both runs reset `i` to 0
  // against the same date-only value. Millisecond resolution closes that
  // without needing a real random-number source.
  const uidSeed = Date.now().toString(36);
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BreakGroundU//Blueprint//EN",
    "CALSCALE:GREGORIAN",
    `X-WR-CALNAME:${escapeIcsText(calendarName)}`,
  ];

  days.forEach((item, i) => {
    // Calendar-day arithmetic (setDate), not "+24 hours": on the day
    // clocks fall back, local midnight + 24h lands at 11pm the SAME
    // day, which made a one-day item's exclusive end equal its start
    // (a zero-length event some calendar apps drop or reject).
    const exclusiveEnd = new Date(item.endDate.getTime());
    exclusiveEnd.setDate(exclusiveEnd.getDate() + 1);
    lines.push(
      "BEGIN:VEVENT",
      `UID:breakgroundu-action-plan-${uidSeed}-${i}@breakgroundu.com`,
      `DTSTAMP:${now}T000000Z`,
      `DTSTART;VALUE=DATE:${toIcsDate(item.startDate)}`,
      `DTEND;VALUE=DATE:${toIcsDate(exclusiveEnd)}`,
      `SUMMARY:${escapeIcsText(item.title)}`,
      `DESCRIPTION:${escapeIcsText(describe(item, origin))}`,
      ...(origin && item.href && !item.href.startsWith("#") ? [`URL:${origin}${item.href}`] : []),
      "END:VEVENT"
    );
  });

  lines.push("END:VCALENDAR");
  return lines.map(foldLine).join("\r\n");
}

function describe(item: GeneratedDayItem, origin: string): string {
  const links = origin ? item.resources.filter((r) => !r.href.startsWith("#")) : [];
  if (links.length === 0) return item.detail;
  return `${item.detail}\n\nOn BreakGroundU:\n${links.map((r) => `${r.label}: ${origin}${r.href}`).join("\n")}`;
}

export function downloadIcs(filename: string, icsText: string) {
  const blob = new Blob([icsText], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
