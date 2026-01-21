"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Hero()
{
    // A11y: Track user's motion preference for reduced animations
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() =>
    {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) =>
        {
            setPrefersReducedMotion(e.matches);
        };
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    // A11y: Reduced animation durations, respects prefers-reduced-motion
    const duration = prefersReducedMotion ? 0 : 0.5;
    const staggerDelay = prefersReducedMotion ? 0 : 0.1;

    return (
        // A11y: Landmark section with aria-labelledby pointing to heading
        <section
            aria-labelledby="hero-heading"
            className="bg-gradient-to-b from-bg-dark via-bg-dark-tertiary to-bg-dark min-h-screen flex items-center justify-center px-md pt-3xl pb-2xl"
        >
            <div className="max-w-5xl xl:max-w-6xl mx-auto text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration }}
                    className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 mb-lg"
                >
                    <span className="text-accent-blue-light font-semibold text-sm">Versão Beta</span>
                    <span className="text-text-muted text-sm" aria-hidden="true">•</span>
                    <span className="text-text-secondary text-sm">Vagas limitadas</span>
                </motion.div>

                {/* A11y: Semantic heading with id for aria-labelledby */}
                {/* Removed <br /> tags - using CSS block display for line breaks */}
                <motion.h1
                    id="hero-heading"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration, delay: staggerDelay }}
                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-lg"
                >
                    <span className="text-text-primary block">Centralize seu</span>
                    <span className="text-accent-blue block">atendimento e agenda</span>
                    <span className="text-text-primary block">diretamente pelo WhatsApp.</span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration, delay: staggerDelay * 2 }}
                    className="text-text-secondary text-lg md:text-xl max-w-3xl xl:max-w-4xl mx-auto mb-2xl leading-relaxed"
                >
                    A InnoTalk conecta seu WhatsApp, CRM e Google Agenda em um único lugar.
                    Organize conversas, leads e agendamentos de forma simples e automática.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration, delay: staggerDelay * 3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-md"
                >
                    {/* Primary CTA */}
                    <a
                        href="#formulario"
                        className="bg-accent-yellow hover:bg-accent-yellow-hover text-black font-semibold px-xl py-md rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-yellow-400/20 flex items-center gap-2 text-base w-full sm:w-auto justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark"
                    >
                        Quero participar do Beta
                        {/* A11y: Decorative SVG hidden from screen readers */}
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                d="M7.5 15L12.5 10L7.5 5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </a>

                    {/* Secondary CTA */}
                    <a
                        href="#como-funciona"
                        className="glass hover:bg-white/10 text-text-primary font-semibold px-xl py-md rounded-full transition-all duration-200 text-base w-full sm:w-auto text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark"
                    >
                        Ver como funciona
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
