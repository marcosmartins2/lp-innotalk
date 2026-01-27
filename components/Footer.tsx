"use client";

import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function Footer() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };
    
    const viewportConfig = { once: true, margin: "-50px" };

    return (
        <motion.footer
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="bg-[#0d1117] border-t border-[#30363d] relative z-10"
        >
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                {/* Linha superior */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 border-b border-white/5 pb-10">
                    {/* Logo + texto */}
                    <div className="flex flex-col gap-3 max-w-sm">
                        <Logo size="md" />
                        <span className="text-sm text-gray-400 leading-relaxed">
                            Centralize, automatize e escale seu atendimento com a plataforma mais completa do mercado.
                        </span>

                        <div className="text-xs text-gray-500 mt-2 space-y-1">
                            <p>CNPJ 56.481.309/0001-03</p>
                            <p>R. 1123, St. Marista, Goiânia - GO, 74175-070, Apt 115</p>
                        </div>

                        <div className="flex gap-4 mt-2">
                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/innotalkcrm/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center text-gray-400 hover:text-white"
                            >
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Navegação */}
                    <div className="flex gap-12 md:gap-20">
                        <div className="flex flex-col gap-4">
                            <h4 className="text-white font-medium">Produto</h4>
                            <nav className="flex flex-col gap-2 text-sm text-gray-400">
                                <a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a>
                                <a href="#planos" className="hover:text-white transition-colors">Planos</a>
                                <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
                            </nav>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="text-white font-medium">Legal</h4>
                            <nav className="flex flex-col gap-2 text-sm text-gray-400">
                                <Link href="/politica-privacidade" className="hover:text-white transition-colors">Privacidade</Link>
                                <Link href="/termos-uso" className="hover:text-white transition-colors">Termos</Link>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Linha do meio: contato + LGPD */}
                <div
                    id="contato"
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-8 pb-6 text-sm"
                >
                    <div className="text-gray-400 space-y-2">
                        <p className="flex items-center gap-2 group">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                            <span className="font-medium text-gray-300">Suporte:</span>
                            <a
                                href="mailto:suporte@innotalk.com.br"
                                className="text-white transition-all decoration-blue-500 hover:underline hover:decoration-2 hover:text-blue-200"
                            >
                                suporte@innotalk.com.br
                            </a>
                        </p>
                        <p className="flex items-center gap-2 group">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            <span className="font-medium text-gray-300">WhatsApp:</span>
                            <a
                                href="https://wa.me/556298009542"
                                target="_blank"
                                rel="noreferrer"
                                className="text-white transition-all decoration-green-500 hover:underline hover:decoration-2 hover:text-green-200"
                            >
                                +55 (62) 9800-9542
                            </a>
                        </p>
                    </div>

                    <div
                        id="lgpd"
                        className="text-gray-500 max-w-md md:text-right text-xs leading-relaxed"
                    >
                        <span className="block mb-1 text-gray-400 font-medium">Segurança e Privacidade</span>
                        A InnoTalk segue as diretrizes da LGPD. Os dados coletados são
                        utilizados apenas para contato comercial e uso da plataforma.
                    </div>
                </div>

                {/* Linha inferior: copyright */}
                <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
                    <span>
                        Powered by <span className="font-medium text-gray-500">InnoPro Business</span> - CNPJ 56.481.309/0001-03
                    </span>
                    <span>
                        © {new Date().getFullYear()} InnoTalk — Todos os direitos reservados.
                    </span>
                </div>
            </div>
        </motion.footer>
    );
}