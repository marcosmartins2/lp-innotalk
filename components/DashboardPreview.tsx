const metrics = [
    { label: "Conversas hoje", value: "128", change: "+18%", tone: "text-emerald-400" },
    { label: "Novos leads", value: "34", change: "+12%", tone: "text-sky-400" },
    { label: "Taxa de conversão", value: "68%", change: "+6%", tone: "text-violet-400" },
];

const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const chartBars = [
    [42, 62, 25], [54, 38, 68], [35, 72, 47], [66, 48, 80], [46, 74, 56], [58, 34, 64], [72, 53, 40],
];

export default function DashboardPreview() {
    return (
        <div className="relative mx-auto w-full max-w-[724px] pb-6 pt-3 sm:pb-8 lg:mx-0 lg:self-start lg:translate-y-[-39px] lg:pb-6">
            <div className="relative grid min-h-[454px] grid-cols-[56px_minmax(0,1fr)] overflow-hidden rounded-[16px] border border-[#202d48] bg-[#111a30] text-white shadow-[0_24px_55px_-26px_rgba(10,27,53,0.48)] lg:min-h-[514px] lg:grid-cols-[170px_minmax(0,1fr)]">
                <aside className="border-r border-white/[0.07] bg-[#0d162b] px-3 py-5 sm:px-4">
                    <div className="mb-7 flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#2864df] text-[11px] font-extrabold">I</span>
                        <span className="hidden text-[12px] font-bold tracking-tight lg:inline">InnoTalk</span>
                    </div>
                    <nav aria-label="Navegação do painel" className="space-y-1">
                        {[
                            ["Painel", "▦", true], ["Leads", "◉", false], ["Agenda", "▣", false], ["Tarefas", "✓", false],
                            ["Funil", "⌑", false], ["Serviços", "◇", false], ["IA", "✳", false], ["Configurações", "⚙", false],
                        ].map(([label, icon, active]) => (
                            <div key={label as string} className={`flex h-8 items-center gap-2 rounded-md px-2 text-[10px] ${active ? "bg-[#1d3155] font-semibold text-white" : "text-slate-400"}`}>
                                <span className="w-3 text-center text-[12px]">{icon}</span>
                                <span className="hidden lg:inline">{label}</span>
                            </div>
                        ))}
                    </nav>
                </aside>

                <div className="min-w-0 p-3 sm:p-5">
                    <div className="mb-4 flex items-start justify-between gap-2">
                        <div>
                            <h2 className="text-[15px] font-bold leading-tight sm:text-[17px]">Painel</h2>
                            <p className="mt-1 text-[9px] text-slate-400 sm:text-[10px]">Visão geral do seu atendimento</p>
                        </div>
                        <span className="whitespace-nowrap rounded-md border border-white/10 bg-white/[0.04] px-2 py-1.5 text-[8px] text-slate-300 sm:px-3 sm:text-[9px]">Últimos 7 dias⌄</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        {metrics.map((metric) => (
                            <div key={metric.label} className="min-w-0 rounded-lg border border-white/[0.08] bg-[#17223a] p-2 sm:p-3">
                                <p className="truncate text-[8px] text-slate-400 sm:text-[9px]">{metric.label}</p>
                                <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-1">
                                    <strong className="text-[18px] font-bold leading-none sm:text-[22px]">{metric.value}</strong>
                                    <span className={`text-[8px] font-semibold ${metric.tone}`}>{metric.change}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-3 rounded-lg border border-white/[0.08] bg-[#17223a] px-3 pb-2 pt-3 sm:px-4">
                        <div className="mb-3 flex items-center gap-3 text-[8px] sm:gap-4 sm:text-[9px]">
                            <span className="inline-flex items-center gap-1.5 text-slate-300"><i className="h-1.5 w-1.5 rounded-full bg-[#4f8cff]" />Mensagens</span>
                            <span className="inline-flex items-center gap-1.5 text-slate-300"><i className="h-1.5 w-1.5 rounded-full bg-[#31c48d]" />Leads</span>
                            <span className="inline-flex items-center gap-1.5 text-slate-300"><i className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />Vendas</span>
                        </div>
                        <div className="relative flex h-[128px] items-end justify-between gap-2 border-b border-l border-white/10 px-2 sm:h-[150px] sm:px-4">
                            {[25, 50, 75].map((line) => <span key={line} className="absolute inset-x-0 border-t border-dashed border-white/[0.06]" style={{ bottom: `${line}%` }} />)}
                            {chartBars.map((bars, index) => (
                                <div key={days[index]} className="relative z-[1] flex h-full flex-1 items-end justify-center gap-[2px] pb-0.5 sm:gap-1">
                                    {bars.map((height, barIndex) => (
                                        <span key={barIndex} className={`w-[4px] rounded-t-[2px] sm:w-[7px] ${["bg-[#4f8cff]", "bg-[#31c48d]", "bg-[#a78bfa]"][barIndex]}`} style={{ height: `${height}%` }} />
                                    ))}
                                    <span className="absolute -bottom-4 text-[7px] text-slate-500 sm:text-[8px]">{days[index]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute -bottom-1 left-2 flex items-center gap-2 rounded-lg border border-[#263653] bg-[#17233b] px-3 py-2 text-[9px] text-white shadow-xl sm:-left-4 sm:px-4 sm:text-[10px]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400">↗</span>
                <span><span className="block font-semibold">Taxa de conversão</span><span className="text-emerald-400">+27% <span className="text-slate-400">este mês</span></span></span>
            </div>
            <div className="absolute -right-1 top-0 flex items-center gap-2 rounded-lg border border-[#263653] bg-[#17233b] px-3 py-2 text-[9px] text-white shadow-xl sm:-right-4 sm:px-4 sm:text-[10px]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#dce8ff] font-bold text-[#3169df]">R</span>
                <span><strong className="block">Novo lead recebido</strong><span className="text-slate-400">Rafael Souza · WhatsApp</span></span>
                <span className="ml-2 h-2 w-2 rounded-full bg-emerald-400" />
            </div>
        </div>
    );
}