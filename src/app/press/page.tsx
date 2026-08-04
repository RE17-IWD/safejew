import type { Metadata } from 'next';
import { NOTABLE_2026 } from '@/data/hate-crime-stats';

export const metadata: Metadata = {
  title: 'In the news',
  description: 'Recent antisemitic incidents in Greater Los Angeles and related coverage.',
};

function fmt(date: string): string {
  // supports "2026-07-28" and "2026-06"
  const parts = date.split('-');
  try {
    if (parts.length >= 3) {
      return new Date(date + 'T12:00:00Z').toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    if (parts.length === 2) {
      return new Date(date + '-01T12:00:00Z').toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
    }
  } catch {
    /* fall through */
  }
  return date;
}

export default function PressPage() {
  return (
    <>
      <section className="sj-page-hero">
        <div className="bggrid" aria-hidden="true" />
        <div className="sj-wrap">
          <span className="sj-eyebrow">In the news</span>
          <h1>Recent incidents &amp; coverage</h1>
          <p>
            A running feed of notable antisemitic incidents across Greater Los Angeles and beyond,
            each linked to its source. Working on a story?{' '}
            <a href="mailto:contact.safejew@gmail.com" style={{ color: '#8fb4ff', fontWeight: 600 }}>
              Get in touch
            </a>
            .
          </p>
        </div>
      </section>

      <section className="sj-sec">
        <div className="sj-wrap">
          <div className="sj-news-grid">
            {NOTABLE_2026.map((n, i) => (
              <a
                key={i}
                className="sj-news"
                href={n.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="meta">
                  <span className="date">{fmt(n.date)}</span>
                  <span className="place">· {n.place}</span>
                </div>
                <h3>{n.summary}</h3>
                <p>Read the source →</p>
              </a>
            ))}
          </div>

          <p
            style={{
              marginTop: 22,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--faint)',
            }}
          >
            // Curated from public news reports. References do not imply endorsement.
          </p>
        </div>
      </section>
    </>
  );
}
