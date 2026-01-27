"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function CTAForm()
{
    const [formData, setFormData] = useState({
        nomeEmpresa: "",
        cpfCnpj: "",
        telefone: "",
        email: "",
        nome: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    // Função para formatar CPF ou CNPJ
    const formatCpfCnpj = (value: string) =>
    {
        const numbers = value.replace(/\D/g, "");

        if (numbers.length <= 11)
        {
            // CPF: 000.000.000-00
            return numbers
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else
        {
            // CNPJ: 00.000.000/0000-00
            return numbers
                .substring(0, 14)
                .replace(/(\d{2})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1/$2")
                .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
        }
    };

    // Função para formatar telefone
    const formatTelefone = (value: string) =>
    {
        const numbers = value.replace(/\D/g, "");

        if (numbers.length <= 10)
        {
            // Telefone fixo: (00) 0000-0000
            return numbers
                .replace(/(\d{2})(\d)/, "($1) $2")
                .replace(/(\d{4})(\d{1,4})$/, "$1-$2");
        } else
        {
            // Celular: (00) 00000-0000
            return numbers
                .substring(0, 11)
                .replace(/(\d{2})(\d)/, "($1) $2")
                .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
        }
    };

    const handleSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try
        {
            const templateParams = {
                to_email: "suporte@innotalk.com.br",
                from_name: formData.nome,
                from_email: formData.email,
                nome_empresa: formData.nomeEmpresa,
                cpf_cnpj: formData.cpfCnpj,
                telefone: formData.telefone,
                message: `
                    Nova inscrição no Beta da InnoTalk!
                    
                    Nome da Empresa: ${formData.nomeEmpresa}
                    CNPJ/CPF: ${formData.cpfCnpj}
                    Telefone para contato: ${formData.telefone}
                    Email para contato: ${formData.email}
                    Nome (como gostaria de ser chamado): ${formData.nome}
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
                nomeEmpresa: "",
                cpfCnpj: "",
                telefone: "",
                email: "",
                nome: "",
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
        const { name, value } = e.target;
        let formattedValue = value;

        // Aplicar máscaras
        if (name === "cpfCnpj")
        {
            formattedValue = formatCpfCnpj(value);
        } else if (name === "telefone")
        {
            formattedValue = formatTelefone(value);
        }

        setFormData({
            ...formData,
            [name]: formattedValue,
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
                        {/* Nome da Empresa */}
                        <motion.div variants={itemVariants}>
                            <label htmlFor="nomeEmpresa" className="block text-white text-sm font-medium mb-2">
                                Nome da Empresa <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                id="nomeEmpresa"
                                name="nomeEmpresa"
                                value={formData.nomeEmpresa}
                                onChange={handleChange}
                                placeholder="Nome da sua empresa"
                                required
                                className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 hover:border-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                        </motion.div>

                        {/* CNPJ ou CPF */}
                        <motion.div variants={itemVariants}>
                            <label htmlFor="cpfCnpj" className="block text-white text-sm font-medium mb-2">
                                CNPJ ou CPF <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                id="cpfCnpj"
                                name="cpfCnpj"
                                value={formData.cpfCnpj}
                                onChange={handleChange}
                                placeholder="000.000.000-00 ou 00.000.000/0000-00"
                                required
                                maxLength={18}
                                className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 hover:border-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                        </motion.div>

                        {/* Telefone para contato */}
                        <motion.div variants={itemVariants}>
                            <label htmlFor="telefone" className="block text-white text-sm font-medium mb-2">
                                Telefone para contato <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="tel"
                                id="telefone"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                                placeholder="(00) 00000-0000"
                                required
                                maxLength={15}
                                className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 hover:border-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                        </motion.div>

                        {/* E-mail para contato */}
                        <motion.div variants={itemVariants}>
                            <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                                E-mail para contato <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="seu@email.com"
                                required
                                className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 hover:border-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                        </motion.div>

                        {/* Nome (como gostaria de ser chamado) */}
                        <motion.div variants={itemVariants}>
                            <label htmlFor="nome" className="block text-white text-sm font-medium mb-2">
                                Nome <span className="text-gray-400 text-xs">(como gostaria de ser chamado)</span> <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                placeholder="Como podemos te chamar?"
                                required
                                className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 hover:border-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
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
