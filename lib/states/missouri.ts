// Missouri state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Missouri-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, UA_669, NEIEP, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Missouri";

const BOARDS: SourceRef = { label: "Missouri Division of Professional Registration, list of licensing boards (no plumbing, HVAC, roofing or general contractor board)", url: "https://pr.mo.gov/boards.asp" };
const ELEC_FAQ: SourceRef = { label: "Missouri Office of Statewide Electrical Contractors, FAQ (license is optional)", url: "https://pr.mo.gov/electricalcontractors-FAQ-Contractors.asp" };
const ELEC_LAW: SourceRef = { label: "RSMo 324.920, statewide electrical contractor license requirements", url: "https://revisor.mo.gov/main/OneSection.aspx?section=324.920" };
const PLUMBING_LAW: SourceRef = { label: "RSMo 341.010, plumber certificates in Missouri cities of 15,000 or more", url: "https://revisor.mo.gov/main/OneSection.aspx?section=341.010" };
const ELEVATOR: SourceRef = { label: "Missouri Division of Fire Safety, elevator safety program (mechanic and contractor licenses)", url: "https://dfs.dps.mo.gov/programs/elevator/" };
const ELEVATOR_RULE: SourceRef = { label: "11 CSR 40-5.170, Missouri elevator mechanic license qualifications", url: "https://law.cornell.edu/regulations/missouri/11-CSR-40-5-170" };
const KC_LICENSING: SourceRef = { label: "City of Kansas City, contractor licensing and certificates of qualification", url: "https://kcmo.gov/city-hall/departments/city-planning-development/contractor-licensing" };
const STL_SPRINKLER: SourceRef = { label: "City of St. Louis, sprinkler contractors and journeyman sprinkler fitter board", url: "https://www.stlouis-mo.gov/government/departments/public-safety/building/boards-of-examiners/sprinkler-contractors.cfm" };
const STL_PLUMBING: SourceRef = { label: "City of St. Louis, Plumbers and Drainlayers Board", url: "https://www.stlouis-mo.gov/government/departments/public-safety/building/boards-of-examiners/plumbers-drainlayers.cfm" };
const ASBESTOS: SourceRef = { label: "Missouri Department of Natural Resources, asbestos occupation certification", url: "https://dnr.mo.gov/air/business-industry/asbestos/occupation-certification" };
const A_PLUS: SourceRef = { label: "Missouri Department of Higher Education and Workforce Development, A+ Scholarship", url: "https://dhewd.mo.gov/ppc/grants-scholarships/a-plus" };
const DUAL_CREDIT: SourceRef = { label: "Missouri Dual Credit/Dual Enrollment Scholarship", url: "https://dhewd.mo.gov/node/1016" };
const CAREER_CENTERS: SourceRef = { label: "Missouri DESE, career education (area career centers)", url: "https://dese.mo.gov/college-career-readiness/career-education" };
const RYA: SourceRef = { label: "Missouri DESE, Registered Youth Apprenticeships", url: "https://dese.mo.gov/registered-youth-apprenticeships-rya" };
const FAST_TRACK: SourceRef = { label: "Missouri Fast Track Workforce Incentive Grant", url: "https://dhewd.mo.gov/initiatives/fast-track-workforce-incentive-grant/students" };
const APPRENTICESHIP_MO: SourceRef = { label: "Apprenticeship Missouri (24,883 active apprentices, Oct. 2026)", url: "https://dhewd.mo.gov/workforce-development/apprenticeship-mo" };
const JOB_CENTERS: SourceRef = { label: "Missouri Job Centers", url: "https://jobs.mo.gov/jobseeker/missouri-job-centers" };

