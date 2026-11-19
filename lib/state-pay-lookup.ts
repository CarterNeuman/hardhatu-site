import type { Curve } from "./roi-model";
import { OCCUPATIONS, type Occupation, type WageRecord } from "./state-pay-data";

// Look up an occupation's pay in a state, falling back to the national
// figure (and saying so) when BLS doesn't publish that state.

export const NATIONAL = "US";

export type Lookup = { curve: Curve; employment: number; national: boolean };

export function lookup(occ: Occupation, code: string): Lookup {
  const rec: WageRecord | undefined = code === NATIONAL ? undefined : occ.states[code];
  const r = rec ?? occ.national;
  return {
    curve: { p10: r[1], median: r[2], p75: r[3], p90: r[4] },
    employment: r[0],
    national: code !== NATIONAL && !rec,
  };
}

// Occupations the state guides need that the generated ROI data file doesn't
// carry (so they stay off the ROI page's tables). National only: BLS
// publishes no state estimates for them in the states we cover.
// Plasterers and stucco masons (47-2161): BLS OEWS May 2025 national annual
// wages via O*NET (onetonline.org/link/localwages/47-2161.00). Employment is
// not used by the guides, so it is left at 0.
const GUIDE_ONLY: Occupation[] = [
  {
    soc: "47-2161",
    label: "Plasterers & stucco masons",
    group: "trade",
    slug: "plasterer-stucco-mason",
    note: null,
    national: [0, 39560, 57660, 71310, 96710],
    // BLS OEWS May 2025 via O*NET (Florida, Louisiana, Texas, Oklahoma); job counts aren't used, so 0.
    states: { FL: [0, 33410, 47420, 52760, 62770], LA: [0, 38710, 49950, 56070, 62280], TX: [0, 40650, 51140, 60370, 62400], OK: [0, 46300, 49450, 49800, 57200] },
  },
];

export function occupation(soc: string): Occupation {
  const o = OCCUPATIONS.find((x) => x.soc === soc) ?? GUIDE_ONLY.find((x) => x.soc === soc);
  if (!o) throw new Error(`Unknown SOC ${soc}`);
  return o;
}
