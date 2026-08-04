import type { Metadata } from 'next';
import Link from 'next/link';
import { SOURCES, DATA_COMPILED } from '@/data/hate-crime-stats';

export const metadata: Metadata = {
  title: 'Methodology',
  description:
    'How SafeJew sources, verifies, and protects the data behind its maps and dashboards.',
};

export default function MethodologyPage() {
  return (
    <>
      <section className="sj-page-hero">
        <div className="bggrid" aria-hidden="true" />
        <div className="sj-wrap">
          <span className="sj-eyebrow">Methodology</span>
          <h1>How we source and verify the data</h1>
          <p>
            SafeJew is only as trustworthy as its data. Here is exactly where every number comes
            from, what &ldquo;verified&rdquo; means, and how we protect the people involved.
          </p>
        </div>
      </section>

      <section className="sj-sec">
        <div className="sj-wrap sj-prose">
          <h2>Where the numbers come from</h2>
          <p>
            Every headline figure on this site traces to a published report from an official body.
            We never invent numbers, and we keep community-submitted reports as a separate,
            clearly-labeled layer — never mixed into the official statistics.
          </p>
          <ul>
            {SOURCES.map((s) => (
              <li key={s.key}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.name}
                </a>{' '}
                — {s.note}
              </li>
            ))}
          </ul>

          <h2>What &ldquo;verified&rdquo; means</h2>
          <p>
            An incident is marked <strong>verified</strong> only when it is corroborated by an
            official record (a police report or an established monitoring organization) or by
            multiple independent, credible accounts. Unverified community submissions are reviewed
            by a person before they ever appear on the map.
          </p>

          <h2>Location &amp; privacy</h2>
          <p>
            To protect victims and witnesses, incident locations are shown at the{' '}
            <strong>neighborhood level</strong>, not at an exact address. We do not publish personal
            information, and we remove details that could identify individuals.
          </p>

          <h2>De-duplication</h2>
          <p>
            The same incident is often reported by several sources. We collapse duplicates by
            matching date, location, and description so a single event is counted once — while
            preserving each corroborating source.
          </p>

          <h2>How often it updates</h2>
          <p>
            A daily job checks each machine-readable source and refreshes the site whenever new
            figures or incidents appear. Annual reports (ADL, LA County, CA DOJ) are incorporated as
            soon as they publish. See the{' '}
            <Link href="/changelog">changelog</Link> for the update history.
          </p>

          <h2>Limitations</h2>
          <p>
            Hate-crime data is undercounted everywhere: many incidents go unreported, and reporting
            practices differ between agencies (for example, FBI UCR/NIBRS counts differ
            methodologically from California DOJ figures, so we never stitch those series together).
            Treat these numbers as a floor, not a ceiling.
          </p>

          <div className="sj-note">
            <b>For informational purposes only.</b> SafeJew does not assess or guarantee the security
            of any location, and nothing here is legal advice. In an emergency, always contact law
            enforcement. Data last compiled {DATA_COMPILED}.
          </div>
        </div>
      </section>
    </>
  );
}
