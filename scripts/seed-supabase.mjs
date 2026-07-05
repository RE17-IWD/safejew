// Inserts all 405 incidents + missing campuses into Supabase.
// Uses the same UUID scheme as seed.sql: b{7-digit-n}-0000-0000-0000-000000000001

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const SUPABASE_URL = process.env.SUPABASE_URL?.replace(/\/rest\/v1\/?$/, '');
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('ERROR: Set SUPABASE_URL and SUPABASE_SERVICE_KEY env vars first.');
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Prefer': 'resolution=merge-duplicates',
};

// ── Campus ID mapping (string → UUID used in Supabase) ──────────────────────
const CAMPUS_UUID = {
  'campus-demo-university': 'a0000001-0000-0000-0000-000000000001',
  'campus-cal-state-la':    'a0000001-0000-0000-0000-000000000002',
  'campus-usc':             'a0000001-0000-0000-0000-000000000003',
  'campus-columbia':        'a0000001-0000-0000-0000-000000000004',
  'campus-nyu':             'a0000001-0000-0000-0000-000000000005',
  'campus-harvard':         'a0000001-0000-0000-0000-000000000006',
  'campus-upenn':           'a0000001-0000-0000-0000-000000000007',
  'campus-cornell':         'a0000001-0000-0000-0000-000000000008',
  'campus-stanford':        'a0000001-0000-0000-0000-000000000009',
  'campus-berkeley':        'a0000001-0000-0000-0000-000000000010',
  'campus-michigan':        'a0000001-0000-0000-0000-000000000011',
  'campus-osu':             'a0000001-0000-0000-0000-000000000012',
  'campus-northwestern':    'a0000001-0000-0000-0000-000000000013',
  'campus-bu':              'a0000001-0000-0000-0000-000000000014',
  'campus-brandeis':        'a0000001-0000-0000-0000-000000000015',
  'campus-gwu':             'a0000001-0000-0000-0000-000000000016',
  'campus-maryland':        'a0000001-0000-0000-0000-000000000017',
  'campus-florida':         'a0000001-0000-0000-0000-000000000018',
  'campus-tulane':          'a0000001-0000-0000-0000-000000000019',
  'campus-george-mason':    'a0000001-0000-0000-0000-000000000020',
  'campus-american':        'a0000001-0000-0000-0000-000000000021',
  'campus-umd-baltimore':   'a0000001-0000-0000-0000-000000000022',
};

// Incident string ID → UUID
function incidentUUID(stringId) {
  const n = parseInt(stringId.replace('demo-incident-', ''), 10);
  return `b${String(n).padStart(7, '0')}-0000-0000-0000-000000000001`;
}

