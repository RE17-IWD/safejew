'use client';

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type {
  Incident,
  IncidentFilters,
  IncidentCategory,
  IncidentSeverity,
  CommunitySpace,
  CommunitySpaceType,
} from '@/types';
import { DEMO_INCIDENTS, isDemoMode } from '@/lib/demo-data';
import FilterPanel from './FilterPanel';

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<IncidentCategory, string> = {
  vandalism: '#c0392b',
  harassment: '#e67e22',
  assault: '#922b21',
  online_threat: '#6c3483',
  other: '#5d6d7e',
};

const CATEGORY_LABELS: Record<IncidentCategory, string> = {
  vandalism: 'Vandalism',
  harassment: 'Harassment',
  assault: 'Assault',
  online_threat: 'Online Threat',
  other: 'Other',
};

const SEVERITY_RADIUS: Record<IncidentSeverity, number> = {
  high: 10,
  medium: 7,
  low: 5,
};

const SPACE_TYPE_LABELS: Record<CommunitySpaceType, string> = {
  synagogue: 'Synagogue',
  jcc: 'Jewish Community Center',
  hillel: 'Hillel / Jewish Student Center',
  community_center: 'Community Center',
};

const COMMUNITY_SPACE_COLOR = '#2e7d6e';
const COMMUNITY_SPACE_STROKE = '#1a5c52';

const DEFAULT_FILTERS: IncidentFilters = {
  categories: ['vandalism', 'harassment', 'assault', 'online_threat', 'other'],
  severities: ['high', 'medium', 'low'],
  sources: ['community', 'ADL', 'FBI', 'LAPD', 'CSI'],
  dateFrom: null,
  dateTo: null,
  campusId: null,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch {
    return iso;
  }
}

const SOURCE_LABELS: Record<string, string> = {
  community: 'Community Report', ADL: 'ADL', FBI: 'FBI', LAPD: 'LAPD', CSI: 'CSI',
};

// ─── MapController (inside MapContainer) ─────────────────────────────────────

function MapController({ target }: { target: [number, number] | null }) {
  const map = useMap();
  const prevTarget = useRef<[number, number] | null>(null);
  useEffect(() => {
    if (target && target !== prevTarget.current) {
      prevTarget.current = target;
      map.flyTo(target, 13, { animate: true, duration: 1.2 });
    }
  }, [map, target]);
  return null;
}

// ─── Legend ───────────────────────────────────────────────────────────────────

interface MapLegendProps {
  showIncidents: boolean;
  showCommunitySpaces: boolean;
}

