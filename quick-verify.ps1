# UFFICIENT V1 - Quick Verification Script

Write-Host "🔍 UFFICIENT V1 - QUICK VERIFICATION" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

$tests = @()

# Test 1: Project Structure
Write-Host "1. Testing Project Structure..." -NoNewline
if ((Test-Path "apps\web") -and (Test-Path "apps\admin") -and (Test-Path "apps\mobile")) {
    Write-Host " ✅ PASS" -ForegroundColor Green
    $tests += $true
} else {
    Write-Host " ❌ FAIL" -ForegroundColor Red
    $tests += $false
}

# Test 2: Package Files
Write-Host "2. Testing Package Files..." -NoNewline
if ((Test-Path "package.json") -and (Test-Path "apps\web\package.json") -and (Test-Path "apps\admin\package.json")) {
    Write-Host " ✅ PASS" -ForegroundColor Green
    $tests += $true
} else {
    Write-Host " ❌ FAIL" -ForegroundColor Red
    $tests += $false
}

# Test 3: Build Files
Write-Host "3. Testing Build Output..." -NoNewline
if ((Test-Path "apps\web\.next") -and (Test-Path "apps\admin\.next")) {
    Write-Host " ✅ PASS" -ForegroundColor Green
    $tests += $true
} else {
    Write-Host " ❌ FAIL - Run builds first" -ForegroundColor Red
    $tests += $false
}

# Test 4: Deployment Configs
Write-Host "4. Testing Deployment Configs..." -NoNewline
if ((Test-Path "apps\web\vercel.json") -and (Test-Path "apps\admin\vercel.json")) {
    Write-Host " ✅ PASS" -ForegroundColor Green
    $tests += $true
} else {
    Write-Host " ❌ FAIL" -ForegroundColor Red
    $tests += $false
}

# Test 5: Environment Templates
Write-Host "5. Testing Environment Templates..." -NoNewline
if ((Test-Path "apps\web\.env.example") -and (Test-Path "apps\admin\.env.example")) {
    Write-Host " ✅ PASS" -ForegroundColor Green
    $tests += $true
} else {
    Write-Host " ❌ FAIL" -ForegroundColor Red
    $tests += $false
}

# Test 6: Deployment Scripts
Write-Host "6. Testing Deployment Scripts..." -NoNewline
if ((Test-Path "deploy-v1.ps1") -and (Test-Path "DEPLOYMENT_GUIDE_V1.md")) {
    Write-Host " ✅ PASS" -ForegroundColor Green
    $tests += $true
} else {
    Write-Host " ❌ FAIL" -ForegroundColor Red
    $tests += $false
}

# Test 7: Node.js Version
Write-Host "7. Testing Node.js Version..." -NoNewline
try {
    $nodeVersion = node --version
    $majorVersion = [int]($nodeVersion.Substring(1).Split('.')[0])
    if ($majorVersion -ge 18) {
        Write-Host " ✅ PASS (NodeJS $nodeVersion)" -ForegroundColor Green
        $tests += $true
    } else {
        Write-Host " ❌ FAIL (Need NodeJS 18+, found $nodeVersion)" -ForegroundColor Red
        $tests += $false
    }
} catch {
    Write-Host " ❌ FAIL (NodeJS not found)" -ForegroundColor Red
    $tests += $false
}

# Test 8: Vercel CLI
Write-Host "8. Testing Vercel CLI..." -NoNewline
if (Get-Command vercel -ErrorAction SilentlyContinue) {
    Write-Host " ✅ PASS" -ForegroundColor Green
    $tests += $true
} else {
    Write-Host " ❌ FAIL (Install with: npm install -g vercel)" -ForegroundColor Red
    $tests += $false
}

# Summary
$passed = ($tests | Where-Object { $_ -eq $true }).Count
$total = $tests.Count
$failed = $total - $passed
$percentage = [math]::Round(($passed / $total) * 100, 1)

Write-Host ""
Write-Host "📊 VERIFICATION SUMMARY" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host "✅ Passed: $passed/$total" -ForegroundColor Green
Write-Host "❌ Failed: $failed/$total" -ForegroundColor Red
Write-Host "📈 Success Rate: $percentage%" -ForegroundColor $(if($percentage -ge 90) { "Green" } elseif($percentage -ge 75) { "Yellow" } else { "Red" })
Write-Host ""

if ($failed -eq 0) {
    Write-Host "🎉 ALL TESTS PASSED! READY FOR DEPLOYMENT! 🚀" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Run .\deploy-v1.ps1 to deploy to production" -ForegroundColor White
    Write-Host "2. Configure environment variables in Vercel" -ForegroundColor White
    Write-Host "3. Test deployed applications" -ForegroundColor White
} elseif ($failed -le 2) {
    Write-Host "⚠️  MINOR ISSUES DETECTED - Review and fix before deployment" -ForegroundColor Yellow
} else {
    Write-Host "🚨 CRITICAL ISSUES DETECTED - Fix before proceeding with deployment" -ForegroundColor Red
}

Write-Host ""
Write-Host "📖 For deployment instructions, see: DEPLOYMENT_GUIDE_V1.md" -ForegroundColor Cyan
