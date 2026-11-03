"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion, MotionConfig, useInView, useReducedMotion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/animations";
import { CRM_URL } from "@/lib/plans";

/*
 * Demonstração da jornada de atendimento na InnoTalk. Cada etapa representa um
 * recurso que existe na plataforma (caixa de entrada do WhatsApp, perfil do
 * contato, etiquetas/status, funil e agenda com Google Calendar). Nomes,
 * mensagens e valores são fictícios e sinalizados como tal na tela.
 */

const STEP_MS = 5200;
const signupUrl = `${CRM_URL}/cadastro`;

const CUSTOMER = "Juliana Rocha";
const FIRST_MESSAGE = "Oi, boa tarde! Vocês fazem orçamento de instalação de ar-condicionado? Queria ver ainda esta semana.";
const REPLY = "Boa tarde, Juliana! Fazemos sim. Pode me passar o bairro e o modelo do aparelho?";

interface Step
{
    label: string;
    title: string;
    description: string;
    module: string;
}

const steps: Step[] = [
    {
        label: "Mensagem recebida",
        title: "O cliente chama no WhatsApp",
        description: "Juliana viu um anúncio e mandou mensagem para o número da sua empresa pedindo um orçamento.",
        module: "WhatsApp",
    },
    {
        label: "Conversa na InnoTalk",
        title: "A conversa chega à caixa de entrada",
        description: "A mensagem aparece na InnoTalk, junto com as conversas de toda a equipe. Ninguém precisa procurar no celular de ninguém.",
        module: "Conversas",
    },
    {
        label: "Cliente identificado",
        title: "O atendente sabe com quem está falando",
        description: "Nome, telefone, origem e histórico ficam no perfil do contato. Qualquer pessoa da equipe consegue continuar o atendimento.",
        module: "Contatos",
    },
    {
        label: "Lead no CRM",
        title: "A conversa vira uma oportunidade",
        description: "O atendente adiciona etiquetas, status e o próximo passo. Juliana deixa de ser só mais uma conversa e passa a ser acompanhada.",
        module: "Leads",
    },
    {
        label: "Negociação no funil",
        title: "A negociação avança no funil",
        description: "Com o orçamento enviado, o card vai para “Em negociação”. O gestor vê em que etapa cada oportunidade está.",
        module: "Funil",
    },
    {
        label: "Compromisso na agenda",
        title: "A visita entra na agenda",
        description: "A visita técnica é agendada sem sair do CRM e, com a conta Google conectada, aparece também no Google Calendar.",
        module: "Agenda",
    },
];

const railIcon = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const railModules: { name: string; icon: ReactNode }[] = [
    { name: "Conversas", icon: <svg {...railIcon}><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /></svg> },
    { name: "Contatos", icon: <svg {...railIcon}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></svg> },
    { name: "Leads", icon: <svg {...railIcon}><path d="M3 7h18M3 12h18M3 17h12" /></svg> },
    { name: "Funil", icon: <svg {...railIcon}><path d="M4 5h16l-6 7v6l-4 2v-8z" /></svg> },
    { name: "Agenda", icon: <svg {...railIcon}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg> },
];

const ease = [0.25, 0.1, 0.25, 1] as const;

/* -------------------------------------------------------------------------- */
/* Telas                                                                      */
/* -------------------------------------------------------------------------- */

