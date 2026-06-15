import { NextRequest, NextResponse } from 'next/server';

const NEIGHBORHOOD_CENTROIDS: Record<string, [number, number]> = {
  'Beverly Hills': [34.0736, -118.4004],
  'Westwood': [34.0635, -118.4455],
  'Pico-Robertson': [34.0512, -118.3857],
  'Fairfax District': [34.0794, -118.3606],
  'West Hollywood': [34.0900, -118.3617],
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
  try {
    const body = await request.json();
    const {
      category,
      description,
      occurred_at,
      neighborhood,
      severity,
      is_anonymous,
      reporter_contact,
    } = body;

    // Basic validation
    if (!category || !description || !occurred_at || !neighborhood || !severity) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (description.length < 10) {
      return NextResponse.json({ error: 'Description too short' }, { status: 400 });
    }

    const centroid = NEIGHBORHOOD_CENTROIDS[neighborhood] ?? NEIGHBORHOOD_CENTROIDS['Other'];
    const lat = jitter(centroid[0]);
    const lng = jitter(centroid[1]);

    // Demo mode: return success without database
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      return NextResponse.json({ success: true, id: 'demo-' + Date.now() });
    }

    const { createServiceClient } = await import('@/lib/supabase/server');
    const supabase = createServiceClient();

    // Insert into incidents table with status=pending so it queues for review
    const { data, error } = await supabase
      .from('incidents')
      .insert({
        category,
        description: description.slice(0, 2000),
        occurred_at,
        neighborhood,
        lat,
        lng,
        severity,
        source: 'community',
        status: 'pending',
        is_anonymous: Boolean(is_anonymous),
        reporter_contact: is_anonymous
          ? null
          : (reporter_contact?.slice(0, 200) || null),
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
