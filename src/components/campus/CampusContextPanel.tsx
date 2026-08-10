import { ADL_CAMPUS } from '@/data/hate-crime-stats';

// National campus-antisemitism context (ADL). Shown on the campus browse view
// so the page carries real, cited scale even before a campus is selected.
export default function CampusContextPanel() {
  const stats = [
    {
      value: ADL_CAMPUS.incidents2025.toLocaleString(),
      label: 'Campus incidents in 2025',
      sub: `Down ${ADL_CAMPUS.pctDecrease2024to2025}% from ${ADL_CAMPUS.incidents2024.toLocaleString()} in 2024 as encampments faded (ADL)`,
    },
    {
      value: `${ADL_CAMPUS.studentsExperiencedPct}%`,
      label: 'Of Jewish students',
      sub: 'Experienced or witnessed antisemitism since the 2023-24 year began (ADL survey)',
    },
    {
      value: `${ADL_CAMPUS.reportCardAB2026}%`,
      label: 'Schools graded A or B',
      sub: `In ADL's 2026 Campus Report Card, up from ${Math.round(ADL_CAMPUS.reportCardAB2025)}% in 2025 as universities acted`,
    },
  ];

  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-500 mb-1 text-center">
        Why this matters
      </p>
      <h2 className="font-serif text-xl font-bold text-navy-800 mb-6 text-center">
        Campus antisemitism, by the numbers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-cream-200 rounded-lg px-5 py-5 text-center">
            <p className="font-serif text-3xl font-bold text-navy-800 leading-none mb-2">{s.value}</p>
            <p className="font-sans text-sm font-semibold text-navy-700">{s.label}</p>
            <p className="font-sans text-xs text-gray-500 mt-1.5 leading-relaxed">{s.sub}</p>
          </div>
        ))}
      </div>
      <p className="font-sans text-[11px] text-gray-400 mt-4 text-center">
        Source: ADL Audit of Antisemitic Incidents (2024 &amp; 2025), ADL campus climate survey, and
        the 2026 ADL Campus Antisemitism Report Card. References to ADL do not imply partnership or
        endorsement.
      </p>
    </div>
  );
}
