// Arkansas state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Arkansas-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, UA_669, NEIEP, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Arkansas";

const ACLB: SourceRef = {
  label: "Levelset, Arkansas contractor licensing ($50,000 commercial, $2,000 residential; Contractors Licensing Board)",
  url: "https://www.levelset.com/blog/arkansas-contractor-licensing-guide",
};
const ELECTRICAL: SourceRef = {
  label: "Arkansas Department of Labor and Licensing, Electrical Inspection and Licensing (Board of Electrical Examiners)",
  url: "https://labor.arkansas.gov/labor/code-enforcement/electrical-inspection-and-licensing/",
};
const ELECTRICAL_HOURS: SourceRef = {
  label: "Workiz, Arkansas electrical license requirements (8,000 hours journeyman, 2,000 more for master)",
  url: "https://www.workiz.com/blog/tips-tricks/arkansas-electrical-license-requirements/",
};
const PLUMBING: SourceRef = {
  label: "Arkansas Department of Health, rules for master, journeyman and apprentice plumber licenses",
  url: "https://healthy.arkansas.gov/wp-content/uploads/Plumbing-Licensing-Rules.pdf",
};
const HVACR: SourceRef = {
  label: "Arkansas HVACR Licensing Board rules (Class A-E licenses and registrants), Department of Labor and Licensing",
  url: "https://www.law.cornell.edu/regulations/arkansas/235-13-22-Ark-Code-R-005",
};
const ELEVATOR: SourceRef = { label: "Arkansas Department of Labor and Licensing, Elevator Safety Division", url: "https://labor.arkansas.gov/" };
const SPRINKLER: SourceRef = {
  label: "Arkansas Fire Protection Licensing Board, sprinkler company licensing",
  url: "https://labor.arkansas.gov/licensing/fire-protection-licensing-board/licensing-information/",
};
const ACEF_SRC: SourceRef = {
  label: "Arkansas Money & Politics, ACEF training programs (over 15,000 apprentices since 1994)",
  url: "https://workhands.com/news/building-tomorrow-acef-training-programs-making-progress-in-filling-state-s-labor-gap-arkansas-money-politics",
};
const YOUTH_ELECTRICAL: SourceRef = {
  label: "Staley Electric, Arkansas youth electrical apprenticeship for 16- and 17-year-olds",
  url: "https://staleyelectric.applytojob.com/apply/hkVT7I6by1/Youth-Apprenticeship-Program",
};
const WORKFORCE_CHALLENGE: SourceRef = { label: "Arkansas Division of Higher Education, Arkansas Workforce Challenge Scholarship", url: "https://sams.adhe.edu/Scholarship/Details/AWC" };

