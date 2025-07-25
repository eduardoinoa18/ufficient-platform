"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="bg-gradient-to-br from-[#6C00FF] via-[#2563eb] to-[#4CD7F8] text-white text-center py-24 relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-10 w-96 h-96 bg-[#4CD7F8] rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-300"></div>
                <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#00D27F] rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <motion.h1
                    className="text-4xl md:text-7xl font-bold font-montserrat mb-6 leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Unlock Your Most{" "}
                    <span className="bg-gradient-to-r from-[#4CD7F8] to-[#00D27F] bg-clip-text text-transparent">
                        Efficient Self
                    </span>
                </motion.h1>

                <motion.p
                    className="text-lg md:text-2xl font-inter max-w-3xl mx-auto mb-10 opacity-90 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Organize smarter, stay motivated, and grow professionally with AI-powered tasks,
                    streak tracking, and gamified productivity that actually works.
                </motion.p>

                <motion.div
                    className="flex justify-center gap-4 flex-wrap mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <a
                        href="#download"
                        className="group px-8 py-4 bg-white text-[#6C00FF] rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                    >
                        📱 Get Ufficient Now
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                    <a
                        href="#download"
                        className="px-8 py-4 bg-[#4CD7F8] text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                        📱 Get it on Google Play
                    </a>
                    <a
                        href="#signup"
                        className="px-8 py-4 bg-[#00D27F] text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                        🚀 Start Free Today
                    </a>
                </motion.div>

                <motion.div
                    className="mt-16"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#4CD7F8] to-[#00D27F] rounded-3xl blur opacity-75"></div>
                        <div className="relative">
                            <Image
                                src="/images/mockups/dashboard-preview.svg"
                                alt="UFFICIENT App Dashboard Preview"
                                width={800}
                                height={600}
                                className="w-full rounded-2xl shadow-2xl"
                                priority
                            />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="mt-12 flex justify-center gap-8 text-sm opacity-75"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                >
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#00D27F] rounded-full"></span>
                        AI-Powered Tasks
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#4CD7F8] rounded-full"></span>
                        Streak Tracking
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        Gamified Rewards
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
