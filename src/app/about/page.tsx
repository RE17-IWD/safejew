export const metadata = {
  title: 'Our Story',
  description:
    'How three Los Angeles students built SafeJew, a live map of antisemitic incidents.',
};

const TEAM = ['Adrian Erlikhman', 'Ryan Erlikhman', 'Yonatan Zarur'];

const ROADMAP = [
  ['Mobile reporting app', 'Fast reporting from your phone, the way most people actually report, with offline queuing.'],
  ['Beyond Los Angeles', 'Expanding to other cities as data partnerships and community relationships grow.'],
  ['Campus program', 'A per-campus deployment with Hillels and universities: anonymous student reporting, per-school data, and an administrator dashboard.'],
  ['Verified data partnerships', 'Direct feeds from official sources, so the map stays current instead of running months behind.'],
];

function Block({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-500 mb-3">{kicker}</p>
      <h2 className="font-serif text-2xl font-bold text-navy-800 mb-5">{title}</h2>
      <div className="space-y-4 font-sans text-base text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}

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
            Three LA students kept asking one question: where is the data? So they built it.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-cream-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <Block kicker="2023 · How it started" title="The question">
            <p>
              In 2023, Adrian Erlikhman, Ryan Erlikhman, and Yonatan Zarur watched antisemitism climb
              in their schools, their neighborhoods, and their feeds. Swastikas on lockers. Slurs in
              hallways. Flyers on the ground. The kind of thing that gets reported once to an
              administrator and then disappears.
            </p>
            <p>
              What bothered them was not only that it was happening. It was that no one could see it
              clearly. The ADL published an annual audit. The FBI published hate-crime statistics. The
              LAPD published reports. None of it lived in one place, none of it was mapped, and none of
              it was current enough to act on. One question kept coming back: where is the real,
              mappable, searchable data, not a press release six months late?
            </p>
          </Block>

          <Block kicker="The build" title="Version 1">
            <p>
              So they built it. The first version was scrappy. The team taught themselves what they
              needed as they went. They pulled public incident data from the ADL, FBI reports, and LAPD
              hate-crime logs, wrote a community reporting form, and stitched it all into one
              interactive map.
            </p>
            <p>
              It worked. People could finally see where antisemitic incidents had been reported across
              Greater Los Angeles, filter by category and date, and add their own. For a lot of people,
              it was the first time the pattern was laid out clearly on a map.
            </p>
          </Block>

          <Block kicker="The grant &amp; a mentor" title="Someone believed in it">
            <p>
              That first version earned a $1,000 Teen Innovation Grant from JFEDLA, the Jewish
              Federation of Greater Los Angeles and one of the largest Jewish communal organizations in
              the country. It was the first real sign that the problem was worth solving, and that
              nothing else was filling the gap.
            </p>
            <p>
              Jane Miller mentored the team through the program. She pushed us on how to frame the
              problem and on what the tool actually needed to be, and she shaped SafeJew at every step.
              She helped make it what it is, and we are grateful to her and to JFEDLA for betting on
              three students with an idea.
            </p>
          </Block>

          <Block kicker="Lessons" title="What Version 1 taught us">
            <p>
              Version 1 had real limits, and they taught us a lot. The phone experience was rough, and
              most people report from their phones. The analytics were thin, so the map showed incidents
              but not where they were clustering or trending. There was no campus layer, which became a
              glaring gap as campus antisemitism intensified through 2023 and 2024. At one point the
              domain even lapsed during college-application season, a blunt lesson in what it takes to
              run something people rely on.
            </p>
            <p>Those failures made it obvious what Version 2 had to be.</p>
          </Block>

          <Block kicker="Now · Version 2" title="A full rebuild">
            <p>
              Version 2 is built from scratch: new code, new design, new data. A cleaner, faster map.
              Mobile-first reporting. A real campus tool. Analytics that tell a story instead of listing
              rows. Data that refreshes on its own, so the site keeps up instead of falling months
              behind.
            </p>
            <p>
              The goal is the same as it was on day one. Put reliable, current safety data in the hands
              of Jewish communities, at the neighborhood and campus level where decisions actually get
              made. And build it to grow past Los Angeles, because antisemitism is not only a local
              problem.
            </p>
          </Block>
        </div>
      </section>

      {/* Where SafeJew started - grant attribution */}
      <section id="grant" className="scroll-mt-24 bg-white py-20 border-t border-cream-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-500 mb-3">
            Where SafeJew started
          </p>
          <h2 className="font-serif text-2xl font-bold text-navy-800 mb-6">
            Made possible by a Julie Beren Platt Teen Innovation Grant
          </h2>

          {/* Logos */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/tig-logo@2x.png"
              alt="The Julie Beren Platt Teen Innovation Grants"
              width={480}
              height={495}
              className="h-24 w-auto"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/jfedla-logo.png"
              alt="Jewish Federation Los Angeles"
              width={2390}
              height={975}
              className="h-11 w-auto rounded-md ring-1 ring-cream-200"
            />
          </div>

          <div className="space-y-4 font-sans text-base text-gray-700 leading-relaxed">
            <p>
              SafeJew began in 2024 as a recipient of a Julie Beren Platt Teen Innovation Grant from
              the Jewish Federation Los Angeles. The grant funded the first version of the platform, an
              incident map and community reporting tool, which was shared across JFEDLA&apos;s Greater
              Los Angeles network.
            </p>
            <p>
              Version 2, launched in 2026, is a complete rebuild. It adds an automated news monitoring
              pipeline, a live analytics dashboard, a campus deployment model, and a redesigned
              reporting system. The mission hasn&apos;t changed: give the Los Angeles Jewish community a
              clear, sourced picture of what is happening near them.
            </p>
            <p>
              We owe an enormous thank you to Hannah and Orly. Their guidance, encouragement, and
              belief in three students with an idea shaped SafeJew from the very beginning, and we are
              endlessly grateful for everything they have done for us and for this project. Thank you,
              truly.
            </p>
          </div>

          <p className="mt-8 pt-5 border-t border-cream-200 max-w-2xl font-sans text-xs text-gray-500 leading-relaxed">
            SafeJew is an independent project. References to the Jewish Federation Los Angeles reflect
            grant support and do not imply endorsement or partnership. SafeJew does not assess or
            guarantee security at any location.
          </p>
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
            Universities, synagogues, community organizations, security teams: if you are dealing with
            this, we want to hear from you.
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
