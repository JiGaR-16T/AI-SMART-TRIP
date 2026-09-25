Write-Host "Auto-formatting Python code..." -ForegroundColor Cyan
& ".\.venv\Scripts\ruff.exe" format backend algorithms tests
& ".\.venv\Scripts\ruff.exe" check --fix backend algorithms tests

Write-Host "Auto-formatting TypeScript code..." -ForegroundColor Cyan
cmd.exe /c "cd frontend && npm run format"

Write-Host "Code formatting complete!" -ForegroundColor Green
