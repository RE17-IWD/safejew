'use client';

import { useState } from 'react';
import { REPORT_CARD_2026 } from '@/data/hate-crime-stats';

const GRADE_COLOR: Record<string, string> = {
  A: '#12a150',
  B: '#1a56db',
  C: '#e0900a',
  D: '#f97316',
  F: '#e5484d',
};

// ADL publishes named examples for the top and bottom of the curve, not the full
// per-grade roster, so we show the schools we can attribute and link out for the rest.
const NAMED: Record<string, string[]> = {
  A: REPORT_CARD_2026.topRated,
  F: REPORT_CARD_2026.lowestRated,
};

export default function ReportCardPanel() {
  const [grade, setGrade] = useState<string>('A');
  const max = Math.max(...REPORT_CARD_2026.distribution.map((d) => d.count));
  const active = REPORT_CARD_2026.distribution.find((d) => d.grade === grade);
  const schools = NAMED[grade] ?? [];

  return (
    <div className="mt-12 max-w-4xl mx-auto text-left">
      <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-500 mb-1 text-center">
        ADL Campus Report Card · 2026
      </p>
      <h2 className="font-serif text-xl font-bold text-navy-800 mb-2 text-center">
        How {REPORT_CARD_2026.schoolsAssessed} schools graded on antisemitism
      </h2>
      <p className="font-sans text-sm text-gray-500 mb-8 text-center max-w-xl mx-auto">
        The ADL grades universities A to F on their policies, response, and investment in Jewish life.
        Hover a grade to see the schools in it.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {/* Distribution — hover to select */}
        <div className="bg-white border border-cream-200 rounded-lg p-6">
          <div className="space-y-3">
            {REPORT_CARD_2026.distribution.map((d) => (
              <button
                key={d.grade}
                type="button"
                onMouseEnter={() => setGrade(d.grade)}
                onFocus={() => setGrade(d.grade)}
                onClick={() => setGrade(d.grade)}
                aria-label={`Grade ${d.grade}, ${d.count} schools`}
                className={`w-full flex items-center gap-3 rounded transition-opacity ${
                  grade === d.grade ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <span
                  className="flex-none w-7 h-7 rounded-md flex items-center justify-center font-sans text-sm font-bold text-white"
                  style={{ backgroundColor: GRADE_COLOR[d.grade] }}
                >
                  {d.grade}
                </span>
                <span className="flex-1 bg-cream-100 rounded-full h-6 overflow-hidden">
                  <span
                    className="h-full rounded-full flex items-center justify-end pr-2"
                    style={{
                      width: `${Math.max(8, (d.count / max) * 100)}%`,
                      backgroundColor: GRADE_COLOR[d.grade],
                      display: 'flex',
                    }}
                  >
                    <span className="font-sans text-xs font-bold text-white">{d.count}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Schools in the selected grade */}
        <div className="bg-white border border-cream-200 rounded-lg p-5 min-h-[220px]">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="flex-none w-6 h-6 rounded-md flex items-center justify-center font-sans text-xs font-bold text-white"
              style={{ backgroundColor: GRADE_COLOR[grade] }}
            >
              {grade}
            </span>
            <p className="font-sans text-sm font-semibold text-navy-800">
              {active?.count} schools graded {grade}
            </p>
          </div>

          {schools.length > 0 ? (
            <>
              <ul className="space-y-1.5">
                {schools.map((s) => (
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
              <p className="font-sans text-[11px] text-gray-500 mt-3">
                ADL-highlighted examples. The full A to F roster is on the ADL report card.
              </p>
            </>
          ) : (
            <p className="font-sans text-sm text-gray-500">
              The ADL doesn&apos;t publish the full named list for grade {grade}. See every school&apos;s
              grade on the ADL report card below.
            </p>
          )}
        </div>
      </div>

      <p className="font-sans text-[11px] text-gray-500 mt-4 text-center">
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
