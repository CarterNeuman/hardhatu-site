// Vermont state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Vermont-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Vermont";

const VT_ELECTRICAL: SourceRef = { label: "Vermont Dept. of Fire Safety, electrician licensing (26 V.S.A. Ch. 15)", url: "https://firesafety.vermont.gov/node/87" };
const VT_PLUMBING: SourceRef = { label: "Vermont Dept. of Fire Safety, plumbing licensing ledger (26 V.S.A. Ch. 39)", url: "https://firesafety.vermont.gov/node/852" };
const VT_ELEVATOR: SourceRef = { label: "Vermont Dept. of Fire Safety, Elevator Safety Review Board", url: "https://firesafety.vermont.gov/node/142" };
const VT_SPRINKLER_DESIGN: SourceRef = { label: "Vermont Dept. of Fire Safety, fire sprinkler system design certification", url: "https://firesafety.vermont.gov/node/260" };
const VT_SOLAR_EXEMPTION: SourceRef = { label: "Vermont electrician licensing exemption for solar and small wind installers (26 V.S.A. §910(7))", url: "https://legislature.vermont.gov/statutes/section/26/015/00910" };
const VT_RESIDENTIAL_REGISTRY: SourceRef = { label: "Vermont Secretary of State, Residential Contractor Registry FAQ", url: "https://sos.vermont.gov/residential-contractors/residential-contractor-faqs" };
const VT_CTE_FUND: SourceRef = { label: "Vermont Community Loan Fund tapped to administer a $15 million career and technical education construction program", url: "https://vermontbiz.com/node/224739" };
const VT_APPRENTICESHIP: SourceRef = { label: "Vermont Registered Apprenticeship, Dept. of Labor", url: "https://labor.vermont.gov/apprenticeship-program-resources" };

