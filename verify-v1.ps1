# UFFICIENT V1 - Final Verification Script
# This script tests all components to ensure deployment readiness

Write-Host "🔍 UFFICIENT V1 - FINAL VERIFICATION" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan

$passed = 0
$failed = 0

function Test-Component {
    param(
        [string]$Name,
        [scriptblock]$Test
    )
    
    Write-Host "Testing $Name..." -ForegroundColor Yellow -NoNewline
    
    try {
        $result = & $Test
        if ($result) {
            Write-Host " ✅ PASS" -ForegroundColor Green
            $script:passed++
        } else {
            Write-Host " ❌ FAIL" -ForegroundColor Red
            $script:failed++
        }
    } catch {
        Write-Host " ❌ ERROR: $($_.Exception.Message)" -ForegroundColor Red
        $script:failed++
    }
}

# Test 1: Project Structure
Test-Component "Project Structure" {
    return (Test-Path "apps\web") -and (Test-Path "apps\admin") -and (Test-Path "apps\mobile")
}

# Test 2: Package.json files
Test-Component "Package.json Files" {
    return (Test-Path "package.json") -and (Test-Path "apps\web\package.json") -and (Test-Path "apps\admin\package.json")
}

# Test 3: Dependencies Installation
Test-Component "Dependencies Installation" {
    return (Test-Path "node_modules") -and (Test-Path "apps\web\node_modules") -and (Test-Path "apps\admin\node_modules")
}

# Test 4: Web App Build
Test-Component "Web App Build" {
    Push-Location "apps\web"
    try {
        npm run build 2>&1 | Out-Null
        $success = $LASTEXITCODE -eq 0
        Pop-Location
        return $success
    } catch {
        Pop-Location
        return $false
    }
}

# Test 5: Admin App Build
Test-Component "Admin App Build" {
    Push-Location "apps\admin"
    try {
        npm run build 2>&1 | Out-Null
        $success = $LASTEXITCODE -eq 0
        Pop-Location
        return $success
    } catch {
        Pop-Location
        return $false
    }
}

# Test 6: Environment Templates
Test-Component "Environment Templates" {
    return (Test-Path "apps\web\.env.example") -and (Test-Path "apps\admin\.env.example")
}

# Test 7: Deployment Configs
Test-Component "Deployment Configs" {
    return (Test-Path "apps\web\vercel.json") -and (Test-Path "apps\admin\vercel.json")
}

# Test 8: API Routes
Test-Component "Admin API Routes" {
    $routes = @(
        "apps\admin\src\app\api\admin\login\route.ts",
        "apps\admin\src\app\api\admin\logout\route.ts",
        "apps\admin\src\app\api\admin\metrics\route.ts",
        "apps\admin\src\app\api\admin\users\route.ts",
        "apps\admin\src\app\api\admin\verify\route.ts"
    )
    return ($routes | ForEach-Object { Test-Path $_ }) -notcontains $false
}

# Test 9: Core Components
Test-Component "Admin Components" {
    $components = @(
        "apps\admin\src\components\AuthForm.tsx",
        "apps\admin\src\components\Sidebar.tsx",
        "apps\admin\src\components\MetricCard.tsx"
    )
    return ($components | ForEach-Object { Test-Path $_ }) -notcontains $false
}

# Test 10: Mobile App Structure
Test-Component "Mobile App Structure" {
    $files = @(
        "apps\mobile\App.tsx",
        "apps\mobile\package.json",
        "apps\mobile\screens\Onboarding.tsx"
    )
    return ($files | ForEach-Object { Test-Path $_ }) -notcontains $false
}

# Test 11: Deployment Scripts
Test-Component "Deployment Scripts" {
    return (Test-Path "deploy-v1.ps1") -and (Test-Path "deploy-v1.sh") -and (Test-Path "DEPLOYMENT_GUIDE_V1.md")
}

# Test 12: Git Repository
Test-Component "Git Repository" {
    return (Test-Path ".git") -and (Get-Command git -ErrorAction SilentlyContinue)
}

# Test 13: Node.js Version
Test-Component "Node.js Version" {
    $nodeVersion = node --version
    $versionNumber = $nodeVersion.Substring(1).Split('.')[0]
    $majorVersion = [int]$versionNumber
    return $majorVersion -ge 18
}

# Test 14: Vercel CLI
Test-Component "Vercel CLI" {
    return (Get-Command vercel -ErrorAction SilentlyContinue) -ne $null
}

# Summary
Write-Host ""
Write-Host "📊 VERIFICATION SUMMARY" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host "✅ Passed: $passed" -ForegroundColor Green
Write-Host "❌ Failed: $failed" -ForegroundColor Red

$total = $passed + $failed
$percentage = [math]::Round(($passed / $total) * 100, 1)
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
