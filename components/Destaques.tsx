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
      texto: "Atendimento completo para aposentadorias e benefícios.",
    },
    {
      icon: <FileText size={42} />,
      titulo: "Serviços Contábeis",
      texto: "Soluções completas para pessoas físicas e empresas.",
    },
    {
      icon: <HeartHandshake size={42} />,
      titulo: "Atendimento Humanizado",
      texto: "Agilidade, transparência e acompanhamento do início ao fim.",
    },
  ];

  return (
    <section className="py-20 bg-[#0F4C5C] text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-8">

          {itens.map((item) => (
            <div
              key={item.titulo}
              className="bg-white/10 rounded-2xl p-8 text-center hover:bg-white/20 hover:-translate-y-2 transition duration-300"
            >
              <div className="flex justify-center text-yellow-400 mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold">
                {item.titulo}
              </h3>

              <p className="mt-4 text-gray-200">
                {item.texto}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}