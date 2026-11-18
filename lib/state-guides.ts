// State guides: hand-researched, source-cited facts for /states/[slug].
//
// Pay is NOT stored here. It comes from lib/state-pay-data.ts (BLS OEWS,
// May 2025, statewide) through lib/state-pay-lookup.ts, so the state pages
// and the Student Loan ROI page always show the same numbers.
//
// Every other fact carries a source. When a fact changes, update it here and
// bump `lastVerified`. Wording rule for licensing (legal-advice guardrail):
// describe what the state agency requires per its own rules or forms, and
// always link the agency. Never imply a rule is nationwide.

import { FLORIDA } from "@/lib/states/florida";
import { ALABAMA } from "@/lib/states/alabama";
import { SOUTH_CAROLINA } from "@/lib/states/south-carolina";
import { NORTH_CAROLINA } from "@/lib/states/north-carolina";
import { TENNESSEE } from "@/lib/states/tennessee";
import { MISSISSIPPI } from "@/lib/states/mississippi";
import { LOUISIANA } from "@/lib/states/louisiana";
import { ARKANSAS } from "@/lib/states/arkansas";
import { KENTUCKY } from "@/lib/states/kentucky";
import { VIRGINIA } from "@/lib/states/virginia";
import { WEST_VIRGINIA } from "@/lib/states/west-virginia";

export type SourceRef = { label: string; url: string };

export type LicenseStep = {
  title: string;
  detail: string;
};

export type TrainingOption = {
  name: string;
  kind: "union" | "open-shop" | "college" | "free-training" | "high-school";
  where: string;
  detail: string;
  url?: string;
  programSlug?: string; // BreakGroundU /programs page for the national program, when one exists
};

export type StateTrade = {
  soc: string; // joins to lib/state-pay-data.ts
  slug: string; // BreakGroundU career page
  name: string;
  oneLine: string;
  outlook?: { base: number; projected: number; growthPct: number; openingsPerYear: number }; // missing when Georgia publishes no projection
  sharedStatsWith?: string; // slug of the trade BLS lumps this one in with (same pay, no separate job count)
  stateLicense: "contractor" | "journeyman-and-master" | "worker-certification" | "none";
  licenseSummary: string;
  licenseSteps: LicenseStep[];
  licenseAgency?: SourceRef;
  credentials: string[];
  training: TrainingOption[];
  payNote?: string;
  overtime: string; // how overtime shows up in this trade
  ownBusiness: string; // what running your own shop takes in this state
  hardParts: string[]; // honest downsides, shown beside the pay
  fit: TradeFit; // drives the "which trade fits you?" strip
};

export type WorkStyle = "build" | "fix" | "machines";
export type TradeFit = {
  styles: WorkStyle[];
  setting: "outdoor" | "indoor" | "mixed";
  heights: boolean; // regularly works up high (ladders, lifts, roofs, steel)
};

export type BusinessSection = {
  lead: string;
  upside: string[];
  risks: string[];
  path: string;
  sources: SourceRef[];
};

export type StateGuide = {
  // For matching a free-text location to this guide (the Action Plan's
  // "Where are you looking?" box): ZIP code prefixes as inclusive ranges
  // of the first three digits, and city names that only mean this state.
  locationHints: { zip3: [number, number][]; cities: string[] };
  // Practice exams on BreakGroundU that don't fit this state's rules (e.g.
  // a journeyman electrician exam in a state with no journeyman license),
  // left out of the trade panels' "keep going" links.
  excludeExams?: string[];
  slug: string;
  code: string;
  name: string;
  lastVerified: string; // ISO date
  outlookPeriod: string;
  outlookSource: SourceRef;
  intro: string;
  quickTakeaways: string[];
  // Fourth marker in the hero strip: the state's headline free-training fact.
  costMarker: { label: string; value: string; note: string };
  licensingOverview: string;
  overtimeNote: string;
  overtimeSource: SourceRef;
  safety: { note: string; source: SourceRef };
  business: BusinessSection;
  trades: StateTrade[];
  highSchool: { title: string; detail: string; source: SourceRef }[];
  adults: { title: string; detail: string; source: SourceRef }[];
  sources: SourceRef[];
};

const GA_SOS_ELECTRICAL: SourceRef = {
  label: "Georgia Division of Electrical Contractors (Secretary of State)",
  url: "https://sos.ga.gov/georgia-state-board-electrical-contractors",
};
const GA_SOS_PLUMBERS: SourceRef = {
  label: "Georgia Division of Master and Journeyman Plumbers (Secretary of State)",
  url: "https://sos.ga.gov/georgia-state-division-master-and-journeyman-plumbers",
};
const GA_SOS_AIR: SourceRef = {
  label: "Georgia Division of Conditioned Air Contractors (Secretary of State)",
  url: "https://sos.ga.gov/georgia-state-board-conditioned-air-contractors",
};
const GA_SOS_GC: SourceRef = {
  label: "Georgia State Licensing Board for Residential and General Contractors",
  url: "https://sos.ga.gov/state-licensing-board-residential-and-commercial-general-contractors",
};

const GA_SPECIALTY: SourceRef = {
  label: "Georgia contractor licensing board: recognized specialty trades (no residential or general contractor license needed for that work)",
  url: "https://sos.ga.gov/page/traditional-specialty-contractors-policy-statements",
};

const HOPE_CAREER: TrainingOption = {
  name: "Technical College System of Georgia (TCSG)",
  kind: "college",
  where: "22 colleges statewide",
  detail:
    "Diplomas and short certificates. Construction and welding programs are on the HOPE Career Grant list, so tuition can be fully covered for eligible Georgia residents.",
  url: "https://www.tcsg.edu/free-tuition/",
};

const CONSTRUCTION_READY: TrainingOption = {
  name: "Construction Ready",
  kind: "free-training",
  where: "Metro Atlanta and other Georgia sites",
  detail:
    "Free 4-week boot camp for Georgia residents. Graduates can earn up to eight credentials, including NCCER Core and OSHA 10, and get connected with hiring contractors.",
  url: "https://constructionready.org/",
};

