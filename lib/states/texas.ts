// Texas state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Texas-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, UA_669, NEIEP, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Texas";

const NO_GC: SourceRef = { label: "Texas Sunset Advisory Commission, Texas Residential Construction Commission (abolished Sept. 1, 2009)", url: "https://www.sunset.texas.gov/reviews-and-reports/agencies/texas-residential-construction-commission" };
const TDLR: SourceRef = { label: "Texas Department of Licensing and Regulation (TDLR), regulated programs", url: "https://www.tdlr.texas.gov/" };
const ELEC_FAQ: SourceRef = { label: "TDLR, electricians FAQ: a license is required before doing any electrical work", url: "https://www.tdlr.texas.gov/electricians/elecfaq.htm" };
const JOURNEYMAN_ELEC: SourceRef = { label: "TDLR, Journeyman Electrician license (8,000 hours)", url: "https://www.tdlr.texas.gov/electricians/apply/individuals/journeyman-electrician.htm" };
const MASTER_ELEC: SourceRef = { label: "TDLR, Master Electrician license (12,000 hours, 2 years as journeyman)", url: "https://www.tdlr.texas.gov/electricians/apply/individuals/master-electrician.htm" };
const WIREMAN: SourceRef = { label: "TDLR, Residential Wireman license (4,000 hours or an approved CTE program)", url: "https://www.tdlr.texas.gov/electricians/apply/individuals/wireman.htm" };
const ELEC_CONTRACTOR: SourceRef = { label: "TDLR, Electrical Contractor license (master of record, insurance)", url: "https://www.tdlr.texas.gov/electricians/apply/businesses/contractor-elec.htm" };
const TSBPE: SourceRef = { label: "Texas State Board of Plumbing Examiners (TSBPE), license types", url: "https://tsbpe.texas.gov/license-types" };
const TSBPE_RULES: SourceRef = { label: "TSBPE rules, 22 TAC 363.6(e): high school CTE route to Tradesman Plumber-Limited", url: "https://tsbpe.texas.gov/wp-content/uploads/documents/TSBPE_AdministrativeRules_March2026.pdf" };
const ACR_TECH: SourceRef = { label: "TDLR, air conditioning and refrigeration technician registration", url: "https://www.tdlr.texas.gov/acr/technician-apply.htm" };
const ACR_EXEMPT: SourceRef = { label: "TDLR, technician registration exemption for new construction", url: "https://www.tdlr.texas.gov/acr/technician-exempt.htm" };
const ACR_CONTRACTOR: SourceRef = { label: "TDLR, air conditioning and refrigeration contractor license (Class A and B)", url: "https://www.tdlr.texas.gov/acr/contractor-apply.htm" };
const ELEVATOR: SourceRef = { label: "TDLR, elevators at a glance: contractor and inspector registration", url: "https://www.tdlr.texas.gov/media/pdf/ELE%20at%20a%20Glance.pdf" };
const ELEVATOR_FAQ: SourceRef = { label: "TDLR, elevator FAQ: contractor registration and Responsible Parties", url: "https://www.tdlr.texas.gov/elevator/elefaq.htm" };
const SPRINKLER: SourceRef = { label: "Texas State Fire Marshal's Office, fire sprinkler registration and RME licenses", url: "https://tdi.texas.gov/fire/information-fire-sprinkler-registration-license-test.html" };
const SOLAR: SourceRef = { label: "TDLR, residential solar retail sales now regulated (installation stays electrical work)", url: "https://www.tdlr.texas.gov/news/2025/09/10/residential-solar-retail-sales-now-regulated-by-tdlr" };
const FAST: SourceRef = { label: "Texas Higher Education Coordinating Board, Financial Aid for Swift Transfer (FAST)", url: "https://www.highered.texas.gov/student-financial-aid-programs/fast" };
const TEA_IBC: SourceRef = { label: "Texas Education Agency, 2025-2030 industry-based certification list", url: "https://tea.texas.gov/student-readiness-and-high-school/college-career-and-military-prep/career-and-technical-education/2025-2030-industry-based-certification-list-for-public-school-accountabilitydoc.pdf" };
const TWC_APPRENTICESHIP: SourceRef = { label: "Texas Workforce Commission, apprenticeship (Chapter 133 classroom funding)", url: "https://www.twc.texas.gov/programs/apprenticeship" };
const TWC_REPORT: SourceRef = { label: "Texas Workforce Commission, 2026 report on available apprenticeships in Texas", url: "https://www.twc.texas.gov/sites/default/files/enterprise/docs/2026-report-on-available-apprenticeships-in-texas-twc.pdf" };
const WORKFORCE_BOARDS: SourceRef = { label: "Texas Workforce Commission, local Workforce Solutions boards", url: "https://twc.texas.gov/agency/workforce-development-boards" };
const TSTC_GUARANTEE: SourceRef = { label: "TSTC Money-Back Guarantee", url: "https://www.tstc.edu/money-back-guarantee/" };

