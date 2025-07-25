# UFFICIENT V1 - Automated Deployment Script (PowerShell)
# This script deploys the entire platform to production

param(
    [switch]$SkipBuild,
    [switch]$SkipDeploy,
    [switch]$Verbose
)

Write-Host "🚀 UFFICIENT V1 - AUTOMATED DEPLOYMENT STARTING..." -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

try {
    # Check prerequisites
    Write-Status "Checking prerequisites..."

    # Check if Node.js is installed
    if (!(Get-Command node -ErrorAction SilentlyContinue)) {
        Write-Error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    }

    # Check if npm is installed
    if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
        Write-Error "npm is not installed. Please install npm first."
        exit 1
    }

    # Check if Vercel CLI is installed
    if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
        Write-Warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    }

    Write-Success "Prerequisites check passed!"

    if (!$SkipBuild) {
        # Build all applications
        Write-Status "Building all applications..."

        # Install dependencies
        Write-Status "Installing dependencies..."
        npm install

        # Build web app
        Write-Status "Building web app..."
        Set-Location "apps\web"
        npm run build
        Write-Success "Web app built successfully!"
        Set-Location "..\..\"

        # Build admin app
        Write-Status "Building admin app..."
        Set-Location "apps\admin"
        npm run build
        Write-Success "Admin app built successfully!"
        Set-Location "..\..\"

        Write-Success "All builds completed successfully!"
    } else {
        Write-Warning "Skipping build step as requested."
    }

    if (!$SkipDeploy) {
        # Deploy to Vercel
        Write-Status "Deploying to Vercel..."

        # Deploy web app
        Write-Status "Deploying web app..."
        Set-Location "apps\web"
        $webOutput = vercel --prod --yes 2>&1
        if ($LASTEXITCODE -eq 0) {
            $webUrl = ($webOutput | Select-String "https://[^\s]*").Matches.Value | Select-Object -Last 1
            Write-Success "Web app deployed! URL: $webUrl"
        } else {
            Write-Error "Web app deployment failed!"
            Write-Host $webOutput
        }
        Set-Location "..\..\"

        # Deploy admin app
        Write-Status "Deploying admin app..."
        Set-Location "apps\admin"
        $adminOutput = vercel --prod --yes 2>&1
        if ($LASTEXITCODE -eq 0) {
            $adminUrl = ($adminOutput | Select-String "https://[^\s]*").Matches.Value | Select-Object -Last 1
            Write-Success "Admin app deployed! URL: $adminUrl"
        } else {
            Write-Error "Admin app deployment failed!"
            Write-Host $adminOutput
        }
        Set-Location "..\..\"
    } else {
        Write-Warning "Skipping deployment step as requested."
        $webUrl = "https://your-web-app.vercel.app"
        $adminUrl = "https://your-admin-app.vercel.app"
    }

    # Summary
    Write-Host ""
    Write-Host "🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!" -ForegroundColor Green
    Write-Host "=====================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "📱 Your UFFICIENT V1 Platform is now live:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🌐 Landing Page:  $webUrl" -ForegroundColor White
    Write-Host "🔐 Admin Portal:  $adminUrl" -ForegroundColor White
    Write-Host ""
    Write-Host "📋 Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Configure environment variables in Vercel dashboard" -ForegroundColor White
    Write-Host "2. Set up Firebase project and add credentials" -ForegroundColor White
    Write-Host "3. Test all functionality" -ForegroundColor White
    Write-Host "4. Deploy mobile app to app stores" -ForegroundColor White
    Write-Host ""
    Write-Host "📖 See DEPLOYMENT_GUIDE_V1.md for detailed instructions" -ForegroundColor Cyan
    Write-Host ""
    Write-Success "UFFICIENT V1 DEPLOYMENT COMPLETE! 🚀"

} catch {
    Write-Error "Deployment failed with error: $($_.Exception.Message)"
    if ($Verbose) {
        Write-Host $_.Exception.StackTrace -ForegroundColor Red
    }
    exit 1
}

# Usage instructions
Write-Host ""
Write-Host "📝 SCRIPT USAGE:" -ForegroundColor Magenta
Write-Host ".\deploy-v1.ps1                    # Full deployment" -ForegroundColor White
Write-Host ".\deploy-v1.ps1 -SkipBuild         # Skip build, deploy only" -ForegroundColor White
Write-Host ".\deploy-v1.ps1 -SkipDeploy        # Build only, skip deploy" -ForegroundColor White
Write-Host ".\deploy-v1.ps1 -Verbose           # Verbose error output" -ForegroundColor White
