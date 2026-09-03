export default function Sobre() {
  return (
    <section id="sobre" className="py-20 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Texto */}
        <div>

          <span className="inline-block bg-yellow-100 text-yellow-700 font-bold px-5 py-2 rounded-full text-sm">
            QUEM SOMOS
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F4C5C] mt-5 leading-tight">
            Experiência, confiança e compromisso em cada atendimento.
          </h2>

          <p className="mt-7 text-gray-700 text-base sm:text-lg leading-8">
            A <strong>Ágil Assessoria</strong> atua nas áreas de Previdência
            Social e Contabilidade, oferecendo atendimento personalizado para
            trabalhadores urbanos e rurais, aposentados, pensionistas,
            contribuintes do INSS, empresários e pessoas que precisam de
            orientação para resolver questões burocráticas.
          </p>

          <p className="mt-5 text-gray-700 text-base sm:text-lg leading-8">
            Nosso trabalho é compreender a situação de cada cliente, analisar
            os documentos e orientar sobre os caminhos disponíveis, sempre com
            <strong> transparência, responsabilidade e atenção</strong>.
          </p>

          {/* Lista de valores */}
          <div className="mt-7 grid sm:grid-cols-2 gap-4">

            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0F4C5C] text-yellow-300 font-bold">
                ✓
              </span>
              <span className="text-gray-700 font-medium">
                Atendimento personalizado
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0F4C5C] text-yellow-300 font-bold">
                ✓
              </span>
              <span className="text-gray-700 font-medium">
                Análise individual
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0F4C5C] text-yellow-300 font-bold">
                ✓
              </span>
              <span className="text-gray-700 font-medium">
                Transparência
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0F4C5C] text-yellow-300 font-bold">
                ✓
              </span>
              <span className="text-gray-700 font-medium">
                Acompanhamento
              </span>
            </div>

          </div>

          {/* Botão */}
          <a
            href="https://wa.me/5566992083796"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center mt-9 bg-[#0F4C5C] hover:bg-[#0b3944] text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 hover:scale-105"
          >
            💬 Falar com um Especialista
          </a>

        </div>

        {/* Área visual */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6">

          {/* Previdência */}
          <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6 sm:p-8 text-center border border-gray-100">
            <div className="text-5xl sm:text-6xl">
              ⚖️
            </div>

            <p className="mt-4 font-bold text-lg sm:text-xl text-[#0F4C5C]">
              Previdência
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Orientação previdenciária
            </p>
          </div>

          {/* Rural */}
          <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6 sm:p-8 text-center border border-gray-100">
            <div className="text-5xl sm:text-6xl">
              🌾
            </div>

            <p className="mt-4 font-bold text-lg sm:text-xl text-[#0F4C5C]">
              Rural
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Atendimento ao trabalhador rural
            </p>
          </div>

          {/* Contabilidade */}
          <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6 sm:p-8 text-center border border-gray-100">
            <div className="text-5xl sm:text-6xl">
              📊
            </div>

            <p className="mt-4 font-bold text-lg sm:text-xl text-[#0F4C5C]">
              Contabilidade
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Soluções contábeis
            </p>
          </div>

          {/* Atendimento */}
          <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6 sm:p-8 text-center border border-gray-100">
            <div className="text-5xl sm:text-6xl">
              🤝
            </div>

            <p className="mt-4 font-bold text-lg sm:text-xl text-[#0F4C5C]">
              Atendimento
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Atenção em cada etapa
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}