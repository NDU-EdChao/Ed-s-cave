-- Seed data for Sault Trades (idempotent). Run after migrations.
-- Applied automatically on `supabase db reset` (local); on a remote project,
-- run this in the SQL editor or via psql. Runs as postgres, so it bypasses RLS.

-- Languages: the neutral menu (English is the common base layer).
insert into public.languages (code, name, native_name, rtl, sort_order) values
  ('en',      'English',            'English',   false, 1),
  ('zh-Hans', 'Simplified Chinese', '简体中文',    false, 2),
  ('pa',      'Punjabi',            'ਪੰਜਾਬੀ',      false, 3)
on conflict (code) do nothing;

-- Launch city: Sault Ste. Marie, Ontario.
insert into public.cities
  (slug, name, province, is_active, center_lat, center_lng, radius_km, launch_date)
values
  ('sault-ste-marie', 'Sault Ste. Marie', 'ON', true, 46.5219, -84.3461, 50, null)
on conflict (slug) do nothing;

-- Starter categories: snow-removal is the seasonal wedge; a few adjacent trades
-- so the board is not single-category on day one.
insert into public.service_categories
  (slug, is_emergency_eligible, sort_order)
values
  ('snow-removal', true,  1),
  ('furnace-hvac', true,  2),
  ('handyman',     false, 3),
  ('junk-moving',  false, 4)
on conflict (slug) do nothing;
