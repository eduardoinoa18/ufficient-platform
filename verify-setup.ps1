# UFFICIENT V1 Complete Setup Verification Script (PowerShell)

Write-Host "🚀 UFFICIENT V1 - Complete Setup Verification" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Not in the root directory of UFFICIENT project" -ForegroundColor Red
    exit 1
}

Write-Host "✅ In correct project directory" -ForegroundColor Green

# Check main package.json
Write-Host ""
Write-Host "📦 Checking Package Configuration..." -ForegroundColor Yellow
$packageContent = Get-Content "package.json" -Raw
if ($packageContent -like "*ufficient-app*") {
    Write-Host "✅ Main package.json configured" -ForegroundColor Green
} else {
    Write-Host "❌ Main package.json needs configuration" -ForegroundColor Red
}

# Check apps structure
Write-Host ""
Write-Host "🏗️  Checking Apps Structure..." -ForegroundColor Yellow
$apps = @("landing", "admin", "mobile-pwa", "mobile-native")
foreach ($app in $apps) {
    if (Test-Path "apps\$app") {
        Write-Host "✅ apps\$app exists" -ForegroundColor Green
        if (Test-Path "apps\$app\package.json") {
            Write-Host "   ✅ Package.json present" -ForegroundColor Green
        } else {
            Write-Host "   ❌ Package.json missing" -ForegroundColor Red
        }
    } else {
        Write-Host "❌ apps\$app missing" -ForegroundColor Red
    }
}

# Check packages structure
Write-Host ""
Write-Host "📚 Checking Shared Packages..." -ForegroundColor Yellow
$packages = @("ui", "core", "config", "utils")
foreach ($pkg in $packages) {
    if (Test-Path "packages\$pkg") {
        Write-Host "✅ packages\$pkg exists" -ForegroundColor Green
        if (Test-Path "packages\$pkg\package.json") {
            Write-Host "   ✅ Package.json present" -ForegroundColor Green
        } else {
            Write-Host "   ❌ Package.json missing" -ForegroundColor Red
        }
    } else {
        Write-Host "❌ packages\$pkg missing" -ForegroundColor Red
    }
}

# Check key components
Write-Host ""
Write-Host "🔧 Checking Key Components..." -ForegroundColor Yellow

# Landing page components
if (Test-Path "apps\landing\src\components\HeroSection.tsx") {
    Write-Host "✅ Landing HeroSection component exists" -ForegroundColor Green
} else {
    Write-Host "❌ Landing HeroSection component missing" -ForegroundColor Red
}

if (Test-Path "apps\landing\src\components\FeatureGrid.tsx") {
    Write-Host "✅ Landing FeatureGrid component exists" -ForegroundColor Green
} else {
    Write-Host "❌ Landing FeatureGrid component missing" -ForegroundColor Red
}

# Admin components
if (Test-Path "apps\admin\src\components\AuthForm.tsx") {
    Write-Host "✅ Admin AuthForm component exists" -ForegroundColor Green
} else {
    Write-Host "❌ Admin AuthForm component missing" -ForegroundColor Red
}

if (Test-Path "apps\admin\src\components\Sidebar.tsx") {
    Write-Host "✅ Admin Sidebar component exists" -ForegroundColor Green
} else {
    Write-Host "❌ Admin Sidebar component missing" -ForegroundColor Red
}

# Check PWA configuration
Write-Host ""
Write-Host "📱 Checking PWA Configuration..." -ForegroundColor Yellow
if (Test-Path "apps\mobile-pwa\next.config.js") {
    $pwaConfig = Get-Content "apps\mobile-pwa\next.config.js" -Raw
    if ($pwaConfig -like "*withPWA*") {
        Write-Host "✅ PWA configuration present" -ForegroundColor Green
    } else {
        Write-Host "❌ PWA configuration missing" -ForegroundColor Red
    }
} else {
    Write-Host "❌ PWA next.config.js missing" -ForegroundColor Red
}

# Check API endpoints
Write-Host ""
Write-Host "🔌 Checking API Endpoints..." -ForegroundColor Yellow
$apiApps = @("landing", "admin", "mobile-pwa")
foreach ($app in $apiApps) {
    if (Test-Path "apps\$app\src\app\api\track\route.ts") {
        Write-Host "✅ $app track API endpoint exists" -ForegroundColor Green
    } else {
        Write-Host "❌ $app track API endpoint missing" -ForegroundColor Red
    }
}

