"use client";

import { useState } from "react";
import Logo from "@/components/Logo";
import DashboardPreview from "@/components/DashboardPreview";

const loginUrl = "https://crm.innotalk.com.br/login";
const navLinks = [
    { href: "#", label: "Início" },
    { href: "#recursos", label: "Recursos" },
    { href: "#planos", label: "Planos" },
    { href: "#depoimentos", label: "Depoimentos" },
    { href: "#duvidas", label: "Dúvidas" },
];

export function LandingHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 h-[72px] border-b border-white/10 bg-[#0b1f3a]/95 backdrop-blur-md">
            <div className="mx-auto flex h-full max-w-[1240px] items-center justify-between px-5 lg:px-6">
                <a href="#" aria-label="InnoTalk, início" className="shrink-0"><Logo size="sm" textClassName="text-white" /></a>
                <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex">
                    {navLinks.map((link) => <a key={link.label} href={link.href} className="text-[14px] font-semibold text-slate-300 transition-colors hover:text-white">{link.label}</a>)}
                </nav>
                <div className="hidden items-center gap-5 lg:flex">
                    <a href={loginUrl} className="text-[14px] font-bold text-white transition-colors hover:text-[#8fb2ff]">Entrar</a>
                    <a href={loginUrl} className="rounded-[9px] bg-[#2864df] px-5 py-3 text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-[#2056c8]">Começar agora</a>
                </div>
                <button type="button" aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)} className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden">
                    <span className="flex w-6 flex-col gap-[5px]" aria-hidden="true">
                        <span className={`h-[2px] w-full bg-current transition-transform ${isMenuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                        <span className={`h-[2px] w-full bg-current transition-opacity ${isMenuOpen ? "opacity-0" : ""}`} />
                        <span className={`h-[2px] w-full bg-current transition-transform ${isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
                    </span>
                </button>
            </div>
            {isMenuOpen && <div className="absolute inset-x-0 top-full border-b border-white/10 bg-[#0b1f3a] px-5 py-4 shadow-lg lg:hidden">
                <nav aria-label="Navegação mobile" className="mx-auto flex max-w-[1240px] flex-col">
                    {navLinks.map((link) => <a key={link.label} href={link.href} onClick={() => setIsMenuOpen(false)} className="border-b border-white/10 py-3.5 text-[15px] font-semibold text-slate-200">{link.label}</a>)}
                    <div className="flex gap-3 pt-4">
                        <a href={loginUrl} onClick={() => setIsMenuOpen(false)} className="flex-1 rounded-[9px] border border-white/20 px-4 py-3 text-center text-sm font-bold text-white">Entrar</a>
                        <a href={loginUrl} onClick={() => setIsMenuOpen(false)} className="flex-1 rounded-[9px] bg-[#2864df] px-4 py-3 text-center text-sm font-bold text-white">Começar agora</a>
                    </div>
                </nav>
            </div>}
        </header>
    );
}

