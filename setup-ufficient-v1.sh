#!/bin/bash
# UFFICIENT V1 - Complete Platform Setup Script
# This script sets up Landing Page, Admin Portal, and Mobile App with deployments

echo "🚀 UFFICIENT Platform V1 - Automated Setup"
echo "Setting up monorepo with Landing + Admin + Mobile..."

# 1️⃣ MONOREPO SETUP
echo "📁 Setting up monorepo structure..."

# Create apps directories if they don't exist
mkdir -p apps/web apps/admin apps/mobile
mkdir -p packages/ui packages/core

# 2️⃣ LANDING PAGE SETUP (Web)
echo "🌐 Setting up Landing Page..."
cd apps/web

# Install Next.js dependencies for landing page
npm install framer-motion lucide-react @tailwindcss/forms next

# Create core landing page components
mkdir -p src/components src/app/api/contact

# 3️⃣ ADMIN PORTAL SETUP
echo "🔧 Setting up Admin Portal..."
cd ../admin

# Install Admin dependencies
npm install bcryptjs jsonwebtoken framer-motion lucide-react

# Create admin structure
mkdir -p src/components src/app/api/admin

# 4️⃣ MOBILE APP SETUP
echo "📱 Setting up Mobile App..."
cd ../mobile

# Install mobile dependencies
npm install nativewind @react-navigation/native @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npx expo install react-native-gesture-handler

# Create mobile structure
mkdir -p screens components

# 5️⃣ SHARED PACKAGES
echo "📦 Setting up shared packages..."
cd ../../packages

# Core package setup
cd core
cat > package.json << EOF
{
  "name": "@ufficient/core",
  "version": "1.0.0",
  "main": "src/index.ts",
  "types": "src/index.ts",
  "dependencies": {
    "axios": "^1.6.0"
  }
}
EOF

# UI package setup
cd ../ui
cat > package.json << EOF
{
  "name": "@ufficient/ui",
  "version": "1.0.0",
  "main": "src/index.ts",
  "types": "src/index.ts",
  "dependencies": {
    "react": "^18.0.0",
    "lucide-react": "^0.400.0"
  }
}
EOF

# 6️⃣ VERCEL DEPLOYMENT CONFIG
echo "⚡ Setting up Vercel deployment configurations..."
cd ../../

# Web app Vercel config
cat > apps/web/vercel.json << EOF
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
EOF

# Admin app Vercel config
cat > apps/admin/vercel.json << EOF
{
  "framework": "nextjs", 
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
EOF

# 7️⃣ GITHUB ACTIONS CI/CD
echo "🔄 Setting up CI/CD pipeline..."
mkdir -p .github/workflows

cat > .github/workflows/deploy.yml << EOF
name: Deploy UFFICIENT Platform
on:
  push:
    branches: [main, master]
    
jobs:
  deploy-web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install and Build Web
        run: |
          cd apps/web
          npm install
          npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID_WEB }}
          working-directory: ./apps/web
          
  deploy-admin:
    runs-on: ubuntu-latest  
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install and Build Admin
        run: |
          cd apps/admin
          npm install  
          npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID_ADMIN }}
          working-directory: ./apps/admin
EOF

# 8️⃣ PACKAGE.JSON SCRIPTS
echo "📝 Setting up workspace scripts..."
cat > package.json << EOF
{
  "name": "ufficient-platform",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev:web": "cd apps/web && npm run dev",
    "dev:admin": "cd apps/admin && npm run dev", 
    "dev:mobile": "cd apps/mobile && npm start",
    "build": "npm run build:web && npm run build:admin",
    "build:web": "cd apps/web && npm run build",
    "build:admin": "cd apps/admin && npm run build",
    "deploy:web": "cd apps/web && vercel --prod",
    "deploy:admin": "cd apps/admin && vercel --prod",
    "install-all": "npm install && cd apps/web && npm install && cd ../admin && npm install && cd ../mobile && npm install"
  }
}
EOF

echo "✅ UFFICIENT Platform V1 setup complete!"
echo ""
echo "🔗 Next Steps:"
echo "1. Create GitHub repository: https://github.com/new"
echo "2. Push code: git add . && git commit -m 'Initial V1' && git push"
echo "3. Connect Vercel to GitHub repo"
echo "4. Deploy: npm run deploy:web && npm run deploy:admin"
echo ""
echo "🌐 Expected URLs:"
echo "- Landing: https://ufficient-web.vercel.app"
echo "- Admin: https://ufficient-admin.vercel.app"
echo "- Mobile: Expo development build"
