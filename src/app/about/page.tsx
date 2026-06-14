import Link from 'next/link';

export const metadata = {
  title: 'Our Story',
  description:
    'The founding story of SafeJew — built by Los Angeles students in response to rising antisemitism.',
};

export default function AboutPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="bg-navy-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-12 h-0.5 bg-gold-500 mb-6" aria-hidden="true" />
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight">
            Our Story
          </h1>
          <p className="mt-4 text-lg text-blue-100/70 max-w-xl leading-relaxed">
            A community crisis. A question no one had answered: where is the data?
            Three students started building the answer.
          </p>
        </div>
      </section>

      {/* ── Founding narrative ── */}
      <section className="bg-cream-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* The Idea */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-500 mb-3">
              2023
            </p>
            <h2 className="font-serif text-2xl font-bold text-navy-800 mb-5">
              The Idea
            </h2>
            <div className="space-y-4 font-sans text-base text-gray-700 leading-relaxed">
              <p>
                In early 2023, Adrian Erlikhman, Ryan Erlikhman, and Yonatan Zarur were students
                in Los Angeles. Antisemitic incidents had been rising nationally for several
                years, and all three of them were seeing it close up — in their schools, in their
                neighborhoods, on social media feeds. Swastikas on lockers. Slurs in
                hallways. Flyers. The kind of thing that gets reported once to an administrator
                and then disappears.
              </p>
              <p>
                What struck them was not just that it was happening, but that there was no
                clear way to see it. The ADL published an annual audit. The FBI published
                hate crime statistics. The LAPD published reports. But none of it was in one
                place, none of it was mapped, and none of it was current enough to be
                actionable for a community trying to respond in real time.
              </p>
              <p>
                The question that kept coming back was simple: where is the data? Not
                summarized in a press release six months later — where is the actual,
                mappable, searchable data? They started building the answer.
              </p>
            </div>
          </div>

          {/* The Build */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-500 mb-3">
              The Build
            </p>
            <h2 className="font-serif text-2xl font-bold text-navy-800 mb-5">
              First Version
            </h2>
            <div className="space-y-4 font-sans text-base text-gray-700 leading-relaxed">
              <p>
                The first version of SafeJew was scrappy. The team taught themselves
                what they needed to build it — pulling publicly available incident data from
                the ADL, FBI Uniform Crime Reports, and LAPD hate crime logs, writing a
                community reporting form, and stitching it all together into an interactive
                map. The analytics were basic by today&apos;s standards, but the concept was
                sound: one platform, multiple data sources, one map.
              </p>
              <p>
                Users could see where antisemitic incidents had been reported in Greater Los
                Angeles, filter by category and date, and submit their own reports for
                community review. For a lot of people, it was the first time they had seen
                the pattern clearly laid out geographically.
              </p>
            </div>
          </div>

          {/* The Grant */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-500 mb-3">
              Recognition
            </p>
            <h2 className="font-serif text-2xl font-bold text-navy-800 mb-5">
              The Grant
            </h2>
            <div className="space-y-4 font-sans text-base text-gray-700 leading-relaxed">
              <p>
                SafeJew earned a $1,000 Teen Innovation Grant from JFEDLA — the Jewish
                Federation of Greater Los Angeles — one of the largest and most established
                Jewish communal organizations in the country. The platform was subsequently
                distributed across JFEDLA&apos;s Greater LA network in partnership with the
                Community Security Initiative (CSI), JFEDLA&apos;s dedicated community safety arm.
              </p>
              <p>
                Getting that distribution meant SafeJew was reaching the people who needed
                it most: synagogue security coordinators, community center directors,
                neighborhood safety liaisons. The feedback confirmed what the team had
                suspected — there was real demand for this, and nothing else was filling
                the gap.
              </p>
            </div>
          </div>

          {/* What We Learned */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-500 mb-3">
              Lessons
            </p>
            <h2 className="font-serif text-2xl font-bold text-navy-800 mb-5">
              What Version 1 Taught Us
            </h2>
            <div className="space-y-4 font-sans text-base text-gray-700 leading-relaxed">
              <p>
                V1 had real limitations. The mobile experience was poor — most people
                reporting incidents were on their phones, and the interface was not built for
                them. The analytics were shallow; the map showed incidents but did not help
                users understand trajectory or concentration. There was no campus layer,
                which turned out to be a major gap as antisemitism on college campuses
                intensified in late 2023 and 2024. And practically: the domain lapsed during
                college application season, which was a hard lesson about the infrastructure
                required to run something people depend on.
              </p>
              <p>
                Those failures were instructive. They made clear what Version 2 needed to be.
              </p>
            </div>
          </div>

          {/* Version 2 */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-500 mb-3">
              Now
            </p>
            <h2 className="font-serif text-2xl font-bold text-navy-800 mb-5">
              Version 2
            </h2>
            <div className="space-y-4 font-sans text-base text-gray-700 leading-relaxed">
              <p>
                Version 2 is a full rebuild. The codebase is new, the design is new, the
                data architecture is new. The goal is the same — put reliable, accessible
                safety data in the hands of Jewish communities — but the execution is held
                to a higher standard. Institutional-grade credibility. Mobile-first reporting.
                A real campus layer. Analytics that tell a story, not just display rows.
              </p>
              <p>
                SafeJew V2 is built to scale beyond Los Angeles. If antisemitism is a
                national problem — and it is — then the tools for tracking and responding
                to it should not be local. The roadmap includes verified data partnerships,
                a mobile reporting application, and a university program that can deploy
                per-campus with appropriate privacy controls for student safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="bg-white py-20 border-t border-cream-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-navy-800 mb-10">
            The Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Adrian */}
            <div className="border-t-2 border-gold-500 pt-6">
              <h3 className="font-serif text-lg font-semibold text-navy-800 mb-1">
                Adrian Erlikhman
              </h3>
              <p className="font-sans text-xs font-medium uppercase tracking-widest text-gold-500 mb-3">
                Co-Founder
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                Bio coming soon.
              </p>
            </div>
            {/* Ryan */}
            <div className="border-t-2 border-gold-500 pt-6">
              <h3 className="font-serif text-lg font-semibold text-navy-800 mb-1">
                Ryan Erlikhman
              </h3>
              <p className="font-sans text-xs font-medium uppercase tracking-widest text-gold-500 mb-3">
                Co-Founder
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                Bio coming soon.
              </p>
            </div>
            {/* Yonatan */}
            <div className="border-t-2 border-gold-500 pt-6">
              <h3 className="font-serif text-lg font-semibold text-navy-800 mb-1">
                Yonatan Zarur
              </h3>
              <p className="font-sans text-xs font-medium uppercase tracking-widest text-gold-500 mb-3">
                Co-Founder
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                Bio coming soon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Roadmap ── */}
      <section className="bg-cream-50 py-20 border-t border-cream-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-navy-800 mb-3">
            What&apos;s Coming
          </h2>
          <p className="font-sans text-sm text-gray-500 mb-10">
            SafeJew V2 is under active development. Here is what is on the roadmap.
          </p>
          <ul className="space-y-5">
            {[
              {
                label: 'Verified data partnerships',
                detail:
                  'Direct data feeds from ADL and JFEDLA for live, verified incident data — not relying solely on public datasets.',
              },
              {
                label: 'Mobile reporting application',
                detail:
                  'Native iOS and Android apps optimized for in-the-moment incident reporting, including offline queuing.',
              },
              {
                label: 'Expansion beyond Greater Los Angeles',
                detail:
                  'Broader geographic coverage as data partnerships and community relationships are established in other metro areas.',
              },
              {
                label: 'ML-powered predictive risk modeling',
                detail:
                  'Pattern recognition across incident data to identify elevated-risk periods and locations. Planned for a future release pending sufficient verified data volume.',
                note: true,
              },
              {
                label: 'University partnership program',
                detail:
                  'A structured campus deployment with Hillel International and campus security teams — per-institution data segmentation, anonymized student reporting, and administrator dashboards.',
              },
            ].map(({ label, detail, note }) => (
              <li key={label} className="flex gap-4">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-sans text-sm font-semibold text-navy-800">
                    {label}
                    {note && (
                      <span className="ml-2 font-normal text-gray-400 text-xs">
                        (planned for future release)
                      </span>
                    )}
                  </p>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed mt-1">
                    {detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="bg-navy-800 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-0.5 bg-gold-500 mb-6 mx-auto" aria-hidden="true" />
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-4">
            Working on campus safety or community security?
          </h2>
          <p className="font-sans text-base text-blue-100/70 mb-8 leading-relaxed">
            We want to hear from you. Whether you represent a university, a community
            organization, or a security team — if you are dealing with these problems, we
            are building for you.
          </p>
          <a
            href="mailto:babafiraislife@gmail.com"
            className="inline-flex items-center justify-center bg-gold-500 text-white px-8 py-3 rounded font-sans font-semibold text-sm hover:bg-gold-600 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </>
  );
}
