import Image from "next/image";

export default function Footer()
{
    return (
        <footer className="bg-gradient-to-b from-gray-950 to-black border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                    {/* Logo and Description */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-3 mb-2">
                            <Image
                                src="/LogoInnotalk.png"
                                alt="InnoTalk"
                                width={40}
                                height={40}
                                className="h-10 w-auto"
                            />
                            <span className="text-2xl font-playfair font-semibold tracking-tight text-white">InnoTalk</span>
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
