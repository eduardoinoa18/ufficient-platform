"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getFirebaseApp } from '../lib/firebase-client';
import { useRouter, usePathname } from 'next/navigation';

// Initialize Firebase
getFirebaseApp();

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!loading && !user && pathname !== '/login' && pathname !== '/signup') {
            router.push('/login');
        }
    }, [user, loading, pathname, router]);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
