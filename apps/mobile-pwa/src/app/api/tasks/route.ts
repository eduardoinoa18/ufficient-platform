import { NextRequest, NextResponse } from 'next/server';

const ADMIN_API_URL = process.env.ADMIN_API_URL || 'http://localhost:3001';

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const target = `${ADMIN_API_URL}/api/tasks${userId ? `?userId=${encodeURIComponent(userId)}` : ''}`;
    const res = await fetch(target, { headers: { 'Content-Type': 'application/json' }, cache: 'no-store' });
    return new Response(res.body, { status: res.status, headers: res.headers });
}

export async function POST(request: NextRequest) {
    const body = await request.text();
    const res = await fetch(`${ADMIN_API_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
    });
    return new Response(res.body, { status: res.status, headers: res.headers });
}
