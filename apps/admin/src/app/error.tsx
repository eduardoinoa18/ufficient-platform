"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#6C00FF] to-[#4CD7F8] flex items-center justify-center">
            <div className="text-white text-center">
                <h1 className="text-6xl font-montserrat font-bold mb-4">500</h1>
                <h2 className="text-2xl font-poppins mb-4">Something went wrong!</h2>
                <p className="font-inter opacity-80 mb-6">An error occurred while processing your request.</p>
                <button
                    onClick={reset}
                    className="bg-white text-[#6C00FF] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition mr-4"
                >
                    Try again
                </button>
                <a
                    href="/login"
                    className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#6C00FF] transition"
                >
                    Go to Login
                </a>
            </div>
        </div>
    );
}
