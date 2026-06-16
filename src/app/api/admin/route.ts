import { NextRequest, NextResponse } from 'next/server';

function checkAuth(request: NextRequest): boolean {
  const key = request.headers.get('x-admin-key') ?? '';
  const expected = process.env.ADMIN_PASSWORD ?? '';
  return expected.length > 0 && key === expected;
}

// GET /api/admin — returns pending reports and campus requests
export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { createServiceClient } = await import('@/lib/supabase/server');
    const supabase = createServiceClient();

    const [reportsRes, campusReqRes] = await Promise.all([
      supabase
        .from('reports')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false }),
      supabase
        .from('campus_requests')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false }),
    ]);

    return NextResponse.json({
      reports: reportsRes.data ?? [],
      campusRequests: campusReqRes.error ? [] : (campusReqRes.data ?? []),
    });
  } catch (error) {
    console.error('Admin GET error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// PATCH /api/admin — approve or reject a pending report
export async function PATCH(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, action, type } = await request.json() as {
      id: string;
      action: 'approve' | 'reject';
      type: 'report' | 'campus_request';
    };

    if (!id || !action || !type) {
      return NextResponse.json({ error: 'Missing id, action, or type' }, { status: 400 });
    }

    const { createServiceClient } = await import('@/lib/supabase/server');
    const supabase = createServiceClient();

    if (type === 'campus_request') {
      const { error } = await supabase
        .from('campus_requests')
        .update({ status: action === 'approve' ? 'approved' : 'rejected' })
        .eq('id', id);
      if (error) throw error;
      return NextResponse.json({ success: true });
    }

    // Handling a report
    if (action === 'reject') {
      const { error } = await supabase
        .from('reports')
        .update({ status: 'rejected' })
        .eq('id', id);
      if (error) throw error;
      return NextResponse.json({ success: true });
    }

    // Approve: read report, copy to incidents, mark as verified
    const { data: report, error: readErr } = await supabase
      .from('reports')
      .select('*')
      .eq('id', id)
      .single();

    if (readErr || !report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    const { error: insertErr } = await supabase.from('incidents').insert({
      category: report.category,
      description: report.description,
      occurred_at: report.occurred_at,
      neighborhood: report.neighborhood,
      lat: report.lat,
      lng: report.lng,
      severity: report.severity,
      source: report.source ?? 'community',
      status: 'verified',
      campus_id: report.campus_id ?? null,
    });

    if (insertErr) throw insertErr;

    const { error: updateErr } = await supabase
      .from('reports')
      .update({ status: 'verified' })
      .eq('id', id);

    if (updateErr) throw updateErr;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin PATCH error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
