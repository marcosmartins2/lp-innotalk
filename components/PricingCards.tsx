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
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-stretch gap-5 md:grid-cols-3 md:gap-6">
            {plans.map((plan, index) => (
                <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className={`relative flex flex-col rounded-[14px] border bg-[#10233e] p-6 transition-all duration-300 sm:p-7 ${plan.cardStyle}`}
                >
                    {/* Popular Badge */}
                    {plan.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                            <div className="rounded-full bg-[#2864df] px-4 py-1.5 text-[12px] font-bold text-white">
                                Mais escolhido
                            </div>
                        </div>
                    )}

                    {/* Plan Name */}
                    <h3 className="mb-2 text-[19.2px] font-extrabold leading-[26px] capitalize text-white">
                        {plan.name}
                    </h3>

                    <p className="mb-[22px] min-h-[42px] text-[13.76px] leading-[1.55] text-slate-300">
                        {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-2 flex items-baseline gap-1.5 text-white">
                        <span className="text-[14px] font-semibold">R$</span>
                        <span className="min-h-[46px] text-[33.6px] font-extrabold leading-[46px]">{plan.price}</span>
                        <span className="text-[12px] text-slate-400">{plan.period}</span>
                    </div>

                    {/* O plano começa em teste: a cobrança só vem depois dos 14 dias. */}
                    <p className="mb-6 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#8fb2ff]">
                        <CheckIcon className="h-3.5 w-3.5 flex-shrink-0" variant="alt" />
                        14 dias grátis para testar
                    </p>

                    {/* Features */}
                    <ul className="mb-7 flex-1 space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-3">
                                <CheckIcon
                                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#5b8def]"
                                    variant="alt"
                                />
                                <span className="text-[13.76px] leading-[19px] text-slate-300">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    {/* CTA Button */}
                    <a
                        href={plan.href}
                        className={`block w-full rounded-[9px] py-3 text-center text-[14px] font-bold transition-colors duration-200 ${plan.buttonStyle}`}
                    >
                        {plan.buttonText}
                    </a>
                </motion.div>
            ))}
        </div>
    );
}
