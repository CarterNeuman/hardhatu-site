// Montana state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Montana-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, UA_669, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Montana";

const MT_ELECTRICAL: SourceRef = { label: "Montana State Electrical Board, electrician and electrical contractor licensing", url: "https://boards.bsd.dli.mt.gov/electrical/" };
const MT_PLUMBING: SourceRef = { label: "Montana Board of Plumbers, journeyman and master plumber licensing", url: "https://boards.bsd.dli.mt.gov/plumbers/" };
const MT_HVAC: SourceRef = { label: "Montana Board of HVACR Contractors, business-level contractor licensing", url: "https://www.contractorlicenserequirements.com/montana/hvac-license-requirements/" };
const MT_ELEVATOR: SourceRef = { label: "Montana Elevator Contractors, Mechanics, and Inspectors Licensing Program", url: "https://boards.bsd.dli.mt.gov/elevator-contractors/license-information" };
const MT_FIRE_PROTECTION: SourceRef = { label: "Montana Fire Protection License Program (business entity license plus individual endorsement)", url: "https://boards.bsd.dli.mt.gov/fire-protection/license-information/" };
const MT_CCL: SourceRef = { label: "Montana Construction Contractor License (CCL) Program, Dept. of Labor and Industry", url: "https://boards.bsd.dli.mt.gov/construction-contractor/" };
const MT_NO_LICENSE: SourceRef = { label: "Harbor Compliance, 50-State Construction Licensing Compliance Guide: Montana", url: "https://www.harborcompliance.com/montana-construction-license" };
const MT_ONE_TWO_FREE: SourceRef = { label: "Montana University System, One-Two-Free dual enrollment program", url: "https://mus.edu/Perkins/" };

