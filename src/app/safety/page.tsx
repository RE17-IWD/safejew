import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Jewish Safety Resources',
  description:
    'Practical safety resources for the Jewish community — self-defense, security organizations, legal help, and emergency contacts in Los Angeles.',
};

const KRAV_STUDIOS = [
  {
    name: 'Krav Maga Worldwide — Beverly Hills',
    address: '9036 Wilshire Blvd, Beverly Hills, CA 90211',
    miles: '0.4 mi from Pico-Robertson',
    url: 'https://www.kravmaga.com',
    note: 'Global Krav Maga Worldwide HQ and flagship training center.',
  },
  {
    name: 'KMG Los Angeles (Krav Maga Global)',
    address: 'West Los Angeles',
    miles: 'Westside LA',
    url: 'https://kravmagaglobal.com',
    note: 'KMG curriculum — civilian, law enforcement, and military-grade self-protection.',
  },
  {
    name: 'Fit & Fearless — Studio City',
    address: 'Studio City, CA',
    miles: 'San Fernando Valley',
    url: null,
    note: 'Mixed self-defense program with Krav Maga and defensive tactics. Women-focused classes available.',
  },
  {
    name: 'IKMF Los Angeles (International Krav Maga Federation)',
    address: 'Greater Los Angeles',
    miles: 'Multiple locations',
    url: 'https://ikmf.com',
    note: 'IKMF-certified instruction — one of the original Israeli Krav Maga federations.',
  },
];

const SECURITY_ORGS = [
  {
    name: 'Secure Community Network (SCN)',
    description:
      'The official safety and security organization of the North American Jewish community. Runs threat intelligence, crisis response, and community security training. Report threats directly.',
    url: 'https://securecommunitynetwork.org',
    phone: null,
    tag: 'National',
  },
  {
    name: 'JFEDLA Community Security Initiative (CSI)',
    description:
      'LA-specific Jewish community security arm of the Jewish Federation of Greater Los Angeles. Coordinates with LAPD and local law enforcement on Jewish community safety.',
    url: 'https://www.jewishla.org/communityservices/security/',
    phone: null,
    tag: 'Los Angeles',
  },
  {
    name: 'ADL Los Angeles',
    description:
      'Anti-Defamation League Pacific Southwest Regional office. Reports antisemitic incidents, provides legal referrals, and monitors extremist activity.',
    url: 'https://www.adl.org/about/regional-offices/los-angeles',
    phone: '(310) 446-8000',
    tag: 'Los Angeles',
  },
  {
    name: 'Chabad Shomrim Safety Patrol',
    description:
      'Jewish community neighborhood safety patrol operating in parts of Los Angeles. Rapid non-emergency response and coordination with LAPD.',
    url: null,
    phone: null,
    tag: 'Community Patrol',
  },
];

const LEGAL_RESOURCES = [
  {
    name: 'ADL Legal Affairs',
    description:
      'Free legal consultation for victims of bias-motivated crimes. Can connect you with civil rights attorneys and assist with law enforcement liaison.',
    url: 'https://www.adl.org/resources/tools-and-strategies/report-incident',
    contact: 'Via website',
  },
  {
    name: 'ACLU of Southern California',
    description:
      'Civil liberties legal representation. Relevant if your rights were violated during a hate incident or if you face retaliation for reporting one.',
    url: 'https://www.aclusocal.org',
    contact: '(213) 977-9500',
  },
  {
    name: 'California Department of Justice — Civil Rights Division',
    description:
      'State-level hate crime reporting and investigation. File independently of LAPD if needed.',
    url: 'https://oag.ca.gov/civil-rights',
    contact: 'Via website',
  },
  {
    name: 'Bet Tzedek Legal Services',
    description:
      'Free civil legal help for LA residents. Not hate-crime specific, but can assist with restraining orders, landlord issues related to harassment, and more.',
    url: 'https://www.bettzedek.org',
    contact: '(323) 939-0506',
  },
];

const MENTAL_HEALTH = [
  {
    name: 'Jewish Family Service of LA',
    description:
      'Counseling, trauma support, and crisis intervention for the LA Jewish community. Sliding-scale fees. Hebrew, Russian, Farsi, and English.',
    url: 'https://www.jfsla.org',
    phone: '(800) 315-6252',
  },
  {
    name: 'JFS Crisis Line',
    description: '24/7 mental health crisis line for Jewish community members in LA County.',
    url: 'https://www.jfsla.org/mental-health',
    phone: '(800) 315-6252',
  },
  {
    name: 'NCJW Los Angeles — Trauma Support',
    description:
      'National Council of Jewish Women LA. Peer support groups and referrals for survivors of hate incidents.',
    url: 'https://ncjwla.org',
    phone: null,
  },
];

