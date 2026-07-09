"use client";

import { useState } from "react";

export default function Simulador() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [resultado, setResultado] = useState("");

  function simular() {
    const idadeNumero = Number(idade);

    if (!nome || !idade) {
      setResultado("Preencha todos os campos.");
      return;
    }

    if (idadeNumero >= 65) {
      setResultado(
        `${nome}, você pode ter direito à Aposentadoria por Idade. Entre em contato para uma análise completa.`
      );
    } else if (idadeNumero >= 60) {
      setResultado(
        `${nome}, você pode estar próximo de cumprir os requisitos para aposentadoria.`
      );
    } else {
      setResultado(
        `${nome}, existem outros benefícios do INSS que podem atender ao seu caso. Faça uma análise conosco.`
      );
    }
  }

  return (
    <section
      id="calculadora"
      className="py-24 bg-[#0F4C5C]"
    >
      <div className="max-w-4xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-2xl p-10">

          <div className="text-center">

            <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold">
              Simulação Gratuita
            </span>

            <h2 className="text-4xl font-bold text-[#0F4C5C] mt-6">
              Simule seu Benefício
            </h2>

            <p className="text-gray-600 mt-4">
              Faça uma simulação inicial e descubra qual benefício pode ser mais adequado ao seu perfil.
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div>
              <label className="font-semibold">
                Nome
              </label>

              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite seu nome"
                className="w-full mt-2 border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="font-semibold">
                Idade
              </label>

              <input
                type="number"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                placeholder="Digite sua idade"
                className="w-full mt-2 border rounded-xl p-4"
              />
            </div>

          </div>

          <button
            onClick={simular}
            className="w-full mt-8 bg-[#0F4C5C] hover:bg-[#0b3944] text-white py-4 rounded-xl text-lg font-bold transition"
          >
            Simular Benefício
          </button>

          {resultado && (
            <div className="mt-8 bg-green-50 border border-green-300 rounded-2xl p-6">

              <h3 className="text-xl font-bold text-green-700">
                Resultado da Simulação
              </h3>

              <p className="mt-3 text-gray-700">
                {resultado}
              </p>

              <a
                href="https://wa.me/5566992083796"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold"
              >
                Falar com um Especialista
              </a>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}