import type { Metadata } from "next";
import Link from "next/link";
import { getAllContent } from "@/lib/content";
import { RoiCalculator } from "@/components/RoiCalculator";
import type { TradePay } from "@/lib/roi-model";

export const metadata: Metadata = {
  title: "Student Loan ROI: College vs. the Trades",
  description:
    "An honest, interactive comparison of student loans, apprenticeships, trade school, and a 4-year degree: what each path costs, what it pays, and who comes out ahead by age 28, 38, or 48.",
};

// Trades offered in the calculator. Pay comes straight from each career's
// own payTimeline so this page can never drift from the career pages: for
// every Field & Trades career, payTimeline.entry.low is the BLS OEWS May
// 2025 national 10th percentile and payTimeline.fiveYear.low is the
// national median (checked against BLS for electricians, plumbers and HVAC
// when this page was built). The upper bands are NOT used here -- they
// include a deliberate overtime bump that would make the comparison with
// college medians unfair.
const TRADE_SLUGS = [
  "electrician",
  "plumber",
  "hvac-technician",
  "carpenter",
  "ironworker",
  "equipment-operator",
  "sheet-metal-worker",
  "mason",
  "welder",
  "roofer",
  "elevator-technician",
];

export default function StudentLoanRoiPage() {
  const { careers } = getAllContent();
  const trades: TradePay[] = TRADE_SLUGS.flatMap((slug) => {
    const c = careers.find((career) => career.slug === slug);
    if (!c?.payTimeline || c.payTimeline.unit !== "annual") return [];
    return [{ slug, title: c.title, p10: c.payTimeline.entry.low, median: c.payTimeline.fiveYear.low }];
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <p className="mb-2 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wide text-amber">
        <span aria-hidden="true" className="h-px w-5 bg-amber" />
        Resources · Money
      </p>
      <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">Is the student loan worth it?</h1>
      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-steel">
        Five ways to start after high school, side by side: an apprenticeship, trade school, going straight to work, a
        4-year degree, and a construction management degree. See what each costs, what it pays, and where you&rsquo;d
        stand at every age, debt included.
      </p>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink">
        We&rsquo;re a construction site, so you&rsquo;d expect us to say the trades always win. They don&rsquo;t. A
        degree usually pays more over a long career. The real questions are how much debt it takes, how long it takes
        to catch up, and which degree you&rsquo;d earn. This page shows all three.
      </p>

      <RoiCalculator trades={trades} defaultSlug="electrician" />

      <section className="mt-12 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink">How each path is figured</h2>
          <dl className="mt-4 space-y-4 text-[15px] leading-relaxed">
            <div>
              <dt className="font-semibold text-ink">Apprenticeship</dt>
              <dd className="text-steel">
                You&rsquo;re paid from day one. Pay starts at 50% of a journeyworker&rsquo;s wage and rises to 90% in the
                final year, then reaches the national median for the trade. Real programs start between 40% and 60%.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Trade school</dt>
              <dd className="text-steel">
                One year of school, then work starting at the trade&rsquo;s entry-level pay (10th percentile), reaching the
                median four years later. Many licensed trades still require supervised hours after school.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Straight to work</dt>
              <dd className="text-steel">
                A laborer or helper job with no formal training, climbing from entry pay to the laborer median by 22.
                Many people start here and move into an apprenticeship later.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">4-year college and construction management</dt>
              <dd className="text-steel">
                Four years of school, then the median pay for bachelor&rsquo;s graduates ages 22 to 27, rising to the
                median for ages 35 to 45 by age 40. Construction management uses the same figures for &ldquo;construction
                services&rdquo; majors, one of the best-paid non-engineering degrees.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Loans</dt>
              <dd className="text-steel">
                Each year&rsquo;s borrowing builds interest from the day it&rsquo;s paid out (the unsubsidized case), through
                school and a 6-month grace period, then is paid off on a standard fixed plan.
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-ink">What this doesn&rsquo;t show</h2>
          <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[15px] leading-relaxed text-steel">
            <li>
              <span className="text-ink">These are medians.</span> Half of people earn more, half earn less. Your city,
              your major and your work ethic move the numbers more than any chart can.
            </li>
            <li>
              <span className="text-ink">A degree doesn&rsquo;t guarantee the job.</span> In mid-2026, about 5.6% of
              recent graduates were unemployed and 42% were working jobs that don&rsquo;t need their degree. This chart
              assumes everyone lands a full-time job right away.
            </li>
            <li>
              <span className="text-ink">Trade pay here is conservative.</span> Overtime is common, and many tradespeople
              become foremen or start their own business. Turn on &ldquo;Move up to foreman&rdquo; to see one version of
              that.
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
              <span className="text-ink">Taxes, inflation and living costs are left out of every path,</span> so the
              comparison stays fair. Federal loans have yearly limits, and borrowing beyond them usually means Parent PLUS
              or private loans at higher rates.
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
            Trade pay: U.S. Bureau of Labor Statistics,{" "}
            <a href="https://www.bls.gov/oes/" className="text-navy hover:underline">
              Occupational Employment and Wage Statistics
            </a>
            , May 2025, national 10th percentile and median for each occupation.
          </li>
          <li>
            Degree pay, unemployment and underemployment: Federal Reserve Bank of New York,{" "}
            <a href="https://www.newyorkfed.org/research/college-labor-market" className="text-navy hover:underline">
              The Labor Market for Recent College Graduates
            </a>{" "}
            (outcomes by major from 2024 Census data, released February 2026; rates for 2026 Q2).
          </li>
          <li>
            College prices, after-grant prices and room and board: College Board,{" "}
            <a
              href="https://research.collegeboard.org/media/pdf/Trends-in-College-Pricing-and-Student-Aid-2025-final_0.pdf"
              className="text-navy hover:underline"
            >
              Trends in College Pricing and Student Aid 2025
            </a>
            .
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
          <li>
            Supervisor pay: NAHB analysis of BLS data,{" "}
            <a href="https://www.nahb.org/blog/2026/06/highest-paid-occupations-in-construction-2025" className="text-navy hover:underline">
              highest-paid occupations in construction, 2025
            </a>{" "}
            (first-line supervisors of construction trades, $80,000 median).
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
