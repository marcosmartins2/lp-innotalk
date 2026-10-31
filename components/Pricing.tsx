import PeriodPricing from "@/components/PeriodPricing";
import PricingCards from "@/components/PricingCards";
import { getPlans } from "@/lib/plans";

/** Condições que valem para todos os planos (ver Termos de Uso e FAQ). */
const guarantees = ["14 dias grátis em todos os planos", "Sem cartão de crédito para começar", "Pagamento via PIX", "Cancelamento solicitado a qualquer momento"];

/**
 * Seção de planos. Server component: busca os preços na API do CRM
 * (revalidado a cada 5 min) e delega a renderização animada ao client.
 */
export default async function Pricing()
{
    const plans = await getPlans();

    return (
        <section className="scroll-mt-[72px] border-t border-line bg-ink px-6 py-20 sm:pt-[92px] sm:pb-[93px]" id="planos" aria-labelledby="planos-titulo">
            <div className="max-w-7xl mx-auto">
                <div className="mx-auto mb-14 max-w-[680px] text-center sm:mb-16">
                    <p className="mb-3 text-[12px] font-extrabold tracking-[0.08em] text-brand-soft">PLANOS E PREÇOS</p>
                    <h2 id="planos-titulo" className="mb-4 text-[28px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white sm:text-[40px]">
                        Um plano para cada momento da sua operação
                    </h2>
                    <p className="text-[15px] leading-relaxed text-muted sm:text-[16px]">
                        Todos os planos começam com <strong className="font-bold text-white">14 dias grátis</strong>. Teste com a sua equipe na rotina real e só pague quando o teste acabar.
                    </p>
                </div>

                <PricingCards plans={plans} />

                <ul className="mx-auto mt-10 flex max-w-[1180px] flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[13px] font-medium text-muted">
                    {guarantees.map((item) => (
                        <li key={item} className="inline-flex items-center gap-2">
                            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 20 20" fill="none" className="text-brand-soft"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            {item}
                        </li>
                    ))}
                </ul>

                <PeriodPricing />
            </div>
        </section>
    );
}
