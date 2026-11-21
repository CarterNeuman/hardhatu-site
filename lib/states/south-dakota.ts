// South Dakota state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is South Dakota-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "South Dakota";

const ELEC_COMMISSION: SourceRef = { label: "South Dakota Electrical Commission (SDCL Chapter 36-16)", url: "https://dlr.sd.gov/electrical/licensing.aspx" };
const PLUMBING_COMMISSION: SourceRef = { label: "South Dakota Plumbing Commission (SDCL Chapter 36-25)", url: "https://dlr.sd.gov/plumbing/licensing.aspx" };
const EXCISE_TAX: SourceRef = { label: "South Dakota Contractor's Excise Tax License, Dept. of Revenue", url: "https://dor.sd.gov/businesses/taxes/contractors-excise-tax/" };
const BTP_SPRINKLER: SourceRef = { label: "South Dakota Board of Technical Professions, fire protection system technician rule (ARSD 20:38:38:03)", url: "https://www.law.cornell.edu/regulations/south-dakota/ARSD-20-38-38-03" };
const SIOUX_FALLS_ROOFING: SourceRef = { label: "City of Sioux Falls, Residential Roofing & Repair Contractor license", url: "https://www.siouxfalls.gov/business-permits/permits-licenses-inspections/licensing/contractor-licensing/roof-repair-contractor" };
const BUILD_DAKOTA: SourceRef = { label: "Build Dakota Scholarship", url: "https://www.southeasttech.edu/costs-financial-aid/scholarships/build-dakota.php" };
const OJT_SD: SourceRef = { label: "South Dakota DLR, On-the-Job Training (OJT)", url: "https://dlr.sd.gov/workforce_services/businesses/workforce_training.aspx" };
const LATC_DUAL: SourceRef = { label: "Lake Area Technical College, dual credit", url: "https://www.lakeareatech.edu/academics/dual-credit/" };

