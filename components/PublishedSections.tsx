"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import Logo from "@/components/Logo";
import DashboardPreview from "@/components/DashboardPreview";
import { AgendaMockup, InboxMockup, PipelineMockup } from "@/components/FeatureMockups";
import { fadeInUp, viewportConfig } from "@/lib/animations";

const CRM_URL =
    process.env.NEXT_PUBLIC_CRM_URL?.replace(/\/$/, "") ?? "https://crm.innotalk.com.br";

/** "Entrar" vai para o login; "Começar grátis" vai para o cadastro (trial de 14 dias). */
const loginUrl = `${CRM_URL}/login`;
const signupUrl = `${CRM_URL}/cadastro`;
const whatsappUrl = "https://wa.me/5562998009542";

/** Só âncoras de seções que a página realmente renderiza (ver app/page.tsx). */
const navLinks = [
    { href: "#", label: "Início" },
    { href: "#recursos", label: "Recursos" },
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

export function LandingHero() {
    return (
        <section className="relative mt-[26px] overflow-hidden bg-ink px-6 pb-[63px] pt-[78px] lg:mt-0 lg:min-h-[732px] lg:px-6 lg:pb-24 lg:pt-[76px]">
            <div aria-hidden="true" className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[620px] rounded-full bg-brand/20 blur-[120px]" />
            <div className="relative mx-auto grid max-w-[1240px] items-center gap-[35px] lg:translate-y-[27px] lg:grid-cols-[460px_minmax(0,1fr)] lg:gap-[56px]">
                <div className="mx-0 w-full lg:max-w-[460px] lg:mx-0 lg:translate-y-[-27px]">
                    <div className="mb-5 inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5 text-[12px] font-bold text-brand-soft">CRM + WhatsApp + Agenda + Dashboard</div>
                    <h1 className="mb-5 text-[34px] font-extrabold leading-[1.16] tracking-[-0.025em] text-white sm:text-[36.8px] lg:text-[43px]">
                        Atenda pelo WhatsApp.<br />Organize seus clientes.<br /><span className="text-brand">Feche mais negócios.</span>
                    </h1>
                    <p className="mb-8 max-w-[440px] text-[16px] leading-[1.6] text-muted sm:text-[17px]">Centralize conversas, leads, agenda e gestão em um único lugar.</p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <a href={signupUrl} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[9px] bg-brand px-[22px] text-[14px] font-bold text-white shadow-[0_10px_30px_-12px_rgba(37,99,235,0.75)] transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft">
                            Começar grátis{arrowIcon}
                        </a>
                        <a href="#recursos" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[9px] border border-white/20 px-[22px] text-[14px] font-bold text-white transition-colors hover:border-white/30 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft">
                            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4z" /></svg>Ver como funciona
                        </a>
                    </div>
                    <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-medium text-muted sm:gap-x-6">
                        {["14 dias grátis", "Sem cartão de crédito", "Suporte especializado", "Sem complicação"].map((item) => <li key={item} className="inline-flex items-center gap-1.5 whitespace-nowrap"><svg aria-hidden="true" width="13" height="13" viewBox="0 0 20 20" fill="none" className="text-brand-soft"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>{item}</li>)}
                    </ul>
                </div>
                <DashboardPreview />
            </div>
        </section>
    );
}

interface FeatureBlock {
    eyebrow: string;
    title: string;
    description: string;
    highlights: string[];
    cta: { label: string; href: string };
    mockup: ReactNode;
}

const featureBlocks: FeatureBlock[] = [
    {
        eyebrow: "WhatsApp centralizado",
        title: "Controle completo do seu atendimento",
        description: "Receba e gerencie todas as conversas do WhatsApp em um só lugar. Cada contato fica organizado com etiquetas, status e o histórico completo de atendimento, para qualquer pessoa da equipe retomar a conversa sem perder o contexto.",
        highlights: ["Conversas da equipe em uma única caixa de entrada", "Contatos organizados com etiquetas e status", "Histórico de atendimento sempre à mão"],
        cta: { label: "Ver os planos", href: "#planos" },
        mockup: <InboxMockup />,
    },
    {
        eyebrow: "CRM de leads",
        title: "Mais oportunidades de negócio",
        description: "Acompanhe cada lead em um funil com etapas personalizadas. Com as negociações organizadas e visíveis, sua equipe identifica quem precisa de retorno, prioriza as melhores oportunidades e faz uma gestão comercial mais clara.",
        highlights: ["Funil com etapas de atendimento e vendas", "Ganhos, perdas e negociações em andamento", "Métricas de atendimento no dashboard"],
        cta: { label: "Falar com a equipe", href: "#contato" },
        mockup: <PipelineMockup />,
    },
    {
        eyebrow: "Agenda integrada",
        title: "Ganho de tempo e produtividade",
        description: "Agende reuniões e atendimentos sem sair do CRM. A agenda se conecta ao Google Calendar e sincroniza os compromissos criados na InnoTalk, reduzindo tarefas manuais e deixando a rotina da equipe mais leve.",
        highlights: ["Sincronização com o Google Calendar", "Agendamentos vinculados ao contato", "Tarefas e compromissos em um só lugar"],
        cta: { label: "Tirar dúvidas", href: "#duvidas" },
        mockup: <AgendaMockup />,
    },
];

export function LandingResources() {
    return (
        <section id="recursos" aria-labelledby="recursos-titulo" className="relative scroll-mt-[72px] overflow-hidden border-t border-white/[0.06] bg-ink px-6 py-20 sm:py-24 lg:py-28">
            <MotionConfig reducedMotion="user">
                <div className="mx-auto max-w-[1240px]">
                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="mx-auto mb-16 max-w-[640px] text-center lg:mb-24">
                        <p className="mb-3 text-[12px] font-extrabold tracking-[0.08em] text-brand-soft">RECURSOS</p>
                        <h2 id="recursos-titulo" className="mb-4 text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-[36px]">Tudo o que sua equipe precisa para atender e vender melhor</h2>
                        <p className="text-[15px] leading-relaxed text-zinc-400 sm:text-[16px]">WhatsApp, leads e agenda trabalhando juntos, em uma plataforma pensada para a rotina comercial.</p>
                    </motion.div>

                    <div className="flex flex-col gap-20 sm:gap-24 lg:gap-32">
                        {featureBlocks.map((block, index) => {
                            const reversed = index % 2 === 1;
                            return (
                                <article key={block.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
                                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`min-w-0 ${reversed ? "lg:order-2" : ""}`}>
                                        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[12px] font-bold text-brand-soft">
                                            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-soft" />{block.eyebrow}
                                        </span>
                                        <h3 className="mb-4 text-[26px] font-extrabold leading-[1.2] tracking-[-0.02em] text-white sm:text-[32px]">{block.title}</h3>
                                        <p className="mb-6 max-w-[520px] text-[15px] leading-[1.7] text-muted sm:text-[16px]">{block.description}</p>
                                        <ul className="mb-8 space-y-3">
                                            {block.highlights.map((item) => (
                                                <li key={item} className="flex items-start gap-3 text-[14px] leading-[1.5] text-muted sm:text-[15px]">
                                                    <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-soft">
                                                        <svg width="11" height="11" viewBox="0 0 20 20" fill="none"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                    </span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <a href={block.cta.href} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[9px] bg-brand px-6 text-[14px] font-bold text-white shadow-[0_10px_30px_-14px_rgba(37,99,235,0.8)] transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft sm:w-auto">
                                            {block.cta.label}{arrowIcon}
                                        </a>
                                    </motion.div>
                                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`relative min-w-0 ${reversed ? "lg:order-1" : ""}`}>
                                        <div aria-hidden="true" className={`pointer-events-none absolute top-1/2 h-[70%] w-[70%] -translate-y-1/2 rounded-full bg-brand/20 blur-[90px] ${reversed ? "left-0" : "right-0"}`} />
                                        <div className="relative">{block.mockup}</div>
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
        <section className="relative overflow-hidden border-t border-line bg-ink px-6 py-12 text-white sm:py-14 lg:py-[63.5px]">
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[100px]" />
            <div className="relative mx-auto flex max-w-[1180px] flex-col gap-7 text-center md:flex-row md:items-center md:justify-between md:gap-10 md:text-left">
                <div className="max-w-[440px]">
                    <h2 className="text-[27.2px] font-extrabold leading-[1.3]">Pronto para transformar<br className="hidden sm:block" /> seu atendimento?</h2>
                    <p className="mt-2.5 text-[15.2px] leading-[1.42] text-muted">Comece agora mesmo e veja como o InnoTalk pode impulsionar o seu negócio.</p>
                </div>
                <div className="flex shrink-0 flex-col items-center md:items-start">
                    <a href={signupUrl} className="inline-flex min-h-[53px] min-w-[195px] items-center justify-center gap-2 rounded-[10px] bg-brand px-6 text-[14px] font-bold text-white transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft">
                        Começar grátis{arrowIcon}
                    </a>
                    <p className="mt-3 text-[12px] text-muted">14 dias grátis · sem cartão de crédito</p>
                </div>
            </div>
        </section>
    );
}

const footerColumns: { title: string; items: { label: string; href?: string; external?: boolean }[] }[] = [
    {
        title: "Navegação",
        items: [
            { label: "Início", href: "#" },
            { label: "Soluções", href: "#recursos" },
            { label: "Como funciona", href: "#duvidas" },
            { label: "Resultados", href: "#planos" },
            { label: "Sobre", href: "#duvidas" },
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
