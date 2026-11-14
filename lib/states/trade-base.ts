// Shared, state-neutral text for the 25 trades in every state guide.
// Nothing here may name a state or make a state-specific claim: licensing,
// outlook, local training, business rules and anything local live in each
// lib/states/<state>.ts file, which builds trades with trade().

import type { LicenseStep, StateTrade, TrainingOption } from "@/lib/state-guides";

type Base = Pick<StateTrade, "soc" | "slug" | "name" | "oneLine" | "credentials" | "overtime" | "hardParts" | "fit" | "sharedStatsWith"> & {
  steps: LicenseStep[]; // career ladder when the state has no trade license
  ownBusiness: string; // generic, used unless the state file overrides it
  payNote?: (state: string) => string;
};

const B: Record<string, Base> = {
  laborer: {
    soc: "47-2061", slug: "laborer", name: "Construction laborers",
    oneLine: "The crew that keeps a site moving: digging, hauling, setting up, cleaning up and helping every other trade.",
    credentials: ["OSHA 10", "Flagger or traffic control certification (common on road jobs)", "NCCER Core (optional)"],
    overtime: "Laborers are usually paid hourly, with overtime common when a project is behind or a concrete pour runs long. Rain days can cut a week short.",
    hardParts: ["The most physical job on site: lifting, digging and on your feet all day.", "Outdoor work in summer heat, with early starts.", "Starting pay is lower than most trades, so moving up matters."],
    fit: { styles: ["build"], setting: "outdoor", heights: false },
    steps: [
      { title: "Laborer", detail: "Start on a crew. Many employers want OSHA 10 safety training first." },
      { title: "Skilled laborer", detail: "Run small equipment, set forms, handle traffic control or pipe work." },
      { title: "Lead laborer or foreman", detail: "Run a crew on site." },
      { title: "Move into a trade (optional)", detail: "Many laborers switch into an apprenticeship once they know which trade they like." },
    ],
    ownBusiness: "Some laborers grow into small cleanup or site-prep businesses.",
  },
  electrician: {
    soc: "47-2111", slug: "electrician", name: "Electricians",
    oneLine: "Install and repair wiring, panels and power systems in homes, offices, plants and data centers.",
    credentials: ["OSHA 10 (common first card)", "NCCER Electrical levels (optional, widely recognized)"],
    overtime: "Most electricians are paid by the hour, so hours past 40 a week earn time-and-a-half. Data center builds and plant shutdowns often run long weeks.",
    hardParts: ["Live electrical work carries shock and arc-flash risk, so safety rules are strict and non-negotiable.", "Ladders, lifts and tight spaces like attics and crawlspaces.", "Commercial and industrial jobs can mean long drives to wherever the project is."],
    fit: { styles: ["build", "fix"], setting: "mixed", heights: true },
    steps: [],
    ownBusiness: "Small residential and service shops are a common first business.",
  },
  "equipment-operator": {
    soc: "47-2073", slug: "equipment-operator", name: "Heavy equipment operators",
    oneLine: "Run excavators, dozers, loaders and graders on road, site and utility jobs.",
    credentials: ["OSHA 10", "NCCER Heavy Equipment Operations (optional)", "NCCCO crane certification (for crane work)", "Class A CDL (for hauling)"],
    overtime: "Operators are paid hourly, with long days in dry weather. Road and site work slows in heavy rain.",
    hardParts: ["Long hours in the seat, often in heat, dust and noise.", "Work follows the projects, which can mean long commutes.", "Rain stops the work, so paychecks can swing week to week."],
    fit: { styles: ["machines"], setting: "outdoor", heights: false },
    steps: [
      { title: "Oiler or trainee", detail: "Start by helping on site and learning equipment care." },
      { title: "Operator", detail: "Run smaller machines, then move up to excavators, dozers and graders." },
      { title: "Certified crane operator (optional)", detail: "Cranes need NCCCO or similar certification under OSHA rules." },
      { title: "Lead operator or foreman", detail: "Run the earthwork on a job." },
    ],
    ownBusiness: "Some operators buy a machine and start a small grading or land-clearing business. Equipment is expensive, so most start with used machines and steady customers.",
  },
  welder: {
    soc: "51-4121", slug: "welder", name: "Welders",
    oneLine: "Join and cut metal for structures, pipelines, equipment and manufactured products.",
    credentials: ["AWS certifications", "OSHA 10", "NCCER Welding (optional)"],
    overtime: "Welders are usually paid hourly, with overtime common during plant shutdowns and on pipeline and industrial jobs.",
    hardParts: ["Heat, fumes and bright arc light, so protective gear stays on.", "Awkward positions: overhead, in tight spaces, sometimes up high.", "Pay depends heavily on certifications, so testing never really stops."],
    fit: { styles: ["build"], setting: "mixed", heights: false },
    steps: [
      { title: "Training", detail: "A technical college certificate or on-the-job training." },
      { title: "Entry welder", detail: "Fit-up and production welding while you build skill." },
      { title: "Certified welder", detail: "Pass AWS or employer weld tests for the processes and positions a job needs." },
      { title: "Specialist or inspector (optional)", detail: "Pipe welding, structural steel or AWS Certified Welding Inspector." },
    ],
    ownBusiness: "Some welders start mobile welding or fabrication shops. It takes a rig, insurance and a reputation for clean, passing welds.",
    payNote: () => "This pay includes welders in manufacturing, not just construction, because BLS reports one welder category across all industries.",
  },
  "hvac-technician": {
    soc: "49-9021", slug: "hvac-technician", name: "HVAC technicians",
    oneLine: "Install and service heating, cooling and refrigeration systems. Steady work through hot summers.",
    credentials: ["EPA Section 608 (required for refrigerants)", "NATE certification (optional)", "OSHA 10"],
    overtime: "Technicians are usually paid hourly, and summer is the busy season: long days and on-call shifts when air conditioners fail.",
    hardParts: ["Hot attics and rooftops in summer, when the calls pile up.", "Electrical, refrigerant and ladder hazards.", "On-call nights and weekends during heat waves and cold snaps."],
    fit: { styles: ["fix"], setting: "mixed", heights: true },
    steps: [],
    ownBusiness: "Service shops are a common first business.",
  },
  carpenter: {
    soc: "47-2031", slug: "carpenter", name: "Carpenters",
    oneLine: "Frame, form and finish: from house framing to concrete forms on high-rises.",
    credentials: ["OSHA 10", "NCCER Carpentry levels (optional)"],
    overtime: "Carpenters are usually paid hourly, with long weeks when a building is racing to get dried in.",
    hardParts: ["Physical work outdoors in heat and storms.", "Framing and forming mean working at heights.", "Housing slowdowns hit carpenters first."],
    fit: { styles: ["build"], setting: "outdoor", heights: true },
    steps: [
      { title: "Apprentice or helper", detail: "Start on a framing, forming or finish crew." },
      { title: "Carpenter", detail: "Work on your own: framing, forms, doors, trim." },
      { title: "Lead carpenter or foreman", detail: "Run a crew and read the plans." },
      { title: "Contractor license (optional)", detail: "For those who want to run their own jobs above the state's dollar limit." },
    ],
    ownBusiness: "Many carpenters start remodeling or trim businesses.",
  },
  plumber: {
    soc: "47-2152", slug: "plumber", name: "Plumbers",
    oneLine: "Install water, gas and drain piping in homes, hospitals and businesses.",
    credentials: ["OSHA 10", "Backflow tester certification (optional)", "Medical gas certification (optional)"],
    overtime: "Plumbers are usually paid hourly, and service plumbers often earn overtime or after-hours pay for emergency calls.",
    hardParts: ["Crawlspaces, trenches and messy repair calls.", "Lifting heavy pipe and fixtures.", "Emergency calls on nights and weekends."],
    fit: { styles: ["build", "fix"], setting: "indoor", heights: false },
    steps: [],
    ownBusiness: "",
    payNote: () => "BLS counts plumbers, pipefitters and steamfitters as one occupation, so these pay and job numbers include pipefitters and sprinkler fitters.",
  },
  painter: {
    soc: "47-2141", slug: "painter", name: "Painters",
    oneLine: "Prep and paint homes, offices, bridges and industrial tanks, inside and out.",
    credentials: ["OSHA 10", "EPA Lead-Safe (RRP) for homes built before 1978", "SSPC or AMPP coatings certifications (industrial work)"],
    overtime: "Painters are usually paid hourly. Work picks up in good weather and when new buildings are finishing.",
    hardParts: ["Ladders, lifts and scaffolds on exterior jobs.", "Fumes and dust, so ventilation and masks matter.", "Repetitive work that's hard on shoulders and knees."],
    fit: { styles: ["build"], setting: "mixed", heights: true },
    steps: [
      { title: "Helper", detail: "Prep work: masking, sanding, patching and cleanup." },
      { title: "Painter", detail: "Spray, brush and roll on your own." },
      { title: "Specialist (optional)", detail: "Industrial coatings, bridges and tanks pay more and need extra training." },
      { title: "Crew lead or estimator", detail: "Run jobs and price new work." },
    ],
    ownBusiness: "Painting is one of the easiest trades to start a business in, with low startup costs. Lots of competition means reputation is everything.",
  },
  "concrete-worker": {
    soc: "47-2051", slug: "concrete-worker", name: "Concrete finishers",
    oneLine: "Place, level and finish concrete for slabs, sidewalks, foundations and decks.",
    credentials: ["OSHA 10", "ACI Concrete Field Testing Technician (optional)", "NCCER (optional)"],
    overtime: "Finishers are paid hourly, and pours start early and run until the slab is done, so long days are normal.",
    hardParts: ["Hard on knees and backs. A lot of kneeling and bending.", "Early starts in heat, since concrete sets fast when it's hot.", "Weather decides the schedule."],
    fit: { styles: ["build"], setting: "outdoor", heights: false },
    steps: [
      { title: "Laborer or helper", detail: "Set forms, move concrete and learn the finish." },
      { title: "Finisher", detail: "Screed, float and trowel slabs on your own." },
      { title: "Lead finisher", detail: "Run the pour and the crew." },
      { title: "Foreman or contractor (optional)", detail: "Bigger jobs need a state contractor license." },
    ],
    ownBusiness: "Small concrete businesses (driveways, patios, slabs) are common.",
  },
  "drywall-installer": {
    soc: "47-2081", slug: "drywall-installer", name: "Drywall installers & finishers",
    oneLine: "Hang and finish the walls and ceilings inside nearly every building.",
    credentials: ["OSHA 10", "NCCER (optional)"],
    overtime: "Drywall crews are often paid hourly or by the piece. Busy building seasons bring long weeks.",
    hardParts: ["Heavy sheets, lifting overhead and dust.", "Stilts and scaffolds for ceilings.", "Piece-rate pay rewards speed, which can wear you down."],
    fit: { styles: ["build"], setting: "indoor", heights: false },
    steps: [
      { title: "Helper", detail: "Carry board, cut and screw sheets, learn taping." },
      { title: "Hanger or finisher", detail: "Hang board or tape and mud on your own." },
      { title: "Lead or foreman", detail: "Run a crew on commercial or home jobs." },
      { title: "Subcontractor (optional)", detail: "Many experienced drywall workers run their own crews." },
    ],
    ownBusiness: "Many drywall workers become subcontractors to builders.",
  },
  "elevator-technician": {
    soc: "47-4021", slug: "elevator-technician", name: "Elevator technicians",
    oneLine: "Install and service elevators and escalators. One of the best-paid trades few people have heard of.",
    credentials: ["NEIEP training", "OSHA 10"],
    overtime: "Elevator mechanics are usually paid hourly, and service mechanics earn overtime and call-out pay for nights and weekends when someone is stuck.",
    hardParts: ["Shafts, pits and machine rooms: tight, dark and high up.", "Electrical, mechanical and hydraulic hazards in one job.", "Union recruitments open only now and then, so getting in can take patience."],
    fit: { styles: ["fix", "machines"], setting: "indoor", heights: true },
    steps: [
      { title: "Helper or apprentice", detail: "Hired by an elevator company, working under experienced mechanics." },
      { title: "Training program", detail: "NEIEP's union program or a company training program, about four years." },
      { title: "Mechanic", detail: "Install, repair or service on your own." },
      { title: "Adjuster or service lead (optional)", detail: "The most experienced mechanics troubleshoot controls and run crews." },
    ],
    ownBusiness: "Elevator work takes specialized tools, insurance and manufacturer relationships, so most mechanics work for established companies.",
  },
  "flooring-installer": {
    soc: "47-2042", slug: "flooring-installer", name: "Flooring installers",
    oneLine: "Lay hardwood, vinyl, laminate and carpet in homes and businesses.",
    credentials: ["OSHA 10", "Manufacturer installation certifications (optional)"],
    overtime: "Installers are paid hourly or by the square foot. Busy seasons bring long weeks, especially on new-home and remodel jobs.",
    hardParts: ["Rough on knees and backs.", "Dust, adhesives and heavy rolls and boxes.", "Pay by the square foot can swing with how much work comes in."],
    fit: { styles: ["build"], setting: "indoor", heights: false },
    steps: [
      { title: "Helper", detail: "Tear-out, prep and hauling material." },
      { title: "Installer", detail: "Lay flooring on your own." },
      { title: "Specialist (optional)", detail: "Hardwood refinishing, commercial resilient flooring or carpet." },
      { title: "Lead installer or subcontractor", detail: "Run jobs for stores and builders." },
    ],
    ownBusiness: "Many flooring installers end up working for themselves as subcontractors to stores and builders. You supply the tools and van, and the work comes and goes.",
    payNote: () => "BLS counts this group as floor layers except carpet, wood and tile, so some flooring workers fall in other categories.",
  },
  glazier: {
    soc: "47-2121", slug: "glazier", name: "Glaziers",
    oneLine: "Install the glass and metal storefronts, windows and curtain walls on modern buildings.",
    credentials: ["OSHA 10", "Aerial lift and fall protection training"],
    overtime: "Glaziers are usually paid hourly, with long weeks when a building is closing in.",
    hardParts: ["Heavy, fragile glass and sharp edges.", "Work on lifts and swing stages, high on building faces.", "Weather and wind can stop high work."],
    fit: { styles: ["build"], setting: "outdoor", heights: true },
    steps: [
      { title: "Apprentice or helper", detail: "Carry and set glass, learn sealants and framing." },
      { title: "Glazier", detail: "Install storefronts, windows and curtain wall on your own." },
      { title: "Foreman", detail: "Run the glass crew on a building." },
      { title: "Glass contractor (optional)", detail: "Bigger jobs need a state contractor license." },
    ],
    ownBusiness: "Some glaziers start residential window and shower-door businesses. Commercial storefront work usually goes to established firms.",
  },
  "insulation-installer": {
    soc: "47-2131", slug: "insulation-installer", name: "Insulation installers",
    oneLine: "Seal and insulate walls, attics, pipes and ductwork to keep buildings efficient.",
    credentials: ["OSHA 10", "Spray foam safety training (for spray foam work)"],
    overtime: "Installers are usually paid hourly or by the job. New-home building booms bring long weeks.",
    hardParts: ["Hot attics in summer.", "Itchy fibers and spray chemicals, so protective gear matters.", "Cramped crawlspaces and attics."],
    fit: { styles: ["build"], setting: "indoor", heights: false },
    steps: [
      { title: "Helper", detail: "Carry material, prep spaces and learn safe handling." },
      { title: "Installer", detail: "Batts, blown-in and spray foam." },
      { title: "Mechanical insulator (optional)", detail: "Pipes and equipment in plants and big buildings, usually through an apprenticeship." },
      { title: "Crew lead", detail: "Run jobs and check work." },
    ],
    ownBusiness: "Some installers start small insulation or spray foam companies. Spray rigs cost a lot, so most start with batts and blown-in work.",
    payNote: () => "This pay covers floor, ceiling and wall insulation workers. Mechanical insulators (pipes and equipment) are a separate BLS group and often earn more.",
  },
  ironworker: {
    soc: "47-2221", slug: "ironworker", name: "Ironworkers",
    oneLine: "Raise the steel skeleton of stadiums, bridges and high-rises, and place the rebar inside concrete.",
    credentials: ["OSHA 10", "AWS structural welding (optional)", "Rigger and signal person certification (optional)"],
    overtime: "Ironworkers are paid hourly, with long days when steel erection is on the critical path.",
    hardParts: ["Working at serious heights on open steel.", "Heavy, physical work in sun and heat.", "Work follows the big projects, which can mean travel."],
    fit: { styles: ["build"], setting: "outdoor", heights: true },
    steps: [
      { title: "Apprentice", detail: "Rebar, rigging and connecting steel under journey workers." },
      { title: "Journey ironworker", detail: "Structural, reinforcing or ornamental work on your own." },
      { title: "Certified rigger or welder (optional)", detail: "Rigging and welding certifications raise pay." },
      { title: "Foreman", detail: "Run the raising gang or rebar crew." },
    ],
    ownBusiness: "Steel erection companies need heavy equipment, big insurance policies and a contractor license, so most ironworkers work for established firms.",
  },
  mason: {
    soc: "47-2021", slug: "mason", name: "Masons",
    oneLine: "Lay brick, block and stone for walls, chimneys, schools and storefronts.",
    credentials: ["OSHA 10", "NCCER Masonry (optional)"],
    overtime: "Masons are usually paid hourly, with long days in good weather. Rain and freezing temperatures stop the work.",
    hardParts: ["Heavy brick and block all day: hard on backs and shoulders.", "Outdoor work in heat and cold, on scaffolds.", "Weather decides the schedule."],
    fit: { styles: ["build"], setting: "outdoor", heights: true },
    steps: [
      { title: "Mason tender or helper", detail: "Mix mortar, stock materials and build scaffold." },
      { title: "Apprentice mason", detail: "Lay brick and block under a journey mason." },
      { title: "Mason", detail: "Lay to the line on your own." },
      { title: "Foreman or contractor (optional)", detail: "Bigger jobs need a state contractor license." },
    ],
    ownBusiness: "Masonry is a classic trade business, from small residential crews doing steps and chimneys to commercial contractors. It takes crews, scaffolding and steady work.",
  },
  millwright: {
    soc: "49-9044", slug: "millwright", name: "Millwrights",
    oneLine: "Install, align and repair the big machines in factories, power plants and distribution centers.",
    credentials: ["OSHA 10", "Rigging certifications (optional)", "NCCER Millwright (optional)"],
    overtime: "Millwrights are usually paid hourly. Plant shutdowns and new factory installs bring heavy overtime.",
    hardParts: ["Heavy machinery and rigging hazards.", "Shutdown work means nights, weekends and long stretches.", "Precision work under time pressure."],
    fit: { styles: ["fix", "machines"], setting: "indoor", heights: false },
    steps: [
      { title: "Apprentice", detail: "Rigging, moving and setting machines under journey millwrights." },
      { title: "Journey millwright", detail: "Install and align equipment on your own." },
      { title: "Specialist (optional)", detail: "Laser alignment, vibration analysis or turbine work." },
      { title: "Foreman", detail: "Run installs and plant shutdowns." },
    ],
    ownBusiness: "Some millwrights start machinery moving and installation companies. It takes rigging equipment, insurance and relationships with plants.",
    payNote: () => "This pay includes plant maintenance millwrights, not just construction, because BLS reports one millwright category across all industries.",
  },
  pipefitter: {
    soc: "47-2152", slug: "pipefitter", name: "Pipefitters & steamfitters", sharedStatsWith: "plumber",
    oneLine: "Build the high-pressure piping that moves steam, gas and chemicals through plants, hospitals and big buildings.",
    credentials: ["OSHA 10", "Pipe welding certifications (optional)", "Medical gas certification (optional)"],
    overtime: "Pipefitters are usually paid hourly, with heavy overtime during plant shutdowns and big industrial builds.",
    hardParts: ["Heavy pipe, hot work and confined spaces.", "Industrial jobs can mean travel and long shutdown shifts.", "Plant work comes with strict safety rules."],
    fit: { styles: ["build", "fix"], setting: "indoor", heights: true },
    steps: [
      { title: "Apprentice", detail: "Union or open-shop apprenticeship while you work." },
      { title: "Journey pipefitter", detail: "Layout, fitting and welding on your own." },
      { title: "Welding or rigging certifications", detail: "Pipe welding certifications raise pay." },
      { title: "Foreman", detail: "Run crews on plant and commercial jobs." },
    ],
    ownBusiness: "Mechanical and piping contractors need crews, insurance and, for bigger jobs, a state contractor license.",
    payNote: (s) => `BLS counts plumbers, pipefitters and steamfitters as one occupation, so this pay matches plumbers' and there is no separate ${s} job count for pipefitters.`,
  },
  "plasterer-stucco-mason": {
    soc: "47-2161", slug: "plasterer-stucco-mason", name: "Plasterers & stucco masons",
    oneLine: "Apply plaster, stucco and EIFS finishes to walls and building exteriors.",
    credentials: ["OSHA 10", "Manufacturer EIFS training (optional)"],
    overtime: "Plasterers are usually paid hourly, with long days in dry weather, since rain and cold affect how stucco cures.",
    hardParts: ["Scaffold work outdoors.", "Heavy, wet material and repetitive motion.", "A small trade, so jobs cluster near bigger cities."],
    fit: { styles: ["build"], setting: "outdoor", heights: true },
    steps: [
      { title: "Helper", detail: "Mix material, set lath and scaffolds." },
      { title: "Plasterer", detail: "Apply base and finish coats on your own." },
      { title: "Specialist (optional)", detail: "EIFS systems and decorative finishes." },
      { title: "Crew lead", detail: "Run jobs and check work." },
    ],
    ownBusiness: "Some experienced plasterers run small stucco crews. Work is steadier near the bigger cities.",
  },
  roofer: {
    soc: "47-2181", slug: "roofer", name: "Roofers",
    oneLine: "Install and repair shingle, metal and flat commercial roofs.",
    credentials: ["OSHA 10", "Fall protection training", "Manufacturer certifications (optional)"],
    overtime: "Roofers are usually paid hourly or by the square. Storm seasons can bring long stretches of repair work.",
    hardParts: ["Working at heights on hot roofs, one of the most dangerous jobs in construction.", "Summer sun on dark shingles is punishing.", "Heavy bundles and long days."],
    fit: { styles: ["build"], setting: "outdoor", heights: true },
    steps: [
      { title: "Helper", detail: "Tear-off, carrying material and cleanup." },
      { title: "Roofer", detail: "Install shingle, metal or flat roofs on your own." },
      { title: "Foreman", detail: "Run crews and check the work." },
      { title: "Roofing contractor (optional)", detail: "Bigger jobs need a state contractor license." },
    ],
    ownBusiness: "Plenty of roofers run their own companies after years on crews.",
  },
  "sheet-metal-worker": {
    soc: "47-2211", slug: "sheet-metal-worker", name: "Sheet metal workers",
    oneLine: "Fabricate and install ductwork, metal roofing and architectural panels.",
    credentials: ["OSHA 10", "NCCER Sheet Metal (optional)"],
    overtime: "Sheet metal workers are usually paid hourly, with long weeks as buildings near completion.",
    hardParts: ["Sharp edges and heavy duct.", "Ladders and lifts for overhead ductwork.", "Hot attics and ceilings."],
    fit: { styles: ["build"], setting: "indoor", heights: true },
    steps: [
      { title: "Apprentice", detail: "Fabrication and duct installation under journey workers." },
      { title: "Journey sheet metal worker", detail: "Layout, fabrication and installation on your own." },
      { title: "Specialist (optional)", detail: "Testing and balancing, architectural metal or service." },
      { title: "Foreman", detail: "Run crews on commercial jobs." },
    ],
    ownBusiness: "Sheet metal shops need fabrication equipment and, for HVAC ductwork, whatever HVAC license the state or city requires.",
  },
  "solar-installer": {
    soc: "47-2231", slug: "solar-installer", name: "Solar installers",
    oneLine: "Mount and wire solar panels on roofs and large ground-mounted solar farms.",
    credentials: ["OSHA 10", "NABCEP PV Associate (optional)", "Fall protection training"],
    overtime: "Installers are usually paid hourly. Utility-scale solar farm projects often run long weeks, sometimes far from home.",
    hardParts: ["Roof and field work in full sun.", "Electrical hazards once panels are wired.", "The industry rises and falls with incentives and prices."],
    fit: { styles: ["build"], setting: "outdoor", heights: true },
    steps: [
      { title: "Installer", detail: "Mount racking and panels on a crew." },
      { title: "Lead installer", detail: "Run the crew on residential or commercial jobs." },
      { title: "NABCEP certification (optional)", detail: "National credentials that employers value." },
      { title: "Electrical license (for wiring)", detail: "The wiring side of solar falls under the state's electrical licensing." },
    ],
    ownBusiness: "Solar companies need a licensed electrical contractor for the wiring, plus insurance and a way to find customers.",
  },
  "sprinkler-fitter": {
    soc: "47-2152", slug: "sprinkler-fitter", name: "Sprinkler fitters", sharedStatsWith: "plumber",
    oneLine: "Install and test the fire sprinkler systems that every new commercial building needs.",
    credentials: ["NICET fire protection certifications", "Backflow tester certification (optional)", "OSHA 10"],
    overtime: "Fitters are usually paid hourly, with overtime as buildings race to pass their fire inspection before opening.",
    hardParts: ["Most of the work is overhead, on lifts and ladders.", "Heavy pipe and fittings, all day.", "Union fitters may travel to wherever the work is."],
    fit: { styles: ["build"], setting: "indoor", heights: true },
    steps: [],
    ownBusiness: "",
    payNote: (s) => `BLS counts sprinkler fitters with plumbers and pipefitters, so this pay matches plumbers' and there is no separate ${s} job count for sprinkler fitters.`,
  },
  "tile-setter": {
    soc: "47-2044", slug: "tile-setter", name: "Tile setters",
    oneLine: "Set tile and stone in showers, kitchens, lobbies and floors.",
    credentials: ["OSHA 10", "Certified Tile Installer (CTI, optional)"],
    overtime: "Tile setters are paid hourly or by the square foot. Remodel and new-home booms bring long weeks.",
    hardParts: ["Kneeling all day is hard on knees.", "Heavy boxes, wet saws and dust.", "Precise work where mistakes show."],
    fit: { styles: ["build"], setting: "indoor", heights: false },
    steps: [
      { title: "Helper", detail: "Mix thinset, cut tile and prep floors." },
      { title: "Tile setter", detail: "Set floors, walls and showers on your own." },
      { title: "Certified installer (optional)", detail: "Certified Tile Installer (CTI) through the Ceramic Tile Education Foundation." },
      { title: "Lead or subcontractor", detail: "Run jobs for builders and remodelers." },
    ],
    ownBusiness: "Tile is a common one-person or small-crew business. Reputation and photos of past work bring the jobs.",
  },
  "waterproofing-installer": {
    soc: "47-2181", slug: "waterproofing-installer", name: "Waterproofing installers", sharedStatsWith: "roofer",
    oneLine: "Seal foundations, plazas and parking decks against water before they get buried or built over.",
    credentials: ["OSHA 10", "Manufacturer certifications (optional)"],
    overtime: "Installers are usually paid hourly, with long weeks before a building is closed in.",
    hardParts: ["Below-grade and deck work in heat.", "Chemical coatings and fumes.", "Mistakes show up later as leaks, so details matter."],
    fit: { styles: ["build"], setting: "outdoor", heights: false },
    steps: [
      { title: "Helper", detail: "Surface prep and carrying material." },
      { title: "Installer", detail: "Apply membranes, coatings and sealants on your own." },
      { title: "Specialist (optional)", detail: "Manufacturer certifications for specific systems." },
      { title: "Crew lead", detail: "Run jobs and test the work." },
    ],
    ownBusiness: "Some installers start waterproofing companies serving builders. It takes insurance and manufacturer approvals.",
    payNote: (s) => `BLS has no separate waterproofing category, so this shows roofers' pay, the closest group, and there is no separate ${s} job count.`,
  },
};

