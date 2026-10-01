"use client";

import { useState } from "react";

// Shared section wrapper for the career/interview/exam/resume/concept index
// pages, which all group their items into categorized buckets. `id` matches
// CATEGORY_SLUG from Header.tsx so the nav dropdown's category links jump
// straight to the right section instead of the top of the page.
//
// `collapsible` opts a page into an expand/collapse toggle (used by the
// Concepts page, where categories can run long). Every other page leaves it
// unset and renders exactly as before, with no button, state, or animation.
export function CategorySection({
  id,
  title,
  count,
  collapsible = false,
  defaultOpen = true,
  children,
}: {
  id: string;
  title: string;
  count?: number;
  collapsible?: boolean;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  if (!collapsible) {
    return (
      <section id={id} className="mt-12 scroll-mt-24 first:mt-0">
        <div className="flex items-baseline gap-3 border-t border-hairline pt-5">
          <h2 className="font-display text-2xl font-bold text-ink">{title}</h2>
          {typeof count === "number" && (
            <span className="text-xs uppercase tracking-wide text-steel">
              {count} {count === 1 ? "entry" : "entries"}
            </span>
          )}
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
      </section>
    );
  }

  return (
    <section id={id} className="mt-12 scroll-mt-24 first:mt-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group flex w-full items-center gap-3 border-t border-hairline pt-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
      >
        <FoldRuleIcon open={open} />
        <h2 className="font-display text-2xl font-bold text-ink transition-colors group-hover:text-navy">
          {title}
        </h2>
        {typeof count === "number" && (
          <span className="text-xs uppercase tracking-wide text-steel">
            {count} {count === 1 ? "entry" : "entries"}
          </span>
        )}
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
        </div>
      </div>
    </section>
  );
}

// The toggle glyph: a chevron built like a carpenter's folding rule, two
// arms pinned at a rivet. Closed, it points right (tucked away, like a
// folded rule); open, it swings down 90° to point at the revealed content.
// Reuses the small filled-dot "rivet" already used elsewhere in the site's
// icon set (see the gethired/quiz icons in Icon.tsx) instead of a plain
// generic chevron.
function FoldRuleIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      aria-hidden="true"
      focusable="false"
      className="shrink-0 text-steel transition-[transform,color] duration-300 ease-in-out group-hover:text-navy"
      style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
    >
      <polyline
        points="9,7 15,12 9,17"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
