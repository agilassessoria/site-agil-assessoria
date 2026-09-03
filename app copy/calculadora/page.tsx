"use client";

import { useState } from "react";

type Previsao = {
  regra: string;
  mesesFaltantes: number;
  data: Date;
};

type VinculoUrbano = {
  empregador: string;
  dataInicio: string;
  dataFim: string | null;
  indicadores: string[];
};

type PeriodoSeguradoEspecial = {
  descricao: string;
  dataInicio: string;
  dataFim: string | null;
  indicadores: string[];
};

type DadosDetalhadosCNIS = {
  vinculosUrbanos: VinculoUrbano[];
  periodosSeguradoEspecial: PeriodoSeguradoEspecial[];
  possuiSeguradoEspecial: boolean;
  possuiConcomitancia: boolean;
  alertas: string[];
};

export default function CalculadoraPrevidenciaria() {
  const [dataNascimento, setDataNascimento] = useState("");
  const [sexo, setSexo] = useState("");
  const [anosContribuicao, setAnosContribuicao] = useState("");
  const [mesesContribuicao, setMesesContribuicao] = useState("");
  const [contribuiaAntesReforma, setContribuiaAntesReforma] = useState("");
  const [anosEm2019, setAnosEm2019] = useState("");
  const [mesesEm2019, setMesesEm2019] = useState("");
  const [resultado, setResultado] = useState("");

  const [arquivoCNIS, setArquivoCNIS] = useState<File | null>(null);
  const [importandoCNIS, setImportandoCNIS] = useState(false);
  const [mensagemCNIS, setMensagemCNIS] = useState("");
  const [dadosDetalhadosCNIS, setDadosDetalhadosCNIS] = useState<DadosDetalhadosCNIS | null>(null);

  function calcularIdadeEmMeses(
    data: string,
    dataReferencia = new Date()
  ) {
    const nascimento = new Date(`${data}T00:00:00`);

    let meses =
      (dataReferencia.getFullYear() - nascimento.getFullYear()) * 12 +
      (dataReferencia.getMonth() - nascimento.getMonth());

    if (dataReferencia.getDate() < nascimento.getDate()) {
      meses--;
    }

    return meses;
  }

  function formatarMeses(totalMeses: number) {
    const total = Math.max(0, Math.ceil(totalMeses));
    const anos = Math.floor(total / 12);
    const meses = total % 12;

    return `${anos} ano(s) e ${meses} mês(es)`;
  }

  function formatarData(data: Date) {
    return data.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });
  }

  function adicionarMeses(data: Date, meses: number) {
    const novaData = new Date(data);
    novaData.setMonth(novaData.getMonth() + meses);
    return novaData;
  }

  function pontosExigidos(ano: number) {
    if (sexo === "feminino") {
      return Math.min(100, 86 + (ano - 2019));
    }

    return Math.min(105, 96 + (ano - 2019));
  }

  function idadeProgressivaExigidaMeses(ano: number) {
    if (sexo === "feminino") {
      return Math.min(62 * 12, 56 * 12 + (ano - 2019) * 6);
    }

    return Math.min(65 * 12, 61 * 12 + (ano - 2019) * 6);
  }

  async function importarCNIS() {
    if (!arquivoCNIS) {
      setMensagemCNIS("Selecione um arquivo CNIS em PDF.");
      return;
    }

    try {
      setImportandoCNIS(true);
      setMensagemCNIS("Lendo e analisando o CNIS...");
      setResultado("");
      setDadosDetalhadosCNIS(null);

      const formData = new FormData();
      formData.append("arquivo", arquivoCNIS);

      const resposta = await fetch("/api/extrair-dados-cnis", {
        method: "POST",
        body: formData,
      });

      const retorno = await resposta.json();

      if (!retorno.sucesso) {
        setMensagemCNIS(
          retorno.erro ||
            "Não foi possível importar os dados do CNIS."
        );
        return;
      }

      const dados = retorno.dados;

      const detalhesCNIS: DadosDetalhadosCNIS = {
        vinculosUrbanos: Array.isArray(dados.vinculosUrbanos)
          ? dados.vinculosUrbanos
          : [],
        periodosSeguradoEspecial: Array.isArray(
          dados.periodosSeguradoEspecial
        )
          ? dados.periodosSeguradoEspecial
          : [],
        possuiSeguradoEspecial: Boolean(
          dados.possuiSeguradoEspecial
        ),
        possuiConcomitancia: Boolean(
          dados.possuiConcomitancia
        ),
        alertas: Array.isArray(dados.alertas)
          ? dados.alertas
          : [],
      };

      setDadosDetalhadosCNIS(detalhesCNIS);

      if (dados.dataNascimento) {
        setDataNascimento(dados.dataNascimento);
      }

      if (
        dados.sexo === "feminino" ||
        dados.sexo === "masculino"
      ) {
        setSexo(dados.sexo);
      }

      if (
        dados.anosContribuicao !== null &&
        dados.anosContribuicao !== undefined
      ) {
        setAnosContribuicao(
          String(dados.anosContribuicao)
        );
      }

      if (
        dados.mesesContribuicao !== null &&
        dados.mesesContribuicao !== undefined
      ) {
        setMesesContribuicao(
          String(dados.mesesContribuicao)
        );
      }

      if (
        dados.contribuiaAntesReforma === "sim" ||
        dados.contribuiaAntesReforma === "nao"
      ) {
        setContribuiaAntesReforma(
          dados.contribuiaAntesReforma
        );
      }

      if (dados.contribuiaAntesReforma === "sim") {
        if (
          dados.anosEm2019 !== null &&
          dados.anosEm2019 !== undefined
        ) {
          setAnosEm2019(String(dados.anosEm2019));
        }

        if (
          dados.mesesEm2019 !== null &&
          dados.mesesEm2019 !== undefined
        ) {
          setMesesEm2019(String(dados.mesesEm2019));
        }
      } else {
        setAnosEm2019("");
        setMesesEm2019("");
      }

      const hoje = new Date();
      const limite2019 = new Date(2019, 10, 13);

      function calcularMesesUrbanosImportados(
        limite?: Date
      ) {
        const intervalos = detalhesCNIS.vinculosUrbanos
          .map((vinculo) => {
            const inicio = converterDataCNIS(
              vinculo.dataInicio
            );
            let fim =
              converterDataCNIS(vinculo.dataFim) ||
              hoje;

            if (!inicio) return null;

            if (limite) {
              if (inicio > limite) return null;
              if (fim > limite) fim = limite;
            }

            if (fim < inicio) return null;

            return { inicio, fim };
          })
          .filter(
            (intervalo): intervalo is IntervaloCNIS =>
              intervalo !== null
          );

        return contarMesesDosIntervalos(
          unirIntervalosCNIS(intervalos)
        );
      }

      const mesesUrbanosAtuais =
        calcularMesesUrbanosImportados();

      if (
        detalhesCNIS.vinculosUrbanos.length > 0 &&
        mesesUrbanosAtuais > 0
      ) {
        setAnosContribuicao(
          String(Math.floor(mesesUrbanosAtuais / 12))
        );
        setMesesContribuicao(
          String(mesesUrbanosAtuais % 12)
        );

        const mesesUrbanos2019 =
          calcularMesesUrbanosImportados(limite2019);

        if (mesesUrbanos2019 > 0) {
          setContribuiaAntesReforma("sim");
          setAnosEm2019(
            String(Math.floor(mesesUrbanos2019 / 12))
          );
          setMesesEm2019(
            String(mesesUrbanos2019 % 12)
          );
        }
      }

      setMensagemCNIS(
        "Dados importados do CNIS com sucesso. O tempo urbano foi recalculado pelas datas dos vínculos, sem duplicar períodos sobrepostos. Confira os campos antes de realizar o cálculo."
      );
    } catch (erro) {
      console.error(erro);

      setMensagemCNIS(
        "Erro ao importar os dados do CNIS."
      );
    } finally {
      setImportandoCNIS(false);
    }
  }

  function converterDataCNIS(data: string | null) {
    if (!data) return null;
    if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
      const [ano, mes, dia] = data.split("-").map(Number);
      return new Date(ano, mes - 1, dia);
    }
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
      const [dia, mes, ano] = data.split("/").map(Number);
      return new Date(ano, mes - 1, dia);
    }
    return null;
  }

  type IntervaloCNIS = {
    inicio: Date;
    fim: Date;
  };

  function unirIntervalosCNIS(intervalos: IntervaloCNIS[]) {
    if (intervalos.length === 0) return [];

    const ordenados = [...intervalos].sort(
      (a, b) => a.inicio.getTime() - b.inicio.getTime()
    );

    const unidos: IntervaloCNIS[] = [];

    for (const atual of ordenados) {
      const ultimo = unidos[unidos.length - 1];

      if (!ultimo) {
        unidos.push({
          inicio: new Date(atual.inicio),
          fim: new Date(atual.fim),
        });
        continue;
      }

      const diaSeguinteAoFim =
        ultimo.fim.getTime() + 24 * 60 * 60 * 1000;

      if (atual.inicio.getTime() <= diaSeguinteAoFim) {
        if (atual.fim > ultimo.fim) {
          ultimo.fim = new Date(atual.fim);
        }
      } else {
        unidos.push({
          inicio: new Date(atual.inicio),
          fim: new Date(atual.fim),
        });
      }
    }

    return unidos;
  }

  function contarMesesDosIntervalos(intervalos: IntervaloCNIS[]) {
    const dias = intervalos.reduce((total, intervalo) => {
      return (
        total +
        Math.floor(
          (intervalo.fim.getTime() - intervalo.inicio.getTime()) /
            (24 * 60 * 60 * 1000)
        ) +
        1
      );
    }, 0);

    return Math.max(0, Math.floor(dias / 30.436875));
  }

  function calcularTempoUrbanoDoCNIS(dataLimite?: Date) {
    if (!dadosDetalhadosCNIS) {
      return {
        meses: 0,
        vinculosValidos: 0,
        vinculosIgnorados: 0,
        intervalosUnidos: [] as IntervaloCNIS[],
      };
    }

    const hoje = new Date();
    let vinculosIgnorados = 0;

    const intervalos = dadosDetalhadosCNIS.vinculosUrbanos
      .map((vinculo) => {
        const inicio = converterDataCNIS(vinculo.dataInicio);
        let fim = converterDataCNIS(vinculo.dataFim) || hoje;

        if (!inicio) {
          vinculosIgnorados++;
          return null;
        }

        if (dataLimite) {
          if (inicio > dataLimite) return null;
          if (fim > dataLimite) fim = dataLimite;
        }

        if (fim < inicio) {
          vinculosIgnorados++;
          return null;
        }

        return { inicio, fim };
      })
      .filter(
        (intervalo): intervalo is IntervaloCNIS =>
          intervalo !== null
      );

    const intervalosUnidos = unirIntervalosCNIS(intervalos);

    return {
      meses: contarMesesDosIntervalos(intervalosUnidos),
      vinculosValidos: intervalos.length,
      vinculosIgnorados,
      intervalosUnidos,
    };
  }

  function calcularTempoRuralNaoConcomitante() {
    if (!dadosDetalhadosCNIS) {
      return {
        mesesRuraisBrutos: 0,
        mesesRuraisConsiderados: 0,
        mesesConcomitantes: 0,
      };
    }

    const urbanosUnidos =
      calcularTempoUrbanoDoCNIS().intervalosUnidos;

    const rurais = dadosDetalhadosCNIS.periodosSeguradoEspecial
      .map((periodo) => {
        const inicio = converterDataCNIS(periodo.dataInicio);
        const fim = converterDataCNIS(periodo.dataFim);

        if (!inicio || !fim || fim < inicio) return null;

        return { inicio, fim };
      })
      .filter(
        (intervalo): intervalo is IntervaloCNIS =>
          intervalo !== null
      );

    const ruraisUnidos = unirIntervalosCNIS(rurais);
    const mesesRuraisBrutos =
      contarMesesDosIntervalos(ruraisUnidos);

    let diasConcomitantes = 0;

    for (const rural of ruraisUnidos) {
      for (const urbano of urbanosUnidos) {
        const inicio =
          rural.inicio > urbano.inicio
            ? rural.inicio
            : urbano.inicio;

        const fim =
          rural.fim < urbano.fim
            ? rural.fim
            : urbano.fim;

        if (inicio <= fim) {
          diasConcomitantes +=
            Math.floor(
              (fim.getTime() - inicio.getTime()) /
                (24 * 60 * 60 * 1000)
            ) + 1;
        }
      }
    }

    const mesesConcomitantes = Math.floor(
      diasConcomitantes / 30.436875
    );

    return {
      mesesRuraisBrutos,
      mesesRuraisConsiderados: Math.max(
        0,
        mesesRuraisBrutos - mesesConcomitantes
      ),
      mesesConcomitantes,
    };
  }

  function formatarDataCNIS(data: Date) {
    return data.toLocaleDateString("pt-BR");
  }

  function calcularDuracaoIntervalo(inicio: Date, fim: Date) {
    const dias =
      Math.floor(
        (fim.getTime() - inicio.getTime()) /
          (24 * 60 * 60 * 1000)
      ) + 1;

    return Math.max(
      0,
      Math.floor(dias / 30.436875)
    );
  }

  function calcularTempoCalendarioExato(inicio: Date, fim: Date) {
    if (fim < inicio) {
      return {
        anos: 0,
        meses: 0,
        dias: 0,
      };
    }

    const inicioNormalizado = new Date(
      inicio.getFullYear(),
      inicio.getMonth(),
      inicio.getDate()
    );

    // Soma um dia para considerar o último dia do vínculo no período.
    const fimExclusivo = new Date(
      fim.getFullYear(),
      fim.getMonth(),
      fim.getDate() + 1
    );

    let anos =
      fimExclusivo.getFullYear() -
      inicioNormalizado.getFullYear();

    let cursor = new Date(
      inicioNormalizado.getFullYear() + anos,
      inicioNormalizado.getMonth(),
      inicioNormalizado.getDate()
    );

    if (cursor > fimExclusivo) {
      anos--;
      cursor = new Date(
        inicioNormalizado.getFullYear() + anos,
        inicioNormalizado.getMonth(),
        inicioNormalizado.getDate()
      );
    }

    let meses = 0;

    while (meses < 11) {
      const proximo = new Date(
        cursor.getFullYear(),
        cursor.getMonth() + 1,
        cursor.getDate()
      );

      if (proximo > fimExclusivo) {
        break;
      }

      cursor = proximo;
      meses++;
    }

    const dias = Math.max(
      0,
      Math.floor(
        (fimExclusivo.getTime() - cursor.getTime()) /
          (24 * 60 * 60 * 1000)
      )
    );

    return {
      anos,
      meses,
      dias,
    };
  }

  function formatarTempoCalendarioExato(
    inicio: Date,
    fim: Date
  ) {
    const tempo = calcularTempoCalendarioExato(
      inicio,
      fim
    );

    return `${tempo.anos} ano(s), ${tempo.meses} mês(es) e ${tempo.dias} dia(s)`;
  }


  function gerarMemoriaTempoReforma() {
    if (!dadosDetalhadosCNIS) return "";

    const dataReforma = new Date(2019, 10, 13);

    const vinculosAteReforma = dadosDetalhadosCNIS.vinculosUrbanos
      .map((vinculo) => {
        const inicio = converterDataCNIS(vinculo.dataInicio);
        let fim = converterDataCNIS(vinculo.dataFim) || dataReforma;

        if (!inicio || inicio > dataReforma) return null;
        if (fim > dataReforma) fim = dataReforma;
        if (fim < inicio) return null;

        return {
          empregador: vinculo.empregador || "Empregador não identificado",
          inicio,
          fim,
          indicadores: vinculo.indicadores || [],
        };
      })
      .filter(
        (
          vinculo
        ): vinculo is {
          empregador: string;
          inicio: Date;
          fim: Date;
          indicadores: string[];
        } => vinculo !== null
      );

    const intervalosUnidos = unirIntervalosCNIS(
      vinculosAteReforma.map((vinculo) => ({
        inicio: vinculo.inicio,
        fim: vinculo.fim,
      }))
    );

    const mesesCalculados =
      contarMesesDosIntervalos(intervalosUnidos);

    const linhas: string[] = [];

    linhas.push("📅 MEMÓRIA DO TEMPO EM 13/11/2019");
    linhas.push("\nVÍNCULOS CONSIDERADOS ATÉ A REFORMA");

    if (vinculosAteReforma.length === 0) {
      linhas.push(
        "Nenhum vínculo urbano anterior a 13/11/2019 foi encontrado."
      );
      return linhas.join("\n");
    }

    vinculosAteReforma.forEach((vinculo, index) => {
      linhas.push(
        `\n${index + 1}. ${vinculo.empregador}` +
          `\nPeríodo considerado: ${formatarDataCNIS(
            vinculo.inicio
          )} a ${formatarDataCNIS(vinculo.fim)}` +
          `\nDuração pelo calendário: ${formatarTempoCalendarioExato(
            vinculo.inicio,
            vinculo.fim
          )}.` +
          (vinculo.indicadores.length > 0
            ? `\nIndicadores: ${vinculo.indicadores.join(", ")}.`
            : "")
      );
    });

    linhas.push("\nPERÍODOS APÓS RETIRAR SOBREPOSIÇÕES");

    intervalosUnidos.forEach((intervalo, index) => {
      linhas.push(
        `${index + 1}. ${formatarDataCNIS(
          intervalo.inicio
        )} a ${formatarDataCNIS(
          intervalo.fim
        )} — ${formatarTempoCalendarioExato(
          intervalo.inicio,
          intervalo.fim
        )}.`
      );
    });

    linhas.push(
      `\nTOTAL CALCULADO EM 13/11/2019: ${formatarMeses(
        mesesCalculados
      )}.`
    );

    const tempoInformado =
      Number(anosEm2019 || 0) * 12 +
      Number(mesesEm2019 || 0);

    if (tempoInformado !== mesesCalculados) {
      linhas.push("\n⚠️ DIVERGÊNCIA ENCONTRADA");
      linhas.push(
        `Tempo preenchido nos campos da calculadora: ${formatarMeses(
          tempoInformado
        )}.`
      );
      linhas.push(
        `Tempo recalculado pelas datas dos vínculos: ${formatarMeses(
          mesesCalculados
        )}.`
      );
      linhas.push(
        "Confira os vínculos e indicadores antes de utilizar este tempo nas regras de pedágio."
      );
    } else {
      linhas.push(
        "\n✅ O tempo preenchido nos campos corresponde ao tempo recalculado pelos vínculos estruturados."
      );
    }

    linhas.push(
      "\nOBSERVAÇÃO: este cálculo considera somente os vínculos urbanos estruturados no CNIS até 13/11/2019 e elimina períodos sobrepostos. Indicadores, contribuições abaixo do mínimo, vínculos de RPPS e outras situações podem alterar o tempo efetivamente reconhecido pelo INSS."
    );

    return linhas.join("\n");
  }

  function gerarMemoriaDetalhadaCNIS() {
    if (!dadosDetalhadosCNIS) return "";

    const hoje = new Date();

    const vinculosDetalhados =
      dadosDetalhadosCNIS.vinculosUrbanos
        .map((vinculo) => {
          const inicio = converterDataCNIS(
            vinculo.dataInicio
          );
          const fim =
            converterDataCNIS(vinculo.dataFim) ||
            hoje;

          if (!inicio || fim < inicio) return null;

          return {
            nome:
              vinculo.empregador ||
              "Empregador não identificado",
            inicio,
            fim,
            meses: calcularDuracaoIntervalo(
              inicio,
              fim
            ),
            indicadores:
              vinculo.indicadores || [],
          };
        })
        .filter(
          (
            item
          ): item is {
            nome: string;
            inicio: Date;
            fim: Date;
            meses: number;
            indicadores: string[];
          } => item !== null
        );

    const ruraisDetalhados =
      dadosDetalhadosCNIS.periodosSeguradoEspecial
        .map((periodo) => {
          const inicio = converterDataCNIS(
            periodo.dataInicio
          );
          const fim = converterDataCNIS(
            periodo.dataFim
          );

          if (!inicio || !fim || fim < inicio)
            return null;

          return {
            descricao:
              periodo.descricao ||
              "Período de segurado especial",
            inicio,
            fim,
            meses: calcularDuracaoIntervalo(
              inicio,
              fim
            ),
            indicadores:
              periodo.indicadores || [],
          };
        })
        .filter(
          (
            item
          ): item is {
            descricao: string;
            inicio: Date;
            fim: Date;
            meses: number;
            indicadores: string[];
          } => item !== null
        );

    const tempoUrbano =
      calcularTempoUrbanoDoCNIS();

    const tempoRural =
      calcularTempoRuralNaoConcomitante();

    const linhas: string[] = [];

    linhas.push(
      "📑 MEMÓRIA DETALHADA DO CÁLCULO PREVIDENCIÁRIO"
    );

    linhas.push(
      "\nVÍNCULOS URBANOS INDIVIDUAIS"
    );

    if (vinculosDetalhados.length === 0) {
      linhas.push(
        "Nenhum vínculo urbano com datas válidas foi encontrado."
      );
    } else {
      vinculosDetalhados.forEach(
        (vinculo, index) => {
          linhas.push(
            `\n${index + 1}. ${vinculo.nome}` +
              `\nPeríodo: ${formatarDataCNIS(
                vinculo.inicio
              )} a ${formatarDataCNIS(
                vinculo.fim
              )}` +
              `\nDuração pelo calendário: ${formatarTempoCalendarioExato(
                vinculo.inicio,
                vinculo.fim
              )}.` +
              (vinculo.indicadores.length > 0
                ? `\nIndicadores: ${vinculo.indicadores.join(
                    ", "
                  )}.`
                : "")
          );
        }
      );
    }

    linhas.push(
      "\nPERÍODOS URBANOS APÓS RETIRAR SOBREPOSIÇÕES"
    );

    if (
      tempoUrbano.intervalosUnidos.length === 0
    ) {
      linhas.push(
        "Nenhum intervalo urbano válido para cálculo."
      );
    } else {
      tempoUrbano.intervalosUnidos.forEach(
        (intervalo, index) => {
          linhas.push(
            `${index + 1}. ${formatarDataCNIS(
              intervalo.inicio
            )} a ${formatarDataCNIS(
              intervalo.fim
            )} — ${formatarMeses(
              calcularDuracaoIntervalo(
                intervalo.inicio,
                intervalo.fim
              )
            )}.`
          );
        }
      );
    }

    linhas.push(
      `\nTOTAL URBANO SEM DUPLICIDADE: ${formatarMeses(
        tempoUrbano.meses
      )}.`
    );

    linhas.push(
      "\nPERÍODOS DE SEGURADO ESPECIAL / RURAL"
    );

    if (ruraisDetalhados.length === 0) {
      linhas.push(
        "Nenhum período rural com datas completas foi utilizado."
      );
    } else {
      ruraisDetalhados.forEach(
        (periodo, index) => {
          linhas.push(
            `\n${index + 1}. ${periodo.descricao}` +
              `\nPeríodo: ${formatarDataCNIS(
                periodo.inicio
              )} a ${formatarDataCNIS(
                periodo.fim
              )}` +
              `\nDuração pelo calendário: ${formatarTempoCalendarioExato(
                periodo.inicio,
                periodo.fim
              )}.` +
              (periodo.indicadores.length > 0
                ? `\nIndicadores: ${periodo.indicadores.join(
                    ", "
                  )}.`
                : "")
          );
        }
      );
    }

    if (ruraisDetalhados.length > 0) {
      linhas.push(
        `\nTOTAL RURAL BRUTO: ${formatarMeses(
          tempoRural.mesesRuraisBrutos
        )}.`
      );

      linhas.push(
        `CONCOMITÂNCIA URBANO/RURAL RETIRADA: ${formatarMeses(
          tempoRural.mesesConcomitantes
        )}.`
      );

      linhas.push(
        `TOTAL RURAL CONSIDERADO SEM DUPLICIDADE: ${formatarMeses(
          tempoRural.mesesRuraisConsiderados
        )}.`
      );

      linhas.push(
        `TOTAL COMBINADO ESTIMADO PARA ANÁLISE HÍBRIDA: ${formatarMeses(
          tempoUrbano.meses +
            tempoRural.mesesRuraisConsiderados
        )}.`
      );
    }

    linhas.push(
      "\nOBSERVAÇÃO: cada período individual é exibido em anos, meses e dias pelo calendário para facilitar a conferência. Os totais usados nas projeções da calculadora continuam convertidos em meses equivalentes após a retirada de sobreposições, pois as regras futuras desta versão ainda são simuladas mês a mês. A carência, o reconhecimento do período rural, indicadores e competências devem ser conferidos antes da conclusão previdenciária."
    );

    return linhas.join("\n");
  }

  function calcular() {
    if (
      !dataNascimento ||
      !sexo ||
      anosContribuicao === "" ||
      !contribuiaAntesReforma
    ) {
      setResultado(
        "Preencha todos os campos obrigatórios para realizar a simulação."
      );
      return;
    }

    const anos = Number(anosContribuicao);
    const meses = Number(mesesContribuicao || 0);
    const anos2019 = Number(anosEm2019 || 0);
    const meses2019 = Number(mesesEm2019 || 0);

    if (anos < 0 || meses < 0 || meses > 11) {
      setResultado(
        "Informe corretamente o tempo de contribuição atual."
      );
      return;
    }

    if (
      contribuiaAntesReforma === "sim" &&
      anosEm2019 === ""
    ) {
      setResultado(
        "Informe o tempo de contribuição existente em 13/11/2019."
      );
      return;
    }

    if (
      anos2019 < 0 ||
      meses2019 < 0 ||
      meses2019 > 11
    ) {
      setResultado(
        "Informe corretamente o tempo de contribuição em 13/11/2019."
      );
      return;
    }

    const hoje = new Date();

    const idadeTotalMeses =
      calcularIdadeEmMeses(dataNascimento, hoje);

    const idadeAnos = Math.floor(
      idadeTotalMeses / 12
    );

    const idadeMeses =
      idadeTotalMeses % 12;

    const contribuicaoTotalMeses =
      anos * 12 + meses;

    const contribuicao2019Meses =
      anos2019 * 12 + meses2019;

    const tempoMinimoContribuicao =
      sexo === "feminino"
        ? 30 * 12
        : 35 * 12;

    const resultados: string[] = [];
    const previsoes: Previsao[] = [];

    resultados.push(
      `IDADE ATUAL\n${idadeAnos} anos e ${idadeMeses} meses.\n\n` +
        `TEMPO DE CONTRIBUIÇÃO UTILIZADO\n${anos} anos e ${meses} meses.`
    );

    if (
      dadosDetalhadosCNIS &&
      dadosDetalhadosCNIS.vinculosUrbanos.length > 0
    ) {
      const tempoUrbanoCalculado =
        calcularTempoUrbanoDoCNIS();

      resultados.push(
        "📋 MEMÓRIA DO TEMPO URBANO DO CNIS\n" +
          `Vínculos estruturados: ${dadosDetalhadosCNIS.vinculosUrbanos.length}.\n` +
          `Vínculos com datas válidas utilizados: ${tempoUrbanoCalculado.vinculosValidos}.\n` +
          `Tempo urbano calculado sem duplicar sobreposições: ${formatarMeses(
            tempoUrbanoCalculado.meses
          )}.` +
          (tempoUrbanoCalculado.vinculosIgnorados > 0
            ? `\nAtenção: ${tempoUrbanoCalculado.vinculosIgnorados} vínculo(s) com data inválida ou incompleta não foram computados automaticamente.`
            : "")
      );
    }

    if (dadosDetalhadosCNIS) {
      const memoriaDetalhada =
        gerarMemoriaDetalhadaCNIS();

      if (memoriaDetalhada) {
        resultados.push(memoriaDetalhada);
      }

      if (contribuiaAntesReforma === "sim") {
        const memoriaReforma =
          gerarMemoriaTempoReforma();

        if (memoriaReforma) {
          resultados.push(memoriaReforma);
        }
      }
    }

    // APOSENTADORIA POR IDADE

    const idadeMinima =
      sexo === "feminino"
        ? 62 * 12
        : 65 * 12;

    const contribuicaoMinimaIdade =
      sexo === "masculino" &&
      contribuiaAntesReforma === "nao"
        ? 20 * 12
        : 15 * 12;

    const faltaIdade = Math.max(
      0,
      idadeMinima - idadeTotalMeses
    );

    const faltaTempoIdade = Math.max(
      0,
      contribuicaoMinimaIdade -
        contribuicaoTotalMeses
    );

    const faltaRegraIdade = Math.max(
      faltaIdade,
      faltaTempoIdade
    );

    previsoes.push({
      regra: "Aposentadoria por idade",
      mesesFaltantes: faltaRegraIdade,
      data: adicionarMeses(
        hoje,
        faltaRegraIdade
      ),
    });

    if (faltaRegraIdade === 0) {
      resultados.push(
        "✅ APOSENTADORIA POR IDADE\n" +
          "Os requisitos básicos informados estão preenchidos."
      );
    } else {
      resultados.push(
        "⏳ APOSENTADORIA POR IDADE\n" +
          `Falta aproximadamente: ${formatarMeses(
            faltaRegraIdade
          )}.\n` +
          `Previsão estimada: ${formatarData(
            adicionarMeses(
              hoje,
              faltaRegraIdade
            )
          )}.`
      );
    }

    // APOSENTADORIA POR IDADE HÍBRIDA
    if (dadosDetalhadosCNIS && dadosDetalhadosCNIS.periodosSeguradoEspecial.length > 0) {
      const tempoRural = calcularTempoRuralNaoConcomitante();
      const tempoHibridoTotalMeses = contribuicaoTotalMeses + tempoRural.mesesRuraisConsiderados;
      const idadeMinimaHibrida = sexo === "feminino" ? 62 * 12 : 65 * 12;
      const tempoMinimoHibrido =
        contribuiaAntesReforma === "sim" ? 15 * 12 : sexo === "feminino" ? 15 * 12 : 20 * 12;

      const faltaHibrida = Math.max(
        Math.max(0, idadeMinimaHibrida - idadeTotalMeses),
        Math.max(0, tempoMinimoHibrido - tempoHibridoTotalMeses)
      );

      previsoes.push({
        regra: "Aposentadoria por idade híbrida",
        mesesFaltantes: faltaHibrida,
        data: adicionarMeses(hoje, faltaHibrida),
      });

      const linhas = [
        `Tempo urbano utilizado no cálculo: ${formatarMeses(contribuicaoTotalMeses)}.`,
        `Tempo rural identificado: ${formatarMeses(tempoRural.mesesRuraisBrutos)}.`,
        tempoRural.mesesConcomitantes > 0
          ? `Concomitância estimada não somada em duplicidade: ${formatarMeses(tempoRural.mesesConcomitantes)}.`
          : "",
        `Tempo combinado estimado: ${formatarMeses(tempoHibridoTotalMeses)}.`,
        faltaHibrida === 0
          ? "Os requisitos básicos de idade e tempo aparentam estar preenchidos, condicionados ao reconhecimento do período rural e à confirmação da carência."
          : `Falta aproximadamente: ${formatarMeses(faltaHibrida)}.\nPrevisão estimada: ${formatarData(adicionarMeses(hoje, faltaHibrida))}.`,
        "A carência mínima de 180 meses deve ser conferida separadamente. A ferramenta não considera automaticamente cada mês identificado como mês de carência.",
      ].filter(Boolean);

      resultados.push(
        `${faltaHibrida === 0 ? "✅" : "⏳"} APOSENTADORIA POR IDADE HÍBRIDA\n` +
          linhas.join("\n")
      );
    }

    // REGRAS DE TRANSIÇÃO

    if (contribuiaAntesReforma === "sim") {
      // REGRA DOS PONTOS

      let mesesParaPontos: number | null =
        null;

      for (
        let futuro = 0;
        futuro <= 25 * 12;
        futuro++
      ) {
        const dataFutura =
          adicionarMeses(hoje, futuro);

        const idadeFutura =
          calcularIdadeEmMeses(
            dataNascimento,
            dataFutura
          );

        const contribuicaoFutura =
          contribuicaoTotalMeses + futuro;

        const pontosFuturos =
          (idadeFutura +
            contribuicaoFutura) /
          12;

        const exigencia =
          pontosExigidos(
            dataFutura.getFullYear()
          );

        if (
          contribuicaoFutura >=
            tempoMinimoContribuicao &&
          pontosFuturos >= exigencia
        ) {
          mesesParaPontos = futuro;
          break;
        }
      }

      if (mesesParaPontos !== null) {
        previsoes.push({
          regra: "Regra dos pontos",
          mesesFaltantes:
            mesesParaPontos,
          data: adicionarMeses(
            hoje,
            mesesParaPontos
          ),
        });

        resultados.push(
          `${
            mesesParaPontos === 0
              ? "✅"
              : "⏳"
          } REGRA DOS PONTOS\n` +
            `${
              mesesParaPontos === 0
                ? "Os requisitos estimados estão preenchidos."
                : `Falta aproximadamente: ${formatarMeses(
                    mesesParaPontos
                  )}.\nPrevisão estimada: ${formatarData(
                    adicionarMeses(
                      hoje,
                      mesesParaPontos
                    )
                  )}.`
            }`
        );
      }

      // IDADE MÍNIMA PROGRESSIVA

      let mesesParaProgressiva:
        | number
        | null = null;

      for (
        let futuro = 0;
        futuro <= 25 * 12;
        futuro++
      ) {
        const dataFutura =
          adicionarMeses(hoje, futuro);

        const idadeFutura =
          calcularIdadeEmMeses(
            dataNascimento,
            dataFutura
          );

        const contribuicaoFutura =
          contribuicaoTotalMeses + futuro;

        const idadeExigida =
          idadeProgressivaExigidaMeses(
            dataFutura.getFullYear()
          );

        if (
          idadeFutura >= idadeExigida &&
          contribuicaoFutura >=
            tempoMinimoContribuicao
        ) {
          mesesParaProgressiva = futuro;
          break;
        }
      }

      if (
        mesesParaProgressiva !== null
      ) {
        previsoes.push({
          regra:
            "Idade mínima progressiva",
          mesesFaltantes:
            mesesParaProgressiva,
          data: adicionarMeses(
            hoje,
            mesesParaProgressiva
          ),
        });

        resultados.push(
          `${
            mesesParaProgressiva === 0
              ? "✅"
              : "⏳"
          } IDADE MÍNIMA PROGRESSIVA\n` +
            `${
              mesesParaProgressiva === 0
                ? "Os requisitos estimados estão preenchidos."
                : `Falta aproximadamente: ${formatarMeses(
                    mesesParaProgressiva
                  )}.\nPrevisão estimada: ${formatarData(
                    adicionarMeses(
                      hoje,
                      mesesParaProgressiva
                    )
                  )}.`
            }`
        );
      }

      const tempoQueFaltava =
        tempoMinimoContribuicao -
        contribuicao2019Meses;

      // PEDÁGIO DE 50%

      if (
        tempoQueFaltava > 0 &&
        tempoQueFaltava <= 24
      ) {
        const pedagio50 = Math.ceil(
          tempoQueFaltava * 0.5
        );

        const tempoNecessario =
          tempoMinimoContribuicao +
          pedagio50;

        const mesesFaltantes =
          Math.max(
            0,
            tempoNecessario -
              contribuicaoTotalMeses
          );

        previsoes.push({
          regra: "Pedágio de 50%",
          mesesFaltantes,
          data: adicionarMeses(
            hoje,
            mesesFaltantes
          ),
        });

        resultados.push(
          `${
            mesesFaltantes === 0
              ? "✅"
              : "⏳"
          } PEDÁGIO DE 50%\n` +
            `Tempo que faltava em 13/11/2019: ${formatarMeses(
              tempoQueFaltava
            )}.\n` +
            `Pedágio adicional: ${formatarMeses(
              pedagio50
            )}.\n` +
            `${
              mesesFaltantes === 0
                ? "Requisito de tempo estimado preenchido."
                : `Falta aproximadamente: ${formatarMeses(
                    mesesFaltantes
                  )}.\nPrevisão estimada: ${formatarData(
                    adicionarMeses(
                      hoje,
                      mesesFaltantes
                    )
                  )}.`
            }`
        );
      } else {
        resultados.push(
          "❌ PEDÁGIO DE 50%\n" +
            "Pelos dados informados, esta regra não aparenta ser aplicável."
        );
      }

      // PEDÁGIO DE 100%

      const faltaEm2019 = Math.max(
        0,
        tempoQueFaltava
      );

      const tempoNecessarioPedagio100 =
        tempoMinimoContribuicao +
        faltaEm2019;

      const idadeMinimaPedagio100 =
        sexo === "feminino"
          ? 57 * 12
          : 60 * 12;

      const faltaIdadePedagio100 =
        Math.max(
          0,
          idadeMinimaPedagio100 -
            idadeTotalMeses
        );

      const faltaTempoPedagio100 =
        Math.max(
          0,
          tempoNecessarioPedagio100 -
            contribuicaoTotalMeses
        );

      const mesesParaPedagio100 =
        Math.max(
          faltaIdadePedagio100,
          faltaTempoPedagio100
        );

      previsoes.push({
        regra: "Pedágio de 100%",
        mesesFaltantes:
          mesesParaPedagio100,
        data: adicionarMeses(
          hoje,
          mesesParaPedagio100
        ),
      });

      resultados.push(
        `${
          mesesParaPedagio100 === 0
            ? "✅"
            : "⏳"
        } PEDÁGIO DE 100%\n` +
          `Tempo que faltava em 13/11/2019: ${formatarMeses(
            faltaEm2019
          )}.\n` +
          `Pedágio adicional: ${formatarMeses(
            faltaEm2019
          )}.\n` +
          `${
            mesesParaPedagio100 === 0
              ? "Os requisitos básicos estimados estão preenchidos."
              : `Falta aproximadamente: ${formatarMeses(
                  mesesParaPedagio100
                )}.\nPrevisão estimada: ${formatarData(
                  adicionarMeses(
                    hoje,
                    mesesParaPedagio100
                  )
                )}.`
          }`
      );
    }

    // MELHOR PREVISÃO

    previsoes.sort(
      (a, b) =>
        a.mesesFaltantes -
        b.mesesFaltantes
    );

    const melhor = previsoes[0];

    if (melhor) {
      resultados.unshift(
        "⭐ MELHOR PREVISÃO ENCONTRADA\n" +
          `Regra: ${melhor.regra}.\n` +
          `${
            melhor.mesesFaltantes === 0
              ? "Situação: requisitos básicos aparentemente preenchidos."
              : `Tempo estimado restante: ${formatarMeses(
                  melhor.mesesFaltantes
                )}.\nData aproximada: ${formatarData(
                  melhor.data
                )}.`
          }\n\n` +
          "A regra que permite aposentadoria primeiro não é necessariamente a que gera o maior valor de benefício."
      );
    }

    resultados.push(
      "⚠️ IMPORTANTE\n" +
        "As previsões futuras consideram que a pessoa continuará contribuindo sem interrupções. O resultado é preliminar e depende da conferência do CNIS, carência, vínculos, indicadores, períodos especiais, rurais, RPPS, contribuições abaixo do mínimo e demais particularidades."
    );

    setResultado(
      resultados.join(
        "\n\n────────────────────────────\n\n"
      )
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg md:p-10">
        <h1 className="text-3xl font-bold text-[#0F4C5C]">
          Calculadora Previdenciária
        </h1>

        <p className="mt-4 text-gray-600">
          Simule as principais regras de aposentadoria e obtenha uma previsão aproximada.
        </p>

        {/* IMPORTAÇÃO DO CNIS */}

        <div className="mt-8 rounded-2xl border-2 border-dashed border-[#0F4C5C]/30 bg-[#0F4C5C]/5 p-6">
          <h2 className="text-xl font-bold text-[#0F4C5C]">
            Importar dados do CNIS
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Envie o CNIS em PDF para tentar preencher automaticamente os dados da calculadora.
          </p>

          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) => {
              const arquivo =
                e.target.files?.[0] ||
                null;

              setArquivoCNIS(arquivo);
              setMensagemCNIS("");
            }}
            className="mt-5 block w-full rounded-xl border border-gray-300 bg-white p-3"
          />

          {arquivoCNIS && (
            <p className="mt-3 text-sm text-gray-700">
              Arquivo selecionado:{" "}
              <strong>
                {arquivoCNIS.name}
              </strong>
            </p>
          )}

          <button
            type="button"
            onClick={importarCNIS}
            disabled={
              !arquivoCNIS ||
              importandoCNIS
            }
            className="mt-5 w-full rounded-xl bg-[#0F4C5C] py-3 font-bold text-white hover:bg-[#0b3944] disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {importandoCNIS
              ? "Analisando CNIS..."
              : "Importar dados automaticamente"}
          </button>

          {mensagemCNIS && (
            <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
              {mensagemCNIS}
            </div>
          )}
        </div>

        {dadosDetalhadosCNIS && (
          <div className="mt-8 space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-2xl font-bold text-[#0F4C5C]">Dados encontrados no CNIS</h2>
              <p className="mt-2 text-sm text-gray-600">
                Confira os períodos identificados antes de utilizar o resultado da calculadora.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="font-semibold text-gray-700">Segurado especial / rural</p>
                <p className="mt-1 text-sm text-gray-600">
                  {dadosDetalhadosCNIS.possuiSeguradoEspecial
                    ? "Período identificado no documento."
                    : "Nenhum período identificado."}
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="font-semibold text-gray-700">Concomitância</p>
                <p className="mt-1 text-sm text-gray-600">
                  {dadosDetalhadosCNIS.possuiConcomitancia
                    ? "Foi identificada possível concomitância de períodos."
                    : "Nenhuma concomitância sinalizada pela análise."}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#0F4C5C]">Vínculos urbanos identificados</h3>
              {dadosDetalhadosCNIS.vinculosUrbanos.length > 0 ? (
                <div className="mt-3 space-y-3">
                  {dadosDetalhadosCNIS.vinculosUrbanos.map((vinculo, index) => (
                    <div key={`${vinculo.empregador}-${vinculo.dataInicio}-${index}`}
                      className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <p className="font-semibold text-gray-800">
                        {vinculo.empregador || "Empregador não identificado"}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">Início: {vinculo.dataInicio || "Não identificado"}</p>
                      <p className="text-sm text-gray-600">Fim: {vinculo.dataFim || "Não identificado / conferir"}</p>
                      {vinculo.indicadores?.length > 0 && (
                        <p className="mt-2 text-sm text-amber-700">
                          Indicadores: {vinculo.indicadores.join(", ")}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
                  Nenhum vínculo urbano foi estruturado pela análise automática.
                </p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#0F4C5C]">Períodos de segurado especial / rural</h3>
              {dadosDetalhadosCNIS.periodosSeguradoEspecial.length > 0 ? (
                <div className="mt-3 space-y-3">
                  {dadosDetalhadosCNIS.periodosSeguradoEspecial.map((periodo, index) => (
                    <div key={`${periodo.dataInicio}-${periodo.dataFim}-${index}`}
                      className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                      <p className="font-semibold text-gray-800">
                        {periodo.descricao || "Período de segurado especial"}
                      </p>
                      <p className="mt-2 text-sm text-gray-700">Início: {periodo.dataInicio || "Não identificado"}</p>
                      <p className="text-sm text-gray-700">Fim: {periodo.dataFim || "Não identificado / conferir"}</p>
                      {periodo.indicadores?.length > 0 && (
                        <p className="mt-2 text-sm font-medium text-amber-800">
                          Indicadores: {periodo.indicadores.join(", ")}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
                  Nenhum período de segurado especial foi estruturado pela análise.
                </p>
              )}
            </div>

            {dadosDetalhadosCNIS.alertas.length > 0 && (
              <div className="rounded-xl border border-amber-300 bg-amber-50 p-5">
                <h3 className="font-bold text-amber-900">Alertas para conferência</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-amber-900">
                  {dadosDetalhadosCNIS.alertas.map((alerta, index) => (
                    <li key={`${alerta}-${index}`}>{alerta}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
              Os períodos de segurado especial são exibidos separadamente e não são
              somados automaticamente ao tempo urbano da calculadora. Confira os vínculos,
              indicadores e períodos antes de concluir a análise.
            </div>
          </div>
        )}

        {/* DADOS DA CALCULADORA */}

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              Data de nascimento
            </label>

            <input
              type="date"
              value={dataNascimento}
              onChange={(e) =>
                setDataNascimento(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              Sexo
            </label>

            <select
              value={sexo}
              onChange={(e) =>
                setSexo(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 p-3"
            >
              <option value="">
                Selecione
              </option>
              <option value="feminino">
                Feminino
              </option>
              <option value="masculino">
                Masculino
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              Anos de contribuição atualmente
            </label>

            <input
              type="number"
              min="0"
              value={anosContribuicao}
              onChange={(e) =>
                setAnosContribuicao(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 p-3"
              placeholder="Ex.: 35"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              Meses adicionais atualmente
            </label>

            <input
              type="number"
              min="0"
              max="11"
              value={mesesContribuicao}
              onChange={(e) =>
                setMesesContribuicao(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 p-3"
              placeholder="Ex.: 6"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-semibold text-gray-700">
              Já contribuía para o INSS antes de 13/11/2019?
            </label>

            <select
              value={
                contribuiaAntesReforma
              }
              onChange={(e) => {
                setContribuiaAntesReforma(
                  e.target.value
                );

                if (
                  e.target.value ===
                  "nao"
                ) {
                  setAnosEm2019("");
                  setMesesEm2019("");
                }
              }}
              className="w-full rounded-xl border border-gray-300 p-3"
            >
              <option value="">
                Selecione
              </option>
              <option value="sim">
                Sim
              </option>
              <option value="nao">
                Não
              </option>
            </select>
          </div>

          {contribuiaAntesReforma ===
            "sim" && (
            <>
              <div className="md:col-span-2 rounded-xl bg-gray-50 p-4">
                <h2 className="font-bold text-[#0F4C5C]">
                  Tempo de contribuição em 13/11/2019
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                  Confira o tempo de contribuição existente na data da Reforma da Previdência.
                </p>
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Anos em 13/11/2019
                </label>

                <input
                  type="number"
                  min="0"
                  value={anosEm2019}
                  onChange={(e) =>
                    setAnosEm2019(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Meses adicionais em 13/11/2019
                </label>

                <input
                  type="number"
                  min="0"
                  max="11"
                  value={mesesEm2019}
                  onChange={(e) =>
                    setMesesEm2019(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3"
                />
              </div>
            </>
          )}
        </div>

        <button
          onClick={calcular}
          className="mt-8 w-full rounded-xl bg-[#0F4C5C] py-4 font-bold text-white hover:bg-[#0b3944]"
        >
          Calcular aposentadoria
        </button>

        {resultado && (
          <div className="mt-8 rounded-xl border border-gray-300 bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-bold text-[#0F4C5C]">
              Resultado da simulação
            </h2>

            <pre className="whitespace-pre-wrap font-sans leading-7 text-gray-700">
              {resultado}
            </pre>
          </div>
        )}

        <p className="mt-6 text-sm text-gray-500">
          A importação automática e a simulação devem ser conferidas com o CNIS original. A ferramenta não substitui uma análise previdenciária individualizada.
        </p>
      </div>
    </main>
  );
}