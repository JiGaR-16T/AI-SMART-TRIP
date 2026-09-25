Write-Host "Running Backend & Algorithm tests..." -ForegroundColor Cyan
& ".\.venv\Scripts\pytest.exe" -v --cov=algorithms --cov=backend/core

if ($LASTEXITCODE -ne 0) {
    Write-Host "Backend tests failed!" -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "Running Frontend tests..." -ForegroundColor Cyan
cmd.exe /c "cd frontend && npm test"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Frontend tests failed!" -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "All tests passed successfully!" -ForegroundColor Green
