// Layout data for the Lessons page's "Learning Blueprint" diagram: a single
// winding road connecting the 22 main-road lessons, plus 8 themed branches
// (17 more lessons) that each fork off a specific main-road stop and run
// their own short side road out to small icon stops of their own.
// Oriented top-to-bottom (2026-11): the road's progress axis runs down the
// sheet instead of across it, so the diagram reads as a vertical path and
// scrolls the way a game's level map would. Coordinates come from the
// original horizontal mockup
// (https://claude.ai/artifact/H5yDKGMXjQ5K1YkFMQu1ZR, Concept A revised)
// via: new x = (old y - 434) * 1.6 + 725, new y = old x * 1.3 — a 90-
// degree rotation (old y becomes the new left/right axis, old x becomes
// the new top/bottom axis) plus two deliberate stretches, not a bare
// swap: the *1.6 on the left/right axis widens how far the road and
// branches wander side to side (2026-11, widened further on request — a
// direct swap made for a narrower, straighter-looking sheet than wanted),
// and the *1.3 on the top/bottom axis opens enough room between stops for
// the enlarged badges and two-line titles not to crowd each other (a
// direct swap packed them too tight). This file just keeps that layout
// data in one place so LessonsBlueprint.tsx can merge it with real lesson
// content (title, minutes) looked up by slug.
//
// Deliberately separate from lib/content.ts and the Lesson schema: a
// lesson's position on this diagram (which tier, how far along the road,
// which branch it belongs to) isn't something the content schema tracks
// today, so it lives here as presentation data instead.

export type Point = { x: number; y: number };

export type BlueprintTier = {
  n: 1 | 2 | 3 | 4;
  label: string;
  sub: string;
  x: number;
  y: number;
};

export type BlueprintLayoutStop = {
  n: number;
  slug: string;
  x: number;
  y: number;
  tier: 1 | 2 | 3 | 4;
  icon: keyof typeof BLUEPRINT_ICONS;
  teaser: string;
  // Short label drawn ON the diagram badge. The real lesson's full title
  // (often a longer "Title: subtitle" form) is used everywhere else —
  // the hover/focus tooltip and the aria-label — but a badge only has
  // room for a couple of short words before adjacent stops start to
  // collide, so this is a deliberately separate, curated display string.
  label: string;
  // Wraps the label a fixed number of words per line instead of the
  // default even split at the halfway word — for a stop packed close
  // enough to its neighbors that the normal split is too wide to fit
  // without overlapping them.
  labelWordsPerLine?: number;
};

export type BlueprintBranchLesson = {
  slug: string;
  icon: keyof typeof BLUEPRINT_ICONS;
  x: number;
  y: number;
  teaser: string;
  // Short on-diagram label — see BlueprintLayoutStop.label above.
  label: string;
};

export type BlueprintBranch = {
  id: string;
  label: string;
  // The main-road slug this branch forks off of.
  attachSlug: string;
  // -1 = branch runs above the road, 1 = below.
  side: -1 | 1;
  trailhead: Point;
  lessons: BlueprintBranchLesson[];
};

// Positioned beside the road next to each tier's first stop (not a plain
// axis-swap of the old coordinates, which landed almost exactly on top of
// a stop once rotated) — picked and verified clear of every stop's badge
// and title, every branch label, and each other.
export const BLUEPRINT_TIERS: BlueprintTier[] = [
  { n: 1, label: "TIER 1", sub: "ORIENTATION", x: 1142, y: 195 },
  { n: 2, label: "TIER 2", sub: "EARLY FIELDWORK", x: 1013, y: 1022 },
  { n: 3, label: "TIER 3", sub: "MONEY & CONTRACTS", x: 832, y: 2014 },
  { n: 4, label: "TIER 4", sub: "ADVANCED PRACTICE", x: 737, y: 3004 },
];