const MO_ELECTRICAL_JATCS: TrainingOption = {
  name: "IBEW electrical apprenticeships",
  kind: "union",
  where: "St. Louis (IBEW Local 1), Kansas City (IBEW Local 124) and Springfield (IBEW Local 453)",
  detail: "Paid union electrical apprenticeships. Kansas City's program charges no tuition (books and tools only), and St. Louis apprentices can earn up to 49 college credit hours.",
  url: "https://kcjatc124.squarespace.com/programs",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const ABC_HOA: TrainingOption = {
  name: "ABC Heart of America apprenticeships",
  kind: "open-shop",
  where: "Kansas City and Fenton (Eastern Missouri)",
  detail: "Open-shop registered apprenticeships for electricians, plumbers, pipefitters, carpenters and construction laborers, plus HVAC, sheet metal and other crafts.",
  url: "https://abchoa.org/",
};
const STATE_TECH: TrainingOption = {
  name: "State Technical College of Missouri",
  kind: "college",
  where: "Linn",
  detail: "Programs in electrical technology, HVAC, heavy equipment operations, commercial construction and utility construction. 2026-27 tuition is $240 a credit hour plus fees for most programs.",
  url: "https://statetechmo.edu/program-segment/construction/",
};
const OTC: TrainingOption = {
  name: "Ozarks Technical Community College, Construction Technology",
  kind: "college",
  where: "Springfield",
  detail: "A one-year certificate and a two-year degree in construction technology.",
  url: "https://ozarkstech.edu/academics/construction-trades/about/",
};
const MCC_ATSI: TrainingOption = {
  name: "Metropolitan Community College, Advanced Technical Skills Institute",
  kind: "college",
  where: "Kansas City",
  detail: "Programs in building maintenance and construction, HVAC, industrial electrical, millwright and welding.",
  url: "https://mcckc.edu/ATSI",
};
const MO_CARPENTERS: TrainingOption = {
  name: "Mid-America Carpenters Regional Council",
  kind: "union",
  where: "St. Louis, Kansas City and Springfield (Local 978)",
  detail: "Four-year paid union carpentry apprenticeships, with one week of school every three months. Springfield apprentices can earn an OTC associate degree along the way.",
  url: "https://www.carpentersunion.org/wp-content/uploads/2022/03/NETSTLKCCarpenters.pdf",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noTradeLicense = (what: string) =>
  `Missouri has no state license for ${what}, and no state general contractor license either. Some cities and counties, like Kansas City and St. Louis County, license contractors locally.`;

export const MISSOURI: StateGuide = {
  // Missouri ZIP codes run 630xx-658xx (632, 642, 643 and 649 are not in use).
  locationHints: { zip3: [[630, 631], [633, 641], [644, 648], [650, 658]], cities: ["St. Louis", "Kansas City", "Springfield", "Columbia", "Jefferson City", "Joplin", "St. Joseph"] },
  slug: "missouri",
  code: "MO",
  name: S,
  lastVerified: "2026-11-19",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Missouri long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=MO",
  },
  intro:
    "A field guide to 25 construction trades in Missouri: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ about 119,500 people in Missouri, and the state projects about 10,500 openings a year across them through 2034.",
    "Missouri licenses very few trades at the state level. Electricians, plumbers, HVAC workers and sprinkler fitters are licensed by cities and counties like Kansas City, St. Louis and St. Louis County, so the rules depend on where you work.",
    "Elevator mechanics are the exception: they need a state license from the Division of Fire Safety.",
    "The A+ Scholarship can cover tuition at Missouri community and technical colleges for eligible high school graduates, after federal grants, up to $240 a credit hour in 2026-27.",
    "Missouri had about 24,900 active registered apprentices in October 2026, and high schoolers can start through Registered Youth Apprenticeships.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "A+ Scholarship", value: "Up to $240", note: "Per credit hour of tuition and fees at two-year and technical colleges, after federal grants (2026-27)" },
  licensingOverview:
    "Missouri leaves most trade licensing to cities and counties. State law has cities of 15,000 or more certify their own plumbers, and places like Kansas City, the City of St. Louis and St. Louis County license electricians, plumbers, pipefitters, mechanical workers and sprinkler fitters. The state's Office of Statewide Electrical Contractors offers an optional statewide electrical contractor license. The one required state trade license on this page is for elevator mechanics and elevator contractors, from the Division of Fire Safety. There is no state general contractor license.",
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
      "Missouri has no state general contractor license, so the license you need depends on the city or county you work in.",
      "You can start small. Many owners begin with one truck and side jobs before going full-time.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Working across several cities can mean several local licenses, each with its own exam and fees.",
    ],
    path:
      "The usual route: work for someone else for years, earn your license, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      BOARDS,
      KC_LICENSING,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([21770, 23620, 9, 1970]),
      stateLicense: "none",
      licenseSummary: "Missouri has no license for construction laborers. It is the biggest trade on this page and the most common way into construction.",
      licenseAgency: BOARDS,
      training: [ABC_HOA, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([17740, 18920, 7, 1680]),
      stateLicense: "none",
      licenseSummary:
        "Missouri has no state journeyman or master electrician license. Cities and counties, like Kansas City and St. Louis County, license electricians locally. The state offers an optional statewide electrical contractor license, which takes 12,000 hours of experience (less with an apprenticeship or degree), an exam and $500,000 in liability insurance.",
      licenseSteps: [
        { title: "Apprentice or helper", detail: "Work under a licensed electrician. No state license needed to start." },
        { title: "Local license", detail: "Your city or county sets its own experience and exam rules, and the license covers work there." },
        { title: "Master or contractor (local)", detail: "Lets you pull permits where you're licensed." },
        { title: "Statewide contractor (optional)", detail: "Cities and counties must accept it in place of their own contractor license and exam. They can still require a business license, permits and inspections, and may license the electricians who do the work." },
      ],
      licenseAgency: ELEC_FAQ,
      training: [MO_ELECTRICAL_JATCS, ABC_HOA, STATE_TECH, MCC_ATSI],
      businessNote: "Running one in Missouri takes the local licenses where you work, or the optional statewide electrical contractor license with $500,000 in liability insurance.",
    }),
    t("equipment-operator", {
      outlook: ol([10950, 11390, 4, 940]),
      stateLicense: "none",
      licenseSummary: "Missouri has no state license for equipment operators. Employers look for training records and safe hours in the seat, and crane operators need national certification under federal OSHA rules.",
      licenseAgency: BOARDS,
      training: [STATE_TECH, national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([11650, 12160, 4, 1200]),
      stateLicense: "none",
      licenseSummary: "Missouri has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      licenseAgency: BOARDS,
      training: [MCC_ATSI, STATE_TECH],
    }),
    t("hvac-technician", {
      outlook: ol([6510, 6840, 5, 580]),
      stateLicense: "none",
      licenseSummary: "Missouri has no state HVAC license. Cities and counties license mechanical work locally; Kansas City, for example, issues heating, refrigeration and gas appliance supervisor certificates.",
      licenseSteps: [
        { title: "Helper or apprentice", detail: "Work for an HVAC company. EPA 608 certification is required to handle refrigerants." },
        { title: "Technician", detail: "Install and service systems on your own." },
        { title: "Local certificate", detail: "Many cities require a mechanical license or supervisor certificate to pull permits." },
        { title: "Run a shop", detail: "Meet each city's contractor licensing rules where you work." },
      ],
      licenseAgency: KC_LICENSING,
      training: [STATE_TECH, MCC_ATSI, ABC_HOA],
      businessNote: "Running one in Missouri takes the local mechanical licenses where you work, since the state issues none.",
    }),
    t("carpenter", {
      outlook: ol([17060, 18220, 7, 1370]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("carpenters"),
      licenseAgency: BOARDS,
      training: [MO_CARPENTERS, ABC_HOA, OTC],
    }),
    t("plumber", {
      outlook: ol([7720, 7860, 2, 640]),
      stateLicense: "none",
      licenseSummary:
        "Missouri has no state plumbing license, but plumbing is still licensed. State law requires master and journeyman plumbers in cities of 15,000 or more to hold a certificate from the city's board, and larger counties license plumbers too.",
      licenseSteps: [
        { title: "Apprentice", detail: "Work under a licensed plumber. Some cities, like St. Louis, register apprentices." },
        { title: "Journeyman plumber", detail: "A certificate from your city or county board after experience and an exam." },
        { title: "Master plumber", detail: "A higher local certificate needed to run plumbing jobs." },
        { title: "Work in more places", detail: "Each city or county sets its own rules, so plumbers may hold more than one local license." },
      ],
      licenseAgency: PLUMBING_LAW,
      training: [ABC_HOA, national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Five-year paid union apprenticeships in plumbing and pipefitting.")],
      ownBusiness: "Running a plumbing business in Missouri takes a local master plumber certificate where you work, since the state issues none.",
    }),
    t("painter", {
      outlook: ol([6090, 6340, 4, 500]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("painters"),
      licenseAgency: BOARDS,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([3850, 3990, 4, 280]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("concrete finishers"),
      licenseAgency: BOARDS,
      training: [LEARN_ON_JOB("Concrete and site contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([780, 820, 4, 60]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("drywall installers"),
      licenseAgency: BOARDS,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([410, 370, -9, 20]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Missouri requires a state Elevator Mechanic license from the Division of Fire Safety to install, repair or maintain elevators. Level I covers all elevators; Level II covers lifts and smaller equipment. Mechanics qualify by finishing a registered elevator apprenticeship or with four years of experience plus a national exam. It is also the only trade on this page projected to shrink in Missouri.",
      licenseSteps: [
        { title: "Helper or apprentice", detail: "Work under the direct supervision of a licensed mechanic, who can oversee up to two helpers." },
        { title: "Training program", detail: "A registered elevator mechanic apprenticeship, like the union's NEIEP program." },
        { title: "Elevator Mechanic license", detail: "Level I or II from the Division of Fire Safety, $75 for two years." },
        { title: "Lead mechanic", detail: "Run installs and service on your own." },
      ],
      licenseAgency: ELEVATOR_RULE,
      extraCredentials: ["Missouri Elevator Mechanic license (Level I or II)"],
      training: [NEIEP],
      ownBusiness: "Elevator companies need a Missouri elevator contractor license, licensed mechanics and at least $1 million in liability insurance, so most mechanics work for established companies.",
    }),
    t("flooring-installer", {
      outlook: ol([1010, 1120, 11, 80]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("flooring installers"),
      licenseAgency: BOARDS,
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([860, 960, 11, 80]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("glaziers"),
      licenseAgency: BOARDS,
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([810, 840, 4, 70]),
      stateLicense: "none",
      licenseSummary: "Missouri has no state license for installing insulation. Removing old insulation that contains asbestos is different: that work takes a state asbestos certification.",
      licenseAgency: ASBESTOS,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([1300, 1380, 7, 110]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("ironworkers"),
      licenseAgency: BOARDS,
      ownBusiness: "Steel erection companies need heavy equipment and big insurance policies, so most ironworkers work for established firms.",
      training: [national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork.")],
    }),
    t("mason", {
      outlook: ol([2140, 2300, 8, 180]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("masons"),
      licenseAgency: BOARDS,
      training: [LEARN_ON_JOB("Masonry contractors"), national("Bricklayers union (BAC)", "bac-bricklayer-apprenticeship", "Union apprenticeships for brick, block and stone masons.")],
    }),
    t("millwright", {
      outlook: ol([580, 610, 6, 60]),
      stateLicense: "none",
      licenseSummary: "Missouri has no state license for millwrights. Employers hire on training, experience and precision.",
      licenseAgency: BOARDS,
      training: [MCC_ATSI, national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary: "Missouri has no state pipefitter license. Some local governments license pipefitters, including St. Louis County (journeyman and master pipefitter) and Kansas City (master pipe fitter).",
      licenseAgency: KC_LICENSING,
      ownBusiness: "Piping contractors need crews, insurance and the local licenses where they work.",
      training: [ABC_HOA, national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Five-year paid union apprenticeships in pipefitting.")],
    }),
    t("plasterer-stucco-mason", {
      outlook: ol([460, 480, 5, 40]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("plasterers"),
      licenseAgency: BOARDS,
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([3010, 3410, 13, 260]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("roofers"),
      licenseAgency: BOARDS,
      training: [ABC_HOA, LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([4060, 4220, 4, 350]),
      stateLicense: "none",
      licenseSummary: "Missouri has no state license for sheet metal workers. HVAC ductwork follows local mechanical licensing.",
      licenseAgency: BOARDS,
      training: [ABC_HOA, national("Sheet metal apprenticeships (SMART)", "smart-sheet-metal-apprenticeship", "Union sheet metal apprenticeships.")],
    }),
    t("solar-installer", {
      stateLicense: "none",
      licenseSummary: "Missouri has no state solar license. The wiring side of a solar job is electrical work, which follows local electrical licensing.",
      licenseAgency: BOARDS,
      payNote: "BLS doesn't publish Missouri figures for solar installers, so pay is the national figure, and Missouri has no projection for this small trade.",
      training: [MO_ELECTRICAL_JATCS],
    }),
    t("sprinkler-fitter", {
      stateLicense: "none",
      licenseSummary:
        "Missouri has no state fire sprinkler license. Some local governments license the work: the City of St. Louis licenses sprinkler contractors and journeyman sprinkler fitters, and St. Louis County and Kansas City have their own licenses.",
      licenseSteps: [
        { title: "Apprentice fitter", detail: "Work for a sprinkler contractor. Union apprenticeships run five years." },
        { title: "Journey fitter", detail: "Install and test systems on your own. Some cities require a journeyman sprinkler fitter license." },
        { title: "NICET certification", detail: "National certifications in sprinkler layout or inspection." },
        { title: "Contractor", detail: "A local sprinkler contractor license where the city requires one." },
      ],
      licenseAgency: STL_SPRINKLER,
      training: [UA_669],
      ownBusiness: "Opening a sprinkler company in Missouri takes the local sprinkler or fire protection licenses where you work, plus insurance.",
    }),
    t("tile-setter", {
      outlook: ol([720, 790, 10, 60]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("tile setters"),
      licenseAgency: BOARDS,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: noTradeLicense("waterproofing installers"),
      licenseAgency: BOARDS,
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "A+ Scholarship",
      detail:
        "Students who spend two years at an A+ high school, keep a 2.5 GPA and 95% attendance, do 50 hours of unpaid tutoring or mentoring, and pass the Algebra I end-of-course exam (or meet an ACT math alternative) can get tuition and general fees covered at Missouri community and technical colleges after federal grants, up to $240 a credit hour in 2026-27.",
      source: A_PLUS,
    },
    {
      title: "Area career centers",
      detail: "Missouri has 61 area career centers run by high school and community college districts, where students take construction and other technical programs.",
      source: CAREER_CENTERS,
    },
    {
      title: "Registered Youth Apprenticeships",
      detail: "High school students can join paid registered apprenticeships with employers and can earn credentials and college credit while still in school.",
      source: RYA,
    },
    {
      title: "Dual credit scholarship",
      detail: "Students with a 2.5 GPA and financial need, such as free or reduced-price lunch eligibility, can get dual credit tuition and fees covered.",
      source: DUAL_CREDIT,
    },
  ],
  adults: [
    {
      title: "Fast Track Workforce Incentive Grant",
      detail:
        "Adults 25 and older (or out of school for two years) without a bachelor's degree, and under the income limit, can get tuition and fees covered in high-demand programs. It also covers apprentices' tools, books and uniforms.",
      source: FAST_TRACK,
    },
    {
      title: "Apprenticeship Missouri",
      detail: "The state apprenticeship office lists registered programs; Missouri had about 24,900 active apprentices in October 2026.",
      source: APPRENTICESHIP_MO,
    },
    {
      title: "Missouri Job Centers",
      detail: "Free skills assessments, job search help, and help qualifying for paid skills training and on-the-job training.",
      source: JOB_CENTERS,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Missouri statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Plasterers, Missouri wages, May 2025 (BLS via O*NET)", url: "https://www.onetonline.org/link/localwages/47-2161.00?st=MO" },
    { label: "Solar installers, national wages, May 2025 (BLS; no Missouri estimate published)", url: "https://www.onetonline.org/link/localwages/47-2231.00?st=MO" },
    { label: "Missouri long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=MO" },
    BOARDS,
    ELEC_FAQ,
    ELEC_LAW,
    PLUMBING_LAW,
    STL_PLUMBING,
    ELEVATOR,
    ELEVATOR_RULE,
    KC_LICENSING,
    STL_SPRINKLER,
    A_PLUS,
    FAST_TRACK,
    APPRENTICESHIP_MO,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
