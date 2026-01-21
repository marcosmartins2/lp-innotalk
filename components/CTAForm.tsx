"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

// Form field error types
type FormErrors = {
    name?: string;
    whatsapp?: string;
    email?: string;
};

// Input field base styles
const inputBaseStyles = "w-full bg-bg-dark/80 border rounded-lg px-md py-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 transition-all";
const inputDefaultStyles = "border-border-subtle focus:border-accent-blue focus:ring-accent-blue";
const inputErrorStyles = "border-red-500 focus:border-red-500 focus:ring-red-500";

export default function CTAForm()
{
    const [formData, setFormData] = useState({
        name: "",
        whatsapp: "",
        email: "",
        company: "",
        volume: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    // A11y: Track user's motion preference
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() =>
    {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    // Validation function
    const validateForm = (): boolean =>
    {
        const newErrors: FormErrors = {};

        // Name validation
        if (!formData.name.trim())
        {
            newErrors.name = "Nome é obrigatório";
        }
        else if (formData.name.trim().length < 2)
        {
            newErrors.name = "Nome deve ter pelo menos 2 caracteres";
        }

        // WhatsApp validation
        const whatsappClean = formData.whatsapp.replace(/\D/g, "");
        if (!whatsappClean)
        {
            newErrors.whatsapp = "WhatsApp é obrigatório";
        }
        else if (whatsappClean.length < 10 || whatsappClean.length > 11)
        {
            newErrors.whatsapp = "WhatsApp deve ter 10 ou 11 dígitos";
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim())
        {
            newErrors.email = "E-mail é obrigatório";
        }
        else if (!emailRegex.test(formData.email))
        {
            newErrors.email = "E-mail inválido";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Clear field error on change
    const clearFieldError = (field: keyof FormErrors) =>
    {
        if (errors[field])
        {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        setSubmitStatus("idle");

        // Validate before submitting
        if (!validateForm())
        {
            return;
        }

        setIsSubmitting(true);

        try
        {
            const templateParams = {
                to_email: "suporte@innotalk.com.br",
                from_name: formData.name,
                from_email: formData.email,
                whatsapp: formData.whatsapp,
                company: formData.company || "Não informado",
                volume: formData.volume || "Não informado",
                message: `
                    Nova inscrição no Beta da InnoTalk!

                    Nome: ${formData.name}
                    Email: ${formData.email}
                    WhatsApp: ${formData.whatsapp}
                    Empresa: ${formData.company || "Não informado"}
                    Volume mensal: ${formData.volume || "Não informado"}
                `
            };

            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
            );

            setSubmitStatus("success");
            setFormData({
                name: "",
                whatsapp: "",
                email: "",
                company: "",
                volume: "",
            });
            setErrors({});

            setTimeout(() => setSubmitStatus("idle"), 5000);
        }
        catch (error)
        {
            console.error("Erro ao enviar email:", error);
            setSubmitStatus("error");
            setTimeout(() => setSubmitStatus("idle"), 5000);
        }
        finally
        {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        clearFieldError(name as keyof FormErrors);
    };

    // Animation variants with reduced motion support
    const duration = prefersReducedMotion ? 0 : 0.5;

    const containerVariants = {
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration,
                staggerChildren: prefersReducedMotion ? 0 : 0.08
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -20 },
        visible: { opacity: 1, x: 0, transition: { duration } }
    };

    return (
        <section
            id="formulario"
            aria-labelledby="form-heading"
            className="bg-gradient-to-b from-bg-dark-tertiary to-bg-dark py-2xl px-md scroll-mt-xl"
        >
            <div className="max-w-2xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-xl">
                    <h2
                        id="form-heading"
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-lg leading-tight"
                    >
                        <span className="text-text-primary">Pronto para </span>
                        <span className="text-accent-blue">centralizar</span>
                        <span className="text-text-primary block sm:inline"> seu atendimento?</span>
                    </h2>
                    <p className="text-text-secondary text-lg leading-relaxed">
                        Acesse a versão Beta e descubra o novo padrão de organização para o seu negócio.
                    </p>
                </div>

                {/* Form */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="glass-strong rounded-xl p-lg"
                >
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                        {/* Nome completo */}
                        <motion.div variants={itemVariants}>
                            <label htmlFor="name" className="block text-text-primary text-sm font-medium mb-2">
                                Nome completo <span className="text-red-400" aria-hidden="true">*</span>
                                <span className="sr-only">(obrigatório)</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Seu nome"
                                autoComplete="name"
                                aria-required="true"
                                aria-invalid={!!errors.name}
                                aria-describedby={errors.name ? "name-error" : undefined}
                                className={`${inputBaseStyles} ${errors.name ? inputErrorStyles : inputDefaultStyles}`}
                            />
                            {/* A11y: Error message with aria connection */}
                            {errors.name && (
                                <p id="name-error" className="text-red-400 text-sm mt-1" role="alert">
                                    {errors.name}
                                </p>
                            )}
                        </motion.div>

                        {/* WhatsApp */}
                        <motion.div variants={itemVariants}>
                            <label htmlFor="whatsapp" className="block text-text-primary text-sm font-medium mb-2">
                                WhatsApp <span className="text-red-400" aria-hidden="true">*</span>
                                <span className="sr-only">(obrigatório)</span>
                            </label>
                            <input
                                type="tel"
                                id="whatsapp"
                                name="whatsapp"
                                value={formData.whatsapp}
                                onChange={handleChange}
                                placeholder="(00) 00000-0000"
                                autoComplete="tel"
                                aria-required="true"
                                aria-invalid={!!errors.whatsapp}
                                aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
                                className={`${inputBaseStyles} ${errors.whatsapp ? inputErrorStyles : inputDefaultStyles}`}
                            />
                            {errors.whatsapp && (
                                <p id="whatsapp-error" className="text-red-400 text-sm mt-1" role="alert">
                                    {errors.whatsapp}
                                </p>
                            )}
                        </motion.div>

                        {/* E-mail */}
                        <motion.div variants={itemVariants}>
                            <label htmlFor="email" className="block text-text-primary text-sm font-medium mb-2">
                                E-mail <span className="text-red-400" aria-hidden="true">*</span>
                                <span className="sr-only">(obrigatório)</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="seu@email.com"
                                autoComplete="email"
                                aria-required="true"
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? "email-error" : undefined}
                                className={`${inputBaseStyles} ${errors.email ? inputErrorStyles : inputDefaultStyles}`}
                            />
                            {errors.email && (
                                <p id="email-error" className="text-red-400 text-sm mt-1" role="alert">
                                    {errors.email}
                                </p>
                            )}
                        </motion.div>

                        {/* Empresa (optional) */}
                        <motion.div variants={itemVariants}>
                            <label htmlFor="company" className="block text-text-primary text-sm font-medium mb-2">
                                Empresa
                            </label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Nome da sua empresa"
                                autoComplete="organization"
                                className={`${inputBaseStyles} ${inputDefaultStyles}`}
                            />
                        </motion.div>

                        {/* Volume mensal (optional) */}
                        <motion.div variants={itemVariants}>
                            <label htmlFor="volume" className="block text-text-primary text-sm font-medium mb-2">
                                Volume mensal de conversas (estimado)
                            </label>
                            <input
                                type="text"
                                id="volume"
                                name="volume"
                                value={formData.volume}
                                onChange={handleChange}
                                placeholder="Ex: 500 conversas/mês"
                                className={`${inputBaseStyles} ${inputDefaultStyles}`}
                            />
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            variants={itemVariants}
                            whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.99 }}
                            type="submit"
                            disabled={isSubmitting}
                            aria-busy={isSubmitting}
                            aria-disabled={isSubmitting}
                            className="w-full bg-accent-yellow hover:bg-accent-yellow-hover disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold py-md rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-yellow-400/20 flex items-center justify-center gap-2 text-base mt-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    {/* Loading spinner */}
                                    <svg
                                        className="animate-spin h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Enviando...
                                </span>
                            ) : (
                                <>
                                    Quero participar do Beta
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M7.5 15L12.5 10L7.5 5"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </>
                            )}
                        </motion.button>

                        {/* A11y: Status Messages with ARIA live regions */}
                        {submitStatus === "success" && (
                            <motion.div
                                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                                role="alert"
                                aria-live="polite"
                                className="bg-green-500/20 border border-green-500/30 text-green-400 px-md py-sm rounded-lg text-sm text-center"
                            >
                                <span aria-hidden="true">✓ </span>
                                Inscrição realizada com sucesso! Entraremos em contato em breve.
                            </motion.div>
                        )}

                        {submitStatus === "error" && (
                            <motion.div
                                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                                role="alert"
                                aria-live="assertive"
                                className="bg-red-500/20 border border-red-500/30 text-red-400 px-md py-sm rounded-lg text-sm text-center"
                            >
                                <span aria-hidden="true">✗ </span>
                                Erro ao enviar. Por favor, tente novamente ou entre em contato:{" "}
                                <a
                                    href="mailto:suporte@innotalk.com.br"
                                    className="underline hover:text-red-300"
                                >
                                    suporte@innotalk.com.br
                                </a>
                            </motion.div>
                        )}

                        {/* Privacy Notice */}
                        <p className="text-text-muted text-xs text-center pt-2">
                            Ao enviar este formulário, você concorda com nossa{" "}
                            <a
                                href="/politica-privacidade"
                                className="text-accent-blue hover:text-accent-blue-light underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded"
                            >
                                Política de Privacidade
                            </a>
                            .
                        </p>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
