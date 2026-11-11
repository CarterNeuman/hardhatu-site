"use client";

import { useRef, useState } from "react";

// A single collapsible section used on the Action Plan result screen
// (see ActionPlanBuilder.tsx) -- replaces what used to be ten separate
// stacked <SectionLabel> blocks with six dropdowns grouped by the
// question each one answers, so the page is short until a visitor opens
// what they actually want (see claude/action-plan-job-search-escalation-
// brainstorm.md's sibling doc on the pay-scale rework for the related
// isEntryRole work, and the chat history for the accordion mockup this
// was built from). Plain <details>/<summary> on purpose -- free
// keyboard/screen-reader semantics, no extra state to manage per
// section. `defaultOpen` only sets the *initial* open attribute: once
// rendered, each section's open/closed state is entirely native browser
// behavior, not React state, so clicking one never re-renders or
// disturbs any other section (see useActionPlanAccordionControls below
// for how "Expand all" reaches into that native state imperatively
// instead).
export function ActionPlanAccordionSection({
  title,
  teaser,
  defaultOpen,
  children,
}: {
  title: string;
  teaser?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details
      open={defaultOpen || undefined}
      className="group border border-hairline bg-white/40 open:bg-white/70 [&:not(:first-of-type)]:border-t-0"
    >
      {/* Phone layout: the teaser drops onto its own line under the
          title, and the title is allowed to wrap. Both used to be forced
          onto one row (title nowrap, teaser shrink-0), so a long title
          like "Reach Out to Recruiters & Hiring Managers" ran straight
          through its teaser text on a narrow screen. From `sm` up it's
          the original single row with the teaser right-aligned. */}
      <summary className="flex cursor-pointer list-none flex-col gap-1 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 [&::-webkit-details-marker]:hidden">
        <span className="flex min-w-0 items-center gap-2.5">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 shrink-0 rotate-[-45deg] border-b-2 border-r-2 border-navy transition-transform duration-150 group-open:rotate-45"
          />
          <span className="min-w-0 font-display text-[17px] font-semibold leading-snug text-ink">{title}</span>
        </span>
        {teaser && (
          <span
            className="pl-5 text-xs text-steel sm:shrink-0 sm:pl-0 sm:text-right"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {teaser}
          </span>
        )}
      </summary>
      <div className="px-4 pb-5 pl-9 text-ink">{children}</div>
    </details>
  );
}

// A tiny uppercase sub-heading for a block nested inside one accordion
// section (e.g. "Have these ready" / "Courses to take" within
// Qualifications & Courses) -- one step down from SectionLabel's own
// amber-ruled headers, which stay reserved for the six accordion titles
// themselves plus the page's own standalone labels (Overview, Your Plan).
export function AccordionSubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-steel first:mt-0">{children}</p>
  );
}

// Backs the "Expand all" / "Collapse all" control sitting next to the
// "Your Plan" label. Reaches into the native <details> elements inside
// containerRef directly (imperative DOM, not React state) since their
// open/closed state is native browser state to begin with -- see
// ActionPlanAccordionSection's own comment. Point containerRef at the
// element wrapping every <details> this control should affect.
export function useActionPlanAccordionControls() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("Expand all");

  function toggleAll() {
    const container = containerRef.current;
    if (!container) return;
    const items = container.querySelectorAll("details");
    const anyClosed = Array.from(items).some((item) => !item.open);
    items.forEach((item) => {
      item.open = anyClosed;
    });
    setLabel(anyClosed ? "Collapse all" : "Expand all");
  }

  return { containerRef, label, toggleAll } as const;
}
