-- SafeJew database schema
-- Run this in Supabase SQL editor or via supabase db push

-- ============================================================
-- ENUMS
-- ============================================================

create type incident_category as enum (
  'vandalism',
  'harassment',
  'assault',
  'online_threat',
  'other'
);

create type incident_severity as enum (
  'low',
  'medium',
  'high'
);

create type incident_source as enum (
  'community',
  'ADL',
  'FBI',
  'LAPD',
  'CSI'
);

create type incident_status as enum (
  'pending',
  'verified',
  'rejected'
);

-- ============================================================
-- TABLES
-- ============================================================

create table if not exists campuses (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  city            text not null,
  state           text not null,
  lat             double precision not null,
  lng             double precision not null,
  hillel_contact  text,
  created_at      timestamptz not null default now()
);

create table if not exists incidents (
  id           uuid primary key default gen_random_uuid(),
  category     incident_category not null,
  description  text not null,
  occurred_at  timestamptz not null,
  neighborhood text not null,
  lat          double precision not null,
  lng          double precision not null,
  severity     incident_severity not null,
  source       incident_source not null,
  status       incident_status not null default 'pending',
  campus_id    uuid references campuses (id) on delete set null,
  created_at   timestamptz not null default now()
);

create table if not exists reports (
  id               uuid primary key default gen_random_uuid(),
  category         incident_category not null,
  description      text not null,
  occurred_at      timestamptz not null,
  neighborhood     text not null,
  lat              double precision not null,
  lng              double precision not null,
  severity         incident_severity not null,
  source           incident_source not null default 'community',
  status           incident_status not null default 'pending',
  campus_id        uuid references campuses (id) on delete set null,
  reporter_contact text,
  is_anonymous     boolean not null default false,
  created_at       timestamptz not null default now()
);

-- ============================================================
-- INDEXES
-- ============================================================

create index if not exists incidents_status_idx      on incidents (status);
create index if not exists incidents_occurred_at_idx on incidents (occurred_at desc);
create index if not exists incidents_campus_id_idx   on incidents (campus_id);
create index if not exists incidents_category_idx    on incidents (category);

-- ============================================================
-- ROW-LEVEL SECURITY
-- ============================================================

alter table campuses  enable row level security;
alter table incidents enable row level security;
alter table reports   enable row level security;

-- Public can read verified incidents only
create policy "public_select_verified_incidents"
  on incidents for select
  to anon, authenticated
  using (status = 'verified');

-- Public can read all campuses
create policy "public_select_campuses"
  on campuses for select
  to anon, authenticated
  using (true);

-- Public can submit reports (insert only, cannot read back other reports)
create policy "public_insert_reports"
  on reports for insert
  to anon, authenticated
  with check (true);

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Returns monthly incident counts for the last 24 months
-- of verified incidents, ordered oldest-first.
create or replace function get_monthly_incident_counts()
returns table (month date, count bigint)
language sql
stable
as $$
  select
    date_trunc('month', occurred_at)::date as month,
    count(*)                               as count
  from incidents
  where
    status = 'verified'
    and occurred_at >= date_trunc('month', now()) - interval '23 months'
  group by date_trunc('month', occurred_at)
  order by month;
$$;
