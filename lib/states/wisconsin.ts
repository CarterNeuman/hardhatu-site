// Wisconsin state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Wisconsin-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Wisconsin";

const DSPS_ELECTRICIAN: SourceRef = { label: "Wisconsin DSPS, Journeyman and Master Electrician licensing (Wis. Admin. Code SPS 305, 316)", url: "https://dsps.wi.gov/Pages/Professions/JourneymanElectrician/Default.aspx" };
const DSPS_PLUMBER: SourceRef = { label: "Wisconsin DSPS, plumber licensing (Wis. Admin. Code SPS 305.9)", url: "https://dsps.wi.gov/Pages/Professions/JourneymanPlumber/Default.aspx" };
const DSPS_HVAC: SourceRef = { label: "Wisconsin DSPS, HVAC Qualifier certification (Wis. Admin. Code SPS 305.71)", url: "https://dsps.wi.gov/Pages/Professions/HVACQualifier/Default.aspx" };
const DSPS_ELEVATOR: SourceRef = { label: "Wisconsin DSPS, Elevator Mechanic licensing", url: "https://dsps.wi.gov/Pages/Professions/ElevatorMechanic/Default.aspx" };
const DSPS_SPRINKLER: SourceRef = { label: "Wisconsin DSPS, Automatic Fire Sprinkler Fitter, Journeyman", url: "https://dsps.wi.gov/Pages/Professions/AutomaticFireSprinkler/FitterJourneyman/Default.aspx" };
const DSPS_DWELLING: SourceRef = { label: "Wisconsin DSPS, Dwelling Contractor Qualifier (Wis. Admin. Code SPS 305.31)", url: "https://dsps.wi.gov/pages/Professions/DwellingContractorQualifier/Default.aspx" };
const DWD_YOUTH_APPRENTICE: SourceRef = { label: "Wisconsin DWD, Youth Apprenticeship program", url: "https://www.dwd.wisconsin.gov/apprenticeship/ya/" };
const DWD_APPRENTICE: SourceRef = { label: "Wisconsin DWD, registered apprenticeship (Wis. Admin. Code DWD 295)", url: "https://www.dwd.wisconsin.gov/apprenticeship/ra/" };
const START_COLLEGE_NOW: SourceRef = { label: "Wisconsin DPI, Start College Now dual enrollment", url: "https://dpi.state.wi.us/cte/dual-enrollment/start-college-now" };
const ASCENDIUM: SourceRef = { label: "Wisconsin Technical College System, Ascendium Tools of the Trade scholarship", url: "https://www.wtcsystem.edu/impact/news/tools-of-the-trade-scholarships-help-apprentices-advance-their-careers/" };
const ABC_WI: TrainingOption = { name: "ABC of Wisconsin apprenticeship", kind: "open-shop", where: "Statewide", detail: "Registered apprenticeship and craft-training programs through the Associated Builders and Contractors Wisconsin chapter.", url: "https://www.abcwi.org/?p=61136" };

