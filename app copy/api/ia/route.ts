import { NextResponse } from "next/server";
import { openai } from "@/lib/ia/openai";
import { ASSISTENTE_PREVIDENCIARIO } from "@/lib/ia/prompts";

export async function GET() {
  try {
    const resposta = await openai.responses.create({
      model: "gpt-5",
      instructions: ASSISTENTE_PREVIDENCIARIO,
      input: "Responda apenas: Conexão com a IA realizada com sucesso."
    });

    return NextResponse.json({
      sucesso: true,
      resposta: resposta.output_text,
    });

  } catch (erro: any) {
    console.error(erro);

    return NextResponse.json({
      sucesso: false,
      erro: erro.message,
    });
  }
}