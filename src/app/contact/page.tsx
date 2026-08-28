import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact SafeJew',
  description:
    'Get in touch with the SafeJew team: community members, students, campus staff, synagogues, security teams, press, and partners.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-10 h-0.5 bg-gold-500 mb-6" aria-hidden="true" />
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight">
            Get in Touch
          </h1>
          <p className="mt-4 text-base text-blue-100/75 max-w-xl leading-relaxed font-sans">
            Universities, synagogues, community organizations, security teams, students, press: if
            you are working on Jewish community safety, we want to hear from you. Tell us who you
            are and we will route your message to the right person.
          </p>
        </div>
      </section>

      <section className="bg-cream-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Steer emergencies and incident reports to the right place first. */}
          <div className="mb-8 border border-amber-300 bg-amber-50 rounded-lg px-6 py-5">
            <p className="font-sans text-sm font-semibold text-amber-800 uppercase tracking-wide mb-2">
              Before You Write
            </p>
            <p className="font-sans text-sm text-amber-900 leading-relaxed">
              <strong>This form is not monitored around the clock.</strong> If you are in immediate
              danger, call 911. To put an incident on the map, use the{' '}
              <Link href="/report" className="font-semibold underline">
                report form
              </Link>{' '}
              so it reaches the review queue instead.
            </p>
          </div>

          <ContactForm />

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-cream-200 rounded-lg p-5">
              <h2 className="font-sans font-semibold text-navy-800 text-sm mb-1">Email Us Directly</h2>
              <p className="font-sans text-sm text-gray-600 leading-relaxed mb-2">
                If you would rather use your own mail client, or need to attach files.
              </p>
              <a
                className="font-sans text-sm font-semibold text-navy-700 hover:underline"
                href="mailto:contact.safejew@gmail.com"
              >
                contact.safejew@gmail.com
              </a>
            </div>
            <div className="bg-white border border-cream-200 rounded-lg p-5">
              <h2 className="font-sans font-semibold text-navy-800 text-sm mb-1">Safety Resources</h2>
              <p className="font-sans text-sm text-gray-600 leading-relaxed mb-2">
                Legal help, mental health support, community security, and who to call.
              </p>
              <Link
                className="font-sans text-sm font-semibold text-navy-700 hover:underline"
                href="/safety"
              >
                Browse Safety Resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
