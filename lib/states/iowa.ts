// Iowa state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Iowa-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Iowa";

const ELEC_BOARD: SourceRef = { label: "Iowa Electrical Examining Board (Iowa Code Chapter 103)", url: "https://www.legis.iowa.gov/docs/code/2026/103.html" };
const PM_BOARD: SourceRef = { label: "Iowa Plumbing and Mechanical Systems Board (Iowa Code Chapter 105)", url: "https://www.legis.iowa.gov/docs/code/2026/105.html" };
const PM_BOARD_PAGE: SourceRef = { label: "Iowa DIAL, Plumbing and Mechanical Systems licensing", url: "https://dial.iowa.gov/licenses/building/plumbing-mechanical" };
const CONTRACTOR_REG: SourceRef = { label: "Iowa Code Chapter 91C, contractor registration", url: "https://www.legis.iowa.gov/docs/code/2024/91C.2.pdf" };
const SPRINKLER_RULE: SourceRef = { label: "661 Iowa Administrative Code 276.3, fire protection system installer licensing", url: "https://www.law.cornell.edu/regulations/iowa/Iowa-Code-r-661-276.3" };
const ELEVATOR_LAW: SourceRef = { label: "Iowa Code Chapter 89A, conveyance (elevator) safety", url: "https://www.legis.iowa.gov/docs/code/89A.pdf" };
const SENIOR_YEAR_PLUS: SourceRef = { label: "Iowa Department of Education, Senior Year Plus (concurrent enrollment)", url: "https://educate.iowa.gov/higher-ed/senior-year-plus" };
const LAST_DOLLAR: SourceRef = { label: "Iowa Future Ready Iowa Last-Dollar Scholarship", url: "https://workforce.iowa.gov/opportunities/grants/lds" };
const APPRENTICESHIP_IA: SourceRef = { label: "Iowa Workforce Development, Office of Apprenticeship", url: "https://workforce.iowa.gov/apprenticeship" };

