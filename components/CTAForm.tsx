"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";

// Configuração do EmailJS — valores PÚBLICOS (rodam no navegador, podem ser commitados).
// Hardcoded de propósito: NÃO precisa configurar nenhuma variável na Vercel.
// NUNCA coloque aqui a "Private/Secret Key" do EmailJS: ela é administrativa e ficaria
// visível para qualquer visitante. O formulário no navegador só usa a Public Key.
const EMAILJS_SERVICE_ID = "service_ykg1hed";
const EMAILJS_TEMPLATE_ID = "template_i71euvw";
// Template do email de confirmação para o lead (opcional). Preencha quando criar o 2º template no EmailJS.
const EMAILJS_WELCOME_TEMPLATE_ID = "";
const EMAILJS_PUBLIC_KEY = "7SaFzf9NqefRs7Vui";

const SUPPORT_EMAIL = "suporte@innotalk.com.br";

const SEGMENTS = [
    "Clínica ou saúde",
    "Estética e beleza",
    "Serviços profissionais",
    "Educação",
    "Imobiliária",
    "Varejo ou e-commerce",
    "Outro",
];

const TEAM_SIZES = ["Só eu", "2 a 5 pessoas", "6 a 10 pessoas", "Mais de 10 pessoas"];

const MESSAGE_MAX = 1000;

interface FormData
{
    nome: string;
    email: string;
    telefone: string;
    empresa: string;
    segmento: string;
    tamanhoEquipe: string;
    mensagem: string;
    consentimentoMarketing: boolean;
}

type FieldName = "nome" | "email" | "telefone" | "empresa" | "mensagem";
type FormErrors = Partial<Record<FieldName, string>>;

const EMPTY_FORM: FormData = {
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    segmento: "",
    tamanhoEquipe: "",
    mensagem: "",
    consentimentoMarketing: false,
};

// Ordem usada para focar o primeiro campo inválido
const VALIDATED_FIELDS: FieldName[] = ["nome", "email", "telefone", "empresa", "mensagem"];

function validateField(name: FieldName, data: FormData): string | undefined
{
    switch (name)
    {
        case "nome":
            return data.nome.trim().length >= 2 ? undefined : "Informe seu nome.";
        case "email":
            if (!data.email.trim()) return "Informe seu e-mail.";
            return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim()) ? undefined : "Informe um e-mail válido, como nome@empresa.com.br.";
        case "telefone": {
            const digits = data.telefone.replace(/\D/g, "");
            if (!digits) return "Informe seu telefone ou WhatsApp.";
            return digits.length === 10 || digits.length === 11 ? undefined : "Informe o telefone com DDD, como (62) 99999-9999.";
        }
        case "empresa":
            return data.empresa.trim() ? undefined : "Informe o nome da sua empresa.";
        case "mensagem":
            return data.mensagem.length <= MESSAGE_MAX ? undefined : `A mensagem pode ter no máximo ${MESSAGE_MAX} caracteres.`;
    }
}

function validateAll(data: FormData): FormErrors
{
    const errors: FormErrors = {};
    for (const field of VALIDATED_FIELDS)
    {
        const error = validateField(field, data);
        if (error) errors[field] = error;
    }
    return errors;
}

// Telefone: (00) 0000-0000 ou (00) 00000-0000
function formatTelefone(value: string)
{
    const numbers = value.replace(/\D/g, "").substring(0, 11);

    if (numbers.length <= 10)
    {
        return numbers
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d{1,4})$/, "$1-$2");
    }
    return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
}

const inputClass = "block w-full rounded-[10px] border bg-graphite-2 px-4 text-[16px] text-white placeholder:text-zinc-500 transition-colors hover:border-white/25 focus:border-brand-soft focus:outline-none focus:ring-2 focus:ring-brand/40 disabled:opacity-60";

function fieldBorder(hasError: boolean)
{
    return hasError ? "border-red-400/70" : "border-line";
}

