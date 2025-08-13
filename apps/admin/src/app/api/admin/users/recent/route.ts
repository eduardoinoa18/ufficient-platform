import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json(
        { error: 'Deprecated. Use /api/users with query params.' },
        { status: 410 }
    );
}
