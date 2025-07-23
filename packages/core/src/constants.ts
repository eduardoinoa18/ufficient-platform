import { TaskCategory, TaskCategory as TC } from './types';

// Task Categories
export const TASK_CATEGORIES: TaskCategory[] = [
  'Work',
  'Personal', 
  'Fitness',
  'Side Hustle',
  'Social'
];

// Points System
export const POINTS = {
  TASK_COMPLETION: 10,
  STREAK_7_DAYS: 25,
  STREAK_30_DAYS: 100,
  STREAK_100_DAYS: 500,
  CATEGORY_MULTIPLIERS: {
    'Work': 1.0,
    'Personal': 0.8,
    'Fitness': 1.2,
    'Side Hustle': 1.5,
    'Social': 0.8
  } as Record<TaskCategory, number>
};

// Gamification Constants
export const GAMIFICATION = {
  MIN_TASKS_FOR_STREAK: 1,
  MAX_STREAK_DAYS: 365,
  LEVELS: {
    BEGINNER: { min: 0, max: 100 },
    INTERMEDIATE: { min: 101, max: 500 },
    ADVANCED: { min: 501, max: 1500 },
    EXPERT: { min: 1501, max: 5000 },
    MASTER: { min: 5001, max: Infinity }
  }
};

// Badge IDs (matching configs/badges.json)
export const BADGE_IDS = {
  STARTER: 'starter',
  PRODUCTIVITY_PRO: 'productivity-pro',
  EFFICIENCY_CHAMPION: 'efficiency-champion',
  WEEK_WARRIOR: 'week-warrior',
  CATEGORY_MASTER: 'category-master'
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  USERS: '/api/users',
  TASKS: '/api/tasks',
  BADGES: '/api/badges',
  FEED: '/api/feed',
  ONBOARDING: '/api/onboarding',
  AI_TASKS: '/api/ai/tasks',
  LEADERBOARD: '/api/leaderboard'
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized access',
  VALIDATION_FAILED: 'Validation failed',
  USER_NOT_FOUND: 'User not found',
  TASK_NOT_FOUND: 'Task not found',
  BADGE_NOT_FOUND: 'Badge not found',
  ONBOARDING_INCOMPLETE: 'Onboarding not completed',
  AI_SERVICE_UNAVAILABLE: 'AI service temporarily unavailable'
} as const;
