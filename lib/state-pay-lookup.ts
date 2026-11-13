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

export function occupation(soc: string): Occupation {
  const o = OCCUPATIONS.find((x) => x.soc === soc);
  if (!o) throw new Error(`Unknown SOC ${soc}`);
  return o;
}
