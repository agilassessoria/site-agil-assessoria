import {
  Star,
  ShieldCheck,
  MessageCircle,
  FileCheck,
} from "lucide-react";

export default function Depoimentos() {
  const itens = [
    {
      icon: <ShieldCheck size={32} />,
      titulo: "Atendimento com transparência",
      texto:
        "Você recebe informações claras sobre o atendimento e pode tirar suas dúvidas durante cada etapa.",
    },
    {
      icon: <MessageCircle size={32} />,
      titulo: "Comunicação próxima",
      texto:
        "Valorizamos um atendimento humanizado, com linguagem simples e atenção às necessidades de cada cliente.",
    },
    {
      icon: <FileCheck size={32} />,
      titulo: "Orientação responsável",
      texto:
        "Analisamos a situação apresentada e orientamos sobre documentos e caminhos possíveis para cada caso.",
    },
  ];

  return (
    <section
      id="depoimentos"
      className="py-20 sm:py-24 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-12">

          <span className="inline-block bg-yellow-100 text-yellow-700 font-bold px-5 py-2 rounded-full text-sm">
            CONFIANÇA E COMPROMISSO
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F4C5C] mt-5">
            Atendimento que valoriza você
          </h2>

          <p className="mt-5 text-gray-600 text-base sm:text-lg leading-8">
            Na Ágil Assessoria, buscamos construir uma relação baseada em
            confiança, respeito, transparência e responsabilidade.
          </p>

        </div>

        {/* Avaliação visual */}
        <div className="flex justify-center items-center gap-2 mb-10">

          <div className="flex gap-1 text-yellow-500">
            <Star fill="currentColor" size={22} />
            <Star fill="currentColor" size={22} />
            <Star fill="currentColor" size={22} />
            <Star fill="currentColor" size={22} />
            <Star fill="currentColor" size={22} />
          </div>

          <span className="text-gray-600 font-medium">
            Atendimento humanizado
          </span>

        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">

          {itens.map((item) => (
            <div
              key={item.titulo}
              className="bg-white rounded-3xl p-7 sm:p-8 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >

              {/* Ícone */}
              <div className="w-14 h-14 rounded-2xl bg-[#0F4C5C] text-yellow-300 flex items-center justify-center mb-6">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-[#0F4C5C]">
                {item.titulo}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {item.texto}
              </p>

            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="mt-12 bg-[#0F4C5C] rounded-3xl p-8 sm:p-10 text-center">

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Precisa de orientação?
          </h3>

          <p className="mt-3 text-gray-200 max-w-2xl mx-auto">
            Explique sua situação para nossa equipe e veja como podemos
            ajudar.
          </p>

          <a
            href="https://wa.me/5566992083796"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 hover:scale-105"
          >
            💬 Falar pelo WhatsApp
          </a>

        </div>

      </div>
    </section>
  );
}