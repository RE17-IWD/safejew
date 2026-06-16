import { NextRequest, NextResponse } from 'next/server';
import { isDemoMode } from '@/lib/demo-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, city, state, website, notes, requester_email } = body;

    if (!name?.trim() || !city?.trim() || !state?.trim()) {
      return NextResponse.json({ error: 'Name, city, and state are required' }, { status: 400 });
    }

    if (isDemoMode()) {
      return NextResponse.json({ success: true, id: 'demo-' + Date.now() });
    }

    const { createServiceClient } = await import('@/lib/supabase/server');
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from('campus_requests')
      .insert({
        name: name.trim().slice(0, 200),
        city: city.trim().slice(0, 100),
        state: state.trim().slice(0, 50),
        website: website?.trim().slice(0, 500) || null,
        notes: notes?.trim().slice(0, 1000) || null,
        requester_email: requester_email?.trim().slice(0, 200) || null,
        status: 'pending',
      })
      .select('id')
      .single();

    if (error) {
      // If table doesn't exist yet, still return success to not break the UX
      if (error.code === '42P01') {
        console.warn('campus_requests table not found — run the SQL migration');
        return NextResponse.json({ success: true, id: 'pending-migration' });
      }
      throw error;
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error('Campus request error:', error);
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
  }
}
