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
        "Assessoria completa para trabalhadores rurais conquistarem sua aposentadoria com segurança.",
    },
    {
      icon: <Building2 size={42} />,
      titulo: "Aposentadoria Urbana",
      descricao:
        "Planejamento previdenciário e acompanhamento em todo o processo.",
    },
    {
      icon: <HeartPulse size={42} />,
      titulo: "Auxílio-Doença",
      descricao:
        "Orientação especializada para requerimento e revisão de benefícios.",
    },
    {
      icon: <Baby size={42} />,
      titulo: "Salário-Maternidade",
      descricao:
        "Orientação completa para solicitar o salário-maternidade junto ao INSS.",
    },
    {
      icon: <ShieldCheck size={42} />,
      titulo: "BPC / LOAS",
      descricao:
        "Análise completa da documentação e solicitação do benefício assistencial.",
    },
    {
      icon: <FileHeart size={42} />,
      titulo: "Pensão por Morte",
      descricao:
        "Atendimento humanizado para garantir os direitos dos dependentes.",
    },
    {
      icon: <Scale size={42} />,
      titulo: "Revisão de Benefícios",
      descricao:
        "Verificamos se seu benefício pode ser revisado para aumentar seu valor.",
    },
    {
      icon: <FileSearch size={42} />,
      titulo: "Planejamento Previdenciário",
      descricao:
        "Planejamento personalizado para garantir a melhor aposentadoria.",
    },
    {
      icon: <Calculator size={42} />,
      titulo: "Serviços Contábeis",
      descricao:
        "Contabilidade para empresas, MEI, produtores rurais e pessoas físicas.",
    },
  ];

  return (
    <section
      id="servicos"
      className="py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="inline-block bg-yellow-100 text-yellow-700 font-bold px-5 py-2 rounded-full">
            Como podemos ajudar você
          </span>

          <h2 className="text-5xl font-extrabold text-[#0F4C5C] mt-6">
            Nossos Serviços
          </h2>

          <p className="mt-6 text-gray-600 text-lg max-w-3xl mx-auto leading-8">
            Oferecemos soluções completas em Previdência Social e Contabilidade,
            com atendimento personalizado, transparência e acompanhamento em
            todas as etapas do seu processo.
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">

          {servicos.map((item) => (
            <div
              key={item.titulo}
              className="group relative bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 overflow-hidden"
            >

              <div className="h-2 bg-gradient-to-r from-yellow-400 to-green-500"></div>

              <div className="p-8">

                <div className="w-20 h-20 rounded-2xl bg-[#0F4C5C] text-white flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold text-[#0F4C5C]">
                  {item.titulo}
                </h3>

                <p className="mt-5 text-gray-600 leading-7">
                  {item.descricao}
                </p>

                <ul className="mt-6 space-y-2 text-gray-700 text-sm">
                  <li>✔ Atendimento especializado</li>
                  <li>✔ Análise documental</li>
                  <li>✔ Acompanhamento completo</li>
                </ul>

                <a
                  href="https://wa.me/5566992083796"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-8 bg-[#0F4C5C] hover:bg-[#0b3944] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  Falar com um especialista
                  <ArrowRight size={18} />
                </a>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}