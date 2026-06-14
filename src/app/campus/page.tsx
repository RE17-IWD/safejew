'use client';

import { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { IncidentCategory } from '@/types';
import { DEMO_INCIDENTS } from '@/lib/demo-data';

// CampusMap requires Leaflet (browser-only) — dynamically imported with no SSR.
const CampusMap = dynamic(() => import('@/components/campus/CampusMap'), {
  ssr: false,
  loading: () => (
    <div
      className="flex items-center justify-center bg-cream-100 rounded-lg border border-cream-200"
      style={{ height: 400 }}
    >
      <div className="text-center">
        <div className="w-6 h-6 border-2 border-navy-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="font-sans text-sm text-gray-500">Loading campus map...</p>
      </div>
    </div>
  ),
});

// Demo campus — matches demo-data campus_id for Westwood/UCLA-area incidents.
const DEMO_CAMPUS_ID = 'campus-demo-university';
const DEMO_CAMPUS_LAT = 34.0689;
const DEMO_CAMPUS_LNG = -118.4452;
const DEMO_CAMPUS_NAME = 'Demo University';

function formatCategory(cat: IncidentCategory): string {
  const labels: Record<IncidentCategory, string> = {
    vandalism: 'Vandalism',
    harassment: 'Harassment',
    assault: 'Assault',
    online_threat: 'Online Threat',
    other: 'Other',
  };
  return labels[cat];
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white border border-cream-200 rounded-lg px-5 py-4">
      <p className="font-serif text-2xl font-bold text-navy-800 leading-none mb-1">{value}</p>
      <p className="font-sans text-xs text-gray-500 uppercase tracking-wide">{label}</p>
    </div>
  );
}

interface HowItWorksStep {
  number: string;
  title: string;
  body: string;
}

const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    number: '01',
    title: 'Configure',
    body: 'We set up a dedicated SafeJew instance for your campus. Incident categories and severity thresholds are calibrated with your campus security team and Hillel chapter.',
  },
  {
    number: '02',
    title: 'Collect',
    body: 'Students and community members report incidents through the SafeJew reporting form. Anonymous reporting is on by default. Reports are routed directly to campus security staff and Hillel leadership.',
  },
  {
    number: '03',
    title: 'Analyze',
    body: 'Campus administrators access a private dashboard showing anonymized incident trends, category breakdowns, and month-over-month changes — without exposing individual reports.',
  },
  {
    number: '04',
    title: 'Respond',
    body: 'Data-informed decisions: where to increase security presence, when to hold community conversations, and how to document patterns for university administration.',
  },
];

const PRIVACY_COMMITMENTS = [
  'Neighborhood-level location only — exact addresses are never stored.',
  'Anonymous reporting available at every step — no account required.',
  'Individual report data restricted to authorized staff — public views show only aggregate trends.',
  'Evidence uploads encrypted at rest in Supabase Storage — accessible only to administrators.',
];

