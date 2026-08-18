'use client';

import { MapContainer, TileLayer, CircleMarker, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Incident, IncidentCategory } from '@/types';

interface CampusMapProps {
  campusLat: number;
  campusLng: number;
  campusName: string;
  incidents: Incident[];
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
  return labels[cat] ?? cat;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function CampusMap({
  campusLat,
  campusLng,
  campusName,
  incidents,
}: CampusMapProps) {
  return (
    <div className="rounded-lg overflow-hidden border border-cream-200" style={{ height: 400 }}>
      <MapContainer
        key={`${campusLat},${campusLng}`}
        center={[campusLat, campusLng]}
        zoom={14}
        style={{ height: '400px', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Campus boundary circle — declarative, no imperative L.circle */}
        <Circle
          center={[campusLat, campusLng]}
          radius={800}
          pathOptions={{
            color: '#1e3a5f',
            weight: 2,
            opacity: 0.6,
            fill: false,
          }}
        />

        {incidents.map((inc) => {
          const lat = Number(inc.lat);
          const lng = Number(inc.lng);
          if (!isFinite(lat) || !isFinite(lng)) return null;
          const category = (inc.category ?? 'other') as IncidentCategory;
          const severity = inc.severity ?? 'medium';
          const color = CATEGORY_COLORS[category] ?? '#4a5568';
          const opacity = SEVERITY_OPACITY[severity] ?? 0.7;
          return (
            <CircleMarker
              key={inc.id}
              center={[lat, lng]}
              radius={8}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: opacity,
                weight: 1.5,
              }}
            >
              <Popup>
                <div className="font-sans text-xs leading-relaxed min-w-[160px]">
                  <p className="font-semibold text-navy-800 mb-1">
                    {formatCategory(category)}
                  </p>
                  <p className="text-gray-500 mb-1">{inc.neighborhood ?? ''}</p>
                  <p className="text-gray-500">{inc.occurred_at ? formatDate(inc.occurred_at) : ''}</p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
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
