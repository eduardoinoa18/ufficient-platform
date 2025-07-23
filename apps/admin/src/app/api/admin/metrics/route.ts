import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Mock data for V1 - in production this would come from your database
        const metrics = {
            totalUsers: 1250,
            activeUsers7d: 345,
            proUsers: 120,
            averageTasksPerUser: 8.2,
            streakLeaders: 15,
            monthlyRevenue: 2400,
            taskCategories: [
                { name: 'Work', percentage: 42 },
                { name: 'Personal', percentage: 28 },
                { name: 'Fitness', percentage: 18 },
                { name: 'Side Hustle', percentage: 8 },
                { name: 'Social', percentage: 4 }
            ],
            recentActivity: [
                { user: 'John Doe', action: 'Completed 5 tasks', timestamp: new Date().toISOString() },
                { user: 'Jane Smith', action: '7-day streak achieved', timestamp: new Date().toISOString() },
                { user: 'Mike Johnson', action: 'Upgraded to Pro', timestamp: new Date().toISOString() }
            ]
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
