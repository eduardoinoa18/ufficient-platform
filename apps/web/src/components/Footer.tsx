import { Twitter, Instagram, Linkedin, Github, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { name: "Features", href: "#features" },
            { name: "Pricing", href: "#pricing" },
            { name: "Download", href: "#download" },
            { name: "Integrations", href: "#integrations" },
            { name: "API", href: "/api-docs" }
        ],
        company: [
            { name: "About Us", href: "/about" },
            { name: "Blog", href: "/blog" },
            { name: "Careers", href: "/careers" },
            { name: "Contact", href: "#contact" },
            { name: "Press Kit", href: "/press" }
        ],
        resources: [
            { name: "Help Center", href: "/help" },
            { name: "Community", href: "/community" },
            { name: "Tutorials", href: "/tutorials" },
            { name: "Productivity Tips", href: "/tips" },
            { name: "Case Studies", href: "/case-studies" }
        ],
        legal: [
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
            { name: "Cookie Policy", href: "/cookies" },
            { name: "GDPR", href: "/gdpr" },
            { name: "Security", href: "/security" }
        ]
    };

    const socialLinks = [
        { name: "Twitter", icon: Twitter, href: "https://twitter.com/ufficient", color: "hover:text-blue-400" },
        { name: "Instagram", icon: Instagram, href: "https://instagram.com/ufficient", color: "hover:text-pink-400" },
        { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/ufficient", color: "hover:text-blue-600" },
        { name: "GitHub", icon: Github, href: "https://github.com/ufficient", color: "hover:text-gray-400" }
    ];

    return (
        <footer className="bg-[#29006E] text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-6 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h3 className="text-3xl font-bold font-montserrat mb-4">
                                <span className="bg-gradient-to-r from-[#4CD7F8] to-[#00D27F] bg-clip-text text-transparent">
                                    UFFICIENT
                                </span>
                            </h3>
                            <p className="text-gray-300 font-inter leading-relaxed">
                                Unlock your most efficient self with AI-powered task management,
                                gamified productivity, and social accountability. Join thousands
                                of professionals achieving their goals.
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4 mb-6">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-3 bg-white/10 rounded-xl ${social.color} transition-all duration-300 hover:bg-white/20 hover:scale-110`}
                                    aria-label={social.name}
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>

                        {/* Newsletter Signup */}
                        <div>
                            <h4 className="font-semibold mb-3 font-poppins">Stay Updated</h4>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-[#4CD7F8] transition-colors"
                                />
                                <button className="px-4 py-2 bg-[#4CD7F8] text-white rounded-lg hover:bg-[#00D27F] transition-colors">
                                    <Mail size={20} />
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">
                                Get productivity tips and product updates weekly
                            </p>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 font-poppins">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-300 hover:text-[#4CD7F8] transition-colors font-inter flex items-center gap-1 group"
                                    >
                                        {link.name}
                                        {link.href.startsWith('http') && (
                                            <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 font-poppins">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-300 hover:text-[#4CD7F8] transition-colors font-inter"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 font-poppins">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-300 hover:text-[#4CD7F8] transition-colors font-inter"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 font-poppins">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-300 hover:text-[#4CD7F8] transition-colors font-inter"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Hidden Admin Link */}
                        <div className="mt-6 pt-4 border-t border-white/10">
                            <a
                                href="/admin"
                                className="text-xs text-gray-500 hover:text-gray-400 transition-colors"
                            >
                                Admin Portal
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                            <span>© {currentYear} UFFICIENT. All rights reserved.</span>
                            <span className="hidden md:block">•</span>
                            <span className="flex items-center gap-2">
                                Made with ❤️ for productivity enthusiasts
                            </span>
                        </div>

                        <div className="flex items-center gap-6 text-sm">
                            <a href="/status" className="text-gray-400 hover:text-[#00D27F] transition-colors flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#00D27F] rounded-full animate-pulse"></span>
                                All systems operational
                            </a>

                            <div className="flex items-center gap-2 text-gray-400">
                                <span>v1.0.0</span>
                                <span>•</span>
                                <span>Build 2025.1</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
