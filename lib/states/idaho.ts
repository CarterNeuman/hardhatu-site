// Idaho state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Idaho-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Idaho";

const ID_ELECTRICAL: SourceRef = { label: "Idaho Division of Occupational and Professional Licenses (DOPL), electrical licensing", url: "https://dopl.idaho.gov/ele/" };
const ID_PLUMBING: SourceRef = { label: "Idaho DOPL, Plumbing Board licensing", url: "https://dopl.idaho.gov/plb/" };
const ID_HVAC: SourceRef = { label: "Idaho DOPL, HVAC licensing (apprentice, journeyman, contractor)", url: "https://www.servicetitan.com/licensing/hvac/idaho" };
const ID_ELEVATOR: SourceRef = { label: "Idaho Division of Building Safety, Elevator Safety Program", url: "https://skillplum.com/license-requirements/elevator-technology/idaho" };
const ID_SPRINKLER: SourceRef = { label: "Idaho Dept. of Insurance, State Fire Marshal: Fire Protection Sprinkler Fitters License (voluntary) and Sprinkler Contractor License (mandatory)", url: "https://doi.idaho.gov/?p=1469" };
const ID_CONTRACTOR: SourceRef = { label: "Idaho Contractor Registration Act, administered by DOPL", url: "https://dopl.idaho.gov/con/con-faq/" };
const ID_NO_LICENSE: SourceRef = { label: "Harbor Compliance, 50-State Construction Licensing Compliance Guide: Idaho", url: "https://harborcompliance.com/information/idaho-construction-license" };
const ID_ADVANCED_OPPS: SourceRef = { label: "Idaho State Dept. of Education, Advanced Opportunities program", url: "https://nextsteps.idaho.gov/financial-aid-hub/advanced-opportunities-grades-7-12" };

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const idRegistration = (what: string) =>
  `Idaho has no statewide license for ${what}. Any contractor or subcontractor taking on a job of $2,000 or more must register with the Idaho Contractors Board, a straightforward registration with no competency exam, rather than a true license.`;
const idBusinessNote =
  "Idaho's Contractor Registration Act requires registration, not licensure: no exam, no experience requirement, no statewide surety bond. It applies to any contractor or subcontractor working on a job of $2,000 or more.";

