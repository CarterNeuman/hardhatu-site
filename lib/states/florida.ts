// Florida state guide. HIDDEN until launch: listed in HIDDEN_STATE_GUIDES in
// lib/state-guides.ts, so it only renders when SHOW_HIDDEN_STATES=1.
// Same rules as Georgia: every fact carries a source, pay comes from
// lib/state-pay-data.ts, and licensing is described per the agency's rules.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";

const FL_CILB: SourceRef = {
  label: "Florida Construction Industry Licensing Board (DBPR)",
  url: "https://www2.myfloridalicense.com/construction-industry/faqs/",
};
const FL_489_111: SourceRef = {
  label: "Fla. Stat. 489.111, contractor certification (4 years of experience, 1 as a foreman)",
  url: "https://www.flsenate.gov/Laws/Statutes/2024/489.111",
};
const FL_489_511: SourceRef = {
  label: "Fla. Stat. 489.511, certified electrical contractor (Electrical Contractors' Licensing Board)",
  url: "https://www.flsenate.gov/Laws/Statutes/2024/489.511",
};
const FL_489_5335: SourceRef = {
  label: "Fla. Stat. 489.5335, county and city electrical journeyman licenses",
  url: "https://www.flsenate.gov/Laws/Statutes/2024/489.5335",
};
const FL_489_1455: SourceRef = {
  label: "Fla. Stat. 489.1455, county and city journeyman licenses for plumbing, pipe fitting, mechanical and HVAC",
  url: "https://www.flsenate.gov/Laws/Statutes/2024/489.1455",
};
const FL_LOCAL_LICENSES: SourceRef = {
  label: "City of Port St. Lucie Building Department, licensing after HB 735 (which trades need a state license)",
  url: "https://cityofpsl.com/files/assets/public/v/1/departments/building/documents/hb735-licensing-requiremen.pdf",
};
const FL_ELEVATOR: SourceRef = {
  label: "Fla. Stat. chapter 399, Elevator Safety Act (elevator certificate of competency)",
  url: "https://www.flsenate.gov/Laws/Statutes/2024/Chapter399/All",
};
const FL_FIRE: SourceRef = {
  label: "Florida State Fire Marshal, fire protection contractor licensing",
  url: "https://myfloridacfo.com/division/sfm/bfp/regulatory-licensing/ceu-information-and-forms",
};
const FL_APPRENTICESHIP: SourceRef = {
  label: "Florida Department of Education, registered apprenticeship programs",
  url: "https://www.fldoe.org/academics/career-adult-edu/apprenticeship-programs",
};

const FL_COLLEGES: TrainingOption = {
  name: "Florida technical colleges and state colleges",
  kind: "college",
  where: "School district technical colleges and Florida College System campuses statewide",
  detail:
    "Career certificate programs in the building trades. Programs differ by campus, so check the technical college or state college nearest you. High school students can take many of them free through dual enrollment.",
  url: "https://www.fldoe.org/academics/career-adult-edu/",
};
const FL_APPRENTICE_FINDER: TrainingOption = {
  name: "Florida registered apprenticeship finder",
  kind: "free-training",
  where: "Statewide, searchable by county",
  detail:
    "The Florida Department of Education registers apprenticeship programs in the state. Its finder lists active programs and sponsors near you, and every one is a paid job.",
  url: FL_APPRENTICESHIP.url,
};
const ABC_FEC: TrainingOption = {
  name: "ABC Institute (ABC Florida East Coast Chapter)",
  kind: "open-shop",
  where: "Coconut Creek and Miami-Dade, serving Brevard County to Key West",
  detail:
    "One of Florida's largest apprenticeship providers. Recent graduates finished in electrical, plumbing, HVAC, fire sprinkler, roofing and line erector programs while working for member contractors.",
  url: "https://www.abceastflorida.com/",
};
const ABC_GULF: TrainingOption = {
  name: "ABC Florida Gulf Coast Chapter",
  kind: "open-shop",
  where: "Tampa, serving Gulf counties from Gainesville to Naples",
  detail:
    "Registered apprenticeships for carpenters, electricians, plumbers, HVAC, sheet metal workers, pipefitters, roofers and sprinkler fitters while you work for a member contractor.",
  url: "https://www.abcflgulf.org/",
};
const ABC_FIRST_COAST: TrainingOption = {
  name: "ABC Florida First Coast Chapter",
  kind: "open-shop",
  where: "Jacksonville and St. Augustine",
  detail: "Open-shop contractors' association for Northeast Florida with craft training for member companies' workers.",
  url: "https://www.abcfirstcoast.com/",
};
const CAREERSOURCE: TrainingOption = {
  name: "CareerSource Florida",
  kind: "free-training",
  where: "Local career centers statewide",
  detail:
    "The state's workforce system. Eligible adults, such as people who are unemployed, laid off or low-income, can get help paying for approved training.",
  url: "https://careersourceflorida.com/",
};

