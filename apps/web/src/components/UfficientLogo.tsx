"use client";
import React from 'react';

interface UfficientLogoProps {
    size?: number;
    className?: string;
}

export default function UfficientLogo({ size = 40, className = "" }: UfficientLogoProps) {
    return (
        <div className={`inline-flex items-center justify-center ${className}`}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-lg"
            >
                {/* Outer Circle with Gradient */}
                <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6C00FF" />
                        <stop offset="50%" stopColor="#8B40FF" />
                        <stop offset="100%" stopColor="#A855F7" />
                    </linearGradient>
                    <filter id="shadow">
                        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#6C00FF" floodOpacity="0.3" />
                    </filter>
                </defs>

                {/* Main Circle Background */}
                <circle
                    cx="100"
                    cy="100"
                    r="95"
                    fill="url(#logoGradient)"
                    filter="url(#shadow)"
                />

                {/* Inner White 'U' Shape */}
                <path
                    d="M60 60 L60 120 Q60 140 80 140 L120 140 Q140 140 140 120 L140 60 L120 60 L120 120 Q120 120 100 120 L80 120 Q80 120 80 100 L80 60 Z"
                    fill="white"
                />

                {/* Dot for 'i' */}
                <circle
                    cx="155"
                    cy="75"
                    r="12"
                    fill="white"
                />

                {/* Stem for 'i' */}
                <rect
                    x="149"
                    y="95"
                    width="12"
                    height="45"
                    rx="6"
                    fill="white"
                />
            </svg>
        </div>
    );
}

// Alternative text-based logo for when we need just text
export function UfficientTextLogo({ className = "" }: { className?: string }) {
    return (
        <div className={`font-montserrat font-bold text-2xl ${className}`}>
            <span className="bg-gradient-to-r from-[#6C00FF] to-[#A855F7] bg-clip-text text-transparent">
                UFFICIENT
            </span>
        </div>
    );
}
