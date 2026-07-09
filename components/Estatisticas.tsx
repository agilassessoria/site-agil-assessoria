import { Users, FileCheck, Award, MessageCircle } from "lucide-react";

export default function Estatisticas() {
  const dados = [
    {
      icon: <Users size={42} />,
      numero: "+5.000",
      titulo: "Clientes Atendidos",
    },
    {
      icon: <FileCheck size={42} />,
      numero: "+2.000",
      titulo: "Benefícios Concedidos",
    },
    {
      icon: <Award size={42} />,
      numero: "10+",
      titulo: "Anos de Experiência",
    },
    {
      icon: <MessageCircle size={42} />,
      numero: "100%",
      titulo: "Atendimento Personalizado",
    },
  ];

  return (
    <section className="bg-[#0F4C5C] py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white">
            Nossos Números
          </h2>

          <p className="text-gray-300 mt-4">
            Resultados construídos com dedicação, confiança e compromisso.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">

          {dados.map((item) => (
            <div
              key={item.titulo}
              className="bg-white rounded-2xl p-8 shadow-xl text-center hover:-translate-y-2 transition duration-300"
            >
              <div className="flex justify-center text-[#0F4C5C] mb-5">
                {item.icon}
              </div>

              <h3 className="text-4xl font-bold text-[#0F4C5C]">
                {item.numero}
              </h3>

              <p className="mt-3 text-gray-600 font-medium">
                {item.titulo}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}