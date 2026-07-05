// Audits live Supabase state. Prints only counts/ids/names — never keys.
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const env = {};
try {
  for (const line of readFileSync(join(root, '.env.local'), 'utf8').split(/\r?\n/)) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) env[m[1]] = m[2].trim();
  }
} catch { /* fall through to process.env */ }

const URL_RAW = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL || process.env.SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_KEY;
const BASE = (URL_RAW ?? '').replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');

if (!BASE || !KEY) {
  console.error('Missing Supabase URL or service key in .env.local / env');
  process.exit(1);
}

const headers = { apikey: KEY, Authorization: `Bearer ${KEY}` };

async function q(path) {
  const res = await fetch(`${BASE}/rest/v1/${path}`, { headers });
  if (!res.ok) return { error: `${res.status} ${await res.text()}` };
  return res.json();
}

async function count(table, filter = '') {
  const res = await fetch(`${BASE}/rest/v1/${table}?select=id${filter}`, {
    headers: { ...headers, Prefer: 'count=exact', Range: '0-0' },
  });
  return res.headers.get('content-range')?.split('/')[1] ?? `err ${res.status}`;
}

console.log('== campuses ==');
const campuses = await q('campuses?select=id,name,city,state&order=id');
if (campuses.error) console.log(campuses.error);
else campuses.forEach((c) => console.log(`${c.id}  ${c.name} (${c.city}, ${c.state})`));

console.log('\n== incidents ==');
console.log('total:', await count('incidents'));
console.log('verified:', await count('incidents', '&status=eq.verified'));
console.log('pending:', await count('incidents', '&status=eq.pending'));

console.log('\n== incidents per campus (verified) ==');
const inc = await q('incidents?select=campus_id&status=eq.verified&campus_id=not.is.null');
if (inc.error) console.log(inc.error);
else {
  const byCampus = {};
  inc.forEach((i) => { byCampus[i.campus_id] = (byCampus[i.campus_id] ?? 0) + 1; });
  Object.entries(byCampus).forEach(([k, v]) => console.log(`${k}: ${v}`));
}

console.log('\n== reports ==');
const reports = await q('reports?select=id,status,category,neighborhood,created_at,campus_id&order=created_at.desc&limit=20');
if (reports.error) console.log(reports.error);
else reports.forEach((r) => console.log(`${r.status}  ${r.category}  ${r.neighborhood}  campus=${r.campus_id ?? '-'}  ${r.created_at}`));

console.log('\n== campus_requests ==');
const reqs = await q('campus_requests?select=id,name,city,state,status,created_at&order=created_at.desc&limit=20');
if (reqs.error) console.log(reqs.error);
else reqs.forEach((r) => console.log(`${r.status}  ${r.name} (${r.city}, ${r.state})  ${r.created_at}`));

console.log('\n== campuses columns check (v2 migration applied?) ==');
const one = await q('campuses?select=*&limit=1');
if (one.error) console.log(one.error);
else console.log(Object.keys(one[0] ?? {}).join(', '));
