import { Star } from "lucide-react";

export default function Depoimentos() {
  const depoimentos = [
    {
      nome: "Maria S.",
      texto:
        "Fui muito bem atendida pela Ágil Assessoria. Consegui minha aposentadoria com rapidez e segurança.",
    },
    {
      nome: "João P.",
      texto:
        "Excelente atendimento. Tiraram todas as minhas dúvidas e acompanharam todo o processo.",
    },
    {
      nome: "Ana C.",
      texto:
        "Profissionais competentes e muito atenciosos. Recomendo para quem precisa de assessoria previdenciária.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <span className="text-yellow-600 font-bold uppercase tracking-widest">
            Depoimentos
          </span>

          <h2 className="text-4xl font-bold text-[#0F4C5C] mt-3">
            O que nossos clientes dizem
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {depoimentos.map((item) => (
            <div
              key={item.nome}
              className="bg-gray-50 rounded-3xl shadow-lg p-8"
            >
              <div className="flex gap-1 text-yellow-500 mb-5">
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
              </div>

              <p className="text-gray-600 leading-7">
                "{item.texto}"
              </p>

              <h3 className="mt-6 font-bold text-[#0F4C5C]">
                {item.nome}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}