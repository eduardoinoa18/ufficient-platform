import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    return NextResponse.redirect(new URL('/api/metrics', 'http://localhost:3001'));
}

export async function POST(request: NextRequest) {
    return NextResponse.redirect(new URL('/api/metrics', 'http://localhost:3001'));
}

export async function deprecatedGET() {
    return NextResponse.json({ error: 'Deprecated. Use /api/metrics' }, { status: 410 });
}
