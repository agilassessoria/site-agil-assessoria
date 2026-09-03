import {
  Users,
  FileCheck,
  Award,
  MessageCircle,
} from "lucide-react";

export default function Estatisticas() {
  const dados = [
    {
      icon: <Users size={42} />,
      numero: "01",
      titulo: "Atendimento Individual",
      texto: "Cada cliente recebe atenção de acordo com sua situação.",
    },
    {
      icon: <FileCheck size={42} />,
      numero: "02",
      titulo: "Análise de Documentos",
      texto: "Orientação para organizar e compreender a documentação necessária.",
    },
    {
      icon: <Award size={42} />,
      numero: "03",
      titulo: "Orientação Especializada",
      texto: "Atendimento voltado às necessidades previdenciárias e contábeis.",
    },
    {
      icon: <MessageCircle size={42} />,
      numero: "04",
      titulo: "Acompanhamento",
      texto: "Suporte e orientação durante as etapas do atendimento.",
    },
  ];

  return (
    <section className="bg-[#0F4C5C] py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Título */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-yellow-400 font-bold uppercase tracking-wider text-sm">
            Nosso compromisso
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
            Atendimento pensado para você
          </h2>

          <p className="text-gray-200 mt-4 text-base sm:text-lg leading-relaxed">
            Na Ágil, cada atendimento é realizado com atenção,
            responsabilidade e transparência.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {dados.map((item) => (
            <div
              key={item.titulo}
              className="group bg-white rounded-2xl p-7 shadow-xl text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >

              {/* Número */}
              <div className="text-sm font-extrabold text-yellow-600 mb-4">
                {item.numero}
              </div>

              {/* Ícone */}
              <div className="flex justify-center text-[#0F4C5C] mb-5 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              {/* Título */}
              <h3 className="text-xl font-bold text-[#0F4C5C]">
                {item.titulo}
              </h3>

              {/* Texto */}
              <p className="mt-3 text-gray-600 leading-relaxed text-sm">
                {item.texto}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}