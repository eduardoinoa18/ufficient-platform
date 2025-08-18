// Firebase Web Client initialization for the Mobile PWA
// Uses public env vars; safe to expose in client. Do NOT put Admin SDK keys here.
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
    // Optional for Analytics
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string | undefined,
};

let cachedApp: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp {
    if (!cachedApp) {
        cachedApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    }
    return cachedApp;
}

export async function getFirebaseAnalytics(): Promise<Analytics | null> {
    if (typeof window === 'undefined') return null;
    if (!firebaseConfig.measurementId) return null;
    try {
        const supported = await isSupported();
        if (!supported) return null;
        return getAnalytics(getFirebaseApp());
    } catch {
        return null;
    }
}
