"use client";
import { motion } from "framer-motion";
import { Lightbulb, Gamepad2, Share2, Zap, Target, Users, Brain, Trophy, Smartphone } from "lucide-react";

const primaryFeatures = [
    {
        icon: <Brain size={48} className="text-[#6C00FF]" />,
        title: "AI-Powered Task Generation",
        description: "Get personalized task suggestions based on your goals, schedule, and productivity patterns. Our AI learns what works for you.",
        highlight: "Smart & Adaptive"
    },
    {
        icon: <Share2 size={48} className="text-[#4CD7F8]" />,
        title: "CRM & Tool Integration",
        description: "Seamlessly connect with Salesforce, HubSpot, Notion, and 50+ productivity tools. Sync tasks across your entire workflow.",
        highlight: "50+ Integrations"
    },
    {
        icon: <Gamepad2 size={48} className="text-[#00D27F]" />,
        title: "Gamified Motivation System",
        description: "Stay motivated with streaks, badges, leaderboards, and achievement unlocks. Make productivity fun and addictive.",
        highlight: "Stay Motivated"
    }
];

const secondaryFeatures = [
    {
        icon: <Target size={32} className="text-[#6C00FF]" />,
        title: "Smart Goal Tracking",
        text: "Break down big goals into actionable daily tasks with progress visualization."
    },
    {
        icon: <Zap size={32} className="text-[#4CD7F8]" />,
        title: "Streak Power-Ups",
        text: "Earn bonus points and unlock special badges for maintaining daily streaks."
    },
    {
        icon: <Users size={32} className="text-[#00D27F]" />,
        title: "Social Accountability",
        text: "Share progress with friends and compete on leaderboards for extra motivation."
    },
    {
        icon: <Trophy size={32} className="text-[#FF6B6B]" />,
        title: "Achievement System",
        text: "Unlock 25+ unique badges and climb weekly leaderboards as you build habits."
    },
    {
        icon: <Smartphone size={32} className="text-[#4ECDC4]" />,
        title: "Cross-Platform Sync",
        text: "Access your tasks and progress seamlessly across mobile, web, and desktop."
    },
    {
        icon: <Lightbulb size={32} className="text-[#FFE66D]" />,
        title: "Productivity Insights",
        text: "Get weekly reports and insights to optimize your most productive hours."
    }
];

export default function FeatureGrid() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-20">
            {/* Section Header */}
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl md:text-5xl font-bold font-poppins text-gray-900 mb-6">
                    Everything You Need to
                    <span className="bg-gradient-to-r from-[#6C00FF] to-[#4CD7F8] bg-clip-text text-transparent"> Succeed</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
                    UFFICIENT combines the best of AI, gamification, and social accountability
                    to create the ultimate productivity experience.
                </p>
            </motion.div>

            {/* Primary Features Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mb-20">
                {primaryFeatures.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#6C00FF]/20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8 }}
                    >
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-[#6C00FF] to-[#4CD7F8] text-white text-xs px-3 py-1 rounded-full font-semibold">
                            {feature.highlight}
                        </div>

                        <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                            {feature.icon}
                        </div>

                        <h3 className="font-poppins font-bold text-2xl mb-4 text-gray-900 group-hover:text-[#6C00FF] transition-colors">
                            {feature.title}
                        </h3>

                        <p className="font-inter text-gray-600 leading-relaxed">
                            {feature.description}
                        </p>

                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#6C00FF] to-[#4CD7F8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
                    </motion.div>
                ))}
            </div>

            {/* Secondary Features Grid */}
            <motion.div
                className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-3xl p-8 md:p-12"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold font-poppins text-gray-900 mb-4">
                        Plus These Powerful Features
                    </h3>
                    <p className="text-gray-600 font-inter max-w-2xl mx-auto">
                        Every detail designed to help you build lasting productive habits
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {secondaryFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="flex items-start gap-4 group"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex-shrink-0 p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                                {feature.icon}
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg text-gray-900 mb-2 font-poppins">
                                    {feature.title}
                                </h4>
                                <p className="text-gray-600 text-sm font-inter leading-relaxed">
                                    {feature.text}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
                className="text-center mt-16 bg-gradient-to-r from-[#6C00FF] to-[#4CD7F8] rounded-2xl p-8 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h3 className="text-2xl font-bold mb-4 font-poppins">
                    Ready to Transform Your Productivity?
                </h3>
                <p className="mb-6 font-inter opacity-90">
                    Join thousands of professionals already using UFFICIENT to achieve their goals
                </p>
                <button className="bg-white text-[#6C00FF] px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300">
                    Start Your Free Trial →
                </button>
            </motion.div>
        </div>
    );
}
