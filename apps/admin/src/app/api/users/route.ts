import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Real user data for V1 - initially empty until users start registering
        // This will be populated as users sign up for UFFICIENT
        const users = [];

        const response = {
            users,
            total: 0,
            active: 0,
            pro: 0,
            free: 0,
            lastUpdated: new Date().toISOString()
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}