function Avatar({ letter, active = false }: { letter: string; active?: boolean })
{
    return <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${active ? "bg-brand/25 text-brand-soft" : "bg-graphite-3 text-zinc-300"}`}>{letter}</span>;
}

function Bubble({ children, outgoing = false, delay = 0 }: { children: ReactNode; outgoing?: boolean; delay?: number })
{
    return (
        <motion.p
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, delay, ease }}
            className={`max-w-[85%] rounded-xl px-3 py-2 text-[11.5px] leading-snug ${outgoing ? "self-end rounded-tr-sm bg-brand text-white" : "rounded-tl-sm bg-graphite-3 text-zinc-200"}`}
        >
            {children}
        </motion.p>
    );
}

function PhoneScreen()
{
    return (
        <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(37,99,235,0.14),transparent_65%)] p-5">
            <div className="w-full max-w-[250px] overflow-hidden rounded-[28px] border-[6px] border-[#1d2230] bg-[#0b0e14] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)]">
                <div className="flex items-center gap-2.5 bg-[#12301f] px-3 py-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/25 text-[10px] font-bold text-emerald-300">SE</span>
                    <span className="min-w-0">
                        <span className="block truncate text-[11px] font-semibold text-white">Sua Empresa</span>
                        <span className="block text-[9px] text-emerald-300/80">online</span>
                    </span>
                </div>
                <div className="flex min-h-[230px] flex-col justify-end gap-2 p-3">
                    <span className="self-center rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[9px] text-zinc-400">Hoje</span>
                    <motion.span
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0, height: 0 }}
                        transition={{ delay: 1.1, duration: 0.2 }}
                        className="flex w-12 items-center justify-center gap-1 self-end overflow-hidden rounded-xl rounded-tr-sm bg-emerald-700/60 py-2"
                    >
                        {[0, 1, 2].map((dot) => (
                            <motion.span key={dot} className="h-1.5 w-1.5 rounded-full bg-white/70" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15 }} />
                        ))}
                    </motion.span>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.35, ease }}
                        className="self-end rounded-xl rounded-tr-sm bg-emerald-700/70 px-3 py-2 text-[11px] leading-snug text-white"
                    >
                        {FIRST_MESSAGE}
                        <span className="mt-1 block text-right text-[8.5px] text-white/60">14:32 ✓✓</span>
                    </motion.p>
                </div>
            </div>
        </div>
    );
}

const inboxOthers = [
    { name: "Marcos Teixeira", text: "Fechado, pode emitir a nota.", time: "14:05", tag: "Cliente" },
    { name: "Patrícia Nunes", text: "Vou confirmar com meu sócio.", time: "13:47", tag: "Proposta" },
    { name: "Rodrigo Alves", text: "Obrigado pelo retorno!", time: "11:20", tag: "Pós-venda" },
];

function InboxScreen()
{
    return (
        <div className="grid h-full sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="border-white/[0.07] p-3 sm:border-r">
                <div className="mb-3 flex items-center justify-between">
                    <span className="text-[12px] font-bold text-white">Conversas</span>
                    <span className="rounded-full bg-brand px-2 py-0.5 text-[9px] font-bold text-white">1 nova</span>
                </div>
                <ul className="space-y-1.5">
                    <motion.li
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.25, ease }}
                        className="flex gap-2.5 rounded-lg bg-brand/15 p-2 ring-1 ring-brand/40"
                    >
                        <Avatar letter="J" active />
                        <span className="min-w-0 flex-1">
                            <span className="flex items-center justify-between gap-2">
                                <span className="truncate text-[11px] font-semibold text-white">{CUSTOMER}</span>
                                <span className="shrink-0 text-[9px] text-brand-soft">14:32</span>
                            </span>
                            <span className="block truncate text-[10px] text-zinc-300">{FIRST_MESSAGE}</span>
                            <span className="mt-1 flex items-center justify-between">
                                <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[8.5px] font-semibold text-emerald-300">WhatsApp</span>
                                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[8.5px] font-bold text-white">1</span>
                            </span>
                        </span>
                    </motion.li>
                    {inboxOthers.map((c, index) => (
                        <motion.li key={c.name} initial={{ y: -12 }} animate={{ y: 0 }} transition={{ duration: 0.45, delay: 0.25 + index * 0.03, ease }} className="flex gap-2.5 rounded-lg p-2">
                            <Avatar letter={c.name[0]} />
                            <span className="min-w-0 flex-1">
                                <span className="flex items-center justify-between gap-2">
                                    <span className="truncate text-[11px] font-semibold text-zinc-200">{c.name}</span>
                                    <span className="shrink-0 text-[9px] text-zinc-500">{c.time}</span>
                                </span>
                                <span className="block truncate text-[10px] text-zinc-500">{c.text}</span>
                                <span className="mt-1 inline-block rounded bg-white/[0.07] px-1.5 py-0.5 text-[8.5px] text-muted">{c.tag}</span>
                            </span>
                        </motion.li>
                    ))}
                </ul>
            </div>
            <div className="hidden min-w-0 flex-col sm:flex">
                <div className="flex items-center gap-2.5 border-b border-white/[0.07] px-4 py-3">
                    <Avatar letter="J" active />
                    <span className="min-w-0">
                        <span className="block truncate text-[12px] font-semibold text-white">{CUSTOMER}</span>
                        <span className="block text-[10px] text-emerald-400">WhatsApp · agora</span>
                    </span>
                </div>
                <div className="flex flex-1 flex-col gap-2.5 p-4">
                    <Bubble delay={0.6}>{FIRST_MESSAGE}</Bubble>
                </div>
            </div>
        </div>
    );
}

function Field({ label, value, delay }: { label: string; value: ReactNode; delay: number })
{
    return (
        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay, ease }} className="flex items-center justify-between gap-3 border-b border-white/[0.06] py-2 last:border-0">
            <span className="text-[10px] text-zinc-500">{label}</span>
            <span className="truncate text-right text-[11px] font-semibold text-zinc-200">{value}</span>
        </motion.div>
    );
}

function ContactScreen()
{
    return (
        <div className="grid h-full sm:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="hidden min-w-0 flex-col border-r border-white/[0.07] sm:flex">
                <div className="flex items-center gap-2.5 border-b border-white/[0.07] px-4 py-3">
                    <Avatar letter="J" active />
                    <span className="block truncate text-[12px] font-semibold text-white">{CUSTOMER}</span>
                </div>
                <div className="flex flex-1 flex-col gap-2.5 p-4">
                    <Bubble>{FIRST_MESSAGE}</Bubble>
                    <Bubble outgoing delay={0.9}>{REPLY}</Bubble>
                </div>
            </div>
            <div className="p-4">
                <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/25 text-[15px] font-bold text-brand-soft">J</span>
                    <span className="min-w-0">
                        <span className="block truncate text-[13px] font-bold text-white">{CUSTOMER}</span>
                        <span className="block text-[10px] text-zinc-400">Perfil do contato</span>
                    </span>
                </div>
                <Field label="Telefone" value="(62) 9 •••• -4821" delay={0.15} />
                <Field label="Origem" value={<span className="text-emerald-300">WhatsApp</span>} delay={0.3} />
                <Field label="Primeiro contato" value="Hoje, 14:32" delay={0.45} />
                <Field label="Atendente" value="Você" delay={0.6} />
                <Field label="Histórico" value="1 conversa" delay={0.75} />
            </div>
        </div>
    );
}

const leadTags = ["Orçamento", "Instalação", "Prioridade"];

function LeadScreen()
{
    return (
        <div className="flex h-full items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-[400px] rounded-[14px] border border-brand/40 bg-graphite-2 p-5 shadow-[0_18px_40px_-20px_rgba(37,99,235,0.6)]">
                <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/25 text-[14px] font-bold text-brand-soft">J</span>
                        <span>
                            <span className="block text-[13px] font-bold text-white">{CUSTOMER}</span>
                            <span className="block text-[10px] text-zinc-400">Lead · criado hoje</span>
                        </span>
                    </div>
                    <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.3 }} className="rounded-full bg-sky-500/15 px-2.5 py-1 text-[10px] font-semibold text-sky-300">Novo lead</motion.span>
                </div>
                <div className="mb-4 flex flex-wrap gap-1.5">
                    {leadTags.map((tag, index) => (
                        <motion.span key={tag} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 + index * 0.25, duration: 0.3, ease }} className="rounded-md border border-brand/30 bg-brand/10 px-2 py-1 text-[10px] font-semibold text-brand-soft">
                            {tag}
                        </motion.span>
                    ))}
                </div>
                <div className="rounded-lg border border-white/[0.07] bg-graphite-3/60 px-3">
                    <Field label="Interesse" value="Instalação de 2 aparelhos" delay={1.5} />
                    <Field label="Valor estimado" value="R$ 1.800" delay={1.7} />
                    <Field label="Próximo passo" value={<span className="text-brand-soft">Enviar orçamento</span>} delay={1.9} />
                </div>
            </div>
        </div>
    );
}

const funnelColumns = [
    { stage: "Novo lead", dot: "bg-sky-400", cards: [{ name: "Fernanda Lopes", value: "R$ 950" }] },
    { stage: "Em negociação", dot: "bg-brand-soft", cards: [{ name: "Patrícia Nunes", value: "R$ 3.200" }] },
    { stage: "Fechado", dot: "bg-emerald-400", cards: [{ name: "Marcos Teixeira", value: "R$ 2.400" }] },
];

function FunnelScreen()
{
    const [moved, setMoved] = useState(false);

    useEffect(() =>
    {
        const timer = setTimeout(() => setMoved(true), 900);
        return () => clearTimeout(timer);
    }, []);

    const leadCard = (
        <motion.div layoutId="lead-juliana" transition={{ duration: 0.6, ease }} className="rounded-md border border-brand/60 bg-brand/15 p-2 shadow-[0_10px_24px_-10px_rgba(37,99,235,0.8)]">
            <span className="block truncate text-[10.5px] font-semibold text-white">{CUSTOMER}</span>
            <span className="mt-0.5 block text-[9.5px] text-zinc-300">R$ 1.800</span>
            <span className="mt-1.5 inline-block rounded bg-white/[0.1] px-1.5 py-0.5 text-[8.5px] text-white">{moved ? "Orçamento enviado" : "Orçamento"}</span>
        </motion.div>
    );

    return (
        <div className="flex h-full flex-col p-4">
            <div className="mb-3 flex items-center justify-between">
                <span className="text-[12px] font-bold text-white">Funil de vendas</span>
                <span className="text-[10px] text-zinc-500">3 etapas</span>
            </div>
            <LayoutGroup>
                <div className="grid flex-1 grid-cols-3 gap-2">
                    {funnelColumns.map((col, index) => (
                        <div key={col.stage} className={`min-w-0 rounded-lg p-2 transition-colors duration-500 ${index === 1 && moved ? "bg-brand/[0.08] ring-1 ring-brand/30" : "bg-graphite-2/70"}`}>
                            <div className="mb-2 flex items-center gap-1.5">
                                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${col.dot}`} />
                                <span className="truncate text-[9.5px] font-semibold text-zinc-200">{col.stage}</span>
                            </div>
                            <div className="space-y-1.5">
                                {index === 0 && !moved && leadCard}
                                {index === 1 && moved && leadCard}
                                {col.cards.map((card) => (
                                    <motion.div layout key={card.name} className="rounded-md border border-white/[0.07] bg-graphite-3 p-2">
                                        <span className="block truncate text-[10px] font-semibold text-zinc-200">{card.name}</span>
                                        <span className="mt-0.5 block text-[9.5px] text-zinc-500">{card.value}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </LayoutGroup>
        </div>
    );
}

const agendaDays = [
    { day: "Qua", date: "14", events: [{ time: "09:00", title: "Retorno · Patrícia" }] },
    { day: "Qui", date: "15", events: [{ time: "10:30", title: "Reunião de equipe" }], highlight: true },
    { day: "Sex", date: "16", events: [{ time: "14:00", title: "Pós-venda · Rodrigo" }] },
];

function AgendaScreen()
{
    return (
        <div className="relative flex h-full flex-col p-4">
            <div className="mb-3 flex items-center justify-between">
                <span className="text-[12px] font-bold text-white">Agenda · esta semana</span>
                <span className="rounded-md bg-brand px-2.5 py-1 text-[9.5px] font-semibold text-white">+ Novo agendamento</span>
            </div>
            <div className="grid flex-1 grid-cols-3 gap-2">
                {agendaDays.map((d) => (
                    <div key={d.day} className="min-w-0">
                        <div className={`mb-1.5 rounded-md py-1 text-center ${d.highlight ? "bg-brand/20 text-brand-soft" : "text-zinc-400"}`}>
                            <span className="block text-[9px]">{d.day}</span>
                            <span className="block text-[12px] font-bold">{d.date}</span>
                        </div>
                        <div className="flex min-h-[150px] flex-col gap-1.5 rounded-md border border-white/[0.06] bg-graphite-2/60 p-1.5">
                            {d.events.map((event) => (
                                <div key={event.title} className="rounded border-l-2 border-sky-400/50 bg-sky-500/10 px-1.5 py-1 text-sky-200">
                                    <span className="block text-[8.5px] opacity-80">{event.time}</span>
                                    <span className="block truncate text-[9.5px] font-semibold">{event.title}</span>
                                </div>
                            ))}
                            {d.highlight && (
                                <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.4, ease }} className="rounded border-l-2 border-brand-soft bg-brand/30 px-1.5 py-1 text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.9)]">
                                    <span className="block text-[8.5px] opacity-80">15:00</span>
                                    <span className="block truncate text-[9.5px] font-semibold">Visita técnica · Juliana</span>
                                </motion.div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.4, ease }} className="absolute bottom-3 right-3 flex items-center gap-2.5 rounded-xl border border-line bg-graphite-2 px-3 py-2 shadow-xl">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400">
                    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7L21 8" /><path d="M21 3v5h-5" /></svg>
                </span>
                <span>
                    <span className="block text-[10.5px] font-semibold text-white">Sincronizado</span>
                    <span className="block text-[9.5px] text-zinc-400">Google Calendar</span>
                </span>
            </motion.div>
        </div>
    );
}

const screens = [PhoneScreen, InboxScreen, ContactScreen, LeadScreen, FunnelScreen, AgendaScreen];

/* -------------------------------------------------------------------------- */
/* Seção                                                                      */
/* -------------------------------------------------------------------------- */

function ControlButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode })
{
    return (
        <button type="button" aria-label={label} title={label} onClick={onClick} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-brand-soft/60 hover:bg-brand/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft">
            {children}
        </button>
    );
}

