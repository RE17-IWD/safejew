'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { IncidentCategory } from '@/types';
import { DEMO_INCIDENTS } from '@/lib/demo-data';

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

// Campus data — each entry is a real campus we have incident data for
const CAMPUSES = [
  {
    id: 'campus-demo-university',
    name: 'UCLA',
    location: 'Westwood, Los Angeles',
    lat: 34.0689,
    lng: -118.4452,
    hillel: 'https://uclahillel.org',
    chabad: 'https://chabadatucla.org',
    chabad_address: '920 Hilgard Ave, Los Angeles, CA 90024',
    nearby_synagogues: ['Sinai Temple (1.2 mi)', 'University Synagogue (0.8 mi)'],
    jewish_food: 'Kosher options on campus at Bruin Café and at Pico-Robertson (4 mi)',
  },
  {
    id: 'campus-usc',
    name: 'USC',
    location: 'University Park, Los Angeles',
    lat: 34.0224,
    lng: -118.2851,
    hillel: 'https://uscjewish.org',
    chabad: 'https://chabadatusc.org',
    chabad_address: '3221 S Hoover St, Los Angeles, CA 90007',
    nearby_synagogues: ['Wilshire Blvd Temple (3 mi)', 'IKAR (3.5 mi)'],
    jewish_food: 'Off campus — Pico-Robertson area (~4 mi west)',
  },
  {
    id: 'campus-cal-state-la',
    name: 'Cal State LA',
    location: 'East Los Angeles',
    lat: 34.0686,
    lng: -118.1687,
    hillel: null,
    chabad: null,
    chabad_address: null,
    nearby_synagogues: ['Wilshire Blvd Temple (6 mi)'],
    jewish_food: 'Limited nearby options — Pico-Robertson area (~8 mi west)',
  },
];

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white border border-cream-200 rounded-lg px-4 py-3">
      <p className="font-serif text-xl font-bold text-navy-800 leading-none mb-0.5">{value}</p>
      <p className="font-sans text-xs text-gray-500 uppercase tracking-wide">{label}</p>
    </div>
  );
}

