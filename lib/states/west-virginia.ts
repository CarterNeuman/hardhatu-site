// West Virginia state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is West Virginia-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, UA_669, NEIEP, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "West Virginia";

const CONTRACTOR_LICENSE: SourceRef = { label: "WV Division of Labor, Contractor License FAQ and classifications", url: "https://labor.wv.gov/Licensing/Contractor_License/Pages/contractor-faq.aspx" };
const CONTRACTOR_STATUTE: SourceRef = { label: "W. Va. Code §30-42-5 and §30-42-6, contractor license classifications and exemptions", url: "https://code.wvlegislature.gov/30-42-5/" };
const FIRE_MARSHAL_ELECTRICAL: SourceRef = { label: "WV State Fire Marshal's Office, electrical licensing (W. Va. Code Article 29-3B)", url: "https://firemarshal.wv.gov/Divisions/Fire%20Services/Pages/Electrical-Licensing.aspx" };
const LABOR_PLUMBER: SourceRef = { label: "WV Division of Labor, Plumber Certification FAQ", url: "https://labor.wv.gov/Licensing/Plumber_License/Pages/plumber-faq.aspx" };
const LABOR_HVAC: SourceRef = { label: "WV Division of Labor, HVAC Technician Certification FAQ", url: "https://labor.wv.gov/Licensing/HVAC/Pages/hvac-faq.aspx" };
const ELEVATOR_CODE: SourceRef = { label: "W. Va. Code Article 21-3C, Elevator Safety Act", url: "https://code.wvlegislature.gov/21-3C-10a/" };
const FIRE_MARSHAL_SPRINKLER: SourceRef = { label: "WV State Fire Marshal's Office, Supervision of Fire Protection Workers (W. Va. Code Article 29-3D)", url: "https://firemarshal.wv.gov/Divisions/Fire%20Services/Pages/Supervision-of-Fire-Protection-Workers.aspx" };
const WV_INVESTS: SourceRef = { label: "W. Va. Code §18C-9-3, WV Invests Grant", url: "https://code.wvlegislature.gov/18C-9-3/" };
const SIMULATED_WORKPLACE: SourceRef = { label: "West Virginia Department of Education, Simulated Workplace", url: "https://wvde.us/simulated-workplace/" };
const WV_JUMPSTART: SourceRef = { label: "wvjumpstart.gov, registered apprenticeship sponsors in West Virginia", url: "https://wvjumpstart.gov/what-is-jumpstart/blog/six-apprenticeship-programs-in-west-virginia-to-help-build-your-career-in-the-skilled-trades" };
const IBEW_WV: SourceRef = { label: "IBEW, West Virginia local market share and JATCs", url: "https://ibew.org/electrical_worker/wv-locals-market-share/" };

