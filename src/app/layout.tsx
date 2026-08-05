import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, IBM_Plex_Mono, Inter, DM_Serif_Display } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Intro from '@/components/Intro';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-plex',
  weight: ['400', '500', '600'],
  display: 'swap',
});

// Kept so existing inner pages that use font-sans / font-serif are unaffected.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://safejew.org'),
  title: {
    default: 'SafeJew — Jewish Community Safety Analytics',
    template: '%s | SafeJew',
  },
  description:
    'A live watch on antisemitism across Greater Los Angeles — community reports plus verified LAPD, ADL, FBI, and California DOJ data, on one map.',
  openGraph: {
    title: 'SafeJew — Jewish Community Safety Analytics',
    description:
      'A live watch on antisemitism across Greater Los Angeles — built on verified data.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${plexMono.variable} ${inter.variable} ${dmSerif.variable}`}>
      <body className="min-h-screen flex flex-col">
        <a href="#main-content" className="sj-skip">
          Skip to content
        </a>
        <Intro />
        <Nav />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