export const BLUEPRINT_LAYOUT: BlueprintLayoutStop[] = [
  { n: 1, slug: "financing-and-feasibility", x: 992, y: 195, tier: 1, icon: "chart",
    label: "Financing & Feasibility",
    teaser: "How a project actually gets funded before anything's designed." },
  { n: 2, slug: "whos-actually-running-the-job", x: 1003, y: 360, tier: 1, icon: "orgchart",
    label: "Who's Running the Job",
    teaser: "Owner, architect, GC, subs, owner's rep, and who actually directs whom." },
  { n: 3, slug: "reading-a-set-of-plans", x: 959, y: 525, tier: 1, icon: "plans",
    label: "Reading the Plans",
    teaser: "Title blocks, sheet series, scale, and what to do when a drawing won't answer you." },
  { n: 4, slug: "bidding-and-winning-work", x: 923, y: 690, tier: 1, icon: "gavel",
    label: "Bidding & Winning Work",
    teaser: "Chasing a real bid through screening, takeoff, and the lowest-bid myth." },
  { n: 5, slug: "subcontractor-buyout-and-scope-gaps", x: 949, y: 857, tier: 1, icon: "puzzle",
    label: "Buyout & Scope Gaps",
    teaser: "Turning a winning bid into signed subcontracts without a scope gap nobody notices." },
  { n: 6, slug: "permits-inspections-and-the-paper-trail", x: 863, y: 1022, tier: 2, icon: "stamp",
    label: "Permits & Inspections",
    teaser: "How a job stays legal: permitting, plan review, and special inspections." },
  { n: 7, slug: "submittals-and-shop-drawings", x: 831, y: 1187, tier: 2, icon: "papers",
    label: "Submittals & Shop Drawings",
    teaser: "Why nothing gets ordered until the approval loop closes." },
  { n: 8, slug: "procurement-and-long-lead-logistics", x: 784, y: 1352, tier: 2, icon: "crate",
    label: "Procurement & Long-Lead",
    teaser: "Material delivery delays, laydown yards, and the gap between approved and on site." },
  { n: 9, slug: "jobsite-safety-in-practice", x: 792, y: 1517, tier: 2, icon: "hardhat",
    label: "Jobsite Safety",
    teaser: "A real JHA, a toolbox talk, and a worker who exercises stop work authority." },
  { n: 10, slug: "from-dirt-to-deck", x: 842, y: 1682, tier: 2, icon: "shovel",
    label: "From Dirt to Deck",
    teaser: "Earthwork and foundations up close, grading through the pour." },
  { n: 11, slug: "building-sequence", x: 861, y: 1847, tier: 2, icon: "building",
    label: "Building Sequence",
    teaser: "Foundation to finish, the physical order a building actually goes up in." },
  { n: 12, slug: "change-order-basics", x: 682, y: 2014, tier: 3, icon: "editdoc",
    label: "Change Order Basics",
    teaser: "Why a verbal change order is the mistake that keeps repeating." },
  { n: 13, slug: "getting-paid", x: 671, y: 2179, tier: 3, icon: "dollar",
    label: "Getting Paid",
    teaser: "Schedule of values, retainage, bonds, and a lien threat that closes it out." },
  { n: 14, slug: "choosing-how-to-build-it", x: 715, y: 2344, tier: 3, icon: "fork",
    label: "Choosing How to Build It",
    teaser: "Design-Bid-Build vs. Design-Build vs. CM at Risk, and who's liable when." },
  { n: 15, slug: "whos-on-the-hook", x: 751, y: 2509, tier: 3, icon: "shield",
    label: "Who's on the Hook",
    teaser: "Bonds, builder's risk, and why an uninsured sub doesn't get on site." },
  { n: 16, slug: "the-estimate-becomes-the-budget", x: 725, y: 2674, tier: 3, icon: "gauge",
    label: "Estimate Becomes Budget",
    teaser: "Cost codes, committed vs. actual, and how a good bid still loses money." },
  { n: 17, slug: "schedule-delay-dispute", x: 675, y: 2839, tier: 3, icon: "clockx", labelWordsPerLine: 2,
    label: "Schedule Delay Dispute",
    teaser: "Float burns up, an acceleration order lands, and it ends in arbitration." },
  { n: 18, slug: "bim-and-clash-detection", x: 587, y: 3004, tier: 4, icon: "cube", labelWordsPerLine: 2,
    label: "BIM & Clash Detection",
    teaser: "Catching a beam-and-ductwork conflict months before it hits the field." },
  { n: 19, slug: "value-engineering", x: 634, y: 3171, tier: 4, icon: "bulb",
    label: "Value Engineering",
    teaser: "A cost-saving substitution that looks fine on paper, until it isn't." },
  { n: 20, slug: "green-building-certification", x: 626, y: 3336, tier: 4, icon: "leaf",
    label: "Green Building Cert",
    teaser: "Choosing LEED, chasing net zero, and commissioning the systems that prove it." },
  { n: 21, slug: "project-closeout", x: 576, y: 3501, tier: 4, icon: "clipboard",
    label: "Project Closeout",
    teaser: "Punch list, the CO delay nobody saw coming, and the binder that outlives the job." },
  { n: 22, slug: "when-its-not-the-storms-fault", x: 557, y: 3666, tier: 4, icon: "magnifier",
    label: "Not the Storm's Fault",
    teaser: "A crack years later, tracing it to design, construction, or neglect." },
];

