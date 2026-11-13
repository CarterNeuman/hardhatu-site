import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STATE_GUIDES, getStateGuide } from "@/lib/state-guides";
import { STATES } from "@/lib/state-pay-data";
import { lookup, occupation, NATIONAL } from "@/lib/state-pay-lookup";
import { payAtExperience } from "@/lib/roi-model";
import { TradeExplorer, type TradeView } from "@/components/TradeExplorer";
import { PrintButton } from "@/components/PrintButton";

// /states/[slug]: a hand-researched state field guide, written for school
// counselors, CTAE teachers, parents and students. Facts live in
// lib/state-guides.ts (each with a source); pay comes from the shared BLS
// state data so it always matches /student-loan-roi.

export function generateStaticParams() {
  return STATE_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getStateGuide(slug);
  if (!g) return {};
  return {
    title: `Construction Careers in ${g.name}: Pay, Licensing and Ways In`,
    description: `A ${g.name} field guide to ${g.trades.length} construction trades: local pay at every stage, state licensing rules, apprenticeships, free technical college options and high school pathways. Sourced and dated.`,
  };
}

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const round100 = (n: number) => Math.round(n / 100) * 100;

// Shown as "November 2026": month and year read as current without
// inviting nitpicks about a specific day.
function formatMonth(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

const LICENSE_LABEL = {
  contractor: "State contractor license",
  "journeyman-and-master": "State journeyman + master license",
  none: "No state trade license",
} as const;

export default async function StateGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getStateGuide(slug);
  if (!g) notFound();

  const meta = STATES.find((s) => s.code === g.code);
  const rpp = meta?.rpp ?? 100;

  const trades: TradeView[] = g.trades.map((t) => {
    const occ = occupation(t.soc);
    const here = lookup(occ, g.code);
    const nat = lookup(occ, NATIONAL);
    const c = here.curve;
    return {
      ...t,
      pay: {
        start: round100(payAtExperience(c, 0)),
        five: round100(payAtExperience(c, 5)),
        ten: round100(payAtExperience(c, 10)),
        twenty: round100(payAtExperience(c, 20)),
        top: round100(c.p90),
      },
      nationalMedian: round100(nat.curve.median),
      employment: here.employment,
      usesNational: here.national,
    };
  });

  const totalJobs = trades.reduce((a, t) => a + t.employment, 0);
  const totalOpenings = g.trades.reduce((a, t) => a + t.outlook.openingsPerYear, 0);
  const licensed = g.trades.filter((t) => t.stateLicense !== "none").length;
  const updated = formatMonth(g.lastVerified);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 print:max-w-none print:px-0 print:py-0">
      <nav className="mb-4 text-sm text-steel print:hidden" aria-label="Breadcrumb">
        <Link href="/resources" className="hover:underline">
          Resources
        </Link>{" "}
        /{" "}
        <Link href="/states" className="hover:underline">
          By state
        </Link>{" "}
        / <span className="text-ink">{g.name}</span>
      </nav>

      {/* Highway-sign hero */}
      <header className="relative overflow-hidden rounded-xl bg-[#1B5E3B] p-2 text-white shadow-[0_10px_30px_rgba(27,94,59,0.25)] print:shadow-none">
        <div className="rounded-lg border-[3px] border-white px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-14 w-12 items-center justify-center rounded-b-[45%] rounded-t-md border-2 border-white bg-navy font-display text-lg font-bold"
              >
                {g.code}
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/85">Field guide · Construction trades</p>
            </div>
            <span className="rounded-sm bg-[#F2C200] px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-ink">Updated {updated}</span>
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold leading-tight sm:text-5xl">Construction careers in {g.name}</h1>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-white/90">{g.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3 print:hidden">
            <PrintButton />
            <a
              href="#trades"
              className="inline-flex items-center gap-2 rounded-sm border-2 border-white px-4 py-2 text-sm font-semibold text-white hover:bg-white hover:text-[#1B5E3B]"
            >
              Jump to the trades ↓
            </a>
          </div>
        </div>
      </header>

      {/* Mile markers: the headline numbers */}
      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Marker label="Jobs in these 8 trades" value={`${Math.round(totalJobs / 1000)}k`} note="BLS, May 2025" />
        <Marker label="Openings a year" value={totalOpenings.toLocaleString("en-US")} note={`Projected, ${g.outlookPeriod}`} />
        <Marker label="Need a state trade license" value={`${licensed} of ${g.trades.length}`} note="Earned through paid work" />
        <Marker label="Tech college tuition" value="$0" note="Construction and welding, for HOPE-eligible students" />
      </dl>

      {/* Exit row: jump links */}
      <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2 print:hidden">
        {[
          ["#short-version", "The short version"],
          ["#trades", "The 8 trades"],
          ["#pay", "Pay side by side"],
          ["#licensing", "Licensing"],
          ["#own-business", "Your own business"],
          ["#high-school", "High school"],
          ["#adults", "Adults & career changers"],
          ["#sources", "Sources"],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="rounded-sm border border-[#1B5E3B]/40 bg-white px-3 py-1.5 text-sm font-semibold text-[#1B5E3B] hover:bg-[#1B5E3B] hover:text-white"
          >
            {label}
          </a>
        ))}
      </nav>

      {/* The short version */}
      <section id="short-version" className="mt-10 scroll-mt-24 border-l-4 border-[#F2C200] bg-amber-soft/40 px-5 py-5 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-ink">The short version</h2>
        <p className="mt-1 text-sm text-steel">What&rsquo;s worth telling a student about the trades in {g.name}.</p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-ink marker:font-bold marker:text-[#1B5E3B]">
          {g.quickTakeaways.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
      </section>

      {/* Trades */}
      <section id="trades" className="mt-12 scroll-mt-24">
        <h2 className="font-display text-3xl font-bold text-ink">The 8 trades</h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-steel">
          The eight largest construction trades in {g.name} by number of jobs. Pick one to see its pay ladder, the route to a license and real
          local ways in.
        </p>
        <div className="mt-6">
          <TradeExplorer trades={trades} stateName={g.name} />
        </div>
      </section>

      {/* Pay table */}
      <section id="pay" className="mt-14 scroll-mt-24 print:break-before-page">
        <h2 className="font-display text-3xl font-bold text-ink">Pay side by side</h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-steel">
          Yearly pay for full-time work in {g.name}, before taxes and overtime. Prices in {g.name} run{" "}
          {Math.abs(rpp - 100) < 0.5 ? "about even with" : `${Math.abs(rpp - 100).toFixed(1)}% ${rpp > 100 ? "above" : "below"}`} the
          national average, so a dollar here goes {rpp < 100 ? "a little further" : rpp > 100 ? "a little less far" : "about as far"}.
        </p>
        <div className="mt-5 overflow-x-auto border border-hairline bg-white">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="bg-[#1B5E3B] text-left text-white">
                <th scope="col" className="px-4 py-3 font-semibold">
                  Trade
                </th>
                <th scope="col" className="px-3 py-3 text-right font-semibold">
                  Starting out
                </th>
                <th scope="col" className="px-3 py-3 text-right font-semibold">
                  5 years in
                </th>
                <th scope="col" className="px-3 py-3 text-right font-semibold">
                  10 years in
                </th>
                <th scope="col" className="px-3 py-3 text-right font-semibold">
                  20 years in
                </th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">
                  U.S. median
                </th>
              </tr>
            </thead>
            <tbody>
              {trades.map((t) => (
                <tr key={t.slug} className="border-t border-hairline">
                  <th scope="row" className="px-4 py-2.5 text-left font-semibold">
                    <Link href={`/careers/${t.slug}`} className="text-navy hover:underline">
                      {t.name}
                    </Link>
                  </th>
                  <td className="px-3 py-2.5 text-right tabular-nums">{usd(t.pay.start)}</td>
                  <td className="px-3 py-2.5 text-right font-semibold tabular-nums">{usd(t.pay.five)}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{usd(t.pay.ten)}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{usd(t.pay.twenty)}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-steel">{usd(t.nationalMedian)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex gap-3 border border-[#F2C200] bg-[#F2C200]/10 px-4 py-3">
          <span aria-hidden="true" className="mt-0.5 shrink-0 rounded-sm bg-[#F2C200] px-1.5 text-xs font-bold text-ink">
            OT
          </span>
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-semibold">Overtime comes on top.</span> {g.overtimeNote}{" "}
            <a href={g.overtimeSource.url} className="text-navy hover:underline" target="_blank" rel="noopener noreferrer">
              Federal overtime rules
            </a>
          </p>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-steel">
          <span className="font-semibold text-ink">How to read this:</span> BLS reports how pay is spread across everyone in a job, not pay by
          years worked. We read that spread as a ladder: starting out is the 10th percentile, 5 years in is the median, 10 years in is the 75th
          percentile, and 20 years in is halfway to the 90th. It&rsquo;s a fair guide, not a promise.{" "}
          <Link href={`/student-loan-roi?state=${g.code}`} className="font-semibold text-navy hover:underline print:hidden">
            Compare these with college jobs and student loans →
          </Link>
        </p>
      </section>

      {/* Licensing */}
      <section id="licensing" className="mt-14 scroll-mt-24">
        <h2 className="font-display text-3xl font-bold text-ink">How licensing works in {g.name}</h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-steel">{g.licensingOverview}</p>
        <div className="mt-5 overflow-x-auto border border-hairline bg-white">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-hairline bg-paper text-left">
                <th scope="col" className="px-4 py-3 font-semibold text-ink">
                  Trade
                </th>
                <th scope="col" className="px-3 py-3 font-semibold text-ink">
                  State license?
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-ink">
                  What it takes
                </th>
              </tr>
            </thead>
            <tbody>
              {g.trades.map((t) => (
                <tr key={t.slug} className="border-t border-hairline align-top">
                  <th scope="row" className="px-4 py-3 text-left font-semibold text-ink">
                    {t.name}
                  </th>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-block whitespace-nowrap rounded-sm px-2 py-0.5 text-xs font-semibold ${
                        t.stateLicense === "none" ? "bg-hairline/60 text-ink" : "bg-[#1B5E3B] text-white"
                      }`}
                    >
                      {LICENSE_LABEL[t.stateLicense]}
                    </span>
                  </td>
                  <td className="px-4 py-3 leading-snug text-ink">
                    {t.licenseSummary}
                    {t.licenseAgency && (
                      <>
                        {" "}
                        <a href={t.licenseAgency.url} className="text-navy hover:underline" target="_blank" rel="noopener noreferrer">
                          Agency site
                        </a>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-steel">
          Summarized from the state&rsquo;s own rules as of {updated}. Rules change, so confirm with the agency before applying. This is a guide,
          not legal advice.
        </p>
      </section>

      {/* Own business */}
      <section id="own-business" className="mt-14 scroll-mt-24">
        <h2 className="font-display text-3xl font-bold text-ink">Starting your own business</h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-steel">{g.business.lead}</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="border border-hairline border-t-4 border-t-[#1B5E3B] bg-white p-5">
            <h3 className="font-semibold text-ink">The upside</h3>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-ink marker:text-[#1B5E3B]">
              {g.business.upside.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
          </div>
          <div className="border border-hairline border-t-4 border-t-clay bg-white p-5">
            <h3 className="font-semibold text-ink">The risk</h3>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-ink marker:text-clay">
              {g.business.risks.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink">
          <span className="font-semibold">{g.business.path.split(":")[0]}:</span>
          {g.business.path.slice(g.business.path.indexOf(":") + 1)}
        </p>
        <p className="mt-3 text-xs text-steel">
          Sources:{" "}
          {g.business.sources.map((s, i) => (
            <span key={s.url}>
              {i > 0 ? " · " : ""}
              <a href={s.url} className="text-navy hover:underline" target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </span>
          ))}
        </p>
      </section>

      {/* High school */}
      <section id="high-school" className="mt-14 scroll-mt-24">
        <h2 className="font-display text-3xl font-bold text-ink">For high school students</h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-steel">
          What {g.name} already offers students before graduation. Most of it is free, and much of it counts toward a diploma.
        </p>
        <FactGrid items={g.highSchool} />
      </section>

      {/* Adults */}
      <section id="adults" className="mt-14 scroll-mt-24">
        <h2 className="font-display text-3xl font-bold text-ink">For adults and career changers</h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-steel">
          It&rsquo;s never too late to start. These options are open to adults in {g.name}, and several cost nothing.
        </p>
        <FactGrid items={g.adults} />
      </section>

      {/* Next steps */}
      <section className="mt-14 border border-hairline bg-paper p-6 print:hidden">
        <h2 className="font-display text-2xl font-bold text-ink">Next steps</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <NextStep href="/quizzes/find-your-career" title="Take the career quiz" body="Find which of these trades fits." />
          <NextStep href="/action-plan" title="Build a Blueprint" body="A day-by-day plan to get started." />
          <NextStep href="/programs" title="Find a program" body="Apprenticeships and training to apply to." />
          <NextStep href={`/student-loan-roi?state=${g.code}`} title="Student Loan ROI" body="College vs. the trades, debt included." />
        </div>
      </section>

      {/* Sources */}
      <section id="sources" className="mt-14 scroll-mt-24 border-t border-hairline pt-6">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-steel">Sources (updated {updated})</h2>
        <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-steel">
          {g.sources.map((s) => (
            <li key={s.url + s.label}>
              <a href={s.url} className="text-navy hover:underline" target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            Program and school details link to each organization&rsquo;s own site, shown with each item above. Job outlook figures:{" "}
            <a href={g.outlookSource.url} className="text-navy hover:underline" target="_blank" rel="noopener noreferrer">
              {g.outlookSource.label}
            </a>
            .
          </li>
        </ul>
        <p className="mt-4 text-xs text-steel">
          BreakGroundU isn&rsquo;t affiliated with any program or agency listed here, and no one paid to be included. Spot something out of
          date? Email contact@breakgroundu.com.
        </p>
      </section>
    </div>
  );
}

function Marker({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="relative flex flex-col-reverse border border-hairline bg-white px-4 pb-3 pt-4">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-[#1B5E3B]" />
      <dt className="text-xs leading-snug text-steel">
        <span className="block font-semibold text-ink">{label}</span>
        {note}
      </dt>
      <dd className="font-display text-3xl font-bold text-[#1B5E3B]">{value}</dd>
    </div>
  );
}

function FactGrid({ items }: { items: { title: string; detail: string; source: { label: string; url: string } }[] }) {
  return (
    <ul className="mt-5 grid gap-4 md:grid-cols-2">
      {items.map((f) => (
        <li key={f.title} className="relative border border-hairline bg-white p-5 print:break-inside-avoid">
          <span aria-hidden="true" className="absolute left-0 top-5 h-6 w-1 bg-[#F2C200]" />
          <h3 className="font-semibold text-ink">{f.title}</h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink">{f.detail}</p>
          <p className="mt-2 text-xs text-steel">
            Source:{" "}
            <a href={f.source.url} className="text-navy hover:underline" target="_blank" rel="noopener noreferrer">
              {f.source.label}
            </a>
          </p>
        </li>
      ))}
    </ul>
  );
}

function NextStep({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link href={href} className="group block border border-hairline bg-white p-4 hover:border-[#1B5E3B]">
      <span className="block font-semibold text-navy group-hover:underline">{title} →</span>
      <span className="mt-1 block text-sm text-steel">{body}</span>
    </Link>
  );
}