const EMERGENCY_CONTACTS = [
  { label: 'Emergency', number: '911', note: 'Police, fire, ambulance' },
  { label: 'LAPD Non-Emergency', number: '(877) 275-5273', note: 'Hate crime reporting, non-urgent' },
  { label: 'ADL Incident Hotline', number: '(310) 446-8000', note: 'Pacific Southwest region' },
  { label: 'SCN Threat Line', number: null, note: 'securecommunitynetwork.org/report' },
  { label: 'JFS Crisis', number: '(800) 315-6252', note: '24/7 mental health' },
  { label: 'FBI Los Angeles', number: '(310) 477-6565', note: 'Hate crimes, federal jurisdiction' },
];

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-500 mb-3">
      {children}
    </p>
  );
}

function ResourceCard({
  title,
  children,
  url,
  phone,
  tag,
}: {
  title: string;
  children: React.ReactNode;
  url?: string | null;
  phone?: string | null;
  tag?: string;
}) {
  return (
    <div className="bg-white border border-cream-200 rounded-lg p-6">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-sans font-semibold text-navy-800 text-base leading-snug">{title}</h3>
        {tag && (
          <span className="flex-none text-[10px] font-sans font-bold uppercase tracking-wide px-2 py-0.5 bg-cream-100 text-gray-500 rounded">
            {tag}
          </span>
        )}
      </div>
      <div className="font-sans text-sm text-gray-600 leading-relaxed mb-3">{children}</div>
      <div className="flex items-center gap-4 flex-wrap">
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-sans font-medium text-navy-600 hover:text-navy-800 underline"
          >
            Website
          </a>
        )}
        {phone && (
          <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-xs font-sans font-medium text-navy-600 hover:text-navy-800">
            {phone}
          </a>
        )}
      </div>
    </div>
  );
}

