"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import Logo from "@/components/Logo";
import DashboardPreview from "@/components/DashboardPreview";
import { AgendaMockup, InboxMockup, PipelineMockup } from "@/components/FeatureMockups";
import { fadeInUp, staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";

const CRM_URL =
    process.env.NEXT_PUBLIC_CRM_URL?.replace(/\/$/, "") ?? "https://crm.innotalk.com.br";

/** "Entrar" vai para o login; "Começar grátis" vai para o cadastro (trial de 14 dias). */
const loginUrl = `${CRM_URL}/login`;
const signupUrl = `${CRM_URL}/cadastro`;
const whatsappUrl = "https://wa.me/5562998009542";

/** Só âncoras de seções que a página realmente renderiza (ver app/page.tsx). */
const navLinks = [
    { href: "#", label: "Início" },
    { href: "#recursos", label: "Solução" },
    { href: "#demonstracao", label: "Como funciona" },
    { href: "#planos", label: "Planos" },
    { href: "#duvidas", label: "Dúvidas" },
    { href: "#contato", label: "Contato" },
];

const arrowIcon = <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;

export function LandingHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 h-[72px] border-b border-line bg-ink/90 backdrop-blur-md">
            <div className="mx-auto flex h-full max-w-[1240px] items-center justify-between px-5 lg:px-6">
                <a href="#" aria-label="InnoTalk, início" className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-soft"><Logo size="sm" textClassName="text-white" /></a>
                <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex">
                    {navLinks.map((link) => <a key={link.label} href={link.href} className="rounded text-[14px] font-semibold text-muted transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-soft">{link.label}</a>)}
                </nav>
                <div className="hidden items-center gap-5 lg:flex">
                    <a href={loginUrl} className="rounded text-[14px] font-bold text-white transition-colors hover:text-brand-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-soft">Entrar</a>
                    <a href={signupUrl} className="rounded-[9px] bg-brand px-5 py-3 text-[14px] font-bold text-white shadow-[0_8px_24px_-12px_rgba(37,99,235,0.7)] transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft">Começar grátis</a>
                </div>
                <button type="button" aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={isMenuOpen} aria-controls="menu-mobile" onClick={() => setIsMenuOpen((open) => !open)} className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-brand-soft lg:hidden">
                    <span className="flex w-6 flex-col gap-[5px]" aria-hidden="true">
                        <span className={`h-[2px] w-full bg-current transition-transform ${isMenuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                        <span className={`h-[2px] w-full bg-current transition-opacity ${isMenuOpen ? "opacity-0" : ""}`} />
                        <span className={`h-[2px] w-full bg-current transition-transform ${isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
                    </span>
                </button>
            </div>
            {isMenuOpen && <div id="menu-mobile" className="absolute inset-x-0 top-full border-b border-line bg-ink px-5 py-4 shadow-lg lg:hidden">
                <nav aria-label="Navegação mobile" className="mx-auto flex max-w-[1240px] flex-col">
                    {navLinks.map((link) => <a key={link.label} href={link.href} onClick={() => setIsMenuOpen(false)} className="border-b border-line py-3.5 text-[15px] font-semibold text-zinc-200">{link.label}</a>)}
                    <div className="flex gap-3 pt-4">
                        <a href={loginUrl} onClick={() => setIsMenuOpen(false)} className="flex-1 rounded-[9px] border border-white/20 px-4 py-3 text-center text-sm font-bold text-white">Entrar</a>
                        <a href={signupUrl} onClick={() => setIsMenuOpen(false)} className="flex-1 rounded-[9px] bg-brand px-4 py-3 transition-colors hover:bg-brand-hover text-center text-sm font-bold text-white">Começar grátis</a>
                    </div>
                </nav>
            </div>}
        </header>
    );
}

const checkIcon = <svg width="11" height="11" viewBox="0 0 20 20" fill="none"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;

const heroTrustItems = ["14 dias grátis", "Sem cartão de crédito", "Sem instalar programas", "Suporte especializado"];

export function LandingHero() {
    return (
        <section aria-labelledby="hero-titulo" className="relative overflow-hidden bg-ink px-6 pb-16 pt-14 sm:pt-20 lg:min-h-[732px] lg:pb-24 lg:pt-[76px]">
            <div aria-hidden="true" className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[620px] rounded-full bg-brand/20 blur-[120px]" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_65%)]" />
            <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:gap-12">
                <div className="w-full">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5 text-[12px] font-bold text-brand-soft">
                        <span aria-hidden="true" className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-soft opacity-60 motion-reduce:animate-none" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-soft" />
                        </span>
                        CRM para WhatsApp · Funil de vendas · Agenda
                    </div>
                    <h1 id="hero-titulo" className="mb-5 text-[34px] font-extrabold leading-[1.12] tracking-[-0.03em] text-white sm:text-[42px] lg:text-[46px]">
                        Seus clientes não podem esperar. <span className="text-brand">Suas oportunidades não podem se perder.</span>
                    </h1>
                    <p className="mb-8 max-w-[480px] text-[16px] leading-[1.65] text-muted sm:text-[17px]">
                        Centralize seu WhatsApp, organize seus leads e acompanhe cada oportunidade em um só lugar. Com a InnoTalk, sua empresa transforma conversas em oportunidades reais de negócio.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                        <a href={signupUrl} className="inline-flex min-h-[52px] items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-brand px-6 text-[15px] font-bold text-white shadow-[0_10px_30px_-12px_rgba(37,99,235,0.75)] transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft">
                            Começar grátis por 14 dias{arrowIcon}
                        </a>
                        <a href="#demonstracao" className="inline-flex min-h-[52px] items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border border-white/20 px-6 text-[15px] font-bold text-white transition-colors hover:border-white/30 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft">
                            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4z" /></svg>Conhecer a plataforma
                        </a>
                    </div>
                    <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] font-medium text-muted">
                        {heroTrustItems.map((item) => <li key={item} className="inline-flex items-center gap-1.5 whitespace-nowrap"><svg aria-hidden="true" width="13" height="13" viewBox="0 0 20 20" fill="none" className="text-brand-soft"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>{item}</li>)}
                    </ul>
                </div>
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }} className="min-w-0">
                    <DashboardPreview />
                </motion.div>
            </div>
        </section>
    );
}