export const GEORGIA: StateGuide = {
  // Georgia ZIP codes run 300xx-319xx plus 398xx-399xx.
  locationHints: {
    zip3: [
      [300, 319],
      [398, 399],
    ],
    cities: ["Atlanta", "Savannah", "Macon", "Valdosta", "Warner Robins", "Alpharetta"],
  },
  excludeExams: ["exam-journeyman-electrician"],
  slug: "georgia",
  code: "GA",
  name: "Georgia",
  lastVerified: "2026-11-13",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Georgia long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=GA",
  },
  intro:
    "A field guide to 25 construction trades in Georgia: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTAE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ about 141,000 people in Georgia, and the state projects about 13,700 openings a year across them through 2034.",
    "Most of these trades have no state license at all. Five do (electrical, plumbing, HVAC, elevators and fire sprinklers), and you qualify through paid work experience and exams, not a college degree.",
    "High school juniors and seniors can take technical college courses for free through Dual Enrollment, up to 30 semester hours.",
    "For eligible Georgia residents, the HOPE Grant plus the HOPE Career Grant covers all tuition in construction and welding programs at Georgia's technical colleges.",
    "Paid, registered apprenticeships run in Georgia for most trades on this page. In the rest, people usually learn on the job. Either way, you earn a paycheck from day one.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "Tech college tuition", value: "$0", note: "Construction and welding, for HOPE-eligible students" },
  licensingOverview:
    "Georgia licenses electrical, plumbing and conditioned air (HVAC) work through the Construction Industry Licensing Board, and residential and general contractors through a separate board that exempts recognized specialty trades like roofing, painting and masonry. Elevator mechanics and fire sprinkler contractors are certified by the Safety Fire Commissioner. Most of these licenses are for people who contract the work themselves. Workers usually start under a licensed company and earn their own license later.",
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
      "In Georgia, the licenses in this guide double as business licenses: master plumber, electrical contractor, conditioned air contractor, and residential or general contractor. Many specialty trades, like roofing, painting and tile, need no state contractor license at all.",
      "You can start small. Many owners begin with one truck and side jobs before going full-time.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Income swings with the season and the economy, and customers don't always pay on time.",
    ],
    path:
      "The usual route: work for someone else for years, earn your state license, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      {
        label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023",
        url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm",
      },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      {
        label: "Georgia Division of Master and Journeyman Plumbers FAQ (only master plumbers may own a business)",
        url: "https://sos.ga.gov/page/division-master-and-journeyman-plumbers-faq",
      },
    ],
  },
  trades: [
    {
      soc: "47-2061",
      slug: "laborer",
      name: "Construction laborers",
      oneLine: "The crew that keeps a site moving: digging, hauling, setting up, cleaning up and helping every other trade.",
      outlook: { base: 36240, projected: 40320, growthPct: 11, openingsPerYear: 3420 },
      stateLicense: "none",
      licenseSummary:
        "Georgia has no license for construction laborers. It is the most common way into construction: many people start here and move into a skilled trade.",
      licenseSteps: [
        { title: "Laborer", detail: "Start on a crew. Many employers want OSHA 10 safety training first." },
        { title: "Skilled laborer", detail: "Run small equipment, set forms, handle traffic control or pipe work." },
        { title: "Lead laborer or foreman", detail: "Run a crew on site." },
        { title: "Move into a trade (optional)", detail: "Many laborers switch into an apprenticeship once they know which trade they like." },
      ],
      credentials: ["OSHA 10", "Flagger or traffic control certification (common on road jobs)", "NCCER Core (optional)"],
      overtime: "Laborers are usually paid hourly, with overtime common when a project is behind or a concrete pour runs long. Rain days can cut a week short.",
      ownBusiness: "Some laborers grow into small demolition, cleanup or site-prep businesses. Specialty work like demolition doesn't need Georgia's residential or general contractor license.",
      hardParts: [
        "The most physical job on site: lifting, digging and on your feet all day.",
        "Outdoor work through Georgia heat, with early starts.",
        "Starting pay is lower than most trades, so moving up matters.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: false },
      training: [
        CONSTRUCTION_READY,
        {
          name: "Laborers union (LiUNA) training",
          kind: "union",
          where: "Southeast locals, including Augusta-area Local 515",
          detail: "Registered construction craft laborer apprenticeship through the Southeast Laborers' Training Fund.",
          programSlug: "liuna-laborer-apprenticeship",
        },
        {
          name: "Technical College System of Georgia (TCSG)",
          kind: "college",
          where: "Construction programs at many colleges",
          detail: "Short construction certificates under the HOPE Career Grant's Construction Technology area build skills to move up from laborer.",
          url: "https://www.tcsg.edu/free-tuition/",
        },
      ],
    },
    {
      soc: "47-2111",
      slug: "electrician",
      name: "Electricians",
      oneLine: "Install and repair wiring, panels and power systems in homes, offices, plants and data centers.",
      outlook: { base: 21950, projected: 25220, growthPct: 15, openingsPerYear: 2340 },
      stateLicense: "contractor",
      licenseSummary:
        "Georgia does not issue a statewide journeyman electrician license. The state license is for electrical contractors, and it requires 4 years of documented experience.",
      licenseSteps: [
        { title: "Apprentice or helper", detail: "Work under a licensed electrical contractor. No state license needed to start." },
        {
          title: "4 years of experience",
          detail: "Hands-on installation work under a licensed contractor. Some schooling can count toward part of it.",
        },
        {
          title: "Class I contractor",
          detail: "Restricted to single-phase work up to 200 amps. Minimum age 21, exam score of 70.",
        },
        {
          title: "Class II contractor",
          detail: "Unrestricted. Requires experience on systems over single-phase 200 amps.",
        },
      ],
      licenseAgency: GA_SOS_ELECTRICAL,
      credentials: ["OSHA 10 (common first card)", "NCCER Electrical levels (optional, widely recognized)"],
      overtime: "Most electricians are paid by the hour, so hours past 40 a week earn time-and-a-half. Data center builds and plant shutdowns often run long weeks.",
      ownBusiness: "To contract electrical work yourself, Georgia requires a Class I or Class II electrical contractor license, which takes 4 years of experience. Small residential and service shops are a common first business.",
      hardParts: [
        "Live electrical work carries shock and arc-flash risk, so safety rules are strict and non-negotiable.",
        "Ladders, lifts and tight spaces like attics and crawlspaces.",
        "Commercial and industrial jobs can mean long drives to wherever the project is.",
      ],
      fit: { styles: ["build", "fix"], setting: "mixed", heights: true },
      training: [
        {
          name: "Atlanta Electrical JATC (IBEW Local 613 + contractors)",
          kind: "union",
          where: "Norcross, serving north Georgia",
          detail: "Union inside-wireman apprenticeship. Paid, with classroom training at the JATC's center.",
          url: "https://sites.google.com/aejatc.org/etc",
          programSlug: "ibew-neca-electrical-apprenticeship",
        },
        {
          name: "IEC Atlanta & Georgia Chapters (Independent Electrical Contractors)",
          kind: "open-shop",
          where: "Atlanta area, with classes across Georgia",
          detail: "Non-union registered apprenticeship. You work for a member contractor while taking IEC classes.",
          url: "https://www.ieci.org/",
        },
        HOPE_CAREER,
        CONSTRUCTION_READY,
      ],
    },
    {
      soc: "47-2073",
      slug: "equipment-operator",
      name: "Heavy equipment operators",
      oneLine: "Run excavators, dozers, loaders and graders on road, site and utility jobs.",
      outlook: { base: 15960, projected: 17050, growthPct: 7, openingsPerYear: 1440 },
      stateLicense: "none",
      licenseSummary:
        "Georgia has no state license for equipment operators. Federal OSHA rules require crane operators to be certified (NCCCO is the best-known certifier), and hauling equipment on public roads often takes a commercial driver's license.",
      licenseSteps: [
        { title: "Laborer or oiler", detail: "Many operators start on the ground crew and learn the machines on site." },
        { title: "Apprentice operator", detail: "Seat time on smaller machines, then larger ones." },
        { title: "Journey operator", detail: "Runs a range of machines without supervision." },
        { title: "Crane specialty (optional)", detail: "Crane work requires OSHA-accepted operator certification." },
      ],
      credentials: [
        "Crane operator certification such as NCCCO (OSHA requires it for crane work)",
        "Commercial driver's license, CDL (often needed to haul equipment)",
        "NCCER Heavy Equipment Operations (optional)",
      ],
      overtime: "Operators are usually paid hourly. Long days are common in the dry months when site and road work is busiest, while rain and winter can mean shorter weeks.",
      ownBusiness: "Some operators buy a machine and start a small grading or hauling business. Equipment is expensive, and utility work (water, sewer, gas lines) needs a Georgia utility contractor license.",
      hardParts: [
        "Long hours in the seat, with vibration that wears on your back over time.",
        "Rain stops the work, so paychecks can dip in wet months.",
        "You go where the project is, sometimes far from home.",
      ],
      fit: { styles: ["machines"], setting: "outdoor", heights: false },
      training: [
        {
          name: "IUOE Local 926 Joint Apprenticeship",
          kind: "union",
          where: "Training center in Cedartown",
          detail: "Union operating engineers apprenticeship, registered with the U.S. Department of Labor.",
          programSlug: "iuoe-heavy-equipment-operator-apprenticeship",
        },
        CONSTRUCTION_READY,
        {
          name: "Technical College System of Georgia (TCSG)",
          kind: "college",
          where: "Select colleges",
          detail: "Some colleges sponsor registered equipment operator apprenticeships, and commercial truck driving is on the HOPE Career Grant list.",
          url: "https://www.tcsg.edu/free-tuition/",
        },
      ],
    },
    {
      soc: "51-4121",
      slug: "welder",
      name: "Welders",
      oneLine: "Join and cut metal for structures, pipelines, equipment and manufactured products.",
      outlook: { base: 14710, projected: 16770, growthPct: 14, openingsPerYear: 1720 },
      stateLicense: "none",
      licenseSummary:
        "Georgia has no state welding license. Employers test welders to specific codes, usually American Welding Society (AWS) standards, and certifications follow the welder from job to job.",
      licenseSteps: [
        { title: "Training", detail: "A technical college certificate or on-the-job training as a helper." },
        { title: "Entry welder", detail: "Pass an employer's weld test for the processes the job needs." },
        { title: "Code-certified welder", detail: "Certified to AWS or similar codes for structural or pipe work." },
        { title: "Pipe or specialty welder", detail: "Higher-paying pipe, pressure and inspection work." },
      ],
      credentials: ["AWS welder certifications (tested by employers or accredited test facilities)"],
      payNote:
        "This pay includes welders in manufacturing, not just construction, because BLS reports one welder category across all industries.",
      overtime: "Welders are usually paid hourly, with overtime common during plant shutdowns and on pipeline and industrial jobs.",
      ownBusiness: "A mobile welding rig is one of the most common one-person trade businesses. Georgia requires no welding license, but you supply the truck, the welder and the insurance.",
      hardParts: [
        "Heat, sparks, fumes and bright light, so protective gear is required every day.",
        "Awkward positions: overhead, in tight spaces or up high.",
        "Some of the best-paying pipeline and shutdown work means travel.",
      ],
      fit: { styles: ["build"], setting: "mixed", heights: false },
      training: [
        {
          name: "Technical College System of Georgia (TCSG)",
          kind: "college",
          where: "Welding programs at many colleges",
          detail: "Welding and Joining Technology is one of the HOPE Career Grant programs, so tuition can be fully covered for eligible residents.",
          url: "https://www.tcsg.edu/free-tuition/",
        },
        {
          name: "Mechanical Trades Institute (UA Local 72)",
          kind: "union",
          where: "Atlanta",
          detail: "The UA's Atlanta training school runs welding alongside plumbing, pipefitting and HVACR apprenticeships.",
          url: "https://www.mti-jatt.org/",
          programSlug: "ua-plumber-pipefitter-apprenticeship",
        },
      ],
    },
    {
      soc: "49-9021",
      slug: "hvac-technician",
      name: "HVAC technicians",
      oneLine: "Install and service heating, cooling and refrigeration systems. Steady work in Georgia's heat.",
      outlook: { base: 12490, projected: 14340, growthPct: 15, openingsPerYear: 1290 },
      stateLicense: "contractor",
      licenseSummary:
        "Georgia licenses conditioned air contractors: 4 years of experience for Class I and 5 for Class II. Anyone handling refrigerant needs EPA Section 608 certification, a federal rule.",
      licenseSteps: [
        { title: "Technician", detail: "Work for a licensed company. Get EPA 608 certified early." },
        { title: "4 years of experience", detail: "Documented conditioned air work. A vo-tech certificate can count for up to 1 year." },
        {
          title: "Class I contractor",
          detail: "Restricted to systems up to 175,000 BTU heating and 60,000 BTU cooling, which covers most homes.",
        },
        { title: "Class II contractor", detail: "Unrestricted, with 5 years of experience including larger systems." },
      ],
      licenseAgency: GA_SOS_AIR,
      credentials: ["EPA Section 608 (federal, required to handle refrigerant)", "NATE certification (optional)"],
      overtime: "HVAC techs are usually paid hourly. Georgia summers bring heavy overtime for service techs, and many companies pay extra for on-call and emergency calls.",
      ownBusiness: "Contracting HVAC work requires a Georgia conditioned air contractor license (4 years of experience for Class I). Service-and-replacement shops are among the most common trade businesses.",
      hardParts: [
        "Georgia attics can be brutally hot in summer, right when service calls peak.",
        "On-call nights and weekends are common for service techs.",
        "Crawlspaces, rooftops and heavy equipment to move.",
      ],
      fit: { styles: ["fix"], setting: "mixed", heights: true },
      training: [
        {
          name: "Technical College System of Georgia (TCSG)",
          kind: "college",
          where: "Air conditioning programs at many colleges",
          detail: "Air Conditioning Technology is part of the HOPE Career Grant construction list.",
          url: "https://www.tcsg.edu/free-tuition/",
        },
        {
          name: "Mechanical Trades Institute (UA Local 72)",
          kind: "union",
          where: "Atlanta",
          detail: "Union HVACR service technician apprenticeship.",
          url: "https://www.mti-jatt.org/",
        },
        {
          name: "Georgia Sheet Metal JATC (SMART Local 85)",
          kind: "union",
          where: "Atlanta",
          detail: "Union apprenticeship covering HVAC ductwork and service, trained in-house.",
          url: "https://www.smart-union.org/smartcareers/sheet-metal-opportunities-in-local-85-georgia/",
        },
      ],
    },
    {
      soc: "47-2031",
      slug: "carpenter",
      name: "Carpenters",
      oneLine: "Frame, form and finish: from house framing to concrete forms on high-rises.",
      outlook: { base: 12250, projected: 13290, growthPct: 9, openingsPerYear: 1010 },
      stateLicense: "none",
      licenseSummary:
        "Georgia has no license for carpenters as workers. Framing and finish carpentry are recognized specialties, but building or remodeling homes as the contractor on jobs over $2,500 takes a state residential or general contractor license.",
      licenseSteps: [
        { title: "Helper or apprentice", detail: "Learn layout, framing and tools on the job." },
        { title: "Journey carpenter", detail: "Works independently on framing, forms or finish work." },
        { title: "Lead or foreman", detail: "Runs a crew." },
        { title: "Contractor (optional)", detail: "State license needed to contract building or remodeling jobs over $2,500." },
      ],
      licenseAgency: GA_SOS_GC,
      credentials: ["OSHA 10", "NCCER Carpentry levels (optional)"],
      overtime: "Carpenters are usually paid hourly, with overtime when a project runs behind schedule. Bad weather can also cut weeks short.",
      ownBusiness: "Many carpenters go on to become remodelers or home builders, which takes a Georgia residential or general contractor license for jobs over $2,500.",
      hardParts: [
        "Heavy lifting and lots of kneeling, which add up on knees and back over a career.",
        "Working at heights on framing and formwork.",
        "Weather and the end of a project can leave gaps between jobs.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: true },
      training: [
        {
          name: "Carpenters union (UBC) training centers",
          kind: "union",
          where: "Atlanta, Kennesaw, Augusta, Savannah and Moultrie",
          detail: "Union carpenter and millwright apprenticeships through the Southeastern Carpenters Regional Council, about four years.",
          programSlug: "ubc-carpenter-apprenticeship",
        },
        {
          name: "Technical College System of Georgia (TCSG)",
          kind: "college",
          where: "Carpentry at many colleges",
          detail: "Carpentry is part of the HOPE Career Grant construction list.",
          url: "https://www.tcsg.edu/free-tuition/",
        },
        CONSTRUCTION_READY,
      ],
    },
    {
      soc: "47-2152",
      slug: "plumber",
      name: "Plumbers",
      oneLine: "Install water, gas and drain piping in homes, hospitals and businesses.",
      outlook: { base: 7990, projected: 8790, growthPct: 10, openingsPerYear: 760 },
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Georgia licenses plumbers at two levels: Journeyman Plumber after at least 1 year of plumbing experience, and Master Plumber after 5 years, at least 2 of them as a licensed journeyman.",
      licenseSteps: [
        { title: "Apprentice", detail: "Work under a master plumber and build documented experience." },
        { title: "Journeyman Plumber", detail: "At least 1 year of plumbing experience, then the state exam (score of 70)." },
        {
          title: "Master Plumber Class I",
          detail: "5 years, 2 as a licensed journeyman. Limited to one- and two-family homes and commercial buildings up to 10,000 sq ft.",
        },
        { title: "Master Plumber Class II", detail: "Unrestricted, including commercial work like hospitals and high-rises." },
      ],
      licenseAgency: GA_SOS_PLUMBERS,
      credentials: ["Medical gas or backflow certifications (optional specialties)"],
      payNote: "BLS counts plumbers, pipefitters and steamfitters as one occupation, so these pay and job numbers include pipefitters and sprinkler fitters.",
      overtime: "Plumbers are usually paid hourly, and service plumbers often earn overtime or after-hours pay for emergency calls.",
      ownBusiness: "In Georgia, only a licensed Master Plumber can run a plumbing business; a journeyman cannot. That takes 5 years of experience, 2 of them as a licensed journeyman.",
      hardParts: [
        "Crawlspaces, trenches and dirty work: sewage is part of the job.",
        "Emergency calls at night and on weekends in service work.",
        "Lots of kneeling and working in tight spots.",
      ],
      fit: { styles: ["build", "fix"], setting: "indoor", heights: false },
      training: [
        {
          name: "Mechanical Trades Institute (UA Local 72)",
          kind: "union",
          where: "Atlanta",
          detail: "Five-year union plumbing and pipefitting apprenticeship, registered with the U.S. Department of Labor since 1942.",
          url: "https://www.mti-jatt.org/",
          programSlug: "ua-plumber-pipefitter-apprenticeship",
        },
        {
          name: "Technical College System of Georgia (TCSG)",
          kind: "college",
          where: "Plumbing at select colleges",
          detail: "Plumbing is part of the HOPE Career Grant construction list.",
          url: "https://www.tcsg.edu/free-tuition/",
        },
      ],
    },
    {
      soc: "47-2141",
      slug: "painter",
      name: "Painters",
      oneLine: "Prep and paint homes, offices, bridges and industrial tanks, inside and out.",
      outlook: { base: 4740, projected: 5060, growthPct: 7, openingsPerYear: 410 },
      stateLicense: "none",
      licenseSummary:
        "Georgia has no painter license. Painting is a recognized specialty, so painting contractors don't need the state residential or general contractor license for painting work.",
      licenseSteps: [
        { title: "Helper", detail: "Prep work: patching, sanding, masking and cleanup." },
        { title: "Painter", detail: "Brush, roll and spray on your own." },
        { title: "Lead painter", detail: "Run a crew or specialize in coatings or finishes." },
        { title: "Industrial coatings (optional)", detail: "Bridges, tanks and plants, often with extra safety training and higher pay." },
      ],
      licenseAgency: GA_SPECIALTY,
      credentials: ["EPA Lead-Safe (RRP) certification for work on pre-1978 homes (federal)", "OSHA 10"],
      overtime: "Painters are usually paid hourly, with overtime as projects push to finish. Exterior work slows down in rain and cold.",
      ownBusiness: "Painting is one of the easiest trades to start a business in: low startup cost and no state contractor license for painting work. That also means lots of competition on price.",
      hardParts: [
        "Ladders, scaffolds and lifts on exterior and commercial jobs.",
        "Fumes and dust, so ventilation and respirators matter.",
        "Repetitive motion that wears on shoulders over time.",
      ],
      fit: { styles: ["build"], setting: "mixed", heights: true },
      training: [
        {
          name: "Painters union (IUPAT District Council 77)",
          kind: "union",
          where: "Covers Georgia, based in the Atlanta area",
          detail: "Union apprenticeships for commercial painters, industrial coaters, drywall finishers and glaziers.",
          programSlug: "iupat-painter-apprenticeship",
        },
        CONSTRUCTION_READY,
      ],
    },
    {
      soc: "47-2051",
      slug: "concrete-worker",
      name: "Concrete finishers",
      oneLine: "Place, level and finish concrete for slabs, sidewalks, foundations and decks.",
      outlook: { base: 2590, projected: 2760, growthPct: 7, openingsPerYear: 200 },
      stateLicense: "none",
      licenseSummary:
        "Georgia has no license for concrete finishers, and most learn on the job. Concrete is a recognized specialty, so concrete contractors don't need the state residential or general contractor license for concrete work.",
      licenseSteps: [
        { title: "Laborer", detail: "Start on a concrete crew moving and placing material." },
        { title: "Finisher", detail: "Screed, float and finish surfaces." },
        { title: "Lead finisher", detail: "Decorative, polished or high-tolerance floors." },
        { title: "Contractor (optional)", detail: "Concrete-only contractors need no state contractor license." },
      ],
      licenseAgency: GA_SPECIALTY,
      credentials: ["ACI Concrete Flatwork Finisher (optional)", "OSHA 10"],
      overtime: "Finishers are usually paid hourly, with early-morning pours and long days in good weather. Rain can cancel days entirely.",
      ownBusiness: "Small concrete crews that pour driveways, patios and slabs are a common first business. Concrete-only work doesn't need Georgia's residential or general contractor license, but trucks, tools and insurance add up.",
      hardParts: [
        "One of the most physically demanding trades: heavy, fast and often on your knees.",
        "Wet concrete can burn skin, so boots, gloves and long sleeves matter.",
        "Outdoor work in Georgia heat, with early starts and rain days.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: false },
      training: [
        CONSTRUCTION_READY,
        {
          name: "Technical College System of Georgia (TCSG)",
          kind: "college",
          where: "Masonry and construction programs",
          detail: "Masonry and Certified Construction Worker programs build related skills and are HOPE Career Grant eligible at many colleges.",
          url: "https://www.tcsg.edu/free-tuition/",
        },
      ],
    },
    {
      soc: "47-2081",
      slug: "drywall-installer",
      name: "Drywall installers & finishers",
      oneLine: "Hang and finish the walls and ceilings inside nearly every building.",
      outlook: { base: 1110, projected: 1200, growthPct: 8, openingsPerYear: 90 },
      stateLicense: "none",
      licenseSummary:
        "Georgia has no drywall license. Drywall is a recognized specialty, so drywall contractors don't need the state residential or general contractor license for drywall work.",
      licenseSteps: [
        { title: "Helper", detail: "Carry board, cut pieces and clean up." },
        { title: "Hanger or finisher", detail: "Hang board on studs, or tape, mud and sand it smooth." },
        { title: "Lead", detail: "Runs a crew or specializes in ceilings or high-end finishes." },
        { title: "Contractor (optional)", detail: "Drywall-only contractors need no state contractor license." },
      ],
      licenseAgency: GA_SPECIALTY,
      credentials: ["OSHA 10", "NCCER Drywall (optional)"],
      overtime: "Drywall workers are often paid hourly, though some residential crews are paid by the board or the job. Commercial jobs often add overtime near the finish.",
      ownBusiness: "Drywall crews are a common small business, especially in home building. Pay by the piece means fast crews earn more, and slow months hit hard.",
      hardParts: [
        "Full sheets are heavy, and ceilings mean working overhead.",
        "Dust from sanding, so masks matter.",
        "Piece-rate pay on some crews means pressure to go fast.",
      ],
      fit: { styles: ["build"], setting: "indoor", heights: false },
      training: [
        {
          name: "Carpenters and painters unions",
          kind: "union",
          where: "Atlanta area",
          detail: "Hangers usually apprentice through the carpenters union (UBC); tapers and finishers through the painters union (IUPAT District Council 77).",
          programSlug: "iupat-drywall-finisher-apprenticeship",
        },
        CONSTRUCTION_READY,
      ],
    },
    {
      soc: "47-4021",
      slug: "elevator-technician",
      name: "Elevator technicians",
      oneLine: "Install and service elevators and escalators. One of the best-paid trades few people have heard of.",
      outlook: { base: 500, projected: 550, growthPct: 9, openingsPerYear: 40 },
      stateLicense: "worker-certification",
      licenseSummary:
        "Georgia certifies the mechanics themselves. Under the Safety Fire Commissioner's rules, a Class I elevator mechanic needs 3 years of experience, a recognized training program such as NEIEP or an equivalent apprenticeship, a job with a state-certified elevator company, and a passing exam.",
      licenseSteps: [
        { title: "Apprentice", detail: "Hired by an elevator company. Union apprentices are hired through IUEC recruitments." },
        { title: "Training program", detail: "NEIEP, the Certified Elevator Technician program, or an equivalent apprenticeship." },
        { title: "Elevator mechanic certification", detail: "3 years of experience plus the state exam for Class I. Renewed every 2 years with 8 hours of continuing education." },
        { title: "Contractor certification (optional)", detail: "Companies need their own state certificate and must employ certified mechanics." },
      ],
      licenseAgency: {
        label: "Georgia Office of Insurance and Safety Fire Commissioner (elevator rules, 120-3-25)",
        url: "https://www.law.cornell.edu/regulations/georgia/Ga-Comp-R-Regs-R-120-3-25-.22",
      },
      credentials: ["Georgia elevator mechanic certification", "NEIEP or CET training"],
      overtime: "Elevator mechanics are usually paid hourly, and service mechanics earn overtime and call-out pay for nights and weekends when someone is stuck.",
      ownBusiness: "Elevator companies need a Georgia contractor certificate, insurance and certified mechanics, so most mechanics work for established companies.",
      hardParts: [
        "Shafts, pits and machine rooms: tight, dark and high up.",
        "Electrical, mechanical and hydraulic hazards in one job.",
        "Union recruitments open only now and then, so getting in can take patience.",
      ],
      fit: { styles: ["fix", "machines"], setting: "indoor", heights: true },
      training: [
        {
          name: "Elevator Constructors Local 32 (NEIEP)",
          kind: "union",
          where: "Atlanta, with a separate Savannah list",
          detail: "Union apprenticeship run through the National Elevator Industry Educational Program. Recruitments open when contractors need more workers.",
          url: "https://www.neiep.org/elevator-apprenticeship-recruitment-opportunities",
          programSlug: "neiep-elevator-constructor-apprenticeship",
        },
      ],
    },
    {
      soc: "47-2042",
      slug: "flooring-installer",
      name: "Flooring installers",
      oneLine: "Lay hardwood, vinyl, laminate and carpet in homes and businesses.",
      outlook: { base: 480, projected: 550, growthPct: 14, openingsPerYear: 40 },
      stateLicense: "none",
      licenseSummary:
        "Georgia has no flooring license. Wood flooring and carpet, VCT and base are recognized specialties, so flooring contractors don't need the state residential or general contractor license for that work.",
      licenseSteps: [
        { title: "Helper", detail: "Tear out old floors and prep subfloors." },
        { title: "Installer", detail: "Lays one or more floor types on your own." },
        { title: "Certified installer", detail: "Industry or manufacturer certifications help win bigger jobs." },
        { title: "Own crew (optional)", detail: "Many installers work as independent subcontractors." },
      ],
      licenseAgency: GA_SPECIALTY,
      credentials: ["CFI flooring installer certifications (optional)", "Manufacturer certifications"],
      payNote: "BLS counts this group as floor layers except carpet, wood and tile, so some flooring workers fall in other categories.",
      overtime: "Installers are paid hourly or by the square foot. Busy seasons bring long weeks, especially on new-home and remodel jobs.",
      ownBusiness: "Many flooring installers end up working for themselves as subcontractors to stores and builders. You supply the tools and van, and the work comes and goes.",
      hardParts: [
        "On your knees nearly all day. Knee pads are a must, and knees still wear out.",
        "Lifting rolls and boxes of heavy material.",
        "Adhesive fumes and dust.",
      ],
      fit: { styles: ["build"], setting: "indoor", heights: false },
      training: [
        CONSTRUCTION_READY,
        {
          name: "Learn on the job",
          kind: "open-shop",
          where: "Flooring contractors and stores statewide",
          detail: "Most installers learn as a helper to an experienced installer, then add industry certifications.",
        },
      ],
    },
    {
      soc: "47-2121",
      slug: "glazier",
      name: "Glaziers",
      oneLine: "Install the glass and metal storefronts, windows and curtain walls on modern buildings.",
      stateLicense: "none",
      licenseSummary:
        "Georgia has no glazier license. Glazing and aluminum storefronts are recognized specialties, so glazing contractors don't need the state residential or general contractor license for that work.",
      licenseSteps: [
        { title: "Apprentice", detail: "Handle, cut and set glass under a journeyman." },
        { title: "Journeyman glazier", detail: "Installs storefronts, windows and curtain wall." },
        { title: "Lead", detail: "Runs a crew on large commercial jobs." },
        { title: "Shop or field specialist", detail: "Fabrication, curtain wall or service work." },
      ],
      licenseAgency: GA_SPECIALTY,
      credentials: ["OSHA 10", "Aerial lift and rigging training"],
      overtime: "Glaziers are usually paid hourly, with overtime as buildings push to get 'dried in' before interior work can start.",
      ownBusiness: "Small glass shops do residential windows, mirrors and storefront repairs. Big curtain wall work belongs to larger contractors.",
      hardParts: [
        "Heavy, fragile glass: cuts are a real risk.",
        "Swing stages, lifts and building edges.",
        "Wind can shut down the work.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: true },
      training: [
        {
          name: "Atlanta Glaziers JAC (IUPAT Local 1940)",
          kind: "union",
          where: "Atlanta",
          detail: "Union glazier apprenticeship through the painters' District Council 77.",
          programSlug: "iupat-glazier-apprenticeship",
        },
        CONSTRUCTION_READY,
      ],
    },
    {
      soc: "47-2131",
      slug: "insulation-installer",
      name: "Insulation installers",
      oneLine: "Seal and insulate walls, attics, pipes and ductwork to keep buildings efficient.",
      outlook: { base: 770, projected: 820, growthPct: 7, openingsPerYear: 70 },
      stateLicense: "none",
      licenseSummary:
        "Georgia has no insulation license. Insulation is a recognized specialty, so insulation contractors don't need the state residential or general contractor license for that work.",
      licenseSteps: [
        { title: "Helper", detail: "Move material and prep spaces." },
        { title: "Installer", detail: "Batts, blown-in or spray foam on your own." },
        { title: "Mechanical insulator (optional)", detail: "Pipes, ducts and equipment in commercial and industrial buildings, usually through an apprenticeship." },
        { title: "Lead or estimator", detail: "Runs crews or prices jobs." },
      ],
      licenseAgency: GA_SPECIALTY,
      credentials: ["Spray foam certifications (optional)", "OSHA 10"],
      payNote:
        "This pay covers floor, ceiling and wall insulation workers. Mechanical insulators (pipes and equipment) are a separate BLS group and often earn more.",
      overtime: "Installers are usually paid hourly or by the job. New-home building booms bring long weeks.",
      ownBusiness: "Residential insulation is a common small business, and spray foam can pay well but takes expensive equipment and training.",
      hardParts: [
        "Georgia attics in summer can be dangerously hot.",
        "Itchy fibers and spray foam chemicals, so protective gear is a must.",
        "Crawlspaces and tight, awkward spaces.",
      ],
      fit: { styles: ["build"], setting: "indoor", heights: false },
      training: [
        {
          name: "Heat & Frost Insulators Local 48",
          kind: "union",
          where: "Atlanta",
          detail: "Union mechanical insulator apprenticeship for commercial and industrial work.",
          url: "https://insulatorsjatc.org/locals/",
        },
        CONSTRUCTION_READY,
      ],
    },
    {
      soc: "47-2221",
      slug: "ironworker",
      name: "Ironworkers",
      oneLine: "Raise the steel skeleton of stadiums, bridges and high-rises, and place the rebar inside concrete.",
      outlook: { base: 530, projected: 570, growthPct: 8, openingsPerYear: 50 },
      stateLicense: "none",
      licenseSummary:
        "Georgia has no ironworker license. Structural steel and reinforcing steel are recognized specialties. Crane work requires OSHA-qualified riggers and signal persons.",
      licenseSteps: [
        { title: "Apprentice", detail: "Four years of paid work plus classes." },
        { title: "Journeyman ironworker", detail: "Structural, reinforcing or ornamental work." },
        { title: "Certified welder or rigger", detail: "Welding and rigging certifications raise your value." },
        { title: "Foreman or connector", detail: "Leads raising gangs or runs a crew." },
      ],
      licenseAgency: GA_SPECIALTY,
      credentials: ["AWS structural welding certification", "Rigger and signal person qualifications", "OSHA 10 or 30"],
      overtime: "Ironworkers are usually paid hourly, with overtime common as a steel frame races to top out. Wind and storms stop work.",
      ownBusiness: "Steel erection and rebar companies need cranes, crews and big insurance policies, so most ironworkers who go out on their own start in miscellaneous metals or small welding work.",
      hardParts: [
        "Working high on open steel. Fall protection is always on.",
        "Heavy, physical work in heat, cold and wind.",
        "The union jurisdiction covers a large area, so job sites can be 75 miles or more from home.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: true },
      training: [
        {
          name: "Ironworkers Local 387 Apprenticeship",
          kind: "union",
          where: "Training center in Atlanta, covering much of Georgia",
          detail: "Four-year apprenticeship. Apprentices spend one full week a quarter in class at the training center.",
          url: "https://ironworkerslocal387.com/apprenticeship/",
          programSlug: "ironworkers-apprenticeship",
        },
        {
          name: "Technical College System of Georgia (TCSG)",
          kind: "college",
          where: "Welding programs at many colleges",
          detail: "Welding and Joining Technology is a HOPE Career Grant program, and welding is a core ironworker skill.",
          url: "https://www.tcsg.edu/free-tuition/",
        },
      ],
    },
    {
      soc: "47-2021",
      slug: "mason",
      name: "Masons",
      oneLine: "Lay brick, block and stone for walls, chimneys, schools and storefronts.",
      outlook: { base: 210, projected: 230, growthPct: 12, openingsPerYear: 20 },
      stateLicense: "none",
      licenseSummary:
        "Georgia has no mason license. Masonry is a recognized specialty, so masonry contractors don't need the state residential or general contractor license for masonry work.",
      licenseSteps: [
        { title: "Mason tender", detail: "Mix mortar, stock materials and build scaffolds." },
        { title: "Apprentice mason", detail: "Lay brick and block under a journeyman." },
        { title: "Journeyman mason", detail: "Lays brick, block or stone on your own." },
        { title: "Foreman or contractor", detail: "Runs crews, or starts a masonry company." },
      ],
      licenseAgency: GA_SPECIALTY,
      credentials: ["OSHA 10", "NCCER Masonry (optional)"],
      payNote: "BLS publishes Georgia pay for brick and block masons but holds back its job count as unreliable. The job numbers below come from the state projection.",
      overtime: "Masons are usually paid hourly, with long days in good weather. Rain and freezing temperatures stop the work.",
      ownBusiness: "Masonry is a classic trade business, from small residential crews doing steps and chimneys to commercial contractors. It takes crews, scaffolding and steady work.",
      hardParts: [
        "Heavy, repetitive lifting: block and brick add up over a career.",
        "Outdoor work on scaffolds in all seasons.",
        "Cutting brick and block makes silica dust.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: true },
      training: [
        {
          name: "Bricklayers union (BAC Local 8 Southeast)",
          kind: "union",
          where: "Covers Georgia, with training in Atlanta",
          detail: "Union bricklayer apprenticeship covering brick, block and stone.",
          programSlug: "bac-bricklayer-apprenticeship",
        },
        {
          name: "Technical College System of Georgia (TCSG)",
          kind: "college",
          where: "Masonry at select colleges",
          detail: "Masonry is part of the HOPE Career Grant's Construction Technology area.",
          url: "https://www.tcsg.edu/free-tuition/",
        },
      ],
    },
    {
      soc: "49-9044",
      slug: "millwright",
      name: "Millwrights",
      oneLine: "Install, align and repair the big machines in factories, power plants and distribution centers.",
      outlook: { base: 2180, projected: 2230, growthPct: 2, openingsPerYear: 200 },
      stateLicense: "none",
      licenseSummary: "Georgia has no millwright license. Skill is proven through apprenticeship and employer testing.",
      licenseSteps: [
        { title: "Apprentice", detail: "Four-year union programs, or in-house training at a plant." },
        { title: "Journeyman millwright", detail: "Rigs, sets and precisely aligns machinery." },
        { title: "Specialist", detail: "Laser alignment, vibration analysis or turbines." },
        { title: "Lead or maintenance supervisor", detail: "Runs a crew or a plant's maintenance team." },
      ],
      credentials: ["Rigger and signal person qualifications", "Welding certifications", "OSHA 10"],
      payNote: "This pay includes plant maintenance millwrights, not just construction, because BLS reports one millwright category across all industries.",
      overtime: "Millwrights are usually paid hourly. Plant shutdowns and new factory installs bring heavy overtime.",
      ownBusiness: "Some millwrights start machinery moving and installation companies. It takes rigging equipment, insurance and relationships with plants.",
      hardParts: [
        "Heavy machinery and rigging, where mistakes are dangerous.",
        "Shutdown work means nights, weekends and long stretches.",
        "Precision work under time pressure, while a plant waits to restart.",
      ],
      fit: { styles: ["fix", "machines"], setting: "indoor", heights: false },
      training: [
        {
          name: "Carpenters union (UBC) training centers",
          kind: "union",
          where: "Atlanta, Kennesaw, Augusta, Savannah and Moultrie",
          detail: "Union millwright apprenticeship through the Southeastern Carpenters Regional Council, about four years.",
          programSlug: "ubc-millwright-apprenticeship",
        },
        {
          name: "Technical College System of Georgia (TCSG)",
          kind: "college",
          where: "Industrial maintenance programs at many colleges",
          detail: "Industrial Maintenance is one of the HOPE Career Grant program areas, so tuition can be fully covered for eligible residents.",
          url: "https://www.tcsg.edu/free-tuition/",
        },
      ],
    },
    {
      soc: "47-2152",
      slug: "pipefitter",
      name: "Pipefitters & steamfitters",
      oneLine: "Build the high-pressure piping that moves steam, gas and chemicals through plants, hospitals and big buildings.",
      stateLicense: "none",
      licenseSummary:
        "Georgia doesn't license pipefitters as their own trade. Industrial and process piping needs no state trade license, while piping that counts as plumbing or HVAC work falls under those state licenses.",
      licenseSteps: [
        { title: "Apprentice", detail: "Five-year union programs mix classroom and field work." },
        { title: "Journeyworker", detail: "Lays out, cuts, threads and welds pipe on your own." },
        { title: "Welding certifications", detail: "Pipe welding certs open the best-paying work." },
        { title: "Foreman or specialist", detail: "Lead crews, or move into service, controls or inspection." },
      ],
      credentials: ["AWS or ASME pipe welding certifications", "OSHA 10", "Medical gas certification (optional)"],
      payNote:
        "BLS counts plumbers, pipefitters and steamfitters as one occupation, so this pay matches plumbers' and there is no separate Georgia job count for pipefitters.",
      sharedStatsWith: "plumber",
      overtime: "Pipefitters are usually paid hourly. Plant shutdowns and big industrial projects often run 50 to 60 hour weeks.",
      ownBusiness: "Most pipefitters work for mechanical or industrial contractors. Starting a mechanical contracting business usually means also holding the matching Georgia plumbing or conditioned air license.",
      hardParts: [
        "Heavy pipe, tight spaces and work at heights in plants and mechanical rooms.",
        "Hot work: welding, cutting and steam lines.",
        "The best-paying shutdown work can mean travel and long weeks.",
      ],
      fit: { styles: ["build", "fix"], setting: "indoor", heights: true },
      training: [
        {
          name: "Mechanical Trades Institute (UA Local 72)",
          kind: "union",
          where: "Atlanta",
          detail: "Five-year union plumbing and pipefitting apprenticeship, with welding training on site.",
          url: "https://www.mti-jatt.org/",
          programSlug: "ua-plumber-pipefitter-apprenticeship",
        },
        {
          name: "Technical College System of Georgia (TCSG)",
          kind: "college",
          where: "Welding programs at many colleges",
          detail: "Welding and Joining Technology is a HOPE Career Grant program, and pipe welding is a core pipefitter skill.",
          url: "https://www.tcsg.edu/free-tuition/",
        },
      ],
    },
    {
      soc: "47-2161",
      slug: "plasterer-stucco-mason",
      name: "Plasterers & stucco masons",
      oneLine: "Apply plaster, stucco and EIFS finishes to walls and building exteriors.",
      stateLicense: "none",
      licenseSummary:
        "Georgia has no plaster or stucco license. EIFS and stucco is a recognized specialty, so contractors don't need the state residential or general contractor license for that work.",
      licenseSteps: [
        { title: "Helper", detail: "Mix material, build scaffolds and prep walls." },
        { title: "Plasterer", detail: "Applies base and finish coats on your own." },
        { title: "Lead", detail: "Decorative, historic or EIFS specialty work." },
        { title: "Own crew (optional)", detail: "Small stucco and repair businesses are common." },
      ],
      licenseAgency: GA_SPECIALTY,
      credentials: ["Manufacturer EIFS installer certifications", "OSHA 10"],
      payNote:
        "BLS doesn't publish Georgia figures for this small trade, so pay is the national figure and there is no Georgia job projection.",
      overtime: "Plasterers are usually paid hourly, with long days in dry weather, since rain and cold affect how stucco cures.",
      ownBusiness: "Stucco and plaster repair is a common small business. Moisture problems behind stucco can lead to claims, so careful work and insurance matter.",
      hardParts: [
        "Scaffold work on building exteriors.",
        "Heavy, wet material that's hard on shoulders.",
        "A small trade in Georgia, so there are fewer employers to choose from.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: true },
      training: [
        CONSTRUCTION_READY,
        {
          name: "Learn on the job",
          kind: "open-shop",
          where: "Stucco and plastering contractors",
          detail: "Most plasterers learn as a helper on a crew, then add manufacturer certifications.",
        },
      ],
    },
    {
      soc: "47-2181",
      slug: "roofer",
      name: "Roofers",
      oneLine: "Install and repair shingle, metal and flat commercial roofs.",
      outlook: { base: 2330, projected: 2600, growthPct: 12, openingsPerYear: 200 },
      stateLicense: "none",
      licenseSummary:
        "Georgia has no state roofer license. Roofing is a recognized specialty, so roofing contractors don't need the state residential or general contractor license for roofing work. Cities and counties may still require permits and business licenses.",
      licenseSteps: [
        { title: "Helper", detail: "Carry materials, tear off old roofs and clean up." },
        { title: "Roofer", detail: "Installs shingle, metal or membrane systems." },
        { title: "Crew lead", detail: "Runs a roof and the crew on it." },
        { title: "Specialist (optional)", detail: "Commercial membranes, metal roofing or waterproofing." },
      ],
      licenseAgency: GA_SPECIALTY,
      credentials: ["OSHA 10 with fall protection training", "Manufacturer installer certifications"],
      overtime: "Roofers are usually paid hourly or by the job. Storm seasons bring long weeks, and rain stops work entirely.",
      ownBusiness: "Many roofers start their own crews. Roofing-only businesses don't need Georgia's contractor license, but storm-chasing scams have made insurance and a good reputation essential.",
      hardParts: [
        "Working at heights every day, so fall protection is non-negotiable.",
        "Hot roofs in Georgia summers.",
        "Weather decides your schedule and your paycheck.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: true },
      training: [
        {
          name: "Roofers & Waterproofers Local 136 (Atlanta Roofers JAC)",
          kind: "union",
          where: "Atlanta area",
          detail: "Union roofer and waterproofer apprenticeship registered with the U.S. Department of Labor.",
          url: "https://unionroofers.com/join-us/apprenticeship/",
          programSlug: "roofers-union-apprenticeship",
        },
        CONSTRUCTION_READY,
      ],
    },
    {
      soc: "47-2211",
      slug: "sheet-metal-worker",
      name: "Sheet metal workers",
      oneLine: "Fabricate and install ductwork, metal roofing and architectural panels.",
      outlook: { base: 3960, projected: 4160, growthPct: 5, openingsPerYear: 340 },
      stateLicense: "none",
      licenseSummary:
        "Georgia has no license for sheet metal workers. HVAC duct work done as a contractor falls under the conditioned air license.",
      licenseSteps: [
        { title: "Apprentice", detail: "Shop fabrication and field installation." },
        { title: "Journeyworker", detail: "Lays out, fabricates and installs on your own." },
        { title: "Foreman", detail: "Leads field crews." },
        { title: "Specialist (optional)", detail: "Testing and balancing, architectural metals or service." },
      ],
      credentials: ["OSHA 10", "ICB testing and balancing certifications (optional, union)"],
      overtime: "Sheet metal workers are usually paid hourly, with overtime common as big commercial projects push to finish.",
      ownBusiness: "Some sheet metal workers open fabrication or duct shops. Contracting HVAC duct work falls under Georgia's conditioned air contractor license.",
      hardParts: [
        "Sharp edges and heavy duct sections, so cuts are a common injury.",
        "Much of the install work is overhead, on lifts and ladders.",
        "Fabrication shops can be loud.",
      ],
      fit: { styles: ["build"], setting: "indoor", heights: true },
      training: [
        {
          name: "Georgia Sheet Metal JATC (SMART Local 85)",
          kind: "union",
          where: "Atlanta",
          detail: "Earn-while-you-learn union apprenticeship. Classroom training is run in-house.",
          url: "https://www.smart-union.org/smartcareers/sheet-metal-opportunities-in-local-85-georgia/",
          programSlug: "smart-sheet-metal-apprenticeship",
        },
        HOPE_CAREER,
      ],
    },
    {
      soc: "47-2231",
      slug: "solar-installer",
      name: "Solar installers",
      oneLine: "Mount and wire solar panels on roofs and large ground-mounted solar farms.",
      stateLicense: "none",
      licenseSummary:
        "Georgia has no solar installer license. Connecting panels to a building's electrical system is electrical work, which in Georgia falls under the state electrical contractor license.",
      licenseSteps: [
        { title: "Installer", detail: "Mount racking and panels as part of a crew." },
        { title: "NABCEP PV Associate", detail: "Entry-level national credential, often after a short course." },
        { title: "Lead installer", detail: "Runs installs and checks wiring and layout." },
        { title: "Electrician or PV professional (optional)", detail: "An electrical license or NABCEP PV Installation Professional opens higher-paying roles." },
      ],
      licenseAgency: GA_SOS_ELECTRICAL,
      credentials: ["NABCEP PV Associate", "OSHA 10 with fall protection"],
      payNote:
        "BLS publishes Georgia pay for solar installers but not a job count, and Georgia has no projection for this small, fast-changing trade.",
      overtime: "Installers are usually paid hourly. Utility-scale solar farm projects often run long weeks, sometimes far from home.",
      ownBusiness: "Residential solar companies need a licensed electrical contractor for the wiring, plus sales and permitting know-how. Many installers move into electrical work instead.",
      hardParts: [
        "Rooftop work at heights, in full sun.",
        "Utility-scale jobs can be in rural areas, far from home.",
        "Demand swings with tax credits and energy policy.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: true },
      training: [
        {
          name: "Technical College System of Georgia (TCSG)",
          kind: "college",
          where: "Several colleges, including Athens, Augusta, Savannah and West Georgia",
          detail: "Short Photovoltaic Systems Installation and Repair Technician certificates.",
          url: "https://www.tcsg.edu/",
          programSlug: "nabcep-pv-associate-certification",
        },
        {
          name: "Atlanta Electrical JATC (IBEW Local 613)",
          kind: "union",
          where: "Norcross",
          detail: "Union electricians wire commercial and utility-scale solar.",
          url: "https://sites.google.com/aejatc.org/etc",
          programSlug: "ibew-neca-electrical-apprenticeship",
        },
      ],
    },
    {
      soc: "47-2152",
      slug: "sprinkler-fitter",
      name: "Sprinkler fitters",
      oneLine: "Install and test the fire sprinkler systems that every new commercial building needs.",
      stateLicense: "contractor",
      licenseSummary:
        "Georgia's Safety Fire Commissioner licenses fire sprinkler contractors, and each company needs a Certificate of Competency holder, which takes NICET Level III or IV certification in sprinkler layout. Individual fitters start by working for a licensed sprinkler contractor.",
      licenseSteps: [
        { title: "Apprentice fitter", detail: "Work for a licensed sprinkler contractor. Union apprenticeships run five years." },
        { title: "Journey fitter", detail: "Installs and tests systems on your own." },
        { title: "NICET certification", detail: "Optional national certifications in inspection or layout." },
        { title: "Certificate of Competency", detail: "NICET Level III or IV in sprinkler layout. Every licensed contractor must employ one holder." },
      ],
      licenseAgency: {
        label: "Georgia Office of Insurance and Safety Fire Commissioner (fire sprinkler rules, 120-3-19)",
        url: "https://rules.sos.ga.gov/GAC/120-3-19",
      },
      credentials: ["NICET fire protection certifications", "Backflow tester certification (optional)", "OSHA 10"],
      payNote:
        "BLS counts sprinkler fitters with plumbers and pipefitters, so this pay matches plumbers' and there is no separate Georgia job count for sprinkler fitters.",
      sharedStatsWith: "plumber",
      overtime: "Fitters are usually paid hourly, with overtime as buildings race to pass their fire inspection before opening.",
      ownBusiness: "Opening a sprinkler company in Georgia takes a state fire sprinkler contractor license, insurance and a Certificate of Competency holder on staff.",
      hardParts: [
        "Most of the work is overhead, on lifts and ladders.",
        "Heavy pipe and fittings, all day.",
        "Union fitters in Georgia may travel to wherever the work is.",
      ],
      fit: { styles: ["build"], setting: "indoor", heights: true },
      training: [
        {
          name: "UA Sprinkler Fitters Local 669",
          kind: "union",
          where: "A national local that covers Georgia",
          detail: "Five-year registered apprenticeship. You're hired by a signatory contractor near you and take related classes alongside work.",
          url: "https://www.training669.org/",
        },
        CONSTRUCTION_READY,
      ],
    },
    {
      soc: "47-2044",
      slug: "tile-setter",
      name: "Tile setters",
      oneLine: "Set tile and stone in showers, kitchens, lobbies and floors.",
      outlook: { base: 230, projected: 260, growthPct: 12, openingsPerYear: 20 },
      stateLicense: "none",
      licenseSummary:
        "Georgia has no tile setter license. Ceramic and hard tile is a recognized specialty, so tile contractors don't need the state residential or general contractor license for tile work.",
      licenseSteps: [
        { title: "Helper", detail: "Mix thinset and grout, cut tile and clean up." },
        { title: "Tile setter", detail: "Sets floors, walls and showers on your own." },
        { title: "Certified tile installer", detail: "The CTEF certification is a common mark of skill." },
        { title: "Own business (optional)", detail: "Many tile setters run small remodeling crews." },
      ],
      licenseAgency: GA_SPECIALTY,
      credentials: ["Certified Tile Installer, CTI (CTEF, optional)", "OSHA 10"],
      overtime: "Tile setters are paid hourly or by the job, with overtime common on commercial projects near opening day.",
      ownBusiness: "Tile work is a popular one-person or small-crew business, especially in bathroom and kitchen remodels. Reputation and photos of past work bring in jobs.",
      hardParts: [
        "Long hours on your knees.",
        "Cutting tile and stone makes silica dust, so wet cutting and masks matter.",
        "Heavy boxes of tile and bags of mortar.",
      ],
      fit: { styles: ["build"], setting: "indoor", heights: false },
      training: [
        {
          name: "Bricklayers union (BAC Local 8 Southeast)",
          kind: "union",
          where: "Covers Georgia, with training in Atlanta",
          detail: "Union apprenticeships for tile setters, bricklayers and other trowel trades.",
          programSlug: "bac-bricklayer-apprenticeship",
        },
        CONSTRUCTION_READY,
      ],
    },
    {
      soc: "47-2181",
      slug: "waterproofing-installer",
      name: "Waterproofing installers",
      oneLine: "Seal foundations, plazas and parking decks against water before they get buried or built over.",
      stateLicense: "none",
      licenseSummary:
        "Georgia has no waterproofing license. Damp proofing and waterproofing is a recognized specialty, so waterproofing contractors don't need the state residential or general contractor license for that work.",
      licenseSteps: [
        { title: "Helper", detail: "Prep surfaces and move material." },
        { title: "Installer", detail: "Applies membranes, coatings and drainage systems." },
        { title: "Lead", detail: "Runs a crew and checks details before they're covered up." },
        { title: "Specialist (optional)", detail: "Below-grade, plaza deck or air barrier systems." },
      ],
      licenseAgency: GA_SPECIALTY,
      credentials: ["Manufacturer installer certifications", "OSHA 10"],
      payNote:
        "BLS has no separate waterproofing category, so this shows roofers' pay, the closest group, and there is no separate Georgia job count.",
      sharedStatsWith: "roofer",
      overtime: "Installers are usually paid hourly, with overtime when the rest of the project is waiting on them to finish before backfill or the next pour.",
      ownBusiness: "Waterproofing contractors take on real liability, because a leak found years later can be costly. Most start by working for an established specialty contractor.",
      hardParts: [
        "Trenches, below-grade walls and confined spaces.",
        "Hot asphalt, solvents and adhesives.",
        "Mistakes get buried, so the work has to be right the first time.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: false },
      training: [
        {
          name: "Roofers & Waterproofers Local 136 (Atlanta Roofers JAC)",
          kind: "union",
          where: "Atlanta area",
          detail: "The roofers union apprenticeship covers waterproofing as part of the trade.",
          url: "https://unionroofers.com/join-us/apprenticeship/",
          programSlug: "roofers-union-apprenticeship",
        },
        CONSTRUCTION_READY,
      ],
    },
  ],
  highSchool: [
    {
      title: "Construction pathways in high school",
      detail:
        "Georgia's CTAE program offers construction pathways such as carpentry, electrical, masonry and plumbing, plus welding, sheet metal and HVACR. In March 2026 the state reorganized its 150-plus pathways into 14 career clusters, with Construction as its own cluster.",
      source: {
        label: "Georgia Department of Education, Georgia's Career Pipeline",
        url: "https://gacareerpipeline.gadoe.org/",
      },
    },
    {
      title: "Carpentry can count as Geometry",
      detail:
        "Starting with the 2025-26 school year, students who complete and pass every course in the Carpentry pathway fulfill the Geometry graduation requirement.",
      source: { label: "Georgia Department of Education, Construction for Geometry (July 2025)", url: "https://valdostatoday.com/?p=148331" },
    },
    {
      title: "Trade courses can count as math credit",
      detail:
        "Through CTAE+, completing the Electrical, HVACR, HVACR Electrical, Sheet Metal or Welding pathway can satisfy the fourth math requirement for graduation.",
      source: { label: "Georgia Department of Education, CTAE+ expansion", url: "https://valdostatoday.com/?p=144068" },
    },
    {
      title: "Free college courses through Dual Enrollment",
      detail:
        "Georgia pays tuition, mandatory fees and books for eligible high school students taking approved college courses, up to 30 semester hours. Students apply through GAfutures, and starting summer 2026 they must meet U.S. citizenship and Georgia residency rules.",
      source: {
        label: "GAfutures, Dual Enrollment funding",
        url: "https://www.gafutures.org/hope-state-aid-programs/scholarships-grants/dual-enrollment/funding-and-award-amounts/",
      },
    },
    {
      title: "Trade students can save their Dual Enrollment hours",
      detail:
        "Public high school students in CTAE courses within an eligible HOPE Career Grant program at a technical college can use HOPE Grant and Career Grant money before reaching the 30-hour cap.",
      source: {
        label: "GAfutures, Dual Enrollment funding",
        url: "https://www.gafutures.org/hope-state-aid-programs/scholarships-grants/dual-enrollment/funding-and-award-amounts/",
      },
    },
    {
      title: "Industry-backed school programs and competitions",
      detail:
        "Construction Ready (formerly the Construction Education Foundation of Georgia) supports 233 high school construction programs, 81 of them industry-certified, and hosts the annual CareerEXPO with the SkillsUSA state championships in Atlanta.",
      source: {
        label: "Construction Ready, 2024 annual report",
        url: "https://constructionready.org/wp-content/uploads/CR-2024-Annual-Report.pdf",
      },
    },
  ],
  adults: [
    {
      title: "HOPE Grant + HOPE Career Grant",
      detail:
        "Together they cover all tuition in 18 high-demand program areas at Georgia's technical colleges, including construction and welding. No minimum high school GPA is required, and you don't have to enroll full-time. Students still pay fees and equipment costs.",
      source: { label: "Technical College System of Georgia, free tuition", url: "https://www.tcsg.edu/free-tuition/" },
    },
    {
      title: "Free boot camp with job placement",
      detail:
        "Construction Ready's four-week program is free to eligible Georgia residents and ends with credentials and introductions to hiring contractors.",
      source: { label: "Construction Ready", url: "https://constructionready.org/" },
    },
    {
      title: "Registered apprenticeships",
      detail:
        "Georgia apprenticeships are registered with the U.S. Department of Labor. Apprentice Georgia, part of TCSG, is the state's apprenticeship office, and all 22 technical colleges sponsor registered programs.",
      source: { label: "Apprentice Georgia (TCSG)", url: "https://www.tcsg.edu/apprentice/" },
    },
    {
      title: "WorkSource Georgia",
      detail:
        "The state's federally funded job training system, run through TCSG and local WorkSource offices, can help pay for approved training for eligible adults, such as people who are unemployed, laid off or low-income.",
      source: { label: "WorkSource Georgia, resources for job seekers (TCSG)", url: "https://www.tcsg.edu/worksource-georgia/resources-for-job-seekers/" },
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Georgia statewide, May 2025", url: "https://www.bls.gov/oes/" },
    {
      label: "Plasterers and stucco masons, national wages, May 2025 (BLS via O*NET; no Georgia estimate published)",
      url: "https://www.onetonline.org/link/localwages/47-2161.00?st=GA",
    },
    {
      label: "Georgia long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
      url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=GA",
    },
    {
      label: "Ga. Comp. R. & Regs. 121-3-.01, statewide electrical contractor license",
      url: "https://www.law.cornell.edu/regulations/georgia/Ga-Comp-R-Regs-R-121-3-.01",
    },
    {
      label: "Ga. Comp. R. & Regs. 121-3-.02, master and journeyman plumber license (eff. Mar. 19, 2025)",
      url: "https://www.law.cornell.edu/regulations/georgia/Ga-Comp-R-Regs-R-121-3-.02",
    },
    {
      label: "Ga. Comp. R. & Regs. 121-3-.04, conditioned air contractor license (eff. Mar. 19, 2025)",
      url: "https://www.law.cornell.edu/regulations/georgia/Ga-Comp-R-Regs-R-121-3-.04",
    },
    { label: "Georgia State Licensing Board for Residential and General Contractors (license required over $2,500, O.C.G.A. 43-41)", url: GA_SOS_GC.url },
    GA_SPECIALTY,
    { label: "O.C.G.A. 43-41-17(f), specialty contractor exemption", url: "https://law.justia.com/codes/georgia/2022/title-43/chapter-41/section-43-41-17/" },
    {
      label: "Ga. Comp. R. & Regs. 120-3-25-.22, elevator mechanic and contractor certification",
      url: "https://www.law.cornell.edu/regulations/georgia/Ga-Comp-R-Regs-R-120-3-25-.22",
    },
    {
      label: "Ga. Comp. R. & Regs. 120-3-19-.05, fire sprinkler Certificate of Competency (NICET Level III or IV)",
      url: "https://www.law.cornell.edu/regulations/georgia/Ga-Comp-R-Regs-R-120-3-19-.05",
    },
    { label: "Technical College System of Georgia, HOPE Career Grant programs", url: "https://www.tcsg.edu/free-tuition/" },
    {
      label: "Georgia Student Finance Commission, Dual Enrollment regulations 2026-27",
      url: "https://gsfc.georgia.gov/document/document/2027-dual-enrollment/download",
    },
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};

// PUBLISHED guides: everything on the live site (index, sitemap, nav, quizzes,
// Action Plan, ROI page, counselor hub) reads STATE_GUIDES, so only these show.
export const STATE_GUIDES: StateGuide[] = [GEORGIA];

// HIDDEN guides: fully researched, not launched. They don't exist on the live
// site (404). Set SHOW_HIDDEN_STATES=1 (local dev or a Vercel preview) to
// render /states/<slug> for review; they stay out of every list and the
// sitemap and are marked noindex. To launch one, move it into STATE_GUIDES.
export const HIDDEN_STATE_GUIDES: StateGuide[] = [FLORIDA, ALABAMA, SOUTH_CAROLINA, NORTH_CAROLINA, TENNESSEE, MISSISSIPPI, LOUISIANA, ARKANSAS, KENTUCKY, VIRGINIA, WEST_VIRGINIA];

export const SHOW_HIDDEN_STATES = process.env.SHOW_HIDDEN_STATES === "1";

// Every guide /states/[slug] may render in this build.
export const RENDERABLE_STATE_GUIDES: StateGuide[] = SHOW_HIDDEN_STATES ? [...STATE_GUIDES, ...HIDDEN_STATE_GUIDES] : STATE_GUIDES;

export function getStateGuide(slug: string): StateGuide | undefined {
  return RENDERABLE_STATE_GUIDES.find((g) => g.slug === slug);
}

export function isPublishedStateGuide(slug: string): boolean {
  return STATE_GUIDES.some((g) => g.slug === slug);
}
