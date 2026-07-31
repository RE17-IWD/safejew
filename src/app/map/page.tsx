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
      {/* Map points are illustrative sample incidents, not verified events. Verified,
          bias-specific antisemitism data (ADL / LA County / CA DOJ / FBI) lives on the
          Dashboard; keep this label honest until incident-level verified points go live. */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center flex-none">
        <span className="text-xs font-sans font-medium text-amber-800">
          Map points are illustrative sample incidents, not verified events. For verified
          antisemitism data, see the{' '}
          <Link href="/dashboard" className="underline font-semibold hover:text-amber-900">
            Dashboard
          </Link>
          .
        </span>
      </div>
      <div className="flex-1 min-h-0">
        <IncidentMap />
      </div>
    </div>
  );
}
