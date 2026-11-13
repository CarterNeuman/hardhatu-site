// Student Loan ROI model: pure, dependency-free math shared by the
// /student-loan-roi page's client calculator. Kept separate from the UI so
// the numbers can be checked on their own (no React, no DOM).
//
// What it computes, year by year from age 18: each path's NET POSITION,
//   cumulative pay
//   - school costs paid out of pocket
//   - loan payments made so far
//   - loan balance still owed
// i.e. "where you'd stand if you added it all up today." Counting the
// balance still owed is what makes a borrowed degree show up as a hole at
// graduation instead of looking free until the first bill arrives.
//
// Deliberately simple and conservative, and every assumption is shown on
// the page: pre-tax, today's dollars (no inflation), national medians, a
// full-time job the year training ends, no grad school, no overtime.

export type PathId = "work" | "apprentice" | "tradeschool" | "college" | "cm";

export type CollegeType = "public-in" | "public-out" | "private";

// Every figure below is sourced on the page (see the Sources list in
// app/student-loan-roi/page.tsx). Kept here, not in the component, so the
// page and the model can't drift apart.
export const COLLEGE_COSTS = {
  // College Board, Trends in College Pricing and Student Aid 2025,
  // average published tuition and fees, 2025-26.
  tuition: { "public-in": 11950, "public-out": 31880, private: 45000 },
  // Same report: average net tuition and fees after grant aid and tax
  // benefits. No national out-of-state figure is published, so that
  // option always uses the sticker price.
  netTuition: { "public-in": 2300, "public-out": null, private: 16910 } as Record<CollegeType, number | null>,
  // Same report: average room and board, 2025-26.
  roomBoard: { "public-in": 13900, "public-out": 13900, private: 15920 },
} as const;

// New York Fed, The Labor Market for Recent College Graduates, outcomes by
// major (2024 Census ACS data, released Feb 4, 2026). Medians for
// full-time workers with a bachelor's degree only. Early career = ages
// 22-27, mid-career = ages 35-45.
export const DEGREE_PAY = {
  college: { early: 58000, mid: 87000 },
  cm: { early: 75000, mid: 120000 },
} as const;

// BLS OEWS May 2025, construction laborers (SOC 47-2061): 10th percentile
// and median, matching content/careers/laborer.md's payTimeline.
export const LABORER_PAY = { p10: 35090, median: 47120 } as const;

// First-line supervisors of construction trades, median wage in
// construction, 2025 (NAHB analysis of BLS OEWS).
export const SUPERVISOR_MEDIAN = 80000;

// 2026-27 federal Direct Loan rate for undergraduates (fixed).
export const DEFAULT_LOAN_RATE = 6.52;

export type TradePay = {
  slug: string;
  title: string;
  // BLS OEWS May 2025 national 10th percentile and median annual wage.
  p10: number;
  median: number;
};

export type Inputs = {
  trade: TradePay;
  collegeType: CollegeType;
  useNetPrice: boolean;
  includeRoomBoard: boolean;
  shareBorrowed: number; // 0..1
  loanRate: number; // percent, e.g. 6.52
  repayYears: number;
  schoolJobPay: number; // per year, while in any school
  apprenticeYears: number;
  apprenticeCostPerYear: number;
  tradeSchoolCost: number; // total, 1-year program
  moveUpToSupervisor: boolean;
  years: number; // horizon, counted from age 18
};

export const START_AGE = 18;

export type YearPoint = { age: number; net: number; pay: number; owed: number };

export type PathResult = {
  id: PathId;
  points: YearPoint[]; // net position at the END of each year; points[0] is age 18 (start, all zero)
  trainingYears: number;
  schoolCost: number; // total school costs, borrowed or not
  debtAtFinish: number; // balance (with interest) when repayment starts
  monthlyPayment: number;
  totalInterest: number;
  payOnceTrained: number; // pay in the first full year after training
};

// ---------------------------------------------------------------------------
// Pay curves: one function per path, returning gross pay for year index t
// (t = 0 is the year you turn 18).

function lerp(a: number, b: number, f: number) {
  return a + (b - a) * Math.min(1, Math.max(0, f));
}

// After training, trade pay sits at the national median for the rest of the
// career. With "move up to supervisor" on, it climbs from the median when
// training ends to the supervisor median at 35 (never below the trade's own
// median, which matters for elevator mechanics).
function tradePayAfterTraining(t: number, finishT: number, inp: Inputs) {
  const { median } = inp.trade;
  if (!inp.moveUpToSupervisor) return median;
  const target = Math.max(median, SUPERVISOR_MEDIAN);
  const t35 = 35 - START_AGE;
  if (finishT >= t35) return target;
  return lerp(median, target, (t - finishT) / (t35 - finishT));
}

function degreePay(t: number, early: number, mid: number) {
  const age = START_AGE + t;
  if (age < 22) return 0;
  if (age <= 27) return early;
  return lerp(early, mid, (age - 27) / (40 - 27));
}

// ---------------------------------------------------------------------------
// Loans: each year's borrowing is drawn at the start of that school year and
// accrues interest (unsubsidized, the conservative case) through school plus
// the standard 6-month grace period, then is repaid on a standard
// fixed-payment plan. Simulated monthly so the numbers match a real loan.

type LoanSchedule = {
  balanceAtYearEnd: number[]; // index = year t
  paidInYear: number[];
  debtAtFinish: number;
  monthlyPayment: number;
  totalInterest: number;
};

