#!/usr/bin/env node
/**
 * SafeJew — daily news scraper.
 *
 * Pulls recent antisemitism coverage for Greater LA from Google News RSS across
 * several searches, de-duplicates, filters for relevance, and writes the newest
 * items to src/data/news.json. Runs from .github/workflows/scrape-news.yml.
 * Requires Node 18+ (global fetch).
 *
 * This is COVERAGE (news links), kept separate from the hand-verified incident
 * records. It is clearly labeled as an automated feed on the page, never mixed
 * into the official statistics.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'src', 'data', 'news.json');

// Several complementary searches — merged and de-duplicated below. Casting a few
// angles (place, institution, incident type) catches more than one broad query.
const QUERIES = [
  'antisemitism "Los Angeles" when:45d',
  'antisemitic incident Los Angeles when:45d',
  'antisemitism California hate crime when:45d',
  'swastika OR synagogue vandalism Los Angeles when:60d',
  'antisemitism UCLA OR USC OR "Cal State" when:60d',
  'Jewish community Los Angeles threat OR harassment when:45d',
];
const MAX_ITEMS = 10;
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

// An item must be BOTH about a Greater-LA location AND about antisemitism.
// "jewish"/"synagogue" alone are too broad (they match national news), so the
// location gate requires an actual LA place or local institution.
const LA_GEO =
  /los angeles|\bl\.?a\.?\b|greater la|southern california|so[- ]?cal|pasadena|altadena|glendale|burbank|van nuys|north hollywood|studio city|sherman oaks|encino|tarzana|woodland hills|san fernando|westwood|pico[- ]?robertson|\bpico\b|fairfax|beverly hills|beverlywood|hancock park|mid-wilshire|santa monica|brentwood|culver city|west hollywood|los feliz|silver lake|valley village|long beach|ucla|\busc\b|cal state l\.?a\.?|cal state los angeles|csun|cal state northridge/i;
const ANTISEMITIC =
  /antisemit|anti-semit|swastika|hate[- ]?crime|hate[- ]?motivated|vandal|graffiti|mezuz|holocaust|\bnazi\b|desecrat/i;

function tag(block, name) {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? decode(m[1]) : '';
}

async function fetchQuery(q) {
  try {
    const res = await fetch(rssUrl(q), { headers: { 'User-Agent': UA, Accept: 'application/rss+xml' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    // Decode explicitly as UTF-8 so curly quotes/dashes don't turn into mojibake.
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
    // Keep only items that are both LA-local and about antisemitism.
    if (!LA_GEO.test(hay) || !ANTISEMITIC.test(hay)) continue;

    // De-dupe across queries by URL and by normalized title.
    const titleKey = title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    if (seen.has(link) || seen.has(titleKey)) continue;
    seen.add(link);
    seen.add(titleKey);

    const iso = pub ? new Date(pub).toISOString() : null;
    items.push({ title, url: link, source: source || 'News', date: iso });
  }

  // Newest first; undated items sink to the bottom.
  items.sort((a, b) => (b.date ? Date.parse(b.date) : 0) - (a.date ? Date.parse(a.date) : 0));
  const top = items.slice(0, MAX_ITEMS);

  if (top.length === 0) {
    console.warn('[scrape-news] no relevant items after filtering; leaving existing news.json untouched');
    process.exit(0);
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    query: QUERIES[0],
    queries: QUERIES,
    items: top,
  };
  writeFileSync(OUT, JSON.stringify(payload, null, 2) + '\n');
  console.log(`[scrape-news] wrote ${top.length} items (from ${all.length} raw) to ${OUT}`);
}

main().catch((e) => {
  console.error('[scrape-news] fatal:', e);
  process.exit(0);
});
