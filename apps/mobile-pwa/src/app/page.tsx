'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Trophy, Flame, Plus, User, BarChart3 } from 'lucide-react';

interface Task {
    id: string;
    title: string;
    completed: boolean;
    streak: number;
}

interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    earned: boolean;
}

export default function MobilePWAPage() {
    const [tasks, setTasks] = useState<Task[]>([
        { id: '1', title: 'Morning Exercise', completed: false, streak: 5 },
        { id: '2', title: 'Read for 30 minutes', completed: true, streak: 12 },
        { id: '3', title: 'Meditate', completed: false, streak: 3 },
    ]);

    const [badges] = useState<Badge[]>([
        { id: '1', name: 'Early Bird', description: 'Complete morning routine 7 days straight', icon: '🌅', earned: true },
        { id: '2', name: 'Bookworm', description: 'Read for 10 days in a row', icon: '📚', earned: true },
        { id: '3', name: 'Zen Master', description: 'Meditate for 30 days', icon: '🧘', earned: false },
    ]);

    const [currentStreak, setCurrentStreak] = useState(12);
    const [totalPoints, setTotalPoints] = useState(2450);

    const toggleTask = (taskId: string) => {
        setTasks(prev => prev.map(task =>
            task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
        ));
    };

    const completedToday = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progressPercentage = (completedToday / totalTasks) * 100;

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
                        <span className="text-sm font-medium">{completedToday}/{totalTasks}</span>
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
                    <button className="p-2 bg-primary-500 text-white rounded-lg">
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <div key={task.id} className="bg-white rounded-lg shadow-md p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => toggleTask(task.id)}
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                      ${task.completed
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
                                        <div className="flex items-center gap-1 text-sm text-orange-600">
                                            <Flame className="w-3 h-3" />
                                            <span>{task.streak} day streak</span>
                                        </div>
                                    </div>
                                </div>
                                <Clock className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Badges Section */}
            <div className="px-4 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h2>
                <div className="grid grid-cols-2 gap-3">
                    {badges.map((badge) => (
                        <div key={badge.id} className={`bg-white rounded-lg shadow-md p-4 ${!badge.earned ? 'opacity-50' : ''}`}>
                            <div className="text-3xl mb-2">{badge.icon}</div>
                            <h3 className="font-semibold text-gray-800 text-sm">{badge.name}</h3>
                            <p className="text-xs text-gray-600">{badge.description}</p>
                            {badge.earned && <div className="mt-2 text-xs text-green-600 font-medium">Earned!</div>}
                        </div>
                    ))}
                </div>
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
                        <Trophy className="w-6 h-6" />
                        <span className="text-xs mt-1">Badges</span>
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
