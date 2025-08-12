import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { token } = body;

        // In production, verify JWT token here
        if (!token) {
            return NextResponse.json(
                { valid: false, error: 'No token provided' },
                { status: 401 }
            );
        }

        // Mock verification - in production use jwt.verify()
        const isValid = token && token.length > 10;

        if (isValid) {
            return NextResponse.json({
                valid: true,
                user: { id: 1, email: 'admin@ufficient.com', role: 'admin' }
            });
        } else {
            return NextResponse.json(
                { valid: false, error: 'Invalid token' },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error('Token verification error:', error);
        return NextResponse.json(
            { valid: false, error: 'Verification failed' },
            { status: 500 }
        );
    }
}
