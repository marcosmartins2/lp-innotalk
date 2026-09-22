"use client";

import { motion } from "framer-motion";
import { CheckIcon } from "@/components/icons";
import type { PricingPlan } from "@/lib/plans";

interface PricingCardsProps
{
    plans: PricingPlan[];
}

export default function PricingCards({ plans }: PricingCardsProps)
{
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan, index) => (
                <motion.div
                    key={plan.name}
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
                        href={plan.href}
                        className={`w-full ${plan.buttonStyle} font-semibold py-3 rounded-full transition-all duration-200 block text-center`}
                    >
                        {plan.buttonText}
                    </a>
                </motion.div>
            ))}
        </div>
    );
}
