import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Map', href: '/map' },
  { label: 'Report', href: '/report' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Campus', href: '/campus' },
  { label: 'About', href: '/about' },
];

const resourceLinks = [
  {
    label: 'ADL Incident Reporting',
    href: 'https://www.adl.org/report-incident',
  },
  {
    label: 'FBI Tips',
    href: 'https://tips.fbi.gov',
  },
  {
    label: 'JFEDLA Community Security Initiative',
    href: 'https://www.jewishla.org/community-security-initiative',
  },
  {
    label: 'LAPD Hate Crime Unit',
    href: 'https://www.lapdonline.org/hate-crime',
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="font-serif text-xl font-bold text-white mb-3 tracking-tight">
              SafeJew
            </p>
            <p className="text-sm text-blue-100/70 leading-relaxed mb-3">
              Empowering Jewish communities with data-driven safety intelligence.
            </p>
            <p className="text-sm text-blue-100/50 leading-relaxed">
              A project of community safety advocates in Greater Los Angeles.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-sans font-semibold uppercase tracking-widest text-blue-100/50 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-blue-100/70 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-sans font-semibold uppercase tracking-widest text-blue-100/50 mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-100/70 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 space-y-2">
          <p className="text-sm text-blue-100/50">
            &copy; 2026 SafeJew. Founded by Adrian Erlikhman, Ryan Erlikhman, and Yonatan Zarur.
          </p>
          <p className="text-xs text-blue-100/30 max-w-2xl leading-relaxed">
            All data on this site is for informational purposes only. Always contact law
            enforcement for emergencies.
          </p>
        </div>
      </div>
    </footer>
  );
}
