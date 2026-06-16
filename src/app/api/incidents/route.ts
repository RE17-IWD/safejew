import { NextResponse } from 'next/server';
import { isDemoMode, DEMO_INCIDENTS } from '@/lib/demo-data';

// Maps frontend string campus IDs to Supabase UUIDs
const CAMPUS_UUID: Record<string, string> = {
  'campus-demo-university': 'a0000001-0000-0000-0000-000000000001',
  'campus-cal-state-la':    'a0000001-0000-0000-0000-000000000002',
  'campus-usc':             'a0000001-0000-0000-0000-000000000003',
  'campus-columbia':        'a0000001-0000-0000-0000-000000000004',
  'campus-nyu':             'a0000001-0000-0000-0000-000000000005',
  'campus-harvard':         'a0000001-0000-0000-0000-000000000006',
  'campus-upenn':           'a0000001-0000-0000-0000-000000000007',
  'campus-cornell':         'a0000001-0000-0000-0000-000000000008',
  'campus-stanford':        'a0000001-0000-0000-0000-000000000009',
  'campus-berkeley':        'a0000001-0000-0000-0000-000000000010',
  'campus-michigan':        'a0000001-0000-0000-0000-000000000011',
  'campus-osu':             'a0000001-0000-0000-0000-000000000012',
  'campus-northwestern':    'a0000001-0000-0000-0000-000000000013',
  'campus-bu':              'a0000001-0000-0000-0000-000000000014',
  'campus-brandeis':        'a0000001-0000-0000-0000-000000000015',
  'campus-gwu':             'a0000001-0000-0000-0000-000000000016',
  'campus-maryland':        'a0000001-0000-0000-0000-000000000017',
  'campus-florida':         'a0000001-0000-0000-0000-000000000018',
  'campus-tulane':          'a0000001-0000-0000-0000-000000000019',
  'campus-george-mason':    'a0000001-0000-0000-0000-000000000020',
  'campus-american':        'a0000001-0000-0000-0000-000000000021',
  'campus-umd-baltimore':   'a0000001-0000-0000-0000-000000000022',
};

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
    if (campusId) {
      const uuid = CAMPUS_UUID[campusId] ?? campusId;
      query = query.eq('campus_id', uuid);
    }
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
