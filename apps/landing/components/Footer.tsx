export default function Footer() {
  return (
    <footer className="px-6 py-10 border-t mt-20">
      <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Ufficient</p>
        <div className="space-x-4">
          <a href="/admin/login">Admin</a>
          <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
