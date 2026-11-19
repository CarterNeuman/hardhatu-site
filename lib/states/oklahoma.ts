// Oklahoma state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Oklahoma-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, UA_669, NEIEP, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Oklahoma";

const CIB_FAQ: SourceRef = { label: "Oklahoma Construction Industries Board (CIB), FAQ: no state general contractor license", url: "https://oklahoma.gov/cib/frequently-asked-questions.html" };
const ELECTRICAL: SourceRef = { label: "OAC 158:40-7-1 and 7-2, Oklahoma electrical journeyman and contractor licenses (CIB)", url: "https://www.law.cornell.edu/regulations/oklahoma/OAC-158-40-7-1" };
const ELECTRICAL_CE: SourceRef = { label: "CIB, HB3215 changes to electrical licensing (exams, continuing education)", url: "https://oklahoma.gov/cib/news/hb3215-changes-electrical-licensing.html" };
const STUDENT_APPRENTICE: SourceRef = { label: "CIB, SB1572 student electrical apprentice program", url: "https://oklahoma.gov/cib/news/sb1572-new-program-for-student-electrical-apprentices.html" };
const PLUMBING: SourceRef = { label: "OAC 158:30, Oklahoma plumbing licenses (CIB)", url: "https://oklahoma.gov/content/dam/ok/en/cib/documents/your-industry/plumbing-industry/title_158_chapter_30.pdf" };
const MECHANICAL: SourceRef = { label: "CIB, mechanical journeyman license (HVAC, refrigeration, process piping, sheet metal and other categories)", url: "https://oklahoma.gov/cib/your-industry/mechanical/mechanical-journeyman.html" };
const MECH_CATEGORIES: SourceRef = { label: "OAC 158:50-5-1, Oklahoma mechanical license categories", url: "https://regulations.justia.com/states/oklahoma/title-158/chapter-50/subchapter-5/section-158-50-5-1" };
const ROOFING: SourceRef = { label: "CIB, roofing contractor registration and endorsements", url: "https://oklahoma.gov/cib/your-industry/roofing.html" };
const ROOFING_2028: SourceRef = { label: "CIB, new residential roofing endorsement (HB1628, mandatory Jan. 1, 2028)", url: "https://oklahoma.gov/cib/news/new-residential-roofing-endorsement-required-by-house-bill-1628.html" };
const WELDING: SourceRef = { label: "Oklahoma Department of Labor, welder licensing program (Oklahoma Welding Act)", url: "https://oklahoma.gov/labor/safety-and-health/safety-standards/welders.html" };
const WELDING_SCOPE: SourceRef = { label: "59 O.S. 1634, scope of the Oklahoma Welding Act (code-required pipe and structural welds)", url: "https://law.justia.com/codes/oklahoma/title-59/section-59-1634/" };
const ELEVATOR: SourceRef = { label: "59 O.S. 3021, Oklahoma elevator contractor, mechanic and inspector licenses (Department of Labor)", url: "https://law.justia.com/codes/oklahoma/title-59/section-59-3021/" };
const SPRINKLER: SourceRef = { label: "OAC 380:75-3-6, Oklahoma fire sprinkler company, manager, technician and trainee licenses (Department of Labor)", url: "https://www.law.cornell.edu/regulations/oklahoma/OAC-380-75-3-6" };
const BOND: SourceRef = { label: "CIB, active contractor requirements ($5,000 bond, $50,000 liability insurance)", url: "https://oklahoma.gov/cib/your-industry/active-contractor-requirements.html" };
const TECH_CENTERS: SourceRef = { label: "Oklahoma CareerTech, technology centers (29 districts, 62 campuses; tuition-free for high school students)", url: "https://oklahoma.gov/careertech/about/delivery-arms/technology-centers.html" };
const CONCURRENT: SourceRef = { label: "Oklahoma State Regents, concurrent enrollment tuition waiver (seniors 18 hours, juniors up to 9)", url: "https://okhighered.org/wp-content/uploads/2026/08/tuition-waiver-scholarships-presentation.pdf" };
const OK_PROMISE: SourceRef = { label: "Oklahoma's Promise, application requirements", url: "https://okpromise.org/application-requirements/" };
const APPRENTICESHIP_OK: SourceRef = { label: "Apprenticeship Oklahoma (CareerTech)", url: "https://www.oklahoma.gov/careertech/business-and-industry/apprenticeship-oklahoma/about.html" };
const TECH_SCHOLARSHIPS: SourceRef = { label: "Oklahoma CareerTech, technology center tuition scholarships for recent graduates", url: "https://oklahoma.gov/careertech/educators/stem/career-planning/tuition-scholarships.html" };

