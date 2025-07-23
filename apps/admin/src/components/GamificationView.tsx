"use client";
import { Trophy, Award, Star, Target, Zap } from "lucide-react";

export default function GamificationView() {
    const badges = [
        {
            id: 1,
            name: "First Steps",
            description: "Complete your first task",
            icon: Target,
            color: "bg-green-500",
            requirements: "1 task completed",
            earned: 1250,
            total: 1250
        },
        {
            id: 2,
            name: "Week Warrior",
            description: "Maintain a 7-day streak",
            icon: Star,
            color: "bg-blue-500",
            requirements: "7-day streak",
            earned: 345,
            total: 1250
        },
        {
            id: 3,
            name: "Century Club",
            description: "Complete 100 tasks",
            icon: Trophy,
            color: "bg-yellow-500",
            requirements: "100 tasks completed",
            earned: 89,
            total: 1250
        },
        {
            id: 4,
            name: "Streak Master",
            description: "Achieve a 30-day streak",
            icon: Zap,
            color: "bg-purple-500",
            requirements: "30-day streak",
            earned: 23,
            total: 1250
        },
        {
            id: 5,
            name: "Pro Champion",
            description: "Upgrade to Pro plan",
            icon: Award,
            color: "bg-indigo-500",
            requirements: "Pro subscription",
            earned: 120,
            total: 1250
        }
    ];

    const streakThresholds = [
        { days: 3, points: 50, users: 456 },
        { days: 7, points: 100, users: 345 },
        { days: 14, points: 200, users: 187 },
        { days: 30, points: 500, users: 89 },
        { days: 60, points: 1000, users: 34 },
        { days: 100, points: 2000, users: 12 }
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-poppins font-bold">Gamification Overview</h2>

            {/* Badges Section */}
            <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Badge System</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {badges.map((badge) => {
                        const Icon = badge.icon;
                        const completionRate = (badge.earned / badge.total * 100).toFixed(1);

                        return (
                            <div key={badge.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`${badge.color} p-2 rounded-lg`}>
                                        <Icon size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">{badge.name}</h4>
                                        <p className="text-sm text-gray-500">{badge.description}</p>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Progress</span>
                                        <span className="font-medium">{completionRate}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${badge.color}`}
                                            style={{ width: `${completionRate}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>{badge.requirements}</span>
                                        <span>{badge.earned}/{badge.total} users</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Streak Thresholds */}
            <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Streak Thresholds</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4">Streak Days</th>
                                <th className="text-left py-3 px-4">Points Reward</th>
                                <th className="text-left py-3 px-4">Users Achieved</th>
                                <th className="text-left py-3 px-4">Completion Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {streakThresholds.map((threshold, index) => {
                                const rate = (threshold.users / 1250 * 100).toFixed(1);
                                return (
                                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <span className="font-medium">{threshold.days} days</span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-[#6C00FF] font-medium">+{threshold.points} pts</span>
                                        </td>
                                        <td className="py-3 px-4">{threshold.users} users</td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="h-2 rounded-full bg-[#6C00FF]"
                                                        style={{ width: `${rate}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm text-gray-600">{rate}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Points System */}
            <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Points System</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">+10</div>
                        <div className="text-sm text-gray-600">Per Task Completed</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">+5</div>
                        <div className="text-sm text-gray-600">Daily Bonus</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">+50</div>
                        <div className="text-sm text-gray-600">Streak Milestone</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
