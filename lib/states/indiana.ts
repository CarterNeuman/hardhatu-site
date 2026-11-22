// Indiana state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Indiana-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Indiana";

const IPLA_PLUMBING: SourceRef = { label: "Indiana PLA, plumbing licensing (IC Art. 25-28.5)", url: "https://www.in.gov/pla/professions/plumbing-home/plumbing-licensing-information/" };
const IN_DHS_ELEVATOR: SourceRef = { label: "Indiana DHS, elevator mechanic and contractor licensing (675 IAC 12-3-15)", url: "https://secure.in.gov/dhs/fire-and-building-safety/elevators-and-amusement-rides/elevator-fees" };
const IN_NO_LICENSE: SourceRef = { label: "Indiana has no statewide license for most construction trades; the Professional Licensing Agency's profession list doesn't include them", url: "https://secure.in.gov/pla/professions" };
const WORKFORCE_READY: SourceRef = { label: "Indiana Workforce Ready Grant", url: "https://www.in.gov/dwd/workforce-ready-grant/workforce-ready-grant/" };
const APPRENTICESHIP_IN: SourceRef = { label: "Indiana DWD, Apprenticeship Indiana", url: "https://www.in.gov/dwd/apprenticeship-indiana/about" };

const IVY_TECH_CONSTRUCTION: TrainingOption = {
  name: "Ivy Tech Community College, Construction Technology and Building Construction Management",
  kind: "college",
  where: "Campuses statewide",
  detail: "Indiana's statewide community college system runs construction-trades programs at most of its campuses, with dual-credit options for high schoolers.",
  url: "https://www.ivytech.edu/construction-technology/index.html",
};
const IVY_TECH_HVAC: TrainingOption = {
  name: "Ivy Tech Community College, HVAC",
  kind: "college",
  where: "Campuses statewide",
  detail: "Statewide HVAC program leading toward industry certifications.",
  url: "https://www.ivytech.edu/hvac/index.html",
};
const UA_440: TrainingOption = {
  name: "Indianapolis Plumbers & Steamfitters JATC (UA Local 440)",
  kind: "union",
  where: "Indianapolis",
  detail: "A paid union apprenticeship for plumbers and pipefitters in the Indianapolis area.",
  url: "https://www.ualocal440.org/Home/",
  programSlug: "ua-plumber-pipefitter-apprenticeship",
};
const IBEW_481: TrainingOption = {
  name: "IBEW Local 481 electrical apprenticeship",
  kind: "union",
  where: "Indianapolis",
  detail: "A paid union electrical apprenticeship delivered through the Electrical Training ALLIANCE, the national IBEW/NECA training body.",
  url: "https://electricaltrainingalliance.org/training/apprenticeshipTraining",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const ABC_INDIANA_KENTUCKY: TrainingOption = {
  name: "ABC Indiana/Kentucky craft training",
  kind: "open-shop",
  where: "Statewide, including a new Construction Prep Academy in Lebanon",
  detail: "Open-shop craft training and apprenticeship programs through the Associated Builders and Contractors Indiana/Kentucky chapter.",
  url: "https://www.abcindianakentucky.org",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noStateLicense = (what: string) =>
  `Indiana has no license for ${what}, and no statewide general contractor license either. Licensing, where it exists at all, happens city by city.`;

export const INDIANA: StateGuide = {
  // Indiana ZIP codes run 460xx-479xx.
  locationHints: { zip3: [[460, 479]], cities: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel", "Bloomington", "Gary", "Lafayette"] },
  slug: "indiana",
  code: "IN",
  name: S,
  lastVerified: "2026-11-21",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Indiana long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=IN",
  },
  intro:
    "A field guide to 25 construction trades in Indiana: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ roughly 152,000 people in Indiana, with construction laborers, carpenters and electricians the three largest.",
    "Indiana has almost no state trade licensing. Plumbers and elevator mechanics are the two clean exceptions; nearly every other trade on this page, including electricians, has no state license at all.",
    "There's no statewide general contractor license. Licensing, where it exists for the other trades, happens city by city, if at all.",
    "Floor layers, tile and stone setters, electricians and HVAC technicians are the fastest-growing trades on this page; millwrights are the only trade not projected to grow at all.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "Workforce Ready Grant", value: "$0", note: "Out-of-pocket cost for HVAC certification at partner training providers, normally $1,500 to $3,000, through Indiana's Workforce Ready Grant" },
  licensingOverview:
    "Indiana has almost no state-level trade licensing. The Plumbing Commission licenses plumbers (apprentice, then journeyman, with a separate Plumbing Contractor business license), and the Department of Homeland Security licenses elevator mechanics and elevator contractors. Electricians have no state license at all, despite handling similarly high-stakes work; licensing, where it exists for electricians or any other trade on this page, is strictly local, city by city. There's no statewide general contractor license either.",
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
      "With almost no state trade licensing and no statewide GC license, Indiana has one of the lowest regulatory barriers to starting a construction business of any state on this site.",
      "A plumbing contractor license, once earned, carries statewide, even though some cities can still require their own local registration.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Low statewide barriers don't mean no local rules; a city or county can still require its own registration, permit or inspection process.",
    ],
    path:
      "The usual route: work for someone else for years, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      IPLA_PLUMBING,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([33940, 36710, 8, 3060]),
      stateLicense: "none",
      licenseSummary: "Indiana has no license for construction laborers. It is by far the largest trade on this page.",
      licenseAgency: IN_NO_LICENSE,
      training: [ABC_INDIANA_KENTUCKY, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([18090, 19860, 10, 1800]),
      stateLicense: "none",
      licenseSummary: "Indiana has no state license for electricians at all, despite the high-stakes nature of the work. Licensing, where it exists, is set by individual cities and counties rather than by the state.",
      licenseSteps: [
        { title: "No state license", detail: "Indiana has no state license for electricians at all." },
        { title: "Local license (where it exists)", detail: "Set by individual cities and counties rather than by the state." },
      ],
      licenseAgency: IN_NO_LICENSE,
      training: [IBEW_481],
    }),
    t("equipment-operator", {
      outlook: ol([11560, 11940, 3, 980]),
      stateLicense: "none",
      licenseSummary: "Indiana has no state license for equipment operators. Employers look for training records and safe hours in the seat, and crane operators need national certification under federal OSHA rules.",
      licenseAgency: IN_NO_LICENSE,
      training: [national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([13820, 14140, 2, 1380]),
      stateLicense: "none",
      licenseSummary: "Indiana has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS). This outlook figure covers welders across all industries, not just construction, so Indiana's manufacturing base likely accounts for a large share of it.",
      licenseAgency: IN_NO_LICENSE,
      training: [IVY_TECH_CONSTRUCTION],
    }),
    t("hvac-technician", {
      outlook: ol([8220, 9020, 10, 790]),
      stateLicense: "none",
      licenseSummary: "Indiana has no state license for HVAC technicians. Anyone handling refrigerants still needs the federal EPA Section 608 certification, which applies in every state and isn't an Indiana-specific credential. It's one of the fastest-growing trades on this page.",
      licenseSteps: [
        { title: "No state license", detail: "Indiana has no state license for HVAC technicians." },
        { title: "Federal EPA 608 certification", detail: "Anyone handling refrigerants needs this federal certification, which applies in every state." },
      ],
      licenseAgency: IN_NO_LICENSE,
      training: [IVY_TECH_HVAC],
    }),
    t("carpenter", {
      outlook: ol([19760, 20680, 5, 1530]),
      stateLicense: "none",
      licenseSummary: noStateLicense("carpenters") + " It's the second-largest trade on this page.",
      licenseAgency: IN_NO_LICENSE,
      training: [ABC_INDIANA_KENTUCKY, IVY_TECH_CONSTRUCTION],
    }),
    t("plumber", {
      outlook: ol([12410, 13070, 5, 1100]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Indiana requires plumbers to hold a license from the Plumbing Commission: an apprentice plumber (16+) registers in an approved apprenticeship, then becomes a journeyman plumber after 4 years of apprenticeship training or trade experience plus an exam. A separate Plumbing Contractor license covers anyone running a plumbing business. There's no reciprocity for out-of-state applicants. This outlook figure is a combined BLS category covering plumbers, pipefitters and steamfitters together, so it isn't just plumbers.",
      licenseSteps: [
        { title: "Apprentice plumber", detail: "At least 17, enrolled in an approved apprenticeship program." },
        { title: "Journeyman plumber", detail: "4 years of apprenticeship training or trade experience, then an exam." },
        { title: "Plumbing contractor", detail: "A separate license for anyone running a plumbing business, same 4-year standard plus an exam." },
      ],
      licenseAgency: IPLA_PLUMBING,
      extraCredentials: ["Indiana journeyman plumber license"],
      training: [UA_440, IVY_TECH_CONSTRUCTION],
      payNote: "Indiana's BLS projection groups plumbers with pipefitters and steamfitters, so this figure isn't plumbers alone.",
      businessNote: "Running a plumbing business takes the separate Plumbing Contractor license on top of the journeyman credential.",
    }),
    t("painter", {
      outlook: ol([5470, 5720, 5, 460]),
      stateLicense: "none",
      licenseSummary: noStateLicense("painters"),
      licenseAgency: IN_NO_LICENSE,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([4710, 4840, 3, 330]),
      stateLicense: "none",
      licenseSummary: noStateLicense("concrete finishers"),
      licenseAgency: IN_NO_LICENSE,
      training: [LEARN_ON_JOB("Concrete and site contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([980, 1030, 5, 80]),
      stateLicense: "none",
      licenseSummary: noStateLicense("drywall installers"),
      licenseAgency: IN_NO_LICENSE,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      stateLicense: "worker-certification",
      licenseSummary:
        "Indiana requires elevator mechanics to hold a license from the Department of Homeland Security's Fire Prevention and Building Safety Commission, along with an elevator contractor business license. Fees are set by rule: $100 for the mechanic license, $500 for the contractor license.",
      licenseAgency: IN_DHS_ELEVATOR,
      extraCredentials: ["Indiana elevator mechanic license"],
      training: [national("Elevator Constructors union (IUEC) training", "neiep-elevator-constructor-apprenticeship", "Union elevator apprenticeship through the National Elevator Industry Educational Program.")],
      ownBusiness: "Elevator work takes specialized tools, insurance and manufacturer relationships, so most mechanics work for established companies.",
      payNote: "Indiana has no state-specific job-outlook figure for elevator technicians; only national data is published for this trade here.",
    }),
    t("flooring-installer", {
      outlook: ol([990, 1110, 12, 80]),
      stateLicense: "none",
      licenseSummary: noStateLicense("flooring installers") + " It's the fastest-growing trade on this page.",
      licenseAgency: IN_NO_LICENSE,
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([1140, 1190, 4, 100]),
      stateLicense: "none",
      licenseSummary: noStateLicense("glaziers"),
      licenseAgency: IN_NO_LICENSE,
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([880, 920, 5, 80]),
      stateLicense: "none",
      licenseSummary: noStateLicense("insulation installers"),
      licenseAgency: IN_NO_LICENSE,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([2570, 2700, 5, 220]),
      stateLicense: "none",
      licenseSummary: noStateLicense("ironworkers"),
      licenseAgency: IN_NO_LICENSE,
      ownBusiness: "Steel erection companies need heavy equipment and big insurance policies, so most ironworkers work for established firms.",
      training: [national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork.")],
    }),
    t("mason", {
      outlook: ol([2440, 2500, 3, 180]),
      stateLicense: "none",
      licenseSummary: noStateLicense("masons"),
      licenseAgency: IN_NO_LICENSE,
      training: [LEARN_ON_JOB("Masonry contractors"), national("Bricklayers union (BAC)", "bac-bricklayer-apprenticeship", "Union apprenticeships for brick, block and stone masons.")],
    }),
    t("millwright", {
      outlook: ol([1900, 1890, 0, 170]),
      stateLicense: "none",
      licenseSummary: "Indiana has no state license for millwrights. It's the only trade on this page not projected to grow at all over the next decade.",
      licenseAgency: IN_NO_LICENSE,
      training: [national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary: "Indiana's plumbing statute licenses \"plumbing contractor\" and \"journeyman plumber\" specifically; it isn't clear whether that requirement extends to a pipefitter who doesn't also do plumbing work, so this trade is treated as having no confirmed state license of its own.",
      licenseAgency: IPLA_PLUMBING,
      ownBusiness: "Piping contractors need crews, insurance and often a licensed plumber on staff for connected plumbing work.",
      training: [UA_440, national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Paid union apprenticeships in pipefitting.")],
      payNote: "Indiana's BLS projection groups pipefitters with plumbers and steamfitters, so there's no separate pipefitter-only figure.",
    }),
    t("plasterer-stucco-mason", {
      outlook: ol([180, 190, 6, 20]),
      stateLicense: "none",
      licenseSummary: noStateLicense("plasterers") + " It's the smallest trade on this page by far.",
      licenseAgency: IN_NO_LICENSE,
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([3420, 3650, 7, 260]),
      stateLicense: "none",
      licenseSummary: "No statewide roofing license or registration was found for Indiana. Some states have passed roofing-registration laws in recent years, so it's worth checking current rules before taking on roofing work, but nothing like that currently applies statewide here.",
      licenseAgency: IN_NO_LICENSE,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([3740, 3900, 4, 320]),
      stateLicense: "none",
      licenseSummary: "Indiana has no state license for sheet metal workers.",
      licenseAgency: IN_NO_LICENSE,
      training: [national("Sheet metal apprenticeships (SMART)", "smart-sheet-metal-apprenticeship", "Union sheet metal apprenticeships.")],
    }),
    t("solar-installer", {
      outlook: ol([700, 760, 9, 70]),
      stateLicense: "none",
      licenseSummary: "Indiana has no dedicated solar installer license; the electrical connections on a solar installation fall under whatever electrical licensing applies locally, since there's no statewide electrician license either.",
      licenseAgency: IN_NO_LICENSE,
      training: [IBEW_481],
    }),
    t("sprinkler-fitter", {
      stateLicense: "none",
      licenseSummary: "Indiana's plumbing statute explicitly excludes automatic sprinkler installation from the definition of plumbing, so sprinkler fitters fall outside that license entirely. Sprinkler system design does require either a registered design professional or a NICET-certified designer, but that's a design credential, not a license for the installer or fitter trade itself.",
      licenseSteps: [
        { title: "No installer license", detail: "Indiana's plumbing statute explicitly excludes automatic sprinkler installation from the definition of plumbing, so no installer license covers this trade." },
        { title: "Design credential (different role)", detail: "System design needs a registered design professional or a NICET-certified designer, but that's a credential for the designer, not the installer." },
      ],
      licenseAgency: IN_NO_LICENSE,
      training: [national("Sprinkler Fitters union (UA)", "ua-sprinkler-fitter-apprenticeship", "Five-year registered apprenticeship through a signatory contractor.")],
      payNote: "Sprinkler fitters share Indiana's combined plumber/pipefitter/steamfitter job code, so there's no separate sprinkler-fitter-only figure.",
      ownBusiness: "Opening a sprinkler company in Indiana takes no state license, but commercial work still needs NICET-certified design staff, insurance and signatory status with a union or training program.",
    }),
    t("tile-setter", {
      outlook: ol([760, 830, 10, 60]),
      stateLicense: "none",
      licenseSummary: noStateLicense("tile setters") + " It's one of the fastest-growing trades on this page.",
      licenseAgency: IN_NO_LICENSE,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: noStateLicense("waterproofing installers"),
      licenseAgency: IN_NO_LICENSE,
      payNote: "Waterproofing has no distinct federal job category, so no state-specific job count exists for it in Indiana or anywhere else on this site.",
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Dual credit and CTE pathways",
      detail: "Indiana school corporations run construction-trades CTE programs with Ivy Tech dual-credit arrangements; check with a local career center for the programs available nearby.",
      source: { label: "Indiana Commission for Higher Education, CTE dual-credit guidance", url: "https://www.in.gov/che/cte/" },
    },
  ],
  adults: [
    {
      title: "Workforce Ready Grant",
      detail: "Covers tuition and fees for qualifying certificate programs in five industries including Building & Construction, across more than 150 programs statewide. Eligibility requires Indiana residency, a high school diploma or equivalent, and less than a college degree.",
      source: WORKFORCE_READY,
    },
    {
      title: "Apprenticeship Indiana",
      detail: "The state's hub for connecting employers and workers to registered apprenticeships, run by DWD's Office of Work-Based Learning and Apprenticeships, with recent federal funding to expand apprenticeship capacity statewide.",
      source: APPRENTICESHIP_IN,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Indiana statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Indiana long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=IN" },
    IPLA_PLUMBING,
    IN_DHS_ELEVATOR,
    IN_NO_LICENSE,
    WORKFORCE_READY,
    APPRENTICESHIP_IN,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
