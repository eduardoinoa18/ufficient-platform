"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Users,
    Activity,
    TrendingUp,
    Award,
    Zap,
    Target,
    Crown,
    Sparkles,
    Star,
    Heart,
    Coffee,
    Clock,
    Settings,
    BarChart3,
    Database,
    Cpu
} from "lucide-react";
import Sidebar from "../../components/Sidebar";
import MetricCard from "../../components/MetricCard";
import UsersHub from "../../components/UsersHub";
import GamificationView from "../../components/GamificationView";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data loading
        setTimeout(() => {
            setDashboardData({
                totalUsers: 3296,
                activeUsers: 1745,
                tasksCompleted: 28450,
                badgesEarned: 12678,
                recentUsers: [
                    { id: 1, name: "Sarah Chen", email: "sarah@techflow.com", joinedAgo: "2 hours ago" },
                    { id: 2, name: "Marcus Rodriguez", email: "marcus@freelance.co", joinedAgo: "4 hours ago" },
                    { id: 3, name: "Emily Thompson", email: "emily@growthlabs.io", joinedAgo: "6 hours ago" }
                ]
            });
            setLoading(false);
        }, 800);
    }, []);

    const metrics = [
        {
            title: "Total Users",
            value: "3,296",
            change: "+12%",
            icon: <Users className="text-[#6C00FF]" size={24} />,
            gradient: "from-[#6C00FF] to-[#29006E]"
        },
        {
            title: "Active (7d)",
            value: "1,745",
            change: "+8%",
            icon: <Activity className="text-[#4CD7F8]" size={24} />,
            gradient: "from-[#4CD7F8] to-[#6C00FF]"
        },
        {
            title: "Tasks Done",
            value: "28,450",
            change: "+15%",
            icon: <Target className="text-[#00D27F]" size={24} />,
            gradient: "from-[#00D27F] to-[#4CD7F8]"
        },
        {
            title: "Badges Earned",
            value: "12,678",
            change: "+23%",
            icon: <Award className="text-[#E3D9FF]" size={24} />,
            gradient: "from-[#6C00FF] to-[#E3D9FF]"
        },
        {
            title: "Streak Leaders",
            value: "156",
            change: "+5%",
            icon: <Zap className="text-[#6C00FF]" size={24} />,
            gradient: "from-[#6C00FF] to-[#4CD7F8]"
        },
        {
            title: "Revenue (MRR)",
            value: "$24,580",
            change: "+18%",
            icon: <TrendingUp className="text-[#00D27F]" size={24} />,
            gradient: "from-[#00D27F] to-[#6C00FF]"
        },
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
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl font-montserrat font-bold bg-gradient-to-r from-[#6C00FF] to-[#4CD7F8] bg-clip-text text-transparent">System Health</h2>
                            <p className="text-[#29006E]/70 font-inter mt-2">Monitor your platform's performance and status</p>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center border border-gray-100"
                            >
                                <div className="flex items-center justify-center mb-4">
                                    <div className="p-3 bg-gradient-to-r from-[#00D27F] to-[#4CD7F8] rounded-xl">
                                        <Activity className="text-white" size={24} />
                                    </div>
                                </div>
                                <h3 className="text-lg font-poppins font-semibold mb-3 text-[#29006E]">API Status</h3>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-3 h-3 bg-[#00D27F] rounded-full animate-pulse"></div>
                                    <span className="text-[#00D27F] font-medium font-inter">Operational</span>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center border border-gray-100"
                            >
                                <div className="flex items-center justify-center mb-4">
                                    <div className="p-3 bg-gradient-to-r from-[#6C00FF] to-[#29006E] rounded-xl">
                                        <Database className="text-white" size={24} />
                                    </div>
                                </div>
                                <h3 className="text-lg font-poppins font-semibold mb-3 text-[#29006E]">Database</h3>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-3 h-3 bg-[#00D27F] rounded-full animate-pulse"></div>
                                    <span className="text-[#00D27F] font-medium font-inter">Connected</span>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center border border-gray-100"
                            >
                                <div className="flex items-center justify-center mb-4">
                                    <div className="p-3 bg-gradient-to-r from-[#4CD7F8] to-[#6C00FF] rounded-xl">
                                        <Cpu className="text-white" size={24} />
                                    </div>
                                </div>
                                <h3 className="text-lg font-poppins font-semibold mb-3 text-[#29006E]">Server Load</h3>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <span className="text-yellow-600 font-medium font-inter">23% CPU</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                );
            case 'settings':
                return (
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl font-montserrat font-bold bg-gradient-to-r from-[#6C00FF] to-[#4CD7F8] bg-clip-text text-transparent">Settings</h2>
                            <p className="text-[#29006E]/70 font-inter mt-2">Configure your platform settings and preferences</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-gradient-to-r from-[#6C00FF] to-[#4CD7F8] rounded-lg">
                                    <Settings className="text-white" size={20} />
                                </div>
                                <h3 className="text-xl font-poppins font-semibold text-[#29006E]">Admin Configuration</h3>
                            </div>
                            <div className="bg-gradient-to-r from-[#6C00FF]/5 to-[#4CD7F8]/5 p-6 rounded-lg">
                                <p className="text-[#29006E]/70 font-inter">Settings panel will be available in V2 of the UFFICIENT platform.</p>
                                <p className="text-sm text-[#6C00FF] font-medium mt-2">Coming soon with advanced configuration options!</p>
                            </div>
                        </motion.div>
                    </div>
                );
            default:
                return (
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center justify-between"
                        >
                            <div>
                                <h1 className="text-4xl font-montserrat font-bold bg-gradient-to-r from-[#6C00FF] to-[#4CD7F8] bg-clip-text text-transparent">
                                    UFFICIENT Dashboard
                                </h1>
                                <p className="text-[#29006E]/70 font-inter mt-2">Welcome back! Here's what's happening with your platform.</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-[#29006E]/60 font-inter">Last updated</p>
                                <p className="text-[#6C00FF] font-poppins font-semibold">{new Date().toLocaleDateString()}</p>
                            </div>
                        </motion.div>

                        {/* Core Metrics */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="grid md:grid-cols-3 gap-6 mb-8"
                        >
                            {metrics.slice(0, 3).map((m, i) => (
                                <MetricCard
                                    key={i}
                                    title={m.title}
                                    value={m.value}
                                    change={m.change}
                                    icon={m.icon}
                                    gradient={m.gradient}
                                />
                            ))}
                        </motion.div>

                        {/* Engagement Metrics */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-8"
                        >
                            <h2 className="text-xl font-poppins font-semibold mb-4 text-[#29006E]">Engagement Metrics</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {metrics.slice(3, 6).map((m, i) => (
                                    <MetricCard
                                        key={i}
                                        title={m.title}
                                        value={m.value}
                                        change={m.change}
                                        icon={m.icon}
                                        gradient={m.gradient}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* Top Task Categories */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.0 }}
                            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-gradient-to-r from-[#6C00FF] to-[#4CD7F8] rounded-lg">
                                    <BarChart3 className="text-white" size={20} />
                                </div>
                                <h3 className="text-xl font-poppins font-semibold text-[#29006E]">Top Task Categories</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#6C00FF]/5 to-[#6C00FF]/10 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 bg-[#6C00FF] rounded-full"></div>
                                        <span className="font-poppins font-medium text-[#29006E]">Work</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 bg-gray-200 rounded-full h-2">
                                            <div className="bg-[#6C00FF] h-2 rounded-full" style={{ width: '42%' }}></div>
                                        </div>
                                        <span className="bg-[#6C00FF] text-white px-3 py-1 rounded-full text-sm font-medium min-w-[50px] text-center">42%</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#4CD7F8]/5 to-[#4CD7F8]/10 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 bg-[#4CD7F8] rounded-full"></div>
                                        <span className="font-poppins font-medium text-[#29006E]">Personal</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 bg-gray-200 rounded-full h-2">
                                            <div className="bg-[#4CD7F8] h-2 rounded-full" style={{ width: '28%' }}></div>
                                        </div>
                                        <span className="bg-[#4CD7F8] text-white px-3 py-1 rounded-full text-sm font-medium min-w-[50px] text-center">28%</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#00D27F]/5 to-[#00D27F]/10 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 bg-[#00D27F] rounded-full"></div>
                                        <span className="font-poppins font-medium text-[#29006E]">Fitness</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 bg-gray-200 rounded-full h-2">
                                            <div className="bg-[#00D27F] h-2 rounded-full" style={{ width: '18%' }}></div>
                                        </div>
                                        <span className="bg-[#00D27F] text-white px-3 py-1 rounded-full text-sm font-medium min-w-[50px] text-center">18%</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                );
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#F9F8FF] via-[#FFFFFF] to-[#F0F4FF]">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <main className="flex-1 p-8">
                {renderContent()}
            </main>
        </div>
    );
}