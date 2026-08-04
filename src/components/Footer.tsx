import Link from 'next/link';

const navLinks = [
  { label: 'Map', href: '/map' },
  { label: 'Oct 7 Report', href: '/october-7' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Campus', href: '/campus' },
  { label: 'About', href: '/about' },
];

const transparencyLinks = [
  { label: 'Methodology', href: '/methodology' },
  { label: 'Changelog', href: '/changelog' },
  { label: 'In the news', href: '/press' },
];

const resourceLinks = [
  { label: 'Report an incident', href: '/report' },
  { label: 'ADL Incident Reporting', href: 'https://www.adl.org/report-incident' },
  { label: 'FBI Tips', href: 'https://tips.fbi.gov' },
  { label: 'LAPD Hate Crime Unit', href: 'https://www.lapdonline.org/hate-crime' },
];

export default function Footer() {
  return (
    <footer className="sj-foot">
      <div className="sj-wrap">
        <div className="sj-foot-grid">
          <div>
            <div className="wm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-mark.png" alt="" width={26} height={26} style={{ objectFit: 'contain' }} />
              SafeJew
            </div>
            <p className="desc">
              A live watch on antisemitism across Greater Los Angeles — built on verified data.
            </p>
            <a className="mail" href="mailto:contact.safejew@gmail.com">
              contact.safejew@gmail.com
            </a>
          </div>

          <div>
            <h4>Navigation</h4>
            <ul>
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
            <h4 style={{ marginTop: 24 }}>Transparency</h4>
            <ul>
              {transparencyLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Report / Resources</h4>
            <ul>
              {resourceLinks.map(({ label, href }) => (
                <li key={href}>
                  {href.startsWith('http') ? (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {label}
                    </a>
                  ) : (
                    <Link href={href}>{label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bottom">
          <p>&copy; 2026 SafeJew. Founded by Adrian Erlikhman, Ryan Erlikhman, and Yonatan Zarur.</p>
          <p>
            All data is for informational purposes only. Always contact law enforcement for
            emergencies.
          </p>
        </div>
      </div>
    </footer>
  );
}