// The fixed order every guide uses (matches Georgia).
export const TRADE_ORDER = [
  "laborer", "electrician", "equipment-operator", "welder", "hvac-technician", "carpenter", "plumber", "painter",
  "concrete-worker", "drywall-installer", "elevator-technician", "flooring-installer", "glazier", "insulation-installer",
  "ironworker", "mason", "millwright", "pipefitter", "plasterer-stucco-mason", "roofer", "sheet-metal-worker",
  "solar-installer", "sprinkler-fitter", "tile-setter", "waterproofing-installer",
] as const;
export type TradeSlug = (typeof TRADE_ORDER)[number];

export type Outlook = NonNullable<StateTrade["outlook"]>;
export type Spec = {
  outlook?: Outlook;
  stateLicense: StateTrade["stateLicense"];
  licenseSummary: string;
  licenseSteps?: LicenseStep[]; // defaults to the base career ladder
  licenseAgency?: StateTrade["licenseAgency"];
  credentials?: string[]; // replaces the base list
  extraCredentials?: string[]; // added in front of the base list
  training: TrainingOption[];
  ownBusiness?: string; // replaces the base text
  businessNote?: string; // appended to the base text
  payNote?: string; // replaces the base pay note
  hardParts?: string[];
  overtime?: string;
};

// Build one trade from the shared base plus the state's facts.
export function trade(slug: TradeSlug, stateName: string, s: Spec): StateTrade {
  const b = B[slug];
  if (!s.licenseSteps && b.steps.length === 0) throw new Error(`${slug}: licensed trade needs licenseSteps`);
  const own = s.ownBusiness ?? [b.ownBusiness, s.businessNote].filter(Boolean).join(" ");
  if (!own) throw new Error(`${slug}: needs ownBusiness`);
  return {
    soc: b.soc,
    slug: b.slug,
    name: b.name,
    oneLine: b.oneLine,
    ...(s.outlook ? { outlook: s.outlook } : {}),
    ...(b.sharedStatsWith ? { sharedStatsWith: b.sharedStatsWith } : {}),
    stateLicense: s.stateLicense,
    licenseSummary: s.licenseSummary,
    licenseSteps: s.licenseSteps ?? b.steps,
    ...(s.licenseAgency ? { licenseAgency: s.licenseAgency } : {}),
    credentials: s.credentials ?? [...(s.extraCredentials ?? []), ...b.credentials],
    training: s.training,
    ...((s.payNote ?? b.payNote?.(stateName)) ? { payNote: s.payNote ?? b.payNote!(stateName) } : {}),
    overtime: s.overtime ?? b.overtime,
    ownBusiness: own,
    hardParts: s.hardParts ?? b.hardParts,
    fit: b.fit,
  };
}

