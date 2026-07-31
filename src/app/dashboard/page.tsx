import type { Metadata } from 'next';
import Link from 'next/link';
import StatsCard from '@/components/dashboard/StatsCard';
import AnnualBarChart from '@/components/dashboard/AnnualBarChart';
import {
  NATIONAL_ADL,
  LA_COUNTY_ANTI_JEWISH,
  CALIFORNIA_ANTI_JEWISH,
  LA_COUNTY_CONTEXT,
  SOURCES,
  DATA_COMPILED,
  pctChange,
} from '@/data/hate-crime-stats';

export const metadata: Metadata = {
  title: 'Antisemitism Data Dashboard',
  description:
    'Verified antisemitism and hate-crime data for Los Angeles, California, and the United States, compiled from ADL, LA County, California DOJ, and FBI sources.',
};

const nationalLatest = NATIONAL_ADL[NATIONAL_ADL.length - 1];
const laLatest = LA_COUNTY_ANTI_JEWISH[LA_COUNTY_ANTI_JEWISH.length - 1];
const caLatest = CALIFORNIA_ANTI_JEWISH[CALIFORNIA_ANTI_JEWISH.length - 1];
const caPrev = CALIFORNIA_ANTI_JEWISH[CALIFORNIA_ANTI_JEWISH.length - 2];
const laFirst = LA_COUNTY_ANTI_JEWISH[0];

