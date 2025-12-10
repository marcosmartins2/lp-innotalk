"use client";

import { useState } from "react";

const features = [
    {
        id: "01",
        title: "WhatsApp (Entrada)",
        description: "Nova mensagem recebida",
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        iconColor: "text-emerald-500",
        borderColor: "border-emerald-500/30",
        bgColor: "bg-emerald-500/10",
    },
    {
        id: "02",
        title: "Organização (InnoTalk)",
        description: "Lead e conversa registrados automaticamente",
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
            </svg>
        ),
        iconColor: "text-blue-500",
        borderColor: "border-blue-500/30",
        bgColor: "bg-blue-500/10",
    },
    {
        id: "03",
        title: "Agenda (Google Calendar)",
        description: "Agendamentos sincronizados com o Google",
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        iconColor: "text-blue-400",
        borderColor: "border-blue-400/30",
        bgColor: "bg-blue-400/10",
    },
    {
        id: "04",
        title: "Dashboard (Gestão)",
        description: "Acompanhe métricas e resultados em tempo real",
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        iconColor: "text-purple-500",
        borderColor: "border-purple-500/30",
        bgColor: "bg-purple-500/10",
    },
];

export default function FeaturesFlow()
{
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section id="como-funciona" className="bg-black py-20 px-6 scroll-mt-20">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="text-white">Veja como a InnoTalk </span>
                        <span className="text-blue-500">conecta tudo</span>
                        <span className="text-white"> pra você.</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                        Do WhatsApp ao agendamento confirmado — tudo em um fluxo automatizado e integrado.
                    </p>
                </div>

                {/* Features Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {features.map((feature, index) => (
                        <div
                            key={feature.id}
                            className={`relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 transition-all duration-300 cursor-pointer ${index === activeIndex
                                ? `border-2 ${feature.borderColor} shadow-xl scale-105`
                                : "border border-gray-800 hover:border-gray-700"
                                }`}
                            onClick={() => setActiveIndex(index)}
                        >
                            {/* Badge number */}
                            <div className="absolute -top-3 right-6">
                                <div className={`${index === activeIndex ? 'bg-blue-500' : 'bg-gray-700'} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                                    {feature.id}
                                </div>
                            </div>

                            {/* Icon */}
                            <div className={`w-20 h-20 ${feature.bgColor} rounded-full flex items-center justify-center mb-4 ${feature.iconColor}`}>
                                {feature.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-white font-semibold text-lg mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Pagination dots */}
                <div className="flex items-center justify-center gap-2">
                    {features.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                ? "bg-blue-500 w-8"
                                : "bg-gray-700 w-2 hover:bg-gray-600"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
