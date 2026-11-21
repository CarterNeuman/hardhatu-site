// North Dakota state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is North Dakota-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "North Dakota";

const ELEC_BOARD: SourceRef = { label: "North Dakota State Electrical Board (NDCC Chapter 43-09)", url: "https://ndlegis.gov/cencode/t43c09.pdf" };
const PLUMBING_BOARD: SourceRef = { label: "North Dakota State Board of Plumbing (NDCC Chapter 43-18)", url: "https://ndlegis.gov/cencode/t43c18.pdf" };
const PLUMBING_BOARD_PAGE: SourceRef = { label: "North Dakota State Board of Plumbing, licensing", url: "https://www.ndplumbingboard.gov/licensing-plumber-licensure" };
const CONTRACTOR_REG: SourceRef = { label: "North Dakota Secretary of State, contractor licensing (NDCC Chapter 43-07)", url: "https://sos.nd.gov/business/contractors" };
const FIRE_MARSHAL: SourceRef = { label: "North Dakota Office of the Fire Marshal, fire protection systems", url: "https://www.insurance.nd.gov/fire-marshal" };
const HVAC_EXAM: SourceRef = { label: "City of Fargo, State of North Dakota HVAC reciprocity exam", url: "https://fargond.gov/city-government/departments/inspections/code-requirements/heating-ventilation-air-conditioning-hvac-exams" };
const DUAL_CREDIT: SourceRef = { label: "North Dakota Dual Credit general information", url: "https://www.cde.nd.gov/dual-credit-general-informationfaq" };
const CAREER_BUILDERS: SourceRef = { label: "ND Career Builders (North Dakota University System)", url: "https://ndus.edu/career-builders/" };
const CTE_APPRENTICESHIP: SourceRef = { label: "ND Department of Career and Technical Education, apprenticeship resources", url: "https://cte.nd.gov/apprenticeship" };

