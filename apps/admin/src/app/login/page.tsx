"use client";
import { useState } from "react";
import AuthForm from "../../components/AuthForm";

export default function LoginPage() {
    return (
        <main className="flex h-screen items-center justify-center bg-gradient-to-br from-[#6C00FF] to-[#4CD7F8]">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
                <h1 className="text-2xl font-montserrat mb-4 text-center">Admin Login</h1>
                <AuthForm />
            </div>
        </main>
    );
}
