import { useState } from 'react';
import Head from 'next/head';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    setLoading(false);
    if (res.ok) {
      window.location.href = '/admin';
    } else {
      alert('Invalid credentials');
    }
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-12">
      <Head>
        <title>Admin Login — Ufficient</title>
      </Head>
      <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
      <form className="space-y-4" onSubmit={submit}>
        <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</Button>
      </form>
    </div>
  );
}
