# HANDOFF — Sault Trades

Read this + `CLAUDE.md` (red lines, top priority) + `/docs` specs BEFORE coding.
Work on branch `claude/newcomer-city-hub-arch-smclkz`. Do NOT push `main`/`staging`
without explicit permission (production boundary). Keep `npm run build` + `npm run
lint` green after every change. Commit in small steps.

## Multi-agent collaboration on this project
The owner is running **both Claude Code and Codex** on this repo, sequentially
(not simultaneously) — Claude did Phase 0 + Phase 1 + this handoff doc, then
handed off to Codex for the ToS/Privacy/Disclaimer pages (see item 1 below).
**Implication:** before starting any work, run `git log --oneline -10` and
re-read this file — it may have been updated by the other agent since you last
saw it. If you are Codex picking this up: the code lives on **GitHub**
(`NDU-EdChao/Ed-s-cave`, branch `claude/newcomer-city-hub-arch-smclkz`), not
in a sibling folder on the owner's machine — clone it first:
```bash
git clone https://github.com/NDU-EdChao/Ed-s-cave.git
cd Ed-s-cave
git checkout claude/newcomer-city-hub-arch-smclkz
```
Verify you're in the right place before touching anything: `git log --oneline -3`
should show this handoff commit (or later); `CLAUDE.md` and `docs/HANDOFF.md`
must exist at repo root. When you finish a task, update the "NOT done" list
below (move your item to done, or note partial progress) so the next agent —
Claude or Codex — doesn't redo or conflict with your work.

## What this is
Single-city, list-only local **service-request board** for Sault Ste. Marie
(Indeed-shaped: residents post needs, tradespeople browse + contact directly).
Trilingual: `en` (x-default) / `zh-Hans` / `pa` (Punjabi, Gurmukhi, LTR).
Red lines: list-only (NO matchmaking), no commission/payments, contact gated +
logged, area-only privacy, language-neutral (poster-selected), public pages must
be crawlable (SSR/SSG).

## Stack / gotchas
- **Next.js 16.2.10** — newer than most training data. `AGENTS.md` warns to read
  `node_modules/next/dist/docs/` before writing App Router code.
  - `params`/`searchParams` are **Promises** → `await` them.
  - Middleware is renamed **`proxy.ts`** (see `src/proxy.ts`, locale redirect).
  - i18n = **native Next dictionaries** (NOT next-intl): `src/i18n/`.
  - `cookies()` is async.
- Supabase (`@supabase/ssr` 0.12) — Postgres + Auth + RLS + Storage. Vercel host.
- Data pages are `export const dynamic = "force-dynamic"` (SSR, crawlable) and
  **degrade to empty when Supabase env is absent** so builds pass without secrets.

## File map
- `src/i18n/` — `config.ts` (locales), `dictionaries.ts` (+ `Dictionary` type),
  `dictionaries/{en,zh-Hans,pa}.json` (zh/pa are **draft MT**, `_status` flagged).
- `src/lib/supabase/` — `server.ts` (RLS-scoped), `service.ts` (service_role,
  bypasses RLS, server-only), `client.ts` (browser/auth), `env.ts` (guard).
- `src/lib/` — `data.ts` (reads), `actions.ts` (server actions: create/close/
  report/signOut), `translate.ts` (Google default; DeepL optional zh-Hans),
  `translate-request.ts` (machine-translate on post), `seo.ts` (hreflang), `types.ts`.
- `src/app/[locale]/` — `page.tsx` (cities), `[city]/page.tsx`,
  `[city]/[category]/page.tsx` (SEO landing + ItemList), `[city]/request/[slug]/`
  (detail + gated reveal + canonical for untranslated), `[city]/post/`, `login/`,
  `me/`, `auth/callback/route.ts`. `src/app/api/reveal/route.ts` (gated reveal).
- `src/components/` — Header, RequestCard, RevealContact (client), ReportForm,
  LoginForm (client).
- `supabase/migrations/{0001_init,0002_board}.sql`, `supabase/seed.sql`.

## Key decisions (don't undo without reason)
- **Contact gating is enforced in the DB**: `contact_value` lives in
  `job_request_contacts`, a table with RLS on and **no read policy** → anon key
  cannot scrape it. Served only via `/api/reveal` (service_role) which logs to
  `contact_reveals` + rate-limits per viewer-IP-hash. Verified with an `anon` role.
- **Neutral language menu**: English is the base; poster opts into zh-Hans/pa per
  post (nothing pre-checked). Platform never filters responders by language.
- **No thin/doorway pages**: per-locale request pages that lack a translation show
  the original and set `<link rel=canonical>` to the source-language URL.
- **Translation** runs inline in the create action today. Should move to a
  Supabase-side async queue (pg_cron / Edge Function).

## Verified locally (2026-07)
- 0001+0002+seed apply cleanly on Postgres 16 (with an `auth` schema stub).
- RLS: anon sees open requests + cities/categories; sees **0** contacts and **0**
  closed requests.
- `npm run build` + `lint` green. Prod server boots with NO env: `/`→`/en`,
  `/pa` SSR renders Gurmukhi, `Accept-Language: zh`→`/zh-Hans`.

## NOT done — next work (priority order)
1. **ToS / Privacy / Disclaimer standalone pages** (trilingual). Currently only an
   inline disclaimer string. Upgrade Gate + needs lawyer review.
   → **Assigned to Codex** (in progress/next, as of this handoff). Scope: three
   trilingual routes under `src/app/[locale]/`, linked from `Header`/a new footer,
   draft copy clearly marked as needing lawyer review, `npm run build` + `npm run
   lint` green before commit. Do not start item 2+ until this is confirmed done
   (check git log / this file) to avoid duplicate work.
2. **Async translation queue** — move `translate-request.ts` off the request path
   to Supabase pg_cron/Edge Function; add retry + a `pending` state.
3. **Translation proofreading UI** in `/me` — let posters edit MT (set
   `source='machine_edited'`), per `多語貼文模組規格.md`.
4. **Human-reviewed** zh-Hans/pa UI strings + legal copy (replace draft MT).
5. **Photo uploads** (Supabase Storage, signed access) for `job_requests.photo_urls`.
6. **Request expiry** (`expires_at`) job + auto-close stale posts.
7. Language switcher should preserve the current path (today it links to `/{locale}`).
8. Admin console (moderate reports, take down requests).

## Run / test
```bash
npm install && npm run build && npm run lint
cp .env.example .env.local   # fill Supabase (staging) + GOOGLE_TRANSLATE_API_KEY
npm run dev
```
Local DB validation harness (no Docker needed): init a temp Postgres, create an
`auth` schema stub (`auth.users`, `auth.uid()`) + `anon`/`authenticated` roles,
apply the two migrations + seed, then `set role anon` to test RLS.

## Deploy (user does this — needs their accounts)
See `docs/DEPLOY.md`. Vercel + two Supabase projects (staging/prod), env per
environment, `service_role` server-only. **Gotcha:** add `https://<domain>/*/auth/
callback` to Supabase Auth → Redirect URLs, or magic-link login fails.
