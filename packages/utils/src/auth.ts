import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// JWT Helper Functions
export const createToken = (payload: any, expiresIn: string = '7d'): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is not set');
    }
    const options: SignOptions = { expiresIn: expiresIn as any };
    return jwt.sign(payload, secret, options);
}; export const verifyToken = (token: string): any => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is not set');
    }
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

export const extractTokenFromHeader = (authHeader: string | undefined): string | null => {
    if (!authHeader) return null;
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
    return parts[1];
};

// Password Hashing Functions
export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};

// Admin Authentication Middleware
export const requireAuth = (handler: any) => {
    return async (req: any, res: any) => {
        try {
            const token = extractTokenFromHeader(req.headers.authorization);
            if (!token) {
                return res.status(401).json({ error: 'No token provided' });
            }

            const decoded = verifyToken(token);
            req.user = decoded;
            return handler(req, res);
        } catch (error) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    };
};

// Session Management
export const createSession = (userId: string, role: string = 'user') => {
    return createToken({ userId, role }, '7d');
};

export const validateSession = (token: string) => {
    try {
        const decoded = verifyToken(token);
        return { valid: true, user: decoded };
    } catch (error) {
        return { valid: false, error: 'Invalid session' };
    }
};
