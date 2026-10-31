"use client";

import type { ReactNode } from "react";
import { motion, MotionConfig } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";

interface Pain
{
    title: string;
    description: string;
    /** "Sintoma" ilustrativo, no tom de uma notificação do dia a dia */
    symptom: string;
    icon: ReactNode;
}

const iconProps = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const pains: Pain[] = [
    {
        title: "Clientes esperando resposta",
        description: "A mensagem chega no meio de outra tarefa e fica para depois. Quem espera demais não reclama: pergunta para o concorrente.",
        symptom: "Aguardando resposta · 2h 40min",
        icon: <svg {...iconProps}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
    },
    {
        title: "Conversas espalhadas em vários celulares",
        description: "Cada pessoa atende no próprio aparelho. Quando alguém falta ou sai da empresa, o histórico com o cliente vai junto.",
        symptom: "3 aparelhos · nenhum histórico compartilhado",
        icon: <svg {...iconProps}><rect x="3" y="4" width="8" height="15" rx="1.5" /><rect x="13" y="6" width="8" height="15" rx="1.5" /><path d="M6.5 16h1M16.5 18h1" /></svg>,
    },
    {
        title: "Leads esquecidos sem retorno",
        description: "O interessado pediu orçamento, ninguém voltou a falar com ele e a oportunidade esfriou sem que ninguém percebesse.",
        symptom: "Último contato · 9 dias atrás",
        icon: <svg {...iconProps}><circle cx="9" cy="8" r="4" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><path d="m17 9 4 4M21 9l-4 4" /></svg>,
    },
    {
        title: "Negociações sem controle",
        description: "Sem saber em que etapa cada cliente está, fica difícil priorizar quem está perto de fechar e prever as vendas do mês.",
        symptom: "Status da proposta · sem informação",
        icon: <svg {...iconProps}><path d="M4 5h16l-6 7v6l-4 2v-8z" /></svg>,
    },
    {
        title: "Agendamentos desorganizados",
        description: "Horários anotados no papel, na planilha e na conversa. O resultado são encaixes no mesmo horário e compromissos esquecidos.",
        symptom: "2 compromissos · mesmo horário",
        icon: <svg {...iconProps}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /><path d="m10 14 4 4M14 14l-4 4" /></svg>,
    },
    {
        title: "Gestor sem visibilidade da equipe",
        description: "Você não sabe quantos atendimentos foram feitos, quais clientes ficaram sem retorno nem quantas vendas saíram do WhatsApp.",
        symptom: "Relatório da semana · indisponível",
        icon: <svg {...iconProps}><path d="M3 3l18 18" /><path d="M10.6 6.1A9.6 9.6 0 0 1 12 6c5 0 8.5 4.5 9.5 6a17 17 0 0 1-2.8 3.3M6.6 6.6A17 17 0 0 0 2.5 12c1 1.5 4.5 6 9.5 6a9 9 0 0 0 4.4-1.1" /><path d="M9.9 10a3 3 0 0 0 4.1 4.1" /></svg>,
    },
];

/** Seção 2: faz o visitante reconhecer os problemas da própria operação. */
export default function PainPoints()
{
    return (
        <section id="problemas" aria-labelledby="problemas-titulo" className="relative scroll-mt-[72px] overflow-hidden border-t border-white/[0.06] bg-ink px-6 py-20 sm:py-24 lg:py-28">
            <MotionConfig reducedMotion="user">
                <div className="mx-auto max-w-[1240px]">
                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="mb-12 grid gap-5 lg:mb-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
                        <div>
                            <p className="mb-3 text-[12px] font-extrabold tracking-[0.08em] text-brand-soft">O PROBLEMA</p>
                            <h2 id="problemas-titulo" className="text-[28px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white sm:text-[40px]">Quantas oportunidades sua empresa perde por falta de organização?</h2>
                        </div>
                        <p className="text-[15px] leading-[1.7] text-muted sm:text-[16px]">
                            Se o WhatsApp é o principal canal de vendas da sua empresa, é provável que pelo menos uma destas situações faça parte da sua semana.
                        </p>
                    </motion.div>

                    <motion.ul variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                        {pains.map((pain) => (
                            <motion.li key={pain.title} variants={staggerItem} className="group flex flex-col rounded-[14px] border border-line bg-graphite p-6 transition-colors duration-300 hover:border-white/20">
                                <div className="mb-5 flex items-center justify-between gap-3">
                                    <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.04] text-zinc-200">{pain.icon}</span>
                                    <span className="inline-flex min-w-0 items-center gap-1.5 rounded-full border border-white/[0.08] bg-black/40 px-2.5 py-1 [font-family:var(--font-geist-mono),monospace] text-[10.5px] text-zinc-400">
                                        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                                        <span className="truncate">{pain.symptom}</span>
                                    </span>
                                </div>
                                <h3 className="mb-2 text-[17px] font-bold leading-snug text-white">{pain.title}</h3>
                                <p className="text-[14px] leading-[1.65] text-muted">{pain.description}</p>
                            </motion.li>
                        ))}
                    </motion.ul>

                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="mt-12 flex flex-col gap-8 border-l-2 border-brand pl-6 sm:mt-16 sm:pl-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
                        <p className="max-w-[760px] text-[22px] font-extrabold leading-[1.3] tracking-[-0.015em] text-white sm:text-[30px]">
                            Não é falta de clientes.{" "}
                            <span className="text-muted">Muitas vezes, é falta de organização para atender, acompanhar e converter cada oportunidade.</span>
                        </p>
                        <a href="#recursos" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-[9px] border border-white/20 px-6 text-[14px] font-bold text-white transition-colors hover:border-brand-soft/60 hover:bg-brand/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft lg:self-auto">
                            Ver como resolver
                            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                        </a>
                    </motion.div>
                </div>
            </MotionConfig>
        </section>
    );
}
