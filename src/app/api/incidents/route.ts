import { NextResponse } from 'next/server';
import { isDemoMode, DEMO_INCIDENTS } from '@/lib/demo-data';
import { CAMPUS_UUID } from '@/lib/campuses';

// Public endpoint: only verified incidents are ever returned.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const campusId = searchParams.get('campus_id');
  const campusUuid = campusId ? (CAMPUS_UUID[campusId] ?? campusId) : null;

  // Demo mode: no Supabase credentials present
  if (isDemoMode()) {
    let incidents = DEMO_INCIDENTS.filter((i) => i.status === 'verified');
    if (campusId) incidents = incidents.filter((i) => i.campus_id === campusId);
    return NextResponse.json({ incidents });
  }

  try {
    const { createServiceClient } = await import('@/lib/supabase/server');
    const supabase = createServiceClient();
    let query = supabase.from('incidents').select('*').eq('status', 'verified');
    if (campusUuid) query = query.eq('campus_id', campusUuid);
    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ incidents: data });
  } catch {
    // Supabase unavailable — fall back to demo data so the UI always has something to show
    let incidents = DEMO_INCIDENTS.filter((i) => i.status === 'verified');
    if (campusId) incidents = incidents.filter((i) => i.campus_id === campusId);
    return NextResponse.json({ incidents });
  }
}
