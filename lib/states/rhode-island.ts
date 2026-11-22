// Rhode Island state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Rhode Island-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Rhode Island";

const RI_ELECTRICAL: SourceRef = { label: "Rhode Island Board of Examiners of Electricians (R.I. Gen. Laws § 5-6-24)", url: "https://dlt.ri.gov/regulation-and-safety/professional-regulation/board-of-examiners-electricians" };
const RI_PLUMBING: SourceRef = { label: "Rhode Island Plumbing License Law, Board of Examiners of Plumbers and Irrigators (R.I. Gen. Laws Ch. 5-20)", url: "https://dlt.ri.gov/regulation-and-safety/professional-regulation/board-of-examiners-plumbers-and-irrigators" };
const RI_MECHANICAL_BOARD: SourceRef = { label: "Rhode Island State Mechanical Board (R.I. Gen. Laws Ch. 28-27)", url: "https://webserver.rilegislature.gov/Statutes/TITLE28/28-27/28-27-2.htm" };
const RI_HOISTING: SourceRef = { label: "Rhode Island Hoisting Engineer licensing (R.I. Gen. Laws § 28-26-4)", url: "https://webserver.rilegislature.gov/Statutes/TITLE28/28-26/28-26-4.HTM" };
const RI_ELEVATOR: SourceRef = { label: "Rhode Island elevator mechanic licensing, Division of Occupational Safety (R.I. Gen. Laws § 23-33-2.3)", url: "https://webserver.rilegislature.gov/Statutes/TITLE23/23-33/23-33-2.3.htm" };
const RI_BOILER_WELDING: SourceRef = { label: "Rhode Island boilers and unfired pressure vessels licensing (R.I. Gen. Laws Ch. 28-25)", url: "https://webserver.rilegislature.gov/Statutes/TITLE28/28-25/28-25-1.HTM" };
const RI_CRLB: SourceRef = { label: "Rhode Island Contractors' Registration and Licensing Board (CRLB)", url: "https://crb.ri.gov/" };
const RI_CRLB_ROOFING: SourceRef = { label: "Rhode Island CRLB Commercial Roofing License", url: "https://crb.ri.gov/licenses/commercial-roofing-license" };
const RI_SOLAR_REP: SourceRef = { label: "Rhode Island Renewable Energy Professional (REP) limited license (R.I. Gen. Laws § 5-6-11(e))", url: "https://energy.ri.gov/renewable-energy/solar/renewable-energy-professional-rep" };
const RI_NO_LICENSE: SourceRef = { label: "Rhode Island DLT, licensed occupations list (no board covers this trade)", url: "https://dlt.ri.gov/lmi/jobseeker/license.htm" };
const RI_PROMISE: SourceRef = { label: "Rhode Island Promise (CCRI free tuition)", url: "https://www.ccri.edu/ripromise/faqs.html" };
const RI_APPRENTICESHIP: SourceRef = { label: "Rhode Island Dept. of Labor and Training, Office of Apprenticeship", url: "https://dlt.ri.gov/apprenticeship/" };

