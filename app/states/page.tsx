import type { Metadata } from "next";
import Link from "next/link";
import { STATE_GUIDES } from "@/lib/state-guides";

export const metadata: Metadata = {
  title: "Construction Careers by State",
  description:
    "State field guides to the construction trades: local pay, licensing rules, apprenticeships, free training and high school pathways, sourced and dated.",
};

// /states: index of the state field guides. Only states with a researched
// guide get a live card; the rest are listed as coming, so nothing links to
// an empty template page.
export default function StatesIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <p className="mb-2 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wide text-amber">
        <span aria-hidden="true" className="h-px w-5 bg-amber" />
        Resources · By state
      </p>
      <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">Construction careers, state by state</h1>
      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-steel">
        Licensing, pay and the ways in change at the state line. Each guide is researched from the state&rsquo;s own agencies and
        dated, so counselors, teachers and families can trust what they hand out.
      </p>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {STATE_GUIDES.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/states/${g.slug}`}
              className="group block rounded-lg bg-[#1B5E3B] p-1.5 text-white shadow-sm transition-transform hover:-translate-y-1"
            >
              <span className="block rounded-md border-2 border-white px-5 py-6">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Field guide</span>
                <span className="mt-2 block font-display text-3xl font-bold">{g.name}</span>
                <span className="mt-2 block text-sm text-white/85">{g.trades.length} trades · pay, licensing, ways in</span>
                <span className="mt-4 inline-block rounded-sm bg-[#F2C200] px-2.5 py-1 text-xs font-bold text-ink group-hover:underline">
                  Open the guide →
                </span>
              </span>
            </Link>
          </li>
        ))}
        <li className="flex items-center rounded-lg border-2 border-dashed border-hairline px-5 py-6 text-sm leading-relaxed text-steel">
          More states are on the way. Each one is checked against the state&rsquo;s own licensing boards and schools before it goes up.
        </li>
      </ul>

      <p className="mt-10 text-sm text-steel">
        Looking for pay in another state now? The{" "}
        <Link href="/student-loan-roi" className="font-semibold text-navy hover:underline">
          College vs. Trades page
        </Link>{" "}
        covers pay for 21 trades in all 50 states. Counselors and teachers: see{" "}
        <Link href="/counselors" className="font-semibold text-navy hover:underline">
          classroom-ready tools
        </Link>
        .
      </p>
    </div>
  );
}
