// Delaware state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Delaware-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, NEIEP, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Delaware";

const DE_ELECTRICIAN: SourceRef = { label: "Delaware Board of Electrical Examiners (24 Del. C. ch. 14)", url: "https://dpr.delaware.gov/boards/electrician/newlicense" };
const DE_PLUMBING_HVACR: SourceRef = { label: "Delaware Board of Plumbing, Heating, Ventilation, Air Conditioning and Refrigeration Examiners", url: "https://dpr.delaware.gov/boards/plumbers" };
const DE_FIRE_MARSHAL: SourceRef = { label: "Delaware Office of the State Fire Marshal, fire protection systems licensing", url: "https://statefiremarshal.delaware.gov/plan-review-and-inspections/fire-protection-systems-licensing-requirements-quality-assurance-forms/fire-suppression-systems-sprinklers-standpipes" };
const DE_ELEVATOR: SourceRef = { label: "Delaware Board of Elevator Mechanics (24 Del. C. ch. 61)", url: "https://dpr.delaware.gov/boards/elevator-mechanics/elevator-mechanic" };
const DE_NO_LICENSE: SourceRef = { label: "Delaware Division of Professional Regulation, board list (no board covers this trade)", url: "https://dpr.delaware.gov/boards/" };
const DE_BUSINESS: SourceRef = { label: "Delaware Division of Revenue, contractor business license", url: "https://revenue.delaware.gov/business-tax/contractors/" };
const DE_SEED: SourceRef = { label: "Delaware SEED Scholarship (14 Del. C. ch. 34, subch. XIV)", url: "https://delcode.delaware.gov/title14/c034/sc14/index.html" };
const DE_APPRENTICESHIP: SourceRef = { label: "Delaware Dept. of Labor, Apprenticeship and Training", url: "https://labor.delaware.gov/divisions/employment-training/apprenticeship-and-training" };

