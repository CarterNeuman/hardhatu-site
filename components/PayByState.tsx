"use client";

import { useState } from "react";
import Link from "next/link";
import { DEFAULT_INFLATION, payAtExperience } from "@/lib/roi-model";
import { OCCUPATIONS, STATES } from "@/lib/state-pay-data";
import { NATIONAL, lookup, occupation } from "@/lib/state-pay-lookup";
import { RoiCalculator, usd } from "@/components/RoiCalculator";

// The state-by-state half of /student-loan-roi: one settings bar (state,
// starting age, today's vs. future dollars) drives the pay table, the
// raises-vs-inflation explainer and the loan calculator below it.

const COLUMNS = [
  { years: 0, label: "Starting out", short: "Start" },
  { years: 5, label: "5 years in", short: "5 yrs" },
  { years: 10, label: "10 years in", short: "10 yrs" },
  { years: 20, label: "20 years in", short: "20 yrs" },
] as const;

// Full dollars on wider screens, "$42.6k" on phones so all four
// experience columns fit without sideways scrolling.
function Money({ n }: { n: number }) {
  return (
    <>
      <span className="sm:hidden">${(n / 1000).toFixed(n >= 100000 ? 0 : 1)}k</span>
      <span className="hidden sm:inline">{usd(n)}</span>
    </>
  );
}

const GROUPS = [
  {
    id: "trade",
    title: "The trades",
    blurb: "No college degree needed. You learn on the job, in an apprenticeship, or in a short trade school program.",
  },
  {
    id: "ladder",
    title: "Where the trades can lead",
    blurb: "Jobs people often move into after years in the field. A degree helps for some of them but isn’t always required.",
  },
  {
    id: "college",
    title: "College jobs, for comparison",
    blurb: "Common careers that need a degree, so you can see the trades side by side with them.",
  },
] as const;

const TRADES_SHOWN = 8;

const round100 = (n: number) => Math.round(n / 100) * 100;

