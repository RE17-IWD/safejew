'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Incident, IncidentCategory } from '@/types';
import { DEMO_INCIDENTS, isDemoMode } from '@/lib/demo-data';

interface CampusMapProps {
  campusId: string;
  campusLat: number;
  campusLng: number;
  campusName: string;
}

const CATEGORY_COLORS: Record<IncidentCategory, string> = {
  vandalism: '#c9941a',
  harassment: '#e53e3e',
  assault: '#742a2a',
  online_threat: '#805ad5',
  other: '#4a5568',
};

const SEVERITY_OPACITY: Record<string, number> = {
  high: 0.9,
  medium: 0.7,
  low: 0.5,
};

function formatCategory(cat: IncidentCategory): string {
  const labels: Record<IncidentCategory, string> = {
    vandalism: 'Vandalism',
    harassment: 'Harassment',
    assault: 'Assault',
    online_threat: 'Online Threat',
    other: 'Other',
  };
  return labels[cat];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// Renders the campus boundary circle after the map is mounted.
function CampusBoundary({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) {
  const map = useMap();

  useEffect(() => {
    const circle = L.circle([lat, lng], {
      radius: 800,
      color: '#1e3a5f',
      weight: 2,
      opacity: 0.6,
      fill: false,
    }).addTo(map);

    return () => {
      circle.remove();
    };
  }, [map, lat, lng]);

  return null;
}

export default function CampusMap({
  campusId,
  campusLat,
  campusLng,
  campusName,
}: CampusMapProps) {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        if (isDemoMode()) {
          const filtered = DEMO_INCIDENTS.filter((inc) => inc.campus_id === campusId);
          setIncidents(filtered);
        } else {
          const res = await fetch(`/api/incidents?campus_id=${encodeURIComponent(campusId)}`);
          if (!res.ok) throw new Error('Failed to fetch incidents');
          const data: Incident[] = await res.json();
          setIncidents(data);
        }
      } catch {
        // Fall back to demo data on error
        const filtered = DEMO_INCIDENTS.filter((inc) => inc.campus_id === campusId);
        setIncidents(filtered);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [campusId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-cream-100 rounded-lg" style={{ height: 400 }}>
        <div className="text-center">
          <div className="w-6 h-6 border-2 border-navy-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="font-sans text-sm text-gray-500">Loading campus map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border border-cream-200" style={{ height: 400 }}>
      <MapContainer
        center={[campusLat, campusLng]}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <CampusBoundary lat={campusLat} lng={campusLng} />

        {incidents.map((inc) => (
          <CircleMarker
            key={inc.id}
            center={[inc.lat, inc.lng]}
            radius={8}
            pathOptions={{
              color: CATEGORY_COLORS[inc.category],
              fillColor: CATEGORY_COLORS[inc.category],
              fillOpacity: SEVERITY_OPACITY[inc.severity] ?? 0.7,
              weight: 1.5,
            }}
          >
            <Popup>
              <div className="font-sans text-xs leading-relaxed min-w-[160px]">
                <p className="font-semibold text-navy-800 mb-1">
                  {formatCategory(inc.category)}
                </p>
                <p className="text-gray-500 mb-1">{inc.neighborhood}</p>
                <p className="text-gray-400">{formatDate(inc.occurred_at)}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 px-3 py-2 bg-white border-t border-cream-200">
        {(Object.entries(CATEGORY_COLORS) as [IncidentCategory, string][]).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="font-sans text-xs text-gray-600">{formatCategory(cat)}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="inline-block w-4 border border-navy-600 opacity-60" />
          <span className="font-sans text-xs text-gray-500">{campusName} boundary (~800m)</span>
        </div>
      </div>
    </div>
  );
}
