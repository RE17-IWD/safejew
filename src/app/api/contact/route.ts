import { NextRequest, NextResponse } from 'next/server';
import { isDemoMode } from '@/lib/demo-data';
import { rateLimit, clientIp, tooMany } from '@/lib/rate-limit';

// Who is writing in. Kept in sync with CONTACT_ROLES in the form component.
// Not exported: a route module may only export route handlers.
const VALID_ROLES = [
  'community_member',
  'bystander',
  'victim',
  'student',
  'campus_staff',
  'synagogue',
  'community_org',
  'security',
  'law_enforcement',
  'press',
  'educator',
  'partner',
  'other',
] as const;

function clean(v: unknown, max: number): string {
  return typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, max) : '';
}

// Deliberately permissive: enough to catch typos, not enough to reject a valid
// address just because it looks unusual.
function looksLikeEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 200;
}

export async function POST(request: NextRequest) {
  // Rate limit: 5 messages per hour per IP.
  const rl = rateLimit(`contact:${clientIp(request)}`, 5, 60 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(tooMany(rl.retryAfter), {
      status: 429,
      headers: { 'Retry-After': String(rl.retryAfter) },
    });
  }

  try {
    const body = await request.json();

    const name = clean(body.name, 120);
    const email = clean(body.email, 200);
    const role = clean(body.role, 40);
    const roleOther = clean(body.role_other, 80);
    const organization = clean(body.organization, 160);
    const subject = clean(body.subject, 160);
    // Preserve paragraph breaks in the message; only trim the ends.
    const message =
      typeof body.message === 'string' ? body.message.trim().slice(0, 4000) : '';
    // Honeypot: a real person never fills a hidden field.
    const honeypot = clean(body.website, 200);

    if (!looksLikeEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (!(VALID_ROLES as readonly string[]).includes(role)) {
      return NextResponse.json({ error: 'Please choose how you are involved.' }, { status: 400 });
    }
    if (role === 'other' && roleOther.length < 2) {
      return NextResponse.json({ error: 'Please describe your role.' }, { status: 400 });
    }
    if (message.length < 10) {
      return NextResponse.json({ error: 'Please write a bit more detail.' }, { status: 400 });
    }

    // Silently accept spam so the bot gets no signal.
    if (honeypot) {
      return NextResponse.json({ success: true, id: 'ok' });
    }

    if (isDemoMode()) {
      return NextResponse.json({ success: true, id: 'demo-' + Date.now() });
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Contact form blocked: SUPABASE_SERVICE_ROLE_KEY is not set.');
      return NextResponse.json(
        {
          error:
            'The contact form is temporarily unavailable. Please email contact.safejew@gmail.com directly.',
          code: 'service_key_missing',
        },
        { status: 503 }
      );
    }

    const { createServiceClient } = await import('@/lib/supabase/server');
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        name: name || null,
        email,
        role,
        role_other: role === 'other' ? roleOther : null,
        organization: organization || null,
        subject: subject || null,
        message,
        status: 'new',
      })
      .select('id')
      .single();

    if (error) {
      if (error.code === '42P01') {
        console.warn('contact_messages table not found — run supabase/contact_messages.sql');
        return NextResponse.json(
          {
            error:
              'The contact form is not set up yet. Please email contact.safejew@gmail.com directly.',
            code: 'table_missing',
          },
          { status: 503 }
        );
      }
      console.error('Contact insert failed:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return NextResponse.json(
        { error: 'Failed to send your message.', code: error.code ?? 'unknown' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send your message.' }, { status: 500 });
  }
}
