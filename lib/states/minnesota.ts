// Minnesota state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Minnesota-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Minnesota";

const DLI_ELECTRICAL: SourceRef = { label: "Minnesota Department of Labor and Industry, electrician licensing (Minn. Stat. ch. 326B)", url: "https://dli.mn.gov/node/5526" };
const DLI_PLUMBING: SourceRef = { label: "Minnesota Department of Labor and Industry, plumber licensing", url: "https://dli.mn.gov/node/5541" };
const DLI_MECHANICAL_BOND: SourceRef = { label: "Minnesota DLI, mechanical contractor bond (no individual HVAC license)", url: "https://dli.mn.gov/business/plumbing-contractors/mechanical-contractor-bond" };
const DLI_RBC: SourceRef = { label: "Minnesota DLI, Residential Building Contractor and Remodeler licensing", url: "https://www.dli.mn.gov/node/6536" };
const DLI_ROOFER: SourceRef = { label: "Minnesota DLI, Residential Roofer license", url: "https://dli.mn.gov/business/residential-contractors/roofer-license" };
const DLI_ELEVATOR: SourceRef = { label: "Minnesota DLI, elevator constructor licensing (Minn. Stat. 326B.164)", url: "https://www.dli.mn.gov/node/6541" };
const DPS_FIRE_MARSHAL: SourceRef = { label: "Minnesota Dept. of Public Safety, State Fire Marshal Division, fire protection licensing (Minn. Stat. ch. 299M)", url: "https://dps.mn.gov/divisions/sfm/services/licensing-and-permits/fire-sprinklers/fire-protection-licensing-requirements" };
const DLI_HPP: SourceRef = { label: "Minnesota DLI, High Pressure Piping licensing", url: "https://dli.mn.gov/business/high-pressure-piping-contractors/faqs-about-high-pressure-piping" };
const DLI_SOLAR: SourceRef = { label: "Minnesota DLI, solar installer licensing requirement", url: "https://www.dli.mn.gov/business/electrical-contractors/solar-installer-licensing-requirement" };
const DLI_CONTRACTOR_REG: SourceRef = { label: "Minnesota DLI, construction contractor registration", url: "https://dli.mn.gov/business/construction-contractor-registration" };
const PSEO: SourceRef = { label: "Minnesota Office of Higher Education, Postsecondary Enrollment Options (PSEO)", url: "https://ohe.mn.gov/student-resources/current-students/many-ways-earn-credit-college/postsecondary-enrollment-options" };
const SCHOLARSHIP_3M: SourceRef = { label: "3M Skilled Trade Scholarship Program (Minnesota State)", url: "https://www.minnstate.edu/admissions/3mscholarship.html" };
const DLI_APPRENTICESHIP: SourceRef = { label: "Minnesota DLI, registered apprenticeship program", url: "https://dli.mn.gov/business/workforce/start-apprenticeship-program" };

