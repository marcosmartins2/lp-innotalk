"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function CTAForm()
{
    const [formData, setFormData] = useState({
        name: "",
        whatsapp: "",
        email: "",
        company: "",
        volume: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

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
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <section id="formulario" className="bg-gradient-to-b from-[#0D1424] to-[#0F172A] py-20 px-6 scroll-mt-20">
            <div className="max-w-2xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                        <span className="text-white">Pronto para </span>
                        <span className="text-blue-500">centralizar</span>
                        <br />
                        <span className="text-white">seu atendimento?</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Acesse a versão Beta e descubra o novo padrão de organização para o seu negócio.
                    </p>
                </div>

                {/* Form */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="glass-strong rounded-2xl p-8"
                >
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Nome completo */}
                        <motion.div variants={itemVariants}>
                            <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                                Nome completo <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Seu nome"
                                required
                                className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                        </motion.div>

                        {/* WhatsApp */}
                        <motion.div variants={itemVariants}>
                            <label htmlFor="whatsapp" className="block text-white text-sm font-medium mb-2">
                                WhatsApp <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="tel"
                                id="whatsapp"
                                name="whatsapp"
                                value={formData.whatsapp}
                                onChange={handleChange}
                                placeholder="(00) 00000-0000"
                                required
                                className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                        </motion.div>

                        {/* E-mail */}
                        <motion.div variants={itemVariants}>
                            <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                                E-mail <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="seu@email.com"
                                required
                                className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                        </motion.div>

                        {/* Empresa */}
                        <motion.div variants={itemVariants}>
                            <label htmlFor="company" className="block text-white text-sm font-medium mb-2">
                                Empresa
                            </label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Nome da sua empresa"
                                className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                        </motion.div>

                        {/* Volume mensal */}
                        <motion.div variants={itemVariants}>
                            <label htmlFor="volume" className="block text-white text-sm font-medium mb-2">
                                Volume mensal de conversas (estimado)
                            </label>
                            <input
                                type="text"
                                id="volume"
                                name="volume"
                                value={formData.volume}
                                onChange={handleChange}
                                placeholder="Ex: 500 conversas/mês"
                                className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            variants={itemVariants}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold py-4 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-yellow-400/20 flex items-center justify-center gap-2 text-base mt-6"
                        >
                            {isSubmitting ? "Enviando..." : "Quero participar do Beta"}
                            {!isSubmitting && (
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </motion.button>

                        {/* Status Messages */}
                        {submitStatus === "success" && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-blue-500/20 border border-blue-500/30 text-blue-400 px-4 py-3 rounded-xl text-sm text-center"
                            >
                                ✓ Inscrição enviada com sucesso! Entraremos em contato em breve.
                            </motion.div>
                        )}

                        {submitStatus === "error" && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm text-center"
                            >
                                ✗ Erro ao enviar. Por favor, tente novamente ou entre em contato: suporte@innotalk.com.br
                            </motion.div>
                        )}

                        {/* Privacy Notice */}
                        <p className="text-gray-500 text-xs text-center pt-2">
                            Ao enviar este formulário, você concorda com nossa{" "}
                            <a href="#" className="text-blue-500 hover:text-blue-400 underline">
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
