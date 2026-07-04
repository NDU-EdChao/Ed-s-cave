-- 0002_board: the job-request board (Indeed-shaped, list-only).
-- Red lines enforced in the schema:
--  * Contact is GATED: contact_value lives in a separate table with NO public
--    read policy, so an anon key cannot scrape it. It is served only via a
--    server route that logs the reveal (service_role).
--  * Privacy: job_requests stores area_label only (no full address).
--  * Neutral language menu: source_lang + one English translation when needed.
--  * Takedown: removing/closing a request hides it and its translations (RLS
--    keys translation visibility off the parent being 'open').

-- ---------------------------------------------------------------------------
-- job_requests: publicly readable when open. NO contact column here.
-- ---------------------------------------------------------------------------
create table if not exists public.job_requests (
  id             uuid primary key default gen_random_uuid(),
  owner_id       uuid not null references auth.users(id) on delete cascade,
  city_id        uuid not null references public.cities(id),
  category_id    uuid not null references public.service_categories(id),
  title          text not null,
  slug           text unique not null,
  description    text not null,
  area_label     text,                     -- approximate area, never full address
  photo_urls     text[] not null default '{}',
  preferred_time text,
  source_lang    text not null references public.languages(code),
  status         text not null default 'open'
                   check (status in ('open','closed','removed')),
  is_flagged     boolean not null default false,
  created_at     timestamptz not null default now(),
  expires_at     timestamptz
);
create index if not exists job_requests_city_cat_status_idx
  on public.job_requests (city_id, category_id, status, created_at desc);

-- ---------------------------------------------------------------------------
-- job_request_contacts: gated. RLS on, NO select policy => only service_role.
-- ---------------------------------------------------------------------------
create table if not exists public.job_request_contacts (
  job_request_id uuid primary key references public.job_requests(id) on delete cascade,
  contact_method text not null check (contact_method in ('phone','email')),
  contact_value  text not null
);

-- ---------------------------------------------------------------------------
-- job_request_translations: per-locale content. Original stays in job_requests.
-- ---------------------------------------------------------------------------
create table if not exists public.job_request_translations (
  id                     uuid primary key default gen_random_uuid(),
  job_request_id         uuid not null references public.job_requests(id) on delete cascade,
  lang_code              text not null references public.languages(code),
  title_translated       text not null,
  description_translated text not null,
  source                 text not null default 'machine'
                           check (source in ('machine','machine_edited','human')),
  status                 text not null default 'published'
                           check (status in ('draft','published')),
  translated_at          timestamptz not null default now(),
  approved_by            uuid references auth.users(id),
  approved_at            timestamptz,
  unique (job_request_id, lang_code)
);

-- ---------------------------------------------------------------------------
-- contact_reveals: click-to-reveal audit log. Written server-side only.
-- ---------------------------------------------------------------------------
create table if not exists public.contact_reveals (
  id             uuid primary key default gen_random_uuid(),
  job_request_id uuid not null references public.job_requests(id) on delete cascade,
  viewer_hash    text,
  created_at     timestamptz not null default now()
);
create index if not exists contact_reveals_viewer_time_idx
  on public.contact_reveals (viewer_hash, created_at desc);

-- ---------------------------------------------------------------------------
-- reports: abuse / discrimination takedown queue. Insert open; read admin-only.
-- ---------------------------------------------------------------------------
create table if not exists public.reports (
  id          uuid primary key default gen_random_uuid(),
  target_type text not null check (target_type in ('job_request')),
  target_id   uuid not null,
  reason      text not null,
  status      text not null default 'open' check (status in ('open','reviewed','actioned')),
  created_at  timestamptz not null default now()
);

-- ===========================================================================
-- RLS: enable everywhere (default deny), add only the policies we need.
-- ===========================================================================
alter table public.job_requests enable row level security;
alter table public.job_request_contacts enable row level security;
alter table public.job_request_translations enable row level security;
alter table public.contact_reveals enable row level security;
alter table public.reports enable row level security;

-- job_requests: anyone reads OPEN rows; owner reads/updates own; owner inserts own.
drop policy if exists "open requests public read" on public.job_requests;
create policy "open requests public read"
  on public.job_requests for select
  using (status = 'open');

drop policy if exists "owner reads own requests" on public.job_requests;
create policy "owner reads own requests"
  on public.job_requests for select
  using (auth.uid() = owner_id);

drop policy if exists "owner inserts own requests" on public.job_requests;
create policy "owner inserts own requests"
  on public.job_requests for insert
  with check (auth.uid() = owner_id);

drop policy if exists "owner updates own requests" on public.job_requests;
create policy "owner updates own requests"
  on public.job_requests for update
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- job_request_contacts: NO policy => no anon/authenticated access. service_role only.

-- translations: public read only when parent is open AND translation published.
drop policy if exists "published translations public read" on public.job_request_translations;
create policy "published translations public read"
  on public.job_request_translations for select
  using (
    status = 'published'
    and exists (
      select 1 from public.job_requests jr
      where jr.id = job_request_id and jr.status = 'open'
    )
  );

-- owner can read own translations regardless of status (to proofread/edit).
drop policy if exists "owner reads own translations" on public.job_request_translations;
create policy "owner reads own translations"
  on public.job_request_translations for select
  using (
    exists (
      select 1 from public.job_requests jr
      where jr.id = job_request_id and jr.owner_id = auth.uid()
    )
  );

-- contact_reveals + reports: no public policies. Writes go through service_role.
