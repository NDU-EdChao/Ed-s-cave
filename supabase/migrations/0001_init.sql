-- 0001_init: base config tables for Sault Trades.
-- Rule (CLAUDE.md): every table has RLS enabled + default deny. We only add the
-- SELECT policies that are explicitly needed. Writes have no policy, so anon /
-- authenticated cannot write; only the service_role (which bypasses RLS) or the
-- SQL editor (runs as postgres) may seed/admin.

create extension if not exists "pgcrypto"; -- gen_random_uuid()

-- ---------------------------------------------------------------------------
-- languages: the neutral, poster-selectable menu. Same list across all cities.
-- ---------------------------------------------------------------------------
create table if not exists public.languages (
  code        text primary key,          -- BCP-47: 'en', 'zh-Hans', 'pa'
  name        text not null,             -- English name
  native_name text not null,             -- name in its own script
  rtl         boolean not null default false,
  sort_order  int not null default 0
);

-- ---------------------------------------------------------------------------
-- cities: a first-class, data-driven dimension. Adding a city = one INSERT.
-- ---------------------------------------------------------------------------
create table if not exists public.cities (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,      -- 'sault-ste-marie'
  name        text not null,
  province    text not null,             -- 'ON'
  is_active   boolean not null default false,
  center_lat  numeric,
  center_lng  numeric,
  radius_km   int not null default 50,   -- for future radius filtering
  launch_date date,
  created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- service_categories: snow-removal (primary) + adjacent. Display NAMES come
-- from the i18n dictionary catalog (human-reviewed), not from this table --
-- 'slug' is the stable key that links a row to its translated label.
-- ---------------------------------------------------------------------------
create table if not exists public.service_categories (
  id                    uuid primary key default gen_random_uuid(),
  slug                  text unique not null,   -- 'snow-removal'
  parent_id             uuid references public.service_categories(id),
  is_emergency_eligible boolean not null default false,
  sort_order            int not null default 0,
  is_active             boolean not null default true,
  created_at            timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- RLS: enable (default deny), then explicit public read for reference data.
-- ---------------------------------------------------------------------------
alter table public.languages enable row level security;
alter table public.cities enable row level security;
alter table public.service_categories enable row level security;

drop policy if exists "languages public read" on public.languages;
create policy "languages public read"
  on public.languages for select
  using (true);

drop policy if exists "active cities public read" on public.cities;
create policy "active cities public read"
  on public.cities for select
  using (is_active = true);

drop policy if exists "active categories public read" on public.service_categories;
create policy "active categories public read"
  on public.service_categories for select
  using (is_active = true);
