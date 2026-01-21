"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";

export default function Header()
{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    // A11y: Track user's motion preference for reduced animations
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() =>
    {
        // Scroll detection for header style changes
        const handleScroll = () =>
        {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

        // A11y: Detect prefers-reduced-motion preference
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleMotionChange = (e: MediaQueryListEvent) =>
        {
            setPrefersReducedMotion(e.matches);
        };
        mediaQuery.addEventListener("change", handleMotionChange);

        return () =>
        {
            window.removeEventListener("scroll", handleScroll);
            mediaQuery.removeEventListener("change", handleMotionChange);
        };
    }, []);

    // A11y: Close menu on Escape key
    useEffect(() =>
    {
        const handleKeyDown = (e: KeyboardEvent) =>
        {
            if (e.key === "Escape" && isMenuOpen)
            {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isMenuOpen]);

    const navLinks = [
        { href: "#como-funciona", label: "Como Funciona" },
        { href: "#beneficios", label: "Benefícios" },
        { href: "#planos", label: "Planos" },
        { href: "#faq", label: "FAQ" },
    ];

    // A11y: Respect reduced motion in Framer Motion animations
    const animationDuration = prefersReducedMotion ? 0 : 0.3;
    const headerAnimationDuration = prefersReducedMotion ? 0 : 0.6;

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: headerAnimationDuration }}
                className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-300 ${isScrolled ? "top-2" : "top-4"
                    }`}
            >
                {/* A11y: role="navigation" + aria-label for screen readers */}
                <nav
                    role="navigation"
                    aria-label="Navegação principal"
                    className={`flex items-center justify-between px-md md:px-lg py-sm rounded-full transition-all duration-300 ${isScrolled
                        ? "bg-bg-dark/90 backdrop-blur-xl border border-border-subtle shadow-lg shadow-black/20"
                        : "bg-bg-dark/70 backdrop-blur-lg border border-white/5"
                        }`}
                >
                    {/* Logo */}
                    <Logo size="md" />

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                // A11y: Added focus-visible for keyboard navigation
                                className="text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA Button */}
                    <motion.a
                        href="#formulario"
                        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                        // A11y: Added focus-visible for keyboard navigation
                        className="hidden md:inline-flex bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-full transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark"
                    >
                        Participar do Beta
                    </motion.a>

                    {/* Mobile Hamburger Button */}
                    {/* A11y: Complete ARIA attributes for menu toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark"
                    >
                        {/* Hamburger icon with animated transformation */}
                        <motion.span
                            animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                            transition={{ duration: animationDuration }}
                            className="w-5 h-0.5 bg-white mb-1.5 block"
                            aria-hidden="true"
                        />
                        <motion.span
                            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                            transition={{ duration: animationDuration }}
                            className="w-5 h-0.5 bg-white mb-1.5 block"
                            aria-hidden="true"
                        />
                        <motion.span
                            animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                            transition={{ duration: animationDuration }}
                            className="w-5 h-0.5 bg-white block"
                            aria-hidden="true"
                        />
                    </button>
                </nav>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop - closes menu on click */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: animationDuration }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                            aria-hidden="true"
                        />

                        {/* Mobile Menu Sheet */}
                        <motion.div
                            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
                            transition={{ duration: animationDuration }}
                            className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 md:hidden"
                        >
                            <div className="bg-bg-dark-secondary/95 backdrop-blur-xl rounded-2xl border border-border-subtle p-lg shadow-xl">
                                {/* A11y: Mobile nav with proper ARIA attributes */}
                                <nav
                                    id="mobile-menu"
                                    role="navigation"
                                    aria-label="Menu principal"
                                    className="flex flex-col gap-2"
                                >
                                    {navLinks.map((link, index) => (
                                        <motion.a
                                            key={link.href}
                                            href={link.href}
                                            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: prefersReducedMotion ? 0 : index * 0.05, duration: animationDuration }}
                                            onClick={() => setIsMenuOpen(false)}
                                            // A11y: Added focus-visible for keyboard navigation
                                            className="text-gray-300 hover:text-white hover:bg-white/5 px-md py-sm rounded-xl transition-all duration-200 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                                        >
                                            {link.label}
                                        </motion.a>
                                    ))}
                                    <hr className="border-border-subtle my-2" aria-hidden="true" />
                                    <motion.a
                                        href="#formulario"
                                        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: animationDuration }}
                                        onClick={() => setIsMenuOpen(false)}
                                        // A11y: Added focus-visible for keyboard navigation
                                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-md py-sm rounded-xl transition-colors text-base text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2"
                                    >
                                        Participar do Beta
                                    </motion.a>
                                </nav>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
