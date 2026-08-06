// Public changelog of data + product updates. Newest first.
// Pipeline "B" (the daily Claude routine) can prepend entries here when it
// refreshes the figures, giving readers a transparent update history.

export interface ChangelogEntry {
  date: string; // ISO date
  title: string;
  items: string[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    date: '2026-08-04',
    title: 'Deeper campus data + verified figures',
    items: [
      'Added Hillel International’s tracker: 2,334 campus incidents in 2024–25 (on pace for 1,800+ in 2025–26).',
      'Added AJC’s 2026 survey: 91% of American Jews feel less safe; 42% of Jewish students have experienced antisemitism.',
      'Corrected ADL 2026 Campus Report Card to 58% of 150 schools graded A/B (23 A’s, 4 F’s).',
      'Added ADL 2025 detail: 45% of incidents invoked Israel/Zionism; 3 U.S. fatalities.',
      'Added the April 2026 Adas Torah synagogue assault and enriched the Pasadena mural vandalism record.',
    ],
  },
  {
    date: '2026-08-02',
    title: 'Full site rebuild + latest 2026 data',
    items: [
      'Redesigned the site around a live incident-monitor experience.',
      'Added LAPD 2026 year-to-date (46 anti-Jewish hate crimes through May, on pace for 110+).',
      'Added FBI 2024 national figures (1,938 anti-Jewish incidents — a record; 69% of religion-based).',
      'Added ADL California 2025 (817 incidents, 2nd-most of any state) and CA statewide totals.',
      'Added the J7 global report (20 murdered in 2025 — deadliest diaspora year since 1994).',
      'Introduced a daily auto-update pipeline for source figures.',
    ],
  },
  {
    date: '2026-07-15',
    title: 'ADL, CA DOJ, and LA County figures refreshed',
    items: [
      'ADL 2025 Audit: 6,274 U.S. incidents (down 33%), but a record 203 assaults.',
      'CA DOJ 2025: Jews targeted in 74% of religion-based hate crimes.',
      'LA County 2024: 202 anti-Jewish hate crimes (2nd-highest in 44 years).',
    ],
  },
];
