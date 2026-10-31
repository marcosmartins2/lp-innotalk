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
    /** Posicionamento do plano, em uma frase */
    description: string;
    /** Para quem é e qual benefício o plano entrega */
    idealFor: string;
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

const OUTLINE_BUTTON = "bg-transparent hover:bg-white/5 text-white border border-white/20";
const BLUE_BUTTON = "bg-brand hover:bg-brand-hover text-white";
const PLAIN_CARD = "border-line shadow-[0_8px_24px_-16px_rgba(0,0,0,0.5)] hover:shadow-lg";
const POPULAR_CARD =
    "border-brand shadow-[0_18px_40px_-20px_rgba(37,99,235,0.55)]";

/**
 * Estilo/rótulo por plano. O que não estiver aqui cai no padrão.
 *
 * `popular`: recebe o destaque azul e o selo "Recomendado".
 */
const PRESENTATION: Record<string, { popular?: boolean }> = {
    Scale: { popular: true },
    "Scale Beta": { popular: true },
};

const DESCRIPTIONS: Record<string, string> = {
    Starter: "Comece a organizar seus atendimentos e clientes.",
    Scale: "Tenha mais controle sobre sua operação comercial.",
    Enterprise: "Amplie sua operação com flexibilidade e recursos avançados.",
};

const IDEAL_FOR: Record<string, string> = {
    Starter: "Para quem atende sozinho ou em dupla e quer tirar o WhatsApp do improviso: conversas, leads e agenda no mesmo lugar.",
    Scale: "Para equipes de até 5 pessoas que precisam enxergar resultados no dashboard e ganhar tempo com automações de atendimento.",
    Enterprise: "Para operações maiores, sem limite de usuários, que precisam de integrações personalizadas e suporte dedicado.",
};

const BUTTON_TEXT = "Começar 14 dias grátis";

const PLAN_FEATURES: Record<string, string[]> = {
    Starter: [
        "WhatsApp centralizado",
        "CRM de leads",
        "Agenda integrada (Google Calendar)",
        "Até 2 usuários",
        "Suporte por e-mail",
    ],
    Scale: [
        "Tudo do plano Starter",
        "Relatórios e dashboard",
        "Automações de atendimento",
        "Até 5 usuários",
        "Suporte prioritário",
    ],
    Enterprise: [
        "Tudo do plano Scale",
        "Usuários ilimitados",
        "Integrações personalizadas",
        "Suporte dedicado",
        "Acesso a recursos avançados",
    ],
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
    const name = plan.name.replace(/\s+Beta$/, "");
    const presentation = PRESENTATION[name] ?? PRESENTATION[plan.name] ?? {};
    const popular = presentation.popular ?? false;
    const intervalDays = plan.intervalDays ?? plan.interval_days ?? 30;

    return {
        id: plan.id,
        name,
        description: DESCRIPTIONS[name] ?? plan.description ?? "",
        idealFor: IDEAL_FOR[name] ?? "",
        price: formatPrice(cents),
        priceCents: cents,
        period: intervalDays === 365 ? "/ano" : "/mês",
        pricePrefix: undefined,
        features: PLAN_FEATURES[name] ?? plan.features ?? [],
        buttonText: BUTTON_TEXT,
        buttonStyle: popular ? BLUE_BUTTON : OUTLINE_BUTTON,
        cardStyle: popular ? POPULAR_CARD : PLAIN_CARD,
        popular,
        href: checkoutUrl(plan.id),
    };
}

/**
 * Fallback usado só se a API não responder. Mantenha em dia com os planos
 * cadastrados no CRM.
 */
export const FALLBACK_PLANS: PricingPlan[] = [
    {
        id: null,
        name: "Starter",
        description: DESCRIPTIONS.Starter,
        idealFor: IDEAL_FOR.Starter,
        price: "79,90",
        priceCents: 7990,
        period: "/mês",
        features: [
            "WhatsApp centralizado",
            "CRM de leads",
            "Agenda integrada (Google Calendar)",
            "Até 2 usuários",
            "Suporte por e-mail",
        ],
        buttonText: BUTTON_TEXT,
        buttonStyle: OUTLINE_BUTTON,
        cardStyle: PLAIN_CARD,
        popular: false,
        href: checkoutUrl(null),
    },
    {
        id: null,
        name: "Scale",
        description: DESCRIPTIONS.Scale,
        idealFor: IDEAL_FOR.Scale,
        price: "119,90",
        priceCents: 11990,
        period: "/mês",
        features: [
            "Tudo do plano Starter",
            "Relatórios e dashboard",
            "Automações de atendimento",
            "Até 5 usuários",
            "Suporte prioritário",
        ],
        buttonText: BUTTON_TEXT,
        buttonStyle: BLUE_BUTTON,
        cardStyle: POPULAR_CARD,
        popular: true,
        href: checkoutUrl(null),
    },
    {
        id: null,
        name: "Enterprise",
        description: DESCRIPTIONS.Enterprise,
        idealFor: IDEAL_FOR.Enterprise,
        price: "249,90",
        priceCents: 24990,
        period: "/mês",
        features: [
            "Tudo do plano Scale",
            "Usuários ilimitados",
            "Integrações personalizadas",
            "Suporte dedicado",
            "Acesso a recursos avançados",
        ],
        buttonText: BUTTON_TEXT,
        buttonStyle: OUTLINE_BUTTON,
        cardStyle: PLAIN_CARD,
        popular: false,
        href: checkoutUrl(null),
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
