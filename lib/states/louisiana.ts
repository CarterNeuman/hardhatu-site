// Louisiana state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Louisiana-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, UA_669, NEIEP, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Louisiana";

const LSLBC: SourceRef = {
  label: "Louisiana State Licensing Board for Contractors, types of licenses and dollar limits",
  url: "https://lslbc.louisiana.gov/types-of-licenses/",
};
const NO_JOURNEYMAN: SourceRef = {
  label: "ServiceTitan, Louisiana electricians: journeyman licenses are local; JATCs and ABC programs",
  url: "https://www.servicetitan.com/blog/electrician-schools-in-louisiana",
};
const PLUMBING_BOARD: SourceRef = { label: "State Plumbing Board of Louisiana", url: "https://spbla.com/" };
const OSFM: SourceRef = {
  label: "Louisiana Office of State Fire Marshal (conveyance device mechanic and fire sprinkler licensing)",
  url: "https://sfm.dps.louisiana.gov/",
};
const JUMP_START: SourceRef = {
  label: "Louisiana Department of Education, $1,000 Jump Start construction scholarships (Feb. 2025)",
  url: "https://doe.louisiana.gov/home/2025/02/14/1-000-statewide-construction-scholarships-available-for-jump-start-graduates",
};
const MJ_FOSTER: SourceRef = { label: "Louisiana Office of Student Financial Assistance, M.J. Foster Promise Program", url: "https://mylosfa.la.gov/students-parents/scholarships-grants/mjfoster/" };

