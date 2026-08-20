'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Incident, IncidentCategory } from '@/types';
import { CAMPUSES, type CampusInfo } from '@/lib/campuses';
import { SOURCED_INCIDENTS } from '@/data/sourced-incidents';
import { ADL_INCIDENTS } from '@/data/adl-incidents';
import { CAMPUS_EXTRA_INCIDENTS } from '@/data/campus-incidents';

// Real documented incidents shown near a campus. Greater-LA campuses draw from the
// LA-wide sets (SafeJew-sourced + ADL) by distance; non-LA campuses draw from a
// per-campus ADL H.E.A.T. Map slice tagged with campus_id.
const CAMPUS_LA_INCIDENTS = [...SOURCED_INCIDENTS, ...ADL_INCIDENTS];
function kmBetween(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLng = ((bLng - aLng) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((aLat * Math.PI) / 180) * Math.cos((bLat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}
import { HILLEL_TRACKER, AJC_2026, ADL_CAMPUS } from '@/data/hate-crime-stats';
import TitleVIPanel from '@/components/campus/TitleVIPanel';
import ReportingChannels from '@/components/campus/ReportingChannels';
import CampusContextPanel from '@/components/campus/CampusContextPanel';
import ReportCardPanel from '@/components/campus/ReportCardPanel';

const CampusMap = dynamic(() => import('@/components/campus/CampusMap'), {
  ssr: false,
  loading: () => (
    <div
      className="flex items-center justify-center bg-cream-100 rounded-lg border border-cream-200"
      style={{ height: 400 }}
    >
      <div className="text-center">
        <div className="w-6 h-6 border-2 border-navy-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="font-sans text-sm text-gray-500">Loading map...</p>
      </div>
    </div>
  ),
});

const CATEGORY_LABELS: Record<IncidentCategory, string> = {
  vandalism: 'Vandalism',
  harassment: 'Harassment',
  assault: 'Assault',
  online_threat: 'Online Threat',
  other: 'Other',
};

const FEATURED_CAMPUS_IDS = [
  'campus-ucla',
  'campus-usc',
  'campus-csun',
  'campus-csulb',
  'campus-columbia',
  'campus-harvard',
  'campus-nyu',
  'campus-michigan',
  'campus-berkeley',
  'campus-brandeis',
];

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white border border-cream-200 rounded-lg px-4 py-3">
      <p className="font-serif text-xl font-bold text-navy-800 leading-none mb-0.5">{value}</p>
      <p className="font-sans text-xs text-gray-500 uppercase tracking-wide">{label}</p>
    </div>
  );
}

function CampusSearch({
  onSelect,
  selected,
  onClear,
}: {
  onSelect: (id: string) => void;
  selected: CampusInfo | null;
  onClear: () => void;
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return CAMPUSES;
    const q = query.toLowerCase();
    return CAMPUSES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q)
    );
  }, [query]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleSelect(id: string) {
    onSelect(id);
    setQuery('');
    setOpen(false);
    inputRef.current?.blur();
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      {selected ? (
        /* Selected pill */
        <div className="flex items-center gap-2 bg-navy-700 text-white rounded-lg px-4 py-2.5 w-full">
          <span className="font-sans text-sm font-semibold flex-1 truncate">
            {selected.name}
            <span className="ml-1.5 font-normal text-white/60 text-xs">
              {selected.city}, {selected.state}
            </span>
          </span>
          <button
            onClick={onClear}
            aria-label="Clear campus selection"
            className="flex-none w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2 2l6 6M8 2l-6 6" />
            </svg>
          </button>
        </div>
      ) : (
        /* Search input */
        <>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="9" cy="9" r="6" />
              <path d="M15 15l3 3" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              placeholder="Search by campus, city, or state…"
              className="w-full pl-9 pr-4 py-2.5 font-sans text-sm bg-white border border-cream-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
            />
          </div>

          {open && (
            <ul
              className="absolute z-50 left-0 right-0 mt-1 bg-white border border-cream-200 rounded-lg shadow-lg overflow-y-auto"
              style={{ maxHeight: '17rem' }}
              role="listbox"
            >
              {filtered.length === 0 ? (
                <li className="px-4 py-3 font-sans text-sm text-gray-500">No campuses found</li>
              ) : (
                filtered.map((c) => (
                  <li key={c.id} role="option" aria-selected={false}>
                    <button
                      onMouseDown={() => handleSelect(c.id)}
                      className="w-full text-left px-4 py-2.5 hover:bg-cream-50 transition-colors group"
                    >
                      <span className="font-sans text-sm font-semibold text-navy-800 group-hover:text-navy-900">
                        {c.name}
                      </span>
                      <span className="ml-2 font-sans text-xs text-gray-500">
                        {c.city}, {c.state}
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

function CampusSuggestForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', city: '', state: '', website: '', notes: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/campus-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          city: form.city,
          state: form.state,
          website: form.website || null,
          notes: form.notes || null,
          requester_email: form.email || null,
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || 'Submission failed');
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <div className="mt-10">
        <button
          onClick={() => setOpen(true)}
          className="font-sans text-sm text-navy-600 hover:text-navy-800 underline underline-offset-2"
        >
          Don&apos;t see your campus? Request it →
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mt-10 max-w-md mx-auto bg-white border border-cream-200 rounded-lg p-6 text-left">
        <p className="font-sans text-sm font-semibold text-navy-800 mb-1">Request received</p>
        <p className="font-sans text-sm text-gray-600">
          We&apos;ll review your suggestion and add the campus if we can verify the information.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 max-w-md mx-auto bg-white border border-cream-200 rounded-lg p-6 text-left">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-sans text-sm font-semibold text-navy-800">Suggest a Campus</h3>
        <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-600 text-lg leading-none">&times;</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block font-sans text-xs font-medium text-gray-600 mb-1">
            School name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="e.g. University of Chicago"
            className="border border-gray-300 rounded px-3 py-2 w-full font-sans text-sm focus:outline-none focus:ring-1 focus:ring-navy-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-sans text-xs font-medium text-gray-600 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={form.city}
              onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
              placeholder="Chicago"
              className="border border-gray-300 rounded px-3 py-2 w-full font-sans text-sm focus:outline-none focus:ring-1 focus:ring-navy-500"
            />
          </div>
          <div>
            <label className="block font-sans text-xs font-medium text-gray-600 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={2}
              value={form.state}
              onChange={(e) => setForm((p) => ({ ...p, state: e.target.value.toUpperCase() }))}
              placeholder="IL"
              className="border border-gray-300 rounded px-3 py-2 w-full font-sans text-sm focus:outline-none focus:ring-1 focus:ring-navy-500"
            />
          </div>
        </div>
        <div>
          <label className="block font-sans text-xs font-medium text-gray-600 mb-1">School website (optional)</label>
          <input
            type="url"
            value={form.website}
            onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
            placeholder="https://..."
            className="border border-gray-300 rounded px-3 py-2 w-full font-sans text-sm focus:outline-none focus:ring-1 focus:ring-navy-500"
          />
        </div>
        <div>
          <label className="block font-sans text-xs font-medium text-gray-600 mb-1">Why add this campus? (optional)</label>
          <textarea
            rows={2}
            value={form.notes}
            onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
            placeholder="Any context on antisemitism incidents or Jewish student population…"
            className="border border-gray-300 rounded px-3 py-2 w-full font-sans text-sm focus:outline-none focus:ring-1 focus:ring-navy-500"
          />
        </div>
        <div>
          <label className="block font-sans text-xs font-medium text-gray-600 mb-1">Your email (optional)</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            placeholder="you@example.com"
            className="border border-gray-300 rounded px-3 py-2 w-full font-sans text-sm focus:outline-none focus:ring-1 focus:ring-navy-500"
          />
        </div>
        {error && <p className="font-sans text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting || !form.name || !form.city || !form.state}
          className="w-full bg-navy-800 text-white rounded px-4 py-2 font-sans text-sm font-semibold hover:bg-navy-700 transition-colors disabled:opacity-40"
        >
          {submitting ? 'Submitting…' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
}

export default function CampusPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const incidentsLoading = false;

  const campus = selectedId ? (CAMPUSES.find((c) => c.id === selectedId) ?? null) : null;
  // Real documented incidents near the selected campus: per-campus ADL slice (by
  // campus_id) for non-LA schools, plus the LA-wide sets within ~8km for LA schools.
  const incidents = useMemo<Incident[]>(() => {
    if (!campus) return [];
    const tagged = CAMPUS_EXTRA_INCIDENTS.filter((i) => i.campus_id === campus.id);
    if (tagged.length) return tagged;
    return CAMPUS_LA_INCIDENTS.filter((i) => kmBetween(campus.lat, campus.lng, i.lat, i.lng) <= 8);
  }, [campus]);
  // The incident map + community-spaces layer only cover Greater LA.
  const campusInLA =
    !!campus && campus.lat >= 33.55 && campus.lat <= 34.45 && campus.lng >= -119.0 && campus.lng <= -117.5;

  useEffect(() => {
    document.title = campus
      ? `SafeJew · ${campus.name} Campus Tool`
      : 'SafeJew · Campus Jewish Community Tool';
  }, [campus]);

  const totalIncidents = incidents.length;

  const mostCommonCategory = useMemo((): string => {
    if (!incidents.length) return 'None';
    const counts: Partial<Record<IncidentCategory, number>> = {};
    for (const inc of incidents) {
      counts[inc.category] = (counts[inc.category] ?? 0) + 1;
    }
    const top = (Object.entries(counts) as [IncidentCategory, number][]).sort(
      (a, b) => b[1] - a[1]
    )[0];
    return CATEGORY_LABELS[top[0]];
  }, [incidents]);

  const highSeverityCount = useMemo(
    () => incidents.filter((inc) => inc.severity === 'high').length,
    [incidents]
  );

  const hasData = totalIncidents > 0;

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 pt-28 pb-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-400 mb-3">
            Free Campus Tool
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Jewish community on campus
          </h1>
          <p className="font-sans text-base text-white/65 max-w-xl leading-relaxed mb-8">
            Antisemitism incidents, nearby synagogues, Chabad houses, and Jewish community
            resources, by campus. No account, no sign-up.
          </p>

          {/* Search embedded in hero */}
          <CampusSearch
            onSelect={setSelectedId}
            selected={campus}
            onClear={() => setSelectedId(null)}
          />
        </div>
      </section>

      {/* Main content — only shown when a campus is selected */}
      {campus ? (
        <section className="bg-cream-50 py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Campus header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl font-bold text-navy-800">{campus.name}</h2>
                <p className="font-sans text-sm text-gray-500">
                  {campus.city}, {campus.state}
                </p>
                {campus.jewishStudentEstimate !== null && (
                  <p className="font-sans text-xs text-gray-500 mt-1">
                    ~{campus.jewishStudentEstimate.toLocaleString()} estimated Jewish students
                  </p>
                )}
              </div>
              {hasData && (
                <span className="inline-flex items-center gap-1 self-start sm:self-auto bg-gold-100 text-gold-700 font-sans text-xs font-semibold px-3 py-1 rounded border border-gold-200">
                  <svg viewBox="0 0 10 10" className="w-2 h-2 fill-current"><circle cx="5" cy="5" r="4" /></svg>
                  Incident data available
                </span>
              )}
            </div>

            {/* Incident tracking section — map always renders once a campus is picked */}
            {hasData && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <StatPill value={String(totalIncidents)} label="Incidents tracked" />
                <StatPill value={mostCommonCategory} label="Most common" />
                <StatPill value={`${highSeverityCount}`} label="High severity" />
              </div>
            )}

            {!hasData && (
              <div className="mb-6 bg-white border border-cream-200 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <p className="font-sans text-sm font-semibold text-navy-800 mb-1">
                    No SafeJew-tracked incidents near {campus.name} yet
                  </p>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    Our incident data currently covers Greater Los Angeles. The map below still shows
                    your campus and nearby Jewish community spaces — tap{' '}
                    <span className="font-semibold text-navy-700">Show Jewish community spaces</span>. If
                    something happened here, reporting it helps build this dataset.
                  </p>
                </div>
                <Link
                  href="/report"
                  className="flex-none inline-flex items-center justify-center bg-gold-500 text-white px-5 py-2.5 rounded font-sans font-semibold text-sm hover:bg-gold-600 transition-colors"
                >
                  Report an Incident
                </Link>
              </div>
            )}

            <div className="mb-3">
              <CampusMap
                campusLat={campus.lat}
                campusLng={campus.lng}
                campusName={campus.name}
                incidents={incidents}
              />
            </div>
            <p className="font-sans text-xs text-gray-500 mb-10">
              {hasData ? (
                campusInLA ? (
                  <>
                    Documented incidents within ~5 miles of campus, from SafeJew&apos;s sourced records and
                    the{' '}
                    <a href="https://www.adl.org/apps/heatmap/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">ADL H.E.A.T. Map</a>.
                    Locations are neighborhood-level (approximate) for privacy. See the{' '}
                    <Link href="/dashboard" className="underline hover:text-gray-600">Dashboard</Link>{' '}
                    for aggregate statistics.
                  </>
                ) : (
                  <>
                    Recent antisemitic incidents (2020–present) reported in {campus.city} from the{' '}
                    <a href="https://www.adl.org/apps/heatmap/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">ADL H.E.A.T. Map</a>.
                    ADL publishes city-level locations, not addresses, so pins are placed at
                    approximate points near campus — click any pin to read the report. Use the toggle
                    above to add nearby Jewish community spaces.
                  </>
                )
              ) : (
                <>
                  Incident data (SafeJew + the{' '}
                  <a href="https://www.adl.org/apps/heatmap/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">ADL H.E.A.T. Map</a>)
                  currently covers Greater Los Angeles. Use the toggle above the map to add nearby
                  Jewish community spaces.
                </>
              )}
            </p>

            {/* Jewish life notes */}
            <div className="mb-8 bg-white border border-cream-200 rounded-lg p-5">
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">
                Jewish Life at {campus.name}
              </p>
              <p className="font-sans text-sm text-gray-700 leading-relaxed">
                {campus.jewishLifeNotes}
              </p>
              <a
                href="https://www.adl.org/campus-antisemitism-report-card"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 font-sans text-xs text-navy-600 hover:text-navy-800 underline underline-offset-2"
              >
                Look up {campus.name} in ADL&apos;s Campus Antisemitism Report Card →
              </a>
            </div>

            {/* Community spaces grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Hillel */}
              <div className="bg-white border border-cream-200 rounded-lg p-5">
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">
                  Hillel
                </p>
                {campus.hillel ? (
                  <>
                    <h3 className="font-sans font-semibold text-navy-800 mb-1">
                      {campus.hillel.name}
                    </h3>
                    {campus.hillel.url ? (
                      <a
                        href={campus.hillel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-sm text-navy-600 hover:text-navy-800 underline"
                      >
                        {campus.hillel.url.replace(/^https?:\/\/(www\.)?/, '')}
                      </a>
                    ) : (
                      <p className="font-sans text-sm text-gray-500">Website not on record</p>
                    )}
                  </>
                ) : (
                  <p className="font-sans text-sm text-gray-500">No Hillel chapter on record</p>
                )}
              </div>

              {/* Chabad */}
              <div className="bg-white border border-cream-200 rounded-lg p-5">
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">
                  Chabad
                </p>
                {campus.chabad ? (
                  <>
                    <h3 className="font-sans font-semibold text-navy-800 mb-1">
                      {campus.chabad.name}
                    </h3>
                    {campus.chabad.url ? (
                      <a
                        href={campus.chabad.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-sm text-navy-600 hover:text-navy-800 underline"
                      >
                        {campus.chabad.url.replace(/^https?:\/\/(www\.)?/, '')}
                      </a>
                    ) : (
                      <p className="font-sans text-sm text-gray-500">Website not on record</p>
                    )}
                  </>
                ) : (
                  <p className="font-sans text-sm text-gray-500">No Chabad house on record</p>
                )}
              </div>

              {/* Community spaces on map */}
              <div className="bg-white border border-cream-200 rounded-lg p-5 md:col-span-2">
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">
                  Nearby Synagogues &amp; Jewish Institutions
                </p>
                <p className="font-sans text-sm text-gray-700 leading-relaxed">
                  On the campus map above, tap{' '}
                  <span className="font-semibold text-navy-700">Show Jewish community spaces</span> to
                  plot publicly listed synagogues, JCCs, and Jewish student centers near {campus.name}.
                  {campusInLA && (
                    <>
                      {' '}You can also{' '}
                      <Link href="/map" className="text-navy-600 hover:text-navy-800 underline">
                        explore the full Greater-LA map
                      </Link>
                      .
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Title VI civil-rights info */}
            <div className="mt-6">
              <TitleVIPanel campusName={campus.name} />
            </div>

            {/* Reporting channels */}
            <div className="mt-6">
              <ReportingChannels campusId={campus.id} campusName={campus.name} />
            </div>

            {/* Anonymous reporting callout */}
            <div className="mt-6 bg-navy-800 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <svg viewBox="0 0 20 20" className="w-4 h-4 text-gold-400" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M10 2a3 3 0 013 3v3H7V5a3 3 0 013-3z" />
                    <rect x="4.5" y="8" width="11" height="9" rx="1.5" />
                  </svg>
                  <p className="font-sans text-sm font-semibold text-white">Report anonymously</p>
                </div>
                <p className="font-sans text-sm text-white/65 leading-relaxed">
                  Students often fear retaliation. You can file a report with no name and no email.
                  anonymity is built in. Reports are reviewed before they appear in the
                  {' '}{campus.name} tracker.
                </p>
              </div>
              <Link
                href={`/report?campus=${campus.id}`}
                className="flex-none inline-flex items-center justify-center bg-gold-500 text-white px-5 py-2.5 rounded font-sans font-semibold text-sm hover:bg-gold-600 transition-colors"
              >
                Report anonymously
              </Link>
            </div>

            <div className="mt-6 bg-cream-100 border border-cream-200 rounded-lg p-5">
              <p className="font-sans text-xs text-gray-500 leading-relaxed">
                This tool provides publicly available community information. SafeJew does not
                assess or guarantee the safety of any location listed here.
              </p>
            </div>
          </div>
        </section>
      ) : (
        /* No campus selected — show browse prompt + suggest form */
        <section className="bg-cream-50 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-sans text-gray-500 text-sm mb-2">
              Search any of {CAMPUSES.length} campuses for Hillel, Chabad, Jewish community
              resources, and your Title VI civil-rights options.
            </p>
            <p className="font-sans text-xs text-gray-500">
              Los Angeles campuses (UCLA, USC) have the deepest local data. Incident tracking is
              being expanded campus by campus as verified data and community reports grow.
            </p>

            {/* Quick-pick chips */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {CAMPUSES.filter((c) => FEATURED_CAMPUS_IDS.includes(c.id)).map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className="font-sans text-sm px-4 py-2 rounded border border-cream-200 text-gray-600 bg-white hover:border-navy-300 hover:text-navy-700 transition-colors"
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Suggest a campus */}
            <CampusSuggestForm />

            {/* National campus context */}
            <CampusContextPanel />

            {/* ADL Campus Report Card */}
            <ReportCardPanel />
          </div>
        </section>
      )}

      {/* For Hillels & universities */}
      <section className="bg-white py-16 border-t border-cream-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">
            For institutions
          </p>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-navy-800 mb-3">
            SafeJew for Hillels &amp; universities
          </h2>
          <p className="font-sans text-base text-gray-600 leading-relaxed max-w-2xl mb-4">
            National statistics come out once a year and never say what&apos;s happening at your
            school. SafeJew for Campus is built to close that gap: a live, local picture of
            antisemitism around a specific campus, paired with the tools to respond to it.
          </p>
          <p className="font-sans text-base text-gray-600 leading-relaxed max-w-2xl mb-8">
            For a Hillel, a Jewish student group, or a campus safety office, that means seeing
            incidents near your students as they&apos;re reported, giving students a safe and
            anonymous way to report what happens to them, and pointing them to their Title VI rights
            and nearby Jewish spaces. We&apos;d build it with you, around how your campus actually works.
          </p>
          <div className="grid grid-cols-3 gap-3 mb-8 max-w-2xl">
            <StatPill
              value={HILLEL_TRACKER.incidents2024_25.toLocaleString()}
              label="Hillel campus incidents, 2024–25"
            />
            <StatPill value={`${AJC_2026.studentsExperiencedPct}%`} label="Jewish students affected (AJC)" />
            <StatPill value={`${ADL_CAMPUS.reportCardAB2026}%`} label="Schools graded A/B (ADL 2026)" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Per-campus dashboard',
                detail:
                  'A private view of verified incidents, trends, and nearby community spaces for your specific campus and surrounding area.',
              },
              {
                title: 'Anonymous student reporting',
                detail:
                  'A no-name, no-email reporting channel built for students who fear retaliation. Reports are reviewed before they appear.',
              },
              {
                title: 'Embeddable map',
                detail:
                  'Drop the SafeJew incident map into your Hillel or student-org site so students always know where to look.',
              },
              {
                title: 'Title VI & resources',
                detail:
                  'Clear civil-rights guidance and reporting channels surfaced for each campus, so students know their options.',
              },
            ].map((f) => (
              <div key={f.title} className="bg-cream-50 border border-cream-200 rounded-lg p-5">
                <h3 className="font-sans font-semibold text-navy-800 mb-1.5">{f.title}</h3>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">{f.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href="mailto:contact.safejew@gmail.com?subject=SafeJew%20for%20Campus%20%E2%80%94%20partnership"
              className="inline-flex items-center justify-center bg-navy-800 text-white px-6 py-3 rounded font-sans font-semibold text-sm hover:bg-navy-900 transition-colors"
            >
              Partner with us
            </a>
            <p className="font-sans text-sm text-gray-500">
              Hillel, campus security, or a student org? We&apos;d love to build this with you.
            </p>
          </div>
        </div>
      </section>

      {/* Report CTA */}
      <section className="bg-navy-800 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-sans text-white/70 text-sm mb-5 leading-relaxed">
            {campus
              ? `Experienced or witnessed something at ${campus.name}? Reports help build the data record that protects other students.`
              : 'Experienced antisemitism on campus? Reports help build the data record that protects other students.'}
          </p>
          <Link
            href={campus ? `/report?campus=${campus.id}` : '/report'}
            className="inline-flex items-center justify-center bg-gold-500 text-white px-7 py-3 rounded font-sans font-semibold text-sm hover:bg-gold-600 transition-colors"
          >
            Report an Incident
          </Link>
          <p className="font-sans text-sm text-white/60 mt-5">
            Hillel, campus security, or student org?{' '}
            <a
              href="mailto:contact.safejew@gmail.com"
              className="text-gold-400 hover:text-gold-500 underline underline-offset-2 transition-colors"
            >
              contact.safejew@gmail.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
