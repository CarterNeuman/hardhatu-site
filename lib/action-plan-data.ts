// Shared data-assembly for the Action Plan feature: turns the site's raw
// content (careers, lessons, software, concepts, guides) into the
// per-category shape ActionPlanBuilder actually consumes. Pulled out of
// app/action-plan/page.tsx (2026-11-10) so the "my saved plans" list
// page (app/action-plan/my-plans/page.tsx) can regenerate a saved
// plan's full content -- day-by-day schedule, resume bullets, pay
// figures -- without duplicating this lookup, since both pages need
// the exact same category data to call buildActionPlan with.
import { getAllContent, getProgramsForCareer, urlFor } from "@/lib/content";
import { CATEGORY_SLUG, matchSoftwareByName } from "@/lib/content-client";
import { ORDERED_LESSON_SLUGS } from "@/lib/lesson-order";
import { ACTION_PLAN_LINK_TOKENS, CAREER_CATEGORY_ORDER } from "@/lib/types";
import type { ActionPlan, AnyContent, GetHired, ResumeGuide } from "@/lib/types";
import type { ExamRef, PlanResource, ResourceKind } from "@/lib/action-plan-generator";

export type SlimCareer = {
  id: string;
  title: string;
  slug: string;
  // Carried straight through from the career's own `entryPay`/`isEntryRole`
  // fields -- see ActionPlanBuilder's own comment on isEntryRole for why
  // this changes the "what you can expect to earn" copy.
  entryPay?: { low: number; high: number; unit: "annual" | "hourly"; source: string; asOf: string };
  isEntryRole?: boolean;
};
export type SlimLesson = { id: string; slug: string; title: string; minutes: number };
export type SlimConcept = { id: string; slug: string; title: string; definition: string };
export type SlimSoftware = { id: string; slug: string; title: string; whatItIs: string };
export type SlimProgram = {
  id: string;
  slug: string;
  title: string;
  organization: string;
  programType: string;
  costNote?: string;
  durationNote?: string;
};

export type CategoryData = {
  category: string;
  // This category's anchor on the career index (/careers#<slug>).
  categorySlug?: string;
  // This category's Get Hired guide page, if it's live.
  getHiredHref?: string;
  careers: SlimCareer[];
  skeleton?: ActionPlan;
  getHiredGuide?: Pick<GetHired, "whereToLook" | "credentialsToHaveReady">;
  resumeGuide?: { slug: string; exampleBullets: string[] };
  lessonsByCareerId: Record<string, SlimLesson[]>;
  // Shown when no specific career is picked (or that career has no
  // lessons tied to it yet) -- a few lessons for the category as a
  // whole, so "Not sure yet, keep it general" still gets real course
  // suggestions instead of an empty section.
  fallbackLessons: SlimLesson[];
  // Same "specific career wins, else category-wide fallback" pattern as
  // lessons above, for software -- woven into the day-by-day
  // skill-building rotation, not just a side list.
  softwareByCareerId: Record<string, SlimSoftware[]>;
  fallbackSoftware: SlimSoftware[];
  conceptsByCareerId: Record<string, SlimConcept[]>;
  fallbackConcepts: SlimConcept[];
  // Real programs (apprenticeships, trade schools, certificate courses)
  // tied to this career via the Program's own careerIds field -- the
  // reverse of getProgramsForCareer's forward lookup on the Programs
  // finder and career pages, same data, just projected down to what the
  // Action Plan result screen needs to link to it.
  programsByCareerId: Record<string, SlimProgram[]>;
  // Category-wide fallback, same "Not sure yet, keep it general" purpose
  // as fallbackLessons/fallbackConcepts above.
  fallbackPrograms: SlimProgram[];
  interviewPrepHrefByCareerId: Record<string, string>;
  categoryInterviewPrepHref?: string;
  // Every Exam Prep guide tied to each career: the exam written for
  // that career first (a journeyman license, the CPE), then any other
  // exam its career page links to (OSHA 10, NCCER Core...). Feeds the
  // practice-question task and gives each "pursue another certification"
  // round a specific credential to name.
  examsByCareerId: Record<string, ExamRef[]>;
  // The category's own exams -- used when no career is picked, and
  // appended after a career's own list.
  categoryExams: ExamRef[];
  // Title/href for every literal content id this category's skeleton
  // names in a step's `links` (see ActionPlanSchema), resolved here so
  // the browser never needs the full content set to render a link.
  linkRefs: Record<string, PlanResource>;
};

