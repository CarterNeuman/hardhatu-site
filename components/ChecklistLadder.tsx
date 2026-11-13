import { HomeReveal } from "@/components/HomeReveal";

// A vertical steel-beam "ladder" rendering for a Get Hired guide's
// step-by-step checklist -- a lighter echo of the hub-and-spoke diagram's
// I-beam language on the main /get-hired page, so a guide's own page reads
// as part of the same section instead of falling back to a plain numbered
// list. Each rung reveals on scroll via HomeReveal, staggered by index,
// instead of dumping every step on screen at once.
export function ChecklistLadder({ items }: { items: { step: string; detail: string }[] }) {
  return (
    <ol className="mt-2 flex flex-col">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <li key={i} className={`list-none ${isLast ? "" : "pb-6"}`}>
            <HomeReveal delayMs={i * 90} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="z-10 flex h-7 w-7 shrink-0 items-center justify-center border-2 border-navy bg-paper text-xs font-bold text-navy">
                  {i + 1}
                </span>
                {!isLast && <span aria-hidden="true" className="mt-1 w-[3px] flex-1 bg-navy" />}
              </div>
              <div className="pb-1">
                <p className="font-medium text-ink">{item.step}</p>
                <p className="mt-1 text-sm leading-snug text-steel">{item.detail}</p>
              </div>
            </HomeReveal>
          </li>
        );
      })}
    </ol>
  );
}
