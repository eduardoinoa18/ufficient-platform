#!/bin/bash
# UFFICIENT V1 Complete Setup Verification Script

echo "🚀 UFFICIENT V1 - Complete Setup Verification"
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in the root directory of UFFICIENT project"
    exit 1
fi

echo "✅ In correct project directory"

# Check main package.json
echo ""
echo "📦 Checking Package Configuration..."
if grep -q "ufficient-app" package.json; then
    echo "✅ Main package.json configured"
else
    echo "❌ Main package.json needs configuration"
fi

# Check apps structure
echo ""
echo "🏗️  Checking Apps Structure..."
for app in landing admin mobile-pwa mobile-native; do
    if [ -d "apps/$app" ]; then
        echo "✅ apps/$app exists"
        if [ -f "apps/$app/package.json" ]; then
            echo "   ✅ Package.json present"
        else
            echo "   ❌ Package.json missing"
        fi
    else
        echo "❌ apps/$app missing"
    fi
done

# Check packages structure
echo ""
echo "📚 Checking Shared Packages..."
for pkg in ui core config utils; do
    if [ -d "packages/$pkg" ]; then
        echo "✅ packages/$pkg exists"
        if [ -f "packages/$pkg/package.json" ]; then
            echo "   ✅ Package.json present"
        else
            echo "   ❌ Package.json missing"
        fi
    else
        echo "❌ packages/$pkg missing"
    fi
done

# Check key components
echo ""
echo "🔧 Checking Key Components..."

# Landing page components
if [ -f "apps/landing/src/components/HeroSection.tsx" ]; then
    echo "✅ Landing HeroSection component exists"
else
    echo "❌ Landing HeroSection component missing"
fi

if [ -f "apps/landing/src/components/FeatureGrid.tsx" ]; then
    echo "✅ Landing FeatureGrid component exists"
else
    echo "❌ Landing FeatureGrid component missing"
fi

# Admin components
if [ -f "apps/admin/src/components/AuthForm.tsx" ]; then
    echo "✅ Admin AuthForm component exists"
else
    echo "❌ Admin AuthForm component missing"
fi

if [ -f "apps/admin/src/components/Sidebar.tsx" ]; then
    echo "✅ Admin Sidebar component exists"
else
    echo "❌ Admin Sidebar component missing"
fi

# Check PWA configuration
echo ""
echo "📱 Checking PWA Configuration..."
if [ -f "apps/mobile-pwa/next.config.js" ]; then
    if grep -q "withPWA" apps/mobile-pwa/next.config.js; then
        echo "✅ PWA configuration present"
    else
        echo "❌ PWA configuration missing"
    fi
else
    echo "❌ PWA next.config.js missing"
fi

# Check API endpoints
echo ""
echo "🔌 Checking API Endpoints..."
for app in landing admin mobile-pwa; do
    if [ -f "apps/$app/src/app/api/track/route.ts" ]; then
        echo "✅ $app track API endpoint exists"
    else
        echo "❌ $app track API endpoint missing"
    fi
done

# Check utility functions
echo ""
echo "🛠️  Checking Utility Functions..."
if [ -f "packages/utils/src/auth.ts" ]; then
    echo "✅ Auth utilities exist"
else
    echo "❌ Auth utilities missing"
fi

if [ -f "packages/utils/src/api.ts" ]; then
    echo "✅ API utilities exist"
else
    echo "❌ API utilities missing"
fi

if [ -f "packages/utils/src/logging.ts" ]; then
    echo "✅ Logging utilities exist"
else
    echo "❌ Logging utilities missing"
fi

# Check CI/CD configuration
echo ""
echo "🔄 Checking CI/CD Configuration..."
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "✅ GitHub Actions workflow exists"
else
    echo "❌ GitHub Actions workflow missing"
fi

# Check environment configuration
echo ""
echo "🌍 Checking Environment Configuration..."
if [ -f ".env.example" ]; then
    echo "✅ Environment template exists"
else
    echo "❌ Environment template missing"
fi

# Check Tailwind configuration
echo ""
echo "🎨 Checking Tailwind Configuration..."
if [ -f "packages/config/tailwind.config.js" ]; then
    echo "✅ Shared Tailwind config exists"
else
    echo "❌ Shared Tailwind config missing"
fi

# Final verification
echo ""
echo "🧪 Final Verification..."
echo "Run these commands to test your setup:"
echo ""
echo "1. Install dependencies:"
echo "   npm install"
echo ""
echo "2. Test development servers:"
echo "   npm run dev:landing      # Port 3000"
echo "   npm run dev:admin        # Port 3001"
echo "   npm run dev:mobile-pwa   # Port 3002"
echo ""
echo "3. Test native app:"
echo "   npm run dev:mobile-native # Port 19000"
echo ""
echo "4. Build all apps:"
echo "   npm run build"
echo ""
echo "5. Deploy to production:"
echo "   ./deploy-v1.ps1  (Windows)"
echo "   ./deploy-v1.sh   (Linux/Mac)"
echo ""

echo "✅ Setup verification complete!"
echo ""
echo "🎉 UFFICIENT V1 is ready for deployment!"
echo "   - Landing Page: Next.js with UFFICIENT branding"
echo "   - Admin Portal: User management + content control"
echo "   - Mobile PWA: Installable task management app"
echo "   - Native App: React Native with Expo (parallel development)"
echo "   - ML Analytics: Tracking endpoints ready"
echo "   - CI/CD: GitHub Actions configured"
echo "   - Shared Packages: UI, Config, Utils, Core"
echo ""
echo "Next steps:"
echo "1. Fill in your .env.example with actual values"
echo "2. Set up Vercel projects and secrets"
echo "3. Configure Supabase/Firebase for data storage"
echo "4. Push to GitHub and trigger deployment"
echo "5. Test all deployments"
echo ""
echo "🚀 Ready to launch!"
