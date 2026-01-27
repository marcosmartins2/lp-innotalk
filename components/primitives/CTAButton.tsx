import { AnchorHTMLAttributes, ReactNode } from "react";

type CTAVariant = "primary" | "secondary" | "ghost";
type CTASize = "sm" | "md" | "lg";

interface CTAButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children: ReactNode;
    variant?: CTAVariant;
    size?: CTASize;
    fullWidth?: boolean;
}

const variantClasses: Record<CTAVariant, string> = {
    primary: "bg-yellow-400 hover:bg-yellow-300 text-black border border-yellow-300/50 shadow-[0_0_20px_-5px_rgba(250,204,21,0.3)]",
    secondary: "bg-transparent text-white border border-gray-600 hover:border-gray-300 hover:bg-white/5",
    ghost: "text-gray-300 hover:text-white hover:bg-white/5 border-transparent",
};

const sizeClasses: Record<CTASize, string> = {
    sm: "px-5 py-2 text-sm",
    md: "px-8 py-3.5 text-base font-bold",
    lg: "px-10 py-5 text-lg font-bold",
};

export function CTAButton({
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    className = "",
    ...props
}: CTAButtonProps) {
    const baseClasses = "relative overflow-hidden rounded-full transition-all duration-300 inline-flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0";
    const widthClass = fullWidth ? "w-full" : "";

    return (
        <a
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`.trim()}
            {...props}
        >
            <span className="flex items-center gap-2 text-inherit z-10">
                {children}
            </span>
        </a>
    );
}
