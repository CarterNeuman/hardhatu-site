import type { Metadata } from "next";
import Link from "next/link";
import { getAllContent, groupExamsByCategory, slugifyCategory, urlFor } from "@/lib/content";
import { CATEGORY_SLUG } from "@/lib/content-client";
import { BLUEPRINT_GRID } from "@/lib/blueprint-style";
import type { ExamPrep } from "@/lib/types";
import { CredentialCard, ExamExplorer, type ExamCard, type ExamGroup } from "@/components/ExamExplorer";
import { JobHuntRail } from "@/components/JobHuntRail";

export const metadata: Metadata = {
  title: "Get Qualified",
  description:
    "Independent study material for real construction certifications: OSHA-10/30, the PMP, CCM, LEED Green Associate, and more.",
};

const MONO = { fontFamily: "'IBM Plex Mono', monospace" } as const;

// The short name that goes across the top of a credential card. Exam
// files carry the issuer's full name ("Project Management Institute
// (PMI)", "State licensing boards, administered via..."), which is
// right for the exam page's disclaimer but far too long for a card
// strip -- this pulls out the acronym people actually say.
function shortIssuer(organization?: string): string {
  if (!organization) return "Independent";
  if (/^(your )?state/i.test(organization)) return "State board";
  const leading = organization.match(/^([A-Z]{3,8})\b/);
  if (leading) return leading[1];
  const paren = organization.match(/\(([A-Z]{2,8})\)/);
  if (paren) return paren[1];
  return organization.split(" (")[0].split(/\s+/).slice(0, 3).join(" ");
}

export default function ExamsIndexPage() {
  const { exams, careers, byId } = getAllContent();

  const toCard = (exam: ExamPrep): ExamCard => {
    const career = exam.careerId ? byId.get(exam.careerId) : undefined;
    return {
      id: exam.id,
      href: urlFor(exam),
      name: exam.title,
      issuer: shortIssuer(exam.organization),
      tagline: exam.tagline,
      entryLevel: exam.tier === "free",
      questionCount: exam.questions.length,
      comingSoon: exam.comingSoon,
      careerTitle: career?.title,
    };
  };

  // How many career pages point at an exam -- the page's measure of
  // how widely a credential matters.
  const careerLinks = (examId: string) => careers.filter((c) => c.relatedIds.includes(examId)).length;

  const groups: ExamGroup[] = groupExamsByCategory(exams).map((group) => ({
    category: group.category,
    anchor: CATEGORY_SLUG[group.category] ?? slugifyCategory(group.category),
    // No-experience credentials lead each group; within each level the
    // ones more career pages point to come first.
    exams: [...group.items]
      .sort(
        (a, b) =>
          Number(b.tier === "free") - Number(a.tier === "free") || careerLinks(b.id) - careerLinks(a.id)
      )
      .map(toCard),
  }));

  // "Start here": the entry-level credentials the most career pages
  // point to -- in practice the cards almost every jobsite asks for
  // first. Ranked from the content graph, not hand-picked, so it stays
  // right as careers and exams are added.
  const startHere = exams
    .filter((e) => e.tier === "free" && !e.comingSoon)
    .sort((a, b) => careerLinks(b.id) - careerLinks(a.id))
    .slice(0, 3)
    .map(toCard);

  const entryCount = exams.filter((e) => e.tier === "free").length;
  const questionCount = exams.reduce((sum, e) => sum + e.questions.length, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Hero: the pitch on the left, and on the right the thing this
          page is about -- a wallet card with your name not on it yet. */}
      <header className="bg-ink text-paper" style={BLUEPRINT_GRID}>
        <div className="grid grid-cols-1 items-center gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-soft" style={MONO}>
              Get Qualified
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-5xl font-bold leading-[1.02] text-paper sm:text-6xl">
              The cards that get you <span className="text-amber-soft">through the gate.</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-paper/85">
              Plain-language study guides and practice questions for the certifications and licenses construction
              employers actually ask for. Start with the ones that need no experience.
            </p>
            <dl className="mt-8 grid max-w-xl grid-cols-3 gap-px bg-paper/15">
              {[
                { value: exams.length, label: "study guides" },
                { value: entryCount, label: "need no experience" },
                { value: questionCount, label: "practice questions" },
              ].map((stat) => (
                <div key={stat.label} className="bg-ink px-3 py-4 sm:px-4">
                  <dd className="font-display text-4xl font-bold leading-none text-paper">{stat.value}</dd>
                  <dt className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-paper/70">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div aria-hidden="true" className="relative mx-auto hidden h-[230px] w-[300px] lg:block">
            <div className="absolute inset-x-6 top-7 h-[190px] rotate-[7deg] border border-paper/20 bg-navy" />
            <div className="absolute inset-0 top-3 flex h-[200px] -rotate-[4deg] flex-col border border-paper/30 bg-paper text-ink shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
              <div className="bg-navy px-4 pb-2.5 pt-2">
                <span className="mx-auto block h-1.5 w-10 rounded-full bg-paper/90" />
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-paper" style={MONO}>
                    Jobsite credential
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-soft">Valid</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between px-4 py-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-steel">Cardholder</p>
                  <p className="font-display text-3xl font-bold leading-none text-ink">You, soon</p>
                </div>
                <div className="grid grid-cols-2 gap-3 border-t border-hairline pt-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-steel">Issued</p>
                    <p className="text-xs font-medium text-ink" style={MONO}>
                      The day you pass
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-steel">Good for</p>
                    <p className="text-xs font-medium text-ink" style={MONO}>
                      Your first day
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {startHere.length > 0 && (
          <div className="border-t border-paper/15 px-6 py-8 sm:px-10">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h2 className="font-display text-2xl font-bold text-paper">New to construction? Start with these.</h2>
              <p className="text-sm text-paper/70">No work experience required to sit any of them.</p>
            </div>
            <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {startHere.map((exam) => (
                <li key={exam.id}>
                  <CredentialCard exam={exam} onDark />
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <div className="mt-10">
        <ExamExplorer groups={groups} />
      </div>

      <p className="mt-12 border-l-[3px] border-amber pl-3 text-sm leading-relaxed text-steel">
        <span className="font-semibold text-ink">Independent study material.</span> BreakGroundU isn&rsquo;t affiliated
        with or endorsed by any certifying body named here, and the practice questions are written independently, not
        taken from real exams. Each guide links to the official source for registration, pricing, and the real content
        outline. Looking for a class or apprenticeship instead?{" "}
        <Link href="/programs" className="font-semibold text-navy hover:underline">
          Browse training programs
        </Link>
        .
      </p>

      <JobHuntRail heading="Credential in hand? Put it to work" />
    </div>
  );
}