const TECH_CENTER: TrainingOption = {
  name: "CareerTech technology centers",
  kind: "college",
  where: "29 districts and 62 campuses, including Francis Tuttle, Metro Tech, Moore Norman, Gordon Cooper and Tulsa Tech",
  detail: "Full-time trade programs for high school juniors and seniors (tuition-free) and adults (low tuition). Every center also provides classroom training for registered apprentices.",
  url: "https://oklahoma.gov/careertech/business-and-industry/apprenticeship-oklahoma/training-partners.html",
};
const MOORE_NORMAN_ELEC: TrainingOption = {
  name: "Moore Norman Technology Center, Electrical Trades",
  kind: "college",
  where: "Norman",
  detail: "For adults and high school juniors and seniors, with OSHA 10 and a state Residential Electrician's Assistant credential.",
  url: "https://www.mntc.edu/long-term-programs/constructionandmanufacturing/electrical",
};
const TULSA_TECH_PLUMBING: TrainingOption = {
  name: "Tulsa Tech, Plumbing Technician",
  kind: "college",
  where: "Lemley Memorial Campus, Tulsa",
  detail: "Prepares high school and adult students for a plumbing apprenticeship and the journeyman license.",
  url: "https://tulsatech.edu/full-time-programs-25-26/architecture-and-construction/plumbing-technician/",
};
const TULSA_TECH_CARPENTRY: TrainingOption = {
  name: "Tulsa Tech, Carpentry",
  kind: "college",
  where: "Lemley Memorial and Sand Springs campuses",
  detail: "Full-time carpentry training for high school and adult students.",
  url: "https://tulsatech.edu/full-time-programs/architecture-and-construction/carpentry",
};
const GORDON_COOPER_WELDING: TrainingOption = {
  name: "Gordon Cooper Technology Center, Applied Welding Technology",
  kind: "college",
  where: "Shawnee",
  detail: "Welding training for high school juniors and seniors and adults.",
  url: "https://www.gctech.edu/apps/pages/welding",
};
const OK_ELECTRICAL_JATCS: TrainingOption = {
  name: "IBEW electrical JATCs",
  kind: "union",
  where: "Electrical Training Alliance of Western Oklahoma (IBEW Local 1141, Oklahoma City) and the Tulsa JATC (IBEW Local 584)",
  detail: "Paid five-year union electrical apprenticeships. Western Oklahoma apprentices can also earn up to 42 college credits toward an OSU Institute of Technology degree.",
  url: "https://news.okstate.edu/articles/osuit/2025/osuit-launches-degree-pathway-for-electrical-apprentices",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const OSUIT: TrainingOption = {
  name: "OSU Institute of Technology, Electrical Construction",
  kind: "college",
  where: "Okmulgee",
  detail: "A degree program where students log 2,000 hours toward an electrical apprenticeship while in school.",
  url: "https://osuit.edu/sect/index.php",
};
const IRONWORKERS_584: TrainingOption = {
  name: "Ironworkers Local 584 registered apprenticeship",
  kind: "union",
  where: "Tulsa",
  detail: "Paid union apprenticeship in structural and reinforcing ironwork.",
  url: "https://www.apprenticeship.gov/node/805637",
};
const SMART_124: TrainingOption = {
  name: "Sheet Metal Workers JAC of Western Oklahoma (SMART Local 124)",
  kind: "union",
  where: "Oklahoma City",
  detail: "Paid union sheet metal apprenticeship for applicants 18 and over with a diploma or GED. Applications are taken the first Monday of each month.",
  url: "https://smw-124.squarespace.com/applicationprocedures",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noTradeLicense = (what: string) =>
  `Oklahoma has no state license for ${what}, and no state general contractor license either. Some cities, like Oklahoma City, run their own contractor registration.`;

export const OKLAHOMA: StateGuide = {
  // Oklahoma ZIP codes: 730-731, 734-741 and 743-749 (732, 733 and 742 are not Oklahoma).
  locationHints: { zip3: [[730, 731], [734, 741], [743, 749]], cities: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Lawton", "Edmond", "Stillwater"] },
  slug: "oklahoma",
  code: "OK",
  name: S,
  lastVerified: "2026-11-19",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Oklahoma long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=OK",
  },
  intro:
    "A field guide to 25 construction trades in Oklahoma: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ about 76,700 people in Oklahoma, and the state projects about 6,800 openings a year across them through 2034.",
    "High school students, mostly juniors and seniors, can train in a trade tuition-free at Oklahoma's 29 CareerTech technology center districts.",
    "Electricians, plumbers and mechanical workers (HVAC, pipefitting, sheet metal) climb a state license ladder: register as an apprentice, then earn journeyman and contractor licenses from the Construction Industries Board.",
    "High school students 16 and older working for a licensed electrical contractor can count up to 500 hours a school year toward their electrical license.",
    "Oklahoma has no state general contractor license, but the Department of Labor licenses three trades the Construction Industries Board doesn't: welders on code-required pipe and structural welds, elevator mechanics and fire sprinkler technicians.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "Tech center tuition for high schoolers", value: "$0", note: "At 29 CareerTech districts and 62 campuses statewide" },
  licensingOverview:
    "Oklahoma splits trade licensing between two agencies. The Construction Industries Board (CIB) licenses electrical, plumbing and mechanical work (HVAC, refrigeration, process piping, natural gas piping, sheet metal and more) with apprentice, journeyman and contractor levels, and registers roofing contractors. The Department of Labor licenses welders on code-required pipe and structural welds, elevator mechanics and contractors, and fire sprinkler trainees, technicians, managers and companies. There is no state general contractor license, so most building trades have no state license at all.",
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
      "Oklahoma has no state general contractor license, so many building trades can start a business with only local registration, where a city requires one.",
      "You can start small. Many owners begin with one truck and side jobs before going full-time.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off. Electrical, plumbing and mechanical contractors also carry a $5,000 bond and at least $50,000 in liability insurance.",
      "Income swings with the season and the economy, and customers don't always pay on time.",
    ],
    path:
      "The usual route: work for someone else for years, earn your license, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      CIB_FAQ,
      BOND,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([17790, 19030, 7, 1570]),
      stateLicense: "none",
      licenseSummary: "Oklahoma has no license for construction laborers. It is the biggest trade on this page and the most common way into construction.",
      licenseAgency: CIB_FAQ,
      training: [TECH_CENTER, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([9380, 10230, 9, 920]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Oklahoma licenses electricians through the Construction Industries Board. Apprentices (16 and older) register every year, an unlimited journeyman license takes 8,000 hours (about four years) plus an exam, and a contractor license takes 12,000 hours plus two years as a journeyman. Licensed electricians take 12 hours of continuing education every three years.",
      licenseSteps: [
        { title: "Registered apprentice", detail: "Register with the CIB at 16 or older and work under a licensed journeyman or contractor. High schoolers can count up to 500 hours a school year." },
        { title: "Journeyman electrician", detail: "8,000 hours of work (at least 4,000 commercial or industrial) plus the state exam. A residential journeyman license takes 4,000 hours." },
        { title: "Electrical contractor", detail: "12,000 hours plus two years as a licensed journeyman, and the contractor exam." },
        { title: "Run a shop", detail: "Every electrical company needs a licensed contractor on staff, a $5,000 bond and liability insurance." },
      ],
      licenseAgency: ELECTRICAL,
      extraCredentials: ["Oklahoma journeyman or contractor electrical license"],
      training: [OK_ELECTRICAL_JATCS, MOORE_NORMAN_ELEC, OSUIT, TECH_CENTER],
      businessNote: "Running one in Oklahoma takes an electrical contractor license, a $5,000 bond and at least $50,000 in liability insurance.",
    }),
    t("equipment-operator", {
      outlook: ol([7080, 7360, 4, 610]),
      stateLicense: "none",
      licenseSummary: "Oklahoma has no state license for equipment operators. Employers look for training records and safe hours in the seat, and crane operators need national certification under federal OSHA rules.",
      licenseAgency: CIB_FAQ,
      training: [TECH_CENTER, national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([10520, 10660, 1, 1040]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Oklahoma licenses some welders. Anyone making welds required by the state's adopted pipe and structural steel codes must pass a weld test at an approved test facility and hold a Department of Labor welder license. Welding outside those codes needs no state license.",
      licenseAgency: WELDING,
      extraCredentials: ["Oklahoma welder license (code-required welds)"],
      training: [GORDON_COOPER_WELDING, TECH_CENTER],
    }),
    t("hvac-technician", {
      outlook: ol([5140, 5560, 8, 480]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Oklahoma licenses HVAC workers through the Construction Industries Board's mechanical licenses. Apprentices (16 and older) register, a journeyman license takes three years of experience in the category plus an exam, and a contractor license takes one more year. Approved school hours can shorten the experience.",
      licenseSteps: [
        { title: "Registered apprentice", detail: "Register with the CIB at 16 or older while in a training course or working for a licensed contractor. EPA 608 certification is required to handle refrigerants." },
        { title: "Mechanical journeyman (HVAC)", detail: "Three years (6,000 hours) in HVAC plus the exam. Limited and unlimited HVAC licenses depend on system size." },
        { title: "Mechanical contractor", detail: "One more year of experience plus the contractor exam." },
        { title: "Other categories", detail: "Refrigeration, natural gas piping and other mechanical licenses follow the same ladder." },
      ],
      licenseAgency: MECHANICAL,
      extraCredentials: ["Oklahoma mechanical journeyman or contractor license (HVAC)"],
      training: [TECH_CENTER],
      businessNote: "Running one in Oklahoma takes a mechanical contractor license, a $5,000 bond and at least $50,000 in liability insurance.",
    }),
    t("carpenter", {
      outlook: ol([5290, 5520, 4, 410]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("carpenters"),
      licenseAgency: CIB_FAQ,
      training: [TULSA_TECH_CARPENTRY, TECH_CENTER, national("Carpenters union (UBC) training", "ubc-carpenter-apprenticeship", "Union carpentry apprenticeships.")],
    }),
    t("plumber", {
      outlook: ol([7820, 8170, 4, 680]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Oklahoma licenses plumbers through the Construction Industries Board. Apprentices register, a journeyman license takes three years (6,000 hours) working for a licensed plumbing contractor plus an exam, and a contractor license takes one more year. Approved classroom programs can stand in for up to two years of experience.",
      licenseSteps: [
        { title: "Registered apprentice", detail: "Register with the CIB and work for a licensed plumbing contractor." },
        { title: "Journeyman plumber", detail: "Three years (6,000 hours) of experience plus the state exam. A residential journeyman license covers homes only." },
        { title: "Plumbing contractor", detail: "One more year of experience plus the contractor exam." },
        { title: "Keep it current", detail: "Six hours of continuing education every three years." },
      ],
      licenseAgency: PLUMBING,
      extraCredentials: ["Oklahoma journeyman or contractor plumbing license"],
      training: [TULSA_TECH_PLUMBING, TECH_CENTER, national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Five-year paid union apprenticeships in plumbing and pipefitting.")],
      ownBusiness: "Running a plumbing business in Oklahoma takes a plumbing contractor license, a $5,000 bond and at least $50,000 in liability insurance.",
    }),
    t("painter", {
      outlook: ol([2830, 2910, 3, 230]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("painters"),
      licenseAgency: CIB_FAQ,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([2800, 2810, 1, 190]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("concrete finishers"),
      licenseAgency: CIB_FAQ,
      training: [LEARN_ON_JOB("Concrete and site contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([250, 260, 4, 20]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("drywall installers"),
      licenseAgency: CIB_FAQ,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([110, 120, 5, 10]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Oklahoma's Department of Labor licenses elevator mechanics, elevator contractors and inspectors. Apart from apprentices working under the direct supervision of a licensed mechanic, nobody may work on elevators without a mechanic license, and licensed mechanics must work for a licensed elevator contractor.",
      licenseSteps: [
        { title: "Apprentice", detail: "Work under the direct supervision of a licensed mechanic. No license needed." },
        { title: "Training program", detail: "The union's NEIEP program or a registered elevator apprenticeship." },
        { title: "Elevator mechanic license", detail: "Apply to the Department of Labor once you meet the training or experience rules. The license renews every year." },
        { title: "Lead mechanic", detail: "Run installs and service on your own." },
      ],
      licenseAgency: ELEVATOR,
      extraCredentials: ["Oklahoma elevator mechanic license"],
      training: [NEIEP],
      ownBusiness: "Elevator companies need an Oklahoma elevator contractor license and licensed mechanics, so most mechanics work for established companies.",
    }),
    t("flooring-installer", {
      outlook: ol([130, 140, 8, 10]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("flooring installers"),
      licenseAgency: CIB_FAQ,
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([520, 540, 3, 40]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("glaziers"),
      licenseAgency: CIB_FAQ,
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([830, 860, 4, 70]),
      stateLicense: "none",
      licenseSummary: "Oklahoma has no state license for installing insulation. Removing old insulation that contains asbestos is different: that work takes a Department of Labor asbestos worker license.",
      licenseAgency: { label: "Oklahoma Department of Labor, asbestos abatement worker license", url: "https://www.oklahoma.gov/labor/safety-and-health/workplace-safety/asbestos-abatement/licensing-requirements/asbestos-abatement-worker-license.html" },
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([830, 860, 4, 70]),
      stateLicense: "none",
      licenseSummary: "Oklahoma has no ironworker license. Ironworkers who make code-required structural steel welds need a Department of Labor welder license for that work.",
      licenseAgency: WELDING_SCOPE,
      ownBusiness: "Steel erection companies need heavy equipment and big insurance policies, so most ironworkers work for established firms.",
      training: [IRONWORKERS_584, national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork.")],
    }),
    t("mason", {
      outlook: ol([750, 780, 3, 60]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("masons"),
      licenseAgency: CIB_FAQ,
      training: [LEARN_ON_JOB("Masonry contractors"), national("Bricklayers union (BAC)", "bac-bricklayer-apprenticeship", "Union apprenticeships for brick, block and stone masons.")],
    }),
    t("millwright", {
      outlook: ol([220, 220, 0, 20]),
      stateLicense: "none",
      licenseSummary: "Oklahoma has no state license for millwrights. Employers hire on training, experience and precision.",
      training: [TECH_CENTER, national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Oklahoma licenses pipefitting through the Construction Industries Board's mechanical licenses, in categories like process piping and natural gas piping. Apprentices register, a journeyman license takes three years in the category plus an exam, and a contractor license takes one more year. Permanent employees working inside a manufacturing plant are exempt.",
      licenseSteps: [
        { title: "Registered apprentice", detail: "Register with the CIB at 16 or older." },
        { title: "Mechanical journeyman", detail: "Three years in process piping or natural gas piping plus the exam." },
        { title: "Mechanical contractor", detail: "One more year of experience plus the contractor exam." },
        { title: "Specialties", detail: "Refinery process piping and medical gas have their own journeyman licenses." },
      ],
      licenseAgency: MECH_CATEGORIES,
      extraCredentials: ["Oklahoma mechanical journeyman license (process or natural gas piping)"],
      ownBusiness: "Piping contractors need crews, insurance and an Oklahoma mechanical contractor license, plus a $5,000 bond.",
      training: [national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Five-year paid union apprenticeships in pipefitting."), TECH_CENTER],
    }),
    t("plasterer-stucco-mason", {
      stateLicense: "none",
      licenseSummary: noTradeLicense("plasterers"),
      licenseAgency: CIB_FAQ,
      payNote: "Oklahoma publishes no job projection for this very small trade, and its pay figures come from a small sample.",
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([1160, 1230, 6, 90]),
      stateLicense: "contractor",
      licenseSummary:
        "Oklahoma has no license for individual roofers. Roofing companies register with the Construction Industries Board and carry at least $500,000 in liability insurance. Commercial roofing needs an endorsement, an exam and $1 million in insurance, and a residential roofing endorsement becomes mandatory on January 1, 2028.",
      licenseAgency: ROOFING,
      training: [LEARN_ON_JOB("Roofing contractors")],
      businessNote: "Running one in Oklahoma takes a CIB roofing registration and, from 2028, a residential roofing endorsement with a hands-on exam.",
    }),
    t("sheet-metal-worker", {
      outlook: ol([2970, 2910, -2, 230]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Sheet metal is one of Oklahoma's mechanical license categories. Apprentices register with the Construction Industries Board, a journeyman license takes three years in sheet metal plus an exam, and a contractor license takes one more year. It is the only trade on this page projected to shrink in Oklahoma.",
      licenseAgency: MECH_CATEGORIES,
      extraCredentials: ["Oklahoma mechanical journeyman license (sheet metal)"],
      training: [SMART_124, TECH_CENTER],
    }),
    t("solar-installer", {
      stateLicense: "none",
      licenseSummary: "Oklahoma has no separate solar license. The wiring side of a solar job is electrical work, which falls under the state's electrical licenses.",
      licenseAgency: ELECTRICAL,
      payNote: "BLS doesn't publish Oklahoma figures for solar installers, so pay is the national figure, and Oklahoma has no projection for this small trade.",
      training: [OK_ELECTRICAL_JATCS],
    }),
    t("sprinkler-fitter", {
      stateLicense: "worker-certification",
      licenseSummary:
        "Oklahoma's Department of Labor licenses fire sprinkler work at every level: trainees, technicians, managers and companies. A licensed technician or manager must be on every job site, and new trainees are registered within 15 business days of being hired.",
      licenseSteps: [
        { title: "Technician trainee", detail: "Registered by your employer within 15 business days of hire. Up to three trainees per manager on a job site." },
        { title: "Technician", detail: "A Department of Labor license to install and service systems. NICET Level III or higher qualifies." },
        { title: "Manager", detail: "Every sprinkler company must employ a licensed manager." },
        { title: "Company license", detail: "Residential or commercial, held by the business." },
      ],
      licenseAgency: SPRINKLER,
      extraCredentials: ["Oklahoma fire sprinkler technician license"],
      training: [UA_669],
      ownBusiness: "Opening a sprinkler company in Oklahoma takes a Department of Labor company license and a licensed manager on staff.",
    }),
    t("tile-setter", {
      outlook: ol([260, 280, 9, 20]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("tile setters"),
      licenseAgency: CIB_FAQ,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: noTradeLicense("waterproofing installers"),
      licenseAgency: CIB_FAQ,
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Tuition-free tech center programs",
      detail:
        "High school students attend Oklahoma's CareerTech technology centers tuition-free, in programs like electrical, plumbing, HVAC, carpentry and welding. Many programs are open to juniors and seniors.",
      source: TECH_CENTERS,
    },
    {
      title: "Student electrical apprentices",
      detail: "Students 16 and older in high school and an approved work-ready program, working for a licensed electrical contractor, can count up to 500 hours a school year toward an electrical license.",
      source: STUDENT_APPRENTICE,
    },
    {
      title: "Free college credit in high school",
      detail: "Oklahoma waives tuition on up to 18 concurrent enrollment college credit hours for seniors and up to 9 for juniors.",
      source: CONCURRENT,
    },
    {
      title: "Oklahoma's Promise",
      detail: "Students who apply in grades 8 to 12 and meet family income limits can earn tuition money that also works in qualifying technology center programs.",
      source: OK_PROMISE,
    },
  ],
  adults: [
    {
      title: "Adult tech center programs",
      detail: "Adults can take the same trade programs at technology centers for low tuition. Some centers go further for recent graduates: Tulsa Tech, for example, is tuition-free through age 23 for in-district graduates.",
      source: TECH_SCHOLARSHIPS,
    },
    {
      title: "Apprenticeship Oklahoma",
      detail: "CareerTech's apprenticeship office helps employers start registered apprenticeships, with classroom training at the technology centers.",
      source: APPRENTICESHIP_OK,
    },
    {
      title: "Union apprenticeships",
      detail: "Paid union apprenticeships run in Oklahoma City and Tulsa, including electrical (IBEW Locals 1141 and 584), sheet metal (SMART Local 124) and ironwork (Ironworkers Local 584).",
      source: { label: "Apprenticeship.gov, Ironworkers Local 584 registered apprenticeship (open house listing, April 2026)", url: "https://www.apprenticeship.gov/node/805637" },
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Oklahoma statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Plasterers, Oklahoma wages, May 2025 (BLS via O*NET)", url: "https://www.onetonline.org/link/localwages/47-2161.00?st=OK" },
    { label: "Solar installers, national wages, May 2025 (BLS; no Oklahoma estimate published)", url: "https://www.onetonline.org/link/localwages/47-2231.00?st=OK" },
    { label: "Oklahoma long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=OK" },
    CIB_FAQ,
    ELECTRICAL,
    ELECTRICAL_CE,
    PLUMBING,
    MECHANICAL,
    ROOFING,
    ROOFING_2028,
    WELDING,
    ELEVATOR,
    SPRINKLER,
    BOND,
    TECH_CENTERS,
    CONCURRENT,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
