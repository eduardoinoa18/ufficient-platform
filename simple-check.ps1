# Simple Deployment Check
Write-Host "UFFICIENT V1 - Quick Deployment Check" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

$checks = @(
    @{ Name = "Web App Folder"; Test = { Test-Path "apps\web" } },
    @{ Name = "Admin App Folder"; Test = { Test-Path "apps\admin" } },
    @{ Name = "Mobile App Folder"; Test = { Test-Path "apps\mobile" } },
    @{ Name = "Web Package.json"; Test = { Test-Path "apps\web\package.json" } },
    @{ Name = "Admin Package.json"; Test = { Test-Path "apps\admin\package.json" } },
    @{ Name = "Web Vercel Config"; Test = { Test-Path "apps\web\vercel.json" } },
    @{ Name = "Admin Vercel Config"; Test = { Test-Path "apps\admin\vercel.json" } },
    @{ Name = "Deployment Scripts"; Test = { Test-Path "deploy-v1.ps1" } },
    @{ Name = "Git Repository"; Test = { Test-Path ".git" } }
)

$passed = 0
$total = $checks.Count

foreach ($check in $checks) {
    Write-Host "Checking $($check.Name)..." -NoNewline
    if (& $check.Test) {
        Write-Host " PASS" -ForegroundColor Green
        $passed++
    } else {
        Write-Host " FAIL" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Results: $passed/$total checks passed" -ForegroundColor $(if($passed -eq $total) { "Green" } else { "Yellow" })

if ($passed -eq $total) {
    Write-Host ""
    Write-Host "✅ ALL CHECKS PASSED! Ready for deployment!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Run .\deploy-v1.ps1 to deploy to Vercel" -ForegroundColor White
    Write-Host "2. Your web folder is now accessible on GitHub" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "⚠️ Some checks failed. Please review before deployment." -ForegroundColor Yellow
}
