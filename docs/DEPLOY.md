# Deployment — Sault Trades

Decision: **Vercel** hosts the web app; **Supabase** provides Postgres + Auth +
RLS + Storage, and (later) runs the async translation worker as an Edge Function
+ cron. No third platform.

## Environments

| Git branch | Vercel env | Supabase project |
| --- | --- | --- |
| `main` | Production | `sault-trades-prod` |
| `staging` | (Preview, pinned) | `sault-trades-staging` |
| feature branches (e.g. `claude/...`) | Preview | `sault-trades-staging` |

Preview deployments must **never** point at the prod database.

## One-time setup (needs your accounts — cannot be done from CI)

### 1. Supabase — create two projects
Create `sault-trades-staging` and `sault-trades-prod`. For each, apply the
schema and seed:

```bash
# from repo root, per project
supabase link --project-ref <PROJECT_REF>
supabase db push                     # applies supabase/migrations/*.sql
# then run supabase/seed.sql in the SQL editor (or: psql "$DB_URL" -f supabase/seed.sql)
```

Grab each project's `Project URL`, `anon` key, and `service_role` key.

### 2. Vercel — connect the repo
- Import the GitHub repo. Framework preset: **Next.js** (zero-config; no
  `vercel.json` needed).
- Production branch: `main`.
- Set env vars per environment (see `.env.example`):
  - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY` — **server only**, never `NEXT_PUBLIC`.
  - Point **Production** env at the prod project; **Preview** + **Development**
    at the staging project.

### 3. Staging branch
`staging` is created when we're ready to wire it (kept off `main`/prod until
then). Feature-branch Preview deploys already exercise staging.

## Translation worker (later, Phase 1)
The async job-request translation queue runs on the Supabase side (Edge Function
triggered by `pg_cron` / a DB event), calling the translation provider. Google
is the default provider because **DeepL does not support Punjabi (`pa`)**;
`zh-Hans` can optionally be routed through DeepL for quality.

## Local dev
```bash
cp .env.example .env.local   # fill in staging Supabase values
npm run dev
```
