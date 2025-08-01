import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-ufficient-purple to-ufficient-blue flex items-center justify-center">
            <div className="text-white text-center max-w-md mx-auto px-6">
                <h1 className="text-6xl font-montserrat font-bold mb-4">404</h1>
                <h2 className="text-2xl font-poppins mb-4">Page Not Found</h2>
                <p className="font-inter opacity-80 mb-6">The page you're looking for doesn't exist.</p>
                <Link
                    href="/login"
                    className="inline-block bg-white text-ufficient-purple px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
                >
                    Go to Login
                </Link>
            </div>
        </div>
    );
}
