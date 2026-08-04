import type { Metadata } from 'next';
import { CHANGELOG } from '@/data/changelog';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'A transparent history of data and product updates to SafeJew.',
};

function fmt(iso: string): string {
  try {
    return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function ChangelogPage() {
  const latest = CHANGELOG[0]?.date ? fmt(CHANGELOG[0].date) : '—';
  return (
    <>
      <section className="sj-page-hero">
        <div className="bggrid" aria-hidden="true" />
        <div className="sj-wrap">
          <span className="sj-eyebrow">Changelog</span>
          <h1>What&apos;s changed</h1>
          <p>
            A public record of every data refresh and product update. Most recent update:{' '}
            <strong>{latest}</strong>.
          </p>
        </div>
      </section>

      <section className="sj-sec">
        <div className="sj-wrap sj-timeline">
          {CHANGELOG.map((entry, i) => (
            <div className="sj-tl-item" key={i}>
              <div className="sj-tl-date">{fmt(entry.date)}</div>
              <div className="sj-tl-title">{entry.title}</div>
              <ul>
                {entry.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
