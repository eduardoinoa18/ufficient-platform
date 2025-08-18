"use client";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirebaseApp } from '../lib/firebase-client';

// Initialize Firebase app
getFirebaseApp();

export default function AuthForm() {
    const [email, setEmail] = useState("admin@ufficient.com");
    const [password, setPassword] = useState("admin123");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken();

            // Exchange ID token for session cookie
            const res = await fetch("/api/auth/session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken }),
            });

            if (res.ok) {
                window.location.href = "/dashboard";
            } else {
                const data = await res.json();
                setError(data.error || "Session login failed.");
            }
        } catch (err: any) {
            setError(err.message || "Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-slate-300 rounded w-full p-3 focus:ring-2 focus:ring-[#6C00FF] focus:border-transparent"
                required
                disabled={isLoading}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-slate-300 rounded w-full p-3 focus:ring-2 focus:ring-[#6C00FF] focus:border-transparent"
                required
                disabled={isLoading}
            />

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#6C00FF] text-white p-3 rounded font-bold hover:bg-[#4CD7F8] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? "Logging in..." : "Login"}
            </button>

            <div className="text-sm text-gray-600 text-center mt-4">
                <p>Login with your Firebase credentials.</p>
            </div>
        </form>
    );
}