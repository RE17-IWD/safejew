import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Incident Map',
  description: 'Interactive map of antisemitic incidents across Greater Los Angeles.',
};

const IncidentMap = dynamic(() => import('@/components/map/IncidentMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-navy-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-gray-500 font-sans">Loading map...</p>
      </div>
    </div>
  ),
});

export default function MapPage() {
  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 4rem)' }}>
      {/* Each point is a real, documented incident with a named news/official source
          (click a pin to open it). Aggregate, bias-specific statistics live on the Dashboard. */}
      <div className="bg-navy-50 border-b border-navy-100 px-4 py-2.5 text-center flex-none">
        <span className="block text-xs font-sans font-medium text-navy-700">
          Each pin is a documented incident, from SafeJew&apos;s own sourced records and the{' '}
          <a href="https://www.adl.org/apps/heatmap/" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-navy-900">
            ADL H.E.A.T. Map
          </a>{' '}
          (locations approximate); amber pins are recent news coverage. Click any pin for its source.
          Aggregate statistics are on the{' '}
          <Link href="/dashboard" className="underline font-semibold hover:text-navy-900">
            Dashboard
          </Link>
          .
        </span>
        <span className="block text-xs font-sans text-navy-800 mt-1">
          <span className="font-bold">Underreporting is the biggest limitation:</span> most antisemitic
          incidents are never reported, so what is shown here is likely only a small fraction of what actually occurs.
        </span>
      </div>
      <div className="flex-1 min-h-0">
        <IncidentMap />
      </div>
    </div>
  );
}
