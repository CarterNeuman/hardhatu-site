"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { StateTrade, TrainingOption, WorkStyle } from "@/lib/state-guides";

// The interactive heart of a state guide:
//  - a three-tap "which trade fits you?" strip that highlights matching trades
//  - eight "exit sign" buttons that pick a trade
//  - the trade's panel: local pay ladder, overtime, the hard parts, the
//    license route, owning a business someday, and ways in
// Each trade has its own shareable link (/states/georgia#plumber) and its
// own print button. Printing the page normally prints every panel in order.

export type TradeView = StateTrade & {
  pay: { start: number; five: number; ten: number; twenty: number; top: number };
  nationalMedian: number;
  employment: number;
  usesNational: boolean;
  resources: { lessons: Ref[]; exams: Ref[]; programs: Ref[]; hunt: Ref[] };
};

type Ref = { label: string; href: string };

const KIND_LABEL: Record<TrainingOption["kind"], string> = {
  union: "Union apprenticeship",
  "open-shop": "Non-union apprenticeship",
  college: "Technical college",
  "free-training": "Free training",
  "high-school": "High school",
};

const KIND_STYLE: Record<TrainingOption["kind"], string> = {
  union: "bg-[#1B5E3B] text-white",
  "open-shop": "bg-navy text-paper",
  college: "bg-amber-soft text-ink",
  "free-training": "bg-[#F2C200] text-ink",
  "high-school": "bg-hairline text-ink",
};

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const k = (n: number) => `$${(n / 1000).toFixed(n >= 100000 ? 0 : 1)}k`;

type Answers = { style?: WorkStyle; setting?: "outdoor" | "indoor" | "either"; heights?: "fine" | "ground" };

// How well a trade matches the answers so far: 1 point per full match,
// half a point when a "mixed" (inside and outside) trade meets a preference.
function fitScore(t: StateTrade, a: Answers) {
  let score = 0;
  if (a.style && t.fit.styles.includes(a.style)) score += 1;
  if (a.setting) {
    if (a.setting === "either" || t.fit.setting === a.setting) score += 1;
    else if (t.fit.setting === "mixed") score += 0.5;
  }
  if (a.heights && (a.heights === "fine" || !t.fit.heights)) score += 1;
  return score;
}

// Every trade is an exit sign, numbered in guide order (biggest employers
// first, then A to Z). Signs are kept short so 25 still fit on one screen.