export const BLUEPRINT_BRANCHES: BlueprintBranch[] = [
  {
    id: "running-the-job",
    label: "Running the Job",
    attachSlug: "whos-actually-running-the-job",
    side: -1,
    trailhead: { x: 930, y: 360 },
    lessons: [
      { slug: "a-day-as-an-owners-rep", icon: "orgchart", x: 667, y: 237, label: "A Day as an Owner's Rep",
        teaser: "OAC meetings, first article inspections, and protecting the owner's interests day to day." },
      { slug: "coordinating-subs-as-a-superintendent", icon: "hardhat", x: 653, y: 395, label: "Coordinating Subs",
        teaser: "Look-ahead schedules, pull planning, and catching problems before they cost a day." },
    ],
  },
  {
    id: "business-and-estimating",
    label: "Business & Estimating",
    attachSlug: "bidding-and-winning-work",
    side: 1,
    trailhead: { x: 1083, y: 806 },
    lessons: [
      { slug: "a-day-in-the-life-of-an-estimator", icon: "magnifier", x: 1259, y: 655, label: "A Day as an Estimator",
        teaser: "Conceptual budgets, takeoffs, and building the number behind the number." },
      { slug: "cost-control-and-forecasting-in-practice", icon: "chart", x: 1245, y: 814, label: "Cost Control & Forecasting",
        teaser: "Cost performance index, productivity, and catching trouble before the report does." },
    ],
  },
  {
    id: "entry-level-crew",
    label: "Entry-Level Crew",
    attachSlug: "jobsite-safety-in-practice",
    side: -1,
    trailhead: { x: 719, y: 1517 },
    lessons: [
      { slug: "a-day-as-a-laborer", icon: "shovel", x: 504, y: 1473, label: "A Day as a Laborer",
        teaser: "Safety orientation, heat risk, and the credential that travels between employers." },
    ],
  },
  {
    id: "earthwork-and-concrete",
    label: "Earthwork & Concrete",
    attachSlug: "from-dirt-to-deck",
    side: 1,
    trailhead: { x: 1002, y: 1794 },
    lessons: [
      { slug: "heavy-equipment-and-earthwork", icon: "excavator", x: 1178, y: 1647, label: "Heavy Equipment & Earthwork",
        teaser: "Excavation safety, shoring, and the rules that keep heavy equipment from killing someone." },
      { slug: "concrete-and-foundations-in-practice", icon: "cube", x: 1163, y: 1806, label: "Concrete & Foundations",
        teaser: "Slump tests, curing, and proving concrete actually hit its strength." },
    ],
  },
  {
    id: "trade-specific",
    label: "Trade-Specific",
    attachSlug: "building-sequence",
    side: -1,
    trailhead: { x: 787, y: 1847 },
    lessons: [
      { slug: "structural-steel-erection", icon: "building", x: 205, y: 1486, label: "Structural Steel Erection",
        teaser: "Raising steel beam by beam, and the fall-protection rules that go with it." },
      { slug: "framing-and-rough-carpentry", icon: "hammer", x: 191, y: 1644, label: "Framing & Carpentry",
        teaser: "From studs to a building's actual shape." },
      { slug: "electrical-rough-in", icon: "bulb", x: 216, y: 1803, label: "Electrical Rough-In",
        teaser: "Wiring a building before the walls close up." },
      { slug: "mechanical-and-plumbing-rough-in", icon: "fork", x: 195, y: 1962, label: "Mechanical & Plumbing",
        teaser: "The fight for ceiling space between ductwork and pipe." },
      { slug: "building-envelope-and-glazing", icon: "shield", x: 219, y: 2120, label: "Building Envelope & Glazing",
        teaser: "Curtain wall, glazing, and closing the building in." },
    ],
  },
  {
    id: "tech-and-reality-capture",
    label: "Tech & Reality Capture",
    attachSlug: "bim-and-clash-detection",
    side: 1,
    trailhead: { x: 747, y: 3094 },
    lessons: [
      { slug: "3d-modeling-in-practice", icon: "cube", x: 923, y: 2969, label: "3D Modeling in Practice",
        teaser: "LOD, BIM execution plans, and a model's life before and after clash detection." },
      { slug: "drones-scanning-and-mapping", icon: "magnifier", x: 909, y: 3128, label: "Drones, Scanning & Mapping",
        teaser: "Turning a jobsite into data, from FAA rules to photogrammetry." },
    ],
  },
  {
    id: "sustainability-and-systems",
    label: "Sustainability & Systems",
    attachSlug: "green-building-certification",
    side: -1,
    trailhead: { x: 552, y: 3336 },
    lessons: [
      { slug: "hvac-and-building-systems-in-practice", icon: "gauge", x: 290, y: 3212, label: "HVAC & Building Systems",
        teaser: "Refrigerant rules, rooftop units, and commissioning the systems that prove it works." },
      { slug: "solar-and-renewable-energy-on-a-jobsite", icon: "leaf", x: 275, y: 3371, label: "Solar & Renewable Energy",
        teaser: "Interconnection, net metering, and keeping the lights on when the grid goes down." },
    ],
  },
  {
    id: "claim-to-restoration",
    label: "Claim to Restoration",
    attachSlug: "when-its-not-the-storms-fault",
    side: 1,
    trailhead: { x: 717, y: 3744 },
    lessons: [
      { slug: "claim-to-restoration", icon: "umbrella", x: 845, y: 3710, label: "Claim to Restoration",
        teaser: "A hailstorm claim from first notice of loss to the finished repair." },
    ],
  },
];

