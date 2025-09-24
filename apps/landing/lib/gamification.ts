import { prisma } from '@/lib/prisma';

export async function addPoints(userId: number, delta: number, reason: string, meta?: any) {
  await prisma.pointsLedger.create({ data: { userId, delta, reason, meta } });
}

export async function grantBadge(userId: number, badgeKey: string) {
  const badge = await prisma.badge.findUnique({ where: { key: badgeKey } });
  if (!badge) return;
  try {
    await prisma.userBadge.create({ data: { userId, badgeId: badge.id } });
  } catch {
    // unique constraint: user already has this badge
  }
}

export async function ensureDefaultBadges() {
  const defaults = [
    { key: 'welcome', name: 'Welcome Aboard', points: 50 },
    { key: 'streak_7', name: '7-Day Streak', points: 100 },
  ];
  for (const b of defaults) {
    await prisma.badge.upsert({ where: { key: b.key }, create: b, update: b });
  }
}
