// Virginia state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Virginia-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, UA_669, NEIEP, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Virginia";

const DPOR_TRADESMEN: SourceRef = { label: "Virginia DPOR, Board for Contractors, Tradesman licensing", url: "https://www.dpor.virginia.gov/Boards/Tradesmen/" };
const DPOR_CONTRACTORS: SourceRef = { label: "Virginia DPOR, Board for Contractors", url: "https://www.dpor.virginia.gov/Boards/Contractors/" };
const VA_CODE_54_1100: SourceRef = { label: "Va. Code § 54.1-1100, Class A, B and C contractor license thresholds", url: "https://law.lis.virginia.gov/vacode/54.1-1100/" };
const VAC_39: SourceRef = { label: "18VAC50-30-39, Virginia journeyman and master tradesman license requirements", url: "https://law.lis.virginia.gov/admincode/title18/agency50/chapter30/section39/" };
const VAC_43: SourceRef = { label: "18VAC50-30-43, Virginia certified elevator mechanic license", url: "https://law.lis.virginia.gov/admincode/title18/agency50/chapter30/section43/" };
const VAC_SPECIALTIES: SourceRef = { label: "Virginia DPOR, contractor classifications and specialties (fire sprinkler SPR, roofing/waterproofing ROC)", url: "https://www.dpor.virginia.gov/sites/default/files/Records%20and%20Documents/Regulant%20List/VA%20Contractors%20Classifications%20&%20Specialties.pdf" };
const VAC_SPRINKLER_INSPECTOR: SourceRef = { label: "18VAC50-30, fire sprinkler system inspector certification (NICET Level II or higher)", url: "https://law.lis.virginia.gov/admincodefull/title18/agency50/chapter30/" };
const FASTFORWARD: SourceRef = { label: "Virginia Community College System (VCCS), FastForward workforce credentials", url: "https://es.vccs.edu/?p=1008" };
const YRA_SRC: SourceRef = { label: "Virginia Dept. of Labor and Industry, Youth Registered Apprenticeship (YRA)", url: "https://doli.dev.sitevision.com/?p=288" };
const ABC_VA_SRC: SourceRef = { label: "ABC Virginia apprenticeship (Northern Virginia, Central Virginia, Hampton Roads)", url: "https://www.abcva.org/apprenticeship" };

