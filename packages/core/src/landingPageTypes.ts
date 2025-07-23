// Landing Page Content Management Types
export interface LandingPageConfig {
    hero: HeroConfig;
    features: FeaturesConfig;
    testimonials: TestimonialsConfig;
    referral: ReferralConfig;
    contact: ContactConfig;
    footer: FooterConfig;
    appStore: AppStoreConfig;
    metadata: MetadataConfig;
}

export interface HeroConfig {
    headline: string;
    subheadline: string;
    primaryCTA: {
        text: string;
        link: string;
    };
    secondaryCTA: {
        text: string;
        link: string;
    };
    mockupImages: string[];
}

export interface FeaturesConfig {
    primaryFeatures: FeatureItem[];
    secondaryFeatures: FeatureItem[];
    ctaSection: {
        title: string;
        description: string;
        buttonText: string;
        buttonLink: string;
    };
}

export interface FeatureItem {
    id: string;
    title: string;
    description: string;
    icon: string;
    gradient: string;
}

export interface TestimonialsConfig {
    testimonials: TestimonialItem[];
    autoRotate: boolean;
    rotationInterval: number;
}

export interface TestimonialItem {
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    avatar: string;
    rating: number;
    stats?: {
        label: string;
        value: string;
    };
}

export interface ReferralConfig {
    title: string;
    description: string;
    tiers: ReferralTier[];
    ctaText: string;
    ctaLink: string;
}

export interface ReferralTier {
    id: string;
    invites: number;
    reward: string;
    icon: string;
    description: string;
}

export interface ContactConfig {
    title: string;
    description: string;
    types: ContactType[];
    email: string;
    phone: string;
    address: string;
}

export interface ContactType {
    id: string;
    label: string;
    value: string;
}

export interface FooterConfig {
    logo: {
        text: string;
        showIcon: boolean;
    };
    tagline: string;
    sections: FooterSection[];
    social: SocialLink[];
    legal: {
        copyright: string;
        privacy: string;
        terms: string;
    };
}

export interface FooterSection {
    id: string;
    title: string;
    links: FooterLink[];
}

export interface FooterLink {
    id: string;
    text: string;
    href: string;
    external?: boolean;
}

export interface SocialLink {
    id: string;
    platform: string;
    url: string;
    icon: string;
}

export interface AppStoreConfig {
    appStore: {
        enabled: boolean;
        url: string;
        comingSoon: boolean;
    };
    googlePlay: {
        enabled: boolean;
        url: string;
        comingSoon: boolean;
    };
}

export interface MetadataConfig {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
    twitterCard: string;
}
