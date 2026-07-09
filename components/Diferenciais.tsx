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
      titulo: "Especialistas em INSS",
      descricao:
        "Equipe preparada para orientar você em todas as etapas do benefício.",
    },
    {
      icon: <Clock3 size={42} />,
      titulo: "Atendimento Ágil",
      descricao:
        "Processos rápidos, acompanhamento constante e suporte personalizado.",
    },
    {
      icon: <Users size={42} />,
      titulo: "Atendimento Humanizado",
      descricao:
        "Cada cliente recebe orientação individual para encontrar a melhor solução.",
    },
    {
      icon: <FileCheck size={42} />,
      titulo: "Análise Completa",
      descricao:
        "Conferimos toda a documentação antes de iniciar o processo.",
    },
    {
      icon: <BadgeCheck size={42} />,
      titulo: "Transparência",
      descricao:
        "Você acompanha todas as etapas do seu atendimento com clareza.",
    },
    {
      icon: <CheckCircle2 size={42} />,
      titulo: "Compromisso",
      descricao:
        "Nosso objetivo é garantir seus direitos com segurança e confiança.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <span className="text-yellow-600 font-bold uppercase tracking-widest">
            Por que escolher a Ágil
          </span>

          <h2 className="text-4xl font-bold text-[#0F4C5C] mt-3">
            Trabalhamos para oferecer o melhor atendimento.
          </h2>

          <p className="mt-5 text-gray-600 max-w-3xl mx-auto">
            Atuamos com responsabilidade, transparência e dedicação para
            garantir que nossos clientes tenham segurança durante todo o
            processo previdenciário e contábil.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {itens.map((item) => (
            <div
              key={item.titulo}
              className="bg-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <div className="text-[#0F4C5C] mb-5">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold text-[#0F4C5C]">
                {item.titulo}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {item.descricao}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}