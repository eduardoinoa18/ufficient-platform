"use client";
import { useState } from "react";
import {
    BarChart3,
    Users,
    Trophy,
    Activity,
    Settings,
    LogOut,
    Home
} from "lucide-react";

export default function Sidebar({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'users', label: 'Users Hub', icon: Users },
        { id: 'gamification', label: 'Gamification', icon: Trophy },
        { id: 'system', label: 'System Health', icon: Activity },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const handleLogout = () => {
        // Clear auth token and redirect to login
        document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/login';
    };

    return (
        <aside className="w-64 bg-white shadow-lg min-h-screen">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-montserrat font-bold text-[#6C00FF]">
                    UFFICIENT Admin
                </h2>
            </div>

            <nav className="mt-6">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-[#F9F8FF] transition-colors ${activeTab === item.id
                                ? 'bg-[#F9F8FF] text-[#6C00FF] border-r-2 border-[#6C00FF]'
                                : 'text-gray-700'
                                }`}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="absolute bottom-6 left-6 right-6">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" onClick={handleLogout}>
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