const WV_INVESTS_OPT: TrainingOption = {
  name: "WV Invests Grant",
  kind: "college",
  where: "West Virginia's public community and technical colleges",
  detail: "A last-dollar grant covering tuition and fees, after other aid, for certificate and associate-degree programs the state has determined meet a workforce need.",
  url: "https://code.wvlegislature.gov/18C-9-3/",
};
const IBEW_466: TrainingOption = {
  name: "IBEW/NECA electrical JATCs",
  kind: "union",
  where: "Local 466 (Charleston), Local 141 (Wheeling), Local 968 (Parkersburg), Local 596 (Clarksburg) and Local 317 (Huntington)",
  detail: "Paid union electrical apprenticeships run by IBEW locals and NECA contractors statewide.",
  url: "https://ibew.org/electrical_worker/wv-locals-market-share/",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const UA_625: TrainingOption = {
  name: "UA Plumbers & Pipefitters Local 625",
  kind: "union",
  where: "South-central West Virginia, in the Kanawha Valley",
  detail: "Paid union apprenticeship in plumbing and pipefitting, close to the state's chemical-plant and power-plant corridor.",
  url: "https://wvjumpstart.gov/what-is-jumpstart/blog/six-apprenticeship-programs-in-west-virginia-to-help-build-your-career-in-the-skilled-trades",
};
const IRONWORKERS_549: TrainingOption = {
  name: "Ironworkers Local 549 JATC",
  kind: "union",
  where: "Wheeling",
  detail: "Paid union apprenticeship in structural and reinforcing ironwork, with a recent federally-funded training center expansion.",
  url: "https://www.heraldstaronline.com/news/business/2024/10/ironworkers-local-549-plans-3-5-million-expansion-in-wheeling/",
};
const INSULATORS_80: TrainingOption = {
  name: "Heat & Frost Insulators Local 80 JATC",
  kind: "union",
  where: "Huntington, Charleston and Parkersburg",
  detail: "Paid union apprenticeship for mechanical and industrial insulation.",
  url: "https://www.insulators.org/local-80-jatc",
};
const BAC_15: TrainingOption = {
  name: "Bricklayers & Allied Craftworkers (BAC) District Council of WV, Local 15",
  kind: "union",
  where: "White Hall",
  detail: "Paid union apprenticeship for brick, block and stone masons.",
  url: "https://wvjumpstart.gov/what-is-jumpstart/blog/six-apprenticeship-programs-in-west-virginia-to-help-build-your-career-in-the-skilled-trades",
};
const SMART_PARKERSBURG: TrainingOption = {
  name: "SMART Sheet Metal Workers Joint Apprenticeship Training",
  kind: "union",
  where: "Parkersburg",
  detail: "Paid union apprenticeship for ductwork and architectural sheet metal.",
  url: "https://www.gudsy.org/nonprofits/west-virginia-sheet-metal-workers-joint-apprenticeship-training-parkersburg-wv",
};
const DC_ELEVATOR: TrainingOption = {
  ...NEIEP,
  name: "DC Elevator, Charleston",
  where: "Charleston",
};
const OPCMIA_WV: TrainingOption = {
  name: "OPCMIA Training Fund",
  kind: "union",
  where: "Registered with West Virginia's state workforce program",
  detail: "Paid union apprenticeship in plastering and cement finishing.",
  url: "https://wvjumpstart.gov/what-is-jumpstart/blog/six-apprenticeship-programs-in-west-virginia-to-help-build-your-career-in-the-skilled-trades",
};
const ABC_APPALACHIA: TrainingOption = {
  name: "ABC Appalachia",
  kind: "open-shop",
  where: "Headquartered in Charleston",
  detail: "The merit-shop Associated Builders and Contractors chapter covering West Virginia, running open-shop apprenticeships across several trades.",
  url: "https://www.constructionowners.com/parent-association/abc-appalachia-chapter",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noTradeLicense = (what: string) =>
  `West Virginia has no individual license for ${what}. A business doing the work may need a Contractor License classification, depending on the job's size and scope.`;

export const WEST_VIRGINIA: StateGuide = {
  // West Virginia ZIP codes run 247xx-268xx.
  locationHints: { zip3: [[247, 268]], cities: ["Charleston", "Huntington", "Morgantown", "Wheeling", "Parkersburg", "Beckley"] },
  slug: "west-virginia",
  code: "WV",
  name: S,
  lastVerified: "2026-11-17",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "West Virginia long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=WV",
  },
  intro:
    "A field guide to 25 construction trades in West Virginia: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "West Virginia spreads trade licensing across three agencies: the Division of Labor's Contractor Licensing Board for business licenses, the Division of Labor for individual plumber and HVAC technician certification, and the State Fire Marshal's Office for individual electricians and fire sprinkler workers.",
    "Every person doing HVAC work in West Virginia needs a personal HVAC Technician Certification since 2016, even employees of a licensed contractor, which is unusual compared to most states.",
    "Most other trades on this page, like carpenters, roofers, masons and millwrights, have no individual state license at all; only the business doing the work needs a Contractor License classification once the job is big enough.",
    "The Kanawha Valley's chemical-plant and power-plant corridor gives pipefitting, millwright and insulation work a distinct industrial driver beyond ordinary home and commercial construction.",
    "Every West Virginia CTE classroom, construction programs included, runs under the Simulated Workplace model: students clock in and work in project-based \"companies\" that follow workplace rules.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "WV Invests Grant", value: "Last-dollar", note: "Covers tuition and fees after other aid, for approved certificate and associate programs" },
  licensingOverview:
    "West Virginia regulates construction trades through three separate agencies rather than one board. The Division of Labor's Contractor Licensing Board issues the general, business-level Contractor License, sized to named categories like Electrical, Plumbing, HVAC and Remodeling & Repair. The Division of Labor separately certifies individual plumbers and HVAC technicians, while the State Fire Marshal's Office separately licenses individual electricians and fire sprinkler/fire protection workers. Most other trades on this page, including carpentry, roofing, masonry and millwright work, have no individual worker license and are governed only by the entity-level Contractor License system.",
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
      "Many trades on this page, like carpentry, roofing and masonry, need no individual license to start a small business, only a Contractor License once the job is large enough.",
      "You can start small. Many owners begin with one truck and side jobs before going full-time.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Plumbing and HVAC businesses face a specific dollar threshold, $5,000 for residential jobs and $25,000 for commercial jobs, above which a Contractor License is required.",
    ],
    path:
      "The usual route: work for someone else for years, earn your individual certification where one exists, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      CONTRACTOR_LICENSE,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([8670, 10240, 18, 900]),
      stateLicense: "none",
      licenseSummary: "West Virginia has no individual license for construction laborers. It is the biggest trade on this page and the most common way into construction.",
      training: [ABC_APPALACHIA, national("WV Construction Craft Laborers Apprenticeship Program", "liuna-laborer-apprenticeship", "A registered apprenticeship for construction craft laborers.")],
    }),
    t("electrician", {
      outlook: ol([4590, 4870, 6, 430]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "West Virginia licenses electricians statewide through the State Fire Marshal's Office, not the Division of Labor, under Article 29-3B. A journeyman license takes 1 year (2,000 hours) of hands-on experience, a US DOL apprenticeship, or a state-approved 1,080-hour vocational program, plus a 50-question open-book exam on the National Electrical Code. A master license takes 2 years (4,000 hours) of hands-on experience, which vocational training can't substitute for, plus the master exam. Licenses renew yearly ($50) or every 3 years ($150); there is no continuing education requirement.",
      licenseSteps: [
        { title: "Helper or apprentice", detail: "No license needed. Must always be supervised by a licensed electrician." },
        { title: "Journeyman electrician", detail: "1 year (2,000 hours) of hands-on experience, a DOL apprenticeship, or a 1,080-hour vocational program, plus the state exam." },
        { title: "Master electrician", detail: "2 years (4,000 hours) of hands-on experience, which vocational training does not count toward, plus the master exam." },
        { title: "Specialty license (optional)", detail: "Electric Sign, HVAC, Low Voltage or Single Family Dwelling specialty licenses are available." },
      ],
      licenseAgency: FIRE_MARSHAL_ELECTRICAL,
      extraCredentials: ["West Virginia journeyman or master electrician license"],
      training: [IBEW_466, ABC_APPALACHIA],
      businessNote: "Running one in West Virginia takes a master electrician license, plus a Contractor License in the Electrical classification.",
    }),
    t("equipment-operator", {
      outlook: ol([7720, 8200, 6, 690]),
      stateLicense: "none",
      licenseSummary: "West Virginia has no state license for equipment operators. Employers look for training records and safe hours in the seat, and some jobs need a commercial driver's license.",
      training: [national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators."), LEARN_ON_JOB("Highway and site contractors")],
    }),
    t("welder", {
      outlook: ol([2190, 2300, 5, 230]),
      stateLicense: "none",
      licenseSummary: "West Virginia has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      training: [LEARN_ON_JOB("Fabrication shops and industrial contractors")],
    }),
    t("hvac-technician", {
      outlook: ol([1740, 2030, 17, 180]),
      stateLicense: "worker-certification",
      licenseSummary:
        "West Virginia has certified individual HVAC technicians through the Division of Labor since January 1, 2016, and the certification is required of every person doing HVAC work, even employees of a licensed contractor. An HVAC Technician certification needs a written exam and documented experience ($75); an HVAC Residential Technician certification is narrower and residential-only ($60); a Technician in Training (TIT) needs no exam ($25). A certified technician can supervise up to 4 TITs on residential jobs, 2 on commercial jobs.",
      licenseSteps: [
        { title: "Technician in Training (TIT)", detail: "No exam required. Must work under a certified technician's supervision." },
        { title: "HVAC Residential Technician", detail: "A written exam, for residential-only work." },
        { title: "HVAC Technician", detail: "A written exam plus documented experience, for residential and commercial work." },
      ],
      licenseAgency: LABOR_HVAC,
      extraCredentials: ["West Virginia HVAC Technician or HVAC Residential Technician certification"],
      training: [ABC_APPALACHIA],
      businessNote: "Running one in West Virginia takes certified technicians on staff, plus a Contractor License in the HVAC classification once a job reaches $5,000 residential or $25,000 commercial.",
    }),
    t("carpenter", {
      outlook: ol([4740, 5560, 17, 450]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("carpenters"),
      training: [ABC_APPALACHIA, national("Carpenters union (UBC) training", "ubc-carpenter-apprenticeship", "Union carpentry apprenticeships.")],
    }),
    t("plumber", {
      outlook: ol([1940, 2170, 12, 190]),
      stateLicense: "worker-certification",
      licenseSummary:
        "West Virginia certifies individual plumbers through the Division of Labor, separate from any business license, and the certification cannot be issued to a business. A Master Plumber certification ($75) and Journeyman Plumber certification ($75) both need a written exam through PSI Services; a Plumber-in-Training (PIT) credential ($25) needs no exam. The certification is required of anyone doing plumbing work, regardless of job size or employer, with narrow exemptions for work on your own home.",
      licenseSteps: [
        { title: "Plumber-in-Training (PIT)", detail: "No exam required. Must work under a certified plumber's supervision." },
        { title: "Journeyman Plumber", detail: "A written exam through PSI Services." },
        { title: "Master Plumber", detail: "A written exam through PSI Services, plus experience as a journeyman." },
      ],
      licenseAgency: LABOR_PLUMBER,
      extraCredentials: ["West Virginia Journeyman or Master Plumber certification"],
      training: [UA_625],
      ownBusiness: "Running a plumbing business in West Virginia takes certified plumbers on staff, plus a Contractor License in the Plumbing classification once a job reaches $5,000 residential or $25,000 commercial.",
    }),
    t("painter", {
      outlook: ol([1040, 1170, 13, 100]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("painters"),
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([730, 830, 13, 60]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("concrete finishers"),
      training: [LEARN_ON_JOB("Concrete and site contractors")],
    }),
    t("drywall-installer", {
      stateLicense: "none",
      licenseSummary: noTradeLicense("drywall installers"),
      payNote: "O*NET and Projections Central publish no West Virginia-specific job outlook for drywall installers, so there is no state projection here.",
      training: [ABC_APPALACHIA, LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      stateLicense: "worker-certification",
      licenseSummary:
        "West Virginia licenses elevator mechanics under the Elevator Safety Act (Article 21-3C). The experience route takes at least 4 years of recent, active elevator-industry experience plus a written competency exam (70% to pass); the apprenticeship route takes completion of a registered apprenticeship, including its work-experience requirement, plus the program's exams. Narrower Accessibility Technician and Limited Technician (historic resort hotels only) licenses also exist.",
      licenseSteps: [
        { title: "Apprentice", detail: "Must have a licensed mechanic on premises at all times until completing one year of the program." },
        { title: "Experienced apprentice", detail: "After one year in the program, can perform certain delegated tasks under general supervision." },
        { title: "Elevator mechanic license (experience route)", detail: "At least 4 years of recent, active experience plus a written exam (70% to pass)." },
        { title: "Elevator mechanic license (apprenticeship route)", detail: "Completion of a registered apprenticeship's work-experience component plus its exams." },
      ],
      licenseAgency: ELEVATOR_CODE,
      extraCredentials: ["West Virginia elevator mechanic license"],
      training: [DC_ELEVATOR],
      ownBusiness: "Elevator work in West Virginia needs licensed mechanics, so most mechanics work for established elevator companies.",
      payNote: "O*NET and Projections Central publish no West Virginia-specific job outlook for elevator technicians, so there is no state projection here.",
    }),
    t("flooring-installer", {
      outlook: ol([40, 50, 21, 0]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("flooring installers"),
      payNote: "This is a very small trade in West Virginia, about 40 workers statewide, so the openings figure rounds to near zero even with strong percentage growth.",
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([150, 170, 12, 20]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("glaziers"),
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([70, 80, 17, 10]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("insulation installers"),
      training: [INSULATORS_80],
    }),
    t("ironworker", {
      outlook: ol([140, 160, 12, 10]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("ironworkers"),
      training: [IRONWORKERS_549],
    }),
    t("mason", {
      outlook: ol([280, 310, 12, 20]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("masons"),
      training: [BAC_15],
    }),
    t("millwright", {
      outlook: ol([350, 330, -6, 30]),
      stateLicense: "none",
      licenseSummary: "West Virginia has no state license for millwrights. Employers hire on training, experience and precision, and the Kanawha Valley's chemical and power-plant industry is a steady source of this work.",
      payNote: "This is the only trade on this page projected to shrink in West Virginia, though openings still occur as workers retire.",
      training: [LEARN_ON_JOB("Industrial and plant maintenance contractors")],
    }),
    t("pipefitter", {
      stateLicense: "worker-certification",
      licenseSummary:
        "West Virginia has no distinct state license for industrial pipefitting. Pipefitting work that falls within plumbing's legal definition is covered by the same Plumber Certification as plumbers; there is no separate credential for high-pressure industrial piping, despite the Kanawha Valley's chemical-plant and power-plant corridor.",
      training: [UA_625],
    }),
    t("plasterer-stucco-mason", {
      stateLicense: "none",
      licenseSummary: noTradeLicense("plasterers"),
      payNote: "O*NET and Projections Central publish no West Virginia-specific job outlook for plasterers and stucco masons, so there is no state projection here.",
      training: [OPCMIA_WV],
    }),
    t("roofer", {
      outlook: ol([520, 610, 17, 50]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("roofers"),
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([560, 620, 11, 50]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("sheet metal workers"),
      training: [SMART_PARKERSBURG],
    }),
    t("solar-installer", {
      stateLicense: "none",
      licenseSummary: "West Virginia has no separate solar license found. The wiring side of a solar job is electrical work, which likely needs West Virginia electrical licensing from the State Fire Marshal's Office, though no statute was found confirming this explicitly for solar.",
      payNote: "O*NET and Projections Central publish no West Virginia-specific job outlook for solar installers, so there is no state projection here.",
      training: [IBEW_466],
    }),
    t("sprinkler-fitter", {
      stateLicense: "worker-certification",
      licenseSummary:
        "West Virginia licenses fire sprinkler and fire protection workers through the State Fire Marshal's Office, under Article 29-3D, entirely separate from plumbing and electrical licensing. License types include Journeyman Sprinkler Fitter, Fire Protection Layout Technician, and Engineered and Pre-Engineered Fire Suppression System Installer/Technician. Applicants must be at least 18 and submit fees and work experience; exact hour requirements are listed on each license type's own application. Since June 16, 2021, Sprinkler Fitter's In-Training workers are exempt from licensure.",
      licenseSteps: [
        { title: "Sprinkler Fitter's In-Training (exempt)", detail: "No license needed while training under a licensed fitter." },
        { title: "Journeyman Sprinkler Fitter", detail: "Application, fees and documented work experience through the State Fire Marshal's Office." },
        { title: "Specialty license (optional)", detail: "Fire Protection Layout Technician, or Engineered/Pre-Engineered Fire Suppression System Installer/Technician." },
      ],
      licenseAgency: FIRE_MARSHAL_SPRINKLER,
      training: [UA_669],
      ownBusiness: "Opening a sprinkler company in West Virginia takes licensed fitters on staff, plus a Contractor License in the Sprinklers & Fire Protection classification.",
    }),
    t("tile-setter", {
      outlook: ol([60, 80, 19, 10]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("tile setters"),
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: noTradeLicense("waterproofing installers"),
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "WV Simulated Workplace",
      detail:
        "Every CTE classroom in West Virginia, construction programs included, runs under this model: students clock in and work inside project-based \"companies\" that follow workplace protocols, including drug-free-workplace rules.",
      source: SIMULATED_WORKPLACE,
    },
    {
      title: "Registered apprenticeship sponsors",
      detail: "The state's own workforce site lists construction-relevant registered apprenticeship sponsors open to young entrants, including WVDOT on-the-job training, the WV Construction Craft Laborers Apprenticeship Program and OPCMIA's plastering and cement masonry program.",
      source: WV_JUMPSTART,
    },
  ],
  adults: [
    {
      title: "WV Invests Grant",
      detail: "A last-dollar grant covering tuition and fees after other aid, at West Virginia's public community and technical colleges, for certificate and associate-degree programs the state has determined meet a workforce need.",
      source: WV_INVESTS,
    },
    {
      title: "Construction apprenticeships",
      detail: "IBEW, UA, Ironworkers, SMART, Insulators and Bricklayers locals run paid, registered apprenticeships out of Charleston, Huntington, Wheeling and Parkersburg.",
      source: WV_JUMPSTART,
    },
    {
      title: "ABC Appalachia",
      detail: "The merit-shop Associated Builders and Contractors chapter, headquartered in Charleston, runs open-shop apprenticeships across several trades statewide.",
      source: { label: "ABC Appalachia chapter", url: "https://www.constructionowners.com/parent-association/abc-appalachia-chapter" },
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, West Virginia statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "West Virginia long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=WV" },
    CONTRACTOR_LICENSE,
    CONTRACTOR_STATUTE,
    FIRE_MARSHAL_ELECTRICAL,
    LABOR_PLUMBER,
    LABOR_HVAC,
    ELEVATOR_CODE,
    FIRE_MARSHAL_SPRINKLER,
    WV_INVESTS,
    SIMULATED_WORKPLACE,
    WV_JUMPSTART,
    IBEW_WV,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
