import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeFirebaseAdmin } from './lib/firebase-admin';

// Initialize Firebase Admin SDK
initializeFirebaseAdmin();

const PUBLIC_PATHS = [
    '/login',
    '/api/auth/login', // Keep demo login for now
    '/api/auth/session', // New session login
    '/_next',
    '/favicon.ico',
    '/assets',
    '/public'
];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Allow public paths
    if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
        return NextResponse.next();
    }

    // Check for the session cookie
    const sessionCookie = req.cookies.get('session')?.value;
    if (!sessionCookie) {
        return redirectToLogin(req);
    }

    // Verify the session cookie
    try {
        await getAuth().verifySessionCookie(sessionCookie, true);
        return NextResponse.next();
    } catch (error) {
        console.warn('Session cookie verification failed:', error);
        return redirectToLogin(req);
    }
}

function redirectToLogin(req: NextRequest) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    // Clear the invalid cookie if it exists
    url.searchParams.set('cleared', 'true');
    const res = NextResponse.redirect(url);
    res.cookies.delete('session');
    return res;
}

export const config = {
    // Match all paths except for static assets and API routes that don't need protection
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api/auth/login|api/auth/session).*)',
    ],
};
