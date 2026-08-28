import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'The terms that govern use of SafeJew: what the data is and is not, acceptable use of the reporting tools, and the limits of what this site can tell you.',
};

const LAST_UPDATED = 'August 28, 2026';

export default function TermsPage() {
  return (
    <>
      <section className="sj-page-hero">
        <div className="bggrid" aria-hidden="true" />
        <div className="sj-wrap">
          <span className="sj-eyebrow">Legal</span>
          <h1>Terms of Use</h1>
          <p>
            These terms govern your use of safejew.org. By using the site you agree to them. Last
            updated {LAST_UPDATED}.
          </p>
        </div>
      </section>

      <section className="sj-sec">
        <div className="sj-wrap sj-prose">
          <div className="sj-note" style={{ marginBottom: 32 }}>
            <b>In an emergency, call 911.</b> SafeJew is an information project, not an emergency
            service, not a law enforcement agency, and not a security provider. Submitting a report
            here does not notify police and does not replace reporting to police, the ADL, or the
            FBI.
          </div>

          <h2>What SafeJew Is</h2>
          <p>
            SafeJew compiles publicly reported antisemitic incidents and official statistics into a
            map and a set of dashboards for Greater Los Angeles, and accepts community reports that
            a person reviews before publication. It is an independent volunteer project. It is not
            affiliated with or endorsed by the ADL, the FBI, the LAPD, the California Department of
            Justice, Hillel International, or the Jewish Federation Los Angeles, except where we say
            so explicitly. Grant support does not imply endorsement.
          </p>

          <h2>The Data Has Limits</h2>
          <p>
            Everything on this site is provided for informational purposes only. Read the{' '}
            <Link href="/methodology">Methodology</Link> page before drawing conclusions from any
            figure here. In particular:
          </p>
          <ul>
            <li>
              <strong>Underreporting is severe.</strong> Most antisemitic incidents are never
              reported to anyone. Every number on this site is a floor, not a ceiling.
            </li>
            <li>
              <strong>Locations are approximate.</strong> Incidents are placed at neighborhood or
              campus level with a random offset. A pin marks a general area, never a specific
              address, building, or person.
            </li>
            <li>
              <strong>Sources are not directly comparable.</strong> Different bodies count
              incidents differently, and we do not stitch their series together.
            </li>
            <li>
              <strong>Community reports are user-submitted.</strong> They are reviewed for
              plausibility, not investigated, and they are displayed as a separate, clearly-labeled
              layer.
            </li>
          </ul>
          <p>
            Nothing here is legal advice, security advice, or a safety assessment of any location,
            organization, or neighborhood. Do not use this site as the basis for a decision that
            requires professional judgement.
          </p>

          <h2>Using the Reporting Tools</h2>
          <p>When you submit a report or a message, you agree that:</p>
          <ul>
            <li>
              What you submit is truthful and describes something you experienced or witnessed, or
              that was credibly described to you.
            </li>
            <li>
              You will not submit knowingly false, fabricated, or malicious reports. Filing a
              deliberately false report wastes reviewer time and corrupts data that people rely on
              for their safety.
            </li>
            <li>
              You will not include the names, addresses, phone numbers, or other identifying
              details of private individuals, whether victims, witnesses, or people you believe
              responsible. We remove such details before publication.
            </li>
            <li>
              You will not use the forms to harass, threaten, defame, or accuse a named person or
              organization.
            </li>
            <li>
              You grant SafeJew permission to review, edit for clarity and privacy, publish, and
              retain your submission in the de-identified form described in our{' '}
              <Link href="/privacy">Privacy Policy</Link>.
            </li>
          </ul>
          <p>
            We may decline, edit, or remove any submission at our discretion, and we may block
            access from sources that abuse the forms.
          </p>

          <h2>Acceptable Use of the Site</h2>
          <p>You agree not to:</p>
          <ul>
            <li>
              Attempt to gain unauthorised access to the site, its administrative areas, its API, or
              its underlying database.
            </li>
            <li>
              Scrape, bulk-download, or automate requests in a way that degrades the service for
              others, or attempt to re-identify individuals from published data.
            </li>
            <li>
              Use the site or its data to target, surveil, or harass any person, community, or
              institution. This project exists to protect people, and using it against them is a
              flat violation of these terms.
            </li>
            <li>Interfere with the site&apos;s operation or security in any way.</li>
          </ul>

          <h2>Content and Attribution</h2>
          <p>
            The SafeJew name, design, written content, and code are owned by SafeJew and its
            founders. Statistics and reports drawn from the ADL, FBI, LAPD, California Department of
            Justice, Los Angeles County Commission on Human Relations, and news outlets remain the
            property of those sources and are cited on the{' '}
            <Link href="/methodology">Methodology</Link> page. You may quote or link to SafeJew with
            attribution. You may not present our data as your own, or republish it in a way that
            strips the sourcing and caveats that make it meaningful.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            The site links to news coverage, official agencies, and community organizations. We do
            not control those sites, we are not responsible for their content or their privacy
            practices, and a link is not an endorsement. Safety and legal resources are listed for
            convenience; verify details directly with the organization before relying on them.
          </p>

          <h2>No Warranty</h2>
          <p>
            SafeJew is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without
            warranties of any kind, express or implied, including any warranty of accuracy,
            completeness, timeliness, merchantability, or fitness for a particular purpose. We work
            hard to keep the data correct and current, and we still cannot guarantee that it is
            either. The site may be unavailable or interrupted at any time.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, SafeJew and its founders, contributors, and
            volunteers are not liable for any indirect, incidental, consequential, or punitive
            damages, or for any loss arising from your use of, or reliance on, this site or its
            data. Some jurisdictions do not allow certain limitations, in which case the narrowest
            limitation permitted by law applies.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms. The date at the top of this page reflects the current
            version, and continuing to use the site after a change means you accept it.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of California, without regard to its
            conflict-of-law rules.
          </p>

          <div className="sj-note">
            <b>Questions?</b> Email{' '}
            <a href="mailto:contact.safejew@gmail.com">contact.safejew@gmail.com</a> or use the{' '}
            <Link href="/contact">contact form</Link>. See also our{' '}
            <Link href="/privacy">Privacy Policy</Link>.
          </div>
        </div>
      </section>
    </>
  );
}
