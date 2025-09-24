import Head from 'next/head';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminDashboard() {
  const { data } = useSWR('/api/admin/users', fetcher);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Head>
        <title>Admin — Ufficient</title>
      </Head>
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Created</th>
              <th className="p-2 border">Admin</th>
            </tr>
          </thead>
          <tbody>
            {data?.users?.map((u: any) => (
              <tr key={u.id}>
                <td className="p-2 border">{u.id}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.name ?? '-'}</td>
                <td className="p-2 border">{new Date(u.createdAt).toLocaleString()}</td>
                <td className="p-2 border">{u.isAdmin ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { adminGuardGSSP as getServerSideProps } from '@/lib/guards';
