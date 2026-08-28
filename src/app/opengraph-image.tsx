import { ImageResponse } from 'next/og';
import { LAPD_CITY_2026_YTD } from '@/data/hate-crime-stats';

export const runtime = 'edge';
export const alt = 'SafeJew: Jewish Community Safety Analytics for Greater Los Angeles';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const MARK =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 110">
      <polygon points="60,8 101,78 19,78" fill="#ffffff"/>
      <polygon points="60,102 19,32 101,32" fill="#ffffff"/>
      <circle cx="60" cy="55" r="14" fill="#8fb4ff"/>
      <circle cx="60" cy="55" r="8" fill="#ffffff"/>
      <circle cx="60" cy="55" r="3.5" fill="#0a1f44"/>
    </svg>`
  );

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          background: 'linear-gradient(135deg, #0a1f44 0%, #14357f 55%, #1a56db 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MARK} width={56} height={56} alt="" />
          <div style={{ display: 'flex', marginLeft: 16, fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em' }}>
            <span>Safe</span>
            <span style={{ color: '#8fb4ff' }}>Jew</span>
          </div>
          <div
            style={{
              display: 'flex',
              marginLeft: 'auto',
              fontSize: 20,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.12em',
            }}
          >
            GREATER LOS ANGELES
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 74, fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.04em' }}>
            <span>Know where antisemitism</span>
            <span style={{ color: '#8fb4ff' }}>is happening.</span>
          </div>
          <div style={{ display: 'flex', marginTop: 22, fontSize: 27, color: 'rgba(255,255,255,0.82)', lineHeight: 1.4, maxWidth: 940 }}>
            A live map of antisemitic incidents: community reports plus verified LAPD, ADL, FBI, and
            California DOJ data.
          </div>
        </div>

        {/* Live stat footer */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 12,
              padding: '14px 22px',
            }}
          >
            <span style={{ fontSize: 34, fontWeight: 800, marginRight: 12 }}>{LAPD_CITY_2026_YTD.incidents}</span>
            <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.75)' }}>
              anti-Jewish hate crimes in LA, 2026 so far
            </span>
          </div>
          <div style={{ display: 'flex', marginLeft: 'auto', fontSize: 22, color: '#8fb4ff', fontWeight: 700 }}>
            safejew.org
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
