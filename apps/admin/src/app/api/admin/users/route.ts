import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Mock user data - in production this would come from your database
        const users = [
            {
                id: 1,
                email: 'user1@example.com',
                name: 'John Doe',
                createdAt: '2024-01-15T10:30:00Z',
                lastActive: '2024-01-20T14:22:00Z',
                status: 'active'
            },
            {
                id: 2,
                email: 'user2@example.com',
                name: 'Jane Smith',
                createdAt: '2024-01-16T09:15:00Z',
                lastActive: '2024-01-19T16:45:00Z',
                status: 'active'
            },
            {
                id: 3,
                email: 'user3@example.com',
                name: 'Bob Johnson',
                createdAt: '2024-01-17T13:20:00Z',
                lastActive: '2024-01-18T11:30:00Z',
                status: 'inactive'
            }
        ];

        return NextResponse.json({ users, total: users.length });
    } catch (error) {
        console.error('Users fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Mock user creation
        const newUser = {
            id: Date.now(),
            ...body,
            createdAt: new Date().toISOString(),
            status: 'active'
        };

        return NextResponse.json(
            { success: true, user: newUser },
            { status: 201 }
        );
    } catch (error) {
        console.error('User creation error:', error);
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}
