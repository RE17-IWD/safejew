'use client';

import { useState } from 'react';

// Kept in sync with VALID_ROLES in src/app/api/contact/route.ts.
const CONTACT_ROLES: { value: string; label: string }[] = [
  { value: 'community_member', label: 'Community member' },
  { value: 'bystander', label: 'Bystander or witness' },
  { value: 'victim', label: 'I was targeted' },
  { value: 'student', label: 'Student' },
  { value: 'campus_staff', label: 'Campus staff, Hillel, or Chabad' },
  { value: 'synagogue', label: 'Synagogue or congregation' },
  { value: 'community_org', label: 'Community organization or nonprofit' },
  { value: 'security', label: 'Security professional' },
  { value: 'law_enforcement', label: 'Law enforcement' },
  { value: 'press', label: 'Press or media' },
  { value: 'educator', label: 'Educator or researcher' },
  { value: 'partner', label: 'Potential partner or funder' },
  { value: 'other', label: 'Other' },
];

const inputClass =
  'border border-gray-300 rounded px-3 py-2 w-full font-sans text-sm focus:outline-none focus:ring-1 focus:ring-navy-500 focus:border-navy-500 bg-white text-gray-900 placeholder-gray-400';
const labelClass = 'block font-sans text-sm font-medium text-gray-700 mb-1';

const INITIAL = {
  name: '',
  email: '',
  role: '',
  roleOther: '',
  organization: '',
  subject: '',
  message: '',
  website: '', // honeypot
};

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof INITIAL>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const isValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()) &&
    form.role !== '' &&
    (form.role !== 'other' || form.roleOther.trim().length >= 2) &&
    form.message.trim().length >= 10;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || isSubmitting) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          role: form.role,
          role_other: form.roleOther,
          organization: form.organization,
          subject: form.subject,
          message: form.message,
          website: form.website,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="bg-white rounded-lg border border-cream-200 shadow-sm p-8">
        <div className="w-10 h-0.5 bg-gold-500 mb-6" aria-hidden="true" />
        <h2 className="font-serif text-2xl font-bold text-navy-800 mb-3">Message Sent</h2>
        <p className="font-sans text-sm text-gray-600 leading-relaxed mb-4">
          Thank you for reaching out. Your message has reached the SafeJew team and we will reply
          to <span className="font-semibold text-navy-800">{form.email.trim()}</span>. We are a
          small volunteer team, so please allow a few days.
        </p>
        <p className="font-sans text-sm text-gray-600 leading-relaxed">
          If this is urgent, email us directly at{' '}
          <a className="text-navy-700 font-semibold hover:underline" href="mailto:contact.safejew@gmail.com">
            contact.safejew@gmail.com
          </a>
          . If you are in immediate danger, call 911.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-cream-200 shadow-sm p-6 sm:p-8">
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => update('website', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name{' '}
            <span className="font-sans text-xs text-gray-500 font-normal">(optional)</span>
          </label>
          <input
            id="contact-name"
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Your name"
            className={inputClass}
            autoComplete="name"
            maxLength={120}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
            autoComplete="email"
            required
            maxLength={200}
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="contact-role" className={labelClass}>
          How are you involved? <span className="text-red-500">*</span>
        </label>
        <select
          id="contact-role"
          value={form.role}
          onChange={(e) => update('role', e.target.value)}
          className={inputClass}
          required
        >
          <option value="">Select one...</option>
          {CONTACT_ROLES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
        <p className="font-sans text-xs text-gray-500 mt-1">
          This tells us who is writing so the right person replies.
        </p>
      </div>

      {form.role === 'other' && (
        <div className="mb-4">
          <label htmlFor="contact-role-other" className={labelClass}>
            Tell us your role <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-role-other"
            type="text"
            value={form.roleOther}
            onChange={(e) => update('roleOther', e.target.value)}
            placeholder="e.g. Parent, volunteer, camp director"
            className={inputClass}
            maxLength={80}
            autoComplete="off"
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="contact-org" className={labelClass}>
            Organization{' '}
            <span className="font-sans text-xs text-gray-500 font-normal">(optional)</span>
          </label>
          <input
            id="contact-org"
            type="text"
            value={form.organization}
            onChange={(e) => update('organization', e.target.value)}
            placeholder="School, synagogue, nonprofit, outlet"
            className={inputClass}
            autoComplete="organization"
            maxLength={160}
          />
        </div>
        <div>
          <label htmlFor="contact-subject" className={labelClass}>
            Subject{' '}
            <span className="font-sans text-xs text-gray-500 font-normal">(optional)</span>
          </label>
          <input
            id="contact-subject"
            type="text"
            value={form.subject}
            onChange={(e) => update('subject', e.target.value)}
            placeholder="What is this about?"
            className={inputClass}
            maxLength={160}
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="contact-message" className={labelClass}>
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={6}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Tell us what you need. If you are reporting an incident, please use the report form instead so it reaches the review queue."
          className={inputClass}
          maxLength={4000}
          required
        />
        <p className="font-sans text-xs text-gray-500 mt-1">
          Minimum 10 characters. {form.message.length} of 4000 used.
        </p>
      </div>

      <div className="border border-cream-200 rounded bg-cream-50 px-4 py-3 mb-6">
        <p className="font-sans text-xs text-gray-500 leading-relaxed">
          We use what you send here only to reply to you. We never sell or share it. Please do not
          include anyone else&apos;s personal details. To report an incident for the map, use the{' '}
          <a href="/report" className="text-navy-700 font-semibold hover:underline">
            report form
          </a>{' '}
          instead. In an emergency, call 911.
        </p>
      </div>

      {error && (
        <div className="mb-4 border border-red-200 bg-red-50 rounded px-4 py-3">
          <p className="font-sans text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={[
            'inline-flex items-center justify-center font-sans text-sm font-semibold px-7 py-3 rounded transition-colors',
            !isValid || isSubmitting
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-navy-800 text-white hover:bg-navy-700',
          ].join(' ')}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        <p className="font-sans text-xs text-gray-500">
          Prefer email?{' '}
          <a className="text-navy-700 font-semibold hover:underline" href="mailto:contact.safejew@gmail.com">
            contact.safejew@gmail.com
          </a>
        </p>
      </div>
    </form>
  );
}
