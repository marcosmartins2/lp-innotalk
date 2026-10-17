/**
 * Preços por período de contratação (somente apresentação na LP).
 *
 * Valores comerciais definidos pelo time, em centavos e fixos de propósito:
 * não recalcule aqui. O prazo de 6 meses é o preço-base de cada plano e a
 * economia é (preço-base × meses) − total do período.
 */

export const PERIODS = [6, 9, 12, 24] as const;
export type PeriodMonths = (typeof PERIODS)[number];

export interface PeriodPrice
{
    months: PeriodMonths;
    /** Equivalente mensal */
    monthlyCents: number;
    /** Total do período */
    totalCents: number;
    /** Economia vs. preço-base (6 meses) */
    savingsCents: number;
}

export interface PlanPeriodPricing
{
    name: "Starter" | "Scale" | "Enterprise";
    prices: PeriodPrice[];
}

export const PERIOD_PRICING: PlanPeriodPricing[] = [
    {
        name: "Starter",
        prices: [
            { months: 6, monthlyCents: 7990, totalCents: 47940, savingsCents: 0 },
            { months: 9, monthlyCents: 7590, totalCents: 68310, savingsCents: 3600 },
            { months: 12, monthlyCents: 7191, totalCents: 86292, savingsCents: 9588 },
            { months: 24, monthlyCents: 6392, totalCents: 153408, savingsCents: 38352 },
        ],
    },
    {
        name: "Scale",
        prices: [
            { months: 6, monthlyCents: 11990, totalCents: 71940, savingsCents: 0 },
            { months: 9, monthlyCents: 11390, totalCents: 102510, savingsCents: 5400 },
            { months: 12, monthlyCents: 10791, totalCents: 129492, savingsCents: 14388 },
            { months: 24, monthlyCents: 9592, totalCents: 230208, savingsCents: 57552 },
        ],
    },
    {
        name: "Enterprise",
        prices: [
            { months: 6, monthlyCents: 24990, totalCents: 149940, savingsCents: 0 },
            { months: 9, monthlyCents: 23739, totalCents: 213651, savingsCents: 11259 },
            { months: 12, monthlyCents: 22491, totalCents: 269892, savingsCents: 29988 },
            { months: 24, monthlyCents: 19992, totalCents: 479808, savingsCents: 119952 },
        ],
    },
];