const LAKE_AREA_TECH: TrainingOption = {
  name: "Lake Area Technical College, Building Trades Technology",
  kind: "college",
  where: "Watertown",
  detail: "An 18-to-24-month A.A.S. covering the full residential build process, from site prep through finishing, with students building an actual custom home; graduates also earn OSHA 10 and CPR certifications.",
  url: "https://www.lakeareatech.edu/programs/explore-programs/building-trades-technology/",
};
const SOUTHEAST_TECH: TrainingOption = {
  name: "Southeast Technical College",
  kind: "college",
  where: "Sioux Falls",
  detail: "Construction Management Technology, plus Electrician, HVAC/R, Plumbing and Welding programs, and a summer Construction Career Academy for high schoolers.",
  url: "https://www.southeasttech.edu/programs/construction/",
};
const WESTERN_DAKOTA_TECH: TrainingOption = {
  name: "Western Dakota Technical College",
  kind: "college",
  where: "Rapid City",
  detail: "Construction Technology, Electrical Trades, HVAC & Refrigeration Technology, and Plumbing Technology programs serving western South Dakota.",
  url: "https://www.wdt.edu/degree-programs/construction-and-manufacturing/",
};
const AGC_SD_CARPENTRY: TrainingOption = {
  name: "AGC of South Dakota Carpentry Apprentice Program",
  kind: "open-shop",
  where: "Statewide",
  detail: "The only approved carpentry apprenticeship in South Dakota, with articulation agreements into the state's technical colleges and high schools.",
  url: "https://recruit.agc.org/agcsdbuild/?p=11",
};
const IBEW_SD: TrainingOption = {
  name: "IBEW electrical apprenticeship",
  kind: "union",
  where: "Sioux Falls and Rapid City",
  detail: "A paid union electrical apprenticeship serving South Dakota's two largest metros.",
  url: "https://electricaltrainingalliance.org/training/apprenticeshipTraining",
  programSlug: "ibew-neca-electrical-apprenticeship",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noStateLicense = (what: string) =>
  `South Dakota has no state license for ${what}, and no state general contractor license either. Nearly everyone doing construction work still needs a Contractor's Excise Tax License from the Department of Revenue, a 2% tax registration rather than a skills test.`;

export const SOUTH_DAKOTA: StateGuide = {
  // South Dakota ZIP codes run 570xx-577xx.
  locationHints: { zip3: [[570, 577]], cities: ["Sioux Falls", "Rapid City", "Aberdeen", "Pierre", "Watertown", "Brookings", "Mitchell", "Yankton"] },
  slug: "south-dakota",
  code: "SD",
  name: S,
  lastVerified: "2026-11-21",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "South Dakota long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=SD",
  },
  intro:
    "A field guide to 25 construction trades in South Dakota: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ roughly 24,900 people in South Dakota, with about 2,600 openings a year projected through 2034.",
    "South Dakota licenses almost nothing at the state level: only electricians and plumbers need an individual state license. Nearly every other trade, including HVAC, roofing and general contracting, has no state trade license at all.",
    "Instead, almost anyone doing construction work needs a Contractor's Excise Tax License, a 2% tax on construction gross receipts rather than a skills test.",
    "Carpenters are by far the largest trade here, about 1.5 times the size of welders, the next-biggest trade.",
    "The Build Dakota Scholarship covers 100% of tuition, fees, books and tools at any of the state's four technical colleges, for students who commit to work in South Dakota for 3 years after graduating.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "Build Dakota Scholarship", value: "100%", note: "Of tuition, fees, books and tools at South Dakota's four technical colleges, for students who commit to work in-state for 3 years after graduating" },
  licensingOverview:
    "South Dakota is one of a small number of states with no state license requirement for general contractors, HVAC technicians, roofers, or almost any trade except electrician and plumber. The Electrical Commission and Plumbing Commission each run their own apprentice-through-contractor ladders, but HVAC, roofing and general construction are regulated city by city, if at all (mainly in Sioux Falls and Rapid City). Nearly everyone doing construction work still needs a statewide Contractor's Excise Tax License from the Department of Revenue, a 2% tax on gross receipts rather than a skills test.",
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
      "With almost no state trade licensing, South Dakota has one of the lowest regulatory barriers to starting a construction business of any state on this site.",
      "The Contractor's Excise Tax License is a single statewide registration, not a patchwork of trade exams.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Sioux Falls and Rapid City each run their own separate local licensing systems, so a business working in both cities needs to qualify twice.",
    ],
    path:
      "The usual route: work for someone else for years, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      EXCISE_TAX,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([2330, 2640, 13, 230]),
      stateLicense: "none",
      licenseSummary: "South Dakota has no license for construction laborers. It is one of the most common ways into construction here.",
      licenseAgency: EXCISE_TAX,
      training: [national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([3090, 3580, 16, 330]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "South Dakota requires electricians to hold a license from the Electrical Commission: apprentice, journeyman (4 years or 8,000 hours under an electrical contractor's supervision), and electrical contractor (2 more years and 4,000 additional hours, including at least 2,000 commercial hours). South Dakota doesn't use the title 'master electrician'; electrical contractor is the top individual tier.",
      licenseSteps: [
        { title: "Apprentice electrician", detail: "Register and work under a licensed electrical contractor's employment and supervision." },
        { title: "Journeyman electrician", detail: "4 years or 8,000 hours as a licensed apprentice, then an exam." },
        { title: "Class B electrician (optional)", detail: "A narrower license tier; the Commission's own site doesn't spell out its exact scope, so ask the Commission directly if this is the right fit." },
        { title: "Electrical contractor", detail: "2 more years and 4,000 additional hours as a journeyman, including at least 2,000 commercial hours, then an exam." },
        { title: "Keep it current", detail: "Biennial renewal with 16 hours of continuing education, including at least 8 code hours." },
      ],
      licenseAgency: ELEC_COMMISSION,
      extraCredentials: ["South Dakota journeyman electrician or electrical contractor license"],
      training: [IBEW_SD, SOUTHEAST_TECH],
      businessNote: "Electrical contractor and Class B applicants must file a notarized bond with the Commission.",
    }),
    t("equipment-operator", {
      outlook: ol([2360, 2630, 12, 230]),
      stateLicense: "none",
      licenseSummary: "South Dakota has no state license for equipment operators. Employers look for training records and safe hours in the seat, and crane operators need national certification under federal OSHA rules.",
      licenseAgency: EXCISE_TAX,
      training: [national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([3780, 4160, 10, 420]),
      stateLicense: "none",
      licenseSummary: "South Dakota has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS). It's an unusually large trade here, the second-biggest on this page.",
      licenseAgency: EXCISE_TAX,
      training: [LAKE_AREA_TECH, SOUTHEAST_TECH],
    }),
    t("hvac-technician", {
      outlook: ol([1210, 1370, 14, 120]),
      stateLicense: "none",
      licenseSummary:
        "South Dakota has no statewide HVAC license; licensing is entirely local. Sioux Falls requires a Mechanical Contractor license (4 years of experience, an exam, a $10,000 bond). Rapid City runs its own separate system with apprentice, installer and contractor tiers. Elsewhere in the state, there may be no license requirement at all.",
      licenseAgency: EXCISE_TAX,
      training: [SOUTHEAST_TECH, WESTERN_DAKOTA_TECH],
      businessNote: "Running an HVAC business means qualifying separately in Sioux Falls and Rapid City, since the two cities don't share a licensing system.",
    }),
    t("carpenter", {
      outlook: ol([5920, 6480, 10, 500]),
      stateLicense: "none",
      licenseSummary: "South Dakota has no state license for carpenters. It is the single largest trade on this page, employing about 1.5 times as many people as the next-largest trade.",
      licenseAgency: EXCISE_TAX,
      training: [AGC_SD_CARPENTRY, LAKE_AREA_TECH],
    }),
    t("plumber", {
      outlook: ol([1980, 2180, 10, 190]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "South Dakota requires plumbers to hold a license from the Plumbing Commission: apprentice, third-year apprentice (can work unsupervised on single-family homes after an exam), plumber (4 years at 1,900+ hours a year), and plumbing contractor (6 years total, at least 2 as a contractor or plumber). South Dakota uses 'plumber' and 'plumbing contractor' rather than 'journeyman' and 'master.'",
      licenseSteps: [
        { title: "Apprentice plumber", detail: "Register and work under a licensed plumber or contractor." },
        { title: "Third-year apprentice", detail: "2 years (3,800 hours) of experience, then an exam allows unsupervised work on single-family homes." },
        { title: "Plumber", detail: "4 years as an apprentice at 1,900-plus hours a year, then an exam." },
        { title: "Plumbing contractor", detail: "6 years total, with at least 2 as a contractor or plumber, then an exam." },
      ],
      licenseAgency: PLUMBING_COMMISSION,
      extraCredentials: ["South Dakota plumber or plumbing contractor license"],
      training: [SOUTHEAST_TECH, national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Paid union apprenticeships in plumbing and pipefitting.")],
      ownBusiness: "Running a plumbing business in South Dakota takes a licensed plumbing contractor with 6 years of experience and a passing exam score.",
    }),
    t("painter", {
      outlook: ol([1040, 1120, 8, 90]),
      stateLicense: "none",
      licenseSummary: noStateLicense("painters"),
      licenseAgency: EXCISE_TAX,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([2210, 2420, 10, 180]),
      stateLicense: "none",
      licenseSummary: noStateLicense("concrete finishers"),
      licenseAgency: EXCISE_TAX,
      training: [LEARN_ON_JOB("Concrete and site contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([490, 540, 10, 40]),
      stateLicense: "none",
      licenseSummary: noStateLicense("drywall installers"),
      licenseAgency: EXCISE_TAX,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      stateLicense: "none",
      licenseSummary: "No South Dakota state license for elevator mechanics was found. The state's Board of Technical Professions covers architects, engineers and similar design professions, not elevators, so this trade appears to be unlicensed at the state level here.",
      licenseAgency: EXCISE_TAX,
      training: [national("Elevator Constructors union (IUEC) training", "neiep-elevator-constructor-apprenticeship", "Union elevator apprenticeship through the National Elevator Industry Educational Program.")],
      ownBusiness: "Elevator work takes specialized tools, insurance and manufacturer relationships, so most mechanics work for established companies.",
    }),
    t("flooring-installer", {
      outlook: ol([210, 240, 14, 20]),
      stateLicense: "none",
      licenseSummary: noStateLicense("flooring installers"),
      licenseAgency: EXCISE_TAX,
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([140, 160, 10, 10]),
      stateLicense: "none",
      licenseSummary: noStateLicense("glaziers"),
      licenseAgency: EXCISE_TAX,
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([250, 280, 11, 20]),
      stateLicense: "none",
      licenseSummary: noStateLicense("insulation installers"),
      licenseAgency: EXCISE_TAX,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([480, 540, 12, 50]),
      stateLicense: "none",
      licenseSummary: noStateLicense("ironworkers"),
      licenseAgency: EXCISE_TAX,
      ownBusiness: "Steel erection companies need heavy equipment and big insurance policies, so most ironworkers work for established firms.",
      training: [national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork.")],
    }),
    t("mason", {
      outlook: ol([360, 380, 8, 30]),
      stateLicense: "none",
      licenseSummary: noStateLicense("masons"),
      licenseAgency: EXCISE_TAX,
      training: [LEARN_ON_JOB("Masonry contractors"), national("Bricklayers union (BAC)", "bac-bricklayer-apprenticeship", "Union apprenticeships for brick, block and stone masons.")],
    }),
    t("millwright", {
      outlook: ol([180, 180, 2, 20]),
      stateLicense: "none",
      licenseSummary: "South Dakota has no state license for millwrights. Employers hire on training, experience and precision.",
      licenseAgency: EXCISE_TAX,
      training: [national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary: "South Dakota's Plumbing Commission doesn't explicitly list pipefitting as a separate licensed category. Pipefitting and sprinkler-adjacent piping work isn't clearly covered by a dedicated state license here.",
      licenseAgency: EXCISE_TAX,
      ownBusiness: "Piping contractors need crews, insurance and often a licensed plumber on staff for connected plumbing work.",
      training: [national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Paid union apprenticeships in pipefitting.")],
    }),
    t("plasterer-stucco-mason", {
      outlook: ol([40, 50, 11, 0]),
      stateLicense: "none",
      licenseSummary: noStateLicense("plasterers"),
      licenseAgency: EXCISE_TAX,
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([510, 570, 12, 40]),
      stateLicense: "none",
      licenseSummary: "South Dakota has no statewide roofing license. Sioux Falls is the one city with a dedicated Residential Roofing & Repair Contractor license, needing a passing exam score, a $20,000 bond and at least $300,000 in liability insurance. Elsewhere, roofers fall under the general excise-tax registration like any other trade.",
      licenseAgency: SIOUX_FALLS_ROOFING,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([600, 630, 5, 50]),
      stateLicense: "none",
      licenseSummary: "South Dakota has no state license for sheet metal workers.",
      licenseAgency: EXCISE_TAX,
      training: [national("Sheet metal apprenticeships (SMART)", "smart-sheet-metal-apprenticeship", "Union sheet metal apprenticeships.")],
    }),
    t("solar-installer", {
      stateLicense: "none",
      licenseSummary: "South Dakota has no state solar installer license and no South Dakota-specific job-count data for this occupation is published.",
      licenseAgency: EXCISE_TAX,
      training: [SOUTHEAST_TECH],
    }),
    t("sprinkler-fitter", {
      stateLicense: "none",
      licenseSummary: "South Dakota doesn't license fire sprinkler installers directly. What exists is a design and stamping qualification for fire protection system layout, held by someone with a NICET Level III or IV certification or 20 years of layout experience, under the Board of Technical Professions. That's a credential tied to who may design and sign off on a system, not a hands-on installer license.",
      licenseAgency: BTP_SPRINKLER,
      training: [national("Sprinkler Fitters union (UA)", "ua-sprinkler-fitter-apprenticeship", "Five-year registered apprenticeship through a signatory contractor.")],
    }),
    t("tile-setter", {
      outlook: ol([140, 160, 15, 10]),
      stateLicense: "none",
      licenseSummary: noStateLicense("tile setters"),
      licenseAgency: EXCISE_TAX,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: noStateLicense("waterproofing installers"),
      licenseAgency: EXCISE_TAX,
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Lake Area Technical College dual credit",
      detail: "High school juniors and seniors can take trades-relevant dual-credit courses, including welding, for $80.37 per credit hour; students with financial need can apply for a separate Dual Credit Scholarship to help cover the cost.",
      source: LATC_DUAL,
    },
  ],
  adults: [
    {
      title: "Build Dakota Scholarship",
      detail: "Covers 100% of tuition, fees, books, technology and tools at any of South Dakota's four technical colleges for students in high-demand fields including construction trades. Requires a 2.5 GPA and a 3-year commitment to live and work in South Dakota in your field after graduating; falling short converts the award into a loan.",
      source: BUILD_DAKOTA,
    },
    {
      title: "On-the-Job Training (OJT)",
      detail: "The Department of Labor and Regulation can reimburse employers up to half of a new hire's wages during training through this program and similar registered-apprenticeship workforce supports.",
      source: OJT_SD,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, South Dakota statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "South Dakota long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=SD" },
    ELEC_COMMISSION,
    PLUMBING_COMMISSION,
    EXCISE_TAX,
    BTP_SPRINKLER,
    SIOUX_FALLS_ROOFING,
    BUILD_DAKOTA,
    OJT_SD,
    LATC_DUAL,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
