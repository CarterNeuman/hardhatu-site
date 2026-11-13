// Student Loan ROI model: pure, dependency-free math shared by the
// /student-loan-roi page's client components. Kept separate from the UI so
// the numbers can be checked on their own (no React, no DOM).
//
// Two jobs:
//  1. Turn a BLS wage spread (10th / median / 75th / 90th percentile) into a
//     rough "pay by years of experience" curve.
//  2. Year by year from the chosen starting age, work out each path's NET
//     POSITION:
//       cumulative pay
//       - school costs paid out of pocket
//       - loan payments made so far
//       - loan balance still owed
//     i.e. "where you'd stand if you added it all up." Counting the balance
//     still owed is what makes a borrowed degree show up as a hole at
//     graduation instead of looking free until the first bill arrives.
//
// Money is figured in "today's dollars" by default: pay, prices and tuition
// all grow with inflation, the loan is a fixed-dollar debt, and each year is
// divided back down so $1 means what $1 buys today. The one real effect
// that survives is that a fixed loan payment gets easier as pay and prices
// rise. "Future dollars" skips the dividing step and shows the numbers you'd
// actually see on a paycheck at the time.

export type PathId = "work" | "apprentice" | "tradeschool" | "college" | "cm";

export type CollegeType = "public-in" | "public-out" | "private";

// College Board, Trends in College Pricing and Student Aid 2025 (2025-26).
// In-state tuition is replaced by the state's own average when the page
// knows it (lib/state-pay-data.ts).
export const COLLEGE_COSTS = {
  tuition: { "public-in": 11950, "public-out": 31880, private: 45000 },
  // Average net tuition and fees after grant aid and tax benefits. No
  // national out-of-state figure is published, so that option always uses
  // the sticker price.
  netTuition: { "public-in": 2300, "public-out": null, private: 16910 } as Record<CollegeType, number | null>,
  roomBoard: { "public-in": 13900, "public-out": 13900, private: 15920 },
} as const;

// 2026-27 federal Direct Loan rate for undergraduates (fixed).
export const DEFAULT_LOAN_RATE = 6.52;

// Long-run US inflation has run about 2.5% to 3% a year; the 12 months to
// Sep 2026 ran 3.7%. 3% is the default; the page lets people change it.
export const DEFAULT_INFLATION = 3;

// ---------------------------------------------------------------------------
// Experience curve
//
// BLS publishes how pay is spread across everyone in a job, not pay by years
// on the job. We read the spread as a career ladder, a rough but common
// shortcut (trade pay is set largely by apprenticeship step and years in):
//   starting out  = 10th percentile
//   5 years in    = median
//   10 years in   = 75th percentile
//   20 years in   = halfway between the 75th and 90th percentiles
//   top 10%       = 90th percentile (a ceiling, not a promise)
// Straight lines between those points; flat after 20 years.

export type Curve = { p10: number; median: number; p75: number; p90: number };

export function payAtExperience(c: Curve, years: number): number {
  const p20 = (c.p75 + c.p90) / 2;
  const pts: [number, number][] = [
    [0, c.p10],
    [5, c.median],
    [10, c.p75],
    [20, p20],
  ];
  if (years <= 0) return c.p10;
  if (years >= 20) return p20;
  for (let k = 1; k < pts.length; k++) {
    const [x0, y0] = pts[k - 1];
    const [x1, y1] = pts[k];
    if (years <= x1) return y0 + ((y1 - y0) * (years - x0)) / (x1 - x0);
  }
  return p20;
}

// The cautious version: climb to the median by year 5, then stay there.
function payFlatAtMedian(c: Curve, years: number): number {
  if (years >= 5) return c.median;
  return c.p10 + ((c.median - c.p10) * Math.max(0, years)) / 5;
}

// ---------------------------------------------------------------------------

export type Inputs = {
  trade: Curve; // the chosen trade, in the chosen state
  laborer: Curve; // "straight to work" path
  college: Curve; // the chosen college career
  cm: Curve; // construction managers
  inStateTuition: number; // state average, or national when unknown
  collegeType: CollegeType;
  useNetPrice: boolean;
  includeRoomBoard: boolean;
  shareBorrowed: number; // 0..1
  loanRate: number; // percent, e.g. 6.52
  repayYears: number;
  schoolJobPay: number; // per year while in any school, today's dollars
  apprenticeYears: number;
  apprenticeCostPerYear: number;
  tradeSchoolCost: number; // total, 1-year program
  growWithExperience: boolean;
  // Career changers: when set, the "work" path becomes "stay in your
  // current job" at this pay (today's dollars, flat) instead of a laborer.
  currentPay: number | null;
  startAge: number;
  years: number; // horizon, counted from startAge
  inflation: number; // percent per year
  futureDollars: boolean;
};

