import { Inject } from '@nestjs/common';
import moment from 'moment';

import { especiesData } from '@lib/cnis-analysis/data/especies-data';
import { indicadorsData } from '@lib/cnis-analysis/data/indicadors-data';
import { ipcaData } from '@lib/cnis-analysis/data/ipca';
import { TetoInssData } from '@lib/cnis-analysis/data/teto.inss';
import { CarenciaInterface } from '@lib/cnis-analysis/dto/carencia';
import { ConcomitanciaInterface } from '@lib/cnis-analysis/dto/concomitancia';
import { ConcomitanciaDetalhesInterface } from '@lib/cnis-analysis/dto/concomitancia-detalhes';
import { ConsolidadoRelationInterface } from '@lib/cnis-analysis/dto/consolidado-relation';
import { CorrecaoMonetariaItemInterface } from '@lib/cnis-analysis/dto/correcao-monetaria';
import { ManutencaoInterface } from '@lib/cnis-analysis/dto/manutencao';
import { PedagioInterface } from '@lib/cnis-analysis/dto/pedagio';
import { SalarioInterface } from '@lib/cnis-analysis/dto/salario';
import { SalariosConcomitantesInterface } from '@lib/cnis-analysis/dto/salario-concomitante';
import { TetoInterface } from '@lib/cnis-analysis/dto/teto';
import {
  TimeContributionDataInterface,
  TimeContributionInterface,
} from '@lib/cnis-analysis/dto/time-contribution';
import { CnisOutputCompleteModel } from '@lib/cnis-analysis/model/output/cnis-output-complete.model';
import { CnisProcessorGateway } from '@lib/cnis-processor/cnis-processor.gateway';
import { CnisOutputModel } from '@lib/cnis-processor/model/output/cnis.output.model';
import { diffYmdInclusive } from '@shared/api/util/diff-ymd-inclusive';

export class CnisAnalysisService {
  protected readonly _type = CnisAnalysisService.name;

  private readonly MONTHS_IN_YEAR = 12;
  private readonly DAYS_IN_YEAR = 365.25;
  private readonly REQUIRED_CONTRIBUTION_MEN = 35;
  private readonly REQUIRED_CONTRIBUTION_WOMEN = 30;
  private readonly REFORMA_DATE = new Date(2019, 10, 13);
  private readonly CUTOFF_DATE = new Date('2019-11-13');

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
    const tempoDeContribuicao = this.calculateTimeContribution(data);
    const carencia = this.calculateCarenciaTotal(tempoDeContribuicao);

    const concomitancia = this.calculateConcomitancia(data);

    const consolidadoResumido =
      this.calculateConsolidadoTempoContribuicaoECarencia(
        tempoDeContribuicao,
        concomitancia,
        carencia,
        data,
      );

