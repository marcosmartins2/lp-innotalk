"use client";

import { motion } from "framer-motion";
import { ArrowIcon } from "@/components/icons";
import { CTAButton } from "@/components/primitives";

import { Tiles } from "@/components/Tiles";

export default function Hero() {
    return (
        <section className="relative min-h-[110vh] flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 bg-[#0D1117]">
                {/* Tiles Background - Masked to fade out at bottom */}
                <div className="absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none">
                    <Tiles
                        rows={30}
                        cols={20}
                        tileSize="lg"
                        className="opacity-100"
                        tileClassName="border-blue-500/10"
                    />
                </div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-10 border border-blue-500/20 shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)] hover:border-blue-500/40 transition-colors cursor-default"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-blue-200 font-medium text-sm tracking-wide">Versão Beta Disponível</span>
                    <span className="w-px h-3 bg-white/10 mx-1" />
                    <span className="text-gray-400 text-sm">Vagas limitadas</span>
                </motion.div>

                {/* Nome do app (H1) — deve bater com o nome na tela de consentimento OAuth ("InnoTalk") */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
                    className="text-6xl md:text-8xl font-bold tracking-tight mb-4"
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 animate-gradient-x bg-[length:200%_auto]">
                        InnoTalk
                    </span>
                </motion.h1>

                {/* Tagline (H2) */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
                    className="text-2xl md:text-4xl font-bold tracking-tight mb-6 text-white/90"
                >
                    Centralize seu atendimento e agenda diretamente pelo WhatsApp.
                </motion.h2>

                {/* Propósito — texto visível e explícito ("o que o app é/faz") para a verificação de marca do Google */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-14 leading-relaxed font-light"
                >
                    O <span className="text-white font-medium">InnoTalk</span> é um CRM para WhatsApp que centraliza o atendimento,
                    organiza leads e integra-se ao <span className="text-white font-medium">Google Calendar</span> para criar e
                    sincronizar seus agendamentos automaticamente.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-5"
                >
                    <CTAButton
                        href="#formulario"
                        variant="primary"
                        size="lg"
                        className="w-full sm:w-auto min-w-[200px] shadow-[0_0_40px_-10px_rgba(250,204,21,0.3)] hover:shadow-[0_0_60px_-15px_rgba(250,204,21,0.4)]"
                    >
                        Quero participar do Beta
                        <ArrowIcon />
                    </CTAButton>
                    <CTAButton
                        href="#como-funciona"
                        variant="secondary"
                        size="lg"
                        className="w-full sm:w-auto min-w-[200px]"
                    >
                        Ver como funciona
                    </CTAButton>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </motion.div>
        </section>
    );
}
