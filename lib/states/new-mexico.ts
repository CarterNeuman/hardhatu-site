// New Mexico state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is New Mexico-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, UA_669, NEIEP, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "New Mexico";

const CID: SourceRef = { label: "New Mexico Construction Industries Division (CID), Regulation and Licensing Department", url: "https://www.rld.nm.gov/construction-industries/" };
const CID_APPLY: SourceRef = { label: "CID, apply for a construction industries license (qualifying party, bond, workers' comp)", url: "https://www.rld.nm.gov/construction-industries/apply-for-a-construction-industries-license/" };
const CLASSIFICATIONS: SourceRef = { label: "14.6.6 NMAC, New Mexico contractor license classifications and scopes", url: "https://srca.nm.gov/parts/title14/14.006.0006.html" };
const JOURNEYMAN_RULE: SourceRef = { label: "14.6.4 NMAC, New Mexico journeyman certificates of competence", url: "https://srca.nm.gov/parts/title14/14.006.0004.html" };
const CE: SourceRef = { label: "CID, continuing education (16 hours every 3 years for journeymen)", url: "https://www.rld.nm.gov/construction-industries/continuing-education/" };
const HANDYMAN: SourceRef = { label: "NMSA 60-13-3, Construction Industries Licensing Act exemptions (handyman up to $7,200 a year)", url: "https://www.rld.nm.gov/wp-content/uploads/2021/06/Construction-Industries-Licensing-Act-Section-60-13-3.pdf" };
const ELEVATOR: SourceRef = { label: "CID, Elevator Bureau (Elevator Safety Act, in effect July 1, 2025)", url: "https://www.rld.nm.gov/construction-industries/elevator-bureau/" };
const ELEVATOR_APP: SourceRef = { label: "CID, Journeyman Elevator Mechanic application", url: "https://www.rld.nm.gov/wp-content/uploads/2026/08/JEM-APP.pdf" };
const SOLAR_RULE: SourceRef = { label: "14.5.2.8(F) NMAC, licensing for solar photovoltaic work", url: "https://www.srca.nm.gov/parts/title14/14.005.0002.html" };
const BOND_RULE: SourceRef = { label: "14.6.3 NMAC, New Mexico contractor licensing ($10,000 bond, qualifying party)", url: "https://srca.nm.gov/parts/title14/14.006.0003.html" };
const DUAL_CREDIT: SourceRef = { label: "New Mexico Higher Education Department, dual credit", url: "https://hed.nm.gov/resources-for-schools/public_schools/dual-credit" };
const DUAL_CREDIT_REPORT: SourceRef = { label: "New Mexico Higher Education Department, 2024-25 dual credit report", url: "https://hed.nm.gov/uploads/documents/2024_25_Final_DC_Report.pdf" };
const OPPORTUNITY: SourceRef = { label: "New Mexico Higher Education Department, Opportunity Scholarship (free college)", url: "https://hed.nm.gov/free-college-nm" };
const APPRENTICESHIP_RULE: SourceRef = { label: "11.2.3 NMAC, New Mexico apprenticeship (minimum age 16)", url: "https://www.srca.nm.gov/parts/title11/11.002.0003.html" };
const DWS_PRESENTATION: SourceRef = { label: "NM Department of Workforce Solutions, pre-apprenticeship and apprenticeship (legislative presentation, Nov. 2024)", url: "https://nmlegis.gov/handouts/ERDPC%20111324%20Item%202%20Pre-Apprenticeship%20and%20Apprenticeship.pdf" };
const YOUTH_APPRENTICESHIP: SourceRef = { label: "Grant County Beat, New Mexico launches first youth apprenticeship program (May 2024)", url: "https://grantcountybeat.com/news/non-local-news-releases/nm-launches-first-ever-youth-apprenticeship-program-innovative" };
const CNM_WIOA: SourceRef = { label: "CNM, WIOA tuition assistance through New Mexico Workforce Connection", url: "https://www.cnm.edu/depts/financial-aid/scholarships/wioa" };

