// South Carolina state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is South Carolina-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, NEIEP, UA_669, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "South Carolina";

const CLB_UPDATE: SourceRef = {
  label: "SC Contractor's Licensing Board, 2023 legislative update (license required over $10,000)",
  url: "https://www.llr.sc.gov/clb/PDFFiles/CLB2023LegislativeUpdate.pdf",
};
const RBC_HVAC: SourceRef = {
  label: "SC Residential Builders Commission, Residential HVAC license (work over $500)",
  url: "https://www.llr.sc.gov/res/reshvac.aspx",
};
const RBC: SourceRef = { label: "SC Residential Builders Commission, licensure", url: "https://llr.sc.gov/res/licensure.aspx" };
const NO_LICENSE: SourceRef = {
  label: "SC Contractor's Licensing Board, work that needs no specific license",
  url: "https://www.llr.sc.gov/clb/PDFFiles/NOSPECIFICLICENSEREQUIRED.pdf",
};
const SPRINKLER: SourceRef = {
  label: "SC Contractor's Licensing Board, fire sprinkler contractor application (NICET exam for the qualifying party)",
  url: "https://llr.sc.gov/clb/Forms/DOC145.pdf",
};
const ELEVATOR_FAQ: SourceRef = { label: "SC Office of Elevators and Amusement Rides, FAQ", url: "https://llr.sc.gov/elevators/elvfaq.aspx" };
const MASC: SourceRef = {
  label: "ServiceTitan, SC electrician training (MASC journeyman and master certification)",
  url: "https://servicetitan.com/blog/electrician-schools-in-south-carolina",
};
const WINS: SourceRef = { label: "SC Technical College System, SC WINS / Workforce Scholarships", url: "https://sctechsystem.edu/students/sc-workforce-scholarships-for-the-future.html" };