export type YearPoint = { age: number; net: number; pay: number; owed: number };

export type PathResult = {
  id: PathId;
  points: YearPoint[]; // net position at the END of each year; points[0] is the starting age (all zero)
  trainingYears: number;
  schoolCost: number; // total school costs, borrowed or not, today's dollars
  debtAtFinish: number; // balance when repayment starts, in the shown dollars
  monthlyPayment: number; // fixed payment when repayment starts, in the shown dollars
  totalInterest: number; // actual dollars
  payOnceTrained: number; // pay in the first full year after training, today's dollars
};

function tuitionFor(inp: Inputs) {
  const sticker = inp.collegeType === "public-in" ? inp.inStateTuition : COLLEGE_COSTS.tuition[inp.collegeType];
  const net = COLLEGE_COSTS.netTuition[inp.collegeType];
  return inp.useNetPrice && net != null ? net : sticker;
}

export function collegeYearCost(inp: Inputs) {
  return tuitionFor(inp) + (inp.includeRoomBoard ? COLLEGE_COSTS.roomBoard[inp.collegeType] : 0);
}

// ---------------------------------------------------------------------------
// Loans: each year's borrowing is drawn at the start of that school year and
// accrues interest (unsubsidized, the conservative case) through school plus
// the standard 6-month grace period, then is repaid on a standard
// fixed-payment plan. Simulated monthly in actual dollars, because a loan is
// a fixed-dollar contract.

type LoanSchedule = {
  balanceAtYearEnd: number[];
  paidInYear: number[];
  debtAtFinish: number;
  repayStartMonth: number;
  monthlyPayment: number;
  totalInterest: number;
};

function simulateLoan(borrowPerYear: number[], horizon: number, rate: number, repayYears: number): LoanSchedule {
  const r = rate / 100 / 12;
  const schoolYears = borrowPerYear.length;
  const repayStart = schoolYears * 12 + 6;
  const n = repayYears * 12;
  let bal = 0;
  let pmt = 0;
  let debtAtFinish = 0;
  let totalInterest = 0;
  const balanceAtYearEnd: number[] = [];
  const paidInYear: number[] = [];
  for (let t = 0; t < horizon; t++) {
    let paid = 0;
    for (let m = 0; m < 12; m++) {
      const month = t * 12 + m;
      if (m === 0 && t < schoolYears) bal += borrowPerYear[t];
      if (month === repayStart) {
        debtAtFinish = bal;
        pmt = bal > 0 ? (r === 0 ? bal / n : (bal * r) / (1 - Math.pow(1 + r, -n))) : 0;
      }
      const interest = bal * r;
      bal += interest;
      totalInterest += interest;
      if (month >= repayStart && bal > 0) {
        const pay = Math.min(pmt, bal);
        bal -= pay;
        paid += pay;
      }
    }
    balanceAtYearEnd.push(bal < 0.5 ? 0 : bal);
    paidInYear.push(paid);
  }
  if (repayStart >= horizon * 12) debtAtFinish = bal;
  return { balanceAtYearEnd, paidInYear, debtAtFinish, repayStartMonth: repayStart, monthlyPayment: pmt, totalInterest };
}

// ---------------------------------------------------------------------------

type PathSpec = {
  trainingYears: number;
  costPerYear: number[]; // today's dollars
  pay: (t: number) => number; // today's dollars, t = years since starting
  payOnceTrained: number;
  canBorrow: boolean;
};

