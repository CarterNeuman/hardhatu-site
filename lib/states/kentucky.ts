// Kentucky state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Kentucky-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, UA_669, NEIEP, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Kentucky";

const DHBC: SourceRef = { label: "Kentucky Department of Housing, Buildings and Construction (DHBC), division directory", url: "https://dhbc.ky.gov/div_directory.aspx?menuid=88" };
const ELECTRICAL: SourceRef = { label: "KRS 227A.060 and 815 KAR 35:060, Kentucky electrician, master electrician and electrical contractor licenses", url: "https://codes.findlaw.com/ky/title-xix-public-safety-and-morals/ky-rev-st-sect-227a-060/" };
const HVAC: SourceRef = { label: "815 KAR 8:010 and KRS 198B.658, Kentucky journeyman HVAC mechanic and master HVAC contractor licenses", url: "https://apps.legislature.ky.gov/Law/KAR/815/008/010.pdf" };
const PLUMBING: SourceRef = { label: "815 KAR 20:030 and KRS 318.040, Kentucky journeyman and master plumber licenses", url: "https://apps.legislature.ky.gov/Law/KAR/815/020/030.pdf" };
const ELEVATOR: SourceRef = { label: "KRS 198B.4013, Kentucky elevator mechanic and accessibility/residential elevator mechanic licenses", url: "https://codes.findlaw.com/ky/title-xvii-economic-security-and-public-welfare/ky-rev-st-sect-198b-4013/" };
const SPRINKLER: SourceRef = { label: "KRS 198B.550-198B.630, Kentucky fire sprinkler system certification", url: "https://law.justia.com/codes/kentucky/2022/chapter-198b/section-198b-610/" };
const CE_RULE: SourceRef = { label: "815 KAR 2:010, continuing education for Kentucky DHBC licenses", url: "https://apps.legislature.ky.gov/Law/KAR/815/002/010.pdf" };
const TRACK_SRC: SourceRef = { label: "Kentucky Department of Education, TRACK (Tech Ready Apprentices for Careers in Kentucky)", url: "https://education.ky.gov/CTE/cter/Documents/TRACK_Process.pdf" };
const WORK_READY: SourceRef = { label: "Work Ready Kentucky Scholarship (KCTCS)", url: "https://hopkinsville.kctcs.edu/affording-college/paying-for-college/work-ready-kentucky.aspx" };
const BCTC_KY: SourceRef = { label: "Kentucky State Building & Construction Trades Council (14 affiliated crafts, 68 locals)", url: "https://building-performance.org/wp-content/uploads/2024/03/Kentucky-State-BCTC.pdf" };
const K4C: SourceRef = { label: "NAHB, K4C Career Days (Home Builders Association of Kentucky, Frankfort)", url: "https://www.nahb.org/nahb-community/awards/association-excellence-awards/all-projects/2024/hba-operations/k4c-career-days-inspiring-kentuckys-students" };

