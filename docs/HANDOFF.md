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

## New product decisions — 2026-07-05 (owner, NOT yet implemented)
Owner specified these on top of the existing red lines. None of the below is
coded yet — this is a spec update only. Whoever picks this up next should plan
in small steps and confirm before large changes (owner's instruction).

1. **Contact reveal requires login** (currently it does NOT — gap, see below).
   - Logged-out viewers on the request detail page see "Sign in to view contact"
     instead of the reveal button.
   - Only logged-in users can click to reveal.
   - **`src/app/api/reveal/route.ts` must check auth server-side** — it
     currently has NO auth check at all (only validates `job_requests.status`
     and does IP-hash rate limiting). Client-side gating alone is not
     sufficient; the route itself must reject unauthenticated requests.
   - Every reveal is still logged to `contact_reveals` regardless.
2. **Simplify the homepage** to first-screen-only: pick city, pick posting
   language, post a request, browse requests. Trim anything else from the
   first viewport.
3. **Simplify the post form fields** to: source language, city, category,
   title, description, approximate area (no full address), preferred time,
   number of helpers needed, budget/hourly estimate, up to 2 photos, contact
   method+value. (Current form at `src/app/[locale]/[city]/post/page.tsx`
   already has most of these except helper count, budget estimate, and photos.)
4. **Character limits**: title ≤80, description ≤600, area ≤80, preferred time
   ≤120, contact value ≤120. Not yet enforced client- or server-side (
   `src/lib/actions.ts` `createRequest` has no length validation today).
5. **Photos**: max 2 per request, via Supabase Storage, written to
   `job_requests.photo_urls` (column already exists, unused). Must not leak
   full address / unnecessary personal info — needs UI copy warning posters,
   and possibly EXIF stripping on upload.
6. **Language strategy reaffirmed** (matches current `ec29b9f` implementation —
   no change needed): poster writes in their own language; original is always
   the source of truth; English is an auxiliary machine translation only; if
   original and English disagree, original wins; source-language + English-only
   (no multi-language checkbox UI); language is read/categorization only, never
   used to filter or exclude responders.
7. **Login providers**: MVP = Google OAuth + email magic link (magic link
   already implemented via Supabase; Google OAuth not yet wired). Later =
   Facebook + Apple login.
8. Red lines unchanged (list-only, no matchmaking/commission/payments, no
   contract/dispute involvement, area-only privacy, contact gated+logged,
   SSR/SSG crawlable public pages, build must degrade gracefully with no env).

## Key decisions (don't undo without reason)
- **Contact gating is enforced in the DB**: `contact_value` lives in
  `job_request_contacts`, a table with RLS on and **no read policy** → anon key
  cannot scrape it. Served only via `/api/reveal` (service_role) which logs to
  `contact_reveals` + rate-limits per viewer-IP-hash. Verified with an `anon` role.
- **Neutral language menu**: poster chooses the language they wrote in. If it is
  not English, the create path currently attempts one machine translation into
  English only. Platform never filters responders by language.
- **No thin/doorway pages**: per-locale request pages that lack a translation show
  the original and set `<link rel=canonical>` to the source-language URL.
- **Translation** currently runs inline in the create action, but only for
  source-language → English. Should move to a Supabase-side async queue
  (pg_cron / Edge Function).

## Verified locally (2026-07)
- 0001+0002+seed apply cleanly on Postgres 16 (with an `auth` schema stub).
- RLS: anon sees open requests + cities/categories; sees **0** contacts and **0**
  closed requests.
- `npm run build` + `lint` green. Prod server boots with NO env: `/`→`/en`,
  `/pa` SSR renders Gurmukhi, `Accept-Language: zh`→`/zh-Hans`.
- `eslint` + `next build` green after adding trilingual Terms / Privacy /
  Disclaimer pages and legal links. Local shell lacked `npm`, so verification used
  bundled Node with local `node_modules/.bin`.
- `eslint` + `next build` green after simplifying posting language to
  source-language + English-only machine translation.
- **2026-07 (Claude, re-sync after Codex's legal-pages + language-simplification
  work):** `git fetch` + fast-forward pull to `ec29b9f`; confirmed log matches
  owner's expected sequence (`ec29b9f` → `97495c9` → `ea21a80`). Fresh `npm
  install` + `npm run build` + `npm run lint` — both green. Spot-checked the
  diff: `[city]/post/page.tsx` no longer has the multi-language checkbox UI
  (only a single "post language" select); `actions.ts` calls
  `translateJobRequest` with `targets: source === "en" ? [] : ["en"]`;
  `translate-request.ts` itself is unchanged (still a generic multi-target
  helper — the English-only restriction lives at the call site, not the
  helper); `0002_board.sql` diff is comment-only (no schema drift, no new
  migration needed — `job_request_translations.lang_code` already supported
  arbitrary locales). Build route table shows `/terms`, `/privacy`,
  `/disclaimer` all present and SSR (`ƒ`), not static/client-only. Owner also
  confirmed the app is deployed and reachable at
  https://ed-s-cave.vercel.app/ (Vercel Preview, per `docs/DEPLOY.md`'s
  branch→env mapping — not `main`, so this is the staging-tracking preview,
  not production).

## NOT done — next work (priority order)
0. **[NEW, highest priority] Gate `/api/reveal` behind login** — see "New
   product decisions" #1 above. This is a real red-line gap in the current
   deployed code (route has zero auth check today), not just a nice-to-have.
   Do this before anything else below.
1. **Done:** ToS / Privacy / Disclaimer standalone pages (trilingual draft) are
   under `src/app/[locale]/{terms,privacy,disclaimer}`. Header/Footer link them.
   Legal text is still draft copy and needs lawyer + human language review.
2. **Async English translation queue** — move `translate-request.ts` off the
   request path to Supabase pg_cron/Edge Function; add retry + a `pending`
   state. Keep MVP scope to source language + English only.
3. **Translation proofreading UI** in `/me` — let posters edit MT (set
   `source='machine_edited'`), per `多語貼文模組規格.md`.
4. **Human-reviewed** zh-Hans/pa UI strings + legal copy (replace draft MT).
5. **Photo uploads** (Supabase Storage, signed access) for `job_requests.photo_urls`,
   max 2 — see "New product decisions" #5 for the address/PII-leak caveat.
6. **Request expiry** (`expires_at`) job + auto-close stale posts.
7. Language switcher should preserve the current path (today it links to `/{locale}`).
8. Admin console (moderate reports, take down requests).
9. **[NEW]** Homepage simplification to first-screen-only (city/language/post/
   browse) — see "New product decisions" #2.
10. **[NEW]** Post form: add helper-count + budget/hourly-estimate fields;
    enforce character limits (title 80 / description 600 / area 80 / preferred
    time 120 / contact value 120) client- and server-side — see #3–#4 above.
11. **[NEW]** Google OAuth login (magic link already done) — see #7 above;
    Facebook/Apple explicitly deferred to later, not MVP.

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

## End of day — 2026-07-04
Current HEAD: `ec29b9f` on `claude/newcomer-city-hub-arch-smclkz`. Working tree
clean, `npm run build` + `npm run lint` green (verified by Claude after
re-syncing with Codex's commits `97495c9` + `ec29b9f`).

**Deployed and reachable:** https://ed-s-cave.vercel.app/ — this is a Preview
deployment tracking this branch (per `docs/DEPLOY.md`'s branch→env table), NOT
`main`/production. No Supabase project is wired up yet, so the live site is
running in the "no env" degraded mode (empty data, but no crashes).

**Nothing was started tonight beyond the HANDOFF sync above** — no code changes.
The owner is stopping for the day. Next session, pick up from the "NOT done"
list above; item 1 (legal pages) is done, item 2 (async English translation
queue) or connecting a real Supabase project (see `docs/DEPLOY.md` steps 1–2)
are the logical next steps. Re-read this file and run `git log --oneline -10`
first — check whether Codex or Claude touched the repo since this entry.
