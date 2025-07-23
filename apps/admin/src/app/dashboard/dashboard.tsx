"use client";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import MetricCard from "../../components/MetricCard";
import UsersHub from "../../components/UsersHub";
import GamificationView from "../../components/GamificationView";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');

    const metrics = [
        { title: "Total Users", value: 1250 },
        { title: "Active (7d)", value: 345 },
        { title: "Pro Users", value: 120 },
        { title: "Average Tasks", value: 8.2 },
        { title: "Streak Leaders", value: 15 },
        { title: "Monthly Revenue", value: "$2,400" },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'users':
                return <UsersHub />;
            case 'gamification':
                return <GamificationView />;
            case 'system':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-poppins font-bold">System Health</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-xl shadow p-6 text-center">
                                <h3 className="text-lg font-semibold mb-2">API Status</h3>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-green-600 font-medium">Operational</span>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow p-6 text-center">
                                <h3 className="text-lg font-semibold mb-2">Database</h3>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-green-600 font-medium">Connected</span>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow p-6 text-center">
                                <h3 className="text-lg font-semibold mb-2">Server Load</h3>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <span className="text-yellow-600 font-medium">23% CPU</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'settings':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-poppins font-bold">Settings</h2>
                        <div className="bg-white rounded-xl shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">Admin Configuration</h3>
                            <p className="text-gray-600">Settings panel will be available in V2.</p>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="space-y-6">
                        <h1 className="text-3xl font-montserrat font-bold">Admin Dashboard</h1>

                        {/* Core Metrics */}
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            {metrics.slice(0, 3).map((m, i) => (
                                <MetricCard key={i} title={m.title} value={m.value} />
                            ))}
                        </div>

                        {/* Engagement Metrics */}
                        <div className="mb-8">
                            <h2 className="text-xl font-poppins font-semibold mb-4">Engagement Metrics</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {metrics.slice(3, 6).map((m, i) => (
                                    <MetricCard key={i} title={m.title} value={m.value} />
                                ))}
                            </div>
                        </div>

                        {/* Top Task Categories */}
                        <div className="bg-white rounded-xl shadow p-6">
                            <h3 className="text-lg font-poppins font-semibold mb-4">Top 3 Task Categories</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-700">Work</span>
                                    <span className="bg-[#6C00FF] text-white px-3 py-1 rounded-full text-sm">42%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-700">Personal</span>
                                    <span className="bg-[#4CD7F8] text-white px-3 py-1 rounded-full text-sm">28%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-700">Fitness</span>
                                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">18%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <main className="flex-1 p-8 bg-[#F9F8FF]">
                {renderContent()}
            </main>
        </div>
    );
}