export default function Footer()
{
    return (
        <footer className="bg-gradient-to-b from-gray-950 to-black border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                    {/* Logo and Description */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-sm flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 2L12 8L8 14L4 8L8 2Z" fill="white" />
                                </svg>
                            </div>
                            <span className="text-xl font-semibold text-white">InnoTalk</span>
                        </div>
                        <p className="text-gray-400 text-sm">Powered by InnoPro Business</p>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
                        <a href="#como-funciona" className="text-gray-400 hover:text-white transition-colors">
                            Como Funciona
                        </a>
                        <a href="#planos" className="text-gray-400 hover:text-white transition-colors">
                            Planos
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            Política de Privacidade
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            Termos de Uso
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            Contato
                        </a>
                    </nav>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 mb-6"></div>

                {/* Bottom Section */}
                <div className="text-center">
                    <p className="text-gray-500 text-sm">
                        © 2025 InnoTalk — Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
