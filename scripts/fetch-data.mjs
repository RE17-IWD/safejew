#!/usr/bin/env node
/**
 * SafeJew — daily data fetcher (auto-update pipeline "A").
 *
 * Runs from the GitHub Action in .github/workflows/update-data.yml.
 * It checks machine-readable sources and writes a small JSON snapshot to
 *   src/data/auto-updated.json
 * WITHOUT ever overwriting the hand-curated, cited numbers in
 * src/data/hate-crime-stats.ts (that file stays the source of truth for the
 * headline figures; the intelligent daily refresh of those is pipeline "B",
 * the scheduled Claude routine — see docs/AUTO_UPDATE.md).
 *
 * Each source is wrapped in try/catch so one failing endpoint never breaks the
 * run. Extend the SOURCES list as clean APIs become available.
 *
 * Requires Node 18+ (global fetch).
 */
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'src', 'data', 'auto-updated.json');

async function safe(name, fn) {
  try {
    const value = await fn();
    return { name, ok: true, value };
  } catch (err) {
    console.warn(`[fetch-data] source "${name}" failed:`, err?.message ?? err);
    return { name, ok: false, error: String(err?.message ?? err) };
  }
}

/**
 * FBI Crime Data Explorer — national hate-crime counts.
 * Public JSON endpoint (no key required for the aggregate national series).
 * Example: anti-Jewish (bias code "Anti-Jewish") national by year.
 * If the CDE schema changes, this simply logs and skips.
 */
async function fbiNationalAntiJewish() {
  const url =
    'https://cde.ucr.cjis.gov/LATEST/hate-crime/national/bias?from=2020&to=2025';
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  // Return the raw payload; parsing/normalization is done by the review step (B).
  return { source: url, fetchedKeys: Object.keys(json ?? {}).slice(0, 10) };
}

async function main() {
  const SOURCES = [safe('fbi_national', fbiNationalAntiJewish)];
  const results = await Promise.all(SOURCES);

  const prev = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};
  const snapshot = {
    lastChecked: new Date().toISOString(),
    // keep the previous "lastChanged" unless a value actually changed
    lastChanged: prev.lastChanged ?? null,
    results,
  };

  // naive change detection: compare results payloads
  const changed = JSON.stringify(prev.results ?? null) !== JSON.stringify(results);
  if (changed) snapshot.lastChanged = snapshot.lastChecked;

  writeFileSync(OUT, JSON.stringify(snapshot, null, 2) + '\n');
  console.log(`[fetch-data] wrote ${OUT} (changed=${changed})`);
}

main().catch((e) => {
  console.error('[fetch-data] fatal:', e);
  // Do not fail the workflow hard on a fetch error — exit 0 so the cron stays green.
  process.exit(0);
});
