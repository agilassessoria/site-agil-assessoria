export default function Sobre() {
  return (
    <section id="sobre" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Texto */}
        <div>

          <span className="inline-block bg-yellow-100 text-yellow-700 font-bold px-5 py-2 rounded-full">
            Quem Somos
          </span>

          <h2 className="text-5xl font-extrabold text-[#0F4C5C] mt-6 leading-tight">
            Experiência, confiança e compromisso com os seus direitos.
          </h2>

          <p className="mt-8 text-gray-700 text-lg leading-8">
            A <strong>Ágil Assessoria</strong> é especializada em Previdência
            Social e Contabilidade, oferecendo atendimento personalizado para
            trabalhadores urbanos, rurais, aposentados, pensionistas,
            empresários e contribuintes do INSS.
          </p>

          <p className="mt-6 text-gray-700 text-lg leading-8">
            Trabalhamos com transparência, responsabilidade e dedicação para
            orientar cada cliente durante todo o processo, buscando sempre a
            melhor solução para garantir seus direitos e proporcionar segurança
            em cada etapa do atendimento.
          </p>

          <a
            href="https://wa.me/5566992083796"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 bg-[#0F4C5C] hover:bg-[#0b3944] text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
          >
            Falar com um Especialista
          </a>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-6">

          <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 text-center">

            <h3 className="text-6xl">⚖️</h3>

            <p className="mt-5 font-bold text-xl text-[#0F4C5C]">
              Previdência
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 text-center">

            <h3 className="text-6xl">🌾</h3>

            <p className="mt-5 font-bold text-xl text-[#0F4C5C]">
              Rural
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 text-center">

            <h3 className="text-6xl">📊</h3>

            <p className="mt-5 font-bold text-xl text-[#0F4C5C]">
              Contabilidade
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 text-center">

            <h3 className="text-6xl">🤝</h3>

            <p className="mt-5 font-bold text-xl text-[#0F4C5C]">
              Atendimento Humanizado
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}