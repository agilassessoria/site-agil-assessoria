import Image from "next/image";

export default function Banner() {
  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0F4C5C]"
    >
      {/* Imagem de fundo */}
      <div className="absolute inset-0">
        <Image
          src="/images/banner.jpg"
          alt="Ágil Assessoria Previdenciária e Contábil"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Sobreposição para melhorar a leitura */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F4C5C]/95 via-[#0F4C5C]/85 to-[#0F4C5C]/40" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 py-20 w-full">
        <div className="max-w-4xl">

          {/* Selo */}
          <span className="inline-block bg-yellow-400 text-[#0F4C5C] font-bold px-5 py-2 rounded-full shadow-lg text-sm sm:text-base">
            Especialistas em Previdência e Contabilidade
          </span>

          {/* Título */}
          <h1 className="mt-7 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white">
            Seus direitos,
            <br />

            <span className="text-yellow-300">
              nosso compromisso.
            </span>
          </h1>

          {/* Texto */}
          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl">
            A Ágil Assessoria ajuda você a entender seus direitos e buscar
            benefícios do INSS com segurança, orientação e atendimento
            humanizado.
          </p>

          {/* Destaques */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-white">

            <div className="flex items-center gap-3">
              <span className="text-yellow-300 text-xl">✓</span>
              <span>Especialistas em INSS</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-yellow-300 text-xl">✓</span>
              <span>Aposentadorias e benefícios</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-yellow-300 text-xl">✓</span>
              <span>Atendimento rural e urbano</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-yellow-300 text-xl">✓</span>
              <span>Planejamento previdenciário</span>
            </div>

          </div>

          {/* Chamada */}
          <p className="mt-8 text-white font-semibold text-lg">
            Não sabe se tem direito a algum benefício?
          </p>

          <p className="mt-1 text-white/80">
            Fale com a Ágil e faça uma análise da sua situação.
          </p>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-8">

            <a
              href="https://wa.me/5566992083796"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-2xl transition duration-300 hover:scale-105"
            >
              💬 Falar com um especialista
            </a>

            <a
              href="#servicos"
              className="inline-flex items-center justify-center border-2 border-yellow-400 bg-white/10 backdrop-blur-sm hover:bg-yellow-400 hover:text-[#0F4C5C] text-white px-8 py-4 rounded-xl text-lg font-bold transition duration-300"
            >
              Conheça nossos serviços
            </a>

          </div>

        </div>
      </div>

      {/* Curva inferior */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-16 sm:h-20 fill-white"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
        </svg>
      </div>
    </section>
  );
}