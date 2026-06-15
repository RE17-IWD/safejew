// Generates supabase/incidents_seed_v4.sql from demo-data.ts
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcPath = join(__dirname, '../src/lib/demo-data.ts');
const outPath = join(__dirname, '../supabase/incidents_seed_v4.sql');

const src = readFileSync(srcPath, 'utf8');

// Strip TypeScript type annotations so we can eval the array
// Extract just the DEMO_INCIDENTS array literal
const start = src.indexOf('export const DEMO_INCIDENTS');
// Skip past the type annotation to find the actual = [ assignment
const eqPos = src.indexOf('= [', start);
const arrStart = eqPos + 2; // points to the [
// Find matching closing bracket
let depth = 0;
let arrEnd = arrStart;
for (let i = arrStart; i < src.length; i++) {
  if (src[i] === '[') depth++;
  else if (src[i] === ']') { depth--; if (depth === 0) { arrEnd = i; break; } }
}
const arrLiteral = src.slice(arrStart, arrEnd + 1);

// Replace TypeScript-only constructs
const cleaned = arrLiteral
  .replace(/\/\/.*$/gm, '') // strip single-line comments
  .replace(/as\s+\w+/g, '');  // strip 'as Type' casts

const fn = new Function(`return ${cleaned};`);
const incidents = fn();

console.log(`Generating SQL for ${incidents.length} incidents...`);

const esc = (v) => {
  if (v === null) return 'NULL';
  if (typeof v === 'number') return String(v);
  return `'${String(v).replace(/'/g, "''")}'`;
};

const rows = incidents.map((inc) =>
  `  (${[
    esc(inc.id),
    esc(inc.category),
    esc(inc.description),
    esc(inc.occurred_at),
    esc(inc.neighborhood),
    esc(inc.lat),
    esc(inc.lng),
    esc(inc.severity),
    esc(inc.source),
    esc(inc.status),
    esc(inc.campus_id ?? null),
    esc(inc.created_at),
  ].join(', ')})`
);

const sql = `-- SafeJew incidents seed v4 — ${incidents.length} incidents
-- Generated ${new Date().toISOString()}
-- Run in Supabase SQL editor: Dashboard → SQL Editor → paste and run
-- Safe to re-run (upsert).

INSERT INTO incidents (
  id, category, description, occurred_at, neighborhood,
  lat, lng, severity, source, status, campus_id, created_at
) VALUES
${rows.join(',\n')}
ON CONFLICT (id) DO UPDATE SET
  category    = EXCLUDED.category,
  description = EXCLUDED.description,
  occurred_at = EXCLUDED.occurred_at,
  neighborhood= EXCLUDED.neighborhood,
  lat         = EXCLUDED.lat,
  lng         = EXCLUDED.lng,
  severity    = EXCLUDED.severity,
  source      = EXCLUDED.source,
  status      = EXCLUDED.status,
  campus_id   = EXCLUDED.campus_id,
  created_at  = EXCLUDED.created_at;
`;

writeFileSync(outPath, sql, 'utf8');
console.log(`Written to ${outPath}`);
