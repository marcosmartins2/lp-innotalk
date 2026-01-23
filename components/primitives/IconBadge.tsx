import { HTMLAttributes, ReactNode } from "react";

type IconBadgeSize = "xs" | "sm" | "md" | "lg";
type IconBadgeVariant = "translucent" | "solid";
type IconBadgeShape = "rounded" | "circle";

interface IconBadgeProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    size?: IconBadgeSize;
    variant?: IconBadgeVariant;
    shape?: IconBadgeShape;
    centered?: boolean;
}

const sizeClasses: Record<IconBadgeSize, string> = {
    xs: "w-6 h-6",
    sm: "w-14 h-14",
    md: "w-16 h-16",
    lg: "w-20 h-20",
};

const variantClasses: Record<IconBadgeVariant, string> = {
    translucent: "bg-blue-500/10 text-blue-500",
    solid: "bg-blue-500 text-white shadow-lg shadow-blue-500/20",
};

const shapeClasses: Record<IconBadgeShape, string> = {
    rounded: "rounded-2xl",
    circle: "rounded-full",
};

/**
 * IconBadge - Container for icons with consistent styling
 *
 * Extracted from:
 * - FeaturesFlow.tsx:124 (lg, translucent, rounded)
 * - Benefits.tsx:121 (sm, translucent, rounded - mobile)
 * - Benefits.tsx:163 (md, translucent, rounded - desktop)
 * - Security.tsx:44,69 (md, translucent, rounded)
 * - HowToStart.tsx:50 (solid, circle - number badge)
 * - HowToStart.tsx:59 (xs, translucent, circle - check badge)
 */
export function IconBadge({
    children,
    size = "md",
    variant = "translucent",
    shape = "rounded",
    centered = false,
    className = "",
    ...props
}: IconBadgeProps) {
    const baseClasses = "flex items-center justify-center";
    const centerClass = centered ? "mx-auto" : "";

    return (
        <div
            className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${shapeClasses[shape]} ${centerClass} ${className}`.trim()}
            {...props}
        >
            {children}
        </div>
    );
}
