import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Dashboard() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Head>
        <title>Dashboard — Ufficient</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">Welcome</h1>
      <p className="text-gray-600">Your tasks will appear here. Build on this.</p>
      {!ready && <p>Loading…</p>}
    </div>
  );
}

export { userGuardGSSP as getServerSideProps } from '@/lib/guards';
