// Alabama state guide. HIDDEN until launch: listed in HIDDEN_STATE_GUIDES in
// lib/state-guides.ts, so it only renders when SHOW_HIDDEN_STATES=1.
// Same rules as Georgia: every fact carries a source, pay comes from
// lib/state-pay-data.ts, and licensing is described per the agency's rules.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";

const AL_AECB: SourceRef = { label: "Alabama Electrical Contractors Board", url: "https://aecb.alabama.gov/" };
const AL_AECB_RULE: SourceRef = {
  label: "Ala. Admin. Code 303-X-3-.02, electrical contractor license (8,000 hours as a journeyman in charge of jobs)",
  url: "https://admincode.legislature.state.al.us/api/rule/303-X-3-.02",
};
const AL_PGFB: SourceRef = {
  label: "Alabama Plumbers and Gas Fitters Examining Board",
  url: "https://pgfb.alabama.gov/",
};
const AL_PGFB_RULE: SourceRef = {
  label: "Ala. Admin. Code 720-X-4-.01, apprentice, journeyman and master requirements",
  url: "https://admincode.legislature.state.al.us/api/rule/720-X-4-.01",
};
const AL_HACR: SourceRef = {
  label: "Alabama Board of Heating, Air Conditioning and Refrigeration Contractors, how to get licensed",
  url: "https://hacr.alabama.gov/how-to-get-licensed/",
};
const AL_ELEVATOR: SourceRef = {
  label: "Code of Ala. 25-13-8, elevator mechanic license (Department of Workforce)",
  url: "https://law.justia.com/codes/alabama/title-25/chapter-13/section-25-13-8/",
};
const AL_SPRINKLER: SourceRef = {
  label: "Alabama State Fire Marshal, fire protection sprinkler law (Code of Ala. 34-33)",
  url: "https://www.firemarshal.alabama.gov/PDF/FireSprinklerLaw.pdf",
};
const AL_HBLB: SourceRef = {
  label: "Alabama Home Builders Licensure Board (residential work over $10,000)",
  url: "https://hblb.alabama.gov/",
};
const AL_GC: SourceRef = {
  label: "Code of Ala. 34-8-1, general contractor license for commercial work of $50,000 or more",
  url: "https://law.justia.com/codes/alabama/title-34/chapter-8/section-34-8-1/",
};
const AL_DUAL: SourceRef = {
  label: "Alabama Community College System, Dual Enrollment handbook (CTE Dual Enrollment Scholarship)",
  url: "https://www.accs.edu/wp-content/uploads/2020/07/Dual-Enrollment-Best-Practices-Handbook-June-2020.pdf",
};
const AL_AOA: SourceRef = {
  label: "Alabama Act 2019-506, Alabama Office of Apprenticeship and registered youth apprenticeship",
  url: "https://www.revenue.alabama.gov/wp-content/uploads/2022/03/Act2019-506.pdf",
};
const GO_BUILD: SourceRef = {
  label: "Go Build Alabama training page launch (WSFA, April 2025)",
  url: "https://www.fox10tv.com/2025/04/29/go-build-alabama-launches-training-page-meet-skilled-trade-demands/?outputType=amp",
};

const ACCS: TrainingOption = {
  name: "Alabama Community College System (ACCS)",
  kind: "college",
  where: "Community and technical colleges statewide",
  detail:
    "Certificates and short workforce courses in the building trades and welding. Programs differ by campus. High school students can use the CTE Dual Enrollment Scholarship when funding allows.",
  url: "https://www.accs.edu/community-college/find-college/",
};
const GO_BUILD_TRAINING: TrainingOption = {
  name: "Go Build Alabama training finder",
  kind: "free-training",
  where: "Statewide",
  detail:
    "The construction industry's statewide recruiting campaign keeps one page of training options: community colleges, career tech centers, apprenticeships and grant-funded craft training.",
  url: "https://gobuildalabama.com/",
};
const CICT: TrainingOption = {
  name: "Alabama Construction Industry Craft Training (CICT) programs",
  kind: "free-training",
  where: "Training sites listed through Go Build Alabama",
  detail: "Grant-funded craft training offered at a discounted rate for people starting in construction.",
  url: "https://gobuildalabama.com/",
};
const HOMEBUILDING_ACADEMIES: TrainingOption = {
  name: "North and South Alabama Homebuilding Academies",
  kind: "free-training",
  where: "North Alabama, and Mobile (South Alabama)",
  detail:
    "Short, hands-on training in residential trades. The South Alabama academy began tuition-free classes with Goodwill Gulf Coast in January 2026 for people 17 and older.",
  url: "https://www.constructionowners.com/ca/news/tuition-free-construction-training-launches-in-mobile",
};
const UA_AL: TrainingOption = {
  name: "UA plumbing and pipefitting apprenticeships",
  kind: "union",
  where: "Local 91 (Birmingham), Local 52 (Montgomery) and Local 760 (Muscle Shoals)",
  detail: "Paid union apprenticeships in plumbing, pipefitting and HVAC, with classroom training at each local's center.",
  programSlug: "ua-plumber-pipefitter-apprenticeship",
};