interface Pillar {
    id: string;
    number: string;
    eyebrow: string;
    summary: string;
    title: string;
    description: string;
    highlights: string[];
    /** Dores da seção #problemas que este pilar resolve */
    solves: string[];
    cta: { label: string; href: string };
    mockup: ReactNode;
}

const pillars: Pillar[] = [
    {
        id: "pilar-atendimento",
        number: "01",
        eyebrow: "Atendimento organizado",
        summary: "As conversas do WhatsApp centralizadas e visíveis para a equipe.",
        title: "Todas as conversas do WhatsApp em uma só caixa de entrada",
        description: "Conecte o WhatsApp da empresa à InnoTalk e atenda com toda a equipe no mesmo lugar. Cada contato fica com etiquetas, status e histórico, então quem assume o atendimento sabe exatamente onde a conversa parou.",
        highlights: ["Conversas da equipe em uma única caixa de entrada", "Contatos organizados com etiquetas e status", "Histórico de atendimento sempre à mão"],
        solves: ["Clientes esperando resposta", "Conversas em vários celulares"],
        cta: { label: "Começar grátis por 14 dias", href: signupUrl },
        mockup: <InboxMockup />,
    },
    {
        id: "pilar-vendas",
        number: "02",
        eyebrow: "Vendas sob controle",
        summary: "Leads e negociações acompanhados etapa por etapa no funil.",
        title: "Cada lead acompanhado do primeiro contato ao fechamento",
        description: "Organize seus leads em um funil com as etapas do seu processo comercial. Você vê quem está em negociação, quem precisa de retorno e o que foi ganho ou perdido, sem depender da memória de ninguém.",
        highlights: ["Funil com etapas personalizadas de atendimento e vendas", "Negociações em andamento, ganhas e perdidas", "Etiquetas e status para priorizar os retornos"],
        solves: ["Leads esquecidos", "Negociações sem controle"],
        cta: { label: "Ver a jornada completa", href: "#demonstracao" },
        mockup: <PipelineMockup />,
    },
    {
        id: "pilar-gestao",
        number: "03",
        eyebrow: "Gestão inteligente",
        summary: "Indicadores no dashboard e compromissos organizados na agenda.",
        title: "Indicadores e compromissos para decidir com clareza",
        description: "Acompanhe as métricas de atendimento no dashboard e organize a agenda sem sair do CRM. Os compromissos criados na InnoTalk são sincronizados com o Google Calendar e ficam vinculados ao contato.",
        highlights: ["Métricas de atendimento no dashboard", "Agenda sincronizada com o Google Calendar", "Tarefas e compromissos vinculados ao contato"],
        solves: ["Agendamentos desorganizados", "Gestor sem visibilidade"],
        cta: { label: "Comparar os planos", href: "#planos" },
        mockup: <AgendaMockup />,
    },
];

