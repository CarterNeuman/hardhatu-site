// Michigan state guide. HIDDEN until launch (see HIDDEN_STATE_GUIDES in
// lib/state-guides.ts). State-neutral trade text comes from trade-base.ts;
// everything here is Michigan-specific and sourced.

import type { SourceRef, StateGuide, TrainingOption } from "@/lib/state-guides";
import { trade, ol, LEARN_ON_JOB, national, type Spec, type TradeSlug } from "@/lib/states/trade-base";

const S = "Michigan";

const LARA_ELECTRICAL: SourceRef = { label: "Michigan LARA, electrician licensing (MCL 339.5701 et seq.)", url: "https://www.michigan.gov/lara/bureau-list/bcc/sections/licensing-section/pathway-to-licensure" };
const LARA_PLUMBING: SourceRef = { label: "Michigan LARA, plumber licensing (State Plumbing Act, 2002 PA 733)", url: "https://www.michigan.gov/lara/bureau-list/bcc/Sections/Licensing-Section/exam-lic/plumbing-examination-licensing-registration-application-information" };
const LARA_MECHANICAL: SourceRef = { label: "Michigan LARA, Mechanical Contractor licensing (HVAC, piping, fire suppression classifications)", url: "https://www.michigan.gov/en/lara/bureau-list/bcc/Sections/Licensing-Section/exam-lic/mechanical-examination-licensing-registration-application-information" };
const LARA_MA_CONTRACTOR: SourceRef = { label: "Michigan LARA, Maintenance and Alteration Contractor licensing (MCL 339.2404(3))", url: "https://codes.findlaw.com/mi/chapter-339-occupational-code/mi-comp-laws-339-2404/" };
const LARA_RESIDENTIAL_BUILDER: SourceRef = { label: "Michigan LARA, Residential Builder and Maintenance and Alteration Contractor licensing", url: "https://www.michigan.gov/lara/bureau-list/bcc/Sections/Licensing-Section/residential-builders" };
const LARA_ELEVATOR: SourceRef = { label: "Michigan LARA, elevator licensing (Elevator Safety Board)", url: "https://www.michigan.gov/lara/bureau-list/bcc/sections/licensing-section/exam-lic/elevator-examination-licensing-registration-application-information" };
const MI_RECONNECT: SourceRef = { label: "Michigan Reconnect, free community college tuition for adults", url: "https://www.michigan.gov/reconnect" };
const GOING_PRO: SourceRef = { label: "Michigan LEO, Going PRO Talent Fund", url: "https://www.michigan.gov/leo/bureaus-agencies/wd/programs-services/going-pro-talent-fund" };
const MI_APPRENTICE: SourceRef = { label: "Michigan LEO, apprenticeship resources", url: "https://www.michigan.gov/leo/bureaus-agencies/wd/apprenticeships/resources" };

const DETROIT_ELECTRICAL_JATC: TrainingOption = {
  name: "Detroit Electrical Industry Training Center (IBEW Local 58/NECA)",
  kind: "union",
  where: "Warren (Detroit metro)",
  detail: "A paid 3- or 5-year electrical apprenticeship serving metro Detroit, jointly run by IBEW Local 58 and the Southeastern Michigan Chapter of NECA.",
  url: "https://hirevets.shrm.org/employer/profile/654d261f746e85001a53403d/detroit-electrical-industry-training-center",
  programSlug: "ibew-neca-electrical-apprenticeship",
};
const UA_190: TrainingOption = {
  name: "Greater Michigan UA Local 190 JATC",
  kind: "union",
  where: "Ann Arbor and the surrounding area",
  detail: "A plumber/pipefitter/welder/HVAC apprenticeship with annual application windows.",
  url: "https://www.ualocal190.org/",
  programSlug: "ua-plumber-pipefitter-apprenticeship",
};
const HENRY_FORD: TrainingOption = {
  name: "Henry Ford College, Trade and Apprentice Education",
  kind: "college",
  where: "Dearborn",
  detail: "Air Conditioning and Refrigeration, Plumbing and Pipefitting Technology, Sheet Metal Worker, Industrial Electrician and Millwright programs.",
  url: "https://www.hfcc.edu/trade-and-apprentice",
};
const ABC_GREATER_MICHIGAN: TrainingOption = {
  name: "ABC of Western Michigan craft training",
  kind: "open-shop",
  where: "West Michigan",
  detail: "Open-shop craft-training programs run through ABC's Education and Workforce Development programming for member-employer staff.",
  url: "https://abcwmc.org/Education-Workforce-Development",
};

