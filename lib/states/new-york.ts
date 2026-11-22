// New York state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is New York-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, NEIEP, UA_669, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "New York";

const NY_ELECTRICAL: SourceRef = { label: "NYC Dept. of Buildings, Master & Special Electrician License (the state's most developed local licensing example)", url: "https://www.nyc.gov/site/buildings/industry/obtain-a-master-and-special-electrician-license.page" };
const NY_PLUMBING: SourceRef = { label: "NYC Dept. of Buildings, Master Plumber License", url: "https://www.nyc.gov/site/buildings/industry/obtain-a-master-plumber-license.page" };
const NY_FIRE_SUPPRESSION: SourceRef = { label: "NYC Dept. of Buildings, Master Fire Suppression Piping Contractor License", url: "https://www.nyc.gov/site/buildings/industry/obtain-a-fire-suppression-piping-contractor-class-a-b-or-c-license.page" };
const NY_SPRINKLER_BILL: SourceRef = { label: "New York State Senate, Article 40-A sprinkler fitter licensing bill (repeatedly introduced since 2017, not yet enacted)", url: "https://www.nysenate.gov/legislation/bills/2025/A6529" };
const NY_ELEVATOR: SourceRef = { label: "New York State Dept. of Labor, Elevator Safety Act licensing information", url: "https://dol.ny.gov/elevator-licensing-information" };
const NY_ELEVATOR_NYC: SourceRef = { label: "NYC Dept. of Buildings, Elevator Licenses & Helper Card (a second, city-level license layered on the state one)", url: "https://www.nyc.gov/site/buildings/industry/elevator-licenses-and-helper-card.page" };
const NY_CRANE: SourceRef = { label: "New York State Dept. of Labor, Crane Operator's Certificate of Competence (outside New York City)", url: "https://dol.ny.gov/crane-exams" };
const NY_CRANE_NYC: SourceRef = { label: "NYC Dept. of Buildings, Hoisting Machine Operator (HMO) License (inside New York City)", url: "https://www.nyc.gov/site/buildings/industry/obtain-a-class-a-hoisting-machine-operator-license.page" };
const NY_HIC: SourceRef = { label: "NYC Dept. of Consumer and Worker Protection, Home Improvement Contractor License (one of many separate local systems statewide)", url: "https://www.nyc.gov/site/dca/businesses/license-checklist-home-improvement-contractor.page" };
const NY_NO_LICENSE: SourceRef = { label: "Harbor Compliance, 50-State Construction Licensing Compliance Guide: New York (no state-level license for this trade)", url: "https://harborcompliance.com/new-york-construction-license" };
const NY_SOLAR: SourceRef = { label: "NYSERDA NY-Sun Eligible Installer / Contractor requirements", url: "https://www.nyserda.ny.gov/-/media/Project/Nyserda/Files/Programs/NY-Sun/contractor-application-checklist.pdf" };
const NY_APPRENTICESHIP: SourceRef = { label: "New York State Dept. of Labor, Registered Apprenticeship Program", url: "https://dol.ny.gov/apprenticeship" };
const NY_PTECH: SourceRef = { label: "New York State Education Dept., Pathways in Technology Early College High School (P-TECH) Program", url: "https://www.highered.nysed.gov/kiap/scholarships/PTech.htm" };

