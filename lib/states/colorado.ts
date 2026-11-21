// Colorado state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Colorado-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, NEIEP, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Colorado";

const ELEC_BOARD: SourceRef = { label: "Colorado Division of Professions and Occupations, Electrical Board", url: "https://dpo.colorado.gov/Electrical/Applications" };
const ELEC_LAW: SourceRef = { label: "C.R.S. 12-115-110 and 12-115-115, Colorado electrician licensing", url: "https://colorado.public.law/statutes/crs_12-115-110" };
const PLUMBING_BOARD: SourceRef = { label: "Colorado Division of Professions and Occupations, Plumbing Board", url: "https://dpo.colorado.gov/Plumbing/Applications" };
const PLUMBING_LAW: SourceRef = { label: "C.R.S. 12-155-110, Colorado plumber licensing", url: "https://colorado.public.law/statutes/crs_12-155-110" };
const SPRINKLER_REG: SourceRef = { label: "Colorado Division of Fire Prevention and Control, sprinkler fitter registration", url: "https://dfpc.colorado.gov/sprinkler-fitters" };
const SPRINKLER_CONTRACTOR: SourceRef = { label: "Colorado Division of Fire Prevention and Control, fire suppression system contractors", url: "https://dfpc.colorado.gov/fire-suppression-system-contractors" };
const ELEVATOR_PROGRAM: SourceRef = { label: "Colorado Division of Oil and Public Safety, Conveyance Program", url: "https://ops.colorado.gov" };
const ELEVATOR_LAW: SourceRef = { label: "C.R.S. 9-5.5-107 and 9-5.5-108, Colorado conveyance licensing", url: "https://colorado.public.law/statutes/crs_9-5.5-107" };
const DORA_REGULATED_LIST: SourceRef = { label: "Colorado General Assembly, regulation of professions and occupations in Colorado (master list of what the state regulates)", url: "https://content.leg.colorado.gov/publications/regulation-professions-and-occupations-colorado" };
const DENVER_CONTRACTOR: SourceRef = { label: "City and County of Denver, contractor licensing", url: "https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Community-Planning-and-Development/Contractor-Licensing" };
const DENVER_HVAC: SourceRef = { label: "ServiceTitan, Colorado HVAC licensing overview (no state HVAC license; Denver's local classifications)", url: "https://www.servicetitan.com/licensing/hvac/colorado" };
const ROOFING_HISTORY: SourceRef = { label: "Colorado Roofing Association, legislative history (no state roofing license)", url: "https://www.coloradoroofing.org/member/legislative-issues" };
const CONCURRENT_ENROLLMENT: SourceRef = { label: "Colorado Department of Education, Concurrent Enrollment", url: "https://www.cde.state.co.us/postsecondary/concurrentenrollment" };
const CAREER_LAUNCH: SourceRef = { label: "Colorado Opportunity Scholarship Initiative, Career Launch Grant", url: "https://highered.colorado.gov/career-launch-grant" };

