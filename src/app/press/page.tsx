import type { Metadata } from 'next';
import news from '@/data/news.json';

export const metadata: Metadata = {
  title: 'In the news',
  description: 'A daily-refreshed feed of recent antisemitism coverage across Greater Los Angeles.',
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
          <h1>Recent coverage</h1>
          <p>
            A live feed of recent antisemitism coverage across Greater Los Angeles, updated every few days
            {updated ? ` (last updated ${updated})` : ''}. These are external news reports, not
            SafeJew-verified incidents. Working on a story?{' '}
            <a href="mailto:contact.safejew@gmail.com" style={{ color: '#8fb4ff', fontWeight: 600 }}>
              Get in touch
            </a>
            .
          </p>
        </div>
      </section>

      <section className="sj-sec">
        <div className="sj-wrap">
          {coverage.length > 0 ? (
            <>
              <div className="sj-news-grid">
                {coverage.slice(0, 15).map((c, i) => (
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
              <p style={{ marginTop: 24, fontSize: 13, color: 'var(--faint)' }}>
                Automated feed pulled from public news sources. References do not imply endorsement,
                and coverage is not vetted by SafeJew.
              </p>
            </>
          ) : (
            <p style={{ color: 'var(--muted)', fontSize: 16 }}>
              No recent coverage is available right now. Please check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
