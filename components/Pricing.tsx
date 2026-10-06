import PricingCards from "@/components/PricingCards";
import { getPlans } from "@/lib/plans";

/**
 * Seção de planos. Server component: busca os preços na API do CRM
 * (revalidado a cada 5 min) e delega a renderização animada ao client.
 */
export default async function Pricing()
{
    const plans = await getPlans();

    return (
        <section className="scroll-mt-[72px] border-t border-white/10 bg-[#0b1f3a] px-6 py-20 sm:pt-[92px] sm:pb-[93px]" id="planos">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center sm:mb-14">
                    <p className="mb-3 text-[12px] font-extrabold tracking-[0.08em] text-[#8fb2ff]">PLANOS E PREÇOS</p>
                    <h2 className="mb-3 text-[28px] font-extrabold leading-tight text-white sm:text-[34px]">
                        Escolha o plano ideal para o seu negócio
                    </h2>
                    <p className="text-[15px] leading-relaxed text-slate-300 sm:text-[16px]">
                        Mais organização, mais produtividade e mais resultados.
                    </p>
                </div>

                <PricingCards plans={plans} />
            </div>
        </section>
    );
}
