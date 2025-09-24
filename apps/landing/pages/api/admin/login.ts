// pages/api/admin/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";
import { signToken, setAuthCookie } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
  const rl = rateLimit(`admin_login:${ip}`, 10, 60_000);
  if (!rl.ok) return res.status(429).json({ error: "Too many attempts, try later." });
  const { email, password } = req.body as { email: string; password: string };
  const admin = await prisma.user.findUnique({ where: { email } });
  if (!admin || !admin.isAdmin) return res.status(401).json({ error: "Unauthorized" });
  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) return res.status(401).json({ error: "Unauthorized" });

  const token = signToken({ userId: admin.id, isAdmin: true }, "8h");
  res.setHeader("Set-Cookie", setAuthCookie(token));
  await prisma.adminAction.create({ data: { adminId: admin.id, action: "login", meta: {} } });
  return res.json({ ok: true });
}
