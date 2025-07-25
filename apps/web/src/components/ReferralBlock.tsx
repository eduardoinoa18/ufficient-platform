"use client";
import { motion } from "framer-motion";
import { Gift, Sparkles, Crown, Share } from "lucide-react";

export default function ReferralBlock() {
    return (
        <section className="py-20 bg-gradient-to-br from-[#6C00FF]/5 to-[#4CD7F8]/5">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    className="relative bg-gradient-to-r from-[#6C00FF] to-[#4CD7F8] rounded-3xl p-12 text-white overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    {/* Background Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>

                    <div className="relative z-10 text-center">
                        <motion.div
                            className="inline-flex items-center gap-2 bg-white/20 rounded-full px-6 py-2 mb-6"
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Sparkles size={20} />
                            <span className="font-semibold">Limited Time Offer</span>
                        </motion.div>

                        <motion.h2
                            className="text-4xl md:text-6xl font-bold font-montserrat mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            🎁 Invite & Earn
                        </motion.h2>

                        <motion.p
                            className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto font-inter leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            Refer friends and unlock exclusive rewards! Get premium features,
                            special badges, and bonus points for every successful referral.
                        </motion.p>

                        <motion.div
                            className="grid md:grid-cols-3 gap-6 mb-10"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                                <Gift size={40} className="mx-auto mb-4 text-[#00D27F]" />
                                <h3 className="font-bold text-lg mb-2 font-poppins">1 Friend = 1 Month Pro</h3>
                                <p className="text-sm opacity-80 font-inter">Free premium access for every friend who joins</p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                                <Crown size={40} className="mx-auto mb-4 text-[#FFD700]" />
                                <h3 className="font-bold text-lg mb-2 font-poppins">5 Friends = VIP Status</h3>
                                <p className="text-sm opacity-80 font-inter">Unlock exclusive badges and leaderboard privileges</p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                                <Sparkles size={40} className="mx-auto mb-4 text-[#FF6B6B]" />
                                <h3 className="font-bold text-lg mb-2 font-poppins">10 Friends = Lifetime</h3>
                                <p className="text-sm opacity-80 font-inter">Get UFFICIENT Pro for life + special founder badge</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <button className="group bg-white text-[#6C00FF] px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                                <Share size={20} />
                                Share with Friends
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button>

                            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#6C00FF] transition-all duration-300">
                                Learn More About Rewards
                            </button>
                        </motion.div>

                        <motion.p
                            className="mt-6 text-sm opacity-75 font-inter"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            viewport={{ once: true }}
                        >
                            * Referral rewards activate when friends complete their first week of tasks
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
