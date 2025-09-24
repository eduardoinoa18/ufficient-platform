import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, message } = req.body as { email: string; message: string };
  // TODO: store or email; for now just log
  console.log('Contact message:', email, message);
  return res.json({ ok: true });
}
