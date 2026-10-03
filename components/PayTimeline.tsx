import type { Career } from "@/lib/types";

// Renders a career's payTimeline (see CareerSchema in lib/types.ts) as three
// horizontal range bars — entry level, 5 years in, 20 years in — on a
// shared, zero-based dollar axis so bar length is always honest, not just
// the visible window. One series (pay), so color alone (navy) carries
// identity and no legend is needed; the three bands are the whole chart,
// so all three get direct value labels rather than relying on axis ticks.
// Always paired with <Disclaimer> on the career page — this component only
// draws the numbers, it doesn't explain where they come from.
const MONO = { fontFamily: "'IBM Plex Mono', monospace" };

const MILESTONES: {
  key: "entry" | "fiveYear" | "twentyYear";
  label: string;
}[] = [
  { key: "entry", label: "Entry level" },
  { key: "fiveYear", label: "5 years in" },
  { key: "twentyYear", label: "20 years in" },
];

function formatValue(n: number, unit: "annual" | "hourly") {
  if (unit === "hourly") return `$${n.toFixed(2)}/hr`;
  return `$${Math.round(n / 1000)}k`;
}

export function PayTimeline({
  payTimeline,
}: {
  payTimeline: NonNullable<Career["payTimeline"]>;
}) {
  const { unit, source, asOf } = payTimeline;
  const bands = MILESTONES.map(({ key, label }) => ({
    label,
    ...payTimeline[key],
  }));
  const max = Math.max(...bands.map((b) => b.high));

  return (
    <div className="mt-5 border border-hairline bg-white/40 px-4 py-4">
      <div className="flex items-baseline justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-steel">
          Pay by experience, nationally
        </p>
        {asOf && <p className="text-[10px] text-steel">as of {asOf}</p>}
      </div>

      <div className="mt-4 space-y-4">
        {bands.map((band) => {
          const lowPct = (band.low / max) * 100;
          const highPct = (band.high / max) * 100;
          return (
            <div key={band.label}>
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-ink">{band.label}</span>
                <span className="text-sm tabular-nums text-ink" style={MONO}>
                  {formatValue(band.low, unit)}&ndash;{formatValue(band.high, unit)}
                </span>
              </div>
              <div className="relative mt-1.5 h-2 w-full bg-hairline/40">
                <div
                  className="absolute inset-y-0 bg-navy/25"
                  style={{ left: `${lowPct}%`, width: `${Math.max(highPct - lowPct, 0.5)}%` }}
                />
                <div className="absolute inset-y-0 w-[2px] bg-navy" style={{ left: `${lowPct}%` }} />
                <div className="absolute inset-y-0 w-[2px] bg-navy" style={{ left: `${highPct}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex justify-between border-t border-hairline pt-1.5 text-[10px] text-steel">
        <span>$0</span>
        <span className="tabular-nums" style={MONO}>{formatValue(max, unit)}</span>
      </div>

      {source && <p className="mt-3 text-[10px] text-steel">Source: {source}</p>}
    </div>
  );
}
