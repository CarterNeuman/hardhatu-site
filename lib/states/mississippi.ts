// Mississippi state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Mississippi-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, UA_669, NEIEP, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Mississippi";

const MSBOC: SourceRef = { label: "Mississippi State Board of Contractors", url: "https://www.msboc.us/" };
const MSBOC_GUIDE: SourceRef = {
  label: "Housecall Pro, Mississippi contractor thresholds ($50,000 commercial, $10,000 residential remodeling)",
  url: "https://www.housecallpro.com/licensing/general-contractor/mississippi/",
};
const NO_JOURNEYMAN: SourceRef = {
  label: "ServiceTitan, Mississippi electricians: journeyman licenses are local",
  url: "https://www.servicetitan.com/blog/electrician-schools-in-mississippi",
};
const ELEVATOR: SourceRef = {
  label: "Mississippi Insurance Department, Elevator Safety Division: licensing requirements (CET or IUEC card)",
  url: "https://apps.mid.ms.gov/mcsa/ti/TI2019-1.pdf",
};
const SPRINKLER: SourceRef = {
  label: "Contractor License Requirements, Mississippi fire sprinkler contractor permit (State Fire Marshal, Miss. Code 45-11-251)",
  url: "https://contractorlicenserequirements.com/mississippi/fire-sprinkler-license-requirements/",
};
const MCEF_SRC: SourceRef = {
  label: "Red Hills MS News, MCEF trains tomorrow's workforce",
  url: "https://www.redhillsmsnews.com/communities-local-content/construction-education-foundation-trains-tomorrows-workforce-today",
};