// Hand-drawn icon markup (inner SVG paths/circles), one per stop. Kept as
// raw markup, same as the original mockup, since these are bespoke line
// icons rather than a reusable icon set.
export const BLUEPRINT_ICONS = {
  orgchart:
    '<circle cx="12" cy="5.5" r="2.6"/><circle cx="5.5" cy="18.5" r="2.6"/><circle cx="18.5" cy="18.5" r="2.6"/><path d="M12 8v4M12 12l-5 4M12 12l5 4"/>',
  plans: '<path d="M5 20V6l3-3h11v17z"/><path d="M8 3v3H5"/><path d="M8.5 11h8M8.5 15h8"/>',
  gavel:
    '<path d="M6 20h9"/><path d="M5.5 19l4-4"/><path d="M9 11l5.5 5.5 2.5-2.5L11.5 8.5z"/><path d="M13 7l4 4"/>',
  stamp:
    '<circle cx="12" cy="10" r="6.3"/><path d="M9 10.3l1.9 1.9 4-4.4"/><path d="M12 16.3V20"/><path d="M7.5 20h9"/>',
  papers: '<rect x="5" y="6.5" width="11" height="14" rx=".3"/><rect x="8" y="3.5" width="11" height="14" rx=".3"/>',
  hardhat: '<path d="M3.5 16.5Q12 3 20.5 16.5"/><path d="M2 16.5h20"/><path d="M12 7.5v9"/>',
  shovel: '<path d="M7 5l10 10"/><path d="M14.5 12.3l4 4-2.3 3.4-4.9-2z"/>',
  building:
    '<path d="M2 21h20"/><rect x="4" y="15" width="4.4" height="6"/><rect x="9.8" y="10.5" width="4.4" height="10.5"/><rect x="15.6" y="5.5" width="4.4" height="15.5"/>',
  editdoc:
    '<rect x="5" y="4" width="12" height="16" rx=".3"/><path d="M8 9h6M8 13h6M8 17h3.5"/><path d="M15 15.5l4.3-4.3 1.6 1.6-4.3 4.3-2 .4z"/>',
  dollar:
    '<circle cx="12" cy="12" r="8.3"/><path d="M12 6.5v11"/><path d="M15.2 9.1c0-1.3-1.4-2.2-3.2-2.2s-3 .9-3 2c0 3 6.2 1.4 6.2 4.3 0 1.2-1.3 2.2-3.2 2.2s-3.3-1-3.3-2.2"/>',
  fork: '<path d="M12 21V12"/><path d="M12 12L5 4"/><path d="M12 12l7-8"/><circle cx="5" cy="3.2" r="1.4"/><circle cx="19" cy="3.2" r="1.4"/>',
  shield: '<path d="M12 3l8 3v6q0 7-8 9-8-2-8-9V6z"/><path d="M8.5 12l2.4 2.4L16 9"/>',
  gauge: '<path d="M4 17a8 8 0 0 1 16 0"/><path d="M12 17l4.4-6.4"/><circle cx="12" cy="17" r="1.4"/>',
  clockx: '<circle cx="12" cy="12.5" r="8"/><path d="M12 12.5V7.7M12 12.5l3 1.6"/><path d="M17.2 5.2l2.3-1.6M19.4 4.3l.4 2.7"/>',
  cube: '<path d="M12 3l8 4v8l-8 4-8-4V7z"/><path d="M12 3v8M4 7l8 4 8-4"/><path d="M12 11v10"/><path d="M17.5 8.3l1.6-1.6M19.3 8.7l-1.9-1.9"/>',
  bulb: '<circle cx="12" cy="10.5" r="6"/><path d="M9.6 16h4.8M10.2 19h3.6"/><path d="M12 4v0"/>',
  leaf: '<path d="M6.5 20Q4 8 20 4Q19 18 6.5 20Z"/><path d="M7.5 19Q13 10 19 5"/>',
  clipboard:
    '<rect x="5" y="5" width="14" height="16" rx=".4"/><rect x="9" y="3" width="6" height="3.4" rx=".3"/><path d="M8.3 13l2.6 2.6L16 9.5"/>',
  magnifier: '<circle cx="10.3" cy="10.3" r="6"/><path d="M14.7 14.7L20 20"/><path d="M8 11.5l2-4 2 3-1.5 2.3"/>',
  umbrella: '<path d="M4 12.5Q12 2.5 20 12.5Z"/><path d="M12 12.5V19q0 2 2 1.6"/><path d="M4 12.5h16"/>',
  chart: '<path d="M4 20h16"/><rect x="6" y="13" width="3" height="7" rx=".2"/><rect x="11" y="9" width="3" height="11" rx=".2"/><rect x="16" y="5" width="3" height="15" rx=".2"/>',
  puzzle: '<rect x="3" y="6.5" width="10" height="10" rx=".3"/><rect x="11" y="7.5" width="10" height="10" rx=".3"/><path d="M11 9v6" stroke-dasharray="1.5 2.5"/>',
  crate: '<rect x="4" y="9.5" width="16" height="10.5" rx=".3"/><path d="M4 9.5l3.2-5h9.6l3.2 5"/><path d="M4 14h16"/><path d="M12 9.5v10.5"/>',
  excavator: '<rect x="3" y="15" width="7" height="5" rx=".3"/><circle cx="4.6" cy="20" r="1.1"/><circle cx="8.4" cy="20" r="1.1"/><path d="M10 15l5-2.5"/><path d="M15 12.5l4.5-6"/><path d="M19.5 6.5l1.8-1"/>',
  hammer: '<path d="M14.5 6.5l3-3 4 4-3 3z"/><path d="M15.8 9.2L7 18l-3.5 2.5L5.5 17 14.2 8.2z"/>',
} as const;

// Catmull-Rom-style smoothing through a series of points, producing a
// single smooth cubic-bezier SVG path string. Same approach as the mockup.
export function smoothPath(points: Point[]): string {
  if (points.length < 2) return "";
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
}
