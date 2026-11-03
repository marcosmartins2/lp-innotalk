"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";
import { TESTIMONIALS, type Testimonial } from "@/lib/testimonials";

const shareStoryUrl = `https://wa.me/5562998009542?text=${encodeURIComponent("Olá! Sou cliente da InnoTalk e gostaria de compartilhar minha experiência.")}`;

/** Compromissos verificáveis: todos documentados nos Termos de Uso e na Política de Privacidade. */
const commitments: { title: string; description: string; href?: string; linkLabel?: string }[] = [
    {
        title: "7 dias para testar com a sua equipe",
        description: "Use a plataforma na rotina real antes de decidir. Sem cartão de crédito para começar.",
    },
    {
        title: "Dados tratados conforme a LGPD",
        description: "Criptografia, controle de acesso por perfil e nenhuma venda ou compartilhamento de dados para fins comerciais.",
        href: "/politica-privacidade",
        linkLabel: "Ler a Política de Privacidade",
    },
    {
        title: "Cancelamento quando você quiser",
        description: "A solicitação de cancelamento da conta pode ser feita a qualquer momento.",
        href: "/termos-uso",
        linkLabel: "Ler os Termos de Uso",
    },
    {
        title: "Suporte por e-mail e WhatsApp",
        description: "Ajuda na configuração inicial e no dia a dia, com o nível de suporte do seu plano.",
    },
];

function QuoteIcon()
{
    return (
        <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-brand/60">
            <path d="M9.5 6C6.5 6 4 8.5 4 11.6V18h6v-6H6.6c.2-2 1.4-3.4 2.9-3.6V6Zm10 0c-3 0-5.5 2.5-5.5 5.6V18h6v-6h-3.4c.2-2 1.4-3.4 2.9-3.6V6Z" />
        </svg>
    );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial })
{
    return (
        <motion.figure variants={staggerItem} className="flex h-full flex-col rounded-[16px] border border-line bg-graphite p-6 sm:p-7">
            {testimonial.result && (
                <div className="mb-5 border-b border-line pb-5">
                    <span className="block text-[34px] font-extrabold leading-none text-white">{testimonial.result.value}</span>
                    <span className="mt-1.5 block text-[13px] font-semibold text-brand-soft">{testimonial.result.label}</span>
                </div>
            )}
            <QuoteIcon />
            <blockquote className="mt-3 flex-1 text-[15px] leading-[1.7] text-zinc-200">“{testimonial.quote}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
                {testimonial.photo ? (
                    <Image src={testimonial.photo} alt={`Foto de ${testimonial.name}`} width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
                ) : (
                    <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/20 text-[15px] font-bold text-brand-soft">{testimonial.name[0]}</span>
                )}
                <span className="min-w-0">
                    <span className="block truncate text-[14px] font-bold text-white">{testimonial.name}</span>
                    <span className="block truncate text-[13px] text-muted">{[testimonial.role, testimonial.company].filter(Boolean).join(" · ")}</span>
                </span>
            </figcaption>
            {testimonial.videoUrl && (
                <a href={testimonial.videoUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 self-start rounded text-[13px] font-bold text-brand-soft hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft">
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4z" /></svg>
                    Assistir depoimento
                </a>
            )}
        </motion.figure>
    );
}

function CommitmentList()
{
    return (
        <motion.ul variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className="grid gap-4 sm:grid-cols-2">
            {commitments.map((item) => (
                <motion.li key={item.title} variants={staggerItem} className="rounded-[14px] border border-line bg-graphite p-5 sm:p-6">
                    <span aria-hidden="true" className="mb-4 flex h-9 w-9 items-center justify-center rounded-[10px] bg-brand/15 text-brand-soft">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <h3 className="mb-1.5 text-[16px] font-bold text-white">{item.title}</h3>
                    <p className="text-[14px] leading-[1.6] text-muted">{item.description}</p>
                    {item.href && (
                        <Link href={item.href} className="mt-3 inline-block rounded text-[13px] font-semibold text-brand-soft underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft">
                            {item.linkLabel}
                        </Link>
                    )}
                </motion.li>
            ))}
        </motion.ul>
    );
}

/**
 * Prova social. Renderiza os depoimentos de `lib/testimonials.ts`; sem depoimentos
 * cadastrados, mostra um convite aos clientes e os compromissos verificáveis da InnoTalk.
 */
export default function Testimonials()
{
    const hasTestimonials = TESTIMONIALS.length > 0;

    return (
        <section id="depoimentos" aria-labelledby="depoimentos-titulo" className="scroll-mt-[72px] border-t border-line bg-ink px-6 py-20 sm:py-24 lg:py-28">
            <MotionConfig reducedMotion="user">
                <div className="mx-auto max-w-[1240px]">
                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="mb-12 max-w-[680px] sm:mb-14">
                        <p className="mb-3 text-[12px] font-extrabold tracking-[0.08em] text-brand-soft">QUEM USA</p>
                        <h2 id="depoimentos-titulo" className="mb-4 text-[28px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white sm:text-[38px]">Empresas que escolheram organizar melhor suas operações</h2>
                        <p className="text-[15px] leading-relaxed text-muted sm:text-[16px]">
                            {hasTestimonials
                                ? "Relatos de quem trocou o improviso no WhatsApp por um atendimento organizado e uma gestão comercial com mais clareza."
                                : "Estamos reunindo os relatos de quem já usa a InnoTalk no dia a dia. Preferimos mostrar histórias reais, com nome e empresa, a publicar números que não podemos comprovar."}
                        </p>
                    </motion.div>

                    {hasTestimonials ? (
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {TESTIMONIALS.map((testimonial) => <TestimonialCard key={`${testimonial.name}-${testimonial.company}`} testimonial={testimonial} />)}
                        </motion.div>
                    ) : (
                        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-6">
                            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="relative flex flex-col justify-between overflow-hidden rounded-[16px] border border-brand/40 bg-[linear-gradient(160deg,rgba(37,99,235,0.18),rgba(17,19,24,0.9)_55%)] p-7 sm:p-8">
                                <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-brand/25" />
                                <div className="relative">
                                    <QuoteIcon />
                                    <h3 className="mb-3 mt-4 text-[22px] font-extrabold leading-tight text-white sm:text-[26px]">Já é cliente da InnoTalk?</h3>
                                    <p className="mb-8 text-[15px] leading-[1.7] text-zinc-300">
                                        Conte como ficou a rotina da sua equipe depois de organizar o atendimento. Sua história pode aparecer aqui, com seu nome, sua empresa e os resultados que você conquistou.
                                    </p>
                                </div>
                                <a href={shareStoryUrl} target="_blank" rel="noopener noreferrer" className="relative inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-[9px] bg-brand px-6 text-[14px] font-bold text-white transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft">
                                    Compartilhar minha experiência
                                </a>
                            </motion.div>
                            <div>
                                <p className="mb-4 text-[13px] font-bold text-white">Enquanto isso, o que você pode conferir agora:</p>
                                <CommitmentList />
                            </div>
                        </div>
                    )}
                </div>
            </MotionConfig>
        </section>
    );
}
