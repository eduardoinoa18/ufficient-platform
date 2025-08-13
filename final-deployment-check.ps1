# UFFICIENT V1 - FINAL DEPLOYMENT VERIFICATION

Write-Host "🔍 UFFICIENT V1 - DEPLOYMENT VERIFICATION" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$issues = @()

# Test 1: Project Structure
Write-Host "1. Verifying Project Structure..." -NoNewline
$requiredDirs = @("apps\landing", "apps\admin", "apps\mobile-pwa", "packages\ui", "packages\core", "packages\utils")
$allExist = $true
foreach ($dir in $requiredDirs) {
    if (-not (Test-Path $dir)) {
        $allExist = $false
        $issues += "Missing directory: $dir"
    }
}
if ($allExist) {
    Write-Host " ✅ PASS" -ForegroundColor Green
} else {
    Write-Host " ❌ FAIL" -ForegroundColor Red
}

# Test 2: Package.json files
Write-Host "2. Verifying Package Files..." -NoNewline
$packageFiles = @("package.json", "apps\landing\package.json", "apps\admin\package.json", "apps\mobile-pwa\package.json")
$allExist = $true
foreach ($file in $packageFiles) {
    if (-not (Test-Path $file)) {
        $allExist = $false
        $issues += "Missing package.json: $file"
    }
}
if ($allExist) {
    Write-Host " ✅ PASS" -ForegroundColor Green
} else {
    Write-Host " ❌ FAIL" -ForegroundColor Red
}

# Test 3: No duplicate web directory
Write-Host "3. Checking for Duplicate Directories..." -NoNewline
if (Test-Path "apps\web") {
    Write-Host " ❌ FAIL - apps\web still exists" -ForegroundColor Red
    $issues += "Duplicate apps\web directory found"
} else {
    Write-Host " ✅ PASS" -ForegroundColor Green
}

# Test 4: Build test for each app
Write-Host "4. Testing App Builds..." -ForegroundColor Yellow

# Landing
Write-Host "   Testing Landing App..." -NoNewline
Set-Location "apps\landing"
$buildResult = & npm run build 2>&1
Set-Location "..\..\"
if ($LASTEXITCODE -eq 0) {
    Write-Host " ✅ PASS" -ForegroundColor Green
} else {
    Write-Host " ❌ FAIL" -ForegroundColor Red
    $issues += "Landing app build failed"
}

# Admin
Write-Host "   Testing Admin App..." -NoNewline
Set-Location "apps\admin"
$buildResult = & npm run build 2>&1
Set-Location "..\..\"
if ($LASTEXITCODE -eq 0) {
    Write-Host " ✅ PASS" -ForegroundColor Green
} else {
    Write-Host " ❌ FAIL" -ForegroundColor Red
    $issues += "Admin app build failed"
}

# PWA
Write-Host "   Testing PWA App..." -NoNewline
Set-Location "apps\mobile-pwa"
$buildResult = & npm run build 2>&1
Set-Location "..\..\"
if ($LASTEXITCODE -eq 0) {
    Write-Host " ✅ PASS" -ForegroundColor Green
} else {
    Write-Host " ❌ FAIL" -ForegroundColor Red
    $issues += "PWA app build failed"
}

# Test 5: Git status
Write-Host "5. Checking Git Status..." -NoNewline
$gitStatus = git status --porcelain 2>$null
if ($gitStatus) {
    Write-Host " ⚠️ UNCOMMITTED CHANGES" -ForegroundColor Yellow
} else {
    Write-Host " ✅ CLEAN" -ForegroundColor Green
}

# Summary
Write-Host ""
Write-Host "📊 VERIFICATION SUMMARY" -ForegroundColor Cyan
Write-Host "=======================" -ForegroundColor Cyan

if ($issues.Count -eq 0) {
    Write-Host "🎉 ALL TESTS PASSED! READY FOR DEPLOYMENT!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 DEPLOYMENT COMMANDS:" -ForegroundColor Cyan
    Write-Host "cd apps\landing && vercel --prod" -ForegroundColor White
    Write-Host "cd apps\admin && vercel --prod" -ForegroundColor White
    Write-Host "cd apps\mobile-pwa && vercel --prod" -ForegroundColor White
    Write-Host ""
    Write-Host "📱 Or use GitHub integration:" -ForegroundColor Cyan
    Write-Host "git push origin main" -ForegroundColor White
} else {
    Write-Host "❌ ISSUES FOUND:" -ForegroundColor Red
    foreach ($issue in $issues) {
        Write-Host "   • $issue" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "🔧 Fix these issues before deployment" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📖 For detailed deployment guide, see: DEPLOYMENT_COMPLETE_V1.md" -ForegroundColor Cyan