// Outlook rows from Projections Central are [base, projected, growthPct, openingsPerYear].
export const ol = (r: [number, number, number, number]): Outlook => ({ base: r[0], projected: r[1], growthPct: r[2], openingsPerYear: r[3] });

// Generic options any state can use when no verified local program exists.
export const LEARN_ON_JOB = (who: string): TrainingOption => ({
  name: "Learn on the job",
  kind: "free-training",
  where: `${who} statewide`,
  detail: "Most people in this trade start as helpers on a crew and learn as they work. No license is needed to start.",
});
export const NEIEP: TrainingOption = {
  name: "Elevator Constructors union (IUEC) through NEIEP",
  kind: "union",
  where: "IUEC locals in the state's larger metro areas",
  detail: "Union apprenticeship run through the National Elevator Industry Educational Program. Recruitments open when contractors need more workers.",
  url: "https://www.neiep.org/elevator-apprenticeship-recruitment-opportunities",
  programSlug: "neiep-elevator-constructor-apprenticeship",
};
export const UA_669: TrainingOption = {
  name: "UA Sprinkler Fitters Local 669",
  kind: "union",
  where: "A national sprinkler fitter local that hires through contractors in many states",
  detail: "Five-year registered apprenticeship. You're hired by a signatory contractor and take related classes alongside work.",
  url: "https://www.training669.org/",
};
export const national = (name: string, programSlug: string, detail: string): TrainingOption => ({
  name,
  kind: "union",
  where: "Check the union's site for the local that covers your area",
  detail,
  programSlug,
});
