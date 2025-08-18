'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Trophy, Flame, Plus, User, BarChart3 } from 'lucide-react';
import type { Task } from '@ufficient/core';
import { useAuth } from '../context/AuthContext';

export default function MobilePWAPage() {
    const { user } = useAuth();
    const userId = user?.uid;
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;
        const fetchTasks = async () => {
            try {
                const res = await fetch(`/api/tasks?userId=${userId}`);
                const data = await res.json();
                setTasks(data.items || []);
            } catch (e) {
                console.warn('Failed to load tasks', e);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, [userId]);

    const addTask = async () => {
        if (!userId) return;
        const title = prompt('New task title');
        if (!title) return;

        const optimistic: Task = { id: `temp_${Date.now()}`, userId, title, completed: false, category: 'Work', createdAt: new Date(), updatedAt: new Date(), difficulty: 'easy', priority: 'medium', points: 0, aiGenerated: false } as Task;
        setTasks((prev) => [optimistic as Task, ...prev]);

        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, title }),
            });
            const data = await res.json();
            if (data.id) {
                setTasks((prev) => prev.map((t) => (t.id === optimistic.id ? { ...t, id: data.id } : t)));
            }
        } catch (e) {
            console.error('Failed to create task', e);
        }
    };

    const toggleTask = async (taskId: string) => {
        setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)));
        // Optionally call a complete endpoint later
    };

    const completedToday = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length || 1;
    const progressPercentage = (completedToday / totalTasks) * 100;

    const currentStreak = 0;
    const totalPoints = tasks.reduce((acc, t) => acc + (t.completed ? 10 : 0), 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
            {/* Header */}
            <div className="bg-primary-500 text-white p-4 shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">UFFICIENT</h1>
                        <p className="text-primary-100">Your efficient self awaits</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-primary-100">Current Streak</p>
                        <div className="flex items-center justify-end gap-1">
                            <Flame className="w-5 h-5 text-orange-400" />
                            <span className="text-xl font-bold">{currentStreak}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Overview */}
            <div className="p-4">
                <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">Today's Progress</h2>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Tasks Completed</span>
                        <span className="text-sm font-medium">
                            {completedToday}/{totalTasks}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                        <div
                            className="bg-gradient-to-r from-primary-500 to-secondary-400 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-primary-600">
                            <Trophy className="w-4 h-4" />
                            <span>{totalPoints} Points</span>
                        </div>
                        <div className="flex items-center gap-1 text-orange-600">
                            <Flame className="w-4 h-4" />
                            <span>{currentStreak} Day Streak</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Today's Tasks */}
            <div className="px-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Today's Tasks</h2>
                    <button onClick={addTask} className="p-2 bg-primary-500 text-white rounded-lg">
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
                {loading ? (
                    <div className="text-center text-gray-500">Loading...</div>
                ) : (
                    <div className="space-y-3">
                        {tasks.map((task) => (
                            <div key={task.id} className="bg-white rounded-lg shadow-md p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => toggleTask(task.id)}
                                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${task.completed
                                                ? 'bg-green-500 border-green-500 text-white'
                                                : 'border-gray-300 hover:border-primary-500'
                                                }`}
                                        >
                                            {task.completed && <CheckCircle className="w-4 h-4" />}
                                        </button>
                                        <div>
                                            <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                                {task.title}
                                            </p>
                                        </div>
                                    </div>
                                    <Clock className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
                <div className="flex justify-around">
                    <button className="flex flex-col items-center p-2 text-primary-500">
                        <CheckCircle className="w-6 h-6" />
                        <span className="text-xs mt-1">Tasks</span>
                    </button>
                    <button className="flex flex-col items-center p-2 text-gray-400">
                        <BarChart3 className="w-6 h-6" />
                        <span className="text-xs mt-1">Stats</span>
                    </button>
                    <button className="flex flex-col items-center p-2 text-gray-400">
                        <User className="w-6 h-6" />
                        <span className="text-xs mt-1">Profile</span>
                    </button>
                </div>
            </div>

            {/* Spacer for bottom navigation */}
            <div className="h-20"></div>
        </div>
    );
}
