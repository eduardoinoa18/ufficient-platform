import jwt, { type SignOptions, type Secret } from 'jsonwebtoken';
import type { NextApiRequest } from 'next';

export type TokenPayload = {
  userId: number;
  isAdmin?: boolean;
  exp?: number;
};

const JWT_SECRET: Secret = (process.env.JWT_SECRET || 'dev_secret_change_me') as Secret;

type JwtExpires = number | `${number}ms` | `${number}s` | `${number}m` | `${number}h` | `${number}d`;

export function signToken(payload: Omit<TokenPayload, 'exp'>, expiresIn: JwtExpires = '8h') {
  const options: SignOptions = { expiresIn } as SignOptions;
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token?: string): TokenPayload | null {
  try {
    if (!token) return null;
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: NextApiRequest): string | undefined {
  const header = req.headers.cookie;
  if (!header) return undefined;
  const cookies = Object.fromEntries(
    header.split(';').map((c) => {
      const [k, v] = c.trim().split('=');
      return [k, decodeURIComponent(v ?? '')];
    })
  );
  return cookies['token'];
}

export function setAuthCookie(token: string): string {
  const maxAge = 60 * 60 * 8; // 8 hours
  const cookie = `token=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
  return cookie;
}
