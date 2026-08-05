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
export const DATA_COMPILED = 'August 2026';

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
  israelRelatedSharePct: 45, // % of 2025 incidents that invoked Israel or Zionism
  usFatalities2025: 3, // killed in antisemitic attacks in the U.S. in 2025
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
  incidents2025: 583, // ADL 2025 Audit: campus incidents fell 66% from 2024
  incidents2024: 1694,
  incidents2023: 922,
  pctIncrease2023to2024: 84,
  pctDecrease2024to2025: 66,
  shareOfAllIncidents2024: 18,
  studentsExperiencedPct: 73,
  // ADL Campus Antisemitism Report Card: share of assessed schools graded A or B.
  // 2026 report card assessed 150 schools: 23 A's, 64 B's, 51 C's, 8 D's, 4 F's.
  reportCardAB2024: 23.5,
  reportCardAB2025: 41,
  reportCardAB2026: 58,
  reportCard2026SchoolsAssessed: 150,
  reportCard2026As: 23,
  reportCard2026Fs: 4,
  reportCard2026ImprovedPct: 47, // share of 2025-assessed schools that improved in 2026
};

// ── AJC — State of Antisemitism in America (report released Feb 2026) ────────
export const AJC_2026 = {
  americanJewsFeelLessSafePct: 91, // feel less safe as a Jew in the U.S. in the past year
  studentsExperiencedPct: 42, // Jewish college students who experienced antisemitism
  studentsFeltUnsafeAtEventPct: 55, // of those, felt unsafe/uncomfortable at a campus event
  studentsHidIdentityPct: 34, // avoided displaying Jewish identity out of fear
  nonJewishWitnessedPct: 48, // non-Jewish students who witnessed anti-Jewish behavior
};

// ── Hillel International — campus antisemitic-incident tracker (academic year) ─
// Hillel's own tracker counts campus-affiliated incidents broadly, so its totals
// differ methodologically from the ADL Audit's calendar-year campus figure.
export const HILLEL_TRACKER = {
  incidents2022_23: 289,
  incidents2023_24: 1853,
  incidents2024_25: 2334, // most recent complete academic year
  projected2025_26: 1800, // on track for 1,800+
  onlineHarassmentIncreasePct: 185,
  assaults2023_24: 50,
  assaults2024_25: 32,
};

// ── ADL 2026 Campus Antisemitism Report Card ────────────────────────────────
// 150 schools graded A–F on policy, response, and Jewish-life investment.
export const REPORT_CARD_2026 = {
  schoolsAssessed: 150,
  distribution: [
    { grade: 'A', count: 23 },
    { grade: 'B', count: 64 },
    { grade: 'C', count: 51 },
    { grade: 'D', count: 8 },
    { grade: 'F', count: 4 },
  ],
  topRated: [
    'New York University',
    'Temple University',
    'American University',
    'Washington University in St. Louis',
    'Vanderbilt University',
    'Johns Hopkins University',
    'Vassar College',
    'Arizona State University',
  ],
  lowestRated: [
    'California State University, Los Angeles',
    'University of North Texas',
    'The New School',
    'Scripps College',
  ],
};

// ── City of LA: LAPD anti-Jewish hate crimes (freshest series) ──────────────
// LAPD tracks hate crimes for the City of LA (distinct from the LA County HRC
// report above, which covers the whole county and runs a year in arrears).
// As of May 31, 2026 the LAPD had logged 46 anti-Jewish hate crimes in the
// city (9.2/mo) — on pace for 110+, ~12% above 2025's 98 (8.2/mo).
// Source: JNS/LAPD, reported June 2026.
export const LAPD_CITY_ANTI_JEWISH: AnnualPoint[] = [
  { year: 2025, value: 98 },
];

