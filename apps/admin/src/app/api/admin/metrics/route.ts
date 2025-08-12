import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Mock metrics data - in production this would come from your database
        const metrics = {
            totalUsers: 1234,
            activeUsers: 567,
            totalSessions: 8901,
            avgSessionTime: '4m 32s',
            conversionRate: '2.3%',
            userGrowth: 15.2,
            sessionGrowth: 8.7,
            recentRegistrations: [
                { id: 1, email: 'user1@example.com', createdAt: new Date().toISOString() },
                { id: 2, email: 'user2@example.com', createdAt: new Date().toISOString() },
            ]
        };

        return NextResponse.json(metrics);
    } catch (error) {
        console.error('Metrics fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch metrics' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Log custom metric
        console.log('Custom metric received:', body);

        return NextResponse.json(
            { success: true, message: 'Metric logged' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Metric logging error:', error);
        return NextResponse.json(
            { error: 'Failed to log metric' },
            { status: 500 }
        );
    }
}
