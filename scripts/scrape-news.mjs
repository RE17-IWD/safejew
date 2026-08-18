#!/usr/bin/env node
/**
 * SafeJew — daily news scraper.
 *
 * Pulls recent antisemitism coverage for Greater LA from Google News RSS and
 * writes the top items to src/data/news.json. Runs from the GitHub Action in
 * .github/workflows/scrape-news.yml. Requires Node 18+ (global fetch).
 *
 * This is COVERAGE (news links), kept separate from the hand-verified incident
 * records in the data file. It is clearly labeled as an automated feed on the
 * page, never mixed into the official statistics.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'src', 'data', 'news.json');

const QUERY = 'antisemitism "Los Angeles" when:45d';
const URL = `https://news.google.com/rss/search?q=${encodeURIComponent(QUERY)}&hl=en-US&gl=US&ceid=US:en`;
const MAX_ITEMS = 8;
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

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
      .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
      .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
  ).trim();
}

// Keep coverage that is about Greater LA and/or an actual incident; drop clearly
// off-topic national/op-ed items so the feed stays relevant.
const RELEVANT = /los angeles|\bl\.?a\.?\b|pasadena|altadena|westwood|pico|fairfax|encino|beverly hills|santa monica|brentwood|san fernando|sherman oaks|ucla|usc|synagogue|temple|chabad|hillel|shul|vandal|swastika|graffiti|mezuz|hate crime/i;

function tag(block, name) {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? decode(m[1]) : '';
}

async function main() {
  let xml = '';
  try {
    const res = await fetch(URL, { headers: { 'User-Agent': UA, Accept: 'application/rss+xml' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    // Decode explicitly as UTF-8 so curly quotes/dashes don't turn into mojibake.
    xml = new TextDecoder('utf-8').decode(await res.arrayBuffer());
  } catch (err) {
    console.error('[scrape-news] fetch failed:', err?.message ?? err);
    process.exit(0); // don't fail the workflow; keep the last good news.json
  }

  const blocks = xml.split('<item>').slice(1).map((b) => b.split('</item>')[0]);
  const seen = new Set();
  const items = [];
  for (const b of blocks) {
    const source = tag(b, 'source');
    let title = tag(b, 'title');
    if (source && title.endsWith(` - ${source}`)) title = title.slice(0, -(source.length + 3)).trim();
    const link = tag(b, 'link');
    const pub = tag(b, 'pubDate');
    if (!title || !link) continue;
    if (!RELEVANT.test(title)) continue;
    const key = title.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    const iso = pub ? new Date(pub).toISOString() : null;
    items.push({ title, url: link, source: source || 'News', date: iso });
    if (items.length >= MAX_ITEMS) break;
  }

  if (items.length === 0) {
    console.warn('[scrape-news] no items parsed; leaving existing news.json untouched');
    process.exit(0);
  }

  const payload = { generatedAt: new Date().toISOString(), query: QUERY, items };
  writeFileSync(OUT, JSON.stringify(payload, null, 2) + '\n');
  console.log(`[scrape-news] wrote ${items.length} items to ${OUT}`);
}

main().catch((e) => {
  console.error('[scrape-news] fatal:', e);
  process.exit(0);
});