const NM_JATC: TrainingOption = {
  name: "New Mexico JATC for the Electrical Industry (IBEW Local 611)",
  kind: "union",
  where: "Albuquerque",
  detail: "Paid union electrical apprenticeships. Apprentices work full-time year-round and take class one night a week; no electrical knowledge is needed to start.",
  url: "https://nmjatc.org/",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const UA_412: TrainingOption = {
  name: "UA Local 412 (Southwest Piping Institute)",
  kind: "union",
  where: "Four training locations, plus a mobile classroom for rural New Mexico",
  detail: "A five-year paid apprenticeship in plumbing, pipefitting, HVAC service and pipe welding: over 10,000 hours on the job and over 1,200 classroom hours.",
  url: "https://ualocal412.org/join-412",
};
const ABC_NM: TrainingOption = {
  name: "ABC New Mexico apprenticeships",
  kind: "open-shop",
  where: "Statewide",
  detail: "Open-shop apprenticeships in carpentry, electrical, HVAC, sheet metal, plumbing and telecommunications.",
  url: "https://www.abcnm.org/",
};
const CNM: TrainingOption = {
  name: "Central New Mexico Community College (CNM)",
  kind: "college",
  where: "Albuquerque",
  detail: "Programs in electrical trades, plumbing and gas fitting, HVACR, welding, and carpentry and construction.",
  url: "https://www.cnm.edu/programs/skilled-trades-arts",
};
const NM_COLLEGES: TrainingOption = {
  name: "New Mexico community colleges",
  kind: "college",
  where: "Including Doña Ana Community College (Las Cruces), Santa Fe Community College and San Juan College (Farmington)",
  detail: "Certificates and degrees in building construction, electrical, plumbing, HVAC, welding and solar.",
  url: "https://catalogs.nmsu.edu/dona-ana/academic-career-programs/",
};
const IRONWORKERS_495: TrainingOption = {
  name: "Iron Workers Local 495",
  kind: "union",
  where: "New Mexico",
  detail: "Union ironworker apprenticeships with their own training facility.",
  url: "https://www.impact-net.org/news/2022/05/23/the-governor-of-new-mexico-visits-iron-workers-local-495",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const businessOnly = (what: string, cls: string) =>
  `New Mexico has no license for individual ${what}, but the business needs a state contractor license from the Construction Industries Division (${cls}), held through a qualifying party who passed a trade exam and a business and law exam.`;
const noClassification = (what: string) =>
  `New Mexico has no license for ${what}, and the Construction Industries Division has no classification for this work. CID can assign a miscellaneous specialty license case by case, so businesses should check with CID.`;

export const NEW_MEXICO: StateGuide = {
  // New Mexico ZIP codes run 870xx-884xx.
  locationHints: { zip3: [[870, 884]], cities: ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe", "Roswell", "Farmington", "Clovis", "Hobbs"] },
  slug: "new-mexico",
  code: "NM",
  name: S,
  lastVerified: "2026-11-19",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "New Mexico long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=NM",
  },
  intro:
    "A field guide to 25 construction trades in New Mexico: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ about 45,600 people in New Mexico, and the state projects about 4,200 openings a year across them through 2034.",
    "Dual credit is free: public colleges waive tuition and general fees for high school students, and the high school provides the textbooks. About 20,000 students took dual credit in 2024-25.",
    "The Opportunity Scholarship can cover up to 100% of tuition and fees at New Mexico public colleges for residents of any age, including career training certificates.",
    "Electricians, plumbers, pipefitters, HVAC refrigeration workers, sheet metal workers and sprinkler fitters need a state journeyman certificate from the Construction Industries Division, and elevator mechanics have needed one since July 2025.",
    "Almost every construction business needs a state contractor license, even in trades where workers need none. The exception is handyman work that pays no more than $7,200 a year in total, one project at a time, with a yearly declaration filed with CID and no electrical, plumbing or gas work.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "Dual credit tuition for high schoolers", value: "$0", note: "Public colleges waive tuition and general fees; the high school provides textbooks" },
  licensingOverview:
    "The Construction Industries Division (CID) of the Regulation and Licensing Department issues contractor licenses by classification, from general building (GB-2, GB-98) to specialties like drywall (GS-7), roofing (GS-21) and masonry (GS-16). Every licensed business needs a qualifying party who passed a trade exam and a business and law exam, a $10,000 bond and workers' comp. Workers in electrical, plumbing, pipefitting, sheet metal, refrigeration and fire sprinkler work also need a CID journeyman certificate, and elevator mechanics have needed one since the Elevator Safety Act took effect in 2025.",
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
      "Contractor licenses come from the state, through the Construction Industries Division, and cover all of New Mexico.",
      "You can start small. Handyman work that pays no more than $7,200 a year needs no contractor license if you file a yearly declaration with CID, though it can't include electrical, plumbing or gas work.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off. New Mexico contractors also carry a $10,000 bond and workers' comp.",
      "Income swings with the season and the economy, and customers don't always pay on time.",
    ],
    path:
      "The usual route: work for someone else for years, earn your journeyman certificate, become a qualifying party, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      HANDYMAN,
      BOND_RULE,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([14480, 16030, 11, 1350]),
      stateLicense: "none",
      licenseSummary: "New Mexico has no license for construction laborers, since people working for wages are exempt. It is the biggest trade on this page and the most common way into construction.",
      licenseAgency: HANDYMAN,
      training: [UA_412, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([5570, 6270, 13, 580]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "New Mexico requires electricians to hold a journeyman certificate from the Construction Industries Division. The EE-98J journeyman certificate takes four years (8,000 hours) of experience plus an exam, and a residential ER-1J certificate takes two years. Instead of a master license, the top level is the qualifying party certificate that an electrical contractor's license rests on. Journeymen take 16 hours of continuing education every three years.",
      licenseSteps: [
        { title: "Apprentice", detail: "Work under the direct supervision of a certified journeyman at a licensed contractor." },
        { title: "Journeyman electrician (EE-98J)", detail: "Four years (8,000 hours) of experience plus the exam (75% to pass). The residential ER-1J takes two years." },
        { title: "Qualifying party", detail: "Pass the trade exam and a business and law exam to qualify an electrical contractor (EE-98 or ER-1)." },
        { title: "Keep it current", detail: "16 hours of continuing education every three years, half on the electrical code." },
      ],
      licenseAgency: JOURNEYMAN_RULE,
      extraCredentials: ["New Mexico EE-98J or ER-1J journeyman electrician certificate"],
      training: [NM_JATC, ABC_NM, CNM, NM_COLLEGES],
      businessNote: "Running one in New Mexico takes an EE-98 or ER-1 contractor license with a qualifying party, a $10,000 bond and workers' comp.",
    }),
    t("equipment-operator", {
      outlook: ol([5180, 5600, 8, 480]),
      stateLicense: "contractor",
      licenseSummary: businessOnly("equipment operators", "for example GS-8 earthmoving and excavating"),
      licenseAgency: CLASSIFICATIONS,
      training: [national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([2540, 2700, 6, 270]),
      stateLicense: "none",
      licenseSummary: "New Mexico has no general welding license. Pipe welders on plumbing and mechanical work add a JW welder certificate on top of a plumbing, pipefitting or sheet metal journeyman certificate, and structural steel companies need a GS-24 contractor license.",
      licenseAgency: JOURNEYMAN_RULE,
      training: [UA_412, CNM, NM_COLLEGES],
    }),
    t("hvac-technician", {
      outlook: ol([1930, 2120, 10, 190]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "New Mexico requires mechanical workers to hold a journeyman certificate from the Construction Industries Division, such as refrigeration (JR, which also needs EPA refrigerant certification), sheet metal (JSM) or pipefitter (JPF). These take two years of experience plus an exam. HVAC businesses need an MM-3 or MM-98 contractor license.",
      licenseSteps: [
        { title: "Apprentice", detail: "Work under a certified journeyman at a licensed contractor. EPA 608 certification is required to handle refrigerants." },
        { title: "Mechanical journeyman", detail: "Two years of experience plus the exam for refrigeration, sheet metal or pipefitting." },
        { title: "Qualifying party", detail: "Four years of experience plus the trade and business and law exams to qualify an MM-3 or MM-98 contractor." },
        { title: "Keep it current", detail: "16 hours of continuing education every three years." },
      ],
      licenseAgency: JOURNEYMAN_RULE,
      extraCredentials: ["New Mexico mechanical journeyman certificate (JR, JSM or JPF)"],
      training: [UA_412, ABC_NM, CNM, NM_COLLEGES],
      businessNote: "Running one in New Mexico takes an MM-3 or MM-98 contractor license with a qualifying party, a $10,000 bond and workers' comp.",
    }),
    t("carpenter", {
      outlook: ol([4380, 4660, 7, 350]),
      stateLicense: "contractor",
      licenseSummary: businessOnly("carpenters", "GS-13 framing, or GB-2 or GB-98 general building"),
      licenseAgency: CLASSIFICATIONS,
      training: [ABC_NM, CNM, national("Carpenters union (UBC) training", "ubc-carpenter-apprenticeship", "Union carpentry apprenticeships.")],
    }),
    t("plumber", {
      outlook: ol([3160, 3380, 7, 290]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "New Mexico requires plumbers to hold a journeyman certificate from the Construction Industries Division: plumber (JP), gas fitter (JG) or both (JPG). Each takes two years of experience plus an exam. Plumbing businesses need an MM-1 or MM-98 contractor license with a qualifying party.",
      licenseSteps: [
        { title: "Apprentice", detail: "Work under a certified journeyman at a licensed contractor." },
        { title: "Journeyman plumber (JP)", detail: "Two years of experience plus the exam (75% to pass). Gas fitting has its own JG certificate, or both together as JPG." },
        { title: "Qualifying party", detail: "Four years of experience plus the trade and business and law exams to qualify a plumbing contractor." },
        { title: "Keep it current", detail: "16 hours of continuing education every three years." },
      ],
      licenseAgency: JOURNEYMAN_RULE,
      extraCredentials: ["New Mexico journeyman plumber certificate (JP or JPG)"],
      training: [UA_412, ABC_NM, CNM],
      ownBusiness: "Running a plumbing business in New Mexico takes an MM-1 or MM-98 contractor license with a qualifying party, a $10,000 bond and workers' comp.",
    }),
    t("painter", {
      outlook: ol([1940, 2050, 6, 160]),
      stateLicense: "none",
      licenseSummary: noClassification("painters"),
      licenseAgency: CLASSIFICATIONS,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([1490, 1550, 4, 110]),
      stateLicense: "contractor",
      licenseSummary: businessOnly("concrete finishers", "GS-4 concrete"),
      licenseAgency: CLASSIFICATIONS,
      training: [LEARN_ON_JOB("Concrete and site contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([600, 640, 6, 50]),
      stateLicense: "contractor",
      licenseSummary: businessOnly("drywall installers", "GS-7 drywall"),
      licenseAgency: CLASSIFICATIONS,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      stateLicense: "worker-certification",
      licenseSummary:
        "Since New Mexico's Elevator Safety Act took effect on July 1, 2025, elevator mechanics need a Journeyman Elevator Mechanic certificate from the Construction Industries Division. It takes four years (8,000 hours) of experience plus an exam, or a national elevator program card (NAEC CET or IUEC), which replaces both. Apprentices can work under supervision, and elevator contractors must be licensed.",
      licenseSteps: [
        { title: "Apprentice", detail: "Work under a licensed mechanic for a licensed elevator contractor." },
        { title: "Training program", detail: "The union's NEIEP program, the Certified Elevator Technician program or a registered elevator apprenticeship." },
        { title: "Journeyman Elevator Mechanic", detail: "Four years (8,000 hours) of experience plus an exam, or a national program card. $75, good for three years." },
        { title: "Keep it current", detail: "At least 8 hours of continuing education to renew." },
      ],
      licenseAgency: ELEVATOR_APP,
      extraCredentials: ["New Mexico Journeyman Elevator Mechanic certificate"],
      payNote: "New Mexico publishes no job projection for this small trade.",
      training: [NEIEP],
      ownBusiness: "Elevator companies need a New Mexico elevator contractor license and licensed mechanics, so most mechanics work for established companies.",
    }),
    t("flooring-installer", {
      outlook: ol([160, 170, 5, 10]),
      stateLicense: "none",
      licenseSummary: noClassification("flooring installers"),
      licenseAgency: CLASSIFICATIONS,
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([460, 480, 5, 40]),
      stateLicense: "contractor",
      licenseSummary: businessOnly("glaziers", "GS-14 windows, doors and glazing"),
      licenseAgency: CLASSIFICATIONS,
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([270, 280, 6, 20]),
      stateLicense: "contractor",
      licenseSummary: businessOnly("insulation installers", "GS-1 insulation"),
      licenseAgency: CLASSIFICATIONS,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([100, 110, 6, 10]),
      stateLicense: "contractor",
      licenseSummary: businessOnly("ironworkers", "GS-24 structural steel erection"),
      licenseAgency: CLASSIFICATIONS,
      payNote: "BLS doesn't publish New Mexico pay for ironworkers, so pay is the national figure.",
      ownBusiness: "Steel erection companies need heavy equipment, big insurance policies and a GS-24 contractor license, so most ironworkers work for established firms.",
      training: [IRONWORKERS_495, national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork.")],
    }),
    t("mason", {
      outlook: ol([380, 400, 5, 30]),
      stateLicense: "contractor",
      licenseSummary: businessOnly("masons", "GS-16 masonry, which covers brick, stone, block and adobe"),
      licenseAgency: CLASSIFICATIONS,
      training: [LEARN_ON_JOB("Masonry contractors"), national("Bricklayers union (BAC)", "bac-bricklayer-apprenticeship", "Union apprenticeships for brick, block and stone masons.")],
    }),
    t("millwright", {
      outlook: ol([70, 70, 1, 10]),
      stateLicense: "none",
      licenseSummary: "New Mexico has no license for millwrights, and no contractor classification covers industrial machinery work. Employers hire on training, experience and precision.",
      licenseAgency: CLASSIFICATIONS,
      training: [national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "New Mexico requires pipefitters to hold a JPF journeyman certificate from the Construction Industries Division, which takes two years of experience plus an exam. Piping businesses need an MM-4 or MM-98 contractor license.",
      licenseSteps: [
        { title: "Apprentice", detail: "Work under a certified journeyman at a licensed contractor." },
        { title: "Journeyman pipefitter (JPF)", detail: "Two years of experience plus the exam." },
        { title: "Pipe welder (JW, optional)", detail: "Add a JW welder certificate for code pipe welding." },
        { title: "Qualifying party", detail: "Four years of experience plus the trade and business and law exams to qualify an MM-4 or MM-98 contractor." },
      ],
      licenseAgency: JOURNEYMAN_RULE,
      extraCredentials: ["New Mexico journeyman pipefitter certificate (JPF)"],
      ownBusiness: "Piping contractors need crews, insurance and an MM-4 or MM-98 contractor license with a qualifying party.",
      training: [UA_412],
    }),
    t("plasterer-stucco-mason", {
      outlook: ol([400, 430, 6, 30]),
      stateLicense: "contractor",
      licenseSummary: businessOnly("plasterers", "GS-30 plastering, stucco and lathing"),
      licenseAgency: CLASSIFICATIONS,
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([1320, 1430, 8, 100]),
      stateLicense: "contractor",
      licenseSummary: businessOnly("roofers", "GS-21 roofing"),
      licenseAgency: CLASSIFICATIONS,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([700, 720, 4, 60]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "New Mexico requires sheet metal workers on HVAC ductwork to hold a JSM journeyman certificate from the Construction Industries Division, which takes two years of experience plus an exam. Gutters and flashing fall under a separate GS-32 contractor license with no worker certificate.",
      licenseAgency: JOURNEYMAN_RULE,
      extraCredentials: ["New Mexico journeyman sheet metal certificate (JSM)"],
      training: [ABC_NM, national("Sheet metal apprenticeships (SMART)", "smart-sheet-metal-apprenticeship", "Union sheet metal apprenticeships.")],
    }),
    t("solar-installer", {
      outlook: ol([200, 260, 29, 30]),
      stateLicense: "none",
      licenseSummary: "New Mexico has no separate solar license, but solar wiring is electrical work: installers must hold an electrical journeyman certificate or work as supervised apprentices, and the business needs an electrical contractor license.",
      licenseAgency: SOLAR_RULE,
      training: [NM_COLLEGES, NM_JATC],
    }),
    t("sprinkler-fitter", {
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "New Mexico requires fire sprinkler workers to hold a journeyman certificate from the Construction Industries Division, either a JS sprinkler certificate (two years) or an MS-12J fire protection certificate (four years), plus an exam. Sprinkler businesses need an MS-12 fire protection contractor license.",
      licenseSteps: [
        { title: "Apprentice fitter", detail: "Work under a certified journeyman. Union apprenticeships run five years." },
        { title: "Journeyman certificate", detail: "JS (two years) or MS-12J (four years) of experience plus the exam." },
        { title: "NICET certification", detail: "National certifications in sprinkler layout or inspection." },
        { title: "Qualifying party", detail: "Pass the trade and business and law exams to qualify an MS-12 contractor." },
      ],
      licenseAgency: CLASSIFICATIONS,
      extraCredentials: ["New Mexico fire sprinkler journeyman certificate (JS or MS-12J)"],
      training: [UA_669],
      ownBusiness: "Opening a sprinkler company in New Mexico takes an MS-12 contractor license with a qualifying party, a $10,000 bond and workers' comp.",
    }),
    t("tile-setter", {
      outlook: ol([260, 290, 11, 20]),
      stateLicense: "none",
      licenseSummary: noClassification("tile setters"),
      licenseAgency: CLASSIFICATIONS,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "contractor",
      licenseSummary: businessOnly("waterproofing installers", "GS-1, which covers waterproof membranes and coatings"),
      licenseAgency: CLASSIFICATIONS,
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Free dual credit",
      detail:
        "New Mexico's public colleges waive tuition and general fees for dual credit, and the high school provides textbooks. Career and technical courses count when they apply to a college certificate or degree. Special course fees may still apply.",
      source: DUAL_CREDIT,
    },
    {
      title: "Dual credit is common",
      detail: "20,121 New Mexico students took 53,017 dual credit courses in the 2024-25 school year.",
      source: DUAL_CREDIT_REPORT,
    },
    {
      title: "Youth apprenticeships",
      detail: "New Mexico apprenticeships start at age 16, and the state approved its first youth apprenticeship program, for ages 16 to 24, in 2024.",
      source: YOUTH_APPRENTICESHIP,
    },
  ],
  adults: [
    {
      title: "Opportunity Scholarship",
      detail:
        "Covers up to 100% of tuition and required fees at New Mexico public colleges for residents of any age taking at least 6 credit hours, including credit-bearing career training certificates. It doesn't cover books or housing.",
      source: OPPORTUNITY,
    },
    {
      title: "Paid pre-apprenticeships",
      detail: "The state Department of Workforce Solutions pays pre-apprentices' wages for up to 10 weeks, and New Mexico had about 2,550 registered apprentices in late 2024.",
      source: DWS_PRESENTATION,
    },
    {
      title: "Workforce Connection tuition help",
      detail: "Eligible adults can get help paying for training through New Mexico Workforce Connection centers; CNM lists up to $9,000 in tuition assistance.",
      source: CNM_WIOA,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, New Mexico statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Plasterers, New Mexico wages, May 2025 (BLS via O*NET)", url: "https://www.onetonline.org/link/localwages/47-2161.00?st=NM" },
    { label: "Ironworkers, national wages, May 2025 (BLS; no New Mexico estimate published)", url: "https://www.onetonline.org/link/localwages/47-2221.00?st=NM" },
    { label: "New Mexico long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=NM" },
    CID,
    CID_APPLY,
    CLASSIFICATIONS,
    JOURNEYMAN_RULE,
    CE,
    HANDYMAN,
    BOND_RULE,
    ELEVATOR,
    ELEVATOR_APP,
    SOLAR_RULE,
    DUAL_CREDIT,
    OPPORTUNITY,
    APPRENTICESHIP_RULE,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
