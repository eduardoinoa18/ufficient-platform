import type { GetServerSideProps } from 'next';
import { verifyToken } from '@/lib/auth';

export const adminGuardGSSP: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie || '';
  const token = cookies.split(';').map(c => c.trim()).find(c => c.startsWith('token='))?.split('=')[1];
  const payload = verifyToken(token);
  if (!payload || !payload.isAdmin) {
    return { redirect: { destination: '/admin/login', permanent: false } } as const;
  }
  return { props: {} };
};

export const userGuardGSSP: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie || '';
  const token = cookies.split(';').map(c => c.trim()).find(c => c.startsWith('token='))?.split('=')[1];
  const payload = verifyToken(token);
  if (!payload || !payload.userId) {
    return { redirect: { destination: '/start', permanent: false } } as const;
  }
  return { props: {} };
};
