// Tennessee state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Tennessee-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, NEIEP, UA_669, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Tennessee";

const BLC_OTHER: SourceRef = {
  label: "TN Board for Licensing Contractors, other licenses regulated (LLE, LLP, Home Improvement)",
  url: "https://www.tn.gov/commerce/regboards/contractor/other-licenses-regulated.html",
};
const LLE: SourceRef = { label: "TN Board for Licensing Contractors, Limited Licensed Electrician (LLE)", url: "https://www.tn.gov/commerce/regboards/lle" };
const LLP: SourceRef = { label: "TN Board for Licensing Contractors, Limited Licensed Plumber (LLP)", url: "https://www.tn.gov/commerce/regboards/llp" };
const HI: SourceRef = {
  label: "TN Board for Licensing Contractors, Home Improvement license ($3,000 to $24,999 in nine counties)",
  url: "https://tn.gov/commerce/regboards/hi/home-improvement-licensing-requirements.html",
};
const MASONRY: SourceRef = {
  label: "TN Board for Licensing Contractors, license requirements (masonry subcontractors at $100,000)",
  url: "https://www.tn.gov/content/dam/tn/commerce/documents/regboards/contractors/forms/ContBLCReciprocationwithTN.pdf",
};
const SPRINKLER: SourceRef = {
  label: "TN State Fire Marshal's Office, fire sprinkler contractor registration",
  url: "https://tn.gov/commerce/fire/permit/licensing/sprinklers.html",
};
const ELEVATOR_LAW: SourceRef = {
  label: "Tenn. Code Title 68, Chapter 121 (elevators): the state licenses inspectors, not mechanics",
  url: "https://law.justia.com/codes/tennessee/2021/title-68/chapter-121/",
};
const DEG: SourceRef = { label: "College for TN, Dual Enrollment Grant 2025-26", url: "https://www.collegefortn.org/wp-content/uploads/2025/07/DEG-2025-2026.pdf" };
const APPRENTICESHIP_TN: SourceRef = { label: "Apprenticeship TN", url: "https://www.tn.gov/apprenticeshiptn/about-us.html" };

