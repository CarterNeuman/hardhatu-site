// A small marker for careers someone can start on day one with zero
// prior construction/industry experience (the `isEntryRole` field on the
// career schema -- see lib/types.ts for the exact classification rule).
// Kept as its own component rather than reusing EntryLevelBadge, since
// that one is deliberately scoped to Get Qualified exams/certifications
// (a different "entry" distinction: no experience required to sit the
// exam, not no experience required to start the career) and its own
// comment says as much. Visually matched to EntryLevelBadge on purpose,
// so "Entry Level" reads as one consistent idea sitewide even though the
// two badges are driven by two different fields.
export function CareerEntryBadge() {
  return (
    <span className="inline-block border border-navy bg-navy/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink">
      Entry Level
    </span>
  );
}
