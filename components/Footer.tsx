export default function Footer() {
  return (
    <footer
      id="contato"
      className="bg-[#0F4C5C] text-white pt-14 pb-8"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-12">

          {/* Empresa */}
          <div>
            <h3 className="text-3xl font-bold text-yellow-300">
              Ágil Assessoria
            </h3>

            <p className="mt-5 text-gray-300 leading-7">
              Especialistas em Previdência Social, benefícios do INSS e
              serviços contábeis, oferecendo atendimento com segurança,
              agilidade e compromisso.
            </p>

            <a
              href="https://wa.me/5566992083796"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-xl font-semibold shadow-lg"
            >
              Falar no WhatsApp
            </a>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-2xl font-bold text-yellow-300">
              Contato
            </h3>

            <div className="mt-5 space-y-3 text-gray-300">

              <p>
                📞 <strong>(66) 99208-3796</strong>
              </p>

              <p>
                📍 Colniza - MT
              </p>

              <p>
                ✉️ atendimento@agilassessoria.com.br
              </p>

            </div>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="text-2xl font-bold text-yellow-300">
              Navegação
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <a href="#" className="hover:text-yellow-300 transition">
                  Início
                </a>
              </li>

              <li>
                <a href="#sobre" className="hover:text-yellow-300 transition">
                  Sobre
                </a>
              </li>

              <li>
                <a href="#servicos" className="hover:text-yellow-300 transition">
                  Serviços
                </a>
              </li>

              <li>
                <a href="#calculadora" className="hover:text-yellow-300 transition">
                  Calculadora
                </a>
              </li>

              <li>
                <a href="#contato" className="hover:text-yellow-300 transition">
                  Contato
                </a>
              </li>

            </ul>

          </div>

        </div>

        <div className="border-t border-white/20 mt-12 pt-6 text-center text-gray-400 text-sm">

          © {new Date().getFullYear()} Ágil Assessoria Previdenciária e Contábil.
          Todos os direitos reservados.

        </div>

      </div>
    </footer>
  );
}