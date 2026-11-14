import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "For Parents: Is Construction a Real Option?",
  description:
    "A plain-language handout for families: what construction careers pay, how people get in without four years of tuition, and how to explore it together.",
};

// One printable page. Kept to facts the rest of the site already sources,
// and written for a parent reading it at the kitchen table.
export default function ParentHandoutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10 print:max-w-none print:px-0 print:py-0">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href="/counselors" className="text-sm font-semibold text-navy hover:underline">
          &larr; For counselors and teachers
        </Link>
        <PrintButton />
      </div>

      <article className="rounded-lg border-2 border-ink bg-white p-8 print:rounded-none print:border-0 print:p-0">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">For parents and families</p>
        <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-ink">Is construction a real option for my kid?</h1>
        <p className="mt-3 text-lg leading-relaxed text-steel">
          For a lot of students, yes. Construction is short on people, many of its careers start with paid training instead of
          tuition, and it is far wider than most families expect.
        </p>

        <h2 className="mt-7 font-display text-xl font-bold text-ink">Why it is worth a look</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5 leading-relaxed text-ink">
          <li>
            <strong>The work is there.</strong> Associated Builders and Contractors estimates the industry needs to hire about
            349,000 more workers in 2026 alone.
          </li>
          <li>
            <strong>Many paths pay you to learn.</strong> In a registered apprenticeship, your student works for a paycheck during the
            day and takes classes on the side, instead of paying tuition first.
          </li>
          <li>
            <strong>It is not only hands-on work.</strong> Estimators, project managers, engineers, designers and safety managers are
            construction careers too. Some start in a trade and move up; others start in college.
          </li>
          <li>
            <strong>There is a real ladder.</strong> Apprentice, then journeyworker, then foreman, superintendent, or running a
            business. Each step pays more.
          </li>
        </ul>

        <h2 className="mt-7 font-display text-xl font-bold text-ink">The honest part</h2>
        <p className="mt-2 leading-relaxed text-ink">
          Much of the field work is physical and outdoors, the day often starts early, and apprenticeships take years to finish. Our
          career pages spell out the hard parts of each job so your student can decide with eyes open.
        </p>

        <h2 className="mt-7 font-display text-xl font-bold text-ink">Three things to do together</h2>
        <ol className="mt-2 list-decimal space-y-2 pl-5 leading-relaxed text-ink">
          <li>
            Take the free career quiz together: <strong>breakgroundu.com/quizzes</strong>
          </li>
          <li>
            Look up the top match in the Georgia field guide for local pay and the ways in: <strong>breakgroundu.com/states/georgia</strong>
          </li>
          <li>
            Compare the cost of college with what a trade pays: <strong>breakgroundu.com/student-loan-roi</strong>
          </li>
        </ol>

        <p className="mt-8 border-t border-hairline pt-4 text-sm text-steel">
          BreakGroundU is a free construction careers guide with no ads. Pay figures come from the U.S. Bureau of Labor Statistics;
          licensing and training details come from state agencies. Questions: contact@breakgroundu.com
        </p>
      </article>
    </div>
  );
}
