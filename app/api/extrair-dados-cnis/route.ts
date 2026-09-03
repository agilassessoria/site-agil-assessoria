import { NextRequest, NextResponse } from "next/server";
import { extrairTextoPDF } from "@/lib/ia/extrairTextoPDF";
import { openai } from "@/lib/ia/openai";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const arquivo = formData.get("arquivo");

    if (!(arquivo instanceof File)) {
      return NextResponse.json(
        {
          sucesso: false,
          erro: "Nenhum arquivo enviado.",
        },
        { status: 400 }
      );
    }

    if (arquivo.type !== "application/pdf") {
      return NextResponse.json(
        {
          sucesso: false,
          erro: "O arquivo enviado precisa ser um PDF.",
        },
        { status: 400 }
      );
    }

    // Converte o PDF para Buffer
    const arrayBuffer = await arquivo.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extrai o texto do CNIS
    const textoExtraido = await extrairTextoPDF(buffer);

    if (!textoExtraido.trim()) {
      return NextResponse.json(
        {
          sucesso: false,
          erro: "Não foi possível extrair o texto do CNIS.",
        },
        { status: 422 }
      );
    }

    const respostaIA = await openai.responses.create({
      model: "gpt-5",

      instructions: `
Você é um sistema especializado na leitura e organização de dados de documentos CNIS do Brasil.

Sua função é EXTRAIR e ORGANIZAR as informações existentes no documento.

Não invente informações.
Não presuma datas ausentes.
Não crie vínculos que não estejam expressamente registrados no CNIS.

IMPORTANTE:

1. Separe vínculos urbanos de períodos de segurado especial/rural.

2. Não some automaticamente períodos de segurado especial ao tempo de contribuição urbano.

3. Identifique todos os vínculos urbanos que possuam data inicial e data final.

4. Identifique separadamente os períodos classificados no CNIS como:
- Segurado Especial;
- Período de Atividade de Segurado Especial;
- atividade rural.

5. Se houver períodos concomitantes, não conte o mesmo intervalo duas vezes no tempo urbano.

6. Para o campo "anosContribuicao" e "mesesContribuicao":
calcule SOMENTE os períodos urbanos identificados com segurança.

7. Para "anosEm2019" e "mesesEm2019":
considere SOMENTE o tempo urbano existente até 13/11/2019.

8. O período posterior a 13/11/2019 não pode entrar no cálculo do tempo existente na data da Reforma.

9. Preserve todos os indicadores encontrados no CNIS.

10. O indicador ISE-CVU significa que existe período de segurado especial concomitante com período urbano. Não conte automaticamente os dois períodos como tempo adicional.

11. O indicador ASE-DEF identifica período de segurado especial com acerto deferido, mas esse período deve continuar separado do tempo urbano para análise previdenciária posterior.

12. Não considere registros de requerimentos ou benefícios indeferidos como tempo de contribuição.

13. O sexo normalmente não consta expressamente no CNIS. Não determine o sexo apenas pelo nome da pessoa. Se não estiver expressamente informado, retorne null.

14. Se uma data final de vínculo urbano não estiver claramente identificada, não invente a data. Mantenha dataFim como null e sinalize o vínculo para conferência.

Responda SOMENTE com JSON válido.
Não utilize markdown.
Não escreva explicações fora do JSON.

Use exatamente esta estrutura:

{
  "dataNascimento": "AAAA-MM-DD ou null",
  "sexo": "feminino, masculino ou null",

  "anosContribuicao": 0,
  "mesesContribuicao": 0,

  "contribuiaAntesReforma": "sim ou nao",

  "anosEm2019": 0,
  "mesesEm2019": 0,

  "vinculosUrbanos": [
    {
      "empregador": "nome do empregador",
      "dataInicio": "AAAA-MM-DD",
      "dataFim": "AAAA-MM-DD ou null",
      "indicadores": []
    }
  ],

  "periodosSeguradoEspecial": [
    {
      "descricao": "descrição encontrada no CNIS",
      "dataInicio": "AAAA-MM-DD",
      "dataFim": "AAAA-MM-DD ou null",
      "indicadores": []
    }
  ],

  "possuiSeguradoEspecial": false,

  "possuiConcomitancia": false,

  "alertas": []
}
      `,

      input: `
Analise o CNIS abaixo e extraia os dados conforme as regras estabelecidas.

CNIS:

${textoExtraido}
      `,
    });

    const textoResposta = respostaIA.output_text.trim();

    let dados;

    try {
      const textoLimpo = textoResposta
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      dados = JSON.parse(textoLimpo);
    } catch {
      console.error(
        "Resposta da IA que não pôde ser convertida em JSON:",
        textoResposta
      );

      return NextResponse.json(
        {
          sucesso: false,
          erro:
            "A IA não retornou os dados do CNIS no formato esperado.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      sucesso: true,
      dados,
    });
  } catch (erro) {
    console.error("Erro ao extrair dados do CNIS:", erro);

    return NextResponse.json(
      {
        sucesso: false,
        erro:
          erro instanceof Error
            ? erro.message
            : "Erro desconhecido ao processar o CNIS.",
      },
      { status: 500 }
    );
  }
}