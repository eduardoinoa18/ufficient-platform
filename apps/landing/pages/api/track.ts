// pages/api/track.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { userId, type, payload } = req.body as { userId?: number; type: string; payload?: any };
  await prisma.event.create({ data: { userId, type, payload } });
  res.json({ ok: true });
}
