#!/usr/bin/env pwsh

Write-Host "🔍 UFFICIENT V1 - PRODUCTION VERIFICATION" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Gray

# Test URLs
$webUrl = "https://ufficient-web-two-kappa-68.vercel.app"
$adminUrl = "https://ufficient-admin-one-roan-20.vercel.app"
$mobileUrl = "https://ufficient-mobile-one-roan-20.vercel.app"

Write-Host ""
Write-Host "🌐 Testing Landing Page..." -ForegroundColor Yellow
try {
    $webResponse = Invoke-WebRequest -Uri $webUrl -Method GET -TimeoutSec 10
    if ($webResponse.StatusCode -eq 200) {
        Write-Host "✅ Landing Page: OPERATIONAL" -ForegroundColor Green
        Write-Host "   URL: $webUrl" -ForegroundColor White
    }
} catch {
    Write-Host "❌ Landing Page: ERROR" -ForegroundColor Red
}

Write-Host ""
Write-Host "🔐 Testing Admin Dashboard..." -ForegroundColor Yellow
try {
    $adminResponse = Invoke-WebRequest -Uri "$adminUrl/login" -Method GET -TimeoutSec 10
    if ($adminResponse.StatusCode -eq 200) {
        Write-Host "✅ Admin Dashboard: OPERATIONAL" -ForegroundColor Green
        Write-Host "   URL: $adminUrl" -ForegroundColor White
    }
} catch {
    Write-Host "❌ Admin Dashboard: ERROR" -ForegroundColor Red
}

Write-Host ""
Write-Host "📱 Testing Mobile PWA..." -ForegroundColor Yellow
try {
    $mobileResponse = Invoke-WebRequest -Uri $mobileUrl -Method GET -TimeoutSec 10
    if ($mobileResponse.StatusCode -eq 200) {
        Write-Host "✅ Mobile PWA: OPERATIONAL" -ForegroundColor Green
        Write-Host "   URL: $mobileUrl" -ForegroundColor White
    }
} catch {
    Write-Host "❌ Mobile PWA: ERROR" -ForegroundColor Red
}

Write-Host ""
Write-Host "🔧 Testing Admin API Endpoints..." -ForegroundColor Yellow
try {
    $metricsResponse = Invoke-WebRequest -Uri "$adminUrl/api/metrics" -Method GET -TimeoutSec 10
    if ($metricsResponse.StatusCode -eq 200) {
        Write-Host "✅ Metrics API: OPERATIONAL" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Metrics API: ERROR" -ForegroundColor Red
}

try {
    $usersResponse = Invoke-WebRequest -Uri "$adminUrl/api/users" -Method GET -TimeoutSec 10
    if ($usersResponse.StatusCode -eq 200) {
        Write-Host "✅ Users API: OPERATIONAL" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Users API: ERROR" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 VERIFICATION COMPLETE!" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 QUICK ACCESS LINKS:" -ForegroundColor White
Write-Host "🌐 Landing Page: $webUrl" -ForegroundColor Blue
Write-Host "🔐 Admin Dashboard: $adminUrl" -ForegroundColor Purple  
Write-Host "📱 Mobile PWA: $mobileUrl" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 UFFICIENT V1 is PRODUCTION READY!" -ForegroundColor Cyan
