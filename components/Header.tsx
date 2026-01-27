"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";
import { CTAButton } from "@/components/primitives";
import Link from "next/link";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
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
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${isScrolled ? "pt-4" : "pt-6"
                    }`}
            >
                {/* Navigation Pill */}
                <nav
                    className={`flex items-center justify-between px-5 md:px-8 py-3 rounded-full transition-all duration-300 w-[92%] max-w-6xl ${isScrolled
                        ? "glass-nav shadow-lg"
                        : "bg-transparent border border-transparent"
                        }`}
                >


                    {/* Logo & Brand */}
                    <Link href="/" className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                        <Logo size="md" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="relative group px-4 py-2"
                            >
                                <span className="relative z-10 text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                                    {link.label}
                                </span>
                                <span className="absolute inset-0 bg-white/5 rounded-full scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out" />
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA Button */}
                    <div className="hidden md:flex items-center gap-4 flex-shrink-0">
                        <a
                            href="https://crm-innotalk.vercel.app/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-gray-300 hover:text-white transition-colors px-2"
                        >
                            Login
                        </a>
                        <CTAButton
                            href="#formulario"
                            variant="primary"
                            size="sm"
                        >
                            Participar do Beta
                        </CTAButton>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors active:scale-95"
                        aria-label="Toggle menu"
                    >
                        <motion.div
                            className="w-5 flex flex-col items-end gap-[5px]"
                        >
                            <motion.span
                                animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                                className="w-full h-[2px] bg-white rounded-full origin-center transition-transform"
                            />
                            <motion.span
                                animate={isMenuOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                                className="w-3/4 h-[2px] bg-white rounded-full transition-all"
                            />
                            <motion.span
                                animate={isMenuOpen ? { rotate: -45, y: -7, width: "100%" } : { rotate: 0, y: 0, width: "50%" }}
                                className="w-1/2 h-[2px] bg-white rounded-full origin-center transition-transform"
                            />
                        </motion.div>
                    </button>
                </nav>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMenuOpen(false)}
                        className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
                    >
                        <motion.div
                            initial={{ y: -50, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: -50, opacity: 0, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="absolute top-24 left-4 right-4 bg-[#0F172A] border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden"
                        >
                            {/* Decorative gradient background for menu */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -z-10" />

                            <nav className="flex flex-col gap-2">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center justify-between p-4 rounded-xl text-gray-200 hover:bg-white/5 active:bg-white/10 transition-colors"
                                    >
                                        <span className="font-medium text-lg">{link.label}</span>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </motion.a>
                                ))}
                                <hr className="border-white/10 my-4" />
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex flex-col gap-3"
                                >
                                    <a
                                        href="https://crm-innotalk.vercel.app/login"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="w-full text-center py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 active:scale-[0.98] transition-all"
                                    >
                                        Login
                                    </a>
                                    <CTAButton
                                        href="#formulario"
                                        variant="primary"
                                        size="md"
                                        fullWidth
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Participar do Beta
                                    </CTAButton>
                                </motion.div>
                            </nav>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
