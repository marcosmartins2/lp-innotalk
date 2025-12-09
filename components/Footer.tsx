import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-blue-900 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">
        {/* Linha superior */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-gray-800 pb-6">
          {/* Logo + texto */}
          <div className="flex flex-col gap-1">
            <Logo size="md" />
            <span className="text-sm text-gray-400">
              Powered by <span className="font-semibold">InnoPro Business</span>
            </span>
            <span className="text-xs text-gray-500 mt-2">
              CNPJ 56.481.309/0001-03 · Goiânia – GO · Brasil
            </span>
          </div>

          {/* Navegação */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300">
            <a href="#como-funciona" className="hover:text-white">
              Como Funciona
            </a>
            <a href="#planos" className="hover:text-white">
              Planos
            </a>
            <a href="#faq" className="hover:text-white">
              FAQ
            </a>
            <a href="#lgpd" className="hover:text-white">
              Política de Privacidade
            </a>
            <a href="#lgpd" className="hover:text-white">
              Termos de Uso
            </a>
            <a href="#contato" className="hover:text-white">
              Contato
            </a>
          </nav>
        </div>

        {/* Linha do meio: contato + LGPD */}
        <div
          id="contato"
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4"
        >
          <div className="text-xs text-gray-400 space-y-1">
            <p>
              Suporte e comercial:{' '}
              <a
                href="mailto:contato@innotalk.com.br"
                className="text-blue-400 hover:text-blue-300"
              >
                contato@innotalk.com.br
              </a>
            </p>
            <p>
              WhatsApp:{' '}
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                (00) 00000-0000
              </a>
            </p>
          </div>

          <div
            id="lgpd"
            className="text-xs text-gray-500 max-w-md md:text-right"
          >
            A InnoTalk segue as diretrizes da LGPD. Os dados coletados são
            utilizados apenas para contato comercial e uso da plataforma, com
            armazenamento seguro e possibilidade de exclusão a qualquer momento.
          </div>
        </div>

        {/* Linha inferior: copyright */}
        <div className="mt-6 pt-4 border-t border-gray-900 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} InnoTalk — Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}