    const vinculosNaoConcomitantes = consolidadoResumido.filter(
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
    const vinculosPrincipais = consolidadoResumido.filter(
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

    const vinculosSecundarios = consolidadoResumido.filter(
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

    const somaPotencial = consolidadoResumido.reduce(
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

    const somaPotencialRestrito = consolidadoResumido
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

    const indicadoresDePendencia =
      this.calculateImpactoLiquidoDePendencias(consolidadoResumido);

    const indicadoresDeIncapacidade =
      this.calculateIncapacidade(consolidadoResumido);

    const periodoDeGraca = this.calculatePeriodoDeGraca(consolidadoResumido);

    const dataFinalDaQualidadedeDeSegurado =
      this.calculateDataFinalDaQualidadedeDeSegurado(consolidadoResumido);

    const calculateTempoTotalComRestricoes =
      this.calculateTempoTotalComRestricoes(consolidadoResumido);

    const salariosConcomitantes = this.calculateSalariosConcomitantes(
      data,
      consolidadoResumido,
    );

    const ajusteAoTeto = this.calculateAjusteAoTeto(data);

    const correcaoMonetaria =
      this.calculateAplicacaodaCorrecaoMonetaria(ajusteAoTeto);

    const salarioSBPosReforma =
      this.calculateSalarioSBPosReforma(correcaoMonetaria);

    const salarioSBPreReforma =
      this.calculateSalarioSBPreReforma(correcaoMonetaria);

    const ajusteFinal = this.ajusteFinalSbMinimoEAoTeto(
      salarioSBPosReforma,
      salarioSBPreReforma,
    );

    const gender = 'M'; // TODO: obter do CNIS

    const points = this.calculatePontos(idade.anos, consolidadoResumido);

    const PEDAGIO_ONE_HUNDRED_PERCENT = 1;
    const PEDAGIO_FIFTY_PERCENT = 0.5;

    const tempoPedagio100 = this.calculateTempoPedagio(
      consolidadoResumido,
      gender,
      PEDAGIO_ONE_HUNDRED_PERCENT,
    );

    const tempoPedagio50 = this.calculateTempoPedagio(
      consolidadoResumido,
      gender,
      PEDAGIO_FIFTY_PERCENT,
    );

    const aposentadoriaPorTempoDeContribuicaoComDireitoAdquirido =
      this.aposentadoriaPorTempoDeContribuicaoComDireitoAdquirido(
        consolidadoResumido,
        gender,
        points.pontos,
      );

    const aposentadoriaPorIdadeUrbanaComDireitoAdquirido =
      this.aposentadoriaPorIdadeUrbanaComDireitoAdquirido(
        consolidadoResumido,
        gender,
        idade.anos,
      );

    const aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoArt15 =
      this.aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoArt15(
        consolidadoResumido,
        gender,
        idade.anos,
      );

    const aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt20 =
      this.aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt20(
        consolidadoResumido,
        idade.anos,
        gender,
      );

    const aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt16 =
      this.aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt16(
        consolidadoResumido,
        gender,
        idade.anos,
      );
    const aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt17 =
      this.aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt17(
        consolidadoResumido,
        gender,
        idade.anos,
      );

    const aposentadoriaPorIdadeHibridaComDireitoAdquirido =
      this.aposentadoriaPorIdadeHibridaComDireitoAdquirido(
        consolidadoResumido,
        gender,
        idade.anos,
      );

    const aposentadoriaPorIdadeUrbanaPrevistaNaRegraDeTransicaoDoArt18 =
      this.aposentadoriaPorIdadeUrbanaPrevistaNaRegraDeTransicaoDoArt18(
        consolidadoResumido,
        gender,
        idade.anos,
        data.affiliateIdentification?.dataDeNascimento,
      );

    const aposentadoriaPorIdadeHibridaPrevistaNaRegraDeTransicaoDoArt18 =
      this.aposentadoriaPorIdadeHibridaPrevistaNaRegraDeTransicaoDoArt18(
        consolidadoResumido,
        gender,
        idade.anos,
        data.affiliateIdentification?.dataDeNascimento,
      );

    const cnis = CnisOutputCompleteModel.build({
      idade,
      tempoDeContribuicao,
      concomitancia,
      carenciaTotal: carencia,
      potencialValido,
      restritoValido,
      duracaoTotalEmDias,
      indicadoresDePendencia,
      consolidadoResumido,
      indicadoresDeIncapacidade,
      periodoDeGraca,
      dataFinalDaQualidadedeDeSegurado,
      calculateTempoTotalComRestricoes,
      salariosConcomitantes,
      ajusteAoTeto,
      correcaoMonetaria,
      salarioSBPosReforma,
      salarioSBPreReforma,
      ajusteFinal,
      points,
      tempoPedagio100,
      tempoPedagio50,
      aposentadoriaPorTempoDeContribuicaoComDireitoAdquirido,
      aposentadoriaPorIdadeUrbanaComDireitoAdquirido,
      aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoArt15,
      aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt16,
      aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt17,
      aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt20,
      aposentadoriaPorIdadeHibridaComDireitoAdquirido,
      aposentadoriaPorIdadeUrbanaPrevistaNaRegraDeTransicaoDoArt18,
      aposentadoriaPorIdadeHibridaPrevistaNaRegraDeTransicaoDoArt18,
    });
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
  private getRequiredContributionAge(gender: string) {
    return gender === 'F'
      ? this.REQUIRED_CONTRIBUTION_WOMEN
      : this.REQUIRED_CONTRIBUTION_MEN;
  }
  private calculateTotalContributionYears(
    consolidado: ConsolidadoRelationInterface[],
  ): number {
    return consolidado.reduce(
      (acc, cur) => acc + (cur.validContributionTime?.anos ?? 0),
      0,
    );
  }

  private calculateTotalContributionMonths(
    consolidado: ConsolidadoRelationInterface[],
  ): number {
    return consolidado.reduce(
      (acc, cur) => acc + (cur.validContributionTime?.meses ?? 0),
      0,
    );
  }

  private calculateTotalContributionDays(
    consolidado: ConsolidadoRelationInterface[],
  ): number {
    return consolidado.reduce(
      (acc, cur) => acc + (cur.validContributionTime?.dias ?? 0),
      0,
    );
  }

  private calculateTotalCarencia(
    consolidado: ConsolidadoRelationInterface[],
    dateCuttoff?: Date,
  ): number {
    if (dateCuttoff) {
      return consolidado.reduce((acc, cur) => {
        const startDate = cur.validContributionTime?.dataInicio;
        const endDate = cur.validContributionTime?.dataFim;

        if (
          startDate instanceof Date &&
          !isNaN(startDate.getTime()) &&
          endDate instanceof Date &&
          !isNaN(endDate.getTime())
        ) {
          const effectiveEndDate =
            endDate > dateCuttoff ? dateCuttoff : endDate;
          const durationInMonths = Math.floor(
            this.daysBetween(startDate, effectiveEndDate) / 30,
          );
          return acc + durationInMonths;
        }
        return acc;
      }, 0);
    }
    return consolidado.reduce((acc, cur) => acc + (cur.carencia ?? 0), 0);
  }

  private convertToDecimalYears(
    years: number,
    months: number,
    days: number,
  ): number {
    return Math.ceil(
      years + months / this.MONTHS_IN_YEAR + days / this.DAYS_IN_YEAR,
    );
  }

  private calculateTotals(consolidado: ConsolidadoRelationInterface[]) {
    return {
      years: this.calculateTotalContributionYears(consolidado),
      months: this.calculateTotalContributionMonths(consolidado),
      days: this.calculateTotalContributionDays(consolidado),
      carencia: this.calculateTotalCarencia(consolidado),
    };
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

  private calculateAge(birthDate?: Date): {
    anos: number;
    meses: number;
    dias: number;
    abreviado: string;
  } {
    // Fórmula/Lógica: Idade = (Data do Extrato) - (Data de Nascimento)
    // Resultado: Deve ser formatado em Anos, Meses e Dias (Xa Ym Zd).
    if (!birthDate) {
      return { anos: 0, meses: 0, dias: 0, abreviado: '0a 0m 0d' };
    }

    const today = new Date();
    const nascimento = new Date(birthDate);

    let anos = today.getFullYear() - nascimento.getFullYear();
    let meses = today.getMonth() - nascimento.getMonth();
    let dias = today.getDate() - nascimento.getDate();

    if (dias < 0) {
      meses--;
      const ultimoDiaMesAnterior = new Date(
        today.getFullYear(),
        today.getMonth(),
        0,
      ).getDate();
      dias += ultimoDiaMesAnterior;
    }

    if (meses < 0) {
      anos--;
      meses += this.MONTHS_IN_YEAR;
    }

    return { anos, meses, dias, abreviado: `${anos}a ${meses}m ${dias}d` };
  }

  private calculateTimeContribution(
    data: CnisOutputModel,
  ): TimeContributionInterface[] {
    // 2.1. Cálculo do Tempo de Contribuição (por vínculo):
    // Descrição: Apurar a duração exata de cada vínculo previdenciário individualmente.
    // Fórmula/Lógica: (Data Fim - Data Início) + 1 dia.
    // Resultado: Deve ser formatado em Anos, Meses e Dias (Xa Ym Zd).
    // Regra adicional a partir de 01/11/2019:
    // a Contagem deve ser feita  pelo mes cheio, mesmo que o mes inicio ou fim  do periodo do trabalho seja parcial.

    const calculatedContributionTimesResponse: TimeContributionInterface[] = [];
    data.socialSecurityRelations?.forEach((relation) => {
      const startDate = relation.socialSecurityAffiliationInfo.dataInicio;
      const endDate = relation.socialSecurityAffiliationInfo.dataFim;
      const lastDateRemun = relation.socialSecurityAffiliationInfo.ultRemun;
      const seq = relation.socialSecurityAffiliationInfo.seq;

      let calculatedContributionTime: TimeContributionInterface = {
        seq: seq ?? 0,
        origemDoVinculo:
          relation.socialSecurityAffiliationInfo.origemDoVinculo ?? '',
        tipoDoVinculo:
          relation.socialSecurityAffiliationInfo.tipoFiliadoNoVinculo ?? '',
        indicadores: relation.socialSecurityAffiliationInfo.indicadores ?? '',
        data: {
          dataInicio: startDate ?? null,
          dataFim: endDate ?? null,
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
        const { years, months, days, formatted } = diffYmdInclusive(
          startDate,
          endDate,
        );
        calculatedContributionTime = {
          seq: seq ?? 0,
          origemDoVinculo:
            relation.socialSecurityAffiliationInfo.origemDoVinculo ?? '',
          tipoDoVinculo:
            relation.socialSecurityAffiliationInfo.tipoFiliadoNoVinculo ?? '',
          indicadores: relation.socialSecurityAffiliationInfo.indicadores ?? '',
          data: {
            dataInicio: startDate,
            dataFim: endDate,
            abreviado: formatted,
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
        const { years, months, days, formatted } = diffYmdInclusive(
          startDate,
          lastDateRemun,
        );
        calculatedContributionTime = {
          seq: seq ?? 0,
          origemDoVinculo:
            relation.socialSecurityAffiliationInfo.origemDoVinculo ?? '',
          tipoDoVinculo:
            relation.socialSecurityAffiliationInfo.tipoFiliadoNoVinculo ?? '',
          indicadores: relation.socialSecurityAffiliationInfo.indicadores ?? '',
          data: {
            dataInicio: startDate,
            dataFim: lastDateRemun,
            abreviado: formatted,
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

  // private calculateCarencia(
  //   seq: number,
  //   startDateVinculo?: Date | null,
  //   endDateVinculo?: Date | null,
  //   lastDateRemunVinculo?: Date | null,
  // ): CarenciaInterface {
  //   // 2.2. Cálculo da Carência (por vínculo):
  //   // Descrição: Contar o número de meses de carência para cada vínculo.
  //   // Fórmula/Lógica: Contagem do número de meses-calendário distintos,
  //   // mesmo que parcialmente trabalhados, dentro do intervalo do vínculo.
  //   // Resultado: Um número inteiro de meses.
  //   const startDate = startDateVinculo ?? null;
  //   const endDate = endDateVinculo ?? lastDateRemunVinculo ?? null;

  //   const NUMBER_MONTHS_IN_YEAR = 12;
  //   if (
  //     startDate instanceof Date &&
  //     !isNaN(startDate.getTime()) &&
  //     endDate instanceof Date &&
  //     !isNaN(endDate.getTime())
  //   ) {
  //     const startYear = startDate.getFullYear();
  //     const startMonth = startDate.getMonth();
  //     const endYear = endDate.getFullYear();
  //     const endMonth = endDate.getMonth();
  //     const carencia =
  //       (endYear - startYear) * NUMBER_MONTHS_IN_YEAR +
  //       (endMonth - startMonth) +
  //       1;
  //     return {
  //       seq,
  //       carencia: carencia >= 0 ? carencia : 0,
  //     };
  //   }
  //   return {
  //     seq,
  //     carencia: 0,
  //   };
  // }

  private calculateConcomitancia(
    data: CnisOutputModel,
  ): ConcomitanciaInterface[] {
    // 2.3. Detecção de Sobreposição de Datas (Concomitância):
    // Descrição: Comparar o período de cada
    // vínculo com todos os outros para identificar sobreposições de dias.
    // Fórmula/Lógica:
    // Para cada par de vínculos (Vínculo A, Vínculo B),
    // verificar se (Início_A <= Fim_B) e (Fim_A >= Início_B).
    // Resultado: Uma marcação (flag) de "Concomitante (C)"
    // para todos os vínculos envolvidos em sobreposição.

    const concomitancia: ConcomitanciaInterface[] = [];
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

      const concomitanciaEntradas: ConcomitanciaInterface = {
        seq,
        isConcomitante,
      };
      concomitancia.push(concomitanciaEntradas);
    });
    return concomitancia;
  }

  private calculateConsolidadoTempoContribuicaoECarencia(
    temposContribuicao: TimeContributionInterface[],
    concomitanciaRelations: ConcomitanciaInterface[],
    carenciaTotal: CarenciaInterface[],
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
        const carencia =
          carenciaTotal.find((item) => item.seq === seq)?.carencia ?? 0;
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
      const uniqueIndicadores = Array.from(new Set(indicadoresArray));
      indicadoresArray.length = 0;
      indicadoresArray.push(...uniqueIndicadores);
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
        carenciaTotal.find((item) => item.seq === seq)?.carencia ?? 0;

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

      const isBeneficio = this.isEspecieBeneficio(
        relation.socialSecurityAffiliationInfo.especie,
      );
      const origem =
        relation.socialSecurityAffiliationInfo.origemDoVinculo ?? '';
      return {
        seq,
        indicadores,
        isPendencia,
        origem,
        contributionTime,
        validContributionTime,
        carencia,
        isConcomitante: isConcomitante ?? false,
        isBeneficio,
        isIntercalado: false,
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
      const { years, months, days, formatted } = diffYmdInclusive(
        startDate,
        endDate,
      );
      return {
        seq,
        data: {
          dataInicio: startDate,
          dataFim: endDate,
          abreviado: formatted,
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

      const { years, months, days } = diffYmdInclusive(startDate, endDate);

      const startYear = startDate.getFullYear();
      const startMonth = startDate.getMonth();
      const endYear = endDate.getFullYear();
      const endMonth = endDate.getMonth();
      const carenciaCount =
        (endYear - startYear) * this.MONTHS_IN_YEAR +
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
  private isEspecieBeneficio(especie?: string | null): boolean {
    const s = String(especie ?? '').trim();
    if (!s) {
      return false;
    }
    return especiesData.some((ind) => s.includes(ind.codigo));
  }

  private calculateIncapacidade(
    consolidado: ConsolidadoRelationInterface[],
  ): object[] {
    // Cálculo da Intercalação: Verificar se um benefício por incapacidade é "intercalado".
    // A lógica consiste em checar se existem contribuições (em outros vínculos)
    // antes da Data de Início e depois da Data Fim do benefício.
    // Ajuste de Tempo e Carência (Invalidação):
    // Após identificar sobreposições entre vínculos de trabalho e
    // benefícios por incapacidade, o tempo e a carência dos vínculos
    // sobrepostos devem ser zerados. Este ajuste afeta
    // diretamente o "Cálculo Consolidado" (item 2.4).

    const indicadoresDeIncapacidade = consolidado.filter(
      (item) =>
        item.isBeneficio &&
        item.contributionTime?.dataInicio !== null &&
        item.contributionTime?.dataFim !== null,
    );
    for (const beneficio of indicadoresDeIncapacidade) {
      const dataInicioBeneficio =
        beneficio.contributionTime?.dataInicio ?? null;
      const dataFimBeneficio = beneficio.contributionTime?.dataFim ?? null;

      if (!dataInicioBeneficio || !dataFimBeneficio) {
        beneficio.isIntercalado = true;
        continue;
      }

      const hasBefore = consolidado.some((item) => {
        const dataFimItem = item.contributionTime?.dataFim ?? null;
        return (
          item.seq !== beneficio.seq &&
          dataFimItem !== null &&
          dataFimItem < dataInicioBeneficio
        );
      });

      const hasAfter = consolidado.some((item) => {
        const dataInicioItem = item.contributionTime?.dataInicio ?? null;
        return (
          item.seq !== beneficio.seq &&
          dataInicioItem !== null &&
          dataInicioItem > dataFimBeneficio
        );
      });

      beneficio.isIntercalado = hasBefore && hasAfter;
      for (const item of consolidado) {
        if (item.seq === beneficio.seq) {
          continue;
        }
        const dataInicioItem = item.contributionTime?.dataInicio ?? null;
        const dataFimItem = item.contributionTime?.dataFim ?? null;
        if (!dataInicioItem || !dataFimItem) {
          continue;
        }

        if (
          dataInicioItem <= dataFimBeneficio &&
          dataFimItem >= dataInicioBeneficio
        ) {
          item.contributionTime = {
            dataInicio: null,
            dataFim: null,
            abreviado: '0a 0m 0d',
            dias: 0,
            meses: 0,
            anos: 0,
          };
          item.carencia = 0;
        }
      }
    }
    return indicadoresDeIncapacidade;
  }
  private calculatePeriodoDeGraca(
    consolidado: ConsolidadoRelationInterface[],
  ): Record<string, unknown> {
    const NUMBER_MONTHS_THRESHOLD = 120;

    const buildScenario = (
      items: ConsolidadoRelationInterface[],
      typeLabel: string,
    ) => {
      const seqsConsiderados = items.map((i) => i.seq);
      const totalMonths = items.reduce(
        (acc, cur) => acc + (cur.carencia ?? 0),
        0,
      );
      const validIntervals = items
        .map((it) => ({
          seq: it.seq,
          start: this.toDate(it.contributionTime?.dataInicio),
          end: this.toDate(it.contributionTime?.dataFim),
        }))
        .filter(
          (it): it is { seq: number; start: Date; end: Date } =>
            it.start instanceof Date && it.end instanceof Date,
        )
        .sort((a, b) => a.start.getTime() - b.start.getTime());

      let continuous = true;
      if (validIntervals.length === 0) {
        continuous = false;
      } else {
        let prevEnd: Date = validIntervals[0]?.end ?? new Date();
        for (let i = 1; i < validIntervals.length; i++) {
          const current = validIntervals[i];
          if (!current) {
            continuous = false;
            break;
          }
          const monthsGap =
            (current.start.getFullYear() - prevEnd?.getFullYear()) *
              this.MONTHS_IN_YEAR +
            (current.start.getMonth() - prevEnd.getMonth());
          if (monthsGap > this.MONTHS_IN_YEAR) {
            continuous = false;
            break;
          }
          if (current.end.getTime() > prevEnd.getTime()) {
            prevEnd = current.end;
          }
        }
      }

      const continuousMonths = continuous ? totalMonths : 0;
      const atingiu120 = totalMonths >= NUMBER_MONTHS_THRESHOLD;

      return {
        type: typeLabel,
        'Vínculos Considerados': seqsConsiderados,
        'Total de Contribuições (meses)': totalMonths,
        'Total de Contribuições Contínuas (meses, 0 se houver hiato >12m)':
          continuousMonths,
        'Atingiu 120 Contribuições?': atingiu120 ? 'Sim' : 'Não',
        'Direito à Prorrogação de +12 meses no Período de Graça': atingiu120
          ? 'Sim'
          : 'Não',
      };
    };

    const semPendenciasItems = consolidado.filter(
      (item) => !item.isPendencia && (item.carencia ?? 0) > 0,
    );

    const totalItems = consolidado.filter((item) => (item.carencia ?? 0) > 0);

    const cenarioSemPendencias = buildScenario(
      semPendenciasItems,
      'Períodos Atuais (sem pendências)',
    );
    const cenarioTotal = buildScenario(
      totalItems,
      'Períodos Potenciais (com pendências resolvidas)',
    );

    return {
      cenarios: [cenarioSemPendencias, cenarioTotal],
    };
  }

  private calculateCarenciaTotal(
    data: TimeContributionInterface[],
  ): CarenciaInterface[] {
    const monthsAssigned = new Set<string>();
    const carenciaSeq: CarenciaInterface[] = [];

    const itemsSorted = [...data].sort((a, b) => (a.seq ?? 0) - (b.seq ?? 0));

    for (const item of itemsSorted) {
      const seq = item.seq;
      const startDate = this.toDate(item.data?.dataInicio);
      const endDate = this.toDate(item.data?.dataFim);

      if (!startDate || !endDate || startDate.getTime() > endDate.getTime()) {
        carenciaSeq.push({ seq, carencia: 0 });
        continue;
      }

      const monthsThisSeq = new Set<string>();
      const current = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        1,
      );
      const end = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

      while (current <= end) {
        const monthKey = `${current.getFullYear()}-${String(
          current.getMonth() + 1,
        ).padStart(2, '0')}`;
        monthsThisSeq.add(monthKey);
        current.setMonth(current.getMonth() + 1);
      }

      let newlyAdded = 0;
      for (const m of monthsThisSeq) {
        if (!monthsAssigned.has(m)) {
          monthsAssigned.add(m);
          newlyAdded++;
        }
      }
      carenciaSeq.push({ seq, carencia: newlyAdded });
    }

    return carenciaSeq;
  }
  // private calculateCarenciaTotalUntilReforma(
  //   data: TimeContributionInterface[],
  // ): CarenciaInterface[] {
  //   const monthsAssigned = new Set<string>();
  //   const carenciaSeq: CarenciaInterface[] = [];

  //   const itemsSorted = [...data].sort((a, b) => (a.seq ?? 0) - (b.seq ?? 0));

  //   for (const item of itemsSorted) {
  //     const seq = item.seq;
  //     const startDate = this.toDate(item.data?.dataInicio);
  //     const endDateOriginal = this.toDate(item.data?.dataFim);

  //     if (!startDate || !endDateOriginal) {
  //       carenciaSeq.push({ seq, carencia: 0 });
  //       continue;
  //     }

  //     const endDate =
  //       endDateOriginal.getTime() > this.REFORMA_DATE.getTime()
  //         ? this.REFORMA_DATE
  //         : endDateOriginal;

  //     if (startDate.getTime() > endDate.getTime()) {
  //       carenciaSeq.push({ seq, carencia: 0 });
  //       continue;
  //     }

  //     const monthsThisSeq = new Set<string>();
  //     const current = new Date(
  //       startDate.getFullYear(),
  //       startDate.getMonth(),
  //       1,
  //     );
  //     const end = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

  //     while (current <= end) {
  //       const monthKey = `${current.getFullYear()}-${String(
  //         current.getMonth() + 1,
  //       ).padStart(2, '0')}`;

  //       monthsThisSeq.add(monthKey);
  //       current.setMonth(current.getMonth() + 1);
  //     }

  //     let newlyAdded = 0;
  //     for (const m of monthsThisSeq) {
  //       if (!monthsAssigned.has(m)) {
  //         monthsAssigned.add(m);
  //         newlyAdded++;
  //       }
  //     }

  //     carenciaSeq.push({ seq, carencia: newlyAdded });
  //   }

  //   return carenciaSeq;
  // }

  private calculateDataFinalDaQualidadedeDeSegurado(
    data: ConsolidadoRelationInterface[],
  ): ManutencaoInterface[] {
    // O algoritmo deve seguir este fluxo:
    // Identificar Hiatos: Percorra a lista de vínculos ordenados. Compare a Data Fim do vínculo N com a Data Início do vínculo N+1. Se houver um intervalo de tempo entre elas, um "hiato" foi encontrado.
    // Calcular o Período de Graça para cada Hiato: Para cada hiato encontrado, execute o seguinte cálculo:
    // a. Ponto de Partida: A "última referência" é a Data Fim do vínculo N.
    // b. Termo Inicial da Contagem: A contagem do período de graça começa sempre no dia 1º do mês seguinte à última referência.
    // c. Período Base (12 meses): O período de graça padrão é de 12 meses.
    // d. Verificação de Prorrogações:
    // +12 meses por +120 Contribuições: Verifique se o segurado possui 120 ou mais contribuições (carência) sem ter perdido a
    // qualidade de segurado entre elas até aquele ponto. Se sim, o período de graça base sobe para 24 meses.
    // (Isso gera a necessidade de uma subtabela de análise, que veremos a seguir).
    // e. Calcular a Data Final da Qualidade de Segurado: Com base no período de graça total (12, 24 ou 36 meses), calcule a data limite.
    //  Atenção à diferença de contagem:
    // Contagem Administrativa (INSS):
    //  A perda ocorre no dia 16 do 2º mês seguinte ao término do prazo nominal (ex: para 12 meses, a perda ocorre em 16/Fevereiro do ano seguinte).
    // Contagem Judicial (Tese "Meses Cheios"):
    //  A perda ocorre no dia 16 do 2º mês seguinte ao término do prazo estendido em mais um mês (ex: para 12 meses, a perda ocorre em 16/Março do ano seguinte).
    // Conclusão da Análise: Compare a Data Início do vínculo N+1 com as duas datas finais calculadas (Administrativa e Judicial).
    // Se a Data Início do vínculo N+1 for anterior ou igual à data final da qualidade de segurado, a qualidade foi MANTIDA.
    // Se for posterior, a qualidade foi PERDIDA naquele hiato.
    // {
    //  periodo_analisado : ' Entre Seq. 1 e 2',
    //  ultima_referencia: 'Data Fim do vínculo N',
    //  proximo_vinculo: 'Data Início do vínculo N+1',
    //  data_final_qualidade_segurado_administrativa: 'DD/MM/AAAA', -- : Perda no dia 16 do 2º mês seguinte ao fim do prazo.
    //  data_final_qualidade_segurado_judicial: 'DD/MM/AAAA', -- Perda no dia 16 do 2º mês seguinte ao fim do prazo + 1 mês.
    //  qualidade_segurado_foi_mantida: 'Sim' | 'Não',
    // }
    const DECIMO_SEXTO_DIA = 16;
    const PERIODO_DE_GRACA_PADRAO = 12;
    const PERIODO_DE_GRACA_AUMENTADO = 24;
    const CONTRIBUICOES_MINIMAS = 120;

    data.sort((a, b) => {
      const aStart = this.toDate(a.contributionTime?.dataInicio);
      const bStart = this.toDate(b.contributionTime?.dataInicio);
      if (aStart && bStart) {
        return aStart.getTime() - bStart.getTime();
      }
      return 0;
    });

    const resultados: ManutencaoInterface[] = [];

    for (let i = 0; i < data.length - 1; i++) {
      const vinculoAtual = data[i];
      const vinculoProximo = data[i + 1];

      const dataFimAtual = this.toDate(vinculoAtual?.contributionTime?.dataFim);
      const dataInicioProximo = this.toDate(
        vinculoProximo?.contributionTime?.dataInicio,
      );

      if (!dataFimAtual || !dataInicioProximo) {
        continue;
      }

      const hiatoDias = this.daysBetween(dataFimAtual, dataInicioProximo);
      if (hiatoDias <= 1) {
        continue;
      }

      const ultimaReferencia = new Date(dataFimAtual);
      const termoInicialContagem = this.daysBeforeOrAfter(
        new Date(
          ultimaReferencia.getFullYear(),
          ultimaReferencia.getMonth() + 1,
          1,
        ),
        'after',
      );

      const carenciaTotal = this.calculateTotalCarencia(data);
      let periodoDeGracaMeses = PERIODO_DE_GRACA_PADRAO;
      if (carenciaTotal >= CONTRIBUICOES_MINIMAS) {
        periodoDeGracaMeses = PERIODO_DE_GRACA_AUMENTADO;
      }

      const dataFinalAdministrativa = new Date(
        termoInicialContagem.getFullYear(),
        termoInicialContagem.getMonth() + periodoDeGracaMeses + 1,
        DECIMO_SEXTO_DIA,
      );
      const dataFinalJudicial = new Date(
        termoInicialContagem.getFullYear(),
        termoInicialContagem.getMonth() + periodoDeGracaMeses + 2,
        DECIMO_SEXTO_DIA,
      );

      const qualidadeMantida = dataInicioProximo <= dataFinalAdministrativa;

      const register: ManutencaoInterface = {
        periodo_analisado: `Entre Seq. ${vinculoAtual?.seq} e ${vinculoProximo?.seq}`,
        ultima_referencia: ultimaReferencia.toISOString().split('T')[0] ?? '',
        proximo_vinculo: dataInicioProximo.toISOString().split('T')[0] ?? '',
        data_final_qualidade_segurado_administrativa:
          dataFinalAdministrativa.toISOString().split('T')[0] ?? '',
        data_final_qualidade_segurado_judicial:
          dataFinalJudicial.toISOString().split('T')[0] ?? '',
        qualidade_segurado_foi_mantida: qualidadeMantida ? true : false,
      };

      resultados.push(register);
    }

    return resultados;
  }

  private calculateTempoTotalComRestricoes(
    data: ConsolidadoRelationInterface[],
  ) {
    // 4.3. Análise de Contribuições no Plano Simplificado:
    // Cálculo do Tempo Total com Restrição (IREC-LC123/MEI):
    // Descrição: Somar o tempo de todos os vínculos que foram contribuídos com alíquota reduzida.
    // Fórmula/Lógica: Soma(tempoCalculado de todos os vínculos com indicador 'IREC-LC123' ou 'IREC-MEI').
    const tempoTotalComRestricoes = data
      .filter((item) => {
        const indicadores = item.indicadores ?? '';
        return (
          indicadores.includes('IREC-LC123') || indicadores.includes('IREC-MEI')
        );
      })
      .map((item) => {
        return {
          seq: item.seq,
          indicadores: item.indicadores,
          contributionTime: item.contributionTime,
          validContributionTime: item.validContributionTime,
          carencia: item.carencia,
          isConcomitante: item.isConcomitante,
          isBeneficio: item.isBeneficio,
          isIntercalado: item.isIntercalado,
          tipo: item.tipo,
          ajustado: item.ajustado,
          dataAjustada: item.dataAjustada,
        };
      });

    if (tempoTotalComRestricoes.length === 0) {
      return [
        [],
        {
          carenciaTotal: 0,
          tempoTotalComRestricoesContribuicao: { dias: 0, meses: 0, anos: 0 },
        },
      ];
    }

    const tempoTotalComRestricoesContribuicao = tempoTotalComRestricoes.reduce(
      (acc, cur) => {
        const dias = acc.dias + (cur.validContributionTime?.dias ?? 0);
        const meses = acc.meses + (cur.validContributionTime?.meses ?? 0);
        const anos = acc.anos + (cur.validContributionTime?.anos ?? 0);

        let adjustedMeses = meses;
        let adjustedAnos = anos;

        if (adjustedMeses >= 12) {
          adjustedAnos += Math.floor(adjustedMeses / 12);
          adjustedMeses = adjustedMeses % 12;
        }

        return {
          dias,
          meses: adjustedMeses,
          anos: adjustedAnos,
        };
      },
      { dias: 0, meses: 0, anos: 0 },
    );

    const tempoTotalComRestricoesCarencia = tempoTotalComRestricoes.reduce(
      (acc, cur) => acc + (cur.carencia ?? 0),
      0,
    );

    return [
      tempoTotalComRestricoes,
      {
        carenciaTotal: tempoTotalComRestricoesCarencia,
        tempoTotalComRestricoesContribuicao,
      },
    ];
  }

  private calculateSalariosConcomitantes(
    data: CnisOutputModel,
    concomitancia: ConsolidadoRelationInterface[],
  ): SalariosConcomitantesInterface[] {
    const salariosConcomitantes: SalariosConcomitantesInterface[] = [];

    if (!data.socialSecurityRelations) {
      return salariosConcomitantes;
    }

    const concomitanteSeqs = new Set(
      concomitancia.filter((c) => c.isConcomitante).map((c) => c.seq),
    );

    data.socialSecurityRelations.forEach((relation) => {
      const seq = relation.socialSecurityAffiliationInfo.seq ?? 0;
      if (!concomitanteSeqs.has(seq)) {
        return;
      }

      relation.socialSecurityAffiliationEarningsHistory.forEach((earning) => {
        const dataRemuneracao = earning.competencia;
        const rawSalario = earning.remuneracao ?? '';
        const salario = Number(rawSalario.replace(/\./g, '').replace(',', '.'));

        if (
          dataRemuneracao instanceof Date &&
          !isNaN(dataRemuneracao.getTime()) &&
          salario > 0
        ) {
          const monthYearKey = `${dataRemuneracao.getFullYear()}-${String(
            dataRemuneracao.getMonth() + 1,
          ).padStart(2, '0')}`;

          const existingEntry = salariosConcomitantes.find(
            (entry) => entry.mesAno === monthYearKey,
          );
          if (existingEntry) {
            existingEntry.totalRemuneracao =
              (existingEntry.totalRemuneracao ?? 0) + salario;
            existingEntry.vinculos.push({ seq, remuneracao: salario });
          } else {
            salariosConcomitantes.push({
              mesAno: monthYearKey,
              totalRemuneracao: salario,
              vinculos: [{ seq, remuneracao: salario }],
            });
          }
        }
      });
    });

    return salariosConcomitantes;
  }

  private calculateAjusteAoTeto(data: CnisOutputModel): TetoInterface[] {
    // Ajuste ao Teto: Limitar o valor histórico de cada competência ao teto previdenciário daquele mês/ano.
    // TODO TETO INSS DATA ANUAL devemos pegar do site, todo mês tem uma atualização e uma nova versão do arquivo
    //  https://www.gov.br/previdencia/pt-br/assuntos/previdencia-social/arquivos/fatores_de_atualizacao_11_2025_art_33.xlsx

    const teto: TetoInterface[] = [];
    if (!data.socialSecurityRelations) {
      return teto;
    }

    data.socialSecurityRelations.forEach((relation) => {
      relation.socialSecurityAffiliationEarningsHistory.forEach((earning) => {
        const dataRemuneracao = earning.competencia;
        const rawSalario = earning.remuneracao ?? '';
        const salario = Number(rawSalario.replace(/\./g, '').replace(',', '.'));

        if (
          dataRemuneracao instanceof Date &&
          !isNaN(dataRemuneracao.getTime()) &&
          salario > 0
        ) {
          const year = dataRemuneracao.getFullYear();

          const tetoData = TetoInssData.find((t) => t.ano === year);
          if (tetoData) {
            const salarioAjustado =
              salario > tetoData.tetoInss ? tetoData.tetoInss : salario;
            teto.push({
              competencia: dataRemuneracao.toISOString().split('T')[0] ?? '',
              salarioOriginal: salario,
              salarioAjustado: salarioAjustado,
              tetoAplicado: tetoData.tetoInss,
            });
          } else {
            teto.push({
              competencia: dataRemuneracao.toISOString().split('T')[0] ?? '',
              salarioOriginal: salario,
              salarioAjustado: salario,
              tetoAplicado: null,
            });
          }
        }
      });
    });

    return teto;
  }

  private calculateAplicacaodaCorrecaoMonetaria(
    data: TetoInterface[],
  ): CorrecaoMonetariaItemInterface[] {
    ///Aplicação da Correção Monetária: Para cada salário, calcular o valor corrigido.
    //Fórmula/Lógica: Valor Corrigido = Valor Histórico (ajustado ao teto) * Fator de Correção (INPC).

    return data.map((item) => {
      const competenciaFormatted =
        item.competencia.slice(5, 7) + '/' + item.competencia.slice(0, 4);
      const fatorData = ipcaData.find(
        (f) => f.competencia === competenciaFormatted,
      );
      const fatorCorrecao = fatorData ? fatorData?.fatorSimplificado : 1;

      const valorCorrigido = item.salarioAjustado * fatorCorrecao;

      return {
        ...item,
        fatorCorrecao: fatorCorrecao,
        valorCorrigido: Number(valorCorrigido.toFixed(2)),
      };
    });
  }

  private calculateSalarioSBPosReforma(
    data: CorrecaoMonetariaItemInterface[],
  ): SalarioInterface {
    // 5.2. Cálculo do Salário-de-Benefício (SB) - Pós-Reforma (Regra Atual):
    // Descrição: Média de 100% dos salários de contribuição desde julho de 1994.
    // Fórmula/Lógica: SB = (Soma de todos os 'Valores Corrigidos') / (Número total de competências válidas
    //  no período).

    const salariosValidos = data.filter((item) => {
      const competenciaDate = new Date(item.competencia);
      return (
        competenciaDate instanceof Date &&
        !isNaN(competenciaDate.getTime()) &&
        competenciaDate >= new Date(1994, 6, 1)
      );
    });

    const somaValoresCorrigidos = salariosValidos.reduce(
      (acc, cur) => acc + (cur.valorCorrigido ?? 0),
      0,
    );

    const numeroCompetenciasValidas = salariosValidos.length;

    const salarioBeneficio =
      numeroCompetenciasValidas > 0
        ? somaValoresCorrigidos / numeroCompetenciasValidas
        : 0;

    return {
      salarioBeneficio: Number(salarioBeneficio.toFixed(2)),
      numeroCompetenciasConsideradas: numeroCompetenciasValidas,
      somaValoresConsiderados: Number(somaValoresCorrigidos.toFixed(2)),
    };
  }

  private calculateSalarioSBPreReforma(
    data: CorrecaoMonetariaItemInterface[],
  ): SalarioInterface {
    // Descrição: Média dos 80% maiores salários de contribuição desde julho de 1994.
    // Fórmula/Lógica:
    // Ordenar todos os "Valores Corrigidos" do menor para o maior.
    // Descartar os 20% menores valores.
    // SB = (Soma dos 80% maiores 'Valores Corrigidos') / (Número de competências correspondente a 80%).

    const YEAR_1994 = 1994;

    const salariosValidos = data.filter((item) => {
      const competenciaDate = new Date(item.competencia);
      return (
        competenciaDate instanceof Date &&
        !isNaN(competenciaDate.getTime()) &&
        competenciaDate >= new Date(YEAR_1994, 6, 1)
      );
    });

    const valoresCorrigidosOrdenados = salariosValidos
      .map((item) => item.valorCorrigido ?? 0)
      .sort((a, b) => a - b);

    const numeroTotal = valoresCorrigidosOrdenados.length;
    const numeroParaConsiderar = Math.ceil(numeroTotal * 0.8);
    const valoresParaConsiderar = valoresCorrigidosOrdenados.slice(
      numeroTotal - numeroParaConsiderar,
    );

    const somaValoresConsiderados = valoresParaConsiderar.reduce(
      (acc, cur) => acc + cur,
      0,
    );

    const salarioBeneficio =
      numeroParaConsiderar > 0
        ? somaValoresConsiderados / numeroParaConsiderar
        : 0;

    return {
      salarioBeneficio: Number(salarioBeneficio.toFixed(2)),
      numeroCompetenciasConsideradas: numeroParaConsiderar,
      somaValoresConsiderados: Number(somaValoresConsiderados.toFixed(2)),
    };
  }

  private ajusteFinalSbMinimoEAoTeto(
    pos: SalarioInterface,
    pre: SalarioInterface,
  ) {
    // 5.4. Ajuste Final do SB ao Mínimo e ao Teto
    // Descrição: Garantir que o SB final (de ambos os cálculos acima) não seja inferior ao salário mínimo vigente
    // nem superior ao teto do RGPS na data da análise.
    // Pegue o ultimo salário mínimo vigente e o último teto do RGPS disponível. TetoInssData.Salario mínimo
    // deve ser atualizado anualmente conforme o governo publica os novos valores.

    const actualYear = new Date().getFullYear();

    const data = TetoInssData.find((t) => t.ano === actualYear);

    const salarioMinimoVigente = data?.salarioMinimo ?? 0;

    const ajusteSbPos = Math.min(
      Math.max(pos.salarioBeneficio, salarioMinimoVigente),
      data?.tetoInss ?? pos.salarioBeneficio,
    );

    const ajusteSbPre = Math.min(
      Math.max(pre.salarioBeneficio, salarioMinimoVigente),
      data?.tetoInss ?? pre.salarioBeneficio,
    );

    return {
      ajusteSbPos: Number(ajusteSbPos.toFixed(2)),
      ajusteSbPre: Number(ajusteSbPre.toFixed(2)),
    };
  }

  private calculatePontos(idade: number, data: ConsolidadoRelationInterface[]) {
    // Cálculo de Pontos: Pontos = Idade do segurado + Tempo de Contribuição (em anos).
    const calculatedTotals = this.calculateTotals(data);
    const contribution = this.convertToDecimalYears(
      calculatedTotals.years,
      calculatedTotals.months,
      calculatedTotals.days,
    );

    const pontos = idade + contribution;

    return {
      idade,
      totalContributionYears: contribution,
      pontos,
    };
  }

  private calculateTempoPedagio(
    data: ConsolidadoRelationInterface[],
    gender: string,
    percentualPedagio: number,
  ): PedagioInterface {
    const requiredContributionYears = this.getRequiredContributionAge(gender);

    let totalContributionYearsAtReforma = 0;
    let totalContributionMonthsAtReforma = 0;
    let totalContributionDaysAtReforma = 0;

    data.forEach((item) => {
      const dataInicio = this.toDate(item.validContributionTime?.dataInicio);
      let dataFim = this.toDate(item.validContributionTime?.dataFim);

      if (!dataInicio) {
        return;
      }

      if (!dataFim || dataFim > this.REFORMA_DATE) {
        dataFim = this.REFORMA_DATE;
      }

      if (dataInicio >= this.REFORMA_DATE) {
        return;
      }

      const { years, months, days } = diffYmdInclusive(dataInicio, dataFim);

      totalContributionYearsAtReforma += years;
      totalContributionMonthsAtReforma += months;
      totalContributionDaysAtReforma += days;
    });

    const totalContributionAtReforma = this.convertToDecimalYears(
      totalContributionYearsAtReforma,
      totalContributionMonthsAtReforma,
      totalContributionDaysAtReforma,
    );

    const tempoFaltante =
      requiredContributionYears - totalContributionAtReforma;

    const pedagio = tempoFaltante * percentualPedagio;

    const tempoTotalNecessario = requiredContributionYears + pedagio;

    return {
      totalContributionAtReforma,
      tempoFaltante,
      pedagio,
      tempoTotalNecessario,
    };
  }

  private aposentadoriaPorTempoDeContribuicaoComDireitoAdquirido(
    data: ConsolidadoRelationInterface[],
    gender: string,
    points: number,
  ) {
    // Aposentadoria por Tempo de Contribuição com Direito Adquirido até a EC 103
    // (requisitos cumpridos até 13/11/2019): a) não exige idade mínima; b) tempo mínimo de
    // contribuição de 35 anos para homens e 30 anos para mulheres; c) carência mínima de 180
    // meses para ambos os sexos. A RMI será de 100% do salário-de-benefício calculado na
    // forma do art. 29, da Lei 8.231/91, com incidência do fator previdenciários, podendo esse ser
    // dispensado se o filiado contar com o somatório de idade (em anos, meses e dias) e tempo
    // de contribuição (em anos, meses e dias) de 86 pontos (mulheres) e 96 pontos (homens),
    // em 13/11/2019.

    const REQUIRED_CARENCIA_MONTHS = 180;

    const requiredContributionYears = this.getRequiredContributionAge(gender);

    data.forEach((item) => {
      const dataInicio = this.toDate(item.validContributionTime?.dataInicio);
      let dataFim = this.toDate(item.validContributionTime?.dataFim);

      if (!dataInicio) {
        return;
      }

      if (!dataFim || dataFim > this.REFORMA_DATE) {
        dataFim = this.REFORMA_DATE;
      }

      if (dataInicio >= this.REFORMA_DATE) {
        item.validContributionTime = {
          dataInicio: null,
          dataFim: null,
          abreviado: '0a 0m 0d',
          dias: 0,
          meses: 0,
          anos: 0,
        };
        return;
      }

      const { years, months, days } = diffYmdInclusive(dataInicio, dataFim);

      item.validContributionTime = {
        dataInicio: dataInicio,
        dataFim: dataFim,
        abreviado: `${years}a ${months}m ${days}d`,
        dias: days,
        meses: months,
        anos: years,
      };
    });

    const calculatedTotals = this.calculateTotals(data);
    const totalContribution = this.convertToDecimalYears(
      calculatedTotals.years,
      calculatedTotals.months,
      calculatedTotals.days,
    );
    const totalCarenciaMonths = this.calculateTotalCarencia(data);

    const pointsNeeded = gender === 'F' ? 86 : 96;

    const meetsContributionRequirement =
      totalContribution >= requiredContributionYears;
    const meetsCarenciaRequirement =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS;
    const meetsPointsRequirement = points >= pointsNeeded;

    const isEligible =
      meetsContributionRequirement &&
      meetsCarenciaRequirement &&
      meetsPointsRequirement;

    const dateActual = new Date();
    const monthsToContribution = meetsContributionRequirement
      ? 0
      : (requiredContributionYears - totalContribution) * this.MONTHS_IN_YEAR;

    const monthsToCarencia = meetsCarenciaRequirement
      ? 0
      : REQUIRED_CARENCIA_MONTHS - totalCarenciaMonths;

    const monthsToPoints =
      points >= pointsNeeded
        ? 0
        : Math.ceil((pointsNeeded - points) * this.MONTHS_IN_YEAR);

    const adjustedMonthsToPoints = Math.max(
      0,
      monthsToPoints - monthsToContribution,
    );

    const monthsToFulfill = Math.max(
      monthsToContribution,
      monthsToCarencia,
      adjustedMonthsToPoints,
    );

    const projectedFulfillmentDate = new Date(
      dateActual.getFullYear(),
      dateActual.getMonth() + monthsToFulfill,
      dateActual.getDate(),
    );

    return {
      type: 'Aposentadoria por Tempo de Contribuição com Direito Adquirido',
      isEligible,
      totalContributionYears: calculatedTotals.years,
      totalCarenciaMonths,
      points,
      meetsContributionRequirement,
      meetsCarenciaRequirement,
      meetsPointsRequirement,
      pointsNeeded,
      projectedFulfillmentDate,
    };
  }

  private aposentadoriaPorIdadeUrbanaComDireitoAdquirido(
    data: ConsolidadoRelationInterface[],
    gender: string,
    age: number,
  ) {
    // Aposentadoria por Idade Urbana com Direito Adquirido até a EC 103 (requisitos
    // cumpridos até 13/11/2019): a) idade mínima de 65 anos (homens) ou 60 anos (mulheres); b)
    // não exige tempo de contribuição mínimo; c) carência mínima de 180 meses para ambos os
    // sexos. A RMI será de 70% (setenta por cento) do salário de benefício, com acréscimo de
    // 1% (um por cento) deste, a cada grupo de 12 (doze) contribuições, até o limite máximo de
    // 100% (cem por cento).

    const REQUIRED_CARENCIA_MONTHS = 180;
    const REQUIRED_AGE_MEN = 65;
    const REQUIRED_AGE_WOMEN = 60;

    const requiredAge = gender === 'F' ? REQUIRED_AGE_WOMEN : REQUIRED_AGE_MEN;

    const CUTOFF_DATE = new Date('2019-11-13');
    data.forEach((item) => {
      const dataInicio = this.toDate(item.validContributionTime?.dataInicio);
      let dataFim = this.toDate(item.validContributionTime?.dataFim);

      if (!dataInicio) {
        return;
      }

      if (!dataFim || dataFim > CUTOFF_DATE) {
        dataFim = CUTOFF_DATE;
      }

      if (dataInicio >= CUTOFF_DATE) {
        item.validContributionTime = {
          dataInicio: null,
          dataFim: null,
          abreviado: '0a 0m 0d',
          dias: 0,
          meses: 0,
          anos: 0,
        };
        return;
      }

      const { years, months, days } = diffYmdInclusive(dataInicio, dataFim);

      item.validContributionTime = {
        dataInicio: dataInicio,
        dataFim: dataFim,
        abreviado: `${years}a ${months}m ${days}d`,
        dias: days,
        meses: months,
        anos: years,
      };
    });

    const totalCarenciaMonths = this.calculateTotalCarencia(data);

    const meetsAgeRequirement = age >= requiredAge;
    const meetsCarenciaRequirement =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS;

    const isEligible = meetsAgeRequirement && meetsCarenciaRequirement;

    const dateActual = new Date();
    const monthsToAge = meetsAgeRequirement
      ? 0
      : (requiredAge - age) * this.MONTHS_IN_YEAR;

    const monthsToCarencia = meetsCarenciaRequirement
      ? 0
      : REQUIRED_CARENCIA_MONTHS - totalCarenciaMonths;

    const monthsToFulfill = Math.max(monthsToAge, monthsToCarencia);

    const projectedFulfillmentDate = new Date(
      dateActual.getFullYear(),
      dateActual.getMonth() + monthsToFulfill,
      dateActual.getDate(),
    );

    return {
      type: 'Aposentadoria por Idade Urbana com Direito Adquirido',
      isEligible,
      age,
      totalCarenciaMonths,
      meetsAgeRequirement,
      meetsCarenciaRequirement,
      projectedFulfillmentDate,
    };
  }

  private aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoArt15(
    consolidadoResumido: ConsolidadoRelationInterface[],
    gender: string,
    age: number,
  ) {
    // #### Aposentadoria por Tempo de Contribuição com base na Regra de Transição do art. 15,
    // da Emenda 103: a) 30 (trinta) anos de contribuição, se mulher, e 35 (trinta e cinco) anos de
    // contribuição, se homem; b) somatório da idade e do tempo de contribuição, incluídas as
    // frações, equivalente a 86 (oitenta e seis) pontos, se mulher, e 96 (noventa e seis) pontos, se
    // homem. A partir de 1º de janeiro de 2020, a pontuação a que se refere o inciso anterior será
    // acrescida a cada ano de 1 (um) ponto, até atingir o limite de 100 (cem) pontos, se mulher, e
    // de 105 (cento e cinco) pontos, se homem. A idade e o tempo de contribuição serão
    // apurados em dias para o cálculo do somatório de pontos; c) carência de 180 meses, para
    // ambos os sexos. A RMI será de 60% (sessenta por cento) do salário de benefício, com
    // acréscimo de 2 (dois) pontos percentuais para cada ano de contribuição que exceder o
    // tempo de 20 (vinte) anos de contribuição, se homem, e o que exceder o tempo de 15
    // (quinze) anos de contribuição, se mulher.

    const REQUIRED_CARENCIA_MONTHS = 180;
    const BASE_POINTS_MEN = 96;
    const BASE_POINTS_WOMEN = 86;
    const MAX_POINTS_MEN = 105;
    const MAX_POINTS_WOMEN = 100;

    const requiredContributionYears = this.getRequiredContributionAge(gender);
    const basePoints = gender === 'F' ? BASE_POINTS_WOMEN : BASE_POINTS_MEN;
    const maxPoints = gender === 'F' ? MAX_POINTS_WOMEN : MAX_POINTS_MEN;

    const calculatedTotals = this.calculateTotals(consolidadoResumido);
    const totalContribution = this.convertToDecimalYears(
      calculatedTotals.years,
      calculatedTotals.months,
      calculatedTotals.days,
    );

    const totalCarenciaMonths =
      this.calculateTotalCarencia(consolidadoResumido);

    const currentYear = new Date().getFullYear();
    const year2020 = 2020;

    const yearsSince2020 = Math.max(0, currentYear - year2020);
    let requiredPoints = basePoints + yearsSince2020;
    if (requiredPoints > maxPoints) {
      requiredPoints = maxPoints;
    }

    const pontos =
      calculatedTotals.years +
      calculatedTotals.months / this.MONTHS_IN_YEAR +
      calculatedTotals.days / this.DAYS_IN_YEAR +
      age;

    const actualDate = new Date();
    const monthsToContribution = this.monthsRemainingForContribution(
      calculatedTotals.years,
      calculatedTotals.months,
      calculatedTotals.days,
      requiredContributionYears,
    );

    const monthsToCarencia =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS
        ? 0
        : REQUIRED_CARENCIA_MONTHS - totalCarenciaMonths;

    const monthsToPoints =
      pontos >= requiredPoints
        ? 0
        : Math.ceil((requiredPoints - pontos) * this.MONTHS_IN_YEAR);

    const adjustedMonthsToPoints = Math.max(
      0,
      monthsToPoints - monthsToContribution,
    );

    const monthsToFulfill = Math.max(
      monthsToContribution,
      monthsToCarencia,
      adjustedMonthsToPoints,
    );

    const projectedFulfillmentDate = new Date(
      actualDate.getFullYear(),
      actualDate.getMonth() + monthsToFulfill,
      actualDate.getDate(),
    );

    return {
      type: 'Aposentadoria por Tempo de Contribuição - Regra de Transição - Emenda 103 art. 15',
      requiredContributionYears,
      requiredCarenciaMonths: REQUIRED_CARENCIA_MONTHS,
      requiredPoints,
      totalContribution,
      totalCarenciaMonths,
      pontos,
      meetsContributionRequirement:
        totalContribution >= requiredContributionYears,
      meetsCarenciaRequirement: totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS,
      meetsPointsRequirement: pontos >= requiredPoints,
      projectedFulfillmentDate,
    };
  }

  private monthsRemainingForContribution(
    totalYears: number,
    totalMonths: number,
    totalDays: number,
    requiredYears: number,
  ): number {
    const DAYS_IN_MONTH = this.DAYS_IN_YEAR / this.MONTHS_IN_YEAR;

    const totalMonthsExact =
      (totalYears || 0) * this.MONTHS_IN_YEAR +
      (totalMonths || 0) +
      (totalDays || 0) / DAYS_IN_MONTH;

    const requiredMonths = requiredYears * this.MONTHS_IN_YEAR;
    const monthsToContribution = Math.max(
      0,
      Math.ceil(requiredMonths - totalMonthsExact),
    );

    return monthsToContribution;
  }

  private totalContributionType(
    consolidadoResumido: ConsolidadoRelationInterface[],
  ) {
    const calculatedTotals = this.calculateTotals(consolidadoResumido);

    const totalContribution = this.convertToDecimalYears(
      calculatedTotals.years,
      calculatedTotals.months,
      calculatedTotals.days,
    );

    return totalContribution;
  }

  private aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt20(
    consolidadoResumido: ConsolidadoRelationInterface[],
    age: number,
    gender: string,
  ) {
    const REQUIRED_AGE_WOMEN = 57;
    const REQUIRED_AGE_MEN = 60;
    const REQUIRED_CARENCIA_MONTHS = 180;
    const PEDAGIO_PERCENTAGE = 1;

    const requiredAge = gender === 'F' ? REQUIRED_AGE_WOMEN : REQUIRED_AGE_MEN;
    const requiredContribution = this.getRequiredContributionAge(gender);

    const totalContribution = this.totalContributionType(consolidadoResumido);

    const pedagioData = this.calculateTempoPedagio(
      consolidadoResumido,
      gender,
      PEDAGIO_PERCENTAGE,
    );

    const totalCarenciaMonths =
      this.calculateTotalCarencia(consolidadoResumido);

    const meetsAgeRequirement = age >= requiredAge;
    const meetsContributionTimeRequirement =
      totalContribution >= pedagioData.tempoTotalNecessario;
    const meetsCarenciaRequirement =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS;

    const actualDate = new Date();

    const monthsToAge = meetsAgeRequirement
      ? 0
      : Math.ceil((requiredAge - age) * this.MONTHS_IN_YEAR);

    const monthsToContribution = meetsContributionTimeRequirement
      ? 0
      : Math.ceil(
          (pedagioData.tempoTotalNecessario - totalContribution) *
            this.MONTHS_IN_YEAR,
        );

    const monthsToCarencia = meetsCarenciaRequirement
      ? 0
      : REQUIRED_CARENCIA_MONTHS - totalCarenciaMonths;

    const monthsToFulfill = Math.max(
      monthsToAge,
      monthsToContribution,
      monthsToCarencia,
    );

    const projectedFulfillmentDate = new Date(
      actualDate.getFullYear(),
      actualDate.getMonth() + monthsToFulfill,
      actualDate.getDate(),
    );

    const isEligible =
      meetsAgeRequirement &&
      meetsContributionTimeRequirement &&
      meetsCarenciaRequirement;

    return {
      type: 'Aposentadoria por Tempo de Contribuição com base na Regra de Transição do art. 20',
      age,
      gender,
      requiredAge,
      totalContribution,
      requiredContribution,
      totalContributionAtReforma: pedagioData.totalContributionAtReforma,
      totalCarenciaMonths,
      meetsAgeRequirement,
      meetsContributionTimeRequirement,
      meetsCarenciaRequirement,
      isEligible,
      projectedFulfillmentDate,
    };
  }

  private aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt16(
    consolidadoResumido: ConsolidadoRelationInterface[],
    gender: string,
    age: number,
  ) {
    const REQUIRED_CARENCIA_MONTHS = 180;
    const BASE_AGE_MEN = 61;
    const BASE_AGE_WOMEN = 56;
    const MAX_AGE_MEN = 65;
    const MAX_AGE_WOMEN = 62;

    const requiredContributionYears =
      gender === 'F'
        ? this.REQUIRED_CONTRIBUTION_WOMEN
        : this.REQUIRED_CONTRIBUTION_MEN;

    const baseAge = gender === 'F' ? BASE_AGE_WOMEN : BASE_AGE_MEN;
    const maxAge = gender === 'F' ? MAX_AGE_WOMEN : MAX_AGE_MEN;

    const calculatedTotals = this.calculateTotals(consolidadoResumido);

    const totalContribution = this.convertToDecimalYears(
      calculatedTotals.years,
      calculatedTotals.months,
      calculatedTotals.days,
    );

    const currentYear = new Date().getFullYear();
    const year2020 = 2020;

    const yearsSince2020 = Math.max(0, currentYear - year2020);
    let requiredAge = baseAge + yearsSince2020 * 0.5;
    if (requiredAge > maxAge) {
      requiredAge = maxAge;
    }

    const actualDate = new Date();
    const monthsToContribution = this.monthsRemainingForContribution(
      calculatedTotals.years,
      calculatedTotals.months,
      calculatedTotals.days,
      requiredContributionYears,
    );

    const monthsToCarencia =
      calculatedTotals.carencia >= REQUIRED_CARENCIA_MONTHS
        ? 0
        : REQUIRED_CARENCIA_MONTHS - calculatedTotals.carencia;

    const monthsToAge =
      age >= requiredAge
        ? 0
        : Math.ceil((requiredAge - age) * this.MONTHS_IN_YEAR);

    const monthsToFulfill = Math.max(
      monthsToContribution,
      monthsToCarencia,
      monthsToAge,
    );

    const projectedFulfillmentDate = new Date(
      actualDate.getFullYear(),
      actualDate.getMonth() + monthsToFulfill,
      actualDate.getDate(),
    );

    return {
      type: 'Aposentadoria por Tempo de Contribuição - Regra de Transição - Emenda 103 art. 16',
      requiredContributionYears,
      requiredCarenciaMonths: REQUIRED_CARENCIA_MONTHS,
      requiredAge,
      totalContribution,
      totalCarenciaMonths: calculatedTotals.carencia,
      meetsContributionRequirement:
        totalContribution >= requiredContributionYears,
      meetsCarenciaRequirement:
        calculatedTotals.carencia >= REQUIRED_CARENCIA_MONTHS,
      meetsAgeRequirement: age >= requiredAge,
      projectedFulfillmentDate,
    };
  }

  private aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt17(
    consolidadoResumido: ConsolidadoRelationInterface[],
    gender: string,
    age: number,
  ) {
    const REQUIRED_CARENCIA_MONTHS = 180;
    const PEDAGIO_PERCENTAGE = 0.5;

    const requiredContribution = this.getRequiredContributionAge(gender);

    const totalContribution = this.totalContributionType(consolidadoResumido);

    const pedagioData = this.calculateTempoPedagio(
      consolidadoResumido,
      gender,
      PEDAGIO_PERCENTAGE,
    );

    const totalCarenciaMonths =
      this.calculateTotalCarencia(consolidadoResumido);

    const meetsContributionTimeRequirement =
      totalContribution >= pedagioData.tempoTotalNecessario;
    const meetsCarenciaRequirement =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS;

    const actualDate = new Date();

    const monthsToContribution = meetsContributionTimeRequirement
      ? 0
      : Math.ceil(
          (pedagioData.tempoTotalNecessario - totalContribution) *
            this.MONTHS_IN_YEAR,
        );

    const monthsToCarencia = meetsCarenciaRequirement
      ? 0
      : REQUIRED_CARENCIA_MONTHS - totalCarenciaMonths;

    const monthsToFulfill = Math.max(monthsToContribution, monthsToCarencia);

    const projectedFulfillmentDate = new Date(
      actualDate.getFullYear(),
      actualDate.getMonth() + monthsToFulfill,
      actualDate.getDate(),
    );

    const isEligible =
      meetsContributionTimeRequirement && meetsCarenciaRequirement;

    return {
      type: 'Aposentadoria por Tempo de Contribuição com base na Regra de Transição do art. 17',
      age,
      gender,
      totalContribution,
      requiredContribution,
      totalContributionAtReforma: pedagioData.totalContributionAtReforma,
      totalCarenciaMonths,
      meetsContributionTimeRequirement,
      meetsCarenciaRequirement,
      isEligible,
      projectedFulfillmentDate,
    };
  }

  private aposentadoriaPorIdadeHibridaComDireitoAdquirido(
    data: ConsolidadoRelationInterface[],
    gender: string,
    age: number,
  ) {
    const existPeriodoSeguradoEspecial = data.some(
      (item) => item.origem === 'PERÍODO DE ATIVIDADE DE SEGURADO ESPECIAL',
    );
    if (!existPeriodoSeguradoEspecial) {
      return {
        type: 'Aposentadoria por Idade Híbrida com Direito Adquirido',
        isEligible: false,
        age,
        totalCarenciaMonths: 0,
        meetsAgeRequirement: false,
        meetsCarenciaRequirement: false,
        projectedFulfillmentDate: null,
      };
    }

    const REQUIRED_CARENCIA_MONTHS = 180;
    const REQUIRED_AGE_MEN = 65;
    const REQUIRED_AGE_WOMEN = 60;

    const requiredAge = gender === 'F' ? REQUIRED_AGE_WOMEN : REQUIRED_AGE_MEN;

    data.forEach((item) => {
      const dataInicio = this.toDate(item.validContributionTime?.dataInicio);
      let dataFim = this.toDate(item.validContributionTime?.dataFim);

      if (!dataInicio) {
        return;
      }

      if (!dataFim || dataFim > this.CUTOFF_DATE) {
        dataFim = this.CUTOFF_DATE;
      }

      if (dataInicio >= this.CUTOFF_DATE) {
        item.validContributionTime = {
          dataInicio: null,
          dataFim: null,
          abreviado: '0a 0m 0d',
          dias: 0,
          meses: 0,
          anos: 0,
        };
        return;
      }

      const { years, months, days } = diffYmdInclusive(dataInicio, dataFim);

      item.validContributionTime = {
        dataInicio: dataInicio,
        dataFim: dataFim,
        abreviado: `${years}a ${months}m ${days}d`,
        dias: days,
        meses: months,
        anos: years,
      };
    });

    const totalCarenciaMonths = this.calculateTotalCarencia(
      data,
      this.CUTOFF_DATE,
    );

    const meetsAgeRequirement = age >= requiredAge;
    const meetsCarenciaRequirement =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS;

    const isEligible = meetsAgeRequirement && meetsCarenciaRequirement;

    const projectedFulfillmentDate = null;

    return {
      type: 'Aposentadoria por Idade Híbrida com Direito Adquirido',
      isEligible,
      age,
      totalCarenciaMonths,
      meetsAgeRequirement,
      meetsCarenciaRequirement,
      projectedFulfillmentDate,
    };
  }

  private aposentadoriaPorIdadeUrbanaPrevistaNaRegraDeTransicaoDoArt18(
    data: ConsolidadoRelationInterface[],
    gender: string,
    age: number,
    birthDate: Date | undefined,
  ) {
    const REQUIRED_CARENCIA_MONTHS = 180;
    const BASE_AGE_MEN = 65;
    const BASE_AGE_WOMEN = 60;
    const MAX_AGE_WOMEN = 62;
    const REQUIRED_CONTRIBUTION_YEARS = 15;

    const requiredAge = gender === 'F' ? BASE_AGE_WOMEN : BASE_AGE_MEN;
    const calculatedTotals = this.calculateTotals(data);

    const currentYear = new Date().getFullYear();
    const year2020 = 2020;

    const SIX_MONTHS_IN_YEARS_PERCENTUAL = 0.5;

    let requiredAgeAdjusted = requiredAge;
    if (gender === 'F') {
      const yearsSince2020 = Math.max(0, currentYear - year2020);
      requiredAgeAdjusted =
        BASE_AGE_WOMEN + yearsSince2020 * SIX_MONTHS_IN_YEARS_PERCENTUAL;
      if (requiredAgeAdjusted > MAX_AGE_WOMEN) {
        requiredAgeAdjusted = MAX_AGE_WOMEN;
      }
    }
    if (gender === 'M') {
      const yearsSince2020 = Math.max(0, currentYear - year2020);
      requiredAgeAdjusted =
        BASE_AGE_MEN + yearsSince2020 * SIX_MONTHS_IN_YEARS_PERCENTUAL;
      if (requiredAgeAdjusted > BASE_AGE_MEN) {
        requiredAgeAdjusted = BASE_AGE_MEN;
      }
    }

    const totalContribution = this.convertToDecimalYears(
      calculatedTotals.years,
      calculatedTotals.months,
      calculatedTotals.days,
    );

    const totalCarenciaMonths = this.calculateTotalCarencia(data);

    const meetsAgeRequirement = age >= requiredAgeAdjusted;
    const meetsContributionRequirement =
      totalContribution >= REQUIRED_CONTRIBUTION_YEARS;
    const meetsCarenciaRequirement =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS;

    const isEligible =
      meetsAgeRequirement &&
      meetsContributionRequirement &&
      meetsCarenciaRequirement;

    const actualDate = new Date();

    const monthsToAge = meetsAgeRequirement
      ? 0
      : Math.ceil((requiredAgeAdjusted - age) * this.MONTHS_IN_YEAR);

    const monthsToContribution = meetsContributionRequirement
      ? 0
      : Math.ceil(
          (this.REQUIRED_CONTRIBUTION_WOMEN - totalContribution) *
            this.MONTHS_IN_YEAR,
        );
    const monthsToCarencia = meetsCarenciaRequirement
      ? 0
      : REQUIRED_CARENCIA_MONTHS - totalCarenciaMonths;

    let monthsToFulfill = Math.max(
      monthsToAge,
      monthsToContribution,
      monthsToCarencia,
    );

    let projectedFulfillmentDate: Date;
    if (
      birthDate &&
      !meetsAgeRequirement &&
      meetsContributionRequirement &&
      meetsCarenciaRequirement
    ) {
      const monthsToBirthDate =
        (birthDate.getFullYear() - actualDate.getFullYear()) *
          this.MONTHS_IN_YEAR +
        (birthDate.getMonth() - actualDate.getMonth());

      if (monthsToBirthDate > 0) {
        monthsToFulfill = Math.max(monthsToFulfill, monthsToBirthDate);
      }
      projectedFulfillmentDate = new Date(
        actualDate.getFullYear(),
        actualDate.getMonth() + monthsToFulfill,
        birthDate.getDate(),
      );
    } else {
      projectedFulfillmentDate = new Date(
        actualDate.getFullYear(),
        actualDate.getMonth() + monthsToFulfill,
        actualDate.getDate(),
      );
    }

    return {
      type: 'Aposentadoria por Idade Urbana - Regra de Transição - Emenda 103 art. 18',
      requiredAge: requiredAgeAdjusted,
      requiredContributionYears: REQUIRED_CONTRIBUTION_YEARS,
      requiredCarenciaMonths: REQUIRED_CARENCIA_MONTHS,
      totalContribution,
      totalCarenciaMonths,
      meetsAgeRequirement,
      meetsContributionRequirement,
      meetsCarenciaRequirement,
      isEligible,
      projectedFulfillmentDate,
    };
  }

  private aposentadoriaPorIdadeHibridaPrevistaNaRegraDeTransicaoDoArt18(
    data: ConsolidadoRelationInterface[],
    gender: string,
    age: number,
    birthDate: Date | undefined,
  ) {
    const REQUIRED_CARENCIA_MONTHS = 180;
    const BASE_AGE_MEN = 65;
    const BASE_AGE_WOMEN = 60;
    const MAX_AGE_WOMEN = 62;
    const REQUIRED_CONTRIBUTION_YEARS = 15;

    const requiredAge = gender === 'F' ? BASE_AGE_WOMEN : BASE_AGE_MEN;
    const calculatedTotals = this.calculateTotals(data);

    const currentYear = new Date().getFullYear();
    const year2020 = 2020;

    const SIX_MONTHS_IN_YEARS_PERCENTUAL = 0.5;

    let requiredAgeAdjusted = requiredAge;
    if (gender === 'F') {
      const yearsSince2020 = Math.max(0, currentYear - year2020);
      requiredAgeAdjusted = Math.min(
        requiredAge + yearsSince2020 * SIX_MONTHS_IN_YEARS_PERCENTUAL,
        MAX_AGE_WOMEN,
      );
    }
    if (gender === 'M') {
      const yearsSince2020 = Math.max(0, currentYear - year2020);
      requiredAgeAdjusted = Math.min(
        requiredAge + yearsSince2020 * SIX_MONTHS_IN_YEARS_PERCENTUAL,
        BASE_AGE_MEN,
      );
    }

    const existPeriodoSeguradoEspecial = data.some(
      (item) => item.origem === 'PERÍODO DE ATIVIDADE DE SEGURADO ESPECIAL',
    );
    if (!existPeriodoSeguradoEspecial) {
      return {
        type: 'Aposentadoria por Idade Híbrida - Regra de Transição - Emenda 103 art. 18',
        requiredAge: requiredAgeAdjusted,
        requiredContributionYears: REQUIRED_CONTRIBUTION_YEARS,
        requiredCarenciaMonths: REQUIRED_CARENCIA_MONTHS,
        totalContribution: 0,
        totalCarenciaMonths: 0,
        meetsAgeRequirement: false,
        meetsContributionRequirement: false,
        meetsCarenciaRequirement: false,
        isEligible: false,
        projectedFulfillmentDate: null,
      };
    }

    const totalContribution = this.convertToDecimalYears(
      calculatedTotals.years,
      calculatedTotals.months,
      calculatedTotals.days,
    );

    const totalCarenciaMonths = this.calculateTotalCarencia(data);

    const meetsAgeRequirement = age >= requiredAgeAdjusted;
    const meetsContributionRequirement =
      totalContribution >= REQUIRED_CONTRIBUTION_YEARS;
    const meetsCarenciaRequirement =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS;

    const isEligible =
      meetsAgeRequirement &&
      meetsContributionRequirement &&
      meetsCarenciaRequirement;

    const actualDate = new Date();

    const monthsToAge = meetsAgeRequirement
      ? 0
      : Math.ceil((requiredAgeAdjusted - age) * this.MONTHS_IN_YEAR);

    const monthsToContribution = meetsContributionRequirement
      ? 0
      : Math.ceil(
          (REQUIRED_CONTRIBUTION_YEARS - totalContribution) *
            this.MONTHS_IN_YEAR,
        );
    const monthsToCarencia = meetsCarenciaRequirement
      ? 0
      : REQUIRED_CARENCIA_MONTHS - totalCarenciaMonths;

    let monthsToFulfill = Math.max(
      monthsToAge,
      monthsToContribution,
      monthsToCarencia,
    );

    let projectedFulfillmentDate: Date;
    if (
      birthDate &&
      !meetsAgeRequirement &&
      meetsContributionRequirement &&
      meetsCarenciaRequirement
    ) {
      const monthsToBirthDate =
        (birthDate.getFullYear() - actualDate.getFullYear()) *
          this.MONTHS_IN_YEAR +
        (birthDate.getMonth() - actualDate.getMonth());

      if (monthsToBirthDate > 0) {
        monthsToFulfill = Math.max(monthsToFulfill, monthsToBirthDate);
      }
      projectedFulfillmentDate = new Date(
        actualDate.getFullYear(),
        actualDate.getMonth() + monthsToFulfill,
        birthDate.getDate(),
      );
    } else {
      projectedFulfillmentDate = new Date(
        actualDate.getFullYear(),
        actualDate.getMonth() + monthsToFulfill,
        actualDate.getDate(),
      );
    }
    return {
      type: 'Aposentadoria por Idade Híbrida - Regra de Transição - Emenda 103 art. 18',
      requiredAge: requiredAgeAdjusted,
      requiredContributionYears: REQUIRED_CONTRIBUTION_YEARS,
      requiredCarenciaMonths: REQUIRED_CARENCIA_MONTHS,
      totalContribution,
      totalCarenciaMonths,
      meetsAgeRequirement,
      meetsContributionRequirement,
      meetsCarenciaRequirement,
      isEligible,
      projectedFulfillmentDate,
    };
  }
}
