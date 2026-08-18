import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Jewish Safety Resources',
  description:
    'Practical safety resources for the Jewish community in Los Angeles: what to do after an incident, self-defense, security organizations, legal help, mental health, and emergency contacts.',
};

/* ---------------- icons (inline, stroke = currentColor) ---------------- */
type IconProps = { className?: string };
const S = 'none';
function Ico({ d, className, fill }: { d: string; className?: string; fill?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={fill ? 'currentColor' : S} stroke="currentColor" strokeWidth={1.7}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
const IconShield = (p: IconProps) => <Ico {...p} d="M12 3l7 3v5c0 4.6-3.1 7.8-7 9-3.9-1.2-7-4.4-7-9V6l7-3z" />;
const IconCamera = (p: IconProps) => <Ico {...p} d="M4 8h3l1.5-2h7L17 8h3v11H4V8zm8 3a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />;
const IconFlag = (p: IconProps) => <Ico {...p} d="M5 21V4m0 1h11l-2 3 2 3H5" />;
const IconHeart = (p: IconProps) => <Ico {...p} d="M12 20s-7-4.3-7-9.5A3.8 3.8 0 0112 7a3.8 3.8 0 017 3.5C19 15.7 12 20 12 20z" />;
const IconScale = (p: IconProps) => <Ico {...p} d="M12 3v18M7 21h10M6 6l-3 6a3 3 0 006 0L6 6zm12 0l-3 6a3 3 0 006 0l-3-6zM4 6h16" />;
const IconGlobe = (p: IconProps) => <Ico {...p} d="M12 3a9 9 0 100 18 9 9 0 000-18zm-9 9h18M12 3c2.5 2.4 3.8 5.6 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.6-3.8-9S9.5 5.4 12 3z" />;
const IconAlert = (p: IconProps) => <Ico {...p} d="M12 9v4m0 3.5h.01M10.3 4.3 2.2 18a2 2 0 001.7 3h16.2a2 2 0 001.7-3L13.7 4.3a2 2 0 00-3.4 0z" />;
const IconPhone = (p: IconProps) => <Ico {...p} d="M5 4h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />;

const MOMENT_STEPS = [
  { icon: <IconShield className="w-5 h-5" />, title: 'Get to safety', body: 'If you are in danger, call 911 first. Move to a public or secure place. Your safety comes before anything else.' },
  { icon: <IconCamera className="w-5 h-5" />, title: 'Document it', body: 'Photograph damage and screenshot threats before they are deleted. Note the date, time, and exact location while it is fresh.' },
  { icon: <IconFlag className="w-5 h-5" />, title: 'Report it', body: 'File with LAPD (911 or non-emergency), then report to ADL and SCN so it enters the community record and threat picture.' },
  { icon: <IconHeart className="w-5 h-5" />, title: 'Get support', body: 'You have legal options and trauma support. Use the Legal Help and Mental Health resources below when you are ready.' },
];

const KRAV_STUDIOS = [
  { name: 'Krav Maga Worldwide, Beverly Hills', address: '9036 Wilshire Blvd, Beverly Hills', miles: '0.4 mi from Pico-Robertson', url: 'https://www.kravmaga.com', note: 'Global Krav Maga Worldwide HQ and flagship training center.' },
  { name: 'KMG Los Angeles (Krav Maga Global)', address: 'West Los Angeles', miles: 'Westside LA', url: 'https://kravmagaglobal.com', note: 'KMG curriculum: civilian, law enforcement, and military-grade self-protection.' },
  { name: 'Fit & Fearless, Studio City', address: 'Studio City', miles: 'San Fernando Valley', url: null, note: 'Mixed self-defense with Krav Maga and defensive tactics. Women-focused classes available.' },
  { name: 'IKMF Los Angeles', address: 'Greater Los Angeles', miles: 'Multiple locations', url: 'https://www.ikmf.com', note: 'IKMF-certified instruction from one of the original Israeli Krav Maga federations.' },
];

const SECURITY_ORGS = [
  { name: 'Secure Community Network (SCN)', description: 'The official safety and security organization of the North American Jewish community. Threat intelligence, crisis response, and community security training. Report threats directly.', url: 'https://securecommunitynetwork.org', phone: null, tag: 'National' },
  { name: 'ADL Los Angeles', description: 'Anti-Defamation League Pacific Southwest office. Reports antisemitic incidents, provides legal referrals, and monitors extremist activity.', url: 'https://www.adl.org/about/regional-offices', phone: '(310) 446-8000', tag: 'Los Angeles' },
  { name: 'Chabad Shomrim Safety Patrol', description: 'Jewish community neighborhood safety patrol operating in parts of Los Angeles. Rapid non-emergency response and coordination with LAPD.', url: null, phone: null, tag: 'Community Patrol' },
];

const LEGAL_RESOURCES = [
  { name: 'StandWithUs Saidoff Legal Center', description: 'The legal arm of StandWithUs. Free legal support to students, educators, and community members facing antisemitism and anti-Israel discrimination, including on campus.', url: 'https://www.standwithus.com/legal', contact: 'Via website' },
  { name: 'ADL Legal Affairs', description: 'Free legal consultation for victims of bias-motivated crimes. Can connect you with civil rights attorneys and assist with law enforcement liaison.', url: 'https://www.adl.org/report-incident', contact: 'Via website' },
  { name: 'ACLU of Southern California', description: 'Civil liberties legal representation, relevant if your rights were violated during a hate incident or you face retaliation for reporting one.', url: 'https://www.aclusocal.org', contact: '(213) 977-9500' },
  { name: 'California DOJ, Civil Rights Division', description: 'State-level hate crime reporting and investigation. File independently of LAPD if needed.', url: 'https://oag.ca.gov/civilrights', contact: 'Via website' },
  { name: 'Bet Tzedek Legal Services', description: 'Free civil legal help for LA residents. Not hate-crime specific, but can assist with restraining orders and harassment-related landlord issues.', url: 'https://www.bettzedek.org', contact: '(323) 939-0506' },
];

const MENTAL_HEALTH = [
  { name: 'Jewish Family Service of LA', description: 'Counseling, trauma support, and crisis intervention for the LA Jewish community. Sliding-scale fees. Hebrew, Russian, Farsi, and English.', url: 'https://www.jfsla.org', phone: '(800) 315-6252' },
  { name: 'JFS Crisis Line', description: '24/7 mental health crisis line for Jewish community members in LA County.', url: 'https://www.jfsla.org/mental-health', phone: '(800) 315-6252' },
  { name: 'NCJW Los Angeles', description: 'National Council of Jewish Women LA. Peer support groups and referrals for survivors of hate incidents.', url: 'https://ncjwla.org', phone: null },
];

const EMERGENCY_CONTACTS = [
  { label: 'Emergency', number: '911', note: 'Police, fire, ambulance' },
  { label: 'LAPD Non-Emergency', number: '(877) 275-5273', note: 'Hate-crime reporting, non-urgent' },
  { label: 'ADL Incident Hotline', number: '(310) 446-8000', note: 'Pacific Southwest region' },
  { label: 'JFS Crisis (24/7)', number: '(800) 315-6252', note: 'Mental health support' },
  { label: 'FBI Los Angeles', number: '(310) 477-6565', note: 'Hate crimes, federal' },
  { label: 'SCN Threat Line', number: null, note: 'securecommunitynetwork.org/report' },
];

function SectionHead({ icon, tag, title, children }: { icon: React.ReactNode; tag: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-gold-500 mb-3">
        <span className="w-4 h-4">{icon}</span>
        {tag}
      </p>
      <h2 className="font-serif text-3xl font-bold text-navy-800 mb-3">{title}</h2>
      {children && <p className="font-sans text-sm text-gray-600 leading-relaxed">{children}</p>}
    </div>
  );
}

function ResourceCard({ title, children, url, phone, tag }: { title: string; children: React.ReactNode; url?: string | null; phone?: string | null; tag?: string }) {
  const isTel = phone && /\d/.test(phone);
  return (
    <div className="bg-white border border-cream-200 rounded-lg p-6 flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-sans font-semibold text-navy-800 text-base leading-snug">{title}</h3>
        {tag && (
          <span className="flex-none text-[10px] font-sans font-bold uppercase tracking-wide px-2 py-0.5 border border-cream-300 text-gray-500 rounded">
            {tag}
          </span>
        )}
      </div>
      <div className="font-sans text-sm text-gray-600 leading-relaxed mb-4 flex-1">{children}</div>
      <div className="flex items-center gap-4 flex-wrap">
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-sans font-semibold text-navy-700 hover:text-navy-900">
            Visit website <span aria-hidden="true">↗</span>
          </a>
        )}
        {isTel && (
          <a href={`tel:${phone!.replace(/\D/g, '')}`} className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-navy-700 hover:text-navy-900">
            <IconPhone className="w-3.5 h-3.5" /> {phone}
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
      <section className="bg-navy-900 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/10 border border-white/15 text-white mb-6">
            <IconShield className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-5xl font-bold text-white leading-tight mb-5">Safety Resources</h1>
          <p className="font-sans text-lg text-blue-100/75 max-w-2xl leading-relaxed">
            What to do if you are targeted, and where to turn: self-defense, community security,
            legal help, mental health, and who to call, curated for Jewish Los Angeles.
          </p>
        </div>
      </section>

      {/* Emergency band */}
      <section className="bg-red-700 py-7">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-red-200 mb-4">
            <IconAlert className="w-4 h-4" /> Emergency contacts
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
            {EMERGENCY_CONTACTS.map((c) => (
              <div key={c.label} className="border-l border-white/20 pl-3">
                <p className="font-sans text-[11px] uppercase tracking-wide text-red-200 mb-0.5">{c.label}</p>
                {c.number ? (
                  <a href={`tel:${c.number.replace(/\D/g, '')}`} className="font-sans font-bold text-white text-lg hover:underline block leading-tight">
                    {c.number}
                  </a>
                ) : (
                  <p className="font-sans font-bold text-white text-sm leading-tight">{c.note}</p>
                )}
                {c.number && <p className="font-sans text-xs text-red-200/90 mt-0.5">{c.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* If it just happened — step guide */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead icon={<IconAlert />} tag="If it just happened" title="Four steps, in order">
            When you have just been targeted it is hard to think clearly. Follow these in sequence.
          </SectionHead>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MOMENT_STEPS.map((s, i) => (
              <div key={s.title} className="relative border-t-2 border-navy-800 pt-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-none w-8 h-8 rounded bg-navy-900 text-white flex items-center justify-center font-sans font-bold text-sm">
                    {i + 1}
                  </span>
                  <span className="text-gold-500">{s.icon}</span>
                </div>
                <h3 className="font-sans font-semibold text-navy-800 text-base mb-1.5">{s.title}</h3>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-defense */}
      <section className="bg-cream-50 py-20 border-t border-cream-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead icon={<IconShield />} tag="Self-Defense" title="Krav Maga in Los Angeles">
            Krav Maga is the Israeli Defense Forces&apos; close-contact system, practical, fast to
            learn, and built around real-world threat scenarios. These LA studios have active Jewish
            community ties and beginner courses.
          </SectionHead>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {KRAV_STUDIOS.map((s) => (
              <div key={s.name} className="border border-cream-200 rounded-lg p-5 bg-white">
                <h3 className="font-sans font-semibold text-navy-800 text-sm mb-1">{s.name}</h3>
                <p className="font-sans text-xs text-gray-500 mb-2">{s.address} · {s.miles}</p>
                <p className="font-sans text-sm text-gray-600 leading-relaxed mb-3">{s.note}</p>
                {s.url && (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-sans font-semibold text-navy-700 hover:text-navy-900">
                    Visit website <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 border-l-4 border-gold-500 bg-white border border-cream-200 rounded-r-lg p-5">
            <p className="font-sans text-sm text-gray-700 leading-relaxed">
              <span className="font-semibold text-navy-800">Also worth knowing:</span> many JCCs run
              self-defense workshops. The Westside JCC and Valley Alliance JCC both offer periodic Krav
              Maga and personal safety programs, check their schedules directly.
            </p>
          </div>
        </div>
      </section>

      {/* Security organizations */}
      <section className="bg-white py-20 border-t border-cream-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead icon={<IconShield />} tag="Community Security" title="Security Organizations">
            These organizations track threats, coordinate with law enforcement, and provide real
            security infrastructure. If you witness a threat, report it here in addition to LAPD.
          </SectionHead>
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
      <section className="bg-cream-50 py-20 border-t border-cream-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead icon={<IconScale />} tag="Legal Resources" title="Legal Help">
            Hate crimes are criminal offenses in California. If you were targeted, you have legal
            options, and several organizations provide free or low-cost help.
          </SectionHead>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {LEGAL_RESOURCES.map((r) => (
              <ResourceCard key={r.name} title={r.name} url={r.url} phone={r.contact}>
                {r.description}
              </ResourceCard>
            ))}
          </div>
          <div className="mt-8 bg-navy-900 text-white rounded-lg p-6">
            <h3 className="flex items-center gap-2 font-serif text-lg font-bold mb-3">
              <IconCamera className="w-5 h-5 text-gold-400" /> Documenting an incident: what to save
            </h3>
            <ul className="font-sans text-sm text-blue-100/80 leading-relaxed grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
              <li>Screenshots of online harassment before deletion</li>
              <li>Photos of vandalism or physical damage</li>
              <li>Dates, times, and locations of each incident</li>
              <li>Names or descriptions of witnesses</li>
              <li>Any police report numbers</li>
              <li>Correspondence with the perpetrator, if known</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Mental health */}
      <section className="bg-white py-20 border-t border-cream-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead icon={<IconHeart />} tag="Mental Health" title="Support After an Incident">
            Being targeted for who you are is traumatic. These organizations offer Jewish
            community-aware counseling and crisis support in Los Angeles.
          </SectionHead>
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
      <section className="bg-navy-900 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-gold-400 mb-3">
            <IconGlobe className="w-4 h-4" /> Online Safety
          </p>
          <h2 className="font-serif text-3xl font-bold text-white mb-10 max-w-2xl">Protecting Yourself Online</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-sans font-semibold text-white mb-4 text-sm uppercase tracking-wide">If you are targeted online</h3>
              <ul className="font-sans text-sm text-blue-100/75 leading-relaxed space-y-2.5">
                <li>Screenshot everything before reporting; platforms remove content fast</li>
                <li>Report to the platform and to ADL&apos;s Online Hate reporting tool</li>
                <li>If threats are credible, report to the FBI&apos;s IC3</li>
                <li>Lock down social profiles: go private, remove location data</li>
                <li>Contact SCN if threats are coordinated or involve doxxing</li>
              </ul>
            </div>
            <div>
              <h3 className="font-sans font-semibold text-white mb-4 text-sm uppercase tracking-wide">Preventive steps</h3>
              <ul className="font-sans text-sm text-blue-100/75 leading-relaxed space-y-2.5">
                <li>Remove your home address from data-broker sites (DeleteMe, Kanary)</li>
                <li>Use a PO box or mail forwarding for Jewish-org memberships</li>
                <li>Enable two-factor authentication everywhere</li>
                <li>Search yourself to see what is publicly visible</li>
                <li>Be mindful about what you post near Jewish institutions</li>
              </ul>
            </div>
          </div>
          <p className="mt-10 pt-8 border-t border-white/10 font-sans text-sm text-blue-100/50 max-w-2xl">
            SafeJew does not provide direct security services. These resources are curated for
            informational purposes. In an emergency, always call 911 first.
          </p>
        </div>
      </section>

      {/* Report CTA */}
      <section className="bg-white py-16 border-t border-cream-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-navy-800 mb-3">Experienced an incident?</h2>
          <p className="font-sans text-sm text-gray-600 leading-relaxed mb-7 max-w-xl mx-auto">
            Reporting it builds the community data record and helps identify the patterns that protect
            others. It takes two minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/report" className="inline-flex items-center justify-center bg-navy-900 text-white px-6 py-3 rounded font-sans font-semibold text-sm hover:bg-navy-700 transition-colors">
              Report an incident
            </Link>
            <Link href="/map" className="inline-flex items-center justify-center border border-cream-300 text-navy-700 px-6 py-3 rounded font-sans font-semibold text-sm hover:border-navy-300 transition-colors">
              See the incident map
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
