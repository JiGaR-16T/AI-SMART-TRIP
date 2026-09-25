Write-Host "Running Python Ruff linter..." -ForegroundColor Cyan
& ".\.venv\Scripts\ruff.exe" check backend algorithms tests
& ".\.venv\Scripts\ruff.exe" format --check backend algorithms tests

if ($LASTEXITCODE -ne 0) {
    Write-Host "Python lint failed!" -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "Running TypeScript ESLint..." -ForegroundColor Cyan
cmd.exe /c "cd frontend && npm run lint"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Frontend lint failed!" -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "All lint checks passed!" -ForegroundColor Green
