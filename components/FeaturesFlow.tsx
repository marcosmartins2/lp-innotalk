"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronIcon } from "@/components/icons";

const features = [
    {
        id: "01",
        title: "WhatsApp (Entrada)",
        description: "Nova mensagem recebida",
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        id: "02",
        title: "Organização (InnoTalk)",
        description: "Lead e conversa registrados automaticamente",
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
            </svg>
        ),
    },
    {
        id: "03",
        title: "Agenda (Google Calendar)",
        description: "Agendamentos sincronizados com o Google",
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: "04",
        title: "Dashboard (Gestão)",
        description: "Acompanhe métricas e resultados em tempo real",
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
];

export default function FeaturesFlow() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-play logic
    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % features.length);
        }, 5000); // 5 seconds per slide for better readability

        return () => clearInterval(interval);
    }, [isHovered]);

    const handleNext = useCallback(() => {
        setActiveIndex((current) => (current + 1) % features.length);
    }, []);

    const handlePrev = useCallback(() => {
        setActiveIndex((current) => (current - 1 + features.length) % features.length);
    }, []);

    return (
        <section id="como-funciona" className="bg-bg-dark py-20 px-6 scroll-mt-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                        <span className="text-white">Veja como a InnoTalk </span>
                        <span className="text-blue-500">conecta tudo</span>
                        <span className="text-white"> pra você.</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
                        Do WhatsApp ao agendamento confirmado — tudo em um fluxo automatizado e integrado.
                    </p>
                </div>

                {/* Mobile: Infinite Carousel with Arrows */}
                <div
                    className="md:hidden relative px-4"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Carousel Container */}
                    <div className="relative h-[320px] w-full flex items-center justify-center pt-10"> {/* Added padding top for badge */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="absolute w-full max-w-[320px]"
                            >
                                <div className="relative glass-card rounded-2xl p-8 border border-blue-500/30 shadow-2xl bg-[#0f141e]">
                                    {/* Badge number - Positioned ABOVE card */}
                                    <div className="absolute -top-4 right-6 z-10">
                                        <div className="bg-blue-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg border border-blue-400/50">
                                            {features[activeIndex].id}
                                        </div>
                                    </div>

                                    {/* Icon */}
                                    <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 text-blue-500">
                                        {features[activeIndex].icon}
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-white font-semibold text-xl mb-3">
                                        {features[activeIndex].title}
                                    </h3>
                                    <p className="text-gray-400 text-base leading-relaxed">
                                        {features[activeIndex].description}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between pointer-events-none px-0 z-20">
                        <button
                            onClick={handlePrev}
                            className="pointer-events-auto w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-blue-500 transition-all active:scale-95 -ml-2"
                            aria-label="Previous slide"
                        >
                            <ChevronIcon className="w-6 h-6 rotate-90" />
                        </button>

                        <button
                            onClick={handleNext}
                            className="pointer-events-auto w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-blue-500 transition-all active:scale-95 -mr-2"
                            aria-label="Next slide"
                        >
                            <ChevronIcon className="w-6 h-6 -rotate-90" />
                        </button>
                    </div>
                </div>

                {/* Desktop Grid (Unchanged) */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-12">
                    {features.map((feature, index) => (
                        <div
                            key={feature.id}
                            className={`relative glass-card rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5 ${index === activeIndex
                                ? "border-blue-500/50 shadow-lg shadow-blue-500/10 scale-105 bg-[#0f141e]"
                                : ""
                                }`}
                            onClick={() => setActiveIndex(index)}
                        >
                            {/* Badge number */}
                            <div className="absolute -top-3 right-6">
                                <div className={`${index === activeIndex ? "bg-blue-500" : "bg-gray-700"} text-white text-xs font-bold px-3 py-1 rounded-full border border-black/20`}>
                                    {feature.id}
                                </div>
                            </div>

                            {/* Icon - Monochromatic Blue */}
                            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4 text-blue-500">
                                {feature.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-white font-semibold text-lg mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
