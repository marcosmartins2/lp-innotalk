"use client";

import { motion } from "framer-motion";

export default function Hero()
{
    return (
        <section className="bg-gradient-to-b from-[#0F172A] via-[#0D1424] to-[#0F172A] min-h-screen flex items-center justify-center px-6 pt-28 pb-20">
            <div className="max-w-5xl mx-auto text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 mb-8"
                >
                    <span className="text-blue-400 font-semibold text-sm">Versão Beta</span>
                    <span className="text-gray-500 text-sm">•</span>
                    <span className="text-gray-300 text-sm">Vagas limitadas</span>
                </motion.div>

                {/* Heading - Reduced sizes for mobile */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] mb-8"
                >
                    <span className="text-white">Centralize seu</span>
                    <br />
                    <span className="text-blue-500">atendimento e agenda</span>
                    <br />
                    <span className="text-white">diretamente pelo WhatsApp.</span>
                </motion.h1>

                {/* Subheading - Improved line-height */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
                >
                    A InnoTalk conecta seu WhatsApp, CRM e Google Agenda em um único lugar.
                    Organize conversas, leads e agendamentos de forma simples e automática.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="#formulario"
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-yellow-400/20 flex items-center gap-2 text-base w-full sm:w-auto justify-center"
                    >
                        Quero participar do Beta
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a
                        href="#como-funciona"
                        className="glass hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 text-base w-full sm:w-auto text-center"
                    >
                        Ver como funciona
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
