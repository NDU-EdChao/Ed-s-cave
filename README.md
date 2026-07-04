# Sault Trades

A dead-simple, single-city **local service-request board** for Sault Ste. Marie,
Ontario. Residents post what they need (starting with **snow removal**); local
tradespeople browse and reach out directly. **List-only, no matchmaking, no
commission, no payments** — see `CLAUDE.md` for the red lines.

Trilingual from day one: **English / 简体中文 / ਪੰਜਾਬੀ (Punjabi)**.

## Stack
- **Next.js 16** (App Router, SSR/SSG — public pages must be crawlable)
- **Supabase** (Postgres + Auth + RLS + Storage)
- **Vercel** hosting — see `docs/DEPLOY.md`
- Native Next 16 i18n (per-locale dictionaries under `src/i18n/`)

## Source of truth
Specs live in `/docs`. `CLAUDE.md` holds the non-negotiable red lines.

## Develop
```bash
npm install
cp .env.example .env.local     # fill in Supabase (staging) values
npm run dev                    # http://localhost:3000  -> redirects to /en
npm run build                  # production build + type check
```

## Database
```
supabase/migrations/0001_init.sql   # cities, service_categories, languages (+ RLS, default deny)
supabase/seed.sql                   # Sault Ste. Marie + starter categories + 3 languages
```
Apply with the Supabase CLI (`supabase db push`) then run the seed. See
`docs/DEPLOY.md`.

## Status
- **Phase 0 (done):** scaffold, trilingual i18n skeleton, base config tables + RLS + seed, deploy plan.
- **Phase 1 (next):** job-request board, per-locale content translation pipeline, city × category SEO landing pages, gated contact reveal.