const NDSCS_ELECTRICAL: TrainingOption = {
  name: "North Dakota State College of Science (NDSCS), Electrical Technology",
  kind: "college",
  where: "Wahpeton",
  detail: "Electrical Construction and Industrial Electrical A.A.S. degrees, with a third-year Electrical Master Technician option covering higher voltage, instrumentation and building controls.",
  url: "https://www.ndscs.edu/academics/academic-departments-programs/electrical-technology",
};
const BSC: TrainingOption = {
  name: "Bismarck State College",
  kind: "college",
  where: "Bismarck",
  detail: "Programs in welding, plumbing, electrician technician, heavy equipment operations and lineworker (electrical).",
  url: "https://bismarckstate.edu/academics/programs/",
};
const WSC: TrainingOption = {
  name: "Williston State College",
  kind: "college",
  where: "Williston",
  detail: "Welding Technology and Diesel Technology programs, serving the Bakken oil-patch region.",
  url: "https://willistonstate.edu/academics/Trades-Technology-/",
};
const ABC_MN_ND: TrainingOption = {
  name: "ABC of Minnesota and North Dakota apprenticeships",
  kind: "open-shop",
  where: "Statewide, based near Fargo",
  detail: "Open-shop registered apprenticeships across the building trades.",
  url: "https://www.mnabc.com/Education-Training/Apprentice-Resources",
};
const IBEW_DAKOTAS: TrainingOption = {
  name: "Dakotas and Western Minnesota Area Electrical JATC",
  kind: "union",
  where: "Fargo",
  detail: "A paid union electrical apprenticeship serving North Dakota, South Dakota and western Minnesota.",
  url: "https://electricaltrainingalliance.org/training/apprenticeshipTraining",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const CARPENTERS_ND: TrainingOption = {
  name: "Carpenters JATC (Bismarck-Mandan and Fargo-Moorhead)",
  kind: "union",
  where: "Bismarck-Mandan and Fargo-Moorhead",
  detail: "Union carpentry apprenticeships based in North Dakota's two largest metro areas.",
  url: "https://jobsnd.com/sites/www/files/documents/jsnd-documents/RegisteredApprenticeshipsinND062424.pdf",
  programSlug: "ubc-carpenter-apprenticeship",
};
const UA_300: TrainingOption = {
  name: "UA Local #300 of North Dakota and Eastern South Dakota",
  kind: "union",
  where: "Fargo",
  detail: "Union plumbing and pipefitting apprenticeship covering North Dakota and eastern South Dakota.",
  url: "https://jobsnd.com/sites/www/files/documents/jsnd-documents/RegisteredApprenticeshipsinND062424.pdf",
  programSlug: "ua-plumber-pipefitter-apprenticeship",
};
const SHEET_METAL_ND: TrainingOption = {
  name: "Sheet Metal JATC",
  kind: "union",
  where: "Bismarck",
  detail: "Union sheet metal apprenticeship serving North Dakota.",
  url: "https://jobsnd.com/sites/www/files/documents/jsnd-documents/RegisteredApprenticeshipsinND062424.pdf",
  programSlug: "smart-sheet-metal-apprenticeship",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noStateLicense = (what: string) =>
  `North Dakota has no license for ${what}, and no state general contractor license either. Anyone taking on a job worth more than $4,000 must still get a tiered contractor license from the Secretary of State, without a skills test.`;

export const NORTH_DAKOTA: StateGuide = {
  // North Dakota ZIP codes run 580xx-588xx.
  locationHints: { zip3: [[580, 588]], cities: ["Fargo", "Bismarck", "Grand Forks", "Minot", "Williston", "Dickinson", "Jamestown", "Mandan", "West Fargo", "Watford City"] },
  slug: "north-dakota",
  code: "ND",
  name: S,
  lastVerified: "2026-11-21",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "North Dakota long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=ND",
  },
  intro:
    "A field guide to 25 construction trades in North Dakota: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ roughly 25,800 people in North Dakota, with about 2,400 openings a year projected through 2034.",
    "Electricians and plumbers both need a state journeyman and master license here, through two different state boards.",
    "Construction laborers and equipment operators are the two biggest trades on this page, reflecting North Dakota's oil-patch and heavy-civil construction economy.",
    "ND Career Builders, a state university system scholarship and loan-repayment program, can pay up to $17,000 total for people in carpentry, plumbing or electrical, matched dollar-for-dollar with employer or donor funding.",
    "Electricians have the fastest projected growth and the most annual openings of any licensed trade here.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "ND Career Builders scholarship and loan repayment", value: "$17,000", note: "Combined lifetime cap, matched dollar-for-dollar with employer or donor funding; explicitly covers carpentry, plumbing and electrical" },
  licensingOverview:
    "North Dakota licenses electricians and plumbers individually through two separate state boards, each with apprentice, journeyman and master tiers. HVAC work is also licensed at the state level, though the exam is proctored locally by cities like Fargo. Elevator work needs a licensed elevator mechanic under the State Electrical Board's conveyance rules. Fire sprinkler work goes through a State Fire Marshal plan-review process rather than a clear individual license. Nearly every other trade on this page has no worker-level license, though almost anyone taking on a job worth more than $4,000 must get a tiered contractor license from the Secretary of State.",
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
      "Contractor registration in North Dakota is a single statewide system run by the Secretary of State, not a city-by-city patchwork.",
      "You can start small. Jobs under $4,000 don't need a contractor license at all.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Electrical and elevator contractors must carry substantial public liability insurance to pull permits.",
    ],
    path:
      "The usual route: work for someone else for years, earn your license, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      CONTRACTOR_REG,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([5150, 5650, 10, 480]),
      stateLicense: "none",
      licenseSummary: "North Dakota has no license for construction laborers. It is the biggest trade on this page and the most common way into construction, especially in the state's oil-patch construction economy.",
      licenseAgency: CONTRACTOR_REG,
      training: [ABC_MN_ND, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([3270, 3780, 15, 350]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "North Dakota requires electricians to hold a license from the State Electrical Board: journeyman (8,000 hours of experience over at least 3 years, plus board-approved apprenticeship or postsecondary training for anyone registered after January 2008), master (1 more year as a licensed journeyman), a Class B tier limited to farmstead and residential wiring, and a power-limited tier for low-voltage technology work.",
      licenseSteps: [
        { title: "Apprentice", detail: "Register with the board within your first six months on the job and work only under a licensed electrician's direct supervision." },
        { title: "Journeyman electrician", detail: "8,000 hours of installation and repair experience over at least 3 years, plus board-approved apprenticeship or postsecondary training, then an exam." },
        { title: "Class B electrician (optional)", detail: "A narrower license limited to farmstead and residential wiring, needing 18 months of that specific experience." },
        { title: "Master electrician", detail: "1 more year as a licensed journeyman, plus an exam." },
        { title: "Keep it current", detail: "Annual renewal, with continuing education required every two years." },
      ],
      licenseAgency: ELEC_BOARD,
      extraCredentials: ["North Dakota journeyman or master electrician license"],
      training: [IBEW_DAKOTAS, NDSCS_ELECTRICAL, ABC_MN_ND],
      businessNote: "Electrical contracting businesses must carry at least $500,000 in public liability insurance.",
    }),
    t("equipment-operator", {
      outlook: ol([4770, 5100, 7, 430]),
      stateLicense: "none",
      licenseSummary: "North Dakota has no state license for equipment operators. Employers look for training records and safe hours in the seat, and crane operators need national certification under federal OSHA rules. It is one of the largest trades in the state, driven by oil-patch and heavy-civil construction.",
      licenseAgency: CONTRACTOR_REG,
      training: [national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([2820, 3050, 8, 310]),
      stateLicense: "none",
      licenseSummary: "North Dakota has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      licenseAgency: CONTRACTOR_REG,
      training: [BSC, WSC],
    }),
    t("hvac-technician", {
      outlook: ol([1170, 1310, 12, 120]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "North Dakota licenses HVAC and mechanical work at the state level, with the exam proctored locally by cities like Fargo. A journeyman shows at least 6,000 hours of practical experience (education can count for up to half), and a master shows 10,000 hours total, including the journeyman hours.",
      licenseSteps: [
        { title: "Build hours", detail: "Work toward the practical-experience total; a mechanical trades program can count toward part of it." },
        { title: "Journeyman exam", detail: "Show at least 6,000 hours of practical experience, then pass the state's open-book exam on the current mechanical and fuel gas codes." },
        { title: "Master exam", detail: "Show 10,000 hours total, including your journeyman hours, then pass the master-level exam." },
      ],
      licenseAgency: HVAC_EXAM,
      extraCredentials: ["North Dakota journeyman or master mechanical license"],
      training: [BSC, NDSCS_ELECTRICAL],
      businessNote: "Running an HVAC business in North Dakota means passing the state exam in every city where you'll pull permits.",
    }),
    t("carpenter", {
      outlook: ol([3150, 3370, 7, 250]),
      stateLicense: "none",
      licenseSummary: noStateLicense("carpenters"),
      licenseAgency: CONTRACTOR_REG,
      training: [CARPENTERS_ND, ABC_MN_ND],
    }),
    t("plumber", {
      outlook: ol([1720, 1860, 8, 160]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "North Dakota requires plumbers to hold a license from the State Board of Plumbing: apprentice (registers with the board for a typically 4-year apprenticeship), journeyman, and master. Working for pay as a plumber without a license is against the law, though homeowners can do compliant work on a home they own and occupy.",
      licenseSteps: [
        { title: "Apprentice", detail: "Register with the board and work under a licensed plumber for a typically 4-year apprenticeship." },
        { title: "Journeyman plumber", detail: "Complete the apprenticeship, then pass the board's exam." },
        { title: "Master plumber", detail: "Additional experience as a journeyman, then pass the master exam." },
        { title: "Keep it current", detail: "Annual renewal, with continuing education required every two years." },
      ],
      licenseAgency: PLUMBING_BOARD,
      extraCredentials: ["North Dakota journeyman or master plumber license"],
      training: [UA_300, ABC_MN_ND],
      ownBusiness: "Firms installing plumbing where public water or sewer systems exist need a licensed master plumber in charge; journeymen may run installation businesses in cities under 1,000 people and in rural areas.",
    }),
    t("painter", {
      outlook: ol([610, 640, 5, 50]),
      stateLicense: "none",
      licenseSummary: noStateLicense("painters"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([1280, 1360, 6, 100]),
      stateLicense: "none",
      licenseSummary: noStateLicense("concrete finishers"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Concrete and site contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([70, 70, 5, 0]),
      stateLicense: "none",
      licenseSummary: noStateLicense("drywall installers"),
      licenseAgency: CONTRACTOR_REG,
      payNote: "This is a small trade in North Dakota, so year-to-year counts move in small, uneven steps.",
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      stateLicense: "worker-certification",
      licenseSummary:
        "North Dakota requires a licensed elevator mechanic for conveyance alterations, regulated by the State Electrical Board under its conveyance rules. Elevator contractors need a board permit before starting an installation or alteration, and conveyance owners must register their equipment with the board.",
      licenseAgency: ELEC_BOARD,
      extraCredentials: ["North Dakota licensed elevator mechanic"],
      training: [national("Elevator Constructors union (IUEC) training", "neiep-elevator-constructor-apprenticeship", "Union elevator apprenticeship through the National Elevator Industry Educational Program, administered through a Minnesota-based local serving North Dakota.")],
      ownBusiness: "Elevator work takes specialized tools, insurance and manufacturer relationships, so most mechanics work for established companies.",
    }),
    t("flooring-installer", {
      outlook: ol([110, 120, 10, 10]),
      stateLicense: "none",
      licenseSummary: noStateLicense("flooring installers"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([190, 200, 7, 20]),
      stateLicense: "none",
      licenseSummary: noStateLicense("glaziers"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([250, 260, 7, 20]),
      stateLicense: "none",
      licenseSummary: noStateLicense("insulation installers"),
      licenseAgency: CONTRACTOR_REG,
      training: [national("Heat and Frost Insulators union (HFIAW)", "hfiaw-insulator-apprenticeship", "A statewide asbestos and insulation workers local serving North Dakota.")],
    }),
    t("ironworker", {
      outlook: ol([270, 300, 9, 20]),
      stateLicense: "none",
      licenseSummary: noStateLicense("ironworkers"),
      licenseAgency: CONTRACTOR_REG,
      ownBusiness: "Steel erection companies need heavy equipment and big insurance policies, so most ironworkers work for established firms.",
      training: [national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork, administered through a Minnesota-based local serving North Dakota.")],
    }),
    t("mason", {
      outlook: ol([260, 280, 6, 20]),
      stateLicense: "none",
      licenseSummary: noStateLicense("masons"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Masonry contractors"), national("Bricklayers union (BAC)", "bac-bricklayer-apprenticeship", "Union apprenticeships for brick, block and stone masons.")],
    }),
    t("millwright", {
      outlook: ol([130, 130, 3, 10]),
      stateLicense: "none",
      licenseSummary: "North Dakota has no state license for millwrights. Employers hire on training, experience and precision.",
      licenseAgency: CONTRACTOR_REG,
      training: [national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "journeyman-and-master",
      licenseSummary: "North Dakota's State Board of Plumbing licenses pipefitting work alongside plumbing: apprentice, journeyman and master. Commercial and industrial piping work typically falls under the same journeyman or master plumber license rather than a separate pipefitter credential.",
      licenseAgency: PLUMBING_BOARD,
      extraCredentials: ["North Dakota journeyman or master plumber license"],
      ownBusiness: "Piping contractors need crews, insurance and a licensed plumber on staff.",
      training: [UA_300],
    }),
    t("plasterer-stucco-mason", {
      stateLicense: "none",
      licenseSummary: noStateLicense("plasterers"),
      licenseAgency: CONTRACTOR_REG,
      payNote: "North Dakota publishes no pay or projection data for this small trade, so this page shows the national figures.",
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([350, 380, 9, 30]),
      stateLicense: "none",
      licenseSummary: "North Dakota has no roofing-specific state license. Roofing businesses register under the state's general contractor-registration law, the same as any other construction business. Some cities, like Fargo, also require their own local re-roofing contractor's license.",
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([390, 420, 6, 30]),
      stateLicense: "none",
      licenseSummary: "North Dakota has no general state license for sheet metal workers. Ducted and mechanical work tied to HVAC systems may fall under the state's mechanical licensing, but structural and architectural metal work outside that scope has no separate license.",
      licenseAgency: HVAC_EXAM,
      training: [SHEET_METAL_ND],
    }),
    t("solar-installer", {
      stateLicense: "none",
      licenseSummary: "North Dakota has no state solar installer license. The wiring side of a solar job likely falls under the State Electrical Board's jurisdiction over electrical installations, though a specific state citation for solar interconnection work wasn't found.",
      licenseAgency: ELEC_BOARD,
      training: [NDSCS_ELECTRICAL],
    }),
    t("sprinkler-fitter", {
      stateLicense: "none",
      licenseSummary: "North Dakota's licensing for fire sprinkler work is unclear: the State Fire Marshal's office reviews fire protection system plans before installation, but this appears to be a plan-review and permitting process rather than a dedicated individual installer license.",
      licenseAgency: FIRE_MARSHAL,
      training: [national("Sprinkler Fitters union (UA)", "ua-sprinkler-fitter-apprenticeship", "Five-year registered apprenticeship through a signatory contractor; Fargo-based fire protection companies are registered apprenticeship sponsors in North Dakota.")],
    }),
    t("tile-setter", {
      outlook: ol([100, 110, 15, 10]),
      stateLicense: "none",
      licenseSummary: noStateLicense("tile setters"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: noStateLicense("waterproofing installers"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "North Dakota Dual Credit",
      detail: "North Dakota's statewide dual-credit framework, run with the university system and the state's CTE office, lets high schoolers take college-level Trade and Industry coursework alongside their diploma.",
      source: DUAL_CREDIT,
    },
  ],
  adults: [
    {
      title: "ND Career Builders",
      detail: "A North Dakota University System scholarship and loan-repayment program, matched dollar-for-dollar with employer or donor funding, up to a combined $17,000 per person. Explicitly covers carpentry, plumbing and electrical technology among its skilled-trades occupations. Recipients agree to live and work in North Dakota for 3 years after finishing.",
      source: CAREER_BUILDERS,
    },
    {
      title: "ND Apprenticeship resources",
      detail: "North Dakota's Department of Career and Technical Education and Job Service North Dakota jointly coordinate registered apprenticeships, run as a partnership rather than through one dedicated state apprenticeship agency.",
      source: CTE_APPRENTICESHIP,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, North Dakota statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "North Dakota long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=ND" },
    ELEC_BOARD,
    PLUMBING_BOARD,
    PLUMBING_BOARD_PAGE,
    CONTRACTOR_REG,
    FIRE_MARSHAL,
    HVAC_EXAM,
    DUAL_CREDIT,
    CAREER_BUILDERS,
    CTE_APPRENTICESHIP,
    { label: "Job Service North Dakota, registered apprenticeship sponsors (06/24/24)", url: "https://jobsnd.com/sites/www/files/documents/jsnd-documents/RegisteredApprenticeshipsinND062424.pdf" },
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