const DMACC_ELECTRICAL: TrainingOption = {
  name: "Des Moines Area Community College (DMACC), Electrical Trades",
  kind: "college",
  where: "Ankeny/Des Moines metro",
  detail: "A diploma program with an apprenticeship pathway, plus separate Electric Utility Technology and Industrial Electrical Maintenance programs.",
  url: "https://www.dmacc.edu/pathways/btt/electrical-trades.html",
};
const KIRKWOOD: TrainingOption = {
  name: "Kirkwood Community College",
  kind: "college",
  where: "Cedar Rapids",
  detail: "An HVAC Installer short-term program, Industrial Maintenance Technology, and other manufacturing and trades programs.",
  url: "https://www.kirkwood.edu/programs/short-term/hvac-installer",
};
const ABC_IOWA: TrainingOption = {
  name: "ABC of Iowa apprenticeships",
  kind: "open-shop",
  where: "Statewide, based near Des Moines",
  detail: "Open-shop registered apprenticeships across the building trades.",
  url: "https://abciowaorg.presencehost.net/who-we-are",
};
const IBEW_347: TrainingOption = {
  name: "IBEW Local 347 electrical apprenticeship",
  kind: "union",
  where: "Des Moines metro",
  detail: "A paid union electrical apprenticeship serving the Des Moines area.",
  url: "https://electricaltrainingalliance.org/training/apprenticeshipTraining",
  programSlug: "ibew-neca-electrical-apprenticeship",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noStateLicense = (what: string) =>
  `Iowa has no license for ${what}, and no state general contractor license either. Anyone doing more than $2,000 of construction work a year must still register as a contractor with Iowa Workforce Development, without a skills test.`;

export const IOWA: StateGuide = {
  // Iowa ZIP codes run 500xx-528xx.
  locationHints: { zip3: [[500, 528]], cities: ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Iowa City", "Waterloo", "Council Bluffs", "Dubuque"] },
  slug: "iowa",
  code: "IA",
  name: S,
  lastVerified: "2026-11-21",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Iowa long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=IA",
  },
  intro:
    "A field guide to 25 construction trades in Iowa: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ about 65,900 people in Iowa, and the state projects about 6,100 openings a year across them through 2034.",
    "Electricians, plumbers and HVAC/mechanical workers all need a state journeyman and master license here, through two different state boards.",
    "Fire sprinkler fitters need an individual state credential too, but elevator mechanics don't: Iowa relies on a national safety standard instead of its own mechanic license.",
    "The Future Ready Iowa Last-Dollar Scholarship paid an average of $2,288 a student in FY2024, covering remaining tuition and fees after other aid at any Iowa community college.",
    "Welders are an unusually large trade in Iowa, projected to employ more people than carpenters by 2034.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "Future Ready Iowa Last-Dollar Scholarship", value: "$2,288", note: "Average award, FY2024, covering remaining tuition and fees after other aid at any Iowa community college" },
  licensingOverview:
    "Iowa licenses electricians, plumbers and HVAC/mechanical workers individually, each with apprentice, journeyperson (or journeyman) and master tiers, through the Electrical Examining Board and the Plumbing and Mechanical Systems Board. Fire sprinkler fitters need an individual credential from the State Fire Marshal too. Elevator mechanics have no individual state license; Iowa's conveyance safety program relies on the national ASME A17.1 standard instead. Nearly every other trade on this page has no worker-level license, though almost anyone doing more than $2,000 of construction work a year must register as a contractor with Iowa Workforce Development.",
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
      "Contractor registration in Iowa is a single statewide system, not a city-by-city patchwork.",
      "You can start small. Anyone earning under $2,000 a year from construction work doesn't need to register at all.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Out-of-state contractors need a $25,000 bond or DOT prequalification to register in Iowa.",
    ],
    path:
      "The usual route: work for someone else for years, earn your license, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      CONTRACTOR_REG,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([12370, 13670, 11, 1150]),
      stateLicense: "none",
      licenseSummary: "Iowa has no license for construction laborers. It is the biggest trade on this page and the most common way into construction.",
      licenseAgency: CONTRACTOR_REG,
      training: [ABC_IOWA, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([8420, 9440, 12, 860]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Iowa requires electricians to hold a license from the Electrical Examining Board. A Class A journeyman finishes a registered apprenticeship or board-approved training and passes an exam; a Class B journeyman instead documents 16,000-plus hours of experience since 1998 with no exam. Class A master takes a year beyond journeyman plus an exam. Electrical contractors must have a licensed master affiliated with the business.",
      licenseSteps: [
        { title: "Apprentice", detail: "Register and work under a licensed electrician. Some jurisdictions inspect locally instead of the state board; the license itself is still statewide." },
        { title: "Class A journeyman electrician", detail: "A registered apprenticeship or board-approved training, plus an exam." },
        { title: "Class A master electrician", detail: "1 or more years beyond journeyman, plus an exam." },
        { title: "Keep it current", detail: "Renew with the board and maintain the required business affiliation to pull permits." },
      ],
      licenseAgency: ELEC_BOARD,
      extraCredentials: ["Iowa Class A journeyman or master electrician license"],
      training: [IBEW_347, DMACC_ELECTRICAL, ABC_IOWA],
      businessNote: "Electrical contracting businesses must have a licensed master electrician affiliated with the business.",
    }),
    t("equipment-operator", {
      outlook: ol([5490, 5800, 6, 480]),
      stateLicense: "none",
      licenseSummary: "Iowa has no state license for equipment operators. Employers look for training records and safe hours in the seat, and crane operators need national certification under federal OSHA rules.",
      licenseAgency: CONTRACTOR_REG,
      training: [national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([9100, 9800, 8, 980]),
      stateLicense: "none",
      licenseSummary: "Iowa has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS). It is an unusually large trade here, projected to employ more people than carpenters by 2034.",
      licenseAgency: CONTRACTOR_REG,
      training: [KIRKWOOD],
    }),
    t("hvac-technician", {
      outlook: ol([3710, 4130, 11, 370]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Iowa requires HVAC and refrigeration work to be done under a mechanical license from the Plumbing and Mechanical Systems Board: apprentice, journeyperson (4 years of experience through a registered apprenticeship since 2010), master, and contractor. A separate Service Technician HVAC Specialty License covers a narrower scope.",
      licenseSteps: [
        { title: "Apprentice", detail: "Join a registered apprenticeship and work under a licensed mechanical journeyperson. EPA 608 certification is required to handle refrigerants." },
        { title: "Journeyperson", detail: "4 years of practical experience through a DOL-registered apprenticeship, plus the board's exam." },
        { title: "Master", detail: "Previously licensed as a journeyperson, plus additional experience and an exam." },
        { title: "Keep it current", detail: "Licenses run 3 years, with at least 8 hours of continuing education per renewal." },
      ],
      licenseAgency: PM_BOARD_PAGE,
      extraCredentials: ["Iowa mechanical journeyperson or master license"],
      training: [KIRKWOOD, DMACC_ELECTRICAL, ABC_IOWA],
      businessNote: "Running one in Iowa takes a licensed mechanical contractor with a permanent place of business and insurance or a bond.",
    }),
    t("carpenter", {
      outlook: ol([7500, 8000, 7, 600]),
      stateLicense: "none",
      licenseSummary: noStateLicense("carpenters"),
      licenseAgency: CONTRACTOR_REG,
      training: [ABC_IOWA, national("Carpenters union (UBC) training", "ubc-carpenter-apprenticeship", "Union carpentry apprenticeships.")],
    }),
    t("plumber", {
      outlook: ol([6700, 7150, 7, 600]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Iowa requires plumbers to hold a license from the Plumbing and Mechanical Systems Board: apprentice, journeyperson (4 years of experience, through a registered apprenticeship since 2010), master (previously licensed as journeyperson or master), and contractor, which needs a permanent place of business, a licensed master and insurance or a bond.",
      licenseSteps: [
        { title: "Apprentice", detail: "Join a registered apprenticeship and work under a licensed plumber." },
        { title: "Journeyperson plumber", detail: "4 years of practical experience through a DOL-registered apprenticeship, plus the board's exam." },
        { title: "Master plumber", detail: "Previously licensed as a journeyperson, plus additional experience and an exam." },
        { title: "Keep it current", detail: "Licenses run 3 years, with at least 8 hours of continuing education per renewal." },
      ],
      licenseAgency: PM_BOARD,
      extraCredentials: ["Iowa journeyperson or master plumber license"],
      training: [ABC_IOWA, national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Five-year paid union apprenticeships in plumbing and pipefitting.")],
      ownBusiness: "Running a plumbing business in Iowa takes a licensed master plumber, a permanent place of business, and insurance or a bond.",
    }),
    t("painter", {
      outlook: ol([2640, 2770, 5, 220]),
      stateLicense: "none",
      licenseSummary: noStateLicense("painters"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([2630, 2720, 4, 190]),
      stateLicense: "none",
      licenseSummary: noStateLicense("concrete finishers"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Concrete and site contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([660, 700, 6, 50]),
      stateLicense: "none",
      licenseSummary: noStateLicense("drywall installers"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([170, 190, 8, 20]),
      stateLicense: "none",
      licenseSummary:
        "Iowa has no individual elevator mechanic license. The state's conveyance safety program, run by the Department of Inspections, Appeals and Licensing, relies on the national ASME A17.1 standard for who counts as qualified elevator personnel, rather than issuing its own mechanic credential. Owners need installation, alteration and operating permits for each conveyance.",
      licenseAgency: ELEVATOR_LAW,
      training: [national("Elevator Constructors union (IUEC) training", "neiep-elevator-constructor-apprenticeship", "Union elevator apprenticeship through the National Elevator Industry Educational Program.")],
      ownBusiness: "Elevator work takes specialized tools, insurance and manufacturer relationships, so most mechanics work for established companies.",
    }),
    t("flooring-installer", {
      outlook: ol([220, 240, 12, 20]),
      stateLicense: "none",
      licenseSummary: noStateLicense("flooring installers"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([500, 530, 6, 40]),
      stateLicense: "none",
      licenseSummary: noStateLicense("glaziers"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([320, 340, 7, 30]),
      stateLicense: "none",
      licenseSummary: noStateLicense("insulation installers"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([640, 690, 8, 60]),
      stateLicense: "none",
      licenseSummary: noStateLicense("ironworkers"),
      licenseAgency: CONTRACTOR_REG,
      ownBusiness: "Steel erection companies need heavy equipment and big insurance policies, so most ironworkers work for established firms.",
      training: [national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork.")],
    }),
    t("mason", {
      outlook: ol([650, 670, 4, 50]),
      stateLicense: "none",
      licenseSummary: noStateLicense("masons"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Masonry contractors"), national("Bricklayers union (BAC)", "bac-bricklayer-apprenticeship", "Union apprenticeships for brick, block and stone masons.")],
    }),
    t("millwright", {
      outlook: ol([900, 930, 3, 80]),
      stateLicense: "none",
      licenseSummary: "Iowa has no state license for millwrights. Employers hire on training, experience and precision.",
      licenseAgency: CONTRACTOR_REG,
      training: [national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "journeyman-and-master",
      licenseSummary: "Iowa licenses pipefitting and steamfitting work, including hydronic systems, under the same Plumbing and Mechanical Systems Board structure as HVAC: apprentice, journeyperson, master and contractor.",
      licenseAgency: PM_BOARD,
      extraCredentials: ["Iowa mechanical or hydronic journeyperson license"],
      ownBusiness: "Piping contractors need crews, insurance and a licensed mechanical contractor on staff.",
      training: [ABC_IOWA, national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Five-year paid union apprenticeships in pipefitting.")],
    }),
    t("plasterer-stucco-mason", {
      stateLicense: "none",
      licenseSummary: noStateLicense("plasterers"),
      licenseAgency: CONTRACTOR_REG,
      payNote: "Iowa publishes no pay data for this small trade, so this page shows the national figures.",
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([1510, 1630, 8, 120]),
      stateLicense: "none",
      licenseSummary: "Iowa has no roofing-specific state license. Roofing businesses register under the state's general contractor registration law, the same as any other construction business. Some cities, like Dubuque, license contractors locally.",
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([1490, 1540, 4, 130]),
      stateLicense: "none",
      licenseSummary: "Iowa has no general state license for sheet metal workers. Ducted, pollution-control and fume-hood sheet metal work tied to HVAC systems falls under the Plumbing and Mechanical Systems Board, but structural and architectural metal work outside that scope has no separate license.",
      licenseAgency: PM_BOARD,
      training: [national("Sheet metal apprenticeships (SMART)", "smart-sheet-metal-apprenticeship", "Union sheet metal apprenticeships.")],
    }),
    t("solar-installer", {
      stateLicense: "none",
      licenseSummary: "Iowa has no state solar installer license. The wiring side of a solar job likely falls under the Electrical Examining Board's broad jurisdiction over electrical installations, though a specific state citation for solar interconnection work wasn't found.",
      licenseAgency: ELEC_BOARD,
      training: [DMACC_ELECTRICAL],
    }),
    t("sprinkler-fitter", {
      stateLicense: "worker-certification",
      licenseSummary:
        "Iowa requires fire sprinkler fitters to hold an individual license from the State Fire Marshal: a fire protection system installer and maintenance worker license, or a technician trainee permit while working under a licensed supervisor (up to 3 trainees per supervisor). Automatic sprinkler work needs the national STAR Fire Sprinkler Fitting Mastery exam or NICET Level I or higher in water-based system layout, inspection or testing.",
      licenseSteps: [
        { title: "Technician trainee", detail: "Apply by your first day of employment and work only under a licensed supervisor." },
        { title: "Fire protection system installer and maintenance worker", detail: "Pass the national STAR exam or earn NICET Level I or higher in water-based system layout, inspection or testing." },
        { title: "Specialize (optional)", detail: "Special hazards systems need NICET Level I or higher in special hazard systems; pre-engineered systems need NICET, NAFED or manufacturer training." },
      ],
      licenseAgency: SPRINKLER_RULE,
      extraCredentials: ["Iowa fire protection system installer license"],
      training: [national("Sprinkler Fitters union (UA)", "ua-sprinkler-fitter-apprenticeship", "Five-year registered apprenticeship through a signatory contractor.")],
      ownBusiness: "Running an Iowa fire sprinkler business takes licensed installers on staff and, for special hazards or pre-engineered systems, NICET- or manufacturer-certified specialists.",
    }),
    t("tile-setter", {
      outlook: ol([300, 330, 12, 20]),
      stateLicense: "none",
      licenseSummary: noStateLicense("tile setters"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: noStateLicense("waterproofing installers"),
      licenseAgency: CONTRACTOR_REG,
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Senior Year Plus",
      detail: "Iowa's statewide dual-enrollment framework covers Advanced Placement, concurrent enrollment at community colleges, and career academies that can lead toward an associate degree, with state funding offsetting the cost of the college courses.",
      source: SENIOR_YEAR_PLUS,
    },
  ],
  adults: [
    {
      title: "Future Ready Iowa Last-Dollar Scholarship",
      detail: "Covers remaining tuition and fees, after other aid, for certificate, diploma and associate degree programs in state-designated high-demand fields at any Iowa community college. Paid an average of $2,288 a student in FY2024.",
      source: LAST_DOLLAR,
    },
    {
      title: "Iowa Office of Apprenticeship",
      detail: "Iowa Workforce Development's statewide hub for registered apprenticeships, union and open-shop alike.",
      source: APPRENTICESHIP_IA,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Iowa statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Iowa long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=IA" },
    { label: "Plasterers, no Iowa wage data published (BLS via O*NET)", url: "https://www.onetonline.org/link/localwages/47-2161.00?st=IA" },
    ELEC_BOARD,
    PM_BOARD,
    PM_BOARD_PAGE,
    CONTRACTOR_REG,
    SPRINKLER_RULE,
    ELEVATOR_LAW,
    SENIOR_YEAR_PLUS,
    LAST_DOLLAR,
    APPRENTICESHIP_IA,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
