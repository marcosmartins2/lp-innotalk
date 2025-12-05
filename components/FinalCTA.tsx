"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-20 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Não perca a oportunidade de fazer parte do{" "}
          <span className="text-yellow-400">futuro</span> do atendimento digital
        </h2>
        
        {/* Subheading */}
        <p className="text-blue-100 text-lg mb-10">
          Vagas limitadas para o Beta. Garanta sua participação agora.
        </p>

        {/* CTA Button */}
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-lg transition-colors inline-flex items-center gap-2 text-base mb-12">
          Garantir minha vaga no Beta
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Features */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-white">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span className="text-sm">Configuração rápida</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-sm">Suporte dedicado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span className="text-sm">Preço especial Beta</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
