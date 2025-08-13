import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../lib/firebase-admin';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        if (!userId) return NextResponse.json({ error: 'userId is required' }, { status: 400 });

        if (!adminDb) return NextResponse.json({ items: [], total: 0 }, { status: 200 });

        const snap = await adminDb
            .collection('tasks')
            .where('userId', '==', userId)
            .orderBy('createdAt', 'desc')
            .get();

        const items = snap.docs.map((d: any) => ({ id: d.id, ...d.data() }));
        return NextResponse.json({ items, total: items.length }, { status: 200 });
    } catch (error) {
        console.error('[Admin Tasks] GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, title, description, category, priority } = body;
        if (!userId || !title) return NextResponse.json({ error: 'userId and title required' }, { status: 400 });

        if (!adminDb) return NextResponse.json({ success: true, id: `temp_${Date.now()}` }, { status: 200 });

        const task = {
            userId,
            title,
            description: description || '',
            category: category || 'Personal',
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
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
