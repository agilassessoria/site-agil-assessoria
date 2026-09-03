import {
  CheckCircle2,
  ShieldCheck,
  Clock3,
  Users,
  FileCheck,
  BadgeCheck,
} from "lucide-react";

export default function Diferenciais() {
  const itens = [
    {
      icon: <ShieldCheck size={42} />,
      titulo: "Experiência em INSS",
      descricao:
        "Orientação para aposentadorias e benefícios previdenciários, de acordo com a situação de cada cliente.",
    },
    {
      icon: <Clock3 size={42} />,
      titulo: "Agilidade no Atendimento",
      descricao:
        "Buscamos tornar o atendimento mais simples, organizado e objetivo, respeitando cada etapa do processo.",
    },
    {
      icon: <Users size={42} />,
      titulo: "Atendimento Humanizado",
      descricao:
        "Conversamos com você de forma clara e individualizada para compreender suas necessidades.",
    },
    {
      icon: <FileCheck size={42} />,
      titulo: "Análise Documental",
      descricao:
        "Orientação na conferência e organização dos documentos necessários para cada atendimento.",
    },
    {
      icon: <BadgeCheck size={42} />,
      titulo: "Transparência",
      descricao:
        "Informações claras sobre o atendimento e acompanhamento das etapas do serviço contratado.",
    },
    {
      icon: <CheckCircle2 size={42} />,
      titulo: "Responsabilidade",
      descricao:
        "Trabalhamos com atenção e responsabilidade na prestação dos nossos serviços previdenciários e contábeis.",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Cabeçalho */}
        <div className="text-center mb-12 sm:mb-14">

          <span className="text-yellow-600 font-bold uppercase tracking-widest text-sm">
            Por que escolher a Ágil?
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F4C5C] mt-3">
            Um atendimento feito para você.
          </h2>

          <p className="mt-5 text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Mais do que prestar um serviço, buscamos oferecer orientação
            clara, atendimento próximo e segurança em cada etapa.
          </p>

        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

          {itens.map((item) => (
            <div
              key={item.titulo}
              className="group bg-gray-50 border border-gray-100 rounded-3xl p-7 sm:p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >

              {/* Ícone */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0F4C5C] text-yellow-300 mb-6 group-hover:scale-105 transition-transform duration-300">
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

            </div>
          ))}

        </div>

        {/* Chamada */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Precisa de orientação sobre sua situação?
          </p>

          <a
            href="https://wa.me/5566992083796"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center mt-4 bg-[#0F4C5C] hover:bg-[#0b3944] text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 hover:scale-105"
          >
            💬 Fale com a Ágil
          </a>
        </div>

      </div>
    </section>
  );
}