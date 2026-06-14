import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { isDemoMode } from '@/lib/demo-data';

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
  const demo = isDemoMode();
  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 4rem)', marginTop: '4rem' }}>
      {demo && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center flex-none">
          <span className="text-xs font-sans font-medium text-amber-800">
            Demonstration data for product preview — not real incidents
          </span>
        </div>
      )}
      <div className="flex-1 min-h-0">
        <IncidentMap />
      </div>
    </div>
  );
}
