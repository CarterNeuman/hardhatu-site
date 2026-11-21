// Ohio state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Ohio-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Ohio";

const OCILB: SourceRef = { label: "Ohio Construction Industry Licensing Board (ORC Chapter 4740)", url: "https://codes.ohio.gov/ohio-revised-code/chapter-4740" };
const OH_ELEVATOR: SourceRef = { label: "Ohio Dept. of Commerce, elevator mechanic licensing (ORC Chapter 4785)", url: "https://codes.ohio.gov/ohio-revised-code/section-4785.04" };
const OH_FIRE_MARSHAL: SourceRef = { label: "Ohio State Fire Marshal, fire protection contractor certificate (ORC 3737.83)", url: "https://codes.ohio.gov/ohio-revised-code/section-3737.83" };
const OH_NO_LICENSE: SourceRef = { label: "Ohio has no statewide license for most construction trades; ORC Chapter 4740 names only five", url: "https://codes.ohio.gov/ohio-revised-code/chapter-4740" };
const TECHCRED: SourceRef = { label: "Ohio TechCred", url: "https://techcred.ohio.gov/" };
const APPRENTICE_OHIO: SourceRef = { label: "ApprenticeOhio (Ohio Dept. of Job and Family Services)", url: "https://jfs.ohio.gov/apprenticeohio" };
const CCP: SourceRef = { label: "Ohio College Credit Plus", url: "https://education.ohio.gov/Topics/Ohio-Education-Options/College-Credit-Plus" };

