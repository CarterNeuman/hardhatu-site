import Link from "next/link";
import { getAllContent, getJobHuntGuides, urlFor } from "@/lib/content";
import { CATEGORY_SLUG } from "@/lib/content-client";
import { Icon, type IconKind } from "@/components/Icon";

// The four job-hunt stops for one career category, shown as a single
// connected strip: how hiring works -> the resume -> the interview -> a
// dated plan. Rendered at the bottom of each of those pages (and on
// career, exam and program pages) so none of them is a dead end and the
// Blueprint, the piece that ties the other three together, is reachable
// from content instead of only from the header.
//
// `current` marks the stop the reader is already on; it renders as a
// plain "You're here" tile rather than a link back to the same page.
// With no `category` (the two general interview guides, an exam with no
// category) the strip falls back to the general Get Hired guide and the
// Resume Guide index -- still four stops, just not category-specific.
type Stop = {
  key: "gethired" | "resume" | "interview" | "actionplan";
  step: string;
  label: string;
  title: string;
  blurb: string;
  href: string;
  icon: IconKind;
};

export function JobHuntRail({
  category,
  careerId,
  current,
  heading,
}: {
  category?: string;
  careerId?: string;
  current?: Stop["key"];
  heading?: string;
}) {
  const { getHired, resume, interview } = getJobHuntGuides(category, careerId);
  const career = careerId ? getAllContent().byId.get(careerId) : undefined;
  const categorySlug = category ? CATEGORY_SLUG[category] : undefined;

  // Hands the Blueprint form a head start: the category (and career,
  // when this strip sits on a career page) arrive already picked.
  const blueprintParams = new URLSearchParams();
  if (categorySlug) blueprintParams.set("category", categorySlug);
  if (categorySlug && career && career.type === "career") blueprintParams.set("role", career.slug);
  const blueprintHref = blueprintParams.size > 0 ? `/action-plan?${blueprintParams.toString()}` : "/action-plan";

  const stops: Stop[] = [
    {
      key: "gethired",
      step: "01",
      label: "Get Hired guide",
      title: "Know how hiring works",
      blurb: "Who actually hires, where they look, and what to have ready.",
      href: getHired ? urlFor(getHired) : "/get-hired",
      icon: "gethired",
    },
    {
      key: "resume",
      step: "02",
      label: "Resume Guide",
      title: "Build the resume",
      blurb: "What a reviewer scans for, with bullets you can adapt.",
      href: resume ? urlFor(resume) : "/resumes",
      icon: "resume",
    },
    {
      key: "interview",
      step: "03",
      label: "Interview Prep",
      title: "Practice the conversation",
      blurb: "The questions to expect and what each one is really asking.",
      href: interview ? urlFor(interview) : "/interviews",
      icon: "interview",
    },
    {
      key: "actionplan",
      step: "04",
      label: "Blueprint",
      title: "Put it on a calendar",
      blurb: "A dated, day-by-day plan built from all of the above.",
      href: blueprintHref,
      icon: "actionplan",
    },
  ];

  return (
    <section aria-label="Job-hunt toolkit" className="mt-10 border border-ink/15 bg-white/50 print:hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-hairline px-5 py-3">
        <h2 className="font-display text-lg font-bold text-ink">{heading ?? "Your job-hunt toolkit"}</h2>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
          {category ?? "Construction-wide"}
        </p>
      </div>
      <ol className="grid grid-cols-1 sm:grid-cols-2">
        {stops.map((stop, i) => {
          const isCurrent = stop.key === current;
          const isBlueprint = stop.key === "actionplan";
          const edge = `${i > 0 ? "border-t border-hairline" : ""} ${i === 1 ? "sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l sm:border-hairline" : ""}`;
          const inner = (
            <>
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`text-[11px] font-semibold tracking-[0.14em] ${isBlueprint && !isCurrent ? "text-amber-soft" : "text-clay"}`}
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {stop.step} &middot; {stop.label.toUpperCase()}
                </span>
                <Icon kind={stop.icon} size={18} className={isBlueprint && !isCurrent ? "text-amber-soft" : "text-navy"} />
              </div>
              <p
                className={`mt-2 font-display text-xl font-bold leading-tight ${isBlueprint && !isCurrent ? "text-paper" : "text-ink"} ${isCurrent ? "" : "group-hover:underline"}`}
              >
                {stop.title}
              </p>
              <p className={`mt-1 text-sm leading-snug ${isBlueprint && !isCurrent ? "text-paper/80" : "text-steel"}`}>
                {stop.blurb}
              </p>
              <p
                className={`mt-3 text-xs font-semibold uppercase tracking-wide ${isCurrent ? "text-steel" : isBlueprint ? "text-amber-soft" : "text-navy"}`}
              >
                {isCurrent ? "You're here" : isBlueprint ? "Build mine →" : "Open →"}
              </p>
            </>
          );
          return (
            <li key={stop.key} className={edge}>
              {isCurrent ? (
                <div aria-current="page" className="h-full bg-paper/60 px-5 py-4">
                  {inner}
                </div>
              ) : (
                <Link
                  href={stop.href}
                  className={`group block h-full px-5 py-4 transition-colors ${isBlueprint ? "bg-ink hover:bg-navy" : "hover:bg-white"}`}
                >
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
