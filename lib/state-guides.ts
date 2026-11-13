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
  outlook: { base: number; projected: number; growthPct: number; openingsPerYear: number };
  stateLicense: "contractor" | "journeyman-and-master" | "none";
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
  slug: string;
  code: string;
  name: string;
  lastVerified: string; // ISO date
  outlookPeriod: string;
  outlookSource: SourceRef;
  intro: string;
  quickTakeaways: string[];
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
  url: "https://sos.ga.gov/state-licensing-board-residential-and-general-contractors",
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
    "A field guide to eight of Georgia's biggest construction trades: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTAE teachers, parents and students.",
  quickTakeaways: [
    "These eight trades employ about 88,000 people in Georgia, and the state projects about 9,100 openings a year across them through 2034.",
    "Only three of the eight (electrical, plumbing and HVAC) have a state trade license, and you qualify for it through paid work experience, not a degree.",
    "High school juniors and seniors can take technical college courses for free through Dual Enrollment, up to 30 semester hours.",
    "For eligible Georgia residents, the HOPE Grant plus the HOPE Career Grant covers all tuition in construction and welding programs at Georgia's technical colleges.",
    "Paid, registered apprenticeships run in Georgia for every trade on this page except concrete finishing, where most people learn on the job. Apprentices earn a paycheck from day one.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  licensingOverview:
    "Georgia licenses specialty contractors through the Construction Industry Licensing Board (electrical, plumbing and conditioned air are separate divisions) and licenses general and residential contractors through a separate board. Most of these licenses are for people who contract the work themselves. Workers usually start under a licensed company and earn their own license later.",
  overtimeNote:
    "Most of these jobs pay by the hour, and federal law requires time-and-a-half for hourly workers past 40 hours in a week. Overtime is common in all eight trades, and the pay figures on this page leave it out, so many workers earn more than shown. How much depends on the employer, the season and the project.",
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
      "In Georgia, the licenses in this guide double as business licenses: master plumber, electrical contractor, conditioned air contractor, and residential or general contractor.",
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
        "Georgia has no state license for equipment operators. Crane operators need a federal OSHA certification, and hauling equipment on public roads often takes a commercial driver's license.",
      licenseSteps: [
        { title: "Laborer or oiler", detail: "Many operators start on the ground crew and learn the machines on site." },
        { title: "Apprentice operator", detail: "Seat time on smaller machines, then larger ones." },
        { title: "Journey operator", detail: "Runs a range of machines without supervision." },
        { title: "Crane specialty (optional)", detail: "Crane work requires OSHA-accepted operator certification." },
      ],
      credentials: [
        "OSHA crane operator certification (required only for crane work)",
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
        "Georgia has no license for carpenters as workers. A residential or general contractor license is required to contract jobs worth more than $2,500.",
      licenseSteps: [
        { title: "Helper or apprentice", detail: "Learn layout, framing and tools on the job." },
        { title: "Journey carpenter", detail: "Works independently on framing, forms or finish work." },
        { title: "Lead or foreman", detail: "Runs a crew." },
        { title: "Contractor (optional)", detail: "State license needed to contract jobs over $2,500." },
      ],
      licenseAgency: GA_SOS_GC,
      credentials: ["OSHA 10", "NCCER Carpentry levels (optional)"],
      overtime: "Carpenters are usually paid hourly, with overtime when a project runs behind schedule. Bad weather can also cut weeks short.",
      ownBusiness: "Many carpenters go on to become remodelers or home builders. Contracting jobs over $2,500 requires a Georgia residential or general contractor license.",
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
      name: "Plumbers & pipefitters",
      oneLine: "Install water, gas, drain and process piping in homes, hospitals and plants.",
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
      soc: "47-2051",
      slug: "concrete-worker",
      name: "Concrete finishers",
      oneLine: "Place, level and finish concrete for slabs, sidewalks, foundations and decks.",
      outlook: { base: 2590, projected: 2760, growthPct: 7, openingsPerYear: 200 },
      stateLicense: "none",
      licenseSummary:
        "Georgia has no license for concrete finishers. Most learn on the job. A contractor license is needed to contract jobs over $2,500.",
      licenseSteps: [
        { title: "Laborer", detail: "Start on a concrete crew moving and placing material." },
        { title: "Finisher", detail: "Screed, float and finish surfaces." },
        { title: "Lead finisher", detail: "Decorative, polished or high-tolerance floors." },
        { title: "Contractor (optional)", detail: "State license needed to contract jobs over $2,500." },
      ],
      licenseAgency: GA_SOS_GC,
      credentials: ["ACI Concrete Flatwork Finisher (optional)", "OSHA 10"],
      overtime: "Finishers are usually paid hourly, with early-morning pours and long days in good weather. Rain can cancel days entirely.",
      ownBusiness: "Small concrete crews that pour driveways, patios and slabs are a common first business. Contracting jobs over $2,500 requires a Georgia contractor license.",
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
    { label: "Technical College System of Georgia, HOPE Career Grant programs", url: "https://www.tcsg.edu/free-tuition/" },
    {
      label: "Georgia Student Finance Commission, Dual Enrollment regulations 2026-27",
      url: "https://gsfc.georgia.gov/document/document/2027-dual-enrollment/download",
    },
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};

export const STATE_GUIDES: StateGuide[] = [GEORGIA];

export function getStateGuide(slug: string): StateGuide | undefined {
  return STATE_GUIDES.find((g) => g.slug === slug);
}
