"use client";

import { motion } from "framer-motion";
import { CheckIcon, ArrowIcon } from "@/components/icons";
import { CTAButton } from "@/components/primitives";

export default function HowToStart()
{
    const steps = [
        {
            number: "1",
            title: "Cadastre seu interesse no Beta",
            description: "Preencha o formulário e entre para a lista de espera exclusiva.",
        },
        {
            number: "2",
            title: "Conecte seu número WhatsApp e sua conta Google",
            description: "Integração simples e rápida, sem complicação técnica.",
        },
        {
            number: "3",
            title: "Gerencie conversas e agenda pelo painel da InnoTalk",
            description: "Tudo centralizado em uma interface intuitiva e poderosa.",
        },
    ];

    return (
        <section className="bg-[#0F172A] py-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                        <span className="text-white">Comece em </span>
                        <span className="text-blue-500">poucos passos</span>
                    </h2>
                </div>

                {/* Steps */}
                <div className="space-y-5 mb-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="flex items-start gap-5"
                        >
                            {/* Number badge */}
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                                    {step.number}
                                </div>
                            </div>

                            {/* Content card */}
                            <div className="flex-1 glass-card rounded-2xl p-5 hover:bg-white/[0.06] hover:-translate-y-0.5 transition-all duration-300">
                                <div className="flex items-start gap-3">
                                    {/* Check icon - Blue monochromatic */}
                                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-500 mt-0.5">
                                        <CheckIcon width="20" height="20" />
                                    </div>

                                    {/* Text content */}
                                    <div className="flex-1">
                                        <h3 className="text-white font-semibold text-lg mb-1.5">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed text-sm">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="text-center">
                    <CTAButton
                        href="#formulario"
                        variant="primary"
                        size="md"
                    >
                        Quero participar agora
                        <ArrowIcon />
                    </CTAButton>
                </div>
            </div>
        </section>
    );
}
