// ML-Ready Logging System
export interface TrackingEvent {
    event: string;
    userId?: string;
    sessionId?: string;
    properties?: Record<string, any>;
    timestamp: string;
    platform: 'web' | 'mobile' | 'admin';
    version?: string;
}

export interface UserBehavior {
    action: string;
    context: Record<string, any>;
    metadata?: Record<string, any>;
}

// Event Types for ML Analysis
export const EventTypes = {
    // User Lifecycle
    USER_REGISTERED: 'user_registered',
    USER_ONBOARDED: 'user_onboarded',
    USER_LOGIN: 'user_login',
    USER_LOGOUT: 'user_logout',

    // Task Management
    TASK_CREATED: 'task_created',
    TASK_COMPLETED: 'task_completed',
    TASK_DELETED: 'task_deleted',
    TASK_UPDATED: 'task_updated',

    // Gamification
    STREAK_STARTED: 'streak_started',
    STREAK_EXTENDED: 'streak_extended',
    STREAK_BROKEN: 'streak_broken',
    BADGE_EARNED: 'badge_earned',
    LEVEL_UP: 'level_up',

    // Engagement
    APP_OPENED: 'app_opened',
    APP_CLOSED: 'app_closed',
    SCREEN_VIEWED: 'screen_viewed',
    FEATURE_USED: 'feature_used',

    // Social
    PROFILE_SHARED: 'profile_shared',
    LEADERBOARD_VIEWED: 'leaderboard_viewed',

    // Performance
    APP_CRASHED: 'app_crashed',
    SLOW_PERFORMANCE: 'slow_performance',
    OFFLINE_USAGE: 'offline_usage',
} as const;

// Logging Function
export const trackEvent = async (event: string, properties?: Record<string, any>) => {
    try {
        const trackingData: TrackingEvent = {
            event,
            properties: properties || {},
            timestamp: new Date().toISOString(),
            platform: typeof window !== 'undefined' ? 'web' : 'mobile',
            sessionId: getSessionId(),
            userId: getUserId(),
            version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
        };

        // Send to tracking endpoint
        const response = await fetch('/api/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trackingData),
        });

        if (!response.ok) {
            console.warn('Failed to track event:', event);
        }

        // Also log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.log('📊 Event Tracked:', trackingData);
        }
    } catch (error) {
        console.error('Error tracking event:', error);
    }
};

// Specialized tracking functions
export const trackUserAction = (action: string, context?: Record<string, any>) => {
    trackEvent(EventTypes.FEATURE_USED, {
        action,
        context: context || {},
    });
};

export const trackTaskAction = (action: 'created' | 'completed' | 'deleted' | 'updated', taskData?: any) => {
    const eventMap = {
        created: EventTypes.TASK_CREATED,
        completed: EventTypes.TASK_COMPLETED,
        deleted: EventTypes.TASK_DELETED,
        updated: EventTypes.TASK_UPDATED,
    };

    trackEvent(eventMap[action], {
        taskId: taskData?.id,
        category: taskData?.category,
        difficulty: taskData?.difficulty,
        isAIGenerated: taskData?.isAIGenerated,
    });
};

export const trackGamificationEvent = (type: 'streak' | 'badge' | 'level', data?: any) => {
    switch (type) {
        case 'streak':
            trackEvent(data.broken ? EventTypes.STREAK_BROKEN : EventTypes.STREAK_EXTENDED, {
                streakLength: data.length,
                category: data.category,
            });
            break;
        case 'badge':
            trackEvent(EventTypes.BADGE_EARNED, {
                badgeId: data.badgeId,
                badgeName: data.name,
                rarity: data.rarity,
            });
            break;
        case 'level':
            trackEvent(EventTypes.LEVEL_UP, {
                newLevel: data.level,
                totalPoints: data.points,
            });
            break;
    }
};

export const trackScreenView = (screenName: string, additionalData?: Record<string, any>) => {
    trackEvent(EventTypes.SCREEN_VIEWED, {
        screenName,
        ...additionalData,
    });
};

// Performance tracking
export const trackPerformance = (metric: string, value: number, context?: Record<string, any>) => {
    trackEvent('performance_metric', {
        metric,
        value,
        context: context || {},
    });
};

// Helper functions
function getSessionId(): string {
    if (typeof window === 'undefined') return 'server-session';

    let sessionId = sessionStorage.getItem('ufficient_session_id');
    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('ufficient_session_id', sessionId);
    }
    return sessionId;
}

function getUserId(): string | undefined {
    if (typeof window === 'undefined') return undefined;

    // Try to get from localStorage first
    const token = localStorage.getItem('ufficient_token');
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.userId;
        } catch (error) {
            // Invalid token format
        }
    }

    // Fallback to anonymous user ID
    let anonId = localStorage.getItem('ufficient_anon_id');
    if (!anonId) {
        anonId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('ufficient_anon_id', anonId);
    }
    return anonId;
}

// Batch logging for better performance
class EventBatcher {
    private events: TrackingEvent[] = [];
    private batchTimeout: NodeJS.Timeout | null = null;
    private readonly BATCH_SIZE = 10;
    private readonly BATCH_TIMEOUT = 5000; // 5 seconds

    add(event: TrackingEvent) {
        this.events.push(event);

        if (this.events.length >= this.BATCH_SIZE) {
            this.flush();
        } else if (!this.batchTimeout) {
            this.batchTimeout = setTimeout(() => this.flush(), this.BATCH_TIMEOUT);
        }
    }

    private async flush() {
        if (this.events.length === 0) return;

        const eventsToSend = [...this.events];
        this.events = [];

        if (this.batchTimeout) {
            clearTimeout(this.batchTimeout);
            this.batchTimeout = null;
        }

        try {
            await fetch('/api/track/batch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ events: eventsToSend }),
            });
        } catch (error) {
            console.error('Failed to send event batch:', error);
            // Could implement retry logic here
        }
    }
}

export const eventBatcher = new EventBatcher();