export const ALABAMA: StateGuide = {
  // Alabama ZIP codes run 350xx-369xx.
  locationHints: {
    zip3: [[350, 369]],
    cities: ["Birmingham", "Montgomery", "Mobile", "Huntsville", "Tuscaloosa", "Dothan", "Auburn"],
  },
  slug: "alabama",
  code: "AL",
  name: "Alabama",
  lastVerified: "2026-11-14",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Alabama long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=AL",
  },
  intro:
    "A field guide to 25 construction trades in Alabama: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, career tech teachers, parents and students.",
  quickTakeaways: [
    "These trades employ about 98,000 people in Alabama, and the state projects about 8,900 openings a year across them through 2034.",
    "Alabama licenses more trade workers than many states: electricians earn a state journeyman license, and plumbers register with the state from their first day as an apprentice.",
    "High school students can take career tech courses at Alabama's community colleges through dual enrollment, and a state scholarship can cover tuition, fees and books when funding allows.",
    "Alabama runs its own apprenticeship office, including registered youth apprenticeships for students ages 16 to 18.",
    "Go Build Alabama, funded by the construction industry, points to training statewide, and some programs, like the South Alabama Homebuilding Academy, are tuition-free.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "Youth apprenticeships", value: "Ages 16-18", note: "Registered with the state, paid work during high school" },
  licensingOverview:
    "Alabama has a separate board for each licensed trade. The Electrical Contractors Board licenses journeyman electricians and electrical contractors. The Plumbers and Gas Fitters Examining Board certifies apprentices, journeymen and masters. The Board of Heating, Air Conditioning and Refrigeration Contractors certifies HVAC contractors. Elevator mechanics are licensed by the Department of Workforce, and fire sprinkler contractors need a State Fire Marshal permit. Builders need a Home Builders Licensure Board license for residential jobs over $10,000, and a general contractor license for commercial jobs of $50,000 or more.",
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
      "In Alabama, small jobs often need no contractor license: the home builders license starts at residential jobs over $10,000, and the general contractor license at commercial jobs of $50,000. Electrical, plumbing and HVAC work need their trade license at any size.",
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
      AL_HBLB,
      AL_GC,
    ],
  },
  trades: [
    {
      soc: "47-2061",
      slug: "laborer",
      name: "Construction laborers",
      oneLine: "The crew that keeps a site moving: digging, hauling, setting up, cleaning up and helping every other trade.",
      outlook: { base: 23920, projected: 25970, growthPct: 9, openingsPerYear: 2170 },
      stateLicense: "none",
      licenseSummary:
        "Alabama has no license for construction laborers. It is the biggest trade on this page and the most common way into construction: many people start here and move into a skilled trade.",
      licenseSteps: [
        { title: "Laborer", detail: "Start on a crew. Many employers want OSHA 10 safety training first." },
        { title: "Skilled laborer", detail: "Run small equipment, set forms, handle traffic control or pipe work." },
        { title: "Lead laborer or foreman", detail: "Run a crew on site." },
        { title: "Move into a trade (optional)", detail: "Many laborers switch into an apprenticeship once they know which trade they like." },
      ],
      credentials: ["OSHA 10", "Flagger or traffic control certification (common on road jobs)", "NCCER Core (optional)"],
      overtime: "Laborers are usually paid hourly, with overtime common when a project is behind or a concrete pour runs long. Rain days can cut a week short.",
      ownBusiness:
        "Some laborers grow into small cleanup or site-prep businesses. Residential jobs over $10,000 need a home builders license, and commercial jobs of $50,000 or more need a general contractor license.",
      hardParts: [
        "The most physical job on site: lifting, digging and on your feet all day.",
        "Outdoor work through Alabama heat, with early starts.",
        "Starting pay is lower than most trades, so moving up matters.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: false },
      training: [GO_BUILD_TRAINING, CICT, HOMEBUILDING_ACADEMIES],
    },
    {
      soc: "47-2111",
      slug: "electrician",
      name: "Electricians",
      oneLine: "Install and repair wiring, panels and power systems in homes, offices, plants and data centers.",
      outlook: { base: 10930, projected: 11680, growthPct: 7, openingsPerYear: 1040 },
      stateLicense: "worker-certification",
      licenseSummary:
        "Alabama licenses journeyman electricians statewide through the Alabama Electrical Contractors Board. It takes 8,000 hours of experience and a state exam. Electrical contractors need another 8,000 hours as a journeyman in charge of jobs.",
      licenseSteps: [
        { title: "Apprentice or helper", detail: "Work under licensed electricians. No state license needed to start." },
        {
          title: "8,000 hours of experience",
          detail: "About 4 years of full-time work. Approved electrical schooling or apprenticeship classes can count for up to 2,000 of those hours.",
        },
        { title: "Journeyman electrician license", detail: "Pass the state journeyman exam and apply to the board." },
        { title: "Electrical contractor (optional)", detail: "8,000 hours as a journeyman in charge of jobs, plus the contractor and business and law exams." },
      ],
      licenseAgency: AL_AECB,
      credentials: ["Alabama journeyman electrician license", "OSHA 10", "NCCER Electrical levels (optional)"],
      overtime: "Most electricians are paid by the hour, so hours past 40 a week earn time-and-a-half. Plant builds and shutdowns often run long weeks.",
      ownBusiness:
        "To contract electrical work in Alabama you need the state electrical contractor license, which takes 8,000 hours as a journeyman in charge of jobs. Small residential and service shops are a common first business.",
      hardParts: [
        "Live electrical work carries shock and arc-flash risk, so safety rules are strict and non-negotiable.",
        "Ladders, lifts and tight spaces like attics and crawlspaces.",
        "Industrial jobs can mean long drives to wherever the project is.",
      ],
      fit: { styles: ["build", "fix"], setting: "mixed", heights: true },
      training: [
        {
          name: "Birmingham Electrical JATC (IBEW Local 136 + contractors)",
          kind: "union",
          where: "Birmingham, serving central Alabama",
          detail: "Four-year registered union apprenticeship. Paid on-the-job work with classroom training at the JATC.",
          url: "http://bejatc.org/",
          programSlug: "ibew-neca-electrical-apprenticeship",
        },
        ACCS,
        HOMEBUILDING_ACADEMIES,
      ],
    },
    {
      soc: "47-2073",
      slug: "equipment-operator",
      name: "Heavy equipment operators",
      oneLine: "Run excavators, dozers, loaders and graders on road, site and utility jobs.",
      outlook: { base: 9830, projected: 10460, growthPct: 6, openingsPerYear: 880 },
      stateLicense: "none",
      licenseSummary:
        "Alabama has no state license for equipment operators. Employers look for training records and safe hours in the seat, and some jobs need a commercial driver's license to haul equipment.",
      licenseSteps: [
        { title: "Oiler or trainee", detail: "Start by helping on site and learning equipment care." },
        { title: "Operator", detail: "Run smaller machines, then move up to excavators, dozers and graders." },
        { title: "Certified crane operator (optional)", detail: "Cranes need NCCCO or similar certification under OSHA rules." },
        { title: "Lead operator or foreman", detail: "Run the earthwork on a job." },
      ],
      credentials: ["OSHA 10", "NCCER Heavy Equipment Operations (optional)", "NCCCO crane certification (for crane work)", "Class A CDL (for hauling)"],
      overtime: "Operators are paid hourly, with long days in dry weather. Road and site work slows in heavy rain.",
      ownBusiness:
        "Some operators buy a machine and start a small grading or land-clearing business. Equipment is expensive, so most start with used machines and steady customers.",
      hardParts: [
        "Long hours in the seat, often in heat, dust and noise.",
        "Work follows the projects, which can mean long commutes.",
        "Rain stops the work, so paychecks can swing week to week.",
      ],
      fit: { styles: ["machines"], setting: "outdoor", heights: false },
      training: [
        GO_BUILD_TRAINING,
        ACCS,
        {
          name: "Operating Engineers union (IUOE)",
          kind: "union",
          where: "Check the IUOE for the local that covers your area",
          detail: "Paid union apprenticeships for equipment operators.",
          programSlug: "iuoe-heavy-equipment-operator-apprenticeship",
        },
      ],
    },
    {
      soc: "51-4121",
      slug: "welder",
      name: "Welders",
      oneLine: "Join and cut metal for structures, pipelines, equipment and manufactured products.",
      outlook: { base: 13570, projected: 14810, growthPct: 9, openingsPerYear: 1490 },
      stateLicense: "none",
      licenseSummary:
        "Alabama has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      licenseSteps: [
        { title: "Training", detail: "A community college certificate or on-the-job training." },
        { title: "Entry welder", detail: "Fit-up and production welding while you build skill." },
        { title: "Certified welder", detail: "Pass AWS or employer weld tests for the processes and positions a job needs." },
        { title: "Specialist or inspector (optional)", detail: "Pipe welding, structural steel or AWS Certified Welding Inspector." },
      ],
      credentials: ["AWS certifications", "OSHA 10", "NCCER Welding (optional)"],
      payNote:
        "This pay includes welders in manufacturing, not just construction, because BLS reports one welder category across all industries.",
      overtime: "Welders are usually paid hourly, with overtime common during plant shutdowns, at shipyards and on industrial jobs.",
      ownBusiness:
        "Some welders start mobile welding or fabrication shops. It takes a rig, insurance and a reputation for clean, passing welds.",
      hardParts: [
        "Heat, fumes and bright arc light, so protective gear stays on.",
        "Awkward positions: overhead, in tight spaces, sometimes up high.",
        "Pay depends heavily on certifications, so testing never really stops.",
      ],
      fit: { styles: ["build"], setting: "mixed", heights: false },
      training: [ACCS, UA_AL, CICT],
    },
    {
      soc: "49-9021",
      slug: "hvac-technician",
      name: "HVAC technicians",
      oneLine: "Install and service heating, cooling and refrigeration systems. Steady work in Alabama's heat.",
      outlook: { base: 8010, projected: 8250, growthPct: 3, openingsPerYear: 700 },
      stateLicense: "contractor",
      licenseSummary:
        "Alabama certifies HVAC and refrigeration contractors through its own board. Workers start under a certified contractor and can register with the board as apprentices.",
      licenseSteps: [
        { title: "Apprentice or helper", detail: "Work under a certified contractor. EPA 608 certification is required to handle refrigerants." },
        { title: "Register as an apprentice", detail: "Board registration builds the time that counts toward the license." },
        {
          title: "Qualify for the exam",
          detail: "2 years as a registered apprentice, or 3,000 hours of approved coursework or experience, or an approved HVAC program.",
        },
        { title: "Certified HVAC contractor", detail: "Pass the state exam. A separate exam covers refrigeration." },
      ],
      licenseAgency: AL_HACR,
      credentials: ["EPA Section 608 (required for refrigerants)", "NATE certification (optional)", "OSHA 10"],
      overtime: "Technicians are usually paid hourly, and summer is the busy season: long days and on-call shifts when air conditioners fail.",
      ownBusiness:
        "Running an HVAC business in Alabama requires the state certified contractor license. Service shops are a common first business.",
      hardParts: [
        "Hot attics and rooftops in summer, when the calls pile up.",
        "Electrical, refrigerant and ladder hazards.",
        "On-call nights and weekends during heat waves and cold snaps.",
      ],
      fit: { styles: ["fix"], setting: "mixed", heights: true },
      training: [ACCS, UA_AL, HOMEBUILDING_ACADEMIES],
    },
    {
      soc: "47-2031",
      slug: "carpenter",
      name: "Carpenters",
      oneLine: "Frame, form and finish: from house framing to concrete forms on high-rises.",
      outlook: { base: 7930, projected: 8460, growthPct: 7, openingsPerYear: 640 },
      stateLicense: "none",
      licenseSummary:
        "Alabama has no license for carpenters. Contractors need a home builders license for residential jobs over $10,000 and a general contractor license for commercial jobs of $50,000 or more.",
      licenseSteps: [
        { title: "Apprentice or helper", detail: "Start on a framing, forming or finish crew." },
        { title: "Carpenter", detail: "Work on your own: framing, forms, doors, trim." },
        { title: "Lead carpenter or foreman", detail: "Run a crew and read the plans." },
        { title: "Home builder or contractor license (optional)", detail: "For those who want to run their own jobs above the state's dollar limits." },
      ],
      credentials: ["OSHA 10", "NCCER Carpentry levels (optional)"],
      overtime: "Carpenters are usually paid hourly, with long weeks when a building is racing to get dried in.",
      ownBusiness:
        "Many carpenters start remodeling or trim businesses. Residential jobs over $10,000 need an Alabama home builders license.",
      hardParts: [
        "Physical work outdoors in heat and storms.",
        "Framing and forming mean working at heights.",
        "Housing slowdowns hit carpenters first.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: true },
      training: [
        HOMEBUILDING_ACADEMIES,
        CICT,
        {
          name: "Carpenters union (UBC) training",
          kind: "union",
          where: "Check the UBC for the nearest Alabama training center",
          detail: "Paid union carpentry apprenticeships.",
          programSlug: "ubc-carpenter-apprenticeship",
        },
      ],
    },
    {
      soc: "47-2152",
      slug: "plumber",
      name: "Plumbers",
      oneLine: "Install water, gas and drain piping in homes, hospitals and businesses.",
      outlook: { base: 9610, projected: 10050, growthPct: 5, openingsPerYear: 840 },
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Alabama certifies plumbers at every level. You register as an apprentice with the Plumbers and Gas Fitters Examining Board, become a journeyman after 2 years, and a master after a year as a journeyman.",
      licenseSteps: [
        { title: "Apprentice certificate", detail: "Register with the board before doing plumbing work. No exam." },
        { title: "2 years as an apprentice", detail: "Or finish a board-approved apprentice training program." },
        { title: "Journeyman plumber", detail: "Pass the journeyman exam. Gas fitting has its own journeyman and master certificates." },
        { title: "Master plumber", detail: "1 year of work as a journeyman, then the master exam." },
      ],
      licenseAgency: AL_PGFB,
      credentials: ["Alabama apprentice, journeyman or master plumber certificate", "OSHA 10", "Backflow (ASSE 6010) installer certification (optional)"],
      payNote: "BLS counts plumbers, pipefitters and steamfitters as one occupation, so these pay and job numbers include pipefitters and sprinkler fitters.",
      overtime: "Plumbers are usually paid hourly, and service plumbers often earn overtime or after-hours pay for emergency calls.",
      ownBusiness:
        "A plumbing business in Alabama registers with the board and needs a master plumber as its qualifier, plus insurance.",
      hardParts: [
        "Crawlspaces, trenches and messy repair calls.",
        "Lifting heavy pipe and fixtures.",
        "Emergency calls on nights and weekends.",
      ],
      fit: { styles: ["build", "fix"], setting: "indoor", heights: false },
      training: [UA_AL, HOMEBUILDING_ACADEMIES, ACCS],
    },
    {
      soc: "47-2141",
      slug: "painter",
      name: "Painters",
      oneLine: "Prep and paint homes, offices, bridges and industrial tanks, inside and out.",
      outlook: { base: 2730, projected: 2800, growthPct: 3, openingsPerYear: 220 },
      stateLicense: "none",
      licenseSummary:
        "Alabama has no state painting license. Painting contracts only need a state license when they pass the home builders ($10,000 residential) or general contractor ($50,000 commercial) limits.",
      licenseSteps: [
        { title: "Helper", detail: "Prep work: masking, sanding, patching and cleanup." },
        { title: "Painter", detail: "Spray, brush and roll on your own." },
        { title: "Specialist (optional)", detail: "Industrial coatings, bridges and tanks pay more and need extra training." },
        { title: "Crew lead or estimator", detail: "Run jobs and price new work." },
      ],
      credentials: ["OSHA 10", "EPA Lead-Safe (RRP) for homes built before 1978", "SSPC or AMPP coatings certifications (industrial work)"],
      overtime: "Painters are usually paid hourly. Work picks up in good weather and when new buildings are finishing.",
      ownBusiness:
        "Painting is one of the easiest trades to start a business in, with low startup costs and a local business license for small jobs. Lots of competition means reputation is everything.",
      hardParts: [
        "Ladders, lifts and scaffolds on exterior jobs.",
        "Fumes and dust, so ventilation and masks matter.",
        "Repetitive work that's hard on shoulders and knees.",
      ],
      fit: { styles: ["build"], setting: "mixed", heights: true },
      training: [
        {
          name: "Learn on the job",
          kind: "free-training",
          where: "Painting contractors statewide",
          detail: "Most painters learn as helpers on a crew. No state license is needed to start.",
        },
        {
          name: "Painters union (IUPAT)",
          kind: "union",
          where: "Check the IUPAT for the district council that covers Alabama",
          detail: "Union painter apprenticeships.",
          programSlug: "iupat-painter-apprenticeship",
        },
      ],
    },
    {
      soc: "47-2051",
      slug: "concrete-worker",
      name: "Concrete finishers",
      oneLine: "Place, level and finish concrete for slabs, sidewalks, foundations and decks.",
      outlook: { base: 2060, projected: 2090, growthPct: 1, openingsPerYear: 140 },
      stateLicense: "none",
      licenseSummary:
        "Alabama has no license for concrete finishers. Concrete contractors need a home builders license for residential jobs over $10,000 or a general contractor license for commercial jobs of $50,000 or more.",
      licenseSteps: [
        { title: "Laborer or helper", detail: "Set forms, move concrete and learn the finish." },
        { title: "Finisher", detail: "Screed, float and trowel slabs on your own." },
        { title: "Lead finisher", detail: "Run the pour and the crew." },
        { title: "Foreman or contractor (optional)", detail: "Bigger jobs need a state contractor license." },
      ],
      credentials: ["OSHA 10", "ACI Concrete Field Testing Technician (optional)", "NCCER (optional)"],
      overtime: "Finishers are paid hourly, and pours start early and run until the slab is done, so long days are normal.",
      ownBusiness: "Small concrete businesses (driveways, patios, slabs) are common. Jobs above the state's dollar limits need a contractor license.",
      hardParts: [
        "Hard on knees and backs. A lot of kneeling and bending.",
        "Early starts in heat, since concrete sets fast when it's hot.",
        "Weather decides the schedule.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: false },
      training: [
        CICT,
        {
          name: "Learn on the job",
          kind: "free-training",
          where: "Concrete and site contractors statewide",
          detail: "Most finishers start as laborers on a concrete crew.",
        },
      ],
    },
    {
      soc: "47-2081",
      slug: "drywall-installer",
      name: "Drywall installers & finishers",
      oneLine: "Hang and finish the walls and ceilings inside nearly every building.",
      outlook: { base: 820, projected: 850, growthPct: 3, openingsPerYear: 60 },
      stateLicense: "none",
      licenseSummary:
        "Alabama has no drywall license. Drywall contracts only need a state license when they pass the home builders ($10,000 residential) or general contractor ($50,000 commercial) limits.",
      licenseSteps: [
        { title: "Helper", detail: "Carry board, cut and screw sheets, learn taping." },
        { title: "Hanger or finisher", detail: "Hang board or tape and mud on your own." },
        { title: "Lead or foreman", detail: "Run a crew on commercial or home jobs." },
        { title: "Subcontractor (optional)", detail: "Many experienced drywall workers run their own crews." },
      ],
      credentials: ["OSHA 10", "NCCER (optional)"],
      overtime: "Drywall crews are often paid hourly or by the piece. Busy building seasons bring long weeks.",
      ownBusiness: "Many drywall workers become subcontractors to builders. Bigger jobs need a state contractor license.",
      hardParts: [
        "Heavy sheets, lifting overhead and dust.",
        "Stilts and scaffolds for ceilings.",
        "Piece-rate pay rewards speed, which can wear you down.",
      ],
      fit: { styles: ["build"], setting: "indoor", heights: false },
      training: [
        HOMEBUILDING_ACADEMIES,
        {
          name: "Learn on the job",
          kind: "free-training",
          where: "Drywall contractors statewide",
          detail: "Most installers start as helpers on a drywall crew.",
        },
      ],
    },
    {
      soc: "47-4021",
      slug: "elevator-technician",
      name: "Elevator technicians",
      oneLine: "Install and service elevators and escalators. One of the best-paid trades few people have heard of.",
      outlook: { base: 280, projected: 280, growthPct: -1, openingsPerYear: 20 },
      stateLicense: "worker-certification",
      licenseSummary:
        "Alabama licenses elevator mechanics through the Department of Workforce (formerly the Department of Labor). Helpers and apprentices need no license while they work under a licensed mechanic.",
      licenseSteps: [
        { title: "Helper or apprentice", detail: "Hired by an elevator company, working under a licensed mechanic." },
        { title: "Apprenticeship", detail: "A registered elevator mechanic apprenticeship, such as NEIEP's union program." },
        { title: "Elevator mechanic license", detail: "Show the state your qualifications, such as a finished registered apprenticeship, and apply." },
        { title: "Contractor license (optional)", detail: "Elevator companies need their own license and must employ licensed mechanics." },
      ],
      licenseAgency: AL_ELEVATOR,
      credentials: ["Alabama elevator mechanic license", "NEIEP training"],
      overtime: "Elevator mechanics are usually paid hourly, and service mechanics earn overtime and call-out pay for nights and weekends when someone is stuck.",
      ownBusiness: "Elevator contractors need an Alabama contractor license and licensed mechanics on staff, so most mechanics work for established companies.",
      hardParts: [
        "Shafts, pits and machine rooms: tight, dark and high up.",
        "Electrical, mechanical and hydraulic hazards in one job.",
        "A small trade in Alabama, so openings are few and recruitments come and go.",
      ],
      fit: { styles: ["fix", "machines"], setting: "indoor", heights: true },
      training: [
        {
          name: "Elevator Constructors Local 24 (NEIEP)",
          kind: "union",
          where: "Birmingham",
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
      outlook: { base: 180, projected: 200, growthPct: 10, openingsPerYear: 10 },
      stateLicense: "none",
      licenseSummary: "Alabama has no state flooring license.",
      licenseSteps: [
        { title: "Helper", detail: "Tear-out, prep and hauling material." },
        { title: "Installer", detail: "Lay flooring on your own." },
        { title: "Specialist (optional)", detail: "Hardwood refinishing, commercial resilient flooring or carpet." },
        { title: "Lead installer or subcontractor", detail: "Run jobs for stores and builders." },
      ],
      credentials: ["OSHA 10", "Manufacturer installation certifications (optional)"],
      payNote: "BLS counts this group as floor layers except carpet, wood and tile, so some flooring workers fall in other categories.",
      overtime: "Installers are paid hourly or by the square foot. Busy seasons bring long weeks, especially on new-home and remodel jobs.",
      ownBusiness:
        "Many flooring installers end up working for themselves as subcontractors to stores and builders. You supply the tools and van, and the work comes and goes.",
      hardParts: [
        "Rough on knees and backs.",
        "Dust, adhesives and heavy rolls and boxes.",
        "Pay by the square foot can swing with how much work comes in.",
      ],
      fit: { styles: ["build"], setting: "indoor", heights: false },
      training: [
        {
          name: "Learn on the job",
          kind: "free-training",
          where: "Flooring contractors and stores statewide",
          detail: "Most installers learn as helpers. No license is needed to start.",
        },
      ],
    },
    {
      soc: "47-2121",
      slug: "glazier",
      name: "Glaziers",
      oneLine: "Install the glass and metal storefronts, windows and curtain walls on modern buildings.",
      outlook: { base: 480, projected: 470, growthPct: -1, openingsPerYear: 40 },
      stateLicense: "none",
      licenseSummary:
        "Alabama has no glazier license. Glass contractors need a state contractor license only above the home builders ($10,000 residential) or general contractor ($50,000 commercial) limits.",
      licenseSteps: [
        { title: "Apprentice or helper", detail: "Carry and set glass, learn sealants and framing." },
        { title: "Glazier", detail: "Install storefronts, windows and curtain wall on your own." },
        { title: "Foreman", detail: "Run the glass crew on a building." },
        { title: "Glass contractor (optional)", detail: "Bigger jobs need a state contractor license." },
      ],
      credentials: ["OSHA 10", "Aerial lift and fall protection training"],
      overtime: "Glaziers are usually paid hourly, with long weeks when a building is closing in.",
      ownBusiness: "Some glaziers start residential window and shower-door businesses. Commercial storefront work usually goes to established firms.",
      hardParts: [
        "Heavy, fragile glass and sharp edges.",
        "Work on lifts and swing stages, high on building faces.",
        "A small trade in Alabama, so jobs cluster in the bigger cities.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: true },
      training: [
        {
          name: "Learn on the job",
          kind: "free-training",
          where: "Glass and window contractors statewide",
          detail: "Many glaziers start as helpers with a window or storefront installer.",
        },
        {
          name: "Glaziers union (IUPAT)",
          kind: "union",
          where: "Check the IUPAT for the district council that covers Alabama",
          detail: "Union glazier apprenticeships.",
          programSlug: "iupat-glazier-apprenticeship",
        },
      ],
    },
    {
      soc: "47-2131",
      slug: "insulation-installer",
      name: "Insulation installers",
      oneLine: "Seal and insulate walls, attics, pipes and ductwork to keep buildings efficient.",
      outlook: { base: 820, projected: 830, growthPct: 2, openingsPerYear: 70 },
      stateLicense: "none",
      licenseSummary: "Alabama has no state license for insulation installers.",
      licenseSteps: [
        { title: "Helper", detail: "Carry material, prep spaces and learn safe handling." },
        { title: "Installer", detail: "Batts, blown-in and spray foam." },
        { title: "Mechanical insulator (optional)", detail: "Pipes and equipment in plants and big buildings, usually through an apprenticeship." },
        { title: "Crew lead", detail: "Run jobs and check work." },
      ],
      credentials: ["OSHA 10", "Spray foam safety training (for spray foam work)"],
      payNote:
        "This pay covers floor, ceiling and wall insulation workers. Mechanical insulators (pipes and equipment) are a separate BLS group and often earn more.",
      overtime: "Installers are usually paid hourly or by the job. New-home building booms bring long weeks.",
      ownBusiness: "Some installers start small insulation or spray foam companies. Spray rigs cost a lot, so most start with batts and blown-in work.",
      hardParts: [
        "Hot attics in summer.",
        "Itchy fibers and spray chemicals, so protective gear matters.",
        "Cramped crawlspaces and attics.",
      ],
      fit: { styles: ["build"], setting: "indoor", heights: false },
      training: [
        {
          name: "Learn on the job",
          kind: "free-training",
          where: "Insulation contractors statewide",
          detail: "Most residential installers learn on a crew.",
        },
      ],
    },
    {
      soc: "47-2221",
      slug: "ironworker",
      name: "Ironworkers",
      oneLine: "Raise the steel skeleton of stadiums, bridges and high-rises, and place the rebar inside concrete.",
      outlook: { base: 1210, projected: 1260, growthPct: 4, openingsPerYear: 100 },
      stateLicense: "none",
      licenseSummary: "Alabama has no license for ironworkers. Steel erection companies need a general contractor license for commercial jobs of $50,000 or more.",
      licenseSteps: [
        { title: "Apprentice", detail: "Rebar, rigging and connecting steel under journey workers." },
        { title: "Journey ironworker", detail: "Structural, reinforcing or ornamental work on your own." },
        { title: "Certified rigger or welder (optional)", detail: "Rigging and welding certifications raise pay." },
        { title: "Foreman", detail: "Run the raising gang or rebar crew." },
      ],
      credentials: ["OSHA 10", "AWS structural welding (optional)", "Rigger and signal person certification (optional)"],
      overtime: "Ironworkers are paid hourly, with long days when steel erection is on the critical path.",
      ownBusiness: "Steel erection companies need heavy equipment, big insurance policies and a general contractor license, so most ironworkers work for established firms.",
      hardParts: [
        "Working at serious heights on open steel.",
        "Heavy, physical work in sun and heat.",
        "Work follows the big projects, which can mean travel.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: true },
      training: [
        {
          name: "Ironworkers union apprenticeships",
          kind: "union",
          where: "Check the Ironworkers for the local that covers your area",
          detail: "Paid union apprenticeships in structural, reinforcing and ornamental ironwork.",
          programSlug: "ironworkers-apprenticeship",
        },
        ACCS,
      ],
    },
    {
      soc: "47-2021",
      slug: "mason",
      name: "Masons",
      oneLine: "Lay brick, block and stone for walls, chimneys, schools and storefronts.",
      outlook: { base: 520, projected: 510, growthPct: -1, openingsPerYear: 40 },
      stateLicense: "none",
      licenseSummary:
        "Alabama has no mason license. Masonry contractors need a state license only above the home builders ($10,000 residential) or general contractor ($50,000 commercial) limits.",
      licenseSteps: [
        { title: "Mason tender or helper", detail: "Mix mortar, stock materials and build scaffold." },
        { title: "Apprentice mason", detail: "Lay brick and block under a journey mason." },
        { title: "Mason", detail: "Lay to the line on your own." },
        { title: "Foreman or contractor (optional)", detail: "Bigger jobs need a state contractor license." },
      ],
      credentials: ["OSHA 10", "NCCER Masonry (optional)"],
      overtime: "Masons are usually paid hourly, with long days in good weather. Rain and freezing temperatures stop the work.",
      ownBusiness:
        "Masonry is a classic trade business, from small residential crews doing steps and chimneys to commercial contractors. It takes crews, scaffolding and steady work.",
      hardParts: [
        "Heavy brick and block all day: hard on backs and shoulders.",
        "Outdoor work in heat and cold, on scaffolds.",
        "Alabama projects little growth in this trade through 2034.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: true },
      training: [
        CICT,
        {
          name: "Bricklayers union (BAC)",
          kind: "union",
          where: "Check BAC for the nearest training",
          detail: "Union apprenticeships for brick, block and stone masons.",
          programSlug: "bac-bricklayer-apprenticeship",
        },
        {
          name: "Learn on the job",
          kind: "free-training",
          where: "Masonry contractors statewide",
          detail: "Many masons start as tenders on a crew.",
        },
      ],
    },
    {
      soc: "49-9044",
      slug: "millwright",
      name: "Millwrights",
      oneLine: "Install, align and repair the big machines in factories, power plants and distribution centers.",
      outlook: { base: 1900, projected: 1940, growthPct: 2, openingsPerYear: 170 },
      stateLicense: "none",
      licenseSummary: "Alabama has no state license for millwrights. Employers hire on training, experience and precision.",
      licenseSteps: [
        { title: "Apprentice", detail: "Rigging, moving and setting machines under journey millwrights." },
        { title: "Journey millwright", detail: "Install and align equipment on your own." },
        { title: "Specialist (optional)", detail: "Laser alignment, vibration analysis or turbine work." },
        { title: "Foreman", detail: "Run installs and plant shutdowns." },
      ],
      credentials: ["OSHA 10", "Rigging certifications (optional)", "NCCER Millwright (optional)"],
      payNote: "This pay includes plant maintenance millwrights, not just construction, because BLS reports one millwright category across all industries.",
      overtime: "Millwrights are usually paid hourly. Plant shutdowns and new factory installs bring heavy overtime.",
      ownBusiness:
        "Some millwrights start machinery moving and installation companies. It takes rigging equipment, insurance and relationships with plants.",
      hardParts: [
        "Heavy machinery and rigging hazards.",
        "Shutdown work means nights, weekends and long stretches.",
        "Precision work under time pressure.",
      ],
      fit: { styles: ["fix", "machines"], setting: "indoor", heights: false },
      training: [
        ACCS,
        {
          name: "Carpenters union (UBC) millwright training",
          kind: "union",
          where: "Check the UBC for the nearest training center",
          detail: "Union millwright apprenticeships through the carpenters' training system.",
          programSlug: "ubc-millwright-apprenticeship",
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
        "Alabama has no separate pipefitter license. Fuel gas piping is gas fitting, which takes a certificate from the Plumbers and Gas Fitters Examining Board.",
      licenseSteps: [
        { title: "Apprentice", detail: "Union or open-shop apprenticeship while you work." },
        { title: "Journey pipefitter", detail: "Layout, fitting and welding on your own." },
        { title: "Gas fitter certificate (if needed)", detail: "For fuel gas work, through the state board." },
        { title: "Foreman", detail: "Run crews on plant and commercial jobs." },
      ],
      licenseAgency: AL_PGFB,
      credentials: ["OSHA 10", "Pipe welding certifications (optional)", "Medical gas certification (optional)"],
      payNote:
        "BLS counts plumbers, pipefitters and steamfitters as one occupation, so this pay matches plumbers' and there is no separate Alabama job count for pipefitters.",
      sharedStatsWith: "plumber",
      overtime: "Pipefitters are usually paid hourly, with heavy overtime during plant shutdowns and big industrial builds.",
      ownBusiness: "Mechanical and piping contractors need crews, insurance and, above $50,000 on commercial work, a general contractor license.",
      hardParts: [
        "Heavy pipe, hot work and confined spaces.",
        "Industrial jobs can mean travel and long shutdown shifts.",
        "Plant work comes with strict safety rules.",
      ],
      fit: { styles: ["build", "fix"], setting: "indoor", heights: true },
      training: [UA_AL, ACCS, CICT],
    },
    {
      soc: "47-2161",
      slug: "plasterer-stucco-mason",
      name: "Plasterers & stucco masons",
      oneLine: "Apply plaster, stucco and EIFS finishes to walls and building exteriors.",
      stateLicense: "none",
      licenseSummary: "Alabama has no license for plasterers. Bigger jobs follow the state's home builders and general contractor dollar limits.",
      licenseSteps: [
        { title: "Helper", detail: "Mix material, set lath and scaffolds." },
        { title: "Plasterer", detail: "Apply base and finish coats on your own." },
        { title: "Specialist (optional)", detail: "EIFS systems and decorative finishes." },
        { title: "Crew lead", detail: "Run jobs and check work." },
      ],
      credentials: ["OSHA 10", "Manufacturer EIFS training (optional)"],
      payNote:
        "BLS doesn't publish Alabama figures for this small trade, so pay is the national figure and there is no Alabama job projection.",
      overtime: "Plasterers are usually paid hourly, with long days in dry weather, since rain and cold affect how stucco cures.",
      ownBusiness: "Some experienced plasterers run small stucco crews. Work is steadier near the bigger cities.",
      hardParts: [
        "Scaffold work outdoors.",
        "Heavy, wet material and repetitive motion.",
        "A very small trade in Alabama, so jobs can be hard to find.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: true },
      training: [
        {
          name: "Learn on the job",
          kind: "free-training",
          where: "Plastering and stucco contractors",
          detail: "Most plasterers learn as helpers on a crew.",
        },
      ],
    },
    {
      soc: "47-2181",
      slug: "roofer",
      name: "Roofers",
      oneLine: "Install and repair shingle, metal and flat commercial roofs.",
      outlook: { base: 1230, projected: 1280, growthPct: 4, openingsPerYear: 90 },
      stateLicense: "contractor",
      licenseSummary:
        "Alabama's Home Builders Licensure Board licenses residential roofing contractors for jobs over $10,000, and commercial roofing of $50,000 or more needs a general contractor license. Roofers who work for a contractor need no license.",
      licenseSteps: [
        { title: "Helper", detail: "Tear-off, carrying material and cleanup." },
        { title: "Roofer", detail: "Install shingle, metal or flat roofs on your own." },
        { title: "Foreman", detail: "Run crews and check the work." },
        { title: "Residential roofer license (optional)", detail: "From the Home Builders Licensure Board, with a $10,000 bond." },
      ],
      licenseAgency: AL_HBLB,
      credentials: ["OSHA 10", "Fall protection training", "Manufacturer certifications (optional)"],
      overtime: "Roofers are usually paid hourly or by the square. Storm seasons can bring long stretches of repair work.",
      ownBusiness: "Plenty of roofers run their own companies. Residential jobs over $10,000 need the home builders roofing license and bond.",
      hardParts: [
        "Working at heights on hot roofs, one of the most dangerous jobs in construction.",
        "Summer sun on dark shingles is punishing.",
        "Heavy bundles and long days.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: true },
      training: [
        {
          name: "Learn on the job",
          kind: "free-training",
          where: "Roofing contractors statewide",
          detail: "Most roofers start as helpers on a crew.",
        },
        {
          name: "Roofers union training",
          kind: "union",
          where: "Check the Roofers union for the local that covers Alabama",
          detail: "Union roofing and waterproofing apprenticeships.",
          programSlug: "roofers-union-apprenticeship",
        },
      ],
    },
    {
      soc: "47-2211",
      slug: "sheet-metal-worker",
      name: "Sheet metal workers",
      oneLine: "Fabricate and install ductwork, metal roofing and architectural panels.",
      outlook: { base: 1750, projected: 1780, growthPct: 2, openingsPerYear: 140 },
      stateLicense: "none",
      licenseSummary:
        "Alabama has no sheet metal license. Ductwork for heating and cooling systems is HVAC work, done under a certified HVAC contractor.",
      licenseSteps: [
        { title: "Apprentice", detail: "Fabrication and duct installation under journey workers." },
        { title: "Journey sheet metal worker", detail: "Layout, fabrication and installation on your own." },
        { title: "Specialist (optional)", detail: "Testing and balancing, architectural metal or service." },
        { title: "Foreman", detail: "Run crews on commercial jobs." },
      ],
      licenseAgency: AL_HACR,
      credentials: ["OSHA 10", "NCCER Sheet Metal (optional)"],
      overtime: "Sheet metal workers are usually paid hourly, with long weeks as buildings near completion.",
      ownBusiness: "Shops that install HVAC ductwork need a certified HVAC contractor. Architectural and roofing metal shops follow the state's contractor dollar limits.",
      hardParts: [
        "Sharp edges and heavy duct.",
        "Ladders and lifts for overhead ductwork.",
        "Hot attics and ceilings.",
      ],
      fit: { styles: ["build"], setting: "indoor", heights: true },
      training: [
        {
          name: "Sheet metal apprenticeships (SMART)",
          kind: "union",
          where: "Including Sheet Metal Workers training in Birmingham",
          detail: "Union sheet metal apprenticeships.",
          programSlug: "smart-sheet-metal-apprenticeship",
        },
        ACCS,
      ],
    },
    {
      soc: "47-2231",
      slug: "solar-installer",
      name: "Solar installers",
      oneLine: "Mount and wire solar panels on roofs and large ground-mounted solar farms.",
      stateLicense: "none",
      licenseSummary:
        "Alabama has no solar license. The electrical side of a solar job is electrical work, so it falls under Alabama's electrician and electrical contractor licenses.",
      licenseSteps: [
        { title: "Installer", detail: "Mount racking and panels on a crew." },
        { title: "Lead installer", detail: "Run the crew on residential or commercial jobs." },
        { title: "NABCEP certification (optional)", detail: "National credentials that employers value." },
        { title: "Electrical license (for wiring)", detail: "Journeyman electrician license to do the electrical connections." },
      ],
      licenseAgency: AL_AECB,
      credentials: ["OSHA 10", "NABCEP PV Associate (optional)", "Fall protection training"],
      payNote:
        "BLS doesn't publish Alabama figures for solar installers, so pay is the national figure, and Alabama has no projection for this small, fast-changing trade.",
      overtime: "Installers are usually paid hourly. Utility-scale solar farm projects often run long weeks, sometimes far from home.",
      ownBusiness: "Solar companies need an electrical contractor (or a licensed electrical subcontractor) for the wiring, plus insurance and customers.",
      hardParts: [
        "Roof and field work in full sun.",
        "Electrical hazards once panels are wired.",
        "A small industry in Alabama, so jobs may mean travel to solar farms.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: true },
      training: [
        {
          name: "Birmingham Electrical JATC (IBEW Local 136)",
          kind: "union",
          where: "Birmingham",
          detail: "Electrical apprenticeship, the strongest base for solar wiring work.",
          url: "http://bejatc.org/",
          programSlug: "nabcep-pv-associate-certification",
        },
        ACCS,
      ],
    },
    {
      soc: "47-2152",
      slug: "sprinkler-fitter",
      name: "Sprinkler fitters",
      oneLine: "Install and test the fire sprinkler systems that every new commercial building needs.",
      stateLicense: "contractor",
      licenseSummary:
        "Alabama's State Fire Marshal permits fire sprinkler contractors, and each one needs a certificate holder with NICET certification in sprinkler layout. Individual fitters start by working for a permitted contractor.",
      licenseSteps: [
        { title: "Apprentice fitter", detail: "Work for a permitted sprinkler contractor. Union apprenticeships run five years." },
        { title: "Journey fitter", detail: "Install and test systems on your own." },
        { title: "NICET certification", detail: "Optional national certifications in inspection or layout." },
        { title: "Certificate holder", detail: "NICET Level III or higher in sprinkler layout lets you be the person in charge of a contractor's permit." },
      ],
      licenseAgency: AL_SPRINKLER,
      credentials: ["NICET fire protection certifications", "Backflow tester certification (optional)", "OSHA 10"],
      payNote:
        "BLS counts sprinkler fitters with plumbers and pipefitters, so this pay matches plumbers' and there is no separate Alabama job count for sprinkler fitters.",
      sharedStatsWith: "plumber",
      overtime: "Fitters are usually paid hourly, with overtime as buildings race to pass their fire inspection before opening.",
      ownBusiness: "Opening a sprinkler company in Alabama takes a State Fire Marshal permit, insurance and a NICET-certified certificate holder.",
      hardParts: [
        "Most of the work is overhead, on lifts and ladders.",
        "Heavy pipe and fittings, all day.",
        "Union fitters may travel to wherever the work is.",
      ],
      fit: { styles: ["build"], setting: "indoor", heights: true },
      training: [
        {
          name: "UA Sprinkler Fitters Local 669",
          kind: "union",
          where: "A national local that hires through contractors in many states",
          detail: "Five-year registered apprenticeship. You're hired by a signatory contractor and take related classes alongside work.",
          url: "https://www.training669.org/",
        },
        GO_BUILD_TRAINING,
      ],
    },
    {
      soc: "47-2044",
      slug: "tile-setter",
      name: "Tile setters",
      oneLine: "Set tile and stone in showers, kitchens, lobbies and floors.",
      outlook: { base: 420, projected: 460, growthPct: 9, openingsPerYear: 30 },
      stateLicense: "none",
      licenseSummary: "Alabama has no state tile license. Bigger jobs follow the state's home builders and general contractor dollar limits.",
      licenseSteps: [
        { title: "Helper", detail: "Mix thinset, cut tile and prep floors." },
        { title: "Tile setter", detail: "Set floors, walls and showers on your own." },
        { title: "Certified installer (optional)", detail: "Certified Tile Installer (CTI) through the Ceramic Tile Education Foundation." },
        { title: "Lead or subcontractor", detail: "Run jobs for builders and remodelers." },
      ],
      credentials: ["OSHA 10", "Certified Tile Installer (CTI, optional)"],
      overtime: "Tile setters are paid hourly or by the square foot. Remodel and new-home booms bring long weeks.",
      ownBusiness: "Tile is a common one-person or small-crew business. Reputation and photos of past work bring the jobs.",
      hardParts: [
        "Kneeling all day is hard on knees.",
        "Heavy boxes, wet saws and dust.",
        "Precise work where mistakes show.",
      ],
      fit: { styles: ["build"], setting: "indoor", heights: false },
      training: [
        {
          name: "Learn on the job",
          kind: "free-training",
          where: "Tile contractors statewide",
          detail: "Most tile setters learn as helpers. No license is needed to start.",
        },
        HOMEBUILDING_ACADEMIES,
      ],
    },
    {
      soc: "47-2181",
      slug: "waterproofing-installer",
      name: "Waterproofing installers",
      oneLine: "Seal foundations, plazas and parking decks against water before they get buried or built over.",
      stateLicense: "none",
      licenseSummary: "Alabama has no license for waterproofing workers.",
      licenseSteps: [
        { title: "Helper", detail: "Surface prep and carrying material." },
        { title: "Installer", detail: "Apply membranes, coatings and sealants on your own." },
        { title: "Specialist (optional)", detail: "Manufacturer certifications for specific systems." },
        { title: "Crew lead", detail: "Run jobs and test the work." },
      ],
      credentials: ["OSHA 10", "Manufacturer certifications (optional)"],
      payNote:
        "BLS has no separate waterproofing category, so this shows roofers' pay, the closest group, and there is no separate Alabama job count.",
      sharedStatsWith: "roofer",
      overtime: "Installers are usually paid hourly, with long weeks before a building is closed in.",
      ownBusiness: "Some installers start waterproofing companies serving builders. It takes insurance and manufacturer approvals.",
      hardParts: [
        "Below-grade and deck work in heat.",
        "Chemical coatings and fumes.",
        "Mistakes show up later as leaks, so details matter.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: false },
      training: [
        {
          name: "Learn on the job",
          kind: "free-training",
          where: "Waterproofing contractors",
          detail: "Most installers learn as helpers on a crew.",
        },
      ],
    },
  ],
  highSchool: [
    {
      title: "Career tech dual enrollment",
      detail:
        "High school students can take career and technical courses at Alabama's community colleges for both high school and college credit. The state's CTE Dual Enrollment Scholarship pays tuition and fees, and at many colleges books, when funding allows. Ask your school's career tech director or counselor.",
      source: AL_DUAL,
    },
    {
      title: "Registered youth apprenticeships",
      detail:
        "Alabama law created registered youth apprenticeships for students ages 16 to 18, and gives employers a tax credit for hiring in-school youth apprentices.",
      source: AL_AOA,
    },
    {
      title: "Pre-apprenticeships in high school",
      detail:
        "The Alabama Office of Apprenticeship certifies high school pre-apprenticeships. In 2025, Deshler High School in Tuscumbia launched north Alabama's first youth pre-apprenticeship in HVAC.",
      source: {
        label: "Alabama Department of Workforce, Deshler High School HVAC pre-apprenticeship (Aug. 2025)",
        url: "https://pubt.io/view/184DEEE6B5CD9CB9DF0D446E6F0A473B68732C53",
      },
    },
    {
      title: "Go Build Alabama",
      detail:
        "The construction industry's statewide campaign, created by the Alabama Construction Recruitment Institute, shows students what the trades pay and where to train.",
      source: GO_BUILD,
    },
  ],
  adults: [
    {
      title: "Alabama Office of Apprenticeship",
      detail:
        "Alabama runs its own state apprenticeship agency, now part of the Department of Workforce. It registers apprenticeship programs and helps employers start new ones.",
      source: { label: "EdNC, how Alabama built its apprenticeship system (2025)", url: "https://www.ednc.org/?p=283560" },
    },
    {
      title: "Community and technical colleges",
      detail:
        "Alabama's community colleges offer certificates and short workforce courses in the building trades and welding. Programs differ by campus.",
      source: { label: "Alabama Community College System, find a college", url: "https://www.accs.edu/community-college/find-college/" },
    },
    {
      title: "Tuition-free and discounted training",
      detail:
        "The South Alabama Homebuilding Academy in Mobile began tuition-free trades classes in January 2026, and the state's craft training board funds discounted training listed through Go Build Alabama.",
      source: {
        label: "Construction Owners, tuition-free construction training launches in Mobile (Dec. 2025)",
        url: "https://www.constructionowners.com/ca/news/tuition-free-construction-training-launches-in-mobile",
      },
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Alabama statewide, May 2025", url: "https://www.bls.gov/oes/" },
    {
      label: "Plasterers and solar installers, national wages, May 2025 (BLS; no Alabama estimate published)",
      url: "https://www.onetonline.org/link/localwages/47-2161.00?st=AL",
    },
    {
      label: "Alabama long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
      url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=AL",
    },
    AL_AECB,
    AL_AECB_RULE,
    { label: "O*NET license profile: Alabama journeyman electrician (schooling can replace up to 2,000 hours)", url: "https://www.onetonline.org/link/licenseinfo?id=01-180" },
    AL_PGFB,
    AL_PGFB_RULE,
    AL_HACR,
    { label: "Code of Ala. 34-31-28, HVAC certified contractor exam eligibility", url: "https://law.justia.com/codes/alabama/2012/title-34/chapter-31/section-34-31-28/" },
    AL_ELEVATOR,
    AL_SPRINKLER,
    AL_HBLB,
    AL_GC,
    AL_DUAL,
    AL_AOA,
    GO_BUILD,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
