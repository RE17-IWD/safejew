import type { MetadataRoute } from 'next';

const BASE = 'https://safejew.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/map',
    '/october-7',
    '/dashboard',
    '/campus',
    '/safety',
    '/report',
    '/about',
    '/methodology',
    '/press',
    '/contact',
    '/privacy',
    '/terms',
  ];
  const now = new Date();
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === '' || path === '/map' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : path === '/privacy' || path === '/terms' ? 0.3 : 0.7,
  }));
}
