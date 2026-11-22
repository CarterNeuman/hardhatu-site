// Massachusetts state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Massachusetts-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Massachusetts";

const MA_ELECTRICAL: SourceRef = { label: "Massachusetts Board of State Examiners of Electricians (237 CMR)", url: "https://www.mass.gov/orgs/board-of-state-examiners-of-electricians" };
const MA_PLUMBING: SourceRef = { label: "Massachusetts Board of State Examiners of Plumbers and Gas Fitters (248 CMR)", url: "https://www.mass.gov/orgs/board-of-state-examiners-of-plumbers-and-gas-fitters" };
const MA_MECHANICAL_BUREAU: SourceRef = { label: "Massachusetts Bureau of Pipefitters, Refrigeration Technicians, and Sprinkler Fitters (528 CMR 11)", url: "https://www.mass.gov/orgs/division-of-occupational-licensure" };
const MA_SHEET_METAL: SourceRef = { label: "Massachusetts Board of Examiners of Sheet Metal Workers (271 CMR)", url: "https://www.mass.gov/service-details/journeyperson-sheet-metal-worker-license-application" };
const MA_ELEVATOR: SourceRef = { label: "Massachusetts Board of Elevator Regulations (524 CMR)", url: "https://www.mass.gov/orgs/board-of-elevator-regulations" };
const MA_CSL: SourceRef = { label: "Massachusetts Board of Building Regulations and Standards, Construction Supervisor License (780 CMR)", url: "https://www.mass.gov/construction-supervisor-licensing" };
const MA_HIC: SourceRef = { label: "Massachusetts Home Improvement Contractor registration (M.G.L. c.142A)", url: "https://www.mass.gov/how-to/register-as-a-home-improvement-contractor" };
const MA_NO_LICENSE: SourceRef = { label: "Massachusetts Division of Occupational Licensure, licensed trades list (no board covers this trade)", url: "https://www.mass.gov/orgs/division-of-occupational-licensure" };
const MA_MASSEDUCATE: SourceRef = { label: "MassEducate (free community college tuition)", url: "https://www.mass.gov/masseducate" };
const MA_DAS: SourceRef = { label: "Massachusetts Division of Apprentice Standards (M.G.L. c.23)", url: "https://www.mass.gov/orgs/division-of-apprentice-standards" };
const MA_CHAPTER74: SourceRef = { label: "Massachusetts Chapter 74 vocational-technical education", url: "https://www.doe.mass.edu/ccte/cvte/cte-families/" };

