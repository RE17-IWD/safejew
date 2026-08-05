'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DATA_COMPILED } from '@/data/hate-crime-stats';
import auto from '@/data/auto-updated.json';

const navLinks = [
  { label: 'Map', href: '/map' },
  { label: 'Oct 7', href: '/october-7' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Campus', href: '/campus' },
  { label: 'Safety', href: '/safety' },
  { label: 'About', href: '/about' },
];

// Actual "last synced" timestamp: prefer the daily auto-update snapshot; if the
// job hasn't run yet (lastChecked === null), fall back to the compile date.
function lastSyncLabel(): string {
  const t = (auto as { lastChecked?: string | null }).lastChecked;
  if (t) {
    try {
      const d = new Date(t);
      const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const time = d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Los_Angeles',
      });
      return `${date} ${time} PT`;
    } catch {
      /* fall through */
    }
  }
  return DATA_COMPILED;
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const lastSync = lastSyncLabel();

  return (
    <>
      {/* status bar */}
      <div className="sj-statusbar">
        <div className="sj-wrap sj-statusbar-in">
          <div className="g">
            <span className="s">
              <span className="dot" /> <b>SYSTEM</b> <span className="ok">OPERATIONAL</span>
            </span>
            <span className="s hideS">
              FEEDS <b>ADL·LAPD·CADOJ·FBI</b> <span className="ok">[OK]</span>
            </span>
          </div>
          <div className="g">
            <span className="s hideS">
              SECTOR <b>GREATER_LA</b>
            </span>
            <span className="s">
              LAST SYNC <b>{lastSync}</b>
            </span>
          </div>
        </div>
      </div>

      <header className="sj-nav">
        <div className="sj-wrap sj-nav-in">
          <Link href="/" className="sj-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.png" alt="SafeJew logo" />
            <span className="wm">
              Safe<b>Jew</b>
            </span>
          </Link>

          <nav className="sj-nav-links">
            {navLinks.map(({ label, href }) => (
              <Link key={href} href={href} className={pathname === href ? 'active' : ''}>
                {label}
              </Link>
            ))}
            <Link href="/report" className="sj-nav-report">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                <path d="M5 22V4M5 4h12.5l-2 4 2 4H5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Report
            </Link>
          </nav>

          <button
            type="button"
            className="sj-nav-burger md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            style={{ display: 'none' }}
          >
            Menu
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden" style={{ borderTop: '1px solid var(--line)', background: '#fff' }}>
            <nav style={{ display: 'flex', flexDirection: 'column', padding: '10px 26px', gap: 6 }}>
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  style={{ padding: '8px 0', color: 'var(--navy)', fontWeight: 600 }}
                >
                  {label}
                </Link>
              ))}
              <Link href="/report" onClick={() => setMobileOpen(false)} className="sj-nav-report" style={{ textAlign: 'center', marginTop: 6 }}>
                Report an Incident
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
