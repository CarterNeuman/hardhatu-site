"use client";

import { useState } from "react";
import Link from "next/link";
import type { StateTrade, TrainingOption } from "@/lib/state-guides";

// The interactive heart of a state guide: eight "exit sign" buttons pick a
// trade, and the panel below shows that trade's local pay ladder, license
// route and ways in. On paper (print), every panel prints in order so a
// counselor gets the whole guide, not just the trade that was on screen.

export type TradeView = StateTrade & {
  pay: { start: number; five: number; ten: number; twenty: number; top: number };
  nationalMedian: number;
  employment: number;
  usesNational: boolean;
};

const KIND_LABEL: Record<TrainingOption["kind"], string> = {
  union: "Union apprenticeship",
  "open-shop": "Non-union apprenticeship",
  college: "Technical college",
  "free-training": "Free training",
  "high-school": "High school",
};

const KIND_STYLE: Record<TrainingOption["kind"], string> = {
  union: "bg-[#1B5E3B] text-white",
  "open-shop": "bg-navy text-paper",
  college: "bg-amber-soft text-ink",
  "free-training": "bg-[#F2C200] text-ink",
  "high-school": "bg-hairline text-ink",
};

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const k = (n: number) => `$${(n / 1000).toFixed(n >= 100000 ? 0 : 1)}k`;