export function LandingResources() {
    return (
        <section id="recursos" aria-labelledby="recursos-titulo" className="relative scroll-mt-[72px] overflow-hidden border-t border-line bg-ink px-6 py-20 sm:py-24 lg:py-28">
            <MotionConfig reducedMotion="user">
                <div className="mx-auto max-w-[1240px]">
                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="mx-auto mb-12 max-w-[720px] text-center lg:mb-14">
                        <p className="mb-3 text-[12px] font-extrabold tracking-[0.08em] text-brand-soft">A SOLUÇÃO</p>
                        <h2 id="recursos-titulo" className="mb-4 text-[28px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white sm:text-[40px]">Sua operação comercial, finalmente conectada</h2>
                        <p className="text-[15px] leading-relaxed text-muted sm:text-[16px]">A InnoTalk reúne atendimento pelo WhatsApp, CRM, funil de vendas e agenda em uma única plataforma. Sua equipe trabalha no mesmo lugar e você acompanha cada oportunidade de perto.</p>
                    </motion.div>

                    <motion.ol variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} aria-label="Pilares da InnoTalk" className="mb-20 hidden gap-4 md:grid md:grid-cols-3 lg:mb-28">
                        {pillars.map((pillar) => (
                            <motion.li key={pillar.id} variants={staggerItem}>
                                <a href={`#${pillar.id}`} className="group flex h-full flex-col rounded-[14px] border border-line bg-graphite p-6 transition-colors hover:border-brand/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft">
                                    <span className="mb-6 [font-family:var(--font-geist-mono),monospace] text-[13px] font-semibold text-brand-soft">{pillar.number}</span>
                                    <span className="mb-2 text-[18px] font-extrabold text-white">{pillar.eyebrow}</span>
                                    <span className="text-[14px] leading-[1.6] text-muted">{pillar.summary}</span>
                                </a>
                            </motion.li>
                        ))}
                    </motion.ol>

                    <div className="flex flex-col gap-20 sm:gap-24 lg:gap-32">
                        {pillars.map((pillar, index) => {
                            const reversed = index % 2 === 1;
                            return (
                                <article key={pillar.id} id={pillar.id} className="grid scroll-mt-[100px] items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
                                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`min-w-0 ${reversed ? "lg:order-2" : ""}`}>
                                        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[12px] font-bold text-brand-soft">
                                            <span className="[font-family:var(--font-geist-mono),monospace]">{pillar.number}</span>
                                            <span aria-hidden="true" className="h-3 w-px bg-brand-soft/40" />
                                            {pillar.eyebrow}
                                        </span>
                                        <h3 className="mb-4 text-[26px] font-extrabold leading-[1.2] tracking-[-0.02em] text-white sm:text-[32px]">{pillar.title}</h3>
                                        <p className="mb-6 max-w-[520px] text-[15px] leading-[1.7] text-muted sm:text-[16px]">{pillar.description}</p>
                                        <ul className="mb-6 space-y-3">
                                            {pillar.highlights.map((item) => (
                                                <li key={item} className="flex items-start gap-3 text-[14px] leading-[1.5] text-zinc-200 sm:text-[15px]">
                                                    <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-soft">{checkIcon}</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="mb-8 flex flex-wrap items-center gap-2 text-[12.5px] text-zinc-500">
                                            <span className="font-semibold text-zinc-400">Resolve:</span>
                                            {pillar.solves.map((pain) => (
                                                <span key={pain} className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] px-2.5 py-1 text-zinc-400">
                                                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-rose-400/80" />{pain}
                                                </span>
                                            ))}
                                        </p>
                                        <a href={pillar.cta.href} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[9px] bg-brand px-6 text-[14px] font-bold text-white shadow-[0_10px_30px_-14px_rgba(37,99,235,0.8)] transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft sm:w-auto">
                                            {pillar.cta.label}{arrowIcon}
                                        </a>
                                    </motion.div>
                                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`relative min-w-0 ${reversed ? "lg:order-1" : ""}`}>
                                        <div aria-hidden="true" className={`pointer-events-none absolute top-1/2 h-[70%] w-[70%] -translate-y-1/2 rounded-full bg-brand/20 blur-[90px] ${reversed ? "left-0" : "right-0"}`} />
                                        <div className="relative">{pillar.mockup}</div>
                                    </motion.div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </MotionConfig>
        </section>
    );
}

export function LandingFinalCTA() {
    return (
        <section aria-labelledby="cta-final-titulo" className="relative overflow-hidden border-t border-line bg-ink px-6 py-20 text-white sm:py-24 lg:py-28">
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[820px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[110px]" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />
            <MotionConfig reducedMotion="user">
                <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="relative mx-auto max-w-[860px] text-center">
                    <h2 id="cta-final-titulo" className="text-[30px] font-extrabold leading-[1.15] tracking-[-0.025em] sm:text-[44px]">Chega de perder oportunidades por falta de organização.</h2>
                    <p className="mx-auto mt-5 max-w-[600px] text-[16px] leading-[1.65] text-muted sm:text-[17px]">Comece a transformar a maneira como sua empresa atende, acompanha clientes e gerencia suas vendas.</p>
                    <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <a href={signupUrl} className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-[10px] bg-brand px-7 text-[15px] font-bold text-white shadow-[0_14px_36px_-14px_rgba(37,99,235,0.9)] transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft sm:w-auto">
                            Começar grátis por 14 dias{arrowIcon}
                        </a>
                        <a href="#contato" className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-[10px] border border-white/20 px-7 text-[15px] font-bold text-white transition-colors hover:border-white/30 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft sm:w-auto">
                            Falar com a equipe
                        </a>
                    </div>
                    <p className="mt-5 text-[13px] text-muted">Não é necessário cartão de crédito · 14 dias para testar com a sua equipe</p>
                </motion.div>
            </MotionConfig>
        </section>
    );
}

const footerColumns: { title: string; items: { label: string; href?: string; external?: boolean }[] }[] = [
    {
        title: "Navegação",
        items: [
            { label: "Início", href: "#" },
            { label: "Solução", href: "#recursos" },
            { label: "Como funciona", href: "#demonstracao" },
            { label: "Planos", href: "#planos" },
            { label: "Dúvidas", href: "#duvidas" },
        ],
    },
    {
        title: "Contato",
        items: [
            { label: "Falar com a InnoTalk →", href: whatsappUrl, external: true },
            { label: "+55 62 99800-9542", href: "tel:+5562998009542" },
            { label: "comercial@innoprobusiness.com.br", href: "mailto:comercial@innoprobusiness.com.br" },
        ],
    },
    {
        title: "Empresa",
        items: [
            { label: "Goiânia - GO" },
            { label: "Área do cliente", href: loginUrl },
            { label: "Privacidade", href: "/politica-privacidade" },
        ],
    },
];

const footerLinkClass = "rounded-sm text-[14px] text-[#9fb0cf] transition-colors duration-200 hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-soft";

export function LandingFooter() {
    return (
        <footer className="border-t border-line bg-[#202123] px-6 text-zinc-100">
            <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-x-10 gap-y-10 py-12 sm:grid-cols-2 sm:py-14 lg:grid-cols-4 lg:gap-x-16">
                <div>
                    <a href="#" aria-label="InnoTalk, início" className="inline-flex rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-soft"><Logo size="sm" textClassName="text-white" /></a>
                    <p className="mt-4 max-w-[260px] text-[14px] leading-relaxed text-[#9fb0cf]">Inovação que impulsiona resultados.</p>
                </div>
                {footerColumns.map((column) => (
                    <nav key={column.title} aria-label={column.title} className="min-w-0">
                        <h2 className="mb-4 text-[12px] font-extrabold uppercase tracking-[0.14em] text-white">{column.title}</h2>
                        <ul className="flex flex-col gap-3">
                            {column.items.map((item) => (
                                <li key={item.label} className="break-words">
                                    {!item.href ? (
                                        <span className="text-[14px] text-[#9fb0cf]">{item.label}</span>
                                    ) : item.href.startsWith("/") ? (
                                        <Link href={item.href} className={footerLinkClass}>{item.label}</Link>
                                    ) : (
                                        <a href={item.href} className={footerLinkClass} {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{item.label}</a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                ))}
            </div>
            <div className="mx-auto max-w-[1180px] border-t border-line py-6">
                <p className="text-center text-[13px] text-[#9fb0cf]">© {new Date().getFullYear()} InnoTalk. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}
