# UFFICIENT V1 - Quick Deployment Check
Write-Host "🔍 UFFICIENT V1 - Pre-Deployment Check" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Check if all apps build successfully
Write-Host "🏗️  Building all applications..." -ForegroundColor Yellow

try {
    # Build all apps
    npm run build
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ All applications build successfully!" -ForegroundColor Green
    } else {
        Write-Host "❌ Build failed!" -ForegroundColor Red
        return
    }
} catch {
    Write-Host "❌ Build process failed: $_" -ForegroundColor Red
    return
}

# Check if Vercel CLI is available
Write-Host ""
Write-Host "🔍 Checking Vercel CLI..." -ForegroundColor Yellow
try {
    $vercelVersion = vercel --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Vercel CLI ready: $vercelVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ Vercel CLI not found - installing..." -ForegroundColor Yellow
        npm install -g vercel
        Write-Host "✅ Vercel CLI installed" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Failed to check Vercel CLI" -ForegroundColor Red
    return
}

Write-Host ""
Write-Host "🎯 Deployment Commands Ready:" -ForegroundColor Green
Write-Host "   Landing Page:  vercel --prod --cwd apps/landing" -ForegroundColor Gray
Write-Host "   Admin Portal:  vercel --prod --cwd apps/admin" -ForegroundColor Gray
Write-Host "   Mobile PWA:    vercel --prod --cwd apps/mobile-pwa" -ForegroundColor Gray

Write-Host ""
Write-Host "🚀 Ready for deployment! Run .\deploy-v1.ps1 to deploy all apps" -ForegroundColor Green