export const IDAHO: StateGuide = {
  locationHints: { zip3: [[832, 838]], cities: ["Boise", "Meridian", "Nampa", "Idaho Falls", "Pocatello", "Coeur d'Alene", "Twin Falls", "Lewiston"] },
  slug: "idaho",
  code: "ID",
  name: S,
  lastVerified: "2026-11-23",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Idaho long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2061.00?st=ID",
  },
  intro:
    "A field guide to 25 construction trades in Idaho: what they pay here, which ones need a license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "Idaho is one of the fastest-growing states on this site for construction work: every trade with state-specific data is projected to grow at least 8% through 2034, and most trades are growing 20% or more.",
    "Idaho licenses more individual trades at the state level than most of its neighbors: electricians, plumbers and HVAC technicians each go through the Division of Occupational and Professional Licenses (DOPL), with a registered apprenticeship required at every level, even for apprentices themselves.",
    "Solar installer stands out: Idaho has a genuine state-specific growth figure of 51%, the highest state-specific growth figure found anywhere on this site.",
    "Plumbers and HVAC technicians follow a journeyman-then-contractor ladder with no separate master tier; electricians go further, adding a Master Electrician tier before the Electrical Contractor business license.",
    "Idaho has no statewide license for general contractors, carpenters, roofers or most other trades on this page; instead, any contractor or subcontractor taking on a job of $2,000 or more must register with the Idaho Contractors Board.",
  ],
  costMarker: { label: "Idaho Advanced Opportunities", value: "$4,625", note: "every Idaho public-school student in grades 7-12 gets this much to spend on dual-credit college courses, overload courses, exams and workforce training, which can include trade certifications, often making a dual-credit trades course nearly free" },
  licensingOverview:
    "Idaho licenses electricians, plumbers and HVAC technicians statewide through the Division of Occupational and Professional Licenses (DOPL), and all three require registration or a license at every level, starting with the apprentice. Electricians progress from Apprentice to Journeyman to Master, with a separate Electrical Contractor business license; plumbers progress from Apprentice to Journeyman, and a Plumbing Contractor license is available to an individual journeyman with enough experience rather than requiring a separate master tier; HVAC technicians follow the same shape, with Apprentice, Journeyman and Contractor levels (plus parallel specialty tracks for narrower HVAC work). Elevator work is licensed statewide too, through the Division of Building Safety's Elevator Safety Program, which issues Elevator Mechanic, Elevator Contractor and Elevator Inspector licenses. Fire sprinkler work is different: Idaho requires a Fire Protection Sprinkler Contractor License for the business, issued by the Dept. of Insurance's State Fire Marshal, but the individual Fitter's license is voluntary, not mandatory, for the person actually doing the installation. Idaho has no statewide license for general contractors, carpenters, roofers, masons or most other trades on this page; instead, the Idaho Contractor Registration Act requires any contractor or subcontractor working on a job of $2,000 or more to register with the Idaho Contractors Board, with no competency exam and no state surety bond required.",
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
      "Idaho is one of the fastest-growing construction markets on this site, which means real long-term demand for a well-run shop.",
      "Outside the licensed trades, Idaho's contractor registration has no competency exam and no state surety bond, a lower bar than many states on this site.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Fast growth cuts both ways: it also means more competition moving into the state to chase the same demand.",
    ],
    path:
      "The usual route: work for someone else for years, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      ID_CONTRACTOR,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([20110, 25090, 25, 2280]),
      stateLicense: "none",
      licenseSummary: idRegistration("construction laborers") + " It's the largest trade on this page.",
      licenseAgency: ID_NO_LICENSE,
      training: [national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([10850, 14020, 29, 1380]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Idaho licenses electricians statewide at every level, through DOPL: Apprentice registration, Journeyman Electrician license, Master Electrician license and Electrical Contractor license. Idaho honors journeyman and master licenses from a dozen neighboring and nearby states, Montana and Wyoming included.",
      licenseSteps: [
        { title: "Apprentice Electrician", detail: "Registration with DOPL is required from day one; an apprentice may not legally work electrical construction without it." },
        { title: "Journeyman Electrician", detail: "Documented apprenticeship hours and an exam, administered by DOPL's Electrical Bureau." },
        { title: "Master Electrician", detail: "At least 2 years of experience as a licensed journeyman, then a separate exam. A master does not need to also hold a journeyman license." },
        { title: "Electrical Contractor", detail: "A business-level license requiring at least one full-time employee who holds a valid journeyman or master electrician license." },
      ],
      licenseAgency: ID_ELECTRICAL,
      training: [national("IBEW/NECA electrical apprenticeship (JATC)", "ibew-neca-electrical-apprenticeship", "Electrical apprenticeships, confirmed active in Idaho through local IBEW/NECA Joint Apprenticeship Training Committees.")],
    }),
    t("equipment-operator", {
      outlook: ol([5680, 6520, 15, 580]),
      stateLicense: "none",
      licenseSummary: idRegistration("equipment operators"),
      licenseAgency: ID_NO_LICENSE,
      training: [national("Operating Engineers (IUOE) apprenticeship", "operating-engineers-apprenticeship", "Heavy equipment operator apprenticeships.")],
    }),
    t("welder", {
      outlook: ol([3920, 4430, 13, 450]),
      stateLicense: "none",
      licenseSummary: idRegistration("welders") + " Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      licenseAgency: ID_NO_LICENSE,
      training: [LEARN_ON_JOB("Welding shops and fabricators")],
    }),
    t("hvac-technician", {
      outlook: ol([8500, 10870, 28, 1040]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Idaho licenses HVAC technicians statewide at every level, through DOPL: Apprentice registration, Journeyman license and Contractor license, plus separate specialty tracks for narrower HVAC work.",
      licenseSteps: [
        { title: "HVAC Apprentice", detail: "Registration with DOPL, required from the start of a four-year apprenticeship." },
        { title: "HVAC Journeyman", detail: "Documented apprenticeship hours and an exam." },
        { title: "HVAC Contractor", detail: "A business-level license building on journeyman experience." },
      ],
      licenseAgency: ID_HVAC,
      training: [LEARN_ON_JOB("HVAC contractors")],
    }),
    t("carpenter", {
      outlook: ol([16870, 20580, 22, 1700]),
      stateLicense: "contractor",
      licenseSummary: idRegistration("carpenters") + " It's the second-largest trade on this page.",
      licenseAgency: ID_CONTRACTOR,
      businessNote: idBusinessNote,
      training: [national("Carpenters union (UBC) apprenticeship", "ubc-carpenters-apprenticeship", "Carpentry apprenticeships.")],
    }),
    t("plumber", {
      outlook: ol([5780, 7090, 23, 650]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Idaho licenses plumbers statewide through DOPL's Plumbing Board: Apprentice registration, then a Journeyman Plumber license after 8,000 hours (about four years) of supervised work and an exam. There's no separate master tier; an individual journeyman with at least 2.5 years of experience can instead apply for a Plumbing Contractor license.",
      licenseSteps: [
        { title: "Plumbing Apprentice", detail: "Registration with DOPL while working under a licensed journeyman; apprentice hours count toward the journeyman license." },
        { title: "Journeyman Plumber", detail: "8,000 hours of supervised plumbing installation work, a related training class, and passing the IAPMO journeyman exam." },
        { title: "Plumbing Contractor", detail: "A journeyman with at least 2.5 years of documented journeyman experience can apply to be individually licensed as a plumbing contractor; a plumbing contracting business must employ at least one journeyman plumber." },
      ],
      licenseAgency: ID_PLUMBING,
      businessNote: "A plumbing contracting business must employ at least one journeyman plumber; an individual journeyman with at least 2.5 years of experience can also be licensed directly as a plumbing contractor.",
      training: [national("UA Plumbers & Pipefitters apprenticeship", "ua-plumber-pipefitter-apprenticeship", "Plumbing and pipefitting apprenticeships.")],
      payNote: "BLS counts plumbers, pipefitters and steamfitters as one occupation, so these pay and job numbers include pipefitters and sprinkler fitters.",
    }),
    t("painter", {
      outlook: ol([5420, 6620, 22, 580]),
      stateLicense: "contractor",
      licenseSummary: idRegistration("painters"),
      licenseAgency: ID_CONTRACTOR,
      businessNote: idBusinessNote,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([4400, 5280, 20, 410]),
      stateLicense: "contractor",
      licenseSummary: idRegistration("concrete finishers"),
      licenseAgency: ID_CONTRACTOR,
      businessNote: idBusinessNote,
      training: [LEARN_ON_JOB("Concrete contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([2040, 2500, 23, 200]),
      stateLicense: "contractor",
      licenseSummary: idRegistration("drywall installers"),
      licenseAgency: ID_CONTRACTOR,
      businessNote: idBusinessNote,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      stateLicense: "worker-certification",
      licenseSummary:
        "Idaho licenses elevator mechanics statewide through the Division of Building Safety's Elevator Safety Program, with separate Elevator Mechanic, Elevator Contractor and Elevator Inspector licenses. Idaho publishes no state-specific job count for elevator technicians.",
      licenseSteps: [
        { title: "Elevator Mechanic License", detail: "State-administered exam and documented training and experience through the Division of Building Safety." },
      ],
      licenseAgency: ID_ELEVATOR,
      training: [national("International Union of Elevator Constructors (IUEC) apprenticeship", "neiep-elevator-apprenticeship", "Elevator constructor apprenticeships.")],
      payNote: "Idaho publishes no state-specific outlook data for elevator technicians.",
    }),
    t("flooring-installer", {
      outlook: ol([520, 660, 28, 50]),
      stateLicense: "contractor",
      licenseSummary: idRegistration("flooring installers"),
      licenseAgency: ID_CONTRACTOR,
      businessNote: idBusinessNote,
      training: [LEARN_ON_JOB("Flooring contractors")],
      payNote: "BLS counts this group as floor layers except carpet, wood and tile, so some flooring workers fall in other categories.",
    }),
    t("glazier", {
      outlook: ol([900, 1080, 20, 100]),
      stateLicense: "contractor",
      licenseSummary: idRegistration("glaziers"),
      licenseAgency: ID_CONTRACTOR,
      businessNote: idBusinessNote,
      training: [LEARN_ON_JOB("Glazing contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([590, 720, 22, 60]),
      stateLicense: "contractor",
      licenseSummary: idRegistration("insulation installers"),
      licenseAgency: ID_CONTRACTOR,
      businessNote: idBusinessNote,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([800, 970, 21, 90]),
      stateLicense: "contractor",
      licenseSummary: idRegistration("ironworkers"),
      licenseAgency: ID_CONTRACTOR,
      businessNote: idBusinessNote,
      training: [national("Ironworkers union apprenticeship", "iron-workers-apprenticeship", "Structural and ornamental ironworker apprenticeships.")],
    }),
    t("mason", {
      outlook: ol([760, 920, 21, 80]),
      stateLicense: "contractor",
      licenseSummary: idRegistration("masons"),
      licenseAgency: ID_CONTRACTOR,
      businessNote: idBusinessNote,
      training: [national("Bricklayers union (BAC) apprenticeship", "bac-bricklayers-apprenticeship", "Masonry apprenticeships.")],
    }),
    t("millwright", {
      outlook: ol([700, 760, 8, 70]),
      stateLicense: "contractor",
      licenseSummary: idRegistration("millwrights"),
      licenseAgency: ID_CONTRACTOR,
      businessNote: idBusinessNote,
      training: [LEARN_ON_JOB("Industrial and millwright contractors")],
    }),
    t("pipefitter", {
      stateLicense: "worker-certification",
      licenseSummary:
        "Idaho licenses pipefitters under the same Journeyman Plumber credential as plumbers; there's no separate pipefitter-only license.",
      licenseAgency: ID_PLUMBING,
      training: [national("UA Plumbers & Pipefitters apprenticeship", "ua-plumber-pipefitter-apprenticeship", "Plumbing and pipefitting apprenticeships.")],
      payNote: "Idaho's BLS projection groups pipefitters with plumbers and sprinkler fitters, so there's no separate pipefitter-only figure.",
    }),
    t("plasterer-stucco-mason", {
      stateLicense: "contractor",
      licenseSummary: idRegistration("plasterers and stucco masons") + " Idaho publishes no state-specific job count for this trade.",
      licenseAgency: ID_CONTRACTOR,
      businessNote: idBusinessNote,
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
      payNote: "Idaho publishes no state-specific outlook data for plasterers and stucco masons.",
    }),
    t("roofer", {
      outlook: ol([2730, 3420, 25, 280]),
      stateLicense: "contractor",
      licenseSummary: idRegistration("roofers"),
      licenseAgency: ID_CONTRACTOR,
      businessNote: idBusinessNote,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([1980, 2280, 16, 200]),
      stateLicense: "contractor",
      licenseSummary: idRegistration("sheet metal workers"),
      licenseAgency: ID_CONTRACTOR,
      businessNote: idBusinessNote,
      training: [national("Sheet Metal Workers (SMART) apprenticeship", "smart-sheet-metal-apprenticeship", "Sheet metal worker apprenticeships.")],
    }),
    t("solar-installer", {
      outlook: ol([90, 130, 51, 10]),
      stateLicense: "none",
      licenseSummary:
        "Idaho has no license specifically for solar installers; electrical work on a solar system still needs an Idaho-licensed electrician. Solar installer's 51% growth figure is Idaho-specific, not a national fallback, and it's the highest state-specific growth figure found anywhere on this site.",
      licenseAgency: ID_ELECTRICAL,
      training: [LEARN_ON_JOB("Solar installation contractors")],
    }),
    t("sprinkler-fitter", {
      stateLicense: "none",
      licenseSummary:
        "Idaho requires a Fire Protection Sprinkler Contractor License for the business, issued by the Dept. of Insurance's State Fire Marshal, but the individual Fitter's license is voluntary rather than mandatory; a fitter can earn it by passing the ISFM fitter exam, but doesn't have to.",
      licenseSteps: [
        { title: "Fitter's license (voluntary)", detail: "Meeting minimum qualifications and passing the ISFM fitter exam earns a credential, but it's optional, not required, to work installing or maintaining fire sprinkler systems in Idaho." },
      ],
      licenseAgency: ID_SPRINKLER,
      training: [national("UA Road Sprinkler Fitters apprenticeship (Local 669)", "ua-669-sprinkler-fitter-apprenticeship", "Fire sprinkler fitter apprenticeships.")],
      payNote: "Idaho's BLS projection groups sprinkler fitters with plumbers and pipefitters, so there's no separate sprinkler-fitter-only figure.",
      businessNote: "A fire sprinkler business still needs its own Fire Protection Sprinkler Contractor License from the State Fire Marshal, renewed every three years, even though the individual fitter's license is optional.",
    }),
    t("tile-setter", {
      outlook: ol([1120, 1450, 29, 120]),
      stateLicense: "contractor",
      licenseSummary: idRegistration("tile setters"),
      licenseAgency: ID_CONTRACTOR,
      businessNote: idBusinessNote,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "contractor",
      licenseSummary: idRegistration("waterproofing installers"),
      licenseAgency: ID_CONTRACTOR,
      businessNote: idBusinessNote,
      payNote: "Waterproofing has no distinct federal job category, so no state-specific job count exists for it in Idaho or anywhere else on this site.",
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Advanced Opportunities",
      detail: "Every Idaho public-school student in grades 7-12 gets $4,625 to spend on dual-credit college courses, overload courses, exams and workforce training, which can include trade certifications; most dual-credit courses cost just $75 per credit, so this allotment covers many of them outright.",
      source: ID_ADVANCED_OPPS,
    },
  ],
  adults: [
    {
      title: "Registered Apprenticeship",
      detail: "Idaho's registered apprenticeship system, coordinated through the state's Workforce Development Council and the U.S. Dept. of Labor, registers union and non-union sponsors statewide; apprentices earn wages from day one toward a nationally recognized credential.",
      source: { label: "Idaho Workforce Development Council, Registered Apprenticeship", url: "https://wdc.idaho.gov/apprenticeship/" },
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Idaho statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Idaho long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2061.00?st=ID" },
    ID_ELECTRICAL,
    ID_PLUMBING,
    ID_HVAC,
    ID_ELEVATOR,
    ID_SPRINKLER,
    ID_CONTRACTOR,
    ID_ADVANCED_OPPS,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
