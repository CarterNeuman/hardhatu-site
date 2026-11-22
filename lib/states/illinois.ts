// Illinois state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Illinois-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Illinois";

const IDPH_PLUMBING: SourceRef = { label: "Illinois Dept. of Public Health, plumber licensing (225 ILCS 320)", url: "https://dph.illinois.gov/topics-services/environmental-health-protection/plumbing.html" };
const IL_NO_LICENSE: SourceRef = { label: "Illinois has no statewide license for most construction trades; regulation, where it exists at all, happens city by city", url: "https://www.housecallpro.com/licensing/general-contractor/illinois/" };
const CHICAGO_ELECTRICAL: SourceRef = { label: "City of Chicago, Supervising Electrician and Electrical Contractor licenses", url: "https://chicago.gov/city/en/depts/bldgs/supp_info/TLdetails/SupvEL.html" };
const OSFM_ELEVATOR: SourceRef = { label: "Office of the Illinois State Fire Marshal, elevator mechanic licensing (225 ILCS 312)", url: "https://sfm.illinois.gov/content/dam/soi/en/web/sfm/sfmdocuments/documents/mechanicappwithrenewal.pdf" };
const OSFM_SPRINKLER: SourceRef = { label: "Office of the Illinois State Fire Marshal, Fire Sprinkler Contractor Licensing Act (225 ILCS 317)", url: "https://sfm.illinois.gov/content/dam/soi/en/web/sfm/sfmdocuments/documents/osfm-fscla-fact-sheet-nov-2021.pdf" };
const IDFPR_ROOFING: SourceRef = { label: "Illinois Dept. of Financial and Professional Regulation, Roofing Industry Licensing Act (225 ILCS 335)", url: "https://idfpr.illinois.gov/profs/roof.html" };
const DCEO_PREAPPRENTICE: SourceRef = { label: "Illinois DCEO, Illinois Works Pre-Apprenticeship Program", url: "https://dceo.illinois.gov/illinoisworks/preapprenticeship" };
const MAP_GRANT: SourceRef = { label: "Illinois Student Assistance Commission, MAP Grant", url: "https://isac.org/mapgrant" };
const APPRENTICESHIP_IL: SourceRef = { label: "Illinois DCEO / IllinoisWorknet, Apprenticeship Illinois", url: "https://ides.illinois.gov/jobs-workforce/programs/apprenticeships-employer.html" };

