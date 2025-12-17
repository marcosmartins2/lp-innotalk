"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";

export default function Header()
{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() =>
    {
        const handleScroll = () =>
        {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "#como-funciona", label: "Como Funciona" },
        { href: "#beneficios", label: "Benefícios" },
        { href: "#planos", label: "Planos" },
        { href: "#faq", label: "FAQ" },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-300 ${isScrolled ? "top-2" : "top-4"
                    }`}
            >
                {/* Navigation Pill */}
                <nav
                    className={`flex items-center justify-between px-4 md:px-6 py-3 rounded-full transition-all duration-300 ${isScrolled
                            ? "bg-[#0F172A]/90 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20"
                            : "bg-[#0F172A]/70 backdrop-blur-lg border border-white/5"
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
                                className="text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA Button */}
                    <motion.a
                        href="#formulario"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="hidden md:inline-flex bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-full transition-colors text-sm"
                    >
                        Participar do Beta
                    </motion.a>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                            className="w-5 h-0.5 bg-white mb-1.5 block transition-all"
                        />
                        <motion.span
                            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="w-5 h-0.5 bg-white mb-1.5 block"
                        />
                        <motion.span
                            animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                            className="w-5 h-0.5 bg-white block transition-all"
                        />
                    </button>
                </nav>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                        />

                        {/* Mobile Menu Sheet */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 md:hidden"
                        >
                            <div className="bg-[#1E293B]/95 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-xl">
                                <nav className="flex flex-col gap-2">
                                    {navLinks.map((link, index) => (
                                        <motion.a
                                            key={link.href}
                                            href={link.href}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-all duration-200 text-base font-medium"
                                        >
                                            {link.label}
                                        </motion.a>
                                    ))}
                                    <hr className="border-white/10 my-2" />
                                    <motion.a
                                        href="#formulario"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-3 rounded-xl transition-colors text-base text-center"
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