const IBEW_300: TrainingOption = {
  name: "IBEW Local 300",
  kind: "union",
  where: "South Burlington, serving Vermont and parts of New England",
  detail: "A paid union electrical apprenticeship with roughly 1,000 members across the region.",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const UA_693: TrainingOption = {
  name: "Plumbers & Pipefitters UA Local 693",
  kind: "union",
  where: "South Burlington",
  detail: "A paid union apprenticeship for plumbers, pipefitters and HVAC installers.",
  programSlug: "ua-plumber-pipefitter-apprenticeship",
};
const ABC_NHVT_VT: TrainingOption = {
  name: "Associated Builders and Contractors, NH/VT Chapter",
  kind: "open-shop",
  where: "Serves Vermont from Concord, NH",
  detail: "A merit-shop apprenticeship program covering several trades.",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const vtNoLicense = (what: string) => `Vermont has no state license for ${what}.`;

export const VERMONT: StateGuide = {
  // Vermont ZIP codes run 050xx-059xx.
  locationHints: { zip3: [[50, 59]], cities: ["Burlington", "South Burlington", "Rutland", "Essex", "Colchester", "Montpelier"] },
  slug: "vermont",
  code: "VT",
  name: S,
  lastVerified: "2026-11-22",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Vermont long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=VT",
  },
  intro:
    "A field guide to 25 construction trades in Vermont: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "Vermont licenses electricians and plumbers on real journeyman-and-master ladders through the Dept. of Fire Safety, and splits HVAC licensing in two: a Heating System Specialist credential under the plumbing license for furnaces and boilers, and a Refrigeration and Air Conditioning Specialist credential under the electrician license for AC and refrigeration.",
    "Vermont has no general contractor license, but almost any residential contractor taking on jobs of $10,000 or more must register with the Secretary of State's Residential Contractor Registry, a registration rather than a license.",
    "A genuinely distinctive finding: Vermont law explicitly exempts solar panel and racking installation, and small wind turbine erection, from needing an electrician license, up to the point of connecting to pre-existing wiring.",
    "Fire sprinkler work is only certified at the system-design level (NICET III or a Vermont-licensed engineer); there's no individual fitter license, so installers typically work under a certified designer's plans.",
    "Electricians (10%) and solar installers (21%) show the strongest projected growth; millwrights are the only trade with a clear projected decline.",
  ],
  costMarker: { label: "Vermont's CTE construction fund", value: "$15M", note: "A state revolving-loan fund set aside to expand career and technical education construction programs" },
  licensingOverview:
    "Vermont licenses construction trades through the Dept. of Fire Safety, which runs genuine journeyman-and-master ladders for electricians and plumbers. HVAC work splits across both licenses: heating equipment (furnaces, boilers) falls under a Heating System Specialist credential tied to the plumbing license, while refrigeration and air-conditioning work falls under a Refrigeration and Air Conditioning Specialist credential tied to the electrician license. Elevator mechanics are individually licensed as a single credential, not a ladder. Fire sprinkler systems are certified only at the design level (NICET III, or a Vermont-licensed engineer), with no standalone individual fitter license. Solar panel and small wind installation has an explicit statutory carve-out from the electrician license, up to the point of connecting to a building's existing wiring. No other trade on this page has a Vermont state license, and there's no general contractor license, though most residential contractors taking jobs of $10,000 or more must register (not be licensed) with the Secretary of State.",
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
      "A Master-level license (electrician, plumber) already qualifies someone to run their own shop, with no separate business-level credential layered on top.",
      "Vermont's Residential Contractor Registry is a one-time registration, not a licensing exam, which keeps the paperwork lighter than a full contractor license in some other states.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Vermont is a small, rural market, so steady year-round work can mean building relationships well beyond one town.",
    ],
    path:
      "The usual route: work for someone else for years, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      VT_RESIDENTIAL_REGISTRY,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([3260, 3560, 9, 300]),
      stateLicense: "none",
      licenseSummary: vtNoLicense("construction laborers"),
      licenseAgency: VT_RESIDENTIAL_REGISTRY,
      training: [ABC_NHVT_VT, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([1610, 1770, 10, 160]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Vermont licenses electricians on a real journeyman-and-master ladder through the Dept. of Fire Safety, plus optional per-field Specialist credentials (including a Refrigeration and Air Conditioning Specialist field some sources tie to HVAC work, though the agency's own pages don't spell out exactly which license that field falls under).",
      licenseSteps: [
        { title: "Apprentice", detail: "Works under a licensed journeyman or master while logging hours toward a journeyman license; no fixed minimum to start." },
        { title: "Journeyman", detail: "A qualifying number of hours of documented experience, or completion of Vermont's registered electrical apprenticeship program, then an exam." },
        { title: "Master", detail: "At least 2 years (or roughly 16,000 hours of total experience) working as a licensed journeyman, then an exam." },
        { title: "Specialist (optional, per field)", detail: "A narrower license limited to one field; 1 year (2,000 hours) with a recognized training program, or 2 years (4,000 hours) without, then a $115-per-field exam and license." },
      ],
      licenseAgency: VT_ELECTRICAL,
      training: [IBEW_300],
    }),
    t("equipment-operator", {
      outlook: ol([1200, 1240, 3, 100]),
      stateLicense: "none",
      licenseSummary: vtNoLicense("heavy equipment operators"),
      licenseAgency: VT_RESIDENTIAL_REGISTRY,
      training: [national("Operating Engineers union (IUOE) apprenticeship", "iuoe-equipment-operator-apprenticeship", "A national operating-engineers union with locals in many states.")],
    }),
    t("welder", {
      outlook: ol([360, 380, 3, 40]),
      stateLicense: "none",
      licenseSummary: vtNoLicense("general construction/structural welders") + " It's one of the smallest trades on this page.",
      licenseAgency: VT_RESIDENTIAL_REGISTRY,
      training: [LEARN_ON_JOB("Welding shops and fabricators")],
    }),
    t("hvac-technician", {
      outlook: ol([1280, 1370, 7, 120]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Vermont appears to split HVAC licensing by equipment type: the plumbing board's own ledger lists a Heating System Specialist code for furnaces and boilers, and a separate Refrigeration and Air Conditioning code that several licensing guides tie to the electrician side. The state's own pages don't spell out that second credential's home board in so many words, so treat that half of the split as the best available reading rather than a fully confirmed fact.",
      licenseSteps: [
        { title: "Heating System Specialist (heating equipment)", detail: "A narrower specialist credential under the plumbing-license structure, covering furnaces, boilers and related heating systems." },
        { title: "Refrigeration and Air Conditioning Specialist (AC/refrigeration)", detail: "A narrower specialist credential most likely tied to the electrician-license structure; qualifying experience, then an exam." },
      ],
      licenseAgency: VT_PLUMBING,
      training: [UA_693],
    }),
    t("carpenter", {
      outlook: ol([5190, 5520, 6, 410]),
      stateLicense: "none",
      licenseSummary: vtNoLicense("carpenters") + " Most residential carpentry businesses taking jobs of $10,000 or more must register with the Secretary of State's Residential Contractor Registry. It's the largest trade on this page.",
      licenseAgency: VT_RESIDENTIAL_REGISTRY,
      training: [national("New England Regional Council of Carpenters apprenticeship", "carpenter-apprenticeship", "A regional union apprenticeship serving Vermont."), ABC_NHVT_VT],
    }),
    t("plumber", {
      outlook: ol([1130, 1190, 5, 100]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Vermont's Dept. of Fire Safety licenses plumbers on a real journeyman-and-master ladder; a Journeyman applicant needs a documented apprenticeship recognized by the Vermont Apprenticeship Council, and a Master applicant needs at least 12 months working as a journeyman.",
      licenseSteps: [
        { title: "Apprentice Plumber", detail: "Registered through a documented apprenticeship recognized by the Vermont Apprenticeship Council, working under a licensed journeyman or master." },
        { title: "Journeyman Plumber", detail: "Completion of the registered apprenticeship, then an exam." },
        { title: "Master Plumber", detail: "At least 12 months working as a licensed journeyman, then an exam." },
      ],
      licenseAgency: VT_PLUMBING,
      training: [UA_693],
      businessNote: "A Vermont plumbing business operates under a Master Plumber; there's no separate business-level license layered on top of the Master credential itself.",
    }),
    t("painter", {
      outlook: ol([1670, 1790, 7, 140]),
      stateLicense: "none",
      licenseSummary: vtNoLicense("painters"),
      licenseAgency: VT_RESIDENTIAL_REGISTRY,
      training: [national("Finishing Trades Institute of New England", "finishing-trades-institute-apprenticeship", "A regional union apprenticeship for painters and other finishing trades.")],
    }),
    t("concrete-worker", {
      outlook: ol([280, 280, 3, 20]),
      stateLicense: "none",
      licenseSummary: vtNoLicense("concrete finishers") + " It's one of the smallest trades on this page.",
      licenseAgency: VT_RESIDENTIAL_REGISTRY,
      training: [LEARN_ON_JOB("Concrete contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([150, 160, 5, 10]),
      stateLicense: "none",
      licenseSummary: vtNoLicense("drywall installers") + " It's one of the smallest trades on this page.",
      licenseAgency: VT_RESIDENTIAL_REGISTRY,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      stateLicense: "worker-certification",
      licenseSummary:
        "Vermont licenses elevator work by classification, through the Dept. of Fire Safety's Elevator Safety Review Board — separate Mechanic, Lift Mechanic and Inspector licenses — rather than a tiered apprentice/journeyman/master ladder.",
      licenseSteps: [
        { title: "Elevator Mechanic, Lift Mechanic or Inspector (by classification)", detail: "Qualifying training and documented experience in the chosen classification, then a license application through the Elevator Safety Review Board." },
      ],
      licenseAgency: VT_ELEVATOR,
      payNote: "Vermont publishes no state-specific pay or job-growth data for this small trade, so this page shows the national figures.",
      training: [national("Elevator Constructors union (IUEC) through NEIEP", "neiep-elevator-constructor-apprenticeship", "Union apprenticeship run through the National Elevator Industry Educational Program.")],
    }),
    t("flooring-installer", {
      outlook: ol([170, 180, 5, 10]),
      stateLicense: "none",
      licenseSummary: vtNoLicense("flooring installers") + " It's one of the smallest trades on this page.",
      licenseAgency: VT_RESIDENTIAL_REGISTRY,
      training: [national("New England Regional Council of Carpenters apprenticeship", "carpenter-apprenticeship", "A regional union apprenticeship covering floor layers.")],
    }),
    t("glazier", {
      stateLicense: "none",
      licenseSummary: vtNoLicense("glaziers") + " It's one of the smallest trades on this page, with no Vermont-specific job-growth projection published.",
      licenseAgency: VT_RESIDENTIAL_REGISTRY,
      payNote: "Vermont publishes pay data for this small trade but no state-specific job-growth projection, so the growth figure shown here is national.",
      training: [LEARN_ON_JOB("Glazing contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([90, 90, 6, 10]),
      stateLicense: "none",
      licenseSummary: vtNoLicense("insulation installers") + " It's one of the smallest trades on this page.",
      licenseAgency: VT_RESIDENTIAL_REGISTRY,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([60, 60, 7, 0]),
      stateLicense: "none",
      licenseSummary: vtNoLicense("ironworkers") + " It's the smallest trade on this page.",
      licenseAgency: VT_RESIDENTIAL_REGISTRY,
      training: [national("Ironworkers union apprenticeship", "iron-workers-apprenticeship", "A national ironworkers union with locals in many states.")],
    }),
    t("mason", {
      outlook: ol([210, 220, 5, 20]),
      stateLicense: "none",
      licenseSummary: vtNoLicense("masons") + " It's one of the smallest trades on this page.",
      licenseAgency: VT_RESIDENTIAL_REGISTRY,
      training: [LEARN_ON_JOB("Masonry contractors")],
    }),
    t("millwright", {
      outlook: ol([40, 40, -9, 0]),
      stateLicense: "none",
      licenseSummary: vtNoLicense("millwrights") + " It's the only trade on this page with a clear projected decline in Vermont.",
      licenseAgency: VT_RESIDENTIAL_REGISTRY,
      training: [LEARN_ON_JOB("Industrial millwright shops")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary:
        vtNoLicense("pipefitters") + " Pipefitting isn't covered by Vermont's plumbing license on its own, so pipefitters train through union apprenticeship and employer programs rather than a state license.",
      licenseAgency: VT_PLUMBING,
      training: [UA_693],
      payNote: "Vermont's BLS projection groups pipefitters with plumbers and sprinkler fitters, so there's no separate pipefitter-only figure.",
    }),
    t("plasterer-stucco-mason", {
      stateLicense: "none",
      licenseSummary: vtNoLicense("plasterers or stucco masons") + " It's one of the smallest trades on this page, with no Vermont-specific pay or job data published.",
      licenseAgency: VT_RESIDENTIAL_REGISTRY,
      payNote: "Vermont publishes no pay or job projection for this small trade, so this page shows the national figures.",
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([400, 430, 7, 30]),
      stateLicense: "none",
      licenseSummary: vtNoLicense("roofers"),
      licenseAgency: VT_RESIDENTIAL_REGISTRY,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([490, 490, 1, 40]),
      stateLicense: "none",
      licenseSummary: vtNoLicense("sheet metal workers"),
      licenseAgency: VT_RESIDENTIAL_REGISTRY,
      training: [national("Sheet Metal Workers union (SMART) apprenticeship", "smart-sheet-metal-apprenticeship", "A national sheet-metal-workers union with locals in many states.")],
    }),
    t("solar-installer", {
      outlook: ol([80, 90, 21, 10]),
      stateLicense: "none",
      licenseSummary:
        "Vermont law explicitly exempts solar panel and racking installation, and small wind turbine erection, from needing an electrician license, up to the point of connecting to a building's existing wiring — a genuine carve-out, not just an informal practice. It's the fastest-growing trade with Vermont-specific projections on this page.",
      licenseAgency: VT_SOLAR_EXEMPTION,
      training: [LEARN_ON_JOB("Solar installation contractors")],
    }),
    t("sprinkler-fitter", {
      stateLicense: "none",
      licenseSummary:
        "Vermont certifies fire sprinkler system design only (NICET Level III, or a Vermont-licensed engineer); there's no standalone individual fitter license, so sprinkler fitters install systems under a certified designer's stamped plans rather than holding their own state license.",
      licenseSteps: [
        { title: "No individual fitter license", detail: "Vermont has no standalone license for the fitter/installer role; fitters work under a certified designer's stamped plans." },
        { title: "Design certification (different role)", detail: "Only fire sprinkler system design is certified, requiring NICET Level III or a Vermont-licensed engineer." },
      ],
      licenseAgency: VT_SPRINKLER_DESIGN,
      training: [national("Sprinkler Fitters union (UA Local 669)", "ua-sprinkler-fitter-apprenticeship", "A national sprinkler fitter union that hires through contractors in many states.")],
      payNote: "Vermont's BLS projection groups sprinkler fitters with plumbers and pipefitters, so there's no separate sprinkler-fitter-only figure.",
      businessNote: "A Vermont fire-sprinkler business needs access to a NICET III-certified designer (or a Vermont-licensed engineer) to stamp its system plans; there's no separate contractor license beyond that.",
    }),
    t("tile-setter", {
      outlook: ol([150, 170, 9, 10]),
      stateLicense: "none",
      licenseSummary: vtNoLicense("tile setters") + " It's one of the smallest trades on this page.",
      licenseAgency: VT_RESIDENTIAL_REGISTRY,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: vtNoLicense("waterproofing installers"),
      licenseAgency: VT_RESIDENTIAL_REGISTRY,
      payNote: "Waterproofing has no distinct federal job category, so no state-specific job count exists for it in Vermont or anywhere else on this site.",
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Vermont's Career and Technical Education centers",
      detail: "Vermont's 17 CTE centers run construction, electrical and other trade programs for high schoolers, backed by a $15 million state revolving-loan fund set aside to expand construction-focused CTE capacity.",
      source: VT_CTE_FUND,
    },
  ],
  adults: [
    {
      title: "Vermont Registered Apprenticeship",
      detail: "The state's Dept. of Labor registers and supports apprenticeships across the construction trades; apprentices earn wages from day one.",
      source: VT_APPRENTICESHIP,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Vermont statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Vermont long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=VT" },
    VT_ELECTRICAL,
    VT_PLUMBING,
    VT_ELEVATOR,
    VT_SPRINKLER_DESIGN,
    VT_RESIDENTIAL_REGISTRY,
    VT_CTE_FUND,
    VT_APPRENTICESHIP,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
