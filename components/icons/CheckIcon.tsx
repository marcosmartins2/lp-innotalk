import { SVGProps } from "react";

interface CheckIconProps extends SVGProps<SVGSVGElement> {
    variant?: "default" | "alt";
}

export function CheckIcon({ variant = "default", ...props }: CheckIconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d={variant === "alt" ? "M5 13l4 4L19 7" : "M20 6L9 17L4 12"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
