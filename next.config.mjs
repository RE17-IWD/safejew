/** @type {import('next').NextConfig} */

// Content-Security-Policy scoped to what the app actually loads:
// - OSM raster tiles (map), Supabase-hosted images
// - 'unsafe-inline' scripts/styles are required by Next.js hydration + Leaflet/
//   Recharts inline styles (no nonce pipeline configured). 'unsafe-eval' is NOT
//   included in production. Outbound data calls all go through same-origin /api routes.
//
// `next dev` compiles client chunks through eval, so without 'unsafe-eval' the
// dev server serves a page that never hydrates: no counters, no rotating word,
// no client components at all. Allow it in development only; production keeps
// the strict policy.
const isDev = process.env.NODE_ENV === 'development';

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https://*.tile.openstreetmap.org https://*.supabase.co",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? ' ws: http://localhost:*' : ''}`,
  "media-src 'self'",
  "worker-src 'self' blob:",
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), payment=(), geolocation=(self)' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-DNS-Prefetch-Control', value: 'off' },
];

const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
