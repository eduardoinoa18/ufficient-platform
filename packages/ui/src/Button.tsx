import React from 'react';
import { cn } from '@ufficient/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
        const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

        const variants = {
            primary: "bg-gradient-to-r from-ufficient-purple to-ufficient-blue text-white hover:shadow-lg hover:shadow-ufficient-purple/25 focus:ring-ufficient-purple",
            secondary: "bg-ufficient-gray-100 text-ufficient-gray-900 hover:bg-ufficient-gray-200 focus:ring-ufficient-gray-500",
            outline: "border-2 border-ufficient-purple text-ufficient-purple hover:bg-ufficient-purple hover:text-white focus:ring-ufficient-purple",
            ghost: "text-ufficient-purple hover:bg-ufficient-purple/10 focus:ring-ufficient-purple",
        };

        const sizes = {
            sm: "px-3 py-1.5 text-sm",
            md: "px-4 py-2 text-base",
            lg: "px-6 py-3 text-lg",
        };

        const isDisabled = disabled || loading;

        return (
            <button
                ref={ref}
                className={cn(
                    baseClasses,
                    variants[variant],
                    sizes[size],
                    isDisabled && "opacity-50 cursor-not-allowed",
                    className
                )}
                disabled={isDisabled}
                {...props}
            >
                {loading && (
                    <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
