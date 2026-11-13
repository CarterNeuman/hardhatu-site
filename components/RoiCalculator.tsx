"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  COLLEGE_COSTS,
  DEFAULT_LOAN_RATE,
  START_AGE,
  breakEvenAge,
  catchUpAge,
  runPath,
  type CollegeType,
  type Inputs,
  type PathId,
  type PathResult,
  type TradePay,
} from "@/lib/roi-model";

// The interactive half of /student-loan-roi: controls, the net-position line
// chart, auto-written takeaways, and the table view of the same numbers.
//
// Chart rules followed (dataviz house rules): one y-axis, one line per path,
// colors fixed to the PATH (never to rank, so hiding a path never repaints
// the others), 2px lines, >=8px hover markers with a surface ring, a
// recessive grid, a crosshair + tooltip on hover/focus, and a legend plus a
// full table view so identity never rides on color alone. The five hues are
// categorical slots 1-5 of the validated reference palette, checked against
// the white chart surface (adjacent CVD dE >= 9.1, normal-vision >= 19.6).
// Three of them sit under 3:1 contrast on white, which is why the legend,
// tooltip and table always carry the path name next to the swatch.

type PathMeta = { id: PathId; name: string; short: string; phrase: string; color: string };

const PATHS: PathMeta[] = [
  { id: "apprentice", name: "Apprenticeship", short: "Apprenticeship", phrase: "the apprenticeship", color: "#2a78d6" },
  { id: "college", name: "4-year college (any major)", short: "4-year college", phrase: "a 4-year degree (any major)", color: "#eb6834" },
  { id: "cm", name: "Construction management degree", short: "Construction mgmt degree", phrase: "a construction management degree", color: "#1baf7a" },
  { id: "tradeschool", name: "Trade school, then work", short: "Trade school", phrase: "trade school", color: "#eda100" },
  { id: "work", name: "Straight to work (no training)", short: "Straight to work", phrase: "going straight to work", color: "#e87ba4" },
];

const COLLEGE_LABELS: Record<CollegeType, string> = {
  "public-in": "Public, in-state",
  "public-out": "Public, out-of-state",
  private: "Private",
};

const HORIZONS = [10, 20, 30] as const;

function defaults(trade: TradePay): Inputs {
  return {
    trade,
    collegeType: "public-in",
    useNetPrice: false,
    includeRoomBoard: false,
    shareBorrowed: 1,
    loanRate: DEFAULT_LOAN_RATE,
    repayYears: 10,
    schoolJobPay: 0,
    apprenticeYears: 4,
    apprenticeCostPerYear: 1000,
    tradeSchoolCost: 15000,
    moveUpToSupervisor: false,
    years: 30,
  };
}

const usd = (n: number) => `${n < 0 ? "−" : ""}$${Math.round(Math.abs(n)).toLocaleString("en-US")}`;
function short(n: number) {
  const a = Math.abs(n);
  const sign = n < 0 ? "−" : "";
  if (a >= 1_000_000) return `${sign}$${(a / 1_000_000).toFixed(a >= 10_000_000 ? 0 : 2).replace(/\.?0+$/, "")}M`;
  if (a >= 1000) return `${sign}$${Math.round(a / 1000)}k`;
  return `${sign}$${Math.round(a)}`;
}

