import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#0F4C5C]/95 backdrop-blur-md shadow-lg border-b border-[#C9A227]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3 min-w-0">
            <Image
              src="/images/logo.png"
              alt="Ágil Assessoria"
              width={58}
              height={58}
              priority
              className="rounded-xl shrink-0"
            />

            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-wide text-white">
                Ágil Assessoria
              </h1>

              <p className="text-xs sm:text-sm text-yellow-300 font-medium">
                Previdenciária • Contábil
              </p>
            </div>
          </a>

          {/* Menu */}
          <nav className="hidden lg:flex items-center gap-6 text-white font-semibold">

            <a
              href="#inicio"
              className="hover:text-yellow-300 transition duration-200"
            >
              Início
            </a>

            <a
              href="#sobre"
              className="hover:text-yellow-300 transition duration-200"
            >
              Sobre
            </a>

            <a
              href="#servicos"
              className="hover:text-yellow-300 transition duration-200"
            >
              Serviços
            </a>

            <a
              href="#simulador"
              className="hover:text-yellow-300 transition duration-200"
            >
              Simulador
            </a>

            <a
              href="#depoimentos"
              className="hover:text-yellow-300 transition duration-200"
            >
              Depoimentos
            </a>

            <a
              href="#contato"
              className="hover:text-yellow-300 transition duration-200"
            >
              Contato
            </a>

          </nav>

          {/* WhatsApp */}
          <a
            href="https://wa.me/5566992083796"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-3 rounded-xl font-bold shadow-lg transition duration-200"
          >
            <span className="hidden sm:inline">
              Fale conosco
            </span>

            <span className="sm:hidden">
              WhatsApp
            </span>
          </a>

        </div>
      </div>
    </header>
  );
}