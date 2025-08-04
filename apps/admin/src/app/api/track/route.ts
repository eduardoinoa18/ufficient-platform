import { NextRequest, NextResponse } from 'next/server';

interface TrackingEvent {
    userId: string;
    event: string;
    timestamp: string;
    device: 'PWA' | 'Native' | 'Web';
    metadata: Record<string, any>;
}

export async function POST(request: NextRequest) {
    try {
        const event: TrackingEvent = await request.json();

        // Validate required fields
        if (!event.userId || !event.event || !event.timestamp) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Log analytics event (shared across all apps)
        console.log('📊 UFFICIENT Analytics Event (Admin):', {
            ...event,
            receivedAt: new Date().toISOString()
        });

        // TODO: Save to centralized database
        // This endpoint will be the same across all apps

        return NextResponse.json(
            { success: true, message: 'Event tracked successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Analytics tracking error:', error);
        return NextResponse.json(
            { error: 'Failed to track event' },
            { status: 500 }
        );
    }
}
