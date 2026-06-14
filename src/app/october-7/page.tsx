'use client';

import Link from 'next/link';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ReferenceLine,
  TooltipProps,
} from 'recharts';

// ─── Real ADL data (cited) ────────────────────────────────────────────────────

const NATIONAL_ANNUAL = [
  { year: '2021', incidents: 2717, real: true },
  { year: '2022', incidents: 3697, real: true },
  { year: '2023', incidents: 8873, real: true },
];

const CAMPUS_ANNUAL = [
  { year: '2022', incidents: 219, real: true },
  { year: '2023', incidents: 922, real: true },
];

const LA_ANNUAL = [
  { year: '2022', incidents: 86, real: true },
  { year: '2023', incidents: 165, real: true },
];

// Monthly trend — illustrative distribution based on ADL annual totals
// 2022 sum = 3,697 | 2023 sum = 8,873 | Oct–Dec 2023 sum = 5,204
const MONTHLY_TREND = [
  { month: "Jan '22", n: 285 }, { month: "Feb '22", n: 270 }, { month: "Mar '22", n: 300 },
  { month: "Apr '22", n: 320 }, { month: "May '22", n: 360 }, { month: "Jun '22", n: 295 },
  { month: "Jul '22", n: 285 }, { month: "Aug '22", n: 295 }, { month: "Sep '22", n: 310 },
  { month: "Oct '22", n: 345 }, { month: "Nov '22", n: 360 }, { month: "Dec '22", n: 272 },
  { month: "Jan '23", n: 375 }, { month: "Feb '23", n: 355 }, { month: "Mar '23", n: 385 },
  { month: "Apr '23", n: 415 }, { month: "May '23", n: 455 }, { month: "Jun '23", n: 395 },
  { month: "Jul '23", n: 390 }, { month: "Aug '23", n: 410 }, { month: "Sep '23", n: 489 },
  { month: "Oct '23", n: 2150 }, { month: "Nov '23", n: 1684 }, { month: "Dec '23", n: 1370 },
];

// ─── Custom tooltip ────────────────────────────────────────────────────────────

function SimpleTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-cream-200 rounded shadow-md px-3 py-2 font-sans text-sm">
      <p className="font-semibold text-navy-800 mb-0.5">{label}</p>
      <p className="text-gray-700">{payload[0].value?.toLocaleString()} incidents</p>
    </div>
  );
}

// ─── Stat highlight card ──────────────────────────────────────────────────────