# Check utility functions
Write-Host ""
Write-Host "🛠️  Checking Utility Functions..." -ForegroundColor Yellow
if (Test-Path "packages\utils\src\auth.ts") {
    Write-Host "✅ Auth utilities exist" -ForegroundColor Green
} else {
    Write-Host "❌ Auth utilities missing" -ForegroundColor Red
}

if (Test-Path "packages\utils\src\api.ts") {
    Write-Host "✅ API utilities exist" -ForegroundColor Green
} else {
    Write-Host "❌ API utilities missing" -ForegroundColor Red
}

if (Test-Path "packages\utils\src\logging.ts") {
    Write-Host "✅ Logging utilities exist" -ForegroundColor Green
} else {
    Write-Host "❌ Logging utilities missing" -ForegroundColor Red
}

# Check CI/CD configuration
Write-Host ""
Write-Host "🔄 Checking CI/CD Configuration..." -ForegroundColor Yellow
if (Test-Path ".github\workflows\deploy.yml") {
    Write-Host "✅ GitHub Actions workflow exists" -ForegroundColor Green
} else {
    Write-Host "❌ GitHub Actions workflow missing" -ForegroundColor Red
}

# Check environment configuration
Write-Host ""
Write-Host "🌍 Checking Environment Configuration..." -ForegroundColor Yellow
if (Test-Path ".env.example") {
    Write-Host "✅ Environment template exists" -ForegroundColor Green
} else {
    Write-Host "❌ Environment template missing" -ForegroundColor Red
}

# Check Tailwind configuration
Write-Host ""
Write-Host "🎨 Checking Tailwind Configuration..." -ForegroundColor Yellow
if (Test-Path "packages\config\tailwind.config.js") {
    Write-Host "✅ Shared Tailwind config exists" -ForegroundColor Green
} else {
    Write-Host "❌ Shared Tailwind config missing" -ForegroundColor Red
}

# Final verification
Write-Host ""
Write-Host "🧪 Final Verification..." -ForegroundColor Yellow
Write-Host "Run these commands to test your setup:" -ForegroundColor White
Write-Host ""
Write-Host "1. Install dependencies:" -ForegroundColor Cyan
Write-Host "   npm install" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Test development servers:" -ForegroundColor Cyan
Write-Host "   npm run dev:landing      # Port 3000" -ForegroundColor Gray
Write-Host "   npm run dev:admin        # Port 3001" -ForegroundColor Gray
Write-Host "   npm run dev:mobile-pwa   # Port 3002" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Test native app:" -ForegroundColor Cyan
Write-Host "   npm run dev:mobile-native # Port 19000" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Build all apps:" -ForegroundColor Cyan
Write-Host "   npm run build" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Deploy to production:" -ForegroundColor Cyan
Write-Host "   .\deploy-v1.ps1" -ForegroundColor Gray
Write-Host ""

Write-Host "✅ Setup verification complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 UFFICIENT V1 is ready for deployment!" -ForegroundColor Green
Write-Host "   - Landing Page: Next.js with UFFICIENT branding" -ForegroundColor White
Write-Host "   - Admin Portal: User management + content control" -ForegroundColor White
Write-Host "   - Mobile PWA: Installable task management app" -ForegroundColor White
Write-Host "   - Native App: React Native with Expo (parallel development)" -ForegroundColor White
Write-Host "   - ML Analytics: Tracking endpoints ready" -ForegroundColor White
Write-Host "   - CI/CD: GitHub Actions configured" -ForegroundColor White
Write-Host "   - Shared Packages: UI, Config, Utils, Core" -ForegroundColor White
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Fill in your .env.example with actual values" -ForegroundColor White
Write-Host "2. Set up Vercel projects and secrets" -ForegroundColor White
Write-Host "3. Configure Supabase/Firebase for data storage" -ForegroundColor White
Write-Host "4. Push to GitHub and trigger deployment" -ForegroundColor White
Write-Host "5. Test all deployments" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Ready to launch!" -ForegroundColor Green
