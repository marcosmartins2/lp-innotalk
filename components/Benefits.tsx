"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { fadeInUp, viewportConfig, cardHover, getStaggerDelay } from "@/lib/animations";

export default function Benefits() {
    const benefits = [
        {
            title: "WhatsApp Conectado",
            description: "Todos os atendimentos organizados em um só lugar.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            title: "CRM Completo",
            description: "Cadastre, categorize e acompanhe seus leads facilmente.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 13C10.4295 13.5741 10.9774 14.0492 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59698 21.9548 8.33397 21.9434 7.02299C21.932 5.71201 21.4061 4.45794 20.4791 3.5309C19.5521 2.60386 18.298 2.07802 16.987 2.06663C15.676 2.05523 14.413 2.55921 13.47 3.47L11.75 5.18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 11C13.5705 10.4259 13.0226 9.9508 12.3934 9.60706C11.7642 9.26331 11.0685 9.05889 10.3533 9.00767C9.63819 8.95645 8.92037 9.05965 8.24861 9.31023C7.57685 9.5608 6.96684 9.95303 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.666 2.05659 16.977C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.4479 21.3961 5.70197 21.922 7.01295 21.9334C8.32393 21.9448 9.58694 21.4408 10.53 20.53L12.24 18.82" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            title: "Agenda Integrada",
            description: "Sincronize com o Google Calendar e nunca perca um horário.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            title: "Dashboard de Resultados",
            description: "Visualize métricas de atendimento e produtividade.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 20V10M12 20V4M6 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            title: "Configuração Rápida",
            description: "Em poucos minutos sua operação está rodando.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            title: "Controle de Ganhos e Perdas",
            description: "Acompanha negociações fechadas, em andamento e perdidas, com visão clara de receita.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 12 14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
    ];

    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleScroll = () => {
        if (scrollRef.current && isMobile) {
            const scrollLeft = scrollRef.current.scrollLeft;
            const cardWidth = scrollRef.current.offsetWidth * 0.75;
            const newIndex = Math.round(scrollLeft / cardWidth);
            setActiveIndex(Math.min(newIndex, benefits.length - 1));
        }
    };

    return (
        <section id="beneficios" className="bg-bg-default py-24 px-6 relative overflow-hidden">
            {/* Background glow for section */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                        <span className="text-white">Por que usar a </span>
                        <span className="text-gradient-blue">InnoTalk</span>
                        <span className="text-white">?</span>
                    </h2>
                    <p className="text-slate-400 text-lg">Tudo o que você precisa para escalar seu atendimento.</p>
                </div>

                {/* Mobile: Vertical Stack (Improved from Horizontal Scroll) */}
                <div className="md:hidden flex flex-col gap-5">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={fadeInUp}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 flex flex-col items-start"
                        >
                            {/* Icon */}
                            <div className="mb-4 text-gray-400">
                                {benefit.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-white font-semibold text-lg mb-2">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportConfig}
                            variants={fadeInUp}
                            transition={getStaggerDelay(index)}
                            whileHover={cardHover}
                            className="bg-[#161b22] border border-[#30363d] rounded-xl p-8 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Icon */}
                            <div className="mb-6 text-gray-400 group-hover:text-blue-400 transition-colors">
                                {benefit.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-white font-semibold text-xl mb-3 group-hover:text-blue-400 transition-colors">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
