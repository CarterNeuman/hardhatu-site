// Wyoming state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Wyoming-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Wyoming";

const WY_ELECTRICAL: SourceRef = { label: "Wyoming Dept. of Fire Prevention and Electrical Safety, State Electrical Board licensing", url: "https://wsfm.wyo.gov/electrical-safety/licensing" };
const WY_NO_LICENSE: SourceRef = { label: "Harbor Compliance / jaspector.com, Wyoming construction licensing overview", url: "https://www.jaspector.com/contractor-license-requirements/wyoming/" };
const WY_FIRE: SourceRef = { label: "Wyoming Dept. of Fire Prevention and Electrical Safety, fire-protection plan review", url: "https://contractorlicenserequirements.com/wyoming/fire-sprinkler-license-requirements/" };
const WY_HATHAWAY: SourceRef = { label: "University of Wyoming / Wyoming Dept. of Education, Hathaway Scholarship", url: "https://www.uwyo.edu/sfa/scholarships/hathaway/index.html" };

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const wyNoLicense = (what: string) =>
  `Wyoming has no statewide license for ${what}, and no statewide registration either. Electrician is the only trade Wyoming licenses at the state level; everything else, including general contracting, is left entirely to individual cities and counties.`;

export const WYOMING: StateGuide = {
  locationHints: { zip3: [[820, 831]], cities: ["Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs", "Sheridan", "Jackson", "Cody"] },
  slug: "wyoming",
  code: "WY",
  name: S,
  lastVerified: "2026-11-23",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Wyoming long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2061.00?st=WY",
  },
  intro:
    "A field guide to 25 construction trades in Wyoming: what they pay here, which ones need a license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "Wyoming is one of the least-regulated states on this site: electrician is the only trade licensed statewide. Plumbing, HVAC, roofing and general contracting are left entirely to individual cities and counties; elevator work is a partial exception, since the electrical side of it still needs the Electrical Board's own Low Voltage/Limited license.",
    "Tile setter has Wyoming's single highest growth figure on this page: 33%.",
    "The electrical trade itself has real structure: Apprentice, Journeyman, Master and Residential tiers, plus a Low Voltage/Limited tier for narrower work, through the Wyoming State Electrical Board.",
    "An electrical contractor business needs a full-time Wyoming-licensed master electrician on payroll as its master of record, and that master can only serve one company at a time, a real hiring bottleneck in a small state.",
    "With construction employment spread thin across a large, low-population state, several trades here (glazier, ironworker, plasterer-stucco-mason, tile setter) number only in the dozens to low hundreds statewide.",
  ],
  costMarker: { label: "Hathaway Scholarship (Opportunity level)", value: "$1,180/semester", note: "Wyoming high school graduates who complete a CTE pathway and earn an industry-recognized credential, among other paths, qualify for this merit scholarship, usable for up to 4 full-time semesters (48 credits) at any of Wyoming's 7 community colleges toward a trade certificate or associate degree" },
  licensingOverview:
    "Wyoming is one of the most deregulated states in the country for construction: electrician is the only trade licensed statewide, through the Wyoming Dept. of Fire Prevention and Electrical Safety's State Electrical Board, which issues Apprentice, Journeyman, Master and Residential electrician licenses, a Low Voltage/Limited tier for narrower work (including an LM-E tier specifically for the electrical side of elevator systems), and a business-level Electrical Contractor license (which requires a full-time, Wyoming-licensed master electrician as the contractor's master of record, who can serve only one company at a time). Plumbing, HVAC, roofing and general contracting have no statewide license or registration of any kind; licensing for these trades, where it exists at all, is set entirely by individual cities and counties, such as Cheyenne, Casper and Gillette, each with its own contractor licensing board and its own rules. Elevator work is a partial exception: there's no statewide license for the mechanical side of the trade, but electrical connections on the load side of an elevator's equipment disconnect still need the Electrical Board's own Low Voltage/Limited (LM-E) license. Fire sprinkler work is handled the same way: the state's fire-prevention program reviews plans and issues permits for sprinkler installations, but there's no statewide fire-sprinkler contractor trade license, only local requirements.",
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
      "Outside electrical work, Wyoming has no statewide license or registration at all for most trades on this page, by far the lowest regulatory bar of any state on this site.",
      "A small, spread-out population can mean less competition for a shop willing to serve a wide territory.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Local rules vary city by city and county by county, so a shop working across several towns has to track each one separately, even without a state license to worry about.",
    ],
    path:
      "The usual route: work for someone else for years, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      WY_NO_LICENSE,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([4500, 5230, 16, 460]),
      stateLicense: "none",
      licenseSummary: wyNoLicense("construction laborers") + " It's the largest trade on this page.",
      licenseAgency: WY_NO_LICENSE,
      training: [national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([2980, 3640, 22, 350]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Wyoming licenses electricians statewide, the only trade on this page it licenses at all: Apprentice, Journeyman, Master and Residential tiers, plus a Low Voltage/Limited tier for narrower work, through the State Electrical Board.",
      licenseSteps: [
        { title: "Apprentice Electrician", detail: "Registration with the State Electrical Board while working under a licensed electrician; four years (8,000 hours) of documented work experience builds toward a journeyman license." },
        { title: "Journeyman Electrician", detail: "Documented apprenticeship hours and an exam. A journeyman must be employed at all times by a contractor holding a current Wyoming electrical contractor's license." },
        { title: "Master Electrician", detail: "Eight years (16,000 hours) of documented electrical work experience, then a separate exam. A master must likewise be employed by a licensed electrical contractor." },
      ],
      licenseAgency: WY_ELECTRICAL,
      businessNote: "An Electrical Contractor license requires a full-time Wyoming-licensed master electrician as the business's master of record; that master can only be the master of record for one company at a time, a real hiring constraint in a state Wyoming's size.",
      training: [national("IBEW/NECA electrical apprenticeship (JATC)", "ibew-neca-electrical-apprenticeship", "Electrical apprenticeships, confirmed active in Wyoming through the Wyoming JATC (wyojatc.org).")],
    }),
    t("equipment-operator", {
      outlook: ol([3970, 4160, 5, 350]),
      stateLicense: "none",
      licenseSummary: wyNoLicense("equipment operators"),
      licenseAgency: WY_NO_LICENSE,
      training: [national("Operating Engineers (IUOE) apprenticeship", "operating-engineers-apprenticeship", "Heavy equipment operator apprenticeships.")],
    }),
    t("welder", {
      outlook: ol([2020, 2280, 13, 230]),
      stateLicense: "none",
      licenseSummary: wyNoLicense("welders") + " Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      licenseAgency: WY_NO_LICENSE,
      training: [LEARN_ON_JOB("Welding shops and fabricators")],
    }),
    t("hvac-technician", {
      outlook: ol([610, 770, 26, 70]),
      stateLicense: "none",
      licenseSummary:
        "Wyoming has no state-level HVAC license at all. A handful of cities, such as Casper and Gillette, issue their own local HVAC technician or mechanical licenses, but outside those cities there's no license requirement.",
      licenseSteps: [
        { title: "No statewide HVAC license", detail: "Wyoming does not license HVAC technicians or contractors at the state level; some cities and counties license HVAC work locally." },
      ],
      licenseAgency: WY_NO_LICENSE,
      training: [LEARN_ON_JOB("HVAC contractors")],
    }),
    t("carpenter", {
      outlook: ol([3350, 3710, 11, 290]),
      stateLicense: "none",
      licenseSummary: wyNoLicense("carpenters"),
      licenseAgency: WY_NO_LICENSE,
      training: [national("Carpenters union (UBC) apprenticeship", "ubc-carpenters-apprenticeship", "Carpentry apprenticeships.")],
    }),
    t("plumber", {
      outlook: ol([1270, 1520, 20, 140]),
      stateLicense: "none",
      licenseSummary:
        "Wyoming has no state-level plumbing license. Local jurisdictions set their own requirements: Cheyenne, Casper and other cities license plumbers through their own contractor licensing boards, each with its own master-journeyman-apprentice structure, but there's no single statewide credential.",
      licenseSteps: [
        { title: "No statewide plumbing license", detail: "Wyoming does not license plumbers at the state level; cities such as Cheyenne and Casper license plumbing work locally, often with their own master and journeyman tiers." },
      ],
      licenseAgency: WY_NO_LICENSE,
      businessNote: "With no state plumbing license, a plumbing business's requirements come entirely from whichever city or county it works in; some, like Cheyenne, require a locally licensed master plumber on staff.",
      training: [national("UA Plumbers & Pipefitters apprenticeship", "ua-plumber-pipefitter-apprenticeship", "Plumbing and pipefitting apprenticeships.")],
      payNote: "BLS counts plumbers, pipefitters and steamfitters as one occupation, so these pay and job numbers include pipefitters and sprinkler fitters.",
    }),
    t("painter", {
      outlook: ol([820, 960, 17, 80]),
      stateLicense: "none",
      licenseSummary: wyNoLicense("painters"),
      licenseAgency: WY_NO_LICENSE,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([530, 600, 14, 40]),
      stateLicense: "none",
      licenseSummary: wyNoLicense("concrete finishers"),
      licenseAgency: WY_NO_LICENSE,
      training: [LEARN_ON_JOB("Concrete contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([200, 250, 21, 20]),
      stateLicense: "none",
      licenseSummary: wyNoLicense("drywall installers"),
      licenseAgency: WY_NO_LICENSE,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      stateLicense: "none",
      licenseSummary:
        "Wyoming has no statewide license for elevator mechanics or elevator contractors; elevator safety is overseen at the state level for inspections only. The electrical connections for an elevator do fall under the State Electrical Board's own Low Voltage/Limited license (the LM-E Elevators tier), but the mechanical work itself isn't separately licensed. Wyoming publishes no state-specific job count for elevator technicians.",
      licenseSteps: [
        { title: "No statewide elevator-mechanic license", detail: "Wyoming does not license elevator mechanics or contractors as such. Electrical work on the load side of an elevator's equipment disconnect needs the Electrical Board's Limited (LM-E) electrician license; local jurisdictions may set their own requirements for the rest." },
      ],
      licenseAgency: WY_ELECTRICAL,
      training: [national("International Union of Elevator Constructors (IUEC) apprenticeship", "neiep-elevator-apprenticeship", "Elevator constructor apprenticeships.")],
      payNote: "Wyoming publishes no state-specific outlook data for elevator technicians.",
    }),
    t("flooring-installer", {
      stateLicense: "none",
      licenseSummary: wyNoLicense("flooring installers") + " Wyoming publishes no state-specific job count for this trade.",
      licenseAgency: WY_NO_LICENSE,
      training: [LEARN_ON_JOB("Flooring contractors")],
      payNote: "Wyoming publishes no state-specific outlook data for flooring installers; BLS counts this group as floor layers except carpet, wood and tile, so some flooring workers fall in other categories anyway.",
    }),
    t("glazier", {
      outlook: ol([50, 60, 21, 0]),
      stateLicense: "none",
      licenseSummary: wyNoLicense("glaziers") + " It's one of the smallest trades on this page.",
      licenseAgency: WY_NO_LICENSE,
      training: [LEARN_ON_JOB("Glazing contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([200, 230, 20, 20]),
      stateLicense: "none",
      licenseSummary: wyNoLicense("insulation installers"),
      licenseAgency: WY_NO_LICENSE,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([70, 80, 16, 10]),
      stateLicense: "none",
      licenseSummary: wyNoLicense("ironworkers") + " It's one of the smallest trades on this page.",
      licenseAgency: WY_NO_LICENSE,
      training: [national("Ironworkers union apprenticeship", "iron-workers-apprenticeship", "Structural and ornamental ironworker apprenticeships.")],
    }),
    t("mason", {
      outlook: ol([280, 330, 20, 30]),
      stateLicense: "none",
      licenseSummary: wyNoLicense("masons"),
      licenseAgency: WY_NO_LICENSE,
      training: [national("Bricklayers union (BAC) apprenticeship", "bac-bricklayers-apprenticeship", "Masonry apprenticeships.")],
    }),
    t("millwright", {
      outlook: ol([160, 180, 10, 20]),
      stateLicense: "none",
      licenseSummary: wyNoLicense("millwrights"),
      licenseAgency: WY_NO_LICENSE,
      training: [LEARN_ON_JOB("Industrial and millwright contractors")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary: "Wyoming has no statewide pipefitter license, the same as for plumbers; some cities license gas pipefitting work locally alongside plumbing.",
      licenseAgency: WY_NO_LICENSE,
      training: [national("UA Plumbers & Pipefitters apprenticeship", "ua-plumber-pipefitter-apprenticeship", "Plumbing and pipefitting apprenticeships.")],
      payNote: "Wyoming's BLS projection groups pipefitters with plumbers and sprinkler fitters, so there's no separate pipefitter-only figure.",
    }),
    t("plasterer-stucco-mason", {
      stateLicense: "none",
      licenseSummary: wyNoLicense("plasterers and stucco masons") + " Wyoming publishes no state-specific job count for this trade.",
      licenseAgency: WY_NO_LICENSE,
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
      payNote: "Wyoming publishes no state-specific outlook data for plasterers and stucco masons, and no O*NET wage data for this trade either, so pay figures here are national.",
    }),
    t("roofer", {
      outlook: ol([340, 420, 25, 30]),
      stateLicense: "none",
      licenseSummary: wyNoLicense("roofers"),
      licenseAgency: WY_NO_LICENSE,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([190, 220, 18, 20]),
      stateLicense: "none",
      licenseSummary: wyNoLicense("sheet metal workers"),
      licenseAgency: WY_NO_LICENSE,
      training: [national("Sheet Metal Workers (SMART) apprenticeship", "smart-sheet-metal-apprenticeship", "Sheet metal worker apprenticeships.")],
    }),
    t("solar-installer", {
      stateLicense: "none",
      licenseSummary:
        "Wyoming has no license specifically for solar installers; electrical work on a solar system still needs a Wyoming-licensed electrician. Wyoming publishes no state-specific growth projection for this trade; nationally it's growing 37%, among the fastest of any trade on this page.",
      licenseAgency: WY_ELECTRICAL,
      training: [LEARN_ON_JOB("Solar installation contractors")],
    }),
    t("sprinkler-fitter", {
      stateLicense: "none",
      licenseSummary:
        "Wyoming has no statewide fire-sprinkler contractor or fitter license. The state's fire-prevention program reviews plans and issues permits for sprinkler installations, but licensing the trade itself, where it happens at all, is a local matter.",
      licenseSteps: [
        { title: "No statewide sprinkler-fitter or contractor license", detail: "Wyoming's fire-prevention program reviews plans and issues permits for sprinkler systems, but doesn't license the installers or the business itself; check with the local jurisdiction for the project." },
      ],
      licenseAgency: WY_FIRE,
      businessNote: "With no state fire-sprinkler contractor license, a sprinkler business's requirements, if any, come from the city or county where it's working rather than from the state.",
      training: [national("UA Road Sprinkler Fitters apprenticeship (Local 669)", "ua-669-sprinkler-fitter-apprenticeship", "Fire sprinkler fitter apprenticeships.")],
      payNote: "Wyoming's BLS projection groups sprinkler fitters with plumbers and pipefitters, so there's no separate sprinkler-fitter-only figure, and no O*NET wage data for this trade either, so pay figures here are national.",
    }),
    t("tile-setter", {
      outlook: ol([40, 50, 33, 0]),
      stateLicense: "none",
      licenseSummary: wyNoLicense("tile setters") + " It has Wyoming's single highest growth figure on this page, 33%, though it's also one of the smallest trades.",
      licenseAgency: WY_NO_LICENSE,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: wyNoLicense("waterproofing installers"),
      licenseAgency: WY_NO_LICENSE,
      payNote: "Waterproofing has no distinct federal job category, so no state-specific job count exists for it in Wyoming or anywhere else on this site.",
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Wyoming Dual and Concurrent Enrollment",
      detail: "High school students can earn college credit at any of Wyoming's seven community colleges or the University of Wyoming while still in high school, often at reduced or no cost depending on the district.",
      source: { label: "Wyoming Dept. of Education, Dual and Concurrent Enrollment Program", url: "https://edu.wyoming.gov/college-career-ready/dual-concurrent" },
    },
  ],
  adults: [
    {
      title: "Hathaway Scholarship",
      detail: "Wyoming high school graduates who complete a CTE pathway and earn an industry-recognized credential, among other eligibility paths, qualify for the Opportunity level of the Hathaway Scholarship: $1,180 per semester at a Wyoming community college for up to 4 full-time semesters (48 credits) toward a certificate or associate degree.",
      source: WY_HATHAWAY,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Wyoming statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Wyoming long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2061.00?st=WY" },
    WY_ELECTRICAL,
    WY_FIRE,
    WY_HATHAWAY,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