function simulateLoan(borrowPerYear: number[], horizon: number, rate: number, repayYears: number): LoanSchedule {
  const r = rate / 100 / 12;
  const schoolYears = borrowPerYear.length;
  const graceMonths = 6;
  const repayStart = schoolYears * 12 + graceMonths; // month index payments begin
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
  return { balanceAtYearEnd, paidInYear, debtAtFinish, monthlyPayment: pmt, totalInterest };
}

// ---------------------------------------------------------------------------

type PathSpec = {
  trainingYears: number;
  costPerYear: number[]; // school costs for each training year (length = trainingYears)
  pay: (t: number) => number;
  payOnceTrained: number;
  canBorrow: boolean;
};

function specFor(id: PathId, inp: Inputs): PathSpec {
  const { trade } = inp;
  switch (id) {
    case "work": {
      // Laborer / helper with no formal training: 10th percentile at 18,
      // climbing to the laborer median by 22, flat after.
      const pay = (t: number) => lerp(LABORER_PAY.p10, LABORER_PAY.median, t / 4);
      return { trainingYears: 0, costPerYear: [], pay, payOnceTrained: LABORER_PAY.p10, canBorrow: false };
    }
    case "apprentice": {
      // Paid from day one: 50% of the journeyman (median) wage in year 1,
      // rising evenly to 90% in the final year, then full pay.
      const L = inp.apprenticeYears;
      const pay = (t: number) => {
        if (t < L) return trade.median * (L === 1 ? 0.7 : 0.5 + (0.4 * t) / (L - 1));
        return tradePayAfterTraining(t, L, inp);
      };
      return {
        trainingYears: L,
        costPerYear: Array(L).fill(inp.apprenticeCostPerYear),
        pay,
        payOnceTrained: tradePayAfterTraining(L, L, inp),
        canBorrow: false, // small out-of-pocket costs, paid from wages
      };
    }
    case "tradeschool": {
      // One year of school, then working at the trade's 10th percentile,
      // reaching the median four years later.
      const pay = (t: number) => {
        if (t < 1) return inp.schoolJobPay;
        if (t < 5) return lerp(trade.p10, trade.median, (t - 1) / 4);
        return tradePayAfterTraining(t, 5, inp);
      };
      return { trainingYears: 1, costPerYear: [inp.tradeSchoolCost], pay, payOnceTrained: trade.p10, canBorrow: true };
    }
    case "college":
    case "cm": {
      const tuition =
        inp.useNetPrice && COLLEGE_COSTS.netTuition[inp.collegeType] != null
          ? (COLLEGE_COSTS.netTuition[inp.collegeType] as number)
          : COLLEGE_COSTS.tuition[inp.collegeType];
      const yearCost = tuition + (inp.includeRoomBoard ? COLLEGE_COSTS.roomBoard[inp.collegeType] : 0);
      const { early, mid } = DEGREE_PAY[id];
      const pay = (t: number) => (t < 4 ? inp.schoolJobPay : degreePay(t, early, mid));
      return { trainingYears: 4, costPerYear: Array(4).fill(yearCost), pay, payOnceTrained: early, canBorrow: true };
    }
  }
}

export function runPath(id: PathId, inp: Inputs): PathResult {
  const spec = specFor(id, inp);
  const horizon = inp.years;
  const share = spec.canBorrow ? inp.shareBorrowed : 0;
  const borrow = spec.costPerYear.map((c) => c * share);
  const loan = simulateLoan(borrow, horizon, inp.loanRate, inp.repayYears);

  const points: YearPoint[] = [{ age: START_AGE, net: 0, pay: 0, owed: 0 }];
  let cumPay = 0;
  let cumCash = 0;
  let cumPaid = 0;
  for (let t = 0; t < horizon; t++) {
    const pay = spec.pay(t);
    cumPay += pay;
    if (t < spec.trainingYears) cumCash += spec.costPerYear[t] - borrow[t];
    cumPaid += loan.paidInYear[t];
    const owed = loan.balanceAtYearEnd[t];
    points.push({ age: START_AGE + t + 1, net: cumPay - cumCash - cumPaid - owed, pay, owed });
  }
  return {
    id,
    points,
    trainingYears: spec.trainingYears,
    schoolCost: spec.costPerYear.reduce((a, b) => a + b, 0),
    debtAtFinish: loan.debtAtFinish,
    monthlyPayment: loan.monthlyPayment,
    totalInterest: loan.totalInterest,
    payOnceTrained: spec.payOnceTrained,
  };
}

// First age at which a path that dipped below zero climbs back to zero or
// above. null = never below zero, or still below zero at the horizon.
export function breakEvenAge(points: YearPoint[]): number | null | "never-below" {
  const firstNeg = points.findIndex((p) => p.net < 0);
  if (firstNeg === -1) return "never-below";
  const back = points.findIndex((p, i) => i > firstNeg && p.net >= 0);
  return back === -1 ? null : points[back].age;
}

// First age at which path `a` is ahead of path `b`, after being behind.
export function catchUpAge(a: YearPoint[], b: YearPoint[]): number | null {
  let wasBehind = false;
  for (let i = 1; i < a.length; i++) {
    if (a[i].net < b[i].net) wasBehind = true;
    else if (wasBehind && a[i].net > b[i].net) return a[i].age;
  }
  return null;
}
