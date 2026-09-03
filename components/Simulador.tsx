"use client";

import { useState } from "react";
import {
  User,
  CalendarDays,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

export default function Simulador() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [resultado, setResultado] = useState("");
  const [erro, setErro] = useState("");

  function simular() {
    setErro("");
    setResultado("");

    const idadeNumero = Number(idade);

    if (!nome.trim() || !idade.trim()) {
      setErro("Preencha seu nome e sua idade para realizar a simulação.");
      return;
    }

    if (
      !Number.isFinite(idadeNumero) ||
      idadeNumero < 16 ||
      idadeNumero > 120
    ) {
      setErro("Informe uma idade válida.");
      return;
    }

    if (idadeNumero >= 65) {
      setResultado(
        `${nome.trim()}, pela sua idade, vale a pena realizar uma análise previdenciária completa para verificar as possibilidades de benefício, considerando também seu histórico de contribuições e demais requisitos.`
      );
    } else if (idadeNumero >= 60) {
      setResultado(
        `${nome.trim()}, sua idade pode justificar uma análise previdenciária mais detalhada. Para saber quais possibilidades se aplicam ao seu caso, é necessário verificar também seu tempo de contribuição, histórico no INSS e demais requisitos.`
      );
    } else {
      setResultado(
        `${nome.trim()}, mesmo que você ainda não esteja na idade para aposentadoria por idade, pode haver outras possibilidades previdenciárias conforme sua situação. Uma análise individual pode ajudar a identificar o benefício mais adequado.`
      );
    }
  }

  return (
    <section
      id="simulador"
      className="py-20 sm:py-24 bg-[#0F4C5C]"
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-6">

        {/* Card principal */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-12">

          {/* Cabeçalho */}
          <div className="text-center">

            <span className="inline-block bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full font-bold text-sm">
              SIMULAÇÃO INICIAL
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F4C5C] mt-5">
              Descubra quais possibilidades podem existir para você
            </h2>

            <p className="text-gray-600 mt-5 text-base sm:text-lg leading-7 max-w-2xl mx-auto">
              Informe alguns dados para receber uma orientação inicial.
              A análise completa depende do seu histórico previdenciário e
              da documentação do seu caso.
            </p>

          </div>

          {/* Formulário */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">

            {/* Nome */}
            <div>
              <label
                htmlFor="nome"
                className="flex items-center gap-2 font-bold text-gray-700"
              >
                <User size={19} className="text-[#0F4C5C]" />
                Seu nome
              </label>

              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite seu nome"
                className="w-full mt-2 border border-gray-300 rounded-xl p-4 text-base outline-none focus:ring-2 focus:ring-[#0F4C5C] focus:border-[#0F4C5C] transition"
              />
            </div>

            {/* Idade */}
            <div>
              <label
                htmlFor="idade"
                className="flex items-center gap-2 font-bold text-gray-700"
              >
                <CalendarDays size={19} className="text-[#0F4C5C]" />
                Sua idade
              </label>

              <input
                id="idade"
                type="number"
                min="16"
                max="120"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                placeholder="Ex.: 55"
                className="w-full mt-2 border border-gray-300 rounded-xl p-4 text-base outline-none focus:ring-2 focus:ring-[#0F4C5C] focus:border-[#0F4C5C] transition"
              />
            </div>

          </div>

          {/* Erro */}
          {erro && (
            <div
              className="mt-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4"
              role="alert"
            >
              {erro}
            </div>
          )}

          {/* Botão */}
          <button
            type="button"
            onClick={simular}
            className="w-full mt-8 bg-[#0F4C5C] hover:bg-[#0b3944] text-white py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-[1.01] shadow-lg flex items-center justify-center gap-2"
          >
            Fazer Simulação
            <ArrowRight size={20} />
          </button>

          {/* Resultado */}
          {resultado && (
            <div
              className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-6"
              aria-live="polite"
            >

              <h3 className="text-xl font-bold text-green-700">
                Resultado da simulação
              </h3>

              <p className="mt-3 text-gray-700 leading-7">
                {resultado}
              </p>

              <p className="mt-4 text-sm text-gray-500">
                Esta simulação é apenas informativa e não substitui uma
                análise previdenciária individual.
              </p>

              <a
                href="https://wa.me/5566992083796"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 mt-6 bg-green-600 hover:bg-green-700 text-white px-7 py-3.5 rounded-xl font-bold transition-all duration-300 hover:scale-105"
              >
                <MessageCircle size={19} />
                Falar com um Especialista
              </a>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}