const ABC_RMC: TrainingOption = {
  name: "ABC Rocky Mountain, Construction Industry Training Council (CITC)",
  kind: "open-shop",
  where: "Statewide, based in the Denver area",
  detail: "Open-shop apprenticeships in carpentry, masonry, painting, sheet metal, plumbing, sprinkler fitting, electrical and pipefitting.",
  url: "https://www.abcrmc.org/Education/Apprenticeship-Program/Craft-Training-in-Colorado",
};
const EMILY_GRIFFITH: TrainingOption = {
  name: "Emily Griffith Technical College",
  kind: "college",
  where: "Denver",
  detail: "Building Construction Technology, a construction pre-apprenticeship program, and registered apprenticeship pathways.",
  url: "https://www.emilygriffith.edu/apprenticeship/",
};
const PIKES_PEAK: TrainingOption = {
  name: "Pikes Peak State College, Building Construction Technology",
  kind: "college",
  where: "Colorado Springs",
  detail: "A building construction technology program, with a Career Start pathway for high schoolers.",
  url: "https://www.pikespeak.edu/programs/building-construction-technology",
};
const PUEBLO_CC: TrainingOption = {
  name: "Pueblo Community College, Construction Training Program",
  kind: "college",
  where: "Pueblo, Fremont, Cortez and Mancos",
  detail: "Basic construction skills (safety, math, tools, blueprints, rigging, material handling), plus OSHA 10 and CPR certification, run with the state Attorney General's office.",
  url: "https://pueblocc.edu/cdot",
};
const IBEW_DENVER: TrainingOption = {
  name: "IBEW/NECA electrical apprenticeship",
  kind: "union",
  where: "Denver Joint Electric Apprenticeship Training Committee",
  detail: "Paid union electrical apprenticeship in the Denver area.",
  url: "https://classet.org/org/ibew-co",
  programSlug: "ibew-neca-electrical-apprenticeship",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noStateLicense = (what: string) =>
  `Colorado has no state license for ${what}, and no state general contractor license either. Some cities and counties, like Denver, Longmont and Boulder County, license contractors locally.`;

export const COLORADO: StateGuide = {
  // Colorado ZIP codes run 800xx-816xx.
  locationHints: { zip3: [[800, 816]], cities: ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Grand Junction", "Pueblo", "Boulder"] },
  slug: "colorado",
  code: "CO",
  name: S,
  lastVerified: "2026-11-21",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Colorado long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=CO",
  },
  intro:
    "A field guide to 25 construction trades in Colorado: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ about 125,000 people in Colorado, and the state projects about 13,800 openings a year across them through 2034, more than any other batch-7 state.",
    "Electricians and plumbers need a state license here, at residential, journeyman or master tiers. Fire sprinkler fitters register individually with the state too, and elevator mechanics need a state license.",
    "Colorado has no state HVAC license and no state general contractor license at all. Cities like Denver license contractors and HVAC work locally instead.",
    "Concurrent enrollment lets Colorado high schoolers take college courses at no tuition cost to them or their families; the school district pays the resident community college rate.",
    "Solar installers are the fastest-growing trade on this page in Colorado, projected to grow 38% through 2034, and every trade on this page is projected to grow.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "Concurrent enrollment tuition for high schoolers", value: "$0", note: "The school district pays the resident community college rate directly to the college" },
  licensingOverview:
    "Colorado licenses electricians and plumbers individually, at residential, journeyman and master tiers, through the State Electrical Board and the State Plumbing Board. Fire sprinkler fitters register individually with the Division of Fire Prevention and Control, and elevator mechanics need a state license from the Division of Oil and Public Safety's Conveyance Program. Colorado has no statewide HVAC license and no state general contractor license at all: cities and counties like Denver, Longmont and Boulder County license contractors locally instead. Every other trade on this page has no license at the worker or business level statewide, though local jurisdictions can still require a local contractor license.",
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
      "Colorado has no state general contractor license, so plenty of trades only need the local license where you work.",
      "You can start small. Many owners begin with one truck and side jobs before going full-time.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Working across several cities can mean several local licenses, since Denver and other jurisdictions don't always accept each other's licenses.",
    ],
    path:
      "The usual route: work for someone else for years, earn your license, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      DENVER_CONTRACTOR,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([25920, 31230, 21, 2770]),
      stateLicense: "none",
      licenseSummary: "Colorado has no license for construction laborers. It is the biggest trade on this page and the most common way into construction.",
      licenseAgency: DORA_REGULATED_LIST,
      training: [ABC_RMC, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([18050, 23640, 31, 2340]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Colorado requires electricians to hold a state license from the Electrical Board, at one of three tiers: Residential Wireman, Journeyman or Master. Journeyman takes 4 years of apprenticeship or practical experience (at least 2 in commercial or industrial work) plus 288 hours of safety and code training and an exam. Master takes an electrical engineering degree plus a year of experience, or a trade school credential plus 4 years, or a year beyond journeyman planning and supervising work, plus an exam.",
      licenseSteps: [
        { title: "Apprentice", detail: "Work under a licensed electrician while logging hours toward a license." },
        { title: "Residential Wireman (optional)", detail: "4,000 hours (2 years) of residential-only experience, plus an exam. Covers homes only, not commercial or industrial work." },
        { title: "Journeyman electrician", detail: "4 years of experience (at least 2 commercial or industrial), 288 hours of NEC and safety training, and the board's exam." },
        { title: "Master electrician", detail: "An engineering degree plus a year of experience, a trade school credential plus 4 years, or a year beyond journeyman supervising work, plus an exam." },
      ],
      licenseAgency: ELEC_BOARD,
      extraCredentials: ["Colorado journeyman or master electrician license"],
      training: [IBEW_DENVER, ABC_RMC, EMILY_GRIFFITH, PIKES_PEAK],
      businessNote: "Electrical contracting businesses need a licensed master electrician on staff.",
    }),
    t("equipment-operator", {
      outlook: ol([12390, 14380, 16, 1280]),
      stateLicense: "none",
      licenseSummary: "Colorado has no state license for equipment operators. Employers look for training records and safe hours in the seat, and crane operators need national certification under federal OSHA rules.",
      licenseAgency: DORA_REGULATED_LIST,
      training: [national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([4750, 5090, 7, 520]),
      stateLicense: "none",
      licenseSummary: "Colorado has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      licenseAgency: DORA_REGULATED_LIST,
      training: [ABC_RMC],
    }),
    t("hvac-technician", {
      outlook: ol([9440, 12110, 28, 1120]),
      stateLicense: "none",
      licenseSummary:
        "Colorado has no state HVAC license. Cities license mechanical work locally; Denver, for example, issues Heating & Ventilating Journeyman and Supervisor classifications, split by tonnage and whether the work is residential or commercial.",
      licenseSteps: [
        { title: "Helper or apprentice", detail: "Work for an HVAC company. EPA 608 certification is required to handle refrigerants." },
        { title: "Technician", detail: "Install and service systems on your own." },
        { title: "Local license", detail: "Cities like Denver require a journeyman or supervisor classification to pull permits." },
        { title: "Run a shop", detail: "Meet each city's contractor licensing rules where you work." },
      ],
      licenseAgency: DENVER_HVAC,
      training: [ABC_RMC, EMILY_GRIFFITH],
      businessNote: "Running one in Colorado takes the local mechanical licenses where you work, since the state issues none.",
    }),
    t("carpenter", {
      outlook: ol([17880, 21480, 20, 1860]),
      stateLicense: "none",
      licenseSummary: noStateLicense("carpenters"),
      licenseAgency: DENVER_CONTRACTOR,
      training: [ABC_RMC, EMILY_GRIFFITH, national("Carpenters union (UBC) training", "ubc-carpenter-apprenticeship", "Union carpentry apprenticeships.")],
    }),
    t("plumber", {
      outlook: ol([10460, 12830, 23, 1190]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Colorado requires plumbers to hold a state license from the Plumbing Board, at one of three tiers: Residential, Journeyworker or Master. Residential takes up to 3,400 hours (2 years) of practical experience. Journeyworker takes up to 6,800 hours (4 years) of practical experience and an exam. Master takes up to 8,500 hours (5 years) and a harder exam.",
      licenseSteps: [
        { title: "Apprentice", detail: "Work under a licensed plumber while logging hours toward a license." },
        { title: "Residential plumber (optional)", detail: "Up to 3,400 hours (2 years) of practical experience. Covers residential work only." },
        { title: "Journeyworker plumber", detail: "Up to 6,800 hours (4 years) of practical experience, plus a code-based exam." },
        { title: "Master plumber", detail: "Up to 8,500 hours (5 years) of practical experience, plus a harder exam." },
      ],
      licenseAgency: PLUMBING_BOARD,
      extraCredentials: ["Colorado journeyworker or master plumber license"],
      training: [ABC_RMC, national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Five-year paid union apprenticeships in plumbing and pipefitting.")],
      ownBusiness: "Running a plumbing business in Colorado takes a licensed master plumber on staff.",
    }),
    t("painter", {
      outlook: ol([5680, 6920, 22, 590]),
      stateLicense: "none",
      licenseSummary: noStateLicense("painters"),
      licenseAgency: DENVER_CONTRACTOR,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([5160, 6000, 17, 470]),
      stateLicense: "none",
      licenseSummary: noStateLicense("concrete finishers"),
      licenseAgency: DENVER_CONTRACTOR,
      training: [LEARN_ON_JOB("Concrete and site contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([2000, 2440, 22, 200]),
      stateLicense: "none",
      licenseSummary: noStateLicense("drywall installers"),
      licenseAgency: DENVER_CONTRACTOR,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([380, 470, 26, 40]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Colorado requires elevator mechanics to hold a license from the Conveyance Program (Division of Oil and Public Safety), separate from the license elevator contracting businesses need.",
      licenseAgency: ELEVATOR_LAW,
      extraCredentials: ["Colorado elevator mechanic license"],
      training: [NEIEP],
      ownBusiness: "Elevator companies need a Colorado conveyance contractor license, so most mechanics work for established companies.",
    }),
    t("flooring-installer", {
      outlook: ol([260, 330, 25, 30]),
      stateLicense: "none",
      licenseSummary: noStateLicense("flooring installers"),
      licenseAgency: DENVER_CONTRACTOR,
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([1920, 2350, 22, 220]),
      stateLicense: "none",
      licenseSummary: noStateLicense("glaziers"),
      licenseAgency: DENVER_CONTRACTOR,
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([970, 1180, 22, 110]),
      stateLicense: "none",
      licenseSummary: noStateLicense("insulation installers"),
      licenseAgency: DENVER_CONTRACTOR,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([1060, 1260, 19, 110]),
      stateLicense: "none",
      licenseSummary: noStateLicense("ironworkers"),
      licenseAgency: DORA_REGULATED_LIST,
      ownBusiness: "Steel erection companies need heavy equipment and big insurance policies, so most ironworkers work for established firms.",
      training: [national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork.")],
    }),
    t("mason", {
      outlook: ol([1250, 1520, 22, 140]),
      stateLicense: "none",
      licenseSummary: noStateLicense("masons"),
      licenseAgency: DENVER_CONTRACTOR,
      training: [LEARN_ON_JOB("Masonry contractors"), national("Bricklayers union (BAC)", "bac-bricklayer-apprenticeship", "Union apprenticeships for brick, block and stone masons.")],
    }),
    t("millwright", {
      outlook: ol([250, 280, 15, 20]),
      stateLicense: "none",
      licenseSummary: "Colorado has no state license for millwrights. Employers hire on training, experience and precision.",
      licenseAgency: DORA_REGULATED_LIST,
      training: [national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary: "Colorado has no distinct state pipefitter license. The Plumbing Board's license covers plumbing-scope piping; general industrial pipefitting outside that scope has no separate state credential.",
      licenseAgency: PLUMBING_BOARD,
      ownBusiness: "Mechanical and piping contractors need crews, insurance and, for plumbing-scope work, a licensed plumber on staff.",
      training: [national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Five-year paid union apprenticeships in pipefitting.")],
    }),
    t("plasterer-stucco-mason", {
      outlook: ol([710, 880, 23, 80]),
      stateLicense: "none",
      licenseSummary: noStateLicense("plasterers"),
      licenseAgency: DENVER_CONTRACTOR,
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([3840, 4830, 26, 400]),
      stateLicense: "none",
      licenseSummary:
        "Colorado has no state roofing license. A 2011 bill to register roofers died in the state Senate. State law does require a written contract with specific disclosures and a rescission right for residential roofing jobs. Some cities, like Denver, license roofing contractors locally.",
      licenseAgency: ROOFING_HISTORY,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([1660, 1930, 17, 180]),
      stateLicense: "none",
      licenseSummary: "Colorado has no state license for sheet metal workers. HVAC ductwork follows local mechanical licensing where a city requires one.",
      licenseAgency: DORA_REGULATED_LIST,
      training: [national("Sheet metal apprenticeships (SMART)", "smart-sheet-metal-apprenticeship", "Union sheet metal apprenticeships.")],
    }),
    t("solar-installer", {
      outlook: ol([650, 900, 38, 90]),
      stateLicense: "none",
      licenseSummary: "Colorado has no state solar installer license. The wiring side of a solar job is electrical work, which likely falls under the Electrical Board's jurisdiction, though a specific state citation for solar interconnection work wasn't found.",
      licenseAgency: ELEC_BOARD,
      training: [IBEW_DENVER],
    }),
    t("sprinkler-fitter", {
      stateLicense: "worker-certification",
      licenseSummary:
        "Colorado requires fire sprinkler fitters to register individually with the Division of Fire Prevention and Control: 8,000 hours of experience in the last 5 years, or completing an apprenticeship, plus a national exam (CSA ASCR2/ASCR4, the State Fitter Exam, or the UA STAR exam). Registration runs July 1 to June 30 and needs 24 hours of continuing education to renew.",
      licenseSteps: [
        { title: "Apprentice fitter", detail: "Work for a registered Fire Suppression Systems Contractor. Union apprenticeships run five years." },
        { title: "Registered sprinkler fitter", detail: "8,000 hours of experience or an apprenticeship, plus a national exam." },
        { title: "Keep it current", detail: "24 hours of continuing education each registration year." },
        { title: "Contractor", detail: "Opening a sprinkler business takes a separate Fire Suppression Systems Contractor registration." },
      ],
      licenseAgency: SPRINKLER_REG,
      training: [national("Sprinkler Fitters union (UA)", "ua-sprinkler-fitter-apprenticeship", "Five-year registered apprenticeship through a signatory contractor.")],
      businessNote: "Opening a sprinkler company in Colorado takes a separate Fire Suppression Systems Contractor registration.",
    }),
    t("tile-setter", {
      outlook: ol([710, 870, 24, 70]),
      stateLicense: "none",
      licenseSummary: noStateLicense("tile setters"),
      licenseAgency: DENVER_CONTRACTOR,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: noStateLicense("waterproofing installers"),
      licenseAgency: DENVER_CONTRACTOR,
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Concurrent enrollment",
      detail: "Colorado high schoolers can take college courses, including at community and technical colleges, at no tuition cost to them or their families. The school district pays the resident community college rate directly to the college under a cooperative agreement.",
      source: CONCURRENT_ENROLLMENT,
    },
  ],
  adults: [
    {
      title: "Career Launch Grant",
      detail: "The Colorado Opportunity Scholarship Initiative matches community scholarship dollars for career and technical training, including trades programs at community and technical colleges, through local nonprofit partners.",
      source: CAREER_LAUNCH,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Colorado statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Colorado long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=CO" },
    { label: "Plasterers, Colorado wages, May 2025 (BLS via O*NET)", url: "https://www.onetonline.org/link/localwages/47-2161.00?st=CO" },
    ELEC_BOARD,
    ELEC_LAW,
    PLUMBING_BOARD,
    PLUMBING_LAW,
    SPRINKLER_REG,
    SPRINKLER_CONTRACTOR,
    ELEVATOR_PROGRAM,
    ELEVATOR_LAW,
    DORA_REGULATED_LIST,
    DENVER_CONTRACTOR,
    ROOFING_HISTORY,
    CONCURRENT_ENROLLMENT,
    CAREER_LAUNCH,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
