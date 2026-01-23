import { HTMLAttributes, ReactNode } from "react";

type CardPadding = "sm" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    padding?: CardPadding;
    hover?: boolean;
    hoverShadow?: boolean;
}

const paddingClasses: Record<CardPadding, string> = {
    sm: "p-5",
    md: "p-6",
    lg: "p-8",
};

/**
 * Card - Glass-morphism card container
 *
 * Extracted from:
 * - FeaturesFlow.tsx:111-114 (md padding, no hover)
 * - FeaturesFlow.tsx:144 (md padding, with hover)
 * - Benefits.tsx:118 (md padding, with hover)
 * - Benefits.tsx:160 (lg padding, with hover + shadow)
 * - HowToStart.tsx:70 (sm padding, with hover)
 * - FAQ.tsx:60 (custom, with hover)
 */
export function Card({
    children,
    padding = "md",
    hover = false,
    hoverShadow = false,
    className = "",
    ...props
}: CardProps) {
    const baseClasses = "glass-card rounded-2xl transition-all duration-300";
    const hoverClasses = hover ? "hover:bg-white/[0.06]" : "";
    const shadowClasses = hoverShadow ? "hover:shadow-lg hover:shadow-blue-500/5" : "";

    return (
        <div
            className={`${baseClasses} ${paddingClasses[padding]} ${hoverClasses} ${shadowClasses} ${className}`.trim()}
            {...props}
        >
            {children}
        </div>
    );
}