const KCTCS: TrainingOption = {
  name: "Kentucky Community and Technical College System (KCTCS)",
  kind: "college",
  where: "16 colleges statewide, including Bluegrass CTC (Lexington), Jefferson CTC (Louisville) and Southcentral KY CTC (Bowling Green)",
  detail: "A dual-credit Construction Trades pathway plus standalone programs like Welding Technology. Many programs qualify for the Work Ready Kentucky Scholarship.",
  url: "https://kctcs.edu/dual-credit/pathways/construction-trades.aspx",
};
const KY_ELECTRICAL_JATC: TrainingOption = {
  name: "IBEW electrical JATCs",
  kind: "union",
  where: "IBEW Local 369 (Louisville) and the Paducah Electricians JATC (5-year program)",
  detail: "Paid union electrical apprenticeships run by IBEW locals and NECA contractors.",
  url: "https://skillplum.com/apprenticeship/paducah-electricians-jatc-5yrs-paducah-ky",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const ABC_KY: TrainingOption = {
  name: "ABC of Indiana/Kentucky",
  kind: "open-shop",
  where: "Serves Kentucky employers, including Louisville",
  detail: "Registered open-shop apprenticeships, including HVAC and carpentry, run by the Associated Builders and Contractors.",
  url: "https://explore.skillup.org/all/training/associated-builders-and-contractors-of-indiana-kentucky/hvac-apprenticeship",
};
const UA_502: TrainingOption = {
  name: "UA Local 502, Plumbers, Pipefitters & Service Technicians",
  kind: "union",
  where: "Louisville",
  detail: "Paid union apprenticeship covering plumbing, pipefitting and HVAC service work together.",
  url: "https://skillplum.com/apprenticeship/plumbers-pipefitters-loc-502-louisville-ky/plumbers-pipefitters-loc-502-louisville-ky-plumber-pipefitter",
};
const IKORCC: TrainingOption = {
  name: "Indiana/Kentucky/Ohio Regional Council of Carpenters (IKORCC)",
  kind: "union",
  where: "Louisville Training Center",
  detail: "Paid union apprenticeships for carpenters and millwrights.",
  url: "https://hirevets.shrm.org/jobs/64be85eee69c52001cdc4e30",
};
const KY_IRONWORKERS: TrainingOption = {
  name: "Ironworkers union locals",
  kind: "union",
  where: "Local 70 (Louisville), Local 44 (Hebron, Northern Kentucky) and Local 782 (Paducah)",
  detail: "Paid union apprenticeships in structural and reinforcing ironwork.",
  url: "https://skillplum.com/apprenticeship/iron-workers-local-70-jatc-louisville-ky",
};
const KY_WELDERS_769: TrainingOption = {
  name: "Ironworkers Local 769 welder apprenticeship",
  kind: "union",
  where: "Serves Kentucky",
  detail: "A union apprenticeship built specifically around structural and pipe welding.",
  url: "https://explore.skillup.org/all/training/ironworkers-local-769/welder-apprenticeship-program",
};
const KY_SHEET_METAL: TrainingOption = {
  name: "Kentucky Sheet Metal JATC",
  kind: "union",
  where: "Louisville",
  detail: "Paid union apprenticeship affiliated with SMART, for ductwork and architectural metal.",
  url: "https://skillplum.com/apprenticeship/kentucky-sheet-metal-jatc-louisville-ky",
};
const BAC_LOCAL_4: TrainingOption = {
  name: "Bricklayers & Allied Craftworkers (BAC) Local 4",
  kind: "union",
  where: "Indiana/Kentucky zone",
  detail: "Paid union apprenticeship for brick, block and stone masons.",
  url: "https://hirevets.shrm.org/jobs/bricklayers-local-4-indianakentucky/64a81f635f681b001c80e0f4",
};
const KLTF: TrainingOption = {
  name: "Kentucky Laborers Training Fund",
  kind: "union",
  where: "Louisville area",
  detail: "Paid union laborer apprenticeship run with LiUNA.",
  url: "https://kltf.org/apprenticeship/",
};
const IUOE_181: TrainingOption = {
  name: "Operating Engineers (IUOE) Local 181",
  kind: "union",
  where: "Western Kentucky, near Henderson",
  detail: "Paid union apprenticeship training heavy equipment operators.",
  url: "https://www.iuoe.org/training/local-181-heavy-equipment-operator-training-school",
};
const IUEC_20: TrainingOption = {
  ...NEIEP,
  where: "IUEC Local 20, Louisville",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noTradeLicense = (what: string) =>
  `Kentucky has no state license for ${what}. There is no statewide general contractor license either; some cities and counties run their own local registration.`;

export const KENTUCKY: StateGuide = {
  // Kentucky ZIP codes run 400xx-427xx.
  locationHints: { zip3: [[400, 427]], cities: ["Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington", "Frankfort", "Paducah", "Richmond"] },
  slug: "kentucky",
  code: "KY",
  name: S,
  lastVerified: "2026-11-17",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Kentucky long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=KY",
  },
  intro:
    "A field guide to 25 construction trades in Kentucky: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ roughly 81,700 people in Kentucky, and the state projects roughly 7,000 openings a year across them through 2034.",
    "Kentucky has no statewide general contractor license. Most trades need no individual license at all; only electricians, plumbers, HVAC mechanics, elevator mechanics and fire sprinkler certificate holders do.",
    "High schoolers can start early through TRACK, a state program that lets CTE students earn credit toward a registered apprenticeship in trades like carpentry, electrical, masonry, welding and heavy equipment before graduation.",
    "The Work Ready Kentucky Scholarship covers up to 60 credit hours of tuition at KCTCS, Kentucky's community and technical college system, for students in construction and other high-demand fields.",
    "Paid union apprenticeships run in most of these trades out of Louisville, with others reaching Paducah, Hebron and western Kentucky.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "TRACK pre-apprenticeship", value: "Before graduation", note: "High schoolers earn apprenticeship credit in Carpentry, Electrical, Masonry, Welding and Heavy Equipment" },
  licensingOverview:
    "Kentucky licenses individual tradespeople in a narrower set of trades than many states, all run by the Department of Housing, Buildings and Construction (DHBC): its Electrical Division, Division of Plumbing, Division of HVAC and Elevator Section each run their own license ladders. Fire sprinkler system work is certified separately under KRS 198B.550-198B.630, outside the plumbing board. Kentucky has no statewide general contractor license, so carpentry, masonry, drywall, roofing, painting and most other trades on this page are left to local city or county registration, if any.",
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
      "With no statewide general contractor license, starting a small carpentry, masonry, painting or roofing business in Kentucky has a lower regulatory bar than in most states, though local city or county rules can still apply.",
      "You can start small. Many owners begin with one truck and side jobs before going full-time.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "A license from DHBC (electrical, plumbing, HVAC, elevator) is still required to run a business in those trades, however small the job.",
    ],
    path:
      "The usual route: work for someone else for years, earn your license where one exists, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      DHBC,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([19710, 20510, 4, 1660]),
      stateLicense: "none",
      licenseSummary: "Kentucky has no license for construction laborers. It is the biggest trade on this page and the most common way into construction.",
      training: [KLTF, KCTCS, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([11190, 11620, 4, 1020]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Kentucky licenses electricians statewide through DHBC's Electrical Division under KRS 227A and 815 KAR 35:060. An electrician license takes 8,000 hours of verified electrical experience since age 16 (training programs, a two-year degree or teaching time can credit up to 4,000 of those hours) plus a passing exam score. A master electrician license takes 16,000 hours total. Licensees take 6 hours of continuing education each renewal cycle.",
      licenseSteps: [
        { title: "Electrician", detail: "8,000 hours of verified electrical experience since age 16, with credit available for approved training, plus the state exam." },
        { title: "Master electrician", detail: "16,000 hours of verified experience total, plus the master exam." },
        { title: "Electrical contractor", detail: "Needs an affiliated licensed master electrician, $1 million general liability insurance and the state exam." },
        { title: "Provisional electrician (alternate path)", detail: "6 years of verified work experience earns a one-year provisional license; the state exam must be passed within that year." },
      ],
      licenseAgency: ELECTRICAL,
      extraCredentials: ["Kentucky electrician, master electrician or electrical contractor license"],
      training: [KY_ELECTRICAL_JATC, KCTCS],
      businessNote: "Running one in Kentucky takes an electrical contractor license, an affiliated master electrician and $1 million in liability insurance.",
    }),
    t("equipment-operator", {
      outlook: ol([7320, 7500, 2, 610]),
      stateLicense: "none",
      licenseSummary: "Kentucky has no state license for equipment operators. Employers look for training records and safe hours in the seat, and some jobs need a commercial driver's license.",
      training: [IUOE_181, national("Kentucky Dept. of Education Heavy Equipment TRACK", "iuoe-heavy-equipment-operator-apprenticeship", "A high school pre-apprenticeship pathway into equipment-operator apprenticeships.")],
    }),
    t("welder", {
      outlook: ol([7820, 8210, 5, 810]),
      stateLicense: "none",
      licenseSummary: "Kentucky has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      training: [KCTCS, KY_WELDERS_769, LEARN_ON_JOB("Fabrication shops, steel mills and contractors")],
    }),
    t("hvac-technician", {
      outlook: ol([6560, 6820, 4, 580]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Kentucky licenses HVAC mechanics statewide through DHBC's Division of HVAC under KRS 198B.658 and 815 KAR 8:010. A journeyman HVAC mechanic license takes 2 years of HVAC work experience under a licensed master (one year of approved curriculum can credit toward one of the two years), plus a passing exam score. A master HVAC contractor license takes 2 more years working as a journeyman under a master, plus insurance. One year is defined as at least 1,500 hours of HVAC work.",
      licenseSteps: [
        { title: "Journeyman HVAC mechanic", detail: "2 years of HVAC work experience under a licensed master, with credit available for approved curriculum, plus the state exam." },
        { title: "Master HVAC contractor", detail: "2 more years working as a journeyman under a master, proof of insurance, plus the master exam." },
      ],
      licenseAgency: HVAC,
      extraCredentials: ["Kentucky journeyman HVAC mechanic or master HVAC contractor license"],
      training: [ABC_KY, KCTCS],
      businessNote: "Running one in Kentucky takes a master HVAC contractor license and proof of insurance.",
    }),
    t("carpenter", {
      outlook: ol([11230, 11820, 5, 880]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("carpenters"),
      training: [IKORCC, ABC_KY],
    }),
    t("plumber", {
      outlook: ol([5970, 6230, 4, 520]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Kentucky licenses plumbers statewide through DHBC's Division of Plumbing under KRS Chapter 318 and 815 KAR 20:030. A journeyman plumber license takes at least 2 consecutive years as a registered apprentice (or an approved course plus 1 year as an apprentice), plus a written and hands-on exam. A master plumber license takes at least 2 years holding a journeyman license within the past 5 years, plus 2 more years working under a master, plus a higher-scoring exam. Exams are given quarterly.",
      licenseSteps: [
        { title: "Registered apprentice plumber", detail: "Register with DHBC and work under a licensed plumber." },
        { title: "Journeyman plumber", detail: "At least 2 consecutive years as a registered apprentice, plus the written and hands-on state exam." },
        { title: "Master plumber", detail: "A journeyman license held within the past 5 years, plus 2 more years working under a master, plus the master exam." },
      ],
      licenseAgency: PLUMBING,
      extraCredentials: ["Kentucky journeyman or master plumber license"],
      training: [UA_502],
      ownBusiness: "Running a plumbing business in Kentucky takes a master plumber license and proof of insurance.",
    }),
    t("painter", {
      outlook: ol([2170, 2300, 6, 180]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("painters"),
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([1570, 1630, 4, 110]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("concrete finishers"),
      training: [LEARN_ON_JOB("Concrete and site contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([590, 620, 5, 40]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("drywall installers"),
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      stateLicense: "worker-certification",
      licenseSummary:
        "Kentucky licenses elevator mechanics through DHBC's Elevator Section under KRS 198B.4013. An elevator mechanic license takes at least 36 months of verified industry experience (or equivalent military service) plus a department-approved exam; an accessibility and residential elevator mechanic license, covering wheelchair lifts and home elevators, takes 12 months. Completing a nationally recognized program like NEIEP, or a registered apprenticeship, is also an accepted path. Licensees take 8 hours of continuing education each renewal cycle.",
      licenseSteps: [
        { title: "Helper", detail: "Work under a licensed mechanic while you train." },
        { title: "Training program", detail: "NEIEP's union program, or a registered apprenticeship meeting state standards." },
        { title: "Elevator mechanic license", detail: "At least 36 months of verified experience plus the department exam, or program completion." },
        { title: "Accessibility and residential elevator mechanic (alternate)", detail: "A narrower license covering wheelchair lifts and home elevators, at 12 months of experience." },
      ],
      licenseAgency: ELEVATOR,
      extraCredentials: ["Kentucky elevator mechanic or accessibility/residential elevator mechanic license"],
      training: [IUEC_20],
      ownBusiness: "Elevator work in Kentucky needs licensed mechanics, so most mechanics work for established elevator companies.",
      payNote: "O*NET and Projections Central publish no Kentucky-specific job outlook for elevator technicians, so there is no state projection here.",
    }),
    t("flooring-installer", {
      outlook: ol([490, 500, 3, 30]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("flooring installers"),
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([430, 450, 4, 40]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("glaziers"),
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([550, 580, 5, 50]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("insulation installers"),
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([890, 930, 4, 80]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("ironworkers"),
      training: [KY_IRONWORKERS],
    }),
    t("mason", {
      outlook: ol([1160, 1220, 5, 90]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("masons"),
      payNote: "Figures cover brickmasons and blockmasons; stonemasons are a separate, smaller BLS category not shown here.",
      training: [BAC_LOCAL_4],
    }),
    t("millwright", {
      outlook: ol([1460, 1530, 4, 140]),
      stateLicense: "none",
      licenseSummary: "Kentucky has no state license for millwrights. Employers hire on training, experience and precision.",
      training: [IKORCC],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary:
        "Kentucky has no separate license for pipefitters. The same journeyman and master plumber licenses from DHBC's Division of Plumbing cover pipefitting and steamfitting work; there is no distinct industrial-piping board.",
      training: [UA_502],
    }),
    t("plasterer-stucco-mason", {
      outlook: ol([50, 50, 2, 0]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("plasterers"),
      payNote: "This is a very small trade in Kentucky, about 50 workers statewide, so treat the growth and openings figures as rough rather than a sign of many jobs.",
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([1330, 1390, 4, 100]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("roofers"),
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([950, 990, 5, 80]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("sheet metal workers"),
      training: [KY_SHEET_METAL],
    }),
    t("solar-installer", {
      stateLicense: "none",
      licenseSummary:
        "Kentucky has no separate solar license. The wiring side of a solar job is electrical work, which needs Kentucky electrical licensing from DHBC.",
      training: [KY_ELECTRICAL_JATC],
      payNote: "O*NET and Projections Central publish no Kentucky-specific job outlook for solar installers, so there is no state projection here.",
    }),
    t("sprinkler-fitter", {
      stateLicense: "worker-certification",
      licenseSummary:
        "Kentucky certifies fire sprinkler system work separately from plumbing, under KRS 198B.550-198B.630. It is unlawful to install, service, or hold yourself out as a certified sprinkler contractor without a certificate issued under that chapter; fitters typically work toward one while employed by a certificate holder. Small systems of 10 heads or fewer on a home's own water supply are exempt.",
      licenseSteps: [
        { title: "Employee of a certificate holder", detail: "Work for a company holding a KRS 198B.570/580 certificate while you gain experience." },
        { title: "Certificate holder", detail: "Apply under KRS 198B.570 or 198B.580; exact experience and exam requirements are on the application itself." },
        { title: "NICET certification (optional)", detail: "National certifications in sprinkler layout or inspection." },
      ],
      licenseAgency: SPRINKLER,
      training: [UA_669],
      ownBusiness: "Opening a sprinkler company in Kentucky takes a certificate under KRS 198B.570 or 198B.580.",
    }),
    t("tile-setter", {
      outlook: ol([250, 250, 1, 20]),
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
      title: "TRACK (Tech Ready Apprentices for Careers in Kentucky)",
      detail:
        "A Kentucky Department of Education program letting high school CTE students earn credit toward a registered apprenticeship, through a youth apprenticeship co-op placement or a pre-apprenticeship assessment. Confirmed pathways include Carpentry, Electrical, Masonry, Welding and Heavy Equipment.",
      source: TRACK_SRC,
    },
    {
      title: "K4C Career Days",
      detail:
        "An annual hands-on construction career event in Frankfort, hosted by the Home Builders Association of Kentucky, drawing 3,000-plus high schoolers and 70-plus exhibitors across trades like welding, bricklaying, carpentry and heavy equipment.",
      source: K4C,
    },
    {
      title: "Dual-credit construction trades",
      detail: "KCTCS runs a dual-credit Construction Trades pathway, letting high schoolers earn college credit toward programs like Welding Technology before graduating.",
      source: { label: "KCTCS, dual credit Construction Trades pathway", url: "https://kctcs.edu/dual-credit/pathways/construction-trades.aspx" },
    },
  ],
  adults: [
    {
      title: "Work Ready Kentucky Scholarship",
      detail:
        "Covers tuition for up to 60 credit hours at KCTCS, plus up to $400 a year toward fees, for students in eligible fields including construction and trades. Requires at least 6 credit hours and no prior associate's or bachelor's degree.",
      source: WORK_READY,
    },
    {
      title: "Construction apprenticeships",
      detail: "IBEW, UA, Ironworkers, Sheet Metal, Bricklayers and Carpenters locals run paid, registered apprenticeships out of Louisville, with others reaching Paducah, Hebron and western Kentucky.",
      source: BCTC_KY,
    },
    {
      title: "Kentucky FAME",
      detail: "The Federation for Advanced Manufacturing Education runs employer-sponsored training in Northern Kentucky, Greater Louisville and elsewhere. It's primarily a manufacturing-technician model, not construction-specific, but worth knowing about for related trades.",
      source: { label: "Kentucky FAME chapters", url: "https://fame-usa.com/fame-program-locations/kentucky-fame/" },
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Kentucky statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Plasterers, national wages, May 2025 (BLS; no Kentucky estimate published)", url: "https://www.onetonline.org/link/localwages/47-2161.00?st=KY" },
    { label: "Kentucky long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=KY" },
    DHBC,
    ELECTRICAL,
    HVAC,
    PLUMBING,
    ELEVATOR,
    SPRINKLER,
    CE_RULE,
    TRACK_SRC,
    WORK_READY,
    BCTC_KY,
    K4C,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
