// Maryland state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Maryland-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, NEIEP, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Maryland";

const MD_ELECTRICIAN: SourceRef = { label: "Maryland State Board of Electricians", url: "https://labor.maryland.gov/license/elec/elecreq.shtml" };
const MD_HVACR: SourceRef = { label: "Maryland Board of HVACR Contractors", url: "https://labor.maryland.gov/license/hvacr/hvacrlicreq.shtml" };
const MD_PLUMBING: SourceRef = { label: "Maryland Board of Plumbing", url: "https://labor.maryland.gov/license/pl/plreq.shtml" };
const MD_FIRE_MARSHAL: SourceRef = { label: "Maryland Office of the State Fire Marshal, fire sprinkler contractors", url: "https://firemarshal.maryland.gov/permits-licensing/fire-sprinkler-contractors" };
const MD_ELEVATOR: SourceRef = { label: "Maryland Elevator Safety Review Board", url: "https://labor.maryland.gov/License/elev/elevlicreq.shtml" };
const MD_MHIC: SourceRef = { label: "Maryland Home Improvement Commission (MHIC)", url: "https://labor.maryland.gov/License/mhic/mhiclicreq.shtml" };
const MD_SOLAR: SourceRef = { label: "Maryland Home Improvement Commission, solar and green-technology licensing guidance", url: "https://labor.maryland.gov/license/mhic/mhicgreen.shtml" };
const MD_NO_LICENSE: SourceRef = { label: "Maryland Dept. of Labor licensing boards (no board covers this trade)", url: "https://labor.maryland.gov/license/" };
const MD_WDSS: SourceRef = { label: "Maryland Higher Education Commission, Workforce Development Sequence Scholarship", url: "https://mhec.maryland.gov/preparing/Pages/24-25-WDSS.aspx" };
const MD_AMP: SourceRef = { label: "Apprenticeship Maryland Program (youth apprenticeship)", url: "https://labor.maryland.gov/employment/appr/youthapprfaqs.shtml" };
const MD_APPRENTICESHIP: SourceRef = { label: "Maryland Dept. of Labor, Registered Apprenticeship", url: "https://dllr.state.md.us/employment/appr/apprbrochure.pdf" };