const IBEW_3: TrainingOption = {
  name: "IBEW Local 3 / NECA Joint Industry Board electrical apprenticeship",
  kind: "union",
  where: "Long Island City, with a Westchester-Fairfield branch",
  detail: "A paid, 4-year union electrical apprenticeship (8,000 on-the-job hours plus 576 hours of related classroom instruction) for anyone who has lived in the greater New York City metro area (within 60 miles of Columbus Circle) for at least 2 years. New York is the only state where IBEW Local 3 apprentices also earn an associate degree as part of the program.",
  url: "https://www.jibei.org/benefits/apprentice-program/",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const CARPENTERS_NYC: TrainingOption = {
  name: "New York City District Council of Carpenters apprenticeship",
  kind: "union",
  where: "New York City",
  detail: "A paid union carpentry apprenticeship for the five boroughs, registered with the state Dept. of Labor.",
  programSlug: "ua-plumber-pipefitter-apprenticeship",
};
const MILLWRIGHT_NASCTF: TrainingOption = {
  name: "North Atlantic States Carpenters Training Fund, millwright apprenticeship",
  kind: "union",
  where: "Recruits statewide",
  detail: "A paid union millwright apprenticeship, registered with the state Dept. of Labor, that recruits periodically rather than year-round.",
};
const GLAZIERS_FTI: TrainingOption = {
  name: "Finishing Trades Institute of Western and Central New York, glazier apprenticeship",
  kind: "union",
  where: "Western and Central New York",
  detail: "A paid union glazier apprenticeship (IUPAT) that recruits periodically.",
};
const CRANE_NCCCO: TrainingOption = {
  name: "NCCCO crane operator certification",
  kind: "free-training",
  where: "Statewide",
  detail: "The national crane-operator certification underlying both New York's state Certificate of Competence (outside NYC) and the city's own Hoisting Machine Operator license.",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const nyNoLicense = (what: string) =>
  `New York has no statewide license for ${what}. New York City's Dept. of Buildings runs the most developed local system in the state; dozens of other counties, towns and cities each run their own separate licensing boards, and large stretches of rural upstate New York require no license at all beyond a building permit.`;
const hicSummary = (what: string) =>
  `New York has no statewide license or registration for ${what}s either. Most residential remodeling and repair work needs a local Home Improvement Contractor registration instead, but, like licensing generally in New York, there's no single statewide HIC: New York City's Dept. of Consumer and Worker Protection runs one system, and a long list of counties (Nassau, Suffolk, Westchester, Rockland and others) each run their own, separate from it.`;
const hicBusinessNote =
  "A Home Improvement Contractor registration is held at the business level in whichever county or city requires one, not by every individual worker, and it only ever covers residential work; commercial jobs in the same trade typically need no license anywhere in the state.";

export const NEW_YORK: StateGuide = {
  // New York ZIP codes run roughly 100xx-149xx.
  locationHints: { zip3: [[100, 149]], cities: ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany", "New Rochelle", "Mount Vernon"] },
  slug: "new-york",
  code: "NY",
  name: S,
  lastVerified: "2026-11-22",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "New York long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2061.00?st=NY",
  },
  intro:
    "A field guide to 25 construction trades in New York: what they pay here, which ones need a license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ roughly 360,000 people in New York, with construction laborers, carpenters and electricians the three largest.",
    "New York has no general statewide contractor's license, and almost no statewide trade-worker license either. Electricians, plumbers, HVAC technicians and fire sprinkler fitters are licensed locally, if at all, not by the state; New York City runs the most developed local system, and much of rural upstate New York licenses none of them.",
    "Elevator mechanics and crane operators are the two real exceptions, both licensed statewide by the New York State Dept. of Labor. Working inside New York City adds a second, city-level license on top of the state one for both trades.",
    "Electrician is the fastest-growing trade on this page with New York-specific data, projected to grow 8%. Solar installer would likely be faster still, since it's growing 37% nationally, but New York publishes no state-specific projection for it.",
    "Millwright is projected to shrink the most of any trade on this page, -8%, with sheet metal workers (-6%) and concrete finishers (-5%) also declining.",
    "Most other residential trades, like carpentry, painting, roofing and masonry, fall under a Home Improvement Contractor registration instead of a license, but there's no single statewide HIC either: New York City and a long list of counties each run their own.",
  ],
  costMarker: { label: "Pathways in Technology Early College High School (P-TECH)", value: "$0", note: "A free, six-year 9-to-14 public high school program that leads to a tuition-free Associate degree (AA, AS or AAS) from a SUNY or CUNY community college; several P-TECH partnerships, including one in New York City, focus specifically on construction, civil engineering and architectural technology" },
  licensingOverview:
    "New York has no general statewide contractor's license and, with two exceptions, no statewide trade-worker license either. Electricians, plumbers, HVAC technicians and fire sprinkler fitters are licensed locally, if at all: New York City's Dept. of Buildings runs the most developed system (a Master & Special Electrician license, a Master Plumber license, and a Master Fire Suppression Piping Contractor license, the last two overseen by the same licensing board), and dozens of individual counties, towns and cities, from Nassau and Suffolk to Buffalo, Rochester and Syracuse, each run their own separate boards with their own rules and exams. Large stretches of rural upstate New York require no license at all for these trades beyond a building permit. A statewide sprinkler fitter license has been proposed in nearly every legislative session since at least 2017 and has never passed. Elevator mechanics and crane operators are the two genuine exceptions: under the state's Elevator Safety Act (Labor Law Article 33), elevator work has needed a New York State Dept. of Labor Elevator Mechanic License statewide since 2022, and working inside New York City adds a second, city-level Elevator Agency Technician license on top of it; crane operation on a construction, demolition or excavation site needs a state Dept. of Labor Certificate of Competence everywhere outside New York City, where the city's own Hoisting Machine Operator license applies in its place instead. Most other residential trades, like carpentry, painting, masonry, roofing, flooring and tile work, fall under a Home Improvement Contractor registration rather than a skills-tested license, and, again, there's no single statewide HIC: New York City's Dept. of Consumer and Worker Protection runs one system, and a long list of individual counties run their own, separate from it and from each other.",
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
      "With no general statewide contractor's license, starting a business outside New York City and the licensed counties has a lower regulatory bar than in most states on this site.",
      "New York's enormous construction market, especially downstate, means steady demand for a well-run shop in almost any of these trades.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "A patchwork of separate city and county licensing boards means a business that wants to work across several nearby jurisdictions can end up applying, testing and paying fees more than once.",
    ],
    path:
      "The usual route: work for someone else for years, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      NY_HIC,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([72920, 75040, 3, 6030]),
      stateLicense: "none",
      licenseSummary: nyNoLicense("construction laborers") + " It's the largest trade on this page.",
      licenseAgency: NY_NO_LICENSE,
      training: [national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([58380, 63210, 8, 5680]),
      stateLicense: "none",
      licenseSummary:
        "New York has no statewide electrician license. New York City's Dept. of Buildings issues the state's best-known credentials: a Master Electrician License (needed to pull electrical permits or contract independently) and a narrower Special Electrician License (for electricians employed on one specific project or building). Dozens of other counties, towns and cities run their own separate electrician licensing boards, and much of rural upstate New York requires none at all. It's the fastest-growing trade on this page with New York-specific data.",
      licenseSteps: [
        { title: "Local journeyman or equivalent (where required)", detail: "Most licensing jurisdictions outside NYC require several years of experience and a local exam before working unsupervised; requirements vary by county, town and city." },
        { title: "NYC Master or Special Electrician License", detail: "NYC's own written and practical exams, administered by the Dept. of Buildings; a Master Electrician license is needed to request an electrical permit or contract independently in the five boroughs." },
      ],
      licenseAgency: NY_ELECTRICAL,
      training: [IBEW_3],
    }),
    t("equipment-operator", {
      outlook: ol([18840, 19240, 2, 1570]),
      stateLicense: "worker-certification",
      licenseSummary:
        "New York has no general license for operating bulldozers, excavators or other heavy equipment, but operating a crane on a construction, demolition or excavation site needs a license everywhere in the state. Outside New York City, that's a state Dept. of Labor Crane Operator's Certificate of Competence; inside the five boroughs, it's a separate NYC Dept. of Buildings Hoisting Machine Operator (HMO) license instead, by class (A, B, C or a newer Limited license for smaller machines like mini cranes and rotating telehandlers).",
      licenseSteps: [
        { title: "NCCCO crane operator certification", detail: "The national written and practical exams underlying both the state and city credentials below." },
        { title: "State Certificate of Competence (outside NYC) or NYC HMO License (inside NYC)", detail: "Outside the city, the state Dept. of Labor's certificate authorizes crane work anywhere in New York except New York City; inside the city, the Dept. of Buildings' own HMO license applies instead, and typically takes several years of logged experience plus a Dept.-approved 40-hour course on top of the NCCCO certification. Other heavy equipment has no state or city license." },
      ],
      licenseAgency: NY_CRANE,
      training: [CRANE_NCCCO],
    }),
    t("welder", {
      outlook: ol([13980, 13560, -3, 1290]),
      stateLicense: "none",
      licenseSummary: nyNoLicense("welders") + " Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      licenseAgency: NY_NO_LICENSE,
      training: [LEARN_ON_JOB("Welding shops and fabricators")],
    }),
    t("hvac-technician", {
      outlook: ol([24880, 25300, 2, 2120]),
      stateLicense: "none",
      licenseSummary: nyNoLicense("HVAC technicians") + " Mechanical contractors are licensed at the local level, if at all, the same way.",
      licenseSteps: [
        { title: "No statewide HVAC or mechanical contractor license", detail: "New York licenses HVAC and mechanical contracting locally, if a given county, town or city licenses it at all; there is no state-level credential to work toward." },
      ],
      licenseAgency: NY_NO_LICENSE,
      training: [LEARN_ON_JOB("HVAC contractors")],
    }),
    t("carpenter", {
      outlook: ol([59810, 59540, -1, 4220]),
      stateLicense: "contractor",
      licenseSummary: hicSummary("carpenter") + " It's the second-largest trade on this page.",
      licenseAgency: NY_HIC,
      businessNote: hicBusinessNote,
      training: [CARPENTERS_NYC],
    }),
    t("plumber", {
      outlook: ol([41310, 42880, 4, 3560]),
      stateLicense: "none",
      licenseSummary:
        "New York has no statewide plumbing license. New York City's Dept. of Buildings issues the state's best-known credential, a Master Plumber license (at least 7 years of experience including 2 as a registered journeyman in NYC, then written and practical exams), overseen by the same board that licenses fire suppression work. Dozens of other counties, towns and cities run their own separate plumbing licensing boards, with their own journeyman and master tiers, and much of rural upstate New York requires none at all.",
      licenseSteps: [
        { title: "Local journeyman registration (where required)", detail: "Most licensing jurisdictions require registered journeyman experience, under a licensed master plumber's supervision, before an applicant can sit for a master exam; requirements vary by county, town and city." },
        { title: "NYC Master Plumber License", detail: "At least 7 years of plumbing experience, including 2 as a registered journeyman in New York City, then written and practical exams administered by the Dept. of Buildings." },
      ],
      licenseAgency: NY_PLUMBING,
      businessNote: "New York plumbing work must be done by whichever locally licensed plumber or that plumber's own employee the county, town or city requires; there's no separate statewide business license layered on top.",
      training: [LEARN_ON_JOB("Plumbing contractors")],
      payNote: "BLS counts plumbers, pipefitters and steamfitters as one occupation, so these pay and job numbers include pipefitters and sprinkler fitters.",
    }),
    t("painter", {
      outlook: ol([21730, 21680, 0, 1660]),
      stateLicense: "contractor",
      licenseSummary: hicSummary("painter"),
      licenseAgency: NY_HIC,
      businessNote: hicBusinessNote,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([10210, 9690, -5, 610]),
      stateLicense: "contractor",
      licenseSummary: hicSummary("concrete finisher") + " It's one of the faster-declining trades on this page.",
      licenseAgency: NY_HIC,
      businessNote: hicBusinessNote,
      training: [LEARN_ON_JOB("Concrete contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([4050, 4020, -1, 280]),
      stateLicense: "contractor",
      licenseSummary: hicSummary("drywall installer"),
      licenseAgency: NY_HIC,
      businessNote: hicBusinessNote,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([3700, 3600, -3, 270]),
      stateLicense: "worker-certification",
      licenseSummary:
        "New York has licensed elevator mechanics statewide since 2022, under the state's Elevator Safety Act (Labor Law Article 33): a single Elevator Mechanic License from the state Dept. of Labor, with separate licenses for elevator inspectors and businesses. Anyone working inside New York City also needs a second, city-level Elevator Agency Technician License layered on top of the state one.",
      licenseSteps: [
        { title: "NYS Elevator Mechanic License", detail: "Required statewide to engage in elevator and conveyance design, construction, installation, maintenance, alteration, service or repair work, or to call yourself an elevator mechanic." },
        { title: "NYC Elevator Agency Technician License (NYC only)", detail: "An additional city-level license required on top of the state one for anyone performing elevator work inside the five boroughs." },
      ],
      licenseAgency: NY_ELEVATOR,
      training: [NEIEP],
    }),
    t("flooring-installer", {
      outlook: ol([1260, 1310, 4, 90]),
      stateLicense: "contractor",
      licenseSummary: hicSummary("flooring installer"),
      licenseAgency: NY_HIC,
      businessNote: hicBusinessNote,
      training: [LEARN_ON_JOB("Flooring contractors")],
      payNote: "BLS counts this group as floor layers except carpet, wood and tile, so some flooring workers fall in other categories.",
    }),
    t("glazier", {
      outlook: ol([2830, 2730, -3, 210]),
      stateLicense: "none",
      licenseSummary: nyNoLicense("glaziers") + " Commercial storefront and curtain-wall work usually goes to established firms regardless.",
      licenseAgency: NY_NO_LICENSE,
      training: [GLAZIERS_FTI],
    }),
    t("insulation-installer", {
      outlook: ol([1960, 1890, -3, 150]),
      stateLicense: "contractor",
      licenseSummary: hicSummary("insulation installer"),
      licenseAgency: NY_HIC,
      businessNote: hicBusinessNote,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([3270, 3170, -3, 240]),
      stateLicense: "none",
      licenseSummary: nyNoLicense("ironworkers") + " This is mostly commercial and industrial work, outside the Home Improvement Contractor system's residential-only scope.",
      licenseAgency: NY_NO_LICENSE,
      training: [national("Ironworkers union apprenticeship", "iron-workers-apprenticeship", "Structural and ornamental ironworker apprenticeships.")],
    }),
    t("mason", {
      outlook: ol([3420, 3370, -2, 240]),
      stateLicense: "contractor",
      licenseSummary: hicSummary("mason"),
      licenseAgency: NY_HIC,
      businessNote: hicBusinessNote,
      training: [LEARN_ON_JOB("Masonry contractors")],
    }),
    t("millwright", {
      outlook: ol([1020, 930, -8, 80]),
      stateLicense: "none",
      licenseSummary: nyNoLicense("millwrights") + " This is industrial work, outside the Home Improvement Contractor system's residential-only scope. It's the sharpest-declining trade on this page.",
      licenseAgency: NY_NO_LICENSE,
      training: [MILLWRIGHT_NASCTF],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary:
        "Industrial and process pipefitting has no New York license of its own, statewide or local. Where piping work falls within a locality's own plumbing code definition, such as gas piping in New York City, it's covered by that area's locally licensed plumber instead.",
      licenseAgency: NY_PLUMBING,
      training: [LEARN_ON_JOB("Industrial and mechanical contractors")],
      payNote: "New York's BLS projection groups pipefitters with plumbers and sprinkler fitters, so there's no separate pipefitter-only figure.",
    }),
    t("plasterer-stucco-mason", {
      outlook: ol([1030, 1030, -1, 80]),
      stateLicense: "contractor",
      licenseSummary: hicSummary("plasterer or stucco mason") + " It's one of the smallest trades on this page.",
      licenseAgency: NY_HIC,
      businessNote: hicBusinessNote,
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([6130, 6170, 1, 420]),
      stateLicense: "contractor",
      licenseSummary: hicSummary("roofer"),
      licenseAgency: NY_HIC,
      businessNote: hicBusinessNote,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([6640, 6250, -6, 480]),
      stateLicense: "none",
      licenseSummary: nyNoLicense("sheet metal workers") + " This is mostly commercial and industrial ductwork, outside the Home Improvement Contractor system's residential-only scope.",
      licenseAgency: NY_NO_LICENSE,
      training: [national("Sheet Metal Workers (SMART) apprenticeship", "smart-sheet-metal-apprenticeship", "Sheet metal worker apprenticeships.")],
    }),
    t("solar-installer", {
      stateLicense: "none",
      licenseSummary:
        "New York has no license specifically for solar installers. Where a jurisdiction licenses electricians, such as New York City, electrical work on a solar system needs that area's locally licensed electrician; NYSERDA's NY-Sun incentive program separately requires a contractor's crew to include someone with NABCEP certification or equivalent IBEW-NECA training to qualify for its eligible-installer list, but that's a program requirement for rebates, not a legal license. New York publishes no state-specific growth projection for this trade; nationally it's growing 37%, by far the fastest of any trade on this page.",
      licenseAgency: NY_SOLAR,
      training: [LEARN_ON_JOB("Solar installation contractors")],
    }),
    t("sprinkler-fitter", {
      stateLicense: "none",
      licenseSummary:
        "New York has no statewide fire sprinkler fitter license; a bill to create one (Article 40-A of the General Business Law) has been introduced in nearly every legislative session since at least 2017 and has never passed. New York City licenses this work locally instead, through a Master Fire Suppression Piping Contractor License overseen by the same board that licenses master plumbers. Most other counties, towns and cities have no fire sprinkler license of their own either.",
      licenseSteps: [
        { title: "No statewide fitter license", detail: "A repeatedly-proposed statewide sprinkler fitter license has not passed as of this writing." },
        { title: "NYC Master Fire Suppression Piping Contractor License (NYC only)", detail: "Several years of fire suppression piping experience (at least 1 in New York City), then a written exam administered by the Dept. of Buildings." },
      ],
      licenseAgency: NY_FIRE_SUPPRESSION,
      training: [UA_669],
      payNote: "New York's BLS projection groups sprinkler fitters with plumbers and pipefitters, so there's no separate sprinkler-fitter-only figure.",
      businessNote: "Opening a fire-sprinkler business in New York City takes a Master Fire Suppression Piping Contractor license; most other parts of the state have no comparable license at all.",
    }),
    t("tile-setter", {
      outlook: ol([3890, 3960, 2, 270]),
      stateLicense: "contractor",
      licenseSummary: hicSummary("tile setter"),
      licenseAgency: NY_HIC,
      businessNote: hicBusinessNote,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "contractor",
      licenseSummary: hicSummary("waterproofing installer"),
      licenseAgency: NY_HIC,
      businessNote: hicBusinessNote,
      payNote: "Waterproofing has no distinct federal job category, so no state-specific job count exists for it in New York or anywhere else on this site.",
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Pathways in Technology Early College High School (P-TECH)",
      detail: "A free, six-year public high school model (grades 9 to 14) that leads to a tuition-free Associate degree from a SUNY or CUNY community college alongside a high school diploma; several partnerships, including one launched with the Building Trades Employers' Association of New York City, focus specifically on construction, civil engineering and architectural technology.",
      source: NY_PTECH,
    },
  ],
  adults: [
    {
      title: "Registered Apprenticeship",
      detail: "The New York State Dept. of Labor registers apprenticeship programs under Labor Law Article 23; apprentices earn wages from day one and a nationally recognized certificate from the state at completion.",
      source: NY_APPRENTICESHIP,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, New York statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "New York long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2061.00?st=NY" },
    NY_ELECTRICAL,
    NY_PLUMBING,
    NY_FIRE_SUPPRESSION,
    NY_SPRINKLER_BILL,
    NY_ELEVATOR,
    NY_ELEVATOR_NYC,
    NY_CRANE,
    NY_CRANE_NYC,
    NY_HIC,
    NY_SOLAR,
    NY_APPRENTICESHIP,
    NY_PTECH,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
