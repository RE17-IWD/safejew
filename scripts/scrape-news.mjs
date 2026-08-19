#!/usr/bin/env node
/**
 * SafeJew — news scraper (runs every ~3 days from the GitHub Action).
 *
 * Pulls recent antisemitism coverage across Greater LA from Google News RSS,
 * across several searches and ALL incident types (vandalism, assault, threats,
 * arson, harassment). De-duplicates, filters for relevance, geocodes each item
 * from its text (scripts/geo-la.mjs), and writes to src/data/news.json.
 *
 * Items that resolve to a known LA location AND look like an incident get lat/lng
 * so the map can plot them (clearly labeled as approximate, news-derived points),
 * on top of the hand-verified incident set. Requires Node 18+ (global fetch).
 */
import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { geocodeFromText } from './geo-la.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'src', 'data', 'news.json');

// Several complementary searches spanning all incident types and up to a year back,
// so the feed shows a VARIETY of incidents, not one story from many outlets.
const QUERIES = [
  'antisemitism "Los Angeles" when:90d',
  'antisemitic incident Los Angeles when:180d',
  'antisemitism synagogue Los Angeles when:1y',
  'swastika Los Angeles OR "San Fernando Valley" OR Pasadena when:1y',
  'Jewish Los Angeles hate crime OR assault OR vandalism when:1y',
  'antisemitism UCLA OR USC OR "Cal State" when:1y',
  'synagogue OR temple OR "Jewish school" vandalized OR attacked Los Angeles when:1y',
  'antisemitic graffiti OR flyers OR harassment "Los Angeles" OR "Beverly Hills" OR Encino OR "Santa Monica" when:1y',
  'Jewish business OR Chabad OR Hillel vandalized OR attacked OR harassed Los Angeles when:1y',
  'antisemitic assault OR "hate crime" charged Los Angeles OR "district attorney" when:1y',
];
const MAX_ITEMS = 80;
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

function rssUrl(q) {
  return `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-US&gl=US&ceid=US:en`;
}

function fixMojibake(s) {
  return s
    .replace(/â€˜|â€™/g, "'")
    .replace(/â€œ|â€\x9d|â€/g, '"')
    .replace(/â€"|â€"/g, '—')
    .replace(/Â/g, '');
}

function decode(s) {
  return fixMojibake(
    s
      .replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
      .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
  )
    .replace(/\s+/g, ' ')
    .trim();
}

// Must name a Greater-LA place or local institution.
const LA_GEO =
  /los angeles|\bl\.a\.?\b|greater la|san fernando valley|pasadena|altadena|glendale|burbank|van nuys|north hollywood|studio city|sherman oaks|encino|tarzana|reseda|northridge|granada hills|porter ranch|woodland hills|calabasas|westwood|pico[- ]?robertson|\bpico\b|fairfax|beverly hills|beverlywood|hancock park|mid-wilshire|koreatown|santa monica|venice|brentwood|pacific palisades|culver city|west hollywood|weho|los feliz|silver lake|valley village|long beach|ucla|\busc\b|cal state/i;
// Explicit antisemitism markers.
const ANTISEMITIC = /antisemit|anti-semit|anti-jewish|swastika|holocaust|neo-?nazi|\bnazi\b|desecrat|mezuz|blood libel|goyim defense|white supremacis|\bkkk\b/i;
// A Jewish person / place / institution.
const JEWISH_TARGET = /\b(synagogue|shul|temple|chabad|hillel|yeshiva|kosher|jewish|jews|rabbi|mezuz)\b/i;
// An actual incident / harm (a story must describe one, not just mention the word
// "antisemitism"). Also used to decide whether to plot it on the map.
const INCIDENT =
  /swastika|vandal|graffiti|defac|desecrat|assault|assaulted|attack|threat|arson|firebomb|molotov|harass|slur|smash|stab|\bshot\b|shoot|beaten|ransack|flyer|propaganda|sticker|\bbomb|swat|target(?:ed|ing)|\bnazi\b/i;
// Clearly-other-city / foreign markers (so a non-LA story never slips through).
const OTHER_CITY = /\b(new york|brooklyn|bronx|manhattan|queens|nyc|new jersey|boston|harvard|yale|princeton|columbia|chicago|miami|florida|philadelphia|seattle|denver|toronto|canada|london|\bu\.?k\.?\b|britain|england|france|paris|germany|berlin|europe|jerusalem|tel aviv|gaza)\b/i;

// Relevant = the HEADLINE names a Greater-LA place, the story is about a Jewish
// target or antisemitism (not just any "Jewish" mention), it describes an actual
// incident, and it is not clearly about another city.
function relevant(title, hay = title) {
  if (!title || !LA_GEO.test(title)) return false;
  if (OTHER_CITY.test(hay) && !/los angeles|\bl\.a\.?\b/i.test(title)) return false;
  return (ANTISEMITIC.test(hay) || JEWISH_TARGET.test(hay)) && INCIDENT.test(hay);
}

function tag(block, name) {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? decode(m[1]) : '';
}