export default function CampusPage() {
  const [selectedId, setSelectedId] = useState(CAMPUSES[0].id);

  const campus = CAMPUSES.find((c) => c.id === selectedId) ?? CAMPUSES[0];

  useEffect(() => {
    document.title = `SafeJew — ${campus.name} Campus Tool`;
  }, [campus.name]);

  const campusIncidents = useMemo(
    () => DEMO_INCIDENTS.filter((inc) => inc.campus_id === selectedId),
    [selectedId]
  );

  const totalIncidents = campusIncidents.length;

  const mostCommonCategory = useMemo((): string => {
    if (!campusIncidents.length) return 'None';
    const counts: Partial<Record<IncidentCategory, number>> = {};
    for (const inc of campusIncidents) {
      counts[inc.category] = (counts[inc.category] ?? 0) + 1;
    }
    const top = (Object.entries(counts) as [IncidentCategory, number][]).sort(
      (a, b) => b[1] - a[1]
    )[0];
    return CATEGORY_LABELS[top[0]];
  }, [campusIncidents]);

  const highSeverityCount = useMemo(
    () => campusIncidents.filter((inc) => inc.severity === 'high').length,
    [campusIncidents]
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 pt-28 pb-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-400 mb-3">
            Free Campus Tool
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Jewish community on campus
          </h1>
          <p className="font-sans text-base text-white/65 max-w-xl leading-relaxed">
            Antisemitism incidents, nearby synagogues, Chabad houses, and Jewish community
            resources — by campus. No account, no sign-up.
          </p>
        </div>
      </section>

      {/* Campus selector */}
      <section className="bg-white border-b border-cream-200 py-4 sticky top-16 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="font-sans text-xs text-gray-400 uppercase tracking-wide flex-none mr-2">
              Campus:
            </span>
            {CAMPUSES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`flex-none font-sans text-sm font-medium px-4 py-1.5 rounded-full border transition-colors ${
                  selectedId === c.id
                    ? 'bg-navy-700 text-white border-navy-700'
                    : 'border-cream-200 text-gray-600 hover:border-navy-300 hover:text-navy-700'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-cream-50 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="font-serif text-2xl font-bold text-navy-800">{campus.name}</h2>
            <p className="font-sans text-sm text-gray-500">{campus.location}</p>
          </div>

          {/* Incident stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            <StatPill value={String(totalIncidents)} label="Incidents tracked" />
            <StatPill value={mostCommonCategory} label="Most common" />
            <StatPill value={`${highSeverityCount}`} label="High severity" />
          </div>

          {/* Map */}
          <div className="mb-3">
            <CampusMap
              campusId={campus.id}
              campusLat={campus.lat}
              campusLng={campus.lng}
              campusName={campus.name}
            />
          </div>
          <p className="font-sans text-xs text-gray-400 mb-10">
            Incident locations are neighborhood-level only. Exact addresses are never stored.
          </p>

          {/* Community spaces */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Hillel */}
            <div className="bg-white border border-cream-200 rounded-lg p-5">
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">
                Hillel
              </p>
              <h3 className="font-sans font-semibold text-navy-800 mb-1">
                Hillel at {campus.name}
              </h3>
              {campus.hillel ? (
                <a
                  href={campus.hillel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-navy-600 hover:text-navy-800 underline"
                >
                  {campus.hillel.replace('https://', '')}
                </a>
              ) : (
                <p className="font-sans text-sm text-gray-500">No Hillel chapter on record</p>
              )}
            </div>

            {/* Chabad */}
            <div className="bg-white border border-cream-200 rounded-lg p-5">
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">
                Chabad
              </p>
              <h3 className="font-sans font-semibold text-navy-800 mb-1">
                Chabad at {campus.name}
              </h3>
              {campus.chabad_address && (
                <p className="font-sans text-xs text-gray-500 mb-1">{campus.chabad_address}</p>
              )}
              {campus.chabad ? (
                <a
                  href={campus.chabad}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-navy-600 hover:text-navy-800 underline"
                >
                  {campus.chabad.replace('https://', '')}
                </a>
              ) : (
                <p className="font-sans text-sm text-gray-500">No Chabad house on record</p>
              )}
            </div>

            {/* Nearby synagogues */}
            <div className="bg-white border border-cream-200 rounded-lg p-5">
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">
                Nearby Synagogues
              </p>
              <ul className="space-y-1">
                {campus.nearby_synagogues.map((s) => (
                  <li key={s} className="font-sans text-sm text-gray-700">
                    {s}
                  </li>
                ))}
              </ul>
              <Link
                href="/map"
                className="inline-block mt-3 font-sans text-xs text-navy-600 hover:text-navy-800 underline"
              >
                See all community spaces on the map
              </Link>
            </div>

            {/* Jewish food */}
            <div className="bg-white border border-cream-200 rounded-lg p-5">
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">
                Kosher & Jewish Food
              </p>
              <p className="font-sans text-sm text-gray-700 leading-relaxed">
                {campus.jewish_food}
              </p>
            </div>
          </div>

          <div className="mt-10 bg-cream-100 border border-cream-200 rounded-lg p-5">
            <p className="font-sans text-xs text-gray-500 leading-relaxed">
              This tool provides publicly available community information. Incident data is from
              verified community reports and published sources. SafeJew does not assess or
              guarantee the safety of any location listed here.
            </p>
          </div>
        </div>
      </section>

      {/* Report CTA */}
      <section className="bg-navy-800 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-sans text-white/70 text-sm mb-5 leading-relaxed">
            Experienced or witnessed something at {campus.name}? Reports help build the data
            record that protects other students.
          </p>
          <Link
            href="/report"
            className="inline-flex items-center justify-center bg-gold-500 text-white px-7 py-3 rounded font-sans font-semibold text-sm hover:bg-gold-600 transition-colors"
          >
            Report an Incident
          </Link>
        </div>
      </section>
    </>
  );
}
