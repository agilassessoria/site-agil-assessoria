import {
  Landmark,
  FileText,
  HeartHandshake,
} from "lucide-react";

export default function Destaques() {
  const itens = [
    {
      icon: <Landmark size={42} />,
      titulo: "Especialistas em INSS",
      texto:
        "Orientação para aposentadorias, BPC/LOAS, benefícios por incapacidade, pensão por morte e outros benefícios previdenciários.",
    },
    {
      icon: <FileText size={42} />,
      titulo: "Serviços Contábeis",
      texto:
        "Auxiliamos pessoas físicas e empresas com serviços contábeis e soluções burocráticas de forma prática e segura.",
    },
    {
      icon: <HeartHandshake size={42} />,
      titulo: "Atendimento Humanizado",
      texto:
        "Analisamos cada situação de forma individual, com transparência, atenção e acompanhamento durante todo o processo.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#0F4C5C] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Título da seção */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-yellow-400 font-bold uppercase tracking-wider text-sm">
            Por que escolher a Ágil?
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold">
            Segurança, experiência e cuidado com você
          </h2>

          <p className="mt-4 text-gray-200 text-base sm:text-lg">
            Conte com uma equipe preparada para orientar você na busca pelos
            seus direitos e na solução das suas necessidades.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">

          {itens.map((item) => (
            <div
              key={item.titulo}
              className="group bg-white/10 border border-white/10 rounded-2xl p-7 sm:p-8 text-center hover:bg-white/15 hover:-translate-y-2 hover:border-yellow-400/40 transition-all duration-300"
            >
              {/* Ícone */}
              <div className="flex justify-center text-yellow-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              {/* Título */}
              <h3 className="text-xl font-bold">
                {item.titulo}
              </h3>

              {/* Texto */}
              <p className="mt-4 text-gray-200 leading-relaxed">
                {item.texto}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}