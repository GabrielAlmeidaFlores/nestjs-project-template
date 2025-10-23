import { Inject } from '@nestjs/common';
import moment from 'moment';

import { indicadorsData } from '@lib/cnis-analysis/data/indicadors-data';
import { CarenciaInterface } from '@lib/cnis-analysis/dto/carencia';
import { ConcomitanciaInterface } from '@lib/cnis-analysis/dto/concomitancia';
import { ConcomitanciaDetalhesInterface } from '@lib/cnis-analysis/dto/concomitancia-detalhes';
import { ConsolidadoRelationInterface } from '@lib/cnis-analysis/dto/consolidado-relation';
import {
  TimeContributionDataInterface,
  TimeContributionInterface,
} from '@lib/cnis-analysis/dto/time-contribution';
import { CnisOutputCompleteModel } from '@lib/cnis-analysis/model/output/cnis-output-complete.model';
import { CnisProcessorGateway } from '@lib/cnis-processor/cnis-processor.gateway';
import { CnisOutputModel } from '@lib/cnis-processor/model/output/cnis.output.model';

export class CnisAnalysisService {
  protected readonly _type = CnisAnalysisService.name;

  public constructor(
    @Inject(CnisProcessorGateway)
    private readonly cnisParserGateway: CnisProcessorGateway,
  ) {}

  public async parseCnisDocumentComplete(
    cnisDocument: Buffer,
  ): Promise<CnisOutputCompleteModel> {
    const data = await this.cnisParserGateway.parseCnisDocument(cnisDocument);
    const idade = this.calculateAge(
      data.affiliateIdentification?.dataDeNascimento,
    );
    const temposContribuicao = this.calculateTimeContribution(data);

    const carenciaCounts = this.calculateCarencia(data);

    const concomitanciaRelations = this.calculateConcomitancia(data);

    const consolidadoTempoContribuicaoECarencia =
      this.calculateConsolidadoTempoContribuicaoECarencia(
        temposContribuicao,
        carenciaCounts,
        concomitanciaRelations,
        data,
      );

    const vinculosNaoConcomitantes =
      consolidadoTempoContribuicaoECarencia.filter(
        (vinculo) => !vinculo.isConcomitante,
      );

    const somaVinculosNaoConcomitantes = vinculosNaoConcomitantes.reduce(
      (accumulator, currentValue) => {
        const startDate = currentValue.validContributionTime?.dataInicio;
        const endDate = currentValue.validContributionTime?.dataFim;
        if (
          startDate instanceof Date &&
          !isNaN(startDate.getTime()) &&
          endDate instanceof Date &&
          !isNaN(endDate.getTime())
        ) {
          const duration = this.daysBetween(startDate, endDate);
          return accumulator + duration;
        }
        return accumulator;
      },
      0,
    );
    const vinculosPrincipais = consolidadoTempoContribuicaoECarencia.filter(
      (vinculo) => vinculo.tipo === 'principal',
    );
    const somaVinculosPrincipais = vinculosPrincipais.reduce(
      (accumulator, currentValue) => {
        const startDate = currentValue.validContributionTime?.dataInicio;
        const endDate = currentValue.validContributionTime?.dataFim;
        if (
          startDate instanceof Date &&
          !isNaN(startDate.getTime()) &&
          endDate instanceof Date &&
          !isNaN(endDate.getTime())
        ) {
          const duration = this.daysBetween(startDate, endDate);
          return accumulator + duration;
        }
        return accumulator;
      },
      0,
    );

    const vinculosSecundarios = consolidadoTempoContribuicaoECarencia.filter(
      (vinculo) => vinculo.tipo === 'secundario',
    );
    const somaVinculosSecundarios = vinculosSecundarios.reduce(
      (accumulator, currentValue) => {
        const startDate = currentValue.validContributionTime?.dataInicio;
        const endDate = currentValue.validContributionTime?.dataFim;
        if (
          startDate instanceof Date &&
          !isNaN(startDate.getTime()) &&
          endDate instanceof Date &&
          !isNaN(endDate.getTime())
        ) {
          const duration = this.daysBetween(startDate, endDate);
          return accumulator + duration;
        }
        return accumulator;
      },
      0,
    );

    const duracaoTotalEmDias =
      somaVinculosNaoConcomitantes +
      somaVinculosPrincipais +
      somaVinculosSecundarios;

    const somaPotencial = consolidadoTempoContribuicaoECarencia.reduce(
      (acc, curr) =>
        acc +
        this.daysBetween(
          curr.validContributionTime?.dataInicio,
          curr.validContributionTime?.dataFim,
        ),
      0,
    );
    const anosPotencial = moment.duration(somaPotencial, 'days').years();
    const mesesPotencial = moment.duration(somaPotencial, 'days').months();
    const diasPotencial = moment.duration(somaPotencial, 'days').days();

    const somaPotencialRestrito = consolidadoTempoContribuicaoECarencia
      .filter((vinculo) => !vinculo.isPendencia)
      .reduce(
        (acc, curr) =>
          acc +
          this.daysBetween(
            curr.validContributionTime?.dataInicio,
            curr.validContributionTime?.dataFim,
          ),
        0,
      );

    const potencialValido = `${anosPotencial}a ${mesesPotencial}m ${diasPotencial}d`;

    const anosRestrito = moment.duration(somaPotencialRestrito, 'days').years();
    const mesesRestrito = moment
      .duration(somaPotencialRestrito, 'days')
      .months();
    const diasRestrito = moment.duration(somaPotencialRestrito, 'days').days();

    const restritoValido = `${anosRestrito}a ${mesesRestrito}m ${diasRestrito}d`;

    const indicadoresDePendencia = this.calculateImpactoLiquidoDePendencias(
      consolidadoTempoContribuicaoECarencia,
    );

    const cnis = CnisOutputCompleteModel.build({
      idade,
      potencialValido,
      restritoValido,
      duracaoTotalEmDias,
      indicadoresDePendencia,
    });

    if (data.affiliateIdentification) {
      cnis.affiliateIdentification = data.affiliateIdentification;
    }
    if (Array.isArray(data.socialSecurityRelations)) {
      cnis.socialSecurityRelations = data.socialSecurityRelations;
    } else {
      cnis.socialSecurityRelations = [];
    }
    // adicionar os dados calculados ao modelo de saída conforme necessário
    // (por exemplo, como propriedades adicionais ou em uma estrutura separada)
    // Aqui, apenas retornamos o modelo básico para simplificação
    return cnis;
  }

