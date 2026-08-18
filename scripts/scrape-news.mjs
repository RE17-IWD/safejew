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
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { geocodeFromText } from './geo-la.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'src', 'data', 'news.json');

// Several complementary searches spanning all incident types.
const QUERIES = [
  'antisemitism "Los Angeles" when:60d',
  'antisemitic incident Los Angeles when:90d',
  'antisemitism synagogue Los Angeles when:90d',
  'swastika Los Angeles OR "San Fernando Valley" when:120d',
  'Jewish Los Angeles hate crime OR assault OR threat OR vandalism when:90d',
  'antisemitism UCLA OR USC OR "Cal State" when:120d',
  'synagogue OR temple vandalized OR attacked California when:120d',
];
const MAX_ITEMS = 40;
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
  /los angeles|\bl\.?a\.?\b|greater la|southern california|so[- ]?cal|san fernando valley|pasadena|altadena|glendale|burbank|van nuys|north hollywood|studio city|sherman oaks|encino|tarzana|reseda|northridge|granada hills|porter ranch|woodland hills|calabasas|westwood|pico[- ]?robertson|\bpico\b|fairfax|beverly hills|beverlywood|hancock park|mid-wilshire|koreatown|santa monica|venice|brentwood|pacific palisades|culver city|west hollywood|weho|los feliz|silver lake|valley village|long beach|ucla|\busc\b|cal state/i;
// Must be about Jews / antisemitism (identity anchor — captures ALL incident types).
const JEWISH =
  /antisemit|anti-semit|\bjew(s|ish)?\b|synagogue|\bshul\b|chabad|hillel|yeshiva|kosher|mezuz|swastika|holocaust|\bnazi\b|torah|rabbi|zionis/i;
// Looks like an actual incident (used to decide whether to plot it on the map).
const INCIDENT =
  /antisemit|swastika|hate[- ]?crime|hate[- ]?motivated|vandal|graffiti|defac|desecrat|assault|attack|threat|arson|firebomb|harass|slur|spray[- ]?paint|smash|stab|shoot|beat|mezuz|\bnazi\b/i;

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
    if (!LA_GEO.test(hay) || !JEWISH.test(hay)) continue;

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
  const top = items.slice(0, MAX_ITEMS);

  if (top.length === 0) {
    console.warn('[scrape-news] no relevant items after filtering; leaving existing news.json untouched');
    process.exit(0);
  }

  const mapped = top.filter((i) => typeof i.lat === 'number').length;
  const payload = {
    generatedAt: new Date().toISOString(),
    query: QUERIES[0],
    queries: QUERIES,
    items: top,
  };
  writeFileSync(OUT, JSON.stringify(payload, null, 2) + '\n');
  console.log(`[scrape-news] wrote ${top.length} items (${mapped} geocoded for the map) from ${all.length} raw`);
}

main().catch((e) => {
  console.error('[scrape-news] fatal:', e);
  process.exit(0);
});
