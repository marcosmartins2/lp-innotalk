"use client";

import { motion } from "framer-motion";

export default function Pricing()
{
    const plans = [
        {
            name: "Starter Beta",
            price: "297",
            period: "/mês",
            features: [
                "1 número WhatsApp",
                "Até ~1.000 conversas/mês",
                "CRM básico",
                "Agenda integrada",
                "Suporte via WhatsApp",
            ],
            buttonText: "Quero participar do Beta",
            buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white",
            cardStyle: "border-gray-800",
            popular: false,
        },
        {
            name: "Scale Beta",
            price: "597",
            period: "/mês",
            features: [
                "1-2 números WhatsApp",
                "Até ~5.000 conversas/mês",
                "Dashboard avançado",
                "Integrações extras (Google Sheets/ Meta Ads)",
                "Suporte prioritário",
            ],
            buttonText: "Quero participar do Beta",
            buttonStyle: "bg-yellow-400 hover:bg-yellow-500 text-black",
            cardStyle: "border-blue-600",
            popular: true,
        },
        {
            name: "Enterprise",
            price: "1.200",
            period: "/mês",
            pricePrefix: "A partir de R$ ",
            features: [
                "Multiusuário",
                "Conversas ilimitadas",
                "Dashboards customizados",
                "Suporte dedicado",
                "SLA garantido",
            ],
            buttonText: "Quero participar do Beta",
            buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white",
            cardStyle: "border-gray-800",
            popular: false,
        },
    ];

    return (
        <section className="bg-black py-20 px-6" id="planos">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-white">Planos de Acesso Beta — </span>
                        <br />
                        <span className="text-blue-500">exclusividade antecipada</span>
                    </h2>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className={`relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 border-2 ${plan.cardStyle} transition-all duration-300`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <div className="bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
                                        Mais Popular
                                    </div>
                                </div>
                            )}

                            {/* Plan Name */}
                            <h3 className="text-white font-semibold text-2xl mb-6 text-center">
                                {plan.name}
                            </h3>

                            {/* Price */}
                            <div className="text-center mb-8">
                                {plan.pricePrefix ? (
                                    <div className="text-white">
                                        <span className="text-lg">{plan.pricePrefix}</span>
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        <span className="text-gray-400 text-sm">{plan.period}</span>
                                    </div>
                                ) : (
                                    <div className="text-white">
                                        <span className="text-xl">R$ </span>
                                        <span className="text-5xl font-bold">{plan.price}</span>
                                        <span className="text-gray-400 text-lg">{plan.period}</span>
                                    </div>
                                )}
                            </div>

                            {/* Features */}
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start gap-3">
                                        <svg
                                            className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span className="text-gray-300 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <button
                                className={`w-full ${plan.buttonStyle} font-semibold py-3 rounded-lg transition-colors`}
                            >
                                {plan.buttonText}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Disclaimer */}
                <p className="text-center text-gray-500 text-sm max-w-3xl mx-auto">
                    * Os custos da API do WhatsApp podem variar conforme o volume de mensagens enviadas e recebidas.
                </p>
            </div>
        </section>
    );
}
