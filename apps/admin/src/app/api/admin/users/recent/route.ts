import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Mock recent user registrations - in production this would come from your database
        const recentUsers = [
            {
                id: 1,
                email: 'newuser1@example.com',
                name: 'Alice Cooper',
                createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
                source: 'landing_page'
            },
            {
                id: 2,
                email: 'newuser2@example.com',
                name: 'Charlie Brown',
                createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
                source: 'referral'
            },
            {
                id: 3,
                email: 'newuser3@example.com',
                name: 'Diana Prince',
                createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
                source: 'direct'
            }
        ];

        return NextResponse.json({
            recentUsers,
            count: recentUsers.length,
            timeframe: '24h'
        });
    } catch (error) {
        console.error('Recent users fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch recent users' },
            { status: 500 }
        );
    }
}
