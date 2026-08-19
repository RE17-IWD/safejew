'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Incident, IncidentCategory, CommunitySpace, CommunitySpaceType } from '@/types';

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

const SEVERITY_OPACITY: Record<string, number> = { high: 0.9, medium: 0.7, low: 0.5 };

const SPACE_COLOR = '#2e7d6e';
const SPACE_LABELS: Record<CommunitySpaceType, string> = {
  synagogue: 'Synagogue',
  jcc: 'Jewish Community Center',
  hillel: 'Hillel / Jewish Student Center',
  community_center: 'Community Center',
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
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return iso;
  }
}

export default function CampusMap({ campusLat, campusLng, campusName, incidents }: CampusMapProps) {
  const [showSpaces, setShowSpaces] = useState(false);
  const [spaces, setSpaces] = useState<CommunitySpace[]>([]);
  const [spacesLoading, setSpacesLoading] = useState(false);
  const [spacesError, setSpacesError] = useState(false);

  function toggleSpaces() {
    const next = !showSpaces;
    setShowSpaces(next);
    if (next && spaces.length === 0 && !spacesLoading) {
      setSpacesLoading(true);
      setSpacesError(false);
      fetch(`/api/community-spaces?lat=${campusLat}&lng=${campusLng}`)
        .then((r) => r.json())
        .then(({ spaces: data }) => setSpaces(Array.isArray(data) ? data : []))
        .catch(() => setSpacesError(true))
        .finally(() => setSpacesLoading(false));
    }
  }

  return (
    <div className="rounded-lg overflow-hidden border border-cream-200">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 px-3 py-2 bg-white border-b border-cream-200">
        <span className="font-sans text-xs text-gray-600">
          {incidents.length} documented {incidents.length === 1 ? 'incident' : 'incidents'} near {campusName}
        </span>
        <button
          type="button"
          onClick={toggleSpaces}
          className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-navy-700 hover:text-navy-900"
          aria-pressed={showSpaces}
        >
          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: SPACE_COLOR }} />
          {spacesLoading ? 'Loading…' : showSpaces ? 'Hide Jewish community spaces' : 'Show Jewish community spaces'}
        </button>
      </div>

      <MapContainer
        key={`${campusLat},${campusLng}`}
        center={[campusLat, campusLng]}
        zoom={14}
        style={{ height: '380px', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Circle
          center={[campusLat, campusLng]}
          radius={800}
          pathOptions={{ color: '#1e3a5f', weight: 2, opacity: 0.6, fill: false }}
        />

        {incidents.map((inc) => {
          const lat = Number(inc.lat);
          const lng = Number(inc.lng);
          if (!isFinite(lat) || !isFinite(lng)) return null;
          const category = (inc.category ?? 'other') as IncidentCategory;
          const color = CATEGORY_COLORS[category] ?? '#4a5568';
          const opacity = SEVERITY_OPACITY[inc.severity ?? 'medium'] ?? 0.7;
          return (
            <CircleMarker
              key={inc.id}
              center={[lat, lng]}
              radius={7}
              pathOptions={{ color, fillColor: color, fillOpacity: opacity, weight: 1.5 }}
            >
              <Popup>
                <div className="font-sans text-xs leading-relaxed min-w-[160px]">
                  <p className="font-semibold text-navy-800 mb-0.5">{inc.neighborhood ?? formatCategory(category)}</p>
                  <p className="text-gray-600 mb-1">{formatCategory(category)}</p>
                  {inc.occurred_at && <p className="text-gray-500 mb-1">{formatDate(inc.occurred_at)}</p>}
                  {inc.source_url && (
                    <a href={inc.source_url} target="_blank" rel="noopener noreferrer" className="text-navy-700 underline">
                      {inc.source_name ?? 'Source'} ↗
                    </a>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}

        {showSpaces &&
          spaces.map((sp) => (
            <CircleMarker
              key={sp.id}
              center={[sp.lat, sp.lng]}
              radius={7}
              pathOptions={{ color: SPACE_COLOR, fillColor: SPACE_COLOR, fillOpacity: 0.85, weight: 2, dashArray: '4 3' }}
            >
              <Popup>
                <div className="font-sans text-xs leading-relaxed min-w-[160px]">
                  <p className="font-semibold text-navy-800 mb-0.5">{sp.name}</p>
                  <p className="text-gray-600">{SPACE_LABELS[sp.type] ?? sp.type}</p>
                  {sp.address && <p className="text-gray-500 mt-1">{sp.address}</p>}
                </div>
              </Popup>
            </CircleMarker>
          ))}
      </MapContainer>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-3 py-2 bg-white border-t border-cream-200">
        {(Object.entries(CATEGORY_COLORS) as [IncidentCategory, string][]).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="font-sans text-xs text-gray-600">{formatCategory(cat)}</span>
          </div>
        ))}
        {showSpaces && (
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full border" style={{ backgroundColor: SPACE_COLOR, borderColor: SPACE_COLOR }} />
            <span className="font-sans text-xs text-gray-600">
              Community spaces{spacesError ? ' (unavailable)' : spaces.length ? ` (${spaces.length})` : ''}
            </span>
          </div>
        )}
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="inline-block w-4 border border-navy-600 opacity-60" />
          <span className="font-sans text-xs text-gray-500">{campusName} (~800m)</span>
        </div>
      </div>
    </div>
  );
}
