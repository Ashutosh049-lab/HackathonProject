# Start both frontend and backend in development mode
Write-Host "Starting backend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-Command", "cd '$PWD\backend'; npm run dev" -WindowStyle Normal

Write-Host "Starting frontend..." -ForegroundColor Green  
Start-Process powershell -ArgumentList "-Command", "cd '$PWD\frontend'; npm run dev" -WindowStyle Normal

Write-Host "Both servers starting..." -ForegroundColor Yellow
Write-Host "Backend will be available at: http://localhost:8081" -ForegroundColor Cyan
Write-Host "Frontend will be available at: http://localhost:5173" -ForegroundColor Cyan