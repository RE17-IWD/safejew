import Link from 'next/link';

export const metadata = {
  title: 'Our Story',
  description:
    'How three Los Angeles students built SafeJew — a live map of antisemitic incidents.',
};

const TEAM = ['Adrian Erlikhman', 'Ryan Erlikhman', 'Yonatan Zarur'];

const ROADMAP = [
  ['Mobile reporting app', 'Fast, in-the-moment reporting from your phone — the way most people actually report — with offline queuing.'],
  ['Beyond Los Angeles', 'Expanding to other cities as data partnerships and community relationships grow.'],
  ['Campus program', 'A per-campus deployment with Hillels and universities: anonymous student reporting, per-school data, and an administrator dashboard.'],
  ['Verified data partnerships', 'Direct feeds from official sources so the map stays as current as possible, not months behind.'],
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
            Three LA students kept asking the same question — where&apos;s the data? — so they built it.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-cream-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <Block kicker="2023 · How it started" title="The question">
            <p>
              In 2023, Adrian Erlikhman, Ryan Erlikhman, and Yonatan Zarur were watching antisemitism
              climb — in their schools, their neighborhoods, and their feeds. Swastikas on lockers,
              slurs in hallways, flyers on the ground. The kind of thing that gets reported once to an
              administrator and then disappears.
            </p>
            <p>
              What bugged them wasn&apos;t only that it was happening. It was that no one could see it
              clearly. The ADL published an annual audit. The FBI published hate-crime statistics. The
              LAPD published reports. But none of it lived in one place, none of it was mapped, and none
              of it was current enough to actually act on. The question kept coming back: where is the
              data — not summarized in a press release six months later, but the real, mappable,
              searchable version?
            </p>
          </Block>

          <Block kicker="The build" title="Version 1">
            <p>
              So they built it. The first version of SafeJew was scrappy — the team taught themselves
              what they needed as they went, pulling public incident data from the ADL, FBI reports, and
              LAPD hate-crime logs, writing a community reporting form, and stitching it into one
              interactive map.
            </p>
            <p>
              It worked. People could see where antisemitic incidents had been reported across Greater
              Los Angeles, filter by category and date, and submit their own reports for review. For a
              lot of people, it was the first time they&apos;d seen the pattern laid out clearly on a map.
            </p>
          </Block>

          <Block kicker="The grant &amp; a mentor" title="Someone believed in it">
            <p>
              That first version earned a $1,000 Teen Innovation Grant from JFEDLA — the Jewish
              Federation of Greater Los Angeles, one of the largest and most established Jewish communal
              organizations in the country. It was the first real sign that the problem was worth
              solving and that nothing else was filling the gap.
            </p>
            <p>
              We were mentored through the program by <strong>Jane Miller</strong>, who pushed us on how
              to frame the problem and on what the tool actually needed to be. She helped shape SafeJew
              at every step — she truly helped make it what it is — and we&apos;re grateful to her and to
              JFEDLA for betting on three students with an idea.
            </p>
          </Block>

          <Block kicker="Lessons" title="What Version 1 taught us">
            <p>
              Version 1 had real limits, and they were instructive. The phone experience was rough —
              and most people reporting an incident are on their phones. The analytics were thin: the
              map showed incidents but didn&apos;t help you understand where things were concentrating or
              trending. There was no campus layer, which turned out to be a major gap as campus
              antisemitism intensified through 2023 and 2024. And at one point the domain even lapsed
              during college-application season — a blunt lesson in what it takes to run something people
              rely on.
            </p>
            <p>Those failures made it obvious what Version 2 had to be.</p>
          </Block>

          <Block kicker="Now · Version 2" title="A full rebuild">
            <p>
              Version 2 is built from scratch: new code, new design, new data architecture. A cleaner,
              faster map. Mobile-first reporting. A real campus tool. Analytics that tell a story instead
              of just listing rows. And data that refreshes automatically, so the site keeps up instead
              of falling months behind.
            </p>
            <p>
              The goal hasn&apos;t changed — put reliable, current safety data in the hands of Jewish
              communities, at the neighborhood and campus level where decisions actually get made. And
              it&apos;s built to scale past Los Angeles, because antisemitism isn&apos;t only a local
              problem.
            </p>
          </Block>
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