export default function DashboardPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-navy-800 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-10 h-0.5 bg-gold-500 mb-5" aria-hidden="true" />
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight">
            Antisemitism Data Dashboard
          </h1>
          <p className="mt-3 text-base text-blue-100/70 font-sans max-w-2xl leading-relaxed">
            Verified antisemitism and hate-crime data for Los Angeles, California, and the
            United States — compiled from official reporting by the ADL, the LA County
            Commission on Human Relations, the California Department of Justice, and the FBI.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-400/30 rounded px-2.5 py-1 text-xs text-emerald-100/90 font-sans">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            Verified official data · compiled {DATA_COMPILED}
          </p>
        </div>
      </section>

      <section className="bg-cream-50 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              label="U.S. incidents (2024)"
              value={nationalLatest.value.toLocaleString()}
              change="ADL — highest in 46 years"
              positive={false}
            />
            <StatsCard
              label="Anti-Jewish · LA County (2024)"
              value={laLatest.value}
              change="2nd-highest in 44 years"
              positive={false}
            />
            <StatsCard
              label="Anti-Jewish · California (2024)"
              value={caLatest.value}
              change={`${pctChange(caPrev.value, caLatest.value) >= 0 ? '+' : ''}${pctChange(caPrev.value, caLatest.value)}% vs 2023 · CA DOJ`}
              positive={false}
            />
            <StatsCard
              label="Share of LA religious hate crime"
              value={`${LA_COUNTY_CONTEXT.antiJewishShareOfReligious2024}%`}
              change="targets Jewish community"
            />
          </div>

          {/* National trend */}
          <div className="bg-white border border-cream-200 rounded-lg shadow-sm p-6">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <h2 className="font-serif text-lg font-semibold text-navy-800">
                U.S. antisemitic incidents, by year
              </h2>
              <span className="font-sans text-xs text-gray-400">ADL Audit of Antisemitic Incidents</span>
            </div>
            <p className="font-sans text-xs text-gray-400 mt-1 mb-5">
              Reported antisemitic assault, harassment, and vandalism nationwide. Incidents rose
              {' '}{pctChange(NATIONAL_ADL[0].value, nationalLatest.value)}% from 2022 to 2024, the
              highest total in the Audit&apos;s 46-year history.
            </p>
            <AnnualBarChart data={NATIONAL_ADL} unitLabel="incidents" />
          </div>

          {/* LA County + California */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-cream-200 rounded-lg shadow-sm p-6">
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <h2 className="font-serif text-lg font-semibold text-navy-800">
                  Anti-Jewish hate crimes · LA County
                </h2>
                <span className="font-sans text-xs text-gray-400">LA County Commission on Human Relations</span>
              </div>
              <p className="font-sans text-xs text-gray-400 mt-1 mb-5">
                Anti-Jewish hate crimes reported across Los Angeles County. 2023 was the highest
                ever recorded; 2024 the second-highest in 44 years.
              </p>
              <AnnualBarChart data={LA_COUNTY_ANTI_JEWISH} unitLabel="hate crimes" />
            </div>

            <div className="bg-white border border-cream-200 rounded-lg shadow-sm p-6">
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <h2 className="font-serif text-lg font-semibold text-navy-800">
                  Anti-Jewish hate crimes · California
                </h2>
                <span className="font-sans text-xs text-gray-400">California DOJ</span>
              </div>
              <p className="font-sans text-xs text-gray-400 mt-1 mb-5">
                Statewide anti-Jewish bias hate-crime events reported to the California Department
                of Justice.
              </p>
              <AnnualBarChart data={CALIFORNIA_ANTI_JEWISH} unitLabel="hate crimes" />
            </div>
          </div>

          {/* LA County context strip */}
          <div className="bg-white border border-cream-200 rounded-lg shadow-sm p-6">
            <h2 className="font-serif text-lg font-semibold text-navy-800 mb-1">
              Los Angeles County — 2024 in context
            </h2>
            <p className="font-sans text-xs text-gray-400 mb-6">
              From the LA County Commission on Human Relations 2024 Hate Crime Report
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border border-cream-200 rounded-lg px-5 py-4">
                <p className="font-serif text-2xl font-bold text-navy-800 leading-none mb-1">
                  {LA_COUNTY_CONTEXT.antiIsraeli2024}
                </p>
                <p className="font-sans text-sm font-semibold text-navy-700">Anti-Israeli hate crimes</p>
                <p className="font-sans text-xs text-gray-500 mt-1">
                  Up from {LA_COUNTY_CONTEXT.antiIsraeli2023} in 2023 — the highest the Commission
                  has ever recorded.
                </p>
              </div>
              <div className="border border-cream-200 rounded-lg px-5 py-4">
                <p className="font-serif text-2xl font-bold text-navy-800 leading-none mb-1">
                  {LA_COUNTY_CONTEXT.schoolBased2024}
                </p>
                <p className="font-sans text-sm font-semibold text-navy-700">School-based hate crimes</p>
                <p className="font-sans text-xs text-gray-500 mt-1">
                  Up from {LA_COUNTY_CONTEXT.schoolBased2023} in 2023 — the highest count ever
                  documented in the county.
                </p>
              </div>
              <div className="border border-cream-200 rounded-lg px-5 py-4">
                <p className="font-serif text-2xl font-bold text-navy-800 leading-none mb-1">
                  {LA_COUNTY_CONTEXT.antiJewishShareOfReligious2024}%
                </p>
                <p className="font-sans text-sm font-semibold text-navy-700">Of religious hate crime</p>
                <p className="font-sans text-xs text-gray-500 mt-1">
                  Of all religion-motivated hate crimes in LA County targeted the Jewish community.
                </p>
              </div>
            </div>
          </div>

          {/* Community reports note */}
          <div className="bg-navy-50/60 border border-navy-100 rounded-lg p-5">
            <p className="font-sans text-sm text-navy-800 leading-relaxed">
              <span className="font-semibold">A note on this data.</span> The figures above are
              official aggregate counts of <em>reported</em> hate crimes and incidents. Under-reporting
              is significant, so real-world totals are higher. Community-submitted reports are tracked
              separately and shown, clearly labeled, on the{' '}
              <Link href="/map" className="text-navy-600 underline hover:text-navy-800">
                incident map
              </Link>
              .
            </p>
          </div>

          {/* Predictive modeling roadmap */}
          <div className="bg-white border border-cream-200 rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="font-serif text-lg font-semibold text-navy-800">
                Predictive Risk Modeling
              </h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-sans text-xs font-semibold bg-cream-100 text-gray-500 border border-cream-200 uppercase tracking-wide">
                Planned
              </span>
            </div>
            <p className="font-sans text-sm text-gray-600 leading-relaxed max-w-2xl">
              A machine-learning model for incident risk forecasting is planned for a future
              release. It will analyze historical patterns to identify elevated-risk windows and
              geographic clusters, enabling community organizations and campus security teams to
              allocate resources proactively.
            </p>
            <p className="font-sans text-xs text-gray-400 mt-3 font-medium uppercase tracking-wide">
              Roadmap — not yet available
            </p>
          </div>

          {/* Sources */}
          <div className="bg-white border border-cream-200 rounded-lg shadow-sm p-6">
            <h2 className="font-serif text-lg font-semibold text-navy-800 mb-4">Sources</h2>
            <ul className="space-y-3">
              {SOURCES.map((s) => (
                <li key={s.key} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm font-medium text-navy-700 hover:text-navy-900 underline underline-offset-2 flex-none"
                  >
                    {s.name}
                  </a>
                  <span className="font-sans text-xs text-gray-500">{s.note}</span>
                </li>
              ))}
            </ul>
            <p className="font-sans text-xs text-gray-400 mt-4">
              Figures compiled {DATA_COMPILED} from the most recent published reports. References
              to these organizations do not imply partnership or endorsement.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
