// Connecticut state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Connecticut-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Connecticut";

const CT_ELECTRICAL: SourceRef = { label: "Connecticut Dept. of Consumer Protection, Electrical License Types and Scope of Work", url: "https://portal.ct.gov/dcp/occupational-and-professional-division/occupational--profess/electrical-license-types-and-scope-of-work" };
const CT_PLUMBING: SourceRef = { label: "Connecticut Dept. of Consumer Protection, Plumbing Licenses and Scope of Work", url: "https://portal.ct.gov/dcp/occupational-and-professional-division/occupational--profess/plumbing-licenses-and-scope-of-work" };
const CT_HVAC: SourceRef = { label: "Connecticut Dept. of Consumer Protection, Heating, Piping and Cooling License Types and Scope of Work", url: "https://portal.ct.gov/dcp/occupational-and-professional-division/occupational--profess/heating-piping-and-cooling-license-types-and-scope-of-work" };
const CT_ELEVATOR: SourceRef = { label: "Connecticut Dept. of Consumer Protection, Elevator License Types and Scope of Work", url: "https://portal.ct.gov/DCP/Occupational-and-Professional-Division/Occupational--Profess/Elevator-License-Types-and-Scope-of-Work" };
const CT_FIRE_PROTECTION: SourceRef = { label: "Connecticut Dept. of Consumer Protection, Fire Protection Licenses and Scope of Work", url: "https://portal.ct.gov/dcp/occupational-and-professional-division/occupational--profess/fire-protection-licenses-and-scope-of-work" };
const CT_WELDING: SourceRef = { label: "Connecticut Dept. of Consumer Protection, Welding, Valves and Machinist Licenses and Scope of Work", url: "https://portal.ct.gov/dcp/occupational-and-professional-division/occupational--profess/welding-valves-and-machinist-licenses-and-scope-of-work" };
const CT_GLAZIER: SourceRef = { label: "Connecticut Dept. of Consumer Protection, Glaziers and Glasswork License Types and Scope of Work", url: "https://portal.ct.gov/dcp/occupational-and-professional-division/occupational--profess/glaziers-and-glasswork----license-types-and-scope-of-work" };
const CT_CRANE: SourceRef = { label: "Connecticut Dept. of Administrative Services, Examining Board for Crane Operators", url: "https://portal.ct.gov/das/examining-board-for-crane-operators-overview" };
const CT_TRADES_OVERVIEW: SourceRef = { label: "Connecticut Dept. of Consumer Protection, What Other License or Registration Does My Contractor Need?", url: "https://portal.ct.gov/dcp/occupational-and-professional-division/occupational--profess/what-other-license-or-registration-does-my-contractor-need" };
const CT_SHEET_METAL: SourceRef = { label: "Connecticut Dept. of Consumer Protection, Sheet Metal Licenses and Scope of Work", url: "https://portal.ct.gov/DCP/Occupational-and-Professional-Division/Occupational--Profess/Sheet-Metal-Licenses-and-Scope-of-Work" };
const CT_HOME_IMPROVEMENT: SourceRef = { label: "Connecticut Dept. of Consumer Protection, Home Improvement Contractor Application (Conn. Gen. Stat. Chapter 400)", url: "https://portal.ct.gov/dcp/license-services-division/all-license-applications/home-improvement-contractor-application" };
const CT_PACT: SourceRef = { label: "Connecticut Pledge to Advance Connecticut (PACT)", url: "https://qvcc.ctstate.edu/PACT" };
const CT_APPRENTICESHIP: SourceRef = { label: "Connecticut Dept. of Labor, Office of Apprenticeship Training", url: "https://portal.ct.gov/dol/divisions/apprenticeships" };

