-- Run this once in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- Enables the "Suggest a Campus" feature on the campus page

create table if not exists campus_requests (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  city            text not null,
  state           text not null,
  website         text,
  notes           text,
  requester_email text,
  status          text not null default 'pending',
  created_at      timestamptz not null default now()
);

alter table campus_requests enable row level security;

-- Anyone can submit a campus request
create policy "public_insert_campus_requests"
  on campus_requests for insert
  to anon, authenticated
  with check (true);

-- Service role (admin API) can read and update
-- No extra policy needed — service role bypasses RLS
