Write-Host "Setting up TravelMind development environment..." -ForegroundColor Cyan

# 1. Virtual environment
if (-Not (Test-Path ".venv")) {
    Write-Host "Creating Python virtual environment..."
    python -m venv .venv
}

# 2. Python dependencies
Write-Host "Installing backend and algorithm dependencies..."
& ".\.venv\Scripts\pip.exe" install --upgrade pip
& ".\.venv\Scripts\pip.exe" install -r backend/requirements/dev.txt
& ".\.venv\Scripts\pip.exe" install -e algorithms

# 3. Frontend dependencies
Write-Host "Installing frontend packages..."
cmd.exe /c "cd frontend && npm install"

# 4. Local .env
if (-Not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "Created .env from .env.example"
}

Write-Host "Setup complete!" -ForegroundColor Green