export const FLORIDA: StateGuide = {
  // Florida ZIP codes run 320xx-339xx, 341xx-342xx, 344xx, 346xx-347xx and 349xx.
  locationHints: {
    zip3: [
      [320, 339],
      [341, 342],
      [344, 344],
      [346, 347],
      [349, 349],
    ],
    cities: ["Miami", "Orlando", "Tampa", "Tallahassee", "Fort Lauderdale", "St. Petersburg", "Pensacola", "Hialeah"],
  },
  slug: "florida",
  code: "FL",
  name: "Florida",
  lastVerified: "2026-11-14",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Florida long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=FL",
  },
  intro:
    "A field guide to 25 construction trades in Florida: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ about 457,000 people in Florida, and the state projects about 45,900 openings a year across them through 2034.",
    "Florida has no statewide license for individual electricians, plumbers or HVAC workers. Counties and cities can issue journeyman licenses, and the state licenses the contractors who run the jobs.",
    "Painting, flooring, tile and stucco need no state or local trade license in Florida, so you can start working and earning right away.",
    "Public high school students can take career certificate courses at Florida technical and state colleges through dual enrollment, with tuition, fees and books covered.",
    "Bright Futures has two scholarships built for trade students: Gold Seal Vocational Scholars and Gold Seal CAPE Scholars.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "Dual enrollment tuition", value: "$0", note: "Career certificate courses, for public high school students" },
  licensingOverview:
    "Florida licenses contractors through two state boards at the Department of Business and Professional Regulation: the Construction Industry Licensing Board (general, building and residential contractors, plus trades like plumbing, air conditioning, roofing, sheet metal and solar) and the Electrical Contractors' Licensing Board. Elevator mechanics are certified by the state's elevator safety office, and fire sprinkler contractors by the State Fire Marshal. Counties and cities can issue journeyman licenses for electrical, plumbing, pipe fitting, mechanical and HVAC work, and since a 2021 law they can no longer license trades like painting, flooring, tile or stucco. Most of these licenses are for people who contract the work themselves. Workers usually start under a licensed company.",
  overtimeNote:
    "Most of these jobs pay by the hour, and federal law requires time-and-a-half for hourly workers past 40 hours in a week. Overtime is common across these trades, and the pay figures on this page leave it out, so many workers earn more than shown. How much depends on the employer, the season and the project.",
  overtimeSource: { label: "U.S. Department of Labor, overtime pay under the Fair Labor Standards Act", url: "https://www.dol.gov/agencies/whd/overtime" },
  safety: {
    note:
      "Every one of these trades has real physical risk, and the industry takes it seriously: many employers and training programs start new workers with OSHA 10 safety training, and OSHA requires fall protection at 6 feet on construction sites. Falls are the leading cause of death in construction, 389 of 1,034 construction deaths in 2024. In Florida, heat is a daily hazard too, so water, shade and rest breaks matter.",
    source: { label: "OSHA Fall Prevention Campaign (BLS 2024 data)", url: "https://www.osha.gov/stop-falls" },
  },
  business: {
    lead:
      "Owning your own shop is a real path in every one of these trades, and it's how some tradespeople earn far more than any wage on this page. It's also where the most risk lives.",
    upside: [
      "Owners set their own prices and schedules. The pay figures on this page leave out the self-employed entirely, so they say nothing about what owners earn.",
      "In Florida, the license that lets you contract the work yourself is a state certificate, such as certified electrical, plumbing, air conditioning or roofing contractor. Trades like painting, flooring and tile need no state trade license.",
      "You can start small. Many owners begin with one truck and side jobs before going full-time.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Income swings with the season and the economy, and customers don't always pay on time.",
    ],
    path:
      "The usual route: work for someone else for years, earn your state certificate, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      {
        label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023",
        url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm",
      },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      FL_LOCAL_LICENSES,
    ],
  },
  trades: [
    {
      soc: "47-2061",
      slug: "laborer",
      name: "Construction laborers",
      oneLine: "The crew that keeps a site moving: digging, hauling, setting up, cleaning up and helping every other trade.",
      outlook: { base: 103980, projected: 121780, growthPct: 17, openingsPerYear: 10660 },
      stateLicense: "none",
      licenseSummary:
        "Florida has no license for construction laborers. It is the biggest trade on this page and the most common way into construction: many people start here and move into a skilled trade.",
      licenseSteps: [
        { title: "Laborer", detail: "Start on a crew. Many employers want OSHA 10 safety training first." },
        { title: "Skilled laborer", detail: "Run small equipment, set forms, handle traffic control or pipe work." },
        { title: "Lead laborer or foreman", detail: "Run a crew on site." },
        { title: "Move into a trade (optional)", detail: "Many laborers switch into an apprenticeship once they know which trade they like." },
      ],
      credentials: ["OSHA 10", "Flagger or traffic control certification (common on road jobs)", "NCCER Core (optional)"],
      overtime: "Laborers are usually paid hourly, with overtime common when a project is behind or a concrete pour runs long. Summer storms can cut days short.",
      ownBusiness:
        "Some laborers grow into small cleanup or site-prep businesses. Work that touches a building's structure needs a Florida general, building or residential contractor license.",
      hardParts: [
        "The most physical job on site: lifting, digging and on your feet all day.",
        "Outdoor work through Florida heat and humidity, with early starts.",
        "Starting pay is lower than most trades, so moving up matters.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: false },
      training: [
        {
          name: "Construction craft laborer apprenticeships",
          kind: "union",
          where: "Programs by county, including South Florida Laborers JATC (LiUNA Local 1652) in Pompano Beach",
          detail: "The Florida Department of Education keeps a county-by-county list of registered construction craft laborer apprenticeships.",
          url: FL_APPRENTICESHIP.url,
          programSlug: "liuna-laborer-apprenticeship",
        },
        CAREERSOURCE,
        FL_COLLEGES,
      ],
    },
    {
      soc: "47-2111",
      slug: "electrician",
      name: "Electricians",
      oneLine: "Install and repair wiring, panels and power systems in homes, offices, plants and data centers.",
      outlook: { base: 52340, projected: 62470, growthPct: 19, openingsPerYear: 5920 },
      stateLicense: "contractor",
      licenseSummary:
        "Florida has no statewide journeyman electrician license. Counties and cities can issue journeyman licenses that are honored statewide, and the state certifies electrical contractors through the Electrical Contractors' Licensing Board.",
      licenseSteps: [
        { title: "Apprentice or helper", detail: "Work under a licensed electrical contractor. No state license needed to start." },
        {
          title: "Journeyman license (county or city)",
          detail: "Where offered: a 75% score on a proctored exam, a registered apprenticeship or 12,000 hours of on-the-job training, and building code coursework.",
        },
        {
          title: "Experience as a supervisor",
          detail: "The state accepts several routes, such as 4 years as a supervisor within the last 8 years.",
        },
        { title: "Certified electrical contractor", detail: "Pass the state exam. Age 18 or older. Lets you contract electrical work anywhere in Florida." },
      ],
      licenseAgency: FL_489_511,
      credentials: ["OSHA 10 (common first card)", "NCCER Electrical levels (optional, widely recognized)"],
      overtime: "Most electricians are paid by the hour, so hours past 40 a week earn time-and-a-half. Storm recovery and big commercial builds often run long weeks.",
      ownBusiness:
        "To contract electrical work yourself, Florida requires a certified electrical contractor license (statewide) or a local registered license. Small residential and service shops are a common first business.",
      hardParts: [
        "Live electrical work carries shock and arc-flash risk, so safety rules are strict and non-negotiable.",
        "Ladders, lifts and hot attics in Florida summers.",
        "Commercial jobs can mean long drives to wherever the project is.",
      ],
      fit: { styles: ["build", "fix"], setting: "mixed", heights: true },
      training: [
        {
          name: "IBEW electrical JATCs (union, with contractors)",
          kind: "union",
          where: "Miami, West Palm Beach, Tampa, Winter Park (Orlando area), Jacksonville and Pensacola",
          detail: "Paid union inside-wireman apprenticeships registered with the state. Find the JATC that covers your county.",
          url: FL_APPRENTICESHIP.url,
          programSlug: "ibew-neca-electrical-apprenticeship",
        },
        ABC_FEC,
        ABC_GULF,
        {
          name: "IEC Florida West Coast Chapter (Independent Electrical Contractors)",
          kind: "open-shop",
          where: "Tampa Bay area",
          detail: "Non-union registered electrical apprenticeship. You work for a member contractor while taking IEC classes.",
          url: "https://www.ieci.org/",
        },
      ],
    },
    {
      soc: "47-2073",
      slug: "equipment-operator",
      name: "Heavy equipment operators",
      oneLine: "Run excavators, dozers, loaders and graders on road, site and utility jobs.",
      outlook: { base: 30700, projected: 34710, growthPct: 13, openingsPerYear: 3040 },
      stateLicense: "none",
      licenseSummary:
        "Florida has no state license for equipment operators. Employers look for training records and safe hours in the seat, and some jobs need a commercial driver's license to haul equipment.",
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
        {
          name: "Operating Engineers apprenticeships (IUOE)",
          kind: "union",
          where: "Including the North Central Florida Operating Engineers JAC in Jacksonville",
          detail: "Paid union apprenticeships for equipment operators, registered with the state.",
          url: FL_APPRENTICESHIP.url,
          programSlug: "iuoe-heavy-equipment-operator-apprenticeship",
        },
        FL_COLLEGES,
        CAREERSOURCE,
      ],
    },
    {
      soc: "51-4121",
      slug: "welder",
      name: "Welders",
      oneLine: "Join and cut metal for structures, pipelines, equipment and manufactured products.",
      outlook: { base: 17510, projected: 19680, growthPct: 12, openingsPerYear: 2010 },
      stateLicense: "none",
      licenseSummary:
        "Florida has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      licenseSteps: [
        { title: "Training", detail: "A technical college certificate or on-the-job training." },
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
      training: [
        FL_COLLEGES,
        {
          name: "UA Local 123 (Plumbers, Pipefitters & HVAC-R)",
          kind: "union",
          where: "Tampa, serving West Central Florida",
          detail: "Five-year union apprenticeship in the piping trades, where welding is a core skill for pipefitters.",
          programSlug: "ua-plumber-pipefitter-apprenticeship",
        },
        CAREERSOURCE,
      ],
    },
    {
      soc: "49-9021",
      slug: "hvac-technician",
      name: "HVAC technicians",
      oneLine: "Install and service heating, cooling and refrigeration systems. Year-round work in Florida's heat.",
      outlook: { base: 40700, projected: 48180, growthPct: 18, openingsPerYear: 4430 },
      stateLicense: "contractor",
      licenseSummary:
        "Florida certifies air conditioning and mechanical contractors through the Construction Industry Licensing Board. Technicians work under a licensed contractor, and counties and cities can issue journeyman HVAC licenses.",
      licenseSteps: [
        { title: "Helper or apprentice", detail: "Work under a licensed contractor. EPA 608 certification is required to handle refrigerants." },
        {
          title: "Journeyman license (county or city)",
          detail: "Where offered: a 75% score on a proctored exam, a registered apprenticeship or 12,000 hours of on-the-job training, and code coursework.",
        },
        { title: "4 years of experience", detail: "At least 1 of those years as a foreman or supervisor." },
        { title: "Air conditioning contractor (Class C, B or A)", detail: "Pass the state exam. Classes differ by the size of systems you can work on." },
      ],
      licenseAgency: FL_CILB,
      credentials: ["EPA Section 608 (required for refrigerants)", "NATE certification (optional)", "OSHA 10"],
      overtime: "Technicians are usually paid hourly, and summer is the busy season: long days and on-call shifts when air conditioners fail.",
      ownBusiness:
        "To contract HVAC work in Florida you need a certified or registered air conditioning or mechanical contractor license. Service shops are a common first business.",
      hardParts: [
        "Hot attics and rooftops in the middle of summer, when the calls pile up.",
        "Electrical, refrigerant and ladder hazards.",
        "On-call nights and weekends during heat waves.",
      ],
      fit: { styles: ["fix"], setting: "mixed", heights: true },
      training: [
        FL_COLLEGES,
        {
          name: "UA HVAC-R apprenticeships",
          kind: "union",
          where: "Including UA Local 123 in Tampa and the ACRA-Local 725 JATC in Miami",
          detail: "Paid union apprenticeships covering HVAC-R and piping.",
          programSlug: "ua-plumber-pipefitter-apprenticeship",
        },
        ABC_GULF,
        {
          name: "Florida Air Conditioning Apprenticeship Association",
          kind: "open-shop",
          where: "West Palm Beach",
          detail: "Registered HVAC apprenticeship for workers at participating South Florida contractors.",
          url: FL_APPRENTICESHIP.url,
        },
      ],
    },
    {
      soc: "47-2031",
      slug: "carpenter",
      name: "Carpenters",
      oneLine: "Frame, form and finish: from house framing to concrete forms on high-rises.",
      outlook: { base: 60000, projected: 68090, growthPct: 14, openingsPerYear: 5360 },
      stateLicense: "none",
      licenseSummary:
        "Florida has no license for carpenters who work for a contractor. Contracting structural work yourself takes a state general, building or residential contractor license, while trim carpentry needs none.",
      licenseSteps: [
        { title: "Apprentice or helper", detail: "Start on a framing, forming or finish crew." },
        { title: "Carpenter", detail: "Work on your own: framing, forms, doors, trim." },
        { title: "Lead carpenter or foreman", detail: "Run a crew and read the plans." },
        { title: "State contractor license (optional)", detail: "Residential, building or general contractor, for those who want to run their own jobs." },
      ],
      credentials: ["OSHA 10", "NCCER Carpentry levels (optional)"],
      overtime: "Carpenters are usually paid hourly, with long weeks when a building is racing toward dry-in before storm season.",
      ownBusiness:
        "Many carpenters start remodeling or trim businesses. Structural work, like framing additions, requires a Florida residential, building or general contractor license.",
      hardParts: [
        "Physical work outdoors in heat and afternoon storms.",
        "Framing and forming mean working at heights.",
        "Housing slowdowns hit carpenters first.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: true },
      training: [
        {
          name: "Carpenters union (UBC) training",
          kind: "union",
          where: "Including the South Florida Carpenters JATC in Fort Lauderdale",
          detail: "Paid union carpentry apprenticeships, plus floor coverer and scaffold erector programs.",
          programSlug: "ubc-carpenter-apprenticeship",
        },
        ABC_GULF,
        FL_COLLEGES,
      ],
    },
    {
      soc: "47-2152",
      slug: "plumber",
      name: "Plumbers",
      oneLine: "Install water, gas and drain piping in homes, hospitals and businesses.",
      outlook: { base: 29250, projected: 33370, growthPct: 14, openingsPerYear: 2940 },
      stateLicense: "contractor",
      licenseSummary:
        "Florida certifies plumbing contractors through the Construction Industry Licensing Board. Plumbers start under a licensed contractor, and counties and cities can issue journeyman plumber licenses that are honored statewide.",
      licenseSteps: [
        { title: "Apprentice", detail: "Work under a licensed plumbing contractor. No state license needed to start." },
        {
          title: "Journeyman license (county or city)",
          detail: "Where offered: a 75% score on a proctored exam, a registered apprenticeship or 12,000 hours of on-the-job training, and code coursework.",
        },
        { title: "4 years of experience", detail: "At least 1 of those years as a foreman or supervisor." },
        { title: "Certified plumbing contractor", detail: "Pass the state exam. Lets you contract plumbing work anywhere in Florida." },
      ],
      licenseAgency: FL_CILB,
      credentials: ["OSHA 10", "Backflow tester certification (optional)", "Medical gas certification (optional)"],
      payNote: "BLS counts plumbers, pipefitters and steamfitters as one occupation, so these pay and job numbers include pipefitters and sprinkler fitters.",
      overtime: "Plumbers are usually paid hourly, and service plumbers often earn overtime or after-hours pay for emergency calls.",
      ownBusiness:
        "To contract plumbing work in Florida, you need a certified or registered plumbing contractor license. That takes about 4 years of experience, 1 of them as a foreman.",
      hardParts: [
        "Crawlspaces, trenches and messy repair calls.",
        "Lifting heavy pipe and fixtures.",
        "Emergency calls on nights and weekends.",
      ],
      fit: { styles: ["build", "fix"], setting: "indoor", heights: false },
      training: [
        {
          name: "UA plumbing apprenticeships",
          kind: "union",
          where: "Including UA Local 123 (Tampa) and the Broward County Plumbers & Pipefitters JATC",
          detail: "Five-year paid union apprenticeships in plumbing, pipefitting and HVAC-R.",
          programSlug: "ua-plumber-pipefitter-apprenticeship",
        },
        ABC_FEC,
        ABC_GULF,
        FL_COLLEGES,
      ],
    },
    {
      soc: "47-2141",
      slug: "painter",
      name: "Painters",
      oneLine: "Prep and paint homes, offices, bridges and industrial tanks, inside and out.",
      outlook: { base: 31280, projected: 35040, growthPct: 12, openingsPerYear: 2920 },
      stateLicense: "none",
      licenseSummary:
        "Florida has no state painting license, and since a 2021 law, counties and cities can't require local painting licenses either.",
      licenseSteps: [
        { title: "Helper", detail: "Prep work: masking, sanding, patching and cleanup." },
        { title: "Painter", detail: "Spray, brush and roll on your own." },
        { title: "Specialist (optional)", detail: "Industrial coatings, bridges and tanks pay more and need extra training." },
        { title: "Crew lead or estimator", detail: "Run jobs and price new work." },
      ],
      credentials: ["OSHA 10", "EPA Lead-Safe (RRP) for homes built before 1978", "SSPC or AMPP coatings certifications (industrial work)"],
      overtime: "Painters are usually paid hourly. Work picks up in the dry season and when new buildings are finishing.",
      ownBusiness:
        "Painting is one of the easiest trades to start a business in: no state trade license, low startup costs. Lots of competition means reputation is everything.",
      hardParts: [
        "Ladders, lifts and scaffolds on exterior jobs.",
        "Fumes and dust, so ventilation and masks matter.",
        "Repetitive work that's hard on shoulders and knees.",
      ],
      fit: { styles: ["build"], setting: "mixed", heights: true },
      training: [
        {
          name: "Florida Painters Apprenticeship Program",
          kind: "open-shop",
          where: "Participating Florida painting contractors",
          detail: "A registered painter apprenticeship listed with the Florida Department of Education.",
          url: FL_APPRENTICESHIP.url,
          programSlug: "iupat-painter-apprenticeship",
        },
        {
          name: "Learn on the job",
          kind: "free-training",
          where: "Painting contractors statewide",
          detail: "Most painters learn as helpers on a crew. No license is needed to start.",
        },
      ],
    },
    {
      soc: "47-2051",
      slug: "concrete-worker",
      name: "Concrete finishers",
      oneLine: "Place, level and finish concrete for slabs, sidewalks, foundations and decks.",
      outlook: { base: 15180, projected: 17240, growthPct: 14, openingsPerYear: 1280 },
      stateLicense: "none",
      licenseSummary:
        "Florida has no license for concrete finishers who work for a contractor. Contracting concrete work yourself takes a state general, building or residential contractor license.",
      licenseSteps: [
        { title: "Laborer or helper", detail: "Set forms, move concrete and learn the finish." },
        { title: "Finisher", detail: "Screed, float and trowel slabs on your own." },
        { title: "Lead finisher", detail: "Run the pour and the crew." },
        { title: "Foreman or contractor (optional)", detail: "Contracting concrete work needs a state contractor license." },
      ],
      credentials: ["OSHA 10", "ACI Concrete Field Testing Technician (optional)", "NCCER (optional)"],
      overtime: "Finishers are paid hourly, and pours start before dawn and run until the slab is done, so long days are normal.",
      ownBusiness:
        "Concrete businesses are common, but in Florida contracting concrete work requires a general, building or residential contractor license.",
      hardParts: [
        "Hard on knees and backs. A lot of kneeling and bending.",
        "Early starts in Florida heat, since concrete sets fast when it's hot.",
        "Weather decides the schedule.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: false },
      training: [
        FL_APPRENTICE_FINDER,
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
      outlook: { base: 6110, projected: 6820, growthPct: 12, openingsPerYear: 520 },
      stateLicense: "contractor",
      licenseSummary:
        "Workers who hang and finish drywall for a contractor need no license. To contract drywall work yourself, your county or city building department can require a state license that covers it before it issues a permit, such as Florida's gypsum drywall specialty license or a general, building or residential contractor license.",
      licenseSteps: [
        { title: "Helper", detail: "Carry board, cut and screw sheets, learn taping." },
        { title: "Hanger or finisher", detail: "Hang board or tape and mud on your own." },
        { title: "Lead or foreman", detail: "Run a crew on commercial or home jobs." },
        { title: "Drywall contractor (optional)", detail: "State certification after about 4 years of experience, 1 as a foreman, and an exam." },
      ],
      licenseAgency: FL_LOCAL_LICENSES,
      credentials: ["OSHA 10", "NCCER (optional)"],
      overtime: "Drywall crews are often paid hourly or by the piece. Busy building seasons bring long weeks.",
      ownBusiness:
        "Many drywall workers become subcontractors. Check with your local building department, which can require a state contractor license that covers drywall.",
      hardParts: [
        "Heavy sheets, lifting overhead and dust.",
        "Stilts and scaffolds for ceilings.",
        "Piece-rate pay rewards speed, which can wear you down.",
      ],
      fit: { styles: ["build"], setting: "indoor", heights: false },
      training: [
        {
          name: "Carpenters union (UBC) training",
          kind: "union",
          where: "Including the South Florida Carpenters JATC in Fort Lauderdale",
          detail: "Carpenter apprentices learn interior systems, including metal framing and drywall.",
          programSlug: "ubc-carpenter-apprenticeship",
        },
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
      outlook: { base: 2120, projected: 2450, growthPct: 16, openingsPerYear: 210 },
      stateLicense: "worker-certification",
      licenseSummary:
        "Florida certifies the mechanics themselves. A certified elevator technician needs a state elevator certificate of competency, earned through 4 years of verified experience and an exam, or by finishing a registered elevator mechanic apprenticeship.",
      licenseSteps: [
        { title: "Elevator helper", detail: "Hired by an elevator company. Works under the direct supervision of a certificate holder." },
        { title: "Apprenticeship", detail: "NEIEP or another registered elevator mechanic apprenticeship." },
        { title: "Certificate of competency", detail: "4 years of experience verified by registered elevator companies plus an exam, or a finished registered apprenticeship." },
        { title: "Yearly renewal", detail: "Renewed each year with 8 hours of continuing education." },
      ],
      licenseAgency: FL_ELEVATOR,
      credentials: ["Florida elevator certificate of competency", "NEIEP training"],
      overtime: "Elevator mechanics are usually paid hourly, and service mechanics earn overtime and call-out pay for nights and weekends when someone is stuck.",
      ownBusiness:
        "Elevator companies must register with the state and employ certified technicians, so most mechanics work for established companies.",
      hardParts: [
        "Shafts, pits and machine rooms: tight, dark and high up.",
        "Electrical, mechanical and hydraulic hazards in one job.",
        "Union recruitments open only now and then, so getting in can take patience.",
      ],
      fit: { styles: ["fix", "machines"], setting: "indoor", heights: true },
      training: [
        {
          name: "Elevator Constructors union (IUEC) through NEIEP",
          kind: "union",
          where: "IUEC locals in Florida's major metro areas",
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
      outlook: { base: 1860, projected: 2170, growthPct: 17, openingsPerYear: 160 },
      stateLicense: "none",
      licenseSummary:
        "Florida has no state flooring license, and since a 2021 law, counties and cities can't require local flooring licenses either.",
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
          name: "Floor coverer apprenticeship (Carpenters union)",
          kind: "union",
          where: "South Florida Carpenters JATC, Fort Lauderdale",
          detail: "A registered floor coverer apprenticeship run by the carpenters' training center.",
          url: "https://www.broward.org/EconDev/Pages/ApprenticeshipPartners.aspx",
          programSlug: "ubc-carpenter-apprenticeship",
        },
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
      outlook: { base: 6190, projected: 7080, growthPct: 15, openingsPerYear: 620 },
      stateLicense: "contractor",
      licenseSummary:
        "Glaziers who work for a contractor need no license. To contract window and glass work yourself, your county or city building department can require a state license that covers it before it issues a permit, such as Florida's glass and glazing specialty license or a general, building or residential contractor license.",
      licenseSteps: [
        { title: "Apprentice or helper", detail: "Carry and set glass, learn sealants and framing." },
        { title: "Glazier", detail: "Install storefronts, windows and curtain wall on your own." },
        { title: "Foreman", detail: "Run the glass crew on a building." },
        { title: "Glazing contractor (optional)", detail: "State certification after about 4 years of experience, 1 as a foreman, and an exam." },
      ],
      licenseAgency: FL_LOCAL_LICENSES,
      credentials: ["OSHA 10", "Aerial lift and fall protection training"],
      overtime: "Glaziers are usually paid hourly, with long weeks when a building is closing in.",
      ownBusiness:
        "Window and storefront companies are common in Florida's building market. Check with your local building department, which can require a state contractor license that covers glazing.",
      hardParts: [
        "Heavy, fragile glass and sharp edges.",
        "Work on lifts and swing stages, high on building faces.",
        "Florida's hurricane codes make installs exacting.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: true },
      training: [
        FL_APPRENTICE_FINDER,
        {
          name: "Learn on the job",
          kind: "free-training",
          where: "Glass and window contractors statewide",
          detail: "Many glaziers start as helpers with a window or storefront installer.",
        },
      ],
    },
    {
      soc: "47-2131",
      slug: "insulation-installer",
      name: "Insulation installers",
      oneLine: "Seal and insulate walls, attics, pipes and ductwork to keep buildings efficient.",
      outlook: { base: 1970, projected: 2220, growthPct: 13, openingsPerYear: 190 },
      stateLicense: "none",
      licenseSummary: "Florida has no state license for insulation installers.",
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
        "Florida attics are brutally hot most of the year.",
        "Itchy fibers and spray chemicals, so protective gear matters.",
        "Cramped crawlspaces and attics.",
      ],
      fit: { styles: ["build"], setting: "indoor", heights: false },
      training: [
        {
          name: "Asbestos Workers (Heat & Frost Insulators) Local 60 JAC",
          kind: "union",
          where: "Miami",
          detail: "Registered insulation worker apprenticeship for mechanical insulation on pipes and equipment.",
          url: "https://www.broward.org/EconDev/Pages/ApprenticeshipPartners.aspx",
        },
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
      outlook: { base: 2080, projected: 2400, growthPct: 15, openingsPerYear: 210 },
      stateLicense: "none",
      licenseSummary:
        "Florida has no license for ironworkers who work for a contractor. Structural steel contracting falls under the state's general and building contractor licenses.",
      licenseSteps: [
        { title: "Apprentice", detail: "Rebar, rigging and connecting steel under journey workers." },
        { title: "Journey ironworker", detail: "Structural, reinforcing or ornamental work on your own." },
        { title: "Certified rigger or welder (optional)", detail: "Rigging and welding certifications raise pay." },
        { title: "Foreman", detail: "Run the raising gang or rebar crew." },
      ],
      credentials: ["OSHA 10", "AWS structural welding (optional)", "Rigger and signal person certification (optional)"],
      overtime: "Ironworkers are paid hourly, with long days when steel erection is on the critical path.",
      ownBusiness: "Steel erection companies need a Florida general or building contractor license, heavy equipment and big insurance policies, so most ironworkers work for established firms.",
      hardParts: [
        "Working at serious heights on open steel.",
        "Heavy, physical work in sun and heat.",
        "Work follows the big projects, which can mean travel.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: true },
      training: [
        {
          name: "Ironworkers apprenticeships",
          kind: "union",
          where: "Including the Mid Florida Ironworkers JAC in Orlando",
          detail: "Paid union apprenticeships in structural, reinforcing and ornamental ironwork.",
          url: FL_APPRENTICESHIP.url,
          programSlug: "ironworkers-apprenticeship",
        },
        FL_COLLEGES,
      ],
    },
    {
      soc: "47-2021",
      slug: "mason",
      name: "Masons",
      oneLine: "Lay brick, block and stone for walls, chimneys, schools and storefronts.",
      outlook: { base: 5000, projected: 5760, growthPct: 15, openingsPerYear: 460 },
      stateLicense: "none",
      licenseSummary:
        "Florida has no license for masons who work for a contractor. Contracting masonry work yourself takes a state general, building or residential contractor license.",
      licenseSteps: [
        { title: "Mason tender or helper", detail: "Mix mortar, stock materials and build scaffold." },
        { title: "Apprentice mason", detail: "Lay block and brick under a journey mason." },
        { title: "Mason", detail: "Lay to the line on your own. Concrete block is the backbone of Florida building." },
        { title: "Foreman or contractor (optional)", detail: "Contracting masonry needs a state contractor license." },
      ],
      credentials: ["OSHA 10", "NCCER Masonry (optional)"],
      overtime: "Masons are usually paid hourly, with long days in good weather. Heavy rain stops the work.",
      ownBusiness:
        "Masonry is a classic trade business, but in Florida contracting masonry work requires a general, building or residential contractor license.",
      hardParts: [
        "Heavy block all day: hard on backs and shoulders.",
        "Outdoor work in heat, on scaffolds.",
        "Rain stops the work.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: true },
      training: [
        FL_COLLEGES,
        {
          name: "Bricklayers union (BAC)",
          kind: "union",
          where: "Check BAC for the nearest Florida training",
          detail: "Union apprenticeships for brick, block and stone masons.",
          programSlug: "bac-bricklayer-apprenticeship",
        },
        {
          name: "Learn on the job",
          kind: "free-training",
          where: "Masonry contractors statewide",
          detail: "Many masons start as tenders on a block crew.",
        },
      ],
    },
    {
      soc: "49-9044",
      slug: "millwright",
      name: "Millwrights",
      oneLine: "Install, align and repair the big machines in factories, power plants and distribution centers.",
      outlook: { base: 800, projected: 860, growthPct: 8, openingsPerYear: 80 },
      stateLicense: "none",
      licenseSummary: "Florida has no state license for millwrights. Employers hire on training, experience and precision.",
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
        {
          name: "Carpenters union (UBC) millwright training",
          kind: "union",
          where: "Check the UBC for the nearest Florida training center",
          detail: "Union millwright apprenticeships through the carpenters' training system.",
          programSlug: "ubc-millwright-apprenticeship",
        },
        FL_COLLEGES,
      ],
    },
    {
      soc: "47-2152",
      slug: "pipefitter",
      name: "Pipefitters & steamfitters",
      oneLine: "Build the high-pressure piping that moves steam, gas and chemicals through plants, hospitals and big buildings.",
      stateLicense: "contractor",
      licenseSummary:
        "Pipefitters work under a licensed contractor. Counties and cities can issue journeyman pipe fitting licenses, and contracting the work takes a state mechanical or plumbing contractor license.",
      licenseSteps: [
        { title: "Apprentice", detail: "Five-year union or open-shop apprenticeship while you work." },
        {
          title: "Journeyman license (county or city)",
          detail: "Where offered: a 75% score on a proctored exam, a registered apprenticeship or 12,000 hours of on-the-job training, and code coursework.",
        },
        { title: "Welding or rigging certifications", detail: "Pipe welding certifications raise pay." },
        { title: "Mechanical contractor (optional)", detail: "4 years of experience, 1 as a foreman, and the state exam." },
      ],
      licenseAgency: FL_489_1455,
      credentials: ["OSHA 10", "Pipe welding certifications (optional)", "Medical gas certification (optional)"],
      payNote:
        "BLS counts plumbers, pipefitters and steamfitters as one occupation, so this pay matches plumbers' and there is no separate Florida job count for pipefitters.",
      sharedStatsWith: "plumber",
      overtime: "Pipefitters are usually paid hourly, with heavy overtime during plant shutdowns and big commercial builds.",
      ownBusiness: "Mechanical contracting in Florida needs a certified or registered mechanical contractor license, plus crews and insurance.",
      hardParts: [
        "Heavy pipe, hot work and confined spaces.",
        "Industrial jobs can mean travel and long shutdown shifts.",
        "Plant work comes with strict safety rules.",
      ],
      fit: { styles: ["build", "fix"], setting: "indoor", heights: true },
      training: [
        {
          name: "UA pipefitting apprenticeships",
          kind: "union",
          where: "Including UA Local 123 (Tampa), Broward County Plumbers & Pipefitters JATC and ACRA-Local 725 JATC (Miami)",
          detail: "Five-year paid union apprenticeships in pipefitting and HVAC-R.",
          programSlug: "ua-plumber-pipefitter-apprenticeship",
        },
        ABC_GULF,
        FL_COLLEGES,
      ],
    },
    {
      soc: "47-2161",
      slug: "plasterer-stucco-mason",
      name: "Plasterers & stucco masons",
      oneLine: "Apply plaster, stucco and EIFS finishes to walls and building exteriors.",
      outlook: { base: 2490, projected: 2830, growthPct: 13, openingsPerYear: 230 },
      stateLicense: "none",
      licenseSummary:
        "Florida requires no license for plaster, stucco or lath work, and since a 2021 law, counties and cities can't require local licenses for it either.",
      licenseSteps: [
        { title: "Helper", detail: "Mix material, set lath and scaffolds." },
        { title: "Plasterer", detail: "Apply base and finish coats on your own." },
        { title: "Specialist (optional)", detail: "EIFS systems and decorative finishes." },
        { title: "Crew lead", detail: "Run jobs and check work." },
      ],
      credentials: ["OSHA 10", "Manufacturer EIFS training (optional)"],
      payNote:
        "BLS publishes Florida pay for this small trade but not a statewide job count, so the job numbers come from the state projection.",
      overtime: "Plasterers are usually paid hourly, with long days in dry weather, since rain affects how stucco cures.",
      ownBusiness:
        "Stucco is one of Florida's most common exterior finishes, and the trade needs no state license, so many experienced plasterers run their own crews.",
      hardParts: [
        "Scaffold work in full sun.",
        "Heavy, wet material and repetitive motion.",
        "Weather decides the schedule.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: true },
      training: [
        {
          name: "Learn on the job",
          kind: "free-training",
          where: "Stucco and plastering contractors statewide",
          detail: "Most plasterers learn as helpers on a crew. No license is needed to start.",
        },
      ],
    },
    {
      soc: "47-2181",
      slug: "roofer",
      name: "Roofers",
      oneLine: "Install and repair shingle, metal and flat commercial roofs.",
      outlook: { base: 28840, projected: 34280, growthPct: 19, openingsPerYear: 2690 },
      stateLicense: "contractor",
      licenseSummary:
        "Florida licenses roofing contractors through the Construction Industry Licensing Board. Roofers who work for a licensed contractor need no license of their own.",
      licenseSteps: [
        { title: "Helper", detail: "Tear-off, carrying material and cleanup." },
        { title: "Roofer", detail: "Install shingle, tile, metal or flat roofs on your own." },
        { title: "Foreman", detail: "Run crews and check the work against code." },
        { title: "Certified roofing contractor (optional)", detail: "4 years of experience, 1 as a foreman, and the state exam." },
      ],
      licenseAgency: FL_CILB,
      credentials: ["OSHA 10", "Fall protection training", "Manufacturer certifications (optional)"],
      overtime: "Roofers are usually paid hourly or by the square. Storm seasons can bring long stretches of repair work.",
      ownBusiness:
        "To contract roofing work in Florida, you need a certified or registered roofing contractor license. Plenty of roofers run their own companies after earning it.",
      hardParts: [
        "Working at heights on hot roofs, one of the most dangerous jobs in construction.",
        "Florida sun on dark roofing is punishing.",
        "Heavy bundles and long days.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: true },
      training: [
        ABC_FEC,
        ABC_GULF,
        {
          name: "Roofers union training",
          kind: "union",
          where: "Check the Roofers union for Florida locals",
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
      outlook: { base: 10100, projected: 11370, growthPct: 13, openingsPerYear: 980 },
      stateLicense: "contractor",
      licenseSummary:
        "Florida certifies sheet metal contractors through the Construction Industry Licensing Board. Workers start under a licensed contractor.",
      licenseSteps: [
        { title: "Apprentice", detail: "Fabrication and duct installation under journey workers." },
        { title: "Journey sheet metal worker", detail: "Layout, fabrication and installation on your own." },
        { title: "Specialist (optional)", detail: "Testing and balancing, architectural metal or service." },
        { title: "Sheet metal contractor (optional)", detail: "4 years of experience, 1 as a foreman, and the state exam." },
      ],
      licenseAgency: FL_CILB,
      credentials: ["OSHA 10", "NCCER Sheet Metal (optional)"],
      overtime: "Sheet metal workers are usually paid hourly, with long weeks as buildings near completion.",
      ownBusiness: "Contracting sheet metal work in Florida takes a certified or registered sheet metal or mechanical contractor license.",
      hardParts: [
        "Sharp edges and heavy duct.",
        "Ladders and lifts for overhead ductwork.",
        "Hot attics and ceilings.",
      ],
      fit: { styles: ["build"], setting: "indoor", heights: true },
      training: [
        ABC_GULF,
        {
          name: "SMART sheet metal apprenticeships",
          kind: "union",
          where: "Check SMART for the nearest Florida local",
          detail: "Union sheet metal apprenticeships.",
          programSlug: "smart-sheet-metal-apprenticeship",
        },
        FL_COLLEGES,
      ],
    },
    {
      soc: "47-2231",
      slug: "solar-installer",
      name: "Solar installers",
      oneLine: "Mount and wire solar panels on roofs and large ground-mounted solar farms.",
      outlook: { base: 1920, projected: 3670, growthPct: 91, openingsPerYear: 410 },
      stateLicense: "contractor",
      licenseSummary:
        "Florida certifies solar contractors through the Construction Industry Licensing Board. Installers work under a licensed solar, electrical or other qualified contractor.",
      licenseSteps: [
        { title: "Installer", detail: "Mount racking and panels under a licensed contractor." },
        { title: "Lead installer", detail: "Run the crew on residential or commercial jobs." },
        { title: "NABCEP certification (optional)", detail: "National credentials that employers value." },
        { title: "Certified solar contractor (optional)", detail: "4 years of experience, 1 as a supervisor, and the state exam." },
      ],
      licenseAgency: FL_CILB,
      credentials: ["OSHA 10", "NABCEP PV Associate (optional)", "Fall protection training"],
      payNote: "Florida projects this small trade to nearly double by 2034, the fastest growth on this page, starting from a small base.",
      overtime: "Installers are usually paid hourly. Utility-scale solar farm projects often run long weeks, sometimes far from home.",
      ownBusiness:
        "Solar companies in Florida need a certified solar contractor (or electrical contractor) license, plus insurance and a way to find customers.",
      hardParts: [
        "Roof work in full sun.",
        "Electrical hazards once panels are wired.",
        "The industry rises and falls with incentives and prices.",
      ],
      fit: { styles: ["build"], setting: "outdoor", heights: true },
      training: [
        {
          name: "FIU Construction Apprenticeship Program",
          kind: "open-shop",
          where: "Miami-Dade",
          detail: "A registered solar energy technician apprenticeship listed with Broward County's apprenticeship partners.",
          url: "https://www.broward.org/EconDev/Pages/ApprenticeshipPartners.aspx",
          programSlug: "nabcep-pv-associate-certification",
        },
        {
          name: "IBEW electrical JATCs",
          kind: "union",
          where: "Major Florida metros",
          detail: "Electrical apprenticeships that include solar work.",
          programSlug: "ibew-neca-electrical-apprenticeship",
        },
        FL_COLLEGES,
      ],
    },
    {
      soc: "47-2152",
      slug: "sprinkler-fitter",
      name: "Sprinkler fitters",
      oneLine: "Install and test the fire sprinkler systems that every new commercial building needs.",
      stateLicense: "contractor",
      licenseSummary:
        "Florida's State Fire Marshal licenses fire protection contractors. Most contractor classes require 4 years of full-time experience with a licensed fire protection contractor and an exam. Fitters start by working for a licensed contractor.",
      licenseSteps: [
        { title: "Apprentice fitter", detail: "Work for a licensed sprinkler contractor. Apprenticeships run four to five years." },
        { title: "Journey fitter", detail: "Installs and tests systems on your own." },
        { title: "Water-based inspector permit (optional)", detail: "For inspection work, with NICET Level II inspection and testing certification." },
        { title: "Fire protection contractor (optional)", detail: "4 years of experience for Contractor I, II or III, then the state exam." },
      ],
      licenseAgency: FL_FIRE,
      credentials: ["NICET fire protection certifications", "Backflow tester certification (optional)", "OSHA 10"],
      payNote:
        "BLS counts sprinkler fitters with plumbers and pipefitters, so this pay matches plumbers' and there is no separate Florida job count for sprinkler fitters.",
      sharedStatsWith: "plumber",
      overtime: "Fitters are usually paid hourly, with overtime as buildings race to pass their fire inspection before opening.",
      ownBusiness: "Opening a sprinkler company in Florida takes a State Fire Marshal contractor license, insurance and years of experience.",
      hardParts: [
        "Most of the work is overhead, on lifts and ladders.",
        "Heavy pipe and fittings, all day.",
        "Hot ceilings in unfinished buildings.",
      ],
      fit: { styles: ["build"], setting: "indoor", heights: true },
      training: [
        {
          name: "Sprinkler Fitters JATC (UA Local 821)",
          kind: "union",
          where: "West Palm Beach, Orlando and Tampa area",
          detail: "Five-year union apprenticeship, with classes at partner colleges such as Orange Technical College and Hillsborough College.",
          url: "https://www.hccfl.edu/academics/associate-science/apprenticeships/fire-sprinkler-fitter-apprenticeship",
        },
        ABC_GULF,
      ],
    },
    {
      soc: "47-2044",
      slug: "tile-setter",
      name: "Tile setters",
      oneLine: "Set tile and stone in showers, kitchens, lobbies and floors.",
      outlook: { base: 6690, projected: 7890, growthPct: 18, openingsPerYear: 600 },
      stateLicense: "none",
      licenseSummary:
        "Florida has no state tile license, and since a 2021 law, counties and cities can't require local tile licenses either.",
      licenseSteps: [
        { title: "Helper", detail: "Mix thinset, cut tile and prep floors." },
        { title: "Tile setter", detail: "Set floors, walls and showers on your own." },
        { title: "Certified installer (optional)", detail: "Certified Tile Installer (CTI) through the Ceramic Tile Education Foundation." },
        { title: "Lead or subcontractor", detail: "Run jobs for builders and remodelers." },
      ],
      credentials: ["OSHA 10", "Certified Tile Installer (CTI, optional)"],
      overtime: "Tile setters are paid hourly or by the square foot. Remodel and new-home booms bring long weeks.",
      ownBusiness: "Tile is a common one-person or small-crew business in Florida, with no state trade license. Reputation and photos of past work bring the jobs.",
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
        {
          name: "Bricklayers union (BAC) tile training",
          kind: "union",
          where: "Check BAC for the nearest Florida training",
          detail: "Union tile and marble setter apprenticeships.",
          programSlug: "bac-bricklayer-apprenticeship",
        },
      ],
    },
    {
      soc: "47-2181",
      slug: "waterproofing-installer",
      name: "Waterproofing installers",
      oneLine: "Seal foundations, plazas and parking decks against water before they get buried or built over.",
      stateLicense: "none",
      licenseSummary:
        "Florida has no license for waterproofing workers. Waterproofing done as part of roofing falls under a roofing contractor license.",
      licenseSteps: [
        { title: "Helper", detail: "Surface prep and carrying material." },
        { title: "Installer", detail: "Apply membranes, coatings and sealants on your own." },
        { title: "Specialist (optional)", detail: "Manufacturer certifications for specific systems." },
        { title: "Crew lead", detail: "Run jobs and test the work." },
      ],
      credentials: ["OSHA 10", "Manufacturer certifications (optional)"],
      payNote:
        "BLS has no separate waterproofing category, so this shows roofers' pay, the closest group, and there is no separate Florida job count.",
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
          name: "Roofers union training",
          kind: "union",
          where: "Check the Roofers union for Florida locals",
          detail: "Union roofing and waterproofing apprenticeships.",
          programSlug: "roofers-union-apprenticeship",
        },
        {
          name: "Learn on the job",
          kind: "free-training",
          where: "Waterproofing contractors statewide",
          detail: "Most installers learn as helpers on a crew.",
        },
      ],
    },
  ],
  highSchool: [
    {
      title: "Free college courses through career dual enrollment",
      detail:
        "Florida high school students can take career certificate courses at technical colleges and state colleges while still in high school. Public school students pay no tuition, registration or lab fees, and get their course materials free. Career certificate courses typically require a 2.0 unweighted GPA.",
      source: { label: "Fla. Stat. 1007.271, dual enrollment programs", url: "https://www.flsenate.gov/Laws/Statutes/2025/1007.271" },
    },
    {
      title: "Gold Seal Vocational Scholars",
      detail:
        "A Bright Futures scholarship for students headed to a technical program. It requires 3 career and technical credits in one program, a 3.0 weighted GPA in core courses and a 3.5 unweighted GPA in those career courses, plus 30 volunteer hours, 100 paid work hours, or a mix.",
      source: { label: "Florida Lottery, Bright Futures requirements", url: "https://floridalottery.com/education/bright-futures" },
    },
    {
      title: "Gold Seal CAPE Scholars",
      detail:
        "Students who earn industry certifications in high school can qualify by earning at least 5 college credit hours through them. There is no GPA requirement, and the award can pay toward a career certificate or degree program.",
      source: { label: "Florida Lottery, Bright Futures requirements", url: "https://floridalottery.com/education/bright-futures" },
    },
    {
      title: "Registered preapprenticeships",
      detail:
        "Florida registers preapprenticeship programs, some of them run with school districts, that lead into a paid apprenticeship. Registered preapprenticeship programs grew 112% over six years.",
      source: {
        label: "CareerSource Northeast Florida, 2024-2025 apprenticeship report",
        url: "https://careersourcenortheastflorida.com/florida-sees-record-surge-in-apprenticeships-thousands-complete-training/",
      },
    },
  ],
  adults: [
    {
      title: "Registered apprenticeships",
      detail:
        "The Florida Department of Education registers apprenticeships in the state. Florida had 344 active apprenticeship programs in the 2024-25 report, and construction trades make up most current apprenticeships.",
      source: FL_APPRENTICESHIP,
    },
    {
      title: "Technical colleges and state colleges",
      detail:
        "Career certificate programs in trades like electrical, HVAC, plumbing and welding run at school district technical colleges and Florida College System campuses. Programs and costs differ by campus.",
      source: { label: "Florida Department of Education, Career and Adult Education", url: "https://www.fldoe.org/academics/career-adult-edu/" },
    },
    {
      title: "CareerSource Florida",
      detail:
        "The state's workforce system can help pay for approved training for eligible adults, such as people who are unemployed, laid off or low-income.",
      source: { label: "CareerSource Florida", url: "https://careersourceflorida.com/" },
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Florida statewide, May 2025", url: "https://www.bls.gov/oes/" },
    {
      label: "Plasterers and stucco masons, Florida wages, May 2025 (BLS via O*NET)",
      url: "https://www.onetonline.org/link/localwages/47-2161.00?st=FL",
    },
    {
      label: "Florida long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
      url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=FL",
    },
    FL_489_111,
    FL_489_511,
    FL_489_5335,
    FL_489_1455,
    { label: "HB 735 (2021), Laws of Florida ch. 2021-214: local licensing of specialty trades preempted", url: "https://laws.flrules.org/2021/214" },
    FL_LOCAL_LICENSES,
    { label: "DBPR: local governments may require a state license only for work that matches a CILB license type (s. 489.117(4), F.S.)", url: "https://www2.myfloridalicense.com/?p=15472" },
    FL_CILB,
    FL_ELEVATOR,
    FL_FIRE,
    { label: "Fla. Stat. 633.318, fire protection contractor certificates", url: "https://m.flsenate.gov/Statutes/633.318" },
    { label: "Florida Department of Education: 344 active apprenticeship programs (Jan. 2026)", url: "https://www.fldoe.org/newsroom/latest-news/florida-celebrates-record-growth-in-apprenticeship-and-preapprenticeship-programs.stml" },
    { label: "Florida Department of Education, registered apprenticeship sponsors by company", url: "https://www.fldoe.org/core/fileparse.php/5626/urlt/business-by-company.pdf" },
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
