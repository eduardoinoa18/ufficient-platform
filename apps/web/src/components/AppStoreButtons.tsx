"use client";
import React from 'react';

interface AppStoreButtonProps {
    href?: string;
    className?: string;
    onClick?: () => void;
}

export function AppleStoreButton({ href = "#", className = "", onClick }: AppStoreButtonProps) {
    const handleClick = (e: React.MouseEvent) => {
        if (onClick) {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <a
            href={href}
            className={`inline-block ${className}`}
            onClick={handleClick}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="bg-black hover:bg-gray-800 transition-colors duration-200 rounded-lg px-4 py-2 flex items-center space-x-3 min-w-[200px]">
                {/* Apple Logo */}
                <svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.8584 17.7266C22.8359 14.5859 25.2109 12.9609 25.3184 12.8906C23.9434 10.9297 21.8809 10.6172 21.1559 10.5937C19.2949 10.3984 17.4902 11.7109 16.5527 11.7109C15.5918 11.7109 14.0449 10.6172 12.4746 10.6484C10.4824 10.6797 8.62891 11.8437 7.58203 13.6641C5.41016 17.3984 7.03516 22.8281 9.13281 25.7969C10.1641 27.2344 11.3516 28.8281 12.9219 28.7734C14.4688 28.7109 15.0684 27.7969 16.9062 27.7969C18.7207 27.7969 19.2969 28.7734 20.8906 28.7422C22.5371 28.7109 23.5684 27.3047 24.5762 25.8516C25.7637 24.1797 26.2793 22.5391 26.3027 22.4453C26.2715 22.4375 22.8809 21.0859 22.8584 17.7266ZM19.1543 8.59375C19.9902 7.5625 20.5664 6.14062 20.4121 4.6875C19.1777 4.75 17.6543 5.54688 16.7871 6.5625C16.0156 7.45312 15.3223 8.91406 15.5 10.2969C16.8828 10.3906 18.2891 9.59375 19.1543 8.59375Z" fill="white" />
                </svg>

                <div className="text-white">
                    <div className="text-xs leading-tight">Download on the</div>
                    <div className="text-lg font-semibold leading-tight">App Store</div>
                </div>
            </div>
        </a>
    );
}

export function GooglePlayButton({ href = "#", className = "", onClick }: AppStoreButtonProps) {
    const handleClick = (e: React.MouseEvent) => {
        if (onClick) {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <a
            href={href}
            className={`inline-block ${className}`}
            onClick={handleClick}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="bg-black hover:bg-gray-800 transition-colors duration-200 rounded-lg px-4 py-2 flex items-center space-x-3 min-w-[200px]">
                {/* Google Play Logo */}
                <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 1.83333C1.5 1.36111 1.59722 0.930556 1.79167 0.541667L14.4167 13.1667L1.79167 25.7917C1.59722 25.4028 1.5 24.9722 1.5 24.5V1.83333Z" fill="#32BBFF" />
                    <path d="M19.4583 9.125L15.4583 13.125L2.83333 0.5C3.63889 0.0277778 4.61111 -0.0694444 5.58333 0.375L19.4583 9.125Z" fill="#32BBFF" />
                    <path d="M19.4583 17.2083L5.58333 25.9583C4.61111 26.4028 3.63889 26.3056 2.83333 25.8333L15.4583 13.2083L19.4583 17.2083Z" fill="#32BBFF" />
                    <path d="M26.0833 11.5417C26.75 11.9167 26.75 12.9167 26.0833 13.2917L22.4583 15.2917L18.0833 13.2083L22.4583 11.125L26.0833 11.5417Z" fill="#32BBFF" />
                </svg>

                <div className="text-white">
                    <div className="text-xs leading-tight">GET IT ON</div>
                    <div className="text-lg font-semibold leading-tight">Google Play</div>
                </div>
            </div>
        </a>
    );
}
