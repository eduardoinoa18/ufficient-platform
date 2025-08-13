import { Platform } from 'react-native';

export type Task = {
    id: string;
    userId: string;
    title: string;
    completed: boolean;
    createdAt?: string | number;
};

function getBaseUrl() {
    const envUrl = process.env.EXPO_PUBLIC_ADMIN_API_URL;
    if (envUrl && envUrl.length > 0) return envUrl.replace(/\/$/, '');
    // Expo defaults for local dev
    const host = Platform.select({ android: '10.0.2.2', ios: 'localhost', default: 'localhost' });
    return `http://${host}:3001`;
}

const BASE = getBaseUrl();

export async function fetchTasks(userId: string): Promise<Task[]> {
    const res = await fetch(`${BASE}/api/tasks?userId=${encodeURIComponent(userId)}`);
    if (!res.ok) throw new Error(`Failed to fetch tasks: ${res.status}`);
    const data = await res.json();
    return Array.isArray(data?.tasks) ? data.tasks : data;
}

export async function createTask(input: { userId: string; title: string }): Promise<Task> {
    const res = await fetch(`${BASE}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...input, completed: false }),
    });
    if (!res.ok) throw new Error(`Failed to create task: ${res.status}`);
    return res.json();
}
