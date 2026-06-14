import { NextRequest, NextResponse } from 'next/server';
import type { CommunitySpace } from '@/types';

// Curated seed list — publicly listed Jewish community institutions in Greater LA
const CURATED_SPACES: CommunitySpace[] = [
  // Synagogues
  { id: 'sinai-temple', name: 'Sinai Temple', type: 'synagogue', lat: 34.0604, lng: -118.4509, address: '10400 Wilshire Blvd, Los Angeles, CA 90024', source: 'curated' },
  { id: 'wilshire-blvd-temple', name: 'Wilshire Boulevard Temple', type: 'synagogue', lat: 34.0613, lng: -118.3070, address: '3663 Wilshire Blvd, Los Angeles, CA 90010', source: 'curated' },
  { id: 'beth-jacob', name: 'Beth Jacob Congregation', type: 'synagogue', lat: 34.0599, lng: -118.3900, address: '9030 W Olympic Blvd, Beverly Hills, CA 90211', source: 'curated' },
  { id: 'ikar', name: 'IKAR', type: 'synagogue', lat: 34.0528, lng: -118.3706, address: '6090 W Pico Blvd, Los Angeles, CA 90035', source: 'curated' },
  { id: 'leo-baeck', name: 'Leo Baeck Temple', type: 'synagogue', lat: 34.0836, lng: -118.4731, address: '1300 N Sepulveda Blvd, Los Angeles, CA 90049', source: 'curated' },
  { id: 'temple-israel-hollywood', name: 'Temple Israel of Hollywood', type: 'synagogue', lat: 34.0981, lng: -118.3456, address: '7300 Hollywood Blvd, Los Angeles, CA 90046', source: 'curated' },
  { id: 'adat-ari-el', name: 'Adat Ari El', type: 'synagogue', lat: 34.1769, lng: -118.3975, address: '12020 Burbank Blvd, Valley Village, CA 91607', source: 'curated' },
  { id: 'valley-beth-shalom', name: 'Valley Beth Shalom', type: 'synagogue', lat: 34.1578, lng: -118.4985, address: '15739 Ventura Blvd, Encino, CA 91436', source: 'curated' },
  { id: 'bnai-david', name: "B'nai David-Judea Congregation", type: 'synagogue', lat: 34.0540, lng: -118.3662, address: '8906 W Pico Blvd, Los Angeles, CA 90035', source: 'curated' },
  { id: 'shaarey-zedek', name: 'Congregation Shaarey Zedek', type: 'synagogue', lat: 34.1537, lng: -118.4378, address: '12800 Chandler Blvd, Valley Village, CA 91607', source: 'curated' },
  { id: 'temple-akiba', name: 'Temple Akiba', type: 'synagogue', lat: 34.0026, lng: -118.4072, address: '5249 S Sepulveda Blvd, Culver City, CA 90230', source: 'curated' },
  { id: 'university-synagogue', name: 'University Synagogue', type: 'synagogue', lat: 34.0731, lng: -118.4611, address: '11960 Sunset Blvd, Los Angeles, CA 90049', source: 'curated' },
  // JCCs & Community Centers
  { id: 'westside-jcc', name: 'Westside Jewish Community Center', type: 'jcc', lat: 34.0534, lng: -118.3719, address: '5870 W Olympic Blvd, Los Angeles, CA 90036', source: 'curated' },
  { id: 'valley-jcc', name: 'Valley Alliance JCC', type: 'jcc', lat: 34.1547, lng: -118.3740, address: '13164 Burbank Blvd, Sherman Oaks, CA 91401', source: 'curated' },
  { id: 'jfedla', name: 'Jewish Federation of Greater LA', type: 'community_center', lat: 34.0618, lng: -118.3771, address: '6505 Wilshire Blvd, Los Angeles, CA 90048', source: 'curated' },
  { id: 'jewish-family-service', name: 'Jewish Family Service of LA', type: 'community_center', lat: 34.0697, lng: -118.3606, address: '3580 Wilshire Blvd, Los Angeles, CA 90010', source: 'curated' },
  // Hillels
  { id: 'ucla-hillel', name: 'UCLA Hillel', type: 'hillel', lat: 34.0700, lng: -118.4432, address: '900 Hilgard Ave, Los Angeles, CA 90024', website: 'https://uclahillel.org', source: 'curated' },
  { id: 'usc-hillel', name: 'USC Hillel', type: 'hillel', lat: 34.0156, lng: -118.2831, address: '3395 S Hoover St, Los Angeles, CA 90007', website: 'https://uscjewish.org', source: 'curated' },
  { id: 'lmu-hillel', name: 'LMU Hillel', type: 'hillel', lat: 33.9709, lng: -118.4185, address: '1 LMU Dr, Los Angeles, CA 90045', source: 'curated' },
];

