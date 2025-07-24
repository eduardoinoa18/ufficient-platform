import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Mock user data for V1 - in production this would come from your database
        const users = [
            {
                id: 1,
                email: 'john.doe@example.com',
                name: 'John Doe',
                plan: 'Pro',
                tasksCompleted: 45,
                currentStreak: 7,
                joinDate: '2024-12-15',
                lastActive: '2025-01-22'
            },
            {
                id: 2,
                email: 'jane.smith@example.com',
                name: 'Jane Smith',
                plan: 'Free',
                tasksCompleted: 28,
                currentStreak: 3,
                joinDate: '2025-01-10',
                lastActive: '2025-01-22'
            },
            {
                id: 3,
                email: 'mike.johnson@example.com',
                name: 'Mike Johnson',
                plan: 'Pro',
                tasksCompleted: 62,
                currentStreak: 12,
                joinDate: '2024-11-28',
                lastActive: '2025-01-21'
            },
            {
                id: 4,
                email: 'sarah.wilson@example.com',
                name: 'Sarah Wilson',
                plan: 'Free',
                tasksCompleted: 15,
                currentStreak: 1,
                joinDate: '2025-01-18',
                lastActive: '2025-01-22'
            },
            {
                id: 5,
                email: 'david.brown@example.com',
                name: 'David Brown',
                plan: 'Pro',
                tasksCompleted: 89,
                currentStreak: 21,
                joinDate: '2024-10-05',
                lastActive: '2025-01-22'
            }
        ];

        // Filter by plan if specified (V1: return all users for now)
        // const { searchParams } = new URL(request.url);
        // const planFilter = searchParams.get('plan');

        const filteredUsers = users; // V1: No filtering for static generation

        return NextResponse.json({
            users: filteredUsers,
            total: filteredUsers.length,
            freePlan: users.filter(u => u.plan === 'Free').length,
            proPlan: users.filter(u => u.plan === 'Pro').length
        }, { status: 200 });

    } catch (error) {
        console.error('Users error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}
