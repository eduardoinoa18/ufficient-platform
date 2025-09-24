import { useState } from 'react';
import Head from 'next/head';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';

export default function StartPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [timeZone, setTimeZone] = useState('');

  async function submit() {
    const res = await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        name,
        profile: { timeZone }
      })
    });
    if (res.ok) {
      window.location.href = '/app/dashboard';
    } else {
      alert('Failed to create account');
    }
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <Head>
        <title>Get Started — Ufficient</title>
      </Head>
      <h1 className="text-3xl font-bold mb-6">Get Started</h1>
      {step === 1 && (
        <div className="space-y-4">
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={() => setStep(2)}>Next</Button>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <Input placeholder="Name (optional)" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Time Zone (e.g., America/New_York)" value={timeZone} onChange={(e) => setTimeZone(e.target.value)} />
          <div className="flex gap-2">
            <Button className="bg-gray-200 text-gray-800 hover:bg-gray-300" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={submit}>Create Account</Button>
          </div>
        </div>
      )}
    </div>
  );
}
