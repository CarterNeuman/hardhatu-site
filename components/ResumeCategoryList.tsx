"use client";

import { useState } from "react";
import { CategorySection } from "@/components/CategorySection";

// Mock-up v2 support: Resume Guide's categories are now collapsible, with
// a page-level button that moves every section together. Needs to be a
// client component (useState) — the server page builds each section's
// title/count/intro/children as plain React nodes and hands them here.
// Sections start open per the request, and the button only ever flips
// them all at once (no per-section memory needed beyond CategorySection's
// own, which this overrides while controlled).
export type ResumeCategorySectionData = {
  id: string;
  title: string;
  count: number;
  intro?: React.ReactNode;
  children: React.ReactNode;
};

export function ResumeCategoryList({ sections }: { sections: ResumeCategorySectionData[] }) {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(sections.map((s) => [s.id, true]))
  );

  const allOpen = sections.every((s) => openMap[s.id] !== false);

  function toggleAll() {
    const next = !allOpen;
    setOpenMap(Object.fromEntries(sections.map((s) => [s.id, next])));
  }

  return (
    <>
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={toggleAll}
          className="border border-hairline px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-steel transition-colors hover:border-navy hover:text-navy"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>

      {sections.map((section) => (
        <CategorySection
          key={section.id}
          id={section.id}
          title={section.title}
          count={section.count}
          collapsible
          open={openMap[section.id] ?? true}
          onToggle={() =>
            setOpenMap((prev) => ({ ...prev, [section.id]: !(prev[section.id] ?? true) }))
          }
          intro={section.intro}
        >
          {section.children}
        </CategorySection>
      ))}
    </>
  );
}
