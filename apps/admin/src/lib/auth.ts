// lib/auth.ts - Simplified V1 version
import { createHash } from 'crypto';

export async function hashPassword(password: string) {
    // Simple hash for V1 - in production use bcrypt
    return createHash('sha256').update(password).digest('hex');
}

export function signToken(payload: object) {
    // Simple token for V1 - in production use JWT
    const data = JSON.stringify({ ...payload, exp: Date.now() + 86400000 });
    return Buffer.from(data).toString('base64');
}

export function verifyToken(token: string) {
    try {
        const data = JSON.parse(Buffer.from(token, 'base64').toString());
        if (data.exp < Date.now()) throw new Error('Token expired');
        return data;
    } catch {
        throw new Error('Invalid token');
    }
}

// Rate limiting helper
export function rateLimit() {
    const attempts = new Map();

    return (ip: string) => {
        const now = Date.now();
        const windowMs = 15 * 60 * 1000; // 15 minutes
        const maxAttempts = 5;

        if (!attempts.has(ip)) {
            attempts.set(ip, { count: 1, resetTime: now + windowMs });
            return true;
        }

        const attempt = attempts.get(ip);
        if (now > attempt.resetTime) {
            attempts.set(ip, { count: 1, resetTime: now + windowMs });
            return true;
        }

        if (attempt.count >= maxAttempts) {
            return false;
        }

        attempt.count++;
        return true;
    };
}

// Audit logging helper
export function logAuthAttempt(ip: string, email: string, success: boolean) {
    console.log(`[AUTH] ${new Date().toISOString()} - IP: ${ip} - Email: ${email} - Success: ${success}`);
    // In production, this would write to a database or logging service
}