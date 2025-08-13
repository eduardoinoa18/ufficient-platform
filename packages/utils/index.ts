// UFFICIENT Utility Functions - Fixed Export Conflicts
export * from './src/auth';
export * from './src/api';

// Analytics with unique naming to avoid conflicts
export type { TrackingEvent as AnalyticsEvent } from './src/analytics';
export { trackEvent as trackAnalyticsEvent } from './src/analytics';

// Logging utilities (separate namespace)
export {
    trackEvent as logEvent,
    EventTypes,
    trackUserAction,
    trackTaskAction,
    trackGamificationEvent
} from './src/logging';

export const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
};

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

export const formatDate = (date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

export const formatRelativeTime = (date: Date | string): string => {
    const now = new Date();
    const target = new Date(date);
    const diffMs = now.getTime() - target.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return formatDate(date);
};

export const slugify = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
};

export const generateId = (): string => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

export const cn = (
    ...classes: Array<string | number | bigint | null | undefined | false>
): string => {
    return classes.filter(Boolean).map(String).join(' ');
};

// UFFICIENT-specific utilities
export const calculateStreakDays = (lastCompletionDate: Date | string): number => {
    const last = new Date(lastCompletionDate);
    const today = new Date();
    const diffTime = today.getTime() - last.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
};

export const formatTaskPoints = (points: number): string => {
    if (points >= 1000) {
        return `${(points / 1000).toFixed(1)}k`;
    }
    return points.toString();
};

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const generateTaskId = (): string => {
    return `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};
