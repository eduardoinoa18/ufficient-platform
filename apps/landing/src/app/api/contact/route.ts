import { NextRequest, NextResponse } from 'next/server';

// This is a mock implementation. In production, you would:
// 1. Save to MongoDB Atlas
// 2. Send email via AWS SES
// 3. Add proper validation and rate limiting
// 4. Implement CAPTCHA verification

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message, type, timestamp } = body;

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // In production, implement:
        // 1. MongoDB Atlas connection
        // const contact = await db.collection('contacts').insertOne({
        //   name, email, subject, message, type, timestamp, status: 'new'
        // });

        // 2. AWS SES email notification
        // await sendNotificationEmail({
        //   to: 'hello@ufficient.app',
        //   subject: `New Contact: ${type} - ${subject}`,
        //   body: `From: ${name} (${email})\nType: ${type}\nMessage: ${message}`
        // });

        // 3. Auto-reply to user
        // await sendAutoReply({
        //   to: email,
        //   name: name,
        //   type: type
        // });

        // Mock success response
        console.log('Contact form submission:', {
            name,
            email,
            subject,
            message,
            type,
            timestamp
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Contact form submitted successfully',
                id: `contact_${Date.now()}`
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Handle OPTIONS for CORS
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