const IBEW_35: TrainingOption = {
  name: "IBEW Local 35 JATC",
  kind: "union",
  where: "Hartford",
  detail: "A paid union electrical apprenticeship serving the Hartford area.",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const UA_777: TrainingOption = {
  name: "Plumbers & Pipefitters Local 777 JATC",
  kind: "union",
  where: "Meriden",
  detail: "A paid union apprenticeship for plumbers and pipefitters.",
  programSlug: "ua-plumber-pipefitter-apprenticeship",
};
const IRONWORKERS_15: TrainingOption = {
  name: "Iron Workers Local 15",
  kind: "union",
  where: "Hartford",
  detail: "A paid union apprenticeship for ironworkers serving northern Connecticut.",
  programSlug: "iron-workers-apprenticeship",
};
const SMART_40: TrainingOption = {
  name: "Sheet Metal Workers Local 40 JATC",
  kind: "union",
  where: "Rocky Hill",
  detail: "A paid union apprenticeship for sheet metal workers.",
  programSlug: "smart-sheet-metal-apprenticeship",
};
const CARPENTERS_326: TrainingOption = {
  name: "Carpenters Local 326 / North Atlantic States Carpenters Training Fund",
  kind: "union",
  where: "Yalesville",
  detail: "A paid union apprenticeship for carpenters.",
};
const IUOE_478: TrainingOption = {
  name: "Operating Engineers Local 478",
  kind: "union",
  where: "Meriden",
  detail: "A paid union apprenticeship for heavy equipment operators, including crane operators.",
};
const CTECS: TrainingOption = {
  name: "Connecticut Technical Education and Career System (CTECS)",
  kind: "free-training",
  where: "Statewide, at CTECS technical high schools",
  detail: "Connecticut's statewide public high school system for trade shop programs, including electrical and plumbing pathways.",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const hiaSummary = (what: string) =>
  `Connecticut has no individual ${what} license. A business doing residential home-improvement work must register under the state's Home Improvement Act once qualifying billings pass $1,000 in any 12 consecutive months (jobs under $200 don't count as "home improvement" at all, so they don't count toward that total): $20,000 of liability insurance, a registration fee, and no skills exam. New-home construction and commercial work fall outside it and need no state license at all.`;
const ctNoLicense = (what: string) => `Connecticut has no state license for ${what}.`;

export const CONNECTICUT: StateGuide = {
  // Connecticut ZIP codes run 060xx-069xx.
  locationHints: { zip3: [[60, 69]], cities: ["Hartford", "New Haven", "Bridgeport", "Stamford", "Waterbury", "Norwalk"] },
  slug: "connecticut",
  code: "CT",
  name: S,
  lastVerified: "2026-11-22",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Connecticut long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2061.00?st=CT",
  },
  intro:
    "A field guide to 25 construction trades in Connecticut: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "Connecticut licenses trades by a letter-and-number code system run by the Dept. of Consumer Protection: E-1/E-2 for electricians, P-1/P-2 for plumbers, S-1/S-2 for HVAC, R-1/R-2 for elevator mechanics and F-1/F-2 for fire sprinkler fitters, each pairing an individual journeyperson license with a separate business-level contractor license.",
    "Connecticut individually licenses glaziers too, through FG-1/FG-2 (flat glass) and AG-1/AG-2 (automotive glass) credentials — unusual among the states on this site.",
    "Connecticut has no general statewide contractor's license. Most smaller trades fall under the Home Improvement Act, a registration rather than a tested license, which excludes commercial work and any work already covered by one of the trade boards above.",
    "Tile setters are the fastest-growing of the trades with Connecticut-specific projections (17%); several of the smallest trades, including elevator technicians and plasterers, have no state-specific job data at all, and solar installers have state pay data but no state-specific growth projection.",
    "Crane operators are licensed separately from the rest of the equipment-operator trade, through Connecticut's Examining Board for Crane Operators rather than the Dept. of Consumer Protection.",
  ],
  costMarker: { label: "Pledge to Advance Connecticut (PACT)", value: "$0", note: "Covers tuition and fees for up to 3 years (72 credits) at any Connecticut community college for first-time students, regardless of income" },
  licensingOverview:
    "Connecticut licenses construction trades through the Dept. of Consumer Protection's Occupational & Professional Division, using a letter-and-number code system under Conn. Gen. Stat. Chapter 393. Electricians (E-1/E-2), plumbers (P-1/P-2), HVAC technicians (S-1/S-2), elevator mechanics (R-1/R-2) and fire sprinkler fitters (F-1/F-2) each pair an individually held journeyperson license with a separate business-level contractor license; there's no additional \"master\" tier above journeyperson in any of these. Sheet metal work is licensed separately from HVAC (SM-2/SM-4/SM-6), and so is glazing (FG-1/FG-2 for flat glass, AG-1/AG-2 for automotive glass) — Connecticut is one of the few states on this site that individually licenses glaziers. Pipefitting has no license of its own; it falls under the same P-1/P-2 plumbing license. Crane operators are licensed separately again, through the Dept. of Administrative Services' Examining Board for Crane Operators rather than Consumer Affairs. Connecticut has no general statewide contractor's license. Most of the remaining smaller trades fall under the Home Improvement Act instead: a registration, not a skills-tested license, required once qualifying home-improvement billings pass $1,000 in any 12 consecutive months (jobs under $200 don't count as \"home improvement\" at all), and explicitly excluding commercial work, new-home-only construction, and any work already covered by one of the trade-specific licenses above.",
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
      "With no statewide general contractor license, Connecticut has one of the lower regulatory barriers to general contracting outside the licensed trades.",
      "A Home Improvement Act registration, once filed, covers most residential remodeling work statewide for a modest fee, with no skills exam to pass.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Unregistered home-improvement work can draw civil penalties up to $1,500 per violation, so the registration step matters even though it has no exam.",
    ],
    path:
      "The usual route: work for someone else for years, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      CT_HOME_IMPROVEMENT,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([13150, 14260, 8, 1190]),
      stateLicense: "none",
      licenseSummary: ctNoLicense("construction laborers") + " It's the largest trade on this page.",
      licenseAgency: CT_TRADES_OVERVIEW,
      training: [national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([8500, 9530, 12, 870]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Connecticut individually licenses journeyperson electricians, then licenses the business separately as a contractor. The main unlimited credentials are E-2 (journeyperson) and E-1 (contractor); narrower limited licenses cover low-voltage alarm work, electric signs, utility line work and solar.",
      licenseSteps: [
        { title: "E-2 Unlimited Journeyperson Electrician", detail: "A registered apprenticeship (or about 4 years of equivalent supervised experience), then a state exam." },
        { title: "E-1 Unlimited Electrical Contractor (business)", detail: "2 years working as an E-2 journeyperson (or about 6 years of equivalent experience), then an exam, to hold the business-level contractor license." },
      ],
      licenseAgency: CT_ELECTRICAL,
      training: [IBEW_35],
    }),
    t("equipment-operator", {
      outlook: ol([2900, 3090, 7, 260]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Connecticut has no general license for operating bulldozers, excavators or other heavy equipment, but anyone operating a crane needs a license from the state's Examining Board for Crane Operators, a different agency from the one that licenses the rest of the trades on this page.",
      licenseSteps: [
        { title: "Crane operator license", detail: "Issued by the Examining Board for Crane Operators under Conn. Gen. Stat. Chapter 539. Other heavy equipment has no state license." },
      ],
      licenseAgency: CT_CRANE,
      training: [IUOE_478],
    }),
    t("welder", {
      outlook: ol([2430, 2690, 11, 270]),
      stateLicense: "none",
      licenseSummary:
        ctNoLicense("general construction welders") + " A narrow exception exists for welding within an already-licensed piping system: G-8/G-9 Limited Welding licenses cover pipe welding tied to Connecticut's plumbing and heating license scopes, not structural or fabrication welding generally.",
      licenseAgency: CT_WELDING,
      training: [LEARN_ON_JOB("Welding shops and fabricators")],
    }),
    t("hvac-technician", {
      outlook: ol([4730, 5080, 7, 440]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Connecticut individually licenses journeyperson HVAC technicians, then licenses the business separately as a contractor. The main unlimited credentials are S-2 (journeyperson) and S-1 (contractor); many narrower limited licenses cover specific equipment like gas or oil burners, refrigeration-only work, and smaller heating and cooling systems.",
      licenseSteps: [
        { title: "S-2 Unlimited Journeyperson", detail: "A registered apprenticeship (or equivalent supervised experience), then a state exam." },
        { title: "S-1 Unlimited Contractor (business)", detail: "Additional years working as an S-2 journeyperson, then an exam, to hold the business-level contractor license." },
      ],
      licenseAgency: CT_HVAC,
      training: [UA_777],
    }),
    t("carpenter", {
      outlook: ol([9090, 10020, 10, 770]),
      stateLicense: "none",
      licenseSummary: hiaSummary("carpenter") + " It's the second-largest trade on this page.",
      licenseAgency: CT_HOME_IMPROVEMENT,
      training: [CARPENTERS_326],
    }),
    t("plumber", {
      outlook: ol([4750, 5200, 9, 450]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Connecticut individually licenses journeyperson plumbers, then licenses the business separately as a contractor. The main unlimited credentials are P-2 (journeyperson) and P-1 (contractor); narrower limited licenses cover things like well pumps, lawn sprinklers, sewer and storm lines, and pool and spa piping.",
      licenseSteps: [
        { title: "P-2 Unlimited Journeyperson Plumber", detail: "A registered apprenticeship (or equivalent supervised experience), then a state exam." },
        { title: "P-1 Unlimited Plumbing Contractor (business)", detail: "Additional years working as a P-2 journeyperson, then an exam, to hold the business-level contractor license." },
      ],
      licenseAgency: CT_PLUMBING,
      businessNote: "Opening a Connecticut plumbing business takes a P-1 Unlimited Plumbing Contractor license; a P-2 journeyperson can work for a licensed contractor but can't take plumbing jobs directly under their own name.",
      training: [UA_777],
    }),
    t("painter", {
      outlook: ol([3490, 3940, 13, 330]),
      stateLicense: "none",
      licenseSummary: hiaSummary("painter"),
      licenseAgency: CT_HOME_IMPROVEMENT,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([700, 730, 5, 50]),
      stateLicense: "none",
      licenseSummary: hiaSummary("concrete finisher"),
      licenseAgency: CT_HOME_IMPROVEMENT,
      training: [LEARN_ON_JOB("Concrete contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([420, 470, 12, 40]),
      stateLicense: "none",
      licenseSummary: hiaSummary("drywall installer"),
      licenseAgency: CT_HOME_IMPROVEMENT,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      stateLicense: "worker-certification",
      licenseSummary:
        "Connecticut individually licenses journeyperson elevator mechanics, then licenses the business separately as a contractor, through the same R-1/R-2 letter-code system used for other trades.",
      licenseSteps: [
        { title: "R-2 Unlimited Journeyperson", detail: "A 2-year/4,000-hour apprenticeship (or equivalent experience), then a state exam." },
        { title: "R-1 Unlimited Contractor (business)", detail: "2 years working as an R-2 journeyperson (or equivalent experience), then an exam, to hold the business-level contractor license." },
      ],
      licenseAgency: CT_ELEVATOR,
      payNote: "Connecticut publishes no pay or job projection for this small trade, so this page shows the national figures.",
      training: [national("Elevator Constructors union (IUEC) through NEIEP", "neiep-elevator-constructor-apprenticeship", "Union apprenticeship run through the National Elevator Industry Educational Program.")],
    }),
    t("flooring-installer", {
      outlook: ol([140, 160, 11, 10]),
      stateLicense: "none",
      licenseSummary: hiaSummary("flooring installer") + " It's one of the smallest trades on this page.",
      licenseAgency: CT_HOME_IMPROVEMENT,
      training: [LEARN_ON_JOB("Flooring contractors")],
    }),
    t("glazier", {
      outlook: ol([520, 540, 5, 40]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Connecticut individually licenses glaziers, unusual among the states on this site. FG-2 (journeyperson) and FG-1 (contractor) cover glass in residential and commercial structures; a separate AG-2/AG-1 pair covers automotive glass only.",
      licenseSteps: [
        { title: "FG-2 Glazier Journeyperson", detail: "6,000 hours of on-the-job training plus 432 hours of classroom instruction, then a state exam." },
        { title: "FG-1 Glazier Contractor (business)", detail: "2 more years (4,000 hours) working as an FG-2 journeyperson, on top of the journeyperson requirements, then an exam, to hold the business-level contractor license." },
      ],
      licenseAgency: CT_GLAZIER,
      training: [LEARN_ON_JOB("Glazing contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([320, 380, 16, 30]),
      stateLicense: "none",
      licenseSummary: hiaSummary("insulation installer") + " It's one of the fastest-growing trades with Connecticut-specific projections on this page.",
      licenseAgency: CT_HOME_IMPROVEMENT,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([290, 320, 9, 30]),
      stateLicense: "none",
      licenseSummary: ctNoLicense("ironworkers"),
      licenseAgency: CT_TRADES_OVERVIEW,
      training: [IRONWORKERS_15],
    }),
    t("mason", {
      outlook: ol([650, 680, 5, 50]),
      stateLicense: "none",
      licenseSummary: hiaSummary("mason"),
      licenseAgency: CT_HOME_IMPROVEMENT,
      training: [LEARN_ON_JOB("Masonry contractors")],
    }),
    t("millwright", {
      outlook: ol([190, 200, 5, 20]),
      stateLicense: "none",
      licenseSummary: ctNoLicense("millwrights") + " This is industrial work, outside the Home Improvement Act's residential-only scope.",
      licenseAgency: CT_TRADES_OVERVIEW,
      training: [LEARN_ON_JOB("Industrial millwright shops")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary:
        "Connecticut has no pipefitter license of its own; pipefitting work falls under the same P-1/P-2 plumbing and piping license used for plumbers.",
      licenseAgency: CT_PLUMBING,
      training: [UA_777],
      payNote: "Connecticut's BLS projection groups pipefitters with plumbers and sprinkler fitters, so there's no separate pipefitter-only figure.",
    }),
    t("plasterer-stucco-mason", {
      stateLicense: "none",
      licenseSummary: hiaSummary("plasterer or stucco mason") + " It's one of the smallest trades on this page.",
      licenseAgency: CT_HOME_IMPROVEMENT,
      payNote: "Connecticut publishes no pay or job projection for this small trade, so this page shows the national figures.",
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([1320, 1400, 6, 100]),
      stateLicense: "none",
      licenseSummary: hiaSummary("roofer"),
      licenseAgency: CT_HOME_IMPROVEMENT,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([1190, 1280, 7, 110]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Connecticut licenses sheet metal work separately from HVAC, through three contractor-and-journeyperson pairs by scope: SM-1/SM-2 for unlimited ductwork, SM-3/SM-4 for light commercial/residential ductwork, and SM-5/SM-6 for hood ductwork.",
      licenseSteps: [
        { title: "Journeyperson (SM-2, SM-4 or SM-6)", detail: "A registered apprenticeship or equivalent experience, then a state exam, for the matching scope: unlimited ductwork (SM-2), light commercial/residential ductwork (SM-4), or hood ductwork (SM-6)." },
        { title: "Contractor (SM-1, SM-3 or SM-5)", detail: "Additional qualifying experience as a journeyperson in the matching scope, then an exam, to hold the business-level contractor license." },
      ],
      licenseAgency: CT_SHEET_METAL,
      training: [SMART_40],
    }),
    t("solar-installer", {
      stateLicense: "worker-certification",
      licenseSummary:
        "Connecticut folds solar electric work into its electrical licensing system through a dedicated limited credential: PV-2 (journeyperson) and PV-1 (contractor) cover installing and repairing photovoltaic or wind-electric systems and their energy storage.",
      licenseSteps: [
        { title: "PV-2 Limited Solar Electric Journeyperson", detail: "A registered apprenticeship or equivalent experience in solar electric work, then a state exam." },
        { title: "PV-1 Limited Solar Electric Contractor (business)", detail: "Additional qualifying experience, then an exam, to hold the business-level contractor license." },
      ],
      licenseAgency: CT_ELECTRICAL,
      payNote: "Connecticut publishes pay data for this trade but no state-specific job-growth projection, so the growth figure shown here is national.",
      training: [LEARN_ON_JOB("Solar installation contractors")],
    }),
    t("sprinkler-fitter", {
      stateLicense: "worker-certification",
      licenseSummary:
        "Connecticut licenses fire sprinkler work separately from plumbing, through its own F-series credentials. F-2 (journeyperson) and F-1 (contractor) cover unlimited fire sprinkler work; narrower licenses cover special-hazard/foam systems and limited residential multipurpose sprinklers.",
      licenseSteps: [
        { title: "F-2 Unlimited Journeyperson", detail: "A 4-year sprinkler apprenticeship, then a state exam." },
        { title: "F-1 Unlimited Contractor (business)", detail: "Additional qualifying experience, then an exam, to hold the business-level contractor license." },
      ],
      licenseAgency: CT_FIRE_PROTECTION,
      training: [national("Road Sprinkler Fitters Local 669", "ua-sprinkler-fitter-apprenticeship", "A national sprinkler fitter union that hires through contractors in many states, including Connecticut.")],
      payNote: "Connecticut's BLS projection groups sprinkler fitters with plumbers and pipefitters, so there's no separate sprinkler-fitter-only figure.",
      businessNote: "Opening a Connecticut fire-sprinkler business takes an F-1 Unlimited Contractor license, held at the business level alongside at least one F-2-licensed journeyperson.",
    }),
    t("tile-setter", {
      outlook: ol([470, 550, 17, 40]),
      stateLicense: "none",
      licenseSummary: hiaSummary("tile setter") + " It's the fastest-growing trade with Connecticut-specific projections on this page.",
      licenseAgency: CT_HOME_IMPROVEMENT,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: hiaSummary("waterproofing installer"),
      licenseAgency: CT_HOME_IMPROVEMENT,
      payNote: "Waterproofing has no distinct federal job category, so no state-specific job count exists for it in Connecticut or anywhere else on this site.",
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Connecticut Technical Education and Career System (CTECS)",
      detail: "Connecticut's statewide public high school system for trade shop programs, including electrical and plumbing pathways, run by the State Dept. of Education.",
      source: { label: "Connecticut Technical Education and Career System", url: "https://www.cttech.org/" },
    },
  ],
  adults: [
    {
      title: "Pledge to Advance Connecticut (PACT)",
      detail: "Covers tuition and fees for up to 3 years (72 credits) at any Connecticut community college for first-time, credit-seeking students; not income-based, though FAFSA completion is required annually.",
      source: CT_PACT,
    },
    {
      title: "Registered Apprenticeship",
      detail: "Connecticut's Dept. of Labor, Office of Apprenticeship Training registers apprenticeships statewide, including the union JATCs on this page; apprentices earn wages from day one.",
      source: CT_APPRENTICESHIP,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Connecticut statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Connecticut long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2061.00?st=CT" },
    CT_ELECTRICAL,
    CT_PLUMBING,
    CT_HVAC,
    CT_ELEVATOR,
    CT_FIRE_PROTECTION,
    CT_WELDING,
    CT_GLAZIER,
    CT_CRANE,
    CT_HOME_IMPROVEMENT,
    CT_PACT,
    CT_APPRENTICESHIP,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
