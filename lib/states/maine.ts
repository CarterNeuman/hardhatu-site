// Maine state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Maine-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Maine";

const ME_ELECTRICAL: SourceRef = { label: "Maine Electricians' Examining Board (32 M.R.S. §1202-B)", url: "https://www.maine.gov/pfr/professionallicensing/professions/electricians" };
const ME_PLUMBING: SourceRef = { label: "Maine Plumbers' Examining Board, individual licenses", url: "https://www.maine.gov/pfr/professionallicensing/professions/plumbers-examining-board/licensing/individual-licenses" };
const ME_FUEL_BOARD: SourceRef = { label: "Maine Fuel Board, individual licenses (32 M.R.S. Ch. 139)", url: "https://www1.maine.gov/pfr/professionallicensing/professions/maine-fuel-board/licensing/individual-licenses" };
const ME_ELEVATOR: SourceRef = { label: "Maine Elevator and Tramway Safety Program (32 M.R.S. §15213-§15214)", url: "https://www.maine.gov/pfr/professionallicensing/professions/elevator-tramway-safety-program/licensing/elevator-mechanic-lift-mechanic" };
const ME_FIRE_MARSHAL: SourceRef = { label: "Maine State Fire Marshal's Office, fire sprinkler contractor licensing (32 M.R.S. Ch. 20)", url: "https://www.maine.gov/dps/fmo/sprinklers/licenses" };
const ME_NO_LICENSE: SourceRef = { label: "Maine Office of Professional and Occupational Regulation, full list of licensed professions", url: "https://www.maine.gov/pfr/professionallicensing/professions" };
const ME_FREE_COLLEGE: SourceRef = { label: "Maine Free College Scholarship", url: "https://www.mccs.me.edu/about/news-media/news-item/after-uncertainty-maines-free-college-program-is-here-to-stay/" };
const ME_APPRENTICESHIP: SourceRef = { label: "Maine Apprenticeship Program, Dept. of Labor", url: "https://apprenticeship.maine.gov/" };

