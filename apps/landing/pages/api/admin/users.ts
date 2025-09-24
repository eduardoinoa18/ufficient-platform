import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();
  const token = verifyToken(getTokenFromRequest(req));
  if (!token || !token.isAdmin) return res.status(401).json({ error: 'Unauthorized' });

  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, createdAt: true, isAdmin: true }
  });
  return res.json({ users });
}
