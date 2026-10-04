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
  // iCalendar lines are supposed to wrap at 75 octets with a leading space
  // on the continuation; most calendar apps tolerate long lines fine, but
  // folding keeps this spec-correct for stricter importers.
  if (line.length <= 75) return line;
  let result = "";
  let rest = line;
  while (rest.length > 75) {
    result += rest.slice(0, 75) + "\r\n ";
    rest = rest.slice(75);
  }
  return result + rest;
}

export function buildIcs(days: GeneratedDayItem[], calendarName: string): string {
  const now = toIcsDate(new Date());
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//HardHatU//Action Plan//EN",
    "CALSCALE:GREGORIAN",
    `X-WR-CALNAME:${escapeIcsText(calendarName)}`,
  ];

  days.forEach((item, i) => {
    const exclusiveEnd = new Date(item.endDate.getTime() + 24 * 60 * 60 * 1000);
    lines.push(
      "BEGIN:VEVENT",
      `UID:hardhatu-action-plan-${now}-${i}@hardhatu.com`,
      `DTSTAMP:${now}T000000Z`,
      `DTSTART;VALUE=DATE:${toIcsDate(item.startDate)}`,
      `DTEND;VALUE=DATE:${toIcsDate(exclusiveEnd)}`,
      `SUMMARY:${escapeIcsText(item.title)}`,
      `DESCRIPTION:${escapeIcsText(item.detail)}`,
      "END:VEVENT"
    );
  });

  lines.push("END:VCALENDAR");
  return lines.map(foldLine).join("\r\n");
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
