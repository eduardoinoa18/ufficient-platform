import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeFirebaseAdmin } from '@/lib/firebase-admin';

initializeFirebaseAdmin();

// Exchanges a Firebase ID token for a session cookie.
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const idToken = body.idToken?.toString();

        if (!idToken) {
            return NextResponse.json({ error: 'ID token is required' }, { status: 400 });
        }

        // Set session expiration to 5 days.
        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn });

        const options = {
            name: 'session',
            value: sessionCookie,
            maxAge: expiresIn,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        };

        const response = NextResponse.json({ status: 'success' }, { status: 200 });
        response.cookies.set(options);

        return response;
    } catch (error) {
        console.error('Session login error:', error);
        return NextResponse.json({ error: 'Failed to create session' }, { status: 401 });
    }
}
