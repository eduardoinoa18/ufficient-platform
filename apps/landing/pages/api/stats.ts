import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();
  const token = verifyToken(getTokenFromRequest(req));
  if (!token?.userId) return res.status(401).json({ error: 'Unauthorized' });

  const userId = token.userId;
  const points = await prisma.pointsLedger.aggregate({ _sum: { delta: true }, where: { userId } });
  const badges = await prisma.userBadge.count({ where: { userId } });
  // streak placeholder: count of tasks completed in past consecutive days
  const recent = await prisma.task.findMany({ where: { userId, status: 'completed' }, orderBy: { createdAt: 'desc' }, take: 30 });
  // naive streak calc: any completion today counts toward streak
  const today = new Date(); today.setHours(0,0,0,0);
  const streak = recent.some((t: { createdAt: Date }) => (t.createdAt >= today)) ? 1 : 0;
  res.json({ points: points._sum.delta || 0, badges, streak });
}
