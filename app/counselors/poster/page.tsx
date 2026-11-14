import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Career-Center Poster",
  description: "A printable poster for school career centers pointing students to BreakGroundU's free construction career quiz.",
};

// A single letter-size sheet. Big type, one action, one address.
export default function CounselorPosterPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10 print:max-w-none print:px-0 print:py-0">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href="/counselors" className="text-sm font-semibold text-navy hover:underline">
          &larr; For counselors and teachers
        </Link>
        <PrintButton label="Print the poster" />
      </div>

      <article className="flex aspect-[8.5/11] flex-col justify-between rounded-lg bg-[#1B5E3B] p-3 text-white print:rounded-none [print-color-adjust:exact]">
        <div className="flex h-full flex-col justify-between rounded-md border-4 border-white px-8 py-10 sm:px-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">Career center</p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[0.95] sm:text-6xl">
              Not sure college is your path?
            </h1>
            <p className="mt-5 max-w-[30ch] text-2xl leading-snug text-white/90">
              Find a construction career that fits you, what it pays, and how to get in.
            </p>
          </div>

          <ul className="space-y-3 text-xl">
            <li className="flex gap-3">
              <span aria-hidden="true" className="font-bold text-[#F2C200]">1</span> Take the free career quiz
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="font-bold text-[#F2C200]">2</span> See real pay for your match in Georgia
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="font-bold text-[#F2C200]">3</span> Get a step-by-step plan to get hired
            </li>
          </ul>

          <div>
            <p className="inline-block rounded-sm bg-[#F2C200] px-4 py-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              breakgroundu.com/quizzes
            </p>
            <p className="mt-4 text-base text-white/85">Free. No ads. 100+ construction careers.</p>
          </div>
        </div>
      </article>
    </div>
  );
}
