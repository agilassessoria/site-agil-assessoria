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
          erro: "Não foi possível extrair o texto deste PDF.",
        },
        { status: 422 }
      );
    }

    const respostaIA = await openai.responses.create({
      model: "gpt-5",

      instructions: `
Você é um sistema especializado na leitura e estruturação de dados
de documentos CNIS do INSS brasileiro.

Sua função é extrair informações previdenciárias do CNIS para uma
calculadora previdenciária.

==================================================
REGRA FUNDAMENTAL
==================================================

Use exclusivamente as informações existentes no documento.

NÃO invente:

- vínculos;
- períodos;
- datas;
- empregadores;
- atividade rural;
- tempo de contribuição;
- sexo;
- indicadores.

Se uma informação não puder ser determinada com segurança,
retorne null ou não crie o período correspondente.

==================================================
1. DADOS PESSOAIS
==================================================

Extraia:

- data de nascimento;
- sexo, somente se estiver expressamente informado.

Não deduza o sexo apenas pelo nome da pessoa.

==================================================
2. VÍNCULOS URBANOS
==================================================

Identifique TODOS os vínculos empregatícios e períodos contributivos
urbanos presentes no CNIS.

Para cada vínculo, retorne:

{
  "empregador": "",
  "dataInicio": "AAAA-MM-DD",
  "dataFim": "AAAA-MM-DD ou null",
  "indicadores": []
}

REGRAS:

- preserve todos os indicadores encontrados;
- não crie vínculo sem data inicial identificável;
- se o vínculo estiver ativo e não possuir data final, use null;
- não considere benefícios como vínculos;
- não considere requerimentos indeferidos como vínculos;
- não considere um simples indicador como um novo vínculo;
- não exclua vínculos apenas porque possuem indicadores.

==================================================
3. SEGURADO ESPECIAL E ATIVIDADE RURAL
==================================================

Faça uma busca específica e cuidadosa no documento por registros
relacionados a:

- SEGURADO ESPECIAL;
- SEGURADO ESPECIAL RURAL;
- ATIVIDADE RURAL;
- TRABALHADOR RURAL;
- AGRICULTOR;
- PRODUTOR RURAL;
- PESCADOR ARTESANAL;
- EXTRATIVISTA;
- regime de economia familiar;
- períodos reconhecidos como segurado especial.

Também procure cuidadosamente indicadores relacionados a esses registros,
inclusive:

- ISE-CVU;
- ASE-DEF;
- ASE;
- indicadores contendo as expressões "SEGURADO ESPECIAL";
- outros indicadores vinculados diretamente a períodos rurais.

IMPORTANTE:

Um registro de segurado especial pode aparecer em uma parte diferente
do CNIS e não necessariamente junto dos vínculos empregatícios.

Analise todo o documento.

Para cada período de segurado especial ou atividade rural que possuir
data inicial e data final identificáveis, retorne:

{
  "descricao": "",
  "dataInicio": "AAAA-MM-DD",
  "dataFim": "AAAA-MM-DD ou null",
  "indicadores": []
}

==================================================
4. COMO TRATAR INDICADORES RURAIS
==================================================

Um indicador isolado NÃO deve gerar automaticamente um período rural.

Porém, se o documento apresentar:

- uma linha de segurado especial;
- uma sequência de datas;
- e indicadores associados ao mesmo registro;

associe corretamente essas informações ao período.

Exemplo conceitual:

SEGURADO ESPECIAL
01/01/2005
31/12/2010
ISE-CVU
ASE-DEF

Nesse caso, o período deve ser estruturado com as datas encontradas
e os indicadores devem ser preservados.

Se existir referência a segurado especial, mas não houver datas
suficientes para determinar o período, NÃO invente datas.

Nesse caso:

- não crie o período;
- inclua um alerta informando que existe referência a segurado especial,
  mas que as datas precisam ser conferidas.

==================================================
5. INDICADOR ISE-CVU
==================================================

Quando encontrar ISE-CVU:

- preserve o indicador no período correspondente;
- verifique se existe vínculo urbano concomitante;
- se houver sobreposição aparente, retorne:

"possuiConcomitancia": true

Não exclua automaticamente o período rural por causa da concomitância.

A aplicação fará o tratamento matemático posteriormente.

==================================================
6. INDICADOR ASE-DEF
==================================================

Quando encontrar ASE-DEF:

- preserve o indicador;
- associe ao período de segurado especial correspondente, quando possível;
- inclua alerta para conferência documental se o indicador puder afetar
  o reconhecimento administrativo do período.

==================================================
7. CONCOMITÂNCIA
==================================================

Verifique as datas dos vínculos urbanos e dos períodos rurais.

Se houver qualquer sobreposição entre um período urbano e um período
de segurado especial, retorne:

"possuiConcomitancia": true

Caso contrário:

"possuiConcomitancia": false

Não some períodos concomitantes.

A calculadora fará uma nova conferência matemática.

==================================================
8. TEMPO DE CONTRIBUIÇÃO
==================================================

Calcule o tempo urbano atual apenas como informação auxiliar.

Não inclua automaticamente período rural no tempo urbano.

Calcule também o tempo urbano existente até 13/11/2019.

Evite contar períodos urbanos concomitantes duas vezes.

A aplicação fará posteriormente uma nova conferência pelas datas
dos vínculos estruturados.

==================================================
9. ALERTAS
==================================================

Inclua no campo "alertas" situações como:

- segurado especial identificado sem datas completas;
- indicador rural sem período claramente delimitado;
- vínculo sem data final;
- vínculo com datas duvidosas;
- possível concomitância;
- ASE-DEF;
- ISE-CVU;
- período que dependa de comprovação documental;
- informação ilegível ou incompleta.

Os alertas devem ser objetivos.

==================================================
10. FORMATO DA RESPOSTA
==================================================

Responda SOMENTE com um objeto JSON válido.

Não utilize markdown.

Não utilize blocos de código.

Não escreva explicações antes ou depois do JSON.

Utilize exatamente esta estrutura:

{
  "dataNascimento": null,
  "sexo": null,

  "anosContribuicao": 0,
  "mesesContribuicao": 0,

  "contribuiaAntesReforma": "nao",

  "anosEm2019": 0,
  "mesesEm2019": 0,

  "vinculosUrbanos": [
    {
      "empregador": "",
      "dataInicio": "AAAA-MM-DD",
      "dataFim": null,
      "indicadores": []
    }
  ],

  "periodosSeguradoEspecial": [
    {
      "descricao": "",
      "dataInicio": "AAAA-MM-DD",
      "dataFim": "AAAA-MM-DD",
      "indicadores": []
    }
  ],

  "possuiSeguradoEspecial": false,

  "possuiConcomitancia": false,

  "alertas": []
}

==================================================
11. VERIFICAÇÃO FINAL OBRIGATÓRIA
==================================================

Antes de responder, faça uma segunda conferência mental de todo o CNIS.

Pergunte internamente:

1. Existe alguma linha mencionando SEGURADO ESPECIAL?

2. Existe algum registro de atividade rural?

3. Existe ISE-CVU?

4. Existe ASE-DEF?

5. Existem datas próximas desses registros?

6. Essas datas pertencem claramente ao mesmo período?

7. Existe sobreposição com algum vínculo urbano?

Somente depois dessa conferência produza o JSON final.

Nunca invente datas para completar um período.
      `,

      input: `
Analise integralmente o CNIS abaixo.

Além dos vínculos urbanos, faça uma busca específica por períodos
de segurado especial e atividade rural.

Verifique especialmente registros e indicadores como:

SEGURADO ESPECIAL
ISE-CVU
ASE-DEF
ASE

Se houver período rural com datas claramente identificadas,
estruture-o em "periodosSeguradoEspecial".

Se houver apenas referência ou indicador sem datas suficientes,
registre a situação em "alertas" e não invente o período.

CONTEÚDO EXTRAÍDO DO CNIS:

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

    // Garante os arrays utilizados pela calculadora
    dados.vinculosUrbanos = Array.isArray(
      dados.vinculosUrbanos
    )
      ? dados.vinculosUrbanos
      : [];

    dados.periodosSeguradoEspecial = Array.isArray(
      dados.periodosSeguradoEspecial
    )
      ? dados.periodosSeguradoEspecial
      : [];

    dados.alertas = Array.isArray(dados.alertas)
      ? dados.alertas
      : [];

    // Define automaticamente se existe segurado especial
    dados.possuiSeguradoEspecial =
      dados.periodosSeguradoEspecial.length > 0 ||
      Boolean(dados.possuiSeguradoEspecial);

    // Verifica indicadores rurais encontrados nos períodos
    const possuiIndicadorRural =
      dados.periodosSeguradoEspecial.some(
        (periodo: {
          indicadores?: string[];
        }) =>
          Array.isArray(periodo.indicadores) &&
          periodo.indicadores.some((indicador) =>
            ["ISE-CVU", "ASE-DEF", "ASE"].some(
              (codigo) =>
                indicador
                  .toUpperCase()
                  .includes(codigo)
            )
          )
      );

    if (possuiIndicadorRural) {
      dados.possuiSeguradoEspecial = true;
    }

    dados.possuiConcomitancia = Boolean(
      dados.possuiConcomitancia
    );

    return NextResponse.json({
      sucesso: true,

      nome: arquivo.name,
      tamanho: arquivo.size,
      tipo: arquivo.type,

      dados,
    });
  } catch (erro) {
    console.error(
      "Erro ao processar o CNIS:",
      erro
    );

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