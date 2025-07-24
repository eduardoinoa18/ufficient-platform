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
        <aside className="w-64 bg-gradient-to-b from-[#29006E] to-[#6C00FF] shadow-xl min-h-screen relative">
            <div className="p-6 border-b border-white/20">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#4CD7F8] to-white rounded-lg flex items-center justify-center">
                        <span className="text-[#29006E] font-montserrat font-bold text-lg">U</span>
                    </div>
                    <h2 className="text-xl font-montserrat font-bold text-white">
                        UFFICIENT
                    </h2>
                </div>
                <p className="text-white/70 text-sm font-inter mt-1">Admin Portal</p>
            </div>

            <nav className="mt-6 px-3">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all duration-300 mb-1 ${activeTab === item.id
                                ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30'
                                : 'text-white/80 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <Icon size={20} />
                            <span className="font-poppins font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="absolute bottom-6 left-3 right-3">
                <button
                    className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-red-500/20 hover:text-red-200 rounded-xl transition-all duration-300 border border-white/20"
                    onClick={handleLogout}
                >
                    <LogOut size={20} />
                    <span className="font-poppins font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
