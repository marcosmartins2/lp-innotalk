import type { ReactNode } from "react";

/**
 * Mockups ilustrativos da interface da InnoTalk usados na seção de recursos.
 * Feitos em JSX/CSS (sem imagens) para combinar com o DashboardPreview do hero.
 * Os dados exibidos são apenas de exemplo.
 */

function MockupFrame({ title, label, children }: { title: string; label: string; children: ReactNode })
{
    return (
        <div role="img" aria-label={label} className="overflow-hidden rounded-[16px] border border-line bg-graphite shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(37,99,235,0.08)]">
            <div aria-hidden="true" className="flex items-center gap-2 border-b border-white/[0.07] bg-[#0d0d12] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="ml-3 truncate text-[11px] font-semibold text-zinc-400">{title}</span>
            </div>
            <div aria-hidden="true">{children}</div>
        </div>
    );
}

const conversations = [
    { name: "Mariana Costa", text: "Perfeito, pode confirmar para quinta?", time: "09:42", tag: "Agendamento", tone: "bg-brand/20 text-brand-soft", unread: 2, active: true },
    { name: "Carlos Lima", text: "Recebi a proposta, obrigado!", time: "09:15", tag: "Proposta", tone: "bg-sky-500/15 text-sky-300", unread: 0, active: false },
    { name: "Ana Ribeiro", text: "Qual o valor do pacote mensal?", time: "08:58", tag: "Novo lead", tone: "bg-emerald-500/15 text-emerald-300", unread: 1, active: false },
    { name: "Pedro Alves", text: "Combinado, até amanhã.", time: "Ontem", tag: "Cliente", tone: "bg-white/10 text-muted", unread: 0, active: false },
];

