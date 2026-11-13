import Link from "next/link";
import { STATE_GUIDES } from "@/lib/state-guides";

// Cross-links from the national pages into the state field guides.
//  - On a career page (careerSlug): "this trade in Georgia" for each guide
//    that covers it.
//  - On a program page (programSlug): the trades in each guide whose local
//    ways in include this kind of program.
//  - On a category page like Get Hired (category): every guide that covers
//    careers in that category ("Field & Trades" today).
// Renders nothing when no guide covers the career or program, so it can be
// dropped onto any page without a check.

// The categories the state guides cover. Every guide trade is a Field &
// Trades career today; widen this when a guide adds other categories.
const GUIDE_CATEGORIES = ["Field & Trades"];

export function StateGuideLinks({
  careerSlug,
  programSlug,
  category,
}: {
  careerSlug?: string;
  programSlug?: string;
  category?: string;
}) {
  if (category) {
    if (!GUIDE_CATEGORIES.includes(category) || STATE_GUIDES.length === 0) return null;
    return (
      <div className="mt-8 rounded-md bg-[#1B5E3B] p-1 text-white">
        <div className="rounded border-2 border-white/80 px-4 py-3.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">Local field guide</p>
          {STATE_GUIDES.map((g) => (
            <p key={g.slug} className="mt-1.5 text-sm leading-snug">
              <span className="font-semibold">Looking for work in {g.name}?</span> Local pay, licensing rules and the real
              apprenticeships near you for {g.trades.length} trades.{" "}
              <Link href={`/states/${g.slug}`} className="font-semibold text-[#F2C200] hover:underline">
                Open the {g.name} guide →
              </Link>
            </p>
          ))}
        </div>
      </div>
    );
  }
  const hits = STATE_GUIDES.map((g) => ({
    g,
    trades: g.trades.filter((t) =>
      careerSlug ? t.slug === careerSlug : programSlug ? t.training.some((o) => o.programSlug === programSlug) : false
    ),
  })).filter((h) => h.trades.length > 0);
  if (hits.length === 0) return null;

  return (
    <div className="mt-8 rounded-md bg-[#1B5E3B] p-1 text-white">
      <div className="rounded border-2 border-white/80 px-4 py-3.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">Local field guide</p>
        {hits.map(({ g, trades }) =>
          careerSlug ? (
            <p key={g.slug} className="mt-1.5 text-sm leading-snug">
              <span className="font-semibold">In {g.name}?</span> Local pay, state licensing rules and where to train for this trade.{" "}
              <Link href={`/states/${g.slug}#${trades[0].slug}`} className="font-semibold text-[#F2C200] hover:underline">
                Open the {g.name} guide →
              </Link>
            </p>
          ) : (
            <p key={g.slug} className="mt-1.5 text-sm leading-snug">
              <span className="font-semibold">Where to start in {g.name}:</span>{" "}
              {trades.map((t, i) => (
                <span key={t.slug}>
                  {i > 0 ? ", " : ""}
                  <Link href={`/states/${g.slug}#${t.slug}`} className="font-semibold text-[#F2C200] hover:underline">
                    {t.name}
                  </Link>
                </span>
              ))}
            </p>
          )
        )}
      </div>
    </div>
  );
}
