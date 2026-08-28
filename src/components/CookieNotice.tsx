'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'sj_cookie_notice_ack';

/**
 * SafeJew sets no advertising or analytics cookies, so this is a notice rather
 * than a consent gate — there is nothing to opt out of. It states plainly what
 * the site stores and gets out of the way once acknowledged.
 */
export default function CookieNotice() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let acked = false;
    try {
      acked = localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      // Storage blocked (private mode, locked-down browser). Showing the notice
      // every visit is the correct fallback, but never blocking the site is more
      // important, so stay quiet instead.
      acked = true;
    }
    if (acked) return;
    // Let the intro animation finish before this appears.
    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
    setLeaving(true);
    setTimeout(() => setShow(false), 220);
  }

  if (!show) return null;

  return (
    <div
      className={`sj-cookie${leaving ? ' out' : ''}`}
      role="region"
      aria-label="Cookie and storage notice"
    >
      <div className="sj-cookie-in">
        <p className="sj-cookie-txt">
          SafeJew uses no advertising or analytics cookies and does not track you across sites. We
          store only what the site needs to work, such as remembering that you have seen this
          notice. Read our <Link href="/privacy">Privacy Policy</Link> and{' '}
          <Link href="/terms">Terms of Use</Link>.
        </p>
        <button type="button" className="sj-cookie-btn" onClick={dismiss}>
          Got It
        </button>
      </div>
    </div>
  );
}