function resourceKindFor(node: AnyContent): ResourceKind {
  switch (node.type) {
    case "lesson":
      return "lesson";
    case "software":
      return "software";
    case "exam":
      return "examPrep";
    case "program":
      return "program";
    case "concept":
      return "concept";
    case "career":
      return "career";
    default:
      return "guide";
  }
}

export function buildActionPlanDataByCategory(): Record<string, CategoryData> {
  const { careers, getHiredGuides, resumes, lessons, concepts, software, interviews, exams, actionPlans, byId } =
    getAllContent();

  // Lessons in the Learning Blueprint's own recommended order (see
  // lib/lesson-order.ts), so a plan's lessons run foundation-first
  // instead of in whatever order the files happen to sort.
  const lessonRank = new Map(ORDERED_LESSON_SLUGS.map((slug, i) => [slug, i]));
  const orderedLessons = [...lessons].sort(
    (a, b) => (lessonRank.get(a.slug) ?? 999) - (lessonRank.get(b.slug) ?? 999)
  );

  const dataByCategory: Record<string, CategoryData> = {};
  for (const category of CAREER_CATEGORY_ORDER) {
    const categoryCareers = careers.filter((c) => c.category === category);
    const careerRefs: SlimCareer[] = categoryCareers.map((c) => ({
      id: c.id,
      title: c.title,
      slug: c.slug,
      // Entry-level pay, carried through for the Action Plan's "what to
      // expect to earn" note -- same already-sourced payTimeline.entry
      // the career page's own Pay expectations chart uses, never new or
      // separately-researched figures. Undefined for a career with no
      // payTimeline yet; the section just doesn't render (see
      // ActionPlanBuilder).
      entryPay: c.payTimeline
        ? {
            low: c.payTimeline.entry.low,
            high: c.payTimeline.entry.high,
            unit: c.payTimeline.unit,
            source: c.payTimeline.source,
            asOf: c.payTimeline.asOf,
          }
        : undefined,
      isEntryRole: c.isEntryRole,
    }));

    const lessonsByCareerId: Record<string, SlimLesson[]> = {};
    for (const career of categoryCareers) {
      // A link in either direction counts: the lesson naming the
      // career, or the career page naming the lesson. (Every trade's
      // career page links to the jobsite-safety lesson, but that lesson
      // doesn't list all nineteen trades back.)
      lessonsByCareerId[career.id] = orderedLessons
        .filter((l) => l.relatedIds.includes(career.id) || career.relatedIds.includes(l.id))
        .map((l): SlimLesson => ({ id: l.id, slug: l.slug, title: l.title, minutes: l.minutes }));
    }

    // Concepts tied to each specific career in this category -- same
    // "Go further" / glossary-source pool, keyed the same way lessons
    // are so the component can pick the right one once a career is
    // chosen. Concepts already carry relatedIds back to the careers they
    // cover (the same field Lessons use), so this reuses that link
    // rather than authoring any new per-career mapping.
    const conceptsByCareerId: Record<string, SlimConcept[]> = {};
    for (const career of categoryCareers) {
      // The career page's own curated picks (recommendedIds) lead, in
      // the order they were curated; everything else follows. The first
      // few of these become dated "get the vocabulary down" steps, so
      // the order decides which terms a visitor is told to learn first --
      // it used to be plain alphabetical.
      const curatedRank = new Map(career.recommendedIds.map((id, i) => [id, i]));
      conceptsByCareerId[career.id] = concepts
        .filter((c) => c.relatedIds.includes(career.id))
        .sort((a, b) => (curatedRank.get(a.id) ?? 999) - (curatedRank.get(b.id) ?? 999))
        .map((c): SlimConcept => ({ id: c.id, slug: c.slug, title: c.title, definition: c.definition }));
    }

    // Shown when a visitor picks "Not sure yet, keep it general" (no
    // specific career) -- any lesson tied to at least one career in this
    // category, deduped, so that path still gets real course
    // suggestions instead of an empty section.
    const categoryCareerIds = new Set(categoryCareers.map((c) => c.id));
    // Most widely shared first (a lesson five of this category's careers
    // link to beats one that a single career links to), Learning
    // Blueprint order as the tie-break.
    const lessonShare = (l: { id: string; relatedIds: string[] }) =>
      categoryCareers.filter((c) => l.relatedIds.includes(c.id) || c.relatedIds.includes(l.id)).length;
    const fallbackLessons: SlimLesson[] = orderedLessons
      .filter((l) => lessonShare(l) > 0)
      .map((l, i) => ({ l, i }))
      .sort((a, b) => lessonShare(b.l) - lessonShare(a.l) || a.i - b.i)
      .slice(0, 8)
      .map(({ l }): SlimLesson => ({ id: l.id, slug: l.slug, title: l.title, minutes: l.minutes }));

    // Software tied to each specific career in this category -- reuses
    // the career's own already-authored `software` id list (the same one
    // its own career page's Software section renders), not a new
    // per-career mapping authored just for this feature.
    const softwareByCareerId: Record<string, SlimSoftware[]> = {};
    for (const career of categoryCareers) {
      // career.software holds display names ("Bluebeam", "Scheduling
      // software (e.g. Primavera P6)"), not ids -- matched by name. The
      // old lookup-by-id here never matched a single career, which is
      // why no plan ever had a software step.
      const seen = new Set<string>();
      softwareByCareerId[career.id] = career.software
        .flatMap((name) => matchSoftwareByName(name, software))
        .filter((s) => (seen.has(s.id) ? false : (seen.add(s.id), true)))
        .map((s): SlimSoftware => ({ id: s.id, slug: s.slug, title: s.title, whatItIs: s.whatItIs }));
    }

    // Category-wide fallback, same "Not sure yet, keep it general"
    // purpose as fallbackLessons/fallbackConcepts -- any software tied
    // to at least one career in this category, deduped.
    const seenSoftwareIds = new Set<string>();
    const fallbackSoftware: SlimSoftware[] = [];
    outer: for (const career of categoryCareers) {
      for (const s of softwareByCareerId[career.id]) {
        if (seenSoftwareIds.has(s.id)) continue;
        seenSoftwareIds.add(s.id);
        fallbackSoftware.push(s);
        if (fallbackSoftware.length >= 6) break outer;
      }
    }

    // Same category-wide fallback, for concepts -- the ones the most
    // careers in this category share come first (a term eight trades
    // all link to is a better "learn this first" than whichever happens
    // to sort first alphabetically, which is what this used to return).
    const conceptShare = (c: { relatedIds: string[] }) => c.relatedIds.filter((id) => categoryCareerIds.has(id)).length;
    const fallbackConcepts: SlimConcept[] = concepts
      .filter((c) => conceptShare(c) > 0)
      .sort((a, b) => conceptShare(b) - conceptShare(a))
      .slice(0, 12)
      .map((c): SlimConcept => ({ id: c.id, slug: c.slug, title: c.title, definition: c.definition }));

    // Programs tied to each specific career in this category -- reuses
    // getProgramsForCareer (the same reverse lookup the career page's
    // "Training & Programs" box and the Programs finder use), not a new
    // per-career mapping authored just for this feature.
    const programsByCareerId: Record<string, SlimProgram[]> = {};
    for (const career of categoryCareers) {
      // Most specific first: a program written for this one trade (the
      // IBEW-NECA apprenticeship for an electrician) ahead of a
      // multi-trade program that merely includes it.
      programsByCareerId[career.id] = [...getProgramsForCareer(career.id)]
        .sort((a, b) => a.careerIds.length - b.careerIds.length)
        .map((p): SlimProgram => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        organization: p.organization,
        programType: p.programType,
        costNote: p.costNote,
        durationNote: p.durationNote,
      }));
    }

    // Same category-wide fallback as fallbackLessons/fallbackConcepts, for
    // programs -- any program tied to at least one career in this
    // category, deduped.
    const seenProgramIds = new Set<string>();
    const fallbackPrograms: SlimProgram[] = [];
    for (const career of categoryCareers) {
      for (const p of programsByCareerId[career.id]) {
        if (seenProgramIds.has(p.id)) continue;
        seenProgramIds.add(p.id);
        fallbackPrograms.push(p);
        if (fallbackPrograms.length >= 6) break;
      }
      if (fallbackPrograms.length >= 6) break;
    }

    const skeleton = actionPlans.find((a) => a.category === category);
    const getHiredGuide = getHiredGuides.find((g) => g.category === category);
    const resumeGuide = resumes.find((r) => r.category === category);

    // Interview Prep / Exam Prep guides, resolved per career where one
    // exists (e.g. project-manager's own interview guide, or a career-
    // specific exam like the journeyman electrician license), with a
    // category-wide guide as the fallback. Exam coverage especially is
    // uneven across careers -- several categories have none at all yet
    // -- so categoryExamPrepHref is often undefined, which is fine, the
    // section just doesn't render for that category (see
    // ActionPlanBuilder).
    const interviewPrepHrefByCareerId: Record<string, string> = {};
    for (const i of interviews) {
      if (i.careerId) interviewPrepHrefByCareerId[i.careerId] = `/interviews/${i.slug}`;
    }
    const categoryInterviewPrepHref = interviews.find((i) => !i.careerId && i.category === category);

    const toExamRef = (e: { title: string; slug: string; tier: string }): ExamRef => ({
      title: e.title,
      href: `/exams/${e.slug}`,
      entryLevel: e.tier === "free",
    });
    const liveExams = exams.filter((e) => !e.comingSoon);
    const examsByCareerId: Record<string, ExamRef[]> = {};
    for (const career of categoryCareers) {
      const own = liveExams.filter((e) => e.careerId === career.id);
      const linked = career.relatedIds
        .map((id) => liveExams.find((e) => e.id === id))
        .filter((e): e is NonNullable<typeof e> => Boolean(e) && !own.includes(e!));
      const all = [...own, ...linked];
      // An entry-level role leads with the credentials a newcomer can
      // actually earn now (OSHA 10 before a journeyman license); a role
      // people are promoted into leads with its own exam (the PMP).
      const ordered = career.isEntryRole
        ? [...all.filter((e) => e.tier === "free"), ...all.filter((e) => e.tier !== "free")]
        : all;
      examsByCareerId[career.id] = ordered.map(toExamRef);
    }
    // Category-wide exams (no single career attached), most widely
    // relevant first -- ranked by how many of this category's careers
    // link to each one, so OSHA 10 leads Field & Trades. An exam written
    // for one specific career only shows up for that career.
    const careerLinkCount = (examId: string) => categoryCareers.filter((c) => c.relatedIds.includes(examId)).length;
    const categoryExams = liveExams
      .filter((e) => !e.careerId && e.category === category)
      .sort((a, b) => careerLinkCount(b.id) - careerLinkCount(a.id))
      .map(toExamRef);

    // Literal ids named in the skeleton's step links -> label/href/kind.
    const linkRefs: Record<string, PlanResource> = {};
    const tokenSet = new Set<string>(ACTION_PLAN_LINK_TOKENS);
    for (const step of skeleton?.dayByDay ?? []) {
      for (const link of step.links) {
        if (tokenSet.has(link) || linkRefs[link]) continue;
        const node = byId.get(link);
        if (node) linkRefs[link] = { label: node.title, href: urlFor(node), kind: resourceKindFor(node) };
      }
    }

    dataByCategory[category] = {
      category,
      categorySlug: CATEGORY_SLUG[category],
      getHiredHref: getHiredGuide && !getHiredGuide.comingSoon ? urlFor(getHiredGuide) : undefined,
      careers: careerRefs,
      skeleton,
      getHiredGuide: getHiredGuide
        ? { whereToLook: getHiredGuide.whereToLook, credentialsToHaveReady: getHiredGuide.credentialsToHaveReady }
        : undefined,
      resumeGuide: resumeGuide ? { slug: resumeGuide.slug, exampleBullets: resumeGuide.exampleBullets } : undefined,
      lessonsByCareerId,
      fallbackLessons,
      softwareByCareerId,
      fallbackSoftware,
      conceptsByCareerId,
      fallbackConcepts,
      programsByCareerId,
      fallbackPrograms,
      interviewPrepHrefByCareerId,
      categoryInterviewPrepHref: categoryInterviewPrepHref ? `/interviews/${categoryInterviewPrepHref.slug}` : undefined,
      examsByCareerId,
      categoryExams,
      linkRefs,
    };
  }


  return dataByCategory;
}
