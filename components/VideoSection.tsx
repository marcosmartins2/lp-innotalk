"use client";

import { motion } from "framer-motion";

export default function VideoSection()
{
    return (
        <section className="bg-gradient-to-b from-[#0d1424] to-[#0a0f1e] py-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Video Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 shadow-2xl border border-slate-700/50"
                >
                    {/* Decorative corners */}
                    <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-br-3xl"></div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-bl-3xl"></div>

                    {/* Video placeholder */}
                    <div className="aspect-video flex items-center justify-center relative">
                        {/* Interface mockup */}
                        <div className="text-center">
                            {/* App icon */}
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <div className="grid grid-cols-3 gap-1 p-2">
                                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm">Interface InnoTalk</p>
                        </div>

                        {/* Bottom stats icon */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 3H21V21H3V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 9H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9 21V9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Mouse indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 translate-y-20">
                        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex items-start justify-center p-1">
                            <div className="w-1 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
