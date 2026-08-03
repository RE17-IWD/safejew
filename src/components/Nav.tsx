'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Map', href: '/map' },
  { label: 'Oct 7', href: '/october-7' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Campus', href: '/campus' },
  { label: 'Safety', href: '/safety' },
  { label: 'About', href: '/about' },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clock, setClock] = useState('--:--:-- PT');
  const pathname = usePathname();

  useEffect(() => {
    const tick = () => {
      try {
        setClock(
          new Date().toLocaleTimeString('en-US', {
            hour12: false,
            timeZone: 'America/Los_Angeles',
          }) + ' PT'
        );
      } catch {
        setClock('--:--:-- PT');
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

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
              LAST SYNC <b>{clock}</b>
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