export function InboxMockup()
{
    return (
        <MockupFrame title="Atendimento · Conversas" label="Ilustração da caixa de entrada da InnoTalk com conversas do WhatsApp, etiquetas e histórico do contato">
            <div className="grid min-h-[340px] sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div className="hidden border-r border-white/[0.07] p-3 sm:block">
                    <div className="mb-3 flex h-8 items-center rounded-lg border border-white/[0.07] bg-graphite-2 px-3 text-[10px] text-zinc-500">Buscar conversa…</div>
                    <ul className="space-y-1.5">
                        {conversations.map((c) => (
                            <li key={c.name} className={`flex gap-2.5 rounded-lg p-2 ${c.active ? "bg-brand/15 ring-1 ring-brand/30" : ""}`}>
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-graphite-3 text-[11px] font-bold text-zinc-200">{c.name[0]}</span>
                                <span className="min-w-0 flex-1">
                                    <span className="flex items-center justify-between gap-2">
                                        <span className="truncate text-[11px] font-semibold text-white">{c.name}</span>
                                        <span className="shrink-0 text-[9px] text-zinc-500">{c.time}</span>
                                    </span>
                                    <span className="block truncate text-[10px] text-zinc-400">{c.text}</span>
                                    <span className="mt-1 flex items-center justify-between">
                                        <span className={`rounded px-1.5 py-0.5 text-[8.5px] font-semibold ${c.tone}`}>{c.tag}</span>
                                        {c.unread > 0 && <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[8.5px] font-bold text-white">{c.unread}</span>}
                                    </span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex min-w-0 flex-col">
                    <div className="flex items-center gap-2.5 border-b border-white/[0.07] px-4 py-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/25 text-[11px] font-bold text-brand-soft">M</span>
                        <span className="min-w-0 flex-1">
                            <span className="block truncate text-[12px] font-semibold text-white">Mariana Costa</span>
                            <span className="block text-[10px] text-emerald-400">WhatsApp · online</span>
                        </span>
                        <span className="rounded-md bg-brand/20 px-2 py-1 text-[9px] font-semibold text-brand-soft">Agendamento</span>
                    </div>
                    <div className="flex flex-1 flex-col gap-2.5 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.06),transparent_60%)] p-4">
                        <span className="self-center rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[9px] text-zinc-400">Histórico · 3 atendimentos anteriores</span>
                        <p className="max-w-[80%] rounded-xl rounded-tl-sm bg-graphite-3 px-3 py-2 text-[11px] leading-snug text-zinc-200">Oi! Gostaria de agendar uma avaliação esta semana.</p>
                        <p className="max-w-[80%] self-end rounded-xl rounded-tr-sm bg-brand px-3 py-2 text-[11px] leading-snug text-white">Claro, Mariana! Temos horário na quinta às 14h. Pode ser?</p>
                        <p className="max-w-[80%] rounded-xl rounded-tl-sm bg-graphite-3 px-3 py-2 text-[11px] leading-snug text-zinc-200">Perfeito, pode confirmar para quinta?</p>
                        <div className="mt-auto flex items-center gap-2 rounded-lg border border-white/[0.07] bg-graphite-2 px-3 py-2">
                            <span className="flex-1 truncate text-[10px] text-zinc-500">Escreva uma mensagem…</span>
                            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand text-white">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </MockupFrame>
    );
}

const pipeline = [
    { stage: "Novo lead", dot: "bg-sky-400", count: 8, cards: [{ name: "Ana Ribeiro", value: "R$ 1.200", tag: "WhatsApp" }, { name: "Lucas Prado", value: "R$ 850", tag: "Indicação" }] },
    { stage: "Em negociação", dot: "bg-brand-soft", count: 5, cards: [{ name: "Carlos Lima", value: "R$ 3.400", tag: "Proposta" }, { name: "Júlia Martins", value: "R$ 2.100", tag: "Retorno hoje" }] },
    { stage: "Fechado", dot: "bg-emerald-400", count: 3, cards: [{ name: "Pedro Alves", value: "R$ 4.800", tag: "Ganho" }] },
    { stage: "Perdido", dot: "bg-zinc-500", count: 1, cards: [{ name: "Rita Souza", value: "R$ 600", tag: "Sem retorno" }] },
];

export function PipelineMockup()
{
    return (
        <MockupFrame title="CRM · Funil de vendas" label="Ilustração do funil de vendas da InnoTalk com leads organizados por etapa de negociação">
            <div className="p-4">
                <div className="mb-4 grid grid-cols-3 gap-2">
                    {[["Leads ativos", "17", "text-white"], ["Em negociação", "R$ 5,5 mil", "text-brand-soft"], ["Ganhos no mês", "R$ 4,8 mil", "text-emerald-400"]].map(([label, value, tone]) => (
                        <div key={label} className="min-w-0 rounded-lg border border-white/[0.07] bg-graphite-2 p-2.5">
                            <span className="block truncate text-[9px] text-zinc-400">{label}</span>
                            <span className={`mt-1 block truncate text-[14px] font-bold sm:text-[16px] ${tone}`}>{value}</span>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {pipeline.map((col, index) => (
                        <div key={col.stage} className={`min-w-0 rounded-lg bg-graphite-2/70 p-2 ${index === 3 ? "hidden sm:block" : ""}`}>
                            <div className="mb-2 flex items-center justify-between gap-1">
                                <span className="flex min-w-0 items-center gap-1.5">
                                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${col.dot}`} />
                                    <span className="truncate text-[9.5px] font-semibold text-zinc-200">{col.stage}</span>
                                </span>
                                <span className="text-[9px] text-zinc-500">{col.count}</span>
                            </div>
                            <div className="space-y-1.5">
                                {col.cards.map((card, cardIndex) => (
                                    <div key={card.name} className={`rounded-md border p-2 ${index === 1 && cardIndex === 0 ? "border-brand/50 bg-brand/10 shadow-[0_8px_20px_-10px_rgba(37,99,235,0.7)]" : "border-white/[0.07] bg-graphite-3"}`}>
                                        <span className="block truncate text-[10px] font-semibold text-white">{card.name}</span>
                                        <span className="mt-0.5 block text-[9.5px] text-zinc-400">{card.value}</span>
                                        <span className="mt-1.5 inline-block max-w-full truncate rounded bg-white/[0.07] px-1.5 py-0.5 text-[8.5px] text-muted">{card.tag}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MockupFrame>
    );
}

const weekDays = [
    { day: "Seg", date: "12" },
    { day: "Ter", date: "13" },
    { day: "Qua", date: "14" },
    { day: "Qui", date: "15", today: true },
    { day: "Sex", date: "16" },
];

const events: Record<string, { time: string; title: string; tone: string; row: number; span: number }[]> = {
    Seg: [{ time: "09:00", title: "Reunião de equipe", tone: "bg-sky-500/15 border-sky-400/40 text-sky-200", row: 1, span: 2 }],
    Ter: [{ time: "11:00", title: "Demonstração", tone: "bg-brand/15 border-brand/40 text-blue-200", row: 3, span: 2 }],
    Qua: [{ time: "10:00", title: "Retorno · Carlos", tone: "bg-emerald-500/15 border-emerald-400/40 text-emerald-200", row: 2, span: 2 }],
    Qui: [{ time: "14:00", title: "Avaliação · Mariana", tone: "bg-brand/25 border-brand-soft/60 text-white", row: 4, span: 2 }],
    Sex: [{ time: "09:00", title: "Visita técnica", tone: "bg-sky-500/15 border-sky-400/40 text-sky-200", row: 1, span: 2 }],
};

export function AgendaMockup()
{
    return (
        <div className="relative pb-8 sm:pb-6">
            <MockupFrame title="Agenda · Semana" label="Ilustração da agenda da InnoTalk sincronizada com o Google Calendar, com compromissos da semana">
                <div className="p-4">
                    <div className="mb-3 flex items-center justify-between">
                        <span className="text-[13px] font-bold text-white">Esta semana</span>
                        <span className="rounded-md bg-brand px-2.5 py-1 text-[9.5px] font-semibold text-white">+ Novo agendamento</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-5">
                        {weekDays.map((d, index) => (
                            <div key={d.day} className={`min-w-0 ${index < 2 ? "hidden sm:block" : ""}`}>
                                <div className={`mb-1.5 rounded-md py-1 text-center ${d.today ? "bg-brand/20 text-brand-soft" : "text-zinc-400"}`}>
                                    <span className="block text-[9px]">{d.day}</span>
                                    <span className="block text-[12px] font-bold">{d.date}</span>
                                </div>
                                <div className="grid h-[176px] grid-rows-6 gap-1 rounded-md border border-white/[0.06] bg-graphite-2/60 p-1">
                                    {events[d.day].map((event) => (
                                        <div key={event.title} className={`min-w-0 overflow-hidden rounded border-l-2 px-1.5 py-1 ${event.tone}`} style={{ gridRow: `${event.row} / span ${event.span}` }}>
                                            <span className="block text-[8.5px] opacity-80">{event.time}</span>
                                            <span className="block truncate text-[9.5px] font-semibold">{event.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </MockupFrame>
            <div aria-hidden="true" className="absolute -bottom-1 left-3 flex items-center gap-2.5 rounded-xl border border-line bg-graphite-2 px-3.5 py-2.5 shadow-xl sm:-left-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7L21 8" /><path d="M21 3v5h-5" /></svg>
                </span>
                <span>
                    <span className="block text-[10.5px] font-semibold text-white">Sincronizado</span>
                    <span className="block text-[9.5px] text-zinc-400">Google Calendar</span>
                </span>
            </div>
        </div>
    );
}