/** Seção 5: simulação interativa da jornada de atendimento. */
export default function JourneySimulation()
{
    const prefersReducedMotion = useReducedMotion();
    const sectionRef = useRef<HTMLDivElement>(null);
    const inView = useInView(sectionRef, { amount: 0.35 });
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    // Sem autoplay para quem prefere menos movimento; o visitante navega pelos botões.
    const playing = !paused && !prefersReducedMotion && inView;

    useEffect(() =>
    {
        if (!playing) return;
        const timer = setTimeout(() => setCurrent((step) => (step + 1) % steps.length), STEP_MS);
        return () => clearTimeout(timer);
    }, [playing, current]);

    const goTo = (index: number) =>
    {
        setCurrent((index + steps.length) % steps.length);
        setPaused(true);
    };

    const step = steps[current];
    const Screen = screens[current];

    return (
        <section id="demonstracao" aria-labelledby="demonstracao-titulo" className="relative scroll-mt-[72px] overflow-hidden border-t border-line bg-ink px-6 py-20 sm:py-24 lg:py-28">
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-brand/10 blur-[130px]" />
            <MotionConfig reducedMotion="user">
                <div ref={sectionRef} className="relative mx-auto max-w-[1240px]">
                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="mx-auto mb-12 max-w-[700px] text-center sm:mb-14">
                        <p className="mb-3 text-[12px] font-extrabold tracking-[0.08em] text-brand-soft">NA PRÁTICA</p>
                        <h2 id="demonstracao-titulo" className="mb-4 text-[28px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white sm:text-[40px]">Imagine sua operação funcionando assim</h2>
                        <p className="text-[15px] leading-relaxed text-muted sm:text-[16px]">
                            Acompanhe uma mensagem do WhatsApp até virar um compromisso na agenda. São seis passos, todos dentro da InnoTalk, sem precisar criar conta para ver.
                        </p>
                    </motion.div>

                    <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-10">
                        {/* Etapas */}
                        <ol aria-label="Etapas da jornada de atendimento" className="scrollbar-hide -mx-6 flex snap-x gap-2 overflow-x-auto px-6 pb-1 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0 lg:pb-0">
                            {steps.map((item, index) =>
                            {
                                const active = index === current;
                                const done = index < current;
                                return (
                                    <li key={item.label} className="shrink-0 snap-start lg:shrink">
                                        <button
                                            type="button"
                                            onClick={() => goTo(index)}
                                            aria-current={active ? "step" : undefined}
                                            className={`relative flex w-full items-start gap-3 overflow-hidden rounded-[12px] border px-3.5 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft lg:px-4 lg:py-3.5 ${active ? "border-brand/50 bg-brand/10" : "border-transparent bg-graphite hover:border-white/10 lg:bg-transparent"}`}
                                        >
                                            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold transition-colors ${active ? "bg-brand text-white" : done ? "bg-brand/20 text-brand-soft" : "bg-white/[0.06] text-zinc-400"}`}>
                                                {done ? <svg aria-hidden="true" width="12" height="12" viewBox="0 0 20 20" fill="none"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg> : index + 1}
                                            </span>
                                            <span className="min-w-0">
                                                <span className={`block whitespace-nowrap text-[13.5px] font-bold lg:whitespace-normal lg:text-[15px] ${active ? "text-white" : "text-zinc-300"}`}>{item.label}</span>
                                                {active && <span className="mt-1 hidden text-[13.5px] leading-[1.6] text-muted lg:block">{item.description}</span>}
                                            </span>
                                            {active && playing && (
                                                <motion.span key={`progresso-${current}`} aria-hidden="true" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: STEP_MS / 1000, ease: "linear" }} className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-brand-soft" />
                                            )}
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>

                        {/* Tela */}
                        <div className="min-w-0">
                            <div className="mb-4 lg:hidden" aria-live={playing ? "off" : "polite"}>
                                <p className="text-[17px] font-bold text-white">{step.title}</p>
                                <p className="mt-1 text-[14px] leading-[1.6] text-muted">{step.description}</p>
                            </div>

                            <div role="img" aria-label={`Demonstração, etapa ${current + 1} de ${steps.length}: ${step.title}`} className="overflow-hidden rounded-[16px] border border-line bg-graphite shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(37,99,235,0.08)]">
                                <div aria-hidden="true" className="flex items-center gap-2 border-b border-white/[0.07] bg-[#0d0d12] px-4 py-3">
                                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                                    <span className="ml-3 truncate text-[11px] font-semibold text-zinc-400">{current === 0 ? "WhatsApp do cliente" : `InnoTalk · ${step.module}`}</span>
                                    <span className="ml-auto shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[9.5px] font-semibold text-zinc-400">Demonstração</span>
                                </div>
                                <div aria-hidden="true" className="grid h-[400px] grid-cols-[48px_minmax(0,1fr)] sm:h-[380px]">
                                    <nav className="flex flex-col items-center gap-1.5 border-r border-white/[0.07] bg-[#0d0d12] py-3">
                                        <span className="mb-2 flex h-6 w-6 items-center justify-center rounded-md bg-brand text-[11px] font-extrabold text-white">I</span>
                                        {railModules.map((module) => (
                                            <span key={module.name} className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-300 ${module.name === step.module ? "bg-brand/25 text-white" : "text-zinc-500"}`}>
                                                {module.icon}
                                            </span>
                                        ))}
                                    </nav>
                                    <div className="relative min-w-0 overflow-hidden">
                                        <AnimatePresence mode="wait" initial={false}>
                                            <motion.div key={current} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease }} className="h-full">
                                                <Screen />
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <ControlButton label="Etapa anterior" onClick={() => goTo(current - 1)}>
                                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                    </ControlButton>
                                    {!prefersReducedMotion && (
                                        <ControlButton label={paused ? "Reproduzir demonstração" : "Pausar demonstração"} onClick={() => setPaused((value) => !value)}>
                                            {paused
                                                ? <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l12-7.5z" /></svg>
                                                : <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>}
                                        </ControlButton>
                                    )}
                                    <ControlButton label="Próxima etapa" onClick={() => goTo(current + 1)}>
                                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                    </ControlButton>
                                    <span className="ml-2 text-[13px] tabular-nums text-muted">{current + 1} / {steps.length}</span>
                                </div>
                                <a href={signupUrl} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[9px] bg-brand px-5 text-[14px] font-bold text-white transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft">
                                    Testar na minha empresa
                                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </a>
                            </div>
                            <p className="mt-4 text-[12.5px] leading-relaxed text-zinc-500">
                                Demonstração ilustrativa: nomes, mensagens e valores são fictícios. As telas representam recursos disponíveis na InnoTalk; a sincronização com o Google Calendar acontece quando a conta Google está conectada.
                            </p>
                        </div>
                    </div>
                </div>
            </MotionConfig>
        </section>
    );
}
