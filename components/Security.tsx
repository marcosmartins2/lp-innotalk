"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig, getStaggerDelay } from "@/lib/animations";

export default function Security() {
    const features = [
        {
            title: "Criptografia Total",
            description: "Todos os dados trafegam de forma segura e criptografada",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            title: "Conformidade LGPD",
            description: "100% em conformidade com a Lei Geral de Proteção de Dados",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            title: "Controle Total",
            description: "Você tem controle completo sobre seus dados e pode exportá-los a qualquer momento",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
    ];

    return (
        <section className="bg-[#0D1424] py-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Icon and Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                        <span className="text-white">Privacidade e segurança em </span>
                        <br className="hidden md:block" />
                        <span className="text-blue-500">primeiro lugar</span>
                    </h2>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportConfig}
                            variants={fadeInUp}
                            transition={getStaggerDelay(index, 0.15)}
                            className="text-center"
                        >
                            {/* Icon - Monochromatic Blue */}
                            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-500">
                                {feature.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-white font-semibold text-xl mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Description Box */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    variants={fadeInUp}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="glass-card rounded-2xl p-8"
                >
                    <p className="text-gray-300 text-center leading-relaxed mb-6">
                        A InnoTalk segue as diretrizes da LGPD e garante que apenas você controla seus contatos,
                        mensagens e informações de agenda. Seus dados são armazenados em servidores seguros no
                        Brasil e nunca são compartilhados com terceiros.
                    </p>
                    <div className="flex items-center justify-center gap-6 flex-wrap">
                        <a href="#" className="text-blue-500 hover:text-blue-400 font-medium underline transition-colors">
                            Política de Privacidade
                        </a>
                        <span className="text-gray-600">•</span>
                        <a href="#" className="text-blue-500 hover:text-blue-400 font-medium underline transition-colors">
                            Termos de Uso
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
