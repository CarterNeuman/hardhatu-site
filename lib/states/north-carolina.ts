// North Carolina state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is North Carolina-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, NEIEP, UA_669, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "North Carolina";

const NCBEEC: SourceRef = { label: "NC State Board of Examiners of Electrical Contractors", url: "https://www.ncbeec.org/" };
const NCPHFS: SourceRef = { label: "NC State Board of Examiners of Plumbing, Heating and Fire Sprinkler Contractors", url: "https://www.nclicensing.org/" };
const GS_87_21: SourceRef = {
  label: "N.C. Gen. Stat. 87-21, plumbing, heating and fire sprinkler contractor licenses",
  url: "https://www.ncleg.gov/enactedlegislation/statutes/html/bysection/chapter_87/gs_87-21.html",
};
const NCLBGC: SourceRef = { label: "NC Licensing Board for General Contractors ($40,000 threshold, N.C. Gen. Stat. 87-1)", url: "https://www.nclbgc.org/" };
const SP_EL: SourceRef = {
  label: "NC Board of Examiners of Electrical Contractors, Special Restricted: Elevator (SP-EL) license (via NC BOLD)",
  url: "https://ncbold.com/license/44017",
};
const CCP: SourceRef = {
  label: "NC Community College System, Career and College Promise (tuition-free dual enrollment)",
  url: "https://wordpress.nccommunitycolleges.edu/wp-content/uploads/2024/09/Section14_2024FA-FINAL-12.pdf",
};
const YOUTH_APP: SourceRef = {
  label: "ApprenticeshipNC, registered youth apprenticeship",
  url: "https://www.nccommunitycolleges.edu/businesses/apprenticeships/unique-pathways/youth-apprenticeships/",
};

