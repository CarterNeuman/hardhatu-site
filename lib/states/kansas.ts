// Kansas state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Kansas-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, UA_669, NEIEP, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Kansas";

const KSBIZ: SourceRef = { label: "Kansas Business Center, construction starter kit (cities and counties set contractor licensing)", url: "https://ksbiz.kansas.gov/business-starter-kit/construction/" };
const ELECTRICAL_LAW: SourceRef = { label: "K.S.A. 12-1526, Kansas rules for local electrician certificates (valid statewide)", url: "https://ksrevisor.gov/statutes/chapters/ch12/012_015_0026.html" };
const PLUMBING_LAW: SourceRef = { label: "K.S.A. 12-1509, Kansas rules for local plumber certificates (valid statewide)", url: "https://ksrevisor.gov/statutes/chapters/ch12/012_015_0009.html" };
const HVAC_LAW: SourceRef = { label: "K.S.A. 12-1542, Kansas rules for local HVAC mechanic certificates (valid statewide)", url: "https://ksrevisor.gov/statutes/chapters/ch12/012_015_0042.html" };
const HB2588: SourceRef = { label: "Kansas Legislature, HB 2588 (2026 statewide electrician license, died)", url: "https://www.kslegislature.gov/li/b2025_26/measures/hb2588/" };
const MABCD_CERTS: SourceRef = { label: "Wichita/Sedgwick County MABCD, master and journeyman trade certificates", url: "https://www.sedgwick.gov/mabcd/master-journeyman-trade-certificates/" };
const MABCD_CONTRACTORS: SourceRef = { label: "Wichita/Sedgwick County MABCD, contractor licensing", url: "https://sedgwickcounty.org/mabcd/contractor-licensing" };
const JOCO: SourceRef = { label: "Johnson County, contractor license types", url: "https://www.jocogov.org/department/contractor-licensing/new-license-license-types" };
const ROOFING: SourceRef = { label: "Kansas Attorney General, roofing contractor registration", url: "https://ag.ks.gov/licensing/roofing-registration" };
const ROOFING_LAW: SourceRef = { label: "K.S.A. 50-6,122, Kansas Roofing Registration Act definitions (includes waterproofing)", url: "https://ksrevisor.gov/statutes/chapters/ch50/050_006_0122.html" };
const ELEVATOR: SourceRef = { label: "Kansas State Fire Marshal, elevators (mechanic and contractor licenses)", url: "https://firemarshal.ks.gov/357/Elevators" };
const ELEVATOR_LAW: SourceRef = { label: "K.S.A. 44-1807, Kansas elevator mechanic license qualifications", url: "https://ksrevisor.gov/statutes/chapters/ch44/044_018_0007.html" };
const SFM_LICENSING: SourceRef = { label: "Kansas State Fire Marshal, licensing (sprinkler companies register, no state license)", url: "https://www.firemarshal.ks.gov/185/Licensing" };
const EXCEL_CTE: SourceRef = { label: "Kansas Board of Regents, Excel in CTE (Jan. 2026 handout)", url: "https://kansasregents.gov/resources/Jan_2026_HANDOUT_Excel_in_CTE_Education_Initiative.pdf" };
const PROMISE: SourceRef = { label: "Kansas Board of Regents, Kansas Promise Scholarship", url: "https://kansasregents.gov/students/student_financial_aid/promise-act-scholarship" };
const YOUTH_APPRENTICESHIP: SourceRef = { label: "Kansas Department of Commerce, youth apprenticeship expansion (May 2026)", url: "https://www.kansascommerce.gov/2026/05/apprenticeship-office-awarded-funding-to-expand-youth-opportunities/" };
const TAX_CREDIT: SourceRef = { label: "Kansas Department of Revenue, apprenticeship tax credit", url: "https://ksrevenue.gov/prtaxcredits-apprenticeship.html" };
const KS_APPRENTICESHIP: SourceRef = { label: "Kansas Office of Registered Apprenticeship", url: "https://kansascommerce.gov/workforce/kansasregisteredapprenticeship" };
const AOK: SourceRef = { label: "Kansas Board of Regents, Accelerating Opportunity: Kansas (AO-K)", url: "https://kansasregents.org/workforce_development/accelerating-opportunity-kansas" };