export default function CTAForm()
{
    const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const formRef = useRef<HTMLFormElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    {
        const { name, value } = e.target;
        const nextValue = e.target instanceof HTMLInputElement && e.target.type === "checkbox"
            ? e.target.checked
            : name === "telefone" ? formatTelefone(value) : value;

        const nextData = { ...formData, [name]: nextValue };
        setFormData(nextData);

        // Revalida enquanto digita somente campos que já foram tocados
        if (touched[name as FieldName])
        {
            setErrors((current) => ({ ...current, [name]: validateField(name as FieldName, nextData) }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    {
        const name = e.target.name as FieldName;
        if (!VALIDATED_FIELDS.includes(name)) return;
        setTouched((current) => ({ ...current, [name]: true }));
        setErrors((current) => ({ ...current, [name]: validateField(name, formData) }));
    };

    const handleSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        if (isSubmitting) return;

        const validation = validateAll(formData);
        setErrors(validation);
        setTouched({ nome: true, email: true, telefone: true, empresa: true, mensagem: true });

        const firstInvalid = VALIDATED_FIELDS.find((field) => validation[field]);
        if (firstInvalid)
        {
            formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus("idle");

        const data = {
            nome: formData.nome.trim(),
            email: formData.email.trim(),
            telefone: formData.telefone,
            empresa: formData.empresa.trim(),
            segmento: formData.segmento || "Não informado",
            tamanhoEquipe: formData.tamanhoEquipe || "Não informado",
            mensagem: formData.mensagem.trim() || "(sem mensagem)",
            consentimento: formData.consentimentoMarketing ? "Sim" : "Não",
        };
        const sentAt = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

        try
        {
            // Email de notificação para a equipe (suporte@innoprobusiness.com.br).
            // Mantém as mesmas chaves que o template do EmailJS já usa.
            const templateParams = {
                to_email: "suporte@innoprobusiness.com.br",
                from_name: data.nome,
                from_email: data.email,
                nome_empresa: data.empresa,
                cpf_cnpj: "Não solicitado",
                telefone: data.telefone,
                reply_to: sentAt,
                segmento: data.segmento,
                tamanho_equipe: data.tamanhoEquipe,
                mensagem: data.mensagem,
                consentimento_marketing: data.consentimento,
                message: `Nova solicitação de contato pela landing page da InnoTalk!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 DADOS DO LEAD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Nome: ${data.nome}
📧 Email: ${data.email}
📱 Telefone/WhatsApp: ${data.telefone}
🏢 Empresa: ${data.empresa}
🏷️ Segmento: ${data.segmento}
👥 Tamanho da equipe: ${data.tamanhoEquipe}
✅ Aceita comunicações de marketing: ${data.consentimento}

💬 Mensagem:
${data.mensagem}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Data: ${sentAt}`,
            };

            // Email de confirmação para o lead
            const welcomeEmailParams = {
                to_email: data.email,
                to_name: data.nome,
                nome_empresa: data.empresa,
                subject: `Recebemos sua solicitação, ${data.nome}!`,
                message: `Olá ${data.nome}!

Recebemos sua solicitação de contato sobre a InnoTalk. Em breve nossa equipe vai falar com você pelo e-mail ou telefone informados.

Se tiver alguma dúvida, responda este email ou escreva para ${SUPPORT_EMAIL}.

Atenciosamente,
Equipe InnoTalk`,
                reply_to: SUPPORT_EMAIL,
            };

            // Sempre envia a notificação para a equipe.
            // O email de confirmação só é enviado se o 2º template estiver configurado.
            const sends = [
                emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY),
            ];

            if (EMAILJS_WELCOME_TEMPLATE_ID)
            {
                sends.push(emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_WELCOME_TEMPLATE_ID, welcomeEmailParams, EMAILJS_PUBLIC_KEY));
            }

            await Promise.all(sends);

            // Só mostra sucesso depois que o EmailJS confirmou o envio.
            // A mensagem fica visível até a pessoa sair da página ou enviar de novo.
            setSubmitStatus("success");
            setFormData(EMPTY_FORM);
            setErrors({});
            setTouched({});
        }
        catch (error)
        {
            // Mantém os dados preenchidos para a pessoa tentar de novo sem redigitar.
            console.error("Erro ao enviar email:", error);
            setSubmitStatus("error");
        }
        finally
        {
            setIsSubmitting(false);
        }
    };

    const errorProps = (name: FieldName) => ({
        "aria-invalid": Boolean(errors[name]),
        "aria-describedby": errors[name] ? `${name}-erro` : undefined,
    });

    const errorMessage = (name: FieldName) => errors[name] && (
        <p id={`${name}-erro`} className="mt-1.5 text-[13px] text-red-300">{errors[name]}</p>
    );

    return (
        <section id="contato" aria-labelledby="contato-titulo" className="scroll-mt-[72px] border-t border-line bg-ink px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
            <div className="mx-auto grid max-w-[1240px] overflow-hidden rounded-[20px] border border-line shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                {/* Painel esquerdo */}
                <div className="relative overflow-hidden bg-black px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-16">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]" />
                    <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 h-[360px] w-[360px] rounded-full bg-brand/30 blur-[110px]" />
                    <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-10 h-40 w-40 rounded-full border border-brand/25" />
                    <div aria-hidden="true" className="pointer-events-none absolute -right-4 top-24 h-16 w-16 rounded-full border border-brand-blue/25" />

                    <div className="relative">
                        <p className="mb-3 text-[12px] font-extrabold tracking-[0.08em] text-brand-soft">CONTATO</p>
                        <h2 id="contato-titulo" className="mb-5 text-[30px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white sm:text-[38px]">Conheça a InnoTalk na prática</h2>
                        <p className="mb-8 max-w-[420px] text-[15px] leading-[1.7] text-muted sm:text-[16px]">
                            Conte um pouco sobre sua empresa e nossa equipe entra em contato para mostrar como centralizar o atendimento do WhatsApp, organizar seus leads e integrar sua agenda.
                        </p>
                        <ul className="mb-10 space-y-3.5">
                            {["Atendimento do WhatsApp em um só lugar", "Leads e negociações organizados no funil", "Agenda sincronizada com o Google Calendar"].map((item) => (
                                <li key={item} className="flex items-start gap-3 text-[14px] text-zinc-200 sm:text-[15px]">
                                    <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand-soft">
                                        <svg width="11" height="11" viewBox="0 0 20 20" fill="none"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="border-t border-line pt-6 text-[14px] text-zinc-400">
                            <p className="mb-1.5">Prefere falar direto?</p>
                            <p><a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-white underline-offset-4 hover:text-brand-soft hover:underline">{SUPPORT_EMAIL}</a></p>
                            <p className="mt-1"><a href="https://wa.me/5562998009542" target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline-offset-4 hover:text-brand-soft hover:underline">WhatsApp (62) 9 9800-9542</a></p>
                        </div>
                    </div>
                </div>

                {/* Painel direito: formulário */}
                <div className="bg-graphite px-5 py-10 sm:px-10 sm:py-14 lg:px-12 lg:py-16">
                    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-describedby="campos-obrigatorios" className="grid gap-5 sm:grid-cols-2">
                        <p id="campos-obrigatorios" className="text-[13px] text-zinc-400 sm:col-span-2">Campos marcados com <span className="text-brand-soft">*</span> são obrigatórios.</p>

                        <div>
                            <label htmlFor="nome" className="mb-2 block text-[13px] font-semibold text-zinc-200">Nome <span className="text-brand-soft" aria-hidden="true">*</span></label>
                            <input id="nome" name="nome" type="text" autoComplete="name" required value={formData.nome} onChange={handleChange} onBlur={handleBlur} disabled={isSubmitting} placeholder="Seu nome" className={`${inputClass} min-h-12 ${fieldBorder(Boolean(errors.nome))}`} {...errorProps("nome")} />
                            {errorMessage("nome")}
                        </div>

                        <div>
                            <label htmlFor="email" className="mb-2 block text-[13px] font-semibold text-zinc-200">E-mail <span className="text-brand-soft" aria-hidden="true">*</span></label>
                            <input id="email" name="email" type="email" inputMode="email" autoComplete="email" required value={formData.email} onChange={handleChange} onBlur={handleBlur} disabled={isSubmitting} placeholder="nome@empresa.com.br" className={`${inputClass} min-h-12 ${fieldBorder(Boolean(errors.email))}`} {...errorProps("email")} />
                            {errorMessage("email")}
                        </div>

                        <div>
                            <label htmlFor="telefone" className="mb-2 block text-[13px] font-semibold text-zinc-200">Telefone ou WhatsApp <span className="text-brand-soft" aria-hidden="true">*</span></label>
                            <input id="telefone" name="telefone" type="tel" inputMode="tel" autoComplete="tel-national" required maxLength={15} value={formData.telefone} onChange={handleChange} onBlur={handleBlur} disabled={isSubmitting} placeholder="(00) 00000-0000" className={`${inputClass} min-h-12 ${fieldBorder(Boolean(errors.telefone))}`} {...errorProps("telefone")} />
                            {errorMessage("telefone")}
                        </div>

                        <div>
                            <label htmlFor="empresa" className="mb-2 block text-[13px] font-semibold text-zinc-200">Empresa <span className="text-brand-soft" aria-hidden="true">*</span></label>
                            <input id="empresa" name="empresa" type="text" autoComplete="organization" required value={formData.empresa} onChange={handleChange} onBlur={handleBlur} disabled={isSubmitting} placeholder="Nome da empresa" className={`${inputClass} min-h-12 ${fieldBorder(Boolean(errors.empresa))}`} {...errorProps("empresa")} />
                            {errorMessage("empresa")}
                        </div>

                        <div>
                            <label htmlFor="segmento" className="mb-2 block text-[13px] font-semibold text-zinc-200">Segmento</label>
                            <div className="relative">
                                <select id="segmento" name="segmento" value={formData.segmento} onChange={handleChange} disabled={isSubmitting} className={`${inputClass} min-h-12 appearance-none pr-10 ${fieldBorder(false)} ${formData.segmento ? "" : "text-zinc-500"}`}>
                                    <option value="" className="bg-graphite text-zinc-400">Selecione</option>
                                    {SEGMENTS.map((segment) => <option key={segment} value={segment} className="bg-graphite text-white">{segment}</option>)}
                                </select>
                                <svg aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="tamanhoEquipe" className="mb-2 block text-[13px] font-semibold text-zinc-200">Tamanho da equipe</label>
                            <div className="relative">
                                <select id="tamanhoEquipe" name="tamanhoEquipe" value={formData.tamanhoEquipe} onChange={handleChange} disabled={isSubmitting} className={`${inputClass} min-h-12 appearance-none pr-10 ${fieldBorder(false)} ${formData.tamanhoEquipe ? "" : "text-zinc-500"}`}>
                                    <option value="" className="bg-graphite text-zinc-400">Selecione</option>
                                    {TEAM_SIZES.map((size) => <option key={size} value={size} className="bg-graphite text-white">{size}</option>)}
                                </select>
                                <svg aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <div className="mb-2 flex items-baseline justify-between gap-3">
                                <label htmlFor="mensagem" className="block text-[13px] font-semibold text-zinc-200">Mensagem</label>
                                <span className={`text-[12px] ${formData.mensagem.length > MESSAGE_MAX ? "text-red-300" : "text-zinc-500"}`} aria-hidden="true">{formData.mensagem.length}/{MESSAGE_MAX}</span>
                            </div>
                            <textarea id="mensagem" name="mensagem" rows={4} value={formData.mensagem} onChange={handleChange} onBlur={handleBlur} disabled={isSubmitting} placeholder="Conte como é o atendimento da sua empresa hoje e o que você gostaria de melhorar." className={`${inputClass} resize-y py-3 ${fieldBorder(Boolean(errors.mensagem))}`} {...errorProps("mensagem")} />
                            {errorMessage("mensagem")}
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="consentimentoMarketing" className="flex cursor-pointer items-start gap-3 text-[14px] leading-[1.5] text-muted">
                                <input id="consentimentoMarketing" name="consentimentoMarketing" type="checkbox" checked={formData.consentimentoMarketing} onChange={handleChange} disabled={isSubmitting} className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-white/20 bg-graphite-2 accent-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft" />
                                <span>Quero receber novidades e conteúdos da InnoTalk por e-mail. <span className="text-zinc-500">(opcional)</span></span>
                            </label>
                        </div>

                        <div className="sm:col-span-2">
                            <button type="submit" disabled={isSubmitting} aria-disabled={isSubmitting} className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[10px] bg-brand px-8 text-[15px] font-bold text-white shadow-[0_12px_32px_-14px_rgba(37,99,235,0.85)] transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
                                {isSubmitting ? (
                                    <>
                                        <svg aria-hidden="true" className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" /><path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                                        Enviando…
                                    </>
                                ) : (
                                    <>
                                        Solicitar contato
                                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                    </>
                                )}
                            </button>
                            <p className="mt-4 text-[13px] leading-[1.6] text-zinc-400">
                                Ao enviar, você concorda com o tratamento dos seus dados para retorno do contato, conforme a nossa{" "}
                                <Link href="/politica-privacidade" className="font-semibold text-brand-soft underline underline-offset-4 hover:text-white">Política de Privacidade</Link>.
                            </p>
                            <div aria-live="polite" className="mt-4">
                                {submitStatus === "success" && (
                                    <div className="rounded-[12px] border border-emerald-400/30 bg-emerald-500/10 px-5 py-4 text-[14px] text-emerald-200">
                                        <p className="font-semibold text-emerald-100">Solicitação enviada com sucesso!</p>
                                        <p className="mt-1">Recebemos seus dados e nossa equipe vai entrar em contato em breve.</p>
                                    </div>
                                )}
                                {submitStatus === "error" && (
                                    <div className="rounded-[12px] border border-red-400/30 bg-red-500/10 px-5 py-4 text-[14px] text-red-200">
                                        <p className="font-semibold text-red-100">Não foi possível enviar sua solicitação.</p>
                                        <p className="mt-1">Seus dados continuam preenchidos. Tente novamente ou escreva para <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold underline underline-offset-4">{SUPPORT_EMAIL}</a>.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
