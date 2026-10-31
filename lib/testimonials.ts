/**
 * Depoimentos de clientes exibidos na seção #depoimentos.
 *
 * Só publique depoimentos REAIS, com autorização do cliente. Enquanto a lista
 * estiver vazia, a seção mostra um convite para clientes compartilharem a
 * própria experiência, sem nenhum conteúdo fictício.
 *
 * Exemplo de item:
 * {
 *     quote: "Texto do depoimento, nas palavras do cliente.",
 *     name: "Nome Sobrenome",
 *     role: "Sócia-diretora",
 *     company: "Nome da Empresa",
 *     photo: "/depoimentos/nome-sobrenome.jpg", // arquivo em /public (opcional)
 *     videoUrl: "https://www.youtube.com/watch?v=...", // opcional
 *     result: { value: "2x", label: "mais retornos no mês" }, // só com dado comprovado (opcional)
 * }
 */

export interface Testimonial
{
    quote: string;
    name: string;
    role?: string;
    company: string;
    /** Caminho de uma imagem em /public */
    photo?: string;
    /** Link para o vídeo do depoimento */
    videoUrl?: string;
    /** Resultado obtido com a plataforma, informado pelo próprio cliente */
    result?: { value: string; label: string };
}

export const TESTIMONIALS: Testimonial[] = [];
