// Verified aggregate antisemitism / hate-crime statistics.
//
// This module is the dashboard's source of truth. Every number here is a
// published figure from an official body (ADL, LA County Commission on Human
// Relations, California DOJ, FBI UCR), cited inline. It is committed data — not
// a live API call — so the dashboard renders instantly and never depends on a
// rate-limited endpoint at request time. Refresh with scripts/fetch-fbi-hate-crime.mjs
// (FBI) or by updating the values below when new annual reports publish.
//
// Do NOT put fabricated or community-submitted numbers in this file. Community
// reports are a separate, clearly-labeled layer shown only on the map.

export interface AnnualPoint {
  year: number;
  value: number;
}

export interface DataSource {
  key: string;
  name: string;
  url: string;
  note: string;
}

// Date this dataset was last compiled from primary sources.
export const DATA_COMPILED = 'July 2026';

// ── National: ADL Audit of Antisemitic Incidents ───────────────────────────
// Reported antisemitic incidents nationwide (assault, harassment, vandalism).
// 2024 is the highest total in the Audit's 46-year history; 58% of 2024
// incidents included elements related to Israel or Zionism.
export const NATIONAL_ADL: AnnualPoint[] = [
  { year: 2022, value: 3697 },
  { year: 2023, value: 8873 },
  { year: 2024, value: 9354 },
];

// ── Los Angeles County: Commission on Human Relations Hate Crime Report ─────
// Anti-Jewish hate crimes reported in LA County. 2023 was the largest number
// ever recorded; 2024 is the second-highest in the report's 44-year history.
export const LA_COUNTY_ANTI_JEWISH: AnnualPoint[] = [
  { year: 2022, value: 127 },
  { year: 2023, value: 244 },
  { year: 2024, value: 202 },
];

// ── California: DOJ "Hate Crime in California" (anti-Jewish bias events) ─────
export const CALIFORNIA_ANTI_JEWISH: AnnualPoint[] = [
  { year: 2023, value: 289 },
  { year: 2024, value: 310 },
];

// ── FBI Crime Data Explorer: California anti-Jewish incidents (historical) ──
// Kept for longer-range context. FBI UCR counts differ methodologically from
// the CA DOJ figures above (NIBRS participation gaps), so they are shown as a
// separate series, never stitched into the CA DOJ line.
export const FBI_CALIFORNIA_ANTI_JEWISH: AnnualPoint[] = [
  { year: 2016, value: 82 },
  { year: 2017, value: 104 },
  { year: 2018, value: 125 },
  { year: 2019, value: 141 },
];

// ── Supporting LA County 2024 context figures ──────────────────────────────
export const LA_COUNTY_CONTEXT = {
  antiJewishShareOfReligious2024: 80, // % of religious-bias hate crimes targeting Jews
  antiIsraeli2023: 22,
  antiIsraeli2024: 28, // record high
  schoolBased2023: 139,
  schoolBased2024: 147, // highest ever
  totalHateCrimes2023: 1367,
  totalHateCrimes2024: 1355,
};

export const SOURCES: DataSource[] = [
  {
    key: 'adl',
    name: 'ADL — Audit of Antisemitic Incidents 2024',
    url: 'https://www.adl.org/resources/report/audit-antisemitic-incidents-2024',
    note: 'National antisemitic incidents (record 46-year high).',
  },
  {
    key: 'lacounty',
    name: 'LA County Commission on Human Relations — Hate Crime Report',
    url: 'https://hrc.lacounty.gov/',
    note: 'Anti-Jewish hate crimes reported in Los Angeles County.',
  },
  {
    key: 'cadoj',
    name: 'California DOJ — Hate Crime in California (OpenJustice)',
    url: 'https://openjustice.doj.ca.gov/',
    note: 'Statewide anti-Jewish bias hate-crime events.',
  },
  {
    key: 'fbi',
    name: 'FBI Crime Data Explorer — Hate Crime',
    url: 'https://cde.ucr.cjis.gov/',
    note: 'Historical California anti-Jewish incident counts (UCR/NIBRS).',
  },
];

// Percent change helper (rounded).
export function pctChange(from: number, to: number): number {
  if (from === 0) return 0;
  return Math.round(((to - from) / from) * 100);
}