const t = (slug: TradeSlug, s: Spec) => trade(slug, S, s);
const noStateLicense = (what: string) =>
  `Michigan has no license for ${what} as its own trade, and no statewide commercial general contractor license either. Paid residential repair or alteration work in some trades needs a narrower Maintenance and Alteration license instead.`;

export const MICHIGAN: StateGuide = {
  // Michigan ZIP codes run 480xx-499xx.
  locationHints: { zip3: [[480, 499]], cities: ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Ann Arbor", "Lansing", "Flint", "Dearborn"] },
  slug: "michigan",
  code: "MI",
  name: S,
  lastVerified: "2026-11-21",
  outlookPeriod: "2024 to 2034",
  outlookSource: {
    label: "Michigan long-term occupational projections, 2024-2034 (Projections Central, via O*NET)",
    url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=MI",
  },
  intro:
    "A field guide to 25 construction trades in Michigan: what they pay here, which ones need a state license, and the real, local ways in. Built for school counselors, CTE teachers, parents and students.",
  quickTakeaways: [
    "These trades employ roughly 160,000 people in Michigan, with construction laborers, carpenters and electricians the three largest.",
    "Michigan's licensing is built around three hubs: electricians and plumbers each have a full apprentice-journeyman-master ladder, and a separate Mechanical Contractor license covers HVAC, piping and fire suppression.",
    "Several other trades, including carpentry, masonry, roofing and tile work, only need a license for paid repair or alteration work on existing homes, through a narrower Maintenance and Alteration credential.",
    "There's no statewide commercial general contractor license. Commercial construction is regulated city by city, if at all.",
    "Tile and marble setters and HVAC mechanics are the fastest-growing trades on this page; millwrights, welders, concrete finishers and sheet metal workers are the only ones projected to shrink.",
    "Most of these jobs pay hourly with overtime on top, and many tradespeople later start their own business. That can pay well, but most new businesses don't last 10 years.",
  ],
  costMarker: { label: "Michigan Reconnect", value: "Free", note: "In-district community college tuition for Michigan residents, including construction-trades programs; a fall 2026 budget change lowered the minimum age from 25 to 21, though how long that lower age stays in place depends on future state budgets" },
  licensingOverview:
    "Michigan's Department of Licensing and Regulatory Affairs (LARA) runs most construction licensing. Electricians and plumbers each have a full apprentice, journeyman and master ladder, plus a separate business-level contractor license. HVAC, piping and fire-suppression work fall under a Mechanical Contractor license with lettered business classifications and individual apprentice/technician tiers underneath. Several other trades, including carpentry, masonry, concrete, roofing, insulation, tile and marble work, and basement waterproofing, only need a license (the narrower Maintenance and Alteration credential) for paid repair or alteration work on existing homes; new residential construction instead falls under the broader Residential Builder license. There's no statewide commercial general contractor license, and trades like drywall, glazing, plastering, ironwork and millwrighting have no state license found at all.",
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
      "With no statewide commercial GC license, Michigan has one of the lower regulatory barriers to commercial general contracting of any state on this site.",
      "A Maintenance and Alteration license, once earned for a specific trade, covers residential repair and alteration work statewide.",
    ],
    risks: [
      "About 1 in 5 new U.S. businesses close in their first year, and only about a third are still open after 10 years. Construction ranks among the industries with the lowest survival rates.",
      "Owners pay for what an employer used to cover: insurance, tools, trucks, health coverage and time off.",
      "The Maintenance and Alteration license only covers specific named trades on existing homes; working outside that scope, or on new construction, needs a different license (Residential Builder) or none at all for commercial work.",
    ],
    path:
      "The usual route: work for someone else for years, learn the business side (bidding, estimating, insurance), save money, then start small.",
    sources: [
      { label: "BLS: 34.7% of business establishments born in 2013 were still operating in 2023", url: "https://www.bls.gov/opub/ted/2024/34-7-percent-of-business-establishments-born-in-2013-were-still-operating-in-2023.htm" },
      { label: "BLS: Entrepreneurship and the U.S. economy (survival by industry)", url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm" },
      LARA_MA_CONTRACTOR,
    ],
  },
  trades: [
    t("laborer", {
      outlook: ol([36280, 38120, 5, 3110]),
      stateLicense: "none",
      licenseSummary: "Michigan has no license for construction laborers. It is by far the largest trade on this page.",
      licenseAgency: LARA_MA_CONTRACTOR,
      training: [ABC_GREATER_MICHIGAN, national("Laborers union (LiUNA) training", "liuna-laborer-apprenticeship", "Construction craft laborer apprenticeships.")],
    }),
    t("electrician", {
      outlook: ol([26240, 27710, 6, 2450]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Michigan requires electricians to hold a license from LARA: apprentice, then journeyman, then master electrician at age 22 or older with at least 12,000 hours of qualifying electrical work over 6 or more years and at least 2 years holding a journeyman's license, plus an exam. A separate Electrical Contractor license covers the business side, and one master electrician can qualify only one contractor license.",
      licenseSteps: [
        { title: "Electrical apprentice", detail: "Register as an apprentice and work under a licensed electrician." },
        { title: "Journeyman electrician", detail: "Complete the required apprenticeship experience, then pass the state exam." },
        { title: "Master electrician", detail: "At least 22, with 12,000 hours over 6+ years of qualifying work and at least 2 years as a licensed journeyman, then an exam." },
      ],
      licenseAgency: LARA_ELECTRICAL,
      extraCredentials: ["Michigan journeyman or master electrician license"],
      training: [DETROIT_ELECTRICAL_JATC, HENRY_FORD],
      businessNote: "A master electrician's license can qualify only one electrical contractor license at a time.",
    }),
    t("equipment-operator", {
      outlook: ol([9640, 9870, 2, 810]),
      stateLicense: "none",
      licenseSummary: "Michigan has no state license for equipment operators. Employers look for training records and safe hours in the seat, and crane operators need national certification under federal OSHA and MIOSHA rules.",
      licenseAgency: LARA_MA_CONTRACTOR,
      training: [national("Operating Engineers union (IUOE)", "iuoe-heavy-equipment-operator-apprenticeship", "Paid union apprenticeships for equipment operators.")],
    }),
    t("welder", {
      outlook: ol([14210, 13860, -2, 1320]),
      stateLicense: "none",
      licenseSummary: "Michigan has no state welding license. Employers hire on welding tests and certifications, most often from the American Welding Society (AWS). It's one of only four trades on this page projected to shrink in Michigan.",
      licenseAgency: LARA_MA_CONTRACTOR,
      training: [HENRY_FORD],
    }),
    t("hvac-technician", {
      outlook: ol([14780, 15750, 7, 1360]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Michigan licenses HVAC work through LARA's Mechanical Contractor structure: an HVAC apprentice works under a licensed contractor's supervision, while an HVAC technician can work independently once qualified. The business side is licensed separately, by lettered classification (such as ductwork, limited or unlimited heating, and refrigeration/air conditioning service). Anyone handling refrigerants also needs the federal EPA Section 608 certification. It's one of the fastest-growing trades on this page.",
      licenseAgency: LARA_MECHANICAL,
      extraCredentials: ["Michigan HVAC technician credential"],
      training: [UA_190, HENRY_FORD],
      businessNote: "A mechanical contracting business is licensed separately by classification letter, covering the specific scope of HVAC, piping or refrigeration work it takes on.",
    }),
    t("carpenter", {
      outlook: ol([27380, 27670, 1, 1990]),
      stateLicense: "worker-certification",
      licenseSummary: "Michigan licenses carpentry as one of the named trades under the Maintenance and Alteration contractor license, but only for paid repair or alteration work on existing residential structures; new home construction instead falls under the Residential Builder license, and there's no license at all for commercial carpentry. It's the second-largest trade on this page.",
      licenseAgency: LARA_MA_CONTRACTOR,
      extraCredentials: ["Michigan Maintenance and Alteration Contractor license (carpentry) for residential repair work"],
      training: [ABC_GREATER_MICHIGAN, HENRY_FORD],
    }),
    t("plumber", {
      outlook: ol([13670, 13960, 2, 1150]),
      stateLicense: "journeyman-and-master",
      licenseSummary:
        "Michigan requires plumbers to hold a license from LARA under the State Plumbing Act: apprentice (registered, minimum to work on any plumbing job site), journeyman (6,000 hours over 3 years as a registered apprentice), and master (2 more years/4,000 hours as a licensed journeyman, then a separate exam). A plumbing contractor business license has no hour requirement of its own. This outlook figure is a combined BLS category covering plumbers, pipefitters and steamfitters together, so it isn't just plumbers.",
      licenseSteps: [
        { title: "Registered apprentice", detail: "Register with LARA; this is the minimum to work on any plumbing job site." },
        { title: "Journeyman plumber", detail: "6,000 hours over at least 3 years as a registered apprentice, then an exam." },
        { title: "Master plumber", detail: "2 more years/4,000 hours as a licensed journeyman, then a separate exam." },
      ],
      licenseAgency: LARA_PLUMBING,
      extraCredentials: ["Michigan journeyman or master plumber license"],
      training: [UA_190, HENRY_FORD],
      payNote: "Michigan's BLS projection groups plumbers with pipefitters and steamfitters, so this figure isn't plumbers alone.",
    }),
    t("painter", {
      outlook: ol([8280, 8480, 2, 660]),
      stateLicense: "none",
      licenseSummary: "Michigan has no license for painters. The state used to license residential painting under its Maintenance and Alteration system, but that requirement was repealed at the end of 2018.",
      licenseAgency: LARA_MA_CONTRACTOR,
      training: [LEARN_ON_JOB("Painting contractors")],
    }),
    t("concrete-worker", {
      outlook: ol([5700, 5670, -1, 380]),
      stateLicense: "worker-certification",
      licenseSummary: "Michigan licenses concrete work as one of the named trades under the Maintenance and Alteration contractor license, but only for paid repair or alteration work on existing residential structures; commercial concrete work has no state license. It's one of only four trades on this page projected to shrink in Michigan.",
      licenseAgency: LARA_MA_CONTRACTOR,
      extraCredentials: ["Michigan Maintenance and Alteration Contractor license (concrete work) for residential repair work"],
      training: [LEARN_ON_JOB("Concrete and site contractors")],
    }),
    t("drywall-installer", {
      outlook: ol([1430, 1480, 3, 100]),
      stateLicense: "none",
      licenseSummary: noStateLicense("drywall installers") + " Drywall isn't named among Michigan's licensed Maintenance and Alteration trades.",
      licenseAgency: LARA_MA_CONTRACTOR,
      training: [LEARN_ON_JOB("Drywall contractors")],
    }),
    t("elevator-technician", {
      outlook: ol([670, 690, 3, 50]),
      stateLicense: "worker-certification",
      licenseSummary:
        "Michigan requires elevator mechanics to hold a Journeyperson's License from the Elevator Safety Board: 3 years of continuous experience as an elevator constructor, serviceman or similar (up to 1 year of credit for an electrical or mechanical engineering degree), a detailed work-history resume, and a passing exam. A separate Contractor's License covers the business side, and a Certificate of Competency covers elevator inspectors.",
      licenseAgency: LARA_ELEVATOR,
      extraCredentials: ["Michigan Elevator Journeyperson's License"],
      training: [national("Elevator Constructors union (IUEC) training", "neiep-elevator-constructor-apprenticeship", "Union elevator apprenticeship through the National Elevator Industry Educational Program.")],
      ownBusiness: "Elevator work takes specialized tools, insurance and manufacturer relationships, so most mechanics work for established companies.",
    }),
    t("flooring-installer", {
      stateLicense: "none",
      licenseSummary: "General flooring work (carpet, vinyl, laminate) isn't named among Michigan's licensed Maintenance and Alteration trades, so it appears unlicensed. Tile and marble installation is licensed separately; see that trade.",
      licenseAgency: LARA_MA_CONTRACTOR,
      payNote: "Michigan doesn't publish a specific job-count projection for general flooring installers separate from tile and marble setters.",
      training: [LEARN_ON_JOB("Flooring contractors and stores")],
    }),
    t("glazier", {
      outlook: ol([1760, 1770, 1, 140]),
      stateLicense: "none",
      licenseSummary: noStateLicense("glaziers") + " Glazing isn't named among Michigan's licensed Maintenance and Alteration trades.",
      licenseAgency: LARA_MA_CONTRACTOR,
      training: [LEARN_ON_JOB("Glass and window contractors")],
    }),
    t("insulation-installer", {
      outlook: ol([750, 750, 1, 60]),
      stateLicense: "worker-certification",
      licenseSummary: "Michigan licenses insulation work as one of the named trades under the Maintenance and Alteration contractor license, but only for paid repair or alteration work on existing residential structures.",
      licenseAgency: LARA_MA_CONTRACTOR,
      extraCredentials: ["Michigan Maintenance and Alteration Contractor license (insulation work) for residential repair work"],
      training: [LEARN_ON_JOB("Insulation contractors")],
    }),
    t("ironworker", {
      outlook: ol([2050, 2080, 2, 160]),
      stateLicense: "none",
      licenseSummary: noStateLicense("ironworkers"),
      licenseAgency: LARA_MA_CONTRACTOR,
      ownBusiness: "Steel erection companies need heavy equipment and big insurance policies, so most ironworkers work for established firms.",
      training: [national("Ironworkers union apprenticeships", "ironworkers-apprenticeship", "Paid union apprenticeships in structural, reinforcing and ornamental ironwork.")],
    }),
    t("mason", {
      outlook: ol([2740, 2750, 1, 200]),
      stateLicense: "worker-certification",
      licenseSummary: "Michigan licenses masonry as one of the named trades under the Maintenance and Alteration contractor license, but only for paid repair or alteration work on existing residential structures; commercial masonry has no state license.",
      licenseAgency: LARA_MA_CONTRACTOR,
      extraCredentials: ["Michigan Maintenance and Alteration Contractor license (masonry) for residential repair work"],
      training: [LEARN_ON_JOB("Masonry contractors"), national("Bricklayers union (BAC)", "bac-bricklayer-apprenticeship", "Union apprenticeships for brick, block and stone masons.")],
    }),
    t("millwright", {
      outlook: ol([2580, 2490, -3, 210]),
      stateLicense: "none",
      licenseSummary: "Michigan has no state license for millwrights. It's an industrial maintenance trade taught through union and community-college programs rather than a state credential, and it's one of only four trades on this page projected to shrink in Michigan.",
      licenseAgency: LARA_MA_CONTRACTOR,
      training: [HENRY_FORD, national("Carpenters union (UBC) millwright training", "ubc-millwright-apprenticeship", "Union millwright apprenticeships.")],
    }),
    t("pipefitter", {
      stateLicense: "none",
      licenseSummary: "Pipefitting isn't separately licensed for individuals in Michigan. Commercial pipefitting work typically falls under a Mechanical Contractor business license's piping classification rather than its own individual credential.",
      licenseAgency: LARA_MECHANICAL,
      ownBusiness: "Piping contractors need crews, insurance and a licensed mechanical or plumbing credential on staff for connected work.",
      training: [UA_190, national("Plumbers and pipefitters union (UA)", "ua-plumber-pipefitter-apprenticeship", "Paid union apprenticeships in pipefitting.")],
      payNote: "Michigan's BLS projection groups pipefitters with plumbers and steamfitters, so there's no separate pipefitter-only figure.",
    }),
    t("plasterer-stucco-mason", {
      outlook: ol([270, 280, 2, 20]),
      stateLicense: "none",
      licenseSummary: noStateLicense("plasterers") + " Plastering isn't named among Michigan's licensed Maintenance and Alteration trades. It's the smallest trade on this page.",
      licenseAgency: LARA_MA_CONTRACTOR,
      training: [LEARN_ON_JOB("Plastering and stucco contractors")],
    }),
    t("roofer", {
      outlook: ol([3950, 4090, 3, 290]),
      stateLicense: "worker-certification",
      licenseSummary: "Michigan licenses roofing as one of the named trades under the Maintenance and Alteration contractor license: 60 hours of LARA-approved prelicensure education covering business, contracts, project management, the Michigan Residential Code and MIOSHA, then a trade-specific exam. This covers residential and combination residential-commercial work; commercial-only roofing has no state license.",
      licenseAgency: LARA_MA_CONTRACTOR,
      extraCredentials: ["Michigan Maintenance and Alteration Contractor license (roofing)"],
      training: [LEARN_ON_JOB("Roofing contractors")],
      businessNote: "The roofing license renews every 3 years, with continuing education required at every renewal.",
    }),
    t("sheet-metal-worker", {
      outlook: ol([4730, 4680, -1, 370]),
      stateLicense: "none",
      licenseSummary: "Sheet metal work isn't individually licensed in Michigan; ductwork falls under a Mechanical Contractor business license's ductwork classification rather than its own worker credential. It's one of only four trades on this page projected to shrink in Michigan.",
      licenseAgency: LARA_MECHANICAL,
      training: [HENRY_FORD, national("Sheet metal apprenticeships (SMART)", "smart-sheet-metal-apprenticeship", "Union sheet metal apprenticeships.")],
    }),
    t("solar-installer", {
      stateLicense: "none",
      licenseSummary: "Michigan has no dedicated solar installer license. Solar thermal work can fall under a Mechanical Contractor's solar heating and cooling specialty, and the electrical connections on a rooftop solar PV system fall under the standard electrician license. No Michigan-specific job-count projection is published for this trade either.",
      licenseAgency: LARA_ELECTRICAL,
      training: [DETROIT_ELECTRICAL_JATC],
    }),
    t("sprinkler-fitter", {
      stateLicense: "worker-certification",
      licenseSummary:
        "Michigan has no stand-alone sprinkler-fitter license; fire-sprinkler work is licensed through the Mechanical Contractor structure's Fire Suppression classification. Qualifying takes at least 18 years of age, good moral character, and at least 3 years or 6,000 hours of experience in fire-suppression work (a 2-year HVAC program can count for up to 1 year/2,000 hours of that), plus an exam.",
      licenseAgency: LARA_MECHANICAL,
      extraCredentials: ["Michigan Fire Suppression classification qualification"],
      training: [national("Sprinkler Fitters union (UA)", "ua-sprinkler-fitter-apprenticeship", "Five-year registered apprenticeship through a signatory contractor.")],
      payNote: "Sprinkler fitters have no distinct federal job category, so there's no Michigan-specific job-count figure for this trade alone.",
    }),
    t("tile-setter", {
      outlook: ol([1400, 1500, 7, 110]),
      stateLicense: "worker-certification",
      licenseSummary: "Michigan licenses tile and marble work as one of the named trades under the Maintenance and Alteration contractor license, but only for paid repair or alteration work on existing residential structures. It's one of the fastest-growing trades on this page.",
      licenseAgency: LARA_MA_CONTRACTOR,
      extraCredentials: ["Michigan Maintenance and Alteration Contractor license (tile and marble work) for residential repair work"],
      training: [LEARN_ON_JOB("Tile contractors")],
    }),
    t("waterproofing-installer", {
      stateLicense: "worker-certification",
      licenseSummary: "Michigan licenses basement waterproofing as one of the named trades under the Maintenance and Alteration contractor license, for paid repair or alteration work on existing residential structures.",
      licenseAgency: LARA_MA_CONTRACTOR,
      extraCredentials: ["Michigan Maintenance and Alteration Contractor license (basement waterproofing)"],
      payNote: "Waterproofing has no distinct federal job category, so no state-specific job count exists for it in Michigan or anywhere else on this site.",
      training: [LEARN_ON_JOB("Waterproofing contractors")],
    }),
  ],
  highSchool: [
    {
      title: "Career and Technical Education (CTE)",
      detail: "Michigan's Department of Education runs a statewide CTE system with growing participation in recent years, feeding into dual enrollment and apprenticeship entry; check with a local intermediate school district for the construction-trades programs available nearby.",
      source: { label: "Michigan Dept. of Education, CTE participation", url: "https://www.michigan.gov/mde/news-and-information/press-releases/2025/09/23/cte-numbers-increase-in-mi" },
    },
  ],
  adults: [
    {
      title: "Michigan Reconnect",
      detail: "Covers in-district community college tuition in full for Michigan residents pursuing a degree or certificate, including construction-trades programs; submit the FAFSA to apply. The program long required applicants to be 25 or older; a fall 2026 state budget change lowered that minimum to 21, though whether the lower age continues depends on future budgets.",
      source: MI_RECONNECT,
    },
    {
      title: "Going PRO Talent Fund",
      detail: "Michigan's state training-grant fund, which has made more than 9,000 awards since 2014 (averaging around $41,000 each) to employer-sponsored training, including registered apprenticeships.",
      source: GOING_PRO,
    },
  ],
  sources: [
    { label: "BLS Occupational Employment and Wage Statistics, Michigan statewide, May 2025", url: "https://www.bls.gov/oes/" },
    { label: "Michigan long-term occupational projections, 2024-2034 (Projections Central, via O*NET)", url: "https://www.onetonline.org/link/localtrends/47-2111.00?st=MI" },
    LARA_ELECTRICAL,
    LARA_PLUMBING,
    LARA_MECHANICAL,
    LARA_MA_CONTRACTOR,
    LARA_RESIDENTIAL_BUILDER,
    LARA_ELEVATOR,
    MI_RECONNECT,
    GOING_PRO,
    MI_APPRENTICE,
    { label: "BEA Regional Price Parities by state, 2024", url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area" },
  ],
};
