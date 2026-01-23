import Link from 'next/link';
import Logo from '@/components/Logo';

export default function PrivacyPolicy()
{
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
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">📄 Política de Privacidade</h1>
                    <p className="text-sm text-gray-500 mb-8">Última atualização: 23/01/2026</p>

                    <div className="space-y-8">
                        <div>
                            <p className="text-gray-700 mb-4">
                                A <strong>InnoTalk</strong>, powered by <strong>InnoPro Business</strong>, respeita a privacidade
                                dos seus usuários e está comprometida com a proteção dos dados pessoais tratados em sua plataforma.
                            </p>
                            <p className="text-gray-700">
                                Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos as
                                informações dos usuários do CRM InnoTalk, em conformidade com a <strong>Lei Geral de Proteção de
                                    Dados (LGPD – Lei nº 13.709/2018)</strong>.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Quem somos</h2>
                            <p className="text-gray-700 mb-4">
                                A InnoTalk é uma plataforma de CRM que centraliza atendimentos via WhatsApp, organização de leads,
                                agendamentos e gestão comercial, destinada a empresas, profissionais autônomos e equipes de
                                atendimento.
                            </p>
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                                <p className="text-gray-700"><strong>Controlador dos dados:</strong> InnoPro Business</p>
                                <p className="text-gray-700"><strong>E-mail de contato:</strong> suporte@innotalk.com.br</p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Dados que coletamos</h2>
                            <p className="text-gray-700 mb-4">Podemos coletar os seguintes dados, conforme o uso da plataforma:</p>

                            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Dados do usuário (cliente da InnoTalk)</h3>
                            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                                <li>Nome</li>
                                <li>E-mail</li>
                                <li>Número de WhatsApp</li>
                                <li>Empresa</li>
                                <li>Cargo ou perfil de acesso</li>
                                <li>Dados de login (credenciais criptografadas)</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Dados de leads e contatos</h3>
                            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                                <li>Nome do lead</li>
                                <li>Número de WhatsApp</li>
                                <li>E-mail (quando fornecido)</li>
                                <li>Mensagens trocadas via WhatsApp</li>
                                <li>Etiquetas, status e histórico de atendimento</li>
                                <li>Agendamentos vinculados ao contato</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.3 Dados técnicos</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>Endereço IP</li>
                                <li>Tipo de navegador</li>
                                <li>Data e hora de acesso</li>
                                <li>Logs de uso da plataforma</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Finalidade do uso dos dados</h2>
                            <p className="text-gray-700 mb-4">Os dados coletados são utilizados para:</p>
                            <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                                <li>Operar e disponibilizar as funcionalidades do CRM InnoTalk</li>
                                <li>Centralizar conversas do WhatsApp em ambiente seguro</li>
                                <li>Organizar leads, funis e atendimentos</li>
                                <li>Gerenciar agendamentos e sincronização com Google Agenda</li>
                                <li>Gerar métricas e dashboards de gestão</li>
                                <li>Garantir segurança, performance e estabilidade da plataforma</li>
                                <li>Cumprir obrigações legais e regulatórias</li>
                            </ul>
                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                                <p className="text-gray-700">⚠️ A InnoTalk não vende, aluga ou compartilha dados pessoais para fins comerciais.</p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Integrações com terceiros</h2>
                            <p className="text-gray-700 mb-4">A plataforma pode se integrar a serviços externos, como:</p>
                            <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                                <li>WhatsApp (via APIs autorizadas)</li>
                                <li>Google Calendar</li>
                                <li>Serviços de hospedagem e infraestrutura</li>
                            </ul>
                            <p className="text-gray-700">
                                Essas integrações seguem seus próprios termos e políticas de privacidade, e os dados são utilizados
                                exclusivamente para funcionamento das funcionalidades contratadas.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Compartilhamento de dados</h2>
                            <p className="text-gray-700 mb-4">Os dados poderão ser compartilhados apenas quando:</p>
                            <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                                <li>Necessário para funcionamento técnico da plataforma</li>
                                <li>Exigido por obrigação legal ou ordem judicial</li>
                                <li>Solicitado pelo próprio titular dos dados</li>
                            </ul>
                            <p className="text-gray-700">Sempre respeitando os princípios da LGPD.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Armazenamento e segurança</h2>
                            <p className="text-gray-700 mb-4">Adotamos medidas técnicas e organizacionais para proteger os dados, incluindo:</p>
                            <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                                <li>Criptografia</li>
                                <li>Controle de acesso por perfil de usuário</li>
                                <li>Monitoramento de atividades</li>
                                <li>Ambientes seguros de hospedagem</li>
                            </ul>
                            <p className="text-gray-700">
                                Os dados são armazenados apenas pelo tempo necessário para cumprir as finalidades descritas nesta
                                política.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Direitos do titular dos dados</h2>
                            <p className="text-gray-700 mb-4">Nos termos da LGPD, o usuário pode solicitar:</p>
                            <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                                <li>Confirmação da existência de tratamento de dados</li>
                                <li>Acesso aos dados pessoais</li>
                                <li>Correção de dados incompletos ou desatualizados</li>
                                <li>Exclusão de dados, quando aplicável</li>
                                <li>Revogação de consentimento</li>
                            </ul>
                            <p className="text-gray-700">As solicitações podem ser feitas pelo e-mail: <strong>suporte@innotalk.com.br</strong></p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Responsabilidade do cliente (usuário do CRM)</h2>
                            <p className="text-gray-700">
                                O cliente da InnoTalk é responsável pelo uso correto da plataforma e pelos dados de terceiros
                                (leads e contatos) inseridos no sistema, garantindo que possui base legal para esse tratamento,
                                especialmente em comunicações via WhatsApp.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookies e tecnologias similares</h2>
                            <p className="text-gray-700 mb-4">A InnoTalk pode utilizar cookies e tecnologias semelhantes para:</p>
                            <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                                <li>Manter sessões ativas</li>
                                <li>Melhorar a experiência do usuário</li>
                                <li>Análise de uso da plataforma</li>
                            </ul>
                            <p className="text-gray-700">O usuário pode gerenciar cookies diretamente em seu navegador.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Alterações nesta política</h2>
                            <p className="text-gray-700">
                                Esta Política de Privacidade pode ser atualizada a qualquer momento.
                                Recomendamos que o usuário revise este documento periodicamente.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contato</h2>
                            <p className="text-gray-700 mb-4">Em caso de dúvidas sobre esta Política de Privacidade ou sobre o tratamento de dados pessoais, entre em contato:</p>
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 p-4 rounded-lg">
                                <p className="text-gray-900 font-semibold">📧 suporte@innotalk.com.br</p>
                            </div>
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
