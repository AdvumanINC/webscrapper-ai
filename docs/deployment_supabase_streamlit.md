# Advuman — Web Deployment Guide

Three deployment paths are supported. Choose one:

| Path | Dashboard | Data collection | Cost |
|------|-----------|-----------------|------|
| **A — Streamlit Cloud + GitHub Actions** | Streamlit Community Cloud | GitHub Actions cron | Free |
| **B — Render** | Render web service | Render cron job | Free tier / ~$7/mo |
| **C — Railway** | Railway web service | Railway worker | Free tier / ~$5/mo |

All paths use **Supabase** as the PostgreSQL database.

---

## Prerequisites — Supabase Database

1. Create a project at supabase.com.
2. Go to **Project Settings → Database → Connection string** and copy the **Pooler** URL (port 6543).
3. Format it for this project:

```
postgresql+asyncpg://postgres.<PROJECT_REF>:<PASSWORD>@aws-0-<REGION>.pooler.supabase.com:6543/postgres?ssl=require
```

4. From your local machine, bootstrap the schema and seed sources:

```bash
DATABASE_URL="postgresql+asyncpg://..." python scripts/bootstrap_db.py
DATABASE_URL="postgresql+asyncpg://..." python scripts/seed_db.py
```

---

## Path A — Streamlit Community Cloud + GitHub Actions

**Architecture**: Streamlit Cloud serves the read-only dashboard. GitHub Actions runs collectors + pipeline daily and writes results to Supabase.

### 1. Push to GitHub

Push this repository to a GitHub repo (public or private).

### 2. Add GitHub Secrets

In your repo: **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Value |
|--------|-------|
| `DATABASE_URL` | Supabase pooler URL from above |
| `ANTHROPIC_API_KEY` | Your Anthropic API key |
| `SOURCES_SHEET_CSV_URL` | *(optional)* Google Sheets CSV URL |

### 3. Enable GitHub Actions

The workflow at `.github/workflows/daily_collect_pipeline.yml` runs automatically at **06:00 UTC every day**. Trigger it manually via **Actions → Daily Data Collection → Run workflow** for the first run.

### 4. Deploy on Streamlit Community Cloud

1. Go to share.streamlit.io and connect your GitHub repo.
2. Set the main file path to: `streamlit_app.py`
3. In **Advanced settings → Secrets**, paste:

```toml
DATABASE_URL = "postgresql+asyncpg://postgres.<PROJECT_REF>:<PASSWORD>@aws-0-<REGION>.pooler.supabase.com:6543/postgres?ssl=require"
ANTHROPIC_API_KEY = "sk-ant-..."
SOURCES_SHEET_CSV_URL = ""   # optional
```

4. Set app visibility to **Public** to share the URL.

> **Note**: The in-dashboard "Data Refresh" button (Lane Overview) spawns subprocesses and requires an editable Python install. It works locally and in Docker, but not on Streamlit Cloud. Use GitHub Actions for automated data freshness.

---

## Path B — Render

**Architecture**: One Docker image serves both the web dashboard and cron data collection.

### 1. Push to GitHub

Push this repo to GitHub.

### 2. Deploy via Blueprint

1. Go to render.com → **New → Blueprint**.
2. Connect your GitHub repo — Render auto-detects `render.yaml`.
3. Set these environment variables (mark as secret):

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Supabase pooler URL |
| `ANTHROPIC_API_KEY` | Your Anthropic API key |
| `SOURCES_SHEET_CSV_URL` | *(optional)* Google Sheets CSV URL |

4. Deploy. Render creates:
   - **advuman-dashboard** — Streamlit web service
   - **advuman-daily-collect** — Cron job running collectors + pipeline at 06:00 UTC

### 3. Custom Domain (optional)

Dashboard service → **Settings → Custom Domains**.

---

## Path C — Railway

**Architecture**: One Docker image with web and worker processes defined in `Procfile`.

### 1. Deploy

1. Go to railway.app → **New Project → Deploy from GitHub repo**.
2. Railway auto-detects the `Procfile` and `Dockerfile`.
3. Add environment variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Supabase pooler URL |
| `ANTHROPIC_API_KEY` | Your Anthropic API key |
| `SOURCES_SHEET_CSV_URL` | *(optional)* Google Sheets CSV URL |

4. The `web` process starts automatically. To also run the background worker (APScheduler daily), add a second service in the same Railway project pointing to the same repo with start command:

```
python scripts/schedule_sync_scrape.py --lane UK-India --daily-at 06:00
```

### 2. Custom Domain

Service → **Settings → Networking → Custom Domain**.

---

## Local Docker (test before deploying)

```bash
# Build and start dashboard + worker
docker compose up --build

# Dashboard only
docker compose up web

# Worker only (APScheduler)
docker compose up worker
```

Dashboard available at `http://localhost:8501`.

---

## Verify Deployment

Once live, check each dashboard page:

- **Lane Overview** — shows current lane health badge and index metrics
- **Signal Log** — has event rows (requires at least one collector run)
- **Index Charts** — renders RPI / LSI / CPI time series
- **Source Admin** — shows 12 collectors and recent automation run history

If Signal Log is empty, trigger the GitHub Actions workflow manually or wait for the next 06:00 UTC scheduled run.
