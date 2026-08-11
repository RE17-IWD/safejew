import type { Metadata } from 'next';
import { NOTABLE_2026 } from '@/data/hate-crime-stats';
import news from '@/data/news.json';

export const metadata: Metadata = {
  title: 'In the news',
  description: 'Recent antisemitic incidents in Greater Los Angeles and related coverage.',
};

function fmt(date: string): string {
  const parts = date.split('-');
  try {
    if (date.includes('T') || parts.length >= 3) {
      return new Date(date.length <= 10 ? date + 'T12:00:00Z' : date).toLocaleDateString('en-US', {
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
  const coverage = (news.items ?? []) as { title: string; url: string; source: string; date: string | null }[];
  const updated = news.generatedAt ? fmt(news.generatedAt) : null;

  return (
    <>
      <section className="sj-page-hero">
        <div className="bggrid" aria-hidden="true" />
        <div className="sj-wrap">
          <span className="sj-eyebrow">In the news</span>
          <h1>Recent incidents &amp; coverage</h1>
          <p>
            Notable antisemitic incidents across Greater Los Angeles, plus a live feed of recent
            coverage. Working on a story?{' '}
            <a href="mailto:contact.safejew@gmail.com" style={{ color: '#8fb4ff', fontWeight: 600 }}>
              Get in touch
            </a>
            .
          </p>
        </div>
      </section>

      {/* Verified incidents (curated) */}
      <section className="sj-sec">
        <div className="sj-wrap">
          <div className="sj-sec-head">
            <span className="sj-eyebrow">Verified incidents</span>
            <h2>What&apos;s happened recently</h2>
          </div>
          <div className="sj-news-grid">
            {NOTABLE_2026.map((n, i) => (
              <a key={i} className="sj-news" href={n.url} target="_blank" rel="noopener noreferrer">
                <div className="meta">
                  <span className="date">{fmt(n.date)}</span>
                  <span className="place">· {n.place}</span>
                </div>
                <h3>{n.summary}</h3>
                <p>Read the source →</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Live coverage (scraped daily) */}
      {coverage.length > 0 && (
        <section className="sj-sec" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--line)' }}>
          <div className="sj-wrap">
            <div className="sj-sec-head">
              <span className="sj-eyebrow">Latest coverage</span>
              <h2>In the news lately</h2>
              <p>
                A live feed pulled automatically from news sources, refreshed daily
                {updated ? ` (last updated ${updated})` : ''}. These are external reports, not
                SafeJew-verified incidents.
              </p>
            </div>
            <div className="sj-news-grid">
              {coverage.map((c, i) => (
                <a key={i} className="sj-news" href={c.url} target="_blank" rel="noopener noreferrer">
                  <div className="meta">
                    {c.date && <span className="date">{fmt(c.date)}</span>}
                    <span className="place">· {c.source}</span>
                  </div>
                  <h3>{c.title}</h3>
                  <p>Read the source →</p>
                </a>
              ))}
            </div>
            <p style={{ marginTop: 22, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--faint)' }}>
              // Automated feed. References do not imply endorsement, and coverage is not vetted by SafeJew.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
