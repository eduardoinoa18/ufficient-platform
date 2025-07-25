#!/bin/bash

# UFFICIENT V1 - Automated Deployment Script
# This script deploys the entire platform to production

set -e  # Exit on any error

echo "🚀 UFFICIENT V1 - AUTOMATED DEPLOYMENT STARTING..."
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
print_status "Checking prerequisites..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

print_success "Prerequisites check passed!"

# Build all applications
print_status "Building all applications..."

# Install dependencies
print_status "Installing dependencies..."
npm install

# Build web app
print_status "Building web app..."
cd apps/web
npm run build
print_success "Web app built successfully!"
cd ../..

# Build admin app
print_status "Building admin app..."
cd apps/admin
npm run build
print_success "Admin app built successfully!"
cd ../..

print_success "All builds completed successfully!"

# Deploy to Vercel
print_status "Deploying to Vercel..."

# Deploy web app
print_status "Deploying web app..."
cd apps/web
vercel --prod --yes
WEB_URL=$(vercel --scope team-slug --prod --yes 2>/dev/null | grep -o 'https://[^[:space:]]*' | tail -1)
print_success "Web app deployed! URL: $WEB_URL"
cd ../..

# Deploy admin app
print_status "Deploying admin app..."
cd apps/admin
vercel --prod --yes
ADMIN_URL=$(vercel --scope team-slug --prod --yes 2>/dev/null | grep -o 'https://[^[:space:]]*' | tail -1)
print_success "Admin app deployed! URL: $ADMIN_URL"
cd ../..

# Summary
echo ""
echo "🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!"
echo "====================================="
echo ""
echo "📱 Your UFFICIENT V1 Platform is now live:"
echo ""
echo "🌐 Landing Page:  $WEB_URL"
echo "🔐 Admin Portal:  $ADMIN_URL"
echo ""
echo "📋 Next Steps:"
echo "1. Configure environment variables in Vercel dashboard"
echo "2. Set up Firebase project and add credentials"
echo "3. Test all functionality"
echo "4. Deploy mobile app to app stores"
echo ""
echo "📖 See DEPLOYMENT_GUIDE_V1.md for detailed instructions"
echo ""
print_success "UFFICIENT V1 DEPLOYMENT COMPLETE! 🚀"
