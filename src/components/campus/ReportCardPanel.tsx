import { REPORT_CARD_2026 } from '@/data/hate-crime-stats';

const GRADE_COLOR: Record<string, string> = {
  A: '#12a150',
  B: '#1a56db',
  C: '#e0900a',
  D: '#f97316',
  F: '#e5484d',
};

export default function ReportCardPanel() {
  const max = Math.max(...REPORT_CARD_2026.distribution.map((d) => d.count));
  return (
    <div className="mt-12 max-w-4xl mx-auto text-left">
      <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-500 mb-1 text-center">
        ADL Campus Report Card · 2026
      </p>
      <h2 className="font-serif text-xl font-bold text-navy-800 mb-2 text-center">
        How {REPORT_CARD_2026.schoolsAssessed} schools graded on antisemitism
      </h2>
      <p className="font-sans text-sm text-gray-500 mb-8 text-center max-w-xl mx-auto">
        The ADL grades universities A–F on their policies, response, and investment in Jewish life.
        Grades have improved sharply — but a handful still fail.
      </p>

      {/* Distribution */}
      <div className="bg-white border border-cream-200 rounded-lg p-6 mb-6">
        <div className="space-y-3">
          {REPORT_CARD_2026.distribution.map((d) => (
            <div key={d.grade} className="flex items-center gap-3">
              <span
                className="flex-none w-7 h-7 rounded-md flex items-center justify-center font-sans text-sm font-bold text-white"
                style={{ backgroundColor: GRADE_COLOR[d.grade] }}
              >
                {d.grade}
              </span>
              <div className="flex-1 bg-cream-100 rounded-full h-6 overflow-hidden">
                <div
                  className="h-full rounded-full flex items-center justify-end pr-2"
                  style={{
                    width: `${Math.max(8, (d.count / max) * 100)}%`,
                    backgroundColor: GRADE_COLOR[d.grade],
                  }}
                >
                  <span className="font-sans text-xs font-bold text-white">{d.count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Highest / lowest */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-cream-200 rounded-lg p-5">
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-green-700 mb-3">
            Highest-rated
          </p>
          <ul className="space-y-1.5">
            {REPORT_CARD_2026.topRated.map((s) => (
              <li key={s} className="font-sans text-sm text-gray-700">
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-cream-200 rounded-lg p-5">
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-red-700 mb-3">
            Lowest-rated
          </p>
          <ul className="space-y-1.5">
            {REPORT_CARD_2026.lowestRated.map((s) => (
              <li key={s} className="font-sans text-sm text-gray-700">
                {s}
                {s.includes('Los Angeles') && (
                  <span className="ml-2 font-sans text-[11px] font-semibold text-red-600 uppercase tracking-wide">
                    Local
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="font-sans text-[11px] text-gray-400 mt-4 text-center">
        Source: ADL 2026 Campus Antisemitism Report Card.{' '}
        <a
          href="https://www.adl.org/campus-antisemitism-report-card"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-600"
        >
          Look up any school →
        </a>
      </p>
    </div>
  );
}