const KS_COLLEGES: TrainingOption = {
  name: "Kansas technical and community colleges",
  kind: "college",
  where: "Including WSU Tech (Wichita), Washburn Tech (Topeka), Manhattan Tech, Salina Tech and Johnson County Community College",
  detail: "Certificates and degrees in construction technology, carpentry, electrical, plumbing, HVAC and welding. Many qualify for the Kansas Promise Scholarship, and high schoolers can take approved technical courses in them tuition-free through Excel in CTE.",
  url: "https://wsutech.edu/constructiontrades",
};
const JCCC_ELECTRICAL: TrainingOption = {
  name: "Johnson County Community College, Electrical Technology",
  kind: "college",
  where: "Overland Park",
  detail: "A 30-credit certificate that prepares students for the journeyman electrician exam, plus a two-year degree.",
  url: "https://jccc.edu/academics/credit/electrical-technology",
};
const KS_ELECTRICAL: TrainingOption = {
  name: "Electrical apprenticeships",
  kind: "union",
  where: "Topeka Electrical JATC (IBEW Local 226) and the Kansas City JATC (IBEW Local 124)",
  detail: "Paid union electrical apprenticeships. Topeka apprentices start around $18 an hour with class one day every other week, and Kansas City's program charges no tuition.",
  url: "https://www.ibew226.com/apprenticeship/",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const KS_PIPE_TRADES: TrainingOption = {
  name: "Plumbers & Pipefitters Apprenticeship Training of Kansas",
  kind: "union",
  where: "Wichita",
  detail: "A registered plumbing and pipefitting apprenticeship.",
  url: "https://kansasworks.com/etp/public/institution_programs/5375",
};
const SHEET_METAL_29: TrainingOption = {
  name: "Sheet Metal Workers Local 29 JATC",
  kind: "union",
  where: "Wichita",
  detail: "A four-year union sheet metal apprenticeship.",
  url: "https://kansasworks.com/etp/public/institution_programs/5911",
};
const IRONWORKERS_10: TrainingOption = {
  name: "MO-KAN Ironworkers Local 10",
  kind: "union",
  where: "Kansas City area",
  detail: "A registered apprenticeship for structural iron and steel workers.",
  url: "https://www.kansasworks.com/etp/public/apprenticeship_programs/7638",
};
const KC_LABORERS: TrainingOption = {
  name: "Greater Kansas City Laborers Training Center",
  kind: "union",
  where: "Kansas City, Kansas",
  detail: "A registered construction craft laborer apprenticeship run by the Western Missouri and Kansas Laborers District Council.",
  url: "https://www.kansasworks.com/etp/public/apprenticeship_programs/8394",
};
const ABC_HOA: TrainingOption = {
  name: "ABC Heart of America apprenticeships",
  kind: "open-shop",
  where: "Kansas City area",
  detail: "Open-shop registered apprenticeships in electrical, plumbing, pipefitting, carpentry, HVAC and construction labor.",
  url: "https://abchoa.org/",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noTradeLicense = (what: string) =>
  `Kansas has no state license for ${what}, and no state general contractor license either. Cities and counties, like Johnson County and Wichita, run their own contractor licensing.`;

export const KANSAS: StateGuide = {
  // Kansas ZIP codes run 660xx-679xx (663 is not in use).
  locationHints: { zip3: [[660, 662], [664, 679]], cities: ["Wichita", "Overland Park", "Kansas City, Kansas", "Olathe", "Topeka", "Lawrence", "Salina", "Manhattan"] },
  slug: "kansas",
  code: "KS",
  name: S,
  lastVerified: "2026-11-19",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Kansas long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=KS",
  },
  intro:
    "A field guide to 25 construction trades in Kansas: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ about 62,300 people in Kansas, and the state projects about 5,400 openings a year across them through 2034.",
    "High school students pay $0 tuition for approved technical courses at all 26 Kansas technical and community colleges through Excel in CTE. About 17,600 students used it in the 2025 school year.",
    "Kansas has no state license for electricians, plumbers or HVAC workers. Cities and counties license them, but state law sets the rules: a journeyman certificate takes two years of experience and a standard exam, and it's valid anywhere in Kansas that requires one.",
    "Elevator mechanics are the exception: they need a state license from the State Fire Marshal.",
    "The Kansas Promise Scholarship can cover two-year building trades programs for adults and recent graduates, up to $20,000 after other grants, if they live and work in Kansas for two years afterward.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "Tech college tuition for high schoolers", value: "$0", note: "For approved technical courses through Excel in CTE" },
  licensingOverview:
    "Kansas leaves most trade licensing to cities and counties, like Johnson County, Topeka, and Wichita and Sedgwick County (which license jointly). For electricians, plumbers and HVAC mechanics, state law sets the experience rules and exams that local licenses must use, and a certificate earned in one Kansas city is valid in the others. A 2026 bill to create a statewide electrician license died. The state does license elevator mechanics and contractors (State Fire Marshal), and roofing businesses register with the Attorney General. There is no state general contractor license.",
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
      "Kansas has no state general contractor license, so the license you need depends on the city or county you work in.",
      "You can start small. Many owners begin with one truck and side jobs before going full-time.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Contractor licenses are local and don't always carry over: Wichita and Sedgwick County, for example, don't accept other areas' contractor licenses.",
    ],
    path:
      "The usual route: work for someone else for years, earn your license, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      KSBIZ,
      MABCD_CONTRACTORS,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([11820, 12530, 6, 1030]),
      stateLicense: "none",
      licenseSummary: "Kansas has no license for construction laborers. It is the biggest trade on this page and the most common way into construction.",
      licenseAgency: KSBIZ,
      training: [KC_LABORERS, ABC_HOA],
    }),
    t("electrician", {
      outlook: ol([6190, 6780, 10, 610]),
      stateLicense: "none",
      licenseSummary:
        "Kansas has no state electrician license; cities and counties issue them. State law sets the rules they use: a journeyman certificate takes two years of experience (up to one year can come from school) and a standard exam, a master certificate takes two more years as a journeyman, and a certificate earned in one Kansas city counts in any other that requires one. A 2026 bill to create a statewide license died.",
      licenseSteps: [
        { title: "Apprentice", detail: "Work under a licensed electrician. Some cities, like Topeka, have apprentices register." },
        { title: "Journeyman certificate", detail: "Two years of experience plus a standard exam (75% to pass), issued by a city or county and valid across Kansas." },
        { title: "Master certificate", detail: "Two more years as a journeyman plus the master exam. A residential electrician certificate also exists." },
        { title: "Keep it current", detail: "12 hours of continuing education every two years, at least half on the electrical code." },
      ],
      licenseAgency: ELECTRICAL_LAW,
      training: [KS_ELECTRICAL, JCCC_ELECTRICAL, KS_COLLEGES],
      businessNote: "Running one in Kansas takes a master certificate and the contractor license of each city or county you work in.",
    }),
    t("equipment-operator", {
      outlook: ol([7090, 7230, 2, 590]),
      stateLicense: "none",
      licenseSummary: "Kansas has no state license for equipment operators. Employers look for training records and safe hours in the seat, and crane operators need national certification under federal OSHA rules.",
      licenseAgency: KSBIZ,
      training: [national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators."), KS_COLLEGES],
    }),
    t("welder", {
      outlook: ol([6730, 7100, 5, 700]),
      stateLicense: "none",
      licenseSummary: "Kansas has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      licenseAgency: KSBIZ,
      training: [KS_COLLEGES],
    }),
    t("hvac-technician", {
      outlook: ol([4360, 4740, 9, 420]),
      stateLicense: "none",
      licenseSummary:
        "Kansas has no state HVAC license; cities and counties issue them under state rules. A journeyman HVAC mechanic certificate takes two years of experience and a standard exam, and a master certificate takes two years as a journeyman or four years of experience. A certificate earned in one Kansas city counts in the others.",
      licenseSteps: [
        { title: "Helper or apprentice", detail: "Work for an HVAC company. EPA 608 certification is required to handle refrigerants." },
        { title: "Journeyman HVAC mechanic", detail: "Two years of experience plus a standard exam, valid across Kansas." },
        { title: "Master HVAC mechanic", detail: "Two years as a journeyman, or four years of experience, plus the master exam." },
        { title: "Keep it current", detail: "12 hours of continuing education every two years." },
      ],
      licenseAgency: HVAC_LAW,
      training: [KS_COLLEGES, ABC_HOA],
      businessNote: "Running one in Kansas takes a master certificate and the contractor license of each city or county you work in.",
    }),
    t("carpenter", {
      outlook: ol([7140, 7430, 4, 550]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("carpenters"),
      licenseAgency: KSBIZ,
      training: [ABC_HOA, KS_COLLEGES, national("Carpenters union (UBC) training", "ubc-carpenter-apprenticeship", "Union carpentry apprenticeships.")],
    }),
    t("plumber", {
      outlook: ol([4480, 4700, 5, 390]),
      stateLicense: "none",
      licenseSummary:
        "Kansas has no state plumbing license; cities and counties issue them under state rules. A journeyman certificate takes two years of experience and a standard exam, and a master certificate takes two years as a journeyman or four years of experience. A certificate earned in one Kansas city counts in the others.",
      licenseSteps: [
        { title: "Apprentice", detail: "Work under a licensed plumber. Some cities have apprentices register." },
        { title: "Journeyman plumber", detail: "Two years of experience plus a standard exam (75% to pass), valid across Kansas." },
        { title: "Master plumber", detail: "Two years as a journeyman, or four years of experience, plus the master exam." },
        { title: "Keep it current", detail: "12 hours of continuing education every two years, at least 6 on the plumbing code." },
      ],
      licenseAgency: PLUMBING_LAW,
      training: [KS_PIPE_TRADES, ABC_HOA, KS_COLLEGES],
      ownBusiness: "Running a plumbing business in Kansas takes a master plumber certificate and the contractor license of each city or county you work in.",
    }),
    t("painter", {
      outlook: ol([2580, 2670, 4, 210]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("painters"),
      licenseAgency: KSBIZ,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([3820, 3900, 2, 260]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("concrete finishers"),
      licenseAgency: KSBIZ,
      training: [LEARN_ON_JOB("Concrete and site contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([790, 830, 5, 60]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("drywall installers"),
      licenseAgency: KSBIZ,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([70, 80, 6, 10]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Kansas licenses elevator mechanics through the State Fire Marshal under the Kansas Elevator Safety Act. Mechanics qualify by finishing a national elevator apprenticeship or a college elevator program, passing a State Fire Marshal equivalency exam, or holding a license from a state with similar standards. Apprentices need no license while supervised, and cities with their own approved elevator program, like Wichita, handle licensing there.",
      licenseSteps: [
        { title: "Apprentice", detail: "Work under a licensed mechanic. No license needed." },
        { title: "Training program", detail: "The union's NEIEP program, the Certified Elevator Technician program or a college elevator program." },
        { title: "Elevator mechanic license", detail: "$150 from the State Fire Marshal, renewed every two years." },
        { title: "Lead mechanic", detail: "Run installs and service on your own." },
      ],
      licenseAgency: ELEVATOR_LAW,
      extraCredentials: ["Kansas elevator mechanic license"],
      training: [NEIEP],
      ownBusiness: "Elevator companies need a Kansas elevator contractor license, licensed mechanics and at least $1 million in liability insurance, so most mechanics work for established companies.",
    }),
    t("flooring-installer", {
      outlook: ol([200, 220, 9, 20]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("flooring installers"),
      licenseAgency: KSBIZ,
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([580, 600, 3, 50]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("glaziers"),
      licenseAgency: KSBIZ,
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([480, 500, 4, 40]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("insulation installers"),
      licenseAgency: KSBIZ,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([460, 480, 4, 40]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("ironworkers"),
      licenseAgency: KSBIZ,
      ownBusiness: "Steel erection companies need heavy equipment and big insurance policies, so most ironworkers work for established firms.",
      training: [IRONWORKERS_10, national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork.")],
    }),
    t("mason", {
      outlook: ol([560, 570, 3, 40]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("masons"),
      licenseAgency: KSBIZ,
      training: [LEARN_ON_JOB("Masonry contractors"), national("Bricklayers union (BAC)", "bac-bricklayer-apprenticeship", "Union apprenticeships for brick, block and stone masons.")],
    }),
    t("millwright", {
      outlook: ol([1280, 1280, 0, 110]),
      stateLicense: "none",
      licenseSummary: "Kansas has no state license for millwrights. Employers hire on training, experience and precision.",
      licenseAgency: KSBIZ,
      training: [{ ...KS_COLLEGES, detail: "Industrial maintenance programs, like Salina Tech's Industrial Maintenance and Automation, are the closest college match to millwright work." }, national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary: "Kansas has no state pipefitter license. Pipefitting usually falls under local plumbing or mechanical certificates, which follow the state's journeyman and master rules.",
      licenseAgency: HVAC_LAW,
      ownBusiness: "Piping contractors need crews, insurance and the local licenses where they work.",
      training: [KS_PIPE_TRADES, ABC_HOA],
    }),
    t("plasterer-stucco-mason", {
      stateLicense: "none",
      licenseSummary: noTradeLicense("plasterers"),
      licenseAgency: KSBIZ,
      payNote: "Kansas publishes no job projection for this very small trade.",
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([1400, 1490, 6, 110]),
      stateLicense: "contractor",
      licenseSummary:
        "Kansas has no license for individual roofers. Roofing businesses, commercial and residential, must register with the Kansas Attorney General and carry at least $500,000 in liability insurance. Employees working under a registered contractor don't register.",
      licenseAgency: ROOFING,
      training: [LEARN_ON_JOB("Roofing contractors")],
      businessNote: "Running one in Kansas takes Attorney General roofing registration and $500,000 in liability insurance, plus any local contractor license.",
    }),
    t("sheet-metal-worker", {
      outlook: ol([1750, 1920, 9, 160]),
      stateLicense: "none",
      licenseSummary: "Kansas has no state sheet metal license. Some cities license it locally: Wichita and Sedgwick County have a sheet metal contractor class, and Topeka issues a sheet metal mechanical license.",
      licenseAgency: MABCD_CONTRACTORS,
      training: [SHEET_METAL_29, national("Sheet metal apprenticeships (SMART)", "smart-sheet-metal-apprenticeship", "Union sheet metal apprenticeships.")],
    }),
    t("solar-installer", {
      stateLicense: "none",
      licenseSummary: "Kansas has no state solar license. The wiring side of a solar job is electrical work, which follows local electrical licensing, and some areas, like Wichita and Sedgwick County, have a solar contractor license.",
      licenseAgency: MABCD_CONTRACTORS,
      payNote: "Kansas publishes no job projection for this small trade, and its pay figures come from a small sample.",
      training: [KS_ELECTRICAL],
    }),
    t("sprinkler-fitter", {
      stateLicense: "contractor",
      licenseSummary:
        "Kansas does not license fire sprinkler fitters or companies, but sprinkler companies must register with the State Fire Marshal. Some local governments, like Johnson County, have a fire protection contractor license.",
      licenseSteps: [
        { title: "Apprentice fitter", detail: "Work for a sprinkler contractor. Union apprenticeships run five years." },
        { title: "Journey fitter", detail: "Install and test systems on your own." },
        { title: "NICET certification", detail: "National certifications in sprinkler layout or inspection." },
        { title: "Company registration", detail: "Sprinkler companies register with the State Fire Marshal, plus any local license." },
      ],
      licenseAgency: SFM_LICENSING,
      training: [UA_669],
      ownBusiness: "Opening a sprinkler company in Kansas takes State Fire Marshal registration, insurance and any local fire protection license.",
    }),
    t("tile-setter", {
      outlook: ol([540, 580, 9, 40]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("tile setters"),
      licenseAgency: KSBIZ,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: "Kansas has no state license for most waterproofing work. Waterproofing a roof counts as roofing under state law, so a business doing that work must register with the Attorney General as a roofing contractor.",
      licenseAgency: ROOFING_LAW,
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Excel in CTE: free technical college courses",
      detail:
        "Kansas high school students can take approved technical courses at any of the 26 technical and community colleges with no tuition. Colleges can charge fees for books, tools and safety gear. In the 2025 school year, 17,638 students used it and earned 1,917 industry credentials.",
      source: EXCEL_CTE,
    },
    {
      title: "Youth apprenticeships",
      detail: "Students can start registered apprenticeships as early as age 16, and in May 2026 the state got new funding to expand youth apprenticeships tied to CTE.",
      source: YOUTH_APPRENTICESHIP,
    },
    {
      title: "Employers get a tax credit for hiring you",
      detail: "Kansas gives employers a tax credit of up to $2,750 for each registered apprentice, plus $500 more for some apprentices under 18 who are in CTE.",
      source: TAX_CREDIT,
    },
  ],
  adults: [
    {
      title: "Kansas Promise Scholarship",
      detail:
        "Covers tuition, fees, books and materials left after other grants for two-year programs in fields including building trades, up to $20,000 or 68 credit hours, for families under the income limits. Recipients must live and work in Kansas for two years after finishing.",
      source: PROMISE,
    },
    {
      title: "Kansas Office of Registered Apprenticeship",
      detail: "The state apprenticeship office helps employers start registered apprenticeships and offers grants, including for rural areas.",
      source: KS_APPRENTICESHIP,
    },
    {
      title: "AO-K (Accelerating Opportunity: Kansas)",
      detail: "Adults who need to build basic skills can combine that with career and technical training at 17 Kansas colleges.",
      source: AOK,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Kansas statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Plasterers, Kansas wages, May 2025 (BLS via O*NET)", url: "https://www.onetonline.org/link/localwages/47-2161.00?st=KS" },
    { label: "Kansas long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=KS" },
    KSBIZ,
    ELECTRICAL_LAW,
    PLUMBING_LAW,
    HVAC_LAW,
    HB2588,
    MABCD_CERTS,
    MABCD_CONTRACTORS,
    JOCO,
    ROOFING,
    ROOFING_LAW,
    ELEVATOR,
    ELEVATOR_LAW,
    SFM_LICENSING,
    EXCEL_CTE,
    PROMISE,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
