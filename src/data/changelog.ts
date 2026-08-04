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
