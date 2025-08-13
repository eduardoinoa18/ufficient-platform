import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../lib/firebase-admin';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = Number(searchParams.get('page') || 1);
        const limit = Number(searchParams.get('limit') || 20);

        if (!adminDb) {
            console.warn('[Admin Users] Firebase Admin not configured, returning empty list');
            return NextResponse.json({ items: [], total: 0, page, limit, hasNext: false });
        }

        const snap = await adminDb.collection('users').orderBy('createdAt', 'desc').limit(limit).get();
        const items = snap.docs.map((d: any) => ({ id: d.id, ...d.data() }));

        return NextResponse.json({ items, total: items.length, page, limit, hasNext: items.length === limit });
    } catch (error) {
        console.error('[Admin Users] GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}