const TSTC: TrainingOption = {
  name: "Texas State Technical College (TSTC)",
  kind: "college",
  where: "Campuses including Harlingen, Marshall, New Braunfels, Sweetwater and Waco",
  detail: "Programs in building construction, electrical construction, HVAC, plumbing and pipefitting, solar energy and welding. TSTC offers a money-back guarantee if graduates don't get a job offer within six months, with conditions.",
  url: "https://www.tstc.edu/industry/construction-maintenance",
};
const TX_COLLEGES: TrainingOption = {
  name: "Texas community colleges",
  kind: "college",
  where: "Including Dallas College, Houston City College, Austin Community College and St. Philip's College (San Antonio)",
  detail: "Certificates and degrees in plumbing, electrical, HVAC, welding and construction technology. Dallas College's Tradesman Plumber certificate takes about eight months.",
  url: "https://www.dallascollege.edu/study/plumbing-tech/",
};
const TX_ELECTRICAL_JATCS: TrainingOption = {
  name: "IBEW electrical JATCs",
  kind: "union",
  where: "Houston Electrical JATC, IBEW Local 20 (Dallas-Fort Worth) and the Austin Electrical Training Alliance",
  detail: "Paid union electrical apprenticeships run by IBEW locals and NECA contractors. Houston applicants must be 18 with an algebra credit.",
  url: "https://www.houstonjatc.com",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const IEC_DALLAS: TrainingOption = {
  name: "IEC Dallas electrical apprenticeship",
  kind: "open-shop",
  where: "Dallas",
  detail: "A four-year open-shop electrical apprenticeship: 8,000 hours on the job and 576 classroom hours.",
  url: "https://iecdallaseducation.com/application/pdf/Program_and_Benefits.pdf",
};
const ABC_SOUTH_TEXAS: TrainingOption = {
  name: "ABC South Texas apprenticeship",
  kind: "open-shop",
  where: "San Antonio",
  detail: "Registered apprenticeships in carpentry, electrical, pipefitting, plumbing and sheet metal with NCCER credentials. Tuition runs about $2,450 to $2,825 a year and is usually paid by the employer.",
  url: "https://www.abcsouthtexas.org/construction-apprenticeship-texas-abc-south-texas-2026-2027-program-guide/",
};
const HOUSTON_UNIONS: TrainingOption = {
  name: "Houston union apprenticeships",
  kind: "union",
  where: "Houston area",
  detail: "Plumbers (UA Local 68), pipefitters (Local 211), painters (IUPAT District Council 10), ironworkers (Local 84), sheet metal (SMART Local 54), elevators (IUEC Local 31) and insulators (Local 22).",
  url: "https://www.gcaflcio.org/apprenticeships",
};
const AUSTIN_UNIONS: TrainingOption = {
  name: "Austin union apprenticeships",
  kind: "union",
  where: "Austin area",
  detail: "Carpenters and millwrights (Local 1266), plumbers and pipefitters (Local 286), sheet metal (SMART Local 67), insulators (Local 87), ironworkers (Local 482) and laborers (LiUNA Local 1095).",
  url: "https://www.wfscapitalarea.com/wp-content/uploads/2024/04/WFSCA-Union-Apprenticeships-Guide-2024.pdf",
};
const MC3: TrainingOption = {
  name: "MC3 Apprenticeship Readiness Program",
  kind: "free-training",
  where: "Houston",
  detail: "A free three-week pre-apprenticeship run by the Houston Gulf Coast Building and Construction Trades Council that prepares people to apply to union apprenticeships.",
  url: "https://www.fox26houston.com/news/program-expanding-prepare-more-candidates-paid-apprenticeships-skilled-trades",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noTradeLicense = (what: string) =>
  `Texas has no state license for ${what}, and no state general contractor license either. Some cities run their own contractor registration.`;

export const TEXAS: StateGuide = {
  // Texas ZIP codes: 733, 750-799 and 885 (739 is a small prefix shared near the Oklahoma line, left out).
  locationHints: { zip3: [[733, 733], [750, 799], [885, 885]], cities: ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Corpus Christi", "Lubbock"] },
  slug: "texas",
  code: "TX",
  name: S,
  lastVerified: "2026-11-19",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Texas long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=TX",
  },
  intro:
    "A field guide to 25 construction trades in Texas: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ about 597,000 people in Texas, and the state projects about 56,700 openings a year across them through 2034.",
    "Electricians and plumbers need a state license from their first day: an apprentice license from TDLR for electrical work, or a plumber's apprentice registration with the State Board of Plumbing Examiners.",
    "School can count toward a license: an approved career and technology education program can stand in for the 4,000 hours of work for a Residential Wireman electrical license, and a high school CTE program can do the same for a Tradesman Plumber-Limited license.",
    "Students who qualified for free or reduced-price lunch this school year or in any of the four years before can take dual credit for $0 at participating colleges through the state's FAST program.",
    "Solar installer jobs are projected to grow 43% in Texas through 2034, the fastest of any trade on this page.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "Dual credit for eligible students", value: "$0", note: "Tuition, fees and books under FAST at participating colleges" },
  licensingOverview:
    "Texas has no state general contractor or home builder license (the state commission that registered builders was abolished in 2009). It licenses specific trades instead. TDLR licenses electricians from apprentice to master, air conditioning and refrigeration contractors and technicians, and elevator contractors. The State Board of Plumbing Examiners licenses plumbers from apprentice to master. The State Fire Marshal's Office registers fire sprinkler companies and licenses the managers who run their work. Most other building trades have no state license.",
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
      "Texas has no state general contractor license, so many building trades can start a business without a state license, as long as they follow any city registration rules.",
      "You can start small. Many owners begin with one truck and side jobs before going full-time.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off. Licensed electrical, plumbing and air conditioning businesses must carry state-set liability insurance.",
      "Income swings with the season and the economy, and customers don't always pay on time.",
    ],
    path:
      "The usual route: work for someone else for years, earn your license, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      NO_GC,
      ELEC_CONTRACTOR,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([159660, 179140, 12, 15270]),
      stateLicense: "none",
      licenseSummary: "Texas has no license for construction laborers. It is the biggest trade on this page and the most common way into construction.",
      licenseAgency: NO_GC,
      training: [MC3, AUSTIN_UNIONS, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([76440, 87460, 14, 8100]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Texas licenses electricians through TDLR, and you need an apprentice license before doing any electrical work. A journeyman license takes 8,000 hours of work under a master electrician plus an exam, and a master license takes 12,000 hours plus two years as a journeyman. Every licensed electrician, apprentices included, needs 4 hours of continuing education before each yearly renewal, though apprentices in a registered training program are covered by their classes.",
      licenseSteps: [
        { title: "Apprentice electrician", detail: "A TDLR license ($20, renewed yearly) required before any electrical work, working under a licensed electrician." },
        { title: "Residential Wireman (optional)", detail: "4,000 hours, or an approved career and technology education (CTE) program, plus an exam. Covers homes and apartments up to four stories." },
        { title: "Journeyman electrician", detail: "8,000 hours under a master electrician plus the exam. You can test at 7,000 hours." },
        { title: "Master electrician", detail: "12,000 hours plus two years as a journeyman, and the master exam. Every electrical contractor needs a master of record." },
      ],
      licenseAgency: JOURNEYMAN_ELEC,
      extraCredentials: ["Texas journeyman or master electrician license"],
      training: [TX_ELECTRICAL_JATCS, IEC_DALLAS, ABC_SOUTH_TEXAS, TSTC],
      businessNote: "Running one in Texas takes an electrical contractor license with a master electrician of record and at least $300,000 in liability insurance per occurrence.",
    }),
    t("equipment-operator", {
      outlook: ol([56600, 62400, 10, 5370]),
      stateLicense: "none",
      licenseSummary: "Texas has no state license for equipment operators. Employers look for training records and safe hours in the seat, and crane operators need national certification under federal OSHA rules.",
      licenseAgency: TDLR,
      training: [MC3, national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([59130, 63160, 7, 6300]),
      stateLicense: "none",
      licenseSummary: "Texas has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS), and AWS certifications count as recognized credentials in Texas high schools.",
      licenseAgency: TDLR,
      training: [TSTC, TX_COLLEGES],
    }),
    t("hvac-technician", {
      outlook: ol([33120, 37440, 13, 3350]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Texas requires anyone who helps an air conditioning contractor with maintenance or repair to hold a TDLR technician registration. Installers on new construction are exempt. The business needs a Class A or Class B contractor license, which takes four years of experience and an exam.",
      licenseSteps: [
        { title: "Registered technician", detail: "A TDLR registration ($20, renewed yearly) to help a licensed contractor with maintenance and repair. EPA 608 certification is required to handle refrigerants." },
        { title: "Certified technician (optional)", detail: "24 months of experience or a 2,000-hour approved program, plus an exam." },
        { title: "Class B contractor", detail: "48 months of experience plus the exam. Covers cooling systems up to 25 tons." },
        { title: "Class A contractor", detail: "Same experience, the Class A exam and higher insurance, with no limit on system size." },
      ],
      licenseAgency: ACR_TECH,
      extraCredentials: ["Texas ACR technician registration", "Texas ACR contractor license (Class A or B)"],
      training: [TSTC, TX_COLLEGES, ABC_SOUTH_TEXAS],
      businessNote: "Running one in Texas takes a Class A or B air conditioning contractor license and state-set liability insurance.",
    }),
    t("carpenter", {
      outlook: ol([46540, 50440, 8, 3840]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("carpenters"),
      licenseAgency: NO_GC,
      training: [ABC_SOUTH_TEXAS, AUSTIN_UNIONS, TSTC],
    }),
    t("plumber", {
      outlook: ol([45260, 49280, 9, 4220]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Texas licenses plumbers through the State Board of Plumbing Examiners, and anyone learning the trade must first register as a plumber's apprentice (age 16 and up). A Tradesman Plumber-Limited license takes 4,000 hours, a journeyman license 8,000 hours plus a 48-hour course, and a master license two years as a journeyman. Licenses renew every year with 6 hours of continuing education.",
      licenseSteps: [
        { title: "Plumber's apprentice", detail: "Register with the board at 16 or older and work with a licensed plumber on site." },
        { title: "Tradesman Plumber-Limited", detail: "4,000 hours plus a 24-hour course and exam, for one- and two-family homes. A high school CTE program can replace the hours and course." },
        { title: "Journeyman plumber", detail: "8,000 hours plus a 48-hour course and the exam." },
        { title: "Master plumber", detail: "Two years as a journeyman (or one year plus a registered apprenticeship) and the master exam." },
      ],
      licenseAgency: TSBPE,
      extraCredentials: ["Texas Tradesman, journeyman or master plumber license"],
      training: [HOUSTON_UNIONS, ABC_SOUTH_TEXAS, TX_COLLEGES, TSTC],
      ownBusiness: "Running a plumbing business in Texas takes a master plumber who serves as Responsible Master Plumber and carries at least $300,000 in liability insurance.",
    }),
    t("painter", {
      outlook: ol([27290, 29280, 7, 2370]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("painters"),
      licenseAgency: NO_GC,
      training: [HOUSTON_UNIONS, LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([23820, 24930, 5, 1730]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("concrete finishers"),
      licenseAgency: NO_GC,
      training: [LEARN_ON_JOB("Concrete and site contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([7500, 7910, 5, 580]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("drywall installers"),
      licenseAgency: NO_GC,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([1340, 1480, 10, 120]),
      stateLicense: "contractor",
      licenseSummary:
        "Texas does not license individual elevator mechanics. Elevator companies register with TDLR and name one or two Responsible Parties with at least three years of experience, and they carry at least $1 million in liability insurance. Most mechanics train through a union or employer program.",
      licenseSteps: [
        { title: "Helper or apprentice", detail: "Work for a registered elevator contractor while you train." },
        { title: "Training program", detail: "The union's NEIEP program or a similar employer program." },
        { title: "Mechanic", detail: "Install and service elevators on your own. No state license, but employers expect a completed program." },
        { title: "Responsible Party", detail: "With three years of contractor experience, you can be the person a company's registration rests on." },
      ],
      licenseAgency: ELEVATOR,
      training: [{ ...NEIEP, where: "Including IUEC Local 31, Houston" }],
      ownBusiness: "Opening an elevator company in Texas takes a TDLR contractor registration, an experienced Responsible Party and at least $1 million in liability insurance, so most mechanics work for established companies.",
    }),
    t("flooring-installer", {
      outlook: ol([1940, 2160, 11, 160]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("flooring installers"),
      licenseAgency: NO_GC,
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([6670, 7160, 7, 600]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("glaziers"),
      licenseAgency: NO_GC,
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([5900, 6080, 3, 490]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("insulation installers"),
      licenseAgency: NO_GC,
      training: [HOUSTON_UNIONS, LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([10260, 10630, 4, 850]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("ironworkers"),
      licenseAgency: NO_GC,
      ownBusiness: "Steel erection companies need heavy equipment and big insurance policies, so most ironworkers work for established firms.",
      training: [HOUSTON_UNIONS, national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork.")],
    }),
    t("mason", {
      outlook: ol([5920, 6330, 7, 480]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("masons"),
      licenseAgency: NO_GC,
      training: [LEARN_ON_JOB("Masonry contractors"), national("Bricklayers union (BAC)", "bac-bricklayer-apprenticeship", "Union apprenticeships for brick, block and stone masons.")],
    }),
    t("millwright", {
      outlook: ol([3140, 3290, 5, 300]),
      stateLicense: "none",
      licenseSummary: "Texas has no state license for millwrights. Employers hire on training, experience and precision.",
      licenseAgency: TDLR,
      training: [AUSTIN_UNIONS, national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary: "Texas has no license for industrial pipefitters. Pipe work that counts as plumbing needs a plumbing license, and air conditioning piping falls under the state's air conditioning rules.",
      licenseAgency: TSBPE,
      ownBusiness: "Mechanical and piping contractors need crews and insurance, and any plumbing work runs under a master plumber.",
      training: [HOUSTON_UNIONS, ABC_SOUTH_TEXAS, TSTC],
    }),
    t("plasterer-stucco-mason", {
      outlook: ol([870, 940, 7, 70]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("plasterers"),
      licenseAgency: NO_GC,
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([7440, 8170, 10, 600]),
      stateLicense: "none",
      licenseSummary: "Texas has no state license for roofers or roofing companies. The Roofing Contractors Association of Texas runs a voluntary credential, and some cities require registration.",
      licenseAgency: { label: "Roofing Contractors Association of Texas (voluntary licensing program)", url: "https://www.rcat.net/" },
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([10870, 11440, 5, 950]),
      stateLicense: "none",
      licenseSummary: "Texas has no sheet metal license. HVAC ductwork is done for a licensed air conditioning contractor.",
      licenseAgency: ACR_CONTRACTOR,
      training: [HOUSTON_UNIONS, ABC_SOUTH_TEXAS, national("Sheet metal apprenticeships (SMART)", "smart-sheet-metal-apprenticeship", "Union sheet metal apprenticeships.")],
    }),
    t("solar-installer", {
      outlook: ol([5050, 7220, 43, 730]),
      stateLicense: "none",
      licenseSummary: "Texas has no separate solar installer license. The wiring is electrical work done under TDLR electrician licenses by a licensed electrical contractor. Since Sept. 1, 2026, companies selling home solar must also register with TDLR, which covers sales, not installation.",
      licenseAgency: SOLAR,
      training: [TSTC, TX_ELECTRICAL_JATCS],
    }),
    t("sprinkler-fitter", {
      stateLicense: "contractor",
      licenseSummary:
        "Texas does not license individual sprinkler fitters. Fire sprinkler companies register with the State Fire Marshal's Office and must employ a Responsible Managing Employee (RME), a licensed person with national NICET certification who oversees the work.",
      licenseSteps: [
        { title: "Apprentice fitter", detail: "Work for a registered sprinkler company. Union apprenticeships run five years." },
        { title: "Journey fitter", detail: "Install and test systems on your own." },
        { title: "NICET certification", detail: "National certifications in sprinkler layout or inspection." },
        { title: "RME license", detail: "The State Fire Marshal license a sprinkler company must have on staff: NICET Level III for general systems, Level II for homes." },
      ],
      licenseAgency: SPRINKLER,
      training: [{ ...UA_669, where: "Including Austin and Houston" }],
      ownBusiness: "Opening a sprinkler company in Texas takes a State Fire Marshal registration, a licensed RME and liability insurance.",
    }),
    t("tile-setter", {
      outlook: ol([2310, 2630, 14, 200]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("tile setters"),
      licenseAgency: NO_GC,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: noTradeLicense("waterproofing installers"),
      licenseAgency: NO_GC,
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Architecture and Construction programs of study",
      detail: "Texas high schools offer state-approved CTE programs in carpentry, electrical, HVAC and sheet metal, masonry, and plumbing and pipefitting. Students can earn recognized certifications like NCCER, AWS welding, the Residential Wireman license and the Tradesman Plumber-Limited license.",
      source: TEA_IBC,
    },
    {
      title: "CTE hours that count toward a license",
      detail: "An approved career and technology education program can replace the 4,000 hours of work for a Residential Wireman electrical license, and finishing a high school CTE program replaces the hours and course for a Tradesman Plumber-Limited license.",
      source: TSBPE_RULES,
    },
    {
      title: "Free dual credit (FAST)",
      detail: "Students who qualified for free or reduced-price lunch in the current year or any of the past four years pay no tuition, fees or book costs for dual credit at participating colleges.",
      source: FAST,
    },
  ],
  adults: [
    {
      title: "Registered apprenticeships",
      detail: "Texas had about 43,000 registered apprentices in 2026, most of them in construction. The Texas Workforce Commission helps pay for apprentices' classroom training.",
      source: TWC_REPORT,
    },
    {
      title: "Workforce Solutions offices",
      detail: "Texas's 28 local Workforce Solutions boards run more than 170 offices and can help pay for training in high-demand jobs for eligible adults.",
      source: WORKFORCE_BOARDS,
    },
    {
      title: "TSTC Money-Back Guarantee",
      detail: "Texas State Technical College refunds tuition if a graduate doesn't get a job offer within six months, with conditions.",
      source: TSTC_GUARANTEE,
    },
    {
      title: "Free pre-apprenticeship in Houston",
      detail: "The MC3 program is a free three-week course that prepares people to apply to Houston-area union apprenticeships.",
      source: { label: "Fox 26 Houston, MC3 apprenticeship readiness program (Feb. 2026)", url: "https://www.fox26houston.com/news/program-expanding-prepare-more-candidates-paid-apprenticeships-skilled-trades" },
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Texas statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Plasterers, Texas wages, May 2025 (BLS via O*NET)", url: "https://www.onetonline.org/link/localwages/47-2161.00?st=TX" },
    { label: "Texas long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=TX" },
    NO_GC,
    TDLR,
    ELEC_FAQ,
    JOURNEYMAN_ELEC,
    MASTER_ELEC,
    WIREMAN,
    TSBPE,
    TSBPE_RULES,
    ACR_TECH,
    ACR_EXEMPT,
    ACR_CONTRACTOR,
    ELEVATOR,
    ELEVATOR_FAQ,
    SPRINKLER,
    SOLAR,
    FAST,
    TWC_APPRENTICESHIP,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
