import React from 'react';
import { cn } from '@ufficient/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, helperText, icon, ...props }, ref) => {
        const inputClasses = cn(
            "w-full px-3 py-2 border rounded-lg font-inter text-ufficient-gray-900 placeholder-ufficient-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-ufficient-purple focus:border-transparent",
            "transition-colors duration-200",
            error
                ? "border-red-500 focus:ring-red-500"
                : "border-ufficient-gray-300 hover:border-ufficient-gray-400",
            icon && "pl-10",
            className
        );

        return (
            <div className="space-y-1">
                {label && (
                    <label className="block text-sm font-medium text-ufficient-gray-700 font-poppins">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <div className="text-ufficient-gray-400">{icon}</div>
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={inputClasses}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-sm text-red-600 font-inter">{error}</p>
                )}
                {helperText && !error && (
                    <p className="text-sm text-ufficient-gray-500 font-inter">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