const IBEW_134: TrainingOption = {
  name: "IBEW Local 134 / NECA Chicago Electrical JATT",
  kind: "union",
  where: "Alsip (Chicago metro)",
  detail: "A 5-year Construction Electrician apprenticeship combining classroom instruction with on-the-job training under union electrical contractors, trained at the IBEW-NECA Technical Institute in Alsip.",
  url: "https://explore.skillup.org/all/training/ibew-local-union-no-134/construction-electrician-apprenticeship",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const UA_130: TrainingOption = {
  name: "Plumbers' Joint Apprenticeship Committee, UA Local 130 (Chicago)",
  kind: "union",
  where: "Chicago, Volo and Joliet",
  detail: "One of the largest plumbing apprenticeships in the country: a paid 5-year program, roughly 150 spots out of about 2,500 applicants per session, with training centers in Chicago, Volo and a recently renovated Joliet facility.",
  url: "https://explore.skillup.org/all/training/ua-local-130/plumber-apprenticeship",
  programSlug: "ua-plumber-pipefitter-apprenticeship",
};
const ABC_ILLINOIS: TrainingOption = {
  name: "ABC Illinois apprenticeship and craft training",
  kind: "open-shop",
  where: "Statewide",
  detail: "Registered apprenticeship and craft-training programs, including carpentry and laborer tracks, through the ABC Illinois Training Trust.",
  url: "https://abcil.org/mission",
};
const ILLINOIS_WORKS: TrainingOption = {
  name: "Illinois Works Pre-Apprenticeship Program",
  kind: "free-training",
  where: "About 35 providers statewide",
  detail: "Free, state-funded pre-apprenticeship skills training through DCEO-approved nonprofit and college providers, preparing candidates for construction and building-trades apprenticeships.",
  url: "https://dceo.illinois.gov/illinoisworks/preapprenticeship",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noStateLicense = (what: string) =>
  `Illinois has no state license for ${what}, and no statewide general contractor license either. Licensing, where it exists at all, happens city by city; Chicago runs the most developed local system.`;

export const ILLINOIS: StateGuide = {
  // Illinois ZIP codes run 600xx-629xx.
  locationHints: { zip3: [[600, 629]], cities: ["Chicago", "Aurora", "Naperville", "Rockford", "Joliet", "Springfield", "Peoria", "Elgin"] },
  slug: "illinois",
  code: "IL",
  name: S,
  lastVerified: "2026-11-21",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Illinois long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=IL",
  },
  intro:
    "A field guide to 25 construction trades in Illinois: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ roughly 172,000 people in Illinois, anchored by the Chicago metro, one of the largest markets on this site so far.",
    "Illinois licenses only a short list of trades statewide: plumbers (through the Dept. of Public Health, not a labor board), roofing contractors, elevator mechanics and fire sprinkler fitters.",
    "Electricians have no statewide license at all; it's purely a city-by-city system, and Chicago's Supervising Electrician/Electrical Contractor licenses are the most developed example.",
    "There's no statewide general contractor license. Most trades on this page, including carpentry, masonry and HVAC, have no state license either.",
    "Solar installer is the standout growth story here: a projected 170% increase, by far the fastest of any trade on this page, though from a small base.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "MAP Grant", value: "55%", note: "Of average tuition and fees at an Illinois community college, covered by the state's need-based Monetary Award Program grant" },
  licensingOverview:
    "Illinois licenses only a short list of trades at the state level, each through a different agency: the Department of Public Health licenses plumbers (plumbing is treated as a public-health matter here), the Department of Financial and Professional Regulation licenses roofing contractors, and the Office of the State Fire Marshal licenses elevator mechanics and fire sprinkler fitters. There's no statewide electrician license at all, no statewide HVAC license, and no statewide general contractor license; those, and most other trades on this page, are regulated city by city if at all. Chicago runs the most developed local system, with its own electrician, plumber and mason contractor licenses layered on top of whatever the state requires.",
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
      "With no statewide general contractor license, Illinois has one of the lower regulatory barriers to starting a general construction business of any state on this site, outside the few trades that are licensed.",
      "A plumbing or roofing license, once earned, carries statewide, even though cities like Chicago can still require an additional local credential.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "Local rules vary a lot city to city, so a business working across Chicago and its suburbs may need to qualify under more than one local system.",
    ],
    path:
      "The usual route: work for someone else for years, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      IDPH_PLUMBING,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([35660, 38480, 8, 3200]),
      stateLicense: "none",
      licenseSummary: "Illinois has no license for construction laborers. It is by far the largest trade on this page.",
      licenseAgency: IL_NO_LICENSE,
      training: [ILLINOIS_WORKS, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([23990, 26320, 10, 2380]),
      stateLicense: "none",
      licenseSummary:
        "Illinois has no statewide electrician license at all; it's purely a city-by-city system. Chicago runs the most developed example: a Supervising Electrician license for individuals, and an Electrical Contractor license for businesses, which must employ at least one licensed Supervising Electrician. Other cities and counties vary, some requiring only a basic contractor registration.",
      licenseSteps: [
        { title: "No state license", detail: "Illinois sets no statewide license or exam for electricians." },
        { title: "Local license (where required)", detail: "Chicago, for one, requires a Supervising Electrician license for individuals and an Electrical Contractor license for the business; other cities and counties vary." },
      ],
      licenseAgency: CHICAGO_ELECTRICAL,
      extraCredentials: ["A city or county electrician license where one is required (such as Chicago's Supervising Electrician license)"],
      training: [IBEW_134],
      businessNote: "An electrical contracting business in Chicago must keep a licensed Supervising Electrician on staff, or its contractor license goes inactive.",
    }),
    t("equipment-operator", {
      outlook: ol([11720, 12250, 5, 1020]),
      stateLicense: "none",
      licenseSummary: "Illinois has no state license for equipment operators. Employers look for training records and safe hours in the seat, and crane operators need national certification under federal OSHA rules.",
      licenseAgency: IL_NO_LICENSE,
      training: [national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([18180, 17850, -2, 1710]),
      stateLicense: "none",
      licenseSummary: "Illinois has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS). It's the only trade on this page projected to shrink in Illinois.",
      licenseAgency: IL_NO_LICENSE,
      training: [ABC_ILLINOIS],
    }),
    t("hvac-technician", {
      outlook: ol([8650, 9420, 9, 820]),
      stateLicense: "none",
      licenseSummary: "No dedicated statewide HVAC license was found for Illinois; it appears to be regulated locally, if at all (Chicago separately licenses refrigeration contractors). Anyone handling refrigerants also needs the federal EPA Section 608 certification, which applies in every state and never expires.",
      licenseSteps: [
        { title: "No state license", detail: "Illinois has no statewide HVAC license." },
        { title: "Local license (where it exists)", detail: "Chicago, for one, separately licenses refrigeration contractors; other cities vary." },
      ],
      licenseAgency: IL_NO_LICENSE,
      training: [ABC_ILLINOIS],
    }),
    t("carpenter", {
      outlook: ol([29790, 31510, 6, 2350]),
      stateLicense: "none",
      licenseSummary: noStateLicense("carpenters") + " It's the second-largest trade on this page.",
      licenseAgency: IL_NO_LICENSE,
      training: [ABC_ILLINOIS, ILLINOIS_WORKS],
    }),
    t("plumber", {
      outlook: ol([19580, 20610, 5, 1730]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Illinois requires plumbers to hold a license from the Department of Public Health, which treats plumbing as a public-health and water-safety matter rather than a trades-board issue: apprentice plumber (at least 16, sponsored by a licensed plumber), then Plumber (at least 4 years/48 months as a licensed apprentice, then a state exam). A separate Plumbing Contractor registration covers anyone doing plumbing work for others. Chicago requires its own additional city plumber license on top of the state one. This outlook figure is a combined BLS category covering plumbers, pipefitters and sprinkler fitters together, so it isn't just plumbers.",
      licenseSteps: [
        { title: "Apprentice plumber", detail: "At least 16, sponsored by a licensed plumber or an approved apprenticeship program." },
        { title: "Plumber", detail: "At least 4 years (48 months) as a licensed apprentice, then the state licensing exam." },
        { title: "Plumbing contractor", detail: "A separate state registration for anyone doing plumbing work for others, with insurance requirements." },
      ],
      licenseAgency: IDPH_PLUMBING,
      extraCredentials: ["Illinois Plumber license"],
      training: [UA_130],
      businessNote: "In Chicago, a plumber's state license is recognized only when their employer also holds the city's own plumbing contractor license.",
      payNote: "Illinois's BLS projection groups plumbers with pipefitters and sprinkler fitters, so this figure isn't plumbers alone.",
    }),
    t("painter", {
      outlook: ol([9170, 9580, 4, 760]),
      stateLicense: "none",
      licenseSummary: noStateLicense("painters"),
      licenseAgency: IL_NO_LICENSE,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([6370, 6500, 2, 440]),
      stateLicense: "none",
      licenseSummary: noStateLicense("concrete finishers"),
      licenseAgency: IL_NO_LICENSE,
      training: [LEARN_ON_JOB("Concrete and site contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([870, 910, 4, 60]),
      stateLicense: "none",
      licenseSummary: noStateLicense("drywall installers"),
      licenseAgency: IL_NO_LICENSE,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([950, 1010, 6, 80]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Illinois requires elevator mechanics to hold a Mechanic or Limited Mechanic license from the Office of the State Fire Marshal: a Board-approved apprenticeship or training program, or at least 3 years of verified experience, then a written exam. Applicants must be employed by a firm that holds a separate elevator contractor's license. Licenses renew with at least 8 hours of continuing education a year.",
      licenseAgency: OSFM_ELEVATOR,
      extraCredentials: ["Illinois Elevator Mechanic or Limited Mechanic license"],
      training: [national("Elevator Constructors union (IUEC) training", "neiep-elevator-constructor-apprenticeship", "Union elevator apprenticeship through the National Elevator Industry Educational Program.")],
      ownBusiness: "Elevator work takes specialized tools, insurance and manufacturer relationships, so most mechanics work for established companies.",
    }),
    t("flooring-installer", {
      outlook: ol([1580, 1740, 10, 130]),
      stateLicense: "none",
      licenseSummary: noStateLicense("flooring installers"),
      licenseAgency: IL_NO_LICENSE,
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([2320, 2420, 4, 200]),
      stateLicense: "none",
      licenseSummary: noStateLicense("glaziers"),
      licenseAgency: IL_NO_LICENSE,
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([1060, 1100, 4, 90]),
      stateLicense: "none",
      licenseSummary: noStateLicense("insulation installers"),
      licenseAgency: IL_NO_LICENSE,
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([3270, 3430, 5, 280]),
      stateLicense: "none",
      licenseSummary: noStateLicense("ironworkers"),
      licenseAgency: IL_NO_LICENSE,
      ownBusiness: "Steel erection companies need heavy equipment and big insurance policies, so most ironworkers work for established firms.",
      training: [national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork.")],
    }),
    t("mason", {
      outlook: ol([4610, 4770, 3, 350]),
      stateLicense: "none",
      licenseSummary: "Illinois has no statewide masonry license, though Chicago runs its own municipal Mason Contractor license even without a state masonry law behind it.",
      licenseAgency: IL_NO_LICENSE,
      training: [LEARN_ON_JOB("Masonry contractors"), national("Bricklayers union (BAC)", "bac-bricklayer-apprenticeship", "Union apprenticeships for brick, block and stone masons.")],
    }),
    t("millwright", {
      outlook: ol([1860, 1860, 0, 160]),
      stateLicense: "none",
      licenseSummary: "Illinois has no state license for millwrights. Employers hire on training, experience and precision.",
      licenseAgency: IL_NO_LICENSE,
      training: [national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary: "General pipefitting isn't separately licensed by the state; it usually falls under whichever plumbing or mechanical credential governs the specific piping work. Fire-sprinkler piping work specifically is licensed separately under the state's Fire Sprinkler Contractor Licensing Act.",
      licenseAgency: IDPH_PLUMBING,
      ownBusiness: "Piping contractors need crews, insurance and often a licensed plumber on staff for connected plumbing work.",
      training: [UA_130, national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Paid union apprenticeships in pipefitting.")],
      payNote: "Illinois's BLS projection groups pipefitters with plumbers and sprinkler fitters, so there's no separate pipefitter-only figure.",
    }),
    t("plasterer-stucco-mason", {
      outlook: ol([320, 330, 4, 20]),
      stateLicense: "none",
      licenseSummary: noStateLicense("plasterers") + " It's the smallest trade on this page.",
      licenseAgency: IL_NO_LICENSE,
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([6910, 7350, 6, 530]),
      stateLicense: "contractor",
      licenseSummary:
        "Illinois licenses roofing at the business level through the Department of Financial and Professional Regulation: a Roofing Contractor license, with the business designating a Qualifying Party who passes the state's Roofing Contractor exam. Licenses come in two tiers: Limited (residential properties and condos up to 8 units) and Unlimited (residential, commercial and industrial). Subcontractors doing roofing work must also be separately licensed.",
      licenseAgency: IDFPR_ROOFING,
      extraCredentials: ["Illinois Roofing Contractor license (company-level)"],
      training: [LEARN_ON_JOB("Roofing contractors")],
      businessNote: "A roofing business must designate a Qualifying Party who has passed the state exam before it can hold a Roofing Contractor license.",
    }),
    t("sheet-metal-worker", {
      outlook: ol([4330, 4400, 2, 360]),
      stateLicense: "none",
      licenseSummary: "Illinois has no state license for sheet metal workers.",
      licenseAgency: IL_NO_LICENSE,
      training: [national("Sheet metal apprenticeships (SMART)", "smart-sheet-metal-apprenticeship", "Union sheet metal apprenticeships.")],
    }),
    t("solar-installer", {
      outlook: ol([200, 530, 170, 60]),
      stateLicense: "none",
      licenseSummary: "Illinois has no dedicated solar installer license; solar companies typically need whatever underlying credential applies to the work, such as a local electrical contractor license for grid-tie wiring. It's the fastest-growing trade on this page by far, projected to grow 170% over the decade, though from a small base.",
      licenseAgency: CHICAGO_ELECTRICAL,
      training: [IBEW_134],
    }),
    t("sprinkler-fitter", {
      stateLicense: "worker-certification",
      licenseSummary:
        "Illinois requires fire sprinkler contracting businesses to hold a license from the Office of the State Fire Marshal. As of January 1, 2024, individuals who inspect and test existing fire-sprinkler systems also need their own individual license, earned through NICET certification, ASSE 15010 certification, or a certified sprinkler-fitter apprenticeship, and must work for a licensed contractor. Current license holders keep their credentials even as the rules have tightened for new applicants.",
      licenseSteps: [
        { title: "Fire sprinkler contractor (business)", detail: "A license from the Office of the State Fire Marshal to run a sprinkler contracting business." },
        { title: "Individual inspection/testing license", detail: "Required since Jan. 1, 2024 for anyone who independently inspects or tests existing systems; earned through NICET, ASSE 15010 certification, or a certified apprenticeship." },
      ],
      licenseAgency: OSFM_SPRINKLER,
      extraCredentials: ["Illinois individual fire-sprinkler inspection and testing license (for that specific work)"],
      training: [national("Sprinkler Fitters union (UA)", "ua-sprinkler-fitter-apprenticeship", "Five-year registered apprenticeship through a signatory contractor.")],
      payNote: "Illinois's BLS projection groups sprinkler fitters with plumbers and pipefitters, so there's no separate sprinkler-fitter-only figure.",
      ownBusiness: "Opening a fire sprinkler contracting business in Illinois takes a license from the Office of the State Fire Marshal, and anyone who independently inspects or tests existing systems needs their own individual license on top of it.",
    }),
    t("tile-setter", {
      outlook: ol([1260, 1370, 9, 100]),
      stateLicense: "none",
      licenseSummary: noStateLicense("tile setters"),
      licenseAgency: IL_NO_LICENSE,
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "none",
      licenseSummary: noStateLicense("waterproofing installers"),
      licenseAgency: IL_NO_LICENSE,
      payNote: "Waterproofing has no distinct federal job category, so no state-specific job count exists for it in Illinois or anywhere else on this site.",
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Illinois Works Pre-Apprenticeship Program",
      detail: "Free pre-apprenticeship skills training through about 35 DCEO-approved nonprofit and college providers statewide, preparing candidates for construction and building-trades apprenticeships.",
      source: DCEO_PREAPPRENTICE,
    },
  ],
  adults: [
    {
      title: "MAP Grant",
      detail: "Illinois's need-based Monetary Award Program grant covers a meaningful share of tuition and fees at any MAP-approved Illinois college, including community colleges, up to a lifetime cap of 135 credit hours. Apply through the FAFSA; no high school grades or test scores required.",
      source: MAP_GRANT,
    },
    {
      title: "Apprenticeship Illinois",
      detail: "The state's Department of Commerce and Economic Opportunity coordinates Illinois's apprenticeship ecosystem, including grants and pre-apprenticeship programs, through the Apprenticeship Illinois portal; formal apprenticeship registration itself runs through the federal Office of Apprenticeship.",
      source: APPRENTICESHIP_IL,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Illinois statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Illinois long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=IL" },
    IDPH_PLUMBING,
    CHICAGO_ELECTRICAL,
    IL_NO_LICENSE,
    OSFM_ELEVATOR,
    OSFM_SPRINKLER,
    IDFPR_ROOFING,
    DCEO_PREAPPRENTICE,
    MAP_GRANT,
    APPRENTICESHIP_IL,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
