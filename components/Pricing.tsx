"use client";

import { motion } from "framer-motion";
import { CheckIcon } from "@/components/icons";

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
            buttonStyle: "bg-[#0F172A] hover:bg-[#1E293B] text-white border border-gray-700",
            cardStyle: "bg-gray-50 border-gray-200 hover:shadow-xl hover:-translate-y-1",
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
            cardStyle: "bg-gray-50 border-blue-500 shadow-lg shadow-blue-500/10 hover:shadow-xl hover:-translate-y-1",
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
            buttonStyle: "bg-[#0F172A] hover:bg-[#1E293B] text-white border border-gray-700",
            cardStyle: "bg-gray-50 border-gray-200 hover:shadow-xl hover:-translate-y-1",
            popular: false,
        },
    ];

    return (
        <section className="bg-[#E2E8F0] py-20 px-6" id="planos">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                        <span className="text-gray-900">Planos de Acesso Beta — </span>
                        <br className="hidden md:block" />
                        <span className="text-blue-600">exclusividade antecipada</span>
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
                            className={`relative rounded-2xl p-8 border-2 transition-all duration-300 cursor-pointer ${plan.cardStyle}`}
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
                            <h3 className="text-gray-900 font-semibold text-2xl mb-6 text-center">
                                {plan.name}
                            </h3>

                            {/* Price */}
                            <div className="text-center mb-8">
                                {plan.pricePrefix ? (
                                    <div className="text-gray-900">
                                        <span className="text-lg">{plan.pricePrefix}</span>
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        <span className="text-gray-500 text-sm">{plan.period}</span>
                                    </div>
                                ) : (
                                    <div className="text-gray-900">
                                        <span className="text-xl">R$ </span>
                                        <span className="text-5xl font-bold">{plan.price}</span>
                                        <span className="text-gray-500 text-lg">{plan.period}</span>
                                    </div>
                                )}
                            </div>

                            {/* Features */}
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start gap-3">
                                        <CheckIcon
                                            className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5"
                                            variant="alt"
                                        />
                                        <span className="text-gray-600 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <a
                                href="#formulario"
                                className={`w-full ${plan.buttonStyle} font-semibold py-3 rounded-full transition-all duration-200 block text-center`}
                            >
                                {plan.buttonText}
                            </a>
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