const BUILD_MS: TrainingOption = {
  name: "Build Mississippi (Mississippi Construction Education Foundation)",
  kind: "open-shop",
  where: "Training in Jackson (Pearl) and Gulfport",
  detail:
    "Registered apprenticeships for adults 18 and over in carpentry, electrical, HVAC and plumbing, with NCCER credentials. You work for a sponsoring employer and take night classes. Enrollment hit a record 190 in Jackson and 71 in Gulfport in 2024.",
  url: "https://www.starherald.net/most-recent/workforce-development-meeting-needs-magnolia-states-burgeoning-construction-industry-66e8a6df2c357",
};
const MS_CC: TrainingOption = {
  name: "Mississippi community colleges",
  kind: "college",
  where: "15 community colleges, including Hinds, Jones and Pearl River",
  detail: "Career certificates and short workforce training in electrical, HVAC, plumbing, pipefitting, carpentry and welding, many with NCCER credentials.",
  url: "https://siteselection.com/hinds-community-college-preparing-workers-for-in-demand-jobs/",
};
const MS_JATCS: TrainingOption = {
  name: "IBEW electrical JATCs",
  kind: "union",
  where: "Jackson (Byram), Gulfport, Meridian and Corinth-Tupelo",
  detail: "Paid union electrical apprenticeships run by IBEW locals and signatory contractors.",
  url: "https://electricianschooledu.org/mississippi/",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const ABC_MS: TrainingOption = {
  name: "ABC Mississippi (Associated Builders and Contractors)",
  kind: "open-shop",
  where: "Member contractors statewide",
  detail: "Open-shop contractors' association whose members hire and train apprentices.",
  url: "https://www.servicetitan.com/blog/electrician-schools-in-mississippi",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noTradeLicense = (what: string) =>
  `Mississippi has no license for ${what}. Contractors need a state license on commercial jobs of $50,000 or more and on home remodeling or roofing jobs over $10,000.`;

export const MISSISSIPPI: StateGuide = {
  // Mississippi ZIP codes run 386xx-397xx.
  locationHints: { zip3: [[386, 397]], cities: ["Gulfport", "Biloxi", "Hattiesburg", "Tupelo", "Southaven", "Starkville"] },
  slug: "mississippi",
  code: "MS",
  name: S,
  lastVerified: "2026-11-16",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Mississippi long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=MS",
  },
  intro:
    "A field guide to 25 construction trades in Mississippi: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ about 46,000 people in Mississippi, and the state projects about 4,400 openings a year across them through 2034.",
    "Mississippi has no statewide journeyman license for electricians or plumbers. Cities license them locally, and the state licenses contractors once a job passes $10,000 (home remodeling) or $50,000 (commercial).",
    "Elevator mechanics are the exception: the state licenses them, and new licenses require a CET or union (IUEC) mechanic card.",
    "Every year about 5,000 Mississippi high school students train in NCCER construction and manufacturing programs at career and technical centers, run with the Mississippi Construction Education Foundation.",
    "Adults can join Build Mississippi apprenticeships in carpentry, electrical, HVAC and plumbing while working for a sponsoring employer.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "High school trade students", value: "5,000+", note: "Trained each year in NCCER programs at 112 CTE centers" },
  licensingOverview:
    "Mississippi licenses contractors, not workers, through the State Board of Contractors. A commercial license is required at $50,000, and a residential license for new homes at $50,000 and for remodeling or roofing over $10,000. Electrical, plumbing and HVAC contractors need the trade classification at those limits. Below them, cities and counties license electricians and plumbers locally. Elevator mechanics are licensed by the Mississippi Insurance Department, and fire sprinkler contractors need a State Fire Marshal permit.",
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
      "In Mississippi, small jobs often need only a local license: the state contractor license starts at $10,000 home remodeling jobs and $50,000 commercial jobs.",
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
      MSBOC,
      MSBOC_GUIDE,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([11400, 12500, 10, 1050]),
      stateLicense: "none",
      licenseSummary: "Mississippi has no license for construction laborers. It is the biggest trade on this page and the most common way into construction.",
      training: [MS_CC, ABC_MS, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([6180, 7070, 14, 650]),
      stateLicense: "contractor",
      licenseSummary:
        "Mississippi has no statewide journeyman or master electrician license; cities issue those locally. The State Board of Contractors licenses electrical contractors on commercial jobs of $50,000 or more and home remodeling jobs of $10,000 or more.",
      licenseSteps: [
        { title: "Apprentice or helper", detail: "Work under a licensed electrician or contractor. No state license needed to start." },
        { title: "Local journeyman license", detail: "Your city's electrical board sets its own experience and exam rules, and the license covers work in that city." },
        { title: "Master or contractor (local)", detail: "Cities also license masters for smaller jobs." },
        { title: "State electrical contractor (optional)", detail: "Trade and business exams at the State Board of Contractors for jobs above the state limits." },
      ],
      licenseAgency: NO_JOURNEYMAN,
      training: [MS_JATCS, BUILD_MS, MS_CC, ABC_MS],
      businessNote: "Contracting electrical work in Mississippi takes your city's license, plus the state electrical classification at $10,000 (home remodeling) or $50,000 (commercial).",
    }),
    t("equipment-operator", {
      outlook: ol([4380, 4640, 6, 390]),
      stateLicense: "none",
      licenseSummary: "Mississippi has no state license for equipment operators. Employers look for training records and safe hours in the seat, and some jobs need a commercial driver's license.",
      training: [MS_CC, national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([6950, 7620, 10, 770]),
      stateLicense: "none",
      licenseSummary: "Mississippi has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      training: [MS_CC, LEARN_ON_JOB("Shipyards, fabrication shops and contractors")],
    }),
    t("hvac-technician", {
      outlook: ol([3170, 3600, 14, 320]),
      stateLicense: "contractor",
      licenseSummary:
        "Mississippi licenses HVAC contractors through the State Board of Contractors on home remodeling jobs of $10,000 or more and commercial or new-home jobs of $50,000 or more, with an HVAC trade exam. Below those limits, cities and counties set the rules. Technicians work under a licensed contractor.",
      licenseSteps: [
        { title: "Helper or apprentice", detail: "Work for an HVAC company. EPA 608 certification is required to handle refrigerants." },
        { title: "Technician", detail: "Install and service systems on your own." },
        { title: "Local license (small jobs)", detail: "Many cities require their own mechanical or HVAC license to pull permits." },
        { title: "State HVAC contractor (optional)", detail: "Business and law exam plus an HVAC trade exam, for jobs above the state limits." },
      ],
      licenseAgency: MSBOC,
      training: [BUILD_MS, MS_CC],
      businessNote: "Running an HVAC business takes local licenses, plus the state HVAC classification above $10,000 (home remodeling) or $50,000 (commercial).",
    }),
    t("carpenter", {
      outlook: ol([3110, 3320, 7, 250]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("carpenters"),
      training: [BUILD_MS, MS_CC],
      businessNote: "Home remodeling jobs over $10,000 and new homes of $50,000 or more need a Mississippi residential license.",
    }),
    t("plumber", {
      outlook: ol([3340, 3740, 12, 330]),
      stateLicense: "contractor",
      licenseSummary:
        "Mississippi has no statewide journeyman plumber license; cities license plumbers locally. The State Board of Contractors licenses plumbing contractors on home remodeling jobs of $10,000 or more and commercial jobs of $50,000 or more.",
      licenseSteps: [
        { title: "Apprentice", detail: "Work under a licensed plumber." },
        { title: "Local journeyman license", detail: "Your city sets its own experience and exam rules." },
        { title: "Local master license", detail: "Lets you pull permits in that city." },
        { title: "State plumbing contractor (optional)", detail: "Trade and business exams for jobs above the state limits." },
      ],
      licenseAgency: MSBOC,
      training: [BUILD_MS, MS_CC, national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Five-year paid union apprenticeships in plumbing and pipefitting.")],
      ownBusiness: "Contracting plumbing in Mississippi takes your city's license, plus the state plumbing classification at $10,000 (home remodeling) or $50,000 (commercial).",
    }),
    t("painter", {
      outlook: ol([1240, 1360, 10, 110]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("painters"),
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([1080, 1130, 5, 80]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("concrete finishers"),
      training: [LEARN_ON_JOB("Concrete and site contractors"), MS_CC],
    }),
    t("drywall-installer", {
      outlook: ol([210, 230, 11, 20]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("drywall installers"),
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([200, 220, 13, 20]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Mississippi licenses elevator mechanics through the Mississippi Insurance Department's Elevator Safety Division. New mechanic licenses require a Certified Elevator Technician (CET) card or an IUEC union mechanic's card. Helpers need no license while they work under direct supervision.",
      licenseSteps: [
        { title: "Helper", detail: "Work under the direct supervision of a licensed mechanic. No license needed." },
        { title: "Training program", detail: "The union's NEIEP program or the Certified Elevator Technician (CET) program." },
        { title: "Elevator mechanic license", detail: "Apply to the state with your CET or IUEC mechanic card." },
        { title: "Company license (optional)", detail: "Elevator companies need their own state license and licensed mechanics." },
      ],
      licenseAgency: ELEVATOR,
      extraCredentials: ["Mississippi elevator mechanic license", "Certified Elevator Technician (CET)"],
      payNote: "BLS doesn't publish Mississippi pay for elevator technicians, so pay is the national figure.",
      training: [NEIEP],
      ownBusiness: "Elevator companies need a Mississippi company license and licensed mechanics, so most mechanics work for established companies.",
    }),
    t("flooring-installer", {
      stateLicense: "none",
      licenseSummary: noTradeLicense("flooring installers"),
      payNote: "Mississippi publishes no job projection for this small trade.",
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([640, 670, 5, 60]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("glaziers"),
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([400, 460, 16, 40]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("insulation installers"),
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([530, 570, 8, 50]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("ironworkers"),
      training: [national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork."), MS_CC],
    }),
    t("mason", {
      outlook: ol([210, 230, 10, 20]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("masons"),
      training: [{ ...MS_CC, detail: "Masonry is one of the NCCER crafts taught in Mississippi's high school and college construction programs." }, LEARN_ON_JOB("Masonry contractors")],
    }),
    t("millwright", {
      outlook: ol([980, 1010, 3, 90]),
      stateLicense: "none",
      licenseSummary: "Mississippi has no state license for millwrights. Employers hire on training, experience and precision.",
      training: [MS_CC, national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary: "Mississippi has no license for individual pipefitters. Mechanical and piping contractors need a state license on commercial jobs of $50,000 or more.",
      training: [MS_CC, national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Five-year paid union apprenticeships in pipefitting.")],
    }),
    t("plasterer-stucco-mason", {
      outlook: ol([30, 30, 7, 0]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("plasterers"),
      payNote: "BLS doesn't publish Mississippi pay for this very small trade (about 30 jobs), so pay is the national figure.",
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([570, 640, 12, 50]),
      stateLicense: "none",
      licenseSummary: "Mississippi has no license for roofers who work for a contractor. Roofing contractors need a state residential license for home roofing jobs over $10,000 and a commercial license at $50,000.",
      training: [LEARN_ON_JOB("Roofing contractors")],
      businessNote: "Home roofing jobs over $10,000 need a Mississippi residential license.",
    }),
    t("sheet-metal-worker", {
      outlook: ol([1220, 1360, 12, 120]),
      stateLicense: "none",
      licenseSummary: "Mississippi has no license for sheet metal workers. Ductwork contractors need a state license above the dollar limits.",
      training: [MS_CC, national("Sheet metal apprenticeships (SMART)", "smart-sheet-metal-apprenticeship", "Union sheet metal apprenticeships.")],
    }),
    t("solar-installer", {
      stateLicense: "none",
      licenseSummary: "Mississippi has no solar license. The wiring side of a solar job is electrical work, which follows local and state electrical licensing.",
      payNote: "BLS doesn't publish Mississippi figures for solar installers, so pay is the national figure, and Mississippi has no projection for this small trade.",
      training: [MS_JATCS],
    }),
    t("sprinkler-fitter", {
      stateLicense: "contractor",
      licenseSummary:
        "Mississippi requires every fire sprinkler contractor to hold a State Fire Marshal permit, with a certificate holder who is certified in sprinkler layout. Fitters start by working for a permitted contractor.",
      licenseSteps: [
        { title: "Apprentice fitter", detail: "Work for a permitted sprinkler contractor. Union apprenticeships run five years." },
        { title: "Journey fitter", detail: "Install and test systems on your own." },
        { title: "Layout certification", detail: "Certification in sprinkler layout, such as NICET." },
        { title: "Certificate holder", detail: "The certified person a contractor's permit is issued under." },
      ],
      licenseAgency: SPRINKLER,
      training: [UA_669],
      ownBusiness: "Opening a sprinkler company takes a State Fire Marshal permit, a certified certificate holder and insurance, plus a State Board of Contractors license on larger jobs.",
    }),
    t("tile-setter", {
      outlook: ol([150, 180, 16, 10]),
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
      title: "NCCER construction programs at CTE centers",
      detail:
        "Through a partnership between the Mississippi Department of Education and the Mississippi Construction Education Foundation, over 5,000 students a year train in 184 construction and manufacturing programs at 112 high school career and technical centers, earning portable NCCER credentials.",
      source: MCEF_SRC,
    },
    {
      title: "Dual credit with your community college",
      detail: "Several districts partner with their local community college to offer dual credit career and technical courses that line up with college trade programs.",
      source: { label: "Magnolia Tribune, Mississippi CTE programs (June 2024)", url: "https://magnoliatribune.com/?p=117212" },
    },
    {
      title: "Construction scholarships for CTE seniors",
      detail: "MCEF awards $1,000 scholarships to high school seniors in career and technical programs who continue in a construction or manufacturing field.",
      source: { label: "MCEF scholarship winners (Connections, Summer 2023)", url: "https://issuu.com/rcumedia/docs/connections_summer_23/s/37346201" },
    },
  ],
  adults: [
    {
      title: "Build Mississippi apprenticeships",
      detail: "Registered apprenticeships for adults 18 and over in carpentry, electrical, HVAC and plumbing, run by MCEF with classes in Jackson and Gulfport.",
      source: { label: "MCEF craft training and apprenticeship (NCCER)", url: "https://pathways.nccer.org/?p=105" },
    },
    {
      title: "Community college workforce training",
      detail: "MCEF provides NCCER training and credentials in all 15 community college workforce programs, where over 1,700 adults a year earn skilled-trade credentials.",
      source: MCEF_SRC,
    },
    {
      title: "Union electrical apprenticeships",
      detail: "IBEW training centers in Jackson, Gulfport, Meridian and Corinth-Tupelo run paid four- and five-year electrical apprenticeships.",
      source: { label: "Electrician School EDU, Mississippi JATCs", url: "https://electricianschooledu.org/mississippi/" },
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Mississippi statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Plasterers, solar installers and elevator technicians, national wages, May 2025 (BLS; no Mississippi estimate published)", url: "https://www.onetonline.org/link/localwages/47-2161.00?st=MS" },
    { label: "Mississippi long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=MS" },
    MSBOC,
    MSBOC_GUIDE,
    NO_JOURNEYMAN,
    ELEVATOR,
    SPRINKLER,
    MCEF_SRC,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