const ACEF: TrainingOption = {
  name: "Arkansas Construction Education Foundation (ACEF)",
  kind: "open-shop",
  where: "Little Rock, with classes in other cities around the state",
  detail:
    "The state's largest construction apprenticeship program, using NCCER curriculum: two- and four-year apprenticeships while you work for a sponsoring employer. ACEF has trained over 15,000 apprentices since 1994.",
  url: "https://workhands.com/news/building-tomorrow-acef-training-programs-making-progress-in-filling-state-s-labor-gap-arkansas-money-politics",
};
const ABC_AR: TrainingOption = {
  name: "ABC Arkansas, Arkansas Construction Trades Academy",
  kind: "open-shop",
  where: "North Little Rock",
  detail: "Registered apprenticeships run by the Associated Builders and Contractors of Arkansas, including electrical, plumbing, masonry and HVAC.",
  url: "https://www.constructionexec.com/article/filling-a-void-in-arkansas",
};
const AR_JATCS: TrainingOption = {
  name: "IBEW electrical JATCs",
  kind: "union",
  where: "Little Rock (Local 295), El Dorado (Local 436), Fort Smith and Jonesboro",
  detail: "Paid union electrical apprenticeships run by IBEW locals and NECA contractors.",
  url: "https://tradecolleges.org/apprenticeships-in/arkansas/electrician",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const AR_COLLEGES: TrainingOption = {
  name: "Arkansas two-year colleges",
  kind: "college",
  where: "Campuses including UA-Pulaski Tech (North Little Rock) and ASU-Beebe",
  detail: "Technical certificates in electrical, HVAC, welding and construction, and evening classes for registered apprentices. Many short programs qualify for the Workforce Challenge Scholarship.",
  url: "https://www.servicetitan.com/blog/electrician-schools-in-arkansas",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noTradeLicense = (what: string) =>
  `Arkansas has no license for ${what}. Contractors need a state license on commercial jobs of $50,000 or more and on home jobs over $2,000.`;

export const ARKANSAS: StateGuide = {
  // Arkansas ZIP codes run 716xx-729xx.
  locationHints: { zip3: [[716, 729]], cities: ["Little Rock", "Fayetteville", "Fort Smith", "Jonesboro", "Springdale", "Conway"] },
  slug: "arkansas",
  code: "AR",
  name: S,
  lastVerified: "2026-11-16",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Arkansas long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=AR",
  },
  intro:
    "A field guide to 25 construction trades in Arkansas: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ about 60,000 people in Arkansas, and the state projects about 5,700 openings a year across them through 2034.",
    "Arkansas licenses electricians, plumbers and HVAC workers statewide. A journeyman electrician license takes 8,000 hours, about four years, of supervised work.",
    "Students can start early: Arkansas youth electrical apprenticeships let 16- and 17-year-olds log hours toward a license before they graduate.",
    "Home jobs over just $2,000 need a state contractor license, so almost any paid home job counts. Commercial jobs need one at $50,000.",
    "The Arkansas Construction Education Foundation, the state's largest construction apprenticeship program, has trained over 15,000 apprentices since 1994.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "Youth electrical apprentices", value: "Age 16", note: "Start logging hours toward a license in high school" },
  licensingOverview:
    "Arkansas licenses individual tradespeople, not just companies, in three big trades. The Board of Electrical Examiners licenses apprentice, journeyman and master electricians; the Department of Health licenses apprentice, journeyman and master plumbers; and the HVACR Licensing Board issues Class A to E licenses and registers the workers under them. The Contractors Licensing Board requires a license on commercial jobs of $50,000 and home jobs over $2,000. Elevator mechanics and fire sprinkler companies are licensed through the Department of Labor and Licensing.",
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
      "Arkansas has limited licenses for smaller businesses: home remodeling and home improvement licenses come in a limited version for jobs under $50,000.",
      "You can start small. Many owners begin with one truck and side jobs before going full-time.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Arkansas's $2,000 limit means almost any paid home job needs a state license, so plan for it before you take side work.",
    ],
    path:
      "The usual route: work for someone else for years, earn your license, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      ACLB,
      { label: "Housecall Pro, Arkansas home improvement licenses (limited under $50,000)", url: "https://www.housecallpro.com/licensing/handyman/arkansas/" },
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([12480, 13700, 10, 1150]),
      stateLicense: "none",
      licenseSummary: "Arkansas has no license for construction laborers. It is the biggest trade on this page and the most common way into construction.",
      training: [ACEF, AR_COLLEGES, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([9430, 10860, 15, 1010]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Arkansas licenses electricians statewide through the Board of Electrical Examiners. Apprentices register with the board, a journeyman license takes 8,000 hours (about four years) of supervised work plus an exam, and a master license takes about 2,000 more hours as a journeyman. Licensed electricians take 8 hours of continuing education each code cycle.",
      licenseSteps: [
        { title: "Registered apprentice", detail: "Register with the board and work under a licensed journeyman or master. Youth apprenticeships start at 16." },
        { title: "Journeyman electrician", detail: "8,000 hours of supervised work, usually through a registered apprenticeship, plus the state exam." },
        { title: "Master electrician", detail: "About 2,000 more hours as a licensed journeyman, plus the master exam." },
        { title: "Residential licenses (optional)", detail: "Arkansas also has residential journeyman and residential master licenses for home wiring only." },
      ],
      licenseAgency: ELECTRICAL,
      extraCredentials: ["Arkansas journeyman or master electrician license"],
      training: [AR_JATCS, ACEF, ABC_AR, AR_COLLEGES],
      businessNote: "Running one in Arkansas takes a master electrician license, plus a state contractor license on larger jobs.",
    }),
    t("equipment-operator", {
      outlook: ol([5850, 6280, 7, 530]),
      stateLicense: "none",
      licenseSummary: "Arkansas has no state license for equipment operators. Employers look for training records and safe hours in the seat, and some jobs need a commercial driver's license.",
      training: [ACEF, national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([7710, 8180, 6, 820]),
      stateLicense: "none",
      licenseSummary: "Arkansas has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      training: [AR_COLLEGES, LEARN_ON_JOB("Fabrication shops, steel mills and contractors")],
    }),
    t("hvac-technician", {
      outlook: ol([5120, 5790, 13, 520]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Arkansas's HVACR Licensing Board issues five license classes: A and B for installing and servicing systems by size, C for service only, D for sheet metal ductwork and E for refrigeration. Anyone doing HVACR work without one of those licenses must register and work for a licensee.",
      licenseSteps: [
        { title: "Registrant", detail: "Register with the HVACR board and work under a licensed holder. EPA 608 certification is required to handle refrigerants." },
        { title: "Class C (service)", detail: "Service and repair existing systems, without installing or replacing equipment." },
        { title: "Class B or A", detail: "Install and service systems. Class A has no size limit." },
        { title: "Designated license holder", detail: "The licensee responsible for a company's HVACR work." },
      ],
      licenseAgency: HVACR,
      extraCredentials: ["Arkansas HVACR license (Class A to E)"],
      training: [ACEF, ABC_AR, AR_COLLEGES],
      businessNote: "Running one in Arkansas takes a Class A or B HVACR license, plus a state contractor license above the dollar limits.",
    }),
    t("carpenter", {
      outlook: ol([5260, 5620, 7, 420]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("carpenters"),
      training: [ACEF, national("Carpenters union (UBC) training", "ubc-carpenter-apprenticeship", "Union carpentry apprenticeships, including the Arkansas Oklahoma Carpentry Apprenticeship.")],
      businessNote: "Home jobs over $2,000 need an Arkansas residential builder, remodeler or home improvement license.",
    }),
    t("plumber", {
      outlook: ol([3360, 3680, 9, 320]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Arkansas licenses plumbers statewide through the Department of Health's Plumbing and Natural Gas Section. Apprentices register (age 16 and up), journeyman plumbers finish about four years of apprenticeship and pass an exam, and master plumbers add experience as a journeyman and pass another exam. Licenses renew every year.",
      licenseSteps: [
        { title: "Registered apprentice", detail: "Register with the Department of Health and work under a licensed plumber. You can start at 16." },
        { title: "Journeyman plumber", detail: "About 8,000 hours (four years) of apprenticeship, plus the state exam." },
        { title: "Master plumber", detail: "About a year as a journeyman, plus the master exam." },
        { title: "Plumbing business", detail: "Master plumbers can run a business and register apprentices." },
      ],
      licenseAgency: PLUMBING,
      extraCredentials: ["Arkansas journeyman or master plumber license"],
      training: [ACEF, ABC_AR, national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Five-year paid union apprenticeships in plumbing and pipefitting.")],
      ownBusiness: "Running a plumbing business in Arkansas takes a master plumber license, plus a state contractor license above the dollar limits.",
    }),
    t("painter", {
      outlook: ol([1370, 1470, 8, 120]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("painters"),
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([2540, 2630, 3, 180]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("concrete finishers"),
      training: [{ ...ACEF, detail: "ACEF runs a masonry and concrete pre-apprenticeship in Little Rock, alongside its full apprenticeships." }, LEARN_ON_JOB("Concrete and site contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([360, 380, 8, 30]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("drywall installers"),
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([90, 100, 9, 10]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Arkansas licenses elevator mechanics through the Department of Labor and Licensing's Elevator Safety Division. Most people get there through a union or employer training program.",
      licenseSteps: [
        { title: "Helper", detail: "Work under a licensed mechanic while you train." },
        { title: "Training program", detail: "The union's NEIEP program or a similar employer program." },
        { title: "Elevator mechanic license", detail: "Apply to the state once you meet the training and experience rules." },
        { title: "Lead mechanic", detail: "Run installs and service on your own." },
      ],
      licenseAgency: ELEVATOR,
      extraCredentials: ["Arkansas elevator mechanic license"],
      training: [NEIEP],
      ownBusiness: "Elevator work in Arkansas needs licensed mechanics, so most mechanics work for established elevator companies.",
    }),
    t("flooring-installer", {
      outlook: ol([180, 200, 12, 10]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("flooring installers"),
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([400, 430, 8, 40]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("glaziers"),
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([350, 370, 7, 30]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("insulation installers"),
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([940, 1060, 13, 90]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("ironworkers"),
      training: [national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork."), ACEF],
    }),
    t("mason", {
      outlook: ol([720, 790, 9, 60]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("masons"),
      training: [ABC_AR, ACEF, national("Bricklayers union (BAC)", "bac-bricklayer-apprenticeship", "Union apprenticeships for brick, block and stone masons.")],
    }),
    t("millwright", {
      outlook: ol([1080, 1130, 5, 100]),
      stateLicense: "none",
      licenseSummary: "Arkansas has no state license for millwrights. Employers hire on training, experience and precision.",
      training: [ACEF, national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary: "Arkansas has no license for pipefitters on industrial piping. Plumbing and gas piping in buildings falls under the state plumbing license, and contractors need a state license above the dollar limits.",
      training: [ACEF, national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Five-year paid union apprenticeships in pipefitting.")],
    }),
    t("plasterer-stucco-mason", {
      stateLicense: "none",
      licenseSummary: noTradeLicense("plasterers"),
      payNote: "BLS doesn't publish Arkansas figures for this small trade, so pay is the national figure and there is no Arkansas job projection.",
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([1070, 1190, 11, 90]),
      stateLicense: "none",
      licenseSummary:
        "Arkansas has no license for roofers who work for a contractor. Roofing businesses need a residential roofing registration or license for home roofing jobs over $2,000, and a commercial license at $50,000.",
      licenseAgency: ACLB,
      training: [LEARN_ON_JOB("Roofing contractors")],
      businessNote: "Home roofing jobs over $2,000 need an Arkansas residential roofing registration or license.",
    }),
    t("sheet-metal-worker", {
      outlook: ol([920, 1010, 10, 90]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Arkansas treats HVAC ductwork as licensed HVACR work. The Class D license covers sheet metal ductwork, and workers without a license register with the HVACR board and work for a licensee.",
      licenseAgency: HVACR,
      training: [ACEF, national("Sheet metal apprenticeships (SMART)", "smart-sheet-metal-apprenticeship", "Union sheet metal apprenticeships.")],
    }),
    t("solar-installer", {
      outlook: ol([130, 170, 24, 20]),
      stateLicense: "none",
      licenseSummary: "Arkansas has no separate solar license. The wiring side of a solar job is electrical work, which needs Arkansas electrical licensing, and installs follow the contractor limits.",
      training: [AR_JATCS],
    }),
    t("sprinkler-fitter", {
      stateLicense: "contractor",
      licenseSummary:
        "Arkansas's Fire Protection Licensing Board licenses fire sprinkler companies, and each company must have at least one licensed employee. Fitters start by working for a licensed company.",
      licenseSteps: [
        { title: "Apprentice fitter", detail: "Work for a licensed sprinkler company. Union apprenticeships run five years." },
        { title: "Journey fitter", detail: "Installs and tests systems on your own." },
        { title: "NICET certification (optional)", detail: "National certifications in sprinkler layout or inspection." },
        { title: "Licensed employee", detail: "The licensed person every sprinkler company needs on staff." },
      ],
      licenseAgency: SPRINKLER,
      training: [UA_669],
      ownBusiness: "Opening a sprinkler company in Arkansas takes a Fire Protection Licensing Board license, at least one licensed employee and insurance.",
    }),
    t("tile-setter", {
      outlook: ol([250, 280, 13, 20]),
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
      title: "Youth electrical apprenticeships",
      detail:
        "Arkansas lets 16- and 17-year-olds join a youth electrical apprenticeship and log on-the-job hours toward their electrical license before graduating. Contractors such as Staley Electric in Little Rock hire for it.",
      source: YOUTH_ELECTRICAL,
    },
    {
      title: "Certified pre-apprenticeships at career centers",
      detail:
        "Through the Arkansas Certified Pre-Apprenticeship Program, career centers partner with industry. At Arkansas Tech Career Center, students can finish 80 construction credit hours with ABC Arkansas that transfer into electrical, HVAC, plumbing, ironworker and other registered apprenticeships.",
      source: { label: "Arkansas Tech News, new pre-apprenticeship opportunity for ATCC students", url: "https://www.arkansastechnews.com/?p=93165" },
    },
    {
      title: "College credit in high school",
      detail: "The ACCESS to Acceleration program replaces the Concurrent Challenge Scholarship, letting eligible students use lottery scholarship money for concurrent credit courses.",
      source: { label: "Arkansas Division of Higher Education, scholarship changes", url: "https://adhe.edu/about/scholarships" },
    },
    {
      title: "Be Pro Be Proud",
      detail: "Arkansas launched Be Pro Be Proud in 2016, and its mobile workshops bring hands-on trade simulators to schools. Other states have since copied it.",
      source: { label: "Arkansas State Chamber, Be Pro Be Proud mobile workshop (Oct. 2019)", url: "https://www.movinout.com/magazine/arkansas-state-chamber-of-commerce-unveils-second-generation-be-pro-be-proud-mobile-workshop" },
    },
  ],
  adults: [
    {
      title: "Arkansas Workforce Challenge Scholarship",
      detail:
        "A lottery-funded scholarship for short training in high-demand fields, including construction trades, at approved colleges. Awards are tiered by program length (for example, up to $1,500 for 80 to 179 clock hours), and students can receive it once.",
      source: WORKFORCE_CHALLENGE,
    },
    {
      title: "Construction apprenticeships",
      detail: "ACEF in Little Rock and ABC Arkansas's Construction Trades Academy in North Little Rock run registered apprenticeships in the licensed trades while you work.",
      source: ACEF_SRC,
    },
    {
      title: "Union electrical apprenticeships",
      detail: "IBEW training centers in Little Rock, El Dorado, Fort Smith and Jonesboro run paid electrical apprenticeships.",
      source: { label: "ServiceTitan, Arkansas electrician schools and JATCs", url: "https://www.servicetitan.com/blog/electrician-schools-in-arkansas" },
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Arkansas statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Plasterers, national wages, May 2025 (BLS; no Arkansas estimate published)", url: "https://www.onetonline.org/link/localwages/47-2161.00?st=AR" },
    { label: "Arkansas long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=AR" },
    ACLB,
    ELECTRICAL,
    ELECTRICAL_HOURS,
    PLUMBING,
    HVACR,
    ELEVATOR,
    SPRINKLER,
    ACEF_SRC,
    YOUTH_ELECTRICAL,
    WORKFORCE_CHALLENGE,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
