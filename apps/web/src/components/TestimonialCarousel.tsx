"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Sarah Chen",
        role: "Product Manager",
        company: "TechFlow Inc.",
        avatar: "SC",
        content: "UFFICIENT completely transformed how I manage my workload. The AI task suggestions are incredibly accurate, and the gamification keeps me motivated even on tough days. My productivity increased by 40% in the first month!",
        rating: 5,
        badge: "Power User",
        stats: "127 tasks completed"
    },
    {
        id: 2,
        name: "Marcus Rodriguez",
        role: "Freelance Designer",
        company: "Independent",
        avatar: "MR",
        content: "As a freelancer juggling multiple clients, UFFICIENT's CRM integration and streak tracking have been game-changers. I've maintained a 45-day streak and my clients love how organized I am now.",
        rating: 5,
        badge: "Streak Master",
        stats: "45-day streak"
    },
    {
        id: 3,
        name: "Emily Thompson",
        role: "Marketing Director",
        company: "GrowthLabs",
        avatar: "ET",
        content: "The social accountability features are what set UFFICIENT apart. Competing with my team on leaderboards has made productivity fun and collaborative. We've seen a 25% increase in goal completion rates.",
        rating: 5,
        badge: "Team Leader",
        stats: "Team of 12 users"
    },
    {
        id: 4,
        name: "David Park",
        role: "Software Engineer",
        company: "InnovateTech",
        avatar: "DP",
        content: "I was skeptical about gamified productivity apps, but UFFICIENT nailed it. The badge system and AI recommendations feel natural, not forced. I've completed more side projects in 3 months than in the entire previous year.",
        rating: 5,
        badge: "Innovation Badge",
        stats: "3 projects completed"
    },
    {
        id: 5,
        name: "Lisa Wang",
        role: "Executive Coach",
        company: "Leadership Plus",
        avatar: "LW",
        content: "I recommend UFFICIENT to all my clients. The insights and weekly reports provide valuable data about productivity patterns. It's not just a task manager—it's a complete productivity transformation system.",
        rating: 5,
        badge: "Productivity Pro",
        stats: "85% goal completion"
    }
];

export default function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAutoPlaying(false);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsAutoPlaying(false);
    };

    const goToTestimonial = (index: number) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-poppins text-gray-900 mb-6">
                        What Our Users Are Saying
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
                        Join thousands of professionals who have transformed their productivity with UFFICIENT
                    </p>

                    <div className="flex justify-center items-center gap-2 mt-6">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={24} fill="currentColor" />
                            ))}
                        </div>
                        <span className="text-gray-600 font-medium ml-2">4.9/5 from 2,847 reviews</span>
                    </div>
                </motion.div>

                <div className="relative">
                    {/* Main Testimonial Display */}
                    <div className="relative h-96 overflow-hidden rounded-3xl bg-white shadow-xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                className="absolute inset-0 p-8 md:p-12 flex items-center"
                                initial={{ opacity: 0, x: 300 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -300 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="w-full max-w-4xl mx-auto">
                                    <div className="flex flex-col md:flex-row items-center gap-8">
                                        {/* Avatar & Info */}
                                        <div className="flex-shrink-0 text-center">
                                            <div className="relative">
                                                <div className="w-24 h-24 bg-gradient-to-br from-[#6C00FF] to-[#4CD7F8] rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                                                    {testimonials[currentIndex].avatar}
                                                </div>
                                                <div className="absolute -bottom-2 -right-2 bg-[#00D27F] text-white text-xs px-2 py-1 rounded-full font-semibold">
                                                    {testimonials[currentIndex].badge}
                                                </div>
                                            </div>

                                            <h3 className="font-bold text-lg text-gray-900 font-poppins">
                                                {testimonials[currentIndex].name}
                                            </h3>
                                            <p className="text-gray-600 font-medium">
                                                {testimonials[currentIndex].role}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {testimonials[currentIndex].company}
                                            </p>
                                            <div className="mt-2 bg-gradient-to-r from-[#6C00FF] to-[#4CD7F8] text-white text-xs px-3 py-1 rounded-full">
                                                {testimonials[currentIndex].stats}
                                            </div>
                                        </div>

                                        {/* Testimonial Content */}
                                        <div className="flex-1">
                                            <Quote className="text-[#6C00FF] mb-4" size={40} />
                                            <blockquote className="text-lg md:text-xl text-gray-700 font-inter leading-relaxed mb-6">
                                                &ldquo;{testimonials[currentIndex].content}&rdquo;
                                            </blockquote>

                                            <div className="flex text-yellow-400">
                                                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                                    <Star key={i} size={20} fill="currentColor" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevTestimonial}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-10"
                    >
                        <ChevronLeft size={24} className="text-[#6C00FF]" />
                    </button>

                    <button
                        onClick={nextTestimonial}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-10"
                    >
                        <ChevronRight size={24} className="text-[#6C00FF]" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center mt-8 gap-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToTestimonial(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-[#6C00FF] w-8'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Stats Grid */}
                <motion.div
                    className="grid md:grid-cols-4 gap-6 mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center bg-white p-6 rounded-2xl shadow-sm">
                        <div className="text-3xl font-bold text-[#6C00FF] mb-2">2,847</div>
                        <div className="text-gray-600 font-medium">Happy Users</div>
                    </div>
                    <div className="text-center bg-white p-6 rounded-2xl shadow-sm">
                        <div className="text-3xl font-bold text-[#4CD7F8] mb-2">40%</div>
                        <div className="text-gray-600 font-medium">Productivity Increase</div>
                    </div>
                    <div className="text-center bg-white p-6 rounded-2xl shadow-sm">
                        <div className="text-3xl font-bold text-[#00D27F] mb-2">4.9</div>
                        <div className="text-gray-600 font-medium">App Store Rating</div>
                    </div>
                    <div className="text-center bg-white p-6 rounded-2xl shadow-sm">
                        <div className="text-3xl font-bold text-[#FF6B6B] mb-2">125k</div>
                        <div className="text-gray-600 font-medium">Tasks Completed</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
