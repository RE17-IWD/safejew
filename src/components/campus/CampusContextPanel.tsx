import { ADL_CAMPUS } from '@/data/hate-crime-stats';

// National campus-antisemitism context (ADL). Shown on the campus browse view
// so the page carries real, cited scale even before a campus is selected.
export default function CampusContextPanel() {
  const stats = [
    {
      value: ADL_CAMPUS.incidents2024.toLocaleString(),
      label: 'Campus incidents in 2024',
      sub: `Up ${ADL_CAMPUS.pctIncrease2023to2024}% from ${ADL_CAMPUS.incidents2023.toLocaleString()} in 2023 (ADL)`,
    },
    {
      value: `${ADL_CAMPUS.studentsExperiencedPct}%`,
      label: 'Of Jewish students',
      sub: 'Experienced or witnessed antisemitism since the 2023-24 year began (ADL survey)',
    },
    {
      value: `${ADL_CAMPUS.shareOfAllIncidents2024}%`,
      label: 'Of all U.S. incidents',
      sub: 'Occurred on college campuses in 2024 — the highest share on record',
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
        Source: ADL Audit of Antisemitic Incidents 2024 and ADL campus climate survey. References
        to ADL do not imply partnership or endorsement.
      </p>
    </div>
  );
}