const TECH: TrainingOption = {
  name: "SC Technical College System (16 colleges)",
  kind: "college",
  where: "Including Greenville Tech, Midlands Tech, Trident Tech and Central Carolina Tech",
  detail:
    "Certificates and diplomas in building construction, electrical, HVAC and welding. The SC WINS scholarship covers up to $5,000 a year in tuition, fees and course costs for eligible residents in construction programs, after other aid.",
  url: WINS.url,
};
const APPRENTICE_CAROLINA: TrainingOption = {
  name: "Apprenticeship Carolina",
  kind: "free-training",
  where: "Statewide, through the 16 technical colleges",
  detail: "The tech college system's apprenticeship office. It helps employers register apprenticeships, including youth apprenticeships for high school students.",
  url: "https://www.amacad.org/opportunities/in-practice/south-carolina-technical-college-system-apprenticeship-carolina-youth",
};
const ABC_CAROLINAS: TrainingOption = {
  name: "ABC Carolinas (Associated Builders and Contractors)",
  kind: "open-shop",
  where: "Member contractors across North and South Carolina",
  detail: "Connects member companies' workers to registered apprenticeships and NCCER craft training in electrical, plumbing, carpentry and heavy equipment.",
  url: "https://abccarolinas.org/construction-training/",
};
const UPSTATE_ELEC: TrainingOption = {
  name: "Upstate Electrical Apprenticeship (ABC Carolinas)",
  kind: "open-shop",
  where: "Greenville, classes at Greenville Technical College",
  detail: "Four-year apprenticeship run by a group of Upstate electrical contractors with ABC Carolinas and Greenville Tech. You work full-time for a contractor and take night classes.",
  url: "https://gvltec.edu/academics_learning/exp_learning/upstate-electrical-apprenticeship.html",
};
const CHARLESTON_ELEC: TrainingOption = {
  name: "Charleston Electrical Training Alliance (IBEW Local 776)",
  kind: "union",
  where: "North Charleston",
  detail: "Four-year union electrical apprenticeship with classroom and on-the-job training.",
  programSlug: "ibew-neca-electrical-apprenticeship",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noTradeLicense = (what: string) =>
  `South Carolina has no state license for ${what} who work for a contractor. Contracting the work yourself can take a state license once a job passes the dollar limits: $10,000 on commercial work, and on homes, a registration over $500 or a residential builder license over $5,000.`;

export const SOUTH_CAROLINA: StateGuide = {
  // South Carolina ZIP codes run 290xx-299xx.
  locationHints: { zip3: [[290, 299]], cities: ["Myrtle Beach", "Spartanburg", "Hilton Head", "Rock Hill", "North Charleston", "Summerville"] },
  slug: "south-carolina",
  code: "SC",
  name: S,
  lastVerified: "2026-11-14",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "South Carolina long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=SC",
  },
  intro:
    "A field guide to 25 construction trades in South Carolina: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ about 85,000 people in South Carolina, and the state projects about 7,900 openings a year across them through 2034.",
    "South Carolina licenses the contractor, not the worker. Electrical, plumbing and HVAC work on homes over $500 needs a residential license, and commercial jobs over $10,000 need a contractor license. Workers start under a licensed company.",
    "The SC WINS scholarship covers up to $5,000 a year at the state's 16 technical colleges for residents in construction and other critical programs, on top of other aid.",
    "High school students can take technical college classes through dual enrollment and join youth apprenticeships that pay while they finish school.",
    "Be Pro Be Proud SC, a trades simulator in an 18-wheeler, tours middle and high schools so students can try welding, equipment and construction work.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "SC WINS scholarship", value: "Up to $5,000", note: "A year at a technical college, for construction and other critical programs" },
  licensingOverview:
    "South Carolina licenses contractors through two boards at the Department of Labor, Licensing and Regulation. The Contractor's Licensing Board covers general and mechanical (electrical, plumbing, HVAC) contractors on jobs over $10,000, plus fire sprinkler contractors. The Residential Builders Commission covers home work: a license for electrical, plumbing and HVAC jobs over $500, a registration for other trades over $500, and a residential builder license over $5,000. Some cities and counties also require journeyman or master certification through the Municipal Association of South Carolina. Workers usually start under a licensed company.",
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
      "In South Carolina, small home jobs of $500 or less need no state credential, and the commercial contractor license starts above $10,000. Electrical, plumbing and HVAC need their trade license on home jobs over $500.",
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
      CLB_UPDATE,
      RBC,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([22790, 25060, 10, 2110]),
      stateLicense: "none",
      licenseSummary: "South Carolina has no license for construction laborers. It is the biggest trade on this page and the most common way into construction.",
      training: [ABC_CAROLINAS, TECH, APPRENTICE_CAROLINA],
    }),
    t("electrician", {
      outlook: ol([9560, 10620, 11, 970]),
      stateLicense: "contractor",
      licenseSummary:
        "South Carolina has no statewide journeyman electrician license. Electrical work on homes over $500 needs a residential electrical license, and commercial work over $10,000 needs a mechanical contractor license with the electrical classification. Some cities require a journeyman or master certification from the Municipal Association of South Carolina.",
      licenseSteps: [
        { title: "Apprentice or helper", detail: "Work under a licensed contractor. No state license needed to start." },
        { title: "Local certification (if required)", detail: "Some cities and counties require journeyman or master certification through the Municipal Association of South Carolina." },
        { title: "Residential electrical license", detail: "Verified experience and a state exam, for home jobs over $500." },
        { title: "Mechanical contractor, electrical (optional)", detail: "For commercial jobs over $10,000, with exams and financial requirements." },
      ],
      licenseAgency: CLB_UPDATE,
      training: [UPSTATE_ELEC, CHARLESTON_ELEC, ABC_CAROLINAS, TECH],
      businessNote: "Contracting electrical work takes the residential license for home jobs over $500, or the commercial mechanical license over $10,000.",
    }),
    t("equipment-operator", {
      outlook: ol([8140, 8760, 8, 740]),
      stateLicense: "none",
      licenseSummary: "South Carolina has no state license for equipment operators. Employers look for training records and safe hours in the seat, and some jobs need a commercial driver's license.",
      training: [ABC_CAROLINAS, TECH, national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([7960, 8930, 12, 910]),
      stateLicense: "none",
      licenseSummary: "South Carolina has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      training: [
        { ...TECH, detail: "Welding certificates are among the most in-demand programs. Midlands Tech's welding program filled up for fall 2025, so apply early. SC WINS can cover tuition for eligible residents." },
        APPRENTICE_CAROLINA,
      ],
    }),
    t("hvac-technician", {
      outlook: ol([7590, 8340, 10, 740]),
      stateLicense: "contractor",
      licenseSummary:
        "South Carolina licenses HVAC contractors, not technicians. HVAC work on homes over $500 needs a residential HVAC license from the Residential Builders Commission, and commercial work over $10,000 needs a mechanical contractor license. Technicians start under a licensed contractor.",
      licenseSteps: [
        { title: "Helper or apprentice", detail: "Work under a licensed contractor. EPA 608 certification is required to handle refrigerants." },
        { title: "Build verified experience", detail: "The commission verifies your work experience before you can take the exam." },
        { title: "Residential HVAC license", detail: "Pass the state exam, for home jobs over $500." },
        { title: "Mechanical contractor (optional)", detail: "Air conditioning or heating classification for commercial jobs over $10,000." },
      ],
      licenseAgency: RBC_HVAC,
      training: [TECH, ABC_CAROLINAS, APPRENTICE_CAROLINA],
      businessNote: "Running an HVAC business takes the residential HVAC license for home jobs over $500, or the commercial mechanical license over $10,000.",
    }),
    t("carpenter", {
      outlook: ol([9230, 9780, 6, 730]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("carpenters"),
      training: [ABC_CAROLINAS, TECH, national("Carpenters union (UBC) training", "ubc-carpenter-apprenticeship", "Paid union carpentry apprenticeships.")],
      businessNote: "Home jobs over $500 need a state registration, and over $5,000 a residential builder license.",
    }),
    t("plumber", {
      outlook: ol([6370, 6730, 6, 570]),
      stateLicense: "contractor",
      licenseSummary:
        "South Carolina licenses plumbing contractors, not individual plumbers. Plumbing on homes over $500 needs a residential plumbing license, and commercial work over $10,000 needs a mechanical contractor license with the plumbing classification. Some cities require journeyman or master certification from the Municipal Association of South Carolina.",
      licenseSteps: [
        { title: "Apprentice", detail: "Work under a licensed plumbing contractor. No state license needed to start." },
        { title: "Local certification (if required)", detail: "Some cities and counties require journeyman or master certification through the Municipal Association of South Carolina." },
        { title: "Residential plumbing license", detail: "Verified experience and a state exam, for home jobs over $500." },
        { title: "Mechanical contractor, plumbing (optional)", detail: "For commercial jobs over $10,000." },
      ],
      licenseAgency: RBC,
      training: [TECH, ABC_CAROLINAS, national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Five-year paid union apprenticeships in plumbing, pipefitting and HVAC.")],
      ownBusiness: "Contracting plumbing takes the residential plumbing license for home jobs over $500, or the commercial mechanical license over $10,000.",
    }),
    t("painter", {
      outlook: ol([3460, 3630, 5, 290]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("painters"),
      training: [LEARN_ON_JOB("Painting contractors"), national("Painters union (IUPAT)", "iupat-painter-apprenticeship", "Union painter apprenticeships.")],
      businessNote: "Home jobs over $500 need a state specialty registration.",
    }),
    t("concrete-worker", {
      outlook: ol([1770, 1840, 4, 130]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("concrete finishers"),
      training: [LEARN_ON_JOB("Concrete and site contractors"), ABC_CAROLINAS],
      businessNote: "Commercial concrete work over $10,000 needs a contractor license with the right classification.",
    }),
    t("drywall-installer", {
      outlook: ol([830, 870, 5, 60]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("drywall installers"),
      training: [LEARN_ON_JOB("Drywall contractors"), national("Carpenters union (UBC) training", "ubc-carpenter-apprenticeship", "Carpenter apprentices learn interior systems, including metal framing and drywall.")],
      businessNote: "Home jobs over $500 need a state specialty registration.",
    }),
    t("elevator-technician", {
      outlook: ol([380, 400, 6, 30]),
      stateLicense: "none",
      licenseSummary:
        "South Carolina's elevator office registers and inspects elevators, and it does not license elevator companies. Mechanics train through their employer, often the union's NEIEP program.",
      licenseAgency: ELEVATOR_FAQ,
      training: [NEIEP],
    }),
    t("flooring-installer", {
      outlook: ol([130, 140, 10, 10]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("flooring installers"),
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
      businessNote: "Home jobs over $500 need a state specialty registration.",
    }),
    t("glazier", {
      outlook: ol([520, 550, 6, 40]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("glaziers"),
      training: [LEARN_ON_JOB("Glass and window contractors"), national("Glaziers union (IUPAT)", "iupat-glazier-apprenticeship", "Union glazier apprenticeships.")],
    }),
    t("insulation-installer", {
      outlook: ol([500, 510, 4, 40]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("insulation installers"),
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([620, 660, 6, 50]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("ironworkers"),
      training: [national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork."), TECH],
    }),
    t("mason", {
      outlook: ol([710, 740, 4, 50]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("masons"),
      training: [LEARN_ON_JOB("Masonry contractors"), national("Bricklayers union (BAC)", "bac-bricklayer-apprenticeship", "Union apprenticeships for brick, block and stone masons.")],
    }),
    t("millwright", {
      outlook: ol([850, 860, 1, 80]),
      stateLicense: "none",
      licenseSummary: "South Carolina has no state license for millwrights. Employers hire on training, experience and precision.",
      training: [TECH, APPRENTICE_CAROLINA, national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary:
        "South Carolina has no license for individual pipefitters. Contractors doing process piping on commercial jobs over $10,000 need a mechanical contractor license with the process piping classification.",
      training: [national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Five-year paid union apprenticeships in pipefitting."), TECH],
    }),
    t("plasterer-stucco-mason", {
      outlook: ol([90, 90, 4, 10]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("plasterers"),
      payNote: "BLS doesn't publish South Carolina pay for this very small trade, so pay is the national figure.",
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([1520, 1610, 6, 120]),
      stateLicense: "contractor",
      licenseSummary:
        "Roofers who work for a contractor need no license. Roofing contractors need the state's Roofing classification for jobs over $10,000, and home roofing jobs over $500 need a residential specialty registration.",
      licenseAgency: CLB_UPDATE,
      training: [LEARN_ON_JOB("Roofing contractors"), national("Roofers union training", "roofers-union-apprenticeship", "Union roofing and waterproofing apprenticeships.")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([1680, 1800, 7, 150]),
      stateLicense: "none",
      licenseSummary:
        "South Carolina has no license for sheet metal workers. HVAC ductwork falls under the state's HVAC licensing: the residential HVAC license for homes and the mechanical contractor license for commercial jobs over $10,000.",
      training: [TECH, national("Sheet metal apprenticeships (SMART)", "smart-sheet-metal-apprenticeship", "Union sheet metal apprenticeships.")],
    }),
    t("solar-installer", {
      outlook: ol([310, 450, 45, 50]),
      stateLicense: "none",
      licenseSummary: "South Carolina has no solar license. The wiring side of a solar job is electrical work, which falls under the state's electrical licensing.",
      payNote: "BLS publishes South Carolina pay for solar installers but not a job count. The state projects this small trade to grow 45% by 2034.",
      training: [UPSTATE_ELEC, TECH],
    }),
    t("sprinkler-fitter", {
      stateLicense: "contractor",
      licenseSummary:
        "South Carolina's Contractor's Licensing Board licenses fire sprinkler contractors. Each one needs a qualifying party who has passed the required NICET exam. Fitters start by working for a licensed contractor.",
      licenseSteps: [
        { title: "Apprentice fitter", detail: "Work for a licensed sprinkler contractor. Union apprenticeships run five years." },
        { title: "Journey fitter", detail: "Install and test systems on your own." },
        { title: "NICET certification", detail: "National certifications in sprinkler layout or inspection." },
        { title: "Qualifying party", detail: "The NICET-certified person a sprinkler contractor's license is issued under." },
      ],
      licenseAgency: SPRINKLER,
      training: [UA_669, ABC_CAROLINAS],
      ownBusiness: "Opening a sprinkler company in South Carolina takes a state fire sprinkler contractor license, insurance and a NICET-certified qualifying party.",
    }),
    t("tile-setter", {
      outlook: ol([390, 460, 16, 30]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("tile setters"),
      payNote: "BLS publishes South Carolina pay for tile setters but not a job count, so the job numbers come from the state projection.",
      training: [LEARN_ON_JOB("Tile contractors")],
      businessNote: "Home jobs over $500 need a state specialty registration.",
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: noTradeLicense("waterproofing installers"),
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Dual enrollment at a technical college",
      detail:
        "High school students can take technical college courses for high school and college credit. Some colleges, like Midlands Tech, offer dual enrollment tuition-free, and SC WINS help is built into dual enrollment pricing at others. Ask your school counselor what your local college offers.",
      source: { label: "Midlands Technical College, dual enrollment and apprenticeships", url: "https://www.midlandstech.edu/node/13866" },
    },
    {
      title: "Youth apprenticeships",
      detail:
        "Through Apprenticeship Carolina, high school students can work part-time for a local employer for pay while taking career and technical dual enrollment courses. At Central Carolina Technical College, youth apprentices commit to two years with the employer and the program.",
      source: { label: "Central Carolina Technical College, youth apprenticeships", url: "https://www.cctech.edu/training-continuing-ed/youth-apprenticeships/" },
    },
    {
      title: "Be Pro Be Proud SC",
      detail:
        "A 53-foot mobile workshop with simulators for welding, heavy equipment and other skilled trades that tours South Carolina middle and high schools. Schools can request a tour stop.",
      source: { label: "Carolinas AGC, Be Pro Be Proud SC launch", url: "https://groundbreakcarolinas.com/be-pro-be-proud-sc-skilled-trades-mobile-workshop-launched/" },
    },
    {
      title: "Work-based learning that counts",
      detail:
        "The SC Department of Education counts registered youth apprenticeships as a work-based learning experience, often run with a technical college through dual enrollment.",
      source: {
        label: "SC Department of Education, 2025-26 work-based learning guidelines",
        url: "https://findyourfuture.sc.gov/sites/dewwop/files/Documents/Images/2025-26%20Work-Based%20Learning%20Implementation%20Guidelines%20(1).docx",
      },
    },
  ],
  adults: [
    {
      title: "SC WINS at the technical colleges",
      detail:
        "Covers up to $5,000 a year in tuition, fees and course costs for South Carolina residents in construction and other critical workforce programs, after other scholarships and grants. Many short workforce training programs qualify too.",
      source: WINS,
    },
    {
      title: "Registered apprenticeships",
      detail:
        "Apprenticeship Carolina, part of the technical college system, helps employers register apprenticeships, and electrical contractors run programs in Greenville, Columbia and Charleston.",
      source: { label: "GroundBreak Carolinas, SC electrical apprenticeships", url: "https://groundbreakcarolinas.com/electrical-apprenticeships-a-best-kept-secret-career-option/" },
    },
    {
      title: "ABC Carolinas craft training",
      detail: "ABC Carolinas connects workers at member contractors to registered apprenticeships and NCCER training, a path in for adults who get hired first.",
      source: { label: "ABC Carolinas, construction training", url: "https://abccarolinas.org/construction-training/" },
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, South Carolina statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Plasterers, national wages, May 2025 (BLS via O*NET; no South Carolina estimate published)", url: "https://www.onetonline.org/link/localwages/47-2161.00?st=SC" },
    { label: "South Carolina long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=SC" },
    CLB_UPDATE,
    RBC,
    RBC_HVAC,
    NO_LICENSE,
    SPRINKLER,
    ELEVATOR_FAQ,
    MASC,
    WINS,
    { label: "SC Daily Gazette: Midlands Tech welding at capacity, SC WINS covering tuition (June 2025)", url: "https://scdailygazette.com/2025/06/02/new-tech-school-investments-to-address-increased-enrollment-ai-skills-in-manufacturing/" },
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