const IBEW_567: TrainingOption = {
  name: "IBEW Local 567 (Portland Electrical JATC)",
  kind: "union",
  where: "Lewiston, serving the Portland area",
  detail: "A paid union electrical apprenticeship.",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const IBEW_1253: TrainingOption = {
  name: "IBEW Local 1253 (Augusta Electrical JATC)",
  kind: "union",
  where: "Newport",
  detail: "A paid union electrical apprenticeship.",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const UA_716: TrainingOption = {
  name: "Plumbers & Pipefitters UA Local 716",
  kind: "union",
  where: "Statewide, with instructors at Southern Maine Community College and the University of Maine",
  detail: "A paid union apprenticeship for plumbers, pipefitters and HVAC/heat-pump installers, formed when Bangor, Lewiston and Portland's regional locals merged.",
  programSlug: "ua-plumber-pipefitter-apprenticeship",
};
const NASCTF_ME: TrainingOption = {
  name: "North Atlantic States Carpenters Training Fund",
  kind: "union",
  where: "Statewide",
  detail: "A paid union apprenticeship for carpenters and floor layers.",
};
const ABC_MAINE: TrainingOption = {
  name: "Associated Builders and Contractors of Maine",
  kind: "open-shop",
  where: "Statewide",
  detail: "A merit-shop apprenticeship program covering several trades.",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const meNoLicense = (what: string) => `Maine has no state license for ${what}.`;

export const MAINE: StateGuide = {
  // Maine ZIP codes run 039xx-049xx.
  locationHints: { zip3: [[39, 49]], cities: ["Portland", "Lewiston", "Bangor", "South Portland", "Auburn", "Augusta"] },
  slug: "maine",
  code: "ME",
  name: S,
  lastVerified: "2026-11-22",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Maine long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=ME",
  },
  intro:
    "A field guide to 25 construction trades in Maine: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "Maine licenses far fewer trades than most states: only electricians, plumbers, oil/solid-fuel and gas heating technicians, and elevator mechanics have an individual state license, through four separate boards under the Office of Professional and Occupational Regulation.",
    "Maine has no general contractor license and no contractor registration law. The Home Construction Contracts Act requires a written contract with specific disclosures on jobs over $3,000, but it's a consumer-protection law, not a license.",
    "Both electricians and plumbers have a genuine journeyman-and-master ladder, which is less common among the other New England states built so far.",
    "Fire sprinkler work is licensed at the business level only, built around one state-certified Responsible Managing Supervisor per contractor, not an individual worker-held license.",
    "Flooring installers (8%) and painters, welders and plumbers (all around 1%) show modest growth; concrete finishers, masons and millwrights are the trades with the sharpest projected declines.",
  ],
  costMarker: { label: "Maine Free College", value: "$0", note: "Made permanent in 2026: full tuition at any of Maine's seven community colleges, including construction, welding and electrical trade programs" },
  licensingOverview:
    "Maine's Office of Professional and Occupational Regulation licenses construction trades through four separate boards, and nothing else. The Electricians' Examining Board licenses electricians on a real journeyman-and-master ladder (Helper and Apprentice, then Journeyman-in-Training, then Journeyman, then Master), plus narrower Limited licenses for specific scopes like refrigeration wiring, house wiring and outdoor signs. The Plumbers' Examining Board licenses plumbers on a similar Trainee/Journeyman-in-Training/Journeyman/Master ladder, but its license covers plumbing and drainage installation only; it does not mention pipefitting. The Maine Fuel Board licenses oil, solid-fuel, propane and natural-gas heating technicians (also Apprentice/Journeyman/Master), which is where most fuel-burning heating and boiler work falls; straight air-conditioning and refrigeration wiring instead falls under the Electricians' Board's Limited Refrigeration license. The Elevator and Tramway Safety Program licenses elevator and lift mechanics as a single credential, not a journeyman/master ladder. Fire sprinkler work is licensed at the business level by the State Fire Marshal's Office, built around a certified Responsible Managing Supervisor rather than an individual fitter license. No other trade on this page has a Maine state license, and Maine has no general contractor license of any kind.",
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
      "With no general contractor license and no contractor registration law, Maine has one of the lower regulatory barriers to running a construction business outside the licensed trades.",
      "A Master-level license (electrician, plumber, oil/fuel technician) already qualifies someone to run their own shop, with no separate business-level credential layered on top.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Maine is a small, seasonal market, so steady year-round work can mean building relationships well beyond one town.",
    ],
    path:
      "The usual route: work for someone else for years, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      ME_NO_LICENSE,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([4740, 4750, 0, 370]),
      stateLicense: "none",
      licenseSummary: meNoLicense("construction laborers"),
      licenseAgency: ME_NO_LICENSE,
      training: [ABC_MAINE, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([3700, 3840, 4, 340]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Maine licenses electricians on a genuine journeyman-and-master ladder, with narrower Limited licenses (house wiring, refrigeration, outdoor signs, gasoline dispensing, low-energy/fire alarm, crane wiring) for specific scopes.",
      licenseSteps: [
        { title: "Helper or Apprentice", detail: "No fixed hour minimum to start; a Helper works under a supervising master or company, an Apprentice must be enrolled in a registered apprenticeship program." },
        { title: "Journeyman-in-Training", detail: "Graduation from an accredited Maine community college or Dept. of Corrections electrical program, plus 2,000 hours of licensed electrical installation experience, then a passing exam score." },
        { title: "Journeyman", detail: "8,000 hours as a licensed apprentice or helper, plus a 45-hour National Electrical Code course within the prior 2 years, then an exam." },
        { title: "Master", detail: "4,000 hours as a journeyman, or 12,000 hours of electrical installation experience as a helper/apprentice, plus the 45-hour NEC course, then an exam." },
      ],
      licenseAgency: ME_ELECTRICAL,
      training: [IBEW_567, IBEW_1253],
    }),
    t("equipment-operator", {
      outlook: ol([2030, 1950, -4, 150]),
      stateLicense: "none",
      licenseSummary: meNoLicense("heavy equipment operators"),
      licenseAgency: ME_NO_LICENSE,
      training: [national("Operating Engineers union (IUOE) apprenticeship", "iuoe-equipment-operator-apprenticeship", "A national operating-engineers union with locals in many states.")],
    }),
    t("welder", {
      outlook: ol([2110, 2130, 1, 210]),
      stateLicense: "none",
      licenseSummary: meNoLicense("general construction/structural welders"),
      licenseAgency: ME_NO_LICENSE,
      training: [LEARN_ON_JOB("Welding shops, fabricators and shipyards (Bath Iron Works, Portsmouth Naval Shipyard)")],
    }),
    t("hvac-technician", {
      outlook: ol([2270, 2300, 2, 190]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Maine splits HVAC licensing by both equipment type and fuel. The Fuel Board runs a full Apprentice/Journeyman/Master ladder for oil and solid-fuel heating technicians, but only a single Helper-to-Technician credential (no journeyman or master tier) for propane and natural-gas technicians. Straight refrigeration and air-conditioning wiring instead falls under the Electricians' Board's Limited Refrigeration license.",
      licenseSteps: [
        { title: "Apprentice Oil Burner/Solid Fuel Technician", detail: "Work under a licensed journeyman or master while training." },
        { title: "Journeyman (oil/solid-fuel only)", detail: "Qualifying apprenticeship experience, then an exam." },
        { title: "Master (oil/solid-fuel only)", detail: "Further qualifying experience as a journeyman, then an exam." },
        { title: "Helper, then Technician (propane/natural gas)", detail: "Propane and natural-gas work runs a separate, shorter ladder: a Helper credential while training, then a Technician license, with no journeyman or master tier." },
        { title: "Limited Refrigeration Electrician (for AC/refrigeration wiring specifically)", detail: "315 hours of electrical education (seven 45-hour courses) and 6,000 hours of experience, at least 3,000 of which must be in refrigeration installations (or an accredited refrigeration-electrical program with 6,000 hours, 4,000 credited on graduation), then a 45-hour NEC course and an exam through the Electricians' Board." },
      ],
      licenseAgency: ME_FUEL_BOARD,
      training: [UA_716],
    }),
    t("carpenter", {
      outlook: ol([7290, 7210, -1, 510]),
      stateLicense: "none",
      licenseSummary: meNoLicense("carpenters") + " Maine's Home Construction Contracts Act requires a written, disclosure-heavy contract on residential jobs over $3,000, but it's a consumer-protection law, not a license or registration. It's the largest trade on this page.",
      licenseAgency: ME_NO_LICENSE,
      training: [NASCTF_ME, ABC_MAINE],
    }),
    t("plumber", {
      outlook: ol([2740, 2760, 1, 220]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Maine's Plumbers' Examining Board licenses a genuine journeyman-and-master ladder. The license covers plumbing and drainage installation and repair; pipefitting isn't mentioned in the license's scope and has no Maine license of its own.",
      licenseSteps: [
        { title: "Trainee Plumber", detail: "Assists under the direct supervision of a licensed master." },
        { title: "Journeyman-in-Training", detail: "A board-approved plumbing course (1 year at a community college, or a 2-year CTE/registered apprenticeship), then an exam at 70% or better." },
        { title: "Journeyman Plumber", detail: "2 years (4,000 hours) as a trainee under a master, or 2,000 hours as a journeyman-in-training within 4 years of that license's issue." },
        { title: "Master Plumber", detail: "1 year (2,000 hours) as a journeyman, or 4 years (8,000 hours) as a trainee under a master." },
      ],
      licenseAgency: ME_PLUMBING,
      training: [UA_716],
      businessNote: "A Maine plumbing business operates under a Master Plumber; there's no separate business-level license layered on top of the Master credential itself.",
    }),
    t("painter", {
      outlook: ol([3250, 3300, 1, 260]),
      stateLicense: "none",
      licenseSummary: meNoLicense("painters"),
      licenseAgency: ME_NO_LICENSE,
      training: [national("Finishing Trades Institute of New England", "finishing-trades-institute-apprenticeship", "A regional union apprenticeship for painters and other finishing trades.")],
    }),
    t("concrete-worker", {
      outlook: ol([460, 440, -6, 30]),
      stateLicense: "none",
      licenseSummary: meNoLicense("concrete finishers") + " It's one of several trades with a projected decline in Maine.",
      licenseAgency: ME_NO_LICENSE,
      training: [LEARN_ON_JOB("Concrete contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([420, 420, 1, 30]),
      stateLicense: "none",
      licenseSummary: meNoLicense("drywall installers"),
      licenseAgency: ME_NO_LICENSE,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([130, 130, 2, 10]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Maine individually licenses elevator and lift mechanics through the Elevator and Tramway Safety Program; the license is a single credential, not a journeyman/master ladder.",
      licenseSteps: [
        { title: "Elevator/Lift Mechanic", detail: "At least 2 years of documented experience servicing, repairing, altering or installing elevators or lifts while employed by an elevator company (or equivalent experience the Board accepts), plus meeting the Board's other requirements." },
      ],
      licenseAgency: ME_ELEVATOR,
      training: [national("Elevator Constructors union (IUEC) through NEIEP", "neiep-elevator-constructor-apprenticeship", "Union apprenticeship run through the National Elevator Industry Educational Program.")],
    }),
    t("flooring-installer", {
      outlook: ol([100, 110, 8, 10]),
      stateLicense: "none",
      licenseSummary: meNoLicense("flooring installers") + " It's the fastest-growing trade with Maine-specific projections on this page.",
      licenseAgency: ME_NO_LICENSE,
      training: [NASCTF_ME],
    }),
    t("glazier", {
      outlook: ol([100, 90, -6, 10]),
      stateLicense: "none",
      licenseSummary: meNoLicense("glaziers") + " It's one of the smallest trades on this page.",
      licenseAgency: ME_NO_LICENSE,
      training: [LEARN_ON_JOB("Glazing contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([380, 390, 1, 30]),
      stateLicense: "none",
      licenseSummary: meNoLicense("insulation installers"),
      licenseAgency: ME_NO_LICENSE,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([800, 790, -2, 60]),
      stateLicense: "none",
      licenseSummary: meNoLicense("ironworkers"),
      licenseAgency: ME_NO_LICENSE,
      training: [national("Ironworkers union apprenticeship", "iron-workers-apprenticeship", "A national ironworkers union with locals in many states.")],
    }),
    t("mason", {
      outlook: ol([260, 240, -9, 20]),
      stateLicense: "none",
      licenseSummary: meNoLicense("masons") + " It's one of the sharpest-declining trades with Maine-specific projections on this page.",
      licenseAgency: ME_NO_LICENSE,
      training: [LEARN_ON_JOB("Masonry contractors")],
    }),
    t("millwright", {
      outlook: ol([330, 290, -13, 20]),
      stateLicense: "none",
      licenseSummary: meNoLicense("millwrights") + " It's the sharpest-declining trade with Maine-specific projections on this page.",
      licenseAgency: ME_NO_LICENSE,
      training: [LEARN_ON_JOB("Industrial millwright shops and mills")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary:
        meNoLicense("pipefitters") + " Maine's plumbing license covers plumbing and drainage installation and repair only, with no mention of pipefitting, so pipefitters train through union apprenticeship and employer programs rather than a state license.",
      licenseAgency: ME_PLUMBING,
      training: [UA_716],
      payNote: "Maine's BLS projection groups pipefitters with plumbers and sprinkler fitters, so there's no separate pipefitter-only figure.",
    }),
    t("plasterer-stucco-mason", {
      stateLicense: "none",
      licenseSummary: meNoLicense("plasterers or stucco masons") + " It's one of the smallest trades on this page, with no Maine-specific pay or job data published.",
      licenseAgency: ME_NO_LICENSE,
      payNote: "Maine publishes no pay or job projection for this small trade, so this page shows the national figures.",
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([770, 700, -9, 40]),
      stateLicense: "none",
      licenseSummary: meNoLicense("roofers") + " It's one of the sharpest-declining trades with Maine-specific projections on this page.",
      licenseAgency: ME_NO_LICENSE,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([950, 950, -1, 80]),
      stateLicense: "none",
      licenseSummary: meNoLicense("sheet metal workers"),
      licenseAgency: ME_NO_LICENSE,
      training: [national("Sheet Metal Workers union (SMART) apprenticeship", "smart-sheet-metal-apprenticeship", "A national sheet-metal-workers union with locals in many states.")],
    }),
    t("solar-installer", {
      stateLicense: "none",
      licenseSummary:
        meNoLicense("solar installers") + " Connecting panels to a building's wiring is electrical work, so it generally falls under a Maine electrician's license; several Maine solar companies sponsor their installers through electrician apprenticeships rather than a separate solar credential.",
      licenseAgency: ME_ELECTRICAL,
      payNote: "Maine publishes pay data for this trade but no state-specific job-growth projection, so the growth figure shown here is national.",
      training: [LEARN_ON_JOB("Solar installation contractors")],
    }),
    t("sprinkler-fitter", {
      stateLicense: "contractor",
      licenseSummary:
        "Maine licenses fire sprinkler work at the business level, through the State Fire Marshal's Office: a contractor license requires at least one certified Responsible Managing Supervisor (NICET Level III, or a Maine-licensed engineer with 5 years in fire protection). There's no standalone individual journeyman/apprentice sprinkler-fitter license; rank-and-file fitters work under the contractor's certified supervisor.",
      licenseSteps: [
        { title: "No individual fitter license", detail: "Maine has no standalone journeyman/apprentice license for fire sprinkler fitters; rank-and-file fitters work under the contractor's certified supervisor." },
        { title: "Business-level contractor license", detail: "A fire sprinkler contractor license requires at least one Responsible Managing Supervisor certified at NICET Level III, or a Maine-licensed engineer with 5 years in fire protection." },
      ],
      licenseAgency: ME_FIRE_MARSHAL,
      training: [national("Sprinkler Fitters union (UA Local 669)", "ua-sprinkler-fitter-apprenticeship", "A national sprinkler fitter union that hires through contractors in many states.")],
      payNote: "Maine's BLS projection groups sprinkler fitters with plumbers and pipefitters, so there's no separate sprinkler-fitter-only figure.",
      businessNote: "Opening a Maine fire-sprinkler business takes a contractor license from the State Fire Marshal's Office, built around at least one certified Responsible Managing Supervisor.",
    }),
    t("tile-setter", {
      stateLicense: "none",
      licenseSummary: meNoLicense("tile setters") + " It's one of the smallest trades on this page, with no Maine-specific job-growth projection published.",
      licenseAgency: ME_NO_LICENSE,
      payNote: "Maine publishes pay data for this trade but no state-specific job-growth projection, so the growth figure shown here is national.",
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: meNoLicense("waterproofing installers"),
      licenseAgency: ME_NO_LICENSE,
      payNote: "Waterproofing has no distinct federal job category, so no state-specific job count exists for it in Maine or anywhere else on this site.",
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Maine Community College System Career & Technical Education",
      detail: "Programs at Maine's seven community colleges — welding, residential electrician, heat pump installation, EV technician and high-pressure boiler operation among them — many including a paid apprenticeship component through the Harold Alfond Center for Workforce Development.",
      source: { label: "MCCS Harold Alfond Center for Workforce Development, Construction", url: "https://alfondcenter.mccs.me.edu/construction" },
    },
  ],
  adults: [
    {
      title: "Maine Free College",
      detail: "Made permanent in 2026 after starting as a pandemic-era program: covers full tuition (not fees) at any of Maine's seven community colleges, including construction, welding and electrical trade programs. Requires 1 year of Maine residency and gives students 3 years to finish; more than 23,000 students have enrolled so far.",
      source: ME_FREE_COLLEGE,
    },
    {
      title: "Maine Apprenticeship Program",
      detail: "The state's Dept. of Labor registers and supports apprenticeships across the construction trades; apprentices earn wages from day one.",
      source: ME_APPRENTICESHIP,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Maine statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Maine long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=ME" },
    ME_ELECTRICAL,
    ME_PLUMBING,
    ME_FUEL_BOARD,
    ME_ELEVATOR,
    ME_FIRE_MARSHAL,
    ME_NO_LICENSE,
    { label: "Maine Home Construction Contracts Act (10 M.R.S. §1487)", url: "https://www.mainelegislature.org/legis/statutes/10/title10sec1487.html" },
    ME_FREE_COLLEGE,
    ME_APPRENTICESHIP,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
