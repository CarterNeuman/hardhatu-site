// Nebraska state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Nebraska-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Nebraska";

const ELEC_BOARD: SourceRef = { label: "Nebraska State Electrical Board, licensing requirements", url: "https://electrical.nebraska.gov/node/44" };
const ELEC_ACT: SourceRef = { label: "Nebraska State Electrical Act (Neb. Rev. Stat. 81-2101 et seq.)", url: "https://electrical.nebraska.gov/sites/default/files/doc/2025-10-25%20STATE%20ACT%20REVISED%20VERSION.pdf" };
const PLUMBING_LAW: SourceRef = { label: "Neb. Rev. Stat. 18-1907, city and village plumbing boards", url: "https://nebraskalegislature.gov/laws/statutes.php?statute=18-1907" };
const LINCOLN_TRADES: SourceRef = { label: "City of Lincoln, becoming a licensed trade professional (plumbing and mechanical)", url: "https://www.lincoln.ne.gov/City/Departments/PDS/Building-Safety/Join-Our-Team/What-it-Takes-to-Become-a-Licensed-Trade-Professional" };
const ELEVATOR_LAW: SourceRef = { label: "Neb. Rev. Stat. 81-5,230, elevator mechanic and contractor licensing", url: "https://nebraskalegislature.gov/laws/statutes.php?statute=81-5,230" };
const SPRINKLER_CERT: SourceRef = { label: "Nebraska State Fire Marshal, Water-Based Fire Protection Contractor's Certification", url: "https://sfm.nebraska.gov/water-based-fire-protection" };
const CONTRACTOR_REG: SourceRef = { label: "Nebraska Department of Labor, Contractor Registration Act", url: "https://dol.nebraska.gov/LaborStandards/Contractors" };
const CAREER_SCHOLARSHIP: SourceRef = { label: "Nebraska Career Scholarship Program", url: "https://www.southeast.edu/nebraska-career-scholarship/" };
const APPRENTICESHIP_NE: SourceRef = { label: "Nebraska Department of Labor, Registered Apprenticeship", url: "https://dol.nebraska.gov/ReemploymentServices/EmployerResources/RegisteredApprenticeship" };

