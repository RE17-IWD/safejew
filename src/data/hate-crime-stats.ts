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
// 2024 was the highest total in the Audit's 46-year history. 2025 fell 33% to
// 6,274 — the third-highest year on record — but physical assaults hit an
// all-time high (203, with a record 32 involving a deadly weapon).
// Source dates: ADL 2024 Audit; ADL 2025 Audit (released May 6, 2026).
export const NATIONAL_ADL: AnnualPoint[] = [
  { year: 2022, value: 3697 },
  { year: 2023, value: 8873 },
  { year: 2024, value: 9354 },
  { year: 2025, value: 6274 },
];

// ADL 2025 assault detail (record high despite lower overall total).
export const NATIONAL_ADL_2025 = {
  assaults: 203,
  assaultsPrev2024: 196,
  deadlyWeaponAssaults: 32,
  deadlyWeaponAssaultsPrev2024: 23,
};

// ── Los Angeles County: Commission on Human Relations Hate Crime Report ─────
// Anti-Jewish hate crimes reported in LA County. 2023 was the largest number
// ever recorded; 2024 is the second-highest in the report's 44-year history.
// NOTE: LA County's report runs a year behind — the 2025-data report is not yet
// published as of compilation, so this series ends at 2024. See LA_COUNTY_NOTE.
export const LA_COUNTY_ANTI_JEWISH: AnnualPoint[] = [
  { year: 2022, value: 127 },
  { year: 2023, value: 244 },
  { year: 2024, value: 202 },
];

export const LA_COUNTY_NOTE =
  "LA County's Hate Crime Report is released roughly a year in arrears; the 2025 report was not yet published when this data was compiled.";

// ── California: DOJ "Hate Crime in California" (anti-Jewish bias events) ─────
// 2025 report released July 1, 2026. In 2025, Jews were targeted in 289 of the
// state's 392 religion-based hate crimes (about 74%).
export const CALIFORNIA_ANTI_JEWISH: AnnualPoint[] = [
  { year: 2023, value: 289 },
  { year: 2024, value: 310 },
  { year: 2025, value: 289 },
];

// Share of California religion-based hate crimes targeting Jews, 2025 (CA DOJ).
export const CALIFORNIA_RELIGIOUS_JEWISH_SHARE_2025 = 74;

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

// ── National campus antisemitism (ADL) ─────────────────────────────────────
// ADL recorded 1,694 antisemitic incidents on U.S. college campuses in 2024,
// 84% more than 2023 (922) and 18% of all incidents that year — the highest
// campus share in any Audit. In an ADL survey, 73% of Jewish college students
// reported experiencing or witnessing antisemitism since the 2023-24 year began.
export const ADL_CAMPUS = {
  incidents2024: 1694,
  incidents2023: 922,
  pctIncrease2023to2024: 84,
  shareOfAllIncidents2024: 18,
  studentsExperiencedPct: 73,
};

export const SOURCES: DataSource[] = [
  {
    key: 'adl',
    name: 'ADL — Audit of Antisemitic Incidents (2024 & 2025)',
    url: 'https://www.adl.org/resources/report/audit-antisemitic-incidents-2025',
    note: 'National antisemitic incidents; 2025 released May 2026.',
  },
  {
    key: 'lacounty',
    name: 'LA County Commission on Human Relations — Hate Crime Report',
    url: 'https://hrc.lacounty.gov/',
    note: 'Anti-Jewish hate crimes reported in Los Angeles County (through 2024).',
  },
  {
    key: 'cadoj',
    name: 'California DOJ — Hate Crime in California (OpenJustice)',
    url: 'https://openjustice.doj.ca.gov/',
    note: 'Statewide anti-Jewish bias hate-crime events; 2025 released July 2026.',
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
