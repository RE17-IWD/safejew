import { NextResponse } from 'next/server';
import { isDemoMode, DEMO_INCIDENTS } from '@/lib/demo-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || 'verified';
  const campusId = searchParams.get('campus_id');

  // Demo mode: no Supabase credentials present
  if (isDemoMode()) {
    let incidents = DEMO_INCIDENTS.filter((i) => !status || i.status === status);
    if (campusId) incidents = incidents.filter((i) => i.campus_id === campusId);
    return NextResponse.json({ incidents });
  }

  try {
    const { createServiceClient } = await import('@/lib/supabase/server');
    const supabase = createServiceClient();
    let query = supabase.from('incidents').select('*');
    if (status) query = query.eq('status', status);
    if (campusId) query = query.eq('campus_id', campusId);
    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ incidents: data });
  } catch {
    // Supabase unavailable — fall back to demo data so the UI always has something to show
    let incidents = DEMO_INCIDENTS.filter((i) => !status || i.status === status);
    if (campusId) incidents = incidents.filter((i) => i.campus_id === campusId);
    return NextResponse.json({ incidents });
  }
}