const IBEW_313: TrainingOption = {
  name: "IBEW Local 313 JATC",
  kind: "union",
  where: "New Castle",
  detail: "A paid union electrical apprenticeship serving northern Delaware.",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const UA_74: TrainingOption = {
  name: "Plumbers & Pipefitters Local Union 74 JATC",
  kind: "union",
  where: "Newark",
  detail: "A paid union apprenticeship for plumbers, pipefitters and HVAC technicians serving Delaware.",
  programSlug: "ua-plumber-pipefitter-apprenticeship",
};
const UA_669: TrainingOption = {
  name: "Sprinkler Fitters Local Union 669",
  kind: "union",
  where: "Newark",
  detail: "A paid union apprenticeship for fire sprinkler fitters, registered with the Delaware Dept. of Labor.",
  programSlug: "ua-sprinkler-fitter-apprenticeship",
};
const LIUNA_55: TrainingOption = {
  name: "Laborers Local 55",
  kind: "union",
  where: "Newark, NJ (jurisdiction includes Delaware)",
  detail: "A paid union apprenticeship for construction laborers; the local is based in New Jersey but its jurisdiction covers Delaware as well as New York and Puerto Rico.",
  programSlug: "liuna-laborer-apprenticeship",
};
const IUOE_542: TrainingOption = {
  name: "Operating Engineers Local 542",
  kind: "union",
  where: "Townsend",
  detail: "A paid union apprenticeship for heavy equipment operators, registered with the Delaware Dept. of Labor.",
  programSlug: "iuoe-heavy-equipment-operator-apprenticeship",
};
const IRONWORKERS_451: TrainingOption = {
  name: "Iron Workers Local 451",
  kind: "union",
  where: "Wilmington",
  detail: "A paid union apprenticeship for structural and ornamental ironworkers, registered with the Delaware Dept. of Labor.",
  programSlug: "iron-workers-apprenticeship",
};
const BRICKLAYERS_1: TrainingOption = {
  name: "Bricklayers Local 1 JAC",
  kind: "union",
  where: "Elsmere",
  detail: "A paid union apprenticeship for masons, registered with the Delaware Dept. of Labor.",
};
const INSULATORS_42: TrainingOption = {
  name: "Insulators JATC Local 42",
  kind: "union",
  where: "New Castle",
  detail: "A paid union apprenticeship for insulation installers, registered with the Delaware Dept. of Labor.",
};
const SMART_19: TrainingOption = {
  name: "Sheet Metal Workers JAC Local 19",
  kind: "union",
  where: "Philadelphia, PA (serves Delaware)",
  detail: "A Philadelphia-based union apprenticeship that commonly trains Delaware sheet metal workers.",
  programSlug: "smart-sheet-metal-apprenticeship",
};
const DEL_TECH: TrainingOption = {
  name: "Delaware Technical Community College, Construction Management",
  kind: "college",
  where: "Statewide",
  detail: "A construction management program at Delaware's statewide community college system.",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const deBusinessNote =
  "Running a business in Delaware, in this trade or any other, just takes a $75 annual contractor registration through the Division of Revenue, plus a 0.6472% gross receipts tax on construction income above a monthly exemption.";
const deNoLicense = (what: string) => `Delaware has no state license for ${what}; only the generic business registration described below applies.`;
const deSmallTradeNote = "Delaware publishes no pay or job-growth data for this small trade, so this page shows the national figures.";
const deGrowthMissingNote = "Delaware publishes pay data for this trade but no state-specific job-growth projection, so the growth figure shown here is national.";

export const DELAWARE: StateGuide = {
  // Delaware ZIP codes run 197xx-199xx.
  locationHints: { zip3: [[197, 199]], cities: ["Wilmington", "Newark", "Dover", "Middletown", "Georgetown", "Seaford"] },
  slug: "delaware",
  code: "DE",
  name: S,
  lastVerified: "2026-11-22",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Delaware long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2061.00?st=DE",
  },
  intro:
    "A field guide to 25 construction trades in Delaware: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ roughly 16,000 people in Delaware, a small-state market concentrated around Wilmington and Newark in New Castle County.",
    "Only three boards license construction trades statewide: the Board of Electrical Examiners, the shared Plumbing/HVACR board, and the Board of Elevator Mechanics. Fire sprinkler work is licensed separately by the Office of the State Fire Marshal.",
    "Delaware's plumbing and HVACR licenses skip the journeyman tier entirely; the only individually held license at either trade is a Master-level credential.",
    "Electrician is the fastest-growing trade on this page, projected to grow 19%.",
    "No trade on this page is projected to shrink in Delaware over this period.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "Delaware SEED Scholarship", value: "$0", note: "Covers full tuition at Delaware Technical Community College for eligible Delaware residents, as a last-dollar grant on top of other aid, for credit or noncredit programs leading to a recognized credential" },
  licensingOverview:
    "Delaware licenses construction trades through just three boards. Electricians have a full seven-tier system running from Apprentice through Journeyperson up to Master, with optional narrower Residential and Limited tiers in between. Plumbing and HVACR work are different: Delaware's statute skips the journeyman tier for licensure purposes entirely, so the only individually held license in either trade is a Master-level one (Master Plumber, or Master HVACR/Master HVACR Restricted for a single specialty). Fire sprinkler work runs through the Office of the State Fire Marshal rather than through the Division of Professional Regulation at all: individual fitters earn one of several NICET-based certificate classes, and the business then needs a separate company license with at least one certificate holder on staff. Every other trade on this page, including carpentry, roofing, masonry and sheet metal work, has no Delaware occupational license of any kind; the only thing a business in those trades needs is the state's generic $75 annual contractor registration through the Division of Revenue, plus the gross receipts tax that applies to construction income statewide.",
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
      "With no statewide general contractor license and a flat $75 business registration, Delaware has one of the lower regulatory barriers to starting a contracting business of any state on this site, outside the licensed trades.",
      "A Delaware master electrician, plumber or HVACR license carries real weight and is recognized statewide.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "The gross receipts tax applies to construction income from day one of running a business, on top of ordinary costs.",
    ],
    path:
      "The usual route: work for someone else for years, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      DE_BUSINESS,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([3490, 3900, 12, 330]),
      stateLicense: "none",
      licenseSummary: deNoLicense("construction laborers"),
      licenseAgency: DE_NO_LICENSE,
      businessNote: deBusinessNote,
      training: [LIUNA_55],
    }),
    t("electrician", {
      outlook: ol([2420, 2870, 19, 270]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Delaware's Board of Electrical Examiners runs a seven-tier system: Apprentice, Journeyperson, Master, plus narrower Residential, Limited, Master Special and Limited Special tiers. It's the fastest-growing trade on this page.",
      licenseSteps: [
        { title: "Apprentice", detail: "Enrolled in a Board-approved apprenticeship program." },
        { title: "Journeyperson", detail: "Complete a Board-approved apprenticeship (certificate of completion), then a written exam; the exam is waived if the apprenticeship's own final exam was passed." },
        { title: "Residential (optional, narrower scope)", detail: "A residential-specific apprenticeship or qualifying experience, plus a Residential Electrical exam; scope is limited to residential buildings from the breaker panel onward." },
        { title: "Limited (optional, narrower scope)", detail: "3 years working under a master or limited electrician, or an apprenticeship certificate of completion, then a written exam." },
        { title: "Master", detail: "6 years of full-time work under a master electrician, or 4 years plus 2 years of technical training, or an apprenticeship certificate of completion, then a written exam and proof of $300,000 minimum general-liability insurance." },
      ],
      licenseAgency: DE_ELECTRICIAN,
      training: [IBEW_313],
    }),
    t("equipment-operator", {
      outlook: ol([1290, 1360, 6, 110]),
      stateLicense: "none",
      licenseSummary: "Delaware has no state license for equipment operators. Employers look for training records and safe hours in the seat, and crane operators need national certification under federal OSHA rules.",
      licenseAgency: DE_NO_LICENSE,
      businessNote: deBusinessNote,
      training: [IUOE_542],
    }),
    t("welder", {
      outlook: ol([560, 610, 9, 60]),
      stateLicense: "none",
      licenseSummary: "Delaware has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      licenseAgency: DE_NO_LICENSE,
      businessNote: deBusinessNote,
      training: [LEARN_ON_JOB("Welding shops and fabricators")],
    }),
    t("hvac-technician", {
      outlook: ol([1880, 2170, 16, 200]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Delaware's plumbing/HVACR statute skips the journeyman tier entirely for licensure. The only individually held license is Master HVACR (or a single-specialty Master HVACR Restricted version, covering just one of six narrower scopes). As of March 11, 2025, an applicant for a restricted license only has to pass the exam section for that one restriction.",
      licenseSteps: [
        { title: "Master HVACR (or a single-specialty Restricted version)", detail: "A journeyman's certificate from a federally approved apprenticeship plus 2 years of HVACR experience under a licensed master; or, without a certificate, 7 years of experience under a licensed master plus a Board-approved Bypass Exam (reciprocity from another state is also possible). Then a CFC certification card for refrigerant work. Since March 11, 2025, an applicant for the single-specialty Master HVACR Restricted version only has to pass the Bypass Exam section covering that one specialty, not the full exam." },
      ],
      licenseAgency: DE_PLUMBING_HVACR,
      training: [UA_74],
    }),
    t("carpenter", {
      outlook: ol([2070, 2380, 15, 190]),
      stateLicense: "none",
      licenseSummary: deNoLicense("carpenters"),
      licenseAgency: DE_NO_LICENSE,
      businessNote: deBusinessNote,
      training: [DEL_TECH, LEARN_ON_JOB("Carpentry contractors")],
    }),
    t("plumber", {
      outlook: ol([1680, 1900, 13, 170]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Delaware's plumbing statute also skips a stand-alone journeyman license. Journeyman-level work (1 year/1,200 hours) is a qualifying step toward the only individually held license, Master Plumber, not an independent credential of its own.",
      licenseSteps: [
        { title: "Master Plumber", detail: "Minimum age 21. With a journeyman certificate from a federally approved apprenticeship: 2 years of work experience under a master licensee after certification, then an exam. Without one: 7 years of work experience under a master licensee, with the Board able to approve an Apprenticeship By-Pass Exam administered through the state's vocational-technical schools (New Castle County Vo-Tech, Polytech, or Sussex Tech). Exam pass score is 70% or higher." },
      ],
      licenseAgency: DE_PLUMBING_HVACR,
      businessNote: "Vehicles used for licensed plumbing work must display \"Licensed Plumber\" plus the license number in letters at least 3 inches tall, on top of the standard $75 Division of Revenue business registration every construction business needs.",
      training: [UA_74],
    }),
    t("painter", {
      outlook: ol([720, 800, 11, 70]),
      stateLicense: "none",
      licenseSummary: deNoLicense("painters"),
      licenseAgency: DE_NO_LICENSE,
      businessNote: deBusinessNote,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([470, 520, 10, 40]),
      stateLicense: "none",
      licenseSummary: deNoLicense("concrete finishers"),
      licenseAgency: DE_NO_LICENSE,
      businessNote: deBusinessNote,
      training: [LEARN_ON_JOB("Concrete contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([440, 500, 13, 40]),
      stateLicense: "none",
      licenseSummary: deNoLicense("drywall installers"),
      licenseAgency: DE_NO_LICENSE,
      businessNote: deBusinessNote,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      stateLicense: "worker-certification",
      licenseSummary:
        "Delaware's Board of Elevator Mechanics licenses mechanics through a certification, experience, or reciprocity path. No separate Delaware-specific job-growth projection or pay figure is published for this small trade.",
      licenseSteps: [
        { title: "Elevator Mechanic", detail: "Pass a CET or NEIEP certification exam, or show Board-pre-approved experience: 6 years full-time under a licensed mechanic, 8,000 hours plus 576 hours of related instruction, or 4 years full-time plus 6,000 hours of technical training." },
      ],
      licenseAgency: DE_ELEVATOR,
      payNote: deSmallTradeNote,
      training: [NEIEP],
    }),
    t("flooring-installer", {
      stateLicense: "none",
      licenseSummary: deNoLicense("flooring installers"),
      licenseAgency: DE_NO_LICENSE,
      businessNote: deBusinessNote,
      payNote: deSmallTradeNote,
      training: [LEARN_ON_JOB("Flooring contractors")],
    }),
    t("glazier", {
      stateLicense: "none",
      licenseSummary: deNoLicense("glaziers"),
      licenseAgency: DE_NO_LICENSE,
      businessNote: deBusinessNote,
      payNote: deSmallTradeNote,
      training: [LEARN_ON_JOB("Glazing contractors")],
    }),
    t("insulation-installer", {
      stateLicense: "none",
      licenseSummary: deNoLicense("insulation installers"),
      licenseAgency: DE_NO_LICENSE,
      businessNote: deBusinessNote,
      payNote: deGrowthMissingNote,
      training: [INSULATORS_42],
    }),
    t("ironworker", {
      outlook: ol([110, 120, 13, 10]),
      stateLicense: "none",
      licenseSummary: deNoLicense("ironworkers"),
      licenseAgency: DE_NO_LICENSE,
      businessNote: deBusinessNote,
      training: [IRONWORKERS_451],
    }),
    t("mason", {
      outlook: ol([290, 330, 11, 20]),
      stateLicense: "none",
      licenseSummary: deNoLicense("masons"),
      licenseAgency: DE_NO_LICENSE,
      businessNote: deBusinessNote,
      training: [BRICKLAYERS_1],
    }),
    t("millwright", {
      stateLicense: "none",
      licenseSummary: deNoLicense("millwrights"),
      licenseAgency: DE_NO_LICENSE,
      businessNote: deBusinessNote,
      payNote: deGrowthMissingNote,
      training: [LEARN_ON_JOB("Industrial millwright shops")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary:
        "Industrial and process pipefitting has no Delaware license of its own. Gas-piping, water-supply and drain/waste pipefitting fall under the Plumbing/HVACR board's Master Plumber or Master HVACR credential instead.",
      licenseAgency: DE_PLUMBING_HVACR,
      businessNote: deBusinessNote,
      payNote: "Delaware's BLS projection groups pipefitters with plumbers and sprinkler fitters, so there's no separate pipefitter-only figure.",
      training: [UA_74],
    }),
    t("plasterer-stucco-mason", {
      stateLicense: "none",
      licenseSummary: deNoLicense("plasterers and stucco masons"),
      licenseAgency: DE_NO_LICENSE,
      businessNote: deBusinessNote,
      payNote: deSmallTradeNote,
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([260, 300, 14, 20]),
      stateLicense: "none",
      licenseSummary: deNoLicense("roofers"),
      licenseAgency: DE_NO_LICENSE,
      businessNote: deBusinessNote,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([290, 340, 16, 30]),
      stateLicense: "none",
      licenseSummary: deNoLicense("sheet metal workers"),
      licenseAgency: DE_NO_LICENSE,
      businessNote: deBusinessNote,
      training: [SMART_19],
    }),
    t("solar-installer", {
      stateLicense: "none",
      licenseSummary:
        "Delaware's electrical regulations fold solar work into licensed electrical work (24 Del. Admin. Code §1400), though the regulation text doesn't specify which license tier applies. No separate state solar-installer license or certification is required.",
      licenseAgency: DE_ELECTRICIAN,
      businessNote: deBusinessNote,
      payNote: deSmallTradeNote,
      training: [LEARN_ON_JOB("Solar installation contractors")],
    }),
    t("sprinkler-fitter", {
      stateLicense: "worker-certification",
      licenseSummary:
        "Delaware's Office of the State Fire Marshal (not the Division of Professional Regulation) licenses fire-suppression work under its own State Fire Prevention Regulations. Fire sprinkler and standpipe work falls under the Class IV Fire Suppression exam category, which feeds into a separate company license.",
      licenseSteps: [
        { title: "Class IV Fire Suppression certificate", detail: "A State Fire Prevention Regulations exam covering fire-suppression systems other than portable extinguishers; this is the class that covers sprinkler and standpipe work specifically." },
        { title: "Company license (business)", detail: "A separate Office of the State Fire Marshal company license, requiring at least one Class IV-certified person on staff." },
      ],
      licenseAgency: DE_FIRE_MARSHAL,
      extraCredentials: ["Delaware Class IV Fire Suppression certificate"],
      training: [UA_669],
      payNote: "Delaware's BLS projection groups sprinkler fitters with plumbers and pipefitters, so there's no separate sprinkler-fitter-only figure.",
      businessNote: "Opening a Delaware fire-sprinkler business takes a separate company license from the Office of the State Fire Marshal, with at least one Class IV-certified person on staff, on top of the standard Division of Revenue business registration.",
    }),
    t("tile-setter", {
      outlook: ol([40, 50, 16, 0]),
      stateLicense: "none",
      licenseSummary: deNoLicense("tile setters"),
      licenseAgency: DE_NO_LICENSE,
      businessNote: deBusinessNote,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: deNoLicense("waterproofing installers"),
      licenseAgency: DE_NO_LICENSE,
      businessNote: deBusinessNote,
      payNote: "Waterproofing has no distinct federal job category, so no state-specific job count exists for it in Delaware or anywhere else on this site.",
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Delaware vocational-technical high schools",
      detail: "Six vocational-technical high schools (Delcastle, POLYTECH, Sussex Tech, Hodgson Vo-Tech, St. Georges Technical, and Howard High School of Technology) run Board-approved electrician apprenticeship tracks, though completing one doesn't by itself qualify a graduate for certificate-based journeyperson licensure without further DOL or IBEW sponsorship.",
      source: DE_ELECTRICIAN,
    },
  ],
  adults: [
    {
      title: "Delaware SEED Scholarship",
      detail: "Full tuition at Delaware Technical Community College for eligible Delaware residents, as a last-dollar grant on top of other aid, for credit or noncredit programs leading to a recognized credential.",
      source: DE_SEED,
    },
    {
      title: "Registered Apprenticeship",
      detail: "Delaware's Dept. of Labor runs the state's registered-apprenticeship system; its top five apprenticeship occupations are electrician, HVAC mechanic, plumber, construction labor and carpenter.",
      source: DE_APPRENTICESHIP,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Delaware statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Delaware long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2061.00?st=DE" },
    DE_ELECTRICIAN,
    DE_PLUMBING_HVACR,
    DE_FIRE_MARSHAL,
    DE_ELEVATOR,
    DE_BUSINESS,
    DE_SEED,
    DE_APPRENTICESHIP,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
