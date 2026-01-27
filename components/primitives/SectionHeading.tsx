import { ReactNode } from "react";

type HighlightColor = "blue" | "yellow";

interface SectionHeadingProps {
    children: ReactNode;
    highlight?: ReactNode;
    highlightColor?: HighlightColor;
    subtitle?: string;
    className?: string;
}

const highlightClasses: Record<HighlightColor, string> = {
    blue: "text-blue-500",
    yellow: "text-yellow-400",
};

/**
 * SectionHeading - Consistent section title styling
 *
 * Extracted from:
 * - FeaturesFlow.tsx:92-99 (white + blue highlight, with subtitle)
 * - Benefits.tsx:97-101 (white + blue highlight, no subtitle)
 * - HowToStart.tsx:31-34 (white + blue highlight)
 * - FAQ.tsx:55-61 (white + blue highlight, with subtitle)
 * - Security.tsx:49-53 (white + blue highlight)
 * - FinalCTA.tsx:19-22 (white + yellow highlight)
 */
export function SectionHeading({
    children,
    highlight,
    highlightColor = "blue",
    subtitle,
    className = "",
}: SectionHeadingProps) {
    return (
        <div className={`text-center mb-12 ${className}`.trim()}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                <span className="text-white">{children}</span>
                {highlight && (
                    <>
                        {" "}
                        <span className={highlightClasses[highlightColor]}>{highlight}</span>
                    </>
                )}
            </h2>
            {subtitle && (
                <p className="text-gray-400 text-lg leading-relaxed">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
