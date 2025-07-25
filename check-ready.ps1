# UFFICIENT V1 - Simple Verification

Write-Host "Checking UFFICIENT V1 Deployment Readiness..." -ForegroundColor Cyan
Write-Host ""

$checks = @()

# Check 1: Project Structure
Write-Host "1. Project Structure..." -NoNewline
if ((Test-Path "apps\web") -and (Test-Path "apps\admin") -and (Test-Path "apps\mobile")) {
    Write-Host " PASS" -ForegroundColor Green
    $checks += $true
} else {
    Write-Host " FAIL" -ForegroundColor Red
    $checks += $false
}

# Check 2: Build Output
Write-Host "2. Build Output..." -NoNewline
if ((Test-Path "apps\web\.next") -and (Test-Path "apps\admin\.next")) {
    Write-Host " PASS" -ForegroundColor Green
    $checks += $true
} else {
    Write-Host " FAIL (Run npm run build first)" -ForegroundColor Red
    $checks += $false
}

# Check 3: Deployment Configs
Write-Host "3. Deployment Configs..." -NoNewline
if ((Test-Path "apps\web\vercel.json") -and (Test-Path "apps\admin\vercel.json")) {
    Write-Host " PASS" -ForegroundColor Green
    $checks += $true
} else {
    Write-Host " FAIL" -ForegroundColor Red
    $checks += $false
}

# Check 4: Environment Templates
Write-Host "4. Environment Templates..." -NoNewline
if ((Test-Path "apps\web\.env.example") -and (Test-Path "apps\admin\.env.example")) {
    Write-Host " PASS" -ForegroundColor Green
    $checks += $true
} else {
    Write-Host " FAIL" -ForegroundColor Red
    $checks += $false
}

# Check 5: Deployment Guide
Write-Host "5. Deployment Guide..." -NoNewline
if (Test-Path "DEPLOYMENT_GUIDE_V1.md") {
    Write-Host " PASS" -ForegroundColor Green
    $checks += $true
} else {
    Write-Host " FAIL" -ForegroundColor Red
    $checks += $false
}

# Summary
$passed = ($checks | Where-Object { $_ }).Count
$total = $checks.Count
$failed = $total - $passed

Write-Host ""
Write-Host "SUMMARY: $passed/$total passed, $failed failed" -ForegroundColor Cyan

if ($failed -eq 0) {
    Write-Host "READY FOR DEPLOYMENT!" -ForegroundColor Green
    Write-Host "Run: .\deploy-v1.ps1" -ForegroundColor Yellow
} else {
    Write-Host "Fix issues before deploying" -ForegroundColor Red
}

Write-Host ""
Write-Host "See DEPLOYMENT_GUIDE_V1.md for instructions" -ForegroundColor Cyan
