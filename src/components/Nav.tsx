'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Map', href: '/map' },
  { label: 'Oct 7 Report', href: '/october-7' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Campus', href: '/campus' },
  { label: 'About', href: '/about' },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-serif text-xl font-bold text-navy-800 tracking-tight hover:text-navy-600 transition-colors"
          >
            SafeJew
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`font-sans text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'text-navy-800'
                    : 'text-gray-600 hover:text-navy-700'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/report"
              className="ml-2 bg-navy-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-navy-700 transition-colors"
            >
              Report an Incident
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded text-gray-600 hover:text-navy-800 hover:bg-cream-200 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-cream-200 bg-white">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`font-sans text-sm font-medium px-3 py-2 rounded transition-colors ${
                  pathname === href
                    ? 'bg-cream-200 text-navy-800'
                    : 'text-gray-600 hover:bg-cream-50 hover:text-navy-700'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/report"
              onClick={() => setMobileOpen(false)}
              className="mt-2 bg-navy-600 text-white px-4 py-2 rounded text-sm font-medium text-center hover:bg-navy-700 transition-colors"
            >
              Report an Incident
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
