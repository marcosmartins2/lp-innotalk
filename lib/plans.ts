/**
 * Planos de assinatura — fonte única de verdade é a API do CRM.
 *
 * A LP busca os planos em https://api.innotalk.com.br/subscriptions/plans
 * (endpoint público) no servidor, com revalidação periódica. Se a API estiver
 * fora, caímos nos valores estáticos abaixo para a seção nunca quebrar.
 */

export const API_URL =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "https://api.innotalk.com.br";

/** App do CRM, onde o cliente cria a conta e paga o PIX. */
export const CRM_URL =
    process.env.NEXT_PUBLIC_CRM_URL?.replace(/\/$/, "") ?? "https://crm.innotalk.com.br";

/**
 * Link de checkout: leva ao cadastro do CRM com o plano pré-selecionado.
 * Lá a conta é criada e o PIX é gerado na hora (sem trial).
 */
export function checkoutUrl(planId: number | null): string
{
    return planId ? `${CRM_URL}/cadastro?plano=${planId}` : `${CRM_URL}/cadastro`;
}

/**
 * Resposta da API (GET /subscriptions/plans).
 *
 * A API passou a responder em camelCase, mas aceitamos também as chaves
 * snake_case antigas para a LP não quebrar se o backend for mais velho.
 */
export interface ApiPlan
{
    id: number;
    name: string;
    description?: string;
    priceCents?: number;
    price_cents?: number;
    intervalDays?: number;
    interval_days?: number;
    features?: string[];
    isActive?: boolean;
    priceFormatted?: string;
}

/** Plano já pronto para renderizar nos cards da LP */
export interface PricingPlan
{
    id: number | null;
    name: string;
    /** Valor sem o "R$" (ex.: "79,90") */
    price: string;
    priceCents: number;
    period: string;
    pricePrefix?: string;
    features: string[];
    buttonText: string;
    buttonStyle: string;
    cardStyle: string;
    popular: boolean;
    /** Para onde o botão leva (cadastro + pagamento no CRM) */
    href: string;
}

const DARK_BUTTON = "bg-[#0F172A] hover:bg-[#1E293B] text-white border border-gray-700";
const YELLOW_BUTTON = "bg-yellow-400 hover:bg-yellow-500 text-black";
const PLAIN_CARD = "bg-gray-50 border-gray-200 hover:shadow-xl hover:-translate-y-1";
const POPULAR_CARD =
    "bg-gray-50 border-blue-500 shadow-lg shadow-blue-500/10 hover:shadow-xl hover:-translate-y-1";

/**
 * Estilo/rótulo por plano. O que não estiver aqui cai no padrão.
 *
 * `contactSales`: plano com preço sob consulta ("A partir de"), então o botão
 * leva ao formulário de contato em vez do checkout direto.
 */
const PRESENTATION: Record<string, { popular?: boolean; pricePrefix?: string; contactSales?: boolean }> = {
    "Scale Beta": { popular: true },
    Enterprise: { pricePrefix: "A partir de R$ ", contactSales: true },
};

/** Formata centavos para o número exibido no card (sem "R$"). */
export function formatPrice(cents: number): string
{
    return (cents / 100).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

/** Preço em centavos, aceitando camelCase ou snake_case. */
export function centsOf(plan: ApiPlan): number | null
{
    const cents = plan.priceCents ?? plan.price_cents;
    return typeof cents === "number" && Number.isFinite(cents) ? cents : null;
}

function toPricingPlan(plan: ApiPlan, cents: number): PricingPlan
{
    const presentation = PRESENTATION[plan.name] ?? {};
    const popular = presentation.popular ?? false;
    const intervalDays = plan.intervalDays ?? plan.interval_days ?? 30;

    return {
        id: plan.id,
        name: plan.name,
        price: formatPrice(cents),
        priceCents: cents,
        period: intervalDays === 365 ? "/ano" : "/mês",
        pricePrefix: presentation.pricePrefix,
        features: plan.features ?? [],
        buttonText: presentation.contactSales ? "Falar com consultor" : "Assinar agora",
        buttonStyle: popular ? YELLOW_BUTTON : DARK_BUTTON,
        cardStyle: popular ? POPULAR_CARD : PLAIN_CARD,
        popular,
        href: presentation.contactSales ? "#formulario" : checkoutUrl(plan.id),
    };
}

/**
 * Fallback usado só se a API não responder. Mantenha em dia com os planos
 * cadastrados no CRM.
 */
export const FALLBACK_PLANS: PricingPlan[] = [
    {
        id: null,
        name: "Starter Beta",
        price: "79,90",
        priceCents: 7990,
        period: "/mês",
        features: [
            "1 número WhatsApp",
            "Até ~1.000 conversas/mês",
            "CRM básico",
            "Agenda integrada",
            "Suporte via WhatsApp",
        ],
        buttonText: "Assinar agora",
        buttonStyle: DARK_BUTTON,
        cardStyle: PLAIN_CARD,
        popular: false,
        href: checkoutUrl(null),
    },
    {
        id: null,
        name: "Scale Beta",
        price: "119,90",
        priceCents: 11990,
        period: "/mês",
        features: [
            "1-2 números WhatsApp",
            "Até ~5.000 conversas/mês",
            "Dashboard avançado",
            "Integrações extras (Google Sheets/ Meta Ads)",
            "Suporte prioritário",
        ],
        buttonText: "Assinar agora",
        buttonStyle: YELLOW_BUTTON,
        cardStyle: POPULAR_CARD,
        popular: true,
        href: checkoutUrl(null),
    },
    {
        id: null,
        name: "Enterprise",
        price: "249,90",
        priceCents: 24990,
        pricePrefix: "A partir de R$ ",
        period: "/mês",
        features: [
            "Multiusuário",
            "Conversas ilimitadas",
            "Dashboards customizados",
            "Suporte dedicado",
            "SLA garantido",
        ],
        buttonText: "Falar com consultor",
        buttonStyle: DARK_BUTTON,
        cardStyle: PLAIN_CARD,
        popular: false,
        href: "#formulario",
    },
];

/**
 * Busca os planos ativos na API do CRM (server-side, revalidado a cada 5 min).
 * Nunca lança: em caso de erro devolve o fallback estático.
 */
export async function getPlans(): Promise<PricingPlan[]>
{
    try
    {
        const response = await fetch(`${API_URL}/subscriptions/plans?active_only=true`, {
            next: { revalidate: 300 },
        });

        if (!response.ok)
        {
            console.error(`[plans] API respondeu ${response.status}; usando fallback`);
            return FALLBACK_PLANS;
        }

        const body = (await response.json()) as { data?: ApiPlan[] };
        const plans = (body.data ?? [])
            .filter((p) => p.isActive !== false)
            .map((p) => ({ plan: p, cents: centsOf(p) }))
            // Sem preço utilizável não dá para montar o card (evita "NaN" na tela)
            .filter((entry): entry is { plan: ApiPlan; cents: number } => entry.cents !== null);

        if (plans.length === 0)
        {
            console.error("[plans] API não retornou planos utilizáveis; usando fallback");
            return FALLBACK_PLANS;
        }

        return plans
            .sort((a, b) => a.cents - b.cents)
            .map(({ plan, cents }) => toPricingPlan(plan, cents));
    } catch (error)
    {
        console.error("[plans] Falha ao buscar planos; usando fallback:", error);
        return FALLBACK_PLANS;
    }
}