function specFor(id: PathId, inp: Inputs): PathSpec {
  const curve = (c: Curve, years: number) => (inp.growWithExperience ? payAtExperience(c, years) : payFlatAtMedian(c, years));
  switch (id) {
    case "work": {
      if (inp.currentPay != null) {
        const flat = inp.currentPay;
        return { trainingYears: 0, costPerYear: [], pay: () => flat, payOnceTrained: flat, canBorrow: false };
      }
      const pay = (t: number) => curve(inp.laborer, t);
      return { trainingYears: 0, costPerYear: [], pay, payOnceTrained: inp.laborer.p10, canBorrow: false };
    }
    case "apprentice": {
      // Paid from day one: 50% of the journeyworker (median) wage in year 1,
      // rising evenly to 90% in the final year. After that, journey pay (the
      // median) or the experience curve, whichever is higher, counted from
      // day one of the apprenticeship.
      const L = inp.apprenticeYears;
      const m = inp.trade.median;
      const pay = (t: number) => {
        if (t < L) return m * (L === 1 ? 0.7 : 0.5 + (0.4 * t) / (L - 1));
        return Math.max(m, curve(inp.trade, t));
      };
      return {
        trainingYears: L,
        costPerYear: Array(L).fill(inp.apprenticeCostPerYear),
        pay,
        payOnceTrained: pay(L),
        canBorrow: false, // small out-of-pocket costs, paid from wages
      };
    }
    case "tradeschool": {
      // One year of school, then the trade's curve from starting pay.
      const pay = (t: number) => (t < 1 ? inp.schoolJobPay : curve(inp.trade, t - 1));
      return { trainingYears: 1, costPerYear: [inp.tradeSchoolCost], pay, payOnceTrained: inp.trade.p10, canBorrow: true };
    }
    case "college":
    case "cm": {
      const c = id === "college" ? inp.college : inp.cm;
      const yearCost = collegeYearCost(inp);
      const pay = (t: number) => (t < 4 ? inp.schoolJobPay : curve(c, t - 4));
      return { trainingYears: 4, costPerYear: Array(4).fill(yearCost), pay, payOnceTrained: c.p10, canBorrow: true };
    }
  }
}

export function runPath(id: PathId, inp: Inputs): PathResult {
  const spec = specFor(id, inp);
  const horizon = inp.years;
  const i = inp.inflation / 100;
  const grow = (t: number) => Math.pow(1 + i, t); // today's dollars -> dollars of year t
  const show = (amount: number, t: number) => (inp.futureDollars ? amount : amount / grow(t));

  const share = spec.canBorrow ? inp.shareBorrowed : 0;
  // School bills rise with inflation, so each year's bill (and what's
  // borrowed for it) is in that year's dollars.
  const costActual = spec.costPerYear.map((c, t) => c * grow(t));
  const borrowActual = costActual.map((c) => c * share);
  const loan = simulateLoan(borrowActual, horizon, inp.loanRate, inp.repayYears);

  const points: YearPoint[] = [{ age: inp.startAge, net: 0, pay: 0, owed: 0 }];
  let cum = 0;
  for (let t = 0; t < horizon; t++) {
    const payActual = spec.pay(t) * grow(t);
    const cash = t < spec.trainingYears ? costActual[t] - borrowActual[t] : 0;
    cum += show(payActual - cash - loan.paidInYear[t], t);
    const owed = show(loan.balanceAtYearEnd[t], t + 1);
    points.push({ age: inp.startAge + t + 1, net: cum - owed, pay: show(payActual, t), owed });
  }
  const repayYear = loan.repayStartMonth / 12;
  return {
    id,
    points,
    trainingYears: spec.trainingYears,
    schoolCost: spec.costPerYear.reduce((a, b) => a + b, 0),
    debtAtFinish: show(loan.debtAtFinish, repayYear),
    monthlyPayment: show(loan.monthlyPayment, repayYear),
    totalInterest: loan.totalInterest,
    payOnceTrained: spec.payOnceTrained,
  };
}

// First age at which a path that dipped below zero climbs back to zero or
// above. null = still below zero at the horizon.
export function breakEvenAge(points: YearPoint[]): number | null | "never-below" {
  const firstNeg = points.findIndex((p) => p.net < 0);
  if (firstNeg === -1) return "never-below";
  const back = points.findIndex((p, k) => k > firstNeg && p.net >= 0);
  return back === -1 ? null : points[back].age;
}

// First age at which path `a` is ahead of path `b`, after being behind.
export function catchUpAge(a: YearPoint[], b: YearPoint[]): number | null {
  let wasBehind = false;
  for (let k = 1; k < a.length; k++) {
    if (a[k].net < b[k].net) wasBehind = true;
    else if (wasBehind && a[k].net > b[k].net) return a[k].age;
  }
  return null;
}