const LCTCS: TrainingOption = {
  name: "Louisiana community and technical colleges (LCTCS)",
  kind: "college",
  where: "Campuses statewide, including Baton Rouge Community College, Delgado, Northshore Technical and Central Louisiana Technical",
  detail: "Certificates and short workforce programs in electrical, HVAC, welding, pipefitting and construction crafts. Adults 21 and over can apply for M.J. Foster Promise money to cover tuition.",
  url: "https://mybrcc.edu/mj_foster_promise/",
};
const ABC_PELICAN: TrainingOption = {
  name: "ABC Pelican Chapter training centers",
  kind: "open-shop",
  where: "Baton Rouge and Southwest Louisiana (Lake Charles)",
  detail: "NCCER craft training and registered apprenticeships in electrical, instrumentation, millwright, pipefitting, welding, heavy equipment and crane, mostly for industrial and plant work.",
  url: "https://www.1012industryreport.com/?p=123770",
};
const ABC_BAYOU: TrainingOption = {
  name: "ABC New Orleans/Bayou Chapter",
  kind: "open-shop",
  where: "6-acre training campus in St. Rose, serving 12 parishes of Southeast Louisiana",
  detail: "One of the largest apprenticeship and craft training programs in the state, including welding, electrical and pipefitting.",
  url: "https://bizneworleans.com/training-the-next-generation-of-builders/",
};
const LA_JATCS: TrainingOption = {
  name: "IBEW electrical JATCs",
  kind: "union",
  where: "New Orleans (Local 130), Baton Rouge (Local 995), Shreveport (Local 194), Monroe (Local 446) and Lake Charles",
  detail: "Paid union electrical apprenticeships run by IBEW locals and NECA contractors, about 8,000 hours on the job.",
  url: "https://www.servicetitan.com/blog/electrician-schools-in-louisiana",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const ACADIANA_PLUMBERS: TrainingOption = {
  name: "Acadiana Plumbers Association apprenticeship",
  kind: "open-shop",
  where: "Lafayette",
  detail: "Registered plumbing apprenticeship sponsored by area plumbing contractors.",
  url: "https://tradecolleges.org/apprenticeships-in/louisiana/plumbing",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noTradeLicense = (what: string) =>
  `Louisiana has no license for ${what}. Contractors need a state license on commercial jobs of $50,000 or more, and home improvement contractors must register on home jobs over $7,500.`;

export const LOUISIANA: StateGuide = {
  // Louisiana ZIP codes run 700xx-714xx.
  locationHints: { zip3: [[700, 714]], cities: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles", "Monroe"] },
  slug: "louisiana",
  code: "LA",
  name: S,
  lastVerified: "2026-11-16",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Louisiana long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=LA",
  },
  intro:
    "A field guide to 25 construction trades in Louisiana: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ about 111,000 people in Louisiana, and the state projects about 10,000 openings a year across them through 2034.",
    "Construction laborers are the biggest group by far: about 35,600 jobs, nearly a third of all the jobs on this page.",
    "Plumbers need a state license from the State Plumbing Board, from registered apprentice up to master. Electricians are licensed locally by parishes and cities.",
    "Jump Start, Louisiana's high school career program, lets students earn construction credentials, and graduates can apply for a $1,000 scholarship to keep training.",
    "Adults 21 and over can apply for M.J. Foster Promise money for construction training at a community or technical college.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "Jump Start construction scholarship", value: "$1,000", note: "For Jump Start graduates heading into LCTCS or ABC training" },
  licensingOverview:
    "Louisiana licenses plumbers statewide through the State Plumbing Board, and contractors through the State Licensing Board for Contractors: commercial work at $50,000, electrical, mechanical (HVAC) and plumbing work at $10,000, new homes at $75,000, and home improvement registration on jobs from $7,500 to $75,000. Electricians have no statewide journeyman license; parishes and cities issue those. The Office of State Fire Marshal licenses elevator mechanics and fire sprinkler companies.",
  overtimeNote:
    "Most of these jobs pay by the hour, and federal law requires time-and-a-half for hourly workers past 40 hours in a week. Overtime is common across these trades, and the pay figures on this page leave it out, so many workers earn more than shown. How much depends on the employer, the season and the project.",
  overtimeSource: { label: "U.S. Department of Labor, overtime pay under the Fair Labor Standards Act", url: "https://www.dol.gov/agencies/whd/overtime" },
  safety: {
    note:
      "Every one of these trades has real physical risk, and the industry takes it seriously: many employers and training programs start new workers with OSHA 10 safety training, and OSHA requires fall protection at 6 feet on construction sites. Falls are the leading cause of death in construction, 389 of 1,034 construction deaths in 2024.",
    source: { label: "OSHA Fall Prevention Campaign (BLS 2024 data)", url: "https://www.osha.gov/stop-falls" },
  },
  business: {
    lead:
      "Owning your own shop is a real path in every one of these trades, and it's how some tradespeople earn far more than any wage on this page. It's also where the most risk lives.",
    upside: [
      "Owners set their own prices and schedules. The pay figures on this page leave out the self-employed entirely, so they say nothing about what owners earn.",
      "Louisiana's state limits leave room to start small: home improvement registration starts at $7,500 jobs, and the full commercial license at $50,000.",
      "You can start small. Many owners begin with one truck and side jobs before going full-time.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Income swings with the season and the economy, and customers don't always pay on time.",
    ],
    path:
      "The usual route: work for someone else for years, earn your license, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      LSLBC,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([35610, 38580, 8, 3210]),
      stateLicense: "none",
      licenseSummary: "Louisiana has no license for construction laborers. It is the biggest trade on this page and the most common way into construction.",
      training: [ABC_BAYOU, ABC_PELICAN, LCTCS, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([11920, 13150, 10, 1190]),
      stateLicense: "contractor",
      licenseSummary:
        "Louisiana has no statewide journeyman or master electrician license; parishes and cities issue those. The State Licensing Board for Contractors licenses electrical contractors on commercial jobs of $10,000 or more.",
      licenseSteps: [
        { title: "Apprentice or helper", detail: "Work under a licensed electrician or contractor. No state license needed to start." },
        { title: "Local journeyman license", detail: "Your parish or city sets its own experience and exam rules." },
        { title: "Local master license", detail: "Lets you pull permits where you work." },
        { title: "State electrical contractor (optional)", detail: "Trade and business exams at the contractors board for commercial jobs of $10,000 or more." },
      ],
      licenseAgency: NO_JOURNEYMAN,
      training: [LA_JATCS, ABC_PELICAN, ABC_BAYOU, LCTCS],
      businessNote: "Contracting electrical work in Louisiana takes your parish or city license, plus the state electrical classification on commercial jobs of $10,000 or more.",
    }),
    t("equipment-operator", {
      outlook: ol([7630, 7960, 4, 660]),
      stateLicense: "none",
      licenseSummary: "Louisiana has no state license for equipment operators. Employers look for training records and safe hours in the seat, and some jobs need a commercial driver's license or crane certification.",
      training: [ABC_PELICAN, LCTCS, national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([13320, 14160, 6, 1410]),
      stateLicense: "none",
      licenseSummary: "Louisiana has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      training: [ABC_BAYOU, ABC_PELICAN, LCTCS],
    }),
    t("hvac-technician", {
      outlook: ol([5390, 5800, 8, 500]),
      stateLicense: "contractor",
      licenseSummary:
        "Louisiana licenses mechanical (HVAC) contractors through the State Licensing Board for Contractors on commercial jobs of $10,000 or more. Home jobs follow the home improvement rules and any local licenses. Technicians work under a licensed contractor.",
      licenseSteps: [
        { title: "Helper or apprentice", detail: "Work for an HVAC company. EPA 608 certification is required to handle refrigerants." },
        { title: "Technician", detail: "Install and service systems on your own." },
        { title: "Local license (small jobs)", detail: "Some parishes and cities require their own mechanical license to pull permits." },
        { title: "State mechanical contractor (optional)", detail: "Trade and business exams for commercial jobs of $10,000 or more." },
      ],
      licenseAgency: LSLBC,
      training: [LCTCS, ABC_BAYOU],
      businessNote: "Running an HVAC business in Louisiana takes the state mechanical classification for commercial jobs of $10,000 or more, plus home improvement registration on home jobs over $7,500.",
    }),
    t("carpenter", {
      outlook: ol([12300, 12960, 5, 960]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("carpenters"),
      training: [ABC_BAYOU, LCTCS, national("Carpenters union (UBC) training", "ubc-carpenter-apprenticeship", "Union carpentry apprenticeships.")],
      businessNote: "Building new homes worth $75,000 or more takes a Louisiana residential license.",
    }),
    t("plumber", {
      outlook: ol([10050, 10640, 6, 900]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Louisiana licenses plumbers statewide through the State Plumbing Board. Apprentices register with the board, and journeyman and master plumbers pass exams. Licenses renew every year with continuing education.",
      licenseSteps: [
        { title: "Registered apprentice", detail: "Register with the State Plumbing Board and work under a licensed plumber." },
        { title: "Residential plumber (optional)", detail: "About 3,000 hours in an apprenticeship program (4,000 without one), plus an exam. Covers homes only." },
        { title: "Journeyman plumber", detail: "About 7,000 hours in an apprenticeship program (8,000 without one), plus an exam." },
        { title: "Master plumber", detail: "Experience as a journeyman plus the master exam. Needed to run a plumbing business." },
      ],
      licenseAgency: PLUMBING_BOARD,
      extraCredentials: ["Louisiana journeyman or master plumber license"],
      training: [ACADIANA_PLUMBERS, ABC_BAYOU, national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Five-year paid union apprenticeships in plumbing and pipefitting.")],
      ownBusiness: "Running a plumbing business in Louisiana takes a master plumber license, plus the state plumbing contractor classification on commercial jobs of $10,000 or more.",
    }),
    t("painter", {
      outlook: ol([6200, 6460, 4, 510]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("painters"),
      training: [LEARN_ON_JOB("Painting and industrial coatings contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([990, 1000, 1, 70]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("concrete finishers"),
      training: [LEARN_ON_JOB("Concrete and site contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([520, 550, 4, 40]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("drywall installers"),
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      stateLicense: "worker-certification",
      licenseSummary:
        "Louisiana licenses elevator mechanics through the Office of State Fire Marshal, which issues conveyance device mechanic licenses. Most people get there through a union or employer training program.",
      licenseSteps: [
        { title: "Helper", detail: "Work under a licensed mechanic while you train." },
        { title: "Training program", detail: "The union's NEIEP program or a similar employer program." },
        { title: "Conveyance mechanic license", detail: "Apply to the State Fire Marshal once you meet the training and experience rules." },
        { title: "Lead mechanic", detail: "Run installs and service on your own." },
      ],
      licenseAgency: OSFM,
      extraCredentials: ["Louisiana conveyance device mechanic license"],
      payNote: "BLS doesn't publish Louisiana figures for elevator technicians, so pay is the national figure and there is no Louisiana job projection.",
      training: [NEIEP],
      ownBusiness: "Elevator work in Louisiana needs licensed mechanics, so most mechanics work for established elevator companies.",
    }),
    t("flooring-installer", {
      outlook: ol([100, 100, 8, 10]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("flooring installers"),
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([860, 870, 2, 70]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("glaziers"),
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([1220, 1270, 5, 100]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("insulation installers"),
      training: [LEARN_ON_JOB("Insulation contractors, including industrial insulators at plants")],
    }),
    t("ironworker", {
      outlook: ol([1620, 1800, 11, 150]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("ironworkers"),
      training: [national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork."), LEARN_ON_JOB("Steel erection contractors")],
    }),
    t("mason", {
      outlook: ol([380, 390, 4, 30]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("masons"),
      training: [LEARN_ON_JOB("Masonry contractors"), national("Bricklayers union (BAC)", "bac-bricklayer-apprenticeship", "Union apprenticeships for brick, block and stone masons.")],
    }),
    t("millwright", {
      outlook: ol([930, 970, 4, 90]),
      stateLicense: "none",
      licenseSummary: "Louisiana has no state license for millwrights. Employers hire on training, experience and precision, and much of the work is at plants and refineries.",
      training: [ABC_PELICAN, national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary: "Louisiana has no license for individual pipefitters. Mechanical and piping contractors need a state license on commercial jobs of $10,000 or more.",
      training: [ABC_PELICAN, ABC_BAYOU, national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Five-year paid union apprenticeships in pipefitting.")],
    }),
    t("plasterer-stucco-mason", {
      outlook: ol([60, 70, 3, 0]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("plasterers"),
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([890, 950, 6, 70]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("roofers who work for a contractor"),
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([940, 1000, 7, 80]),
      stateLicense: "none",
      licenseSummary: "Louisiana has no license for sheet metal workers. Ductwork contractors follow the state's mechanical contractor rules.",
      training: [national("Sheet metal apprenticeships (SMART)", "smart-sheet-metal-apprenticeship", "Union sheet metal apprenticeships."), LCTCS],
    }),
    t("solar-installer", {
      stateLicense: "none",
      licenseSummary: "Louisiana has no separate solar worker license. The wiring side of a solar job is electrical work, which follows local and state electrical licensing.",
      payNote: "BLS doesn't publish Louisiana figures for solar installers, so pay is the national figure, and Louisiana has no projection for this small trade.",
      training: [LA_JATCS],
    }),
    t("sprinkler-fitter", {
      stateLicense: "contractor",
      licenseSummary:
        "Louisiana's Office of State Fire Marshal licenses fire sprinkler companies. Each needs a qualified, certified person on staff and at least one licensed inspector. Fitters start by working for a licensed company.",
      licenseSteps: [
        { title: "Apprentice fitter", detail: "Work for a licensed sprinkler company. Union apprenticeships run five years." },
        { title: "Journey fitter", detail: "Installs and tests systems on your own." },
        { title: "NICET or inspector license", detail: "National certifications in layout or inspection, and the state's inspector license." },
        { title: "Qualifying person", detail: "The certified person a sprinkler company's state license depends on." },
      ],
      licenseAgency: OSFM,
      training: [UA_669],
      ownBusiness: "Opening a sprinkler company in Louisiana takes a State Fire Marshal license, a qualified certified person, a licensed inspector and insurance.",
    }),
    t("tile-setter", {
      outlook: ol([360, 420, 20, 30]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("tile setters"),
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: noTradeLicense("waterproofing installers"),
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Jump Start construction pathways",
      detail:
        "Jump Start is Louisiana's high school career program, where students earn industry credentials alongside a diploma. Jump Start graduates who earn a credential and plan to enroll full-time in an LCTCS construction program or ABC training can apply for a $1,000 Jump Start Construction Connect Scholars award (2025 deadline: April 30).",
      source: JUMP_START,
    },
    {
      title: "Build Your Future events",
      detail: "ABC chapters host hands-on career days. The Baton Rouge Build Your Future event drew about 700 high school students and 40 contractors.",
      source: { label: "ABC Pelican, Spring 2022 newsletter", url: "https://issuu.com/abcpelican/docs/spring_2022_newsletter" },
    },
  ],
  adults: [
    {
      title: "M.J. Foster Promise Program",
      detail:
        "State money for Louisiana residents 21 and older to earn short credentials or associate degrees in high-demand fields, including construction. Income limits apply, you agree to work in Louisiana for a year after, and awards are first come, first served, so apply early: the money has run short in past years.",
      source: MJ_FOSTER,
    },
    {
      title: "ABC training centers",
      detail: "ABC Pelican (Baton Rouge and Lake Charles) and ABC New Orleans/Bayou (St. Rose) run some of the state's largest craft training programs, mostly at night while you work.",
      source: { label: "ABC Pelican Baton Rouge Training Center graduation", url: "https://www.1012industryreport.com/?p=123770" },
    },
    {
      title: "Union electrical apprenticeships",
      detail: "IBEW training centers in New Orleans, Baton Rouge, Shreveport, Monroe and Lake Charles run paid electrical apprenticeships.",
      source: NO_JOURNEYMAN,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Louisiana statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Plasterers, Louisiana wages, May 2025 (BLS via O*NET)", url: "https://www.onetonline.org/link/localwages/47-2161.00?st=LA" },
    { label: "Solar installers and elevator technicians, national wages, May 2025 (BLS; no Louisiana estimate published)", url: "https://www.onetonline.org/link/localwages/47-2231.00?st=LA" },
    { label: "Louisiana long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=LA" },
    LSLBC,
    NO_JOURNEYMAN,
    PLUMBING_BOARD,
    OSFM,
    JUMP_START,
    MJ_FOSTER,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
