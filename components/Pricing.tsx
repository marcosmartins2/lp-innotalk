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
        <section className="bg-[#E2E8F0] py-20 px-6" id="planos">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                        <span className="text-gray-900">Planos de Acesso Beta — </span>
                        <br className="hidden md:block" />
                        <span className="text-blue-600">exclusividade antecipada</span>
                    </h2>
                </div>

                <PricingCards plans={plans} />

                {/* Disclaimer */}
                <p className="text-center text-gray-500 text-sm max-w-3xl mx-auto">
                    * Os custos da API do WhatsApp podem variar conforme o volume de mensagens enviadas e recebidas.
                </p>
            </div>
        </section>
    );
}