export function RoiCalculator({ trades, defaultSlug }: { trades: TradePay[]; defaultSlug: string }) {
  const initialTrade = trades.find((t) => t.slug === defaultSlug) ?? trades[0];
  const [inp, setInp] = useState<Inputs>(() => defaults(initialTrade));
  const [visible, setVisible] = useState<Record<PathId, boolean>>({
    apprentice: true,
    college: true,
    cm: true,
    tradeschool: true,
    work: true,
  });
  const set = <K extends keyof Inputs>(key: K, value: Inputs[K]) => setInp((prev) => ({ ...prev, [key]: value }));

  const results = useMemo(() => {
    const out = {} as Record<PathId, PathResult>;
    for (const p of PATHS) out[p.id] = runPath(p.id, inp);
    return out;
  }, [inp]);

  const shown = PATHS.filter((p) => visible[p.id]);
  const endAge = START_AGE + inp.years;
  const netAt = (id: PathId, age: number) => results[id].points.find((pt) => pt.age === age)?.net ?? 0;
  const netAvailable = COLLEGE_COSTS.netTuition[inp.collegeType] != null;

  return (
    <div className="mt-8 border border-hairline bg-white">
      {/* --- Main controls: the three choices most people will touch --- */}
      <div className="grid gap-5 border-b border-hairline p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-8">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-steel">Trade</span>
          <select
            value={inp.trade.slug}
            onChange={(e) => set("trade", trades.find((t) => t.slug === e.target.value) ?? inp.trade)}
            className="mt-1.5 block w-full border border-hairline bg-paper px-3 py-2 text-sm font-semibold text-ink focus:border-navy focus:outline-none"
          >
            {trades.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.title}
              </option>
            ))}
          </select>
          <span className="mt-1 block text-xs text-steel">Used for the apprenticeship and trade school paths.</span>
        </label>

        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wide text-steel">College</legend>
          <Segmented
            options={(Object.keys(COLLEGE_LABELS) as CollegeType[]).map((k) => ({ value: k, label: COLLEGE_LABELS[k] }))}
            value={inp.collegeType}
            onChange={(v) => set("collegeType", v)}
          />
        </fieldset>

        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wide text-steel">Show me until age</legend>
          <Segmented
            options={HORIZONS.map((h) => ({ value: h, label: String(START_AGE + h) }))}
            value={inp.years}
            onChange={(v) => set("years", v)}
          />
        </fieldset>
      </div>

      {/* --- Legend doubles as the show/hide control --- */}
      <div className="flex flex-wrap gap-2 px-5 pt-5 sm:px-6" role="group" aria-label="Paths to compare">
        {PATHS.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-pressed={visible[p.id]}
            onClick={() => setVisible((v) => ({ ...v, [p.id]: !v[p.id] }))}
            className={`inline-flex items-center gap-2 border px-3 py-1.5 text-sm transition-colors ${
              visible[p.id] ? "border-ink/30 text-ink" : "border-hairline text-steel line-through decoration-steel/60"
            }`}
          >
            <span
              aria-hidden="true"
              className="inline-block h-[3px] w-5"
              style={{ backgroundColor: visible[p.id] ? p.color : "#C8C3B6" }}
            />
            {p.name}
          </button>
        ))}
      </div>

      <div className="px-2 pb-2 pt-4 sm:px-4">
        <NetChart results={results} paths={shown} endAge={endAge} />
      </div>

      <Takeaways results={results} visible={visible} endAge={endAge} inp={inp} netAt={netAt} />

      {/* --- Assumptions panel: every lever the model has --- */}
      <details className="group border-t border-hairline">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-semibold text-navy hover:underline sm:px-6">
          Adjust the assumptions
          <span aria-hidden="true" className="text-steel transition-transform group-open:rotate-180">
            ▾
          </span>
        </summary>
        <div className="grid gap-x-8 gap-y-6 px-5 pb-6 sm:grid-cols-2 sm:px-6">
          <Group title="Paying for college">
            <Toggle
              label="Use the typical price after grants"
              hint={
                netAvailable
                  ? `Average after grants: ${usd(COLLEGE_COSTS.netTuition[inp.collegeType] as number)} a year instead of the ${usd(COLLEGE_COSTS.tuition[inp.collegeType])} sticker price.`
                  : "No national after-grant figure exists for out-of-state students, so the sticker price is used."
              }
              checked={inp.useNetPrice && netAvailable}
              disabled={!netAvailable}
              onChange={(v) => set("useNetPrice", v)}
            />
            <Toggle
              label="Count dorm and meal plan costs"
              hint={`Adds ${usd(COLLEGE_COSTS.roomBoard[inp.collegeType])} a year. Off by default, because everyone pays rent somewhere. Turn it on if you'd live at home otherwise.`}
              checked={inp.includeRoomBoard}
              onChange={(v) => set("includeRoomBoard", v)}
            />
            <Slider
              label="Share of school costs paid with loans"
              value={Math.round(inp.shareBorrowed * 100)}
              min={0}
              max={100}
              step={10}
              format={(v) => `${v}%`}
              onChange={(v) => set("shareBorrowed", v / 100)}
            />
            <Slider
              label="Loan interest rate"
              value={inp.loanRate}
              min={3}
              max={12}
              step={0.25}
              format={(v) => `${v.toFixed(2)}%`}
              hint="Federal undergraduate rate for 2026-27 is 6.52%. Parent PLUS loans are 9.07%."
              onChange={(v) => set("loanRate", v)}
            />
            <Slider
              label="Years to pay it back"
              value={inp.repayYears}
              min={5}
              max={25}
              step={5}
              format={(v) => `${v} years`}
              onChange={(v) => set("repayYears", v)}
            />
            <Slider
              label="Pay from a part-time job while in school"
              value={inp.schoolJobPay}
              min={0}
              max={20000}
              step={1000}
              format={(v) => `${usd(v)} a year`}
              onChange={(v) => set("schoolJobPay", v)}
            />
          </Group>
          <Group title="The trades">
            <Slider
              label="Apprenticeship length"
              value={inp.apprenticeYears}
              min={3}
              max={5}
              step={1}
              format={(v) => `${v} years`}
              hint="Construction apprenticeships average a little over 4 years."
              onChange={(v) => set("apprenticeYears", v)}
            />
            <Slider
              label="Apprenticeship out-of-pocket costs"
              value={inp.apprenticeCostPerYear}
              min={0}
              max={3000}
              step={250}
              format={(v) => `${usd(v)} a year`}
              hint="Books, tools and fees. Many programs charge little or nothing for classes."
              onChange={(v) => set("apprenticeCostPerYear", v)}
            />
            <Slider
              label="Trade school cost (1-year program)"
              value={inp.tradeSchoolCost}
              min={3000}
              max={35000}
              step={1000}
              format={(v) => usd(v)}
              onChange={(v) => set("tradeSchoolCost", v)}
            />
            <Toggle
              label="Move up to foreman or supervisor by 35"
              hint="Off by default: trade pay stays at the national median for life. On: it climbs to the $80,000 median for construction supervisors by age 35."
              checked={inp.moveUpToSupervisor}
              onChange={(v) => set("moveUpToSupervisor", v)}
            />
          </Group>
          <div className="sm:col-span-2">
            <button
              type="button"
              onClick={() => setInp(defaults(inp.trade))}
              className="text-sm font-semibold text-navy hover:underline"
            >
              Reset to the defaults
            </button>
          </div>
        </div>
      </details>

      <DataTable results={results} paths={shown} endAge={endAge} netAt={netAt} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Chart

