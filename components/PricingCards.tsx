"use client";

import { motion } from "framer-motion";
import { CheckIcon } from "@/components/icons";
import { trackPixel } from "@/components/MetaPixel";
import type { PricingPlan } from "@/lib/plans";

interface PricingCardsProps
{
    plans: PricingPlan[];
}

export default function PricingCards({ plans }: PricingCardsProps)
{
    return (
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-stretch gap-5 md:grid-cols-3 md:gap-6 lg:items-center">
            {plans.map((plan, index) => (
                <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className={`relative flex h-full flex-col rounded-[16px] border p-6 transition-all duration-300 sm:p-7 ${plan.popular ? "bg-[linear-gradient(180deg,rgba(37,99,235,0.14),#111318_45%)] lg:py-9" : "bg-graphite"} ${plan.cardStyle}`}
                >
                    {/* Popular Badge */}
                    {plan.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                            <div className="whitespace-nowrap rounded-full bg-brand px-4 py-1.5 text-[12px] font-bold text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.9)]">
                                Recomendado
                            </div>
                        </div>
                    )}

                    {/* Plan Name */}
                    <h3 className="mb-1.5 text-[20px] font-extrabold leading-[26px] capitalize text-white">
                        {plan.name}
                    </h3>

                    <p className={`mb-5 text-[14.5px] font-semibold leading-[1.45] ${plan.popular ? "text-brand-soft" : "text-zinc-200"}`}>
                        {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-2 flex items-baseline gap-1.5 text-white">
                        <span className="text-[14px] font-semibold">R$</span>
                        <span className="min-h-[46px] text-[36px] font-extrabold leading-[46px] tracking-[-0.02em]">{plan.price}</span>
                        <span className="text-[12px] text-zinc-400">{plan.period}</span>
                    </div>

                    {/* O plano começa em teste: a cobrança só vem depois dos 14 dias. */}
                    <p className="mb-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#8fb2ff]">
                        <CheckIcon className="h-3.5 w-3.5 flex-shrink-0" variant="alt" />
                        14 dias grátis para testar
                    </p>

                    {plan.idealFor && (
                        <p className="mb-6 border-t border-line pt-5 text-[13.5px] leading-[1.6] text-muted">
                            {plan.idealFor}
                        </p>
                    )}

                    {/* Features */}
                    <p className="mb-3 text-[11.5px] font-extrabold uppercase tracking-[0.08em] text-zinc-400">O que está incluído</p>
                    <ul className="mb-7 flex-1 space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-3">
                                <CheckIcon
                                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-soft"
                                    variant="alt"
                                />
                                <span className="text-[13.76px] leading-[19px] text-zinc-200">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    {/* CTA Button */}
                    <a
                        href={plan.href}
                        // Marca a intenção de compra ANTES de sair para o CRM: a
                        // partir daqui o usuário troca de domínio e o pixel da LP
                        // não vê mais nada. A conversão em si (`Purchase`) é
                        // disparada pelo servidor quando o PIX é confirmado.
                        onClick={() => trackPixel("InitiateCheckout", {
                            currency: "BRL",
                            value: plan.priceCents / 100,
                            content_name: plan.name,
                            content_ids: plan.id ? [String(plan.id)] : undefined,
                            content_type: "product",
                        })}
                        className={`block w-full rounded-[9px] py-3.5 text-center text-[14px] font-bold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft ${plan.buttonStyle}`}
                    >
                        {plan.buttonText}
                    </a>
                </motion.div>
            ))}
        </div>
    );
}