export function TradeExplorer({ trades, stateName }: { trades: TradeView[]; stateName: string }) {
  const [active, setActive] = useState(trades[0].slug);

  return (
    <div>
      {/* Exit signs: the trade picker */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 print:hidden" role="tablist" aria-label="Choose a trade">
        {trades.map((t, i) => {
          const on = t.slug === active;
          return (
            <button
              key={t.slug}
              type="button"
              role="tab"
              id={`tab-${t.slug}`}
              aria-selected={on}
              aria-controls={`panel-${t.slug}`}
              onClick={() => setActive(t.slug)}
              className={`group relative rounded-md bg-[#1B5E3B] px-3 pb-3 pt-6 text-left text-white shadow-sm outline-none transition-transform focus-visible:ring-4 focus-visible:ring-[#F2C200] ${
                on ? "-translate-y-1 ring-4 ring-[#F2C200]" : "hover:-translate-y-0.5"
              }`}
            >
              <span className="absolute left-3 top-0 -translate-y-1/2 rounded-sm bg-[#F2C200] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink">
                Exit {i + 1}
              </span>
              <span className="pointer-events-none absolute inset-1 rounded border border-white/70" aria-hidden="true" />
              <span className="relative block font-display text-[15px] font-bold leading-tight sm:text-base">{t.name}</span>
              <span className="relative mt-1.5 block text-xs text-white/85">
                {k(t.pay.five)} typical · {t.outlook.openingsPerYear.toLocaleString("en-US")} openings/yr
              </span>
            </button>
          );
        })}
      </div>

      {trades.map((t) => (
        <section
          key={t.slug}
          id={`panel-${t.slug}`}
          role="tabpanel"
          aria-labelledby={`tab-${t.slug}`}
          className={`${t.slug === active ? "block" : "hidden"} mt-6 border border-hairline bg-white print:mt-8 print:block print:break-inside-avoid-page`}
        >
          <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-hairline px-5 py-4 sm:px-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-ink">{t.name}</h3>
              <p className="mt-1 max-w-2xl text-[15px] text-steel">{t.oneLine}</p>
            </div>
            <Link href={`/careers/${t.slug}`} className="text-sm font-semibold text-navy hover:underline print:hidden">
              Full career profile →
            </Link>
          </header>

          <div className="grid gap-8 px-5 py-6 sm:px-6 lg:grid-cols-2">
            {/* Pay ladder */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-steel">Pay in {stateName}</h4>
              <PayLadder pay={t.pay} />
              <p className="mt-3 text-sm text-steel">
                Typical (median) pay is {usd(t.pay.five)} in {stateName}, compared with {usd(t.nationalMedian)} nationally.
                {t.usesNational ? " BLS doesn't publish this job for the state, so national figures are shown." : ""}
              </p>
              {t.payNote && <p className="mt-2 text-xs text-steel">{t.payNote}</p>}
              <p className="mt-3 border-l-4 border-[#F2C200] bg-[#F2C200]/10 px-3 py-2 text-sm leading-snug text-ink">
                <span className="font-semibold">Overtime: </span>
                {t.overtime}
              </p>

              <h4 className="mt-6 text-xs font-semibold uppercase tracking-wide text-steel">Jobs outlook</h4>
              <dl className="mt-2 grid grid-cols-3 gap-3 text-center">
                <Stat label="Jobs in 2024" value={t.outlook.base.toLocaleString("en-US")} />
                <Stat label="Growth by 2034" value={`+${t.outlook.growthPct}%`} />
                <Stat label="Openings a year" value={t.outlook.openingsPerYear.toLocaleString("en-US")} />
              </dl>
            </div>

            {/* License route */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-steel">The route to a license</h4>
              <p className="mt-2 text-[15px] leading-relaxed text-ink">{t.licenseSummary}</p>
              <ol className="relative mt-4 space-y-4 pl-10">
                <span aria-hidden="true" className="absolute bottom-2 left-[15px] top-2 w-1 rounded bg-ink/80" />
                <span
                  aria-hidden="true"
                  className="absolute bottom-2 left-[16.5px] top-2 w-px border-l border-dashed border-[#F2C200]"
                />
                {t.licenseSteps.map((step, i) => (
                  <li key={step.title} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-10 top-0 flex h-8 w-8 items-center justify-center rounded-sm border-2 border-white bg-[#1B5E3B] text-xs font-bold text-white shadow"
                    >
                      {i + 1}
                    </span>
                    <p className="font-semibold text-ink">{step.title}</p>
                    <p className="text-sm leading-snug text-steel">{step.detail}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-5 border border-dashed border-[#1B5E3B]/50 bg-[#1B5E3B]/5 px-4 py-3">
                <p className="text-sm font-semibold text-ink">Your own business someday</p>
                <p className="mt-1 text-sm leading-snug text-ink">{t.ownBusiness}</p>
                <a href="#own-business" className="mt-1 inline-block text-xs font-semibold text-[#1B5E3B] hover:underline print:hidden">
                  The upside and the risk ↓
                </a>
              </div>
              {t.licenseAgency && (
                <p className="mt-4 text-xs text-steel">
                  Licensing agency:{" "}
                  <a href={t.licenseAgency.url} className="text-navy hover:underline" target="_blank" rel="noopener noreferrer">
                    {t.licenseAgency.label}
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* Ways in */}
          <div className="border-t border-hairline px-5 py-6 sm:px-6">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-steel">Ways in, in {stateName}</h4>
            <ul className="mt-3 grid gap-3 md:grid-cols-2">
              {t.training.map((o) => (
                <li key={o.name} className="border border-hairline bg-paper/60 p-4">
                  <span className={`inline-block rounded-sm px-2 py-0.5 text-[11px] font-semibold ${KIND_STYLE[o.kind]}`}>
                    {KIND_LABEL[o.kind]}
                  </span>
                  <p className="mt-2 font-semibold text-ink">
                    {o.url ? (
                      <a href={o.url} className="text-navy hover:underline" target="_blank" rel="noopener noreferrer">
                        {o.name}
                      </a>
                    ) : (
                      o.name
                    )}
                  </p>
                  <p className="text-xs text-steel">{o.where}</p>
                  <p className="mt-1.5 text-sm leading-snug text-ink">{o.detail}</p>
                  {o.programSlug && (
                    <Link href={`/programs/${o.programSlug}`} className="mt-2 inline-block text-xs font-semibold text-navy hover:underline print:hidden">
                      How this kind of program works →
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            {t.credentials.length > 0 && (
              <p className="mt-4 text-sm text-steel">
                <span className="font-semibold text-ink">Credentials worth knowing: </span>
                {t.credentials.join(" · ")}
              </p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col-reverse border border-hairline bg-paper/60 px-2 py-3">
      <dt className="mt-0.5 text-[11px] uppercase tracking-wide text-steel">{label}</dt>
      <dd className="font-display text-xl font-bold text-ink">{value}</dd>
    </div>
  );
}

// Four horizontal bars on one shared scale (0 to the top-10% figure), so the
// climb from starting pay to 20 years in is visible at a glance. Values are
// always written next to the bars; the bars never carry meaning alone.
function PayLadder({ pay }: { pay: TradeView["pay"] }) {
  const rows = [
    { label: "Starting out", v: pay.start },
    { label: "5 years in", v: pay.five },
    { label: "10 years in", v: pay.ten },
    { label: "20 years in", v: pay.twenty },
  ];
  const max = pay.top;
  return (
    <div className="mt-3 space-y-2">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[6.5rem_1fr_4.5rem] items-center gap-2 text-sm">
          <span className="text-steel">{r.label}</span>
          <span className="h-3 rounded-r-sm bg-hairline/50">
            <span className="block h-3 rounded-r-sm bg-[#1B5E3B]" style={{ width: `${(r.v / max) * 100}%` }} />
          </span>
          <span className="text-right font-semibold tabular-nums text-ink">{k(r.v)}</span>
        </div>
      ))}
      <p className="pt-1 text-xs text-steel">Top 10% earn more than {usd(pay.top)}.</p>
    </div>
  );
}
