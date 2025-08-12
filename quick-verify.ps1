# UFFICIENT V1 - Quick Verification Script

Write-Host "🔍 UFFICIENT V1 - QUICK VERIFICATION" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

$tests = @()

# Test 1: Project Structure
Write-Host "1. Testing Project Structure..." -NoNewline
if ((Test-Path "apps\landing") -and (Test-Path "apps\admin") -and (Test-Path "apps\mobile-pwa")) {
    Write-Host " ✅ PASS" -ForegroundColor Green
    $tests += $true
} else {
    Write-Host " ❌ FAIL" -ForegroundColor Red
    $tests += $false
}

# Test 2: Package Files
Write-Host "2. Testing Package Files..." -NoNewline
if ((Test-Path "package.json") -and (Test-Path "apps\landing\package.json") -and (Test-Path "apps\admin\package.json")) {
    Write-Host " ✅ PASS" -ForegroundColor Green
    $tests += $true
} else {
    Write-Host " ❌ FAIL" -ForegroundColor Red
    $tests += $false
}

# Test 3: Shared Packages
Write-Host "3. Testing Shared Packages..." -NoNewline
if ((Test-Path "packages\ui") -and (Test-Path "packages\core") -and (Test-Path "packages\utils")) {
    Write-Host " ✅ PASS" -ForegroundColor Green
    $tests += $true
} else {
    Write-Host " ❌ FAIL" -ForegroundColor Red
    $tests += $false
}

# Test 4: CSS Files
Write-Host "4. Testing CSS Files..." -NoNewline
if ((Test-Path "apps\admin\src\app\globals.css") -and (Test-Path "apps\landing\src\app\globals.css")) {
    Write-Host " ✅ PASS" -ForegroundColor Green
    $tests += $true
} else {
    Write-Host " ❌ FAIL" -ForegroundColor Red
    $tests += $false
}

# Test 5: Tailwind Configs
Write-Host "5. Testing Tailwind Configs..." -NoNewline
if ((Test-Path "apps\admin\tailwind.config.js") -and (Test-Path "apps\landing\tailwind.config.js")) {
    Write-Host " ✅ PASS" -ForegroundColor Green
    $tests += $true
} else {
    Write-Host " ❌ FAIL" -ForegroundColor Red
    $tests += $false
}

# Test 6: Node.js Version
Write-Host "6. Testing Node.js Version..." -NoNewline
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        $majorVersion = [int]($nodeVersion.Substring(1).Split('.')[0])
        if ($majorVersion -ge 18) {
            Write-Host " ✅ PASS (Node.js $nodeVersion)" -ForegroundColor Green
            $tests += $true
        } else {
            Write-Host " ❌ FAIL (Need Node.js 18+, found $nodeVersion)" -ForegroundColor Red
            $tests += $false
        }
    } else {
        Write-Host " ❌ FAIL (Node.js not found)" -ForegroundColor Red
        $tests += $false
    }
} catch {
    Write-Host " ❌ FAIL (Node.js not found)" -ForegroundColor Red
    $tests += $false
}

# Test 7: NPM Dependencies
Write-Host "7. Testing NPM Dependencies..." -NoNewline
if (Test-Path "node_modules") {
    Write-Host " ✅ PASS" -ForegroundColor Green
    $tests += $true
} else {
    Write-Host " ❌ FAIL" -ForegroundColor Red
    $tests += $false
}

# Test 8: Deployment Files
Write-Host "8. Testing Deployment Files..." -NoNewline
if ((Test-Path "apps\admin\vercel.json") -and (Test-Path "apps\landing\vercel.json")) {
    Write-Host " ✅ PASS" -ForegroundColor Green
    $tests += $true
} else {
    Write-Host " ❌ FAIL" -ForegroundColor Red
    $tests += $false
}

# Calculate results
$total = $tests.Count
$passed = ($tests | Where-Object { $_ -eq $true }).Count
$failed = $total - $passed
$percentage = if ($total -gt 0) { [math]::Round(($passed / $total) * 100, 1) } else { 0 }

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
    Write-Host "1. All apps are already deployed and working" -ForegroundColor White
    Write-Host "2. Landing: https://ufficient-web-two-kappa-68.vercel.app" -ForegroundColor White
    Write-Host "3. Admin: https://ufficient-admin-one-roan-20.vercel.app" -ForegroundColor White
    Write-Host "4. PWA: https://ufficient-mobile-one-roan-20.vercel.app" -ForegroundColor White
} elseif ($failed -le 2) {
    Write-Host "⚠️  MINOR ISSUES DETECTED - Review and fix before deployment" -ForegroundColor Yellow
} else {
    Write-Host "🚨 CRITICAL ISSUES DETECTED - Fix before proceeding with deployment" -ForegroundColor Red
}

Write-Host ""
Write-Host "📖 For more details, see: DEPLOYMENT_COMPLETE_V1.md" -ForegroundColor Cyan