const IBEW_99: TrainingOption = {
  name: "IBEW Local 99 JATC",
  kind: "union",
  where: "Cranston",
  detail: "A paid union electrical apprenticeship serving Rhode Island.",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const UA_51: TrainingOption = {
  name: "Plumbers & Pipefitters Local 51 JATC",
  kind: "union",
  where: "East Providence",
  detail: "A paid union apprenticeship for plumbers and pipefitters.",
  programSlug: "ua-plumber-pipefitter-apprenticeship",
};
const IRONWORKERS_37: TrainingOption = {
  name: "Iron Workers Local 37",
  kind: "union",
  where: "East Providence",
  detail: "A paid union apprenticeship for ironworkers.",
  programSlug: "iron-workers-apprenticeship",
};
const SMART_17_RI: TrainingOption = {
  name: "Sheet Metal Workers Local 17",
  kind: "union",
  where: "Providence",
  detail: "A paid union apprenticeship for sheet metal workers.",
  programSlug: "smart-sheet-metal-apprenticeship",
};
const CARPENTERS_330: TrainingOption = {
  name: "Carpenters Local 330",
  kind: "union",
  where: "Warwick",
  detail: "A paid union apprenticeship for carpenters.",
};
const IUOE_57: TrainingOption = {
  name: "Operating Engineers Local 57",
  kind: "union",
  where: "Johnston",
  detail: "A paid union apprenticeship for heavy equipment operators.",
};
const BUILDING_FUTURES_RI: TrainingOption = {
  name: "Building Futures RI",
  kind: "free-training",
  where: "Providence",
  detail: "A free 5-week, 200-hour construction pre-apprenticeship. Graduates earn OSHA-10, MC3 and aerial-lift certifications and are placed into registered apprenticeships with Rhode Island Building & Construction Trades Council employers.",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const crlbSummary = (what: string) =>
  `Rhode Island has no individual ${what} license. A business doing construction or remodeling work registers with the Contractors' Registration and Licensing Board (CRLB) once a single job totals $500 or more; anyone who advertises as a contractor must register regardless of job size. It's a registration, not a skills-tested license.`;
const riNoLicense = (what: string) => `Rhode Island has no state license for ${what}.`;

export const RHODE_ISLAND: StateGuide = {
  // Rhode Island ZIP codes run 028xx-029xx.
  locationHints: { zip3: [[28, 29]], cities: ["Providence", "Warwick", "Cranston", "Pawtucket", "East Providence", "Woonsocket"] },
  slug: "rhode-island",
  code: "RI",
  name: S,
  lastVerified: "2026-11-22",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Rhode Island long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2061.00?st=RI",
  },
  intro:
    "A field guide to 25 construction trades in Rhode Island: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "Rhode Island individually licenses pipefitters and sprinkler fitters with their own journeyman-and-master ladders, through the same State Mechanical Board that covers refrigeration technicians — a more fully licensed mechanical-trades landscape than most states on this site.",
    "Rhode Island has no general statewide contractor's license. Most construction businesses only register with the Contractors' Registration and Licensing Board (CRLB), a registration rather than a skills-tested license, once a job reaches $500.",
    "Rhode Island runs a genuine standalone solar credential, the Renewable Energy Professional (REP) limited license, for non-electricians doing solar installation work — a licensed electrical contractor already covers that work without needing it separately.",
    "Sheet metal workers (30%), solar installers (37%) and welders (27%) are the fastest-growing trades with Rhode Island-specific projections; stonemasons are the only trade projected to shrink.",
    "Building Futures RI, a free 5-week pre-apprenticeship, is a well-known local pipeline straight into registered union apprenticeships.",
  ],
  costMarker: { label: "Rhode Island Promise", value: "$0", note: "Covers up to two years of tuition and fees at CCRI for recent high school graduates, as a last-dollar award after other aid" },
  licensingOverview:
    "Rhode Island licenses several construction trades individually. Electricians are licensed through journeyperson-level credentials (a general \"B\" tier and a narrower maintenance-only \"M\" tier), with a separate business-level contractor certificate, but no master tier above journeyperson. Plumbers, pipefitters, refrigeration technicians, sheet metal workers and sprinkler fitters are licensed through two different boards depending on scope: the Board of Examiners of Plumbers and Irrigators licenses plumbers with a genuine journeyperson-and-master ladder, while the State Mechanical Board licenses pipefitters (heating and process piping), refrigeration/air-conditioning technicians and sprinkler fitters, each with their own journeyperson-and-master structure — so a Rhode Island HVAC technician may need a refrigeration license, a pipefitter license, or both, depending on the work. Elevator mechanics are individually licensed by the Division of Occupational Safety, and crane and other hoisting equipment operators are individually licensed as Hoisting Engineers. Rhode Island has no general statewide contractor's license. Most other trades fall instead under the Contractors' Registration and Licensing Board (CRLB), a registration rather than a skills-tested license, required once a single job totals $500 or more, with licensed electricians and plumbers exempted from it for their own licensed scope of work. A separate CRLB Commercial Roofing License, not mere registration, covers roofing and waterproofing work on buildings of 5 units or more.",
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
      "With no statewide general contractor license, Rhode Island has one of the lower regulatory barriers to general contracting outside the licensed trades.",
      "CRLB registration, once filed, covers construction and remodeling work statewide under one credential, with no skills exam to pass.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Rhode Island is a small market, so steady year-round work can mean building relationships beyond just one city.",
    ],
    path:
      "The usual route: work for someone else for years, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      RI_CRLB,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([3230, 3790, 17, 330]),
      stateLicense: "none",
      licenseSummary: riNoLicense("construction laborers") + " It's one of the fastest-growing trades with Rhode Island-specific projections on this page.",
      licenseAgency: RI_NO_LICENSE,
      training: [BUILDING_FUTURES_RI, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([2620, 3050, 17, 280]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Rhode Island licenses journeyperson electricians through a general \"B\" tier or a narrower maintenance-only \"M\" tier, plus a separate Lightning-Protection Installer credential, with a business-level contractor certificate on top. There's no separate master-electrician tier above journeyperson.",
      licenseSteps: [
        { title: "Journeyperson Electrician (\"B\")", detail: "At least 8,000 hours of supervised work over at least 4 years, plus 144 hours a year of related instruction (up to 288 classroom hours may count from an approved trade school), then an exam." },
        { title: "Journeyperson Electrician (\"M\", maintenance only)", detail: "A narrower-scope alternative: at least 6,000 hours over at least 3 years, then an exam." },
        { title: "Certificate A (business)", detail: "A separate business-level electrical-contractor certificate, required to contract directly." },
      ],
      licenseAgency: RI_ELECTRICAL,
      training: [IBEW_99],
    }),
    t("equipment-operator", {
      outlook: ol([870, 990, 13, 90]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Rhode Island individually licenses heavy equipment operators as \"Hoisting Engineers,\" with separate categories for cranes, aerial lifts, forklifts, excavating equipment, drilling rigs and more, each Unrestricted or Restricted to one employer.",
      licenseSteps: [
        { title: "Operator Trainee", detail: "Age 18+; a 2-year permit while working toward a Full License." },
        { title: "Full Hoisting License", detail: "2 years holding a regular hoisting license, then passing an exam at 70% or better, for the specific equipment category (crane, aerial lift, excavating equipment, etc.)." },
      ],
      licenseAgency: RI_HOISTING,
      training: [IUOE_57],
    }),
    t("welder", {
      outlook: ol([3910, 4980, 27, 540]),
      stateLicense: "none",
      licenseSummary:
        riNoLicense("general construction/structural welders") + " A separate license applies specifically to welding on boilers and unfired pressure vessels. It's one of the fastest-growing trades with Rhode Island-specific projections on this page.",
      licenseAgency: RI_BOILER_WELDING,
      training: [LEARN_ON_JOB("Welding shops and fabricators")],
    }),
    t("hvac-technician", {
      outlook: ol([1420, 1600, 13, 140]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Rhode Island splits HVAC licensing by scope rather than issuing one HVAC license. Refrigeration and air-conditioning work needs a Refrigeration license from the State Mechanical Board; heating and boiler-piping work instead falls under the Pipefitter license.",
      licenseSteps: [
        { title: "Journeyperson Refrigeration/AC (Class I or II)", detail: "Work under a licensed Refrigeration Master while gaining qualifying experience, then an exam." },
        { title: "Refrigeration Master Class II or I", detail: "At least 1 year as a Journeyperson Class I (or 1 year as Master Class II, for the broader Class I credential), then an exam. Class I is unrestricted; narrower classes limit scope." },
        { title: "Pipefitter license (heating/boiler work)", detail: "Heating and boiler-piping installations instead fall under the separate Pipefitter license described on that trade's own page." },
      ],
      licenseAgency: RI_MECHANICAL_BOARD,
      training: [UA_51],
    }),
    t("carpenter", {
      outlook: ol([4540, 5210, 15, 410]),
      stateLicense: "none",
      licenseSummary: crlbSummary("carpenter") + " It's the largest trade with Rhode Island-specific data on this page.",
      licenseAgency: RI_CRLB,
      training: [CARPENTERS_330],
    }),
    t("plumber", {
      outlook: ol([2270, 2680, 18, 240]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Rhode Island's Plumbing License Law licenses both journeyperson and master plumbers individually. Fuel-gas work (natural gas and propane) is licensed separately, as a limited \"Gas Serviceman\" credential under the State Mechanical Board's pipefitter licensing, not under the plumbing license.",
      licenseSteps: [
        { title: "Journeyperson Plumber", detail: "Work under a licensed master plumber while gaining qualifying apprenticeship hours, then an exam." },
        { title: "Master Plumber", detail: "Further qualifying experience as a journeyperson, then an exam." },
      ],
      licenseAgency: RI_PLUMBING,
      businessNote: "A Rhode Island plumbing business operates under a Master Plumber; there's no separate business-level license layered on top of the Master credential itself.",
      training: [UA_51],
    }),
    t("painter", {
      outlook: ol([1420, 1600, 12, 130]),
      stateLicense: "none",
      licenseSummary: crlbSummary("painter"),
      licenseAgency: RI_CRLB,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([250, 260, 3, 20]),
      stateLicense: "none",
      licenseSummary: crlbSummary("concrete finisher"),
      licenseAgency: RI_CRLB,
      training: [LEARN_ON_JOB("Concrete contractors")],
    }),
    t("drywall-installer", {
      payNote: "Rhode Island publishes pay data for this trade but no state-specific job-growth projection, so the growth figure shown here is national.",
      stateLicense: "none",
      licenseSummary: crlbSummary("drywall installer"),
      licenseAgency: RI_CRLB,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      stateLicense: "worker-certification",
      licenseSummary:
        "Rhode Island individually licenses elevator mechanics through the Division of Occupational Safety; no one may construct, install, repair or maintain elevator drive machinery, controllers or safety circuits without one.",
      licenseAgency: RI_ELEVATOR,
      payNote: "Rhode Island publishes no pay or job projection for this small trade, so this page shows the national figures.",
      training: [national("Elevator Constructors union (IUEC) through NEIEP", "neiep-elevator-constructor-apprenticeship", "Union apprenticeship run through the National Elevator Industry Educational Program.")],
    }),
    t("flooring-installer", {
      stateLicense: "none",
      licenseSummary: crlbSummary("flooring installer"),
      licenseAgency: RI_CRLB,
      payNote: "Rhode Island publishes no pay or job projection for this small trade, so this page shows the national figures.",
      training: [LEARN_ON_JOB("Flooring contractors")],
    }),
    t("glazier", {
      outlook: ol([120, 130, 9, 10]),
      stateLicense: "none",
      licenseSummary: crlbSummary("glazier") + " It's one of the smallest trades on this page.",
      licenseAgency: RI_CRLB,
      training: [LEARN_ON_JOB("Glazing contractors")],
    }),
    t("insulation-installer", {
      stateLicense: "none",
      licenseSummary: crlbSummary("insulation installer"),
      licenseAgency: RI_CRLB,
      payNote: "Rhode Island publishes no pay or job projection for this small trade, so this page shows the national figures.",
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([400, 470, 18, 40]),
      stateLicense: "none",
      licenseSummary: riNoLicense("ironworkers"),
      licenseAgency: RI_NO_LICENSE,
      training: [IRONWORKERS_37],
    }),
    t("mason", {
      outlook: ol([240, 260, 10, 20]),
      stateLicense: "none",
      licenseSummary: crlbSummary("mason"),
      licenseAgency: RI_CRLB,
      training: [LEARN_ON_JOB("Masonry contractors")],
    }),
    t("millwright", {
      stateLicense: "none",
      licenseSummary: riNoLicense("millwrights") + " This is industrial work, outside CRLB's usual residential and commercial construction scope. It's one of the smallest trades on this page, with no Rhode Island-specific pay or job data published.",
      licenseAgency: RI_NO_LICENSE,
      payNote: "Rhode Island publishes no pay or job projection for this small trade, so this page shows the national figures.",
      training: [LEARN_ON_JOB("Industrial millwright shops")],
    }),
    t("pipefitter", {
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Unlike most states, Rhode Island individually licenses pipefitters with their own journeyperson-and-master ladder through the State Mechanical Board, separate from the plumbing license. A Master Class II license is capped at heating installations of 500,000 BTU or less; Master Class I is unlimited, including process piping.",
      licenseSteps: [
        { title: "Journeyperson Pipefitter (Class II)", detail: "Work under a licensed master pipefitter while gaining qualifying experience; at least 3 years before testing for Master II." },
        { title: "Master Pipefitter Class II", detail: "An exam; limited to heating installations of 500,000 BTU or less, with no process piping." },
        { title: "Master Pipefitter Class I", detail: "Further qualifying experience, then an exam, for unlimited scope including process piping." },
      ],
      licenseAgency: RI_MECHANICAL_BOARD,
      training: [UA_51],
      payNote: "Rhode Island's BLS projection groups pipefitters with plumbers and sprinkler fitters, so there's no separate pipefitter-only figure.",
    }),
    t("plasterer-stucco-mason", {
      stateLicense: "none",
      licenseSummary: crlbSummary("plasterer or stucco mason") + " It's one of the smallest trades on this page, with no Rhode Island-specific pay or job data published.",
      licenseAgency: RI_CRLB,
      payNote: "Rhode Island publishes no pay or job projection for this small trade, so this page shows the national figures.",
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([420, 470, 12, 40]),
      stateLicense: "contractor",
      licenseSummary:
        "Rhode Island doesn't license individual roofers, but the CRLB requires a Commercial Roofing License for any business doing commercial or industrial roofing, including sealing and weatherproofing. Residential buildings of 4 units or fewer are excluded and fall under ordinary CRLB registration instead.",
      licenseAgency: RI_CRLB_ROOFING,
      businessNote: "A Rhode Island roofing business doing commercial or industrial work needs the CRLB's Commercial Roofing License on top of ordinary contractor registration; residential roofing on buildings of 4 units or fewer only needs the registration.",
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([460, 600, 30, 60]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Rhode Island licenses sheet metal workers individually through the State Mechanical Board, the same board that licenses pipefitters and refrigeration technicians. It's the fastest-growing trade with Rhode Island-specific projections on this page.",
      licenseAgency: RI_MECHANICAL_BOARD,
      training: [SMART_17_RI],
    }),
    t("solar-installer", {
      outlook: ol([50, 70, 37, 10]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Rhode Island runs a standalone Renewable Energy Professional (REP) limited license for solar and other renewable-energy installation work, earned through NABCEP certification, a UL PV Installer credential, a relevant degree or manufacturer training. A full Rhode Island electrical contractor's license already covers that same work without needing REP separately. It's the fastest-growing trade on this page.",
      licenseSteps: [
        { title: "Renewable Energy Professional (REP) limited license", detail: "NABCEP PV Installation Professional certification, a UL PV Installer certification, a relevant associate's degree, or manufacturer training, then state approval. Not needed by someone who already holds a full electrical contractor's license." },
      ],
      licenseAgency: RI_SOLAR_REP,
      payNote: "Rhode Island publishes a job-growth projection for this trade but no state-specific pay data, so the pay figures shown here are national.",
      training: [LEARN_ON_JOB("Solar installation contractors")],
    }),
    t("sprinkler-fitter", {
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Rhode Island individually licenses sprinkler fitters through the State Mechanical Board, with a genuine journeyperson-and-master ladder. A licensed plumber or pipefitter installing a single sprinkler head over a domestic boiler is exempt from needing this license for that narrow task.",
      licenseSteps: [
        { title: "Journeyperson Sprinklerfitter (Class I)", detail: "Work under a licensed master sprinklerfitter while gaining qualifying experience." },
        { title: "Sprinklerfitter Contractor Master Class I", detail: "At least 1 year as a Class I journeyperson sprinklerfitter, then an exam. (An out-of-state applicant whose home state has no equivalent master license can instead qualify with 6 years' experience, including 1 as a contractor.)" },
      ],
      licenseAgency: RI_MECHANICAL_BOARD,
      training: [national("Sprinkler Fitters union (UA Local 669)", "ua-sprinkler-fitter-apprenticeship", "A national sprinkler fitter union that hires through contractors in many states.")],
      payNote: "Rhode Island's BLS projection groups sprinkler fitters with plumbers and pipefitters, so there's no separate sprinkler-fitter-only figure.",
      businessNote: "Opening a Rhode Island fire-sprinkler business takes a Sprinklerfitter Contractor Master Class I license from the State Mechanical Board.",
    }),
    t("tile-setter", {
      outlook: ol([90, 110, 13, 10]),
      stateLicense: "none",
      licenseSummary: crlbSummary("tile setter") + " It's one of the smallest trades on this page.",
      licenseAgency: RI_CRLB,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "contractor",
      licenseSummary:
        "Rhode Island's CRLB defines \"roofing\" to include waterproofing and weatherproofing, so the same Commercial Roofing License that covers commercial roofers covers commercial waterproofing work. Residential buildings of 4 units or fewer need only ordinary CRLB registration.",
      licenseAgency: RI_CRLB_ROOFING,
      payNote: "Waterproofing has no distinct federal job category, so no state-specific job count exists for it in Rhode Island or anywhere else on this site.",
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Building Futures RI",
      detail: "A free 5-week, 200-hour pre-apprenticeship in Providence covering safety, construction math and trade entrance-exam prep. Graduates earn OSHA-10, MC3 and aerial-lift certifications and are placed into registered apprenticeships with Rhode Island Building & Construction Trades Council employers.",
      source: { label: "Building Futures RI", url: "https://dlt.ri.gov/node/3206" },
    },
    {
      title: "CCRI Construction Trades Readiness Certificate",
      detail: "A six-course sequence at the Community College of Rhode Island covering blueprint reading, tools, OSHA-10 and basic residential wiring, built on the Multi-Craft Core Curriculum (MC3).",
      source: { label: "CCRI Construction Trades Readiness Certificate", url: "https://www.ccri.edu/programs/construction-trades-readiness-certificate/" },
    },
  ],
  adults: [
    {
      title: "Rhode Island Promise",
      detail: "Covers up to two years of tuition and fees at CCRI for recent high school graduates or GED recipients who enroll the semester right after graduation, as a last-dollar award after other aid; requires a 2.5 GPA entering year two.",
      source: RI_PROMISE,
    },
    {
      title: "Registered Apprenticeship",
      detail: "Rhode Island's Dept. of Labor and Training, Office of Apprenticeship, registers apprenticeships under both federal and state rules; apprentices earn wages from day one.",
      source: RI_APPRENTICESHIP,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Rhode Island statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Rhode Island long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2061.00?st=RI" },
    RI_ELECTRICAL,
    RI_PLUMBING,
    RI_MECHANICAL_BOARD,
    RI_HOISTING,
    RI_ELEVATOR,
    RI_BOILER_WELDING,
    RI_CRLB,
    RI_CRLB_ROOFING,
    RI_SOLAR_REP,
    RI_PROMISE,
    RI_APPRENTICESHIP,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
