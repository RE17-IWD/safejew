/**
 * Lightweight Greater-LA geocoder.
 *
 * Given free text (a news headline or incident description), it finds the most
 * specific Los Angeles place named in the text and returns neighborhood-level
 * coordinates. Deterministic and dependency-free: it scans a curated gazetteer
 * and prefers the longest (most specific) match, so "north hollywood" beats
 * "hollywood" and "pico-robertson" beats "robertson".
 *
 * This is intentionally conservative: if no known place is named, it returns
 * null and the item simply isn't plotted (we never guess a default location).
 */

// [name, [lat, lng]] — keep names lowercase. More-specific entries win via length.
export const GAZETTEER = [
  // Jewish institutions / landmarks (most specific)
  ['adas torah', [34.0510, -118.3900]],
  ['nessah', [34.0680, -118.4000]],
  ['wilshire boulevard temple', [34.0619, -118.3011]],
  ['sinai temple', [34.0621, -118.4432]],
  ['stephen wise temple', [34.0958, -118.4869]],
  ['kahal ahavas yisroel', [34.0928, -118.3287]],
  ['saban theatre', [34.0619, -118.3789]],
  ["canter's", [34.0801, -118.3611]],
  ['pasadena jewish temple', [34.1470, -118.1400]],
  ['israeli-american council', [34.1683, -118.6059]],
  ['mitzvahland', [34.1591, -118.5012]],
  ['temple ahavat shalom', [34.2381, -118.5301]],
  ['temple emanu el', [34.1808, -118.3090]],
  ['congregation beth israel', [34.0762, -118.3614]],
  // Neighborhoods / districts
  ['pico-robertson', [34.0533, -118.3862]],
  ['pico robertson', [34.0533, -118.3862]],
  ['south robertson', [34.0490, -118.3835]],
  ['beverlywood', [34.0475, -118.3956]],
  ['beverly grove', [34.0759, -118.3765]],
  ['beverly hills', [34.0736, -118.4004]],
  ['fairfax district', [34.0762, -118.3614]],
  ['fairfax', [34.0762, -118.3614]],
  ['hancock park', [34.0736, -118.3389]],
  ['mid-wilshire', [34.0622, -118.3440]],
  ['mid-city', [34.0500, -118.3440]],
  ['koreatown', [34.0580, -118.3009]],
  ['university park', [34.0224, -118.2851]],
  ['westwood', [34.0636, -118.4455]],
  ['brentwood', [34.0520, -118.4730]],
  ['pacific palisades', [34.0452, -118.5265]],
  ['santa monica', [34.0195, -118.4912]],
  ['venice', [33.9850, -118.4695]],
  ['culver city', [34.0211, -118.3965]],
  ['west hollywood', [34.0900, -118.3617]],
  ['weho', [34.0900, -118.3617]],
  ['los feliz', [34.1063, -118.2942]],
  ['silver lake', [34.0869, -118.2702]],
  ['studio city', [34.1394, -118.3870]],
  ['sherman oaks', [34.1508, -118.4489]],
  ['valley village', [34.1667, -118.3960]],
  ['north hollywood', [34.1870, -118.3813]],
  ['noho', [34.1870, -118.3813]],
  ['van nuys', [34.1866, -118.4487]],
  ['encino', [34.1591, -118.5012]],
  ['tarzana', [34.1728, -118.5537]],
  ['reseda', [34.2010, -118.5360]],
  ['northridge', [34.2381, -118.5301]],
  ['granada hills', [34.2686, -118.5030]],
  ['porter ranch', [34.2758, -118.5560]],
  ['woodland hills', [34.1683, -118.6059]],
  ['calabasas', [34.1367, -118.6614]],
  ['altadena', [34.1897, -118.1312]],
  ['pasadena', [34.1478, -118.1445]],
  ['glendale', [34.1425, -118.2551]],
  ['burbank', [34.1808, -118.3090]],
  ['long beach', [33.7701, -118.1937]],
  ['downtown los angeles', [34.0407, -118.2468]],
  ['cal state la', [34.0665, -118.1689]],
  ['cal state northridge', [34.2410, -118.5290]],
  ['csun', [34.2410, -118.5290]],
  ['ucla', [34.0689, -118.4452]],
  // Streets / corridors (lower-priority fallbacks)
  ['pico boulevard', [34.0480, -118.3860]],
  ['pico blvd', [34.0480, -118.3860]],
  ['ventura boulevard', [34.1500, -118.4400]],
  ['ventura blvd', [34.1500, -118.4400]],
  ['melrose', [34.0838, -118.3615]],
  ['la cienega', [34.0630, -118.3765]],
  ['la brea', [34.0640, -118.3440]],
  ['robertson boulevard', [34.0670, -118.3850]],
  ['fairfax avenue', [34.0762, -118.3614]],
  ['laurel canyon', [34.1200, -118.3960]],
  ['montana avenue', [34.0300, -118.4950]],
];

/**
 * @param {string} text
 * @returns {{lat:number,lng:number,place:string}|null}
 */
export function geocodeFromText(text) {
  if (!text) return null;
  const t = ` ${String(text).toLowerCase()} `;
  let best = null;
  for (const [name, coords] of GAZETTEER) {
    if (t.includes(name) && (!best || name.length > best.name.length)) {
      best = { name, coords };
    }
  }
  if (!best) return null;
  // Title-case the matched place for display, then fix known acronyms.
  let place = best.name.replace(/\b\w/g, (c) => c.toUpperCase());
  const FIX = { Ucla: 'UCLA', Usc: 'USC', Weho: 'WeHo', Noho: 'NoHo', Csun: 'CSUN', 'Cal State La': 'Cal State LA', La: 'LA' };
  Object.entries(FIX).forEach(([k, v]) => {
    place = place.replace(new RegExp(`\\b${k}\\b`, 'g'), v);
  });
  return { lat: best.coords[0], lng: best.coords[1], place };
}
