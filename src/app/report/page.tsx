'use client';

import ReportForm from '@/components/report/ReportForm';

export default function ReportPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-10 h-0.5 bg-gold-500 mb-6" aria-hidden="true" />
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight">
            Report an Incident
          </h1>
          <p className="mt-4 text-base text-blue-100/75 max-w-xl leading-relaxed font-sans">
            Community reports help us identify patterns and protect Jewish communities
            across Greater Los Angeles. All submissions are reviewed by our team before
            publication.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-cream-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Disclaimer */}
          <div className="mb-8 border border-amber-300 bg-amber-50 rounded-lg px-6 py-5">
            <p className="font-sans text-sm font-semibold text-amber-800 uppercase tracking-wide mb-2">
              Important Notice
            </p>
            <p className="font-sans text-sm text-amber-900 leading-relaxed">
              <strong>SafeJew is not a law enforcement agency.</strong> If you are in immediate
              danger, call 911. Reporting to SafeJew does not replace reporting to police, the ADL,
              or the FBI. For emergencies or ongoing threats, contact local law enforcement first.
            </p>
          </div>

          {/* Form */}
          <ReportForm />
        </div>
      </section>
    </>
  );
}
