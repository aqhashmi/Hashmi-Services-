-- ============================================================================
-- Hashmi Business Setup Services — Supabase schema
--
-- Run this once in your Supabase project's SQL EDITOR (not the Table Editor):
--   Dashboard → SQL Editor → New query → paste → Run
--
-- It creates the `contacts` table for contact-form submissions and enables
-- Row Level Security so that ANYONE (anonymous visitors) may INSERT a
-- submission, but NO ONE can read submissions with the public/anon key.
-- You can view submissions in the Supabase Dashboard (Table Editor), which
-- uses the privileged service role and bypasses RLS.
--
-- This script is idempotent — safe to re-run. IMPORTANT: if you created the
-- table via the Table Editor UI, RLS is enabled with NO policies, so inserts
-- fail with error 42501 until the INSERT policy below is added.
-- ============================================================================

create table if not exists public.contacts (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  phone       text not null,
  activity    text,
  message     text not null
);

-- Enable Row Level Security (locks the table down by default).
alter table public.contacts enable row level security;

-- Allow public (anonymous) AND signed-in users to INSERT submissions only.
-- `with check (true)` permits any insert; there is deliberately no SELECT,
-- UPDATE, or DELETE policy, so submissions stay private.
drop policy if exists "Public can submit contact form" on public.contacts;
create policy "Public can submit contact form"
  on public.contacts
  for insert
  to anon, authenticated
  with check (true);

-- Helpful index for sorting submissions by date in the dashboard.
create index if not exists contacts_created_at_idx
  on public.contacts (created_at desc);