const TCAT: TrainingOption = {
  name: "Tennessee Colleges of Applied Technology (TCAT)",
  kind: "college",
  where: "TCAT campuses across the state",
  detail:
    "Hands-on diplomas and certificates in electrical, HVAC, plumbing, welding and building construction. TN Promise covers tuition for new high school graduates, and TN Reconnect covers it for adults.",
  url: "https://tennessee.gov/thec/learn-about/student-resources.html",
};
const ABC_TN: TrainingOption = {
  name: "ABC Greater Tennessee Construction Trades Academy",
  kind: "open-shop",
  where: "Nashville and Knoxville",
  detail: "NCCER-accredited, registered apprenticeships in trades including electrical, HVAC, plumbing and carpentry. You work for a member contractor while taking classes.",
  url: "https://abctn.org/education/apprenticeship-application/",
};
const NASH_JATC: TrainingOption = {
  name: "Nashville Electrical JATC (IBEW Local 429)",
  kind: "union",
  where: "Nashville, serving Middle Tennessee",
  detail: "Union inside-wireman apprenticeship run by IBEW and NECA.",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const MEM_JATC: TrainingOption = {
  name: "Memphis Electrical JATC (IBEW Local 474)",
  kind: "union",
  where: "Memphis",
  detail: "Union inside-wireman apprenticeship. Applications are taken online year-round.",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const OTHER_JATC: TrainingOption = {
  name: "Other IBEW training centers",
  kind: "union",
  where: "Chattanooga, Knoxville and Oak Ridge",
  detail: "Tennessee has five union electrical JATCs in all, counting Nashville and Memphis.",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const UA_572: TrainingOption = {
  name: "Plumbers & Pipefitters Local 572 JATC",
  kind: "union",
  where: "Nashville",
  detail: "Union apprenticeship for plumbers and pipefitters in Middle Tennessee.",
  programSlug: "ua-plumber-pipefitter-apprenticeship",
};
const CARPENTERS: TrainingOption = {
  name: "Mid-South Carpenters Regional Council Training",
  kind: "union",
  where: "Tennessee training centers",
  detail: "Union carpentry apprenticeships through the regional council's training trust fund.",
  programSlug: "ubc-carpenter-apprenticeship",
};
const GO_BUILD_TN: TrainingOption = {
  name: "Go Build Tennessee",
  kind: "free-training",
  where: "Statewide",
  detail: "The industry's skilled-trades awareness campaign, now one of the state's official apprenticeship partners.",
  url: "https://www.tn.gov/workforce/general-resources/news/2026/10/27/tennessee-announces-six-apprenticeship-intermediaries-to-expand-opportunities-statewide.html",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noTradeLicense = (what: string) =>
  `Tennessee has no license for ${what}. Contractors need a state contractor license on jobs of $25,000 or more, and in nine counties a Home Improvement license for home remodeling from $3,000 to $24,999.`;

export const TENNESSEE: StateGuide = {
  // Tennessee ZIP codes run 370xx-385xx.
  locationHints: { zip3: [[370, 385]], cities: ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Murfreesboro", "Johnson City"] },
  slug: "tennessee",
  code: "TN",
  name: S,
  lastVerified: "2026-11-14",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Tennessee long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=TN",
  },
  intro:
    "A field guide to 25 construction trades in Tennessee: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ about 142,000 people in Tennessee, and the state projects about 14,600 openings a year across them through 2034. Electricians are projected to grow 22% and HVAC technicians 21%.",
    "Tennessee has no statewide journeyman license. Big cities license electricians and plumbers locally, and elsewhere small jobs need the state's Limited Licensed Electrician or Plumber license.",
    "High school students from 9th grade on can qualify for the Dual Enrollment Grant at a TCAT, which pays for up to 1,296 clock hours of training.",
    "TN Promise covers tuition at a community college or TCAT for new high school graduates, and TN Reconnect does the same for adults.",
    "Construction is one of Tennessee's strongest apprenticeship industries, and the state's apprenticeship office now partners directly with ABC Greater Tennessee and Go Build Tennessee.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "TCAT tuition", value: "$0", note: "With TN Promise for new grads or TN Reconnect for adults" },
  licensingOverview:
    "Tennessee's Board for Licensing Contractors requires a contractor license on jobs of $25,000 or more, with classifications for electrical, plumbing, HVAC and more. Under $25,000, the big cities with their own codes offices (like Nashville, Memphis, Knoxville and Chattanooga) license electricians and plumbers locally. Elsewhere, electrical work needs a state Limited Licensed Electrician (LLE) license and plumbing a Limited Licensed Plumber (LLP) license. Nine counties also require a Home Improvement license for home remodeling from $3,000 to $24,999. Fire sprinkler contractors register with the State Fire Marshal.",
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
      "In Tennessee, the state contractor license starts at $25,000 jobs, so many trades can start small. Watch the exceptions: the Home Improvement license in nine counties, and trade licenses for electrical and plumbing work.",
      "You can start small. Many owners begin with one truck and side jobs before going full-time.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Income swings with the season and the economy, and customers don't always pay on time.",
    ],
    path:
      "The usual route: work for someone else for years, earn your license, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      BLC_OTHER,
      HI,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([37260, 43390, 17, 3780]),
      stateLicense: "none",
      licenseSummary: "Tennessee has no license for construction laborers. It is the biggest trade on this page and the most common way into construction.",
      training: [TCAT, GO_BUILD_TN, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([19840, 24210, 22, 2320]),
      stateLicense: "contractor",
      licenseSummary:
        "Tennessee has no statewide journeyman license. Cities and counties with their own codes offices (like Nashville, Memphis, Knoxville and Chattanooga) license journeymen and masters locally. Elsewhere, electrical jobs under $25,000 need the state's Limited Licensed Electrician (LLE) license, and jobs of $25,000 or more a contractor license with the electrical (CE) classification.",
      licenseSteps: [
        { title: "Apprentice or helper", detail: "Work for a licensed electrician or contractor. No license needed to start." },
        { title: "Local journeyman license (big cities)", detail: "Where the city or county runs its own codes office, it sets its own experience and exam rules." },
        { title: "Limited Licensed Electrician (LLE)", detail: "State license for jobs under $25,000 where the State Fire Marshal inspects. Age 18 and an exam." },
        { title: "Electrical contractor (CE)", detail: "For jobs of $25,000 or more: trade and business exams, financial statement and insurance." },
      ],
      licenseAgency: LLE,
      training: [NASH_JATC, MEM_JATC, OTHER_JATC, ABC_TN, TCAT],
      businessNote: "Contracting electrical work in Tennessee takes an LLE or local license for small jobs and the CE contractor license at $25,000 and up.",
    }),
    t("equipment-operator", {
      outlook: ol([10630, 12110, 14, 1060]),
      stateLicense: "none",
      licenseSummary: "Tennessee has no state license for equipment operators. Employers look for training records and safe hours in the seat, and some jobs need a commercial driver's license.",
      training: [TCAT, national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([14050, 15510, 10, 1570]),
      stateLicense: "none",
      licenseSummary: "Tennessee has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      training: [TCAT, UA_572],
    }),
    t("hvac-technician", {
      outlook: ol([10780, 13090, 21, 1220]),
      stateLicense: "contractor",
      licenseSummary:
        "Tennessee requires a contractor license with an HVAC classification on jobs of $25,000 or more. There is no state HVAC license for smaller jobs, but where the State Fire Marshal inspects, HVAC permits under $25,000 need a Limited Licensed Electrician (LLE) license. Big cities may have their own mechanical licenses.",
      licenseSteps: [
        { title: "Helper or apprentice", detail: "Work for an HVAC company. EPA 608 certification is required to handle refrigerants." },
        { title: "Technician", detail: "Install and service systems on your own." },
        { title: "LLE or local license (small jobs)", detail: "Needed to pull HVAC permits under $25,000, depending on where you work." },
        { title: "HVAC contractor (optional)", detail: "State contractor license for jobs of $25,000 or more." },
      ],
      licenseAgency: BLC_OTHER,
      training: [TCAT, ABC_TN, UA_572],
      businessNote: "Small jobs need the right local or LLE license for permits, and jobs of $25,000 or more need a state contractor license.",
    }),
    t("carpenter", {
      outlook: ol([14160, 15690, 11, 1220]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("carpenters"),
      training: [ABC_TN, CARPENTERS, TCAT],
    }),
    t("plumber", {
      outlook: ol([10520, 12310, 17, 1100]),
      stateLicense: "contractor",
      licenseSummary:
        "Tennessee has no statewide journeyman plumber license. Big cities with their own codes offices license plumbers locally. Elsewhere, plumbing jobs under $25,000 need the state's Limited Licensed Plumber (LLP) license, and jobs of $25,000 or more a contractor license with the plumbing (CMC-A) classification. Plumbers employed by a licensed plumber or contractor can work without their own license.",
      licenseSteps: [
        { title: "Apprentice", detail: "Work for a licensed plumber or contractor." },
        { title: "Local journeyman license (big cities)", detail: "Nashville, Memphis and other cities with their own codes offices license plumbers locally." },
        { title: "Limited Licensed Plumber (LLP)", detail: "State license and exam for jobs under $25,000 outside those cities." },
        { title: "Plumbing contractor (CMC-A)", detail: "For jobs of $25,000 or more." },
      ],
      licenseAgency: LLP,
      training: [UA_572, ABC_TN, TCAT],
      ownBusiness: "Contracting plumbing in Tennessee takes an LLP or local license for small jobs and the CMC-A contractor license at $25,000 and up.",
    }),
    t("painter", {
      outlook: ol([5090, 5640, 11, 470]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("painters"),
      training: [LEARN_ON_JOB("Painting contractors"), national("Painters union (IUPAT)", "iupat-painter-apprenticeship", "Union painter apprenticeships.")],
    }),
    t("concrete-worker", {
      outlook: ol([3920, 4270, 9, 310]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("concrete finishers"),
      training: [LEARN_ON_JOB("Concrete and site contractors"), TCAT],
    }),
    t("drywall-installer", {
      outlook: ol([1340, 1470, 10, 110]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("drywall installers"),
      training: [CARPENTERS, LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([790, 920, 17, 80]),
      stateLicense: "none",
      licenseSummary:
        "Tennessee's elevator law registers and inspects elevators and licenses the inspectors, but it has no state license for elevator mechanics. Mechanics train through their employer, often the union's NEIEP program.",
      licenseAgency: ELEVATOR_LAW,
      training: [NEIEP],
    }),
    t("flooring-installer", {
      outlook: ol([610, 710, 17, 50]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("flooring installers"),
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([1460, 1690, 16, 150]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("glaziers"),
      training: [LEARN_ON_JOB("Glass and window contractors"), national("Glaziers union (IUPAT)", "iupat-glazier-apprenticeship", "Union glazier apprenticeships.")],
    }),
    t("insulation-installer", {
      outlook: ol([1180, 1300, 10, 110]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("insulation installers"),
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([1970, 2250, 14, 190]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("ironworkers"),
      training: [national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork."), TCAT],
    }),
    t("mason", {
      outlook: ol([1830, 2170, 19, 180]),
      stateLicense: "none",
      licenseSummary:
        "Tennessee has no license for masons who work for a contractor. Masonry subcontractors need a state license when the masonry work is $100,000 or more, and general contractors at $25,000.",
      licenseAgency: MASONRY,
      training: [TCAT, national("Bricklayers union (BAC)", "bac-bricklayer-apprenticeship", "Union apprenticeships for brick, block and stone masons."), LEARN_ON_JOB("Masonry contractors")],
    }),
    t("millwright", {
      outlook: ol([1050, 1200, 14, 110]),
      stateLicense: "none",
      licenseSummary: "Tennessee has no state license for millwrights. Employers hire on training, experience and precision.",
      training: [TCAT, national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary:
        "Tennessee has no license for individual pipefitters. Mechanical and piping contractors need a state contractor license on jobs of $25,000 or more.",
      training: [UA_572, TCAT],
    }),
    t("plasterer-stucco-mason", {
      stateLicense: "none",
      licenseSummary: noTradeLicense("plasterers"),
      payNote: "BLS doesn't publish Tennessee figures for this small trade, so pay is the national figure and there is no Tennessee job projection.",
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([2620, 3150, 20, 250]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("roofers"),
      training: [LEARN_ON_JOB("Roofing contractors"), national("Roofers union training", "roofers-union-apprenticeship", "Union roofing and waterproofing apprenticeships.")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([2620, 2920, 11, 250]),
      stateLicense: "none",
      licenseSummary: "Tennessee has no license for sheet metal workers. HVAC ductwork contractors follow the state's contractor license rules at $25,000 and up.",
      training: [TCAT, national("Sheet metal apprenticeships (SMART)", "smart-sheet-metal-apprenticeship", "Union sheet metal apprenticeships, including Local 4 in Memphis.")],
    }),
    t("solar-installer", {
      stateLicense: "none",
      licenseSummary: "Tennessee has no solar license. The wiring side of a solar job is electrical work, which follows the state's electrical licensing.",
      payNote: "BLS doesn't publish Tennessee figures for solar installers, so pay is the national figure, and Tennessee has no projection for this small, fast-changing trade.",
      training: [NASH_JATC, TCAT],
    }),
    t("sprinkler-fitter", {
      stateLicense: "contractor",
      licenseSummary:
        "Tennessee's State Fire Marshal registers fire sprinkler contractors, and each one must have a licensed Responsible Managing Employee on staff. The law treats home and commercial systems the same. Fitters start by working for a registered contractor.",
      licenseSteps: [
        { title: "Apprentice fitter", detail: "Work for a registered sprinkler contractor. Union apprenticeships run five years." },
        { title: "Journey fitter", detail: "Install and test systems on your own." },
        { title: "NICET certification (optional)", detail: "National certifications in sprinkler layout or inspection." },
        { title: "Responsible Managing Employee", detail: "The state-licensed person every sprinkler contractor needs on staff." },
      ],
      licenseAgency: SPRINKLER,
      training: [UA_669],
      ownBusiness: "Opening a sprinkler company in Tennessee takes State Fire Marshal registration, a licensed Responsible Managing Employee and insurance.",
    }),
    t("tile-setter", {
      outlook: ol([610, 700, 15, 50]),
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
      title: "Dual Enrollment Grant at a TCAT",
      detail:
        "Any high school student, grades 9 to 12, can qualify for the Dual Enrollment Grant at a Tennessee College of Applied Technology. It pays for up to 1,296 clock hours, and students keep a 2.0 GPA in their courses.",
      source: DEG,
    },
    {
      title: "TN Promise",
      detail:
        "Tennessee high school graduates can attend a community college or TCAT tuition-free. Seniors apply in the fall (the Class of 2026 deadline was November 3, 2025) and complete the FAFSA and community service.",
      source: { label: "Tennessee Higher Education Commission, TN Promise application (Aug. 2025)", url: "https://www.tn.gov/thec/news/2025/8/1/tn-promise-application-now-open.html" },
    },
    {
      title: "Apprenticeships that start in high school",
      detail: "Some districts run pre-apprenticeships and apprenticeships for students. Rutherford County Schools, for example, offers them in fields including plumbing.",
      source: { label: "TN Department of Labor, November 2024 apprenticeship newsletter", url: "https://www.tn.gov/workforce/newsletter/2024/november-apprenticeship.html" },
    },
    {
      title: "Be Pro Be Proud TN",
      detail: "A mobile workshop led by the Tennessee Chamber of Commerce visits middle and high schools with simulators for electrical, plumbing, HVAC, carpentry and heavy equipment.",
      source: { label: "WKRN, Be Pro Be Proud mobile workshop tours Tennessee", url: "https://news.yahoo.com/pro-proud-mobile-workshop-travels-185225855.html" },
    },
  ],
  adults: [
    {
      title: "TN Reconnect",
      detail: "A last-dollar grant that covers remaining tuition and fees for adults at a TCAT or community college, after other aid.",
      source: { label: "TN Reconnect Grant", url: "https://tnreconnect.gov/Tennessee-Reconnect-Grant" },
    },
    {
      title: "Apprenticeship TN",
      detail:
        "Tennessee became its own State Apprenticeship Agency in 2022. Its Office of Apprenticeship now partners with ABC Greater Tennessee for construction and with Go Build Tennessee for skilled-trades outreach.",
      source: APPRENTICESHIP_TN,
    },
    {
      title: "Union and open-shop training centers",
      detail:
        "Electrical JATCs in Nashville, Memphis, Chattanooga, Knoxville and Oak Ridge, Plumbers & Pipefitters Local 572 in Nashville, and ABC Greater Tennessee's academies in Nashville and Knoxville all train while you work.",
      source: { label: "ServiceTitan, Tennessee electrician apprenticeships", url: "https://servicetitan.com/blog/electrician-schools-in-tennessee" },
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Tennessee statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Plasterers and solar installers, national wages, May 2025 (BLS via O*NET; no Tennessee estimate published)", url: "https://www.onetonline.org/link/localwages/47-2161.00?st=TN" },
    { label: "Tennessee long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=TN" },
    BLC_OTHER,
    LLE,
    LLP,
    HI,
    MASONRY,
    SPRINKLER,
    ELEVATOR_LAW,
    DEG,
    APPRENTICESHIP_TN,
    { label: "TN Department of Labor: six apprenticeship intermediaries (Oct. 2026)", url: "https://www.tn.gov/workforce/general-resources/news/2026/10/27/tennessee-announces-six-apprenticeship-intermediaries-to-expand-opportunities-statewide.html" },
    { label: "ABC Greater Tennessee, Construction Trades Academy", url: "https://abctn.org/registered-apprenticeship-in-tennessee-a-guide-for-contractors-and-employers/" },
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
