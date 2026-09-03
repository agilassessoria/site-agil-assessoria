import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ArrowUp,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contato"
      className="bg-[#0F4C5C] text-white pt-16 pb-8"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Conteúdo principal */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">

          {/* Empresa */}
          <div>

            <h3 className="text-3xl font-extrabold text-yellow-300">
              Ágil Assessoria
            </h3>

            <p className="mt-5 text-gray-300 leading-7">
              Assessoria Previdenciária e Contábil para pessoas físicas,
              trabalhadores urbanos e rurais, contribuintes do INSS,
              aposentados, pensionistas e empresas.
            </p>

            <p className="mt-4 text-gray-300 leading-7">
              Atendimento com clareza, responsabilidade e atenção às
              necessidades de cada cliente.
            </p>

            {/* WhatsApp */}
            <a
              href="https://wa.me/5566992083796"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 mt-7 bg-green-600 hover:bg-green-700 text-white px-6 py-3.5 rounded-xl font-bold shadow-lg transition-all duration-300 hover:scale-105"
            >
              <MessageCircle size={20} />
              Falar no WhatsApp
            </a>

          </div>

          {/* Contato */}
          <div>

            <h3 className="text-2xl font-bold text-yellow-300">
              Entre em contato
            </h3>

            <div className="mt-6 space-y-5 text-gray-300">

              {/* Telefone 1 */}
              <div className="flex items-start gap-3">
                <Phone
                  size={21}
                  className="text-yellow-300 mt-1 shrink-0"
                />

                <div>
                  <p className="font-semibold text-white">
                    (66) 99208-3796
                  </p>

                  <p className="text-sm text-gray-400">
                    WhatsApp
                  </p>
                </div>
              </div>

              {/* Telefone 2 */}
              <div className="flex items-start gap-3">
                <Phone
                  size={21}
                  className="text-yellow-300 mt-1 shrink-0"
                />

                <div>
                  <p className="font-semibold text-white">
                    (66) 98448-7205
                  </p>

                  <p className="text-sm text-gray-400">
                    WhatsApp
                  </p>
                </div>
              </div>

              {/* Endereço */}
              <div className="flex items-start gap-3">
                <MapPin
                  size={21}
                  className="text-yellow-300 mt-1 shrink-0"
                />

                <div>
                  <p className="font-semibold text-white">
                    Endereço
                  </p>

                  <p className="text-sm text-gray-300 mt-1">
                    Av. Vitória Régia, nº 489
                    <br />
                    Colniza - MT
                  </p>
                </div>
              </div>

              {/* E-mail */}
              <div className="flex items-start gap-3">
                <Mail
                  size={21}
                  className="text-yellow-300 mt-1 shrink-0"
                />

                <div>
                  <p className="font-semibold text-white">
                    E-mail
                  </p>

                  <p className="text-sm text-gray-300 mt-1 break-all">
                    atendimento@agilassessoria.com.br
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Navegação */}
          <div>

            <h3 className="text-2xl font-bold text-yellow-300">
              Navegação
            </h3>

            <ul className="mt-6 space-y-4">

              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-300 transition"
                >
                  Início
                </a>
              </li>

              <li>
                <a
                  href="#sobre"
                  className="text-gray-300 hover:text-yellow-300 transition"
                >
                  Quem Somos
                </a>
              </li>

              <li>
                <a
                  href="#servicos"
                  className="text-gray-300 hover:text-yellow-300 transition"
                >
                  Serviços
                </a>
              </li>

              <li>
                <a
                  href="#simulador"
                  className="text-gray-300 hover:text-yellow-300 transition"
                >
                  Simulador
                </a>
              </li>

              <li>
                <a
                  href="#depoimentos"
                  className="text-gray-300 hover:text-yellow-300 transition"
                >
                  Confiança e Atendimento
                </a>
              </li>

              <li>
                <a
                  href="#contato"
                  className="text-gray-300 hover:text-yellow-300 transition"
                >
                  Contato
                </a>
              </li>

            </ul>

          </div>

        </div>

        {/* Linha final */}
        <div className="border-t border-white/20 mt-14 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-gray-400 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Ágil Assessoria Previdenciária e
            Contábil. Todos os direitos reservados.
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-yellow-300 transition"
          >
            Voltar ao início
            <ArrowUp size={17} />
          </a>

        </div>

      </div>
    </footer>
  );
}