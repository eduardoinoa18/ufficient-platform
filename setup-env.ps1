# UFFICIENT V1 - Environment Setup Script
# Run this before deployment to set up environment variables

Write-Host "🔧 UFFICIENT V1 - Environment Setup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan

# Check if .env file exists
if (-not (Test-Path ".env.local")) {
    Write-Host "Creating .env.local from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env.local"
    Write-Host "✅ Created .env.local file" -ForegroundColor Green
    Write-Host "⚠️  Please edit .env.local with your actual values before deployment!" -ForegroundColor Yellow
} else {
    Write-Host "✅ .env.local already exists" -ForegroundColor Green
}

# Check for required environment variables
Write-Host ""
Write-Host "🔍 Checking required environment variables..." -ForegroundColor Yellow

$requiredVars = @(
    "NEXT_PUBLIC_API_URL",
    "JWT_SECRET", 
    "SUPABASE_URL",
    "SUPABASE_KEY"
)

$missingVars = @()

foreach ($var in $requiredVars) {
    $value = [Environment]::GetEnvironmentVariable($var)
    if ([string]::IsNullOrEmpty($value)) {
        $missingVars += $var
        Write-Host "❌ $var is not set" -ForegroundColor Red
    } else {
        $maskedValue = if ($value.Length -gt 10) { $value.Substring(0, 10) + "..." } else { $value }
        Write-Host "✅ $var = $maskedValue" -ForegroundColor Green
    }
}

if ($missingVars.Count -gt 0) {
    Write-Host ""
    Write-Host "⚠️  Missing required environment variables:" -ForegroundColor Yellow
    foreach ($var in $missingVars) {
        Write-Host "   - $var" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Please set these variables in your .env.local file or system environment." -ForegroundColor Yellow
    Write-Host "You can also set them in your Vercel dashboard for production deployment." -ForegroundColor Yellow
    return
}

Write-Host ""
Write-Host "✅ All required environment variables are set!" -ForegroundColor Green
Write-Host "🚀 Ready for deployment!" -ForegroundColor Green

# Check Vercel CLI
Write-Host ""
Write-Host "🔍 Checking Vercel CLI..." -ForegroundColor Yellow
try {
    $vercelVersion = vercel --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Vercel CLI is installed: $vercelVersion" -ForegroundColor Green
    } else {
        throw "Vercel CLI not found"
    }
} catch {
    Write-Host "❌ Vercel CLI is not installed" -ForegroundColor Red
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    Write-Host "✅ Vercel CLI installed" -ForegroundColor Green
}

# Check if logged into Vercel
Write-Host ""
Write-Host "🔍 Checking Vercel authentication..." -ForegroundColor Yellow
try {
    $vercelUser = vercel whoami 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Logged into Vercel as: $vercelUser" -ForegroundColor Green
    } else {
        throw "Not logged in"
    }
} catch {
    Write-Host "❌ Not logged into Vercel" -ForegroundColor Red
    Write-Host "Please run: vercel login" -ForegroundColor Yellow
    return
}

Write-Host ""
Write-Host "🎉 Environment setup complete!" -ForegroundColor Green
Write-Host "You can now run .\deploy-v1.ps1 to deploy to production" -ForegroundColor Green
