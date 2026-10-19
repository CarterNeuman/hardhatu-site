// The "Blueprint" badge -- same tile-badge treatment as HardHatMark
// (components/Header.tsx): a rounded navy tile, paper-colored flourish,
// amber tool laid diagonally across it. Here the flourish is the
// blueprint sheet itself (two ruled plan lines plus a sketched floor-plan
// corner) and the diagonal amber tool is a framing/T-square, instead of
// the site mark's shovel, so the two read as a matched pair rather than
// two unrelated icon styles.
export function BlueprintMark({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} aria-hidden="true">
      <rect x="2" y="2" width="196" height="196" rx="28" fill="#1F3F52" />
      <g transform="rotate(-6 100 100)">
        <rect x="52" y="42" width="96" height="116" rx="6" fill="#EFEDE6" />
        <line x1="68" y1="64" x2="118" y2="64" stroke="#1F3F52" strokeWidth={5} strokeLinecap="round" />
        <line x1="68" y1="78" x2="104" y2="78" stroke="#1F3F52" strokeWidth={5} strokeLinecap="round" />
        <path d="M68,120 L68,142 L116,142" fill="none" stroke="#1F3F52" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        <line x1="92" y1="120" x2="92" y2="142" stroke="#1F3F52" strokeWidth={5} strokeLinecap="round" />
      </g>
      <g transform="rotate(32 100 100)">
        <rect x="30" y="94" width="140" height="12" rx="6" fill="#B67F1E" />
        <rect x="30" y="94" width="12" height="46" rx="6" fill="#B67F1E" />
      </g>
    </svg>
  );
}
