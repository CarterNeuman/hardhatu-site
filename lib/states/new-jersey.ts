// New Jersey state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is New Jersey-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, NEIEP, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "New Jersey";

const NJ_ELECTRICAL: SourceRef = { label: "New Jersey Board of Examiners of Electrical Contractors (N.J.S.A. 45:5A-9)", url: "https://www.njconsumeraffairs.gov/elec" };
const NJ_PLUMBING: SourceRef = { label: "New Jersey State Board of Examiners of Master Plumbers", url: "https://www.njconsumeraffairs.gov/plu/Pages/FAQ.aspx" };
const NJ_HVACR: SourceRef = { label: "New Jersey State Board of Examiners of HVACR Contractors", url: "https://www.njconsumeraffairs.gov/hvacr/Pages/FAQ.aspx" };
const NJ_ELEVATOR: SourceRef = { label: "New Jersey Elevator, Escalator, and Moving Walkway Mechanics Licensing Board (N.J.A.C. 13:44M)", url: "https://www.njconsumeraffairs.gov/Pages/Boards-and-Committees.aspx" };
const NJ_FIRE_SAFETY: SourceRef = { label: "New Jersey Dept. of Community Affairs, Division of Fire Safety, fire protection contractor certification", url: "https://www.nj.gov/dca/divisions/dfs/pdf/contreq.pdf" };
const NJ_CRANE: SourceRef = { label: "New Jersey Crane Operators Act (N.J.S.A. 45:26-1 et seq.)", url: "https://www.nj.gov/labor/safetyandhealth/resources-support/laws-regulations/craneoperatorsact.shtml" };
const NJ_HIC: SourceRef = { label: "New Jersey Home Improvement Contractor (HIC) registration (N.J.A.C. 13:45A-17)", url: "https://www.njconsumeraffairs.gov/hic" };
const NJ_NO_LICENSE: SourceRef = { label: "New Jersey Division of Consumer Affairs, boards and committees list (no board covers this trade)", url: "https://www.njconsumeraffairs.gov/Pages/Boards-and-Committees.aspx" };
const NJ_CCOG: SourceRef = { label: "New Jersey Community College Opportunity Grant (CCOG)", url: "https://nj.gov/highereducation/documents/pdf/news/NewJerseyCommunityCollegeOpportunityGrantReport2025.pdf" };
const NJ_APPRENTICESHIP: SourceRef = { label: "New Jersey Office of Apprenticeship", url: "https://nj.gov/labor/career-services/apprenticeship/aboutus.shtml" };

