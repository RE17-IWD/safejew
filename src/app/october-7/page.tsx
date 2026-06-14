'use client';

import Link from 'next/link';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  TooltipProps,
} from 'recharts';

// ─── Chart colors (hex — Recharts does not understand Tailwind class names) ──
const C = {
  navy:       '#0e1855',   // navy-800
  navyMid:    '#162270',   // navy-700
  navyLight:  '#1d2f8f',   // navy-600
  navyPale:   '#4a5cf5',   // navy-500
  gold:       '#d97706',   // gold-500
  goldLight:  '#f59e0b',   // gold-400
  red:        '#dc2626',   // spike highlight
  green:      '#059669',   // LA color
  cream:      '#ebe8e0',   // cream-200
  gray:       '#9ca3af',
  grayDark:   '#6b7280',
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const NATIONAL_ANNUAL = [
  { year: '2019', incidents: 2107 },
  { year: '2020', incidents: 2026 },
  { year: '2021', incidents: 2717 },
  { year: '2022', incidents: 3697 },
  { year: '2023', incidents: 8873 },
];

const CAMPUS_ANNUAL = [
  { year: '2021', incidents: 61 },
  { year: '2022', incidents: 219 },
  { year: '2023', incidents: 922 },
];

const LA_ANNUAL = [
  { year: '2020', incidents: 47 },
  { year: '2021', incidents: 71 },
  { year: '2022', incidents: 86 },
  { year: '2023', incidents: 165 },
];

// Monthly trend — annual totals are ADL-verified (2022=3,697 | 2023=8,873 | Oct–Dec 2023=5,204)
// Monthly distributions within each year are illustrative approximations of those verified totals.
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

const ATTACK_TIMELINE = [
  { time: '6:29 AM', event: 'Hamas breaches the Gaza perimeter fence at 29+ points simultaneously' },
  { time: '6:30 AM', event: 'Rocket barrages launched at Israeli cities as cover for the ground invasion' },
  { time: '6:30 – 7 AM', event: '~3,000 Hamas fighters storm kibbutzim: Be\'eri, Nir Oz, Kfar Aza, Re\'im, and others' },
  { time: '6:30 – 9 AM', event: 'Nova music festival massacre — 360+ festivalgoers killed; mass kidnappings begin' },
  { time: 'Morning', event: 'Kibbutz Be\'eri falls — over 100 residents killed; Nir Oz loses 25% of its population dead or taken hostage' },
  { time: 'All day', event: '251 people taken hostage into Gaza — citizens from 40+ countries including the US, Thailand, and Argentina' },
  { time: 'By nightfall', event: '~1,200 people killed — the deadliest day for Jews since the Holocaust' },
];

const CAMPUS_INCIDENTS = [
  {
    school: 'Cooper Union, NYC',
    date: 'Oct 25, 2023',
    what: 'Jewish students locked inside the library as pro-Hamas protesters beat on the windows and doors',
  },
  {
    school: 'Cornell University',
    date: 'Oct 2023',
    what: 'Anonymous online threats to "shoot up" the Jewish student center and "slit the throats" of Jewish students',
  },
  {
    school: 'Harvard University',
    date: 'Oct 7–8, 2023',
    what: '34 student groups signed a letter blaming Israel solely for the attack before body counts were known; Jewish students reported being physically confronted',
  },
  {
    school: 'Columbia University',
    date: 'Spring 2024',
    what: 'Students barricaded Hamilton Hall; Columbia\'s own Hillel told Jewish students it was unsafe to come to campus',
  },
  {
    school: 'UCLA',
    date: 'May 2024',
    what: 'Encampment created a de-facto exclusion zone; a Jewish student was physically assaulted attempting to reach the university library',
  },
  {
    school: 'USC',
    date: 'Spring 2024',
    what: 'University canceled its main commencement ceremony citing safety concerns; Jewish students received targeted harassment',
  },
];

const LA_INCIDENTS = [
  {
    date: 'Oct 18, 2023',
    location: 'Adas Torah Synagogue, Pico-Robertson',
    what: 'Pro-Palestinian demonstrators blocked Jewish residents from entering the synagogue to register for an Israel housing program. Attendees were surrounded and shouted at.',
  },
  {
    date: 'Oct–Nov 2023',
    location: 'Pico-Robertson neighborhood',
    what: 'Multiple business windows smashed; mezuzot ripped from doorposts of Jewish homes and apartments across the neighborhood.',
  },
  {
    date: 'Oct–Nov 2023',
    location: 'Multiple LA synagogues',
    what: 'Swastika graffiti appeared on at least five synagogues across LA within six weeks of the October 7 attack.',
  },
  {
    date: 'May 2024',
    location: 'UCLA campus, Westwood',
    what: 'Pro-Palestinian encampment established on Royce Quad; Jewish students confronted and prevented from crossing. A masked group attacked the encampment perimeter in a separate overnight incident.',
  },
];

// ─── Custom tooltips ──────────────────────────────────────────────────────────

function DarkTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#0e1855', border: '1px solid #162270', borderRadius: 6, padding: '10px 14px' }}>
      <p style={{ color: '#f59e0b', fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{label}</p>
      <p style={{ color: '#ffffff', fontSize: 13 }}>{payload[0].value?.toLocaleString()} incidents</p>
    </div>
  );
}

function MonthlyTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const isSpike = (payload[0].value ?? 0) > 800;
  return (
    <div style={{ background: '#0e1855', border: `1px solid ${isSpike ? '#dc2626' : '#162270'}`, borderRadius: 6, padding: '10px 14px' }}>
      <p style={{ color: '#f59e0b', fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{label}</p>
      <p style={{ color: '#ffffff', fontSize: 13 }}>{payload[0].value?.toLocaleString()} incidents</p>
      {isSpike && <p style={{ color: '#fca5a5', fontSize: 11, marginTop: 4 }}>Post-Oct 7 surge</p>}
    </div>
  );
}

// ─── Small reusable pieces ────────────────────────────────────────────────────

function Eyebrow({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <p className={`font-sans text-xs font-semibold uppercase tracking-widest mb-2 ${light ? 'text-gold-400' : 'text-gold-500'}`}>
      {text}
    </p>
  );
}

function SectionHeading({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className="mb-8">
      <Eyebrow text={eyebrow} light={light} />
      <h2 className={`font-serif text-2xl lg:text-3xl font-bold leading-snug ${light ? 'text-white' : 'text-navy-800'}`}>
        {title}
      </h2>
    </div>
  );
}

function DataNote({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`font-sans text-xs mt-3 leading-relaxed ${light ? 'text-blue-200/40' : 'text-gray-400'}`}>
      {children}
    </p>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function October7Page() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="bg-navy-900 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-12 h-0.5 bg-gold-500 mb-6" aria-hidden="true" />
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-400 mb-4">
            October 7, 2023
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 max-w-3xl">
            The deadliest day for Jews since the Holocaust — and what happened to American Jews in the months that followed
          </h1>
          <p className="font-sans text-base text-blue-100/70 max-w-2xl leading-relaxed mb-12">
            On October 7, 2023, Hamas invaded southern Israel in the largest massacre of Jewish people since World War II.
            The attack sent shockwaves across the United States — and triggered the worst surge in antisemitic incidents
            ever recorded on American soil.
          </p>
          {/* Three headline stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="border border-navy-700 rounded-lg px-6 py-6">
              <p className="font-serif text-5xl font-bold text-gold-400 mb-2">1,200</p>
              <p className="font-sans text-sm text-white font-semibold">People killed in Israel</p>
              <p className="font-sans text-xs text-blue-200/50 mt-1">The deadliest day for Jews since the Holocaust</p>
            </div>
            <div className="border border-navy-700 rounded-lg px-6 py-6">
              <p className="font-serif text-5xl font-bold text-gold-400 mb-2">251</p>
              <p className="font-sans text-sm text-white font-semibold">People taken hostage into Gaza</p>
              <p className="font-sans text-xs text-blue-200/50 mt-1">Citizens from 40+ countries, including Americans</p>
            </div>
            <div className="border border-red-900/40 rounded-lg px-6 py-6 bg-red-950/20">
              <p className="font-serif text-5xl font-bold text-red-400 mb-2">8,873</p>
              <p className="font-sans text-sm text-white font-semibold">US antisemitic incidents in 2023</p>
              <p className="font-sans text-xs text-blue-200/50 mt-1">Highest on record since ADL began tracking in 1979</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Attack facts & timeline ── */}
      <section className="bg-cream-50 py-20 border-b border-cream-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What Happened" title="October 7, 2023 — The Attack" />

          {/* Key attack numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {[
              { n: '29+', label: 'Points where the Gaza border fence was breached' },
              { n: '~3,000', label: 'Hamas fighters in the initial assault wave' },
              { n: '360+', label: 'Killed at the Nova music festival alone' },
              { n: '40+', label: 'Countries represented among the hostages' },
            ].map(({ n, label }) => (
              <div key={n} className="bg-white border border-cream-200 rounded-lg px-4 py-5">
                <p className="font-serif text-3xl font-bold text-navy-700 mb-1">{n}</p>
                <p className="font-sans text-xs text-gray-600 leading-snug">{label}</p>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
            Timeline of Events
          </h3>
          <div className="relative">
            <div className="absolute left-[90px] sm:left-[108px] top-0 bottom-0 w-px bg-cream-300" aria-hidden="true" />
            <div className="space-y-6">
              {ATTACK_TIMELINE.map(({ time, event }) => (
                <div key={time} className="flex gap-6 items-start">
                  <div className="w-[82px] sm:w-[100px] flex-shrink-0 text-right">
                    <span className="font-sans text-xs font-semibold text-navy-600">{time}</span>
                  </div>
                  <div className="flex-shrink-0 w-4 flex items-center justify-center pt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-navy-600 border-2 border-white ring-1 ring-navy-300" />
                  </div>
                  <div className="flex-1 pb-1">
                    <p className="font-sans text-sm text-gray-700 leading-relaxed">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 bg-navy-800 rounded-lg px-6 py-5">
            <p className="font-sans text-sm text-blue-100/85 leading-relaxed">
              <span className="font-semibold text-gold-400">Who was taken hostage?</span>{' '}
              Of the 251 people abducted into Gaza, approximately 40% were non-Israeli — including
              citizens of the United States, Thailand, Argentina, Germany, France, and dozens of other
              nations. Many were foreign workers and tourists visiting the region. As of mid-2025,
              some hostages remain in Gaza after more than a year in captivity.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. National antisemitism surge ── */}
      <section className="bg-white py-20 border-b border-cream-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What happened to American Jews" title="A surge unlike anything on record" />
          <p className="font-sans text-sm text-gray-600 mb-8 leading-relaxed max-w-2xl">
            The ADL has tracked antisemitic incidents in the United States since 1979. The 2023 total
            shattered every prior record — not just post-October-7, but also the years that preceded it,
            which were themselves record-setting. What happened after October 7 hit an already-rising baseline.
          </p>

          <div className="bg-cream-50 border border-cream-200 rounded-lg p-6 mb-6">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={NATIONAL_ANNUAL} barCategoryGap="35%" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.cream} vertical={false} />
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontFamily: 'var(--font-inter)', fontSize: 12, fill: C.grayDark }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontFamily: 'var(--font-inter)', fontSize: 11, fill: C.gray }}
                  tickFormatter={(v: number) => v.toLocaleString()}
                  width={55}
                />
                <Tooltip content={<DarkTooltip />} cursor={{ fill: 'rgba(14,24,85,0.05)' }} />
                <Bar dataKey="incidents" radius={[3, 3, 0, 0]}>
                  {NATIONAL_ANNUAL.map((entry) => (
                    <Cell
                      key={entry.year}
                      fill={entry.year === '2023' ? C.navy : C.navyPale}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <DataNote>
              Source: ADL Audit of Antisemitic Incidents. All values are ADL-published figures.
              2019–2022 included to show baseline trend.
            </DataNote>
          </div>

          {/* Pull-quote callout */}
          <div className="bg-navy-800 border-l-4 border-gold-500 rounded-r-lg px-6 py-5 max-w-2xl">
            <p className="font-sans text-base text-white leading-relaxed">
              &ldquo;In the three months after October 7, more antisemitic incidents were recorded than
              in all of 2021.&rdquo;
            </p>
            <p className="font-sans text-xs text-blue-200/60 mt-2">
              Oct–Dec 2023: 5,204 incidents &nbsp;|&nbsp; All of 2021: 2,717 incidents
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. Monthly timeline / area chart ── */}
      <section className="bg-cream-50 py-20 border-b border-cream-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Monthly Trend" title="The October 7 inflection point" />
          <p className="font-sans text-sm text-gray-600 mb-8 leading-relaxed max-w-2xl">
            The October 7 spike is visible as an almost-vertical wall of data. The Oct–Dec 2023
            period — just 86 days — accounts for 59% of the entire year&apos;s total. No comparable
            spike appears anywhere in the ADL&apos;s 45-year tracking record.
          </p>
          <div className="bg-white border border-cream-200 rounded-lg p-6">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={MONTHLY_TREND} margin={{ top: 20, right: 20, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.navy} stopOpacity={0.6} />
                    <stop offset="100%" stopColor={C.navy} stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={C.cream} vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontFamily: 'var(--font-inter)', fontSize: 10, fill: C.gray }}
                  interval={2}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontFamily: 'var(--font-inter)', fontSize: 11, fill: C.gray }}
                  tickFormatter={(v: number) => v.toLocaleString()}
                  width={55}
                />
                <Tooltip content={<MonthlyTooltip />} />
                <ReferenceLine
                  x="Oct '23"
                  stroke={C.gold}
                  strokeWidth={2}
                  strokeDasharray="5 3"
                  label={{
                    value: 'October 7 Attack',
                    position: 'insideTopRight',
                    fill: C.gold,
                    fontSize: 11,
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 700,
                    dy: -6,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="n"
                  stroke={C.navy}
                  strokeWidth={2}
                  fill="url(#areaGrad)"
                  dot={false}
                  activeDot={{ r: 4, fill: C.navy, stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
            <DataNote>
              Annual totals are ADL-verified (2022: 3,697 | 2023: 8,873 | Oct–Dec 2023: 5,204).
              Monthly distributions within each year are illustrative approximations of those verified totals,
              not individually ADL-certified figures.
            </DataNote>
          </div>
        </div>
      </section>

      {/* ── 5. Campus section ── */}
      <section className="bg-navy-800 py-20 border-b border-navy-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="On Campus" title="Jewish students faced a new front" light />
          <p className="font-sans text-sm text-blue-100/75 mb-10 max-w-2xl leading-relaxed">
            No segment of American Jewry was hit harder, proportionally, than college students.
            Campus antisemitic incidents spiked 321% in a single year — from 219 in 2022 to 922 in 2023.
            Hillel International found that 1 in 4 Jewish college students reported experiencing antisemitism
            in 2023-24 — the highest rate since modern tracking began.
          </p>

          {/* Campus chart + stats side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <div className="bg-navy-900/50 border border-navy-700 rounded-lg p-5">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-blue-200/60 mb-4">
                Campus Antisemitic Incidents
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={CAMPUS_ANNUAL} barCategoryGap="40%" margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" vertical={false} />
                  <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontFamily: 'var(--font-inter)', fontSize: 12, fill: '#9ca3af' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontFamily: 'var(--font-inter)', fontSize: 11, fill: '#6b7280' }}
                    width={45}
                  />
                  <Tooltip content={<DarkTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                  <Bar dataKey="incidents" radius={[3, 3, 0, 0]}>
                    {CAMPUS_ANNUAL.map((entry) => (
                      <Cell
                        key={entry.year}
                        fill={entry.year === '2023' ? C.goldLight : C.navyLight}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <DataNote light>Source: ADL Campus Antisemitism Report 2023. All values ADL-published.</DataNote>
            </div>

            <div className="space-y-4">
              {[
                { n: '922', label: 'Campus incidents in 2023', sub: 'Up from 219 in 2022 and just 61 in 2021' },
                { n: '+321%', label: 'Year-over-year increase', sub: 'Largest single-year campus spike on record' },
                { n: '1 in 4', label: 'Jewish college students reported experiencing antisemitism', sub: 'Hillel International survey, 2023–24 academic year' },
              ].map(({ n, label, sub }) => (
                <div key={n} className="bg-navy-900/50 border border-navy-700 rounded-lg px-5 py-5">
                  <p className="font-serif text-3xl font-bold text-gold-400 mb-1">{n}</p>
                  <p className="font-sans text-sm text-white font-semibold">{label}</p>
                  <p className="font-sans text-xs text-blue-200/50 mt-1">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* High-profile campus incidents */}
          <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-400 mb-5">
            High-Profile Campus Incidents, 2023–2024
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {CAMPUS_INCIDENTS.map(({ school, date, what }) => (
              <div key={school} className="bg-navy-900/60 border border-navy-700 rounded-lg px-5 py-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-sans text-sm font-bold text-white">{school}</p>
                  <p className="font-sans text-xs text-blue-200/50 whitespace-nowrap flex-shrink-0">{date}</p>
                </div>
                <p className="font-sans text-xs text-blue-100/70 leading-relaxed">{what}</p>
              </div>
            ))}
          </div>

          <div className="bg-navy-900/60 border border-navy-600 rounded-lg px-6 py-5">
            <p className="font-sans text-sm text-blue-100/80 leading-relaxed">
              This is precisely why the campus layer of SafeJew exists. 850+ Hillel communities across
              the country need localized incident tracking, anonymous reporting tools, and administrator
              dashboards — not national aggregate statistics published months after the fact.{' '}
              <Link href="/campus" className="text-gold-400 underline hover:text-gold-300">
                See the campus module →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. Los Angeles section ── */}
      <section className="bg-cream-100 py-20 border-b border-cream-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Greater Los Angeles" title="In Los Angeles" />
          <p className="font-sans text-sm text-gray-600 mb-10 leading-relaxed max-w-2xl">
            Los Angeles is home to the second-largest Jewish population of any city in the United States —
            approximately 600,000 people. The October 7 attack sent immediate ripples through the community.
            Anti-Jewish hate incidents nearly doubled in a single year, and the incidents that followed were
            among the most brazen in the city&apos;s modern history.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white border border-cream-200 rounded-lg p-5">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                LA Anti-Jewish Hate Incidents
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={LA_ANNUAL} barCategoryGap="40%" margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.cream} vertical={false} />
                  <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontFamily: 'var(--font-inter)', fontSize: 12, fill: C.grayDark }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontFamily: 'var(--font-inter)', fontSize: 11, fill: C.gray }}
                    width={40}
                  />
                  <Tooltip content={<DarkTooltip />} cursor={{ fill: 'rgba(14,24,85,0.05)' }} />
                  <Bar dataKey="incidents" radius={[3, 3, 0, 0]}>
                    {LA_ANNUAL.map((entry) => (
                      <Cell
                        key={entry.year}
                        fill={entry.year === '2023' ? C.green : '#6ee7b7'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <DataNote>
                Source: ADL Pacific Southwest region / LAPD Annual Crime Statistics. ADL-cited figures.
              </DataNote>
            </div>

            <div className="space-y-4">
              <div className="bg-white border border-cream-200 rounded-lg px-5 py-5">
                <p className="font-serif text-4xl font-bold text-navy-700 mb-1">+92%</p>
                <p className="font-sans text-sm font-semibold text-navy-800">Increase in LA anti-Jewish hate incidents</p>
                <p className="font-sans text-xs text-gray-500 mt-1">86 (2022) → 165 (2023). Source: ADL Pacific Southwest / LAPD.</p>
              </div>
              <div className="bg-white border border-cream-200 rounded-lg px-5 py-5">
                <p className="font-sans text-sm text-gray-700 leading-relaxed">
                  Los Angeles&apos; Jewish community is concentrated in neighborhoods like Pico-Robertson,
                  Westwood, Encino, Beverly Hills, and Brentwood — all within a compact metro corridor.
                  SafeJew&apos;s map covers the full Greater LA metro with searchable incident pins,
                  neighborhood filters, and integrations with both LAPD data and community-sourced reports.
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

          {/* LA incident cards */}
          <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">
            Documented LA Incidents, 2023–2024
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LA_INCIDENTS.map(({ date, location, what }) => (
              <div key={location} className="bg-white border border-cream-200 rounded-lg px-5 py-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-sans text-sm font-bold text-navy-700">{location}</p>
                  <p className="font-sans text-xs text-gray-400 whitespace-nowrap flex-shrink-0">{date}</p>
                </div>
                <p className="font-sans text-xs text-gray-600 leading-relaxed">{what}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Proportion section ── */}
      <section className="bg-white py-20 border-b border-cream-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Context" title="A disproportionate burden" />
          <p className="font-sans text-sm text-gray-600 mb-10 leading-relaxed max-w-2xl">
            Even before October 7, Jews were already the most targeted religious group for hate crimes
            in the United States — every single year. The FBI&apos;s annual hate crime statistics have
            shown this consistently for decades. October 7 didn&apos;t create that reality. It amplified it.
          </p>

          {/* Proportion visual */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-2">
              <span className="font-sans text-xs text-gray-500 w-36 text-right">Jews (~2% of US pop.)</span>
              <div className="flex-1 bg-cream-200 rounded-full h-8 overflow-hidden relative">
                <div
                  className="h-full rounded-full bg-navy-700 flex items-center justify-end pr-3"
                  style={{ width: '57%' }}
                >
                  <span className="font-sans text-xs font-bold text-white">57% of religious hate crimes</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-sans text-xs text-gray-500 w-36 text-right">All other religions (98%)</span>
              <div className="flex-1 bg-cream-200 rounded-full h-8 overflow-hidden">
                <div
                  className="h-full rounded-full bg-cream-300 flex items-center justify-end pr-3"
                  style={{ width: '43%' }}
                >
                  <span className="font-sans text-xs font-semibold text-gray-600">43%</span>
                </div>
              </div>
            </div>
            <p className="font-sans text-xs text-gray-400 mt-3">
              Source: FBI Hate Crime Statistics (2022). Jews are ~2% of the US population but account
              for approximately 57% of all religiously-motivated hate crime victims.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                n: '~2%',
                label: 'of the US population is Jewish',
                sub: 'Approximately 7.5 million Americans identify as Jewish',
              },
              {
                n: '~57%',
                label: 'of religious hate crime victims are Jewish',
                sub: 'FBI Hate Crime Statistics — consistent finding every year since 1991',
              },
              {
                n: '#1',
                label: 'Most targeted religious group for hate crimes in the US',
                sub: 'Every year since the FBI began tracking in 1991, without exception',
              },
            ].map(({ n, label, sub }) => (
              <div key={n} className="border border-cream-200 rounded-lg px-5 py-5">
                <p className="font-serif text-4xl font-bold text-navy-700 mb-2">{n}</p>
                <p className="font-sans text-sm font-semibold text-navy-800">{label}</p>
                <p className="font-sans text-xs text-gray-500 mt-1">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Why it matters / mission ── */}
      <section className="bg-cream-50 py-20 border-b border-cream-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Why It Matters" title="The case for real-time safety data infrastructure" />
          <div className="space-y-4 font-sans text-base text-gray-700 leading-relaxed mb-10">
            <p>
              October 7 made something undeniable: antisemitism is not episodic — it is structural.
              It operates at a sustained background level and surges in response to geopolitical events
              in ways that Jewish community organizations were not equipped to track, communicate, or
              respond to in real time.
            </p>
            <p>
              The ADL&apos;s annual audit is indispensable. But it is published months after the events
              it documents, aggregated at the national level, and too coarse to be actionable for a
              synagogue security director deciding whether to hire additional staff next weekend, or a
              Hillel director trying to know whether the campus is safe this week.
            </p>
            <p>
              SafeJew exists to close that gap. Community-sourced reporting with verified law enforcement
              integration. A searchable map that shows patterns at the neighborhood level — not just
              annual totals. Anonymous reporting for students who fear retaliation. Deployed
              per-campus, per-city, per-community — at the level where decisions actually get made.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/campus"
              className="inline-flex items-center justify-center bg-navy-700 text-white px-6 py-3 rounded font-sans font-semibold text-sm hover:bg-navy-800 transition-colors"
            >
              SafeJew for Campus
            </Link>
            <Link
              href="/map"
              className="inline-flex items-center justify-center border border-navy-700 text-navy-700 px-6 py-3 rounded font-sans font-semibold text-sm hover:bg-navy-50 transition-colors"
            >
              Explore the LA Map
            </Link>
          </div>
        </div>
      </section>

      {/* ── 9. Sources / data integrity footer ── */}
      <section className="bg-cream-100 py-12 border-t border-cream-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">
            Sources & Data Integrity
          </p>
          <ul className="space-y-3 font-sans text-xs text-gray-500 leading-relaxed">
            <li>
              <span className="font-semibold text-gray-600">ADL-verified annual totals</span> —
              National: 2,107 (2019), 2,026 (2020), 2,717 (2021), 3,697 (2022), 8,873 (2023),
              5,204 (Oct–Dec 2023). Campus: 61 (2021), 219 (2022), 922 (2023). All from the
              ADL Audit of Antisemitic Incidents and ADL Campus Antisemitism Report.{' '}
              <a
                href="https://www.adl.org/resources/report/audit-antisemitic-incidents-2023"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-700"
              >
                adl.org/audit2023
              </a>
            </li>
            <li>
              <span className="font-semibold text-gray-600">LA figures</span> —
              47 (2020), 71 (2021), 86 (2022), 165 (2023): ADL Pacific Southwest region and
              LAPD Annual Crime Statistics, anti-Jewish hate incidents.
            </li>
            <li>
              <span className="font-semibold text-gray-600">Monthly chart</span> — Annual totals
              are ADL-verified. Monthly distributions within each year are illustrative approximations
              based on those verified totals and are not individually ADL-certified. Labeled accordingly.
            </li>
            <li>
              <span className="font-semibold text-gray-600">FBI religious hate crime proportion</span> —
              FBI Hate Crime Statistics 2022.{' '}
              <a
                href="https://ucr.fbi.gov/hate-crime"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-700"
              >
                ucr.fbi.gov/hate-crime
              </a>
            </li>
            <li>
              <span className="font-semibold text-gray-600">Campus incidents</span> — Individual
              incident descriptions sourced from contemporaneous news reporting (AP, NYT, LA Times),
              university statements, and ADL campus reports. They represent documented, publicly
              reported events.
            </li>
            <li>
              SafeJew&apos;s platform-level demonstration data (incident map, dashboard) is clearly
              labeled as demo data for product preview and does not represent verified real-world incidents.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
