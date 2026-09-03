import {
  Tractor,
  Building2,
  HeartPulse,
  Baby,
  ShieldCheck,
  FileHeart,
  Calculator,
  Scale,
  FileSearch,
  ArrowRight,
} from "lucide-react";

export default function Servicos() {
  const servicos = [
    {
      icon: <Tractor size={42} />,
      titulo: "Aposentadoria Rural",
      descricao:
        "Orientação e análise da documentação de trabalhadores rurais para requerimentos de aposentadoria junto ao INSS.",
    },
    {
      icon: <Building2 size={42} />,
      titulo: "Aposentadoria Urbana",
      descricao:
        "Análise do histórico previdenciário e orientação sobre as possibilidades de aposentadoria para trabalhadores urbanos.",
    },
    {
      icon: <HeartPulse size={42} />,
      titulo: "Benefício por Incapacidade",
      descricao:
        "Orientação para pessoas que estejam temporária ou permanentemente incapacitadas para o trabalho, conforme os requisitos previdenciários.",
    },
    {
      icon: <Baby size={42} />,
      titulo: "Salário-Maternidade",
      descricao:
        "Orientação para seguradas que desejam verificar a possibilidade de receber o salário-maternidade, conforme sua situação previdenciária.",
      destaque: true,
    },
    {
      icon: <ShieldCheck size={42} />,
      titulo: "BPC / LOAS",
      descricao:
        "Análise da situação e orientação sobre os requisitos e documentação necessários para o benefício assistencial.",
    },
    {
      icon: <FileHeart size={42} />,
      titulo: "Pensão por Morte",
      descricao:
        "Orientação aos dependentes sobre os requisitos, documentação e procedimento para solicitar a pensão por morte.",
    },
    {
      icon: <Scale size={42} />,
      titulo: "Revisão de Benefícios",
      descricao:
        "Análise do benefício e da documentação para verificar a existência de possibilidade de revisão.",
    },
    {
      icon: <FileSearch size={42} />,
      titulo: "Planejamento Previdenciário",
      descricao:
        "Análise do histórico contributivo para ajudar você a compreender suas possibilidades previdenciárias.",
    },
    {
      icon: <Calculator size={42} />,
      titulo: "Serviços Contábeis",
      descricao:
        "Soluções contábeis para empresas, MEI, produtores rurais e pessoas físicas, de acordo com cada necessidade.",
    },
  ];

  return (
    <section
      id="servicos"
      className="py-20 sm:py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Cabeçalho */}
        <div className="text-center mb-12 sm:mb-16">

          <span className="inline-block bg-yellow-100 text-yellow-700 font-bold px-5 py-2 rounded-full text-sm">
            COMO PODEMOS AJUDAR
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F4C5C] mt-5">
            Nossos Serviços
          </h2>

          <p className="mt-5 text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-8">
            Oferecemos serviços previdenciários e contábeis com atendimento
            individualizado, orientação clara e acompanhamento em cada etapa.
          </p>

        </div>

        {/* Serviços */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">

          {servicos.map((item) => (
            <div
              key={item.titulo}
              className={`group relative bg-white rounded-3xl border shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden ${
                item.destaque
                  ? "border-yellow-400 ring-2 ring-yellow-400/20"
                  : "border-gray-100"
              }`}
            >

              {/* Faixa superior */}
              <div className="h-2 bg-gradient-to-r from-yellow-400 to-[#0F4C5C]" />

              <div className="p-7 sm:p-8">

                {/* Destaque */}
                {item.destaque && (
                  <div className="mb-4">
                    <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full">
                      DESTAQUE
                    </span>
                  </div>
                )}

                {/* Ícone */}
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-[#0F4C5C] text-yellow-300 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                  {item.icon}
                </div>

                {/* Título */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F4C5C]">
                  {item.titulo}
                </h3>

                {/* Descrição */}
                <p className="mt-4 text-gray-600 leading-7">
                  {item.descricao}
                </p>

                {/* Benefícios do atendimento */}
                <ul className="mt-6 space-y-2 text-gray-700 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Orientação especializada
                  </li>

                  <li className="flex items-center gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Análise da documentação
                  </li>

                  <li className="flex items-center gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Acompanhamento do atendimento
                  </li>
                </ul>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/5566992083796"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 mt-7 w-full bg-[#0F4C5C] hover:bg-[#0b3944] text-white px-5 py-3.5 rounded-xl font-bold transition-all duration-300 hover:scale-[1.02]"
                >
                  Falar com um especialista
                  <ArrowRight size={18} />
                </a>

              </div>
            </div>
          ))}

        </div>

        {/* Chamada final */}
        <div className="mt-14 text-center">

          <p className="text-gray-600 text-base sm:text-lg">
            Não encontrou o que procura?
          </p>

          <p className="mt-1 text-[#0F4C5C] font-bold">
            Entre em contato e explique sua situação.
          </p>

          <a
            href="https://wa.me/5566992083796"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 mt-5 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 hover:scale-105"
          >
            💬 Falar pelo WhatsApp
          </a>

        </div>

      </div>
    </section>
  );
}