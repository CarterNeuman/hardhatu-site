// Works out which U.S. state a free-text location points at ("Macon, GA",
// "atlanta georgia", "30303") so the Action Plan can tie in that state's
// field guide. Pure and tiny on purpose: it runs in the browser, so it
// carries its own 51-entry name list instead of importing the big pay or
// guide data files.

// What the Action Plan needs to know about each state guide. Built on the
// server from lib/state-guides.ts (see buildActionPlanDataByCategory).
export type StateGuideRef = {
  code: string;
  slug: string;
  name: string;
  tradeSlugs: string[];
  // Career categories the guide covers (today: "Field & Trades"). A plan
  // in another category doesn't get pointed at a trades-only guide.
  categories: string[];
  // ZIP code prefixes (first three digits, inclusive ranges) and a few
  // unambiguous city names, for locations typed without a state.
  zip3: [number, number][];
  cities: string[];
};

const STATE_NAMES: [string, string][] = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"], ["CA", "California"],
  ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"], ["DC", "District of Columbia"], ["FL", "Florida"],
  ["GA", "Georgia"], ["HI", "Hawaii"], ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"],
  ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"], ["MD", "Maryland"],
  ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"], ["MS", "Mississippi"], ["MO", "Missouri"],
  ["MT", "Montana"], ["NE", "Nebraska"], ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"],
  ["NM", "New Mexico"], ["NY", "New York"], ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"],
  ["OK", "Oklahoma"], ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"], ["SC", "South Carolina"],
  ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"], ["UT", "Utah"], ["VT", "Vermont"],
  ["VA", "Virginia"], ["WA", "Washington"], ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
];
const CODES = new Set(STATE_NAMES.map(([c]) => c));
// Longest names first, so "West Virginia" wins over "Virginia".
const BY_NAME = [...STATE_NAMES].sort((a, b) => b[1].length - a[1].length);

// Returns a two-letter state code, or null when the text doesn't name one.
export function stateCodeFromLocation(raw: string): string | null {
  const text = (raw ?? "").trim();
  if (!text) return null;
  const lower = text.toLowerCase();

  if (/\b(washington,?\s*d\.?\s*c\.?|district of columbia)\b/i.test(text)) return "DC";

  for (const [code, name] of BY_NAME) {
    if (new RegExp(`\\b${name.toLowerCase()}\\b`).test(lower)) return code;
  }

  // Two-letter code: after a comma ("Macon, ga"), typed in capitals
  // ("Macon GA"), or on its own ("GA"). A lowercase word like "in" or
  // "me" mid-sentence never counts.
  const afterComma = text.match(/,\s*([A-Za-z]{2})\b\.?/);
  if (afterComma && CODES.has(afterComma[1].toUpperCase())) return afterComma[1].toUpperCase();
  const capital = text.match(/\b([A-Z]{2})\b/g)?.find((t) => CODES.has(t));
  if (capital) return capital;
  if (/^[A-Za-z]{2}$/.test(text) && CODES.has(text.toUpperCase())) return text.toUpperCase();

  return null;
}

// The state guide this location points at, if there is one. Checks a
// typed state first, then a ZIP code, then a known city.
export function matchStateGuide(location: string, guides: StateGuideRef[]): StateGuideRef | undefined {
  if (!guides.length) return undefined;
  const code = stateCodeFromLocation(location);
  if (code) return guides.find((g) => g.code === code);

  const zip = (location ?? "").match(/\b(\d{5})(?:-\d{4})?\b/);
  if (zip) {
    const prefix = Number(zip[1].slice(0, 3));
    return guides.find((g) => g.zip3.some(([lo, hi]) => prefix >= lo && prefix <= hi));
  }

  const lower = (location ?? "").toLowerCase();
  return guides.find((g) => g.cities.some((city) => new RegExp(`\\b${city.toLowerCase()}\\b`).test(lower)));
}
