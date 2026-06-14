'use client';

import { useState } from 'react';
import type { IncidentCategory, IncidentSeverity } from '@/types';

const NEIGHBORHOODS = [
  'Beverly Hills',
  'Westwood',
  'Pico-Robertson',
  'Fairfax District',
  'West Hollywood',
  'Mid-Wilshire',
  'Silver Lake',
  'Los Feliz',
  'Valley Village',
  'Sherman Oaks',
  'Encino',
  'Studio City',
  'Santa Monica',
  'Culver City',
  'Brentwood',
  'Downtown LA',
  'Koreatown',
  'Tarzana',
  'Other',
] as const;

interface CategoryOption {
  value: IncidentCategory;
  label: string;
  description: string;
}

const CATEGORIES: CategoryOption[] = [
  {
    value: 'vandalism',
    label: 'Vandalism',
    description: 'Property damage, graffiti, defacement',
  },
  {
    value: 'harassment',
    label: 'Harassment',
    description: 'Verbal, written, or physical targeting',
  },
  {
    value: 'assault',
    label: 'Assault',
    description: 'Physical attack',
  },
  {
    value: 'online_threat',
    label: 'Online Threat',
    description: 'Social media, email, messaging',
  },
  {
    value: 'other',
    label: 'Other',
    description: 'Does not fit the above categories',
  },
];

interface SeverityOption {
  value: IncidentSeverity;
  label: string;
  description: string;
}

const SEVERITIES: SeverityOption[] = [
  {
    value: 'low',
    label: 'Low',
    description: 'Minor incident, no immediate threat',
  },
  {
    value: 'medium',
    label: 'Medium',
    description: 'Significant incident, some concern',
  },
  {
    value: 'high',
    label: 'High',
    description: 'Serious incident or credible threat',
  },
];

interface FormData {
  category: IncidentCategory | '';
  severity: IncidentSeverity | '';
  description: string;
  date: string;
  time: string;
  neighborhood: string;
  isAnonymous: boolean;
  contactName: string;
  contactEmail: string;
  confirmed: boolean;
}

const INITIAL_FORM: FormData = {
  category: '',
  severity: '',
  description: '',
  date: '',
  time: '',
  neighborhood: '',
  isAnonymous: true,
  contactName: '',
  contactEmail: '',
  confirmed: false,
};

const STEPS = ['What Happened', 'When & Where', 'Your Information', 'Review'];

function ProgressIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-between mb-8">
      {STEPS.map((label, index) => {
        const stepNum = index + 1;
        const isComplete = currentStep > stepNum;
        const isCurrent = currentStep === stepNum;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={[
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans font-semibold transition-colors',
                  isComplete
                    ? 'bg-navy-600 text-white'
                    : isCurrent
                    ? 'bg-navy-800 text-white ring-2 ring-navy-600 ring-offset-2'
                    : 'bg-cream-200 text-gray-500',
                ].join(' ')}
              >
                {isComplete ? (
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8l3.5 3.5L13 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={[
                  'mt-1 text-xs font-sans hidden sm:block',
                  isCurrent ? 'text-navy-800 font-semibold' : 'text-gray-400',
                ].join(' ')}
              >
                {label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={[
                  'flex-1 h-px mx-2 sm:mx-3 transition-colors',
                  isComplete ? 'bg-navy-600' : 'bg-cream-200',
                ].join(' ')}
                style={{ minWidth: '1.5rem' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

const inputClass =
  'border border-gray-300 rounded px-3 py-2 w-full font-sans text-sm focus:outline-none focus:ring-1 focus:ring-navy-500 focus:border-navy-500 bg-white text-gray-900 placeholder-gray-400';

const labelClass = 'block font-sans text-sm font-medium text-gray-700 mb-1';

export default function ReportForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function isStep1Valid(): boolean {
    return (
      form.category !== '' &&
      form.severity !== '' &&
      form.description.trim().length >= 20
    );
  }

  function isStep2Valid(): boolean {
    const today = new Date().toISOString().split('T')[0];
    return form.date !== '' && form.date <= today && form.neighborhood !== '';
  }

  function isStep4Valid(): boolean {
    return form.confirmed;
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const occurred_at = form.time
        ? `${form.date}T${form.time}:00`
        : `${form.date}T12:00:00`;

      const payload = {
        category: form.category,
        severity: form.severity,
        description: form.description.trim(),
        occurred_at,
        neighborhood: form.neighborhood,
        is_anonymous: form.isAnonymous,
        reporter_contact:
          !form.isAnonymous && (form.contactName || form.contactEmail)
            ? `${form.contactName} <${form.contactEmail}>`.trim()
            : null,
      };

      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Submission failed. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-lg border border-cream-200 shadow-sm p-8">
        <div className="w-10 h-0.5 bg-gold-500 mb-6" aria-hidden="true" />
        <h2 className="font-serif text-2xl font-bold text-navy-800 mb-3">
          Thank You for Your Report
        </h2>
        <p className="font-sans text-sm text-gray-600 leading-relaxed mb-6">
          Your report has been received and is now in our review queue. Our team will
          verify the information before it is reflected in the public data. You may not
          receive individual confirmation unless you provided contact information.
        </p>

        <div className="border border-cream-200 rounded-lg p-5 mb-6 bg-cream-50">
          <p className="font-sans text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
            What Happens Next
          </p>
          <ol className="space-y-2">
            {[
              'Your report enters our secure review queue.',
              'A team member reviews the information for completeness and plausibility.',
              'Verified incidents are added to the map and analytics — neighborhood-level only, no addresses.',
              'If you provided contact information and follow-up is needed, we may reach out.',
            ].map((step, i) => (
              <li key={i} className="flex gap-3 font-sans text-sm text-gray-700">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-navy-600 text-white flex items-center justify-center text-xs font-semibold">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="border border-cream-200 rounded-lg p-5 mb-8 bg-white">
          <p className="font-sans text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
            Additional Resources
          </p>
          <ul className="space-y-3">
            <li>
              <p className="font-sans text-sm font-medium text-navy-800">
                ADL — Report an Incident
              </p>
              <a
                href="https://www.adl.org/report-incident"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs text-navy-600 hover:underline"
              >
                adl.org/report-incident
              </a>
            </li>
            <li>
              <p className="font-sans text-sm font-medium text-navy-800">
                FBI — Submit a Tip
              </p>
              <a
                href="https://tips.fbi.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs text-navy-600 hover:underline"
              >
                tips.fbi.gov
              </a>
            </li>
            <li>
              <p className="font-sans text-sm font-medium text-navy-800">
                LAPD Hate Crime Unit
              </p>
              <p className="font-sans text-xs text-gray-500">
                Contact your local LAPD division to file a hate crime report.
                Non-emergency: (877) 275-5273
              </p>
            </li>
            <li>
              <p className="font-sans text-sm font-medium text-navy-800">
                JFEDLA Community Security Initiative (CSI)
              </p>
              <p className="font-sans text-xs text-gray-500">
                Contact CSI through the Jewish Federation of Greater Los Angeles
                for community-level security concerns.
              </p>
            </li>
          </ul>
        </div>

        <button
          onClick={() => {
            setForm(INITIAL_FORM);
            setStep(1);
            setSubmitted(false);
          }}
          className="inline-flex items-center justify-center bg-navy-800 text-white px-6 py-2.5 rounded font-sans font-semibold text-sm hover:bg-navy-700 transition-colors"
        >
          Report Another Incident
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-cream-200 shadow-sm p-8">
      <ProgressIndicator currentStep={step} />

      {/* Step 1: What Happened */}
      {step === 1 && (
        <div>
          <h2 className="font-serif text-xl font-bold text-navy-800 mb-6">
            What Happened
          </h2>

          {/* Category */}
          <fieldset className="mb-6">
            <legend className={labelClass}>
              Incident Type <span className="text-red-500">*</span>
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              {CATEGORIES.map((cat) => {
                const selected = form.category === cat.value;
                return (
                  <label
                    key={cat.value}
                    className={[
                      'flex items-start gap-3 border rounded-lg px-4 py-3 cursor-pointer transition-colors',
                      selected
                        ? 'border-navy-600 bg-navy-50 ring-1 ring-navy-600'
                        : 'border-gray-200 bg-white hover:border-gray-300',
                    ].join(' ')}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={cat.value}
                      checked={selected}
                      onChange={() => update('category', cat.value)}
                      className="mt-0.5 accent-navy-600 flex-shrink-0"
                    />
                    <div>
                      <p
                        className={[
                          'font-sans text-sm font-semibold',
                          selected ? 'text-navy-800' : 'text-gray-800',
                        ].join(' ')}
                      >
                        {cat.label}
                      </p>
                      <p className="font-sans text-xs text-gray-500 mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Severity */}
          <fieldset className="mb-6">
            <legend className={labelClass}>
              Severity <span className="text-red-500">*</span>
            </legend>
            <div className="flex flex-col sm:flex-row gap-2 mt-1">
              {SEVERITIES.map((sev) => {
                const selected = form.severity === sev.value;
                return (
                  <label
                    key={sev.value}
                    className={[
                      'flex-1 flex items-start gap-3 border rounded-lg px-4 py-3 cursor-pointer transition-colors',
                      selected
                        ? 'border-navy-600 bg-navy-50 ring-1 ring-navy-600'
                        : 'border-gray-200 bg-white hover:border-gray-300',
                    ].join(' ')}
                  >
                    <input
                      type="radio"
                      name="severity"
                      value={sev.value}
                      checked={selected}
                      onChange={() => update('severity', sev.value)}
                      className="mt-0.5 accent-navy-600 flex-shrink-0"
                    />
                    <div>
                      <p
                        className={[
                          'font-sans text-sm font-semibold',
                          selected ? 'text-navy-800' : 'text-gray-800',
                        ].join(' ')}
                      >
                        {sev.label}
                      </p>
                      <p className="font-sans text-xs text-gray-500 mt-0.5">
                        {sev.description}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Description */}
          <div className="mb-2">
            <label htmlFor="description" className={labelClass}>
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows={5}
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder="Describe what happened in as much detail as you can. Do not include names of victims."
              className={inputClass}
            />
            <p className="font-sans text-xs text-gray-400 mt-1">
              Minimum 20 characters. {form.description.length} entered.
            </p>
          </div>
        </div>
      )}

      {/* Step 2: When and Where */}
      {step === 2 && (
        <div>
          <h2 className="font-serif text-xl font-bold text-navy-800 mb-6">
            When and Where
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="date" className={labelClass}>
                Date Occurred <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="date"
                value={form.date}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => update('date', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="time" className={labelClass}>
                Approximate Time{' '}
                <span className="font-sans text-xs text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="time"
                id="time"
                value={form.time}
                onChange={(e) => update('time', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="neighborhood" className={labelClass}>
              Neighborhood <span className="text-red-500">*</span>
            </label>
            <select
              id="neighborhood"
              value={form.neighborhood}
              onChange={(e) => update('neighborhood', e.target.value)}
              className={inputClass}
            >
              <option value="">Select a neighborhood...</option>
              {NEIGHBORHOODS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3 border border-cream-200 rounded bg-cream-50 px-4 py-3">
            <p className="font-sans text-xs text-gray-500 leading-relaxed">
              We never store exact addresses. Only neighborhood-level location is recorded
              and displayed. Coordinates are randomized within the neighborhood boundary
              before storage.
            </p>
          </div>
        </div>
      )}

      {/* Step 3: Contact Information */}
      {step === 3 && (
        <div>
          <h2 className="font-serif text-xl font-bold text-navy-800 mb-6">
            Your Information
          </h2>

          {/* Anonymous toggle */}
          <div className="mb-6 border border-cream-200 rounded-lg px-5 py-4 bg-cream-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-sans text-sm font-semibold text-navy-800">
                  Report Anonymously
                </p>
                <p className="font-sans text-xs text-gray-500 mt-0.5">
                  Your identity will not be recorded
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={form.isAnonymous}
                onClick={() => update('isAnonymous', !form.isAnonymous)}
                className={[
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2',
                  form.isAnonymous ? 'bg-navy-600' : 'bg-gray-300',
                ].join(' ')}
              >
                <span
                  className={[
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    form.isAnonymous ? 'translate-x-5' : 'translate-x-0',
                  ].join(' ')}
                />
              </button>
            </div>
          </div>

          {!form.isAnonymous && (
            <div className="space-y-4">
              <div>
                <label htmlFor="contactName" className={labelClass}>
                  Name{' '}
                  <span className="font-sans text-xs text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  id="contactName"
                  value={form.contactName}
                  onChange={(e) => update('contactName', e.target.value)}
                  placeholder="Your name"
                  className={inputClass}
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="contactEmail" className={labelClass}>
                  Email{' '}
                  <span className="font-sans text-xs text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  value={form.contactEmail}
                  onChange={(e) => update('contactEmail', e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                  autoComplete="email"
                />
              </div>
            </div>
          )}

          <div className="mt-5 border border-cream-200 rounded bg-cream-50 px-4 py-3">
            <p className="font-sans text-xs text-gray-500 leading-relaxed">
              Contact information is never shared publicly and is only used to follow up
              on your report if additional details are needed for verification.
            </p>
          </div>
        </div>
      )}

      {/* Step 4: Review */}
      {step === 4 && (
        <div>
          <h2 className="font-serif text-xl font-bold text-navy-800 mb-6">
            Review Your Report
          </h2>

          <div className="border border-cream-200 rounded-lg overflow-hidden mb-6">
            <table className="w-full font-sans text-sm">
              <tbody className="divide-y divide-cream-200">
                <tr>
                  <td className="px-4 py-3 text-gray-500 font-medium bg-cream-50 w-1/3">
                    Incident Type
                  </td>
                  <td className="px-4 py-3 text-gray-800 capitalize">
                    {form.category.replace('_', ' ')}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-500 font-medium bg-cream-50">
                    Severity
                  </td>
                  <td className="px-4 py-3 text-gray-800 capitalize">{form.severity}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-500 font-medium bg-cream-50">
                    Description
                  </td>
                  <td className="px-4 py-3 text-gray-800 leading-relaxed">
                    {form.description}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-500 font-medium bg-cream-50">
                    Date
                  </td>
                  <td className="px-4 py-3 text-gray-800">
                    {form.date}
                    {form.time ? ` at ${form.time}` : ''}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-500 font-medium bg-cream-50">
                    Neighborhood
                  </td>
                  <td className="px-4 py-3 text-gray-800">{form.neighborhood}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-500 font-medium bg-cream-50">
                    Anonymity
                  </td>
                  <td className="px-4 py-3 text-gray-800">
                    {form.isAnonymous
                      ? 'Anonymous'
                      : `Identified${form.contactName ? ` — ${form.contactName}` : ''}${form.contactEmail ? ` <${form.contactEmail}>` : ''}`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Confirmation checkbox */}
          <label className="flex items-start gap-3 cursor-pointer mb-2">
            <input
              type="checkbox"
              checked={form.confirmed}
              onChange={(e) => update('confirmed', e.target.checked)}
              className="mt-0.5 accent-navy-600 flex-shrink-0 w-4 h-4"
            />
            <span className="font-sans text-sm text-gray-700 leading-relaxed">
              I confirm that the information I have provided is accurate to the best of
              my knowledge.{' '}
              <span className="text-red-500">*</span>
            </span>
          </label>

          {submitError && (
            <div className="mt-4 border border-red-200 bg-red-50 rounded px-4 py-3">
              <p className="font-sans text-sm text-red-700">{submitError}</p>
            </div>
          )}
        </div>
      )}

      {/* Navigation footer */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-cream-200">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className={[
            'font-sans text-sm font-medium px-5 py-2.5 rounded border transition-colors',
            step === 1
              ? 'border-gray-200 text-gray-300 cursor-not-allowed'
              : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900',
          ].join(' ')}
        >
          Back
        </button>

        {step < 4 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={
              (step === 1 && !isStep1Valid()) ||
              (step === 2 && !isStep2Valid())
            }
            className={[
              'font-sans text-sm font-semibold px-6 py-2.5 rounded transition-colors',
              (step === 1 && !isStep1Valid()) || (step === 2 && !isStep2Valid())
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-navy-800 text-white hover:bg-navy-700',
            ].join(' ')}
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isStep4Valid() || isSubmitting}
            className={[
              'font-sans text-sm font-semibold px-6 py-2.5 rounded transition-colors',
              !isStep4Valid() || isSubmitting
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-navy-800 text-white hover:bg-navy-700',
            ].join(' ')}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        )}
      </div>
    </div>
  );
}
