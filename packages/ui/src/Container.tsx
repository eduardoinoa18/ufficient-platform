import React from 'react';
import { cn } from '@ufficient/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    center?: boolean;
    children: React.ReactNode;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
    ({ className, size = 'lg', center = true, children, ...props }, ref) => {
        const sizes = {
            sm: "max-w-sm",
            md: "max-w-md",
            lg: "max-w-4xl",
            xl: "max-w-6xl",
            full: "max-w-full",
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "w-full px-4 sm:px-6 lg:px-8",
                    sizes[size],
                    center && "mx-auto",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Container.displayName = "Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    variant?: 'default' | 'gradient' | 'dark';
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    children: React.ReactNode;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
    ({ className, variant = 'default', padding = 'lg', children, ...props }, ref) => {
        const variants = {
            default: "bg-white",
            gradient: "bg-gradient-to-br from-ufficient-purple to-ufficient-blue text-white",
            dark: "bg-ufficient-gray-900 text-white",
        };

        const paddings = {
            none: "",
            sm: "py-8",
            md: "py-12",
            lg: "py-16",
            xl: "py-24",
        };

        return (
            <section
                ref={ref}
                className={cn(
                    variants[variant],
                    paddings[padding],
                    className
                )}
                {...props}
            >
                {children}
            </section>
        );
    }
);

Section.displayName = "Section";
