Write-Host "Applying database migrations..." -ForegroundColor Cyan
& ".\.venv\Scripts\python.exe" backend/manage.py migrate