  private calcularVinculosConcomitantes(
    vinculos: ConcomitanciaDetalhesInterface[],
    resultadoFinal: ConcomitanciaDetalhesInterface[] = [],
  ): ConcomitanciaDetalhesInterface[] {
    if (vinculos.length === 0) {
      return resultadoFinal;
    }

    const items = vinculos
      .map((v) => {
        const inicio = this.toDate(v.contributionTime.dataInicio);
        const fim = this.toDate(v.contributionTime.dataFim);
        return {
          original: v,
          start: inicio,
          end: fim,
        };
      })
      .sort((a, b) => {
        const sa = a.start ? a.start.getTime() : 0;
        const sb = b.start ? b.start.getTime() : 0;
        return sa - sb;
      });

    if (items.length === 0) {
      return resultadoFinal;
    }

    const group: {
      original: ConcomitanciaDetalhesInterface;
      start: Date | null;
      end: Date | null;
    }[] = [];
    const firstItem = items[0];
    let endOfGroup = firstItem?.end ? firstItem.end.getTime() : 0;
    group.push(
      firstItem ?? {
        original: {} as ConcomitanciaDetalhesInterface,
        start: null,
        end: null,
      },
    );

    for (let i = 1; i < items.length; i++) {
      const it = items[i];
      const inicioIt = it?.start ? it.start.getTime() : 0;
      // se começa antes ou no fim atual do grupo -> pertence ao grupo
      if (inicioIt <= endOfGroup) {
        group.push(
          it ?? {
            original: {} as ConcomitanciaDetalhesInterface,
            start: null,
            end: null,
          },
        );
        const fimIt = it?.end ? it.end.getTime() : endOfGroup;
        if (fimIt > endOfGroup) {
          endOfGroup = fimIt;
        }
      } else {
        // não sobrepõe o grupo atual -> parar de montar este grupo
        break;
      }
    }

    // auxiliar para calcular dias de duração inclusive
    const diasDeDuracao = (s: Date | null, e: Date | null) => {
      if (!s || !e) {
        return 0;
      }
      return this.daysBetween(s, e) + 1;
    };

    // escolher o vínculo principal dentro do grupo:
    // maior duração; empate -> início mais antigo; empate -> menor seq (se existir)
    let entradaPrincipal = group[0];
    for (let i = 1; i < group.length; i++) {
      const atual = group[i];
      const durMelhor = diasDeDuracao(
        entradaPrincipal?.start ?? null,
        entradaPrincipal?.end ?? null,
      );
      const durAtual = diasDeDuracao(atual?.start ?? null, atual?.end ?? null);
      if (durAtual > durMelhor) {
        entradaPrincipal = atual;
        continue;
      }
      if (durAtual === durMelhor) {
        if (atual?.start && entradaPrincipal?.start) {
          if (atual.start.getTime() < entradaPrincipal.start.getTime()) {
            entradaPrincipal = atual;
            continue;
          }
        }
        const seqMelhor =
          entradaPrincipal?.original.seq ?? Number.MAX_SAFE_INTEGER;
        const seqAtual = atual?.original.seq ?? Number.MAX_SAFE_INTEGER;
        if (seqAtual < seqMelhor) {
          entradaPrincipal = atual;
        }
      }
    }

    if (!entradaPrincipal) {
      // segurança: se não houver entrada principal, retorna o resultado acumulado
      return resultadoFinal;
    }

    // garantir tipo não-any e extrair contributionTime de forma segura
    const originalObj = entradaPrincipal.original;
    const contributionTimeObj =
      (originalObj['contributionTime'] as
        | Record<string, unknown>
        | undefined) ?? {};

    const vinculoPrincipal = {
      ...originalObj,
      tipo: 'principal',
      contributionTime: {
        ...contributionTimeObj,
      },
    };

    const inicioPrincipal = this.toDate(
      // contributionTime was typed as a Record via casting earlier, so use bracket access
      vinculoPrincipal.contributionTime['dataInicio'] as
        | Date
        | null
        | undefined,
    );
    const fimPrincipal = this.toDate(
      vinculoPrincipal.contributionTime['dataFim'] as Date | null | undefined,
    );
    if (!inicioPrincipal || !fimPrincipal) {
      // cannot process the group without valid principal start and end dates
      return resultadoFinal;
    }

    // processar membros do grupo: marcar principal e ajustar secundários
    const grupoProcessado: any[] = [];
    grupoProcessado.push(vinculoPrincipal);

    const secundariosAjustados: any[] = [];

    for (const membro of group) {
      if (membro === entradaPrincipal) {
        continue;
      } // já processado o principal
      const orig = membro.original;
      const s = this.toDate(orig.contributionTime.dataInicio);
      const e = this.toDate(orig.contributionTime.dataFim);

      // se faltar data de início ou fim -> considerar zerado as datas
      if (!s || !e) {
        const zero = {
          ...orig,
          tipo: 'secundario',
          contributionTime: {
            ...(orig.contributionTime ?? {}),
            dataInicio: orig.contributionTime?.dataInicio,
            dataFim: orig.contributionTime?.dataFim,
            abreviado: '0 anos 0 meses 0 dias',
            dias: 0,
            meses: 0,
            anos: 0,
          },
          ajustado: true,
          dataAjustada: {
            dataInicio: s,
            dataFim: e,
          },
        };
        grupoProcessado.push(zero);
        continue;
      }

      // totalmente contido no principal -> zera
      if (
        s.getTime() >= inicioPrincipal.getTime() &&
        e.getTime() <= fimPrincipal.getTime()
      ) {
        const zero = {
          ...orig,
          tipo: 'secundario',
          contributionTime: {
            ...(orig.contributionTime ?? {}),
            dataInicio: s,
            dataFim: e,
            abreviado: '0 anos 0 meses 0 dias',
            dias: 0,
            meses: 0,
            anos: 0,
          },
          ajustado: true,
          dataAjustada: {
            dataInicio: s,
            dataFim: e,
          },
        };
        grupoProcessado.push(zero);
        continue;
      }

      // sobreposição parcial -> truncar
      let novoInicio = s;
      let novoFim = e;

      // sobrepõe no final do membro (membro começa antes do principal e termina dentro do principal)
      if (
        s.getTime() < inicioPrincipal.getTime() &&
        e.getTime() >= inicioPrincipal.getTime() &&
        e.getTime() <= fimPrincipal.getTime()
      ) {
        novoFim = this.daysBeforeOrAfter(inicioPrincipal, 'before');
      }
      // sobrepõe no início do membro (membro começa dentro do principal e termina depois do principal)
      else if (
        s.getTime() >= inicioPrincipal.getTime() &&
        s.getTime() <= fimPrincipal.getTime() &&
        e.getTime() > fimPrincipal.getTime()
      ) {
        novoInicio = this.daysBeforeOrAfter(fimPrincipal, 'after');
      }
      // membro envolve o principal (começa antes e termina depois)
      else if (
        s.getTime() < inicioPrincipal.getTime() &&
        e.getTime() > fimPrincipal.getTime()
      ) {
        // separar em duas partes: antes do principal e depois do principal
        const antesFim = this.daysBeforeOrAfter(inicioPrincipal, 'before');
        if (s.getTime() <= antesFim.getTime()) {
          const parteAntes = {
            ...orig,
            tipo: 'secundario',
            contributionTime: {
              ...(orig.contributionTime ?? {}),
              dataInicio: s,
              dataFim: antesFim,
            },
            ajustado: true,
            dataAjustada: {
              dataInicio: s,
              dataFim: antesFim,
            },
          };
          secundariosAjustados.push(parteAntes);
        }
        const depoisInicio = this.daysBeforeOrAfter(fimPrincipal, 'after');
        if (depoisInicio.getTime() <= e.getTime()) {
          const parteDepois = {
            ...orig,
            tipo: 'secundario',
            contributionTime: {
              ...(orig.contributionTime ?? {}),
              dataInicio: depoisInicio,
              dataFim: e,
            },
            ajustado: true,
            dataAjustada: {
              dataInicio: depoisInicio,
              dataFim: e,
            },
          };
          secundariosAjustados.push(parteDepois);
        }
        // marcar o original como considerado (zerado) no grupo processado
        const zero = {
          ...orig,
          tipo: 'secundario',
          contributionTime: {
            ...(orig.contributionTime ?? {}),
            dataInicio: s,
            dataFim: e,
            abreviado: '0 anos 0 meses 0 dias',
            dias: 0,
            meses: 0,
            anos: 0,
          },
          ajustado: true,
          dataAjustada: {
            dataInicio: s,
            dataFim: e,
          },
        };
        grupoProcessado.push(zero);
        continue;
      }

      // verificar se o intervalo ajustado ainda é válido
      if (novoInicio.getTime() <= novoFim.getTime()) {
        const ajustado = {
          ...orig,
          tipo: 'secundario',
          contributionTime: {
            ...(orig.contributionTime ?? {}),
            dataInicio: novoInicio,
            dataFim: novoFim,
          },
          ajustado: true,
          dataAjustada: {
            dataInicio: novoInicio,
            dataFim: novoFim,
          },
        };
        grupoProcessado.push(ajustado);
        // coletar para reprocessamento, pois pode ainda sobrepor com itens seguintes
        secundariosAjustados.push(ajustado);
      } else {
        // nada resta após truncamento -> zerado
        const zero = {
          ...orig,
          tipo: 'secundario',
          contributionTime: {
            ...(orig.contributionTime ?? {}),
            dataInicio: s,
            dataFim: e,
            abreviado: '0 anos 0 meses 0 dias',
            dias: 0,
            meses: 0,
            anos: 0,
          },
          ajustado: true,
          dataAjustada: {
            dataInicio: s,
            dataFim: e,
          },
        };
        grupoProcessado.push(zero);
      }
    }

    // adicionar grupo processado ao resultado final da lista
    resultadoFinal.push(...grupoProcessado);

    // construir próximo conjunto a processar:
    // - itens restantes após o grupo na lista ordenada original
    const restantes = items.slice(group.length).map((it) => it.original);

    // - mais os secundários ajustados que ainda tenham duração positiva e possam sobrepor os restantes
    const ajustadosParaProximaRodada = secundariosAjustados.filter((s) => {
      const st = this.toDate(s.contributionTime?.dataInicio);
      const en = this.toDate(s.contributionTime?.dataFim);
      return st && en && st.getTime() <= en.getTime();
    });

    const proximaLista = [...ajustadosParaProximaRodada, ...restantes];

    // recursão com o próximo conjunto
    return this.calcularVinculosConcomitantes(proximaLista, resultadoFinal);
  }