// Haversine distance in km
function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

async function geocode(q: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q + ', Los Angeles, CA')}&format=json&limit=1&countrycodes=us`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'SafeJew/2.0 (contact@safejew.org)' },
      signal: AbortSignal.timeout(6000),
    });
    const data = await res.json();
    if (!data[0]) return null;
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch {
    return null;
  }
}

async function fetchOverpassSpaces(
  lat: number,
  lng: number,
  radiusM: number
): Promise<CommunitySpace[]> {
  const query = `[out:json][timeout:10];
(
  node["amenity"="place_of_worship"]["religion"="jewish"](around:${radiusM},${lat},${lng});
  way["amenity"="place_of_worship"]["religion"="jewish"](around:${radiusM},${lat},${lng});
  relation["amenity"="place_of_worship"]["religion"="jewish"](around:${radiusM},${lat},${lng});
  node["amenity"="community_centre"]["name"~"jewish|JCC|Hillel",i](around:${radiusM},${lat},${lng});
);
out center 30;`;

  try {
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: `data=${encodeURIComponent(query)}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(10000),
    });
    const data = await res.json();
    const elements = data.elements ?? [];

    return elements
      .filter((el: Record<string, unknown>) => {
        const tags = el.tags as Record<string, string> | undefined;
        return tags?.name;
      })
      .map((el: Record<string, unknown>) => {
        const tags = el.tags as Record<string, string>;
        const elLat = (el.lat as number) ?? (el.center as Record<string, number>)?.lat;
        const elLng = (el.lon as number) ?? (el.center as Record<string, number>)?.lon;
        const addrParts = [tags['addr:housenumber'], tags['addr:street'], tags['addr:city']]
          .filter(Boolean)
          .join(' ');
        const spaceType: CommunitySpace['type'] =
          tags.amenity === 'community_centre' ? 'community_center' : 'synagogue';
        return {
          id: `osm-${el.type}-${el.id}`,
          name: tags.name,
          type: spaceType,
          lat: elLat,
          lng: elLng,
          address: addrParts || undefined,
          website: tags.website || tags['contact:website'] || undefined,
          source: 'osm' as const,
        };
      })
      .filter((s: CommunitySpace) => s.lat && s.lng);
  } catch {
    return [];
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const latParam = searchParams.get('lat');
  const lngParam = searchParams.get('lng');
  const radiusParam = searchParams.get('radius');
  const radiusM = Math.min(parseInt(radiusParam ?? '6000'), 20000);

  // Default center: mid-Wilshire LA
  let lat = 34.0522;
  let lng = -118.2437;
  let geocoded = false;

  if (q) {
    const result = await geocode(q);
    if (result) {
      lat = result.lat;
      lng = result.lng;
      geocoded = true;
    } else {
      // Return curated list with a warning
      return NextResponse.json(
        { lat, lng, spaces: CURATED_SPACES, warning: 'Location not found — showing Greater LA results' },
        {
          headers: { 'Cache-Control': 'public, max-age=300' },
        }
      );
    }
  } else if (latParam && lngParam) {
    lat = parseFloat(latParam);
    lng = parseFloat(lngParam);
  }

  // Filter curated to within ~25km of search location
  const CURATED_RADIUS_KM = 25;
  const nearbyCurated = CURATED_SPACES.filter(
    (s) => distanceKm(s, { lat, lng }) <= CURATED_RADIUS_KM
  );

  // OSM results (supplement, don't replace)
  const osmSpaces = await fetchOverpassSpaces(lat, lng, radiusM);

  // Merge: skip OSM entries that are within 300m of a curated entry
  const merged = [...nearbyCurated];
  for (const osm of osmSpaces) {
    const isDupe = merged.some((c) => distanceKm(c, osm) < 0.3);
    if (!isDupe) merged.push(osm);
  }

  // Sort by distance
  merged.sort((a, b) => distanceKm(a, { lat, lng }) - distanceKm(b, { lat, lng }));

  return NextResponse.json(
    { lat, lng, geocoded, spaces: merged },
    {
      headers: { 'Cache-Control': 'public, max-age=300' },
    }
  );
}
