import Link from 'next/link';
import Logo from '@/components/Logo';

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Voltar
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <Logo />
            <h1 className="text-2xl font-bold text-gray-900">InnoTalk CRM</h1>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">📋 Termos de Uso</h1>
          <p className="text-sm text-gray-500 mb-8">Última atualização: 23/01/2026</p>

          <div className="space-y-8">
            <div>
              <p className="text-gray-700 mb-4">
                Estes Termos de Uso regulam o acesso e a utilização da plataforma <strong>InnoTalk</strong>,
                powered by <strong>InnoPro Business</strong>, disponível para empresas, profissionais autônomos
                e equipes que desejam organizar atendimentos, leads, conversas e agendamentos.
              </p>
              <p className="text-gray-700">
                Ao acessar ou utilizar a InnoTalk, o usuário declara que leu, compreendeu e concorda
                integralmente com estes Termos.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Sobre a InnoTalk</h2>
              <p className="text-gray-700 mb-4">A InnoTalk é um sistema de CRM que permite:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Centralizar conversas do WhatsApp</li>
                <li>Gerenciar leads e funis de atendimento/vendas</li>
                <li>Criar e acompanhar agendamentos</li>
                <li>Visualizar métricas de atendimento e performance</li>
                <li>Organizar serviços, etiquetas e históricos de clientes</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Aceitação dos Termos</h2>
              <p className="text-gray-700 mb-4">
                O uso da plataforma implica na aceitação destes Termos de Uso e da Política de Privacidade da
                InnoTalk.
              </p>
              <p className="text-gray-700">
                Caso o usuário não concorde com qualquer condição aqui descrita, deverá interromper
                imediatamente o uso da plataforma.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cadastro e acesso à conta</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Responsabilidade do usuário</h3>
              <p className="text-gray-700 mb-4">O usuário é responsável por:</p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                <li>Fornecer informações verdadeiras no cadastro</li>
                <li>Manter a confidencialidade de suas credenciais</li>
                <li>Garantir que apenas pessoas autorizadas acessem sua conta</li>
              </ul>
              <p className="text-gray-700">A InnoTalk não se responsabiliza por acessos indevidos causados por negligência do usuário.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Perfis de acesso</h2>
              <p className="text-gray-700 mb-4">A plataforma poderá oferecer diferentes níveis de acesso, como:</p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                <li>Dono / Administrador</li>
                <li>Atendente / Usuário</li>
              </ul>
              <p className="text-gray-700">
                Cada perfil possui permissões específicas. O Dono/Admin é responsável pela gestão de
                acessos e informações da conta.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Uso do WhatsApp e dados de terceiros</h2>
              <p className="text-gray-700 mb-4">Ao utilizar integrações com WhatsApp, o usuário declara que:</p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                <li>Possui base legal para entrar em contato com seus leads/clientes</li>
                <li>É responsável pelo conteúdo das mensagens enviadas</li>
                <li>Respeita a legislação vigente (LGPD, Marco Civil da Internet, entre outras)</li>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <p className="text-gray-700">⚠️ A InnoTalk atua apenas como plataforma de organização e gestão, não sendo responsável pelas comunicações realizadas pelo usuário.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Serviços, etiquetas e valores</h2>
              <p className="text-gray-700 mb-4">A InnoTalk permite o cadastro de:</p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                <li>Serviços</li>
                <li>Etiquetas</li>
                <li>Etapas de atendimento e funil</li>
              </ul>
              <p className="text-gray-700 mb-2">Os valores financeiros vinculados a serviços:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>São visíveis apenas para usuários com permissão (ex: Dono/Admin)</li>
                <li>Não são exibidos para perfis operacionais, garantindo controle e confidencialidade</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitações de uso</h2>
              <p className="text-gray-700 mb-4">É estritamente proibido:</p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                <li>Utilizar a plataforma para atividades ilegais</li>
                <li>Violar direitos de terceiros</li>
                <li>Tentar acessar áreas não autorizadas do sistema</li>
                <li>Realizar engenharia reversa, cópia ou exploração indevida da plataforma</li>
              </ul>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-gray-700">⚠️ O descumprimento pode resultar em suspensão ou cancelamento da conta, sem aviso prévio.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disponibilidade da plataforma</h2>
              <p className="text-gray-700 mb-4">A InnoTalk busca manter a plataforma disponível de forma contínua, porém:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Podem ocorrer manutenções programadas</li>
                <li>Interrupções podem acontecer por fatores técnicos ou externos</li>
                <li>Não garantimos disponibilidade ininterrupta, mas atuamos para minimizar impactos</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cancelamento e encerramento da conta</h2>
              <p className="text-gray-700 mb-4">O usuário pode solicitar o cancelamento da conta a qualquer momento.</p>
              <p className="text-gray-700 mb-4">A InnoTalk reserva-se o direito de encerrar contas que:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Descumpram estes Termos</li>
                <li>Utilizem a plataforma de forma indevida</li>
                <li>Apresentem risco à segurança ou integridade do sistema</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Propriedade intelectual</h2>
              <p className="text-gray-700 mb-4">Todo o conteúdo da InnoTalk, incluindo:</p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                <li>Marca</li>
                <li>Interface</li>
                <li>Layout</li>
                <li>Código</li>
                <li>Funcionalidades</li>
              </ul>
              <p className="text-gray-700">
                É de propriedade da <strong>InnoPro Business</strong>, sendo proibida sua reprodução
                sem autorização expressa.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Atualizações dos Termos</h2>
              <p className="text-gray-700">
                Estes Termos de Uso podem ser atualizados a qualquer momento. O uso contínuo da plataforma
                após alterações significa concordância com os novos termos.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Suporte e contato</h2>
              <p className="text-gray-700 mb-4">Para dúvidas, suporte ou solicitações relacionadas à plataforma:</p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 p-4 rounded-lg space-y-2">
                <p className="text-gray-900 font-semibold">📧 suporte@innotalk.com.br</p>
                <p className="text-gray-900 font-semibold">📱 WhatsApp: (62) 9 9800-9542</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Foro</h2>
              <p className="text-gray-700">
                Fica eleito o foro da comarca de domicílio da InnoPro Business, para dirimir quaisquer
                questões oriundas destes Termos, com renúncia a qualquer outro, por mais privilegiado que seja.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p>© 2026 InnoTalk - InnoPro Business. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
