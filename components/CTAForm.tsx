"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CTAForm() {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    company: "",
    volume: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <section className="bg-gradient-to-b from-black to-[#0a0f1e] py-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Pronto para </span>
            <span className="text-blue-500">centralizar</span>
            <br />
            <span className="text-white">seu atendimento?</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Acesse a versão Beta e descubra o novo padrão de organização para o seu negócio.
          </p>
        </div>

        {/* Form */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 border border-gray-800"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome completo */}
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                Nome completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome"
                required
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </motion.div>

            {/* WhatsApp */}
            <motion.div variants={itemVariants}>
              <label htmlFor="whatsapp" className="block text-white text-sm font-medium mb-2">
                WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
                required
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </motion.div>

            {/* E-mail */}
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                E-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
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
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
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
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-base"
            >
              Quero participar do Beta
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            {/* Privacy Notice */}
            <p className="text-gray-500 text-xs text-center">
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
