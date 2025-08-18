import { NextResponse } from 'next/server';

export async function POST() {
    return NextResponse.json({ error: 'Legacy login disabled. Use /api/auth/session.' }, { status: 410 });
}
