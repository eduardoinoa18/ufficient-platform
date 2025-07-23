import { NextRequest, NextResponse } from 'next/server';
import { signToken, rateLimit, logAuthAttempt } from '../../../../lib/auth';

const rateLimiter = rateLimit();

export async function POST(request: NextRequest) {
    const ip = request.ip || 'unknown';

    // Rate limiting
    if (!rateLimiter(ip)) {
        return NextResponse.json(
            { error: 'Too many login attempts. Please try again later.' },
            { status: 429 }
        );
    }

    try {
        const { email, password } = await request.json();

        // Basic validation
        if (!email || !password) {
            logAuthAttempt(ip, email || 'unknown', false);
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // For V1, using hardcoded admin credentials
        // In production, this would check against a database
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@ufficient.com';
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

        if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
            logAuthAttempt(ip, email, false);
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = signToken({
            email,
            role: 'admin',
            iat: Date.now()
        });

        logAuthAttempt(ip, email, true);

        const response = NextResponse.json(
            {
                message: 'Login successful',
                user: { email, role: 'admin' }
            },
            { status: 200 }
        );

        // Set HTTP-only cookie
        response.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400 // 24 hours
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        logAuthAttempt(ip, 'unknown', false);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
