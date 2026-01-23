import { AnchorHTMLAttributes, ReactNode } from "react";

type CTAVariant = "primary" | "secondary";
type CTASize = "sm" | "md" | "lg";

interface CTAButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children: ReactNode;
    variant?: CTAVariant;
    size?: CTASize;
    fullWidth?: boolean;
}

const variantClasses: Record<CTAVariant, string> = {
    primary: "bg-yellow-400 hover:bg-yellow-500 text-black hover:shadow-lg hover:shadow-yellow-400/20",
    secondary: "glass hover:bg-white/10 text-white",
};

const sizeClasses: Record<CTASize, string> = {
    sm: "px-5 py-2 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg",
};

/**
 * CTAButton - Primary call-to-action button
 *
 * Extracted from:
 * - Hero.tsx:55-61 (primary, md)
 * - Hero.tsx:62-67 (secondary, md)
 * - Header.tsx:66 (primary, sm)
 * - HowToStart.tsx:94-102 (primary, md)
 * - FinalCTA.tsx:28-37 (primary, md)
 */
export function CTAButton({
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    className = "",
    ...props
}: CTAButtonProps) {
    const baseClasses = "font-semibold rounded-full transition-all duration-200 inline-flex items-center justify-center gap-2";
    const widthClass = fullWidth ? "w-full" : "";

    return (
        <a
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`.trim()}
            {...props}
        >
            {children}
        </a>
    );
}
