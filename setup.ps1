# AI Project Management - Setup Script
# Run this script to set up the project

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "AI Project Management System - Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed. Please install Node.js v18 or higher." -ForegroundColor Red
    Write-Host "  Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Install Backend Dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location server
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install backend dependencies" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

Write-Host ""

# Install Frontend Dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location client
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install frontend dependencies" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

Write-Host ""

# Create .env files if they don't exist
Write-Host "Setting up environment files..." -ForegroundColor Yellow

if (!(Test-Path "server/.env")) {
    Copy-Item "server/.env.example" "server/.env"
    Write-Host "✓ Created server/.env (please configure it)" -ForegroundColor Green
} else {
    Write-Host "✓ server/.env already exists" -ForegroundColor Green
}

if (!(Test-Path "client/.env")) {
    Copy-Item "client/.env.example" "client/.env"
    Write-Host "✓ Created client/.env" -ForegroundColor Green
} else {
    Write-Host "✓ client/.env already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete! 🎉" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Configure server/.env with your MongoDB URI and Gemini API key" -ForegroundColor White
Write-Host "   - Get Gemini API key: https://makersuite.google.com/app/apikey" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Start the backend server:" -ForegroundColor White
Write-Host "   cd server" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "3. In a new terminal, start the frontend:" -ForegroundColor White
Write-Host "   cd client" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Open http://localhost:5173 in your browser" -ForegroundColor White
Write-Host ""
Write-Host "For more details, see README.md or QUICKSTART.md" -ForegroundColor Cyan
