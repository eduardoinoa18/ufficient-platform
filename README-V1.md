# 🚀 UFFICIENT V1 - Complete Platform Deployment

> **UFFICIENT** - Unlock Your Most Efficient Self  
> Complete Turborepo monorepo with Landing Page, Admin Portal, Mobile PWA, and Native App development track.

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [🏗️ Architecture](#️-architecture)
- [📱 Applications](#-applications)
- [📦 Shared Packages](#-shared-packages)
- [🚀 Quick Start](#-quick-start)
- [📖 Development Guide](#-development-guide)
- [🔧 Configuration](#-configuration)
- [🌐 Deployment](#-deployment)
- [📝 API Documentation](#-api-documentation)

## 🎯 Project Overview

UFFICIENT V1 is a comprehensive productivity platform built with a modern Turborepo monorepo architecture. The platform includes:

- **Landing Page** - Public-facing marketing site with user acquisition focus
- **Admin Portal** - Administrative dashboard for metrics, user management, and content control
- **Mobile PWA** - Progressive Web App for mobile functionality testing
- **Native App** - React Native app for future App Store deployment

## 🏗️ Architecture

```
ufficient-app/
├── apps/
│   ├── landing/          # Next.js Landing Page (Port 3000)
│   ├── admin/            # Next.js Admin Dashboard (Port 3001)
│   ├── mobile-pwa/       # Next.js PWA (Port 3002)
│   └── mobile-native/    # React Native App (Port 19000)
├── packages/
│   ├── core/             # Shared types, constants, utilities
│   ├── ui/               # Shared UI components
│   ├── config/           # Shared configurations
│   └── utils/            # Shared utility functions
├── configs/              # Global configurations
└── templates/            # Code templates
```

## 📱 Applications

### 🌐 Landing Page (`apps/landing`)
- **Purpose**: Public-facing marketing site
- **Port**: 3000
- **Tech Stack**: Next.js 15, React 18, Tailwind CSS
- **Features**: Hero section, feature grid, contact forms, UFFICIENT branding

### ⚡ Admin Portal (`apps/admin`)
- **Purpose**: Administrative dashboard
- **Port**: 3001
- **Tech Stack**: Next.js 14, React 18, Tailwind CSS
- **Features**: User management, metrics dashboard, authentication

### 📱 Mobile PWA (`apps/mobile-pwa`)
- **Purpose**: Progressive Web App for mobile testing
- **Port**: 3002
- **Tech Stack**: Next.js 15, React 18, PWA capabilities
- **Features**: Task management, streak tracking, installable PWA

### 🚀 Native App (`apps/mobile-native`)
- **Purpose**: React Native app for App Store deployment
- **Port**: 19000 (Expo Dev Server)
- **Tech Stack**: React Native, Expo, TypeScript
- **Features**: Native iOS/Android functionality, shared codebase

## 📦 Shared Packages

### `@ufficient/core`
- **Purpose**: Shared types, constants, and utilities
- **Exports**: Types, API endpoints, colors, fonts, gamification constants
- **Usage**: Import across all apps for consistency

### `@ufficient/ui`
- **Purpose**: Shared UI components
- **Components**: Button, Input, Card, Container, TaskCard, ProgressCard, BadgeCard
- **Styling**: Tailwind CSS with UFFICIENT theme

### `@ufficient/config`
- **Purpose**: Shared theme and configuration
- **Contents**: Tailwind config, theme system, font configurations

### `@ufficient/utils`
- **Purpose**: Shared utility functions
- **Contents**: Formatting helpers, date utilities, API helpers

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+
- Git

### Installation & Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd ufficient-app
   npm run install-all
   ```

2. **Start Development Servers**
   ```bash
   # Start all apps in development mode
   npm run dev

   # Or start individual apps
   npm run dev:landing     # Port 3000
   npm run dev:admin       # Port 3001
   npm run dev:mobile-pwa  # Port 3002
   npm run dev:mobile-native # Port 19000
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📖 Development Guide

### Available Scripts

#### Root Level Scripts
```bash
npm run dev                 # Start all apps in dev mode
npm run build              # Build all apps
npm run lint               # Lint all packages
npm run type-check         # Type check all packages
npm run test               # Run tests across packages
npm run clean              # Clean all node_modules and build artifacts
npm run format             # Format code with Prettier
```

#### App-Specific Scripts
```bash
npm run dev:landing        # Landing page development
npm run dev:admin          # Admin dashboard development
npm run dev:mobile-pwa     # Mobile PWA development
npm run dev:mobile-native  # React Native development

npm run build:landing      # Build landing page
npm run build:admin        # Build admin dashboard
npm run build:mobile-pwa   # Build mobile PWA
npm run build:mobile-native # Build React Native app
```

### VS Code Tasks
The workspace includes pre-configured VS Code tasks:
- **Dev: Start UFFICIENT Web App** - Launch landing page
- **Dev: Start Admin Dashboard** - Launch admin portal
- **Dev: Start Mobile App** - Launch mobile PWA
- **Build: All Apps** - Build all applications
- **Install: All Dependencies** - Install dependencies

## 🔧 Configuration

### Environment Variables
Create `.env.local` files in each app directory:

#### Landing Page (`apps/landing/.env.local`)
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ADMIN_URL=http://localhost:3001
FIREBASE_ADMIN_PROJECT_ID=your-project-id
```

#### Admin Portal (`apps/admin/.env.local`)
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3001
JWT_SECRET=your-jwt-secret
ADMIN_EMAIL=admin@ufficient.com
ADMIN_PASSWORD=your-admin-password
```

#### Mobile PWA (`apps/mobile-pwa/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SITE_URL=http://localhost:3002
```

### Tailwind Configuration
All apps use the shared Tailwind configuration with UFFICIENT branding:
- Primary: `#6C00FF` (Purple)
- Secondary: `#4CD7F8` (Cyan)
- Accent: `#29006E` (Dark Purple)

## 🌐 Deployment

### Vercel Deployment (Recommended)

#### Landing Page
```bash
cd apps/landing
vercel --prod
```

#### Admin Portal
```bash
cd apps/admin
vercel --prod
```

#### Mobile PWA
```bash
cd apps/mobile-pwa
vercel --prod
```

### Native App Deployment

#### Prerequisites
```bash
npm install -g @expo/cli eas-cli
```

#### Build & Deploy
```bash
cd apps/mobile-native

# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to app stores
eas submit --platform ios
eas submit --platform android
```

## 📝 API Documentation

### Admin API Endpoints
- `GET /api/admin/metrics` - Dashboard metrics
- `GET /api/admin/users` - User management
- `POST /api/admin/login` - Admin authentication

### User API Endpoints
- `GET /api/users` - User data
- `GET /api/tasks` - Task management
- `GET /api/badges` - Achievement system
- `POST /api/contact` - Contact form

### Shared Types
All API types are defined in `@ufficient/core/types` for consistency across apps.

## 🎨 Branding

### UFFICIENT Color Palette
- **Primary Purple**: `#6C00FF`
- **Secondary Cyan**: `#4CD7F8`
- **Dark Purple**: `#29006E`
- **Light Purple**: `#f0f3ff`

### Typography
- **Primary**: Montserrat (Headings)
- **Secondary**: Poppins (Subheadings)
- **Body**: Inter (Body text)
- **Mono**: Roboto Mono (Code)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**UFFICIENT V1** - Built with ❤️ using Turborepo, Next.js, React Native, and modern web technologies.
