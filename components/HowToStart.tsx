"use client";

import { motion } from "framer-motion";

export default function HowToStart()
{
    const steps = [
        {
            number: "1",
            title: "Cadastre seu interesse no Beta",
            description: "Preencha o formulário e entre para a lista de espera exclusiva.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            number: "2",
            title: "Conecte seu número WhatsApp e sua conta Google",
            description: "Integração simples e rápida, sem complicação técnica.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            number: "3",
            title: "Gerencie conversas e agenda pelo painel da InnoTalk",
            description: "Tudo centralizado em uma interface intuitiva e poderosa.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
    ];

    return (
        <section className="bg-black py-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold">
                        <span className="text-white">Comece em </span>
                        <span className="text-blue-500">poucos passos</span>
                    </h2>
                </div>

                {/* Steps */}
                <div className="space-y-6 mb-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="flex items-start gap-6"
                        >
                            {/* Number badge */}
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {step.number}
                                </div>
                            </div>

                            {/* Content card */}
                            <div className="flex-1 bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
                                <div className="flex items-start gap-3">
                                    {/* Check icon */}
                                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 mt-1">
                                        {step.icon}
                                    </div>

                                    {/* Text content */}
                                    <div className="flex-1">
                                        <h3 className="text-white font-semibold text-lg mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed">
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
                    <a
                        href="#formulario"
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-lg transition-colors inline-flex items-center gap-2 text-base"
                    >
                        Quero participar agora
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
