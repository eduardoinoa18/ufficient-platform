import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

// Button component types
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: ReactNode;
    isLoading?: boolean;
}

// Input component types
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

// Card component types
export interface CardProps {
    children: ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}

export interface CardTitleProps {
    children: ReactNode;
    className?: string;
}

export interface CardContentProps {
    children: ReactNode;
    className?: string;
}

// Container component types
export interface ContainerProps {
    children: ReactNode;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    className?: string;
}

export interface SectionProps {
    children: ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}
