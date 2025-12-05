"use client";

import { motion } from "framer-motion";

export default function Hero()
{
    return (
        <section className="bg-gradient-to-b from-[#0a0f1e] to-[#0d1424] min-h-screen flex items-center justify-center px-6 py-20">
            <div className="max-w-5xl mx-auto text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 bg-blue-950/50 border border-blue-800/30 rounded-full px-4 py-2 mb-8"
                >
                    <span className="text-blue-400 font-semibold text-sm">Versão Beta</span>
                    <span className="text-gray-400 text-sm">•</span>
                    <span className="text-gray-300 text-sm">Vagas limitadas</span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                >
                    <span className="text-white">Centralize seu</span>
                    <br />
                    <span className="text-blue-500">atendimento e agenda</span>
                    <br />
                    <span className="text-white">diretamente pelo</span>
                    <br />
                    <span className="text-white">WhatsApp.</span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
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
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg transition-colors flex items-center gap-2 text-base w-full sm:w-auto">
                        Quero participar do Beta
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button className="bg-transparent hover:bg-white/5 text-white font-semibold px-8 py-3 rounded-lg border border-white/20 transition-colors text-base w-full sm:w-auto">
                        Ver como funciona
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
