<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# UFFICIENT APP - Copilot Instructions

## Project Overview
This is a cross-platform productivity app called UFFICIENT with the tagline "Unlock Your Most Efficient Self." The project is a monorepo containing:

- **Mobile App** (React Native/Expo) - Task management with gamification
- **Web Landing Page** (Next.js) - Public marketing site
- **Admin Dashboard** (Next.js) - User and content management
- **Shared Packages** - UI components and core logic

## Architecture Guidelines

### Tech Stack
- **Frontend**: React Native (Expo), Next.js, TypeScript
- **Styling**: Tailwind CSS, NativeWind for React Native
- **Icons**: lucide-react
- **Fonts**: Montserrat (logo), Poppins (headings), Inter (body), Roboto (captions)
- **Backend**: Node.js/Express via AWS Lambda
- **Database**: MongoDB Atlas
- **Authentication**: AWS Cognito
- **AI**: OpenAI API for task generation
- **Storage**: AWS S3

### Code Standards
1. Use TypeScript for all new code
2. Follow consistent naming conventions (camelCase for variables, PascalCase for components)
3. Use Tailwind classes for styling, NativeWind for React Native
4. Implement proper error handling and loading states
5. Write descriptive comments for complex logic
6. Use shared types from @ufficient/core package

### Component Structure
- Keep components small and focused on single responsibility
- Use proper prop types with TypeScript interfaces
- Implement proper accessibility features
- Follow React best practices for hooks and state management

### Gamification Features
The app includes:
- **Tasks**: 5 categories (Work, Personal, Fitness, Side Hustle, Social)
- **Points**: +10 per task, bonus for streaks
- **Streaks**: Daily completion tracking
- **Badges**: Achievement system (see configs/badges.json)
- **Leaderboards**: Weekly and all-time rankings
- **Social Feed**: Community activity sharing

### AI Task Generation
- Use templates/scheduler.txt for OpenAI prompts
- Generate personalized tasks based on user onboarding data
- Respect user privacy and preferences

### File Organization
```
/apps
  /mobile - React Native app with screens/
  /web - Next.js landing page
  /admin - Admin dashboard
/packages
  /ui - Shared components
  /core - Shared logic, types, hooks
/configs - JSON configuration files
/templates - AI prompt templates
```

### Development Workflow
1. Work within the appropriate workspace (mobile/web/admin)
2. Update shared packages when creating reusable components
3. Test across all platforms when making core changes
4. Follow the sprint timeline and feature priorities

## Feature Priorities (Version 1 MVP)
1. User onboarding questionnaire
2. Task management (manual + AI-generated)
3. Basic gamification (streaks, points, badges)
4. Simple social feed
5. Admin dashboard
6. Landing page

When implementing features, prioritize core functionality over advanced features. Focus on a polished MVP experience.
