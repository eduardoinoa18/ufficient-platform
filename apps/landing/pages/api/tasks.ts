import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = verifyToken(getTokenFromRequest(req));
  if (!token?.userId) return res.status(401).json({ error: 'Unauthorized' });
  const userId = token.userId;

  if (req.method === 'GET') {
    const tasks = await prisma.task.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
    return res.json({ tasks });
  }

  if (req.method === 'POST') {
    const { title, category, dueAt } = req.body as { title: string; category: string; dueAt?: string };
    const task = await prisma.task.create({ data: { userId, title, category, dueAt: dueAt ? new Date(dueAt) : null } });
    return res.status(201).json({ task });
  }

  if (req.method === 'PUT') {
    const { id, title, category, status, duration, dueAt } = req.body as any;
    const task = await prisma.task.update({ where: { id }, data: { title, category, status, duration, dueAt: dueAt ? new Date(dueAt) : null } });
    return res.json({ task });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query as { id: string };
    await prisma.task.delete({ where: { id: Number(id) } });
    return res.json({ ok: true });
  }

  return res.status(405).end();
}
