import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Ufficient — Do more with balance</title>
        <meta name="description" content="Ufficient helps you plan your day with focus and balance." />
      </Head>
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-20">
        <section className="text-center">
          <h1 className="font-display text-5xl sm:text-6xl font-bold mb-6">Plan Less. Do More.</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">A lightweight planner that balances your tasks with your energy and schedule. PWA ready.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/start" className="px-6 py-3 rounded-md bg-brand-600 text-white hover:bg-brand-700">Get Started</Link>
            <a href="#how" className="px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-50">How it works</a>
          </div>
        </section>

        <section id="how" className="mt-24 grid sm:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Capture</h3>
            <p className="text-sm text-gray-600">Add tasks with categories and durations.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Balance</h3>
            <p className="text-sm text-gray-600">Ufficient suggests a balanced flow based on your profile.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Focus</h3>
            <p className="text-sm text-gray-600">Work in focused blocks; log completions for insights.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
