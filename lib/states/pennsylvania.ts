// Pennsylvania state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Pennsylvania-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Pennsylvania";

const HICPA: SourceRef = { label: "PA Attorney General, Home Improvement Consumer Protection Act (Act 132 of 2008)", url: "https://hic.attorneygeneral.gov/" };
const PHILA_ELECTRICAL: SourceRef = { label: "Philadelphia Dept. of Licenses & Inspections, electrical contractor license", url: "https://www.phila.gov/services/business-self-employment/starting-a-business/trade-licenses/get-an-electrical-contractor-license/" };
const PITTSBURGH_TRADE: SourceRef = { label: "City of Pittsburgh, Trade Licenses (electrical, fire suppression and other trades)", url: "https://www.pittsburghpa.gov/Business-Development/Permits-Licenses-and-Inspections/Licenses/Trade-Licenses/Electrical-Trade-License" };
const PITTSBURGH_FIRE_SUPPRESSION: SourceRef = { label: "City of Pittsburgh, Fire Suppression Trade License", url: "https://www.pittsburghpa.gov/Business-Development/Permits-Licenses-and-Inspections/Licenses/Trade-Licenses/Fire-Suppression-Trade-License" };
const PA_UCC_ELEVATOR: SourceRef = { label: "Pennsylvania Dept. of Labor & Industry, elevator equipment certification under the Uniform Construction Code", url: "https://www.pa.gov/agencies/dli/programs-services/labor-management-relations/bureau-of-occupational-and-industrial-safety/tpa-elevators" };
const PA_NO_LICENSE: SourceRef = { label: "Pennsylvania has no statewide trade-licensing board for most construction trades", url: "https://hic.attorneygeneral.gov/" };
const PA_TIP: SourceRef = { label: "Pennsylvania Targeted Industry Program (PA-TIP)", url: "https://www.pa.gov/content/dam/copapwp-pagov/en/education/documents/resources/fafsago/pa-state-financial-aid-guide.pdf" };
const PA_ATO: SourceRef = { label: "Pennsylvania Dept. of Labor & Industry, Apprenticeship & Training Office", url: "https://www.pa.gov/services/dli/find-a-registered-apprenticeship-program" };

