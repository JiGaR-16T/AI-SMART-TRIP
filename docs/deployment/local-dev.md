# Local Development Guide

This guide covers running and debugging TravelMind locally on your machine across Windows, Linux, and macOS.

## System Requirements

- Python 3.11+
- Node.js 20+ LTS
- Docker Desktop *(Recommended)* or standalone PostgreSQL 16+ and Redis 7+

---

## 1. Quick Start with Docker (Recommended)

Docker runs all 6 containers with health checks:

```bash
# 1. Prepare environment
cp .env.example .env

# 2. Start services in detached mode
docker compose up -d

# 3. View status and health
docker compose ps
```

Services:
- **Backend API**: http://127.0.0.1:8000/api/v1/health/ready/
- **Swagger Documentation**: http://127.0.0.1:8000/api/docs/
- **Frontend App**: http://localhost:5173

---

## 2. Local Fallback (Without Docker)

If you do not have Docker installed, you can run the services directly on your host machine:

### Setup Backend:
```bash
# Create virtual environment
python -m venv .venv

# Windows activation
.\.venv\Scripts\Activate.ps1
# Linux / Mac activation
source .venv/bin/activate

# Install dependencies
pip install -r backend/requirements/dev.txt
pip install -e algorithms

# Copy .env
cp .env.example .env
```

### Configure Offline Fallback in `.env`:
If you do not have PostgreSQL or Redis running locally, set these lines in `.env`:
```ini
DATABASE_URL=sqlite:///db.sqlite3
USE_LOCAL_CACHE=True
```

### Start Servers:
```bash
# Terminal 1 (Backend)
python backend/manage.py migrate
python backend/manage.py runserver 127.0.0.1:8000

# Terminal 2 (Frontend)
cd frontend
npm install
npm run dev
```

Navigate to `http://localhost:5173` to see the live `/status` dashboard checking backend health.
