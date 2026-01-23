"use client";

import { motion } from "framer-motion";

export default function FinalCTA()
{
    return (
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-20 px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center"
            >
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                    Não perca a oportunidade de fazer parte do{" "}
                    <span className="text-yellow-400">futuro</span> do atendimento digital
                </h2>

                {/* Subheading */}
                <p className="text-blue-100 text-lg mb-10 leading-relaxed">
                    Vagas limitadas para o Beta. Garanta sua participação agora.
                </p>

                {/* CTA Button */}
                <CTAButton
                    href="#formulario"
                    variant="primary"
                    size="md"
                    className="mb-12 hover:shadow-yellow-400/30"
                >
                    Garantir minha vaga no Beta
                    <ArrowIcon />
                </CTAButton>

                {/* Features - Monochromatic */}
                <div className="flex flex-wrap items-center justify-center gap-8 text-white">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                        <span className="text-sm">Configuração rápida</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                        <span className="text-sm">Suporte dedicado</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                        <span className="text-sm">Preço especial Beta</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
