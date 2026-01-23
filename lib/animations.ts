import { Variants } from "framer-motion";

// Standardized animation duration
const DURATION = 0.5;
const EASING: [number, number, number, number] = [0.25, 0.1, 0.25, 1]; // cubic-bezier for smooth feel

// Standard viewport settings for whileInView
export const viewportConfig = {
    once: true,
    margin: "-50px",
    amount: 0.2,
} as const;

// Fade in from bottom (most common scroll animation)
export const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 24,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: DURATION,
            ease: EASING,
        },
    },
};

// Reduced motion version (opacity only)
export const fadeInUpReduced: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: DURATION,
            ease: EASING,
        },
    },
};

// Container for staggered children
export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

// Individual stagger item
export const staggerItem: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: DURATION,
            ease: EASING,
        },
    },
};

// Subtle card hover (use with whileHover)
export const cardHover = {
    scale: 1.02,
    y: -4,
    transition: {
        duration: 0.2,
        ease: EASING,
    },
};

// Helper to get animation props with reduced motion support
export function getAnimationProps(prefersReducedMotion: boolean) {
    return {
        variants: prefersReducedMotion ? fadeInUpReduced : fadeInUp,
        initial: "hidden",
        whileInView: "visible",
        viewport: viewportConfig,
    };
}

// Stagger animation with index-based delay
export function getStaggerDelay(index: number, baseDelay = 0.1) {
    return {
        duration: DURATION,
        delay: index * baseDelay,
        ease: EASING,
    };
}
