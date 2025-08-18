import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth } from '../../../lib/firebase-admin';

async function verifyRequest(req: NextRequest): Promise<string | null> {
    try {
        const authHeader = req.headers.get('authorization') || req.headers.get('Authorization');
        const bearer = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
        if (bearer && adminAuth) {
            const decoded = await adminAuth.verifyIdToken(bearer);
            return decoded.uid;
        }
        const session = req.cookies.get('session')?.value;
        if (session && adminAuth) {
            const decoded = await adminAuth.verifySessionCookie(session, true);
            return decoded.uid;
        }
        return null;
    } catch {
        return null;
    }
}

export async function GET(request: NextRequest) {
    try {
        const uid = await verifyRequest(request);
        if (!uid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId') || uid;

        if (!adminDb) return NextResponse.json({ items: [], total: 0 }, { status: 200 });

        const snap = await adminDb
            .collection('tasks')
            .where('userId', '==', userId)
            .orderBy('createdAt', 'desc')
            .get();

        const items = snap.docs.map((d: any) => {
            const data = d.data();
            return {
                id: d.id,
                ...data,
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
                updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt,
            };
        });
        return NextResponse.json({ items, total: items.length }, { status: 200 });
    } catch (error) {
        console.error('[Admin Tasks] GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const uid = await verifyRequest(request);
        if (!uid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await request.json();
        const { userId, title, description, category, priority } = body;
        const owner = userId || uid;
        if (!owner || !title) return NextResponse.json({ error: 'userId and title required' }, { status: 400 });

        if (!adminDb) return NextResponse.json({ success: true, id: `temp_${Date.now()}` }, { status: 200 });

        const now = new Date();
        const task = {
            userId: owner,
            title,
            description: description || '',
            category: category || 'Personal',
            completed: false,
            createdAt: now,
            updatedAt: now,
            priority: priority || 'medium',
            points: 10,
            aiGenerated: false,
        };

        const ref = await adminDb.collection('tasks').add(task);
        return NextResponse.json({ success: true, id: ref.id }, { status: 201 });
    } catch (error) {
        console.error('[Admin Tasks] POST error:', error);
        return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
    }
}