const IBEW_103: TrainingOption = {
  name: "IBEW Local 103 JATC",
  kind: "union",
  where: "Dorchester (Boston)",
  detail: "A paid union electrical apprenticeship serving the greater Boston area.",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const UA_12: TrainingOption = {
  name: "Plumbers Local 12 JATC",
  kind: "union",
  where: "Boston",
  detail: "A paid union apprenticeship for plumbers and gas fitters.",
  programSlug: "ua-plumber-pipefitter-apprenticeship",
};
const PIPEFITTERS_537: TrainingOption = {
  name: "Pipefitters Local 537 JATC",
  kind: "union",
  where: "Dorchester (Boston)",
  detail: "A paid union apprenticeship for pipefitters and refrigeration technicians.",
  programSlug: "ua-plumber-pipefitter-apprenticeship",
};
const SPRINKLER_550: TrainingOption = {
  name: "Sprinkler Fitters Local 550",
  kind: "union",
  where: "Weymouth",
  detail: "A paid union apprenticeship for fire sprinkler fitters serving eastern Massachusetts.",
  programSlug: "ua-sprinkler-fitter-apprenticeship",
};
const IRONWORKERS_7: TrainingOption = {
  name: "Iron Workers Local 7",
  kind: "union",
  where: "South Boston",
  detail: "A paid union apprenticeship for structural and ornamental ironworkers.",
  programSlug: "iron-workers-apprenticeship",
};
const SMART_17: TrainingOption = {
  name: "Sheet Metal Workers Local 17",
  kind: "union",
  where: "Dorchester (Boston)",
  detail: "A paid union apprenticeship for sheet metal workers serving the Boston/New Bedford/Fall River area.",
  programSlug: "smart-sheet-metal-apprenticeship",
};
const CARPENTERS_NASCTF: TrainingOption = {
  name: "North Atlantic States Carpenters Training Fund",
  kind: "union",
  where: "Millbury, with centers also in Boston",
  detail: "A paid union apprenticeship for carpenters.",
};
const IUOE_4: TrainingOption = {
  name: "Operating Engineers Local 4",
  kind: "union",
  where: "Canton",
  detail: "A paid union apprenticeship for heavy equipment operators.",
};
const BUILDING_PATHWAYS: TrainingOption = {
  name: "Building Pathways",
  kind: "free-training",
  where: "Boston",
  detail: "A pre-apprenticeship program preparing people, especially women and people of color, for union construction apprenticeships.",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const csHicSummary = (what: string) =>
  `Massachusetts has no individual ${what} license. Supervising construction on a 1-4 family home, or on any building under 35,000 cubic feet, generally needs a Construction Supervisor License (CSL) held by someone on the job; a business doing residential remodeling or repair also needs a Home Improvement Contractor (HIC) registration. Neither is a trade-specific skills exam for this work, and commercial work above that size needs only a registered design professional, not a contractor license.`;
const maNoLicense = (what: string) => `Massachusetts has no state license for ${what}.`;

export const MASSACHUSETTS: StateGuide = {
  // Massachusetts ZIP codes run roughly 010xx-027xx, plus 055xx and 057xx-059xx.
  locationHints: { zip3: [[10, 27], [55, 55], [57, 59]], cities: ["Boston", "Worcester", "Springfield", "Lowell", "Cambridge", "Brockton"] },
  slug: "massachusetts",
  code: "MA",
  name: S,
  lastVerified: "2026-11-22",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Massachusetts long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2061.00?st=MA",
  },
  intro:
    "A field guide to 25 construction trades in Massachusetts: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "Massachusetts splits HVAC licensing unusually across two boards: refrigeration and air conditioning work over 10 tons falls under the Bureau of Pipefitters, Refrigeration Technicians, and Sprinkler Fitters, while gas-fired heating falls under the plumbing and gas-fitting board.",
    "Massachusetts individually licenses pipefitters with their own journeyman-and-master ladder, separate from plumbing — unlike most states, where pipefitting shares the plumber's license.",
    "There's no state general contractor's license. A Construction Supervisor License (CSL) covers who may oversee permitted construction on smaller buildings, and a separate Home Improvement Contractor (HIC) registration covers the business side of residential remodeling, including specialty CSL tiers for masonry, roofing and insulation.",
    "Massachusetts has one of the most extensive public vocational-technical high school systems in the country (Chapter 74 schools), a real head start into these trades before graduation.",
    "Electricians are the fastest-growing of the trades with Massachusetts-specific projections (12%); stonemasons are the only one projected to shrink.",
  ],
  costMarker: { label: "MassEducate", value: "$0", note: "Free community college tuition and fees for Massachusetts residents of any age or income, as a last-dollar award on top of other aid" },
  licensingOverview:
    "Most individual-worker licensing in Massachusetts runs through the Division of Occupational Licensure. Electricians (Board of State Examiners of Electricians) and plumbers (Board of State Examiners of Plumbers and Gas Fitters, which combines plumbing and gas-fitting into one license) each have a full journeyman-and-master ladder. HVAC splits unusually across two separate systems: refrigeration and air-conditioning work over 10 tons needs a license from the Bureau of Pipefitters, Refrigeration Technicians, and Sprinkler Fitters, while gas-fired heating work falls under the plumbing and gas-fitting board instead — there's no single unified HVAC license. That same Bureau individually licenses pipefitters (with their own journeyman-and-master ladder, separate from plumbing) and sprinkler fitters. Elevator mechanics are licensed by the Board of Elevator Regulations. Massachusetts has no general state contractor's license. Instead, a Construction Supervisor License (CSL) — in eight types, including specialty tiers for masonry, roof covering, windows/doors/siding, insulation, demolition and solid-fuel-burning appliances — covers who may supervise permitted construction on 1-4 family homes and smaller buildings, while a separate Home Improvement Contractor (HIC) registration covers the business side of residential remodeling and repair work. Neither CSL nor HIC is a trade-specific skills exam the way the electrician or plumber boards are.",
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
      "A CSL or HIC registration, once earned, covers residential construction and remodeling work across the whole state under one credential.",
      "Massachusetts's dense market and high cost of living push pay for nearly every trade well above the national figures shown on this page.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Massachusetts does not recognize out-of-state contractor licenses, so a mover has to start the CSL/HIC process from scratch.",
    ],
    path:
      "The usual route: work for someone else for years, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      MA_CSL,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([22430, 24570, 10, 2060]),
      stateLicense: "none",
      licenseSummary: maNoLicense("construction laborers") + " It's the largest trade with Massachusetts-specific data on this page.",
      licenseAgency: MA_NO_LICENSE,
      training: [BUILDING_PATHWAYS, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([17570, 19610, 12, 1790]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "The Board of State Examiners of Electricians licenses a full journeyman-and-master ladder, plus separate Systems Technician/Systems Contractor credentials for low-voltage and systems work.",
      licenseSteps: [
        { title: "Journeyman Electrician", detail: "600 Board-approved education hours plus 8,000 hours of supervised work experience over at least 4 years under a licensed journeyman, then an exam." },
        { title: "Master Electrician", detail: "150 Board-approved hours, a Journeyman license, plus at least 1 more year of experience, then an exam." },
        { title: "Systems Technician / Systems Contractor (optional)", detail: "A separate, narrower ladder (300 hours/4,000 hours over 2 years for Technician; 75 hours plus 1 year as a Technician for Contractor) for low-voltage and systems work only." },
      ],
      licenseAgency: MA_ELECTRICAL,
      training: [IBEW_103],
    }),
    t("equipment-operator", {
      outlook: ol([10360, 11010, 6, 930]),
      stateLicense: "none",
      licenseSummary: maNoLicense("heavy equipment operators"),
      licenseAgency: MA_NO_LICENSE,
      training: [IUOE_4],
    }),
    t("welder", {
      outlook: ol([3200, 3340, 4, 330]),
      stateLicense: "none",
      licenseSummary: maNoLicense("welders") + " Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      licenseAgency: MA_NO_LICENSE,
      training: [LEARN_ON_JOB("Welding shops and fabricators")],
    }),
    t("hvac-technician", {
      outlook: ol([8220, 9030, 10, 800]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Massachusetts splits HVAC licensing across two systems, with no single unified HVAC license. Refrigeration and air-conditioning work over 10 tons needs a Refrigeration Technician license; gas-fired heating work instead falls under the plumbing and gas-fitting board.",
      licenseSteps: [
        { title: "Refrigeration Apprentice", detail: "Must be registered with the Division of Apprentice Standards and employed by a licensed Massachusetts Refrigeration Contractor." },
        { title: "Refrigeration Technician", detail: "At least 6,000 hours as a licensed apprentice, or at least 450 hours of approved schooling, then an exam. Required for refrigeration/AC work over 10 tons aggregate capacity." },
        { title: "Gas-fired heating work", detail: "Falls under the separate Plumbers and Gas Fitters license instead of the refrigeration ladder above." },
      ],
      licenseAgency: MA_MECHANICAL_BUREAU,
      training: [PIPEFITTERS_537],
    }),
    t("carpenter", {
      outlook: ol([25670, 27290, 6, 2050]),
      stateLicense: "contractor",
      licenseSummary: csHicSummary("carpenter") + " It's the largest trade with Massachusetts-specific data on this page.",
      licenseAgency: MA_HIC,
      training: [CARPENTERS_NASCTF],
    }),
    t("plumber", {
      outlook: ol([16650, 17730, 7, 1500]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "The Board of State Examiners of Plumbers and Gas Fitters licenses plumbers with a combined plumbing-and-gas-fitting credential, not two separate licenses.",
      licenseSteps: [
        { title: "Apprentice Plumber", detail: "For apprentices licensed after Sept. 1, 2008: 550 hours of structured classroom education across five 110-hour tiers, plus 6,800 hours of supervised work experience, certified by a licensed Master Plumber employer." },
        { title: "Journeyman Plumber", detail: "Completion of the apprenticeship above, then an exam." },
        { title: "Master Plumber", detail: "Further qualifying experience as a journeyman, then an exam." },
      ],
      licenseAgency: MA_PLUMBING,
      businessNote: "A Massachusetts plumbing business operates under a Master Plumber; there's no separate business-level license layered on top of the Master credential itself.",
      training: [UA_12],
    }),
    t("painter", {
      outlook: ol([7160, 7550, 6, 600]),
      stateLicense: "contractor",
      licenseSummary: csHicSummary("painter"),
      licenseAgency: MA_HIC,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([1670, 1720, 3, 120]),
      stateLicense: "contractor",
      licenseSummary: csHicSummary("concrete finisher"),
      licenseAgency: MA_HIC,
      training: [LEARN_ON_JOB("Concrete contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([1080, 1140, 6, 80]),
      stateLicense: "contractor",
      licenseSummary: csHicSummary("drywall installer"),
      licenseAgency: MA_HIC,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([490, 520, 7, 40]),
      stateLicense: "worker-certification",
      licenseSummary: "The Board of Elevator Regulations licenses elevator mechanics individually, alongside a separate business-level contractor license.",
      licenseAgency: MA_ELEVATOR,
      training: [national("Elevator Constructors union (IUEC) through NEIEP", "neiep-elevator-constructor-apprenticeship", "Union apprenticeship run through the National Elevator Industry Educational Program.")],
    }),
    t("flooring-installer", {
      outlook: ol([1240, 1380, 11, 100]),
      stateLicense: "contractor",
      licenseSummary: csHicSummary("flooring installer"),
      licenseAgency: MA_HIC,
      training: [LEARN_ON_JOB("Flooring contractors")],
    }),
    t("glazier", {
      outlook: ol([1640, 1720, 5, 140]),
      stateLicense: "contractor",
      licenseSummary:
        "Massachusetts has no individual glazier license. Residential window, door and siding work generally falls under the Windows/Doors/Siding specialty Construction Supervisor License, plus HIC registration for the business; commercial glazing and curtain-wall work needs no state license.",
      licenseAgency: MA_CSL,
      training: [LEARN_ON_JOB("Glazing contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([840, 890, 5, 70]),
      stateLicense: "contractor",
      licenseSummary:
        "Massachusetts has no individual insulation-installer license. Residential work generally falls under the Insulation specialty Construction Supervisor License, plus HIC registration for the business.",
      licenseAgency: MA_CSL,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([2150, 2280, 6, 180]),
      stateLicense: "none",
      licenseSummary: maNoLicense("ironworkers"),
      licenseAgency: MA_NO_LICENSE,
      training: [IRONWORKERS_7],
    }),
    t("mason", {
      outlook: ol([1580, 1660, 5, 120]),
      stateLicense: "contractor",
      licenseSummary:
        "Massachusetts has no individual mason license. Residential work generally falls under the Masonry specialty Construction Supervisor License, plus HIC registration for the business.",
      licenseAgency: MA_CSL,
      training: [LEARN_ON_JOB("Masonry contractors")],
    }),
    t("millwright", {
      payNote: "Massachusetts publishes pay data for this trade but no state-specific job-growth projection, so the growth figure shown here is national.",
      stateLicense: "none",
      licenseSummary: maNoLicense("millwrights") + " This is industrial work, outside the CSL/HIC system's residential focus.",
      licenseAgency: MA_NO_LICENSE,
      training: [LEARN_ON_JOB("Industrial millwright shops")],
    }),
    t("pipefitter", {
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Unlike most states, Massachusetts individually licenses pipefitters with their own journeyman-and-master ladder, separate from the plumbing license.",
      licenseSteps: [
        { title: "Apprentice Pipefitter", detail: "Registered with the Division of Apprentice Standards and employed by a licensed Massachusetts pipefitting contractor." },
        { title: "Journeyman Pipefitter", detail: "Completion of a registered apprenticeship, then an exam." },
        { title: "Master Pipefitter", detail: "Further qualifying experience as a journeyman, then an exam." },
      ],
      licenseAgency: MA_MECHANICAL_BUREAU,
      training: [PIPEFITTERS_537],
      payNote: "Massachusetts's BLS projection groups pipefitters with plumbers and steamfitters, so there's no separate pipefitter-only figure.",
    }),
    t("plasterer-stucco-mason", {
      outlook: ol([170, 180, 7, 10]),
      stateLicense: "contractor",
      licenseSummary: csHicSummary("plasterer or stucco mason") + " It's one of the smallest trades on this page.",
      licenseAgency: MA_HIC,
      payNote: "Massachusetts publishes a job-growth projection for this trade but no state-specific pay data, so the pay figures shown here are national.",
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([2630, 2830, 8, 210]),
      stateLicense: "contractor",
      licenseSummary:
        "Massachusetts has no individual roofer license. Residential work generally falls under the Roof Covering specialty Construction Supervisor License, plus HIC registration for the business.",
      licenseAgency: MA_CSL,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      payNote: "Massachusetts publishes pay data for this trade but no state-specific job-growth projection, so the growth figure shown here is national.",
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "The Board of Examiners of Sheet Metal Workers licenses a full journeyperson-and-master ladder, with unrestricted (J-1/M-1) and restricted, smaller-building (J-2/M-2) tiers at each level.",
      licenseSteps: [
        { title: "Journeyperson Sheet Metal Worker (J-1 unrestricted)", detail: "8,000 apprentice hours plus 750 Board-approved classroom hours, then an exam. The restricted J-2 tier (smaller buildings) needs 4,800 hours plus 450 classroom hours instead." },
        { title: "Master Sheet Metal Worker (M-1 or M-2)", detail: "A J-1 license (for M-1) or a J-1/J-2 license (for M-2), plus a 40-hour Master's course or equivalent business course, then an exam." },
      ],
      licenseAgency: MA_SHEET_METAL,
      training: [SMART_17],
    }),
    t("solar-installer", {
      payNote: "Massachusetts publishes pay data for this trade but no state-specific job-growth projection, so the growth figure shown here is national.",
      stateLicense: "none",
      licenseSummary:
        "Massachusetts has no separate solar-installer license. Installing, wiring or repairing photovoltaic panels and components must be done by a Massachusetts-licensed electrician, under the electrician licensing ratio rules in M.G.L. c.141 §1.",
      licenseAgency: MA_ELECTRICAL,
      training: [LEARN_ON_JOB("Solar installation contractors")],
    }),
    t("sprinkler-fitter", {
      stateLicense: "worker-certification",
      licenseSummary:
        "The same Bureau that licenses pipefitters and refrigeration technicians individually licenses fire sprinkler fitters, through an apprentice-to-journeyman ladder.",
      licenseSteps: [
        { title: "Apprentice Sprinkler Fitter", detail: "Registered with the Division of Apprentice Standards and employed by a licensed Massachusetts sprinkler contractor; at least 144 study hours per year of apprenticeship." },
        { title: "Journeyman Sprinkler Fitter", detail: "At least 8,000 hours as a licensed apprentice under a Massachusetts sprinkler contractor, then an exam." },
      ],
      licenseAgency: MA_MECHANICAL_BUREAU,
      training: [SPRINKLER_550],
      payNote: "Massachusetts's BLS projection groups sprinkler fitters with plumbers and pipefitters, so there's no separate sprinkler-fitter-only figure.",
      businessNote: "Opening a Massachusetts fire-sprinkler business takes a sprinkler contractor license from the same Bureau that licenses individual sprinkler fitters.",
    }),
    t("tile-setter", {
      payNote: "Massachusetts publishes pay data for this trade but no state-specific job-growth projection, so the growth figure shown here is national.",
      stateLicense: "contractor",
      licenseSummary: csHicSummary("tile setter"),
      licenseAgency: MA_HIC,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "contractor",
      licenseSummary: csHicSummary("waterproofing installer"),
      licenseAgency: MA_HIC,
      payNote: "Waterproofing has no distinct federal job category, so no state-specific job count exists for it in Massachusetts or anywhere else on this site.",
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Chapter 74 Vocational-Technical Education",
      detail: "Massachusetts runs one of the most extensive public vocational-technical high school systems in the country, with dedicated regional voc-tech schools and Chapter 74-approved programs inside many comprehensive high schools covering electrical, plumbing, carpentry and HVAC.",
      source: MA_CHAPTER74,
    },
    {
      title: "Building Pathways",
      detail: "A Boston pre-apprenticeship program that prepares people, especially women and people of color, for union construction apprenticeships.",
      source: { label: "Building Pathways Boston", url: "https://www.mass.gov/doc/building-pathways-pre-apprenticeship-brochure/download" },
    },
  ],
  adults: [
    {
      title: "MassEducate",
      detail: "Free tuition and fees at any Massachusetts community college, for residents of any age and regardless of income, as a last-dollar award; requires 6+ credits per term and satisfactory academic progress.",
      source: MA_MASSEDUCATE,
    },
    {
      title: "Registered Apprenticeship",
      detail: "Massachusetts's Division of Apprentice Standards, under the Dept. of Labor Standards, registers apprenticeships statewide under M.G.L. Chapter 23; apprentices earn wages from day one.",
      source: MA_DAS,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Massachusetts statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Massachusetts long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2061.00?st=MA" },
    MA_ELECTRICAL,
    MA_PLUMBING,
    MA_MECHANICAL_BUREAU,
    MA_ELEVATOR,
    MA_CSL,
    MA_HIC,
    MA_MASSEDUCATE,
    MA_DAS,
    MA_CHAPTER74,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