const NCCC: TrainingOption = {
  name: "NC Community College System",
  kind: "college",
  where: "Community colleges in every region of the state",
  detail:
    "Certificates and diplomas in building construction, electrical, HVAC, plumbing and welding. High school students take many of these tuition-free through Career and College Promise.",
  url: "https://www.nccommunitycolleges.edu/",
};
const APPRENTICESHIP_NC: TrainingOption = {
  name: "ApprenticeshipNC",
  kind: "free-training",
  where: "Statewide, through the community colleges",
  detail:
    "North Carolina's state apprenticeship agency. Youth apprenticeships can start at 16, and students who start in high school and enter a registered apprenticeship can get community college tuition waived.",
  url: YOUTH_APP.url,
};
const ABC_CAROLINAS: TrainingOption = {
  name: "ABC Carolinas Apprenticeship & Craft Training",
  kind: "open-shop",
  where: "Charlotte and Triangle (Raleigh) campuses",
  detail:
    "Four-year electrical apprenticeship for employees of member contractors: work full-time and take classes two nights a week. The chapter added carpentry in Charlotte.",
  url: "https://groundbreakcarolinas.com/abc-carolinas-celebrates-graduates-of-four-year-electrical-apprenticeship-program-in-charlotte-and-triangle/",
};
const CHARLOTTE_JATC: TrainingOption = {
  name: "Charlotte Electrical JATC (IBEW Local 379 + NECA)",
  kind: "union",
  where: "Carolinas Electrical Training Institute, Charlotte",
  detail: "Union inside-wireman apprenticeship sponsored by IBEW Local 379 and the Atlantic Coast Chapter of NECA.",
  url: "https://nccommunitycolleges.edu/students/what-we-offer/apprenticeships/apprenticeship-opportunities/carolinas-electrical-training-institute",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const RD_JATC: TrainingOption = {
  name: "Raleigh-Durham Electrical JATC (IBEW Local 553)",
  kind: "union",
  where: "Durham, with classes at Durham Tech",
  detail: "Union electrical apprenticeship run by IBEW and NECA for the Triangle and eastern North Carolina.",
  url: "https://nccommunitycolleges.edu/students/what-we-offer/apprenticeships/apprenticeship-opportunities/raleigh-durham-electrical-jatc",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const CAPE_FEAR: TrainingOption = {
  name: "Cape Fear Community College plumbing & pipefitting apprenticeship",
  kind: "college",
  where: "Wilmington",
  detail: "An apprenticeship program started to meet coastal employers' need for plumbers, with classroom training at the college.",
  url: "https://groundbreakcarolinas.com/tag/apprenticeships",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noTradeLicense = (what: string) =>
  `North Carolina has no license for ${what}. Contractors need a general contractor license only on projects of $40,000 or more.`;

export const NORTH_CAROLINA: StateGuide = {
  // North Carolina ZIP codes run 270xx-289xx.
  locationHints: { zip3: [[270, 289]], cities: ["Charlotte", "Raleigh", "Durham", "Greensboro", "Winston-Salem", "Asheville", "Chapel Hill"] },
  slug: "north-carolina",
  code: "NC",
  name: S,
  lastVerified: "2026-11-14",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "North Carolina long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=NC",
  },
  intro:
    "A field guide to 25 construction trades in North Carolina: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ about 187,000 people in North Carolina, and the state projects about 16,800 openings a year across them through 2034.",
    "North Carolina licenses electrical, plumbing, HVAC and fire sprinkler contractors. Most other trades have no state license, and the general contractor license only starts at $40,000 projects.",
    "Career and College Promise lets high school students take community college career courses, including construction, tuition-free.",
    "Registered youth apprenticeships can start at 16, and students who start in high school and enter a registered apprenticeship can get community college tuition waived.",
    "Plumbing and heating contractor licenses take 2 years (4,000 hours) of experience, and up to half can come from related schooling.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "Dual enrollment tuition", value: "$0", note: "Career and College Promise career pathways, including construction" },
  licensingOverview:
    "North Carolina licenses contractors through separate boards. The Board of Examiners of Electrical Contractors licenses electrical contractors (Limited, Intermediate and Unlimited, by project size). The Board of Examiners of Plumbing, Heating and Fire Sprinkler Contractors licenses plumbing, heating (HVAC) and fire sprinkler contractors, plus technician licenses for employees. The Licensing Board for General Contractors covers projects of $40,000 or more. The Department of Labor permits and inspects elevators but doesn't license elevator mechanics. Some cities also license journeyman electricians.",
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
      "In North Carolina, jobs under $40,000 need no general contractor license, so trades like painting, flooring and tile can start small with no state license. Electrical, plumbing, HVAC and fire sprinkler work need a state license at any size.",
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
      NCLBGC,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([52940, 57120, 8, 4740]),
      stateLicense: "none",
      licenseSummary: "North Carolina has no license for construction laborers. It is the biggest trade on this page and the most common way into construction.",
      training: [NCCC, APPRENTICESHIP_NC, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([25830, 28510, 10, 2590]),
      stateLicense: "contractor",
      licenseSummary:
        "North Carolina has no statewide journeyman electrician license; some cities license journeymen. The state licenses electrical contractors in classes set by project size: Limited (up to $60,000 per project), Intermediate and Unlimited.",
      licenseSteps: [
        { title: "Apprentice or helper", detail: "Work under a licensed electrical contractor. No state license needed to start." },
        { title: "Local journeyman card (where required)", detail: "Some cities and counties license journeyman electricians." },
        { title: "Limited contractor", detail: "About 3,000 hours of experience and a state exam. Projects up to $60,000." },
        { title: "Intermediate or Unlimited (optional)", detail: "More experience, bigger projects. Unlimited has no project limit." },
      ],
      licenseAgency: NCBEEC,
      training: [CHARLOTTE_JATC, RD_JATC, ABC_CAROLINAS, NCCC],
      businessNote: "Contracting electrical work in North Carolina takes a state electrical contractor license in the class that fits your project size.",
    }),
    t("equipment-operator", {
      outlook: ol([16450, 17250, 5, 1440]),
      stateLicense: "none",
      licenseSummary: "North Carolina has no state license for equipment operators. Grading contractors need a general contractor license on projects of $40,000 or more.",
      training: [NCCC, national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([12960, 13760, 6, 1370]),
      stateLicense: "none",
      licenseSummary: "North Carolina has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      training: [NCCC, APPRENTICESHIP_NC],
    }),
    t("hvac-technician", {
      outlook: ol([14550, 15900, 9, 1400]),
      stateLicense: "contractor",
      licenseSummary:
        "North Carolina licenses heating contractors (Groups 1, 2 and 3, by the type and size of system) through the Plumbing, Heating and Fire Sprinkler board. Contractor licenses take 2 years (4,000 hours) of experience, and employees can earn a heating technician license.",
      licenseSteps: [
        { title: "Helper or apprentice", detail: "Work under a licensed heating contractor. EPA 608 certification is required to handle refrigerants." },
        { title: "Heating technician (optional)", detail: "A license for employees of a licensed contractor, with less experience than the contractor license." },
        { title: "2 years of experience", detail: "4,000 hours of installation or service work. Related schooling can count for up to half." },
        { title: "Heating contractor (Class I or II)", detail: "Pass the state exam. Class II is limited to single-family homes." },
      ],
      licenseAgency: NCPHFS,
      training: [NCCC, ABC_CAROLINAS, APPRENTICESHIP_NC],
      businessNote: "Running an HVAC business in North Carolina takes a state heating contractor license.",
    }),
    t("carpenter", {
      outlook: ol([18400, 19310, 5, 1430]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("carpenters"),
      training: [ABC_CAROLINAS, NCCC, national("Carpenters union (UBC) training", "ubc-carpenter-apprenticeship", "Paid union carpentry apprenticeships.")],
      businessNote: "Projects of $40,000 or more need a North Carolina general contractor license.",
    }),
    t("plumber", {
      outlook: ol([15620, 16500, 6, 1390]),
      stateLicense: "contractor",
      licenseSummary:
        "North Carolina licenses plumbing contractors (Class I for any building, Class II for single-family homes) and plumbing technicians who work for them. There is no journeyman plumber license.",
      licenseSteps: [
        { title: "Apprentice", detail: "Work under a licensed plumbing contractor." },
        { title: "Plumbing technician (optional)", detail: "Class I takes 3,000 hours, Class II 2,500, plus an exam. You work for a licensed contractor." },
        { title: "2 years of experience", detail: "4,000 hours of plumbing work. Related schooling can count for up to half." },
        { title: "Plumbing contractor (Class I or II)", detail: "Pass the technical and business exams." },
      ],
      licenseAgency: NCPHFS,
      training: [CAPE_FEAR, NCCC, national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Five-year paid union apprenticeships in plumbing, pipefitting and HVAC.")],
      ownBusiness: "Contracting plumbing in North Carolina takes a state plumbing contractor license, which needs 2 years (4,000 hours) of experience.",
    }),
    t("painter", {
      outlook: ol([6610, 6940, 5, 550]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("painters"),
      training: [LEARN_ON_JOB("Painting contractors"), national("Painters union (IUPAT)", "iupat-painter-apprenticeship", "Union painter apprenticeships.")],
    }),
    t("concrete-worker", {
      outlook: ol([4240, 4330, 2, 290]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("concrete finishers"),
      training: [LEARN_ON_JOB("Concrete and site contractors"), NCCC],
    }),
    t("drywall-installer", {
      outlook: ol([2340, 2460, 5, 180]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("drywall installers"),
      training: [LEARN_ON_JOB("Drywall contractors"), national("Carpenters union (UBC) training", "ubc-carpenter-apprenticeship", "Carpenter apprentices learn interior systems, including metal framing and drywall.")],
    }),
    t("elevator-technician", {
      outlook: ol([390, 410, 6, 30]),
      stateLicense: "contractor",
      licenseSummary:
        "North Carolina does not license individual elevator mechanics. The Department of Labor permits and inspects elevators, and elevator companies that do their own wiring need a special restricted elevator (SP-EL) license from the electrical contractors board. Mechanics train through their employer, often the union's NEIEP program.",
      licenseAgency: SP_EL,
      training: [NEIEP],
      ownBusiness: "Elevator companies in North Carolina need the SP-EL electrical license for their wiring, plus specialized tools and insurance, so most mechanics work for established companies.",
    }),
    t("flooring-installer", {
      outlook: ol([600, 660, 11, 50]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("flooring installers"),
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([1050, 1090, 4, 90]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("glaziers"),
      training: [LEARN_ON_JOB("Glass and window contractors"), national("Glaziers union (IUPAT)", "iupat-glazier-apprenticeship", "Union glazier apprenticeships.")],
    }),
    t("insulation-installer", {
      outlook: ol([1330, 1400, 5, 110]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("insulation installers"),
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([1580, 1650, 5, 130]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("ironworkers"),
      training: [national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork."), NCCC],
    }),
    t("mason", {
      outlook: ol([2310, 2420, 5, 180]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("masons"),
      training: [NCCC, national("Bricklayers union (BAC)", "bac-bricklayer-apprenticeship", "Union apprenticeships for brick, block and stone masons."), LEARN_ON_JOB("Masonry contractors")],
    }),
    t("millwright", {
      outlook: ol([810, 810, 0, 70]),
      stateLicense: "none",
      licenseSummary: "North Carolina has no state license for millwrights. Employers hire on training, experience and precision.",
      training: [NCCC, APPRENTICESHIP_NC, national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary:
        "North Carolina has no pipefitter license. Some piping falls under the Plumbing, Heating and Fire Sprinkler board: fuel gas piping needs a fuel piping contractor license, and steam and hot-water heating needs a Heating Group 1 license.",
      licenseAgency: GS_87_21,
      training: [national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Five-year paid union apprenticeships in pipefitting."), CAPE_FEAR, NCCC],
    }),
    t("plasterer-stucco-mason", {
      stateLicense: "none",
      licenseSummary: noTradeLicense("plasterers"),
      payNote: "BLS doesn't publish North Carolina figures for this small trade, so pay is the national figure and there is no North Carolina job projection.",
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([4120, 4380, 7, 320]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("roofers"),
      training: [LEARN_ON_JOB("Roofing contractors"), national("Roofers union training", "roofers-union-apprenticeship", "Union roofing and waterproofing apprenticeships.")],
      businessNote: "Roofing jobs of $40,000 or more need a North Carolina general contractor license.",
    }),
    t("sheet-metal-worker", {
      outlook: ol([3090, 3220, 4, 260]),
      stateLicense: "none",
      licenseSummary: "North Carolina has no license for sheet metal workers. Contractors who install HVAC ductwork work under the state's heating contractor licenses.",
      training: [NCCC, national("Sheet metal apprenticeships (SMART)", "smart-sheet-metal-apprenticeship", "Union sheet metal apprenticeships.")],
    }),
    t("solar-installer", {
      outlook: ol([730, 1060, 45, 110]),
      stateLicense: "none",
      licenseSummary: "North Carolina has no solar license. The wiring side of a solar job is electrical work, which needs a licensed electrical contractor.",
      payNote: "North Carolina projects this small trade to grow 45% by 2034, one of the fastest rates on this page.",
      training: [RD_JATC, NCCC],
    }),
    t("sprinkler-fitter", {
      stateLicense: "contractor",
      licenseSummary:
        "North Carolina licenses fire sprinkler installation contractors through the Plumbing, Heating and Fire Sprinkler board, with NICET-based qualifications. Fitters start by working for a licensed contractor.",
      licenseSteps: [
        { title: "Apprentice fitter", detail: "Work for a licensed sprinkler contractor. Union apprenticeships run five years." },
        { title: "Journey fitter", detail: "Install and test systems on your own." },
        { title: "Inspection technician (optional)", detail: "The board also licenses fire sprinkler inspection technicians." },
        { title: "Fire sprinkler contractor (optional)", detail: "Qualify with NICET certification and the business and law exam." },
      ],
      licenseAgency: NCPHFS,
      training: [UA_669],
      ownBusiness: "Opening a sprinkler company in North Carolina takes a state fire sprinkler contractor license and insurance.",
    }),
    t("tile-setter", {
      outlook: ol([840, 930, 11, 70]),
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
      title: "Career and College Promise",
      detail:
        "Eligible high school students take community college courses tuition-free toward a certificate, diploma or job credential, including Building Construction Technology and other trades. Freshmen and sophomores can enroll in construction pathways too. Students may still owe fees and books.",
      source: CCP,
    },
    {
      title: "Registered youth apprenticeships",
      detail:
        "Registered apprenticeships can start at age 16, and apprentices are paid from day one. A few hazardous jobs are off-limits under 18.",
      source: YOUTH_APP,
    },
    {
      title: "Free community college for apprentices",
      detail:
        "Students who start a qualifying pre-apprenticeship in high school and enter a registered apprenticeship within 120 days of graduation can get their community college tuition waived.",
      source: { label: "NGA, North Carolina degree apprenticeships (tuition waiver)", url: "https://www.nga.org/publications/building-degree-apprenticeships-in-north-carolina-a-state-led-approach-to-expanding-earn-and-learn-pathways/" },
    },
    {
      title: "NC Career Launch",
      detail: "The state's youth apprenticeship network, led by the Governor's office and the NC Business Committee for Education, builds high school pre-apprenticeships that lead into registered apprenticeships.",
      source: { label: "Office of the Governor, apprenticeship expansion (Aug. 2024)", url: "https://governor.nc.gov/news/press-releases/2024/08/19/governor-cooper-announces-4-million-grant-north-carolina-apprenticeship-expansion" },
    },
    {
      title: "Construction apprenticeship contests at the State Fair",
      detail: "For more than 65 years, apprentices in the construction trades have competed at the NC State Fair each October.",
      source: { label: "NC Community College System, ApprenticeshipNC report (2019)", url: "https://webservices.ncleg.gov/ViewDocSiteFile/17106" },
    },
  ],
  adults: [
    {
      title: "ApprenticeshipNC",
      detail:
        "North Carolina's state apprenticeship agency, part of the community college system, works with employers in all 100 counties to set up registered apprenticeships and pre-apprenticeships.",
      source: { label: "NC Community College System, ApprenticeshipNC funding (2026)", url: "https://www.nccommunitycolleges.edu/businesses/apprenticeships/news/recurring-state-funding-2026/" },
    },
    {
      title: "Community college trade programs",
      detail: "Certificates and diplomas in the building trades and welding at community colleges statewide, many with evening classes for working adults.",
      source: { label: "NC Community College System", url: "https://www.nccommunitycolleges.edu/" },
    },
    {
      title: "Open-shop training through ABC Carolinas",
      detail: "Get hired by a member contractor and join the chapter's four-year electrical apprenticeship in Charlotte or Raleigh, with classes two nights a week.",
      source: { label: "GroundBreak Carolinas, ABC Carolinas apprenticeship graduates", url: "https://groundbreakcarolinas.com/abc-carolinas-celebrates-graduates-of-four-year-electrical-apprenticeship-program-in-charlotte-and-triangle/" },
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, North Carolina statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Plasterers, national wages, May 2025 (BLS via O*NET; no North Carolina estimate published)", url: "https://www.onetonline.org/link/localwages/47-2161.00?st=NC" },
    { label: "North Carolina long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=NC" },
    NCBEEC,
    { label: "Cinderblock, NC electrical contractor license classes and hours", url: "https://cinderblock.com/blog/electrical-contractor-license-north-carolina/" },
    NCPHFS,
    GS_87_21,
    { label: "ServiceTitan, NC plumbing licenses (4,000 hours; technician licenses)", url: "https://servicetitan.com/licensing-plumbing-north-carolina" },
    NCLBGC,
    { label: "City of Asheville: general contractor license required at $40,000 since Oct. 1, 2023", url: "https://www.ashevillenc.gov/?p=28088" },
    SP_EL,
    { label: "NC General Assembly, 2007 S1206 elevator mechanic licensing bill (died in committee)", url: "https://www.ncleg.gov/BillLookup/2007/S1206" },
    CCP,
    YOUTH_APP,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