const IBEW_98: TrainingOption = {
  name: "IBEW Local 98 electrical apprenticeship",
  kind: "union",
  where: "Philadelphia",
  detail: "A paid union electrical apprenticeship serving the Philadelphia area.",
  url: "https://www.ibew98.org/",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const UA_420: TrainingOption = {
  name: "UA Local 420 Steamfitters apprenticeship",
  kind: "union",
  where: "Philadelphia",
  detail: "A paid union pipefitting and steamfitting apprenticeship, recently expanded with a $5 million state investment.",
  url: "https://www.uagetinvolved.org/news/pa-gov-shapiro-visits-ua-local-420-touts-apprenticeships/",
  programSlug: "ua-plumber-pipefitter-apprenticeship",
};
const CCP_TRADES: TrainingOption = {
  name: "Community College of Philadelphia, trades programs",
  kind: "college",
  where: "Philadelphia",
  detail: "A Structural Welding program, part of a broader slate of trades offerings including Electro-Mechanical Technology, HVACR and a Gas Distribution Pipeline Mechanic program.",
  url: "https://ccp.edu/node/4040",
};
const CCAC_TRADES: TrainingOption = {
  name: "Community College of Allegheny County, trades programs",
  kind: "college",
  where: "Pittsburgh",
  detail: "An Electrical Construction Technology program, part of a broader slate of trades offerings including Heating & Air Conditioning and a sheet metal apprenticeship program.",
  url: "https://www.ccac.edu/academics/programs/industrial-technology-trades-and-transportation/electrical-construction-technology.php",
};
const ABC_KEYSTONE: TrainingOption = {
  name: "ABC Keystone craft training",
  kind: "open-shop",
  where: "Central and eastern Pennsylvania",
  detail: "Open-shop apprenticeship and craft-training programs through the Associated Builders and Contractors Keystone chapter.",
  url: "https://www.abckeystone.org",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noStateLicense = (what: string) =>
  `Pennsylvania has no statewide license for ${what}, and no statewide general contractor license either. Anyone doing residential repair or improvement work over $500 still needs to register under the Home Improvement Consumer Protection Act, a consumer-protection registry with no skills test. Philadelphia and Pittsburgh run their own separate local trade-license systems, so check local rules in those cities.`;

export const PENNSYLVANIA: StateGuide = {
  // Pennsylvania ZIP codes run 150xx-196xx.
  locationHints: { zip3: [[150, 196]], cities: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading", "Harrisburg", "Scranton", "Bethlehem"] },
  slug: "pennsylvania",
  code: "PA",
  name: S,
  lastVerified: "2026-11-21",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Pennsylvania long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=PA",
  },
  intro:
    "A field guide to 25 construction trades in Pennsylvania: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ roughly 224,000 people in Pennsylvania, with construction laborers and carpenters by far the two largest.",
    "Pennsylvania has no state licensing board for electricians, plumbers or HVAC technicians at all. Licensing, where it exists, is set by individual cities, most visibly Philadelphia and Pittsburgh.",
    "The closest thing to a statewide rule is the Home Improvement Consumer Protection Act (HICPA), a consumer-protection registration with no skills test, covering only residential repair and remodeling work.",
    "There's no statewide general contractor license, and elevator oversight runs through equipment certification rather than an individual mechanic license.",
    "Solar installer is the standout growth story on this page: a projected 27% increase, more than triple the next-fastest trade, though from a small base.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "HICPA registration", value: "$50", note: "The fee to register as a home-improvement contractor under Pennsylvania's Home Improvement Consumer Protection Act" },
  licensingOverview:
    "Pennsylvania has no state licensing board for electricians, plumbers, HVAC technicians or almost any other trade on this page. The closest thing to a statewide rule is the Home Improvement Consumer Protection Act (HICPA), which requires anyone doing residential repair or remodeling work over $500 to register with the Attorney General's office; it's a consumer-protection registry with no exam or skills test, and it doesn't cover commercial work or new construction at all. Where real trade licensing exists, it's local: Philadelphia and Pittsburgh each run their own individual trade-license systems for electricians and other trades, grandfathered in before HICPA generally preempted local contractor licensing in 2009. There's no statewide general contractor license, and elevator oversight runs through equipment and company certification under the Uniform Construction Code rather than an individual mechanic license.",
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
      "With no statewide GC license and no skills-tested trade license for most work, Pennsylvania has one of the lowest regulatory barriers to starting a construction business of any state on this site.",
      "A HICPA registration, once filed, covers residential work statewide, outside of Philadelphia's and Pittsburgh's own additional local licensing.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Low statewide barriers don't mean no local rules; Philadelphia and Pittsburgh both require their own separate trade licenses for work inside city limits.",
    ],
    path:
      "The usual route: work for someone else for years, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      HICPA,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([50780, 54280, 7, 4480]),
      stateLicense: "none",
      licenseSummary: "Pennsylvania has no license for construction laborers. It is by far the largest trade on this page.",
      licenseAgency: PA_NO_LICENSE,
      training: [ABC_KEYSTONE, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([23970, 25900, 8, 2320]),
      stateLicense: "none",
      licenseSummary: "Pennsylvania has no statewide electrician license. Philadelphia and Pittsburgh each license electrical contractors individually through their own city systems (Philadelphia: 4 years of experience, an exam and continuing education; Pittsburgh: 6 years of combined experience and education plus an exam); outside those two cities, there's no government check on an electrician's qualifications before they can legally work.",
      licenseSteps: [
        { title: "No state license", detail: "Pennsylvania has no statewide electrician license." },
        { title: "Philadelphia (local)", detail: "4 years of experience, an exam and continuing education." },
        { title: "Pittsburgh (local)", detail: "6 years of combined experience and education, plus an exam." },
      ],
      licenseAgency: PHILA_ELECTRICAL,
      extraCredentials: ["Philadelphia or Pittsburgh electrical trade license, if working in either city"],
      training: [IBEW_98],
    }),
    t("equipment-operator", {
      outlook: ol([21680, 22190, 2, 1820]),
      stateLicense: "none",
      licenseSummary: "Pennsylvania has no state license for equipment operators. Employers look for training records and safe hours in the seat, and crane operators need national certification under federal OSHA rules.",
      licenseAgency: PA_NO_LICENSE,
      training: [national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([17620, 18270, 4, 1800]),
      stateLicense: "none",
      licenseSummary: "Pennsylvania has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      licenseAgency: PA_NO_LICENSE,
      training: [CCP_TRADES],
    }),
    t("hvac-technician", {
      outlook: ol([17890, 19030, 6, 1640]),
      stateLicense: "none",
      licenseSummary: "Pennsylvania has no statewide HVAC license. Philadelphia and Pittsburgh license HVAC and mechanical trades locally; anyone handling refrigerants also needs the federal EPA Section 608 certification, which applies in every state.",
      licenseSteps: [
        { title: "No state license", detail: "Pennsylvania has no statewide HVAC license." },
        { title: "Philadelphia and Pittsburgh (local)", detail: "Both cities license HVAC and mechanical trades locally." },
      ],
      licenseAgency: PA_NO_LICENSE,
      training: [CCAC_TRADES, CCP_TRADES],
    }),
    t("carpenter", {
      outlook: ol([39720, 41250, 4, 3030]),
      stateLicense: "none",
      licenseSummary: noStateLicense("carpenters") + " It's the second-largest trade on this page.",
      licenseAgency: PA_NO_LICENSE,
      training: [ABC_KEYSTONE],
    }),
    t("plumber", {
      outlook: ol([15400, 15880, 3, 1310]),
      stateLicense: "none",
      licenseSummary:
        "Pennsylvania has no statewide plumber license; a bill to create a State Board of Plumbing Contractors has been introduced but remains stuck in committee, not law. Philadelphia and Pittsburgh both license plumbers locally. This outlook figure is a combined BLS category covering plumbers, pipefitters and steamfitters together, so it isn't just plumbers.",
      licenseSteps: [
        { title: "No state license", detail: "Pennsylvania has no statewide plumber license; a bill to create one remains stuck in committee." },
        { title: "Philadelphia and Pittsburgh (local)", detail: "Both cities license plumbers locally." },
      ],
      licenseAgency: PA_NO_LICENSE,
      extraCredentials: ["Philadelphia or Pittsburgh plumbing trade license, if working in either city"],
      training: [UA_420, CCP_TRADES],
      payNote: "Pennsylvania's BLS projection groups plumbers with pipefitters and steamfitters, so this figure isn't plumbers alone.",
      businessNote: "Philadelphia and Pittsburgh both require their own separate plumbing contractor license to run a business in either city.",
    }),
    t("painter", {
      outlook: ol([8960, 9330, 4, 740]),
      stateLicense: "none",
      licenseSummary: noStateLicense("painters"),
      licenseAgency: PA_NO_LICENSE,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([4340, 4460, 3, 300]),
      stateLicense: "none",
      licenseSummary: noStateLicense("concrete finishers"),
      licenseAgency: PA_NO_LICENSE,
      training: [LEARN_ON_JOB("Concrete and site contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([1950, 2040, 4, 150]),
      stateLicense: "none",
      licenseSummary: noStateLicense("drywall installers"),
      licenseAgency: PA_NO_LICENSE,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([680, 700, 4, 50]),
      stateLicense: "none",
      licenseSummary: "Pennsylvania doesn't license individual elevator mechanics; oversight runs through the Uniform Construction Code, which certifies the equipment and the inspection agency rather than the worker. A new UCC elevator regulation takes effect Dec. 20, 2026, so check current rules before relying on this.",
      licenseAgency: PA_UCC_ELEVATOR,
      training: [national("Elevator Constructors union (IUEC) training", "neiep-elevator-constructor-apprenticeship", "Union elevator apprenticeship through the National Elevator Industry Educational Program.")],
      ownBusiness: "Elevator work takes specialized tools, insurance and manufacturer relationships, so most mechanics work for established companies.",
    }),
    t("flooring-installer", {
      outlook: ol([810, 890, 10, 60]),
      stateLicense: "none",
      licenseSummary: noStateLicense("flooring installers") + " It's one of the fastest-growing trades on this page.",
      licenseAgency: PA_NO_LICENSE,
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([1580, 1610, 2, 130]),
      stateLicense: "none",
      licenseSummary: noStateLicense("glaziers"),
      licenseAgency: PA_NO_LICENSE,
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([670, 700, 4, 60]),
      stateLicense: "none",
      licenseSummary: noStateLicense("insulation installers"),
      licenseAgency: PA_NO_LICENSE,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([1430, 1480, 3, 120]),
      stateLicense: "none",
      licenseSummary: noStateLicense("ironworkers"),
      licenseAgency: PA_NO_LICENSE,
      ownBusiness: "Steel erection companies need heavy equipment and big insurance policies, so most ironworkers work for established firms.",
      training: [national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork.")],
    }),
    t("mason", {
      outlook: ol([4190, 4290, 3, 310]),
      stateLicense: "none",
      licenseSummary: noStateLicense("masons"),
      licenseAgency: PA_NO_LICENSE,
      training: [LEARN_ON_JOB("Masonry contractors"), national("Bricklayers union (BAC)", "bac-bricklayer-apprenticeship", "Union apprenticeships for brick, block and stone masons.")],
    }),
    t("millwright", {
      outlook: ol([1560, 1620, 4, 150]),
      stateLicense: "none",
      licenseSummary: "Pennsylvania has no state license for millwrights. Employers hire on training, experience and precision.",
      licenseAgency: PA_NO_LICENSE,
      training: [national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary: "Pipefitting isn't separately licensed by the state; Philadelphia and Pittsburgh bundle it into their local plumbing and mechanical trade-license systems.",
      licenseAgency: PA_NO_LICENSE,
      ownBusiness: "Piping contractors need crews, insurance and often a licensed plumber on staff for connected plumbing work.",
      training: [UA_420, national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Paid union apprenticeships in pipefitting.")],
      payNote: "Pennsylvania's BLS projection groups pipefitters with plumbers and steamfitters, so there's no separate pipefitter-only figure.",
    }),
    t("plasterer-stucco-mason", {
      outlook: ol([260, 280, 5, 20]),
      stateLicense: "none",
      licenseSummary: noStateLicense("plasterers") + " It's the smallest trade on this page.",
      licenseAgency: PA_NO_LICENSE,
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([4210, 4420, 5, 320]),
      stateLicense: "none",
      licenseSummary: noStateLicense("roofers"),
      licenseAgency: PA_NO_LICENSE,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([2630, 2670, 2, 220]),
      stateLicense: "none",
      licenseSummary: "Pennsylvania has no state license for sheet metal workers.",
      licenseAgency: PA_NO_LICENSE,
      training: [CCAC_TRADES, national("Sheet metal apprenticeships (SMART)", "smart-sheet-metal-apprenticeship", "Union sheet metal apprenticeships.")],
    }),
    t("solar-installer", {
      outlook: ol([440, 560, 27, 50]),
      stateLicense: "none",
      licenseSummary: "Pennsylvania has no dedicated solar installer license; installers typically carry voluntary NABCEP certification instead. It's by far the fastest-growing trade on this page, projected to grow 27% over the decade, nearly triple the next-fastest trade, though from a small base.",
      licenseAgency: PA_NO_LICENSE,
      training: [IBEW_98],
    }),
    t("sprinkler-fitter", {
      stateLicense: "none",
      licenseSummary: "Pennsylvania has no state license for fire sprinkler fitters; a bill proposing one was introduced about a decade ago and never passed. Pittsburgh licenses this work locally as a Fire Suppression Trade License.",
      licenseSteps: [
        { title: "No state license", detail: "Pennsylvania has no state license for fire sprinkler fitters; a bill proposing one never passed." },
        { title: "Pittsburgh (local)", detail: "Licenses this work locally as a Fire Suppression Trade License." },
      ],
      licenseAgency: PITTSBURGH_FIRE_SUPPRESSION,
      extraCredentials: ["Pittsburgh Fire Suppression Trade License, if working in that city"],
      training: [national("Sprinkler Fitters union (UA)", "ua-sprinkler-fitter-apprenticeship", "Five-year registered apprenticeship through a signatory contractor.")],
      payNote: "Pennsylvania's BLS projection groups sprinkler fitters with plumbers and pipefitters, so there's no separate sprinkler-fitter-only figure.",
      ownBusiness: "Opening a sprinkler company takes no state license outside Pittsburgh, where it needs a Fire Suppression Trade License; everywhere, it still takes NICET-certified design staff and insurance.",
    }),
    t("tile-setter", {
      outlook: ol([780, 860, 10, 60]),
      stateLicense: "none",
      licenseSummary: noStateLicense("tile setters") + " It's one of the fastest-growing trades on this page.",
      licenseAgency: PA_NO_LICENSE,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: noStateLicense("waterproofing installers"),
      licenseAgency: PA_NO_LICENSE,
      payNote: "Waterproofing has no distinct federal job category, so no state-specific job count exists for it in Pennsylvania or anywhere else on this site.",
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "PAsmart Career Technical Education Pre-Apprenticeships",
      detail: "State grants fund CTE pre-apprenticeship programs linking high schoolers to registered apprenticeships, including in the construction trades.",
      source: { label: "Pennsylvania PAsmart grants", url: "https://www.pa.gov/agencies/education/programs-and-services/schools/grants-and-funding/school-grants/pasmart.html" },
    },
  ],
  adults: [
    {
      title: "PA Targeted Industry Program (PA-TIP)",
      detail: "Covers students with financial need in programs 10 weeks to under 2 years long in high-demand fields, up to $6,000, through the FAFSA alone. Check current eligible-program lists to confirm a specific trade credential qualifies.",
      source: PA_TIP,
    },
    {
      title: "Apprenticeship & Training Office",
      detail: "Pennsylvania's coordinating body for registered apprenticeships statewide, run through the Department of Labor & Industry.",
      source: PA_ATO,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Pennsylvania statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Pennsylvania long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=PA" },
    HICPA,
    PHILA_ELECTRICAL,
    PITTSBURGH_TRADE,
    PITTSBURGH_FIRE_SUPPRESSION,
    PA_UCC_ELEVATOR,
    PA_TIP,
    PA_ATO,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