function StatHighlight({
  value,
  label,
  sub,
  accent = false,
}: {
  value: string;
  label: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-lg px-6 py-6 border ${
        accent
          ? 'bg-navy-700 border-navy-600 text-white'
          : 'bg-white border-cream-200 text-navy-800'
      }`}
    >
      <p
        className={`font-serif text-4xl font-bold leading-none mb-2 ${
          accent ? 'text-gold-400' : 'text-navy-700'
        }`}
      >
        {value}
      </p>
      <p className={`font-sans text-sm font-semibold ${accent ? 'text-white' : 'text-navy-800'}`}>
        {label}
      </p>
      {sub && (
        <p className={`font-sans text-xs mt-1 ${accent ? 'text-blue-200/70' : 'text-gray-500'}`}>
          {sub}
        </p>
      )}
    </div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-500 mb-2">
        {eyebrow}
      </p>
      <h2 className="font-serif text-2xl lg:text-3xl font-bold text-navy-800 leading-snug">
        {title}
      </h2>
    </div>
  );
}

// ─── Data integrity note ──────────────────────────────────────────────────────

function DataNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-xs text-gray-400 mt-3 leading-relaxed">{children}</p>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function October7Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-12 h-0.5 bg-gold-500 mb-6" aria-hidden="true" />
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-400 mb-4">
            Data Report
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Before &amp; After October 7
          </h1>
          <p className="font-sans text-lg text-blue-100/80 max-w-2xl leading-relaxed">
            The Hamas attack of October 7, 2023 triggered the largest single-year surge in
            antisemitic incidents ever recorded in the United States. This page documents
            what the data shows — nationally, on college campuses, and in Greater Los Angeles.
          </p>
        </div>
      </section>

      {/* Opening context */}
      <section className="bg-cream-50 py-16 border-b border-cream-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-base text-gray-700 leading-relaxed mb-5">
            October 7, 2023 was not only a catastrophe in Israel — it was an inflection point
            for Jewish communities worldwide. In the weeks and months that followed, Jewish
            institutions, students, and individuals across the United States experienced
            antisemitism at a scale not seen in the modern era.
          </p>
          <p className="font-sans text-base text-gray-700 leading-relaxed">
            The Anti-Defamation League, which has tracked antisemitic incidents since 1979,
            recorded more incidents in the 86 days following October 7 than in all of 2022.
            Understanding this surge — its scale, its geography, and its concentration on
            college campuses — is exactly why platforms like SafeJew exist.
          </p>
        </div>
      </section>

      {/* Key stats */}
      <section className="bg-white py-16 border-b border-cream-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="The Numbers" title="What the ADL Data Shows" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-4">
            <StatHighlight
              value="8,873"
              label="US incidents in 2023"
              sub="Highest on record since ADL began tracking in 1979"
            />
            <StatHighlight
              value="+140%"
              label="Year-over-year increase"
              sub="From 3,697 in 2022 to 8,873 in 2023"
              accent
            />
            <StatHighlight
              value="5,204"
              label="Incidents in 86 days"
              sub="Oct 7 – Dec 31, 2023 alone — more than all of 2022"
            />
            <StatHighlight
              value="+321%"
              label="Campus incidents in 2023"
              sub="922 incidents on college campuses — up from ~219 in 2022"
              accent
            />
          </div>
          <p className="font-sans text-xs text-gray-400">
            Source:{' '}
            <a
              href="https://www.adl.org/resources/report/audit-antisemitic-incidents-2023"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600"
            >
              ADL Audit of Antisemitic Incidents 2023
            </a>
            {' '}and{' '}
            <a
              href="https://www.adl.org/resources/report/campus-antisemitism-report-2023"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600"
            >
              ADL Campus Antisemitism Report 2023
            </a>
            . All figures in this section are ADL-verified published data.
          </p>
        </div>
      </section>

      {/* National year-over-year chart */}
      <section className="bg-cream-50 py-16 border-b border-cream-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="National Picture" title="US Antisemitic Incidents, 2021–2023" />
          <p className="font-sans text-sm text-gray-600 mb-8 leading-relaxed max-w-2xl">
            The 2023 figure of 8,873 nearly doubled the 2022 record, which was itself the
            second-highest total since ADL tracking began. The trend was rising before
            October 7 — but the attack transformed a trend into a crisis.
          </p>
          <div className="bg-white border border-cream-200 rounded-lg p-6">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={NATIONAL_ANNUAL} barCategoryGap="35%">
                <CartesianGrid strokeDasharray="3 3" stroke="#ede9e2" vertical={false} />
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontFamily: 'var(--font-inter)', fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontFamily: 'var(--font-inter)', fontSize: 11, fill: '#9ca3af' }}
                  tickFormatter={(v) => v.toLocaleString()}
                />
                <Tooltip content={<SimpleTooltip />} />
                <Bar dataKey="incidents" fill="#1e3a5f" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <DataNote>
              Source: ADL Audit of Antisemitic Incidents. All values are ADL-published figures.
            </DataNote>
          </div>
        </div>
      </section>

      {/* Monthly trend */}
      <section className="bg-white py-16 border-b border-cream-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Monthly Trend" title="The October 7 Inflection Point" />
          <p className="font-sans text-sm text-gray-600 mb-8 leading-relaxed max-w-2xl">
            The Oct 7–Dec 31 period accounted for 5,204 of the year&apos;s 8,873 total incidents —
            nearly 59% of the annual total compressed into under three months. No comparable
            spike appears anywhere else in the modern record.
          </p>
          <div className="bg-white border border-cream-200 rounded-lg p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={MONTHLY_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ede9e2" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontFamily: 'var(--font-inter)', fontSize: 10, fill: '#9ca3af' }}
                  interval={2}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontFamily: 'var(--font-inter)', fontSize: 11, fill: '#9ca3af' }}
                  tickFormatter={(v) => v.toLocaleString()}
                />
                <Tooltip content={<SimpleTooltip />} />
                <ReferenceLine
                  x="Oct '23"
                  stroke="#c9941a"
                  strokeDasharray="4 2"
                  label={{
                    value: 'Oct 7, 2023',
                    fill: '#a37815',
                    fontSize: 11,
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 600,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="n"
                  stroke="#1e3a5f"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#1e3a5f' }}
                />
              </LineChart>
            </ResponsiveContainer>
            <DataNote>
              Illustrative monthly distribution — the October 7 spike and annual totals (3,697 in 2022;
              8,873 in 2023; 5,204 in Oct–Dec 2023) are ADL-verified published figures. Monthly
              breakdowns within each year are approximate illustrative distributions based on those
              ADL totals and are not individually ADL-verified.
            </DataNote>
          </div>
        </div>
      </section>

      {/* Campus section — highlighted for Hillel */}
      <section className="bg-navy-800 py-16 border-b border-navy-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-400 mb-2">
            On Campus
          </p>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-4 leading-snug">
            The Campus Crisis
          </h2>
          <p className="font-sans text-sm text-blue-100/75 mb-8 max-w-2xl leading-relaxed">
            No segment of the Jewish community was hit harder, proportionally, than college
            students. Campus antisemitic incidents spiked 321% in 2023 — to 922 documented
            incidents across American universities — with the vast majority occurring in the
            weeks following October 7. Jewish students faced harassment at protests, hostile
            classroom environments, vandalism of Jewish spaces, and coordinated social media
            targeting.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-navy-700 border border-navy-600 rounded-lg px-5 py-5">
              <p className="font-serif text-4xl font-bold text-gold-400 mb-1">922</p>
              <p className="font-sans text-sm text-white font-semibold">Campus incidents in 2023</p>
              <p className="font-sans text-xs text-blue-200/60 mt-1">Up from ~219 in 2022</p>
            </div>
            <div className="bg-navy-700 border border-navy-600 rounded-lg px-5 py-5">
              <p className="font-serif text-4xl font-bold text-gold-400 mb-1">+321%</p>
              <p className="font-sans text-sm text-white font-semibold">Year-over-year increase</p>
              <p className="font-sans text-xs text-blue-200/60 mt-1">Largest single-year campus spike on record</p>
            </div>
            <div className="bg-navy-700 border border-navy-600 rounded-lg px-5 py-5">
              <p className="font-serif text-4xl font-bold text-gold-400 mb-1">850+</p>
              <p className="font-sans text-sm text-white font-semibold">Hillel campuses nationally</p>
              <p className="font-sans text-xs text-blue-200/60 mt-1">Communities that need data infrastructure</p>
            </div>
          </div>
          <div className="bg-navy-700 border border-navy-600 rounded-lg px-6 py-5">
            <p className="font-sans text-sm text-blue-100/80 leading-relaxed">
              This is why the campus layer of SafeJew exists. 850+ Hillel communities need
              localized incident tracking, anonymous reporting, and administrator dashboards —
              not national aggregate statistics published months after the fact.{' '}
              <Link href="/campus" className="text-gold-400 underline hover:text-gold-300">
                See the campus module →
              </Link>
            </p>
          </div>
          <p className="font-sans text-xs text-blue-200/40 mt-4">
            Source: ADL Campus Antisemitism Report 2023. All figures in this section are ADL-published.
          </p>
        </div>
      </section>

      {/* LA picture */}
      <section className="bg-cream-50 py-16 border-b border-cream-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Greater Los Angeles" title="The Local Picture" />
          <p className="font-sans text-sm text-gray-600 mb-8 leading-relaxed max-w-2xl">
            Los Angeles has one of the largest Jewish populations of any city in the world.
            The October 7 spike hit LA hard. LAPD recorded 165 anti-Jewish hate incidents
            in 2023 — nearly double the 86 recorded in 2022. SafeJew was built to make this
            data visible, searchable, and useful to the community it affects.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border border-cream-200 rounded-lg p-6">
              <h3 className="font-sans text-sm font-semibold text-navy-800 mb-4 uppercase tracking-wide">
                LAPD Anti-Jewish Hate Incidents
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={LA_ANNUAL} barCategoryGap="40%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#ede9e2" vertical={false} />
                  <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontFamily: 'var(--font-inter)', fontSize: 12, fill: '#6b7280' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontFamily: 'var(--font-inter)', fontSize: 11, fill: '#9ca3af' }}
                  />
                  <Tooltip content={<SimpleTooltip />} />
                  <Bar dataKey="incidents" fill="#1e3a5f" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <DataNote>Source: LAPD Annual Crime Statistics. ADL-verified figures.</DataNote>
            </div>
            <div className="space-y-4">
              <div className="bg-white border border-cream-200 rounded-lg px-5 py-5">
                <p className="font-serif text-3xl font-bold text-navy-700 mb-1">+92%</p>
                <p className="font-sans text-sm font-semibold text-navy-800">
                  Increase in LA anti-Jewish hate incidents
                </p>
                <p className="font-sans text-xs text-gray-500 mt-1">
                  86 (2022) → 165 (2023). Source: LAPD.
                </p>
              </div>
              <div className="bg-white border border-cream-200 rounded-lg px-5 py-5">
                <p className="font-sans text-sm text-gray-700 leading-relaxed">
                  Los Angeles is home to the second-largest Jewish community in the United States.
                  SafeJew&apos;s map covers the full Greater LA metro — from Santa Monica to Encino,
                  Westwood to Koreatown — integrating LAPD and community-sourced reports in one
                  searchable platform.
                </p>
                <Link
                  href="/map"
                  className="inline-flex items-center mt-3 text-sm font-sans font-medium text-navy-600 hover:text-navy-800 transition-colors"
                >
                  Explore the LA incident map
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing / Mission */}
      <section className="bg-white py-16 border-b border-cream-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Why It Matters" title="The Case for Safety Data Infrastructure" />
          <div className="space-y-4 font-sans text-base text-gray-700 leading-relaxed mb-8">
            <p>
              What October 7 made undeniably clear is that antisemitism is not episodic — it
              is structural. It exists at a background level and surges in response to
              geopolitical events in ways that community organizations were not equipped to track,
              communicate, or respond to in real time.
            </p>
            <p>
              National statistics from the ADL are indispensable. But they are published
              annually, aggregated nationally, and arrive too late to be actionable for a
              synagogue security coordinator deciding whether to hire additional staff, or a
              Hillel director trying to assess whether students are safe this week.
            </p>
            <p>
              SafeJew exists to close that gap. Community-sourced reporting. Verified data
              from law enforcement and advocacy organizations. A map that shows patterns, not
              just numbers. Deployed per-campus, per-city, per-community — at the level where
              decisions actually get made.
            </p>
          </div>
          <Link
            href="/campus"
            className="inline-flex items-center justify-center bg-navy-600 text-white px-6 py-3 rounded font-sans font-semibold text-sm hover:bg-navy-700 transition-colors"
          >
            See SafeJew for Campus
          </Link>
        </div>
      </section>

      {/* Source footer */}
      <section className="bg-cream-100 py-10 border-t border-cream-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Sources & Data Integrity
          </p>
          <ul className="space-y-2 font-sans text-xs text-gray-500 leading-relaxed">
            <li>
              <span className="font-semibold text-gray-600">ADL Annual figures</span> —
              3,697 (2022), 8,873 (2023), 5,204 (Oct–Dec 2023), 2,717 (2021), 922 campus
              incidents (2023): ADL-published, cited to the ADL Audit of Antisemitic
              Incidents 2023 and ADL Campus Antisemitism Report 2023.{' '}
              <a href="https://www.adl.org/audit2023" target="_blank" rel="noopener noreferrer" className="underline">
                adl.org/audit2023
              </a>
            </li>
            <li>
              <span className="font-semibold text-gray-600">LA figures</span> — 86 (2022),
              165 (2023): LAPD Annual Crime Statistics, anti-Jewish hate incidents.
            </li>
            <li>
              <span className="font-semibold text-gray-600">Monthly chart</span> — Annual
              totals are ADL-verified. Monthly distributions within each year are
              illustrative approximations based on those ADL totals and are not individually
              verified. Labeled accordingly.
            </li>
            <li>
              SafeJew&apos;s platform-level data is demonstration data for product preview and
              is clearly labeled as such on the map and dashboard.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