export function LandingHero() {
    return (
        <section className="mt-[26px] bg-[#0b1f3a] px-6 pb-[63px] pt-[78px] lg:mt-0 lg:min-h-[732px] lg:px-6 lg:pb-24 lg:pt-[76px]">
            <div className="mx-auto grid max-w-[1240px] items-center gap-[35px] lg:translate-y-[27px] lg:grid-cols-[460px_minmax(0,1fr)] lg:gap-[56px]">
                <div className="mx-0 w-full lg:max-w-[460px] lg:mx-0 lg:translate-y-[-27px]">
                    <div className="mb-5 inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-bold text-[#8fb2ff]">CRM + WhatsApp + Agenda + Dashboard</div>
                    <h1 className="mb-5 text-[34px] font-extrabold leading-[1.16] tracking-[-0.025em] text-white sm:text-[36.8px] lg:text-[43px]">
                        Atenda pelo WhatsApp.<br />Organize seus clientes.<br /><span className="text-[#5b8def]">Feche mais negócios.</span>
                    </h1>
                    <p className="mb-8 max-w-[440px] text-[16px] leading-[1.6] text-slate-300 sm:text-[17px]">Centralize conversas, leads, agenda e gestão em um único lugar.</p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <a href={loginUrl} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[9px] bg-[#2864df] px-[22px] text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-[#2056c8]">
                            Começar agora<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </a>
                        <a href="#recursos" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[9px] border border-white/20 px-[22px] text-[14px] font-bold text-white transition-colors hover:border-white/30 hover:bg-white/5">
                            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4z" /></svg>Ver como funciona
                        </a>
                    </div>
                    <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-medium text-slate-300 sm:gap-x-6">
                        {["Fácil de usar", "Suporte especializado", "Sem complicação"].map((item) => <li key={item} className="inline-flex items-center gap-1.5 whitespace-nowrap"><svg aria-hidden="true" width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="m4 10 4 4 8-8" stroke="#5b8def" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>{item}</li>)}
                    </ul>
                </div>
                <DashboardPreview />
            </div>
        </section>
    );
}

const resourceCards = [
    {
        title: "WhatsApp centralizado",
        description: "Receba e gerencie todas as conversas do WhatsApp em um só lugar, com mais agilidade e organização.",
        icon: <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5Z" /></svg>,
    },
    {
        title: "CRM de leads",
        description: "Acompanhe cada oportunidade, organize seus leads e nunca mais perca um cliente em potencial.",
        icon: <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6m3-3h-6" /></svg>,
    },
    {
        title: "Agenda integrada",
        description: "Conecte sua agenda ao Google Calendar e facilite o agendamento de reuniões e atendimentos.",
        icon: <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>,
    },
];

export function LandingResources() {
    return (
        <section id="recursos" className="scroll-mt-[72px] bg-[#0b1f3a] px-6 pb-24 pt-5">
            <div className="mx-auto grid max-w-[1240px] gap-10 md:grid-cols-3">
                {resourceCards.map((resource) => <article key={resource.title} className="min-w-0 md:min-h-[180px]">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/10 text-[#8fb2ff]">{resource.icon}</div>
                    <h2 className="mb-2 text-[18px] font-extrabold leading-[1.35] text-white">{resource.title}</h2>
                    <p className="max-w-[390px] text-[14px] leading-[1.65] text-slate-300">{resource.description}</p>
                </article>)}
            </div>
        </section>
    );
}

export function LandingFinalCTA() {
    return (
        <section className="border-t border-white/10 bg-[#0b1f3a] px-6 py-12 text-white sm:py-14 lg:py-[63.5px]">
            <div className="mx-auto flex max-w-[1180px] flex-col gap-7 text-center md:flex-row md:items-center md:justify-between md:gap-10 md:text-left">
                <div className="max-w-[440px]">
                    <h2 className="text-[27.2px] font-extrabold leading-[1.3]">Pronto para transformar<br className="hidden sm:block" /> seu atendimento?</h2>
                    <p className="mt-2.5 text-[15.2px] leading-[1.42] text-slate-300">Comece agora mesmo e veja como o InnoTalk pode impulsionar o seu negócio.</p>
                </div>
                <div className="flex shrink-0 flex-col items-center md:items-start">
                    <a href={loginUrl} className="inline-flex min-h-[53px] min-w-[195px] items-center justify-center gap-2 rounded-[10px] bg-[#2563eb] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#1d4ed8]">
                        Começar agora<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                    <p className="mt-3 text-[12px] text-slate-300">Sem cartão de crédito</p>
                </div>
            </div>
        </section>
    );
}

export function LandingFooter() {
    return (
        <footer className="border-t border-white/10 bg-[#0b1f3a] px-6 py-7">
            <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-5 sm:flex-row">
                <a href="#" aria-label="InnoTalk, início" className="shrink-0"><Logo size="sm" textClassName="text-white" /></a>
                <nav aria-label="Navegação do rodapé" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[13px] font-semibold text-slate-300">
                    {navLinks.map((link) => <a key={link.label} href={link.href} className="transition-colors hover:text-white">{link.label}</a>)}
                </nav>
                <div className="flex items-center gap-3 text-slate-400">
                    <a href="#" aria-label="Instagram" className="transition-colors hover:text-white"><svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg></a>
                    <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-white"><svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M5.2 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.5 9h3.4v11.5H3.5zm5.7 0h3.2v1.6h.1A3.6 3.6 0 0 1 15.8 8c3.5 0 4.2 2.3 4.2 5.2v7.3h-3.4V14c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3v6.6H9.2z" /></svg></a>
                    <a href="#" aria-label="YouTube" className="transition-colors hover:text-white"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15.4V8.6l6 3.4z" /></svg></a>
                </div>
            </div>
        </footer>
    );
}
