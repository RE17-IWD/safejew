import { NextRequest, NextResponse } from 'next/server';
import { isDemoMode } from '@/lib/demo-data';
import { findCampus } from '@/lib/campuses';
import { rateLimit, clientIp, tooMany } from '@/lib/rate-limit';
import { isValidCategory, isValidSeverity, isValidOccurredAt } from '@/lib/validation';

const NEIGHBORHOOD_CENTROIDS: Record<string, [number, number]> = {
  'Beverly Hills': [34.0736, -118.4004],
  'Westwood': [34.0635, -118.4455],
  'Pico-Robertson': [34.0512, -118.3857],
  'Fairfax District': [34.0794, -118.3606],
  'West Hollywood': [34.0900, -118.3617],
  'Hollywood': [34.0928, -118.3287],
  'Mid-Wilshire': [34.0621, -118.3369],
  'Silver Lake': [34.0870, -118.2707],
  'Los Feliz': [34.1086, -118.2932],
  'Valley Village': [34.1730, -118.4015],
  'Sherman Oaks': [34.1508, -118.4493],
  'Encino': [34.1511, -118.5010],
  'Studio City': [34.1387, -118.3866],
  'Santa Monica': [34.0243, -118.4952],
  'Culver City': [34.0211, -118.3965],
  'Brentwood': [34.0494, -118.4756],
  'Downtown LA': [34.0407, -118.2468],
  'Koreatown': [34.0583, -118.3003],
  'Tarzana': [34.1669, -118.5496],
  'Other': [34.0522, -118.2437],
};

function jitter(val: number): number {
  return val + (Math.random() - 0.5) * 0.006;
}

export async function POST(request: NextRequest) {
  // Rate limit: 5 submissions per 10 minutes per IP.
  const rl = rateLimit(`report:${clientIp(request)}`, 5, 10 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(tooMany(rl.retryAfter), {
      status: 429,
      headers: { 'Retry-After': String(rl.retryAfter) },
    });
  }

  try {
    const body = await request.json();
    const { category, description, occurred_at, neighborhood, severity, is_anonymous, reporter_contact, campus_id } = body;

    // A report is located either by LA neighborhood or by campus
    const campus = campus_id ? findCampus(String(campus_id)) : undefined;

    if (!category || !description || !occurred_at || !severity || (!neighborhood && !campus)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    // Validate enums and date server-side — never trust the client.
    if (!isValidCategory(category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }
    if (!isValidSeverity(severity)) {
      return NextResponse.json({ error: 'Invalid severity' }, { status: 400 });
    }
    if (!isValidOccurredAt(occurred_at)) {
      return NextResponse.json({ error: 'Invalid or future date' }, { status: 400 });
    }
    if (typeof description !== 'string' || description.trim().length < 10) {
      return NextResponse.json({ error: 'Description too short' }, { status: 400 });
    }

    // Campus reports anchor to the campus coordinates; LA reports to their neighborhood centroid
    let lat: number;
    let lng: number;
    let place: string;
    if (campus) {
      lat = jitter(campus.lat);
      lng = jitter(campus.lng);
      place = neighborhood || `${campus.name} area`;
    } else {
      const centroid = NEIGHBORHOOD_CENTROIDS[neighborhood] ?? NEIGHBORHOOD_CENTROIDS['Other'];
      lat = jitter(centroid[0]);
      lng = jitter(centroid[1]);
      place = neighborhood;
    }

    if (isDemoMode()) {
      return NextResponse.json({ success: true, id: 'demo-' + Date.now() });
    }

    const { createServiceClient } = await import('@/lib/supabase/server');
    const supabase = createServiceClient();

    // Insert into `reports` table (not incidents) — reports has is_anonymous + reporter_contact
    const { data, error } = await supabase
      .from('reports')
      .insert({
        category,
        description: description.slice(0, 2000),
        occurred_at,
        neighborhood: String(place).slice(0, 120),
        lat,
        lng,
        severity,
        source: 'community',
        status: 'pending',
        campus_id: campus?.uuid ?? null,
        is_anonymous: Boolean(is_anonymous),
        reporter_contact: is_anonymous ? null : (reporter_contact?.slice(0, 200) || null),
      })
      .select('id')
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error('Report submission error:', error);
    return NextResponse.json({ error: 'Failed to submit report' }, { status: 500 });
  }
}