async function fetchQuery(q) {
  try {
    const res = await fetch(rssUrl(q), { headers: { 'User-Agent': UA, Accept: 'application/rss+xml' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = new TextDecoder('utf-8').decode(await res.arrayBuffer());
    return xml.split('<item>').slice(1).map((b) => b.split('</item>')[0]);
  } catch (err) {
    console.error(`[scrape-news] query failed (${q}):`, err?.message ?? err);
    return [];
  }
}

// Collapse many outlets covering the SAME incident into one feed entry: geocoded
// items dedupe by ~1km area + month; others by a few distinctive title words + month.
const STOP = new Set(['after','over','with','from','near','amid','says','said','into','that','what','when','where','their','they','were','have','been','this','than','more','some','about','which','while','ignites','urges','debate','reward','offered','seeks','proposes','moves','community','leaders','rally','jewish','jews','antisemitic','antisemitism','anti','semitic','los','angeles','county','california','synagogue','temple','mural']);
function incidentKey(it) {
  let lat = it.lat, lng = it.lng;
  if (typeof lat !== 'number') { const g = geocodeFromText(it.title); if (g) { lat = g.lat; lng = g.lng; } }
  // One entry per ~1km area (the newest kept) — collapses many outlets on one incident.
  if (typeof lat === 'number') return `g:${lat.toFixed(2)},${lng.toFixed(2)}`;
  const w = (it.title || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((x) => x.length > 3 && !STOP.has(x));
  return `t:${w.slice(0, 3).sort().join(' ')}`;
}
function dedupeByIncident(items) {
  const seen = new Set();
  const out = [];
  for (const it of items) {
    const k = incidentKey(it);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(it);
  }
  return out;
}

async function main() {
  const all = [];
  for (const q of QUERIES) all.push(...(await fetchQuery(q)));

  if (all.length === 0) {
    console.error('[scrape-news] no data fetched; leaving existing news.json untouched');
    process.exit(0);
  }

  const seen = new Set();
  const items = [];
  for (const b of all) {
    const source = tag(b, 'source');
    let title = tag(b, 'title');
    if (source && title.endsWith(` - ${source}`)) title = title.slice(0, -(source.length + 3)).trim();
    const link = tag(b, 'link');
    const desc = tag(b, 'description');
    const pub = tag(b, 'pubDate');
    if (!title || !link) continue;

    const hay = `${title} ${desc}`;
    if (!relevant(title, hay)) continue;

    const titleKey = title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    if (seen.has(link) || seen.has(titleKey)) continue;
    seen.add(link);
    seen.add(titleKey);

    const iso = pub ? new Date(pub).toISOString() : null;
    const item = { title, url: link, source: source || 'News', date: iso };

    // Geocode from the text; only attach coords for items that read as incidents.
    const geo = geocodeFromText(hay);
    if (geo && INCIDENT.test(hay)) {
      item.lat = geo.lat;
      item.lng = geo.lng;
      item.place = geo.place;
    }
    items.push(item);
  }

  items.sort((a, b) => (b.date ? Date.parse(b.date) : 0) - (a.date ? Date.parse(a.date) : 0));
  const fresh = items.slice(0, MAX_ITEMS);

  if (fresh.length === 0) {
    console.warn('[scrape-news] no relevant items after filtering; leaving existing news.json untouched');
    process.exit(0);
  }

  // Accumulate: merge with the previously-committed feed so map coverage GROWS over
  // time instead of resetting each run. Dedup by URL, keep ~8 months, cap 150.
  let prev = [];
  try {
    prev = JSON.parse(readFileSync(OUT, 'utf8')).items || [];
  } catch {
    prev = [];
  }
  const seenUrl = new Set();
  const merged = [];
  for (const it of fresh) {
    if (!it.url || seenUrl.has(it.url)) continue;
    seenUrl.add(it.url);
    merged.push(it);
  }
  // Re-apply the (now stricter) relevance test to previously-saved items so old
  // off-topic entries drop out of the accumulated feed.
  for (const it of prev) {
    if (!it.url || seenUrl.has(it.url)) continue;
    if (!relevant(it.title)) continue;
    seenUrl.add(it.url);
    merged.push(it);
  }
  const cutoff = Date.now() - 400 * 24 * 3600 * 1000;
  const kept = dedupeByIncident(
    merged
      .filter((it) => !it.date || Date.parse(it.date) >= cutoff)
      .sort((a, b) => (b.date ? Date.parse(b.date) : 0) - (a.date ? Date.parse(a.date) : 0))
  ).slice(0, 80);

  const mapped = kept.filter((i) => typeof i.lat === 'number').length;
  const payload = {
    generatedAt: new Date().toISOString(),
    queries: QUERIES,
    items: kept,
  };
  writeFileSync(OUT, JSON.stringify(payload, null, 2) + '\n');
  console.log(`[scrape-news] ${fresh.length} fresh, ${kept.length} total (${mapped} geocoded for the map)`);
}

main().catch((e) => {
  console.error('[scrape-news] fatal:', e);
  process.exit(0);
});