function MapLegend({ showIncidents, showCommunitySpaces }: MapLegendProps) {
  if (!showIncidents && !showCommunitySpaces) return null;
  return (
    <div
      className="absolute bottom-8 left-4 z-[400] bg-white/95 border border-gray-200 rounded shadow-md px-3 py-2"
      style={{ pointerEvents: 'none' }}
    >
      {showIncidents && (
        <>
          <p className="text-[10px] font-sans font-bold text-gray-500 uppercase tracking-wide mb-1.5">
            Incidents
          </p>
          <div className="space-y-1 mb-2">
            {(Object.entries(CATEGORY_COLORS) as [IncidentCategory, string][]).map(([cat, color]) => (
              <div key={cat} className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full flex-none" style={{ backgroundColor: color }} />
                <span className="text-[11px] font-sans text-gray-700">{CATEGORY_LABELS[cat]}</span>
              </div>
            ))}
          </div>
        </>
      )}
      {showCommunitySpaces && (
        <>
          {showIncidents && <div className="border-t border-gray-100 my-2" />}
          <p className="text-[10px] font-sans font-bold text-gray-500 uppercase tracking-wide mb-1.5">
            Community Spaces
          </p>
          <div className="flex items-center gap-1.5">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full flex-none border-2"
              style={{ backgroundColor: COMMUNITY_SPACE_COLOR, borderColor: COMMUNITY_SPACE_STROKE }}
            />
            <span className="text-[11px] font-sans text-gray-700">Jewish Community Institution</span>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Layer controls (top-right panel) ────────────────────────────────────────

interface LayerControlsProps {
  showIncidents: boolean;
  onToggleIncidents: () => void;
  showCommunitySpaces: boolean;
  onToggleCommunitySpaces: () => void;
  showHeatmap: boolean;
  onToggleHeatmap: () => void;
  spacesLoading: boolean;
}

function LayerControls({
  showIncidents, onToggleIncidents,
  showCommunitySpaces, onToggleCommunitySpaces,
  showHeatmap, onToggleHeatmap,
  spacesLoading,
}: LayerControlsProps) {
  return (
    <div className="absolute top-4 right-4 z-[400] bg-white border border-gray-200 rounded shadow-md px-3 py-2 min-w-[140px]">
      <p className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wide mb-2">Layers</p>
      {/* Incidents toggle */}
      <label className="flex items-center gap-2 cursor-pointer mb-1.5">
        <input
          type="checkbox"
          checked={showIncidents}
          onChange={onToggleIncidents}
          className="w-3.5 h-3.5 accent-navy-600"
        />
        <span className="text-xs font-sans text-gray-700 font-medium">Incidents</span>
      </label>
      {/* Community Spaces toggle */}
      <label className="flex items-center gap-2 cursor-pointer mb-2">
        <input
          type="checkbox"
          checked={showCommunitySpaces}
          onChange={onToggleCommunitySpaces}
          className="w-3.5 h-3.5"
          style={{ accentColor: COMMUNITY_SPACE_COLOR }}
        />
        <span className="text-xs font-sans text-gray-700 font-medium flex items-center gap-1">
          Community Spaces
          {spacesLoading && (
            <span className="inline-block w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin" />
          )}
        </span>
      </label>
      {/* Heatmap sub-toggle */}
      {showIncidents && (
        <button
          onClick={onToggleHeatmap}
          className={`w-full text-left flex items-center gap-1.5 px-2 py-1 rounded text-xs font-sans font-medium transition-colors border ${
            showHeatmap
              ? 'bg-navy-600 text-white border-navy-700'
              : 'text-gray-600 border-gray-200 hover:bg-gray-50'
          }`}
        >
          <svg className="w-3 h-3 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" strokeWidth="2" />
            <circle cx="12" cy="12" r="5" strokeWidth="2" />
            <circle cx="12" cy="12" r="1" strokeWidth="2" />
          </svg>
          Heatmap
        </button>
      )}
    </div>
  );
}

// ─── Location search bar ──────────────────────────────────────────────────────

interface LocationSearchProps {
  onSearch: (lat: number, lng: number, spaces: CommunitySpace[]) => void;
  onEnableSpaces: () => void;
}

function LocationSearch({ onSearch, onEnableSpaces }: LocationSearchProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/community-spaces?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      onSearch(data.lat, data.lng, data.spaces ?? []);
      onEnableSpaces();
      if (data.warning) setError(data.warning);
    } catch {
      setError('Search failed — showing Greater LA results');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] w-72">
      <form onSubmit={handleSubmit} className="flex gap-1.5 shadow-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ZIP or neighborhood..."
          className="flex-1 bg-white border border-gray-200 rounded-l px-3 py-1.5 text-xs font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-navy-500 focus:border-navy-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-navy-600 text-white px-3 py-1.5 rounded-r text-xs font-sans font-medium hover:bg-navy-700 transition-colors disabled:opacity-60"
        >
          {loading ? (
            <span className="inline-block w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            'Find Spaces'
          )}
        </button>
      </form>
      {error && (
        <p className="mt-1 text-[11px] font-sans text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Incident detail panel ────────────────────────────────────────────────────

function IncidentDetailPanel({ incident, onClose }: { incident: Incident; onClose: () => void }) {
  const color = CATEGORY_COLORS[incident.category];
  const severityColors: Record<IncidentSeverity, string> = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-amber-100 text-amber-800',
    low: 'bg-green-100 text-green-800',
  };

  return (
    <div className="w-80 flex-none border-l border-gray-200 bg-white flex flex-col h-full overflow-y-auto z-10 shadow-lg">
      <div className="flex items-start justify-between px-4 pt-4 pb-3 border-b border-gray-100">
        <div>
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-sans font-semibold text-white mb-1"
            style={{ backgroundColor: color }}
          >
            {CATEGORY_LABELS[incident.category]}
          </span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-sans font-medium ml-1.5 ${severityColors[incident.severity]}`}>
            {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
          </span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors ml-2 flex-none" aria-label="Close">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="px-4 py-4 flex-1 space-y-4">
        <div>
          <p className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wide mb-0.5">Date</p>
          <p className="text-sm font-sans text-gray-800">{formatDate(incident.occurred_at)}</p>
        </div>
        <div>
          <p className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wide mb-0.5">Neighborhood</p>
          <p className="text-sm font-sans text-gray-800">{incident.neighborhood}</p>
        </div>
        <div>
          <p className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wide mb-0.5">Description</p>
          <p className="text-sm font-sans text-gray-700 leading-relaxed">{incident.description}</p>
        </div>
        <div>
          <p className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wide mb-0.5">Source</p>
          <p className="text-sm font-sans text-gray-800">{SOURCE_LABELS[incident.source] ?? incident.source}</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded px-3 py-2">
          <p className="text-[11px] font-sans text-gray-500 leading-snug">
            Exact location withheld to protect privacy. Neighborhood-level location shown.
          </p>
        </div>
        <a href="/report" className="inline-flex items-center text-sm font-sans font-medium text-navy-600 hover:text-navy-800 transition-colors">
          Report a related incident
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// ─── Community space detail panel ─────────────────────────────────────────────

function SpaceDetailPanel({ space, onClose }: { space: CommunitySpace; onClose: () => void }) {
  return (
    <div className="w-80 flex-none border-l border-gray-200 bg-white flex flex-col h-full overflow-y-auto z-10 shadow-lg">
      <div className="flex items-start justify-between px-4 pt-4 pb-3 border-b border-gray-100">
        <div>
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-sans font-semibold text-white mb-1"
            style={{ backgroundColor: COMMUNITY_SPACE_COLOR }}
          >
            {SPACE_TYPE_LABELS[space.type]}
          </span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors ml-2 flex-none" aria-label="Close">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="px-4 py-4 flex-1 space-y-4">
        <div>
          <p className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wide mb-0.5">Institution</p>
          <p className="text-sm font-sans font-semibold text-gray-900">{space.name}</p>
        </div>
        {space.address && (
          <div>
            <p className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wide mb-0.5">Address</p>
            <p className="text-sm font-sans text-gray-800">{space.address}</p>
          </div>
        )}
        {space.website && (
          <div>
            <p className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wide mb-0.5">Website</p>
            <a
              href={space.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-sans text-navy-600 hover:text-navy-800 underline break-all"
            >
              {space.website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
        <div className="bg-teal-50 border border-teal-200 rounded px-3 py-2">
          <p className="text-[11px] font-sans font-semibold text-teal-800 mb-1">Safety resources near here</p>
          <p className="text-[11px] font-sans text-teal-700 leading-snug">
            SafeJew does not assess or guarantee the security of any location. These are
            publicly listed community institutions for community connection and resource-finding.
          </p>
        </div>
        <div className="space-y-2">
          <a href="/report" className="inline-flex items-center text-sm font-sans font-medium text-navy-600 hover:text-navy-800 transition-colors">
            Report an incident near here
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
          {space.type === 'hillel' && (
            <div>
              <a href="/campus" className="inline-flex items-center text-sm font-sans font-medium text-navy-600 hover:text-navy-800 transition-colors">
                SafeJew for Campus
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function IncidentMap() {
  // Incident state
  const [incidents, setIncidents] = useState<Incident[]>(DEMO_INCIDENTS);
  const [filters, setFilters] = useState<IncidentFilters>(DEFAULT_FILTERS);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showIncidents, setShowIncidents] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Community spaces state
  const [communitySpaces, setCommunitySpaces] = useState<CommunitySpace[]>([]);
  const [showCommunitySpaces, setShowCommunitySpaces] = useState(false);
  const [spacesLoading, setSpacesLoading] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<CommunitySpace | null>(null);
  const [mapTarget, setMapTarget] = useState<[number, number] | null>(null);

  // Fetch incidents
  useEffect(() => {
    if (isDemoMode()) { setIncidents(DEMO_INCIDENTS); return; }
    setIsLoading(true);
    fetch('/api/incidents?status=verified')
      .then((r) => r.json())
      .then(({ incidents: data }) => { if (Array.isArray(data)) setIncidents(data); })
      .catch(() => setIncidents(DEMO_INCIDENTS))
      .finally(() => setIsLoading(false));
  }, []);

  // Fetch community spaces when layer is first toggled on
  useEffect(() => {
    if (!showCommunitySpaces || communitySpaces.length > 0) return;
    setSpacesLoading(true);
    fetch('/api/community-spaces?lat=34.0522&lng=-118.2437')
      .then((r) => r.json())
      .then(({ spaces }) => { if (Array.isArray(spaces)) setCommunitySpaces(spaces); })
      .catch(() => {})
      .finally(() => setSpacesLoading(false));
  }, [showCommunitySpaces, communitySpaces.length]);

  // Filtered incidents
  const filteredIncidents = useMemo(() => {
    if (!showIncidents) return [];
    return incidents.filter((inc) => {
      if (!filters.categories.includes(inc.category)) return false;
      if (!filters.severities.includes(inc.severity)) return false;
      if (!filters.sources.includes(inc.source)) return false;
      if (filters.dateFrom && new Date(inc.occurred_at) < new Date(filters.dateFrom)) return false;
      if (filters.dateTo && new Date(inc.occurred_at) > new Date(filters.dateTo + 'T23:59:59Z')) return false;
      if (filters.campusId && inc.campus_id !== filters.campusId) return false;
      return true;
    });
  }, [incidents, filters, showIncidents]);

  const handleIncidentClick = useCallback((incident: Incident) => {
    setSelectedIncident(incident);
    setSelectedSpace(null);
  }, []);

  const handleSpaceClick = useCallback((space: CommunitySpace) => {
    setSelectedSpace(space);
    setSelectedIncident(null);
  }, []);

  const handleLocationSearch = useCallback(
    (lat: number, lng: number, spaces: CommunitySpace[]) => {
      setMapTarget([lat, lng]);
      setCommunitySpaces(spaces);
    },
    []
  );

  const handleEnableSpaces = useCallback(() => {
    setShowCommunitySpaces(true);
  }, []);

  const detailOpen = selectedIncident !== null || selectedSpace !== null;

  return (
    <div className="flex h-full w-full relative">
      {/* Left filter panel */}
      <div className="relative z-[500] h-full">
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          incidentCount={filteredIncidents.length}
        />
      </div>

      {/* Map area */}
      <div className="flex-1 relative h-full">
        {isLoading && (
          <div className="absolute inset-0 z-[450] flex items-center justify-center bg-white/70">
            <div className="w-7 h-7 border-2 border-navy-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Location search */}
        <LocationSearch onSearch={handleLocationSearch} onEnableSpaces={handleEnableSpaces} />

        {/* Layer controls */}
        <LayerControls
          showIncidents={showIncidents}
          onToggleIncidents={() => setShowIncidents((v) => !v)}
          showCommunitySpaces={showCommunitySpaces}
          onToggleCommunitySpaces={() => setShowCommunitySpaces((v) => !v)}
          showHeatmap={showHeatmap}
          onToggleHeatmap={() => setShowHeatmap((v) => !v)}
          spacesLoading={spacesLoading}
        />

        <MapContainer
          center={[34.0522, -118.2437]}
          zoom={11}
          zoomControl={false}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <ZoomControl position="bottomright" />
          <MapController target={mapTarget} />

          {/* Incident markers */}
          {filteredIncidents.map((incident) => {
            const baseRadius = SEVERITY_RADIUS[incident.severity];
            const radius = showHeatmap ? 20 : baseRadius;
            const fillOpacity = showHeatmap ? 0.15 : 0.8;
            const color = CATEGORY_COLORS[incident.category];
            return (
              <CircleMarker
                key={incident.id}
                center={[incident.lat, incident.lng]}
                radius={radius}
                fillColor={color}
                fillOpacity={fillOpacity}
                stroke={!showHeatmap}
                color="white"
                weight={1.5}
                eventHandlers={{ click: () => handleIncidentClick(incident) }}
              >
                <Popup>
                  <div className="font-sans text-xs">
                    <p className="font-semibold text-gray-900 mb-0.5">{incident.neighborhood}</p>
                    <p className="text-gray-600">{CATEGORY_LABELS[incident.category]}</p>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}

          {/* Community space markers */}
          {showCommunitySpaces && communitySpaces.map((space) => (
            <CircleMarker
              key={space.id}
              center={[space.lat, space.lng]}
              radius={9}
              fillColor={COMMUNITY_SPACE_COLOR}
              fillOpacity={0.85}
              stroke
              color={COMMUNITY_SPACE_STROKE}
              weight={2}
              dashArray="5 3"
              eventHandlers={{ click: () => handleSpaceClick(space) }}
            >
              <Popup>
                <div className="font-sans text-xs">
                  <p className="font-semibold text-gray-900 mb-0.5">{space.name}</p>
                  <p className="text-gray-600">{SPACE_TYPE_LABELS[space.type]}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>

        <MapLegend showIncidents={showIncidents} showCommunitySpaces={showCommunitySpaces} />

        {/* Community spaces disclaimer */}
        {showCommunitySpaces && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[400] bg-white/90 border border-gray-200 rounded px-3 py-1.5 text-[11px] font-sans text-gray-500 max-w-xs text-center shadow-sm">
            Publicly listed institutions — SafeJew does not assess or guarantee the security of any location.
          </div>
        )}
      </div>

      {/* Right detail panel */}
      {detailOpen && (
        selectedIncident !== null ? (
          <IncidentDetailPanel
            incident={selectedIncident}
            onClose={() => setSelectedIncident(null)}
          />
        ) : selectedSpace !== null ? (
          <SpaceDetailPanel
            space={selectedSpace}
            onClose={() => setSelectedSpace(null)}
          />
        ) : null
      )}
    </div>
  );
}