const MILWAUKEE_ELECTRICAL_JATC: TrainingOption = {
  name: "Milwaukee Electrical JATC (IBEW Local 494/NECA)",
  kind: "union",
  where: "Milwaukee",
  detail: "A paid Inside Wireman apprenticeship run by the Milwaukee Electrical Joint Apprenticeship and Training Committee, in partnership with IBEW Local 494 and NECA.",
  url: "https://explore.skillup.org/milwaukee/training/milwauke-electrical-jatc/milwaukee-inside-apprenticeship",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const MATC: TrainingOption = {
  name: "Milwaukee Area Technical College (MATC)",
  kind: "college",
  where: "Milwaukee",
  detail: "One of Wisconsin's 16 technical colleges, with construction-trades and apprenticeship-linked programs serving the state's largest metro.",
  url: "https://www.wtcsystem.edu/programs/find-your-program/electrical-construction-jac/",
};
const MADISON_COLLEGE: TrainingOption = {
  name: "Madison College (Madison Area Technical College)",
  kind: "college",
  where: "Madison",
  detail: "Construction-trades and apprenticeship-linked programs serving the Madison area.",
  url: "https://madisoncollege.edu/node/12661",
};
const NWTC: TrainingOption = {
  name: "Northeast Wisconsin Technical College (NWTC)",
  kind: "college",
  where: "Green Bay",
  detail: "Runs a Construction Electrician Apprenticeship tied to IBEW-NECA, plus other trades programs.",
  url: "https://www.nwtc.edu/academics-and-training/construction-electrician-apprenticeship",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noStateLicense = (what: string) =>
  `Wisconsin has no license for ${what}, and no statewide general contractor license either. The state's only general contractor-type credential, the Dwelling Contractor Qualifier, covers only one- and two-family homes.`;

export const WISCONSIN: StateGuide = {
  // Wisconsin ZIP codes run 530xx-549xx.
  locationHints: { zip3: [[530, 549]], cities: ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine", "Appleton", "Waukesha", "Eau Claire"] },
  slug: "wisconsin",
  code: "WI",
  name: S,
  lastVerified: "2026-11-21",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Wisconsin long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=WI",
  },
  intro:
    "A field guide to 25 construction trades in Wisconsin: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ roughly 109,000 people in Wisconsin, with construction laborers and carpenters by far the two largest.",
    "The Department of Safety and Professional Services (DSPS) individually licenses electricians, plumbers, elevator mechanics and fire sprinkler fitters, each through its own credential ladder.",
    "HVAC is licensed differently: a single HVAC Qualifier credential plus a business-level registration, not a journeyman/master ladder.",
    "There's no statewide general contractor license for commercial work. The state's only general-contractor-type credential, the Dwelling Contractor Qualifier, covers only one- and two-family homes.",
    "Solar installer is the fastest-growing trade on this page by far, though it's starting from a small base.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "Tools of the Trade scholarship", value: "$2,000", note: "Per apprentice, from Ascendium, for tools, equipment, clothing, tuition or transportation at a Wisconsin technical college" },
  licensingOverview:
    "Wisconsin's Department of Safety and Professional Services (DSPS) individually licenses electricians (Journeyman, then Master), plumbers (Journeyman, then Master), elevator mechanics, and fire sprinkler fitters. HVAC work takes a single HVAC Qualifier credential plus a business-level registration, rather than a journeyman/master ladder. There's no statewide general contractor license for commercial work; the only general-contractor-type credential, the Dwelling Contractor Qualifier, applies only to one- and two-family homes once a job needs a building permit. Roofing and most other trades on this page have no state license at all.",
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
      "With no statewide commercial GC license, Wisconsin has one of the lower regulatory barriers to starting a general construction business of any state on this site.",
      "A single Dwelling Contractor Qualifier credential covers residential general contracting statewide, renewing every two years with 12 hours of continuing education.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Commercial work runs through local building-permit and plan-review processes instead of one statewide license, so the actual requirements can vary city to city.",
    ],
    path:
      "The usual route: work for someone else for years, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      DSPS_DWELLING,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([24540, 27860, 14, 2390]),
      stateLicense: "none",
      licenseSummary: "Wisconsin has no license for construction laborers. It is by far the largest trade on this page.",
      licenseAgency: DSPS_DWELLING,
      training: [ABC_WI, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([13790, 15870, 15, 1470]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Wisconsin requires electricians to hold a license from DSPS: apprentice, then Journeyman Electrician (a 3-year DWD-registered apprenticeship, or at least 48 months and 8,000 hours of qualifying experience, then an open-book exam with a 70% passing score covering the state electrical code and the National Electrical Code), then Master Electrician (additional verified experience beyond journeyman, plus its own exam). A separate Electrical Contractor registration covers the business side.",
      licenseSteps: [
        { title: "Electrical apprentice", detail: "Enter a DWD-registered apprenticeship or start building qualifying work experience." },
        { title: "Journeyman electrician", detail: "A 3-year registered apprenticeship, or 48 months/8,000 hours of experience, then an open-book exam (70% to pass)." },
        { title: "Master electrician", detail: "Additional verified experience beyond journeyman, then a separate exam." },
        { title: "Keep it current", detail: "Renew with at least 24 hours of continuing education." },
      ],
      licenseAgency: DSPS_ELECTRICIAN,
      extraCredentials: ["Wisconsin Journeyman or Master Electrician license"],
      training: [MILWAUKEE_ELECTRICAL_JATC, NWTC, MADISON_COLLEGE],
      businessNote: "Electrical contracting is a separate business-level registration from the individual electrician license.",
    }),
    t("equipment-operator", {
      outlook: ol([8250, 8920, 8, 760]),
      stateLicense: "none",
      licenseSummary: "Wisconsin has no state license for equipment operators. Employers look for training records and safe hours in the seat, and crane operators need national certification under federal OSHA rules.",
      licenseAgency: DSPS_DWELLING,
      training: [national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([17660, 18700, 6, 1860]),
      stateLicense: "none",
      licenseSummary: "Wisconsin has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS). It's an unusually large trade here, the second-biggest on this page.",
      licenseAgency: DSPS_DWELLING,
      training: [MATC, NWTC],
    }),
    t("hvac-technician", {
      outlook: ol([6270, 7120, 14, 640]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Wisconsin requires HVAC work to be done under an HVAC Qualifier certification from DSPS, plus a separate business-level HVAC Contractor registration. This isn't a journeyman/master ladder: a Qualifier certifies through a mix of HVAC education and verified years of hands-on experience, then an exam. Anyone handling refrigerants also needs the federal EPA Section 608 certification, which never expires.",
      licenseAgency: DSPS_HVAC,
      extraCredentials: ["Wisconsin HVAC Qualifier certification"],
      training: [MATC, NWTC],
      businessNote: "An HVAC business needs a Qualifier on staff before it can register as an HVAC Contractor.",
    }),
    t("carpenter", {
      outlook: ol([20030, 21630, 8, 1640]),
      stateLicense: "none",
      licenseSummary: noStateLicense("carpenters") + " It's the second-largest trade on this page.",
      licenseAgency: DSPS_DWELLING,
      training: [ABC_WI, MATC, MADISON_COLLEGE],
    }),
    t("plumber", {
      outlook: ol([9930, 11000, 11, 950]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Wisconsin requires plumbers to hold a license from DSPS: apprentice, then Journeyman Plumber (a multi-year registered apprenticeship with thousands of hours of on-the-job training, then a state exam), then Master Plumber (additional years as a licensed journeyman, then a longer exam). This outlook figure is a combined BLS category covering plumbers, pipefitters and steamfitters together, so it isn't just plumbers.",
      licenseSteps: [
        { title: "Apprentice plumber", detail: "Register an apprenticeship and work under a licensed plumber." },
        { title: "Journeyman plumber", detail: "Complete the registered apprenticeship's on-the-job hours, then pass the state exam." },
        { title: "Master plumber", detail: "Several more years as a licensed journeyman, then a longer exam." },
      ],
      licenseAgency: DSPS_PLUMBER,
      extraCredentials: ["Wisconsin Journeyman or Master Plumber license"],
      training: [national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Paid union apprenticeships in plumbing and pipefitting."), MATC],
      payNote: "Wisconsin's BLS projection groups plumbers with pipefitters and steamfitters, so this figure isn't plumbers alone.",
    }),
    t("painter", {
      outlook: ol([4920, 5170, 5, 410]),
      stateLicense: "none",
      licenseSummary: noStateLicense("painters"),
      licenseAgency: DSPS_DWELLING,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([4520, 4850, 7, 340]),
      stateLicense: "none",
      licenseSummary: noStateLicense("concrete finishers"),
      licenseAgency: DSPS_DWELLING,
      training: [LEARN_ON_JOB("Concrete and site contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([1740, 1840, 6, 130]),
      stateLicense: "none",
      licenseSummary: noStateLicense("drywall installers"),
      licenseAgency: DSPS_DWELLING,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([260, 280, 9, 20]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Wisconsin requires elevator mechanics to hold a license from DSPS, running from Elevator Apprentice or Helper up to full Elevator Mechanic, with a separate temporary track for apprentices employed by a licensed Elevator Contractor. A separate business-level Elevator Contractor credential covers the company side.",
      licenseAgency: DSPS_ELEVATOR,
      extraCredentials: ["Wisconsin Elevator Mechanic license"],
      training: [national("Elevator Constructors union (IUEC) training", "neiep-elevator-constructor-apprenticeship", "Union elevator apprenticeship through the National Elevator Industry Educational Program.")],
      ownBusiness: "Elevator work takes specialized tools, insurance and manufacturer relationships, so most mechanics work for established companies.",
    }),
    t("flooring-installer", {
      outlook: ol([750, 840, 12, 60]),
      stateLicense: "none",
      licenseSummary: noStateLicense("flooring installers"),
      licenseAgency: DSPS_DWELLING,
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([530, 580, 10, 50]),
      stateLicense: "none",
      licenseSummary: noStateLicense("glaziers"),
      licenseAgency: DSPS_DWELLING,
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([640, 690, 7, 60]),
      stateLicense: "none",
      licenseSummary: noStateLicense("insulation installers"),
      licenseAgency: DSPS_DWELLING,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([720, 790, 10, 60]),
      stateLicense: "none",
      licenseSummary: noStateLicense("ironworkers"),
      licenseAgency: DSPS_DWELLING,
      ownBusiness: "Steel erection companies need heavy equipment and big insurance policies, so most ironworkers work for established firms.",
      training: [national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork.")],
    }),
    t("mason", {
      outlook: ol([1020, 1120, 9, 90]),
      stateLicense: "none",
      licenseSummary: noStateLicense("masons"),
      licenseAgency: DSPS_DWELLING,
      training: [LEARN_ON_JOB("Masonry contractors"), national("Bricklayers union (BAC)", "bac-bricklayer-apprenticeship", "Union apprenticeships for brick, block and stone masons.")],
    }),
    t("millwright", {
      outlook: ol([1040, 1070, 2, 100]),
      stateLicense: "none",
      licenseSummary: "Wisconsin has no state license for millwrights. Employers hire on training, experience and precision.",
      licenseAgency: DSPS_DWELLING,
      training: [national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary: "DSPS's plumbing rules don't clearly spell out a separate pipefitter license apart from the plumber license, so this trade's licensing status in Wisconsin isn't fully confirmed. Pipefitting tied to plumbing systems likely falls under the plumber license; industrial piping work may not be separately licensed at all.",
      licenseAgency: DSPS_PLUMBER,
      ownBusiness: "Piping contractors need crews, insurance and often a licensed plumber on staff for connected plumbing work.",
      training: [national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Paid union apprenticeships in pipefitting.")],
      payNote: "Wisconsin's BLS projection groups pipefitters with plumbers and steamfitters, so there's no separate pipefitter-only figure.",
    }),
    t("plasterer-stucco-mason", {
      outlook: ol([160, 170, 6, 10]),
      stateLicense: "none",
      licenseSummary: noStateLicense("plasterers"),
      licenseAgency: DSPS_DWELLING,
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([2390, 2690, 13, 200]),
      stateLicense: "none",
      licenseSummary: "Wisconsin has no statewide roofing license. Regulation, if any, happens city by city, so check local rules before taking on roofing work.",
      licenseAgency: DSPS_DWELLING,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([3190, 3420, 8, 290]),
      stateLicense: "none",
      licenseSummary: "Wisconsin has no state license for sheet metal workers.",
      licenseAgency: DSPS_DWELLING,
      training: [national("Sheet metal apprenticeships (SMART)", "smart-sheet-metal-apprenticeship", "Union sheet metal apprenticeships.")],
    }),
    t("solar-installer", {
      outlook: ol([230, 300, 30, 30]),
      stateLicense: "none",
      licenseSummary: "Wisconsin has no dedicated solar installer license. The electrical connections on a solar installation fall under the state's electrician license, so a crew usually needs a licensed electrician involved even though there's no separate solar credential. It's the fastest-growing trade on this page by far, though starting from a small base.",
      licenseAgency: DSPS_ELECTRICIAN,
      training: [MATC, MILWAUKEE_ELECTRICAL_JATC],
    }),
    t("sprinkler-fitter", {
      stateLicense: "worker-certification",
      licenseSummary: "Wisconsin requires fire sprinkler fitters to hold an Automatic Fire Sprinkler Fitter, Journeyman license from DSPS, with a narrower Fitter-Maintenance credential for maintenance-only work. Licenses renew with at least 24 hours of continuing education.",
      licenseAgency: DSPS_SPRINKLER,
      extraCredentials: ["Wisconsin Automatic Fire Sprinkler Fitter, Journeyman license"],
      training: [national("Sprinkler Fitters union (UA)", "ua-sprinkler-fitter-apprenticeship", "Five-year registered apprenticeship through a signatory contractor.")],
      payNote: "Wisconsin's BLS projection groups sprinkler fitters with plumbers and pipefitters, so there's no separate sprinkler-fitter-only figure.",
    }),
    t("tile-setter", {
      outlook: ol([750, 840, 12, 60]),
      stateLicense: "none",
      licenseSummary: noStateLicense("tile setters"),
      licenseAgency: DSPS_DWELLING,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: noStateLicense("waterproofing installers"),
      licenseAgency: DSPS_DWELLING,
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Start College Now",
      detail: "Wisconsin's statewide dual-enrollment program lets high school juniors and seniors take technical college courses, including trades-relevant programs at any of the state's 16 technical colleges.",
      source: START_COLLEGE_NOW,
    },
    {
      title: "Youth Apprenticeship",
      detail: "Run by the Department of Workforce Development, this program lets high school juniors and seniors combine paid work experience with related coursework in a chosen career pathway, including construction trades.",
      source: DWD_YOUTH_APPRENTICE,
    },
  ],
  adults: [
    {
      title: "Tools of the Trade scholarship",
      detail: "The Ascendium-funded Tools of the Trade scholarship gives $2,000 per apprentice for tools, equipment, clothing, tuition or even transportation costs at Wisconsin technical colleges. The program has given more than $8.8 million to over 5,000 apprentices over 13 years.",
      source: ASCENDIUM,
    },
    {
      title: "DWD registered apprenticeship",
      detail: "Wisconsin employers train roughly 10,000 registered apprentices a year across about 200 occupations. In construction specifically, apprenticeships are typically run through joint labor-management programs (JATCs, ABC of Wisconsin, union locals) rather than a single employer sponsoring on its own.",
      source: DWD_APPRENTICE,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Wisconsin statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Wisconsin long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=WI" },
    DSPS_ELECTRICIAN,
    DSPS_PLUMBER,
    DSPS_HVAC,
    DSPS_ELEVATOR,
    DSPS_SPRINKLER,
    DSPS_DWELLING,
    DWD_YOUTH_APPRENTICE,
    DWD_APPRENTICE,
    START_COLLEGE_NOW,
    ASCENDIUM,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