const FASTFORWARD_OPT: TrainingOption = {
  name: "Virginia FastForward",
  kind: "college",
  where: "Virginia's community colleges statewide",
  detail:
    "The Commonwealth pays two-thirds of the cost of an eligible short-term workforce credential class: you or your employer pay a third up front, the state pays a third right away, and the state pays the final third once you finish the class and earn the credential. Textbooks and exam fees are included.",
  url: "https://es.vccs.edu/?p=1008",
};
const ABC_VA: TrainingOption = {
  name: "ABC Virginia apprenticeship",
  kind: "open-shop",
  where: "Hubs in Northern Virginia (Dulles), Central Virginia (Richmond) and Hampton Roads (Chesapeake)",
  detail: "Registered apprenticeships using NCCER curriculum, covering electrical, HVAC, plumbing, drywall, welding and pipefitting, carpentry, sheet metal and telecom/low voltage.",
  url: "https://www.abcva.org/apprenticeship",
};
const IBEW_666: TrainingOption = {
  name: "IBEW Local 666 / Richmond Electricians' JATC",
  kind: "union",
  where: "Richmond / North Chesterfield",
  detail: "Paid union electrical apprenticeship run by IBEW and NECA contractors.",
  url: "https://tradecolleges.org/apprenticeships-in/virginia/electrician",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const IBEW_1340: TrainingOption = { ...IBEW_666, name: "IBEW Local 1340 / Hampton Roads Electrical Industry JATC", where: "Newport News (Hampton Roads region)" };
const UA_10: TrainingOption = {
  name: "UA Local 10, Plumbers and Steamfitters JATC",
  kind: "union",
  where: "Richmond",
  detail: "Paid union apprenticeship in plumbing and pipefitting.",
  url: "https://www.abcva.org/apprenticeship",
};
const SMART_100: TrainingOption = {
  name: "SMART Local 100, Sheet Metal Workers",
  kind: "union",
  where: "Richmond and Norfolk",
  detail: "Paid union apprenticeship for ductwork and architectural sheet metal.",
  url: "https://nabtu.org/councils/virginia/?type=local",
};
const IRONWORKERS_28: TrainingOption = {
  name: "Ironworkers Local 28 / Richmond Area Ironworkers JAC",
  kind: "union",
  where: "Midlothian (Richmond metro)",
  detail: "Paid union apprenticeship in structural and reinforcing ironwork.",
  url: "https://nabtu.org/councils/virginia/?type=local",
};
const TIDEWATER_CC: TrainingOption = {
  name: "Tidewater Community College, Skilled Trades Academy",
  kind: "college",
  where: "Hampton Roads",
  detail: "A welding Career Studies Certificate and related trade certificate tracks, eligible for FastForward funding.",
  url: "https://courses.vccs.edu/colleges/tcc/programs/major/995.CertificateWelding",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const CLASS_C_NOTE =
  "Virginia requires a Class A, B or C contractor license once a job crosses $1,000, sized by project value and yearly volume. A Class C license covers jobs over $1,000 and under $30,000.";
const noTradeLicense = (what: string) => `Virginia has no individual license for ${what}. A business doing the work needs a Class A, B or C contractor license once a job crosses $1,000.`;

export const VIRGINIA: StateGuide = {
  // Virginia ZIP codes run 201xx (Northern Virginia/Dulles) and 220xx-245xx.
  locationHints: { zip3: [[201, 201], [220, 245]], cities: ["Richmond", "Virginia Beach", "Norfolk", "Roanoke", "Charlottesville", "Arlington", "Alexandria", "Chesapeake", "Lynchburg"] },
  slug: "virginia",
  code: "VA",
  name: S,
  lastVerified: "2026-11-17",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Virginia long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=VA",
  },
  intro:
    "A field guide to 25 construction trades in Virginia: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ roughly 158,000 people in Virginia, and the state projects roughly 11,800 openings a year across them through 2034.",
    "Virginia's DPOR Board for Contractors licenses individual electricians, plumbers and HVAC/gas workers, plus elevator mechanics, separately from the Class A, B or C contractor license a business needs once a job crosses $1,000.",
    "Virginia FastForward pays two-thirds the cost of an eligible short-term credential class at a community college, with the final third paid only after you finish and earn the credential.",
    "Students as young as 16, in 11th or 12th grade, can join a Youth Registered Apprenticeship and earn a graduation credit for logging paid, on-the-job training hours.",
    "Northern Virginia's data center construction boom is a well-documented, Virginia-specific driver of electrician demand.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "Virginia FastForward", value: "2/3 covered", note: "State-paid share of an eligible short-term credential class at a community college" },
  licensingOverview:
    "Virginia regulates construction trades through DPOR's Board for Contractors, with two linked layers: individual tradesman certifications (journeyman and master electricians, plumbers and HVAC/gas fitters, plus separate certifications for elevator mechanics, backflow prevention workers, water well providers and fire sprinkler inspectors) and business-level Class A, B or C contractor licenses sized to the job. Many trades on this page, including carpenters, laborers, roofers, drywall, painters, masons and ironworkers, have no individual DPOR license; only the business doing the work needs a contractor license once the job crosses $1,000.",
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
      "Virginia's Class C license covers smaller jobs, over $1,000 and under $30,000, so a new business can start without qualifying for the bigger Class A or B license right away.",
      "You can start small. Many owners begin with one truck and side jobs before going full-time.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Virginia's $1,000 threshold means almost any paid job needs a contractor license, so plan for it before you take side work.",
    ],
    path:
      "The usual route: work for someone else for years, earn your tradesman license where one exists, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      VA_CODE_54_1100,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([37180, 40660, 9, 3660]),
      stateLicense: "none",
      licenseSummary: "Virginia has no individual license for construction laborers. It is the biggest trade on this page and the most common way into construction.",
      training: [ABC_VA, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([25480, 27820, 9, 2560]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Virginia licenses electricians statewide through DPOR's Board for Contractors under 18VAC50-30-39. A journeyman license trades off education against experience: a high school graduate with no formal training needs 8 years of practical experience, while 240 hours of vocational training cuts that to 4 years, and an associate degree to 2 years. A master license needs either 1 year as a journeyman, 3 years holding a residential electrician license, or 9 years of practical experience. Since April 1, 2025, DPOR also offers a lighter-weight Residential Plumbing and Residential HVAC Mechanic license for residential-only work.",
      licenseSteps: [
        { title: "Registered electrician's helper", detail: "Work under a licensed journeyman or master while you train." },
        { title: "Journeyman electrician", detail: "8 years of practical experience with no formal training, down to 1 year with a related bachelor's degree, plus the board exam." },
        { title: "Master electrician", detail: "1 year as a journeyman, 3 years holding a residential license, or 9 years of practical experience, plus the master exam." },
        { title: "Electrical contractor", detail: "A business classification under DPOR's Board for Contractors, on top of the individual license." },
      ],
      licenseAgency: VAC_39,
      extraCredentials: ["Virginia journeyman or master electrician license"],
      training: [IBEW_666, IBEW_1340, ABC_VA],
      businessNote: "Running one in Virginia takes a master electrician license, plus a Class A, B or C contractor license sized to the job.",
    }),
    t("equipment-operator", {
      outlook: ol([11530, 12460, 8, 1100]),
      stateLicense: "none",
      licenseSummary: "Virginia has no state license for equipment operators. Employers look for training records and safe hours in the seat, and some jobs need a commercial driver's license.",
      training: [ABC_VA, national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([11060, 11580, 5, 1140]),
      stateLicense: "none",
      licenseSummary: "Virginia has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      training: [TIDEWATER_CC, LEARN_ON_JOB("Fabrication shops, shipyards and contractors")],
    }),
    t("hvac-technician", {
      outlook: ol([14660, 16020, 9, 1410]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Virginia licenses HVAC and gas fitting workers statewide through DPOR's Board for Contractors, under the same journeyman/master framework as electricians (18VAC50-30-39). Since April 1, 2025, DPOR also offers a Residential HVAC Mechanic license, a lighter-weight path for residential-only work. Gas fitting (natural gas and LPG) is tracked separately for continuing education.",
      licenseSteps: [
        { title: "Residential HVAC mechanic (newer, lighter path)", detail: "Lower experience and training requirements, residential work only." },
        { title: "Journeyman HVAC/gas fitter", detail: "Education-for-experience trade-off as with electricians, plus the board exam." },
        { title: "Master HVAC/gas fitter", detail: "1 year as a journeyman, or equivalent experience, plus the master exam." },
      ],
      licenseAgency: VAC_39,
      extraCredentials: ["Virginia journeyman or master HVAC/gas fitter license (or the newer Residential HVAC Mechanic license)"],
      training: [ABC_VA, UA_10],
      businessNote: "Running one in Virginia takes a master-level license, plus a Class A, B or C contractor license sized to the job.",
    }),
    t("carpenter", {
      outlook: ol([25060, 26680, 7, 2280]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("carpenters"),
      training: [ABC_VA, national("Carpenters union (UBC) training", "ubc-carpenter-apprenticeship", "Union carpentry apprenticeships.")],
    }),
    t("plumber", {
      outlook: ol([12520, 13210, 6, 1160]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Virginia licenses plumbers statewide through DPOR's Board for Contractors under the same journeyman/master framework as electricians (18VAC50-30-39). Since April 1, 2025, DPOR also offers a Residential Plumbing license, a lighter-weight path for residential-only work.",
      licenseSteps: [
        { title: "Residential plumber (newer, lighter path)", detail: "Lower experience and training requirements, residential work only." },
        { title: "Journeyman plumber", detail: "Education-for-experience trade-off as with electricians, plus the board exam." },
        { title: "Master plumber", detail: "1 year as a journeyman, or equivalent experience, plus the master exam." },
      ],
      licenseAgency: VAC_39,
      extraCredentials: ["Virginia journeyman or master plumber license (or the newer Residential Plumbing license)"],
      training: [UA_10, ABC_VA],
      ownBusiness: "Running a plumbing business in Virginia takes a master plumber license, plus a Class A, B or C contractor license sized to the job.",
    }),
    t("painter", {
      outlook: ol([9100, 9540, 5, 760]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("painters"),
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([4770, 4790, 1, 360]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("concrete finishers"),
      training: [LEARN_ON_JOB("Concrete and site contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([2300, 2450, 6, 170]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("drywall installers"),
      training: [ABC_VA, LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([590, 620, 5, 50]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Virginia certifies elevator mechanics through DPOR's Board for Contractors under 18VAC50-30-43. The usual path is 3 years of practical experience plus 144 hours of formal vocational training (extra experience can substitute for some of the hours) and the board exam; completing a board-approved training program's own exam, or a registered apprenticeship, can also satisfy it. A narrower Certified Accessibility Mechanic credential, with a Limited Use/Limited Application (LULA) endorsement, covers wheelchair lifts and home elevators.",
      licenseSteps: [
        { title: "Helper or apprentice", detail: "Hired by an elevator company, working under licensed mechanics." },
        { title: "Training program", detail: "NEIEP's union program, a board-approved equivalent, or a registered apprenticeship." },
        { title: "Certified elevator mechanic", detail: "3 years of practical experience plus 144 hours of training, and the board exam (or program completion)." },
        { title: "Certified accessibility mechanic (alternate)", detail: "A narrower license for wheelchair lifts and home elevators." },
      ],
      licenseAgency: VAC_43,
      extraCredentials: ["Virginia certified elevator mechanic license"],
      training: [NEIEP],
      ownBusiness: "Elevator work in Virginia needs licensed mechanics, so most mechanics work for established elevator companies.",
    }),
    t("flooring-installer", {
      outlook: ol([950, 1040, 10, 90]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("flooring installers"),
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([670, 720, 6, 70]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("glaziers"),
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      stateLicense: "none",
      licenseSummary: noTradeLicense("insulation installers"),
      payNote: "O*NET and Projections Central publish no Virginia-specific job outlook for insulation installers, so there is no state projection here.",
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([1080, 1120, 4, 100]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("ironworkers"),
      training: [IRONWORKERS_28],
    }),
    t("mason", {
      outlook: ol([2090, 2190, 5, 180]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("masons"),
      payNote: "Figures cover brickmasons and blockmasons. Stonemasons are a separate, much smaller BLS category in Virginia, projected to shrink slightly.",
      training: [ABC_VA],
    }),
    t("millwright", {
      outlook: ol([740, 780, 5, 60]),
      stateLicense: "none",
      licenseSummary: "Virginia has no state license for millwrights. Employers hire on training, experience and precision.",
      training: [LEARN_ON_JOB("Industrial and plant maintenance contractors")],
    }),
    t("pipefitter", {
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Virginia has no separate state license for industrial pipefitting. Pipefitters doing plumbing-code work fall under the same journeyman/master plumber license as plumbers (18VAC50-30-39), with gas fitting tracked as an add-on. There is no distinct state credential for high-pressure industrial piping.",
      training: [UA_10],
    }),
    t("plasterer-stucco-mason", {
      outlook: ol([160, 170, 6, 10]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("plasterers"),
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([2760, 2930, 6, 230]),
      stateLicense: "none",
      licenseSummary: `${noTradeLicense("roofers")} DPOR's Roofing Contracting (ROC) specialty, which also covers dampproofing and waterproofing, applies to the business.`,
      licenseAgency: VAC_SPECIALTIES,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([3090, 3230, 5, 300]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("sheet metal workers"),
      training: [SMART_100, ABC_VA],
    }),
    t("solar-installer", {
      outlook: ol([1130, 1260, 11, 120]),
      stateLicense: "none",
      licenseSummary: "Virginia has no separate solar license. The wiring side of a solar job is electrical work, which needs Virginia electrical licensing from DPOR.",
      training: [IBEW_666],
    }),
    t("sprinkler-fitter", {
      stateLicense: "contractor",
      licenseSummary:
        "Virginia licenses fire sprinkler work as the SPR specialty under DPOR's Board for Contractors, separate from plumbing. DPOR does certify individual fire sprinkler system inspectors (NICET Level II or higher), but there is no separate individual license found for sprinkler fitters or installers beyond working for an SPR-licensed contractor.",
      licenseSteps: [
        { title: "Apprentice fitter", detail: "Work for an SPR-licensed sprinkler contractor." },
        { title: "Journey fitter", detail: "Install and test systems on your own, under the contractor's SPR license." },
        { title: "NICET certification (optional)", detail: "Required for sprinkler system inspectors; valuable for fitters too." },
      ],
      licenseAgency: VAC_SPRINKLER_INSPECTOR,
      training: [UA_669],
      ownBusiness: "Opening a sprinkler company in Virginia takes the SPR contractor specialty under DPOR's Board for Contractors.",
    }),
    t("tile-setter", {
      outlook: ol([820, 910, 10, 80]),
      stateLicense: "none",
      licenseSummary: noTradeLicense("tile setters"),
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: `Virginia has no standalone waterproofing license; it falls under DPOR's Roofing Contracting (ROC) specialty, the same classification as roofers.`,
      licenseAgency: VAC_SPECIALTIES,
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Youth Registered Apprenticeship (YRA)",
      detail:
        "Students as young as 16, in 11th or 12th grade, can combine paid on-the-job training with career and technical coursework. Completing 280-plus hours of on-the-job training in a school year earns a graduation credit, and the hours carry forward into an adult Registered Apprenticeship.",
      source: YRA_SRC,
    },
    {
      title: "ABC Virginia apprenticeship",
      detail: "Registered apprenticeships using NCCER curriculum, with hubs in Northern Virginia, Central Virginia and Hampton Roads, open to high school-age entrants in many trades.",
      source: ABC_VA_SRC,
    },
  ],
  adults: [
    {
      title: "Virginia FastForward",
      detail:
        "Pays two-thirds of the cost of an eligible short-term workforce credential at a Virginia community college, with the final third paid after you finish and earn the credential. Additional financial aid is often available on top.",
      source: FASTFORWARD,
    },
    {
      title: "Construction apprenticeships",
      detail: "IBEW, UA, SMART, Ironworkers and ABC Virginia all run paid, registered apprenticeships out of Richmond, Hampton Roads and Northern Virginia.",
      source: ABC_VA_SRC,
    },
    {
      title: "Tidewater Community College, Skilled Trades Academy",
      detail: "Welding and other trade certificate tracks in Hampton Roads, eligible for FastForward funding.",
      source: { label: "Tidewater Community College, Skilled Trades Academy", url: "https://courses.vccs.edu/colleges/tcc/programs/major/995.CertificateWelding" },
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Virginia statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Virginia long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=VA" },
    DPOR_TRADESMEN,
    DPOR_CONTRACTORS,
    VA_CODE_54_1100,
    VAC_39,
    VAC_43,
    VAC_SPECIALTIES,
    VAC_SPRINKLER_INSPECTOR,
    FASTFORWARD,
    YRA_SRC,
    ABC_VA_SRC,
    { label: "Virginia Business, Northern Virginia data center construction and electrician demand", url: "https://virginiabusiness.com/" },
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
