import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Demo defaults; override with env in production
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@ufficient.com';
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

        const valid = email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
        if (!valid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
        const payload = { email, role: 'admin', name: 'UFFICIENT Admin' };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

        const res = NextResponse.json({ success: true, user: payload }, { status: 200 });
        res.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24,
        });
        return res;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
