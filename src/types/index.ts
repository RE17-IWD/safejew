export type IncidentCategory = 'vandalism' | 'harassment' | 'assault' | 'online_threat' | 'other';
export type IncidentSeverity = 'low' | 'medium' | 'high';
export type IncidentSource = 'community' | 'ADL' | 'FBI' | 'LAPD' | 'CSI';
export type IncidentStatus = 'pending' | 'verified' | 'rejected';

export interface Incident {
  id: string;
  category: IncidentCategory;
  description: string;
  occurred_at: string;
  neighborhood: string;
  lat: number;
  lng: number;
  severity: IncidentSeverity;
  source: IncidentSource;
  status: IncidentStatus;
  campus_id: string | null;
  created_at: string;
}

export interface Campus {
  id: string;
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  hillel_contact: string | null;
}

export interface Report {
  category: IncidentCategory;
  description: string;
  occurred_at: string;
  neighborhood: string;
  lat: number;
  lng: number;
  severity: IncidentSeverity;
  source?: IncidentSource;
  campus_id?: string | null;
  reporter_contact?: string | null;
  is_anonymous: boolean;
}

export type CommunitySpaceType = 'synagogue' | 'jcc' | 'hillel' | 'community_center';

export interface CommunitySpace {
  id: string;
  name: string;
  type: CommunitySpaceType;
  lat: number;
  lng: number;
  address?: string;
  website?: string;
  source: 'curated' | 'osm';
}

export interface IncidentFilters {
  categories: IncidentCategory[];
  severities: IncidentSeverity[];
  sources: IncidentSource[];
  dateFrom: string | null;
  dateTo: string | null;
  campusId: string | null;
}
