// New Hampshire state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is New Hampshire-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "New Hampshire";

const NH_ELECTRICAL: SourceRef = { label: "New Hampshire Electricians' Board", url: "https://oplc.nh.gov/electricians-board" };
const NH_MECHANICAL: SourceRef = { label: "New Hampshire Mechanical Safety and Licensing Board", url: "https://oplc.nh.gov/mechanical-safety-and-licensing-board" };
const NH_ELEVATOR: SourceRef = { label: "New Hampshire Dept. of Labor, elevator and lift mechanic licensing", url: "https://www.nh.gov/labor/faq/elevator.htm" };
const NH_FIRE_SPRINKLER: SourceRef = { label: "New Hampshire Saf-C 1200, Voluntary Certification of Fire Protection Equipment Technicians", url: "https://gc.nh.gov/rules/state_agencies/saf-c1200.html" };
const NH_OIL_HEATING: SourceRef = { label: "New Hampshire Saf-C 4900, Voluntary Certification of Oil Heating Technicians", url: "https://gc.nh.gov/rules/state_agencies/saf-c4900.html" };
const NH_NO_LICENSE: SourceRef = { label: "New Hampshire Office of Professional Licensure and Certification, About Us", url: "https://oplc.nh.gov/about-us" };
const NH_EARLY_COLLEGE: SourceRef = { label: "Community College System of NH, Early College", url: "https://www.ccsnh.edu/early-college/" };
const NH_APPRENTICESHIP: SourceRef = { label: "ApprenticeshipNH, Community College System of NH", url: "https://www.ccsnh.edu/apprenticeshipnh/" };

