'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + wordmark */}
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <Image src="/logo-icon.svg" alt="SafeJew logo" width={28} height={26} priority />
            <span className="font-sans font-bold text-lg text-navy-800 tracking-tight">
              SafeJew
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`font-sans text-sm font-medium px-3 py-1.5 rounded transition-colors ${
                  pathname === href
                    ? 'text-navy-800 bg-cream-100'
                    : 'text-gray-500 hover:text-navy-700 hover:bg-cream-50'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/report"
              className="ml-3 bg-navy-700 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-navy-800 transition-colors"
            >
              Report
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded text-gray-500 hover:text-navy-800 hover:bg-cream-100 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`font-sans text-sm font-medium px-3 py-2 rounded transition-colors ${
                  pathname === href
                    ? 'bg-cream-100 text-navy-800'
                    : 'text-gray-600 hover:bg-cream-50 hover:text-navy-700'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/report"
              onClick={() => setMobileOpen(false)}
              className="mt-2 bg-navy-700 text-white px-4 py-2 rounded text-sm font-medium text-center hover:bg-navy-800 transition-colors"
            >
              Report an Incident
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
