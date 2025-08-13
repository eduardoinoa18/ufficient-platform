import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_PATHS = [
    '/login',
    '/api/auth/login',
    '/api/auth/session',
    '/_next',
    '/favicon.ico',
    '/assets',
    '/public'
];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) return NextResponse.next();

    const token = req.cookies.get('auth-token')?.value;
    if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    try {
        const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-change-me');
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.next();
    } catch {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
