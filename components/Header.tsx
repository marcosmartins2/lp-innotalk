"use client";

import { motion } from "framer-motion";
import Logo from "@/components/Logo";

export default function Header()
{
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-black text-white py-4 px-6 sticky top-0 z-50 backdrop-blur-sm bg-black/90"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Logo size="md" />

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <a
                        href="#como-funciona"
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                        Como Funciona
                    </a>
                    <a
                        href="#beneficios"
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                        Benefícios
                    </a>
                    <a
                        href="#planos"
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                        Planos
                    </a>
                    <a
                        href="#faq"
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                        FAQ
                    </a>
                </nav>

                {/* CTA Button */}
                <motion.a
                    href="#formulario"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded transition-colors text-sm"
                >
                    Participar do Beta
                </motion.a>
            </div>
        </motion.header>
    );
}