const IBEW_24: TrainingOption = {
  name: "IBEW Local 24 / NECA Maryland JATC",
  kind: "union",
  where: "Baltimore",
  detail: "A paid union electrical apprenticeship serving the Baltimore area, run jointly with the NECA Maryland chapter.",
  url: "https://dllr.state.md.us/employment/appr/apprssibew24.shtml",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const UA_486: TrainingOption = {
  name: "Plumbers and Steamfitters Local Union No. 486 JATC",
  kind: "union",
  where: "Rosedale",
  detail: "A paid union apprenticeship for plumbers, pipefitters and steamfitters serving the Baltimore area.",
  url: "https://labor.maryland.gov/employment/appr/appramblocal486.shtml",
  programSlug: "ua-plumber-pipefitter-apprenticeship",
};
const SMART_100: TrainingOption = {
  name: "Sheet Metal Workers Local Union No. 100 JATC",
  kind: "union",
  where: "Baltimore",
  detail: "A paid union apprenticeship for sheet metal workers serving the Baltimore area.",
  url: "https://labor.maryland.gov/employment/appr/apprsssmart100.shtml",
  programSlug: "smart-sheet-metal-apprenticeship",
};
const IUOE_37: TrainingOption = {
  name: "Operating Engineers Local 37 JATC",
  kind: "union",
  where: "Sparrows Point / Edgemere",
  detail: "A paid union apprenticeship for heavy equipment operators serving the Baltimore area.",
  url: "https://dllr.state.md.us/employment/dwdal-r2c-operating-engineers-loca37.pdf",
  programSlug: "iuoe-heavy-equipment-operator-apprenticeship",
};
const CCBC: TrainingOption = {
  name: "Community College of Baltimore County (CCBC), Construction Pre-Apprenticeship",
  kind: "college",
  where: "Baltimore County",
  detail: "An NCCER-based core curriculum (98 hours) plus a chosen specialty track (carpentry, electrical, HVAC or plumbing, 156 hours), run with Associated Builders & Contractors of Greater Baltimore. Tuition and fees apply (roughly $2,500-$5,300 total), it isn't free.",
  url: "https://www.ccbcmd.edu/Programs-and-Courses-Finder/ConEd-Program/construction-pre-apprenticeship-core-curriculum-specialties-training.html",
};
const ABC_BALTIMORE: TrainingOption = {
  name: "ABC Baltimore apprenticeship",
  kind: "open-shop",
  where: "Baltimore region",
  detail: "Open-shop registered apprenticeships through the Associated Builders and Contractors Baltimore chapter.",
  url: "https://www.abcbaltimore.org/apprenticeship-trust",
};
const ABC_METRO_DC: TrainingOption = {
  name: "ABC of Metro Washington apprenticeship",
  kind: "open-shop",
  where: "Maryland suburbs of Washington, D.C.",
  detail: "Open-shop registered apprenticeships through the Associated Builders and Contractors Metro Washington chapter, serving Montgomery and Prince George's counties.",
  url: "https://www.abcmetrowashington.org/",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const mhicSummary = (what: string) =>
  `Maryland has no individual ${what} license. A business doing residential remodeling or repair work needs a Home Improvement Commission (MHIC) contractor license: a PSI exam, at least 2 years of experience or related education, and $50,000 of liability insurance kept in effect, renewed every 2 years (applicants who don't meet financial solvency guidelines can instead post a surety bond or get an indemnitor). New-home construction and commercial work fall outside MHIC and need no state license at all.`;
const mhicBusinessNote =
  "The MHIC license is held at the business level, not by every individual worker; a company needs at least one person backing it who holds the license and meets its requirements.";

export const MARYLAND: StateGuide = {
  // Maryland ZIP codes run 206xx-219xx.
  locationHints: { zip3: [[206, 219]], cities: ["Baltimore", "Columbia", "Silver Spring", "Germantown", "Annapolis", "Frederick", "Rockville", "Gaithersburg"] },
  slug: "maryland",
  code: "MD",
  name: S,
  lastVerified: "2026-11-22",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Maryland long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2061.00?st=MD",
  },
  intro:
    "A field guide to 25 construction trades in Maryland: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ roughly 110,000-115,000 people in Maryland, with construction laborers, electricians and carpenters the three largest.",
    "Maryland's Home Improvement Commission (MHIC) licenses the business side of most residential remodeling and repair trades statewide; it's a business license, not an individual worker exam, and it doesn't cover new-home construction or commercial work.",
    "Electricians, HVAC technicians and plumbers each have a real individual journeyman-to-master ladder through their own state board; elevator mechanics have a single state-certified tier.",
    "Solar installer is by far the fastest-growing trade on this page, projected to grow 40% — no other trade comes close.",
    "No trade on this page is projected to shrink in Maryland over this period.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "Workforce Development Sequence Scholarship", value: "$2,000", note: "Up to $2,000 a year toward tuition, fees and costs at a Maryland community college for a job-focused, non-credit workforce sequence tied to a registered apprenticeship or industry credential" },
  licensingOverview:
    "Maryland's licensing picture has two very different layers. Electricians, HVACR technicians and plumbers each go through their own state board with a real apprentice-to-master career ladder, each ending in an exam through PSI. Elevator mechanics have a single state-certified tier plus a separate contractor tier for businesses that employ them. Fire sprinkler work is licensed at the business level by the Office of the State Fire Marshal, with at least one NICET-certified (or Maryland-licensed engineer) Designated Qualified Individual on staff. Then there's the Home Improvement Commission (MHIC): rather than licensing carpenters, painters, roofers, tile setters and most of the other trades on this page individually, Maryland licenses the business doing residential remodeling or repair work under one umbrella credential. That MHIC license explicitly covers things like driveways, decks, porches, basement waterproofing and storm windows by statute, but it stops at residential repair and remodeling; new-home construction instead only needs a registration (not a skills license) with the Attorney General's Home Builder Registration Unit, and commercial work under any of these trades needs no state license at all. A handful of trades, mostly industrial ones like ironworking, millwrighting and structural pipefitting, have no Maryland license of any kind.",
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
      "An MHIC license, once earned, covers residential remodeling and repair work statewide under one credential, across most of the trades on this page.",
      "A Maryland master electrician, HVACR or plumbing license carries real weight and is recognized statewide.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "MHIC's $50,000 insurance floor is a real up-front cost before a business can legally take on residential work, and some applicants also need a bond or indemnitor.",
    ],
    path:
      "The usual route: work for someone else for years, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      MD_MHIC,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([28690, 31210, 9, 2610]),
      stateLicense: "none",
      licenseSummary: "Maryland has no license for construction laborers. It's the largest trade on this page.",
      licenseAgency: MD_NO_LICENSE,
      training: [national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([14910, 16640, 12, 1520]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Maryland's Board of Electricians licenses electricians through an apprentice-to-master ladder, each exam given through PSI. The agency's own licensing-requirements page doesn't describe a separate business-level license on top of the individual master electrician credential.",
      licenseSteps: [
        { title: "Apprentice Electrician", detail: "Apply through the Board's eLicensing system; no minimum hours are set for this tier itself." },
        { title: "Journeyperson Electrician", detail: "4 years principally providing electrical services under supervision, or a Board-approved apprenticeship with at least 576 classroom hours and 8,000 work hours completed within 2 years of applying, then a PSI exam." },
        { title: "Master Electrician", detail: "7 years providing electrical services under a licensed master (up to 3 years can come from approved coursework/training), then a PSI exam and proof of $300,000 minimum general-liability insurance." },
      ],
      licenseAgency: MD_ELECTRICIAN,
      training: [IBEW_24],
    }),
    t("equipment-operator", {
      outlook: ol([6820, 7180, 5, 600]),
      stateLicense: "none",
      licenseSummary: "Maryland has no state license for equipment operators. Employers look for training records and safe hours in the seat, and crane operators need national certification under federal OSHA rules.",
      licenseAgency: MD_NO_LICENSE,
      training: [IUOE_37],
    }),
    t("welder", {
      outlook: ol([3110, 3310, 7, 330]),
      stateLicense: "none",
      licenseSummary: "Maryland has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS).",
      licenseAgency: MD_NO_LICENSE,
      training: [LEARN_ON_JOB("Welding shops and fabricators")],
    }),
    t("hvac-technician", {
      outlook: ol([9130, 9970, 9, 880]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Maryland's Board of HVACR Contractors runs a four-tier ladder, each exam passed at 70% or higher. A Limited or Master Restricted license covers a narrower scope than full Master; contracting work at any of the three top tiers also requires meeting a separate insurance requirement.",
      licenseSteps: [
        { title: "Journeyman", detail: "4 years as a licensed apprentice, including at least 6,000 training hours under a licensed HVACR contractor, then an exam at 70%." },
        { title: "Limited (optional, narrower scope)", detail: "Journeyman plus 2 years of active experience under an HVACR master and at least 1,000 hours worked in the prior year, then an exam at 70%." },
        { title: "Master Restricted (optional, one specialty)", detail: "Journeyman plus 3 years of active experience under an HVACR master and at least 1,875 hours worked in the prior year, then an exam at 70% covering one specialty area." },
        { title: "Master", detail: "The same 3-year/1,875-hour structure as Master Restricted, but covering all areas of HVACR service, then an exam at 70%." },
      ],
      licenseAgency: MD_HVACR,
      training: [CCBC, ABC_BALTIMORE],
    }),
    t("carpenter", {
      outlook: ol([13500, 14220, 5, 1060]),
      stateLicense: "contractor",
      licenseSummary: mhicSummary("carpenter"),
      licenseAgency: MD_MHIC,
      businessNote: mhicBusinessNote,
      training: [ABC_BALTIMORE, CCBC],
    }),
    t("plumber", {
      outlook: ol([12420, 13190, 6, 1110]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Maryland's Board of Plumbing licenses plumbers through an apprentice-to-master ladder. A separate, parallel natural-gas-fitter ladder exists for gas work specifically, through the same Board.",
      licenseSteps: [
        { title: "Apprentice", detail: "Minimum age 16." },
        { title: "Journey", detail: "At least 4 years as an apprentice, 7,500 hours of training under a licensed master plumber, 32 hours of backflow-prevention-device training, then a written exam." },
        { title: "Master", detail: "At least 2 years as a journey plumber, 3,750 more hours of training under a licensed master plumber, then a written exam." },
      ],
      licenseAgency: MD_PLUMBING,
      businessNote: "A Maryland plumbing business must have a master plumber as its qualifying licensee, and must register the business itself with the Board of Plumbing.",
      training: [UA_486],
    }),
    t("painter", {
      outlook: ol([5710, 6010, 5, 480]),
      stateLicense: "contractor",
      licenseSummary: mhicSummary("painter"),
      licenseAgency: MD_MHIC,
      businessNote: mhicBusinessNote,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([2550, 2620, 2, 180]),
      stateLicense: "contractor",
      licenseSummary:
        "Maryland has no individual concrete-finisher license. MHIC's home-improvement law broadly covers residential remodeling and repair, including adjacent-land work like driveways, so a business pouring residential driveways or flatwork needs an MHIC contractor license; commercial concrete work needs no state license.",
      licenseAgency: MD_MHIC,
      businessNote: mhicBusinessNote,
      training: [LEARN_ON_JOB("Concrete contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([1820, 1930, 6, 140]),
      stateLicense: "contractor",
      licenseSummary: mhicSummary("drywall installer"),
      licenseAgency: MD_MHIC,
      businessNote: mhicBusinessNote,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([810, 870, 7, 70]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Maryland's Elevator Safety Review Board licenses elevator mechanics through a certification, experience, or reciprocity path, plus a separate contractor tier for businesses that employ and certify mechanics.",
      licenseSteps: [
        { title: "Elevator Mechanic", detail: "3 years of verified elevator work experience, plus either a Board exam, a NEIEP (or equivalent) program completion certificate, or a registered apprenticeship completion certificate with standards equivalent to the Board's own requirements." },
        { title: "Elevator Contractor (business)", detail: "5 years of elevator-industry work experience; needed to employ and certify mechanics or request temporary licenses." },
      ],
      licenseAgency: MD_ELEVATOR,
      training: [NEIEP],
    }),
    t("flooring-installer", {
      outlook: ol([610, 680, 12, 50]),
      stateLicense: "contractor",
      licenseSummary: mhicSummary("flooring installer"),
      licenseAgency: MD_MHIC,
      businessNote: mhicBusinessNote,
      training: [LEARN_ON_JOB("Flooring contractors")],
    }),
    t("glazier", {
      outlook: ol([1960, 2050, 5, 170]),
      stateLicense: "contractor",
      licenseSummary:
        "Maryland has no individual glazier license. MHIC's home-improvement law broadly covers residential remodeling and repair, including window work, so a business doing residential window and glazing work needs an MHIC contractor license; commercial glazing needs no state license.",
      licenseAgency: MD_MHIC,
      businessNote: mhicBusinessNote,
      training: [LEARN_ON_JOB("Glazing contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([1280, 1350, 5, 110]),
      stateLicense: "contractor",
      licenseSummary: mhicSummary("insulation installer"),
      licenseAgency: MD_MHIC,
      businessNote: mhicBusinessNote,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([720, 770, 7, 60]),
      stateLicense: "none",
      licenseSummary: "Maryland has no state license for ironworkers. This is structural/commercial work, outside MHIC's residential-only scope.",
      licenseAgency: MD_NO_LICENSE,
      training: [national("Ironworkers union", "iron-workers-apprenticeship", "A paid union apprenticeship for structural and ornamental ironworkers.")],
    }),
    t("mason", {
      outlook: ol([2260, 2390, 5, 180]),
      stateLicense: "contractor",
      licenseSummary: mhicSummary("mason"),
      licenseAgency: MD_MHIC,
      businessNote: mhicBusinessNote,
      training: [LEARN_ON_JOB("Masonry contractors")],
    }),
    t("millwright", {
      outlook: ol([160, 160, 1, 20]),
      stateLicense: "none",
      licenseSummary: "Maryland has no state license for millwrights. This is industrial work, outside MHIC's residential-only scope. It's one of the smallest and slowest-growing trades on this page.",
      licenseAgency: MD_NO_LICENSE,
      training: [LEARN_ON_JOB("Industrial millwright shops")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary:
        "Industrial and process pipefitting has no Maryland license of its own. Gas-piping work specifically falls under the Board of Plumbing's separate natural-gas-fitter credential, not a standalone pipefitter license.",
      licenseSteps: [
        { title: "No state license (industrial scope)", detail: "Structural and process pipefitting outside the plumbing/gas-fitting scope has no Maryland license." },
        { title: "Natural gas fitter (gas-piping scope only)", detail: "Gas-piping work goes through the Board of Plumbing's separate apprentice/journey/master gas-fitter ladder instead." },
      ],
      licenseAgency: MD_PLUMBING,
      training: [UA_486],
      payNote: "Maryland's BLS projection groups pipefitters with plumbers and sprinkler fitters, so there's no separate pipefitter-only figure.",
      businessNote: "A pipefitting business doing gas work needs a licensed master gas fitter on staff; purely industrial/process piping has no state licensing requirement at all.",
    }),
    t("plasterer-stucco-mason", {
      outlook: ol([160, 170, 7, 10]),
      stateLicense: "contractor",
      licenseSummary: mhicSummary("plasterer or stucco mason"),
      licenseAgency: MD_MHIC,
      businessNote: mhicBusinessNote,
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([2520, 2700, 7, 200]),
      stateLicense: "contractor",
      licenseSummary: mhicSummary("roofer"),
      licenseAgency: MD_MHIC,
      businessNote: mhicBusinessNote,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([2080, 2160, 4, 180]),
      stateLicense: "none",
      licenseSummary:
        "Maryland has no standalone sheet-metal license. Ductwork installed as part of an HVAC system falls under the HVACR contractor's own license scope; architectural or standalone sheet-metal fabrication has no separate state license.",
      licenseAgency: MD_HVACR,
      training: [SMART_100],
    }),
    t("solar-installer", {
      outlook: ol([660, 920, 40, 90]),
      stateLicense: "none",
      licenseSummary:
        "Maryland has no dedicated solar installer license. Mounting and racking panels on a home needs an MHIC home-improvement contractor license; connecting the system to the electrical panel or grid needs a Maryland electrician's license; connecting a solar thermal/hot-water system to the plumbing needs a licensed plumber. No NABCEP or other solar-specific state certification is required. It's by far the fastest-growing trade on this page.",
      licenseAgency: MD_SOLAR,
      training: [ABC_BALTIMORE, LEARN_ON_JOB("Solar installation contractors")],
    }),
    t("sprinkler-fitter", {
      stateLicense: "contractor",
      licenseSummary:
        "Maryland licenses fire sprinkler contracting at the business level through the Office of the State Fire Marshal. Each licensed contractor must name at least one Designated Qualified Individual (DQI) who holds a NICET certificate or a Maryland Professional Engineer license; individual fitters typically come up through a union apprenticeship rather than holding a personal state license.",
      licenseSteps: [
        { title: "Designated Qualified Individual (DQI)", detail: "A NICET certificate or a Maryland Professional Engineer license, named by the contractor for the specific license class being sought." },
        { title: "Fire Sprinkler Contractor (business)", detail: "A 2-year Office of the State Fire Marshal license across one of several classes (inspection/testing, or residential/commercial installation and design); $300 initial fee, $200 renewal." },
      ],
      licenseAgency: MD_FIRE_MARSHAL,
      extraCredentials: ["Maryland fire sprinkler Designated Qualified Individual credential (NICET or PE)"],
      training: [national("Sprinkler Fitters union (UA)", "ua-sprinkler-fitter-apprenticeship", "Five-year registered apprenticeship through a signatory contractor.")],
      payNote: "Maryland's BLS projection groups sprinkler fitters with plumbers and pipefitters, so there's no separate sprinkler-fitter-only figure.",
      businessNote: "Opening a Maryland fire sprinkler contracting business takes an Office of the State Fire Marshal license with a NICET-certified or PE-credentialed Designated Qualified Individual on staff, plus insurance naming the Fire Marshal's office.",
    }),
    t("tile-setter", {
      outlook: ol([320, 360, 12, 30]),
      stateLicense: "contractor",
      licenseSummary: mhicSummary("tile setter"),
      licenseAgency: MD_MHIC,
      businessNote: mhicBusinessNote,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "contractor",
      licenseSummary:
        "Maryland has no individual waterproofing license. MHIC's home-improvement law broadly covers residential remodeling and repair, including basement waterproofing, so a business doing residential waterproofing needs an MHIC contractor license.",
      licenseAgency: MD_MHIC,
      businessNote: mhicBusinessNote,
      payNote: "Waterproofing has no distinct federal job category, so no state-specific job count exists for it in Maryland or anywhere else on this site.",
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Apprenticeship Maryland Program (AMP)",
      detail: "A paid youth apprenticeship for high schoolers: at least 450 paid hours with a state-approved employer, typically from the summer after junior year through senior year, earning high-school credit and an industry credential. Covers construction and development among its industry clusters; county participation varies, so check with a local school counselor.",
      source: MD_AMP,
    },
  ],
  adults: [
    {
      title: "Workforce Development Sequence Scholarship (WDSS)",
      detail: "Up to $2,000 a year toward tuition, fees and the cost of a non-credit workforce-development sequence at a participating Maryland community college, tied to a registered apprenticeship, licensure, or job-skill credential; open to Maryland residents, MD high school graduates, or active-duty military stationed in the state.",
      source: MD_WDSS,
    },
    {
      title: "Registered Apprenticeship",
      detail: "Maryland's Dept. of Labor runs the state's registered-apprenticeship system: a paid job with a progressive pay scale, with no tuition cost to the apprentice.",
      source: MD_APPRENTICESHIP,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Maryland statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Maryland long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2061.00?st=MD" },
    MD_ELECTRICIAN,
    MD_HVACR,
    MD_PLUMBING,
    MD_FIRE_MARSHAL,
    MD_ELEVATOR,
    MD_MHIC,
    MD_SOLAR,
    MD_WDSS,
    MD_AMP,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
