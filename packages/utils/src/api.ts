import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Create axios instance
const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Get token from localStorage (client-side) or from context
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('ufficient_token');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: any) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            if (typeof window !== 'undefined') {
                localStorage.removeItem('ufficient_token');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

// API Helper Functions
export const apiRequest = {
    get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
        api.get(url, config).then((res: AxiosResponse<T>) => res.data),

    post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
        api.post(url, data, config).then((res: AxiosResponse<T>) => res.data),

    put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
        api.put(url, data, config).then((res: AxiosResponse<T>) => res.data),

    delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
        api.delete(url, config).then((res: AxiosResponse<T>) => res.data),

    patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
        api.patch(url, data, config).then((res: AxiosResponse<T>) => res.data),
};// Authentication API calls
export const authAPI = {
    login: (email: string, password: string) =>
        apiRequest.post('/api/admin/login', { email, password }),

    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('ufficient_token');
        }
        return Promise.resolve();
    },

    validateToken: (token: string) =>
        apiRequest.get('/api/admin/validate', {
            headers: { Authorization: `Bearer ${token}` }
        }),
};

// Contact API calls
export const contactAPI = {
    submit: (contactData: {
        name: string;
        email: string;
        message: string;
        company?: string;
    }) => apiRequest.post('/api/contact', contactData),
};

// Analytics API calls
export const analyticsAPI = {
    track: (event: string, properties?: any) =>
        apiRequest.post('/api/track', { event, properties, timestamp: new Date().toISOString() }),

    getMetrics: () =>
        apiRequest.get('/api/admin/metrics'),

    getUsers: (page: number = 1, limit: number = 10) =>
        apiRequest.get(`/api/admin/users?page=${page}&limit=${limit}`),
};

// Task management API calls
export const taskAPI = {
    getTasks: (userId: string) =>
        apiRequest.get(`/api/tasks?userId=${userId}`),

    createTask: (taskData: any) =>
        apiRequest.post('/api/tasks', taskData),

    updateTask: (taskId: string, updates: any) =>
        apiRequest.put(`/api/tasks/${taskId}`, updates),

    deleteTask: (taskId: string) =>
        apiRequest.delete(`/api/tasks/${taskId}`),

    completeTask: (taskId: string) =>
        apiRequest.patch(`/api/tasks/${taskId}/complete`),
};

// Gamification API calls
export const gamificationAPI = {
    getProfile: (userId: string) =>
        apiRequest.get(`/api/gamification/profile/${userId}`),

    getLeaderboard: (type: 'weekly' | 'alltime' = 'weekly') =>
        apiRequest.get(`/api/gamification/leaderboard?type=${type}`),

    getBadges: (userId: string) =>
        apiRequest.get(`/api/gamification/badges/${userId}`),

    getStreaks: (userId: string) =>
        apiRequest.get(`/api/gamification/streaks/${userId}`),
};

export default api;
