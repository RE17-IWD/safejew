// Refreshes California anti-Jewish hate-crime counts from the FBI Crime Data
// Explorer (UCR/NIBRS) and prints an AnnualPoint[] you can paste into
// src/data/hate-crime-stats.ts (FBI_CALIFORNIA_ANTI_JEWISH).
//
// Usage:
//   FBI_API_KEY=your_key node scripts/fetch-fbi-hate-crime.mjs [startYear] [endYear]
//
// Get a free key instantly at https://api.data.gov/signup/ . Without a key it
// falls back to DEMO_KEY, which is rate-limited to ~30 requests/hour — fine for
// a one-off refresh of a few years, not for production request-time use. That is
// exactly why these numbers are committed to the repo rather than fetched live.

const API_KEY = process.env.FBI_API_KEY || 'DEMO_KEY';
const START = Number(process.argv[2] || 2016);
const END = Number(process.argv[3] || new Date().getFullYear() - 1);
const STATE = 'CA';
const BIAS = 'Anti-Jewish';

async function yearCount(year) {
  const url = `https://api.usa.gov/crime/fbi/cde/hate-crime/state/${STATE}?from=01-${year}&to=12-${year}&API_KEY=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${year}: HTTP ${res.status}`);
  const json = await res.json();
  const bias = json?.incident_section?.bias ?? {};
  return bias[BIAS] ?? null;
}

const out = [];
for (let y = START; y <= END; y++) {
  try {
    const v = await yearCount(y);
    if (v == null) {
      console.error(`  ${y}: no ${BIAS} value (rate-limited or unpublished)`);
    } else {
      out.push({ year: y, value: v });
      console.error(`  ${y}: ${v}`);
    }
  } catch (e) {
    console.error(`  ${e.message}`);
  }
  // Be gentle with the rate limit.
  await new Promise((r) => setTimeout(r, 1500));
}

console.log('\n// Paste into FBI_CALIFORNIA_ANTI_JEWISH:');
console.log(
  out.map((p) => `  { year: ${p.year}, value: ${p.value} },`).join('\n')
);
