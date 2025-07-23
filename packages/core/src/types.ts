// User types
export interface User {
  id: string;
  email: string;
  name: string;
  profileComplete: boolean;
  createdAt: Date;
  lastActiveAt: Date;
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  workLifeBalance: 'work-focused' | 'balanced' | 'life-focused';
  taskCategories: TaskCategory[];
  professionalGoals: string[];
  personalGoals: string[];
  gamificationStyle: 'competitive' | 'collaborative' | 'personal';
  notifications: NotificationSettings;
}

export interface UserStats {
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  tasksCompleted: number;
  badgesEarned: Badge[];
  level: number;
}

export interface NotificationSettings {
  dailyReminders: boolean;
  weeklyReports: boolean;
  badgeNotifications: boolean;
  socialUpdates: boolean;
}

// Task types
export type TaskCategory = 'Work' | 'Personal' | 'Fitness' | 'Side Hustle' | 'Social';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  category: TaskCategory;
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  estimatedTime?: string;
  difficulty: 'easy' | 'medium' | 'challenging';
  priority: 'low' | 'medium' | 'high';
  points: number;
  aiGenerated: boolean;
}

// Gamification types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirements: BadgeRequirement;
  points: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
}

export interface BadgeRequirement {
  type: 'taskCount' | 'streak' | 'consecutiveDays' | 'categoryDiversity' | 'socialEngagement';
  value: number;
  category?: TaskCategory;
}

export interface Streak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: Date;
  startDate: Date;
}

// Social types
export interface FeedItem {
  id: string;
  userId: string;
  type: 'badge' | 'streak' | 'milestone' | 'task';
  content: string;
  metadata: Record<string, any>;
  createdAt: Date;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Onboarding types
export interface OnboardingData {
  basicInfo: {
    name: string;
    email: string;
    location?: string;
  };
  preferences: {
    workLifeBalance: UserPreferences['workLifeBalance'];
    taskCategories: TaskCategory[];
  };
  goals: {
    professional: string[];
    personal: string[];
  };
  gamification: {
    style: UserPreferences['gamificationStyle'];
    notifications: NotificationSettings;
  };
}
