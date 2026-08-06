import Link from 'next/link';

export const metadata = {
  title: 'Our Story',
  description:
    'How three Los Angeles students built SafeJew — a live map of antisemitic incidents.',
};

const TEAM = ['Adrian Erlikhman', 'Ryan Erlikhman', 'Yonatan Zarur'];

const ROADMAP = [
  ['Mobile reporting app', 'Fast, in-the-moment reporting from your phone — the way most people actually report.'],
  ['Beyond Los Angeles', 'Expanding to other cities as data partnerships and community relationships grow.'],
  ['Campus program', 'A per-campus deployment with Hillels and universities — anonymous student reporting and their own dashboard.'],
  ['Verified data partnerships', 'Direct feeds from official sources so the map is as current as possible.'],
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy-800 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-12 h-0.5 bg-gold-500 mb-6" aria-hidden="true" />
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight">
            Our story
          </h1>
          <p className="mt-4 text-lg text-blue-100/70 max-w-xl leading-relaxed">
            Three LA students kept asking the same question — where&apos;s the data? — so they built it.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-cream-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-500 mb-3">
              2023 · How it started
            </p>
            <div className="space-y-4 font-sans text-base text-gray-700 leading-relaxed">
              <p>
                In 2023, Adrian Erlikhman, Ryan Erlikhman, and Yonatan Zarur were watching
                antisemitism climb — in their schools, their neighborhoods, their feeds. Swastikas on
                lockers, slurs in hallways, flyers. Things that got reported once and then vanished.
              </p>
              <p>
                What bugged them wasn&apos;t just that it was happening. It was that no one could see
                it clearly. The ADL, FBI, and LAPD all published numbers, but never in one place, never
                mapped, and always months late. So they built the first version of SafeJew: pull the
                public data together, add a way for people to report, and put it all on one map.
              </p>
            </div>
          </div>

          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-500 mb-3">
              The grant &amp; a mentor
            </p>
            <div className="space-y-4 font-sans text-base text-gray-700 leading-relaxed">
              <p>
                That first version earned a $1,000 Teen Innovation Grant from JFEDLA — the Jewish
                Federation of Greater Los Angeles. It was the first sign that this was worth building.
              </p>
              <p>
                We were mentored through the program by <strong>Jane Miller</strong>, who pushed us on
                what the tool actually needed to be and helped shape it at every step. She truly helped
                make SafeJew what it is, and we&apos;re grateful to her and to JFEDLA for betting on
                three students with an idea.
              </p>
            </div>
          </div>

          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-500 mb-3">
              Now · Version 2
            </p>
            <div className="space-y-4 font-sans text-base text-gray-700 leading-relaxed">
              <p>
                Version 1 taught us a lot — mostly by falling short. The phone experience was rough,
                the analytics were thin, there was no campus layer, and the domain even lapsed during
                college applications. Version 2 fixes that. It&apos;s a full rebuild: a cleaner map,
                mobile-first reporting, a real campus tool, and data that&apos;s refreshed automatically.
              </p>
              <p>
                The goal hasn&apos;t changed — put reliable, current safety data in the hands of Jewish
                communities, at the neighborhood and campus level where decisions actually get made.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-16 border-t border-cream-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-navy-800 mb-8">The team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TEAM.map((name) => (
              <div key={name} className="border-t-2 border-gold-500 pt-4">
                <h3 className="font-serif text-lg font-semibold text-navy-800">{name}</h3>
                <p className="font-sans text-xs font-medium uppercase tracking-widest text-gold-500 mt-1">
                  Co-Founder
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-cream-50 py-16 border-t border-cream-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-navy-800 mb-2">What&apos;s next</h2>
          <p className="font-sans text-sm text-gray-500 mb-8">Where SafeJew is headed.</p>
          <ul className="space-y-5">
            {ROADMAP.map(([label, detail]) => (
              <li key={label} className="flex gap-4">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-sans text-sm font-semibold text-navy-800">{label}</p>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed mt-1">{detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-navy-800 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-3">
            Working on community or campus safety?
          </h2>
          <p className="font-sans text-base text-blue-100/70 mb-8 leading-relaxed">
            Universities, synagogues, community organizations, security teams — if you&apos;re dealing
            with this, we want to hear from you.
          </p>
          <a
            href="mailto:contact.safejew@gmail.com"
            className="inline-flex items-center justify-center bg-gold-500 text-white px-8 py-3 rounded font-sans font-semibold text-sm hover:bg-gold-600 transition-colors"
          >
            Get in touch
          </a>
        </div>
      </section>
    </>
  );
}
