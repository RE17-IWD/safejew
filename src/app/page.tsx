import Link from 'next/link';
import Image from 'next/image';
import { isDemoMode } from '@/lib/demo-data';

export default function HomePage() {
  return (
    <>
      {/* ── Hero with video ── */}
      <section className="relative bg-navy-900 overflow-hidden" style={{ minHeight: '92vh' }}>
        {/* Background video */}
        <video
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/40 to-navy-900/80" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center" style={{ minHeight: '92vh' }}>
          <div className="pt-24 pb-16">
            {/* Logo mark */}
            <div className="mb-8 inline-block bg-white rounded-2xl px-5 py-4 shadow-xl">
              <Image src="/logo.png" alt="SafeJew" width={180} height={180} priority className="object-contain" />
            </div>

            <h1 className="font-serif text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Know where
              <br />
              antisemitism
              <br />
              <span className="text-gold-400">is happening.</span>
            </h1>
            <p className="font-sans text-lg text-white/70 max-w-xl leading-relaxed mb-10">
              SafeJew maps antisemitic incidents across Greater Los Angeles. We pull from
              community reports, LAPD, ADL, and FBI data so you can see the real picture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/map"
                className="inline-flex items-center justify-center bg-white text-navy-800 px-7 py-3.5 rounded font-sans font-semibold text-sm hover:bg-cream-100 transition-colors"
              >
                Open the Map
              </Link>
              <Link
                href="/october-7"
                className="inline-flex items-center justify-center border border-white/30 text-white px-7 py-3.5 rounded font-sans font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                Oct 7 Data Report
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-white border-b border-cream-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-0 divide-y md:divide-y-0 md:divide-x divide-cream-200">
            <div className="flex flex-col items-center text-center px-12 py-6 md:py-0">
              <span className="font-serif text-4xl font-bold text-navy-800">8,873</span>
              <span className="mt-1.5 text-xs font-sans font-semibold text-gray-400 uppercase tracking-wider">
                US incidents in 2023
              </span>
              <span className="text-[11px] font-sans text-gray-400 mt-0.5">ADL Audit</span>
            </div>
            <div className="flex flex-col items-center text-center px-12 py-6 md:py-0">
              <span className="font-serif text-4xl font-bold text-navy-800">+226%</span>
              <span className="mt-1.5 text-xs font-sans font-semibold text-gray-400 uppercase tracking-wider">
                Rise after Oct 7
              </span>
              <span className="text-[11px] font-sans text-gray-400 mt-0.5">vs 2022 baseline</span>
            </div>
            <div className="flex flex-col items-center text-center px-12 py-6 md:py-0">
              <span className="font-serif text-4xl font-bold text-navy-800">165</span>
              <span className="mt-1.5 text-xs font-sans font-semibold text-gray-400 uppercase tracking-wider">
                LA incidents tracked
              </span>
              <span className="text-[11px] font-sans text-gray-400 mt-0.5">ADL Pacific Southwest, 2023</span>
            </div>
          </div>
          {isDemoMode() && (
            <p className="mt-6 text-center text-xs font-sans text-gray-400">
              Headline figures are from published ADL reports. Map data is demonstration only.
            </p>
          )}
        </div>
      </section>

      {/* ── Story ── */}
      <section className="bg-cream-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-40 flex-shrink-0">
              <div className="hidden lg:block w-px h-36 bg-gold-500" />
              <p className="font-sans text-xs text-gray-400 uppercase tracking-widest mt-4">
                Los Angeles · 2023
              </p>
            </div>
            <div className="flex-1 max-w-2xl">
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy-800 mb-6 leading-snug">
                Started by students. Built on real data.
              </h2>
              <p className="font-sans text-base text-gray-700 leading-relaxed mb-5">
                In 2023, Adrian Erlikhman, Ryan Erlikhman, and Yonatan Zarur were watching
                antisemitism rise in their LA neighborhoods and on their campus. They couldn't
                find a single place that mapped it clearly — where it happened, how often, what
                patterns were forming. So they built one.
              </p>
              <p className="font-sans text-base text-gray-700 leading-relaxed mb-5">
                SafeJew received a $1,000 Teen Innovation Grant from JFEDLA and was distributed
                across their Greater LA network through the Community Security Initiative. This
                version is a full rebuild — faster, more rigorous, and free to use.
              </p>
              <Link
                href="/about"
                className="font-sans text-sm font-medium text-navy-600 hover:text-navy-800 underline transition-colors"
              >
                Read the full story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── What it does ── */}
      <section className="bg-white py-20 border-t border-cream-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-navy-800 mb-12">What SafeJew does</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <p className="font-sans text-xl font-bold text-gold-500 mb-3">01</p>
              <h3 className="font-sans font-semibold text-navy-800 mb-2">Tracks incidents</h3>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                Community reports, LAPD hate crime data, ADL audits, and FBI statistics — all
                in one place, mapped by neighborhood.
              </p>
            </div>
            <div>
              <p className="font-sans text-xl font-bold text-gold-500 mb-3">02</p>
              <h3 className="font-sans font-semibold text-navy-800 mb-2">Shows patterns</h3>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                Interactive maps and dashboards that reveal where incidents cluster, when they
                spike, and what categories dominate — by month, neighborhood, or campus.
              </p>
            </div>
            <div>
              <p className="font-sans text-xl font-bold text-gold-500 mb-3">03</p>
              <h3 className="font-sans font-semibold text-navy-800 mb-2">Connects community</h3>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                The campus tool surfaces nearby synagogues, Chabad houses, and Jewish
                community spaces so students know what's around them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Data sources ── */}
      <section className="bg-cream-100 py-16 border-t border-cream-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-navy-800 mb-8 text-center">
            Where the data comes from
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { abbr: 'ADL', full: 'Anti-Defamation League, Annual Audit' },
              { abbr: 'LAPD', full: 'LA Police Department, Hate Crime Reports' },
              { abbr: 'FBI', full: 'FBI Uniform Crime Reporting' },
              { abbr: 'CSI', full: 'JFEDLA Community Security Initiative' },
            ].map((s) => (
              <div key={s.abbr} className="bg-white border border-cream-200 rounded-lg p-4 text-center">
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-500 mb-1">
                  {s.abbr}
                </p>
                <p className="font-sans text-xs text-gray-500 leading-snug">{s.full}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-xs text-gray-400 text-center mt-5 max-w-lg mx-auto">
            References to these organizations do not imply formal partnership or endorsement.
          </p>
        </div>
      </section>

      {/* ── Campus tool CTA ── */}
      <section className="bg-navy-800 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-400 mb-4">
            Free Tool
          </p>
          <h2 className="font-serif text-3xl font-bold text-white mb-5 leading-snug">
            SafeJew for Campus
          </h2>
          <p className="font-sans text-base text-white/65 leading-relaxed mb-8 max-w-xl mx-auto">
            Look up a campus — UCLA, USC, wherever you are — and see local antisemitism data,
            nearby synagogues, Chabad houses, and Jewish community spaces. No account needed.
          </p>
          <Link
            href="/campus"
            className="inline-flex items-center justify-center bg-gold-500 text-white px-7 py-3.5 rounded font-sans font-semibold text-sm hover:bg-gold-600 transition-colors"
          >
            Try the Campus Tool
          </Link>
        </div>
      </section>

      {/* ── Safety resources strip ── */}
      <section className="bg-white py-14 border-t border-cream-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy-800 mb-2">
                Safety resources
              </h2>
              <p className="font-sans text-sm text-gray-600 leading-relaxed max-w-md">
                Krav Maga studios, security organizations, legal help, emergency contacts,
                and mental health support for the LA Jewish community.
              </p>
            </div>
            <Link
              href="/safety"
              className="flex-none inline-flex items-center justify-center border border-navy-200 text-navy-700 px-6 py-3 rounded font-sans font-semibold text-sm hover:bg-cream-50 transition-colors"
            >
              View Resources
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
