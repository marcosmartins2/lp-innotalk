"use client";

import { useState } from "react";

export default function FAQ()
{
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

    const toggleFAQ = (index: number) =>
    {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-[#0F172A] py-20 px-6" id="faq">
            <div className="max-w-4xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                        <span className="text-white">Perguntas </span>
                        <span className="text-blue-500">Frequentes</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Tudo o que você precisa saber sobre a InnoTalk
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-3">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/[0.06]"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
                            >
                                <span className="text-white font-medium text-base pr-4">
                                    {faq.question}
                                </span>
                                <svg
                                    className={`w-5 h-5 text-blue-500 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96" : "max-h-0"
                                    }`}
                            >
                                <div className="px-6 pb-5 text-gray-400 leading-relaxed text-sm">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