const IBEW_164: TrainingOption = {
  name: "IBEW Local 164 JATC",
  kind: "union",
  where: "Paramus",
  detail: "A paid union electrical apprenticeship serving Hudson, Bergen and Essex counties.",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const UA_9: TrainingOption = {
  name: "Plumbers Local 9 JATC",
  kind: "union",
  where: "Englishtown",
  detail: "A paid union apprenticeship for plumbers serving Mercer, Monmouth, Middlesex and Hunterdon counties.",
  programSlug: "ua-plumber-pipefitter-apprenticeship",
};
const PIPEFITTERS_274: TrainingOption = {
  name: "Pipefitters Local 274 JATC",
  kind: "union",
  where: "Parsippany",
  detail: "A paid union apprenticeship for pipefitters and HVAC technicians serving Bergen, Hudson, Morris, Passaic and Sussex counties.",
  programSlug: "ua-plumber-pipefitter-apprenticeship",
};
const SPRINKLER_696: TrainingOption = {
  name: "Sprinkler Fitters Local 696",
  kind: "union",
  where: "Millburn",
  detail: "A paid union apprenticeship for fire sprinkler fitters serving northern New Jersey to Monmouth County.",
  programSlug: "ua-sprinkler-fitter-apprenticeship",
};
const CARPENTERS_TECH: TrainingOption = {
  name: "Eastern Atlantic States Carpenters Technical College",
  kind: "union",
  where: "Edison and Hammonton",
  detail: "A paid union apprenticeship for carpenters, with campuses in central and southern New Jersey.",
};
const IRONWORKERS_11: TrainingOption = {
  name: "Iron Workers Local 11",
  kind: "union",
  where: "Bloomfield",
  detail: "A paid union apprenticeship for structural and ornamental ironworkers serving most of northern and central New Jersey.",
  programSlug: "iron-workers-apprenticeship",
};
const SMART_25: TrainingOption = {
  name: "Sheet Metal Workers Local 25",
  kind: "union",
  where: "Carlstadt",
  detail: "A paid union apprenticeship for sheet metal workers serving northern New Jersey (southern and central NJ are covered by sister locals 27 and 22).",
  programSlug: "smart-sheet-metal-apprenticeship",
};
const CRANE_NCCCO: TrainingOption = {
  name: "NCCCO crane operator certification",
  kind: "free-training",
  where: "Statewide",
  detail: "The national crane-operator certification New Jersey requires, on top of 1,000+ hours of crane experience, for its state Crane Operator License.",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const hicSummary = (what: string) =>
  `New Jersey has no individual ${what} license. A business doing residential remodeling, repair or renovation work needs a Home Improvement Contractor (HIC) registration from the Division of Consumer Affairs: $110 initial fee, $90 annual renewal, $500,000 of liability insurance, and a $10,000-$50,000 bond depending on contract value. New-home construction and commercial work fall outside HIC and need no state license at all.`;
const hicBusinessNote =
  "The HIC registration is held at the business level, not by every individual worker, and licensed trades like electricians and plumbers are exempt from it for the scope of work their own license already covers.";
const njNoLicense = (what: string) => `New Jersey has no state license for ${what}.`;

export const NEW_JERSEY: StateGuide = {
  // New Jersey ZIP codes run 070xx-089xx.
  locationHints: { zip3: [[70, 89]], cities: ["Newark", "Jersey City", "Trenton", "Camden", "Edison", "Atlantic City", "Paterson", "Elizabeth"] },
  slug: "new-jersey",
  code: "NJ",
  name: S,
  lastVerified: "2026-11-22",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "New Jersey long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2061.00?st=NJ",
  },
  intro:
    "A field guide to 25 construction trades in New Jersey: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ roughly 120,000 people in New Jersey, with construction laborers, electricians and carpenters the three largest.",
    "New Jersey has no general statewide contractor's license. Only electricians, plumbers, HVACR technicians and elevator mechanics have their own individual state license board.",
    "A Home Improvement Contractor (HIC) registration covers the business side of most residential remodeling trades statewide, explicitly naming things like flooring, insulation and siding in its own rules.",
    "Solar installer is by far the fastest-growing trade on this page, projected to grow 45% — folded entirely into the electrical contractor license, since New Jersey has no separate solar license.",
    "New Jersey is one of the few states on this site with a genuine individual license for crane operators: any crane rated 10 tons or more needs a state Crane Operator License on top of national NCCCO certification.",
    "No trade on this page is projected to shrink in New Jersey over this period.",
  ],
  costMarker: { label: "Community College Opportunity Grant (CCOG)", value: "$0", note: "Covers full tuition at any of New Jersey's 18 county colleges for residents with household income up to $100,000, as a last-dollar grant on top of other aid; check with a college's financial-aid office on which certificate programs qualify" },
  licensingOverview:
    "New Jersey has no general statewide contractor's license of any kind. Only four boards license individual construction trades: electricians, master plumbers, HVACR contractors and elevator mechanics, each through the Division of Consumer Affairs. Plumbing and HVACR licensing both skip a stand-alone journeyman tier entirely; a journeyman's hours are a qualifying step toward the single individually held license (Master Plumber, or Master HVACR Contractor), not an independent credential. Fire sprinkler and other fire-protection work runs through the Dept. of Community Affairs' Division of Fire Safety rather than Consumer Affairs, with NICET-based individual certificates feeding into a business-level contractor permit. New Jersey also runs a genuine individual license for crane operators specifically (any crane rated 10 tons or more), separate from the rest of the \"equipment operator\" trade, which otherwise has no state credential at all. Every other trade on this page, including carpentry, roofing, masonry, flooring and insulation, has no individual trade license; a business doing that work on residential property instead registers once as a Home Improvement Contractor, which explicitly names several of these trades in its own rules. Solar PV installation has no separate license either way: state regulation folds it directly into the electrical contractor license.",
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
      "With no statewide general contractor license, New Jersey has one of the lower regulatory barriers to general contracting of any state on this site, outside the four licensed trades.",
      "An HIC registration, once earned, covers residential remodeling work statewide under one credential, across most of the trades on this page.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "HIC's $500,000 insurance floor and bonding requirement are a real up-front cost before a business can legally take on residential work.",
    ],
    path:
      "The usual route: work for someone else for years, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      NJ_HIC,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([28390, 30560, 8, 2540]),
      stateLicense: "none",
      licenseSummary: njNoLicense("construction laborers") + " It's the largest trade on this page.",
      licenseAgency: NJ_NO_LICENSE,
      training: [national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([16470, 18570, 13, 1710]),
      stateLicense: "worker-certification",
      licenseSummary:
        "New Jersey licenses journeyman electricians individually, then licenses the business separately as an Electrical Contractor. Board regulations (N.J.A.C. 13:31-5.1) also define a separate \"registered qualified journeyman\" status, which the Board itself warns shouldn't be confused with the journeyman standing described here.",
      licenseSteps: [
        { title: "Journeyman Electrician", detail: "A 4-year U.S. Dept. of Labor-approved electrical apprenticeship, then 1 year working as a journeyman." },
        { title: "Electrical Contractor (business)", detail: "The same qualifying experience plus a business permit, renewed every 3 years." },
      ],
      licenseAgency: NJ_ELECTRICAL,
      training: [IBEW_164],
    }),
    t("equipment-operator", {
      outlook: ol([6660, 6970, 5, 580]),
      stateLicense: "worker-certification",
      licenseSummary:
        "New Jersey has no general license for operating bulldozers, excavators or other heavy equipment, but anyone operating a crane rated 10 tons or more on a construction site needs a state Crane Operator License: age 18+, a medical examiner's certificate, 1,000+ hours of crane experience and an NCCCO certification (or Board-approved equivalent). An Apprentice/Trainee Permit covers operators under 1,000 hours.",
      licenseSteps: [
        { title: "NCCCO certification (cranes 10+ tons only)", detail: "A national crane-operator certification, or a Board-approved equivalent accredited to ASME B30.5/NCCA standards." },
        { title: "New Jersey Crane Operator License (cranes 10+ tons only)", detail: "Age 18+, a medical examiner's certificate, 1,000+ hours of crane-related experience and the NCCCO certificate; license runs 5 years, renews with proof of recertification. Other heavy equipment has no state license." },
      ],
      licenseAgency: NJ_CRANE,
      training: [CRANE_NCCCO],
    }),
    t("welder", {
      outlook: ol([3500, 3620, 4, 360]),
      stateLicense: "none",
      licenseSummary: njNoLicense("welders") + " Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      licenseAgency: NJ_NO_LICENSE,
      training: [LEARN_ON_JOB("Welding shops and fabricators")],
    }),
    t("hvac-technician", {
      outlook: ol([11290, 12380, 10, 1090]),
      stateLicense: "worker-certification",
      licenseSummary:
        "New Jersey's HVACR board skips a stand-alone journeyman license too; the only individually held credential is Master HVACR Contractor, reached through one of four pathways. Grandfathering under the old rules ended September 3, 2014.",
      licenseSteps: [
        { title: "Master HVACR Contractor", detail: "One of four pathways: a 4-year DOL-approved apprenticeship plus 1 year as journeyperson under a licensed master; a bachelor's degree in HVACR plus 1 year; a related bachelor's degree plus 3 years; or a 2-year trade/technical degree plus at least 2 years of DOL-approved apprenticeship and 1 year as journeyperson. Then a Board exam." },
      ],
      licenseAgency: NJ_HVACR,
      training: [PIPEFITTERS_274],
    }),
    t("carpenter", {
      outlook: ol([17890, 18620, 4, 1370]),
      stateLicense: "contractor",
      licenseSummary: hicSummary("carpenter") + " It's the second-largest trade on this page.",
      licenseAgency: NJ_HIC,
      businessNote: hicBusinessNote,
      training: [CARPENTERS_TECH],
    }),
    t("plumber", {
      outlook: ol([10770, 11520, 7, 980]),
      stateLicense: "worker-certification",
      licenseSummary:
        "New Jersey's plumbing board has no stand-alone journeyman license either; a year of journeyman hours is a qualifying step toward the only individually held license, Master Plumber, not an independent credential.",
      licenseSteps: [
        { title: "Master Plumber", detail: "Minimum age 21. Either a 4-year DOL-approved apprenticeship, or a related bachelor's degree, plus 1 year (1,200 hours) of hands-on journeyman work in New Jersey and Board-required propane-services education, then an exam." },
      ],
      licenseAgency: NJ_PLUMBING,
      businessNote: "New Jersey plumbing work must be done by a Master Plumber, an authorized plumbing contractor, or that contractor's own W-2 employee; there's no separate business license layered on top of the Master Plumber credential itself.",
      training: [UA_9],
    }),
    t("painter", {
      outlook: ol([6480, 6860, 6, 550]),
      stateLicense: "contractor",
      licenseSummary: hicSummary("painter"),
      licenseAgency: NJ_HIC,
      businessNote: hicBusinessNote,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([3850, 3980, 4, 270]),
      stateLicense: "contractor",
      licenseSummary: hicSummary("concrete finisher"),
      licenseAgency: NJ_HIC,
      businessNote: hicBusinessNote,
      training: [LEARN_ON_JOB("Concrete contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([810, 850, 4, 60]),
      stateLicense: "contractor",
      licenseSummary: hicSummary("drywall installer"),
      licenseAgency: NJ_HIC,
      businessNote: hicBusinessNote,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([410, 440, 9, 40]),
      stateLicense: "worker-certification",
      licenseSummary: "New Jersey's Elevator, Escalator and Moving Walkway Mechanics Licensing Board licenses mechanics through a single individual tier.",
      licenseSteps: [
        { title: "Elevator Mechanic", detail: "Age 21+, at least 3 years of elevator/escalator/moving-walkway experience, and passing either the NAEC CET certification exam or the NEIEP exam." },
      ],
      licenseAgency: NJ_ELEVATOR,
      training: [NEIEP],
    }),
    t("flooring-installer", {
      outlook: ol([1170, 1310, 13, 100]),
      stateLicense: "contractor",
      licenseSummary:
        "New Jersey has no individual flooring-installer license. The state's Home Improvement Contractor rules explicitly name flooring among the residential remodeling work a business needs an HIC registration to perform; commercial flooring needs no state license.",
      licenseAgency: NJ_HIC,
      businessNote: hicBusinessNote,
      training: [LEARN_ON_JOB("Flooring contractors")],
    }),
    t("glazier", {
      outlook: ol([1370, 1440, 5, 120]),
      stateLicense: "contractor",
      licenseSummary: hicSummary("glazier"),
      licenseAgency: NJ_HIC,
      businessNote: hicBusinessNote,
      training: [LEARN_ON_JOB("Glazing contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([1100, 1180, 7, 100]),
      stateLicense: "contractor",
      licenseSummary:
        "New Jersey has no individual insulation-installer license. The state's Home Improvement Contractor rules explicitly name insulation among the residential remodeling work a business needs an HIC registration to perform; commercial insulation work needs no state license.",
      licenseAgency: NJ_HIC,
      businessNote: hicBusinessNote,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([1280, 1360, 6, 110]),
      stateLicense: "none",
      licenseSummary: njNoLicense("ironworkers"),
      licenseAgency: NJ_NO_LICENSE,
      training: [IRONWORKERS_11],
    }),
    t("mason", {
      outlook: ol([1290, 1360, 5, 100]),
      stateLicense: "contractor",
      licenseSummary: hicSummary("mason"),
      licenseAgency: NJ_HIC,
      businessNote: hicBusinessNote,
      training: [LEARN_ON_JOB("Masonry contractors")],
    }),
    t("millwright", {
      outlook: ol([210, 220, 3, 20]),
      stateLicense: "none",
      licenseSummary: njNoLicense("millwrights") + " This is industrial work, outside HIC's residential-only scope. It's one of the slowest-growing trades on this page.",
      licenseAgency: NJ_NO_LICENSE,
      training: [LEARN_ON_JOB("Industrial millwright shops")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary:
        "Industrial and process pipefitting has no New Jersey license of its own. Gas-piping and water-supply pipefitting fall under the Master Plumber credential instead.",
      licenseAgency: NJ_PLUMBING,
      training: [PIPEFITTERS_274],
      payNote: "New Jersey's BLS projection groups pipefitters with plumbers and sprinkler fitters, so there's no separate pipefitter-only figure.",
    }),
    t("plasterer-stucco-mason", {
      outlook: ol([130, 140, 8, 10]),
      stateLicense: "contractor",
      licenseSummary: hicSummary("plasterer or stucco mason") + " It's one of the smallest trades on this page.",
      licenseAgency: NJ_HIC,
      businessNote: hicBusinessNote,
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([2300, 2480, 8, 180]),
      stateLicense: "contractor",
      licenseSummary: hicSummary("roofer"),
      licenseAgency: NJ_HIC,
      businessNote: hicBusinessNote,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([1810, 1880, 4, 150]),
      stateLicense: "none",
      licenseSummary: njNoLicense("sheet metal workers"),
      licenseAgency: NJ_NO_LICENSE,
      training: [SMART_25],
    }),
    t("solar-installer", {
      outlook: ol([1260, 1820, 45, 180]),
      stateLicense: "none",
      licenseSummary:
        "New Jersey has no separate solar-installer license. State regulation (N.J.A.C. 13:31-3.8(d)) requires an electrical contractor's business permit, or a licensed electrical contractor's own employee, to install, maintain, service or handle exposed photovoltaic panels, inverters and other electrical components of a solar system. It's by far the fastest-growing trade on this page.",
      licenseAgency: NJ_ELECTRICAL,
      training: [LEARN_ON_JOB("Solar installation contractors")],
    }),
    t("sprinkler-fitter", {
      stateLicense: "worker-certification",
      licenseSummary:
        "New Jersey's Division of Fire Safety licenses fire sprinkler and fire-protection work through six contractor classifications, each requiring an individual certificate holder (NICET-based, or a NAFED exam for portable extinguishers) before the business gets its permit.",
      licenseSteps: [
        { title: "NICET Level II certification (or a NAFED exam, by classification)", detail: "The specific requirement depends on the classification; a Fire Sprinkler System Contractor, for instance, needs NICET Level II in Inspection & Testing of Water-Based Systems plus specific Sprinkler Layout work elements." },
        { title: "Contractor business permit", detail: "The business needs at least one certificate holder of the relevant classification on staff before the Division of Fire Safety issues the permit." },
      ],
      licenseAgency: NJ_FIRE_SAFETY,
      extraCredentials: ["New Jersey fire protection individual certificate (NICET or NAFED-based)"],
      training: [SPRINKLER_696],
      payNote: "New Jersey's BLS projection groups sprinkler fitters with plumbers and pipefitters, so there's no separate sprinkler-fitter-only figure.",
      businessNote: "Opening a New Jersey fire-sprinkler business takes a Division of Fire Safety contractor permit, with at least one NICET- or NAFED-certified classification holder on staff.",
    }),
    t("tile-setter", {
      outlook: ol([1090, 1220, 12, 90]),
      stateLicense: "contractor",
      licenseSummary: hicSummary("tile setter"),
      licenseAgency: NJ_HIC,
      businessNote: hicBusinessNote,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "contractor",
      licenseSummary: hicSummary("waterproofing installer"),
      licenseAgency: NJ_HIC,
      businessNote: hicBusinessNote,
      payNote: "Waterproofing has no distinct federal job category, so no state-specific job count exists for it in New Jersey or anywhere else on this site.",
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "New Jersey Office of Apprenticeship",
      detail: "Builds the New Jersey Apprenticeship Network and expands registered and pre-apprenticeship programs across the state, including help earning college credit for apprenticeship hours.",
      source: NJ_APPRENTICESHIP,
    },
  ],
  adults: [
    {
      title: "Community College Opportunity Grant (CCOG)",
      detail: "Covers full tuition at any of New Jersey's 18 county colleges for residents with household income up to $100,000, enrolled in 6+ credits, as a last-dollar grant on top of other aid.",
      source: NJ_CCOG,
    },
    {
      title: "Registered Apprenticeship",
      detail: "New Jersey's Office of Apprenticeship, part of the Dept. of Labor and Workforce Development's Career Services division, registers apprenticeships with the U.S. Dept. of Labor; apprentices earn wages from day one.",
      source: NJ_APPRENTICESHIP,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, New Jersey statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "New Jersey long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2061.00?st=NJ" },
    NJ_ELECTRICAL,
    NJ_PLUMBING,
    NJ_HVACR,
    NJ_ELEVATOR,
    NJ_FIRE_SAFETY,
    NJ_CRANE,
    NJ_HIC,
    NJ_CCOG,
    NJ_APPRENTICESHIP,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
