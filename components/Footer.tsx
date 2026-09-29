import Link from "next/link";
import { HardHatMark, CATEGORY_SLUG } from "./Header";
import type { Career } from "@/lib/types";

type CareerGroup = { category: string; items: Career[] };

export function Footer({
  careerGroups,
  careerCount,
}: {
  careerGroups: CareerGroup[];
  careerCount: number;
}) {
  return (
    <footer className="border-t border-hairline bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-10 md:grid-cols-5">
        <div className="col-span-2">
          <div className="flex items-center gap-2 font-display text-lg font-bold text-paper">
            <HardHatMark size={28} />
            <span>
              hardhat<span className="text-amber">U</span>
            </span>
          </div>
          <p className="mt-2.5 max-w-[32ch] text-sm text-paper/70">
            A free, interconnected guide to construction careers, terms, and the building
            process, for anyone new to the industry.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-paper/60">Careers</h4>
          <ul className="mt-3 flex flex-col gap-2">
            {careerGroups.slice(0, 4).map((group) => (
              <li key={group.category}>
                <Link
                  href={`/careers#${CATEGORY_SLUG[group.category] ?? ""}`}
                  className="text-sm text-paper/90 hover:underline"
                >
                  {group.category}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/careers" className="text-sm font-semibold text-paper hover:underline">
                All {careerCount} careers →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-paper/60">Learn</h4>
          <ul className="mt-3 flex flex-col gap-2">
            <li><Link href="/concepts" className="text-sm text-paper/90 hover:underline">Concepts</Link></li>
            <li><Link href="/lessons" className="text-sm text-paper/90 hover:underline">Lessons</Link></li>
            <li><Link href="/phases" className="text-sm text-paper/90 hover:underline">Process Phases</Link></li>
            <li><Link href="/software" className="text-sm text-paper/90 hover:underline">Software</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-paper/60">Get Hired</h4>
          <ul className="mt-3 flex flex-col gap-2">
            <li><Link href="/interviews" className="text-sm text-paper/90 hover:underline">Interview Prep</Link></li>
            <li><Link href="/exams" className="text-sm text-paper/90 hover:underline">Exam Prep</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-start gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-paper/60">HardHatU: an early, growing guide to the industry.</p>
          <ul className="flex flex-wrap gap-4">
            <li><Link href="/about" className="text-xs text-paper/70 hover:text-paper hover:underline">About</Link></li>
            <li><Link href="/contact" className="text-xs text-paper/70 hover:text-paper hover:underline">Contact</Link></li>
            <li><Link href="/privacy" className="text-xs text-paper/70 hover:text-paper hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-xs text-paper/70 hover:text-paper hover:underline">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
