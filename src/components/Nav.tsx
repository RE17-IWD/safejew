'use client';

import { useState } from 'react';
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
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
        {navLinks.map(({ label, href }) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
        <Link href="/report" className="rep" onClick={() => setOpen(false)}>
          Report an incident
        </Link>
      </div>
    </header>
  );
}