export function PayByState() {
  const [code, setCode] = useState<string>(NATIONAL);
  const [startAge, setStartAge] = useState(18);
  const [futureDollars, setFutureDollars] = useState(false);
  const [inflation, setInflation] = useState(DEFAULT_INFLATION);
  const [adjustCol, setAdjustCol] = useState(false);
  const [allTrades, setAllTrades] = useState(false);

  const state = STATES.find((s) => s.code === code);
  const placeName = state?.name ?? "the U.S.";
  const rpp = state?.rpp ?? 100;
  const colFactor = adjustCol && state ? 100 / rpp : 1;
  const grow = (years: number) => (futureDollars ? Math.pow(1 + inflation / 100, years) : 1);
  const thisYear = 2026;

  const rows = (group: string) =>
    OCCUPATIONS.filter((o) => o.group === group)
      .map((o) => ({ occ: o, ...lookup(o, code) }))
      .sort((a, b) => b.curve.median - a.curve.median);

  const fallbacks = OCCUPATIONS.filter((o) => lookup(o, code).national);

  const elec = lookup(occupation("47-2111"), code).curve;
  const elecStart = payAtExperience(elec, 0);
  const elec20 = payAtExperience(elec, 20);
  const elec20Paper = elec20 * Math.pow(1 + inflation / 100, 20);

  return (
    <>
      {/* ---------------- Settings bar ---------------- */}
      <div className="mt-8 grid gap-5 border border-hairline bg-white p-5 sm:p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:gap-8">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-steel">Your state</span>
          <select
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-1.5 block w-full border border-hairline bg-paper px-3 py-2 text-sm font-semibold text-ink focus:border-navy focus:outline-none"
          >
            <option value={NATIONAL}>United States (national)</option>
            {STATES.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="flex items-baseline justify-between text-xs font-semibold uppercase tracking-wide text-steel">
            Age you&rsquo;d start
            <span className="text-sm normal-case tracking-normal text-ink tabular-nums">{startAge}</span>
          </span>
          <input
            type="range"
            min={16}
            max={50}
            step={1}
            value={startAge}
            onChange={(e) => setStartAge(Number(e.target.value))}
            className="mt-3 w-full accent-[#1F3F52]"
            aria-valuetext={`${startAge} years old`}
          />
          <span className="mt-1 block text-xs text-steel">Changing careers at 30 or 40? Slide it.</span>
        </label>

        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wide text-steel">Show money in</legend>
          <div className="mt-1.5 flex">
            {[
              { v: false, label: "Today’s dollars" },
              { v: true, label: "Future dollars" },
            ].map((o) => (
              <button
                key={String(o.v)}
                type="button"
                aria-pressed={futureDollars === o.v}
                onClick={() => setFutureDollars(o.v)}
                className={`-ml-px border px-3 py-2 text-sm first:ml-0 ${
                  futureDollars === o.v
                    ? "relative z-10 border-navy bg-navy font-semibold text-paper"
                    : "border-hairline bg-paper text-ink hover:border-navy"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
          <span className="mt-1 block text-xs text-steel">
            {futureDollars ? `Paycheck numbers, with prices rising ${inflation}% a year.` : "What the money would buy right now."}
          </span>
        </fieldset>
      </div>

      {startAge >= 23 && (
        <p className="border-x border-b border-hairline bg-amber-soft/30 px-5 py-3 text-sm leading-relaxed text-ink sm:px-6">
          <span className="font-semibold">Starting at {startAge}?</span> Trade pay follows experience, not age, so the
          table counts from {startAge}. Apprenticeships take adults, and many have no upper age limit. The catch is
          year one: apprentices start around half of full pay, which can be a real cut from the job you have now. The
          calculator below shows how long it takes to make that back.
        </p>
      )}

      {/* ---------------- Pay table ---------------- */}
      <section className="mt-12">
        <h2 className="font-display text-3xl font-bold text-ink">What the work pays in {placeName}</h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-steel">
          Yearly pay for full-time work, before taxes and overtime. Ages assume you start at {startAge}.
          {state && (
            <>
              {" "}
              Prices in {state.name} run{" "}
              {Math.abs(rpp - 100) < 0.5
                ? "about even with"
                : `${Math.abs(rpp - 100).toFixed(1)}% ${rpp > 100 ? "above" : "below"}`}{" "}
              the national average.
            </>
          )}
        </p>
        {state && (
          <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              checked={adjustCol}
              onChange={(e) => setAdjustCol(e.target.checked)}
              className="h-4 w-4 accent-[#1F3F52]"
            />
            Adjust for {state.name}&rsquo;s cost of living
            <span className="text-steel">(shows what the pay is worth in an average-priced state)</span>
          </label>
        )}

        <div className="mt-5 overflow-x-auto border border-hairline bg-white">
          <table className="w-full border-collapse text-[13px] sm:min-w-[760px] sm:text-sm">
            <thead>
              <tr className="border-b border-hairline bg-paper">
                <th scope="col" className="sticky left-0 z-10 bg-paper px-3 py-3 text-left font-semibold text-ink sm:px-4">
                  Job
                </th>
                {COLUMNS.map((c) => (
                  <th key={c.years} scope="col" className="px-1.5 py-3 text-right font-semibold text-ink sm:px-3">
                    <span className="sm:hidden">{c.short}</span>
                    <span className="hidden sm:inline">{c.label}</span>
                    <span className="block text-xs font-normal text-steel">
                      age {startAge + c.years}
                      {futureDollars && c.years > 0 ? `, in ${thisYear + c.years}` : ""}
                    </span>
                  </th>
                ))}
                <th scope="col" className="hidden px-3 py-3 text-right font-semibold text-ink sm:table-cell">
                  Top 10%
                  <span className="block text-xs font-normal text-steel">{futureDollars ? "in today’s $" : "earn more than"}</span>
                </th>
                <th scope="col" className="hidden px-4 py-3 text-right font-semibold text-ink sm:table-cell">
                  Jobs
                  <span className="block text-xs font-normal text-steel">in {state ? state.code : "U.S."}</span>
                </th>
              </tr>
            </thead>
            {GROUPS.map((g) => {
              const all = rows(g.id);
              const list = g.id === "trade" && !allTrades ? all.slice(0, TRADES_SHOWN) : all;
              return (
                <tbody key={g.id}>
                  <tr className="border-t-2 border-ink/20">
                    <th colSpan={7} scope="colgroup" className="bg-white px-3 pb-2 pt-4 text-left sm:px-4">
                      <span className="font-display text-lg font-bold text-ink">{g.title}</span>
                      <span className="block max-w-2xl text-xs font-normal leading-snug text-steel">{g.blurb}</span>
                    </th>
                  </tr>
                  {list.map(({ occ, curve, employment, national }) => (
                    <tr key={occ.soc} className="border-t border-hairline hover:bg-paper/60">
                      <th scope="row" className="sticky left-0 z-10 bg-white px-3 py-2.5 text-left font-normal sm:px-4">
                        {occ.slug ? (
                          <Link href={`/careers/${occ.slug}`} className="font-semibold text-navy hover:underline">
                            {occ.label}
                          </Link>
                        ) : (
                          <span className="font-semibold text-ink">{occ.label}</span>
                        )}
                        {national && (
                          <span className="ml-1 text-amber" title={`BLS doesn't publish this job for ${placeName}. National figures shown.`}>
                            *
                          </span>
                        )}
                        {occ.note && <span className="hidden max-w-[15rem] text-xs leading-snug text-steel sm:block">{occ.note}</span>}
                      </th>
                      {COLUMNS.map((c) => (
                        <td key={c.years} className="px-1.5 py-2.5 text-right tabular-nums text-ink sm:px-3">
                          <Money n={round100(payAtExperience(curve, c.years) * colFactor * grow(c.years))} />
                        </td>
                      ))}
                      <td className="hidden px-3 py-2.5 text-right tabular-nums text-steel sm:table-cell">{usd(round100(curve.p90 * colFactor))}</td>
                      <td className="hidden px-4 py-2.5 text-right tabular-nums text-steel sm:table-cell">
                        {employment > 0 ? employment.toLocaleString("en-US") : "n/a"}
                      </td>
                    </tr>
                  ))}
                  {g.id === "trade" && all.length > TRADES_SHOWN && (
                    <tr className="border-t border-hairline">
                      <td colSpan={7} className="px-3 py-2.5 sm:px-4">
                        <button type="button" onClick={() => setAllTrades((v) => !v)} className="text-sm font-semibold text-navy hover:underline">
                          {allTrades ? "Show fewer trades" : `Show all ${all.length} trades`}
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              );
            })}
          </table>
        </div>
        <div className="mt-3 space-y-1.5 text-xs leading-relaxed text-steel">
          <p>
            <span className="font-semibold text-ink">How to read this:</span> BLS reports how pay is spread across
            everyone in a job, not pay by years on the job. We read that spread as a ladder: starting out is the 10th
            percentile, 5 years in is the median, 10 years in is the 75th percentile, and 20 years in is halfway to the
            90th. It&rsquo;s a fair rough guide, not a promise. Some people climb faster, and some stay near the middle
            for good.
          </p>
          {fallbacks.length > 0 && (
            <p>
              <span className="text-amber">*</span> BLS doesn&rsquo;t publish {placeName} figures for{" "}
              {fallbacks.map((o) => o.label.toLowerCase()).join(", ")}, usually because too few people do the job there.
              National figures are shown instead.
            </p>
          )}
          <p className="sm:hidden">On a phone, the top-10% pay, job counts and notes are hidden. Turn your phone sideways or use a computer to see them.</p>
          <p>
            Where only a few hundred people do a job in a state, BLS figures can jump around from year to year. Check
            the Jobs column before leaning hard on one number.
          </p>
          <p>
            Pay excludes overtime, which is common in the trades, and self-employed workers, who include many
            contractors who run their own shops. Construction work can also slow down in winter, so a full year of
            hours isn&rsquo;t guaranteed.
          </p>
        </div>
      </section>

      {/* ---------------- Raises vs inflation ---------------- */}
      <section className="mt-12 border border-hairline bg-paper p-5 sm:p-6">
        <h2 className="font-display text-2xl font-bold text-ink">Raises vs. inflation, in plain English</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-semibold text-ink">1. Raises for getting better</h3>
            <p className="mt-1 text-[15px] leading-relaxed text-steel">
              An electrician in {placeName} starts around {usd(round100(elecStart))}. With 20 years in, it&rsquo;s
              closer to {usd(round100(elec20))}. That climb is the real raise, and it&rsquo;s what the table shows.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-ink">2. Raises that just keep up</h3>
            <p className="mt-1 text-[15px] leading-relaxed text-steel">
              Most people also get a yearly raise of a few percent, but prices rise too. Over the past year, pay rose
              3.1% while prices rose 3.7%, so many workers slipped a little behind. Since 1979, typical pay has beaten
              inflation by only about half a percent a year.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-ink">3. So we use today&rsquo;s dollars</h3>
            <p className="mt-1 text-[15px] leading-relaxed text-steel">
              If prices rise {inflation}% a year, that {usd(round100(elec20))} would read about{" "}
              {usd(round100(elec20Paper))} on a {thisYear + 20} paycheck, but buy the same groceries and rent. Flip to
              &ldquo;Future dollars&rdquo; above to see paycheck numbers.
            </p>
          </div>
        </div>
        <label className="mt-5 block max-w-md">
          <span className="flex items-baseline justify-between gap-3 text-sm">
            <span className="font-semibold text-ink">Yearly inflation to assume</span>
            <span className="tabular-nums text-ink">{inflation.toFixed(1)}%</span>
          </span>
          <input
            type="range"
            min={1}
            max={6}
            step={0.5}
            value={inflation}
            onChange={(e) => setInflation(Number(e.target.value))}
            className="mt-2 w-full accent-[#1F3F52]"
          />
          <span className="mt-1 block text-xs leading-snug text-steel">
            The long-run U.S. average is about 3%. It changes the future-dollar numbers and how fast a fixed loan
            payment shrinks in real terms. It doesn&rsquo;t change who comes out ahead in today&rsquo;s dollars by much.
          </span>
        </label>
      </section>

      {/* ---------------- Calculator ---------------- */}
      <section className="mt-12">
        <h2 className="font-display text-3xl font-bold text-ink">Is the student loan worth it?</h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-steel">
          Five ways to start, side by side, using {state ? `${state.name}` : "U.S."} pay
          {state?.tuition ? ` and ${state.name}’s average in-state tuition` : ""}. The line shows where you&rsquo;d stand at
          every age: everything earned, minus school costs and what you still owe.
        </p>
        <RoiCalculator
          stateCode={code}
          placeName={placeName}
          inStateTuition={state?.tuition ?? null}
          startAge={startAge}
          inflation={inflation}
          futureDollars={futureDollars}
        />
      </section>
    </>
  );
}