export function TradeExplorer({ trades, stateName }: { trades: TradeView[]; stateName: string }) {
  const [active, setActive] = useState(trades[0].slug);
  const [answers, setAnswers] = useState<Answers>({});
  const [printOnly, setPrintOnly] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  // Open on the trade named in the link (#plumber), and scroll to it.
  useEffect(() => {
    const want = window.location.hash.replace(/^#(panel-)?/, "");
    if (trades.some((t) => t.slug === want)) {
      setActive(want);
      requestAnimationFrame(() => document.getElementById(`panel-${want}`)?.scrollIntoView({ block: "start" }));
    }
  }, [trades]);

  // Single-trade printing: hide everything but this trade's panel.
  useEffect(() => {
    if (!printOnly) return;
    const html = document.documentElement;
    html.classList.add("print-single");
    const done = () => {
      html.classList.remove("print-single");
      setPrintOnly(null);
    };
    window.addEventListener("afterprint", done, { once: true });
    const id = window.setTimeout(() => window.print(), 50);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("afterprint", done);
    };
  }, [printOnly]);

  function choose(slug: string) {
    setActive(slug);
    history.replaceState(null, "", `#${slug}`);
  }

  async function copyLink(slug: string) {
    const url = `${window.location.origin}${window.location.pathname}#${slug}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Copy this link:", url);
    }
    setCopied(slug);
    window.setTimeout(() => setCopied((c) => (c === slug ? null : c)), 2000);
  }

  const answered = Object.values(answers).some(Boolean);
  const scores = trades.map((t) => fitScore(t, answers));
  const best = Math.max(...scores);
  const isMatch = (i: number) => answered && best > 0 && scores.at(i) === best;
  const matches = trades.filter((_, i) => isMatch(i));

  return (
    <div>
      <FitStrip answers={answers} setAnswers={setAnswers} />
      {answered && (
        <p className="mb-4 text-sm text-ink print:hidden" aria-live="polite">
          <span className="font-semibold">Good fits for you: </span>
          {matches.map((t, i) => (
            <span key={t.slug}>
              {i > 0 ? ", " : ""}
              <button type="button" onClick={() => choose(t.slug)} className="font-semibold text-[#1B5E3B] underline-offset-2 hover:underline">
                {t.name}
              </button>
            </span>
          ))}
          .{" "}
          <Link href="/quizzes/find-your-career" className="text-navy hover:underline">
            Want a deeper match? Take the full career quiz →
          </Link>
        </p>
      )}

      {/* Exit signs: the trade picker */}
      <div role="tablist" aria-label="Choose a trade" className="print:hidden">
        <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
          {trades.map((t, i) => {
            const on = t.slug === active;
            const match = isMatch(i);
            const dim = answered && !match;
            return (
              <button
                key={t.slug}
                type="button"
                role="tab"
                id={`tab-${t.slug}`}
                aria-selected={on}
                aria-controls={`panel-${t.slug}`}
                onClick={() => choose(t.slug)}
                className={`group relative flex flex-col justify-start rounded-md ${dim ? "bg-[#5F6B66]" : "bg-[#1B5E3B]"} px-3 pb-2 pt-4 text-left text-white shadow-sm outline-none transition focus-visible:ring-4 focus-visible:ring-[#F2C200] ${
                  on ? "-translate-y-1 ring-4 ring-[#F2C200]" : "hover:-translate-y-0.5"
                }`}
              >
                <span className="absolute left-3 top-0 -translate-y-1/2 rounded-sm bg-[#F2C200] px-1.5 py-0.5 text-[12px] font-bold uppercase tracking-wider text-ink">
                  Exit {i + 1}
                </span>
                {match && <GoodFit />}
                <span className="pointer-events-none absolute inset-1 rounded border border-white/70" aria-hidden="true" />
                <span className="relative block text-base font-bold leading-tight">{t.name}</span>
                <span className="relative mt-0.5 block text-[12px] text-white/85">
                  {k(t.pay.five)} typical
                  {t.outlook && (
                    <span className="hidden sm:inline">{` · ${t.outlook.openingsPerYear.toLocaleString("en-US")} openings/yr`}</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {trades.map((t) => {
        const shown = t.slug === active;
        const printHidden = printOnly !== null && printOnly !== t.slug;
        return (
          <section
            key={t.slug}
            id={`panel-${t.slug}`}
            role="tabpanel"
            aria-labelledby={`tab-${t.slug}`}
            className={`${shown ? "block" : "hidden"} mt-6 scroll-mt-24 border border-hairline bg-white ${
              printHidden ? "print:hidden" : "print:mt-8 print:block print:break-inside-avoid-page"
            }`}
          >
            <header className="flex flex-wrap items-start justify-between gap-3 border-b border-hairline px-5 py-4 sm:px-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-ink">
                  {t.name} <span className="text-base font-normal text-steel">in {stateName}</span>
                </h3>
                <p className="mt-1 max-w-2xl text-base text-steel">{t.oneLine}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 print:hidden">
                <button
                  type="button"
                  onClick={() => copyLink(t.slug)}
                  className="rounded-sm border border-hairline px-3 py-1.5 text-xs font-semibold text-ink hover:border-[#1B5E3B]"
                >
                  {copied === t.slug ? "Link copied ✓" : "Copy link to this trade"}
                </button>
                <button
                  type="button"
                  onClick={() => setPrintOnly(t.slug)}
                  className="rounded-sm bg-[#F2C200] px-3 py-1.5 text-xs font-bold text-ink hover:brightness-95"
                >
                  Print this trade
                </button>
                <Link href={`/careers/${t.slug}`} className="px-1 text-sm font-semibold text-navy hover:underline">
                  Full career profile →
                </Link>
              </div>
            </header>

            <div className="grid gap-8 px-5 py-6 sm:px-6 lg:grid-cols-2">
              {/* Pay, overtime, outlook, hard parts */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-steel">Pay in {stateName}</h4>
                <PayLadder pay={t.pay} />
                <p className="mt-3 text-sm text-steel">
                  Typical (median) pay is {usd(t.pay.five)} in {stateName}, compared with {usd(t.nationalMedian)} nationally.
                  {t.usesNational ? " BLS doesn't publish this job for the state, so national figures are shown." : ""}
                </p>
                {t.payNote && <p className="mt-2 text-xs text-steel">{t.payNote}</p>}
                <p className="mt-3 border-l-4 border-[#F2C200] bg-[#F2C200]/10 px-3 py-2 text-sm leading-snug text-ink">
                  <span className="font-semibold">Overtime: </span>
                  {t.overtime}
                </p>

                <h4 className="mt-6 text-xs font-semibold uppercase tracking-wide text-steel">Jobs outlook</h4>
                {t.outlook ? (
                  <dl className="mt-2 grid grid-cols-3 gap-3 text-center">
                    <Stat label="Jobs in 2024" value={t.outlook.base.toLocaleString("en-US")} />
                    <Stat label="Growth by 2034" value={`+${t.outlook.growthPct}%`} />
                    <Stat label="Openings a year" value={t.outlook.openingsPerYear.toLocaleString("en-US")} />
                  </dl>
                ) : (
                  <p className="mt-2 border border-dashed border-hairline bg-paper/60 px-3 py-2.5 text-sm text-steel">
                    {t.sharedStatsWith
                      ? `${stateName}'s projections count this trade inside a larger group (see ${
                          trades.find((x) => x.slug === t.sharedStatsWith)?.name ?? "the related trade"
                        }), so there's no separate job count.`
                      : `${stateName} publishes no job projection for this trade.`}
                  </p>
                )}

                <div className="mt-6 border border-l-4 border-clay/40 border-l-clay bg-[#8A4A31]/5 px-4 py-3">
                  <h4 className="text-sm font-semibold text-ink">The hard parts</h4>
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm leading-snug text-ink marker:text-clay">
                    {t.hardParts.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <a href="#safety" className="mt-1.5 inline-block text-xs font-semibold text-clay hover:underline print:hidden">
                    How safety works on the job ↓
                  </a>
                </div>
              </div>

              {/* License route + owning a business */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-steel">The route to a license</h4>
                <p className="mt-2 text-base leading-relaxed text-ink">{t.licenseSummary}</p>
                <ol className="relative mt-4 space-y-4 pl-10">
                  <span aria-hidden="true" className="absolute bottom-2 left-[15px] top-2 w-1 rounded bg-ink/80" />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-2 left-[16.5px] top-2 w-px border-l border-dashed border-[#F2C200]"
                  />
                  {t.licenseSteps.map((step, i) => (
                    <li key={step.title} className="relative">
                      <span
                        aria-hidden="true"
                        className="absolute -left-10 top-0 flex h-8 w-8 items-center justify-center rounded-sm border-2 border-white bg-[#1B5E3B] text-xs font-bold text-white shadow"
                      >
                        {i + 1}
                      </span>
                      <p className="font-semibold text-ink">{step.title}</p>
                      <p className="text-sm leading-snug text-steel">{step.detail}</p>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 border border-dashed border-[#1B5E3B]/50 bg-[#1B5E3B]/5 px-4 py-3">
                  <p className="text-sm font-semibold text-ink">Your own business someday</p>
                  <p className="mt-1 text-sm leading-snug text-ink">{t.ownBusiness}</p>
                  <a href="#own-business" className="mt-1 inline-block text-xs font-semibold text-[#1B5E3B] hover:underline print:hidden">
                    The upside and the risk ↓
                  </a>
                </div>
                {t.licenseAgency && (
                  <p className="mt-4 text-xs text-steel">
                    Licensing agency:{" "}
                    <a href={t.licenseAgency.url} className="text-navy hover:underline" target="_blank" rel="noopener noreferrer">
                      {t.licenseAgency.label}
                    </a>
                  </p>
                )}
              </div>
            </div>

            {/* Ways in */}
            <div className="border-t border-hairline px-5 py-6 sm:px-6">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-steel">Ways in, in {stateName}</h4>
              <ul className="mt-3 grid gap-3 md:grid-cols-2">
                {t.training.map((o) => (
                  <li key={o.name} className="border border-hairline bg-paper/60 p-4 print:break-inside-avoid">
                    <span className={`inline-block rounded-sm px-2 py-0.5 text-[12px] font-semibold ${KIND_STYLE[o.kind]}`}>
                      {KIND_LABEL[o.kind]}
                    </span>
                    <p className="mt-2 font-semibold text-ink">
                      {o.url ? (
                        <a href={o.url} className="text-navy hover:underline" target="_blank" rel="noopener noreferrer">
                          {o.name}
                        </a>
                      ) : (
                        o.name
                      )}
                    </p>
                    <p className="text-xs text-steel">{o.where}</p>
                    <p className="mt-1.5 text-sm leading-snug text-ink">{o.detail}</p>
                    {o.url && <p className="hidden break-all text-[10px] text-steel print:block">{o.url}</p>}
                    {o.programSlug && (
                      <Link
                        href={`/programs/${o.programSlug}`}
                        className="mt-2 inline-block text-xs font-semibold text-navy hover:underline print:hidden"
                      >
                        How this kind of program works →
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              {t.credentials.length > 0 && (
                <p className="mt-4 text-sm text-steel">
                  <span className="font-semibold text-ink">Credentials worth knowing: </span>
                  {t.credentials.join(" · ")}
                </p>
              )}
            </div>

            <KeepGoing t={t} />
          </section>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// "Which trade fits you?": three quick taps, no sign-up, nothing saved.

// "Keep going on BreakGroundU": the trade's lessons, practice exams,
// national program pages and hiring guides, so a student who picks a trade
// here has a next click for every stage.
function KeepGoing({ t }: { t: TradeView }) {
  const cols: { title: string; items: Ref[]; extra?: Ref }[] = [
    { title: "Learn the basics", items: [{ label: `${t.name}: full career profile`, href: `/careers/${t.slug}` }, ...t.resources.lessons] },
    { title: "Practice exams", items: t.resources.exams, extra: { label: "All practice exams", href: "/exams" } },
    { title: "How the programs work", items: t.resources.programs, extra: { label: "All national programs", href: "/programs" } },
    { title: "Get hired", items: t.resources.hunt, extra: { label: "Build your action plan", href: "/action-plan" } },
  ];
  return (
    <div className="border-t border-hairline bg-paper/50 px-5 py-6 sm:px-6 print:hidden">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-steel">Keep going on BreakGroundU</h4>
      <div className="mt-3 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-sm font-semibold text-ink">{c.title}</p>
            <ul className="mt-1.5 space-y-1 text-sm">
              {c.items.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="text-navy hover:underline">
                    {r.label}
                  </Link>
                </li>
              ))}
              {c.extra && (
                <li>
                  <Link href={c.extra.href} className="text-xs font-semibold text-steel hover:text-navy hover:underline">
                    {c.extra.label} →
                  </Link>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function GoodFit() {
  return (
    <span className="absolute right-2 top-0 z-10 -translate-y-1/2 rounded-sm bg-white px-1.5 py-0.5 text-[12px] font-bold uppercase tracking-wider text-[#1B5E3B] shadow">
      Good fit
    </span>
  );
}

function FitStrip({ answers, setAnswers }: { answers: Answers; setAnswers: (a: Answers) => void }) {
  const set = <K extends keyof Answers>(key: K, v: Answers[K]) =>
    setAnswers({ ...answers, [key]: answers[key] === v ? undefined : v });
  const any = Object.values(answers).some(Boolean);
  return (
    <div className="mb-5 rounded-md border-2 border-dashed border-[#1B5E3B]/40 bg-white p-4 sm:p-5 print:hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-display text-xl font-bold text-ink">Not sure where to start? Tap what sounds like you.</p>
        {any && (
          <button type="button" onClick={() => setAnswers({})} className="text-xs font-semibold text-steel hover:text-ink hover:underline">
            Start over
          </button>
        )}
      </div>
      <div className="mt-3 grid gap-4 md:grid-cols-3">
        <Question label="I’d rather spend my day…">
          <Choice on={answers.style === "build"} onClick={() => set("style", "build")}>
            Building things
          </Choice>
          <Choice on={answers.style === "fix"} onClick={() => set("style", "fix")}>
            Figuring out what’s broken
          </Choice>
          <Choice on={answers.style === "machines"} onClick={() => set("style", "machines")}>
            Running big machines
          </Choice>
        </Question>
        <Question label="I’d rather work…">
          <Choice on={answers.setting === "outdoor"} onClick={() => set("setting", "outdoor")}>
            Mostly outside
          </Choice>
          <Choice on={answers.setting === "indoor"} onClick={() => set("setting", "indoor")}>
            Mostly inside
          </Choice>
          <Choice on={answers.setting === "either"} onClick={() => set("setting", "either")}>
            Either is fine
          </Choice>
        </Question>
        <Question label="Heights?">
          <Choice on={answers.heights === "fine"} onClick={() => set("heights", "fine")}>
            No problem
          </Choice>
          <Choice on={answers.heights === "ground"} onClick={() => set("heights", "ground")}>
            I’d rather stay on the ground
          </Choice>
        </Question>
      </div>
    </div>
  );
}

function Question({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-steel">{label}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function Choice({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
        on ? "border-[#1B5E3B] bg-[#1B5E3B] font-semibold text-white" : "border-hairline bg-paper text-ink hover:border-[#1B5E3B]"
      }`}
    >
      {children}
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col-reverse border border-hairline bg-paper/60 px-2 py-3">
      <dt className="mt-0.5 text-[12px] uppercase tracking-wide text-steel">{label}</dt>
      <dd className="font-display text-xl font-bold text-ink">{value}</dd>
    </div>
  );
}

// Four horizontal bars on one shared scale (0 to the top-10% figure), so the
// climb from starting pay to 20 years in is visible at a glance. Values are
// always written next to the bars; the bars never carry meaning alone.
function PayLadder({ pay }: { pay: TradeView["pay"] }) {
  const rows = [
    { label: "Starting out", v: pay.start },
    { label: "5 years in", v: pay.five },
    { label: "10 years in", v: pay.ten },
    { label: "20 years in", v: pay.twenty },
  ];
  const max = pay.top;
  return (
    <div className="mt-3 space-y-2">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[6.5rem_1fr_4.5rem] items-center gap-2 text-sm">
          <span className="text-steel">{r.label}</span>
          <span className="h-3 rounded-r-sm bg-hairline/50">
            <span className="block h-3 rounded-r-sm bg-[#1B5E3B]" style={{ width: `${(r.v / max) * 100}%` }} />
          </span>
          <span className="text-right font-semibold tabular-nums text-ink">{k(r.v)}</span>
        </div>
      ))}
      <p className="pt-1 text-xs text-steel">Top 10% earn more than {usd(pay.top)}.</p>
    </div>
  );
}
