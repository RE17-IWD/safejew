'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  NATIONAL_ADL,
  LAPD_CITY_2026_YTD,
  FBI_NATIONAL_2024,
  ADL_CALIFORNIA_2025,
  CALIFORNIA_RELIGIOUS_JEWISH_SHARE_2025,
} from '@/data/hate-crime-stats';

const IncidentMap = dynamic(() => import('@/components/map/IncidentMap'), {
  ssr: false,
  loading: () => (
    <div style={{ height: '100%', display: 'grid', placeItems: 'center', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
      Loading map…
    </div>
  ),
});

const HERO_US = NATIONAL_ADL[NATIONAL_ADL.length - 1]; // 2025

/* ---------- count-up (animates when scrolled into view) ---------- */
function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    const run = () => {
      const dur = 1500;
      let start: number | null = null;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        setN(Math.round(value * e));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);
  return (
    <span ref={ref} className="sj-mono">
      {n.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}

/* ---------- trend chart (ADL national series) ---------- */
function TrendChart() {
  const ref = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);
  const W = 860, H = 320, padL = 8, padR = 8, padT = 30, padB = 40, max = 10000;
  const pts = NATIONAL_ADL.map((d, i) => {
    const x = padL + i * ((W - padL - padR) / (NATIONAL_ADL.length - 1));
    const y = H - padB - (d.value / max) * (H - padT - padB);
    return { x, y, ...d };
  });
  const dLine = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const dArea = `${dLine} L${pts[pts.length - 1].x.toFixed(1)} ${H - padB} L${pts[0].x.toFixed(1)} ${H - padB} Z`;
  const ox = pts[0].x + (pts[1].x - pts[0].x) * 0.62;

  useEffect(() => {
    const path = ref.current, area = areaRef.current;
    if (!path) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      if (area) area.style.opacity = '1';
      return;
    }
    const len = path.getTotalLength();
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);
    path.style.transition = 'stroke-dashoffset 1.6s ease';
    if (area) area.style.transition = 'opacity 1s ease .5s';
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            path.style.strokeDashoffset = '0';
            if (area) area.style.opacity = '1';
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(path);
    return () => io.disconnect();
  }, []);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="sjGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(26,86,219,0.22)" />
          <stop offset="100%" stopColor="rgba(26,86,219,0)" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3, 4, 5].map((g) => {
        const gy = padT + g * ((H - padT - padB) / 5);
        return <line key={g} x1={0} y1={gy} x2={W} y2={gy} stroke="rgba(10,31,68,0.06)" strokeWidth={1} />;
      })}
      <path ref={areaRef} d={dArea} fill="url(#sjGrad)" opacity={0} />
      <path ref={ref} d={dLine} fill="none" stroke="#1a56db" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
      <line x1={ox} y1={padT - 6} x2={ox} y2={H - padB} stroke="rgba(229,72,77,0.5)" strokeWidth={1} strokeDasharray="4 4" />
      <text x={ox + 6} y={padT + 6} fill="#e5484d" fontFamily="var(--font-mono)" fontSize={11}>Oct 7, 2023</text>
      {pts.map((p, i) => {
        const emph = i === 2;
        return (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={emph ? 5 : 3.5} fill={emph ? '#e5484d' : '#1a56db'} />
            <text x={p.x} y={p.y - 12} fill={emph ? '#1a56db' : '#697588'} fontFamily="var(--font-mono)" fontSize={11} fontWeight={emph ? 600 : 400} textAnchor={i === 0 ? 'start' : i === pts.length - 1 ? 'end' : 'middle'}>
              {p.value.toLocaleString()}
            </text>
            <text x={p.x} y={H - 14} fill="#97a1b2" fontFamily="var(--font-mono)" fontSize={11} textAnchor={i === 0 ? 'start' : i === pts.length - 1 ? 'end' : 'middle'}>
              {p.year}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function HomePage() {
  // scroll reveal
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.sj-rv'));
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="sj-hero">
        <video src="/hero.mp4" autoPlay muted loop playsInline />
        <div className="scrim" />
        <div className="bggrid" />
        <div className="scan" />
        <div className="sj-corners w"><i /><i /><i /><i /></div>
        <div className="sj-hero-fade" />
        <div className="sj-wrap sj-hero-in">
          <div className="sj-hero-copy sj-rv">
            <span className="sj-tagpill">
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff6b6b', display: 'inline-block' }} />
              Live incident monitor
            </span>
            <h1>Know where antisemitism is <span className="hl">happening.</span></h1>
            <p className="sub">
              SafeJew maps antisemitic incidents across Greater LA — community reports plus verified
              LAPD, ADL, FBI, and California DOJ data, in one live picture.
            </p>
            <div className="cta">
              <Link className="sj-btn sj-btn-white" href="/map">Open the map <span className="sj-arrow">→</span></Link>
              <Link className="sj-btn sj-btn-outlinew" href="/october-7">October 7 report</Link>
            </div>
            <div className="stats">
              <div className="stat">
                <div className="n"><CountUp value={LAPD_CITY_2026_YTD.incidents} /></div>
                <div className="l">LA incidents · 2026 YTD <span className="u">pace {LAPD_CITY_2026_YTD.projectedFullYear}+</span></div>
              </div>
              <div className="stat">
                <div className="n"><CountUp value={HERO_US.value} /></div>
                <div className="l">US incidents · {HERO_US.year} (ADL)</div>
              </div>
              <div className="stat">
                <div className="n"><CountUp value={CALIFORNIA_RELIGIOUS_JEWISH_SHARE_2025} suffix="%" /></div>
                <div className="l">CA religion-bias · targets Jews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE MAP */}
      <section className="sj-mapsec">
        <div className="sj-wrap">
          <div className="sj-sec-head sj-rv">
            <span className="sj-eyebrow">Live map</span>
            <h2>Every verified incident, on the map.</h2>
            <p>
              Filter by category, severity, and source. Search any ZIP or neighborhood to see nearby
              incidents and Jewish community spaces.
            </p>
          </div>
          <div className="sj-mapcard sj-rv">
            <div className="sj-corners"><i /><i /><i /><i /></div>
            <div className="sj-mapbar">
              <span className="title">GREATER_LA</span>
              <Link className="sj-btn sj-btn-line" href="/map" style={{ padding: '8px 14px', fontSize: 13 }}>
                Full map <span className="sj-arrow">→</span>
              </Link>
            </div>
            <div className="sj-mapbody">
              <IncidentMap />
            </div>
            <div className="sj-mapnote">
              <b>Verified incidents</b> shown at neighborhood level for privacy · community reports reviewed before display.
            </div>
          </div>
        </div>
      </section>

      {/* KPI BAND */}
      <section className="sj-band">
        <div className="sj-wrap sj-band-in">
          <div className="sj-kpi sj-rv">
            <div className="row"><span className="num"><CountUp value={LAPD_CITY_2026_YTD.incidents} /></span><span className="sj-chip watch">▲ ~{LAPD_CITY_2026_YTD.pctChangeVsPrevYear}%</span></div>
            <div className="lbl">Anti-Jewish hate crimes in LA, 2026 so far</div>
            <div className="meta">LAPD · Jan–{LAPD_CITY_2026_YTD.throughMonth} · pace {LAPD_CITY_2026_YTD.projectedFullYear}+</div>
          </div>
          <div className="sj-kpi sj-rv">
            <div className="row"><span className="num"><CountUp value={HERO_US.value} /></span><span className="sj-chip down">▼ 33%</span></div>
            <div className="lbl">U.S. antisemitic incidents, {HERO_US.year}</div>
            <div className="meta">ADL Audit · 3rd-highest ever</div>
          </div>
          <div className="sj-kpi sj-rv">
            <div className="row"><span className="num"><CountUp value={FBI_NATIONAL_2024.antiJewishIncidents} /></span><span className="sj-chip up">▲ {FBI_NATIONAL_2024.pctChangeVs2023}%</span></div>
            <div className="lbl">U.S. anti-Jewish hate crimes, 2024</div>
            <div className="meta">FBI · record · {FBI_NATIONAL_2024.shareOfReligiousBias}% religion-bias</div>
          </div>
          <div className="sj-kpi sj-rv">
            <div className="row"><span className="num"><CountUp value={ADL_CALIFORNIA_2025.incidents} /></span><span className="sj-chip watch">2ND STATE</span></div>
            <div className="lbl">ADL incidents in California, 2025</div>
            <div className="meta">2nd-most of any state</div>
          </div>
        </div>
      </section>

      {/* TREND */}
      <section className="sj-trend">
        <div className="sj-wrap">
          <div className="sj-sec-head sj-rv">
            <span className="sj-eyebrow">The national picture</span>
            <h2>A spike after October 7 — then a partial retreat.</h2>
            <p>
              U.S. antisemitic incidents nearly tripled the year of the Hamas attack, peaked in 2024,
              and fell by a third in 2025 — yet 2025 still ranks third-highest on record, and physical
              assaults hit an all-time high.
            </p>
          </div>
          <div className="sj-chartcard sj-rv">
            <div className="sj-corners"><i /><i /><i /><i /></div>
            <div className="sj-ch-head">
              <span className="t">ADL Audit · United States · 2022–2025</span>
              <span className="t" style={{ color: 'var(--blue)' }}>peak 9,354 · 2024</span>
            </div>
            <TrendChart />
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="sj-sec">
        <div className="sj-wrap">
          <div className="sj-sec-head sj-rv">
            <span className="sj-eyebrow">How it works</span>
            <h2>From raw incident to community response</h2>
          </div>
          <div className="sj-cards">
            <div className="sj-card sj-rv">
              <span className="idx">01 / TRACK</span>
              <div className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth={1.8}><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.4" /></svg></div>
              <h3>Tracks incidents</h3>
              <p>Community reports plus LAPD hate-crime data, ADL audits, and FBI statistics — unified and mapped by neighborhood.</p>
            </div>
            <div className="sj-card sj-rv">
              <span className="idx">02 / ANALYZE</span>
              <div className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth={1.8}><path d="M4 19V5M4 19h16M8 15l3-4 3 3 4-6" /></svg></div>
              <h3>Shows patterns</h3>
              <p>Maps and dashboards reveal where incidents cluster, when they spike, and which categories dominate — by month, neighborhood, or campus.</p>
            </div>
            <div className="sj-card sj-rv">
              <span className="idx">03 / CONNECT</span>
              <div className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth={1.8}><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3 2.7-5 6-5s6 2 6 5M17 11l2 2 3-3.5" /></svg></div>
              <h3>Connects community</h3>
              <p>The campus tool surfaces nearby synagogues, Chabad houses, and Jewish community spaces so students know what&apos;s around them.</p>
            </div>
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="sj-method">
        <div className="sj-wrap sj-sec sj-method-in">
          <div className="sj-rv">
            <span className="sj-badge"><span className="dot" />Auto-updated daily</span>
            <h2>Verified data, refreshed automatically.</h2>
            <p>
              Every headline figure traces to a published report from an official body — cited, dated,
              never fabricated. A daily job checks each source and updates the site whenever new figures
              or incidents appear.
            </p>
            <p>
              Community-submitted reports are reviewed before they appear on the map, shown as a
              clearly-labeled layer separate from official statistics.
            </p>
            <Link className="sj-lnk" href="/dashboard">Explore the dashboard <span className="sj-arrow">→</span></Link>
          </div>
          <div className="sj-src-grid sj-rv">
            {[
              { k: 'ADL', n: 'Audit of Antisemitic Incidents — national, 2025.', href: 'https://www.adl.org/resources/report/2025-audit-antisemitic-incidents' },
              { k: 'LAPD', n: 'City of LA hate-crime tracking — 2026 YTD.', href: 'https://www.lapdonline.org/hate-crime' },
              { k: 'CA DOJ', n: 'Hate Crime in California — 2025.', href: 'https://openjustice.doj.ca.gov/' },
              { k: 'FBI', n: 'Crime Data Explorer — national, 2024.', href: 'https://cde.ucr.cjis.gov/' },
              { k: 'LA COUNTY HRC', n: 'Commission on Human Relations report.', href: 'https://hrc.lacounty.gov/' },
              { k: 'COMMUNITY', n: 'Verified reader submissions (reviewed).', href: '/report' },
            ].map((s) => {
              const external = s.href.startsWith('http');
              return (
                <a
                  key={s.k}
                  className="sj-src"
                  href={s.href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <div className="k">
                    {s.k}
                    <span className="ext" aria-hidden="true">{external ? '↗' : '→'}</span>
                  </div>
                  <div className="n">{s.n}</div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sj-sec" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--line)' }}>
        <div className="sj-wrap">
          <div className="sj-cta-two sj-rv">
            <div className="sj-ctabox blue">
              <div className="sj-corners w"><i /><i /><i /><i /></div>
              <span className="sj-eyebrow" style={{ display: 'inline-block', marginBottom: 14, color: '#cfe0ff' }}>Free tool</span>
              <h2>SafeJew for Campus</h2>
              <p>Look up UCLA, USC, wherever you are — local antisemitism data plus nearby synagogues, Chabad houses, and Jewish spaces. No account needed.</p>
              <Link className="sj-btn sj-btn-white" href="/campus">Try the campus tool <span className="sj-arrow">→</span></Link>
            </div>
            <div className="sj-ctabox">
              <span className="sj-eyebrow" style={{ display: 'inline-block', marginBottom: 14 }}>Get in touch</span>
              <h2>Working on community safety?</h2>
              <p>Universities, synagogues, community organizations, security teams — if you&apos;re dealing with these problems, we want to hear from you.</p>
              <a className="sj-btn sj-btn-line" href="mailto:contact.safejew@gmail.com">Contact us <span className="sj-arrow">→</span></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