const IBEW_683: TrainingOption = {
  name: "IBEW Local 683 JATC",
  kind: "union",
  where: "Columbus",
  detail: "A paid union electrical apprenticeship serving central Ohio.",
  url: "https://columbusconstruction.org/training-center/ibew-local-683-jatc/",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const UA_189: TrainingOption = {
  name: "Plumbers and Pipefitters Local 189 JATC",
  kind: "union",
  where: "Columbus",
  detail: "A paid union apprenticeship for plumbers and pipefitters serving central Ohio.",
  url: "https://columbusconstruction.org/training-center/plumbers-and-pipefitters-local-189-jatc/",
  programSlug: "ua-plumber-pipefitter-apprenticeship",
};
const COLUMBUS_STATE: TrainingOption = {
  name: "Columbus State Community College, Skilled Trades Apprenticeships",
  kind: "college",
  where: "Columbus",
  detail: "Skilled-trades apprenticeship programs and a Construction Management department.",
  url: "https://www.cscc.edu/academics/departments/skilled-trades/apprenticeships.shtml",
};
const TRI_C: TrainingOption = {
  name: "Cuyahoga Community College (Tri-C), Skilled Construction Trades",
  kind: "college",
  where: "Cleveland",
  detail: "Pre-apprenticeship, plumbing and ironworking tracks, plus a broader construction-trades and manufacturing apprenticeship catalog.",
  url: "https://www.tri-c.edu/programs/applied-industrial-technology/skilled-construction-trades/index.html",
};
const ABC_OHIO_VALLEY: TrainingOption = {
  name: "ABC Ohio Valley craft training",
  kind: "open-shop",
  where: "Southwest Ohio, Cincinnati region",
  detail: "Open-shop craft training and apprenticeship programs through the Associated Builders and Contractors Ohio Valley chapter.",
  url: "https://www.ovabc.org/",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noStateLicense = (what: string) =>
  `Ohio has no license for ${what}, and no statewide general contractor license either. A city can still add its own local licensing on top, so check before taking on work in a new area.`;

export const OHIO: StateGuide = {
  // Ohio ZIP codes run 430xx-459xx.
  locationHints: { zip3: [[430, 459]], cities: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton", "Youngstown", "Canton"] },
  slug: "ohio",
  code: "OH",
  name: S,
  lastVerified: "2026-11-21",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Ohio long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=OH",
  },
  intro:
    "A field guide to 25 construction trades in Ohio: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ roughly 195,000-200,000 people in Ohio, with construction laborers and electricians by far the two largest.",
    "The Ohio Construction Industry Licensing Board (OCILB) licenses exactly five trades statewide: electrical, plumbing, HVAC, refrigeration and hydronics contractors, and only at the business level, for commercial work.",
    "Elevator mechanics and fire sprinkler fitters are each licensed under their own separate statutes, not through OCILB.",
    "There's no statewide general contractor license, and a city can layer its own licensing on top of the state system, especially for plumbing.",
    "Tile setters, flooring installers and electricians are tied as the fastest-growing trades on this page, all around 8%; millwrights are the only trade projected to shrink.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "TechCred", value: "$2,000", note: "Reimbursed per short-term credential (up to $30,000 per funding round) through Ohio's TechCred program, which has funded over 52,000 credentials statewide" },
  licensingOverview:
    "Ohio's Construction Industry Licensing Board (OCILB) licenses exactly five trades statewide, and only at the business level: electrical, plumbing, HVAC, refrigeration and hydronics contractors doing commercial work. There's no state journeyman or master tier for any of them; that kind of ladder, where it exists, comes from a city's own licensing (Columbus, for instance, requires its own journeyperson plumber license on top of the state contractor license) or from a union apprenticeship program, not from the state. Elevator mechanics and fire sprinkler fitters are each licensed under their own separate statutes. Every other trade on this page, including carpentry, roofing and HVAC's close cousin, sheet metal work, has no state license, though cities can add their own requirements. Note: OCILB's licensing authority for these five trades is due to expire Dec. 31, 2026 unless the legislature renews it; a renewal bill was moving through the General Assembly as of late 2026, so check current status if reading this close to that date.",
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
      "With no statewide commercial GC license, Ohio has one of the lower regulatory barriers to general contracting of any state on this site, outside the five OCILB trades.",
      "An OCILB contractor license, once earned, carries statewide, even though a city can still require its own additional registration or license on top.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "A state license is only one layer; a city like Columbus can require its own separate registration, bond or license for the same work.",
    ],
    path:
      "The usual route: work for someone else for years, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      OCILB,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([41380, 43420, 5, 3540]),
      stateLicense: "none",
      licenseSummary: "Ohio has no license for construction laborers. It is by far the largest trade on this page.",
      licenseAgency: OH_NO_LICENSE,
      training: [ABC_OHIO_VALLEY, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([30220, 32560, 8, 2920]),
      stateLicense: "contractor",
      licenseSummary:
        "Ohio licenses electrical contracting at the business level through OCILB: at least 18, 5 years of trade experience (or a registered engineer with 3 years of business experience), $500,000 of liability insurance, and a passing exam score. This covers commercial work; Ohio has no state journeyman or master electrician license, and some cities require their own separate electrician license on top.",
      licenseAgency: OCILB,
      training: [IBEW_683, COLUMBUS_STATE],
      businessNote: "The OCILB license covers commercial work statewide, but a city can still require its own additional electrician license or registration.",
    }),
    t("equipment-operator", {
      outlook: ol([16800, 17220, 3, 1410]),
      stateLicense: "none",
      licenseSummary: "Ohio has no state license for equipment operators. Employers look for training records and safe hours in the seat, and crane operators need national certification under federal OSHA rules.",
      licenseAgency: OH_NO_LICENSE,
      training: [national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([21260, 21260, 0, 2050]),
      stateLicense: "none",
      licenseSummary: "Ohio has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS). It's a large trade here, flat in projected growth but with over 2,000 openings a year from turnover.",
      licenseAgency: OH_NO_LICENSE,
      training: [COLUMBUS_STATE],
    }),
    t("hvac-technician", {
      outlook: ol([14620, 15690, 7, 1360]),
      stateLicense: "contractor",
      licenseSummary:
        "Ohio licenses HVAC and refrigeration contracting at the business level through OCILB, under the same framework as electrical contracting: 5 years of trade experience, insurance and a passing exam score. This covers commercial work; there's no state journeyman or master HVAC license. Anyone handling refrigerants also needs the federal EPA Section 608 certification, which applies in every state.",
      licenseAgency: OCILB,
      training: [TRI_C, COLUMBUS_STATE],
    }),
    t("carpenter", {
      outlook: ol([23540, 23970, 2, 1730]),
      stateLicense: "none",
      licenseSummary: noStateLicense("carpenters") + " It's the third-largest trade on this page.",
      licenseAgency: OH_NO_LICENSE,
      training: [ABC_OHIO_VALLEY, COLUMBUS_STATE],
    }),
    t("plumber", {
      outlook: ol([16140, 16640, 3, 1380]),
      stateLicense: "contractor",
      licenseSummary:
        "Ohio licenses plumbing and hydronics contracting at the business level through OCILB: 5 years of trade experience, a notarized application, a state and federal background check, two PSI exams (business and law, and plumbing), and $500,000 of liability insurance. This is Ohio's only state plumbing credential; there's no state journeyman or master plumber license. Some cities, including Columbus, require their own additional journeyperson plumber license and contractor registration on top of the state license. This outlook figure is a combined BLS category covering plumbers, pipefitters and steamfitters together, so it isn't just plumbers.",
      licenseAgency: OCILB,
      training: [UA_189, TRI_C],
      businessNote: "Columbus, for one, layers its own journeyperson plumber license and contractor registration on top of the state OCILB license.",
      payNote: "Ohio's BLS projection groups plumbers with pipefitters and steamfitters, so this figure isn't plumbers alone.",
    }),
    t("painter", {
      outlook: ol([9060, 9160, 1, 710]),
      stateLicense: "none",
      licenseSummary: noStateLicense("painters"),
      licenseAgency: OH_NO_LICENSE,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([5800, 5890, 2, 400]),
      stateLicense: "none",
      licenseSummary: noStateLicense("concrete finishers"),
      licenseAgency: OH_NO_LICENSE,
      training: [LEARN_ON_JOB("Concrete and site contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([1530, 1560, 3, 110]),
      stateLicense: "none",
      licenseSummary: noStateLicense("drywall installers"),
      licenseAgency: OH_NO_LICENSE,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([150, 160, 5, 10]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Ohio requires elevator mechanics to hold an individual license under its own separate elevator-safety statute: 3 years of industry experience plus a passing exam, a registered apprenticeship, completion of a nationally recognized training program's mechanic exam, or reciprocity from a state with equivalent standards.",
      licenseAgency: OH_ELEVATOR,
      extraCredentials: ["Ohio elevator mechanic license"],
      training: [national("Elevator Constructors union (IUEC) training", "neiep-elevator-constructor-apprenticeship", "Union elevator apprenticeship through the National Elevator Industry Educational Program.")],
      ownBusiness: "Elevator work takes specialized tools, insurance and manufacturer relationships, so most mechanics work for established companies.",
    }),
    t("flooring-installer", {
      outlook: ol([1270, 1370, 8, 100]),
      stateLicense: "none",
      licenseSummary: noStateLicense("flooring installers") + " It's one of the fastest-growing trades on this page.",
      licenseAgency: OH_NO_LICENSE,
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([1610, 1660, 3, 130]),
      stateLicense: "none",
      licenseSummary: noStateLicense("glaziers"),
      licenseAgency: OH_NO_LICENSE,
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([1340, 1390, 3, 110]),
      stateLicense: "none",
      licenseSummary: noStateLicense("insulation installers"),
      licenseAgency: OH_NO_LICENSE,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([1940, 2020, 4, 160]),
      stateLicense: "none",
      licenseSummary: noStateLicense("ironworkers"),
      licenseAgency: OH_NO_LICENSE,
      ownBusiness: "Steel erection companies need heavy equipment and big insurance policies, so most ironworkers work for established firms.",
      training: [national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork.")],
    }),
    t("mason", {
      outlook: ol([3920, 3950, 1, 280]),
      stateLicense: "none",
      licenseSummary: noStateLicense("masons"),
      licenseAgency: OH_NO_LICENSE,
      training: [LEARN_ON_JOB("Masonry contractors"), national("Bricklayers union (BAC)", "bac-bricklayer-apprenticeship", "Union apprenticeships for brick, block and stone masons.")],
    }),
    t("millwright", {
      outlook: ol([1940, 1890, -2, 160]),
      stateLicense: "none",
      licenseSummary: "Ohio has no state license for millwrights. It's the only trade on this page projected to shrink in Ohio.",
      licenseAgency: OH_NO_LICENSE,
      training: [national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary: "Pipefitting isn't separately licensed by the state; Ohio's OCILB plumbing and hydronics license covers plumbing contracting, but pipefitting and steamfitting work is handled through union apprenticeship and employer certification rather than a state license.",
      licenseAgency: OCILB,
      ownBusiness: "Piping contractors need crews, insurance and often a licensed plumber on staff for connected plumbing work.",
      training: [UA_189, national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Paid union apprenticeships in pipefitting.")],
      payNote: "Ohio's BLS projection groups pipefitters with plumbers and steamfitters, so there's no separate pipefitter-only figure.",
    }),
    t("plasterer-stucco-mason", {
      outlook: ol([200, 200, 3, 20]),
      stateLicense: "none",
      licenseSummary: noStateLicense("plasterers") + " It's the smallest trade on this page.",
      licenseAgency: OH_NO_LICENSE,
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([5090, 5310, 4, 380]),
      stateLicense: "none",
      licenseSummary: "Ohio has no state roofing license today. The legislature has tried three times since 2021 to require a state license for commercial roofing contractors; the latest bill is still sitting in committee, so check current rules before taking on commercial roofing work.",
      licenseAgency: OH_NO_LICENSE,
      training: [LEARN_ON_JOB("Roofing contractors")],
    }),
    t("sheet-metal-worker", {
      outlook: ol([5820, 5900, 1, 480]),
      stateLicense: "none",
      licenseSummary: "Ohio has no state license for sheet metal workers.",
      licenseAgency: OH_NO_LICENSE,
      training: [national("Sheet metal apprenticeships (SMART)", "smart-sheet-metal-apprenticeship", "Union sheet metal apprenticeships.")],
    }),
    t("solar-installer", {
      stateLicense: "none",
      licenseSummary: "Ohio has no dedicated solar installer license; solar installers typically carry voluntary NABCEP certification instead, and the electrical connections on a system still fall under whatever electrical licensing applies to that job.",
      licenseAgency: OH_NO_LICENSE,
      training: [IBEW_683],
      payNote: "Ohio has no state-specific job-outlook figure for solar installers; only national data is published for this trade here.",
    }),
    t("sprinkler-fitter", {
      stateLicense: "worker-certification",
      licenseSummary: "Ohio requires anyone who installs, tests, repairs or maintains fire protection equipment as a for-profit business to hold a certificate from the State Fire Marshal, under its own separate statute from the main construction licensing board.",
      licenseAgency: OH_FIRE_MARSHAL,
      extraCredentials: ["Ohio Fire Marshal fire protection certificate"],
      training: [national("Sprinkler Fitters union (UA)", "ua-sprinkler-fitter-apprenticeship", "Five-year registered apprenticeship through a signatory contractor.")],
      payNote: "Ohio's BLS projection groups sprinkler fitters with plumbers and pipefitters, so there's no separate sprinkler-fitter-only figure.",
    }),
    t("tile-setter", {
      outlook: ol([980, 1060, 8, 80]),
      stateLicense: "none",
      licenseSummary: noStateLicense("tile setters") + " It's one of the fastest-growing trades on this page.",
      licenseAgency: OH_NO_LICENSE,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: noStateLicense("waterproofing installers"),
      licenseAgency: OH_NO_LICENSE,
      payNote: "Waterproofing has no distinct federal job category, so any figure for it here would be a rough proxy, not an official statistic.",
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "College Credit Plus",
      detail: "Ohio's free statewide dual-enrollment program for grades 7-12; check with a local school counselor or community college for construction-trades coursework available through it.",
      source: CCP,
    },
  ],
  adults: [
    {
      title: "TechCred",
      detail: "Reimburses employers up to $2,000 per short-term credential per employee (capped at $30,000 per funding round); over 52,000 credentials funded across 16 rounds so far.",
      source: TECHCRED,
    },
    {
      title: "ApprenticeOhio",
      detail: "Ohio's federally recognized State Apprenticeship Agency, run through the Department of Job and Family Services; more than 23,600 active apprentices across over 600 sponsors statewide.",
      source: APPRENTICE_OHIO,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Ohio statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Ohio long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=OH" },
    OCILB,
    OH_ELEVATOR,
    OH_FIRE_MARSHAL,
    TECHCRED,
    APPRENTICE_OHIO,
    CCP,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
