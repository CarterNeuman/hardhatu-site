// Georgia CTAE Architecture & Construction pathways, mapped to the pages a
// counselor would send a student in that pathway to. Pathway names are the
// state's own (GAfutures / GaDOE Architecture & Construction cluster).
// Every slug here is checked against real content on the counselor page, so a
// renamed page drops out of the map instead of becoming a broken link.

export type PathwayLink = {
  careers: string[]; // career slugs (/careers/<slug>)
  guideTrades: string[]; // Georgia guide anchors (/states/georgia#<slug>)
  lessons: string[]; // lesson slugs (/lessons/<slug>)
  extras?: { href: string; label: string }[];
};

export type CounselorPathway = PathwayLink & {
  name: string;
  note?: string;
};

export const FOUNDATION_COURSE: CounselorPathway = {
  name: "Industry Fundamentals and Occupational Safety",
  note: "The first course in nearly every construction pathway.",
  careers: ["laborer"],
  guideTrades: [],
  lessons: ["jobsite-safety-in-practice", "building-sequence"],
  extras: [
    { href: "/exams/osha-10", label: "OSHA 10 guide" },
    { href: "/exams/nccer-core", label: "NCCER Core guide" },
  ],
};

export const GA_PATHWAYS: CounselorPathway[] = [
  {
    name: "Carpentry",
    careers: ["carpenter", "drywall-installer"],
    guideTrades: ["carpenter", "drywall-installer"],
    lessons: ["framing-and-rough-carpentry"],
  },
  {
    name: "Electrical",
    careers: ["electrician", "solar-installer"],
    guideTrades: ["electrician", "solar-installer"],
    lessons: ["electrical-rough-in"],
  },
  {
    name: "Plumbing",
    careers: ["plumber", "pipefitter", "sprinkler-fitter"],
    guideTrades: ["plumber", "pipefitter", "sprinkler-fitter"],
    lessons: ["mechanical-and-plumbing-rough-in"],
  },
  {
    name: "Masonry",
    careers: ["mason", "concrete-worker", "tile-setter"],
    guideTrades: ["mason", "concrete-worker", "tile-setter"],
    lessons: ["concrete-and-foundations-in-practice"],
  },
  {
    name: "Heating, Ventilation, Air Conditioning, and Refrigeration",
    careers: ["hvac-technician"],
    guideTrades: ["hvac-technician"],
    lessons: ["hvac-and-building-systems-in-practice"],
  },
  {
    name: "HVACR - Electrical",
    careers: ["hvac-technician", "electrician"],
    guideTrades: ["hvac-technician", "electrician"],
    lessons: ["hvac-and-building-systems-in-practice", "electrical-rough-in"],
  },
  {
    name: "Sheet Metal",
    careers: ["sheet-metal-worker", "hvac-technician"],
    guideTrades: ["sheet-metal-worker"],
    lessons: ["hvac-and-building-systems-in-practice"],
  },
  {
    name: "Welding",
    careers: ["welder", "ironworker", "pipefitter"],
    guideTrades: ["welder", "ironworker"],
    lessons: ["structural-steel-erection"],
  },
  {
    name: "Architectural Drawing and Design",
    careers: ["architect", "cad-technician", "bim-vdc-specialist"],
    guideTrades: [],
    lessons: ["reading-a-set-of-plans", "3d-modeling-in-practice"],
    extras: [{ href: "/quizzes/technology-design-match", label: "Technology & Design quiz" }],
  },
  {
    name: "Fine Furniture - Cabinetmaking",
    note: "Closest match on the jobsite: finish carpentry.",
    careers: ["carpenter"],
    guideTrades: ["carpenter"],
    lessons: ["framing-and-rough-carpentry"],
  },
  {
    name: "Machining",
    note: "Closest construction match: millwrights, who install and align machinery.",
    careers: ["millwright"],
    guideTrades: ["millwright"],
    lessons: [],
  },
];
