import type { Metadata } from 'next';
import { Inter, DM_Serif_Display } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SafeJew — Jewish Community Safety Analytics',
    template: '%s | SafeJew',
  },
  description:
    'Data-driven safety intelligence for Jewish communities across Greater Los Angeles and beyond.',
  openGraph: {
    title: 'SafeJew — Jewish Community Safety Analytics',
    description:
      'Data-driven safety intelligence for Jewish communities across Greater Los Angeles.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream-50 font-sans">
        <Nav />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
