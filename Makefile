.PHONY: help setup dev test lint format migrate seed docker-up docker-down

help:
	@echo "TravelMind Commands:"
	@echo "  make setup       Install backend & frontend dependencies"
	@echo "  make dev         Run backend and frontend dev servers concurrently"
	@echo "  make test        Run all tests (algorithms, backend, frontend)"
	@echo "  make lint        Run ruff and eslint"
	@echo "  make format      Auto-format Python and TypeScript code"
	@echo "  make migrate     Run database migrations"
	@echo "  make seed        Run seed data placeholder"
	@echo "  make docker-up   Start all containers via Docker Compose"
	@echo "  make docker-down Stop all containers"

setup:
	python -m venv .venv
	.venv/bin/pip install --upgrade pip
	.venv/bin/pip install -r backend/requirements/dev.txt
	.venv/bin/pip install -e algorithms
	cd frontend && npm install

dev:
	@echo "Starting backend and frontend..."
	.venv/bin/python backend/manage.py runserver 127.0.0.1:8000 & \
	cd frontend && npm run dev

test:
	.venv/bin/pytest -v
	cd frontend && npm test

lint:
	.venv/bin/ruff check backend algorithms tests
	cd frontend && npm run lint

format:
	.venv/bin/ruff format backend algorithms tests
	cd frontend && npm run format

migrate:
	.venv/bin/python backend/manage.py migrate

seed:
	@echo "Seeding data... (Part 2+ placeholder)"

docker-up:
	docker compose up -d

docker-down:
	docker compose down
