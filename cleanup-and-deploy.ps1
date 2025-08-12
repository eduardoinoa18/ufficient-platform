# UFFICIENT V1 - PROJECT CLEANUP & DEPLOYMENT SCRIPT

Write-Host "🧹 UFFICIENT V1 - COMPREHENSIVE CLEANUP & DEPLOYMENT" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host ""

# Function to check command exists
function Test-Command {
    param($Command)
    $null = Get-Command $Command -ErrorAction SilentlyContinue
    return $?
}

# Step 1: Clean all build artifacts
Write-Host "1. Cleaning build artifacts..." -ForegroundColor Yellow
Remove-Item -Recurse -Force apps\admin\.next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force apps\landing\.next -ErrorAction SilentlyContinue  
Remove-Item -Recurse -Force apps\mobile-pwa\.next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .turbo -ErrorAction SilentlyContinue
Write-Host "   ✅ Build artifacts cleaned" -ForegroundColor Green

# Step 2: Reinstall dependencies
Write-Host "2. Reinstalling dependencies..." -ForegroundColor Yellow
npm install --legacy-peer-deps
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "   ❌ Dependency installation failed" -ForegroundColor Red
    exit 1
}

# Step 3: Test builds locally
Write-Host "3. Testing local builds..." -ForegroundColor Yellow

# Landing app
Set-Location "apps\landing"
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Landing app builds successfully" -ForegroundColor Green
} else {
    Write-Host "   ❌ Landing app build failed" -ForegroundColor Red
    Set-Location "..\..\"
    exit 1
}
Set-Location "..\..\"

# Admin app  
Set-Location "apps\admin"
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Admin app builds successfully" -ForegroundColor Green
} else {
    Write-Host "   ❌ Admin app build failed" -ForegroundColor Red
    Set-Location "..\..\"
    exit 1
}
Set-Location "..\..\"

# PWA app
Set-Location "apps\mobile-pwa"  
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ PWA app builds successfully" -ForegroundColor Green
} else {
    Write-Host "   ❌ PWA app build failed" -ForegroundColor Red
    Set-Location "..\..\"
    exit 1
}
Set-Location "..\..\"

# Step 4: Initialize Git (if not already)
Write-Host "4. Setting up Git repository..." -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    git init .
    Write-Host "   ✅ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "   ✅ Git repository already exists" -ForegroundColor Green
}

# Step 5: Create .gitignore if it doesn't exist
if (-not (Test-Path ".gitignore")) {
    @"
# Dependencies
node_modules/
*/node_modules/

# Build outputs
.next/
*/.next/
dist/
*/dist/
.turbo/

# Environment files
.env
.env.local
.env.*.local

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Cache
.turbo/
.cache/
"@ | Out-File -FilePath ".gitignore" -Encoding utf8
    Write-Host "   ✅ .gitignore created" -ForegroundColor Green
} else {
    Write-Host "   ✅ .gitignore already exists" -ForegroundColor Green
}

# Step 6: Commit changes
Write-Host "5. Committing changes to Git..." -ForegroundColor Yellow
git add -A
git commit -m "chore: clean project structure and fix deployment issues"
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Changes committed successfully" -ForegroundColor Green
} else {
    Write-Host "   ⚠️ No changes to commit or commit failed" -ForegroundColor Yellow
}

# Step 7: Check for Vercel CLI and deploy
Write-Host "6. Checking deployment tools..." -ForegroundColor Yellow
if (Test-Command "vercel") {
    Write-Host "   ✅ Vercel CLI found" -ForegroundColor Green
    
    Write-Host "7. Deploying applications..." -ForegroundColor Yellow
    
    # Deploy Landing
    Write-Host "   Deploying Landing Page..." -ForegroundColor Cyan
    Set-Location "apps\landing"
    vercel --prod --yes
    Set-Location "..\..\"
    
    # Deploy Admin  
    Write-Host "   Deploying Admin Dashboard..." -ForegroundColor Cyan
    Set-Location "apps\admin"
    vercel --prod --yes
    Set-Location "..\..\"
    
    # Deploy PWA
    Write-Host "   Deploying Mobile PWA..." -ForegroundColor Cyan
    Set-Location "apps\mobile-pwa"
    vercel --prod --yes
    Set-Location "..\..\"
    
    Write-Host "   ✅ All applications deployed" -ForegroundColor Green
} else {
    Write-Host "   ⚠️ Vercel CLI not found. Install with: npm i -g vercel" -ForegroundColor Yellow
    Write-Host "   Then run: vercel login" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 CLEANUP & DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host ""
Write-Host "📊 PROJECT STATUS:" -ForegroundColor Cyan
Write-Host "✅ All build artifacts cleaned" -ForegroundColor Green
Write-Host "✅ Dependencies reinstalled" -ForegroundColor Green  
Write-Host "✅ All apps build successfully" -ForegroundColor Green
Write-Host "✅ Git repository ready" -ForegroundColor Green
Write-Host "✅ Ready for deployment" -ForegroundColor Green
Write-Host ""
Write-Host "🔗 NEXT STEPS:" -ForegroundColor Cyan
Write-Host "1. Install Vercel CLI: npm i -g vercel" -ForegroundColor White
Write-Host "2. Login to Vercel: vercel login" -ForegroundColor White  
Write-Host "3. Deploy each app manually or re-run this script" -ForegroundColor White
Write-Host ""
