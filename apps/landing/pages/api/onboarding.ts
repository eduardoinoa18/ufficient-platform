// pages/api/onboarding.ts
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken, setAuthCookie } from "@/lib/auth";
import { ensureDefaultBadges, addPoints, grantBadge } from "@/lib/gamification";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, password, name, profile } = req.body as any;
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(400).json({ error: "Email exists" });

  const passwordHash = await bcrypt.hash(password, 10);
  await ensureDefaultBadges();
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      profile: { create: profile }
    },
    include: { profile: true }
  });
  // auto-login: set auth cookie
  const token = signToken({ userId: user.id, isAdmin: false }, '8h');
  res.setHeader('Set-Cookie', setAuthCookie(token));
  // gamification: initial points and welcome badge
  await addPoints(user.id, 50, 'onboarding');
  await grantBadge(user.id, 'welcome');
  return res.status(201).json({ user: { id: user.id, email: user.email } });
}
