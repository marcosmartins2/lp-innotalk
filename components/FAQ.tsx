"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";
import { ChevronIcon } from "@/components/icons";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "O que preciso para participar do Beta?",
            answer: "Um número de WhatsApp Business ativo e uma conta Google para integração da agenda. Nossa equipe vai te ajudar com toda a configuração inicial.",
        },
        {
            question: "Vocês fazem a configuração inicial?",
            answer: "Sim! O time InnoPro acompanha todo o processo de setup durante o período Beta. Você terá suporte dedicado para garantir que tudo funcione perfeitamente desde o primeiro dia.",
        },
        {
            question: "Posso ter mais de um atendente?",
            answer: "Sim. O plano Scale Beta permite múltiplos acessos, e o plano Enterprise é totalmente multiusuário com gestão completa de equipes e permissões.",
        },
        {
            question: "Meus dados estão seguros?",
            answer: "Absolutamente. A InnoTalk segue rigorosamente a LGPD com armazenamento criptografado, controle total pelo usuário e servidores localizados no Brasil. Seus dados nunca são compartilhados com terceiros.",
        },
        {
            question: "Posso cancelar a qualquer momento?",
            answer: "Sim, não há fidelidade. Você pode cancelar sua assinatura a qualquer momento e seus dados ficam disponíveis para exportação por 30 dias após o cancelamento.",
        },
        {
            question: "Como funciona a integração com o WhatsApp?",
            answer: "Utilizamos a API oficial do WhatsApp Business, garantindo total conformidade e estabilidade. A conexão é feita de forma segura e você mantém total controle sobre suas conversas.",
        },
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-transparent py-24 px-6 relative" id="faq">
            <div className="max-w-4xl mx-auto relative z-10">
                {/* Heading */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-white">
                        Perguntas Frequentes
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Tudo o que você precisa saber sobre a InnoTalk
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    className="space-y-4"
                >
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            variants={staggerItem}
                            className={`bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index
                                ? "border-blue-600 shadow-lg shadow-blue-900/20"
                                : "hover:border-gray-600"
                                }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left transition-all duration-200 focus-visible:outline-none"
                            >
                                <span className={`font-semibold text-lg pr-8 transition-colors ${openIndex === index ? "text-blue-400" : "text-white"
                                    }`}>
                                    {faq.question}
                                </span>
                                <ChevronIcon
                                    className={`w-6 h-6 flex-shrink-0 transition-all duration-300 ${openIndex === index ? "rotate-180 text-blue-400" : "text-gray-500"
                                        }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="px-8 pb-8 text-gray-300 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
