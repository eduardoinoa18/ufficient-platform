import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Basic validation
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // For V1, use simple admin credentials
        // In production, this should connect to your authentication system
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@ufficient.app';
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            return NextResponse.json({
                success: true,
                user: {
                    email: email,
                    role: 'admin',
                    name: 'UFFICIENT Admin'
                },
                token: 'admin-token-v1' // In production, use proper JWT
            });
        } else {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
