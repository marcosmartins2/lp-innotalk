"use client";

import { motion } from "framer-motion";
import { ArrowIcon } from "@/components/icons";
import { CTAButton } from "@/components/primitives";

export default function Hero()
{
    return (
        <section className="bg-gradient-to-b from-bg-dark via-bg-darker to-bg-dark min-h-screen flex items-center justify-center px-6 pt-28 pb-20">
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
                    <CTAButton
                        href="#formulario"
                        variant="primary"
                        size="md"
                        className="w-full sm:w-auto"
                    >
                        Quero participar do Beta
                        <ArrowIcon />
                    </CTAButton>
                    <CTAButton
                        href="#como-funciona"
                        variant="secondary"
                        size="md"
                        className="w-full sm:w-auto"
                    >
                        Ver como funciona
                    </CTAButton>
                </motion.div>
            </div>
        </section>
    );
}
