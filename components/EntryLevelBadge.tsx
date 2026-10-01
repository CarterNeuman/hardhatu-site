// A small, exam-specific distinction for certifications/licenses that have
// no prior-experience prerequisite (the same split already encoded by each
// exam's `tier` field: free = no experience required to sit it, premium =
// real prior work experience or documented hours required). Kept as its
// own tiny component rather than folded into TypeBadge's generic
// free/premium handling, since TypeBadge is shared by every content type
// on the site and "entry level" is a distinction specific to Get
// Qualified, not something every career/concept/lesson needs labeled.
export function EntryLevelBadge() {
  return (
    <span className="inline-block border border-navy bg-navy/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink">
      Entry Level
    </span>
  );
}
