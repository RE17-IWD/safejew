-- Run this once in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- Backs the contact form at /contact.

create table if not exists contact_messages (
  id           uuid primary key default gen_random_uuid(),
  name         text,
  email        text not null,
  role         text not null,
  role_other   text,
  organization text,
  subject      text,
  message      text not null,
  status       text not null default 'new',
  created_at   timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx
  on contact_messages (created_at desc);
create index if not exists contact_messages_status_idx
  on contact_messages (status);

alter table contact_messages enable row level security;

-- Anyone can send a message. Nobody can read them back through the public API:
-- there is deliberately no select policy, so only the service role (the admin
-- API) can read this table.
create policy "public_insert_contact_messages"
  on contact_messages for insert
  to anon, authenticated
  with check (true);