export default function SafetyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-10 h-0.5 bg-gold-500 mb-6" />
          <h1 className="font-serif text-5xl font-bold text-white leading-tight mb-5">
            Safety Resources
          </h1>
          <p className="font-sans text-lg text-blue-100/75 max-w-2xl leading-relaxed">
            Practical resources for the Jewish community in Los Angeles — self-defense, security
            organizations, legal help, and who to call.
          </p>
        </div>
      </section>

      {/* Emergency contacts strip */}
      <section className="bg-red-700 py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-red-200 mb-4">
            Emergency Contacts
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {EMERGENCY_CONTACTS.map((c) => (
              <div key={c.label}>
                <p className="font-sans text-xs text-red-200 mb-0.5">{c.label}</p>
                {c.number ? (
                  <a
                    href={`tel:${c.number.replace(/\D/g, '')}`}
                    className="font-sans font-bold text-white text-sm hover:underline"
                  >
                    {c.number}
                  </a>
                ) : (
                  <p className="font-sans font-bold text-white text-sm">{c.note}</p>
                )}
                {c.number && (
                  <p className="font-sans text-xs text-red-300 mt-0.5">{c.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-defense */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTag>Self-Defense</SectionTag>
          <h2 className="font-serif text-3xl font-bold text-navy-800 mb-4">Krav Maga in Los Angeles</h2>
          <p className="font-sans text-sm text-gray-600 leading-relaxed mb-10 max-w-2xl">
            Krav Maga is the Israeli Defense Forces' close-contact fighting system — practical,
            fast to learn, and built around real-world threat scenarios. Several LA studios have
            active Jewish community ties and offer beginner courses.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {KRAV_STUDIOS.map((s) => (
              <div key={s.name} className="border border-cream-200 rounded-lg p-5 bg-cream-50">
                <h3 className="font-sans font-semibold text-navy-800 text-sm mb-1">{s.name}</h3>
                <p className="font-sans text-xs text-gray-500 mb-2">
                  {s.address} · {s.miles}
                </p>
                <p className="font-sans text-sm text-gray-600 leading-relaxed mb-3">{s.note}</p>
                {s.url && (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-sans font-medium text-navy-600 hover:text-navy-800 underline"
                  >
                    Website
                  </a>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 bg-cream-100 border border-cream-200 rounded-lg p-5">
            <p className="font-sans text-sm text-gray-700 leading-relaxed">
              <span className="font-semibold">Other options:</span> Many JCCs in Los Angeles
              offer self-defense workshops. The Westside JCC and Valley Alliance JCC both run
              periodic Krav Maga and personal safety programs. Check their class schedules directly.
            </p>
          </div>
        </div>
      </section>

      {/* Security organizations */}
      <section className="bg-cream-50 py-20 border-t border-cream-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTag>Community Security</SectionTag>
          <h2 className="font-serif text-3xl font-bold text-navy-800 mb-4">
            Security Organizations
          </h2>
          <p className="font-sans text-sm text-gray-600 leading-relaxed mb-10 max-w-2xl">
            These organizations track threats, coordinate with law enforcement, and provide
            real security infrastructure for the Jewish community. If you witness a threat
            or hate incident, report it here in addition to calling LAPD.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SECURITY_ORGS.map((org) => (
              <ResourceCard key={org.name} title={org.name} url={org.url} phone={org.phone} tag={org.tag}>
                {org.description}
              </ResourceCard>
            ))}
          </div>
        </div>
      </section>

      {/* Legal */}
      <section className="bg-white py-20 border-t border-cream-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTag>Legal Resources</SectionTag>
          <h2 className="font-serif text-3xl font-bold text-navy-800 mb-4">Legal Help</h2>
          <p className="font-sans text-sm text-gray-600 leading-relaxed mb-10 max-w-2xl">
            Hate crimes are criminal offenses in California. If you were targeted, you have legal
            options — and several organizations provide free or low-cost help.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {LEGAL_RESOURCES.map((r) => (
              <ResourceCard key={r.name} title={r.name} url={r.url} phone={r.contact}>
                {r.description}
              </ResourceCard>
            ))}
          </div>
          <div className="mt-8 bg-navy-800 text-white rounded-lg p-6">
            <h3 className="font-serif text-lg font-bold mb-2">
              Documenting an Incident — What to Save
            </h3>
            <ul className="font-sans text-sm text-blue-100/80 leading-relaxed space-y-1.5">
              <li>• Screenshots of online harassment, threats, or slurs — before they're deleted</li>
              <li>• Photos of vandalism or physical damage</li>
              <li>• Dates, times, and locations of all incidents</li>
              <li>• Names or descriptions of any witnesses</li>
              <li>• Any police report numbers</li>
              <li>• All correspondence with the perpetrator if known</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Mental health */}
      <section className="bg-cream-50 py-20 border-t border-cream-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTag>Mental Health</SectionTag>
          <h2 className="font-serif text-3xl font-bold text-navy-800 mb-4">
            Support After an Incident
          </h2>
          <p className="font-sans text-sm text-gray-600 leading-relaxed mb-10 max-w-2xl">
            Being targeted for who you are is traumatic. These organizations offer Jewish
            community-aware counseling and crisis support in Los Angeles.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {MENTAL_HEALTH.map((r) => (
              <ResourceCard key={r.name} title={r.name} url={r.url} phone={r.phone}>
                {r.description}
              </ResourceCard>
            ))}
          </div>
        </div>
      </section>

      {/* Online safety */}
      <section className="bg-navy-700 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTag>Online Safety</SectionTag>
          <h2 className="font-serif text-3xl font-bold text-white mb-8">
            Protecting Yourself Online
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-sans font-semibold text-white mb-3 text-sm uppercase tracking-wide">
                If you're being targeted online
              </h3>
              <ul className="font-sans text-sm text-blue-100/75 leading-relaxed space-y-2">
                <li>Screenshot everything before reporting — platforms often remove content fast</li>
                <li>Report to the platform and to ADL's Online Hate Reporting tool</li>
                <li>If threats are credible, report to the FBI's Internet Crime Complaint Center (IC3)</li>
                <li>Lock down your social profiles — go private, remove location data</li>
                <li>Contact SCN if threats are coordinated or involve doxing</li>
              </ul>
            </div>
            <div>
              <h3 className="font-sans font-semibold text-white mb-3 text-sm uppercase tracking-wide">
                Preventive steps
              </h3>
              <ul className="font-sans text-sm text-blue-100/75 leading-relaxed space-y-2">
                <li>Remove your home address from data broker sites (DeleteMe, Kanary)</li>
                <li>Use a PO box or mail forwarding for Jewish organization memberships</li>
                <li>Enable two-factor authentication everywhere</li>
                <li>Google yourself — know what's publicly visible</li>
                <li>Be cautious about what you post near Jewish institutions</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-white/10">
            <p className="font-sans text-sm text-blue-100/50 max-w-2xl">
              SafeJew does not provide direct security services. These resources are curated for
              informational purposes. In an emergency, always call 911 first.
            </p>
          </div>
        </div>
      </section>

      {/* Report CTA */}
      <section className="bg-white py-14 border-t border-cream-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-sans text-sm text-gray-700 leading-relaxed mb-6">
            Experienced an incident? Reporting it builds the community data record and helps
            identify patterns that protect others.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/report"
              className="inline-flex items-center justify-center bg-navy-600 text-white px-6 py-3 rounded font-sans font-semibold text-sm hover:bg-navy-700 transition-colors"
            >
              Report an Incident
            </Link>
            <Link
              href="/map"
              className="inline-flex items-center justify-center border border-navy-200 text-navy-700 px-6 py-3 rounded font-sans font-semibold text-sm hover:bg-cream-50 transition-colors"
            >
              See the Incident Map
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
