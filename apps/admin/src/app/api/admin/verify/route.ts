import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../../lib/auth';

export async function GET(request: NextRequest) {
    try {
        // Check authentication
        const authToken = request.cookies.get('auth-token')?.value;

        if (!authToken) {
            return NextResponse.json(
                { error: 'Unauthorized', authenticated: false },
                { status: 401 }
            );
        }

        // Verify token
        try {
            const decoded = verifyToken(authToken);
            return NextResponse.json(
                {
                    authenticated: true,
                    user: {
                        email: decoded.email,
                        role: decoded.role
                    }
                },
                { status: 200 }
            );
        } catch (error) {
            return NextResponse.json(
                { error: 'Invalid token', authenticated: false },
                { status: 401 }
            );
        }

    } catch (error) {
        console.error('Verify token error:', error);
        return NextResponse.json(
            { error: 'Internal server error', authenticated: false },
            { status: 500 }
        );
    }
}