const MCC_CONSTRUCTION: TrainingOption = {
  name: "Metropolitan Community College, Construction Education Center",
  kind: "college",
  where: "Fort Omaha Campus, Omaha",
  detail: "Four-year registered apprenticeships in electrical (curriculum approved by the State Electrical Board) and plumbing (curriculum approved by the City of Omaha Plumbing Board), evening classes alongside paid work.",
  url: "https://mccneb.edu/Academics/Programs-of-Study/Construction/Apprenticeship-Programs.aspx",
};
const SCC_ELECTRICAL: TrainingOption = {
  name: "Southeast Community College, Electrical Construction",
  kind: "college",
  where: "Lincoln, with the Lincoln Electrical Joint Apprenticeship and Training Committee",
  detail: "720 classroom hours plus 8,000 hours on the job over four years; a certificate or an associate degree track. Completion satisfies the experience requirement for the state journeyman electrician exam.",
  url: "https://www.southeast.edu/electricianconstruction",
};
const SCC_PLUMBING: TrainingOption = {
  name: "Southeast Community College, Plumbing",
  kind: "college",
  where: "Lincoln",
  detail: "Classroom and lab training toward a plumbing career, alongside the hours a city license requires.",
  url: "https://www.southeast.edu/academics/info-sheets/Plumbing_infosheet.pdf",
};
const SCC_CONCRETE: TrainingOption = {
  name: "Southeast Community College, Concrete Construction",
  kind: "college",
  where: "Lincoln",
  detail: "Hands-on training in concrete flatwork, formwork and finishing.",
  url: "https://www.southeast.edu/concrete-construction",
};
const CCC_CONSTRUCTION: TrainingOption = {
  name: "Central Community College, Construction Technology",
  kind: "college",
  where: "Hastings",
  detail: "Certificates in design and estimating, interior finish carpentry, jobsite leadership and residential framing, plus diploma and two-year management tracks.",
  url: "https://cccneb.edu/?p=1235",
};
const CCC_WELDING: TrainingOption = {
  name: "Central Community College, Welding Technology",
  kind: "college",
  where: "Grand Island",
  detail: "A dedicated welding technology building with training in multiple welding processes.",
  url: "https://www.cccneb.edu/news/2026/march/gi-welding-tech-building-opens/",
};
const NORTHEAST_WELDING: TrainingOption = {
  name: "Northeast Community College, Welding",
  kind: "college",
  where: "Norfolk",
  detail: "A 16-week welding certificate or a two-semester diploma, with credits that count toward an associate degree.",
  url: "https://northeast.edu/Degrees-and-Programs/welding",
};
const ABC_CORNHUSKER: TrainingOption = {
  name: "ABC Nebraska-South Dakota (Cornhusker) Chapter",
  kind: "open-shop",
  where: "Lincoln and Omaha training centers",
  detail: "Open-shop apprenticeships and craft training, including an Electrical Core class offered at both training centers.",
  url: "https://www.abcnesd.org/",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noTradeLicense = (what: string) =>
  `Nebraska has no license for ${what}, and no state general contractor license either. Nearly every construction business must still register, not a skills-tested license, under the state's Contractor Registration Act.`;

export const NEBRASKA: StateGuide = {
  // Nebraska ZIP codes run 680xx-693xx.
  locationHints: { zip3: [[680, 693]], cities: ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney", "Fremont", "Norfolk", "Columbus"] },
  slug: "nebraska",
  code: "NE",
  name: S,
  lastVerified: "2026-11-21",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Nebraska long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=NE",
  },
  intro:
    "A field guide to 25 construction trades in Nebraska: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ about 53,600 people in Nebraska, and the state projects about 5,000 openings a year across them through 2034.",
    "Electricians and elevator mechanics are the only trades on this page with an individual state license. Fire sprinkler fitters work for a state-certified contracting business instead, with no separate fitter license.",
    "Plumbing and HVAC licensing happens at the city level, not the state. Omaha and Lincoln each run their own boards, exams and licenses.",
    "The Nebraska Career Scholarship Program can cover up to $5,000 a year, for up to three years, including tuition, tools and books, in trades programs like building construction, electrical, HVAC, plumbing and welding.",
    "Electricians are the fastest-growing trade on this page in Nebraska, projected to grow 16% through 2034.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "Nebraska Career Scholarship", value: "Up to $5,000", note: "Per year, up to 3 years, covering tuition, tools and books in trades programs including an IBEW electrician apprenticeship track" },
  licensingOverview:
    "Nebraska licenses individual workers in only two trades: electricians, through the State Electrical Board, and elevator mechanics, through the State Fire Marshal. Fire sprinkler work takes a state certification too, but it belongs to the contracting business, not a separate fitter license. Plumbing and HVAC licensing is local: Omaha, Lincoln and other cities run their own boards and exams, so the rules depend on where you work. Every other trade on this page has no license at the worker level, though nearly every construction business must register, without a skills test, under the state's Contractor Registration Act.",
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
      "Nebraska has no state general contractor license, so most businesses just register with the state, rather than passing a skills exam.",
      "You can start small. Many owners begin with one truck and side jobs before going full-time.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Working in Omaha or Lincoln on plumbing, HVAC or electrical work can mean a separate local license for each city.",
    ],
    path:
      "The usual route: work for someone else for years, earn your license or local certificate, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      CONTRACTOR_REG,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([10170, 11400, 12, 970]),
      stateLicense: "none",
      licenseSummary: "Nebraska has no license for construction laborers. It is the biggest trade on this page and the most common way into construction.",
      licenseAgency: CONTRACTOR_REG,
      training: [MCC_CONSTRUCTION, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([6920, 8010, 16, 750]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Nebraska requires electricians to hold a Journeyman Electrician license from the State Electrical Board: four years (8,000 hours) of verifiable experience, plus an exam. Less than 4,000 hours of Nebraska experience gets a Restricted license instead, which can't transfer to another state. A two-year electrical associate degree counts for a year of credit.",
      licenseSteps: [
        { title: "Apprentice", detail: "Register with the board and work under a licensed electrician. Hours count toward the journeyman requirement." },
        { title: "Journeyman Electrician", detail: "Four years (8,000 hours) of verifiable experience, plus the board's exam." },
        { title: "Restricted license (if under 4,000 Nebraska hours)", detail: "Valid in Nebraska, but doesn't reciprocate with the 13 states Nebraska has agreements with." },
        { title: "Contractor permit", detail: "Running an electrical business takes a separate contractor permit from the board." },
      ],
      licenseAgency: ELEC_BOARD,
      extraCredentials: ["Nebraska Journeyman Electrician license"],
      training: [SCC_ELECTRICAL, MCC_CONSTRUCTION, ABC_CORNHUSKER],
      businessNote: "Running an electrical business in Nebraska takes a separate contractor permit from the State Electrical Board.",
    }),
    t("equipment-operator", {
      outlook: ol([3230, 3420, 6, 290]),
      stateLicense: "none",
      licenseSummary: "Nebraska has no state license for equipment operators. Employers look for training records and safe hours in the seat, and crane operators need national certification under federal OSHA rules.",
      licenseAgency: CONTRACTOR_REG,
      training: [national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([4440, 4760, 7, 480]),
      stateLicense: "none",
      licenseSummary: "Nebraska has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      licenseAgency: CONTRACTOR_REG,
      training: [CCC_WELDING, NORTHEAST_WELDING],
    }),
    t("hvac-technician", {
      outlook: ol([3260, 3720, 14, 330]),
      stateLicense: "none",
      licenseSummary: "Nebraska has no state HVAC license. Cities license mechanical work locally; Omaha and Lincoln each run their own exams and mechanical journeyman requirements.",
      licenseSteps: [
        { title: "Helper or apprentice", detail: "Work for an HVAC company. EPA 608 certification is required to handle refrigerants." },
        { title: "Technician", detail: "Install and service systems on your own." },
        { title: "Local license", detail: "Cities like Omaha and Lincoln require a mechanical journeyman license or similar certificate to pull permits." },
        { title: "Run a shop", detail: "Meet each city's contractor licensing rules where you work." },
      ],
      licenseAgency: LINCOLN_TRADES,
      training: [MCC_CONSTRUCTION, ABC_CORNHUSKER],
      businessNote: "Running one in Nebraska takes the local mechanical licenses where you work, since the state issues none.",
    }),
    t("carpenter", {
      outlook: ol([8880, 9620, 8, 730]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("carpenters"),
      licenseAgency: CONTRACTOR_REG,
      training: [CCC_CONSTRUCTION, national("Carpenters union (UBC) training", "ubc-carpenter-apprenticeship", "Union carpentry apprenticeships.")],
    }),
    t("plumber", {
      outlook: ol([5090, 5540, 9, 480]),
      stateLicense: "none",
      licenseSummary:
        "Nebraska has no state plumbing license. State law lets any city or village set up its own plumbing board, exam and license, valid for work there. Omaha and Lincoln each run their own boards.",
      licenseSteps: [
        { title: "Apprentice", detail: "Work under a licensed plumber in the city where you're training." },
        { title: "Journeyman plumber", detail: "A local exam and license from the city or village board where you work." },
        { title: "Master plumber", detail: "A higher local license needed to run plumbing jobs." },
        { title: "Work in more places", detail: "Each city sets its own rules, so plumbers may hold more than one local license." },
      ],
      licenseAgency: PLUMBING_LAW,
      training: [SCC_PLUMBING, MCC_CONSTRUCTION, national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Five-year paid union apprenticeships in plumbing and pipefitting.")],
      ownBusiness: "Running a plumbing business in Nebraska takes a local master plumber license where you work, since the state issues none.",
    }),
    t("painter", {
      outlook: ol([2390, 2600, 9, 210]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("painters"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([3440, 3670, 7, 260]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("concrete finishers"),
      licenseAgency: CONTRACTOR_REG,
      training: [SCC_CONCRETE, LEARN_ON_JOB("Concrete and site contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([880, 970, 10, 70]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("drywall installers"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([60, 70, 12, 10]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Nebraska requires elevator mechanics to hold a license from the State Fire Marshal, and elevator contracting businesses need a separate contractor license. Applicants submit their experience with conveyances and consent to a criminal history check.",
      licenseAgency: ELEVATOR_LAW,
      extraCredentials: ["Nebraska elevator mechanic license"],
      training: [national("Elevator Constructors union (IUEC) training", "neiep-elevator-constructor-apprenticeship", "Union elevator apprenticeship through the National Elevator Industry Educational Program.")],
      ownBusiness: "Elevator companies need a Nebraska elevator contractor license from the State Fire Marshal, so most mechanics work for established companies.",
    }),
    t("flooring-installer", {
      outlook: ol([200, 230, 14, 20]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("flooring installers"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([460, 480, 6, 40]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("glaziers"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([220, 240, 9, 20]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("insulation installers"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([540, 590, 8, 50]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("ironworkers"),
      licenseAgency: CONTRACTOR_REG,
      ownBusiness: "Steel erection companies need heavy equipment and big insurance policies, so most ironworkers work for established firms.",
      training: [national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork.")],
    }),
    t("mason", {
      outlook: ol([510, 550, 8, 40]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("masons"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Masonry contractors"), national("Bricklayers union (BAC)", "bac-bricklayer-apprenticeship", "Union apprenticeships for brick, block and stone masons.")],
    }),
    t("millwright", {
      outlook: ol([360, 360, 2, 30]),
      stateLicense: "none",
      licenseSummary: "Nebraska has no state license for millwrights. Employers hire on training, experience and precision.",
      licenseAgency: CONTRACTOR_REG,
      training: [national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary: "Nebraska has no state pipefitter license. Industrial piping and hydronic work typically follows the same city mechanical licensing as HVAC, where a city requires one.",
      licenseAgency: LINCOLN_TRADES,
      ownBusiness: "Piping contractors need crews, insurance and the local licenses where they work.",
      training: [national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Five-year paid union apprenticeships in pipefitting.")],
    }),
    t("plasterer-stucco-mason", {
      stateLicense: "none",
      licenseSummary: noTradeLicense("plasterers"),
      licenseAgency: CONTRACTOR_REG,
      payNote: "Nebraska publishes no pay or job projection for this small trade, so this page shows the national figures.",
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([1930, 2160, 12, 160]),
      stateLicense: "none",
      licenseSummary: "Nebraska has no roofing-specific state license. Roofing businesses register under the state's general Contractor Registration Act, the same as any other construction business.",
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([510, 540, 7, 40]),
      stateLicense: "none",
      licenseSummary: "Nebraska has no state license for sheet metal workers. HVAC ductwork follows local mechanical licensing where a city requires one.",
      licenseAgency: CONTRACTOR_REG,
      training: [national("Sheet metal apprenticeships (SMART)", "smart-sheet-metal-apprenticeship", "Union sheet metal apprenticeships.")],
    }),
    t("solar-installer", {
      stateLicense: "none",
      licenseSummary: "Nebraska has no state solar license. The wiring side of a solar job is electrical work, which follows whatever electrical license applies to the job.",
      licenseAgency: CONTRACTOR_REG,
      payNote: "Nebraska publishes no pay or job projection for this small trade, so this page shows the national figures.",
      training: [SCC_ELECTRICAL],
    }),
    t("sprinkler-fitter", {
      stateLicense: "contractor",
      licenseSummary:
        "Nebraska has no individual fire sprinkler fitter license. Instead, the contracting business needs a Water-Based Fire Protection Contractor's Certification from the State Fire Marshal: at least $1 million in liability insurance, a $100 application fee, an exam on fire codes, and a Responsible Managing Employee who holds NICET Level III or IV in fire protection engineering or sprinkler layout.",
      licenseSteps: [
        { title: "Apprentice fitter", detail: "Work for a certified fire protection contractor." },
        { title: "Journey fitter", detail: "Install and test systems on your own." },
        { title: "NICET certification", detail: "National certifications in sprinkler layout or inspection; Level III or IV qualifies someone to be a contractor's Responsible Managing Employee." },
        { title: "Open a contracting business", detail: "The business needs the state's Water-Based Fire Protection Contractor's Certification." },
      ],
      licenseAgency: SPRINKLER_CERT,
      training: [national("Sprinkler Fitters union (UA)", "ua-sprinkler-fitter-apprenticeship", "Five-year registered apprenticeship through a signatory contractor.")],
    }),
    t("tile-setter", {
      outlook: ol([90, 100, 14, 10]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("tile setters"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: noTradeLicense("waterproofing installers"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Nebraska Career Scholarship Program",
      detail:
        "Nebraska's community colleges award scholarships of up to $5,000 a year, for up to three years, covering tuition, fees, tools, equipment and books for two-year programs in high-wage, high-skill, high-demand careers, including building construction, electrical (with an IBEW apprenticeship track), HVAC, plumbing and welding. Each college sets its own enrollment pace to finish within three years and its own academic-standing rule (Southeast Community College requires at least 9 credit hours a semester and a 2.0 GPA), plus a completed internship or apprenticeship before the final term.",
      source: CAREER_SCHOLARSHIP,
    },
  ],
  adults: [
    {
      title: "Registered Apprenticeship",
      detail: "Nebraska's Department of Labor promotes employer-based apprenticeships open to 16- and 17-year-olds as well as adults, and lists registered programs across the state.",
      source: APPRENTICESHIP_NE,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Nebraska statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Nebraska long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=NE" },
    { label: "Plasterers, no Nebraska wage or job data published (BLS via O*NET)", url: "https://www.onetonline.org/link/localwages/47-2161.00?st=NE" },
    { label: "Solar installers, no Nebraska wage data published (BLS via O*NET)", url: "https://www.onetonline.org/link/localwages/47-2231.00?st=NE" },
    ELEC_BOARD,
    ELEC_ACT,
    PLUMBING_LAW,
    LINCOLN_TRADES,
    ELEVATOR_LAW,
    SPRINKLER_CERT,
    CONTRACTOR_REG,
    CAREER_SCHOLARSHIP,
    APPRENTICESHIP_NE,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