const IBEW_490: TrainingOption = {
  name: "IBEW Local 490",
  kind: "union",
  where: "Concord, serving all of New Hampshire",
  detail: "A paid union electrical apprenticeship.",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const UA_131: TrainingOption = {
  name: "Plumbers, Pipefitters & Service Trades UA Local 131",
  kind: "union",
  where: "Hooksett",
  detail: "A paid union apprenticeship for plumbers, pipefitters and HVAC installers.",
  programSlug: "ua-plumber-pipefitter-apprenticeship",
};
const IUOE_4_NH: TrainingOption = {
  name: "Operating Engineers Local 4",
  kind: "union",
  where: "Eastern New Hampshire",
  detail: "A paid union apprenticeship for heavy equipment operators.",
  programSlug: "iuoe-equipment-operator-apprenticeship",
};
const IUPAT_35: TrainingOption = {
  name: "Painters & Allied Trades District Council 35",
  kind: "union",
  where: "Covers New Hampshire",
  detail: "A paid union apprenticeship for painters and other finishing trades.",
};
const ABC_NHVT: TrainingOption = {
  name: "Associated Builders and Contractors, NH/VT Chapter",
  kind: "open-shop",
  where: "Concord",
  detail: "A merit-shop apprenticeship program covering several trades.",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const nhNoLicense = (what: string) => `New Hampshire has no state license for ${what}.`;

export const NEW_HAMPSHIRE: StateGuide = {
  // New Hampshire ZIP codes run 030xx-038xx.
  locationHints: { zip3: [[30, 38]], cities: ["Manchester", "Nashua", "Concord", "Derry", "Dover", "Rochester"] },
  slug: "new-hampshire",
  code: "NH",
  name: S,
  lastVerified: "2026-11-22",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "New Hampshire long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=NH",
  },
  intro:
    "A field guide to 25 construction trades in New Hampshire: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "New Hampshire licenses very few trades: electricians and plumbers through separate boards with a real journeyman-and-master ladder, gas fitters through the Mechanical Safety and Licensing Board, and elevator mechanics as a single credential through the Dept. of Labor.",
    "New Hampshire has no general contractor license and no contractor registration law of any kind.",
    "Two of New Hampshire's credentials are voluntary rather than mandatory: Saf-C 4900 sets up only a voluntary certification for oil heating technicians, and Saf-C 1200 does the same for fire sprinkler fitters. Neither trade has a required state license.",
    "Projected growth here runs well above the other New England states: electricians (10%), laborers and plumbers (around 5-9%) all show solid demand, with only a few small trades flat or declining.",
    "New Hampshire Early College lets high schoolers take community-college courses, including trade programs, tuition-free while still in high school.",
  ],
  costMarker: { label: "New Hampshire Early College", value: "$0", note: "Up to two dual-credit community college courses per year, tuition-free, while still in high school" },
  licensingOverview:
    "New Hampshire licenses construction trades through a small number of boards and keeps most trades unlicensed. The Electricians' Board licenses a genuine journeyman-and-master ladder, plus specialty tiers for high/medium-voltage and other scopes. The Mechanical Safety and Licensing Board licenses plumbers (also on a journeyman-and-master ladder) and gas fitters, but its oil heating technician credential, like its fire sprinkler credential, is only a voluntary certification under Saf-C 4900, not a mandatory license; the board also has no distinct category for general air-conditioning or refrigeration work. The Dept. of Labor licenses elevator mechanics, inspectors and accessibility-lift mechanics as single credentials, not a journeyman/master ladder. No other trade on this page, and no general contractor role, has a New Hampshire state license.",
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
      "With no general contractor license and no contractor registration law, New Hampshire has one of the lower regulatory barriers to running a construction business.",
      "A Master-level license (electrician, plumber, oil heating) already qualifies someone to run their own shop, with no separate business-level credential layered on top.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "New Hampshire's strong growth numbers in several trades mean more competition for the same residential and commercial jobs.",
    ],
    path:
      "The usual route: work for someone else for years, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      NH_NO_LICENSE,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([4820, 5250, 9, 440]),
      stateLicense: "none",
      licenseSummary: nhNoLicense("construction laborers"),
      licenseAgency: NH_NO_LICENSE,
      training: [ABC_NHVT, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([3720, 4100, 10, 370]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "New Hampshire licenses electricians on a real journeyman-and-master ladder through the Electricians' Board, plus specialty licenses (high/medium-voltage, for example) for narrower scopes. It's the fastest-growing trade with New Hampshire-specific projections on this page.",
      licenseSteps: [
        { title: "Apprentice", detail: "Registered with the Electricians' Board while working under a licensed journeyman or master; no fixed hour minimum to start." },
        { title: "Journeyman", detail: "Qualifying apprenticeship hours and related instruction, then a passing exam score." },
        { title: "Master", detail: "Qualifying experience as a journeyman, then a passing exam score." },
      ],
      licenseAgency: NH_ELECTRICAL,
      training: [IBEW_490],
    }),
    t("equipment-operator", {
      outlook: ol([1560, 1650, 5, 140]),
      stateLicense: "none",
      licenseSummary: nhNoLicense("heavy equipment operators"),
      licenseAgency: NH_NO_LICENSE,
      training: [IUOE_4_NH],
    }),
    t("welder", {
      outlook: ol([1100, 1170, 6, 120]),
      stateLicense: "none",
      licenseSummary: nhNoLicense("general construction/structural welders"),
      licenseAgency: NH_NO_LICENSE,
      training: [LEARN_ON_JOB("Welding shops and fabricators")],
    }),
    t("hvac-technician", {
      outlook: ol([2200, 2350, 7, 200]),
      stateLicense: "worker-certification",
      licenseSummary:
        "New Hampshire's Mechanical Safety and Licensing Board licenses Gas Fitters, covering fuel-gas heating hookups. Oil Heating Technician, by contrast, is only a voluntary certification under Saf-C 4900, not a required license, and there's no confirmed state license at all for general air-conditioning or refrigeration work.",
      licenseSteps: [
        { title: "Gas Fitter (required for fuel-gas heating work)", detail: "Qualifying training and experience under the Mechanical Safety and Licensing Board's requirements, then an exam." },
        { title: "Oil Heating Technician (voluntary)", detail: "Saf-C 4900 sets up a voluntary certification that some employers prefer, but New Hampshire doesn't require it to work on oil-fired heating equipment." },
      ],
      licenseAgency: NH_MECHANICAL,
      training: [UA_131],
    }),
    t("carpenter", {
      outlook: ol([5260, 5580, 6, 420]),
      stateLicense: "none",
      licenseSummary: nhNoLicense("carpenters") + " It's the largest trade with New Hampshire-specific data on this page.",
      licenseAgency: NH_NO_LICENSE,
      training: [national("New England Regional Council of Carpenters apprenticeship", "carpenter-apprenticeship", "A regional union apprenticeship serving New Hampshire."), ABC_NHVT],
    }),
    t("plumber", {
      outlook: ol([2710, 2830, 5, 240]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "New Hampshire's Mechanical Safety and Licensing Board licenses plumbers on a real journeyman-and-master ladder; a Journeyman applicant needs a passing score of 70% or better, and a Master applicant needs 75% or better plus at least 6 months working as a journeyman.",
      licenseSteps: [
        { title: "Apprentice Plumber", detail: "Registered with the Board while working under a licensed journeyman or master plumber." },
        { title: "Journeyman Plumber", detail: "Qualifying apprenticeship experience, then an exam passed at 70% or better." },
        { title: "Master Plumber", detail: "At least 6 months working as a licensed journeyman, then an exam passed at 75% or better." },
      ],
      licenseAgency: NH_MECHANICAL,
      training: [UA_131],
      businessNote: "A New Hampshire plumbing business operates under a Master Plumber; there's no separate business-level license layered on top of the Master credential itself.",
    }),
    t("painter", {
      outlook: ol([1440, 1510, 5, 120]),
      stateLicense: "none",
      licenseSummary: nhNoLicense("painters"),
      licenseAgency: NH_NO_LICENSE,
      training: [IUPAT_35],
    }),
    t("concrete-worker", {
      outlook: ol([400, 420, 5, 30]),
      stateLicense: "none",
      licenseSummary: nhNoLicense("concrete finishers"),
      licenseAgency: NH_NO_LICENSE,
      training: [LEARN_ON_JOB("Concrete contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([460, 480, 5, 40]),
      stateLicense: "none",
      licenseSummary: nhNoLicense("drywall installers"),
      licenseAgency: NH_NO_LICENSE,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      stateLicense: "worker-certification",
      licenseSummary:
        "New Hampshire individually licenses elevator mechanics, inspectors and accessibility-lift mechanics through the Dept. of Labor; it's a single credential, not a journeyman/master ladder, and helpers can work only in the presence of a licensed mechanic.",
      licenseSteps: [
        { title: "Elevator Mechanic", detail: "Qualifying training and documented experience installing, maintaining or repairing elevators or lifts, meeting the Dept. of Labor's requirements, then a license application." },
      ],
      licenseAgency: NH_ELEVATOR,
      payNote: "New Hampshire publishes no state-specific pay or job-growth data for this small trade, so this page shows the national figures.",
      training: [national("Elevator Constructors union (IUEC) through NEIEP", "neiep-elevator-constructor-apprenticeship", "Union apprenticeship run through the National Elevator Industry Educational Program.")],
    }),
    t("flooring-installer", {
      stateLicense: "none",
      licenseSummary: nhNoLicense("flooring installers") + " It's one of the smallest trades on this page.",
      licenseAgency: NH_NO_LICENSE,
      payNote: "New Hampshire publishes a state-specific job-growth projection for this trade but no state-specific pay data, so the pay figures shown here are national.",
      training: [national("New England Regional Council of Carpenters apprenticeship", "carpenter-apprenticeship", "A regional union apprenticeship covering floor layers.")],
    }),
    t("glazier", {
      outlook: ol([220, 240, 6, 20]),
      stateLicense: "none",
      licenseSummary: nhNoLicense("glaziers"),
      licenseAgency: NH_NO_LICENSE,
      training: [LEARN_ON_JOB("Glazing contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([140, 150, 4, 10]),
      stateLicense: "none",
      licenseSummary: nhNoLicense("insulation installers"),
      licenseAgency: NH_NO_LICENSE,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([290, 300, 5, 20]),
      stateLicense: "none",
      licenseSummary: nhNoLicense("ironworkers"),
      licenseAgency: NH_NO_LICENSE,
      training: [national("Ironworkers union apprenticeship", "iron-workers-apprenticeship", "A national ironworkers union with locals in many states.")],
    }),
    t("mason", {
      outlook: ol([150, 160, 4, 10]),
      stateLicense: "none",
      licenseSummary: nhNoLicense("masons") + " It's one of the smallest trades on this page.",
      licenseAgency: NH_NO_LICENSE,
      training: [LEARN_ON_JOB("Masonry contractors")],
    }),
    t("millwright", {
      outlook: ol([60, 60, 4, 0]),
      stateLicense: "none",
      licenseSummary: nhNoLicense("millwrights") + " It's the smallest trade on this page.",
      licenseAgency: NH_NO_LICENSE,
      training: [LEARN_ON_JOB("Industrial millwright shops")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary:
        nhNoLicense("pipefitters") + " New Hampshire's plumbing statute doesn't define a separate pipefitter trade, so pipefitters train through union apprenticeship and employer programs rather than a state license.",
      licenseAgency: NH_MECHANICAL,
      training: [UA_131],
      payNote: "New Hampshire's BLS projection groups pipefitters with plumbers and sprinkler fitters, so there's no separate pipefitter-only figure.",
    }),
    t("plasterer-stucco-mason", {
      stateLicense: "none",
      licenseSummary: nhNoLicense("plasterers or stucco masons") + " It's one of the smallest trades on this page, with no New Hampshire-specific job-growth projection published.",
      licenseAgency: NH_NO_LICENSE,
      payNote: "New Hampshire publishes pay data for this small trade but no state-specific job-growth projection, so the growth figure shown here is national.",
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([390, 410, 5, 30]),
      stateLicense: "none",
      licenseSummary: nhNoLicense("roofers"),
      licenseAgency: NH_NO_LICENSE,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([800, 830, 4, 70]),
      stateLicense: "none",
      licenseSummary: nhNoLicense("sheet metal workers"),
      licenseAgency: NH_NO_LICENSE,
      training: [national("Sheet Metal Workers union (SMART) apprenticeship", "smart-sheet-metal-apprenticeship", "A national sheet-metal-workers union with locals in many states.")],
    }),
    t("solar-installer", {
      stateLicense: "none",
      licenseSummary:
        nhNoLicense("solar installers") + " Connecting panels to a building's wiring is electrical work, so it generally falls under a New Hampshire electrician's license rather than a separate solar credential.",
      licenseAgency: NH_ELECTRICAL,
      payNote: "New Hampshire publishes no state-specific pay or job-growth data for this trade, so this page shows the national figures.",
      training: [LEARN_ON_JOB("Solar installation contractors")],
    }),
    t("sprinkler-fitter", {
      stateLicense: "none",
      licenseSummary:
        "New Hampshire's Saf-C 1200 rule sets up only a voluntary certification for fire protection equipment technicians, not a mandatory state license. It's one of the few states where sprinkler fitting has no required license at all.",
      licenseSteps: [
        { title: "No required license", detail: "New Hampshire has no mandatory license for fire sprinkler fitters." },
        { title: "Voluntary certification (optional)", detail: "Saf-C 1200 sets up a voluntary certification for fire protection equipment technicians, which some employers prefer but the state doesn't require." },
      ],
      licenseAgency: NH_FIRE_SPRINKLER,
      training: [national("Sprinkler Fitters union (UA Local 669)", "ua-sprinkler-fitter-apprenticeship", "A national sprinkler fitter union that hires through contractors in many states.")],
      payNote: "New Hampshire's BLS projection groups sprinkler fitters with plumbers and pipefitters, so there's no separate sprinkler-fitter-only figure.",
      businessNote: "A New Hampshire fire-sprinkler business doesn't need a state contractor license; the voluntary Saf-C 1200 certification is the closest thing to a credential in this trade.",
    }),
    t("tile-setter", {
      outlook: ol([90, 90, 8, 10]),
      stateLicense: "none",
      licenseSummary: nhNoLicense("tile setters") + " It's one of the fastest-growing small trades with New Hampshire-specific projections on this page.",
      licenseAgency: NH_NO_LICENSE,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: nhNoLicense("waterproofing installers"),
      licenseAgency: NH_NO_LICENSE,
      payNote: "Waterproofing has no distinct federal job category, so no state-specific job count exists for it in New Hampshire or anywhere else on this site.",
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "New Hampshire Early College",
      detail: "High schoolers can take up to two community-college courses a year tuition-free, including career and technical programs that feed directly into construction trades.",
      source: NH_EARLY_COLLEGE,
    },
  ],
  adults: [
    {
      title: "ApprenticeshipNH",
      detail: "Run by the Community College System of NH, this connects adults to registered apprenticeships across the construction trades, with related instruction at the community colleges.",
      source: NH_APPRENTICESHIP,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, New Hampshire statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "New Hampshire long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=NH" },
    NH_ELECTRICAL,
    NH_MECHANICAL,
    NH_ELEVATOR,
    NH_FIRE_SPRINKLER,
    NH_OIL_HEATING,
    NH_NO_LICENSE,
    NH_EARLY_COLLEGE,
    NH_APPRENTICESHIP,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
