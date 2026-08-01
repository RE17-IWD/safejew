import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { rateLimit, clientIp, tooMany } from '@/lib/rate-limit';

function checkAuth(request: NextRequest): boolean {
  const key = request.headers.get('x-admin-key') ?? '';
  const expected = process.env.ADMIN_PASSWORD ?? '';
  if (expected.length === 0) return false;
  // Constant-time comparison to avoid leaking the password via timing.
  const a = Buffer.from(key);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

// Throttle admin auth attempts to blunt brute force: 10 per 15 min per IP.
function authThrottled(request: NextRequest): NextResponse | null {
  const rl = rateLimit(`admin:${clientIp(request)}`, 10, 15 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(tooMany(rl.retryAfter), {
      status: 429,
      headers: { 'Retry-After': String(rl.retryAfter) },
    });
  }
  return null;
}

// GET /api/admin — returns reports and campus requests.
// Default: pending only. ?scope=all returns the latest 100 of each, any status.
export async function GET(request: NextRequest) {
  const throttled = authThrottled(request);
  if (throttled) return throttled;
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const scope = new URL(request.url).searchParams.get('scope');
  const all = scope === 'all';

  try {
    const { createServiceClient } = await import('@/lib/supabase/server');
    const supabase = createServiceClient();

    let reportsQuery = supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    let campusReqQuery = supabase
      .from('campus_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    if (!all) {
      reportsQuery = reportsQuery.eq('status', 'pending');
      campusReqQuery = campusReqQuery.eq('status', 'pending');
    }

    const [reportsRes, campusReqRes] = await Promise.all([reportsQuery, campusReqQuery]);

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
  const throttled = authThrottled(request);
  if (throttled) return throttled;
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
