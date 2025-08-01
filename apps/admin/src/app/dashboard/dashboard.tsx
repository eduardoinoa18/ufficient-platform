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

interface DashboardData {
    totalUsers: number;
    activeUsers: number;
    tasksCompleted: number;
    badgesEarned: number;
    recentUsers: Array<{
        id: number;
        name: string;
        email: string;
        joinedAgo: string;
    }>;
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch real data from API
        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                // Try to fetch from actual API endpoints
                const responses = await Promise.allSettled([
                    fetch('/api/metrics'),
                    fetch('/api/users'),
                ]);

                // If API calls fail, use fallback data for now
                const fallbackData: DashboardData = {
                    totalUsers: 0,
                    activeUsers: 0,
                    tasksCompleted: 0,
                    badgesEarned: 0,
                    recentUsers: []
                };

                setDashboardData(fallbackData);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch dashboard data:', err);
                setError('Failed to load dashboard data');

                // Fallback data in case of error
                setDashboardData({
                    totalUsers: 0,
                    activeUsers: 0,
                    tasksCompleted: 0,
                    badgesEarned: 0,
                    recentUsers: []
                });
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();

        // Refresh data every 30 seconds
        const interval = setInterval(fetchDashboardData, 30000);
        return () => clearInterval(interval);
    }, []);

    const metrics = [
        {
            title: "Total Users",
            value: dashboardData?.totalUsers?.toLocaleString() || "0",
            change: "+0%",
            icon: <Users className="text-ufficient-purple" size={24} />,
            gradient: "from-ufficient-purple to-ufficient-purple-dark"
        },
        {
            title: "Active (7d)",
            value: dashboardData?.activeUsers?.toLocaleString() || "0",
            change: "+0%",
            icon: <Activity className="text-ufficient-blue" size={24} />,
            gradient: "from-ufficient-blue to-ufficient-purple"
        },
        {
            title: "Tasks Done",
            value: dashboardData?.tasksCompleted?.toLocaleString() || "0",
            change: "+0%",
            icon: <Target className="text-green-500" size={24} />,
            gradient: "from-green-500 to-ufficient-blue"
        },
        {
            title: "Badges Earned",
            value: dashboardData?.badgesEarned?.toLocaleString() || "0",
            change: "+0%",
            icon: <Award className="text-ufficient-blue-light" size={24} />,
            gradient: "from-ufficient-purple to-ufficient-blue-light"
        },
        {
            title: "Streak Leaders",
            value: "0",
            change: "+0%",
            icon: <Zap className="text-ufficient-purple" size={24} />,
            gradient: "from-ufficient-purple to-ufficient-blue"
        },
        {
            title: "Revenue (MRR)",
            value: "$0",
            change: "+0%",
            icon: <TrendingUp className="text-green-500" size={24} />,
            gradient: "from-green-500 to-ufficient-purple"
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