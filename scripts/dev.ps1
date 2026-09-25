Write-Host "Starting TravelMind dev servers..." -ForegroundColor Cyan

# Start backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'Starting Django Backend...'; & '.\.venv\Scripts\python.exe' backend/manage.py runserver 127.0.0.1:8000"

# Start frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'Starting Vite Frontend...'; cmd.exe /c 'cd frontend && npm run dev'"

Write-Host "Backend running on http://127.0.0.1:8000" -ForegroundColor Green
Write-Host "Frontend running on http://localhost:5173" -ForegroundColor Green
