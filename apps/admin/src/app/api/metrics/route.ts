import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Real data for V1 - initially zero until users start using the platform
        const metrics = {
            totalUsers: 0,
            activeUsers7d: 0,
            proUsers: 0,
            averageTasksPerUser: 0,
            streakLeaders: 0,
            monthlyRevenue: 0,
            taskCategories: [
                { name: 'Work', percentage: 0 },
                { name: 'Personal', percentage: 0 },
                { name: 'Fitness', percentage: 0 },
                { name: 'Side Hustle', percentage: 0 },
                { name: 'Social', percentage: 0 }
            ],
            recentActivity: [],
            lastUpdated: new Date().toISOString(),
            status: 'operational'
        };

        return NextResponse.json(metrics, { status: 200 });
    } catch (error) {
        console.error('Metrics error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch metrics' },
            { status: 500 }
        );
    }
}