  private daysBetween(dateStart?: Date | null, dateEnd?: Date | null): number {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    if (!dateStart || !dateEnd) {
      return 0;
    }
    return Math.floor((dateEnd.getTime() - dateStart.getTime()) / MS_PER_DAY);
  }

  private daysBeforeOrAfter(date: Date, option: string): Date {
    if (option !== 'before' && option !== 'after') {
      throw new Error('Opção inválida para daysBeforeOrAfter');
    }

    const x = new Date(date);
    if (option === 'before') {
      x.setDate(x.getDate() - 1);
      x.setHours(0, 0, 0, 0);
      return x;
    }
    x.setDate(x.getDate() + 1);
    x.setHours(0, 0, 0, 0);
    return x;
  }

  private toDate(value: Date | null | undefined): Date | null {
    if (value === null || value === undefined) {
      return null;
    }
    if (value instanceof Date) {
      return value;
    }
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  private cleanerListVinculosConcomitantes(
    data: ConcomitanciaDetalhesInterface[],
  ): ConcomitanciaDetalhesInterface[] {
    const rawResult: ConcomitanciaDetalhesInterface[] =
      this.calcularVinculosConcomitantes(Array.isArray(data) ? data : [], []);

    if (!Array.isArray(rawResult) || rawResult.length === 0) {
      return [];
    }

    const resultado = rawResult;

    const relacionacoesSecundarios = resultado.filter(
      (v: ConcomitanciaDetalhesInterface) => v.tipo === 'secundario',
    );
    const relacionacoesPrincipais = resultado.filter(
      (v: ConcomitanciaDetalhesInterface) => v.tipo === 'principal',
    );
    const seqsSecundarios = new Set(
      relacionacoesSecundarios.map((v) => String(v.seq)),
    );
    const relacionacoesPrincipaisFiltradas = relacionacoesPrincipais.filter(
      (v) => !seqsSecundarios.has(String(v.seq)),
    );

    return [...relacionacoesPrincipaisFiltradas, ...relacionacoesSecundarios];
  }

  private calculateAge(birthDate?: Date): number {
    // Fórmula/Lógica: Idade = (Data do Extrato) - (Data de Nascimento)
    if (!birthDate) {
      return 0;
    }
    const currentYear = new Date().getFullYear();
    return currentYear - birthDate.getFullYear();
  }

  private calculateTimeContribution(
    data: CnisOutputModel,
  ): TimeContributionInterface[] {
    // 2.1. Cálculo do Tempo de Contribuição (por vínculo):
    // Descrição: Apurar a duração exata de cada vínculo previdenciário individualmente.
    // Fórmula/Lógica: (Data Fim - Data Início) + 1 dia.
    //Resultado: Deve ser formatado em Anos, Meses e Dias (Xa Ym Zd).

    const calculatedContributionTimesResponse: TimeContributionInterface[] = [];
    data.socialSecurityRelations?.forEach((relation) => {
      const startDate = relation.socialSecurityAffiliationInfo.dataInicio;
      const endDate = relation.socialSecurityAffiliationInfo.dataFim;
      const lastDateRemun = relation.socialSecurityAffiliationInfo.ultRemun;
      const seq = relation.socialSecurityAffiliationInfo.seq;

      let calculatedContributionTime: TimeContributionInterface = {
        seq: seq ?? 1,
        data: {
          dataInicio: startDate ?? undefined,
          dataFim: endDate ?? undefined,
          abreviado: '0a 0m 0d',
          dias: 0,
          meses: 0,
          anos: 0,
        },
      };

      if (
        startDate instanceof Date &&
        !isNaN(startDate.getTime()) &&
        endDate instanceof Date &&
        !isNaN(endDate.getTime())
      ) {
        const dateStartMoment = moment(startDate);
        const dateEndMoment = moment(endDate);
        const duration = moment.duration(dateEndMoment.diff(dateStartMoment));
        const years = dateEndMoment.diff(dateStartMoment, 'years');
        const months = dateEndMoment.diff(
          dateStartMoment.clone().add(years, 'years'),
          'months',
        );
        const days = duration.days() + 1;
        calculatedContributionTime = {
          seq: seq ?? 1,
          data: {
            dataInicio: startDate,
            dataFim: endDate,
            abreviado: `${years}a ${months}m ${days}d`,
            dias: days,
            meses: months,
            anos: years,
          },
        };
      }

      if (
        startDate instanceof Date &&
        !isNaN(startDate.getTime()) &&
        !endDate
      ) {
        const dateStartMoment = moment(startDate);
        const dateAtualMoment = moment(lastDateRemun);
        const duration = moment.duration(dateAtualMoment.diff(dateStartMoment));
        const years = duration.years();
        const months = duration.months();
        const days = duration.days() + 1;
        calculatedContributionTime = {
          seq: seq ?? 1,
          data: {
            dataInicio: startDate,
            dataFim: lastDateRemun,
            abreviado: `${years}a ${months}m ${days}d`,
            dias: days,
            meses: months,
            anos: years,
          },
        };
      }
      calculatedContributionTimesResponse.push(calculatedContributionTime);
    });
    return calculatedContributionTimesResponse;
  }

  private calculateCarencia(data: CnisOutputModel): CarenciaInterface[] {
    // 2.2. Cálculo da Carência (por vínculo):
    // Descrição: Contar o número de meses de carência para cada vínculo.
    // Fórmula/Lógica: Contagem do número de meses-calendário distintos,
    // mesmo que parcialmente trabalhados, dentro do intervalo do vínculo.
    // Resultado: Um número inteiro de meses.

    const carenciaCounts: CarenciaInterface[] = [];
    data.socialSecurityRelations?.forEach((relation) => {
      const startDate = relation.socialSecurityAffiliationInfo.dataInicio;
      const endDate =
        relation.socialSecurityAffiliationInfo.dataFim ??
        relation.socialSecurityAffiliationInfo.ultRemun;
      const seq = relation.socialSecurityAffiliationInfo.seq;
      let carenciaCount = 0;
      const NUMBER_MONTHS_IN_YEAR = 12;
      if (
        startDate instanceof Date &&
        !isNaN(startDate.getTime()) &&
        endDate instanceof Date &&
        !isNaN(endDate.getTime())
      ) {
        const startYear = startDate.getFullYear();
        const startMonth = startDate.getMonth();
        const endYear = endDate.getFullYear();
        const endMonth = endDate.getMonth();
        carenciaCount =
          (endYear - startYear) * NUMBER_MONTHS_IN_YEAR +
          (endMonth - startMonth) +
          1;
      }
      const carenciaEntry: CarenciaInterface = {
        seq: seq ?? 1,
        carenciaCount,
      };
      carenciaCounts.push(carenciaEntry);
    });
    return carenciaCounts;
  }

  private calculateConcomitancia(
    data: CnisOutputModel,
  ): ConcomitanciaInterface[] {
    // 2.3. Detecção de Sobreposição de Datas (Concomitância):
    // Descrição: Comparar o período de cada vínculo com todos os outros para identificar sobreposições de dias.
    // Fórmula/Lógica: Para cada par de vínculos (Vínculo A, Vínculo B), verificar se (Início_A <= Fim_B) e (Fim_A >= Início_B).
    // Resultado: Uma marcação (flag) de "Concomitante (C)" para todos os vínculos envolvidos em sobreposição.

    const concomitanciaRelations: ConcomitanciaInterface[] = [];
    const relations = data.socialSecurityRelations ?? [];
    relations.forEach((relationA, indexA) => {
      const startA = relationA.socialSecurityAffiliationInfo.dataInicio;
      const endA = relationA.socialSecurityAffiliationInfo.dataFim;
      const seq = relationA.socialSecurityAffiliationInfo.seq ?? 1;
      let isConcomitante = false;
      relations.forEach((relationB, indexB) => {
        if (indexA !== indexB) {
          const startB = relationB.socialSecurityAffiliationInfo.dataInicio;
          const endB = relationB.socialSecurityAffiliationInfo.dataFim;
          if (
            startA instanceof Date &&
            endA instanceof Date &&
            startB instanceof Date &&
            endB instanceof Date
          ) {
            if (startA <= endB && endA >= startB) {
              isConcomitante = true;
            }
          }
        }
      });

      const concomitanciaEntry: ConcomitanciaInterface = {
        seq,
        isConcomitante,
      };
      concomitanciaRelations.push(concomitanciaEntry);
    });
    return concomitanciaRelations;
  }

  private calculateConsolidadoTempoContribuicaoECarencia(
    temposContribuicao: TimeContributionInterface[],
    carenciaCounts: CarenciaInterface[],
    concomitanciaRelations: ConcomitanciaInterface[],
    data: CnisOutputModel,
  ): ConsolidadoRelationInterface[] {
    // 2.4. Cálculo Consolidado do Tempo de Contribuição e Carência (Total Anti-Duplicidade):
    // Descrição: Somar o tempo e a carência de todos os vínculos válidos,
    // mas sem contar os períodos concomitantes duas vezes.
    // Este é um dos algoritmos centrais do sistema.
    // Fórmula/Lógica:
    // Identificar grupos de vínculos concomitantes.
    // Em cada grupo, eleger um "vínculo principal" (o de maior duração ou mais antigo).
    // Ajustar as datas de início e/ou fim dos "vínculos secundários"
    // para eliminar a sobreposição com o principal.
    // Somar as durações de:
    // todos os vínculos não concomitantes + os vínculos principais (duração integral) + os vínculos secundários (duração ajustada).
    // Observação: Este cálculo deve ser executado duas vezes para gerar os dois cenários finais:
    // Cenário Potencial: Utilizando todos os vínculos válidos.
    // Cenário Restrito: Utilizando apenas os vínculos válidos e sem pendências (sem a marcação ⚠️).
    /// Depois de calculados os dados, montar a tabela completa:

    if (!data.socialSecurityRelations) {
      return [];
    }

    const completeData = data.socialSecurityRelations
      .map((relation) => {
        const seq = relation.socialSecurityAffiliationInfo.seq;
        const contributionTime: TimeContributionInterface['data'] | undefined =
          temposContribuicao.find((item) => item.seq === seq)?.data;
        const carencia = carenciaCounts.find(
          (item) => item.seq === seq,
        )?.carenciaCount;
        const isConcomitante = concomitanciaRelations.find(
          (item) => item.seq === seq,
        )?.isConcomitante;
        return {
          seq,
          contributionTime,
          carencia,
          isConcomitante,
        };
      })
      .filter((item) => item.seq !== undefined) as {
      seq: number;
      contributionTime?: {
        dataInicio?: Date;
        dataFim?: Date;
        abreviado: string;
        dias: number;
        meses: number;
        anos: number;
      };
      carencia: number;
      isConcomitante: boolean;
    }[];

    const onlyComitantesItems = completeData.filter(
      (item) => item.isConcomitante,
    );

    const listaCerta = onlyComitantesItems.map((item) => {
      return {
        ...item,
        contributionTime: {
          dataInicio: item.contributionTime?.dataInicio ?? new Date(),
          dataFim: item.contributionTime?.dataFim ?? new Date(),
          abreviado: item.contributionTime?.abreviado ?? '0a 0m 0d',
          dias: item.contributionTime?.dias ?? 0,
          meses: item.contributionTime?.meses ?? 0,
          anos: item.contributionTime?.anos ?? 0,
        },
      };
    });

    const listOrdered: ConcomitanciaDetalhesInterface[] = listaCerta
      .map((item) => ({
        ...item,
      }))
      .sort((a, b) => {
        return a.seq - b.seq;
      });

    const concomitanciaListCleaner =
      this.cleanerListVinculosConcomitantes(listOrdered);

    return data.socialSecurityRelations.map((relation) => {
      const seq = relation.socialSecurityAffiliationInfo.seq ?? 1;

      const indicadoresRemuneracao =
        relation.socialSecurityAffiliationEarningsHistory
          .map((item) => item.indicadores)
          .filter((v): v is string => typeof v === 'string' && v.trim() !== '');

      const indicadorPrincipal =
        relation.socialSecurityAffiliationInfo.indicadores;
      const indicadoresArray: string[] = [
        ...(typeof indicadorPrincipal === 'string' &&
        indicadorPrincipal.trim() !== ''
          ? [indicadorPrincipal]
          : []),
        ...indicadoresRemuneracao,
      ];

      const indicadores = indicadoresArray.join(',').trim() ?? '';
      const isPendencia = this.calculateIsPendencia(indicadores);

      const contributionTimeFound = temposContribuicao.find(
        (item) => item.seq === seq,
      )?.data;
      const contributionTime: TimeContributionDataInterface =
        contributionTimeFound ?? {
          dataInicio: null,
          dataFim: null,
          abreviado: '0a 0m 0d',
          dias: 0,
          meses: 0,
          anos: 0,
        };

      const carencia =
        carenciaCounts.find((item) => item.seq === seq)?.carenciaCount ?? 0;
      const isConcomitante = concomitanciaRelations.find(
        (item) => item.seq === seq,
      )?.isConcomitante;
      const concomitanciaDetalhe = concomitanciaListCleaner.find(
        (item) => item.seq === seq,
      );
      // TODOD contar tempo valido ajustado aqui também
      // se for secundario considerar o tempo ajustado
      // se for principal considerar o tempo original
      // cotagens de dias / meses e anos baseado no contributionTime e no concomitanciaDetalhe
      // com a coluna Duração Original
      // é a Tempo Válido para Soma

      const validContributionTime: TimeContributionDataInterface =
        concomitanciaDetalhe?.tipo === 'secundario'
          ? (this.calculateConsolidatedTimeContributionAndCarenciaAjustado(
              seq,
              concomitanciaDetalhe.dataAjustada?.dataInicio,
              concomitanciaDetalhe.dataAjustada?.dataFim,
            ).data ?? contributionTime)
          : contributionTime;

      return {
        seq,
        indicadores,
        isPendencia,
        contributionTime,
        validContributionTime,
        carencia,
        isConcomitante: isConcomitante ?? false,
        tipo: concomitanciaDetalhe?.tipo ?? 'principal',
        ajustado: concomitanciaDetalhe?.ajustado ?? false,
        dataAjustada: {
          ...concomitanciaDetalhe?.dataAjustada,
        },
      };
    });
  }

  private calculateConsolidatedTimeContributionAndCarenciaAjustado(
    seq: number,
    startDate?: Date,
    endDate?: Date,
  ): TimeContributionInterface {
    if (
      startDate instanceof Date &&
      !isNaN(startDate.getTime()) &&
      endDate instanceof Date &&
      !isNaN(endDate.getTime())
    ) {
      const dateStartMoment = moment(startDate);
      const dateEndMoment = moment(endDate);
      const duration = moment.duration(dateEndMoment.diff(dateStartMoment));
      const years = dateEndMoment.diff(dateStartMoment, 'years');
      const months = dateEndMoment.diff(dateStartMoment, 'months');
      const days = duration.days() + 1;
      return {
        seq,
        data: {
          dataInicio: startDate,
          dataFim: endDate,
          abreviado: `${years}a ${months}m ${days}d`,
          dias: days,
          meses: months,
          anos: years,
        },
      };
    }
    return {
      seq,
      data: {
        dataInicio: null,
        dataFim: null,
        abreviado: '0a 0m 0d',
        dias: 0,
        meses: 0,
        anos: 0,
      },
    };
  }

  private calculateIsPendencia(sigla: string | null | undefined): boolean {
    if (typeof sigla !== 'string') {
      return false;
    }

    const pendenciaIndicators = ['IREM-INDPEND', 'IREC-INDPEND'];
    const isPendencia =
      pendenciaIndicators.some((ind) => sigla.includes(ind)) ||
      indicadorsData.some(
        (list) =>
          typeof list.sigla === 'string' &&
          sigla.includes(list.sigla) &&
          list.tipo === 'CsPendencia',
      );
    return isPendencia;
  }

  private calculateImpactoLiquidoDePendencias(
    data: ConsolidadoRelationInterface[],
  ): object[] {
    //   3.1. Cálculo do Impacto Líquido das Pendências:
    // Descrição: Somar o tempo e a carência de
    // todos os vínculos que possuem indicadores de pendência.
    // Fórmula/Lógica: Impacto = Soma(tempoCalculado
    // e carenciaCalculada de todos os vínculos com flag 'possuiPendencia = true').
    // Resultado: Um total de tempo (Xa Ym Zd) e carência (meses) "em risco".
    // Retornar por sequencia o impacto líquido das pendências
    const sequenciasComPendencia = data.filter((item) => item.isPendencia);
    const NUMBER_MONTHS_IN_YEAR = 12;
    const tempoTotal = sequenciasComPendencia.map((item) => {
      const startDate = item?.contributionTime?.dataInicio;
      const endDate = item?.contributionTime?.dataFim;
      if (!startDate || !endDate) {
        return {
          dias: 0,
          meses: 0,
          anos: 0,
          carencia: 0,
        };
      }

      const dateStartMoment = moment(startDate);
      const dateEndMoment = moment(endDate);
      const duration = moment.duration(dateEndMoment.diff(dateStartMoment));
      const years = dateEndMoment.diff(dateStartMoment, 'years');
      const months =
        dateEndMoment.diff(dateStartMoment, 'months') -
        years * NUMBER_MONTHS_IN_YEAR;
      const days = duration.days();

      const startYear = startDate.getFullYear();
      const startMonth = startDate.getMonth();
      const endYear = endDate.getFullYear();
      const endMonth = endDate.getMonth();
      const carenciaCount =
        (endYear - startYear) * NUMBER_MONTHS_IN_YEAR +
        (endMonth - startMonth) +
        1;

      return {
        seq: item.seq,
        indicadores: item.indicadores,
        dias: days,
        meses: months,
        anos: years,
        carencia: carenciaCount,
      };
    });

    return tempoTotal;
  }
}
