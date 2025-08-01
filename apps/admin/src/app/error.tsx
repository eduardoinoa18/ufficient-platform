"use client";

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-ufficient-purple to-ufficient-blue flex items-center justify-center">
            <div className="text-white text-center max-w-md mx-auto px-6">
                <h1 className="text-6xl font-montserrat font-bold mb-4">500</h1>
                <h2 className="text-2xl font-poppins mb-4">Something went wrong!</h2>
                <p className="font-inter opacity-80 mb-6">An error occurred while processing your request.</p>
                <div className="space-x-4">
                    <button
                        onClick={reset}
                        className="bg-white text-ufficient-purple px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
                    >
                        Try again
                    </button>
                    <a
                        href="/login"
                        className="inline-block bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-ufficient-purple transition"
                    >
                        Go to Login
                    </a>
                </div>
            </div>
        </div>
    );
}
