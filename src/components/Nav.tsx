'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const primaryLinks = [
  { label: 'Map', href: '/map' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Campus', href: '/campus' },
  { label: 'Safety', href: '/safety' },
  { label: 'News', href: '/press' },
  { label: 'Oct 7', href: '/october-7' },
];

const aboutLinks = [
  { label: 'Our Story', href: '/about', sub: 'How SafeJew started' },
  { label: 'Methodology', href: '/methodology', sub: 'How we verify the data' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const aboutActive = aboutLinks.some((l) => l.href === pathname);

  return (
    <header className="sj-nav">
      <div className="sj-wrap sj-nav-in">
        <Link href="/" className="sj-brand" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="SafeJew logo" />
          <span className="wm">
            Safe<b>Jew</b>
          </span>
        </Link>

        <nav className="sj-nav-links">
          {primaryLinks.map(({ label, href }) => (
            <Link key={href} href={href} className={pathname === href ? 'active' : ''}>
              {label}
            </Link>
          ))}

          {/* About / transparency dropdown */}
          <div className="sj-dd">
            <button type="button" className={`sj-dd-btn${aboutActive ? ' active' : ''}`} aria-haspopup="true">
              About
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className="sj-dd-menu">
              {aboutLinks.map(({ label, href, sub }) => (
                <Link key={href} href={href}>
                  {label}
                  <span className="sub">{sub}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link href="/report" className="sj-nav-report">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 3.5h.01M10.3 4.3 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0z" />
            </svg>
            Report
          </Link>
        </nav>

        <button
          type="button"
          className="sj-burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      <div className={`sj-mobile${open ? ' open' : ''}`}>
        {primaryLinks.map(({ label, href }) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
        <div className="grp">About &amp; Transparency</div>
        {aboutLinks.map(({ label, href }) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
        <Link href="/report" className="rep" onClick={() => setOpen(false)}>
          Report an Incident
        </Link>
      </div>
    </header>
  );
}
