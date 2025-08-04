// ML Data Tracking Foundation for UFFICIENT V1
// Unified tracking across PWA + Native App

export interface TrackingEvent {
    userId: string;
    event: string;
    timestamp: string;
    device: 'PWA' | 'Native' | 'Web';
    metadata: Record<string, any>;
}

export interface TaskEvent extends TrackingEvent {
    event: 'task_completed' | 'task_created' | 'task_deleted';
    metadata: {
        category: 'Work' | 'Personal' | 'Fitness' | 'Side Hustle' | 'Social';
        pointsEarned: number;
        streakMaintained: boolean;
        completionTime?: number; // seconds
    };
}

export interface StreakEvent extends TrackingEvent {
    event: 'streak_gained' | 'streak_lost' | 'streak_milestone';
    metadata: {
        currentStreak: number;
        category?: string;
        milestoneReached?: number;
    };
}

export interface BadgeEvent extends TrackingEvent {
    event: 'badge_earned';
    metadata: {
        badgeId: string;
        badgeName: string;
        pointsAwarded: number;
    };
}

export interface NavigationEvent extends TrackingEvent {
    event: 'page_view' | 'feature_used';
    metadata: {
        page: string;
        timeSpent?: number;
        source?: string;
    };
}

export interface ReferralEvent extends TrackingEvent {
    event: 'referral_sent' | 'referral_converted';
    metadata: {
        referralCode: string;
        platform?: string;
    };
}

// Analytics helper functions
export const trackEvent = async (event: TrackingEvent) => {
    try {
        // Send to Firebase/Supabase
        await fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        });
    } catch (error) {
        console.warn('Analytics tracking failed:', error);
    }
};

export const trackTaskCompletion = (
    userId: string,
    category: string,
    pointsEarned: number,
    streakMaintained: boolean,
    device: 'PWA' | 'Native' | 'Web'
) => {
    trackEvent({
        userId,
        event: 'task_completed',
        timestamp: new Date().toISOString(),
        device,
        metadata: {
            category,
            pointsEarned,
            streakMaintained
        }
    });
};

export const trackBadgeEarned = (
    userId: string,
    badgeId: string,
    badgeName: string,
    pointsAwarded: number,
    device: 'PWA' | 'Native' | 'Web'
) => {
    trackEvent({
        userId,
        event: 'badge_earned',
        timestamp: new Date().toISOString(),
        device,
        metadata: {
            badgeId,
            badgeName,
            pointsAwarded
        }
    });
};

export const trackPageView = (
    userId: string,
    page: string,
    device: 'PWA' | 'Native' | 'Web',
    source?: string
) => {
    trackEvent({
        userId,
        event: 'page_view',
        timestamp: new Date().toISOString(),
        device,
        metadata: {
            page,
            source
        }
    });
};
