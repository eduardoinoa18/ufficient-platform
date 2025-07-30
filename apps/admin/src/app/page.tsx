"use client";
import { useEffect } from 'react';

export default function AdminHome() {
  useEffect(() => {
    // Redirect to login page on load
    window.location.href = '/login';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6C00FF] to-[#4CD7F8] flex items-center justify-center">
      <div className="text-white text-center">
        <div className="w-8 h-8 bg-white/20 rounded-full animate-pulse mx-auto mb-4"></div>
        <h1 className="text-xl font-montserrat font-bold mb-2">UFFICIENT Admin</h1>
        <p className="font-inter opacity-80">Redirecting to secure login...</p>
      </div>
    </div>
  );
}
