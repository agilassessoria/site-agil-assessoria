"use client";

import { useState } from "react";

export default function UploadCNIS() {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [resultado, setResultado] = useState("");
  const [analise, setAnalise] = useState("");
  const [textoExtraido, setTextoExtraido] = useState("");

  function selecionarArquivo(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) {
      setArquivo(e.target.files[0]);
      setResultado("");
      setAnalise("");
      setTextoExtraido("");
    }
  }

  async function analisarCNIS() {
    if (!arquivo) return;

    try {
      setCarregando(true);
      setResultado("");
      setAnalise("");
      setTextoExtraido("");

      const formData = new FormData();
      formData.append("arquivo", arquivo);

      const resposta = await fetch("/api/analisar-cnis", {
        method: "POST",
        body: formData,
      });

      const dados = await resposta.json();

      if (dados.sucesso) {
        setResultado(
`CNIS processado com sucesso!

Nome: ${dados.nome}
Tipo: ${dados.tipo}
Tamanho: ${(dados.tamanho / 1024).toFixed(2)} KB`
        );

        setAnalise(dados.analise || "");
        setTextoExtraido(dados.texto || "");
      } else {
        setResultado(dados.erro || "Erro ao analisar o CNIS.");
      }
    } catch (error) {
      console.error(error);
      setResultado("Erro ao enviar ou analisar o CNIS.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-xl p-10">
      <input
        type="file"
        accept=".pdf"
        onChange={selecionarArquivo}
        className="mb-6"
      />

      {arquivo ? (
        <div className="bg-green-50 border border-green-300 rounded-xl p-4">
          <p className="font-semibold text-green-700">
            Arquivo selecionado
          </p>

          <p className="mt-2 text-gray-700">
            {arquivo.name}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">
          Selecione um arquivo CNIS em PDF.
        </p>
      )}

      <button
        onClick={analisarCNIS}
        className="mt-8 w-full bg-[#0F4C5C] hover:bg-[#0b3944] text-white py-4 rounded-xl font-bold disabled:bg-gray-400"
        disabled={carregando || !arquivo}
      >
        {carregando ? "Analisando CNIS com IA..." : "Analisar CNIS"}
      </button>

      {resultado && (
        <div className="mt-8 rounded-xl border border-gray-300 bg-gray-50 p-4">
          <h2 className="mb-2 font-bold text-[#0F4C5C]">
            Processamento
          </h2>

          <pre className="whitespace-pre-wrap text-sm">
            {resultado}
          </pre>
        </div>
      )}

      {analise && (
        <div className="mt-8 rounded-xl border border-gray-300 bg-white p-6">
          <h2 className="mb-4 text-xl font-bold text-[#0F4C5C]">
            Análise Inteligente do CNIS
          </h2>

          <div className="whitespace-pre-wrap text-sm leading-7 text-gray-700">
            {analise}
          </div>
        </div>
      )}

      {textoExtraido && (
        <details className="mt-8 rounded-xl border border-gray-300 bg-gray-50 p-4">
          <summary className="cursor-pointer font-bold text-[#0F4C5C]">
            Ver texto extraído do CNIS
          </summary>

          <div className="mt-4 max-h-96 overflow-y-auto rounded-lg bg-white p-4">
            <pre className="whitespace-pre-wrap break-words text-sm text-gray-700">
              {textoExtraido}
            </pre>
          </div>
        </details>
      )}
    </div>
  );
}