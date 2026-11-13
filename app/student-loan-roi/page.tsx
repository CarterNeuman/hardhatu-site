import type { Metadata } from "next";
import Link from "next/link";
import { PayByState } from "@/components/PayByState";

export const metadata: Metadata = {
  title: "Trade Pay by State and Student Loan ROI: College vs. the Trades",
  description:
    "Pay for 21 construction trades in every state at the start, 5, 10 and 20 years in, compared with common college careers. Plus an honest student loan calculator with raises, inflation and career changes built in.",
};

// All pay on this page comes from lib/state-pay-data.ts (BLS OEWS May 2025,
// statewide percentiles), the math from lib/roi-model.ts, and the UI from
// components/PayByState.tsx + components/RoiCalculator.tsx.

export default function StudentLoanRoiPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <p className="mb-2 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wide text-amber">
        <span aria-hidden="true" className="h-px w-5 bg-amber" />
        Resources · Money
      </p>
      <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">College or the trades? Run the numbers.</h1>
      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-steel">
        Pick your state and the age you&rsquo;d start. See what 21 trades pay at the start and 5, 10 and 20 years in,
        next to common college jobs. Then see who comes out ahead once student loans are counted.
      </p>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink">
        We&rsquo;re a construction site, so you&rsquo;d expect us to say the trades always win. They don&rsquo;t. Some
        degrees pay more over a long career. The real questions are how much debt it takes, how long it takes to catch
        up, and what the work pays where you live. This page shows all three.
      </p>

      <PayByState />

      <section className="mt-12 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink">How each path is figured</h2>
          <dl className="mt-4 space-y-4 text-[15px] leading-relaxed">
            <div>
              <dt className="font-semibold text-ink">Pay by experience</dt>
              <dd className="text-steel">
                Every path uses its job&rsquo;s pay in your state and the same experience ladder as the table: the 10th
                percentile when you start, the median at 5 years, the 75th percentile at 10, and most of the way to the
                90th at 20. Turn off &ldquo;Pay keeps growing with experience&rdquo; for the cautious case.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Apprenticeship</dt>
              <dd className="text-steel">
                You&rsquo;re paid from day one. Pay starts at 50% of a journeyworker&rsquo;s wage (the median) and
                rises to 90% in the final year, then follows the ladder. Real programs start between 40% and 60%.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Trade school</dt>
              <dd className="text-steel">
                One year of school, then work starting at entry-level pay. Many licensed trades still require
                supervised hours after school.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Straight to work, or your current job</dt>
              <dd className="text-steel">
                At 22 and under, this is a laborer or helper job with no formal training. Starting at 23 or older, it
                becomes &ldquo;stay in your current job&rdquo; at the pay you enter, so career changers can see what
                switching costs.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">College</dt>
              <dd className="text-steel">
                Four years of school, then the chosen job&rsquo;s pay in your state. In-state tuition is your
                state&rsquo;s average. Construction management uses pay for construction managers, which most people
                reach after a few years as an assistant project manager.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Loans and inflation</dt>
              <dd className="text-steel">
                Each year&rsquo;s borrowing builds interest from the day it&rsquo;s paid out, through school and a
                6-month grace period, then is paid off on a standard fixed plan. Pay, tuition and prices all rise with
                inflation. The loan payment doesn&rsquo;t, so it gets a little easier to cover each year.
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-ink">What this doesn&rsquo;t show</h2>
          <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[15px] leading-relaxed text-steel">
            <li>
              <span className="text-ink">These are averages for a whole state.</span> Pay in a big city can run well
              above the state figure, and rural pay below it. Union and non-union scales differ too.
            </li>
            <li>
              <span className="text-ink">A degree doesn&rsquo;t guarantee the job.</span> In mid-2026, about 5.6% of
              recent graduates were unemployed and 42% were working jobs that don&rsquo;t need their degree. This page
              assumes everyone lands a full-time job right away.
            </li>
            <li>
              <span className="text-ink">Trade pay here is conservative.</span> Overtime is common, and BLS leaves out
              the self-employed, including people who run their own shops.
            </li>
            <li>
              <span className="text-ink">The trades are hard on your body.</span> Injuries, weather and slow seasons can
              cost you work. That&rsquo;s a real cost, and it doesn&rsquo;t show up in a pay figure.
            </li>
            <li>
              <span className="text-ink">Benefits aren&rsquo;t counted.</span> Union apprenticeships often include health
              insurance and a pension. Many salaried jobs include a 401(k) match.
            </li>
            <li>
              <span className="text-ink">Taxes are left out of every path,</span> so the comparison stays fair. Federal
              loans have yearly limits, and borrowing beyond them usually means Parent PLUS or private loans at higher
              rates.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-12 border border-hairline bg-paper p-6">
        <h2 className="font-display text-2xl font-bold text-ink">Next steps</h2>
        <p className="mt-2 max-w-2xl text-[15px] text-steel">
          Numbers help, but the best path is the one you&rsquo;ll stick with. Find out what fits, then find out where to
          start.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <Link href="/quizzes/find-your-career" className="text-navy hover:underline">
            Take the career quiz →
          </Link>
          <Link href="/programs" className="text-navy hover:underline">
            Find an apprenticeship or program →
          </Link>
          <Link href="/careers" className="text-navy hover:underline">
            Browse every career and its pay →
          </Link>
          <Link href="/action-plan" className="text-navy hover:underline">
            Build your Blueprint →
          </Link>
        </div>
      </section>

      <section className="mt-12 border-t border-hairline pt-6">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-steel">Sources</h2>
        <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-steel">
          <li>
            Pay and job counts: U.S. Bureau of Labor Statistics,{" "}
            <a href="https://www.bls.gov/oes/" className="text-navy hover:underline">
              Occupational Employment and Wage Statistics
            </a>
            , May 2025, statewide and national 10th, 50th, 75th and 90th percentile annual wages, all industries.
          </li>
          <li>
            Cost of living: U.S. Bureau of Economic Analysis,{" "}
            <a href="https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" className="text-navy hover:underline">
              Regional Price Parities by state
            </a>
            , 2024.
          </li>
          <li>
            Inflation and raises: BLS{" "}
            <a href="https://www.bls.gov/cpi/" className="text-navy hover:underline">
              Consumer Price Index
            </a>{" "}
            (3.7% over the 12 months to September 2026) and{" "}
            <a href="https://www.bls.gov/eci/" className="text-navy hover:underline">
              Employment Cost Index
            </a>{" "}
            (wages and salaries up 3.1% over the same period); Economic Policy Institute on real median wage growth
            since 1979.
          </li>
          <li>
            Recent graduate unemployment and underemployment: Federal Reserve Bank of New York,{" "}
            <a href="https://www.newyorkfed.org/research/college-labor-market" className="text-navy hover:underline">
              The Labor Market for Recent College Graduates
            </a>{" "}
            (2026 Q2).
          </li>
          <li>
            College prices, in-state tuition by state, after-grant prices and room and board: College Board,{" "}
            <a
              href="https://research.collegeboard.org/media/pdf/Trends-in-College-Pricing-and-Student-Aid-2025-final_0.pdf"
              className="text-navy hover:underline"
            >
              Trends in College Pricing and Student Aid 2025
            </a>
            . Washington, D.C. uses the national in-state average.
          </li>
          <li>
            Loan rates: U.S. Department of Education,{" "}
            <a
              href="https://fsapartners.ed.gov/knowledge-center/library/electronic-announcements/2026-06-04/interest-rates-federal-direct-loans-first-disbursed-between-july-1-2026-and-june-30-2027"
              className="text-navy hover:underline"
            >
              interest rates for Direct Loans first disbursed July 1, 2026 to June 30, 2027
            </a>{" "}
            (6.52% undergraduate, 9.07% PLUS).
          </li>
          <li>
            Apprenticeship length: U.S. Department of Labor,{" "}
            <a href="https://www.apprenticeship.gov/sites/default/files/aai-infographic-apprentices-11-11-22.pdf" className="text-navy hover:underline">
              American Apprenticeship Initiative results
            </a>{" "}
            (construction apprenticeships averaged 4.2 years).
          </li>
          <li>
            Trade school cost: average tuition and fees for certificate-granting schools from federal IPEDS data, as
            summarized by{" "}
            <a href="https://www.bestcolleges.com/research/how-much-does-trade-school-cost/" className="text-navy hover:underline">
              BestColleges
            </a>{" "}
            (about $15,000).
          </li>
        </ul>
        <p className="mt-4 text-xs text-steel">
          This is an educational estimate, not financial advice. Check real offers, award letters and program wage scales
          before you decide.
        </p>
      </section>
    </div>
  );
}
