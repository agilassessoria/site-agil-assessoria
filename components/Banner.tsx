import Image from "next/image";

export default function Banner() {
  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0F4C5C]"
    >
      {/* Fundo */}
      <div className="absolute inset-0">
        <Image
          src="/images/banner.jpg"
          alt="Ágil Assessoria"
          fill
          priority
          className="object-cover"
        />

        {/* Camada escura */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F4C5C]/95 via-[#0F4C5C]/80 to-[#0F4C5C]/30"></div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl">

          <span className="inline-block bg-yellow-400 text-[#0F4C5C] font-bold px-5 py-2 rounded-full shadow-lg">
            Especialistas em Previdência e Contabilidade
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight text-white">
            Conquistando seus
            <span className="text-white"> direitos </span>
            com segurança.
          </h1>

          {/* Lista */}
          <div className="mt-8 grid sm:grid-cols-2 gap-4 text-white">

            <div>✅ Atendimento Humanizado</div>
            <div>✅ Especialistas em INSS</div>
            <div>✅ Atendimento Rural e Urbano</div>
            <div>✅ Planejamento Previdenciário</div>

          </div>

          {/* Botões */}
          <div className="flex flex-wrap gap-5 mt-12">

            <a
              href="https://wa.me/5566992083796"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl text-lg font-bold shadow-2xl transition duration-300 hover:scale-105"
            >
              💬 Falar no WhatsApp
            </a>

            <a
              href="#servicos"
              className="border-2 border-yellow-400 bg-white/10 backdrop-blur-sm hover:bg-yellow-400 hover:text-[#0F4C5C] text-white px-8 py-4 rounded-xl text-lg font-bold transition duration-300"
            >
              Conheça nossos serviços
            </a>

          </div>

        </div>
      </div>

      {/* Efeito na parte inferior */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-20 fill-white"
          preserveAspectRatio="none"
        >
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
}