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
                reply_to: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
                message: `Nova inscrição no Beta da InnoTalk!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 DADOS DO LEAD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Nome: ${formData.nome}
📧 Email: ${formData.email}
📱 WhatsApp: ${formData.telefone}
🏢 Empresa: ${formData.nomeEmpresa}
🆔 CNPJ/CPF: ${formData.cpfCnpj}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Data: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`
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
                                className="bg-blue-500/20 border border-blue-500/30 text-blue-400 px-6 py-4 rounded-xl text-sm text-center space-y-3"
                            >
                                <p className="font-semibold">✓ Inscrição enviada com sucesso!</p>
                                <p className="text-blue-300">Entre no nosso grupo exclusivo do WhatsApp para acompanhar as novidades do Beta:</p>
                                <a
                                    href="https://chat.whatsapp.com/Bi6Cj4hlxYS6sAvGrZEiL9"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-green-500/30"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Acessar Grupo do WhatsApp
                                </a>
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
