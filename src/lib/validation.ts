// Server-side validation for public report submissions. The client validates
// too, but the anon Supabase key means writes must never trust the client — and
// the report table's RLS allows inserts, so the API is the enforcement point.

import type { IncidentCategory, IncidentSeverity } from '@/types';

export const VALID_CATEGORIES: IncidentCategory[] = [
  'vandalism',
  'harassment',
  'assault',
  'online_threat',
  'other',
];

export const VALID_SEVERITIES: IncidentSeverity[] = ['low', 'medium', 'high'];

export function isValidCategory(v: unknown): v is IncidentCategory {
  return typeof v === 'string' && (VALID_CATEGORIES as string[]).includes(v);
}

export function isValidSeverity(v: unknown): v is IncidentSeverity {
  return typeof v === 'string' && (VALID_SEVERITIES as string[]).includes(v);
}

// Accepts a YYYY-MM-DD or ISO date; rejects unparseable dates, dates in the
// future, and anything before 2000 (typo / garbage guard).
export function isValidOccurredAt(v: unknown): v is string {
  if (typeof v !== 'string' || v.length < 8 || v.length > 40) return false;
  const t = Date.parse(v);
  if (Number.isNaN(t)) return false;
  const d = new Date(t);
  const now = new Date();
  const min = new Date('2000-01-01');
  // Allow up to end of today (timezone slack of 1 day).
  const maxAllowed = now.getTime() + 24 * 60 * 60 * 1000;
  return d.getTime() >= min.getTime() && d.getTime() <= maxAllowed;
}