const MT_ELECTRICAL_JATC: TrainingOption = {
  name: "Montana Electrical JATC (IBEW/NECA)",
  kind: "union",
  where: "Helena, serving the whole state",
  detail: "A single statewide joint apprenticeship training committee, serving IBEW Locals 233, 532 and 768, that trains electrical apprentices for every region of Montana.",
  url: "http://www.mtelectricaljatc.org/",
};
const MT_SPRINKLER_669: TrainingOption = {
  ...UA_669,
  detail: "UA Local 669 Road Sprinkler Fitters recruit and train apprentices who travel statewide for sprinkler installation work, confirmed as an active Montana apprenticeship sponsor by the state's own Dept. of Labor and Industry.",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const mtNoLicense = (what: string) =>
  `Montana has no statewide license for ${what}. Most construction businesses, this one included, instead need a Montana Construction Contractor License, a workers' compensation and insurance registration rather than a skills test, which replaced the state's older basic contractor registration system on January 1, 2026.`;
const mtBusinessNote =
  "Montana's Construction Contractor License, required of most businesses with employees, checks for workers' compensation and unemployment insurance coverage rather than testing trade skills, and a business with no employees can instead file an Independent Contractor Exemption Certificate.";

export const MONTANA: StateGuide = {
  locationHints: { zip3: [[590, 599]], cities: ["Billings", "Missoula", "Great Falls", "Bozeman", "Helena", "Kalispell", "Butte"] },
  slug: "montana",
  code: "MT",
  name: S,
  lastVerified: "2026-11-23",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Montana long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2061.00?st=MT",
  },
  intro:
    "A field guide to 25 construction trades in Montana: what they pay here, which ones need a license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ roughly 28,500 people in Montana, with laborers and carpenters the two largest trades, each over 5,800 people.",
    "Electricians and plumbers are the two trades licensed statewide with a full journeyman-and-master ladder, through the State Electrical Board and the Board of Plumbers. HVAC technicians have no individual state license at all; a business needs a Montana HVACR contractor license only if it has employees.",
    "Elevator mechanics are licensed statewide too, through a single Elevator Mechanic's License (or a narrower Limited Mechanic's License) from the state's elevator licensing program.",
    "Electrician is projected to grow 19%, a strong pace for a trade this size; among trades with real Montana-specific data, flooring installer grows fastest at 24%, though it's one of the smallest trades on this page.",
    "Most other trades, including carpentry, roofing and masonry, have no trade license at all; the business itself needs a Montana Construction Contractor License instead, a workers'-comp-and-insurance check rather than a skills test, which replaced the state's old basic contractor registration system on January 1, 2026.",
  ],
  costMarker: { label: "Montana University System's One-Two-Free", value: "$0", note: "Montana high school juniors and seniors can take their first two dual-enrollment college courses, up to six credits, completely free through the Montana University System; after that, students pay half price, and those with financial need can apply for a hardship scholarship to cover the rest" },
  licensingOverview:
    "Montana licenses electricians and plumbers statewide with a genuine journeyman-and-master ladder: the State Electrical Board issues Residential, Journeyman and Master Electrician licenses plus Limited and Unlimited Electrical Contractor business licenses (an unlimited contractor needs a licensed master as its responsible electrician; a limited contractor needs at least a journeyman), and the Board of Plumbers issues Journeyman and Master Plumber licenses, with a journeyman required to work under a master's supervision. HVAC technicians have no individual state license at all; Montana's Board of HVACR Contractors licenses only the business, and only once it has employees, with no exam of any kind, just a registration. Elevator mechanics are licensed statewide too, through a single Elevator Mechanic's License (or a narrower Limited Mechanic's License for smaller jobs), plus separate Elevator Contractor and Elevator Inspector licenses. Fire sprinkler work needs a Montana Fire Protection business entity license plus an individual endorsement for the person doing the work, overseen by the State Fire Marshal's office. Montana has no general statewide contractor's license for any other trade; instead, most construction businesses with employees need a Montana Construction Contractor License, which replaced the state's older, more basic contractor registration system on January 1, 2026, and checks for workers' compensation and unemployment insurance coverage rather than testing any trade skill. A business with no employees can instead file a simpler Independent Contractor Exemption Certificate.",
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
      "With no general statewide contractor's license and no skills test for most trades, starting a construction business in Montana has a lower regulatory bar than in many states on this site.",
      "Montana's smaller, more spread-out market can mean less competition for a well-run shop willing to travel between towns.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "A small, spread-out state can mean more driving and thinner local demand for a specialty shop outside the handful of larger cities.",
    ],
    path:
      "The usual route: work for someone else for years, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      MT_CCL,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([5860, 6530, 11, 550]),
      stateLicense: "none",
      licenseSummary: mtNoLicense("construction laborers") + " It's one of the two largest trades on this page.",
      licenseAgency: MT_NO_LICENSE,
      training: [national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([3160, 3740, 19, 350]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Montana licenses electricians statewide with a genuine journeyman-and-master ladder, through the State Electrical Board. There's also an optional Residential Electrician tier for home-only work. At 19% growth, it's one of the faster-growing trades on this page.",
      licenseSteps: [
        { title: "Residential Electrician (optional)", detail: "A narrower license, limited to residential work, for electricians who don't need the full journeyman scope." },
        { title: "Journeyman Electrician", detail: "An exam and documented experience under a licensed electrician, administered by the State Electrical Board." },
        { title: "Master Electrician", detail: "Further documented experience as a journeyman, then a separate exam. A master is required as the responsible electrician for an Unlimited Electrical Contractor business license; a journeyman can instead be the responsible electrician for a Limited Electrical Contractor license, which covers residential work only." },
      ],
      licenseAgency: MT_ELECTRICAL,
      training: [MT_ELECTRICAL_JATC],
    }),
    t("equipment-operator", {
      outlook: ol([3910, 4090, 5, 340]),
      stateLicense: "none",
      licenseSummary: mtNoLicense("equipment operators"),
      licenseAgency: MT_NO_LICENSE,
      training: [national("Operating Engineers (IUOE) apprenticeship", "operating-engineers-apprenticeship", "Heavy equipment operator apprenticeships, confirmed active in Montana through the Montana Operating Engineers Apprentice Program.")],
    }),
    t("welder", {
      outlook: ol([1470, 1680, 14, 170]),
      stateLicense: "none",
      licenseSummary: mtNoLicense("welders") + " Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      licenseAgency: MT_NO_LICENSE,
      training: [LEARN_ON_JOB("Welding shops and fabricators")],
    }),
    t("hvac-technician", {
      outlook: ol([1310, 1520, 16, 140]),
      stateLicense: "contractor",
      licenseSummary:
        "Montana has no individual state license for HVAC technicians; a technician handling refrigerants still needs the federal EPA Section 608 certification. A business only needs a Montana HVACR contractor license once it has employees, and that license has no exam of any kind, just a registration and proof of insurance.",
      licenseSteps: [
        { title: "No individual state license", detail: "Montana does not license HVAC technicians individually; EPA Section 608 certification for handling refrigerants is a federal requirement, not a state license." },
      ],
      licenseAgency: MT_HVAC,
      businessNote: "A business with employees needs a Montana HVACR contractor license, which checks insurance rather than skills; a business with no employees can instead file a simpler Independent Contractor Exemption Certificate.",
      training: [LEARN_ON_JOB("HVAC contractors")],
    }),
    t("carpenter", {
      outlook: ol([5830, 6260, 7, 470]),
      stateLicense: "contractor",
      licenseSummary: mtNoLicense("carpenters") + " It's one of the two largest trades on this page.",
      licenseAgency: MT_CCL,
      businessNote: mtBusinessNote,
      training: [national("Carpenters union (UBC) apprenticeship", "ubc-carpenters-apprenticeship", "Carpentry apprenticeships, confirmed active in Montana through the Montana Carpenters JATC.")],
    }),
    t("plumber", {
      outlook: ol([2010, 2240, 12, 200]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Montana licenses plumbers statewide with a genuine journeyman-and-master ladder, through the Board of Plumbers. A journeyman plumber may only perform work in the employment of a licensed master plumber, unless a board rule permits otherwise.",
      licenseSteps: [
        { title: "Journeyman Plumber", detail: "A documented apprenticeship and an exam, administered by the Board of Plumbers." },
        { title: "Master Plumber", detail: "At least 4 years as a licensed journeyman, with 3 of those years working for a master plumber or in a supervisory role, then a separate exam." },
      ],
      licenseAgency: MT_PLUMBING,
      businessNote: "A master plumber may not let another person or business use their license to obtain permits or perform plumbing work; each plumbing business needs its own licensed master plumber of record.",
      training: [national("UA Plumbers & Pipefitters apprenticeship", "ua-plumber-pipefitter-apprenticeship", "Plumbing and pipefitting apprenticeships, confirmed active in Montana through the Missoula Plumbers and Steamfitters JATC and the Plumbers & Pipefitters Local 41 JATC.")],
      payNote: "BLS counts plumbers, pipefitters and steamfitters as one occupation, so these pay and job numbers include pipefitters and sprinkler fitters.",
    }),
    t("painter", {
      outlook: ol([1140, 1300, 15, 110]),
      stateLicense: "contractor",
      licenseSummary: mtNoLicense("painters"),
      licenseAgency: MT_CCL,
      businessNote: mtBusinessNote,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([860, 930, 8, 70]),
      stateLicense: "contractor",
      licenseSummary: mtNoLicense("concrete finishers"),
      licenseAgency: MT_CCL,
      businessNote: mtBusinessNote,
      training: [LEARN_ON_JOB("Concrete contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([190, 220, 15, 20]),
      stateLicense: "contractor",
      licenseSummary: mtNoLicense("drywall installers"),
      licenseAgency: MT_CCL,
      businessNote: mtBusinessNote,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([60, 70, 15, 10]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Montana licenses elevator mechanics statewide through a single Elevator Mechanic's License (or a narrower Limited Mechanic's License for smaller conveyance work), plus a separate Elevator Contractor business license and an Elevator Inspector license.",
      licenseSteps: [
        { title: "Elevator Mechanic's License (or Limited Mechanic's License)", detail: "Documented training and experience, verified by the Dept. of Labor and Industry's elevator licensing program, plus an exam." },
      ],
      licenseAgency: MT_ELEVATOR,
      training: [national("International Union of Elevator Constructors (IUEC) apprenticeship", "neiep-elevator-apprenticeship", "Elevator constructor apprenticeships, confirmed active in Montana through IUEC Local 19.")],
    }),
    t("flooring-installer", {
      outlook: ol([120, 150, 24, 10]),
      stateLicense: "contractor",
      licenseSummary: mtNoLicense("flooring installers"),
      licenseAgency: MT_CCL,
      businessNote: mtBusinessNote,
      training: [LEARN_ON_JOB("Flooring contractors")],
      payNote: "BLS counts this group as floor layers except carpet, wood and tile, so some flooring workers fall in other categories.",
    }),
    t("glazier", {
      stateLicense: "contractor",
      licenseSummary: mtNoLicense("glaziers") + " Montana publishes no state-specific job count for glaziers.",
      licenseAgency: MT_CCL,
      businessNote: mtBusinessNote,
      training: [LEARN_ON_JOB("Glazing contractors")],
      payNote: "Montana publishes no state-specific outlook data for glaziers; nationally the occupation is projected to decline slightly.",
    }),
    t("insulation-installer", {
      outlook: ol([510, 610, 20, 50]),
      stateLicense: "contractor",
      licenseSummary: mtNoLicense("insulation installers"),
      licenseAgency: MT_CCL,
      businessNote: mtBusinessNote,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([160, 170, 8, 10]),
      stateLicense: "contractor",
      licenseSummary: mtNoLicense("ironworkers"),
      licenseAgency: MT_CCL,
      businessNote: mtBusinessNote,
      training: [national("Ironworkers union apprenticeship", "iron-workers-apprenticeship", "Structural and ornamental ironworker apprenticeships, confirmed active in Montana through Montana Ironworkers Local 732.")],
    }),
    t("mason", {
      outlook: ol([200, 210, 9, 20]),
      stateLicense: "contractor",
      licenseSummary: mtNoLicense("masons"),
      licenseAgency: MT_CCL,
      businessNote: mtBusinessNote,
      training: [national("Bricklayers union (BAC) apprenticeship", "bac-bricklayers-apprenticeship", "Masonry apprenticeships, confirmed active in Montana through Bricklayers Local #3.")],
    }),
    t("millwright", {
      outlook: ol([190, 180, -4, 20]),
      stateLicense: "contractor",
      licenseSummary: mtNoLicense("millwrights") + " It's the only declining trade on this page with Montana-specific data.",
      licenseAgency: MT_CCL,
      businessNote: mtBusinessNote,
      training: [LEARN_ON_JOB("Industrial and millwright contractors")],
    }),
    t("pipefitter", {
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Montana licenses pipefitters under the same Journeyman and Master Plumber credentials as plumbers; there's no separate pipefitter-only license.",
      licenseAgency: MT_PLUMBING,
      training: [national("UA Plumbers & Pipefitters apprenticeship", "ua-plumber-pipefitter-apprenticeship", "Plumbing and pipefitting apprenticeships, confirmed active in Montana through the Missoula Plumbers and Steamfitters JATC and the Plumbers & Pipefitters Local 41 JATC.")],
      payNote: "Montana's BLS projection groups pipefitters with plumbers and sprinkler fitters, so there's no separate pipefitter-only figure.",
    }),
    t("plasterer-stucco-mason", {
      outlook: ol([40, 50, 14, 0]),
      stateLicense: "contractor",
      licenseSummary: mtNoLicense("plasterers and stucco masons") + " It's one of the smallest trades on this page.",
      licenseAgency: MT_CCL,
      businessNote: mtBusinessNote,
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([560, 620, 10, 50]),
      stateLicense: "contractor",
      licenseSummary: mtNoLicense("roofers") + " Any roofer with employees or subcontractors needs the same Montana Construction Contractor License as a general contractor.",
      licenseAgency: MT_CCL,
      businessNote: mtBusinessNote,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([610, 680, 12, 60]),
      stateLicense: "contractor",
      licenseSummary: mtNoLicense("sheet metal workers"),
      licenseAgency: MT_CCL,
      businessNote: mtBusinessNote,
      training: [national("Sheet Metal Workers (SMART) apprenticeship", "smart-sheet-metal-apprenticeship", "Sheet metal worker apprenticeships, confirmed active in Montana through the Montana Sheet Metal Workers JATC.")],
    }),
    t("solar-installer", {
      stateLicense: "none",
      licenseSummary:
        "Montana has no license specifically for solar installers; electrical work on a solar system still needs a Montana-licensed electrician. Montana publishes no state-specific growth projection for this trade; nationally it's growing 37%, by far the fastest of any trade on this page.",
      licenseAgency: MT_ELECTRICAL,
      training: [LEARN_ON_JOB("Solar installation contractors")],
    }),
    t("sprinkler-fitter", {
      stateLicense: "worker-certification",
      licenseSummary:
        "Montana licenses fire sprinkler work through its Fire Protection License Program: a business entity license to sell, service or install fire sprinkler systems, plus a separate individual endorsement for the person actually doing the work, overseen by the State Fire Marshal's office.",
      licenseSteps: [
        { title: "Individual Endorsement", detail: "An exam and background review by the State Fire Marshal's office, required on top of the business's own Fire Protection License before a person may do sprinkler installation or service work." },
      ],
      licenseAgency: MT_FIRE_PROTECTION,
      training: [MT_SPRINKLER_669],
      payNote: "Montana's BLS projection groups sprinkler fitters with plumbers and pipefitters, so there's no separate sprinkler-fitter-only figure.",
      businessNote: "A fire protection business needs its own Montana Fire Protection License, renewed annually, on top of each individual installer's own endorsement.",
    }),
    t("tile-setter", {
      outlook: ol([340, 420, 23, 30]),
      stateLicense: "contractor",
      licenseSummary: mtNoLicense("tile setters"),
      licenseAgency: MT_CCL,
      businessNote: mtBusinessNote,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "contractor",
      licenseSummary: mtNoLicense("waterproofing installers"),
      licenseAgency: MT_CCL,
      businessNote: mtBusinessNote,
      payNote: "Waterproofing has no distinct federal job category, so no state-specific job count exists for it in Montana or anywhere else on this site.",
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "One-Two-Free dual enrollment",
      detail: "Montana high school juniors and seniors can take their first two dual-enrollment college courses, up to six credits, completely free through the Montana University System; students who use up those free credits pay half price afterward, and students with financial need can apply for a hardship scholarship to cover the rest.",
      source: MT_ONE_TWO_FREE,
    },
  ],
  adults: [
    {
      title: "Registered Apprenticeship",
      detail: "The Montana Dept. of Labor and Industry's Apprenticeship and Training Program registers union and non-union apprenticeship sponsors statewide; apprentices earn wages from day one toward a nationally recognized credential.",
      source: { label: "Montana Dept. of Labor and Industry, Registered Apprenticeship", url: "https://apprenticeship.mt.gov/" },
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Montana statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Montana long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2061.00?st=MT" },
    MT_ELECTRICAL,
    MT_PLUMBING,
    MT_HVAC,
    MT_ELEVATOR,
    MT_FIRE_PROTECTION,
    MT_CCL,
    MT_ONE_TWO_FREE,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
