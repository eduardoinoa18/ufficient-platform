import { Platform } from 'react-native';

const BASE_URL = process.env.EXPO_PUBLIC_ADMIN_API_URL || 'http://10.0.2.2:3001'; // Android emulator uses 10.0.2.2

async function request(path: string, options: RequestInit = {}) {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    };
    const token = '';
    if (token) (headers as any).Authorization = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers,
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
}

export const tasksAPI = {
    list: (userId: string) => request(`/api/tasks?userId=${encodeURIComponent(userId)}`),
    create: (payload: { userId: string; title: string }) => request('/api/tasks', { method: 'POST', body: JSON.stringify(payload) }),
};
