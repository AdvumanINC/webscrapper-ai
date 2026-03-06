# Advuman — single image for both dashboard (web) and worker (scheduler).
#
# Build:   docker build -t advuman .
# Run web: docker run -p 8501:8501 --env-file .env advuman
# Run worker: docker run --env-file .env advuman \
#               python scripts/schedule_sync_scrape.py --lane UK-India --daily-at 06:00 --no-llm

FROM python:3.13-slim

WORKDIR /app

# System packages required by Playwright Chromium
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy only what's needed (see .dockerignore)
COPY pyproject.toml .
COPY src/ src/
COPY scripts/ scripts/
COPY .streamlit/ .streamlit/
COPY streamlit_app.py .

# Editable install so that __file__ paths in page scripts resolve correctly
# (src/dashboard/pages/lane_overview.py uses Path(__file__).parents[3] to
# locate the project root when spawning scripts/ subprocesses).
RUN pip install --no-cache-dir -e .

# Install Playwright Chromium for Felixstowe and Loadstar LSI collectors.
# --with-deps installs system libraries (libnss, libgbm, etc.) automatically.
RUN playwright install chromium --with-deps

EXPOSE 8501

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s \
    CMD curl --fail http://localhost:8501/_stcore/health || exit 1

# Default command: run the Streamlit dashboard.
# Override with `docker run ... python scripts/schedule_sync_scrape.py ...`
# to run the worker instead.
CMD ["streamlit", "run", "streamlit_app.py", \
     "--server.port=8501", \
     "--server.address=0.0.0.0", \
     "--server.headless=true"]
