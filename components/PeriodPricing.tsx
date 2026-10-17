import { ReactNode } from "react";
import { formatPrice } from "@/lib/plans";
import { PERIODS, PERIOD_PRICING } from "@/lib/periodPricing";

const brl = (cents: number) => `R$ ${formatPrice(cents)}`;

/** Contêiner com rolagem horizontal própria, para a página nunca rolar de lado no celular */
function TableFrame({ children, label }: { children: ReactNode; label: string })
{
    return (
        <div
            className="overflow-x-auto rounded-[12px] border border-line bg-graphite"
            role="region"
            aria-label={label}
            tabIndex={0}
        >
            {children}
        </div>
    );
}

const TH = "whitespace-nowrap px-4 py-3 text-[13px] font-bold text-white sm:px-5";
const TD = "whitespace-nowrap px-4 py-3 text-[14px] tabular-nums sm:px-5";
const ROW = "border-t border-line/60 odd:bg-graphite even:bg-graphite-2";

/**
 * Tabelas de preço por período de contratação (6, 9, 12 e 24 meses).
 * Renderizada dentro da seção #planos, abaixo dos cards.
 */
export default function PeriodPricing()
{
    return (
        <div id="precos-por-periodo" className="mx-auto mt-20 max-w-[1180px] scroll-mt-[92px] sm:mt-24">
            <div className="mb-8 text-center sm:mb-10">
                <h3 className="mb-3 text-[24px] font-extrabold leading-tight text-white sm:text-[28px]">
                    Planos e preços por período
                </h3>
                <p className="text-[15px] leading-relaxed text-muted">
                    Compare o valor equivalente mensal de cada plano conforme o prazo de contratação.
                </p>
            </div>

            {/* Tabela geral */}
            <TableFrame label="Comparativo de preços por período">
                <table className="w-full min-w-[560px] border-collapse text-left">
                    <caption className="sr-only">Valor equivalente mensal por plano e período</caption>
                    <thead className="bg-brand">
                        <tr>
                            <th scope="col" className={TH}>Plano</th>
                            {PERIODS.map((months) => (
                                <th key={months} scope="col" className={`${TH} text-right`}>
                                    {months} meses
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {PERIOD_PRICING.map((plan) => (
                            <tr key={plan.name} className={ROW}>
                                <th scope="row" className={`${TD} font-bold text-white`}>{plan.name}</th>
                                {plan.prices.map((price) => (
                                    <td key={price.months} className={`${TD} text-right text-white`}>
                                        {brl(price.monthlyCents)}
                                        <span className="text-[12px] text-muted">/mês</span>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableFrame>

            <p className="mx-auto mt-4 max-w-[760px] text-center text-[13.5px] leading-relaxed text-muted">
                Os valores apresentados correspondem ao equivalente mensal de cada período de contratação. Os
                períodos mais longos oferecem condições comerciais diferenciadas em relação ao preço-base de cada
                plano.
            </p>

            {/* Detalhamento por plano */}
            <div className="mt-14 space-y-10 sm:mt-16 sm:space-y-12">
                {PERIOD_PRICING.map((plan) =>
                {
                    const base = plan.prices[0];
                    const best = plan.prices[plan.prices.length - 1];

                    return (
                        <div key={plan.name} className="grid gap-4 lg:grid-cols-[240px_1fr] lg:gap-8">
                            <div className="lg:pt-2">
                                <h4 className="mb-1.5 text-[20px] font-extrabold text-brand-soft">{plan.name}</h4>
                                <p className="text-[13.5px] leading-relaxed text-muted">
                                    Preço-base: {brl(base.monthlyCents)}/mês ({base.months} meses).
                                </p>
                                <p className="mt-1 text-[13.5px] leading-relaxed text-muted">
                                    Em {best.months} meses, economia de{" "}
                                    <span className="font-semibold text-brand-soft">{brl(best.savingsCents)}</span>.
                                </p>
                            </div>

                            <TableFrame label={`Preços do plano ${plan.name} por período`}>
                                <table className="w-full min-w-[520px] border-collapse text-left">
                                    <caption className="sr-only">Plano {plan.name}: preços por período</caption>
                                    <thead className="bg-brand">
                                        <tr>
                                            <th scope="col" className={TH}>Prazo</th>
                                            <th scope="col" className={`${TH} text-right`}>Equivalente/mês</th>
                                            <th scope="col" className={`${TH} text-right`}>Total do período</th>
                                            <th scope="col" className={`${TH} text-right`}>Economia vs. preço-base</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {plan.prices.map((price) => (
                                            <tr key={price.months} className={ROW}>
                                                <th scope="row" className={`${TD} font-semibold text-white`}>
                                                    {price.months} meses
                                                </th>
                                                <td className={`${TD} text-right text-white`}>{brl(price.monthlyCents)}</td>
                                                <td className={`${TD} text-right text-muted`}>{brl(price.totalCents)}</td>
                                                <td
                                                    className={`${TD} text-right ${price.savingsCents > 0 ? "font-semibold text-brand-soft" : "text-muted"}`}
                                                >
                                                    {brl(price.savingsCents)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </TableFrame>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
