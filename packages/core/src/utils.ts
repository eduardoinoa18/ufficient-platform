import { TaskCategory, Badge, Task, UserStats } from './types';
import { POINTS, GAMIFICATION } from './constants';

// Points calculation utilities
export const calculateTaskPoints = (
  category: TaskCategory,
  difficulty: 'easy' | 'medium' | 'challenging'
): number => {
  let basePoints = POINTS.TASK_COMPLETION;
  const categoryMultiplier = POINTS.CATEGORY_MULTIPLIERS[category];
  
  const difficultyMultiplier = {
    easy: 1.0,
    medium: 1.2,
    challenging: 1.5
  }[difficulty];
  
  return Math.round(basePoints * categoryMultiplier * difficultyMultiplier);
};

export const calculateStreakBonus = (streakDays: number): number => {
  if (streakDays >= 100) return POINTS.STREAK_100_DAYS;
  if (streakDays >= 30) return POINTS.STREAK_30_DAYS;
  if (streakDays >= 7) return POINTS.STREAK_7_DAYS;
  return 0;
};

export const calculateUserLevel = (totalPoints: number): number => {
  const levels = GAMIFICATION.LEVELS;
  
  if (totalPoints >= levels.MASTER.min) return 5;
  if (totalPoints >= levels.EXPERT.min) return 4;
  if (totalPoints >= levels.ADVANCED.min) return 3;
  if (totalPoints >= levels.INTERMEDIATE.min) return 2;
  return 1;
};

// Date utilities
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const isYesterday = (date: Date): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
};

export const daysBetween = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Badge checking utilities
export const checkBadgeEligibility = (
  badge: Badge,
  userStats: UserStats,
  recentTasks: Task[]
): boolean => {
  const { requirements } = badge;
  
  switch (requirements.type) {
    case 'taskCount':
      return userStats.tasksCompleted >= requirements.value;
      
    case 'streak':
      return userStats.currentStreak >= requirements.value;
      
    case 'consecutiveDays':
      return userStats.longestStreak >= requirements.value;
      
    case 'categoryDiversity':
      const categories = new Set(recentTasks.map(task => task.category));
      return categories.size >= requirements.value;
      
    default:
      return false;
  }
};

// Task utilities
export const groupTasksByCategory = (tasks: Task[]): Record<TaskCategory, Task[]> => {
  return tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<TaskCategory, Task[]>);
};

export const getTasksForToday = (tasks: Task[]): Task[] => {
  return tasks.filter(task => isToday(task.createdAt));
};

export const getCompletedTasksForDate = (tasks: Task[], date: Date): Task[] => {
  return tasks.filter(task => 
    task.completed && 
    task.completedAt && 
    isToday(task.completedAt)
  );
};

// String utilities
export const formatPoints = (points: number): string => {
  if (points >= 1000000) {
    return `${(points / 1000000).toFixed(1)}M`;
  }
  if (points >= 1000) {
    return `${(points / 1000).toFixed(1)}K`;
  }
  return points.toString();
};

export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffSeconds < 60) return 'just now';
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`;
  if (diffSeconds < 2592000) return `${Math.floor(diffSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateTaskTitle = (title: string): boolean => {
  return title.trim().length >= 3 && title.trim().length <= 100;
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};
