// Color-coded badge for a Program's `programType` (a free-text field, not
// an enum — see ProgramSchema in lib/types.ts). Separate from the generic
// TypeBadge (which marks *content type*, e.g. "Program Finder") because
// this marks the *kind of program* and carries real color so the Programs
// finder reads as a scannable directory rather than a wall of identical
// cards. An unrecognized programType still renders (falls back to a
// neutral style) instead of breaking, same as PROGRAM_TYPE_ORDER's
// fallback in app/programs/page.tsx.
const PROGRAM_TYPE_STYLES: Record<string, string> = {
  "Registered Apprenticeship": "bg-amber-soft text-amber",
  "Union Program": "bg-clay text-paper",
  "Trade School": "bg-navy text-paper",
  "Certificate Program": "border border-steel text-steel bg-white/50",
  "Online Course": "bg-hairline text-ink",
  "Licensure Pathway": "bg-ink text-paper",
};

const FALLBACK_STYLE = "border border-hairline bg-white/50 text-steel";

export function ProgramTypeBadge({ programType }: { programType: string }) {
  const style = PROGRAM_TYPE_STYLES[programType] ?? FALLBACK_STYLE;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide ${style}`}
    >
      {programType}
    </span>
  );
}
