"use client";

import { useId, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/animations";
import { ChevronIcon } from "@/components/icons";

/*
 * Respostas baseadas no funcionamento real da InnoTalk (Termos de Uso, Política de
 * Privacidade e fluxo de contratação do CRM). Não incluir promessas técnicas que
 * não estejam documentadas.
 */
const faqs = [
    {
        question: "O que é a InnoTalk?",
        answer: "A InnoTalk é um CRM que centraliza o atendimento pelo WhatsApp, organiza seus leads e funis de venda, integra a agenda ao Google Calendar e reúne métricas de atendimento em um dashboard. É indicada para empresas, profissionais autônomos e equipes de atendimento.",
    },
    {
        question: "Como funciona a integração com o WhatsApp?",
        answer: "Você conecta o número de WhatsApp da sua empresa à InnoTalk e passa a receber e responder as conversas dentro da plataforma, por meio de APIs autorizadas. As conversas ficam vinculadas ao contato, com etiquetas, status e histórico de atendimento.",
    },
    {
        question: "Como a InnoTalk ajuda a organizar meus leads?",
        answer: "Cada contato pode receber etiquetas, status e etapas de atendimento ou de vendas que você mesmo cadastra. Assim, a equipe acompanha as negociações em andamento, ganhas e perdidas no funil e sabe quem precisa de retorno.",
    },
    {
        question: "Como funciona a agenda integrada?",
        answer: "Ao conectar sua conta Google, os agendamentos e tarefas criados no CRM são sincronizados com o Google Calendar. A InnoTalk acessa apenas os eventos da sua agenda (título, descrição, data e horário) para exibir, criar e atualizar compromissos. Você pode desconectar a qualquer momento na InnoTalk ou nas configurações da sua conta Google.",
    },
    {
        question: "O que preciso para começar?",
        answer: "Um número de WhatsApp para atender seus clientes e, se quiser usar a agenda integrada, uma conta Google. Depois é só escolher um plano, criar sua conta e conectar o WhatsApp. Se precisar de ajuda na configuração inicial, nossa equipe de suporte orienta você.",
    },
    {
        question: "Posso ter mais de um atendente?",
        answer: "Sim. A plataforma tem perfis de acesso diferentes, como Dono/Administrador e Atendente, cada um com permissões próprias. A quantidade de usuários varia conforme o plano escolhido — confira os detalhes na seção de planos.",
    },
    {
        question: "Como funcionam os planos e o pagamento?",
        answer: "Você escolhe o plano na seção de planos, cria sua conta no CRM e conclui o pagamento por PIX. Você pode solicitar o cancelamento da conta a qualquer momento.",
    },
    {
        question: "Meus dados estão seguros?",
        answer: "A InnoTalk trata os dados em conformidade com a LGPD e adota medidas como criptografia, controle de acesso por perfil de usuário, monitoramento de atividades e ambientes seguros de hospedagem. Não vendemos, alugamos nem compartilhamos dados pessoais para fins comerciais. Os detalhes estão na nossa Política de Privacidade.",
    },
    {
        question: "Como entro em contato com o suporte?",
        answer: "Pelo e-mail suporte@innotalk.com.br ou pelo WhatsApp (62) 9 9800-9542. O nível de suporte varia conforme o plano contratado.",
    },
];

export default function FAQ()
{
    const baseId = useId();
    const [openItems, setOpenItems] = useState<Set<number>>(() => new Set());
    const allOpen = openItems.size === faqs.length;

    const toggleItem = (index: number) =>
    {
        setOpenItems((current) =>
        {
            const next = new Set(current);
            if (next.has(index)) next.delete(index);
            else next.add(index);
            return next;
        });
    };

    const toggleAll = () =>
    {
        setOpenItems(allOpen ? new Set() : new Set(faqs.map((_, index) => index)));
    };

    return (
        <section id="duvidas" aria-labelledby="duvidas-titulo" className="scroll-mt-[72px] border-t border-line bg-ink px-6 py-20 sm:py-24 lg:py-28">
            <MotionConfig reducedMotion="user">
                <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-20">
                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="lg:sticky lg:top-[112px] lg:self-start">
                        <p className="mb-3 text-[12px] font-extrabold tracking-[0.08em] text-brand-soft">DÚVIDAS</p>
                        <h2 id="duvidas-titulo" className="mb-4 text-[30px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white sm:text-[40px]">Perguntas frequentes</h2>
                        <p className="mb-8 max-w-[360px] text-[15px] leading-relaxed text-zinc-400">
                            Tudo o que você precisa saber sobre a InnoTalk. Não encontrou sua resposta?{" "}
                            <a href="#contato" className="font-semibold text-brand-soft underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft">Fale com a gente</a>.
                        </p>
                        <button
                            type="button"
                            onClick={toggleAll}
                            aria-pressed={allOpen}
                            className="inline-flex min-h-11 items-center gap-2 rounded-[9px] border border-white/15 px-5 text-[14px] font-bold text-white transition-colors hover:border-brand-soft/60 hover:bg-brand/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft"
                        >
                            {allOpen ? "Fechar todas" : "Abrir todas"}
                            <ChevronIcon aria-hidden="true" className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${allOpen ? "rotate-180" : ""}`} />
                        </button>
                    </motion.div>

                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                        <ul className="border-t border-line">
                            {faqs.map((faq, index) =>
                            {
                                const isOpen = openItems.has(index);
                                const buttonId = `${baseId}-pergunta-${index}`;
                                const panelId = `${baseId}-resposta-${index}`;
                                return (
                                    <li key={faq.question} className="border-b border-line">
                                        <h3>
                                            <button
                                                type="button"
                                                id={buttonId}
                                                aria-expanded={isOpen}
                                                aria-controls={panelId}
                                                onClick={() => toggleItem(index)}
                                                className="group flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft"
                                            >
                                                <span className="text-[16px] font-semibold leading-snug text-white transition-colors group-hover:text-brand-soft sm:text-[18px]">{faq.question}</span>
                                                <span aria-hidden="true" className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 motion-reduce:transition-none ${isOpen ? "rotate-180 border-brand bg-brand text-white" : "border-white/15 text-zinc-400 group-hover:border-brand-soft/60 group-hover:text-brand-soft"}`}>
                                                    <ChevronIcon className="h-4 w-4" />
                                                </span>
                                            </button>
                                        </h3>
                                        <div
                                            id={panelId}
                                            role="region"
                                            aria-labelledby={buttonId}
                                            inert={!isOpen}
                                            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                                        >
                                            <div className="overflow-hidden">
                                                <p className="max-w-[680px] pb-6 pr-10 text-[15px] leading-[1.7] text-zinc-400">{faq.answer}</p>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>
                </div>
            </MotionConfig>
        </section>
    );
}
