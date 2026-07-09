import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#0F4C5C]/95 backdrop-blur-md shadow-lg border-b border-[#C9A227]/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex items-center gap-4">
          <Image
            src="/images/logo.png"
            alt="Ágil Assessoria"
            width={60}
            height={60}
            priority
            className="rounded-xl"
          />

          <div>
            <h1 className="text-2xl font-extrabold tracking-wide text-white">
              Ágil Assessoria
            </h1>

            <p className="text-sm text-yellow-300">
              Previdenciária • Contábil
            </p>
          </div>
        </div>

        {/* Menu */}
        <nav className="hidden lg:flex items-center gap-8 text-white font-semibold">

          <a href="#" className="hover:text-yellow-300 transition">
            Início
          </a>

          <a href="#sobre" className="hover:text-yellow-300 transition">
            Sobre
          </a>

          <a href="#servicos" className="hover:text-yellow-300 transition">
            Serviços
          </a>

          <a href="#calculadora" className="hover:text-yellow-300 transition">
            Calculadora
          </a>

          <a href="#depoimentos" className="hover:text-yellow-300 transition">
            Depoimentos
          </a>

          <a href="#contato" className="hover:text-yellow-300 transition">
            Contato
          </a>

        </nav>

        {/* Botão WhatsApp */}
        <a
          href="https://wa.me/5566992083796"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-xl font-semibold shadow-lg"
        >
          WhatsApp
        </a>

      </div>
    </header>
  );
}