import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'What SafeJew collects, why, how long it is kept, and how to have it removed. Incident locations are stored at neighborhood level only.',
};

const LAST_UPDATED = 'August 28, 2026';

export default function PrivacyPage() {
  return (
    <>
      <section className="sj-page-hero">
        <div className="bggrid" aria-hidden="true" />
        <div className="sj-wrap">
          <span className="sj-eyebrow">Legal</span>
          <h1>Privacy Policy</h1>
          <p>
            SafeJew exists because people trust us with sensitive information. This page explains
            exactly what we collect, why, and how to have it removed. Last updated {LAST_UPDATED}.
          </p>
        </div>
      </section>

      <section className="sj-sec">
        <div className="sj-wrap sj-prose">
          <div className="sj-note" style={{ marginBottom: 32 }}>
            <b>The short version.</b> We never store the exact address of an incident. Reporting is
            anonymous by default. We run no advertising or behavioural tracking of any kind, and we
            do not sell or share your information. Email{' '}
            <a href="mailto:contact.safejew@gmail.com">contact.safejew@gmail.com</a> and we will
            delete what you sent us.
          </div>

          <h2>Who We Are</h2>
          <p>
            SafeJew is an independent, volunteer-run project based in Los Angeles, California,
            founded by Adrian Erlikhman, Ryan Erlikhman, and Yonatan Zarur. It is not a government
            body, a law enforcement agency, or a security provider. For any privacy question,
            contact us at{' '}
            <a href="mailto:contact.safejew@gmail.com">contact.safejew@gmail.com</a>.
          </p>

          <h2>What We Collect</h2>
          <h3>Incident reports</h3>
          <p>
            When you submit a report we collect the incident category, severity, your description,
            the date and optional time, and a neighborhood or campus. Reporting is anonymous by
            default. Contact details are collected only if you switch anonymity off and choose to
            provide them.
          </p>
          <h3>Contact messages</h3>
          <p>
            The <Link href="/contact">contact form</Link> collects your email address, how you are
            involved, your message, and, if you provide them, your name, organization, and subject.
            We use this only to reply to you.
          </p>
          <h3>Campus requests</h3>
          <p>
            If you ask us to add a campus, we collect the school name, city, state, an optional
            website and notes, and an optional email so we can follow up.
          </p>
          <h3>Technical data</h3>
          <p>
            Our hosting provider records standard server logs, including IP addresses and request
            timestamps. We use the IP address only to rate-limit submissions and blunt abuse of the
            public forms. We do not use it to build a profile of you.
          </p>

          <h2>Location Is Always Approximate</h2>
          <p>
            This is the most important promise on this page. The reporting form never asks for a
            street address, and we never store one. Every report is anchored to the centre point of
            a neighborhood or campus, and a small random offset is applied before storage. What ends
            up in the database is a general area, not the place where something happened to you.
          </p>

          <h2>What We Do Not Do</h2>
          <ul>
            <li>We do not sell, rent, or trade your information.</li>
            <li>
              We run no advertising networks, no behavioural profiling, and no session recording.
            </li>
            <li>
              We load no third-party analytics or tracking scripts on the reporting form, or
              anywhere else on this site.
            </li>
            <li>We do not publish reporter names, emails, or any contact details.</li>
          </ul>

          <h2>Cookies and Local Storage</h2>
          <p>
            SafeJew does not use advertising or analytics cookies, so there is nothing to opt into
            or out of. The site uses only the following, all strictly necessary:
          </p>
          <ul>
            <li>
              <strong>Your browser&apos;s local storage</strong> remembers that you dismissed the
              cookie notice, so it is not shown on every page.
            </li>
            <li>
              <strong>Your browser&apos;s session storage</strong> remembers that you have already
              seen the opening animation, so it plays once per visit.
            </li>
            <li>
              <strong>A session cookie</strong> is set only on the private administrator page, to
              keep a signed-in reviewer signed in. It is never set for ordinary visitors.
            </li>
          </ul>
          <p>
            None of this data leaves your device except the admin session cookie, and none of it is
            used to identify or track you across sites.
          </p>

          <h2>Who Processes Your Data</h2>
          <p>
            We keep the vendor list deliberately short. The site is hosted on Vercel, and
            submissions are stored in a Supabase (PostgreSQL) database. Both act as service
            providers to SafeJew and hold data on our behalf under their own security terms. Nobody
            else receives your submissions.
          </p>

          <h2>How We Use Reports</h2>
          <p>
            A person reviews every community submission before it appears anywhere public. If a
            report is published it appears on the map as a category, severity, description, date,
            and approximate area. Contact details, if you provided any, stay private and are used
            only to follow up on the report. Published reports are shown as a clearly-labeled
            community layer, kept separate from official statistics.
          </p>

          <h2>How Long We Keep Things</h2>
          <ul>
            <li>
              <strong>Published incidents</strong> are kept indefinitely as part of the historical
              record, in the approximate, de-identified form described above.
            </li>
            <li>
              <strong>Reporter contact details</strong> are deleted once a report is reviewed and
              any follow-up is finished.
            </li>
            <li>
              <strong>Contact messages and campus requests</strong> are kept while the conversation
              is live and deleted when it is closed out.
            </li>
            <li>
              <strong>Rejected reports</strong> are removed during routine cleanup.
            </li>
          </ul>

          <h2>Your Choices</h2>
          <p>
            You can ask us for a copy of what we hold about you, ask us to correct it, or ask us to
            delete it. Email{' '}
            <a href="mailto:contact.safejew@gmail.com">contact.safejew@gmail.com</a> with enough
            detail to find the record, such as the date you submitted it and roughly what it said.
            We will respond within 30 days. If you reported anonymously we may have nothing that
            can be tied back to you, which is the point.
          </p>
          <p>
            California residents have rights under the CCPA and CPRA, including the right to know,
            delete, and correct, and the right not to be discriminated against for exercising them.
            We do not sell or share personal information as those laws define it, so there is no
            opt-out to exercise.
          </p>

          <h2>Children</h2>
          <p>
            SafeJew is a public information site, and a great deal of antisemitism happens to
            students. We do not knowingly collect personal information from children under 13. If
            you believe a child has sent us personal information, contact us and we will remove it.
          </p>

          <h2>Security</h2>
          <p>
            Submissions travel over HTTPS and are stored in an access-controlled database. Report
            details, including any contact information, are readable only by SafeJew reviewers. No
            system is perfect, and we will not pretend otherwise, but we keep the amount of
            sensitive data we hold as small as we can, which is the strongest protection available.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            If we change this policy we will update the date at the top of this page. Material
            changes to how we handle reports will be called out on the site.
          </p>

          <div className="sj-note">
            <b>Questions?</b> Email{' '}
            <a href="mailto:contact.safejew@gmail.com">contact.safejew@gmail.com</a> or use the{' '}
            <Link href="/contact">contact form</Link>. See also our{' '}
            <Link href="/terms">Terms of Use</Link> and{' '}
            <Link href="/methodology">Methodology</Link>.
          </div>
        </div>
      </section>
    </>
  );
}
