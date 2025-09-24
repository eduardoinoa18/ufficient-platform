import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rateLimit';
import { signToken, setAuthCookie } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
  const rl = rateLimit(`user_login:${ip}`, 20, 60_000);
  if (!rl.ok) return res.status(429).json({ error: 'Too many attempts, try later.' });
  const { email, password } = req.body as { email: string; password: string };
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = signToken({ userId: user.id, isAdmin: user.isAdmin }, '8h');
  res.setHeader('Set-Cookie', setAuthCookie(token));
  return res.json({ ok: true, user: { id: user.id, email: user.email } });
}
