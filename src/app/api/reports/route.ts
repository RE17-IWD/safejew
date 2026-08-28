import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
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
    const {
      category,
      description,
      occurred_at,
      neighborhood,
      neighborhood_detail,
      severity,
      is_anonymous,
      reporter_contact,
      campus_id,
    } = body;

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

    // When the reporter picks "Other" they name the area in a free-text box. Keep
    // it as the label only — coordinates still come from the generic centroid, so
    // nothing typed here can sharpen the stored location.
    const detail =
      typeof neighborhood_detail === 'string'
        ? neighborhood_detail.replace(/\s+/g, ' ').trim().slice(0, 80)
        : '';

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
    if (neighborhood === 'Other' && detail) {
      place = detail;
    }

    if (isDemoMode()) {
      return NextResponse.json({ success: true, id: 'demo-' + Date.now() });
    }

    // Writes go through the service role. If that key is missing the Supabase
    // client still constructs but every insert is rejected, which used to
    // surface as a generic "Failed to submit report".
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error(
        'Report submission blocked: SUPABASE_SERVICE_ROLE_KEY is not set in this environment.'
      );
      return NextResponse.json(
        {
          error:
            'Reporting is temporarily unavailable. Please email contact.safejew@gmail.com and we will log your report manually.',
          code: 'service_key_missing',
        },
        { status: 503 }
      );
    }

    const { createServiceClient } = await import('@/lib/supabase/server');
    const supabase = createServiceClient();

    // Insert into `reports` table (not incidents) — reports has is_anonymous + reporter_contact.
    // The id is supplied explicitly so the insert does not depend on the column
    // carrying a server-side default.
    const row = {
      id: randomUUID(),
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
    };

    let { data, error } = await supabase.from('reports').insert(row).select('id').single();

    // A campus row missing from the `campuses` table must not cost us the report;
    // keep the campus name in the location label and store it unlinked.
    if (error?.code === '23503' && row.campus_id) {
      console.warn(
        `Report insert hit a foreign-key error on campus_id=${row.campus_id}; retrying unlinked.`
      );
      const retry = await supabase
        .from('reports')
        .insert({
          ...row,
          campus_id: null,
          neighborhood: String(campus ? `${campus.name} area` : place).slice(0, 120),
        })
        .select('id')
        .single();
      data = retry.data;
      error = retry.error;
    }

    if (error) {
      console.error('Report insert failed:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return NextResponse.json(
        { error: 'Failed to submit report', code: error.code ?? 'unknown' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id ?? row.id });
  } catch (error) {
    console.error('Report submission error:', error);
    return NextResponse.json({ error: 'Failed to submit report' }, { status: 500 });
  }
}
