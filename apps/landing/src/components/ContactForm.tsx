"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        type: "general"
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const contactTypes = [
        { value: "general", label: "General Inquiry", icon: "💬" },
        { value: "demo", label: "Request Demo", icon: "🚀" },
        { value: "partnership", label: "Partnership", icon: "🤝" },
        { value: "support", label: "Technical Support", icon: "🛠️" },
        { value: "press", label: "Press & Media", icon: "📰" }
    ];

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    timestamp: new Date().toISOString()
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            setSubmitted(true);
            setForm({ name: "", email: "", subject: "", message: "", type: "general" });
        } catch (error) {
            setError("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (submitted) {
        return (
            <section className="py-20 bg-gradient-to-br from-[#6C00FF]/5 to-[#4CD7F8]/5">
                <div className="max-w-2xl mx-auto px-6">
                    <motion.div
                        className="bg-white rounded-3xl p-12 shadow-xl text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <CheckCircle size={64} className="text-[#00D27F] mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-poppins">
                            Message Sent Successfully! 🎉
                        </h2>
                        <p className="text-gray-600 mb-8 font-inter">
                            Thank you for reaching out! Our team will get back to you within 24 hours.
                            In the meantime, feel free to explore our app features.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => setSubmitted(false)}
                                className="px-6 py-3 border-2 border-[#6C00FF] text-[#6C00FF] rounded-xl font-semibold hover:bg-[#6C00FF] hover:text-white transition-all duration-300"
                            >
                                Send Another Message
                            </button>
                            <a
                                href="#download"
                                className="px-6 py-3 bg-[#6C00FF] text-white rounded-xl font-semibold hover:bg-[#4CD7F8] transition-all duration-300"
                            >
                                Download UFFICIENT
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gradient-to-br from-[#6C00FF]/5 to-[#4CD7F8]/5">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-poppins text-gray-900 mb-6">
                        Get in Touch
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto font-inter">
                        Have questions about UFFICIENT? Want to request a demo?
                        We&apos;re here to help you unlock your most efficient self.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-white rounded-3xl shadow-xl overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="grid lg:grid-cols-2">
                        {/* Contact Info */}
                        <div className="bg-gradient-to-br from-[#6C00FF] to-[#4CD7F8] p-8 md:p-12 text-white">
                            <h3 className="text-2xl font-bold mb-6 font-poppins">
                                Let&apos;s Start a Conversation
                            </h3>
                            <p className="mb-8 opacity-90 font-inter">
                                Whether you&apos;re interested in a demo, have questions about features,
                                or want to explore partnership opportunities, we&apos;d love to hear from you.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <Mail size={24} />
                                    <div>
                                        <div className="font-semibold">Email Us</div>
                                        <div className="opacity-80">hello@ufficient.app</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <MessageSquare size={24} />
                                    <div>
                                        <div className="font-semibold">Response Time</div>
                                        <div className="opacity-80">Within 24 hours</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                <div className="text-sm font-semibold mb-2">🚀 Quick Start Options</div>
                                <div className="text-sm opacity-90">
                                    • Request a personalized demo<br />
                                    • Get help with team onboarding<br />
                                    • Explore enterprise features<br />
                                    • Learn about API integrations
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="p-8 md:p-12">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Contact Type Selection */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 font-poppins">
                                        What can we help you with? *
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {contactTypes.map((type) => (
                                            <label
                                                key={type.value}
                                                className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all duration-300 ${form.type === type.value
                                                    ? 'border-[#6C00FF] bg-[#6C00FF]/5 text-[#6C00FF]'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value={type.value}
                                                    checked={form.type === type.value}
                                                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                                                    className="sr-only"
                                                />
                                                <span className="text-lg">{type.icon}</span>
                                                <span className="font-medium text-sm">{type.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Name & Email */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <User size={20} className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#6C00FF] focus:outline-none transition-colors font-inter"
                                            placeholder="Full Name *"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <Mail size={20} className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="email"
                                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#6C00FF] focus:outline-none transition-colors font-inter"
                                            placeholder="Email Address *"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Subject */}
                                <div>
                                    <input
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#6C00FF] focus:outline-none transition-colors font-inter"
                                        placeholder="Subject"
                                        value={form.subject}
                                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <textarea
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#6C00FF] focus:outline-none transition-colors font-inter resize-none"
                                        placeholder="Tell us more about your needs... *"
                                        rows={5}
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        required
                                    />
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl">
                                        <AlertCircle size={20} />
                                        <span className="text-sm">{error}</span>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${isSubmitting
                                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-[#6C00FF] to-[#4CD7F8] text-white hover:shadow-lg hover:scale-105'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            Send Message
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-gray-500 text-center font-inter">
                                    By submitting this form, you agree to our Privacy Policy and Terms of Service.
                                </p>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
