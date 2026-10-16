import type { Career } from "@/lib/types";

// Renders a career's payTimeline (see CareerSchema in lib/types.ts) as a
// range-area trend chart: a navy wash between the "low" and "high" lines
// as pay climbs across entry level, 5 years in, and 10 years in, with
// every milestone's low/high directly labeled (one series — pay — so
// color alone carries identity and no legend/axis-ticks are needed, per
// the dataviz house rules: trend-over-time -> line/area, ~10% opacity
// wash for the fill, 2px lines, >=8px dot markers with a surface ring,
// and direct end-labels instead of a y-axis once every value already has
// one). Always paired with <Disclaimer> on the career page — this
// component only draws the numbers, it doesn't explain where they come
// from.
// The top milestone is "10 years in" (field key `tenYear`), not "20" --
// renamed from the original `twentyYear` because BLS doesn't track pay by
// tenure at all (the band was always an estimate off the wage
// *distribution*, mapped to the 75th-90th percentile), and most trades'
// apprenticeship-to-journeyman pipelines put top-of-scale pay well before
// year 20. See the longer note in lib/types.ts.
//
// Labels come in two sets, picked by the career's own `isEntryRole` (see
// CareerSchema in lib/types.ts). For an entry-accessible career the
// payTimeline.entry band really is day-one pay, so "Entry level" is
// accurate. For a career that's normally reached through promotion (a
// Senior Estimator, say), that same band is the lower end of what people
// in that role earn -- not pay for someone brand new to the field -- so
// the milestone labels switch to a plain low/typical/top-of-scale framing
// instead of implying a 0-year starting point that doesn't exist for that
// role. Same three field keys either way -- only the label text changes.
const ENTRY_LABELS: Record<"entry" | "fiveYear" | "tenYear", string> = {
  entry: "Entry level",
  fiveYear: "5 years in",
  tenYear: "10 years in",
};
const PROMOTION_LABELS: Record<"entry" | "fiveYear" | "tenYear", string> = {
  entry: "Lower range",
  fiveYear: "Typical",
  tenYear: "Top of scale",
};
const MILESTONE_KEYS: ("entry" | "fiveYear" | "tenYear")[] = [
  "entry",
  "fiveYear",
  "tenYear",
];

function formatValue(n: number, unit: "annual" | "hourly") {
  if (unit === "hourly") return `$${n.toFixed(2)}/hr`;
  return `$${Math.round(n / 1000)}k`;
}

// SVG geometry, in viewBox user units. No y-axis ticks: every data point
// already carries a direct label, so a numeric axis alongside it would
// just be the same six numbers twice.
const VB_W = 560;
const VB_H = 200;
const MARGIN = { top: 34, right: 16, bottom: 34, left: 12 };
const PLOT_W = VB_W - MARGIN.left - MARGIN.right;
const PLOT_H = VB_H - MARGIN.top - MARGIN.bottom;
const PLOT_Y0 = MARGIN.top + PLOT_H; // the $0 baseline, in pixel y

const NAVY = "#1F3F52";
const HAIRLINE = "#D6D0C2";
const INK = "#1C2B33";
const STEEL = "#656C71";
const MONO = "'IBM Plex Mono', monospace";
const SANS = "'IBM Plex Sans', sans-serif";

export function PayTimeline({
  payTimeline,
  isEntryRole,
}: {
  payTimeline: NonNullable<Career["payTimeline"]>;
  isEntryRole: boolean;
}) {
  const { unit, source, asOf } = payTimeline;
  const labels = isEntryRole ? ENTRY_LABELS : PROMOTION_LABELS;
  const bands = MILESTONE_KEYS.map((key) => ({
    label: labels[key],
    ...payTimeline[key],
  }));
  const max = Math.max(...bands.map((b) => b.high));

  const scaleY = (v: number) => PLOT_Y0 - (v / max) * PLOT_H;
  const xAt = (i: number) => MARGIN.left + ((i + 0.5) / bands.length) * PLOT_W;

  const highPts = bands.map((b, i) => [xAt(i), scaleY(b.high)] as const);
  const lowPts = bands.map((b, i) => [xAt(i), scaleY(b.low)] as const);
  const areaPath =
    `M ${highPts.map(([x, y]) => `${x},${y}`).join(" L ")} ` +
    `L ${[...lowPts].reverse().map(([x, y]) => `${x},${y}`).join(" L ")} Z`;

  return (
    <div className="mt-5 border border-hairline bg-white/40 px-4 py-4">
      <div className="flex items-baseline justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-steel">
          {isEntryRole ? "Pay by experience, nationally" : "Pay for this role, nationally"}
        </p>
        {asOf && <p className="text-[10px] text-steel">as of {asOf}</p>}
      </div>

      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="mt-2 w-full"
        role="img"
        aria-label={`Pay by experience: ${bands
          .map((b) => `${b.label}, ${formatValue(b.low, unit)} to ${formatValue(b.high, unit)}`)
          .join("; ")}`}
      >
        <line
          x1={MARGIN.left}
          y1={PLOT_Y0}
          x2={VB_W - MARGIN.right}
          y2={PLOT_Y0}
          stroke={HAIRLINE}
          strokeWidth={1}
        />

        <path d={areaPath} fill={NAVY} fillOpacity={0.08} />

        <polyline
          points={lowPts.map(([x, y]) => `${x},${y}`).join(" ")}
          fill="none"
          stroke={NAVY}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points={highPts.map(([x, y]) => `${x},${y}`).join(" ")}
          fill="none"
          stroke={NAVY}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {bands.map((b, i) => {
          const x = xAt(i);
          const yHigh = scaleY(b.high);
          const yLow = scaleY(b.low);
          return (
            <g key={b.label}>
              <circle cx={x} cy={yLow} r={5} fill={NAVY} stroke="#fff" strokeWidth={2} />
              <circle cx={x} cy={yHigh} r={5} fill={NAVY} stroke="#fff" strokeWidth={2} />
              <text
                x={x}
                y={yHigh - 11}
                textAnchor="middle"
                fontSize={12}
                fontWeight={600}
                fontFamily={MONO}
                fill={INK}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {formatValue(b.high, unit)}
              </text>
              <text
                x={x}
                y={yLow + 17}
                textAnchor="middle"
                fontSize={11}
                fontFamily={MONO}
                fill={STEEL}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {formatValue(b.low, unit)}
              </text>
              <text
                x={x}
                y={VB_H - 6}
                textAnchor="middle"
                fontSize={11}
                fontFamily={SANS}
                fontWeight={500}
                fill={STEEL}
              >
                {b.label}
              </text>
            </g>
          );
        })}
      </svg>

      {source && <p className="mt-3 text-[10px] text-steel">Source: {source}</p>}
    </div>
  );
}
