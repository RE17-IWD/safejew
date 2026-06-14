import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-navy-800 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-12 h-0.5 bg-gold-500 mb-6" aria-hidden="true" />
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight">
            Safety Intelligence for Jewish Communities
          </h1>
          <p className="mt-6 text-lg text-blue-100/80 max-w-2xl leading-relaxed">
            SafeJew tracks antisemitic incidents across Greater Los Angeles, integrating data
            from community reports, law enforcement, and advocacy organizations — so communities
            can see patterns, respond faster, and stay safer.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/map"
              className="inline-flex items-center justify-center bg-white text-navy-800 px-6 py-3 rounded font-sans font-semibold text-sm hover:bg-cream-50 transition-colors"
            >
              Explore the Map
            </Link>
            <Link
              href="/report"
              className="inline-flex items-center justify-center border border-white/50 text-white px-6 py-3 rounded font-sans font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              Report an Incident
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-white border-y border-cream-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col md:flex-row items-center justify-center gap-0 divide-y md:divide-y-0 md:divide-x divide-cream-200">
            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center px-12 py-6 md:py-0">
              <span className="font-serif text-4xl font-bold text-navy-700">847</span>
              <span className="mt-1 text-sm font-sans font-medium text-gray-500 uppercase tracking-wider">
                Incidents Tracked
              </span>
            </div>
            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center px-12 py-6 md:py-0">
              <span className="font-serif text-4xl font-bold text-navy-700">38</span>
              <span className="mt-1 text-sm font-sans font-medium text-gray-500 uppercase tracking-wider">
                Neighborhoods Monitored
              </span>
            </div>
            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center px-12 py-6 md:py-0">
              <span className="font-serif text-4xl font-bold text-navy-700">4</span>
              <span className="mt-1 text-sm font-sans font-medium text-gray-500 uppercase tracking-wider">
                Data Sources Integrated
              </span>
            </div>
          </div>
          <p className="mt-8 text-center text-xs font-sans text-gray-400">
            Statistics represent demonstration data for product preview.
          </p>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="bg-cream-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Accent column */}
            <div className="flex flex-row lg:flex-col items-start gap-4 lg:gap-0 lg:w-40 flex-shrink-0">
              <div className="hidden lg:block w-0.5 h-32 bg-gold-500" aria-hidden="true" />
              <p className="font-sans text-xs text-gray-400 uppercase tracking-widest lg:mt-4">
                2023–Present
              </p>
            </div>
            {/* Story text */}
            <div className="flex-1 max-w-2xl">
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy-800 mb-6 leading-snug">
                Born from Community. Built on Data.
              </h2>
              <p className="font-sans text-base text-gray-700 leading-relaxed mb-5">
                In 2023, Adrian Erlikhman, Ryan Erlikhman, and Yonatan Zarur were students in
                Los Angeles watching antisemitism rise in their own neighborhoods and schools.
                What they could not find was a single place to see it clearly — where it was
                happening, how often, and what patterns were emerging. So they built one.
              </p>
              <p className="font-sans text-base text-gray-700 leading-relaxed mb-5">
                SafeJew began as a community project and earned a $1,000 Teen Innovation Grant
                from JFEDLA — the Jewish Federation of Greater Los Angeles — and was distributed
                across JFEDLA&apos;s Greater LA network in partnership with the Community Security
                Initiative. The original platform combined incident mapping, community reporting,
                and an analytics dashboard drawing from ADL, FBI, LAPD, and CSI data sources.
              </p>
              <p className="font-sans text-base text-gray-700 leading-relaxed">
                Version 2 of SafeJew is a full rebuild: more rigorous, more credible, and ready
                to serve not just Los Angeles but Jewish communities wherever they need it —
                including on college campuses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy-800 mb-14 text-center">
            How SafeJew Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div>
              <p className="font-sans text-2xl font-bold text-gold-500 mb-3 tracking-tight">
                01
              </p>
              <h3 className="font-serif text-xl font-semibold text-navy-800 mb-3">
                Monitor
              </h3>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                Real-time aggregation of community reports and verified data from ADL, FBI,
                LAPD, and JFEDLA&apos;s Community Security Initiative.
              </p>
            </div>
            {/* Step 2 */}
            <div>
              <p className="font-sans text-2xl font-bold text-gold-500 mb-3 tracking-tight">
                02
              </p>
              <h3 className="font-serif text-xl font-semibold text-navy-800 mb-3">
                Analyze
              </h3>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                Interactive maps and analytics dashboards reveal patterns by geography,
                incident type, and time — making invisible trends visible.
              </p>
            </div>
            {/* Step 3 */}
            <div>
              <p className="font-sans text-2xl font-bold text-gold-500 mb-3 tracking-tight">
                03
              </p>
              <h3 className="font-serif text-xl font-semibold text-navy-800 mb-3">
                Respond
              </h3>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                Community members submit reports. Organizations access data. Campus
                administrators receive anonymized trend reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Data Sources ── */}
      <section className="bg-cream-100 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-navy-800 mb-4">
              Data Sources
            </h2>
            <p className="font-sans text-sm text-gray-600 leading-relaxed">
              SafeJew aggregates data from trusted public sources. References to these
              organizations do not imply formal endorsement or partnership.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* ADL */}
            <div className="bg-white border border-cream-200 rounded-lg p-6">
              <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-500 mb-2">
                ADL
              </p>
              <h3 className="font-serif text-lg font-semibold text-navy-800 mb-1">
                Anti-Defamation League
              </h3>
              <p className="font-sans text-sm text-gray-500 leading-relaxed">
                Annual Audit of Antisemitic Incidents; campus and community tracking.
              </p>
            </div>
            {/* FBI */}
            <div className="bg-white border border-cream-200 rounded-lg p-6">
              <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-500 mb-2">
                FBI
              </p>
              <h3 className="font-serif text-lg font-semibold text-navy-800 mb-1">
                FBI Hate Crime Statistics
              </h3>
              <p className="font-sans text-sm text-gray-500 leading-relaxed">
                Uniform Crime Reporting data; hate crime classifications.
              </p>
            </div>
            {/* LAPD */}
            <div className="bg-white border border-cream-200 rounded-lg p-6">
              <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-500 mb-2">
                LAPD
              </p>
              <h3 className="font-serif text-lg font-semibold text-navy-800 mb-1">
                Los Angeles Police Department
              </h3>
              <p className="font-sans text-sm text-gray-500 leading-relaxed">
                LAPD hate crime reports; local law enforcement data.
              </p>
            </div>
            {/* CSI */}
            <div className="bg-white border border-cream-200 rounded-lg p-6">
              <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-500 mb-2">
                CSI
              </p>
              <h3 className="font-serif text-lg font-semibold text-navy-800 mb-1">
                JFEDLA Community Security Initiative
              </h3>
              <p className="font-sans text-sm text-gray-500 leading-relaxed">
                Community Security Initiative; field-verified local reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Campus CTA ── */}
      <section className="bg-navy-700 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-500 mb-5">
            For Universities
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-6 leading-snug">
            SafeJew for Campus
          </h2>
          <p className="font-sans text-base text-blue-100/75 leading-relaxed mb-10 max-w-xl mx-auto">
            Jewish student organizations and campus security teams face a unique challenge:
            tracking antisemitism in a dense, fluid community. SafeJew deploys per-university,
            routing reports to campus security and Hillel staff with anonymized trend dashboards
            for administrators.
          </p>
          <Link
            href="/campus"
            className="inline-flex items-center justify-center bg-gold-500 text-white px-8 py-3 rounded font-sans font-semibold text-sm hover:bg-gold-600 transition-colors"
          >
            See the Campus Demo
          </Link>
        </div>
      </section>
    </>
  );
}