const M = { top: 16, right: 16, bottom: 40, left: 60 };

function niceStep(range: number, target = 6) {
  const raw = range / target;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = norm >= 5 ? 10 : norm >= 2 ? 5 : norm >= 1 ? 2 : 1;
  return step * mag;
}

function NetChart({ results, paths, endAge }: { results: Record<PathId, PathResult>; paths: PathMeta[]; endAge: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  // The viewBox matches the real rendered width, so axis text stays at
  // its true size on a phone instead of being scaled down with the SVG.
  const [W, setW] = useState(760);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setW(Math.max(300, Math.round(entry.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const H = W < 520 ? 300 : 360;
  const narrow = W < 520;
  const ages = Array.from({ length: endAge - START_AGE + 1 }, (_, i) => START_AGE + i);

  const series = paths.map((p) => ({ meta: p, pts: results[p.id].points }));
  const allNet = series.flatMap((s) => s.pts.map((pt) => pt.net));
  const rawMin = Math.min(0, ...allNet);
  const rawMax = Math.max(1, ...allNet);
  const step = niceStep(rawMax - rawMin, narrow ? 4 : 6);
  // Pad below zero just enough for the dip (school debt) rather than a
  // whole empty tick band; gridlines sit on round multiples of the step.
  const yMin = rawMin < 0 ? rawMin * 1.25 : 0;
  const yMax = Math.ceil(rawMax / step) * step;
  const ticks: number[] = [];
  for (let v = Math.ceil(yMin / step) * step; v <= yMax + step / 2; v += step) ticks.push(v);

  const innerW = W - M.left - M.right;
  const innerH = H - M.top - M.bottom;
  const x = (age: number) => M.left + ((age - START_AGE) / (endAge - START_AGE)) * innerW;
  const y = (v: number) => M.top + (1 - (v - yMin) / (yMax - yMin)) * innerH;
  const every = narrow && endAge - START_AGE > 10 ? 10 : 5;
  const xTicks = ages.filter((a) => a === START_AGE || (a % every === 0 && endAge - a >= 3 && a - START_AGE >= 3) || a === endAge);

  function onPointer(e: React.PointerEvent<SVGRectElement>) {
    const svg = e.currentTarget.ownerSVGElement;
    if (!svg) return;
    const box = svg.getBoundingClientRect();
    const px = ((e.clientX - box.left) / box.width) * W;
    const age = Math.round(START_AGE + ((px - M.left) / innerW) * (endAge - START_AGE));
    setHover(Math.min(endAge, Math.max(START_AGE, age)));
  }

  function onKey(e: React.KeyboardEvent<SVGSVGElement>) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const cur = hover ?? START_AGE;
      setHover(Math.min(endAge, Math.max(START_AGE, cur + (e.key === "ArrowRight" ? 1 : -1))));
    } else if (e.key === "Escape") setHover(null);
  }

  const hoverRows =
    hover == null
      ? []
      : series
          .map((s) => ({ meta: s.meta, net: s.pts.find((pt) => pt.age === hover)?.net ?? 0 }))
          .sort((a, b) => b.net - a.net);
  const tipLeftPct = hover == null ? 0 : (x(hover) / W) * 100;

  return (
    <div ref={wrapRef} className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full touch-pan-y select-none outline-none focus-visible:ring-2 focus-visible:ring-navy"
        role="img"
        aria-label="Line chart of net financial position by age for each selected path. Use the left and right arrow keys to step through ages; the table below lists the same numbers."
        tabIndex={0}
        onKeyDown={onKey}
        onBlur={() => setHover(null)}
      >
        {/* grid + y labels */}
        {ticks.map((v) => (
          <g key={v}>
            <line x1={M.left} x2={W - M.right} y1={y(v)} y2={y(v)} stroke={v === 0 ? "#1C2B33" : "#E6E1D6"} strokeWidth={v === 0 ? 1.25 : 1} />
            <text x={M.left - 10} y={y(v) + 4} textAnchor="end" fontSize="12" fill="#656C71">
              {short(v)}
            </text>
          </g>
        ))}
        {/* x labels */}
        {xTicks.map((a) => (
          <text key={a} x={x(a)} y={H - M.bottom + 20} textAnchor="middle" fontSize="12" fill="#656C71">
            {a}
          </text>
        ))}
        <text x={M.left + innerW / 2} y={H - 4} textAnchor="middle" fontSize="12" fill="#656C71">
          Age
        </text>

        {/* lines */}
        {series.map((s) => (
          <path
            key={s.meta.id}
            d={s.pts.map((pt, i) => `${i ? "L" : "M"}${x(pt.age).toFixed(1)} ${y(pt.net).toFixed(1)}`).join(" ")}
            fill="none"
            stroke={s.meta.color}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}

        {/* crosshair + markers */}
        {hover != null && (
          <g pointerEvents="none">
            <line x1={x(hover)} x2={x(hover)} y1={M.top} y2={H - M.bottom} stroke="#1C2B33" strokeOpacity={0.35} strokeDasharray="3 3" />
            {series.map((s) => {
              const pt = s.pts.find((p) => p.age === hover);
              if (!pt) return null;
              return <circle key={s.meta.id} cx={x(hover)} cy={y(pt.net)} r={5} fill={s.meta.color} stroke="#FFFFFF" strokeWidth={2} />;
            })}
          </g>
        )}

        {/* hit area, bigger than the marks */}
        <rect
          x={M.left}
          y={M.top}
          width={innerW}
          height={innerH}
          fill="transparent"
          onPointerMove={onPointer}
          onPointerDown={onPointer}
          onPointerLeave={() => setHover(null)}
        />
      </svg>

      {hover != null && hoverRows.length > 0 && (
        <div
          className="pointer-events-none absolute top-2 z-10 w-64 max-w-[85%] border border-hairline bg-white p-3 text-sm shadow-[0_8px_20px_rgba(28,43,51,0.16)]"
          style={tipLeftPct > 55 ? { right: `${100 - tipLeftPct + 2}%` } : { left: `${tipLeftPct + 2}%` }}
          role="status"
        >
          <p className="mb-1.5 font-semibold text-ink">At age {hover}</p>
          <ul className="space-y-1">
            {hoverRows.map((r) => (
              <li key={r.meta.id} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-steel">
                  <span aria-hidden="true" className="inline-block h-[3px] w-4" style={{ backgroundColor: r.meta.color }} />
                  {r.meta.short}
                </span>
                <span className="font-semibold tabular-nums text-ink">{usd(r.net)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="px-2 pb-1 text-xs text-steel">
        Net position = everything earned, minus school costs, minus loan payments, minus what&rsquo;s still owed. Pre-tax, in
        today&rsquo;s dollars. Hover or tap the chart to compare ages.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Auto-written takeaways: the chart's point in words, recomputed live.

function Takeaways({
  results,
  visible,
  endAge,
  inp,
  netAt,
}: {
  results: Record<PathId, PathResult>;
  visible: Record<PathId, boolean>;
  endAge: number;
  inp: Inputs;
  netAt: (id: PathId, age: number) => number;
}) {
  const shown = PATHS.filter((p) => visible[p.id]);
  if (shown.length === 0) {
    return <p className="px-5 py-5 text-sm text-steel sm:px-6">Pick at least one path above to see the comparison.</p>;
  }
  const ranked = [...shown].sort((a, b) => netAt(b.id, endAge) - netAt(a.id, endAge));
  const lines: string[] = [];
  const [first, second] = ranked;
  const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
  lines.push(
    second
      ? `By age ${endAge}, ${first.phrase} comes out furthest ahead at about ${short(netAt(first.id, endAge))}, followed by ${second.phrase} at about ${short(netAt(second.id, endAge))}.`
      : `By age ${endAge}, ${first.phrase} adds up to about ${short(netAt(first.id, endAge))}.`
  );
  if (visible.apprentice) {
    for (const id of ["college", "cm"] as const) {
      if (!visible[id]) continue;
      const meta = PATHS.find((p) => p.id === id)!;
      const age = catchUpAge(results[id].points, results.apprentice.points);
      const already = netAt(id, endAge) > netAt("apprentice", endAge);
      const trade = inp.trade.title.toLowerCase();
      lines.push(
        age != null
          ? `${cap(meta.phrase)} catches up with the ${trade} apprenticeship at about age ${age}.`
          : already
            ? `${cap(meta.phrase)} stays ahead of the ${trade} apprenticeship the whole way.`
            : `${cap(meta.phrase)} hasn't caught up with the ${trade} apprenticeship by age ${endAge}.`
      );
    }
  }
  const degree = visible.college ? results.college : visible.cm ? results.cm : null;
  if (degree && degree.debtAtFinish > 0) {
    lines.push(
      `The 4-year degree leaves about ${usd(degree.debtAtFinish)} owed when payments start: ${usd(degree.monthlyPayment)} a month for ${inp.repayYears} years, ${usd(degree.totalInterest)} of it interest.`
    );
  }
  return (
    <div className="border-t border-hairline bg-amber-soft/30 px-5 py-4 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber">What the chart says</p>
      <ul className="mt-2 space-y-1.5 text-[15px] leading-relaxed text-ink">
        {lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Table view: the same numbers, readable without the chart.

function DataTable({
  results,
  paths,
  endAge,
  netAt,
}: {
  results: Record<PathId, PathResult>;
  paths: PathMeta[];
  endAge: number;
  netAt: (id: PathId, age: number) => number;
}) {
  if (paths.length === 0) return null;
  const outOfRed = (r: PathResult) => {
    const v = breakEvenAge(r.points);
    if (v === "never-below") return "Never in the red";
    return v == null ? `Not by ${endAge}` : `Age ${v}`;
  };
  const rows: { label: string; cell: (r: PathResult) => string }[] = [
    { label: "Years in training", cell: (r) => (r.trainingYears === 0 ? "None" : `${r.trainingYears} (${r.id === "apprentice" ? "paid" : "unpaid"})`) },
    { label: "School costs", cell: (r) => (r.schoolCost === 0 ? "$0" : usd(r.schoolCost)) },
    { label: "Owed when payments start", cell: (r) => (r.debtAtFinish > 0 ? usd(r.debtAtFinish) : "$0") },
    { label: "Monthly loan payment", cell: (r) => (r.monthlyPayment > 0 ? usd(r.monthlyPayment) : "None") },
    { label: "Pay in first year after training", cell: (r) => usd(r.payOnceTrained) },
    { label: `Net position at ${endAge}`, cell: (r) => usd(netAt(r.id, endAge)) },
    { label: "Out of the red", cell: outOfRed },
  ];
  return (
    <div className="border-t border-hairline px-5 py-5 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-steel">The numbers behind the chart</p>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr>
              <th scope="col" className="py-2 pr-4 text-left font-semibold text-steel" />
              {paths.map((p) => (
                <th key={p.id} scope="col" className="px-3 py-2 text-left align-bottom font-semibold text-ink">
                  <span aria-hidden="true" className="mb-1 block h-[3px] w-5" style={{ backgroundColor: p.color }} />
                  {p.short}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-hairline">
                <th scope="row" className="py-2 pr-4 text-left font-normal text-steel">
                  {row.label}
                </th>
                {paths.map((p) => (
                  <td key={p.id} className="px-3 py-2 tabular-nums text-ink">
                    {row.cell(results[p.id])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Small controls

function Segmented<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="mt-1.5 flex flex-wrap">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={String(o.value)}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={`-ml-px border px-3 py-2 text-sm first:ml-0 ${
              active ? "relative z-10 border-navy bg-navy font-semibold text-paper" : "border-hairline bg-paper text-ink hover:border-navy"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-5">
      <legend className="mb-3 font-display text-lg font-bold text-ink">{title}</legend>
      {children}
    </fieldset>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  format,
  hint,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  hint?: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3 text-sm">
        <span className="font-semibold text-ink">{label}</span>
        <span className="tabular-nums text-ink">{format(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[#1F3F52]"
      />
      {hint && <span className="mt-1 block text-xs leading-snug text-steel">{hint}</span>}
    </label>
  );
}

function Toggle({
  label,
  hint,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className={`flex gap-3 ${disabled ? "opacity-60" : "cursor-pointer"}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-[#1F3F52]"
      />
      <span>
        <span className="block text-sm font-semibold text-ink">{label}</span>
        {hint && <span className="mt-0.5 block text-xs leading-snug text-steel">{hint}</span>}
      </span>
    </label>
  );
}
