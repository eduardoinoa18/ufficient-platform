# UFFICIENT APP - Version 1 (MVP)

> **Unlock Your Most Efficient Self** 

A cross-platform productivity app that combines AI-powered task management with gamification and social features to help users achieve their goals efficiently.

## 🎯 Project Overview

UFFICIENT is a comprehensive productivity solution that includes:
- **Mobile App** (React Native/Expo) - Core task management with gamification
- **Web Landing Page** (Next.js) - Public marketing and signup
- **Admin Dashboard** (Next.js) - User and content management
- **Shared Packages** - Reusable components and logic

## 🚀 Features (Version 1 MVP)

### ✅ Core Features
- **Multi-step Onboarding** - Personalized questionnaire for user preferences
- **Task Management** - Manual and AI-generated tasks across 5 categories
- **Gamification** - Points, streaks, badges, and leaderboards
- **Social Feed** - Community activity sharing (view-only)
- **Admin Portal** - User management and analytics
- **Landing Page** - Marketing site with app store links

### 🎮 Gamification System
- **Points**: +10 per completed task, +25 for 7-day streaks
- **Categories**: Work, Personal, Fitness, Side Hustle, Social
- **Badges**: Starter, Productivity Pro, Efficiency Champion
- **Streaks**: Daily task completion tracking
- **Leaderboards**: Weekly and all-time rankings

## 🏗️ Project Structure

```
/apps
  /mobile/          # React Native app (Expo)
    /screens/       # Main app screens
    /app/          # Expo Router configuration
  /web/            # Next.js landing page
  /admin/          # Admin dashboard (Next.js)
/packages
  /ui/             # Shared UI components
  /core/           # Shared logic and types
/configs
  gamification.json # Gamification rules
  badges.json      # Badge definitions
/templates
  scheduler.txt    # AI task generation prompts
```

## 🛠️ Tech Stack

### Frontend
- **Mobile**: React Native with Expo
- **Web**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + NativeWind
- **Icons**: lucide-react
- **Fonts**: Montserrat, Poppins, Inter, Roboto

### Backend & Services
- **API**: Node.js/Express via AWS Lambda
- **Database**: MongoDB Atlas
- **Authentication**: AWS Cognito
- **AI**: OpenAI API for task generation
- **Storage**: AWS S3
- **Hosting**: AWS Amplify / Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- Expo CLI (for mobile development)

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd "Ufficient APP"
   npm install
   ```

2. **Install workspace dependencies**
   ```bash
   npm run install-all
   ```

3. **Start development servers**
   ```bash
   # Web landing page (port 3000)
   npm run dev:web
   
   # Admin dashboard (port 3001)
   npm run dev:admin
   
   # Mobile app
   npm run dev:mobile
   ```

### Development Commands

```bash
# Development
npm run dev              # Start web app
npm run dev:web         # Start web landing page
npm run dev:admin       # Start admin dashboard
npm run dev:mobile      # Start mobile app

# Building
npm run build           # Build all apps
npm run build:web       # Build web app
npm run build:admin     # Build admin dashboard
npm run build:mobile    # Build mobile app

# Utilities
npm run lint            # Lint all workspaces
npm run type-check      # Type check all workspaces
npm run clean           # Clean node_modules
```

## 📱 App Screens

### Mobile App
- **Onboarding** - Multi-step questionnaire
- **Dashboard** - Overview with stats and today's tasks
- **Tasks** - Task management with AI suggestions
- **Feed** - Community activity feed

### Admin Dashboard
- **Overview** - User metrics and system health
- **Users** - User management and analytics
- **Gamification** - Badge and point system controls
- **Support** - Feedback and ticket management

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#3B82F6 to #1E40AF)
- **Secondary**: Purple accent (#8B5CF6)
- **Success**: Green (#10B981)
- **Warning**: Orange (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Logo**: Montserrat Bold
- **Headings**: Poppins SemiBold/Bold
- **Body**: Inter Regular/Medium
- **Captions**: Roboto Regular

## 🔗 API Integration

The app integrates with:
- **OpenAI API** - Task generation based on user preferences
- **AWS Cognito** - User authentication and management
- **MongoDB Atlas** - Data storage and retrieval
- **AWS S3** - Asset and file storage

## 📊 Analytics & Metrics

### Key Metrics Tracked
- Daily/Weekly/Monthly active users
- Task completion rates by category
- Streak maintenance statistics
- Badge earning distribution
- User retention and engagement

## 🚀 Deployment

### Web Apps
- **Landing Page**: Vercel or AWS Amplify
- **Admin Dashboard**: AWS Amplify

### Mobile App
- **iOS**: TestFlight (beta) → App Store
- **Android**: Play Console (beta) → Google Play Store

## 📋 Roadmap

### Version 1 Timeline (7 weeks)
- **Sprint 1-2**: Project setup, onboarding, database schema
- **Sprint 3-4**: Task management, gamification, AI integration
- **Sprint 5-6**: Social feed, admin dashboard, landing page
- **Sprint 7**: Polish, testing, deployment

### Version 2+ Features
- Enhanced social features and networking
- Referral system and challenges
- Advanced AI recommendations
- Team collaboration features
- API for third-party integrations

## 🤝 Contributing

1. Follow the established code standards in `.github/copilot-instructions.md`
2. Use TypeScript for all new code
3. Implement proper error handling and loading states
4. Test across mobile and web platforms
5. Update documentation for new features

## 📄 License

This project is licensed under the MIT License.

---

**UFFICIENT** - Unlock Your Most Efficient Self 🚀
