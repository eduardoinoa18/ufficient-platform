// Firebase Web Client initialization for Admin app
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
};

let cachedApp: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp {
    if (!cachedApp) {
        cachedApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    }
    return cachedApp;
}

export function getFirebaseAuth() {
    // Ensure app is initialized before obtaining Auth
    getFirebaseApp();
    return getAuth();
}