const HENNEPIN_TECH: TrainingOption = {
  name: "Hennepin Technical College",
  kind: "college",
  where: "Brooklyn Park and Eden Prairie",
  detail: "Carpentry, Electrician, Plumbing and Facilities Maintenance programs in the Twin Cities metro.",
  url: "https://hennepintech.edu/academic-programs/architecture-construction/carpentry.html",
};
const DUNWOODY: TrainingOption = {
  name: "Dunwoody College of Technology, Electrical Construction & Maintenance",
  kind: "college",
  where: "Minneapolis",
  detail: "An A.A.S. in electrical construction and maintenance, expanded in 2022-2023 to meet rising construction-industry demand.",
  url: "https://catalog.dunwoody.edu/catalog-student-handbook/academic-programs/construction-sciences-building-technology/electrical-construction-maintenance-elec-aas/",
};
const SCTCC: TrainingOption = {
  name: "St. Cloud Technical & Community College",
  kind: "college",
  where: "St. Cloud",
  detail: "Carpentry, Electrical Construction Technology, and Heating/Air Conditioning/Refrigeration.",
  url: "https://sctcc.edu/construction",
};
const RIVERLAND: TrainingOption = {
  name: "Riverland Community College",
  kind: "college",
  where: "Rochester, Albert Lea and Austin",
  detail: "Commercial Carpentry and Residential Carpentry diplomas, plus a Construction Electrician program.",
  url: "https://riverland.edu/academics/divisions/construction/",
};
const LAKE_SUPERIOR_COLLEGE: TrainingOption = {
  name: "Lake Superior College",
  kind: "college",
  where: "Duluth",
  detail: "A Carpentry A.A.S. and a Commercial and Residential Wiring (electrical) A.A.S., serving northeastern Minnesota.",
  url: "https://www.lsc.edu/degrees/carpentry-aas/",
};
const ABC_MN_ND: TrainingOption = {
  name: "ABC of Minnesota and North Dakota apprenticeships",
  kind: "open-shop",
  where: "Statewide",
  detail: "Open-shop apprenticeship and craft training across the building trades.",
  url: "https://www.mnabc.com/EDUCATION-TRAINING/Apprenticeship-Craft-Training",
};
const MPLS_ELECTRICAL_JATC: TrainingOption = {
  name: "Minneapolis Electrical JATC",
  kind: "union",
  where: "Twin Cities metro (St. Michael)",
  detail: "A paid union electrical apprenticeship serving the Twin Cities metro.",
  url: "https://www.dli.mn.gov/business/workforce/construction-electrician-apprenticeships",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const MPLS_PLUMBERS: TrainingOption = {
  name: "Minneapolis Plumbers Joint Journeyman and Apprentice Training",
  kind: "union",
  where: "Minneapolis-St. Paul",
  detail: "A paid union plumbing apprenticeship serving the Twin Cities metro.",
  url: "https://www.dli.mn.gov/node/7116",
  programSlug: "ua-plumber-pipefitter-apprenticeship",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noStateLicense = (what: string) =>
  `Minnesota has no individual state worker license for ${what}. A single-trade subcontractor generally needs no state license at all; only a business combining two or more specialty skills on residential jobs, or self-employed workers, need to register with DLI.`;

export const MINNESOTA: StateGuide = {
  // Minnesota ZIP codes run 550xx-567xx.
  locationHints: { zip3: [[550, 567]], cities: ["Minneapolis", "St. Paul", "Duluth", "Rochester", "St. Cloud", "Bloomington", "Brooklyn Park", "Plymouth"] },
  slug: "minnesota",
  code: "MN",
  name: S,
  lastVerified: "2026-11-21",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Minnesota long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=MN",
  },
  intro:
    "A field guide to 25 construction trades in Minnesota: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ roughly 131,500 people in Minnesota, with about 11,200 openings a year projected through 2034, more than any other state built on this site so far.",
    "Minnesota is more heavily regulated than its neighbors: the Department of Labor and Industry individually licenses electricians, plumbers, elevator constructors and high-pressure pipefitters, each with journeyworker and master tiers.",
    "HVAC is a notable exception: there is no individual state HVAC worker license at all, only a $25,000 bond the contracting business has to file.",
    "Fire sprinkler fitters are licensed through a completely different agency, the Department of Public Safety's State Fire Marshal Division, not the Department of Labor and Industry.",
    "Construction laborers and carpenters are the two biggest trades here, together making up nearly half the employment on this page.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "3M Skilled Trade Scholarship", value: "$15,000", note: "Over two years ($7,500/year) for students pursuing construction, advanced manufacturing or transportation at any Minnesota State college or university" },
  licensingOverview:
    "Minnesota licenses more trades individually than most of its neighbors. The Department of Labor and Industry (DLI) issues exam-based journeyworker and master licenses for electricians, plumbers, elevator constructors and high-pressure pipefitters (a separate credential from plumbing, covering steam and ammonia piping). Fire sprinkler fitters are licensed by a different agency entirely, the Department of Public Safety's State Fire Marshal Division. HVAC work has no individual state license at all, just a business-level bond. Carpenters, masons, drywall installers, painters and most other trades on this page need no individual state license either, though a business combining more than one of those specialty skills on residential jobs needs a Residential Building Contractor or Remodeler license, and anyone self-employed in a single trade typically needs a simple DLI contractor registration.",
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
      "Single-trade subcontractors (carpentry, masonry, drywall and more) are explicitly exempt from Minnesota's broader Residential Building Contractor license, lowering the bar to go out on your own in those trades.",
      "Minnesota's registered apprenticeship program is run directly by DLI, giving a single statewide point of contact rather than a patchwork.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "A business that combines more than one specialty skill on residential jobs needs the broader, more expensive Residential Building Contractor license, with its own bond, insurance and exam requirements.",
    ],
    path:
      "The usual route: work for someone else for years, earn your license where one exists, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      DLI_RBC,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([39450, 42380, 7, 3510]),
      stateLicense: "none",
      licenseSummary: "Minnesota has no license for construction laborers. It is by far the largest trade on this page, nearly 30% of all the employment tracked here.",
      licenseAgency: DLI_CONTRACTOR_REG,
      training: [ABC_MN_ND, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([14270, 16150, 13, 1490]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Minnesota requires electricians to be licensed or registered with DLI. Registered unlicensed electricians work under a licensed electrician's direct supervision while learning. A journeyworker electrician needs 48 months of experience (at least 24 wiring and installation) and passes a written exam; a master electrician needs an electrical engineering degree, one year as a journeyworker, or five years of planning and supervising electrical work, plus an exam. It is the fastest-growing licensed trade on this page.",
      licenseSteps: [
        { title: "Registered unlicensed electrician", detail: "Register with DLI and work only under a licensed electrician's direct supervision (no more than 2 unlicensed workers per supervisor)." },
        { title: "Journeyworker electrician", detail: "48 months of experience, at least 24 in wiring and installation, then a written exam. Licenses renew every 2 years." },
        { title: "Master electrician", detail: "An electrical engineering degree, 1 year as a journeyworker, or 5 years supervising electrical installations, then an exam." },
      ],
      licenseAgency: DLI_ELECTRICAL,
      extraCredentials: ["Minnesota journeyworker or master electrician license"],
      training: [MPLS_ELECTRICAL_JATC, DUNWOODY, HENNEPIN_TECH],
      businessNote: "Electrical contracting is its own separate business license from DLI, apart from the individual worker license.",
    }),
    t("equipment-operator", {
      outlook: ol([8220, 8720, 6, 730]),
      stateLicense: "none",
      licenseSummary: "Minnesota has no state license for equipment operators. Employers look for training records and safe hours in the seat, and crane operators need national certification under federal OSHA rules.",
      licenseAgency: DLI_CONTRACTOR_REG,
      training: [national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([10000, 10080, 1, 980]),
      stateLicense: "none",
      licenseSummary: "Minnesota has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      licenseAgency: DLI_CONTRACTOR_REG,
      training: [SCTCC],
    }),
    t("hvac-technician", {
      outlook: ol([5490, 6100, 11, 540]),
      stateLicense: "contractor",
      licenseSummary:
        "Minnesota has no individual HVAC worker license. Instead, a mechanical contracting business must file a $25,000 bond with DLI before taking on gas, heating, ventilation, cooling or refrigeration work. Some cities may require their own local competency card for individual technicians; DLI doesn't track those, so ask locally.",
      licenseSteps: [
        { title: "No individual license", detail: "Minnesota has no individual HVAC worker license." },
        { title: "Mechanical contractor bond (business)", detail: "A $25,000 bond filed with DLI before a business can take on HVAC-related work." },
        { title: "Local competency card (some cities)", detail: "Some cities may require their own local card for individual technicians; DLI doesn't track those." },
      ],
      licenseAgency: DLI_MECHANICAL_BOND,
      training: [SCTCC, HENNEPIN_TECH],
      businessNote: "The mechanical contractor bond costs $100 to file and runs for two years.",
    }),
    t("carpenter", {
      outlook: ol([22430, 23370, 4, 1720]),
      stateLicense: "none",
      licenseSummary: noStateLicense("carpenters") + " It's the second-largest trade on this page.",
      licenseAgency: DLI_RBC,
      training: [HENNEPIN_TECH, RIVERLAND, LAKE_SUPERIOR_COLLEGE],
    }),
    t("plumber", {
      outlook: ol([9300, 9990, 7, 850]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Minnesota requires plumbers to be licensed or registered with DLI. An unlicensed individual works under a master plumber while learning. A journeyworker plumber completes a registered apprenticeship or enough verified experience, then an exam; a master plumber needs at least a year as a journeyworker, then an exam, and can generally take on a broader range of systems statewide, including some exterior water, sanitary and storm sewer work. A restricted track covers plumbers working only in towns under 5,000 people.",
      licenseSteps: [
        { title: "Unlicensed individual", detail: "Register with DLI and work under a licensed master plumber while learning installations." },
        { title: "Journeyworker plumber", detail: "Complete a registered apprenticeship, or sufficient verified experience, then pass the exam." },
        { title: "Master plumber", detail: "At least 1 year as a licensed journeyworker, then pass the exam." },
      ],
      licenseAgency: DLI_PLUMBING,
      extraCredentials: ["Minnesota journeyworker or master plumber license"],
      training: [MPLS_PLUMBERS, HENNEPIN_TECH],
      ownBusiness: "Journeyworker and master plumber licenses renew every two years, with 16 hours of continuing education including at least 8 on the state plumbing code.",
    }),
    t("painter", {
      outlook: ol([6430, 6680, 4, 530]),
      stateLicense: "none",
      licenseSummary: noStateLicense("painters"),
      licenseAgency: DLI_CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([3990, 4020, 1, 270]),
      stateLicense: "none",
      licenseSummary: noStateLicense("concrete finishers"),
      licenseAgency: DLI_RBC,
      training: [LEARN_ON_JOB("Concrete and site contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([800, 830, 5, 60]),
      stateLicense: "none",
      licenseSummary: noStateLicense("drywall installers"),
      licenseAgency: DLI_RBC,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([480, 530, 9, 40]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Minnesota requires elevator constructors to be licensed or registered with DLI. Registered unlicensed workers can do limited maintenance tasks after a year of experience and work other installations only under direct supervision. A journeyworker completes a 4-year registered elevator apprenticeship or 9,000 hours over 5 years; a master needs a year as a journeyworker or 6 years planning and supervising elevator work. Separate, lower-barrier limited tiers cover residential elevators, platform lifts and stairway chairlifts.",
      licenseSteps: [
        { title: "Registered unlicensed worker", detail: "Register with DLI and work under a licensed journeyworker or master's direct supervision." },
        { title: "Journeyworker elevator constructor", detail: "A 4-year registered apprenticeship, or 9,000 hours over 5 years for a licensed elevator contractor, then an exam." },
        { title: "Limited journeyworker (optional)", detail: "A narrower license covering only residential elevators, platform lifts and dumbwaiters, needing 2 years of that specific experience." },
        { title: "Master elevator constructor", detail: "1 year as a journeyworker, or 6 years planning and supervising elevator work, then an exam." },
      ],
      licenseAgency: DLI_ELEVATOR,
      extraCredentials: ["Minnesota journeyworker or master elevator constructor license"],
      training: [national("Elevator Constructors union (IUEC) training", "neiep-elevator-constructor-apprenticeship", "Union elevator apprenticeship through the National Elevator Industry Educational Program.")],
      ownBusiness: "Elevator work takes specialized tools, insurance and manufacturer relationships, so most mechanics work for established companies.",
    }),
    t("flooring-installer", {
      stateLicense: "none",
      licenseSummary: noStateLicense("flooring installers"),
      licenseAgency: DLI_CONTRACTOR_REG,
      payNote: "Minnesota publishes no job-count projection for this trade, so this page shows the national figures.",
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([340, 340, -2, 30]),
      stateLicense: "none",
      licenseSummary: noStateLicense("glaziers") + " It's one of only two trades on this page projected to shrink in Minnesota.",
      licenseAgency: DLI_CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([1160, 1200, 4, 100]),
      stateLicense: "none",
      licenseSummary: noStateLicense("insulation installers"),
      licenseAgency: DLI_CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([820, 810, -1, 60]),
      stateLicense: "none",
      licenseSummary: noStateLicense("ironworkers") + " It's one of only two trades on this page projected to shrink in Minnesota.",
      licenseAgency: DLI_CONTRACTOR_REG,
      ownBusiness: "Steel erection companies need heavy equipment and big insurance policies, so most ironworkers work for established firms.",
      training: [national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork.")],
    }),
    t("mason", {
      outlook: ol([1660, 1660, 0, 120]),
      stateLicense: "none",
      licenseSummary: noStateLicense("masons"),
      licenseAgency: DLI_RBC,
      training: [LEARN_ON_JOB("Masonry contractors"), national("Bricklayers union (BAC)", "bac-bricklayer-apprenticeship", "Union apprenticeships for brick, block and stone masons.")],
    }),
    t("millwright", {
      outlook: ol([460, 480, 4, 40]),
      stateLicense: "none",
      licenseSummary: "Minnesota has no state license for millwrights. Employers hire on training, experience and precision.",
      licenseAgency: DLI_CONTRACTOR_REG,
      training: [national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Minnesota licenses high-pressure piping work (steam above 15 psi, high-temperature heating fluids, ammonia refrigeration and bioprocess piping) separately from plumbing, through DLI's High Pressure Piping program: journeyworker pipefitter (4 years of experience, an exam) and master pipefitter (5 years, an exam). This is a different credential from the Fire Protection license fire sprinkler fitters need, which doesn't cover this scope.",
      licenseSteps: [
        { title: "Registered unlicensed worker", detail: "Work under a licensed master or journeyworker pipefitter's direct supervision, or in an approved apprenticeship." },
        { title: "Journeyworker pipefitter", detail: "4 years of practical high-pressure-piping experience, then an exam (minimum score 70)." },
        { title: "Master pipefitter", detail: "5 years of practical experience, then an exam (minimum score 70). A business must employ a master pipefitter before it can hold an HPP contractor license." },
      ],
      licenseAgency: DLI_HPP,
      extraCredentials: ["Minnesota journeyworker or master pipefitter (High Pressure Piping) license"],
      ownBusiness: "Piping contractors need crews, insurance and a licensed master pipefitter on staff before they can get a High Pressure Piping contractor license.",
      training: [MPLS_PLUMBERS, national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Paid union apprenticeships in pipefitting.")],
    }),
    t("plasterer-stucco-mason", {
      outlook: ol([140, 140, 4, 10]),
      stateLicense: "none",
      licenseSummary: noStateLicense("plasterers"),
      licenseAgency: DLI_RBC,
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([2490, 2530, 2, 180]),
      stateLicense: "contractor",
      licenseSummary:
        "Minnesota is one of the few states that licenses residential roofing on its own, separate from other trades. Only the company needs the license, not each individual roofer; the business designates a qualifying person who passes DLI's prelicensing exam (no prior experience or education required), and the company carries a $15,000 surety bond and liability insurance.",
      licenseAgency: DLI_ROOFER,
      extraCredentials: ["Minnesota Residential Roofer license (company-level)"],
      training: [LEARN_ON_JOB("Roofing contractors")],
      businessNote: "The roofer license costs $180 plus a background check, bond and insurance; the designated qualifying person must also complete continuing education to keep the license active.",
    }),
    t("sheet-metal-worker", {
      outlook: ol([2390, 2470, 3, 200]),
      stateLicense: "none",
      licenseSummary: "Minnesota has no general state license for sheet metal workers.",
      licenseAgency: DLI_CONTRACTOR_REG,
      training: [national("Sheet metal apprenticeships (SMART)", "smart-sheet-metal-apprenticeship", "Union sheet metal apprenticeships.")],
    }),
    t("solar-installer", {
      stateLicense: "none",
      licenseSummary: "Minnesota has no standalone solar installer license. Since July 2023, a company selling and installing solar panels directly for homeowners must hold a Residential Building Contractor or Remodeler license, but the actual wiring must be done by a Minnesota-licensed electrical contractor.",
      licenseAgency: DLI_SOLAR,
      training: [DUNWOODY, MPLS_ELECTRICAL_JATC],
    }),
    t("sprinkler-fitter", {
      stateLicense: "worker-certification",
      licenseSummary:
        "Minnesota licenses fire protection work through the Department of Public Safety's State Fire Marshal Division, not DLI. A licensed fire protection contractor must employ a certified managing employee (10,000 hours of experience, NICET Level III/IV, or a PE with fire-protection design competency) and certified journeyman sprinkler fitters (8,000 hours of experience or a completed apprenticeship), each passing a 70%-minimum exam.",
      licenseSteps: [
        { title: "Apprentice", detail: "Work under a certified journeyman sprinkler fitter's direct supervision while completing a state or federal apprenticeship." },
        { title: "Journeyman sprinkler fitter", detail: "8,000 hours of fire-protection work experience, or a completed apprenticeship, then an exam (minimum score 70)." },
        { title: "Managing employee (business-level)", detail: "10,000 hours of experience, NICET Level III or IV, or a PE license with fire-protection design competency, then an exam." },
      ],
      licenseAgency: DPS_FIRE_MARSHAL,
      extraCredentials: ["Minnesota journeyman sprinkler fitter certification"],
      training: [national("Sprinkler Fitters union (UA)", "ua-sprinkler-fitter-apprenticeship", "Five-year registered apprenticeship through a signatory contractor.")],
      ownBusiness: "Opening a Minnesota fire protection contracting business takes a State Fire Marshal license, with a certified managing employee and certified journeyman sprinkler fitters on staff.",
    }),
    t("tile-setter", {
      outlook: ol([800, 860, 9, 60]),
      stateLicense: "none",
      licenseSummary: noStateLicense("tile setters"),
      licenseAgency: DLI_CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: noStateLicense("waterproofing installers"),
      licenseAgency: DLI_CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Postsecondary Enrollment Options (PSEO)",
      detail: "Minnesota's statewide dual-enrollment program is tuition-free for 10th-, 11th- and 12th-graders at any eligible Minnesota college, including the technical colleges with trades programs listed on this page. Construction trades have no youth-apprenticeship, on-the-jobsite pathway: Minnesota's Youth Skills Training program explicitly excludes construction, so PSEO plus CTE coursework is the realistic high-school route in.",
      source: PSEO,
    },
  ],
  adults: [
    {
      title: "3M Skilled Trade Scholarship",
      detail: "Up to $15,000 over two years ($7,500/year) at any Minnesota State college or university, for students pursuing construction, advanced manufacturing or transportation, with extra eligibility paths for St. Paul-area students and those underrepresented in the trades.",
      source: SCHOLARSHIP_3M,
    },
    {
      title: "Minnesota DLI registered apprenticeship",
      detail: "Minnesota's registered apprenticeship programs are registered and supported directly by the Department of Labor and Industry, though each program is actually run day-to-day by an employer or third-party sponsor.",
      source: DLI_APPRENTICESHIP,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Minnesota statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Minnesota long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=MN" },
    DLI_ELECTRICAL,
    DLI_PLUMBING,
    DLI_MECHANICAL_BOND,
    DLI_RBC,
    DLI_ROOFER,
    DLI_ELEVATOR,
    DPS_FIRE_MARSHAL,
    DLI_HPP,
    DLI_SOLAR,
    DLI_CONTRACTOR_REG,
    PSEO,
    SCHOLARSHIP_3M,
    DLI_APPRENTICESHIP,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
