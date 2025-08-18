import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = [
    '/login',
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

    // Only check for existence of session cookie here (no verification in Edge)
    const hasSession = Boolean(req.cookies.get('session')?.value);
    if (!hasSession) {
        return redirectToLogin(req);
    }

    return NextResponse.next();
}

function redirectToLogin(req: NextRequest) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    const res = NextResponse.redirect(url);
    res.cookies.delete('session');
    return res;
}

export const config = {
    // Exclude all API routes from middleware; protect only pages/assets
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api/).*)',
    ],
};
