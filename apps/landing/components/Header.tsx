import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="text-xl font-bold">Ufficient</div>
      <nav className="space-x-4">
        <Link href="/start" className="px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700">Get Started</Link>
        <Link href="/admin/login" className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50">Admin Login</Link>
      </nav>
    </header>
  );
}
