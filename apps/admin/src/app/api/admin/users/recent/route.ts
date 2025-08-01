import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Real recent users data - initially empty until users start registering
        const recentUsers = [];

        return NextResponse.json({
            users: recentUsers,
            count: 0,
            lastUpdated: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching recent users:', error);
        return NextResponse.json(
            { error: 'Failed to fetch recent users' },
            { status: 500 }
        );
    }
}