// ── Step 1: Insert missing campuses ─────────────────────────────────────────
const newCampuses = [
  { id: 'a0000001-0000-0000-0000-000000000004', name: 'Columbia University',          city: 'New York',       state: 'NY', lat: 40.8075, lng: -73.9626 },
  { id: 'a0000001-0000-0000-0000-000000000005', name: 'New York University',           city: 'New York',       state: 'NY', lat: 40.7295, lng: -73.9965 },
  { id: 'a0000001-0000-0000-0000-000000000006', name: 'Harvard University',            city: 'Cambridge',      state: 'MA', lat: 42.3770, lng: -71.1167 },
  { id: 'a0000001-0000-0000-0000-000000000007', name: 'University of Pennsylvania',    city: 'Philadelphia',   state: 'PA', lat: 39.9522, lng: -75.1932 },
  { id: 'a0000001-0000-0000-0000-000000000008', name: 'Cornell University',            city: 'Ithaca',         state: 'NY', lat: 42.4534, lng: -76.4735 },
  { id: 'a0000001-0000-0000-0000-000000000009', name: 'Stanford University',           city: 'Stanford',       state: 'CA', lat: 37.4275, lng: -122.1697 },
  { id: 'a0000001-0000-0000-0000-000000000010', name: 'UC Berkeley',                  city: 'Berkeley',       state: 'CA', lat: 37.8724, lng: -122.2595 },
  { id: 'a0000001-0000-0000-0000-000000000011', name: 'University of Michigan',        city: 'Ann Arbor',      state: 'MI', lat: 42.2780, lng: -83.7382 },
  { id: 'a0000001-0000-0000-0000-000000000012', name: 'Ohio State University',         city: 'Columbus',       state: 'OH', lat: 40.0076, lng: -83.0300 },
  { id: 'a0000001-0000-0000-0000-000000000013', name: 'Northwestern University',       city: 'Evanston',       state: 'IL', lat: 42.0565, lng: -87.6753 },
  { id: 'a0000001-0000-0000-0000-000000000014', name: 'Boston University',             city: 'Boston',         state: 'MA', lat: 42.3505, lng: -71.1054 },
  { id: 'a0000001-0000-0000-0000-000000000015', name: 'Brandeis University',           city: 'Waltham',        state: 'MA', lat: 42.3657, lng: -71.2586 },
  { id: 'a0000001-0000-0000-0000-000000000016', name: 'George Washington University',  city: 'Washington',     state: 'DC', lat: 38.8997, lng: -77.0480 },
  { id: 'a0000001-0000-0000-0000-000000000017', name: 'University of Maryland',        city: 'College Park',   state: 'MD', lat: 38.9869, lng: -76.9426 },
  { id: 'a0000001-0000-0000-0000-000000000018', name: 'University of Florida',         city: 'Gainesville',    state: 'FL', lat: 29.6436, lng: -82.3549 },
  { id: 'a0000001-0000-0000-0000-000000000019', name: 'Tulane University',             city: 'New Orleans',    state: 'LA', lat: 29.9384, lng: -90.1199 },
  { id: 'a0000001-0000-0000-0000-000000000020', name: 'George Mason University',       city: 'Fairfax',        state: 'VA', lat: 38.8316, lng: -77.3119 },
  { id: 'a0000001-0000-0000-0000-000000000021', name: 'American University',           city: 'Washington',     state: 'DC', lat: 38.9376, lng: -77.0871 },
  { id: 'a0000001-0000-0000-0000-000000000022', name: 'UMBC',                          city: 'Baltimore',      state: 'MD', lat: 39.2557, lng: -76.7101 },
];

console.log(`Inserting ${newCampuses.length} new campuses...`);
const campusRes = await fetch(`${SUPABASE_URL}/rest/v1/campuses`, {
  method: 'POST',
  headers,
  body: JSON.stringify(newCampuses),
});
if (campusRes.ok || campusRes.status === 201) {
  console.log('  Campuses inserted.');
} else {
  const t = await campusRes.text();
  console.error(`  Campus insert failed (${campusRes.status}): ${t}`);
}

// ── Step 2: Load and transform incidents ─────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(__dirname, '../src/lib/demo-data.ts'), 'utf8');
const eqPos = src.indexOf('= [', src.indexOf('export const DEMO_INCIDENTS'));
const arrStart = eqPos + 2;
let depth = 0, arrEnd = arrStart;
for (let i = arrStart; i < src.length; i++) {
  if (src[i] === '[') depth++;
  else if (src[i] === ']') { depth--; if (depth === 0) { arrEnd = i; break; } }
}
const cleaned = src.slice(arrStart, arrEnd + 1).replace(/\/\/.*$/gm, '');
const rawIncidents = new Function(`return ${cleaned};`)();

const incidents = rawIncidents.map((inc) => ({
  id:           incidentUUID(inc.id),
  category:     inc.category,
  description:  inc.description,
  occurred_at:  inc.occurred_at,
  neighborhood: inc.neighborhood,
  lat:          inc.lat,
  lng:          inc.lng,
  severity:     inc.severity,
  source:       inc.source,
  status:       inc.status,
  campus_id:    inc.campus_id ? (CAMPUS_UUID[inc.campus_id] ?? null) : null,
  created_at:   inc.created_at,
}));

console.log(`\nSeeding ${incidents.length} incidents...`);

const BATCH = 50;
let inserted = 0;
let errors = 0;

for (let i = 0; i < incidents.length; i += BATCH) {
  const batch = incidents.slice(i, i + BATCH);
  const res = await fetch(`${SUPABASE_URL}/rest/v1/incidents`, {
    method: 'POST',
    headers,
    body: JSON.stringify(batch),
  });

  if (res.ok || res.status === 201 || res.status === 200) {
    inserted += batch.length;
    process.stdout.write(`\r  ${inserted}/${incidents.length} inserted...`);
  } else {
    const text = await res.text();
    console.error(`\n  Batch ${i}–${i + BATCH} failed (${res.status}): ${text}`);
    errors++;
  }
}

console.log(`\n\nDone. ${inserted} incidents inserted, ${errors} errors.`);
if (errors === 0) console.log('All 405 incidents are now live in Supabase.');
