"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Settings,
    Globe,
    Save,
    RotateCcw,
    Eye,
    Edit3,
    Plus,
    Trash2,
    Upload,
    Link,
    Type,
    Image,
    Star,
    Users,
    MessageSquare,
    Smartphone,
    ExternalLink
} from "lucide-react";

interface LandingPageManagerProps {
    // Initial config would be loaded from API
}

export default function LandingPageManager() {
    const [activeTab, setActiveTab] = useState('hero');
    const [config, setConfig] = useState<any>(null);
    const [hasChanges, setHasChanges] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load current config from API
        loadLandingPageConfig();
    }, []);

    const loadLandingPageConfig = async () => {
        try {
            // In real implementation, this would fetch from API
            const response = await fetch('/api/admin/landing-page');
            const data = await response.json();
            setConfig(data);
        } catch (error) {
            console.error('Failed to load config:', error);
            // Use default config for now
            setConfig(getDefaultConfig());
        } finally {
            setLoading(false);
        }
    };

    const getDefaultConfig = () => ({
        hero: {
            headline: "Unlock Your Most Efficient Self",
            subheadline: "The all-in-one productivity platform that combines AI-powered task management, gamification, and CRM integration to help you achieve your goals faster than ever.",
            primaryCTA: { text: "Start Your Journey", link: "#download" },
            secondaryCTA: { text: "Watch Demo", link: "#demo" },
            mockupImages: ["/images/mockups/dashboard-mockup.png"]
        },
        appStore: {
            appStore: { enabled: true, url: "https://apps.apple.com/app/ufficient", comingSoon: true },
            googlePlay: { enabled: true, url: "https://play.google.com/store/apps/details?id=com.ufficient.app", comingSoon: true }
        },
        contact: {
            email: "hello@ufficient.app",
            phone: "+1 (555) 123-4567",
            address: "123 Innovation Drive, Tech Valley, CA 94025"
        },
        social: {
            twitter: "https://twitter.com/ufficient",
            linkedin: "https://linkedin.com/company/ufficient",
            github: "https://github.com/ufficient",
            discord: "https://discord.gg/ufficient"
        }
    });

    const saveConfig = async () => {
        try {
            setLoading(true);
            // In real implementation, this would save to API
            await fetch('/api/admin/landing-page', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
            setHasChanges(false);
            alert('Configuration saved successfully!');
        } catch (error) {
            console.error('Failed to save config:', error);
            alert('Failed to save configuration. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const resetConfig = () => {
        if (confirm('Are you sure you want to reset all changes?')) {
            loadLandingPageConfig();
            setHasChanges(false);
        }
    };

    const updateConfig = (section: string, field: string, value: any) => {
        setConfig((prev: any) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
        setHasChanges(true);
    };

    const tabs = [
        { id: 'hero', label: 'Hero Section', icon: Globe },
        { id: 'appstore', label: 'App Store', icon: Smartphone },
        { id: 'contact', label: 'Contact Info', icon: MessageSquare },
        { id: 'social', label: 'Social Links', icon: Users },
        { id: 'mockups', label: 'App Mockups', icon: Image },
        { id: 'seo', label: 'SEO & Meta', icon: Type },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <Globe className="h-8 w-8 text-purple-600" />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Landing Page Manager</h1>
                                <p className="text-sm text-gray-500">Manage your landing page content and settings</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {hasChanges && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    Unsaved changes
                                </span>
                            )}
                            <button
                                onClick={() => setPreviewMode(!previewMode)}
                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <Eye className="h-4 w-4 mr-2" />
                                {previewMode ? 'Edit Mode' : 'Preview'}
                            </button>
                            <button
                                onClick={resetConfig}
                                disabled={!hasChanges}
                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Reset
                            </button>
                            <button
                                onClick={saveConfig}
                                disabled={!hasChanges || loading}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                            >
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex">
                    {/* Sidebar */}
                    <div className="w-64 mr-8">
                        <nav className="space-y-2">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === tab.id
                                                ? 'bg-purple-100 text-purple-700'
                                                : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Icon className="h-5 w-5 mr-3" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>

                        {/* Quick Preview Link */}
                        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                            <h3 className="text-sm font-medium text-blue-900 mb-2">Quick Preview</h3>
                            <a
                                href="http://localhost:3000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm text-blue-700 hover:text-blue-900"
                            >
                                <ExternalLink className="h-4 w-4 mr-1" />
                                View Live Site
                            </a>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-lg shadow p-6"
                        >
                            {renderTabContent()}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );

    function renderTabContent() {
        if (!config) return null;

        switch (activeTab) {
            case 'hero':
                return <HeroSection config={config.hero} updateConfig={updateConfig} />;
            case 'appstore':
                return <AppStoreSection config={config.appStore} updateConfig={updateConfig} />;
            case 'contact':
                return <ContactSection config={config.contact} updateConfig={updateConfig} />;
            case 'social':
                return <SocialSection config={config.social} updateConfig={updateConfig} />;
            case 'mockups':
                return <MockupsSection config={config.hero} updateConfig={updateConfig} />;
            case 'seo':
                return <SEOSection config={config.metadata || {}} updateConfig={updateConfig} />;
            default:
                return <div>Section not found</div>;
        }
    }
}

// Hero Section Component
function HeroSection({ config, updateConfig }: any) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Hero Section</h2>
                <p className="text-gray-600 mb-6">Configure the main hero section of your landing page.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
                    <input
                        type="text"
                        value={config?.headline || ''}
                        onChange={(e) => updateConfig('hero', 'headline', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter main headline"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subheadline</label>
                    <textarea
                        value={config?.subheadline || ''}
                        onChange={(e) => updateConfig('hero', 'subheadline', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter subheadline text"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Primary CTA Text</label>
                        <input
                            type="text"
                            value={config?.primaryCTA?.text || ''}
                            onChange={(e) => updateConfig('hero', 'primaryCTA', { ...config.primaryCTA, text: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Start Your Journey"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Primary CTA Link</label>
                        <input
                            type="text"
                            value={config?.primaryCTA?.link || ''}
                            onChange={(e) => updateConfig('hero', 'primaryCTA', { ...config.primaryCTA, link: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="#download"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Secondary CTA Text</label>
                        <input
                            type="text"
                            value={config?.secondaryCTA?.text || ''}
                            onChange={(e) => updateConfig('hero', 'secondaryCTA', { ...config.secondaryCTA, text: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Watch Demo"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Secondary CTA Link</label>
                        <input
                            type="text"
                            value={config?.secondaryCTA?.link || ''}
                            onChange={(e) => updateConfig('hero', 'secondaryCTA', { ...config.secondaryCTA, link: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="#demo"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// App Store Section Component
function AppStoreSection({ config, updateConfig }: any) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">App Store Links</h2>
                <p className="text-gray-600 mb-6">Configure app store download links and availability.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Apple App Store */}
                <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                        <Smartphone className="h-5 w-5 text-gray-600 mr-2" />
                        <h3 className="text-lg font-medium text-gray-900">Apple App Store</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={config?.appStore?.enabled || false}
                                onChange={(e) => updateConfig('appStore', 'appStore', { ...config.appStore, enabled: e.target.checked })}
                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 text-sm text-gray-700">Enable App Store Button</label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">App Store URL</label>
                            <input
                                type="url"
                                value={config?.appStore?.url || ''}
                                onChange={(e) => updateConfig('appStore', 'appStore', { ...config.appStore, url: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="https://apps.apple.com/app/ufficient"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={config?.appStore?.comingSoon || false}
                                onChange={(e) => updateConfig('appStore', 'appStore', { ...config.appStore, comingSoon: e.target.checked })}
                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 text-sm text-gray-700">Show "Coming Soon" instead of link</label>
                        </div>
                    </div>
                </div>

                {/* Google Play Store */}
                <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                        <Smartphone className="h-5 w-5 text-gray-600 mr-2" />
                        <h3 className="text-lg font-medium text-gray-900">Google Play Store</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={config?.googlePlay?.enabled || false}
                                onChange={(e) => updateConfig('appStore', 'googlePlay', { ...config.googlePlay, enabled: e.target.checked })}
                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 text-sm text-gray-700">Enable Google Play Button</label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Google Play URL</label>
                            <input
                                type="url"
                                value={config?.googlePlay?.url || ''}
                                onChange={(e) => updateConfig('appStore', 'googlePlay', { ...config.googlePlay, url: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="https://play.google.com/store/apps/details?id=com.ufficient.app"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={config?.googlePlay?.comingSoon || false}
                                onChange={(e) => updateConfig('appStore', 'googlePlay', { ...config.googlePlay, comingSoon: e.target.checked })}
                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 text-sm text-gray-700">Show "Coming Soon" instead of link</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Contact Section Component
function ContactSection({ config, updateConfig }: any) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-600 mb-6">Configure contact details displayed on your landing page.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                        type="email"
                        value={config?.email || ''}
                        onChange={(e) => updateConfig('contact', 'email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="hello@ufficient.app"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                        type="tel"
                        value={config?.phone || ''}
                        onChange={(e) => updateConfig('contact', 'phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="+1 (555) 123-4567"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                    <textarea
                        value={config?.address || ''}
                        onChange={(e) => updateConfig('contact', 'address', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="123 Innovation Drive, Tech Valley, CA 94025"
                    />
                </div>
            </div>
        </div>
    );
}

// Social Section Component
function SocialSection({ config, updateConfig }: any) {
    const socialPlatforms = [
        { key: 'twitter', label: 'Twitter', placeholder: 'https://twitter.com/ufficient' },
        { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/company/ufficient' },
        { key: 'github', label: 'GitHub', placeholder: 'https://github.com/ufficient' },
        { key: 'discord', label: 'Discord', placeholder: 'https://discord.gg/ufficient' },
        { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/ufficient' },
        { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/ufficient' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Social Media Links</h2>
                <p className="text-gray-600 mb-6">Configure social media profiles and links.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {socialPlatforms.map((platform) => (
                    <div key={platform.key}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{platform.label}</label>
                        <input
                            type="url"
                            value={config?.[platform.key] || ''}
                            onChange={(e) => updateConfig('social', platform.key, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder={platform.placeholder}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

// Mockups Section Component
function MockupsSection({ config, updateConfig }: any) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">App Mockups</h2>
                <p className="text-gray-600 mb-6">Manage mockup images displayed in the hero section.</p>
            </div>

            <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Drop mockup images here or click to upload</p>
                    <button className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200">
                        Choose Files
                    </button>
                </div>

                <div className="text-sm text-gray-500">
                    <p>Recommended specifications:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Format: PNG or JPG</li>
                        <li>Size: 1200x800px minimum</li>
                        <li>Background: Transparent or white</li>
                        <li>File size: Max 2MB per image</li>
                    </ul>
                </div>

                {/* Current mockups */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    {(config?.mockupImages || []).map((image: string, index: number) => (
                        <div key={index} className="relative group border border-gray-200 rounded-lg p-2">
                            <img
                                src={image}
                                alt={`Mockup ${index + 1}`}
                                className="w-full h-32 object-cover rounded"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/images/placeholder-mockup.png';
                                }}
                            />
                            <button
                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => {
                                    const newImages = config.mockupImages.filter((_: any, i: number) => i !== index);
                                    updateConfig('hero', 'mockupImages', newImages);
                                }}
                            >
                                <Trash2 className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// SEO Section Component
function SEOSection({ config, updateConfig }: any) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">SEO & Meta Tags</h2>
                <p className="text-gray-600 mb-6">Configure SEO settings and meta tags for better search visibility.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                    <input
                        type="text"
                        value={config?.title || ''}
                        onChange={(e) => updateConfig('metadata', 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="UFFICIENT - Unlock Your Most Efficient Self"
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                    <textarea
                        value={config?.description || ''}
                        onChange={(e) => updateConfig('metadata', 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="The all-in-one productivity platform that combines AI-powered task management, gamification, and CRM integration."
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                    <input
                        type="text"
                        value={config?.keywords?.join(', ') || ''}
                        onChange={(e) => updateConfig('metadata', 'keywords', e.target.value.split(',').map((k: string) => k.trim()))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="productivity, task management, AI, gamification, CRM, efficiency"
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Open Graph Image URL</label>
                    <input
                        type="url"
                        value={config?.ogImage || ''}
                        onChange={(e) => updateConfig('metadata', 'ogImage', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="/images/og-image.png"
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended: 1200x630px</p>
                </div>
            </div>
        </div>
    );
}
