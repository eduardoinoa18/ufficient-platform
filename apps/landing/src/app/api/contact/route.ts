import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message, type, timestamp } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
        }

        if (!adminDb) {
            console.warn('[Contact] Firebase Admin not configured. Falling back to log only.');
            console.log('Contact form submission (no DB):', { name, email, subject, message, type, timestamp });
            return NextResponse.json({ success: true, message: 'Received (no DB configured)' }, { status: 200 });
        }

        const doc = await adminDb.collection('contacts').add({
            name,
            email,
            subject: subject || '',
            message,
            type: type || 'general',
            timestamp: timestamp || new Date().toISOString(),
            status: 'new',
            createdAt: new Date(),
        });

        return NextResponse.json(
            { success: true, message: 'Contact form submitted', id: doc.id },
            { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json(
        {},
        {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        }
    );
}