export default function CampusPage() {
  useEffect(() => {
    document.title = 'SafeJew for Campus — University Partnership Program';
  }, []);

  const campusIncidents = useMemo(
    () => DEMO_INCIDENTS.filter((inc) => inc.campus_id === DEMO_CAMPUS_ID),
    []
  );

  const totalIncidents = campusIncidents.length;

  const mostCommonCategory = useMemo((): string => {
    if (campusIncidents.length === 0) return 'N/A';
    const counts: Partial<Record<IncidentCategory, number>> = {};
    for (const inc of campusIncidents) {
      counts[inc.category] = (counts[inc.category] ?? 0) + 1;
    }
    const top = (Object.entries(counts) as [IncidentCategory, number][]).sort(
      (a, b) => b[1] - a[1]
    )[0];
    return formatCategory(top[0]);
  }, [campusIncidents]);

  const mostRecentDate = useMemo((): string => {
    if (campusIncidents.length === 0) return 'N/A';
    const sorted = [...campusIncidents].sort(
      (a, b) => new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime()
    );
    return new Date(sorted[0].occurred_at).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, [campusIncidents]);

  const highSeverityCount = useMemo(
    () => campusIncidents.filter((inc) => inc.severity === 'high').length,
    [campusIncidents]
  );

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-navy-800 pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-500 mb-4">
            For Universities
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            SafeJew for Campus
          </h1>
          <p className="font-sans text-lg text-blue-100/80 leading-relaxed max-w-2xl mb-12">
            Jewish students deserve the same data-driven safety intelligence as their communities.
            SafeJew deploys per-university — with campus-specific reporting, dedicated dashboards
            for Hillel staff, and anonymized trend data for campus security administrators.
          </p>

          {/* Hero metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mb-12">
            <div className="border-l-2 border-gold-500 pl-5">
              <p className="font-serif text-3xl font-bold text-white leading-none mb-1">850+</p>
              <p className="font-sans text-sm text-blue-100/70">Hillel campuses nationwide</p>
            </div>
            <div className="border-l-2 border-gold-500 pl-5">
              <p className="font-serif text-3xl font-bold text-white leading-none mb-1">1 in 4</p>
              <p className="font-sans text-sm text-blue-100/70">
                Jewish college students reports experiencing antisemitism annually
              </p>
              <p className="font-sans text-xs text-blue-100/40 mt-1">
                Hillel International, 2023
              </p>
            </div>
          </div>

          <a
            href="mailto:contact@safejew.org"
            className="inline-flex items-center justify-center bg-gold-500 text-white px-8 py-3.5 rounded font-sans font-semibold text-sm hover:bg-gold-600 transition-colors"
          >
            Schedule a Pilot Conversation
          </a>
        </div>
      </section>

      {/* ── Live Demo ── */}
      <section className="bg-cream-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-500 mb-3">
            Live Demo
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy-800 mb-3">
            Demo University — Westwood, CA
          </h2>
          <p className="font-sans text-sm text-gray-500 mb-10 max-w-xl">
            This is a live demo instance of SafeJew configured for a fictional university. All
            data is synthetic and for product preview only.
          </p>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <StatCard value={String(totalIncidents)} label="Campus incidents (demo)" />
            <StatCard value={mostCommonCategory} label="Most common category" />
            <StatCard value={mostRecentDate} label="Most recent incident" />
            <StatCard value={`${highSeverityCount} high`} label="High-severity incidents" />
          </div>

          {/* Map */}
          <CampusMap
            campusId={DEMO_CAMPUS_ID}
            campusLat={DEMO_CAMPUS_LAT}
            campusLng={DEMO_CAMPUS_LNG}
            campusName={DEMO_CAMPUS_NAME}
          />

          <p className="font-sans text-xs text-gray-400 mt-4 text-center">
            Map shows synthetic demonstration incidents. Exact locations are neighborhood-level
            only.
          </p>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-white py-20 border-t border-cream-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy-800 mb-12">
            How Campus Deployment Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.number}>
                <p className="font-serif text-4xl font-bold text-gold-500/30 leading-none mb-3">
                  {step.number}
                </p>
                <h3 className="font-serif text-lg font-bold text-navy-800 mb-3">
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Privacy by Design ── */}
      <section className="bg-cream-100 py-16 border-t border-cream-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-navy-800 mb-8">
            Privacy by Design
          </h2>
          <ul className="space-y-5">
            {PRIVACY_COMMITMENTS.map((commitment) => (
              <li key={commitment} className="flex items-start gap-4">
                <div
                  className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0"
                  aria-hidden="true"
                />
                <p className="font-sans text-base text-gray-700 leading-relaxed">
                  {commitment}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Partnership Model ── */}
      <section className="bg-navy-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-10">
            The Partnership Model
          </h2>

          <div className="space-y-8 mb-12">
            <div className="border-l-2 border-gold-500 pl-6">
              <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-500 mb-2">
                Phase 1 — Now
              </p>
              <p className="font-sans text-base text-blue-100/80 leading-relaxed">
                Pilot partnerships with 3–5 Hillel chapters in Greater Los Angeles. We work
                directly with each campus&apos;s security team to configure, calibrate, and deploy.
              </p>
            </div>

            <div className="border-l-2 border-gold-500 pl-6">
              <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-500 mb-2">
                Phase 2 — 2026
              </p>
              <p className="font-sans text-base text-blue-100/80 leading-relaxed">
                Expand to 20+ campuses through Hillel International&apos;s regional network, with
                standardized configuration and shared data protocols.
              </p>
            </div>

            <div className="border-l-2 border-gold-500 pl-6">
              <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-500 mb-2">
                Phase 3 — 2027
              </p>
              <p className="font-sans text-base text-blue-100/80 leading-relaxed">
                Full integration with Hillel&apos;s national campus safety infrastructure,
                ML-powered risk modeling, and mobile reporting application.
              </p>
            </div>
          </div>

          <p className="font-sans text-base text-blue-100/70 leading-relaxed mb-8 max-w-2xl">
            We are looking for our founding campus partners. If your Hillel chapter or campus
            security team is interested in a pilot, we want to hear from you.
          </p>

          <a
            href="mailto:contact@safejew.org"
            className="inline-flex items-center justify-center bg-gold-500 text-white px-8 py-3.5 rounded font-sans font-semibold text-sm hover:bg-gold-600 transition-colors"
          >
            contact@safejew.org
          </a>
        </div>
      </section>

      {/* ── Pull Quote ── */}
      <section className="bg-white py-16 border-t border-cream-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <blockquote className="border-l-4 border-gold-500 pl-8">
            <p className="font-serif text-xl lg:text-2xl text-navy-800 leading-relaxed italic mb-5">
              &ldquo;SafeJew represents exactly the kind of data infrastructure the campus Jewish
              community needs — localized, actionable, and built with privacy at its core.&rdquo;
            </p>
            <footer className="font-sans text-sm text-gray-500">
              — Campus Safety Professional, Greater Los Angeles
              <br />
              <span className="text-xs text-gray-400">
                (Demo quote for product preview — not a real testimonial)
              </span>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-navy-800 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-0.5 bg-gold-500 mb-6 mx-auto" aria-hidden="true" />
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-4">
            Ready to bring SafeJew to your campus?
          </h2>
          <p className="font-sans text-base text-blue-100/70 mb-8 leading-relaxed">
            We are actively onboarding pilot partners. Whether you represent a Hillel chapter,
            a university security office, or a Jewish student organization — let&apos;s talk.
          </p>
          <a
            href="mailto:contact@safejew.org"
            className="inline-flex items-center justify-center bg-gold-500 text-white px-8 py-3.5 rounded font-sans font-semibold text-sm hover:bg-gold-600 transition-colors"
          >
            Schedule a Pilot Conversation
          </a>
        </div>
      </section>
    </>
  );
}