export const LAPD_CITY_2026_YTD = {
  incidents: 46,
  throughMonth: 'May', // Jan 1 – May 31, 2026
  monthsElapsed: 5,
  monthlyAvg2026: 9.2,
  monthlyAvg2025: 8.2,
  projectedFullYear: 110,
  pctChangeVsPrevYear: 12,
  totalCityHateCrimesYtd: 281, // all bias categories, incl. 50 aggravated assaults
  note: 'City of Los Angeles (LAPD), January 1 – May 31, 2026.',
};

// ── FBI Hate Crime Statistics — national anti-Jewish (2024, rel. Aug 2025) ──
// Highest number of anti-Jewish incidents the FBI has recorded since it began
// collecting hate-crime data in 1991. Jews are ~2% of the U.S. population.
export const FBI_NATIONAL_2024 = {
  antiJewishIncidents: 1938,
  pctChangeVs2023: 5.8,
  shareOfReligiousBias: 69, // % of all religion-based hate crimes
  shareOfAllHateCrimes: 16, // % of all reported hate crimes
  assaults: 178,
  assaultsPrev2023: 174,
  totalHateIncidents: 11679,
  shareSinceOct2023: 71, // % of religion-based since Oct 2023
};

// ── ADL state ranking: California antisemitic incidents, 2025 ────────────────
// ADL recorded 817 antisemitic incidents in California in 2025 — the second-
// highest state total in the country, behind New York.
export const ADL_CALIFORNIA_2025 = {
  incidents: 817,
  nationalRank: 2,
  higherThanState: 'New York',
};

// ── California statewide hate-crime totals (CA DOJ) ─────────────────────────
export const CALIFORNIA_TOTAL_HATE_CRIMES: AnnualPoint[] = [
  { year: 2024, value: 2023 },
  { year: 2025, value: 1955 },
];

// ── J7 Report on Antisemitism — global diaspora context (rel. July 2026) ────
// The J7 Task Force found 2025 the deadliest year for diaspora antisemitism
// since the 1994 AMIA bombing: 20 people murdered (Sydney, Manchester,
// Washington D.C., Boulder). U.S. incidents fell 33% year-over-year.
export const J7_2025 = {
  murdered: 20,
  deadliestSinceYear: 1994,
  totalIncidentsJ7: 23000,
  pctIncidentsVs2022: 136,
  pctViolentVs2022: 97,
  usPctChange2025: -33,
};

// ── Notable recent incidents (Greater LA & California, 2026) ────────────────
// Curated, source-linked events for the "in the news" strip. These are public
// news reports, kept separate from the aggregate statistics above.
export interface NotableIncident {
  date: string;
  place: string;
  summary: string;
  url: string;
}
export const NOTABLE_2026: NotableIncident[] = [
  {
    date: '2026-07-24',
    place: 'Pasadena, CA',
    summary:
      'Swastikas and “Zionism is not welcome” were painted on a solidarity mural at the fire-destroyed Pasadena Jewish Temple & Center — a mural created after an earlier attack. A swatting call also forced a preschool evacuation; LA County offered a reward and held a July 30 solidarity rally.',
    url: 'https://www.jns.org/news/u-s-news/pasadena-jewish-community-determined-to-be-very-jewish-after-vandalism-of-synagogue-mural',
  },
  {
    date: '2026-06',
    place: 'Los Angeles, CA',
    summary:
      'LAPD reported 46 anti-Jewish hate crimes in the first five months of 2026 — on pace for a ~12% rise over 2025.',
    url: 'https://www.jns.org/news/u-s-news/los-angeles-records-46-anti-jewish-hate-crimes-so-far-in-2026-lapd-says',
  },
  {
    date: '2026-04-27',
    place: 'Los Angeles, CA',
    summary:
      'A 21-year-old was charged with a felony hate crime for an assault on a Jewish man outside the Adas Torah synagogue in the Pico-Robertson neighborhood.',
    url: 'https://ktla.com/news/local-news/man-charged-with-felony-hate-crime-for-attacking-jewish-man-near-l-a-synagogue/',
  },
];

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
