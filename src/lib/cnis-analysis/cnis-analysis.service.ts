import { Inject } from '@nestjs/common';
import moment from 'moment';

import { especiesData } from '@lib/cnis-analysis/data/especies-data';
import { indicadorsData } from '@lib/cnis-analysis/data/indicadors-data';
import { ipcaData } from '@lib/cnis-analysis/data/ipca';
import { TetoInssData } from '@lib/cnis-analysis/data/teto.inss';
import { AjusteFinalInterface } from '@lib/cnis-analysis/interface/ajuste-final.interface';
import { AnalysisServiceInterface } from '@lib/cnis-analysis/interface/analysis.interface';
import { CarenciaInterface } from '@lib/cnis-analysis/interface/carencia.interface';
import { ConcomitanciaDetalhesInterface } from '@lib/cnis-analysis/interface/concomitancia-detalhes.interface';
import { ConcomitanciaInterface } from '@lib/cnis-analysis/interface/concomitancia.interface';
import { ConsolidadoRelationInterface } from '@lib/cnis-analysis/interface/consolidado-relation.interface';
import { CorrecaoMonetariaItemInterface } from '@lib/cnis-analysis/interface/correcao-monetaria.interface';
import { IdadeInterface } from '@lib/cnis-analysis/interface/idade.interface';
import { CnisIndicadoresDePendenciaInterface } from '@lib/cnis-analysis/interface/indicadores-de-pendencia.interface';
import { ManutencaoInterface } from '@lib/cnis-analysis/interface/manutencao.interface';
import { PedagioInterface } from '@lib/cnis-analysis/interface/pedagio.interface';
import {
  PeriodoDeGracaResultInterface,
  PeriodoDeGracaScenarioInterface,
} from '@lib/cnis-analysis/interface/periodo-de-graca-result.interface';
import { SalariosConcomitantesInterface } from '@lib/cnis-analysis/interface/salario-concomitante.interface';
import { SalarioInterface } from '@lib/cnis-analysis/interface/salario.interface';
import {
  TempoComRestricaoItemInterface,
  TempoRestricoesContribuicaoTotalInterface,
  TempoTotalComRestricoesInterface,
} from '@lib/cnis-analysis/interface/tempo-total-com-restricoes.interface';
import { TetoInterface } from '@lib/cnis-analysis/interface/teto.interface';
import {
  TimeContributionDataInterface,
  TimeContributionInterface,
} from '@lib/cnis-analysis/interface/time-contribution.interface';
import { CnisOutputCompleteModel } from '@lib/cnis-analysis/model/output/cnis-output-complete.model';
import { CnisProcessorGateway } from '@lib/cnis-processor/cnis-processor.gateway';
import { CnisOutputModel } from '@lib/cnis-processor/model/output/cnis.output.model';
import { diffYmdInclusive } from '@shared/api/util/diff-ymd-inclusive';

export class CnisAnalysisService {
  protected readonly _type = CnisAnalysisService.name;

  private readonly MONTHS_IN_YEAR: number;
  private readonly DAYS_IN_YEAR: number;
  private readonly REQUIRED_CONTRIBUTION_MEN: number;
  private readonly REQUIRED_CONTRIBUTION_WOMEN: number;
  private readonly REFORMA_DATE: Date;
  private readonly CUTOFF_DATE: Date;
  private readonly DAYS_IN_MONTH: number;

  private readonly REFORMA_YEAR: number;
  private readonly REFORMA_MONTH: number;
  private readonly REFORMA_DAY: number;
  private readonly DECIMAL_PRECISION: number;
  private readonly EIGHTY_PERCENT: number;
  private readonly YEAR_1950: number;
  private readonly YEAR_2020: number;
  private readonly YEAR_2050: number;

  public constructor(
    @Inject(CnisProcessorGateway)
    private readonly cnisParserGateway: CnisProcessorGateway,
  ) {
    this.MONTHS_IN_YEAR = 12;
    this.DAYS_IN_YEAR = 365.25;
    this.REQUIRED_CONTRIBUTION_MEN = 35;
    this.REQUIRED_CONTRIBUTION_WOMEN = 30;
    this.REFORMA_YEAR = 2019;
    this.REFORMA_MONTH = 10;
    this.REFORMA_DAY = 13;
    this.DECIMAL_PRECISION = 6;
    this.EIGHTY_PERCENT = 0.8;
    this.YEAR_1950 = 1950;
    this.YEAR_2020 = 2020;
    this.YEAR_2050 = 2050;
    this.REFORMA_DATE = new Date(
      this.REFORMA_YEAR,
      this.REFORMA_MONTH,
      this.REFORMA_DAY,
    );
    this.CUTOFF_DATE = new Date('2019-11-13');
    this.DAYS_IN_MONTH = 30;
  }

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
        points,
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
        data.affiliateIdentification?.dataDeNascimento,
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
        data.affiliateIdentification?.dataDeNascimento,
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

    const aposentadoriaProgramadaComumPrevistaNoArt19 =
      this.aposentadoriaProgramadaComumPrevistaNoArt19(
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
      aposentadoriaProgramadaComumPrevistaNoArt19,
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

    const diasDeDuracao = (s: Date | null, e: Date | null): number => {
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
    const grupoProcessado: ConcomitanciaDetalhesInterface[] = [];
    grupoProcessado.push(vinculoPrincipal as ConcomitanciaDetalhesInterface);

    const secundariosAjustados: ConcomitanciaDetalhesInterface[] = [];

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
          tipo: 'secundario' as const,
          contributionTime: {
            ...orig.contributionTime,
            dataInicio: orig.contributionTime.dataInicio,
            dataFim: orig.contributionTime.dataFim,
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
        } as ConcomitanciaDetalhesInterface;
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
          tipo: 'secundario' as const,
          contributionTime: {
            ...orig.contributionTime,
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
        } as ConcomitanciaDetalhesInterface;
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
            tipo: 'secundario' as const,
            contributionTime: {
              ...orig.contributionTime,
              dataInicio: s,
              dataFim: antesFim,
            },
            ajustado: true,
            dataAjustada: {
              dataInicio: s,
              dataFim: antesFim,
            },
          } as ConcomitanciaDetalhesInterface;
          secundariosAjustados.push(parteAntes);
        }
        const depoisInicio = this.daysBeforeOrAfter(fimPrincipal, 'after');
        if (depoisInicio.getTime() <= e.getTime()) {
          const parteDepois = {
            ...orig,
            tipo: 'secundario' as const,
            contributionTime: {
              ...orig.contributionTime,
              dataInicio: depoisInicio,
              dataFim: e,
            },
            ajustado: true,
            dataAjustada: {
              dataInicio: depoisInicio,
              dataFim: e,
            },
          } as ConcomitanciaDetalhesInterface;
          secundariosAjustados.push(parteDepois);
        }
        // marcar o original como considerado (zerado) no grupo processado
        const zero = {
          ...orig,
          tipo: 'secundario' as const,
          contributionTime: {
            ...orig.contributionTime,
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
        } as ConcomitanciaDetalhesInterface;
        grupoProcessado.push(zero);
        continue;
      }

      // verificar se o intervalo ajustado ainda é válido
      if (novoInicio.getTime() <= novoFim.getTime()) {
        const ajustado = {
          ...orig,
          tipo: 'secundario' as const,
          contributionTime: {
            ...orig.contributionTime,
            dataInicio: novoInicio,
            dataFim: novoFim,
          },
          ajustado: true,
          dataAjustada: {
            dataInicio: novoInicio,
            dataFim: novoFim,
          },
        } as ConcomitanciaDetalhesInterface;
        grupoProcessado.push(ajustado);
        // coletar para reprocessamento, pois pode ainda sobrepor com itens seguintes
        secundariosAjustados.push(ajustado);
      } else {
        // nada resta após truncamento -> zerado
        const zero = {
          ...orig,
          tipo: 'secundario' as const,
          contributionTime: {
            ...orig.contributionTime,
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
        } as ConcomitanciaDetalhesInterface;
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
      const st = this.toDate(s.contributionTime.dataInicio);
      const en = this.toDate(s.contributionTime.dataFim);
      return st !== null && en !== null && st.getTime() <= en.getTime();
    });

    const proximaLista: ConcomitanciaDetalhesInterface[] = [
      ...ajustadosParaProximaRodada,
      ...restantes,
    ];

    // recursão com o próximo conjunto
    return this.calcularVinculosConcomitantes(proximaLista, resultadoFinal);
  }
  private getRequiredContributionAge(gender: string): number {
    return gender === 'F'
      ? this.REQUIRED_CONTRIBUTION_WOMEN
      : this.REQUIRED_CONTRIBUTION_MEN;
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
            this.daysBetween(startDate, effectiveEndDate) / this.DAYS_IN_MONTH,
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
    // Return a precise decimal number of years (do not round up),
    // to avoid inflating totals when summing multiple periods.
    const decimalYears =
      years + months / this.MONTHS_IN_YEAR + days / this.DAYS_IN_YEAR;
    return Number(decimalYears.toFixed(this.DECIMAL_PRECISION));
  }

  private daysBetween(dateStart?: Date | null, dateEnd?: Date | null): number {
    const millisecondsInSecond = 1000;
    const secondsInMinute = 60;
    const minutesInHour = 60;
    const hoursInDay = 24;
    const MS_PER_DAY =
      millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay;
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

  private calculateAge(birthDate?: Date): IdadeInterface {
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
      const indicadores = indicadoresArray.join(',').trim();
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
  ): CnisIndicadoresDePendenciaInterface[] {
    //   3.1. Cálculo do Impacto Líquido das Pendências:
    // Descrição: Somar o tempo e a carência de
    // todos os vínculos que possuem indicadores de pendência.
    // Fórmula/Lógica: Impacto = Soma(tempoCalculado
    // e carenciaCalculada de todos os vínculos com flag 'possuiPendencia = true').
    // Resultado: Um total de tempo (Xa Ym Zd) e carência (meses) "em risco".
    // Retornar por sequencia o impacto líquido das pendências
    const sequenciasComPendencia = data.filter((item) => item.isPendencia);
    const tempoTotal = sequenciasComPendencia.map((item) => {
      const startDate = item.contributionTime?.dataInicio;
      const endDate = item.contributionTime?.dataFim;
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
  ): ConsolidadoRelationInterface[] {
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

        const overlap =
          dataInicioItem <= dataFimBeneficio &&
          dataFimItem >= dataInicioBeneficio;

        if (overlap) {
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
  ): PeriodoDeGracaResultInterface {
    const NUMBER_MONTHS_THRESHOLD = 120;

    const buildScenario = (
      items: ConsolidadoRelationInterface[],
      typeLabel: string,
    ): PeriodoDeGracaScenarioInterface => {
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
            (current.start.getFullYear() - prevEnd.getFullYear()) *
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

    const itemsSorted = [...data].sort((a, b) => a.seq - b.seq);

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

  private calculateRequirementDateByAge(
    requiredAge: number,
    currentAge: number,
    birthDate?: Date | null,
  ): Date | null {
    if (birthDate instanceof Date && !isNaN(birthDate.getTime())) {
      return new Date(
        birthDate.getFullYear() + Math.floor(requiredAge),
        birthDate.getMonth(),
        birthDate.getDate(),
      );
    }

    // se não temos birthDate, estimativa: hoje + (requiredAge - currentAge) anos
    const diffYears = requiredAge - currentAge;
    const hoje = new Date();
    if (diffYears === 0) {
      return hoje;
    }
    // se diffYears < 0 significa que já passou (retorna hoje)
    if (diffYears < 0) {
      return hoje;
    }

    return new Date(
      hoje.getFullYear() + Math.ceil(diffYears),
      hoje.getMonth(),
      hoje.getDate(),
    );
  }

  private calculateContributionRequirementDate(
    data: ConsolidadoRelationInterface[],
    requiredYears: number,
  ): Date | null {
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    let accYears = 0;
    let accMonths = 0;
    let accDays = 0;

    const normalize = (): void => {
      if (accDays >= this.DAYS_IN_MONTH) {
        accMonths += Math.floor(accDays / this.DAYS_IN_MONTH);
        accDays = accDays % this.DAYS_IN_MONTH;
      }
      if (accMonths >= this.MONTHS_IN_YEAR) {
        accYears += Math.floor(accMonths / this.MONTHS_IN_YEAR);
        accMonths = accMonths % this.MONTHS_IN_YEAR;
      }
    };

    for (const item of data) {
      const v = item.validContributionTime ?? item.contributionTime;
      if (!v?.dataFim) {
        continue;
      }

      accYears += v.anos;
      accMonths += v.meses;
      accDays += v.dias;

      normalize();

      const totalDecimal =
        accYears +
        accMonths / this.MONTHS_IN_YEAR +
        accDays / this.DAYS_IN_YEAR;

      if (totalDecimal >= requiredYears) {
        return (
          (item.dataAjustada && this.toDate(item.dataAjustada.dataFim)) ??
          this.toDate(v.dataFim) ??
          null
        );
      }
    }

    return null;
  }

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
  ): TempoTotalComRestricoesInterface {
    const tempoComRestricaoItem = data
      .filter((item) => {
        const indicadores = item.indicadores ?? '';
        return (
          indicadores.includes('IREC-LC123') || indicadores.includes('IREC-MEI')
        );
      })
      .map<TempoComRestricaoItemInterface>((item) => ({
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
      }));

    if (tempoComRestricaoItem.length === 0) {
      return {
        tempoComRestricaoItem: [],
        tempoComRestricoesResumo: {
          carenciaTotal: 0,
          tempoTotalComRestricoesContribuicao: { dias: 0, meses: 0, anos: 0 },
        },
      };
    }

    const tempoTotalComRestricoesContribuicao =
      tempoComRestricaoItem.reduce<TempoRestricoesContribuicaoTotalInterface>(
        (acc, cur) => {
          const dias = acc.dias + (cur.validContributionTime?.dias ?? 0);
          const meses = acc.meses + (cur.validContributionTime?.meses ?? 0);
          const anos = acc.anos + (cur.validContributionTime?.anos ?? 0);

          let adjustedMeses = meses;
          let adjustedAnos = anos;

          if (adjustedMeses >= this.MONTHS_IN_YEAR) {
            adjustedAnos += Math.floor(adjustedMeses / this.MONTHS_IN_YEAR);
            adjustedMeses = adjustedMeses % this.MONTHS_IN_YEAR;
          }

          return {
            dias,
            meses: adjustedMeses,
            anos: adjustedAnos,
          };
        },
        { dias: 0, meses: 0, anos: 0 },
      );

    const carenciaTotal = tempoComRestricaoItem.reduce(
      (acc, cur) => acc + (cur.carencia ?? 0),
      0,
    );

    return {
      tempoComRestricaoItem,
      tempoComRestricoesResumo: {
        carenciaTotal,
        tempoTotalComRestricoesContribuicao,
      },
    };
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
    const COMPETENCIA_YEAR_START = 0;
    const COMPETENCIA_YEAR_END = 4;
    const COMPETENCIA_MONTH_START = 5;
    const COMPETENCIA_MONTH_END = 7;

    return data.map((item) => {
      const competenciaFormatted =
        item.competencia.slice(COMPETENCIA_MONTH_START, COMPETENCIA_MONTH_END) +
        '/' +
        item.competencia.slice(COMPETENCIA_YEAR_START, COMPETENCIA_YEAR_END);
      const fatorData = ipcaData.find(
        (f) => f.competencia === competenciaFormatted,
      );
      const fatorCorrecao = fatorData ? fatorData.fatorSimplificado : 1;

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
    const YEAR_1994 = 1994;
    const MONTH_JULY = 6;
    const DAY_FIRST = 1;

    const salariosValidos = data.filter((item) => {
      const competenciaDate = new Date(item.competencia);
      return (
        competenciaDate instanceof Date &&
        !isNaN(competenciaDate.getTime()) &&
        competenciaDate >= new Date(YEAR_1994, MONTH_JULY, DAY_FIRST)
      );
    });

    const somaValoresCorrigidos = salariosValidos.reduce(
      (acc, cur) => acc + cur.valorCorrigido,
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
    const MONTH_JULY = 6;
    const DAY_FIRST = 1;

    const salariosValidos = data.filter((item) => {
      const competenciaDate = new Date(item.competencia);
      return (
        competenciaDate instanceof Date &&
        !isNaN(competenciaDate.getTime()) &&
        competenciaDate >= new Date(YEAR_1994, MONTH_JULY, DAY_FIRST)
      );
    });

    const valoresCorrigidosOrdenados = salariosValidos
      .map((item) => item.valorCorrigido)
      .sort((a, b) => a - b);

    const numeroTotal = valoresCorrigidosOrdenados.length;
    const numeroParaConsiderar = Math.ceil(numeroTotal * this.EIGHTY_PERCENT);
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
  ): AjusteFinalInterface {
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

  private calculateTotals(data: ConsolidadoRelationInterface[]): {
    years: number;
    months: number;
    days: number;
    totalInYears: number;
    carencia: number;
  } {
    const years = data.reduce((acc, cur) => {
      const anos = cur.validContributionTime?.anos ?? 0;
      return acc + anos;
    }, 0);

    const months = data.reduce(
      (acc, cur) => acc + (cur.validContributionTime?.meses ?? 0),
      0,
    );

    const days = data.reduce(
      (acc, cur) => acc + (cur.validContributionTime?.dias ?? 0),
      0,
    );

    const carencia = data.reduce((acc, cur) => acc + (cur.carencia ?? 0), 0);

    const totalInYears = Math.floor(
      years + months / this.MONTHS_IN_YEAR + days / this.DAYS_IN_YEAR,
    );

    return { years, months, days, totalInYears, carencia };
  }

  private calculatePontos(
    idade: number,
    data: ConsolidadoRelationInterface[],
  ): number {
    const calculatedTotals = this.calculateTotals(data);

    const pontos = idade + calculatedTotals.totalInYears;

    return pontos;
  }

  // private calculatePointsRequirementDate(
  //   data: ConsolidadoRelationInterface[],
  //   requiredPoints: number,
  //   age: number,
  // ): Date | null {
  //   if (!Array.isArray(data) || data.length === 0) {
  //     return null;
  //   }

  //   for (const item of data) {
  //     const v = item.validContributionTime ?? item.contributionTime;
  //     if (!v) continue;

  //     const end =
  //       (item.dataAjustada && this.toDate(item.dataAjustada.dataFim)) ??
  //       this.toDate(v.dataFim);

  //     if (!end) continue;

  //     const years = this.convertToDecimalYears(v.anos, v.meses, v.dias);
  //     const points = age + years;

  //     if (points >= requiredPoints) {
  //       return end;
  //     }
  //   }

  //   return null;
  // }

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

  private calculateCarenciaRequirementDate(
    data: ConsolidadoRelationInterface[],
    requiredCarenciaMonths: number,
  ): Date | null {
    let accumulated = 0;

    for (const item of data) {
      const value = item.carencia ?? 0;

      if (value > 0) {
        accumulated += value;
      }

      if (accumulated >= requiredCarenciaMonths) {
        return item.dataAjustada?.dataFim
          ? this.toDate(item.dataAjustada.dataFim)
          : null;
      }
    }

    return null;
  }

  private calculatePointsRequirementDate(
    totals: { years: number; months: number; days: number },
    age: number,
    requiredPoints: number,
  ): Date | null {
    const today = new Date();

    const currentPoints =
      totals.years +
      totals.months / this.MONTHS_IN_YEAR +
      totals.days / this.DAYS_IN_YEAR +
      age;

    if (currentPoints >= requiredPoints) {
      // Encontrar quando atingiu, voltando mês a mês
      const cursor = new Date(today.getFullYear(), today.getMonth(), 1);
      let tempAge = age;
      let tempContributionYears =
        totals.years +
        totals.months / this.MONTHS_IN_YEAR +
        totals.days / this.DAYS_IN_YEAR;

      const birthMonth =
        (today.getMonth() -
          (Math.floor(age * this.MONTHS_IN_YEAR) % this.MONTHS_IN_YEAR) +
          this.MONTHS_IN_YEAR) %
        this.MONTHS_IN_YEAR;

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      while (true) {
        // Reverte um mês
        cursor.setMonth(cursor.getMonth() - 1);

        // Recalcula contribuição
        tempContributionYears -= 1 / this.MONTHS_IN_YEAR;

        // Recalcula idade somente se retroceder do pós-aniversário para o pré-aniversário
        if (cursor.getMonth() === birthMonth && cursor.getDate() === 1) {
          tempAge -= 1;
        }

        const points = tempContributionYears + tempAge;
        if (points < requiredPoints) {
          // Atingiu no mês seguinte
          cursor.setMonth(cursor.getMonth() + 1);
          return cursor;
        }

        if (cursor.getFullYear() < this.YEAR_1950) {
          return null;
        }
      }
    }

    // Caso ainda não tenha atingido, simula avanço mês a mês
    const cursor = new Date(today.getFullYear(), today.getMonth(), 1);
    let tempAge = age;
    let tempContributionYears =
      totals.years +
      totals.months / this.MONTHS_IN_YEAR +
      totals.days / this.DAYS_IN_YEAR;

    const birthDate = new Date(
      today.getFullYear() - age,
      today.getMonth(),
      today.getDate(),
    );

    while (tempContributionYears + tempAge < requiredPoints) {
      // Avança um mês
      cursor.setMonth(cursor.getMonth() + 1);

      // Aumenta contribuição
      tempContributionYears += 1 / this.MONTHS_IN_YEAR;

      // Aumenta idade no aniversário
      if (
        cursor.getMonth() === birthDate.getMonth() &&
        cursor.getDate() === birthDate.getDate()
      ) {
        tempAge += 1;
      }

      if (cursor.getFullYear() > this.YEAR_2050) {
        break;
      }
    }

    return cursor;
  }

  private aposentadoriaPorTempoDeContribuicaoComDireitoAdquirido(
    data: ConsolidadoRelationInterface[],
    gender: string,
    points: number,
  ): AnalysisServiceInterface {
    const REQUIRED_CARENCIA_MONTHS = 180;
    const POINTS_MEN = 96;
    const POINTS_WOMEN = 86;

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
        dataInicio,
        dataFim,
        abreviado: `${years}a ${months}m ${days}d`,
        dias: days,
        meses: months,
        anos: years,
      };
    });

    const totals = this.calculateTotals(data);

    const totalCarenciaMonths = this.calculateTotalCarencia(data);
    const requiredPoints = gender === 'F' ? POINTS_WOMEN : POINTS_MEN;

    const meetsContributionRequirement =
      totals.totalInYears >= requiredContributionYears;

    const meetsCarenciaRequirement =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS;

    const meetsPointsRequirement = points >= requiredPoints;

    const isEligible =
      meetsContributionRequirement &&
      meetsCarenciaRequirement &&
      meetsPointsRequirement;

    // -------------------------------------------------------------------
    // REQUIREMENT DATES (real, não hoje)
    // -------------------------------------------------------------------

    const contributionRequirementDate = meetsContributionRequirement
      ? this.calculateContributionRequirementDate(
          data,
          requiredContributionYears,
        )
      : null;

    const carenciaRequirementDate = this.calculateCarenciaRequirementDate(
      data,
      REQUIRED_CARENCIA_MONTHS,
    );

    const pointsRequirementDate = meetsPointsRequirement
      ? (data.find((item) => item.validContributionTime?.dataFim)
          ?.validContributionTime?.dataFim ?? null)
      : null;

    // -------------------------------------------------------------------
    // ELIGIBILITY DATE — mesma regra do Art. 17
    // -------------------------------------------------------------------

    let eligibilityDate: Date | null = null;

    if (isEligible) {
      const dates = [
        contributionRequirementDate,
        carenciaRequirementDate,
        pointsRequirementDate,
      ].filter((d): d is Date => d instanceof Date);

      if (dates.length > 0) {
        eligibilityDate = new Date(Math.max(...dates.map((d) => d.getTime())));
      }
    }

    // -------------------------------------------------------------------
    // PROJECTED FULFILLMENT DATE
    // -------------------------------------------------------------------

    const today = new Date();

    const monthsToContribution = meetsContributionRequirement
      ? 0
      : Math.ceil(
          (requiredContributionYears - totals.totalInYears) *
            this.MONTHS_IN_YEAR,
        );

    const monthsToCarencia = meetsCarenciaRequirement
      ? 0
      : REQUIRED_CARENCIA_MONTHS - totalCarenciaMonths;

    const monthsToPoints = meetsPointsRequirement
      ? 0
      : Math.ceil((requiredPoints - points) * this.MONTHS_IN_YEAR);

    const monthsToFulfill = Math.max(
      monthsToContribution,
      monthsToCarencia,
      monthsToPoints,
    );

    const projectedFulfillmentDate =
      eligibilityDate ??
      new Date(
        today.getFullYear(),
        today.getMonth() + monthsToFulfill,
        today.getDate(),
      );

    const finalProjectedFulfillmentDate = eligibilityDate
      ? null
      : projectedFulfillmentDate;

    // -------------------------------------------------------------------
    // FINAL RESULT
    // -------------------------------------------------------------------

    return {
      type: 'Aposentadoria por Tempo de Contribuição com Direito Adquirido',
      totalCarenciaMonths,
      points,
      requirements: {
        meetsContributionRequirement,
        meetsCarenciaRequirement,
        meetsPointsRequirement,
        requiredCarenciaMonths: REQUIRED_CARENCIA_MONTHS,
        requiredContributionYears,
        requiredPoints,
      },
      eligibility: {
        isEligible,
        eligibilityDate,
        projectedFulfillmentDate: finalProjectedFulfillmentDate,
      },
    };
  }

  private aposentadoriaPorIdadeUrbanaComDireitoAdquirido(
    data: ConsolidadoRelationInterface[],
    gender: string,
    age: number,
  ): AnalysisServiceInterface {
    const REQUIRED_CARENCIA_MONTHS = 180;
    const REQUIRED_AGE_MEN = 65;
    const REQUIRED_AGE_WOMEN = 60;

    const requiredAge = gender === 'F' ? REQUIRED_AGE_WOMEN : REQUIRED_AGE_MEN;
    const CUTOFF_DATE = new Date('2019-11-13');

    // ---------------------------------------------------------
    // Ajuste de períodos (mesma lógica já existente)
    // ---------------------------------------------------------
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
        dataInicio,
        dataFim,
        abreviado: `${years}a ${months}m ${days}d`,
        dias: days,
        meses: months,
        anos: years,
      };
    });

    // ---------------------------------------------------------
    // Totais
    // ---------------------------------------------------------
    const totalCarenciaMonths = this.calculateTotalCarencia(data);

    // ---------------------------------------------------------
    // Requisitos
    // ---------------------------------------------------------
    const meetsAgeRequirement = age >= requiredAge;
    const meetsCarenciaRequirement =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS;

    // ---------------------------------------------------------
    // DATA REAL EM QUE CADA REQUISITO FOI ATINGIDO
    // ---------------------------------------------------------

    // 1) Data em que atingiu a idade (real, não hoje)
    const ageRequirementDate = meetsAgeRequirement
      ? this.calculateRequirementDateByAge(requiredAge, age)
      : null;

    // 2) Data em que atingiu a carência (real)
    const carenciaRequirementDate = this.calculateCarenciaRequirementDate(
      data,
      REQUIRED_CARENCIA_MONTHS,
    );

    // ---------------------------------------------------------
    // Eligibility Date — mesma regra do Art. 17
    // ---------------------------------------------------------
    const isEligible = meetsAgeRequirement && meetsCarenciaRequirement;

    let eligibilityDate: Date | null = null;

    if (isEligible) {
      const dates = [ageRequirementDate, carenciaRequirementDate].filter(
        (d): d is Date => d instanceof Date,
      );

      if (dates.length > 0) {
        eligibilityDate = new Date(Math.max(...dates.map((d) => d.getTime())));
      }
    }

    // ---------------------------------------------------------
    // PROJECTED FULFILLMENT DATE
    // ---------------------------------------------------------
    const today = new Date();

    const monthsToAge = meetsAgeRequirement
      ? 0
      : (requiredAge - age) * this.MONTHS_IN_YEAR;

    const monthsToCarencia = meetsCarenciaRequirement
      ? 0
      : REQUIRED_CARENCIA_MONTHS - totalCarenciaMonths;

    const monthsToFulfill = Math.max(monthsToAge, monthsToCarencia);

    const projectedFulfillmentDate =
      eligibilityDate ??
      new Date(
        today.getFullYear(),
        today.getMonth() + monthsToFulfill,
        today.getDate(),
      );

    const finalProjectedFulfillmentDate = eligibilityDate
      ? null
      : projectedFulfillmentDate;

    // ---------------------------------------------------------
    // RESULTADO
    // ---------------------------------------------------------
    return {
      type: 'Aposentadoria por Idade Urbana com Direito Adquirido',
      age,
      totalCarenciaMonths,
      requirements: {
        meetsAgeRequirement,
        meetsCarenciaRequirement,
        requiredAge,
        requiredCarenciaMonths: REQUIRED_CARENCIA_MONTHS,
      },
      eligibility: {
        isEligible,
        eligibilityDate,
        projectedFulfillmentDate: finalProjectedFulfillmentDate,
      },
    };
  }

  private aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoArt15(
    data: ConsolidadoRelationInterface[],
    gender: string,
    age: number,
  ): AnalysisServiceInterface {
    const REQUIRED_CARENCIA_MONTHS = 180;
    const BASE_POINTS_MEN = 96;
    const BASE_POINTS_WOMEN = 86;
    const MAX_POINTS_MEN = 105;
    const MAX_POINTS_WOMEN = 100;

    const requiredContributionYears = this.getRequiredContributionAge(gender);

    const basePoints = gender === 'F' ? BASE_POINTS_WOMEN : BASE_POINTS_MEN;
    const maxPoints = gender === 'F' ? MAX_POINTS_WOMEN : MAX_POINTS_MEN;

    const totals = this.calculateTotals(data);
    const totalCarenciaMonths = this.calculateTotalCarencia(data);

    const currentYear = new Date().getFullYear();
    const requiredPoints = Math.min(
      basePoints + Math.max(0, currentYear - this.YEAR_2020),
      maxPoints,
    );

    const pontos = this.calculatePontos(age, data);

    const meetsContributionRequirement =
      totals.totalInYears >= requiredContributionYears;

    const meetsCarenciaRequirement =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS;

    const meetsPointsRequirement = pontos >= requiredPoints;

    const contributionRequirementDate = meetsContributionRequirement
      ? this.calculateContributionRequirementDate(
          data,
          requiredContributionYears,
        )
      : null;

    const carenciaRequirementDate = this.calculateCarenciaRequirementDate(
      data,
      REQUIRED_CARENCIA_MONTHS,
    );

    const pointsRequirementDate = this.calculatePointsRequirementDate(
      totals,
      age,
      requiredPoints,
    );

    const actualDate = new Date();

    const monthsToContribution = meetsContributionRequirement
      ? 0
      : this.monthsRemainingForContribution(
          totals.years,
          totals.months,
          totals.days,
          requiredContributionYears,
        );

    const monthsToCarencia = meetsCarenciaRequirement
      ? 0
      : REQUIRED_CARENCIA_MONTHS - totalCarenciaMonths;

    const monthsToPoints = meetsPointsRequirement
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

    const allRequirementsMet =
      meetsContributionRequirement &&
      meetsCarenciaRequirement &&
      meetsPointsRequirement;

    let eligibilityDate: Date | null = null;

    if (allRequirementsMet) {
      const dates = [
        contributionRequirementDate,
        carenciaRequirementDate,
        pointsRequirementDate,
      ].filter((d): d is Date => d instanceof Date);

      eligibilityDate =
        dates.length > 0
          ? new Date(Math.max(...dates.map((d) => d.getTime())))
          : null;
    }

    const finalProjectedFulfillmentDate = eligibilityDate
      ? null
      : projectedFulfillmentDate;

    return {
      type: 'Aposentadoria por Tempo de Contribuição - Regra de Transição - Emenda 103 art. 15',
      totalContributionYears: totals.totalInYears,
      totalCarenciaMonths,
      points: pontos,
      age,

      requirements: {
        requiredContributionYears,
        requiredCarenciaMonths: REQUIRED_CARENCIA_MONTHS,
        requiredPoints,
        meetsContributionRequirement,
        meetsCarenciaRequirement,
        meetsPointsRequirement,
        reachedContributionRequirementDate: contributionRequirementDate,
        reachedCarenciaRequirementDate: carenciaRequirementDate,
        reachedPointsRequirementDate: pointsRequirementDate,
      },

      eligibility: {
        isEligible: eligibilityDate !== null,
        eligibilityDate,
        projectedFulfillmentDate: finalProjectedFulfillmentDate,
      },
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
  ): number {
    const calculatedTotals = this.calculateTotals(consolidadoResumido);

    const totalContribution = this.convertToDecimalYears(
      calculatedTotals.years,
      calculatedTotals.months,
      calculatedTotals.days,
    );

    const totalContributionFinal = Math.floor(totalContribution);

    return totalContributionFinal;
  }

  private aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt20(
    data: ConsolidadoRelationInterface[],
    age: number,
    gender: string,
    birthDate?: Date,
  ): AnalysisServiceInterface {
    const REQUIRED_AGE_WOMEN = 57;
    const REQUIRED_AGE_MEN = 60;
    const REQUIRED_CARENCIA_MONTHS = 180;
    const PEDAGIO_PERCENTAGE = 1;

    const requiredAge = gender === 'F' ? REQUIRED_AGE_WOMEN : REQUIRED_AGE_MEN;
    const requiredContribution = this.getRequiredContributionAge(gender);

    const totalContribution = this.totalContributionType(data);

    const pedagioData = this.calculateTempoPedagio(
      data,
      gender,
      PEDAGIO_PERCENTAGE,
    );

    const totalCarenciaMonths = this.calculateTotalCarencia(data);

    const meetsAgeRequirement = age >= requiredAge;
    const meetsContributionRequirement =
      totalContribution >= pedagioData.tempoTotalNecessario;
    const meetsCarenciaRequirement =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS;

    const actualDate = new Date();

    const ageRequirementDate = meetsAgeRequirement
      ? this.calculateRequirementDateByAge(requiredAge, age, birthDate)
      : this.calculateRequirementDateByAge(requiredAge, age, birthDate);

    const contributionRequirementDate = meetsContributionRequirement
      ? this.calculateContributionRequirementDate(
          data,
          pedagioData.tempoTotalNecessario,
        )
      : null;

    const carenciaRequirementDate = this.calculateCarenciaRequirementDate(
      data,
      REQUIRED_CARENCIA_MONTHS,
    );

    const monthsToAge = meetsAgeRequirement
      ? 0
      : Math.ceil((requiredAge - age) * this.MONTHS_IN_YEAR);

    const monthsToContribution = meetsContributionRequirement
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
      meetsContributionRequirement &&
      meetsCarenciaRequirement;

    let eligibilityDate: Date | null = null;

    if (isEligible) {
      const dates = [
        ageRequirementDate,
        contributionRequirementDate,
        carenciaRequirementDate,
      ].filter((d): d is Date => d instanceof Date);

      eligibilityDate =
        dates.length > 0
          ? new Date(Math.max(...dates.map((d) => d.getTime())))
          : null;
    }

    const finalProjectedFulfillmentDate = eligibilityDate
      ? null
      : projectedFulfillmentDate;

    return {
      type: 'Aposentadoria por Tempo de Contribuição com base na Regra de Transição do art. 20',
      age,
      gender,
      requirements: {
        requiredAge,
        requiredContributionYears: requiredContribution,
        requiredCarenciaMonths: REQUIRED_CARENCIA_MONTHS,
        meetsAgeRequirement,
        meetsContributionRequirement,
        meetsCarenciaRequirement,
        reachedAgeRequirementDate: ageRequirementDate,
        reachedContributionRequirementDate: contributionRequirementDate,
        reachedCarenciaRequirementDate: carenciaRequirementDate,
      },
      totalContributionYears: totalContribution,
      totalContributionYearsAtReforma: pedagioData.totalContributionAtReforma,
      totalCarenciaMonths,
      eligibility: {
        eligibilityDate,
        projectedFulfillmentDate: finalProjectedFulfillmentDate,
        isEligible,
      },
    };
  }

  private aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt16(
    data: ConsolidadoRelationInterface[],
    gender: string,
    age: number,
  ): AnalysisServiceInterface {
    const REQUIRED_CARENCIA_MONTHS = 180;
    const BASE_AGE_MEN = 61;
    const BASE_AGE_WOMEN = 56;
    const MAX_AGE_MEN = 65;
    const MAX_AGE_WOMEN = 62;
    const PEDAGIO_PERCENTAGE = 0.5;
    const YEARS_INCREASE_START = 2020;

    const requiredContributionYears =
      gender === 'F'
        ? this.REQUIRED_CONTRIBUTION_WOMEN
        : this.REQUIRED_CONTRIBUTION_MEN;

    const baseAge = gender === 'F' ? BASE_AGE_WOMEN : BASE_AGE_MEN;
    const maxAge = gender === 'F' ? MAX_AGE_WOMEN : MAX_AGE_MEN;

    const totals = this.calculateTotals(data);

    const totalContributionDecimal = this.convertToDecimalYears(
      totals.years,
      totals.months,
      totals.days,
    );

    const currentYear = new Date().getFullYear();
    const yearsSince2020 = Math.max(0, currentYear - YEARS_INCREASE_START);

    let requiredAge = baseAge + yearsSince2020 * PEDAGIO_PERCENTAGE;
    if (requiredAge > maxAge) {
      requiredAge = maxAge;
    }

    const meetsContributionRequirement =
      totalContributionDecimal >= requiredContributionYears;

    const meetsCarenciaRequirement =
      totals.carencia >= REQUIRED_CARENCIA_MONTHS;

    const meetsAgeRequirement = age >= requiredAge;

    const ageRequirementDate = meetsAgeRequirement
      ? this.calculateRequirementDateByAge(requiredAge, age)
      : null;

    const contributionRequirementDate = meetsContributionRequirement
      ? this.calculateContributionRequirementDate(
          data,
          requiredContributionYears,
        )
      : null;

    const carenciaRequirementDate = this.calculateCarenciaRequirementDate(
      data,
      REQUIRED_CARENCIA_MONTHS,
    );

    const eligibilityDate =
      meetsAgeRequirement &&
      meetsContributionRequirement &&
      meetsCarenciaRequirement
        ? ((): Date | null => {
            const dates = [
              ageRequirementDate,
              contributionRequirementDate,
              carenciaRequirementDate,
            ].filter((d): d is Date => d instanceof Date);

            return dates.length > 0
              ? new Date(Math.max(...dates.map((d) => d.getTime())))
              : null;
          })()
        : null;

    const monthsToContribution = meetsContributionRequirement
      ? 0
      : this.monthsRemainingForContribution(
          totals.years,
          totals.months,
          totals.days,
          requiredContributionYears,
        );

    const monthsToCarencia = meetsCarenciaRequirement
      ? 0
      : REQUIRED_CARENCIA_MONTHS - totals.carencia;

    const monthsToAge = meetsAgeRequirement
      ? 0
      : Math.ceil((requiredAge - age) * this.MONTHS_IN_YEAR);

    const monthsToFulfill = Math.max(
      monthsToContribution,
      monthsToCarencia,
      monthsToAge,
    );

    const projectedFulfillmentDate =
      eligibilityDate ??
      new Date(
        currentYear,
        new Date().getMonth() + monthsToFulfill,
        new Date().getDate(),
      );

    return {
      type: 'Aposentadoria por Tempo de Contribuição - Regra de Transição - Emenda 103 art. 16',
      totalContributionYears: totals.totalInYears,
      totalCarenciaMonths: totals.carencia,
      age,

      requirements: {
        requiredContributionYears,
        requiredCarenciaMonths: REQUIRED_CARENCIA_MONTHS,
        requiredAge,
        meetsContributionRequirement,
        meetsCarenciaRequirement,
        meetsAgeRequirement,

        reachedContributionRequirementDate: contributionRequirementDate,
        reachedCarenciaRequirementDate: carenciaRequirementDate,
        reachedAgeRequirementDate: ageRequirementDate,
      },

      eligibility: {
        isEligible: eligibilityDate !== null,
        eligibilityDate,
        projectedFulfillmentDate: eligibilityDate
          ? null
          : projectedFulfillmentDate,
      },
    };
  }

  private aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt17(
    consolidadoResumido: ConsolidadoRelationInterface[],
    gender: string,
    age: number,
  ): AnalysisServiceInterface {
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

    const contributionRequirementDate = meetsContributionTimeRequirement
      ? this.calculateContributionRequirementDate(
          consolidadoResumido,
          pedagioData.tempoTotalNecessario,
        )
      : null;

    const carenciaRequirementDate = this.calculateCarenciaRequirementDate(
      consolidadoResumido,
      REQUIRED_CARENCIA_MONTHS,
    );

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

    let eligibilityDate: Date | null = null;

    if (isEligible) {
      const dates = [
        contributionRequirementDate,
        carenciaRequirementDate,
      ].filter((d): d is Date => d instanceof Date);

      if (dates.length > 0) {
        eligibilityDate = new Date(Math.max(...dates.map((d) => d.getTime())));
      }
    }

    const finalProjectedFulfillmentDate = eligibilityDate
      ? null
      : projectedFulfillmentDate;

    return {
      type: 'Aposentadoria por Tempo de Contribuição com base na Regra de Transição do art. 17',
      age,
      gender,
      totalContributionYears: totalContribution,
      totalContributionYearsAtReforma: pedagioData.totalContributionAtReforma,
      totalCarenciaMonths,
      requirements: {
        requiredContributionYears: requiredContribution,
        requiredCarenciaMonths: REQUIRED_CARENCIA_MONTHS,
        meetsContributionRequirement: meetsContributionTimeRequirement,
        meetsCarenciaRequirement,
      },
      eligibility: {
        isEligible,
        eligibilityDate,
        projectedFulfillmentDate: finalProjectedFulfillmentDate,
      },
    };
  }

  private aposentadoriaPorIdadeHibridaComDireitoAdquirido(
    data: ConsolidadoRelationInterface[],
    gender: string,
    age: number,
    birthDate?: Date,
  ): AnalysisServiceInterface {
    if (!birthDate) {
      throw new Error('birthDate is required for this calculation.');
    }

    const REQUIRED_CARENCIA_MONTHS = 180;
    const REQUIRED_AGE_MEN = 65;
    const REQUIRED_AGE_WOMEN = 60;

    const cutoff = this.CUTOFF_DATE;
    const requiredAge = gender === 'F' ? REQUIRED_AGE_WOMEN : REQUIRED_AGE_MEN;

    const hasSeguradoEspecial = data.some(
      (item) =>
        item.origem === 'PERÍODO DE ATIVIDADE DE SEGURADO ESPECIAL' &&
        typeof item.tipo === 'string' &&
        item.tipo.toUpperCase() === 'SEGURADO ESPECIAL',
    );

    if (!hasSeguradoEspecial) {
      return {
        type: 'Aposentadoria por Idade Híbrida com Direito Adquirido',
        age,
        totalCarenciaMonths: 0,
        requirements: {
          meetsAgeRequirement: false,
          meetsCarenciaRequirement: false,
        },
        eligibility: {
          isEligible: false,
          projectedFulfillmentDate: null,
          eligibilityDate: null,
        },
      };
    }

    // Ajuste dos períodos ao cutoff
    data.forEach((item) => {
      const inicio = this.toDate(item.validContributionTime?.dataInicio);
      let fim = this.toDate(item.validContributionTime?.dataFim);

      if (!inicio) {
        return;
      }

      if (!fim || fim > cutoff) {
        fim = cutoff;
      }

      if (inicio >= cutoff) {
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

      const { years, months, days } = diffYmdInclusive(inicio, fim);

      item.validContributionTime = {
        dataInicio: inicio,
        dataFim: fim,
        abreviado: `${years}a ${months}m ${days}d`,
        dias: days,
        meses: months,
        anos: years,
      };
    });

    const totalCarenciaMonths = this.calculateTotalCarencia(data, cutoff);

    const meetsAgeRequirement = age >= requiredAge;
    const meetsCarenciaRequirement =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS;

    const isEligible = meetsAgeRequirement && meetsCarenciaRequirement;

    const ageCompletionDate = new Date(
      birthDate.getFullYear() + requiredAge,
      birthDate.getMonth(),
      birthDate.getDate(),
    );

    // Carência é sempre até a data de corte
    const carenciaCompletionDate = cutoff;

    let eligibilityDate: Date | null = null;

    if (isEligible) {
      eligibilityDate =
        ageCompletionDate > carenciaCompletionDate
          ? ageCompletionDate
          : carenciaCompletionDate;
    }

    return {
      type: 'Aposentadoria por Idade Híbrida com Direito Adquirido',
      age,
      totalCarenciaMonths,
      requirements: {
        requiredAge,
        requiredCarenciaMonths: REQUIRED_CARENCIA_MONTHS,
        meetsAgeRequirement,
        meetsCarenciaRequirement,
      },
      eligibility: {
        isEligible,
        eligibilityDate,
        projectedFulfillmentDate: null,
      },
    };
  }

  private aposentadoriaPorIdadeUrbanaPrevistaNaRegraDeTransicaoDoArt18(
    data: ConsolidadoRelationInterface[],
    gender: string,
    age: number,
    birthDate: Date | undefined,
  ): AnalysisServiceInterface {
    const REQUIRED_CARENCIA_MONTHS = 180;
    const BASE_AGE_MEN = 65;
    const BASE_AGE_WOMEN = 60;
    const MAX_AGE_WOMEN = 62;
    const REQUIRED_CONTRIBUTION_YEARS = 15;
    const HALF_YEAR_AS_DECIMAL = 0.5;
    const YEARS_INCREASE_START = 2020;

    const currentYear = new Date().getFullYear();
    const yearsSince2020 = Math.max(0, currentYear - YEARS_INCREASE_START);

    let requiredAge = gender === 'F' ? BASE_AGE_WOMEN : BASE_AGE_MEN;

    if (gender === 'F') {
      requiredAge = BASE_AGE_WOMEN + yearsSince2020 * HALF_YEAR_AS_DECIMAL;
      if (requiredAge > MAX_AGE_WOMEN) {
        requiredAge = MAX_AGE_WOMEN;
      }
    }

    if (gender === 'M') {
      requiredAge = BASE_AGE_MEN;
    }

    const totals = this.calculateTotals(data);
    const totalContribution = this.convertToDecimalYears(
      totals.years,
      totals.months,
      totals.days,
    );
    const totalCarenciaMonths = this.calculateTotalCarencia(data);

    // ---- Requisitos ----
    const meetsAgeRequirement = age >= requiredAge;
    const meetsContributionRequirement =
      totalContribution >= REQUIRED_CONTRIBUTION_YEARS;
    const meetsCarenciaRequirement =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS;

    const allRequirementsMet =
      meetsAgeRequirement &&
      meetsContributionRequirement &&
      meetsCarenciaRequirement;

    const ageRequirementDate = birthDate
      ? new Date(
          birthDate.getFullYear() + requiredAge,
          birthDate.getMonth(),
          birthDate.getDate(),
        )
      : null;

    const contributionRequirementDate = ((): Date | null => {
      let accYears = 0;
      let accMonths = 0;
      let accDays = 0;

      const add = (v: TimeContributionDataInterface): void => {
        accYears += v.anos;
        accMonths += v.meses;
        accDays += v.dias;

        if (accDays >= this.DAYS_IN_MONTH) {
          accMonths += Math.floor(accDays / this.DAYS_IN_MONTH);
          accDays %= this.DAYS_IN_MONTH;
        }
        if (accMonths >= this.MONTHS_IN_YEAR) {
          accYears += Math.floor(accMonths / this.MONTHS_IN_YEAR);
          accMonths %= this.MONTHS_IN_YEAR;
        }
      };

      for (const item of data) {
        const v = item.validContributionTime;
        if (!v) {
          continue;
        }

        add(v);

        const totalDecimal =
          accYears +
          accMonths / this.MONTHS_IN_YEAR +
          accDays / this.DAYS_IN_YEAR;

        if (totalDecimal >= REQUIRED_CONTRIBUTION_YEARS) {
          return item.dataAjustada?.dataFim ?? v.dataFim ?? null;
        }
      }

      return null;
    })();

    const carenciaRequirementDate = ((): Date | null => {
      let acc = 0;

      for (const item of data) {
        const c = item.carencia ?? 0;
        if (c > 0) {
          acc += c;
        }

        if (acc >= REQUIRED_CARENCIA_MONTHS) {
          return item.dataAjustada?.dataFim ?? null;
        }
      }

      return null;
    })();

    const requirementDates = [
      meetsAgeRequirement ? ageRequirementDate : null,
      meetsContributionRequirement ? contributionRequirementDate : null,
      meetsCarenciaRequirement ? carenciaRequirementDate : null,
    ].filter((d): d is Date => d instanceof Date);

    const eligibilityDate =
      allRequirementsMet && requirementDates.length > 0
        ? new Date(Math.max(...requirementDates.map((d) => d.getTime())))
        : null;

    const now = new Date();

    const monthsToAge = meetsAgeRequirement
      ? 0
      : Math.ceil((requiredAge - age) * this.MONTHS_IN_YEAR);

    const monthsToContribution = meetsContributionRequirement
      ? 0
      : Math.ceil(
          (REQUIRED_CONTRIBUTION_YEARS - totalContribution) *
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

    const projectedFulfillmentDate = eligibilityDate
      ? null
      : new Date(
          now.getFullYear(),
          now.getMonth() + monthsToFulfill,
          now.getDate(),
        );

    const finalProjectedFulfillmentDate = eligibilityDate
      ? null
      : projectedFulfillmentDate;

    return {
      type: 'Aposentadoria por Idade Urbana - Regra de Transição - Emenda 103 art. 18',
      totalContributionYears: totalContribution,
      totalCarenciaMonths,
      age,
      requirements: {
        requiredAge,
        requiredContributionYears: REQUIRED_CONTRIBUTION_YEARS,
        requiredCarenciaMonths: REQUIRED_CARENCIA_MONTHS,
        meetsAgeRequirement,
        meetsContributionRequirement,
        meetsCarenciaRequirement,
      },
      eligibility: {
        isEligible: allRequirementsMet,
        eligibilityDate,
        projectedFulfillmentDate: finalProjectedFulfillmentDate,
      },
    };
  }

  private aposentadoriaPorIdadeHibridaPrevistaNaRegraDeTransicaoDoArt18(
    data: ConsolidadoRelationInterface[],
    gender: string,
    age: number,
    birthDate: Date | undefined,
  ): AnalysisServiceInterface {
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
      (item) =>
        item.origem === 'PERÍODO DE ATIVIDADE DE SEGURADO ESPECIAL' &&
        typeof item.tipo === 'string' &&
        item.tipo.toUpperCase() === 'SEGURADO ESPECIAL',
    );

    if (!existPeriodoSeguradoEspecial) {
      return {
        type: 'Aposentadoria por Idade Híbrida - Regra de Transição - Emenda 103 art. 18',
        totalContributionYears: 0,
        totalCarenciaMonths: 0,
        age,
        requirements: {
          requiredAge: requiredAgeAdjusted,
          requiredContributionYears: REQUIRED_CONTRIBUTION_YEARS,
          requiredCarenciaMonths: REQUIRED_CARENCIA_MONTHS,
          meetsAgeRequirement: false,
          meetsContributionRequirement: false,
          meetsCarenciaRequirement: false,
        },
        eligibility: {
          isEligible: false,
          projectedFulfillmentDate: null,
          eligibilityDate: null,
        },
      };
    }

    const totalCarenciaMonths = this.calculateTotalCarencia(data);

    const meetsAgeRequirement = age >= requiredAgeAdjusted;
    const meetsContributionRequirement =
      calculatedTotals.totalInYears >= REQUIRED_CONTRIBUTION_YEARS;
    const meetsCarenciaRequirement =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS;

    const isEligible =
      meetsAgeRequirement &&
      meetsContributionRequirement &&
      meetsCarenciaRequirement;

    const ageRequirementDate = ((): Date | null => {
      if (!birthDate) {
        return null;
      }
      const diffYears = requiredAgeAdjusted;
      return new Date(
        birthDate.getFullYear() + diffYears,
        birthDate.getMonth(),
        birthDate.getDate(),
      );
    })();

    const contributionRequirementDate = ((): Date | null => {
      let accYears = 0;
      let accMonths = 0;
      let accDays = 0;

      const add = (v: TimeContributionDataInterface): void => {
        accYears += v.anos;
        accMonths += v.meses;
        accDays += v.dias;

        if (accDays >= this.DAYS_IN_MONTH) {
          accMonths += Math.floor(accDays / this.DAYS_IN_MONTH);
          accDays = accDays % this.DAYS_IN_MONTH;
        }

        if (accMonths >= this.MONTHS_IN_YEAR) {
          accYears += Math.floor(accMonths / this.MONTHS_IN_YEAR);
          accMonths = accMonths % this.MONTHS_IN_YEAR;
        }
      };

      for (const item of data) {
        const v = item.validContributionTime;
        if (!v) {
          continue;
        }

        add(v);

        const totalDecimal =
          accYears +
          accMonths / this.MONTHS_IN_YEAR +
          accDays / this.DAYS_IN_YEAR;

        if (totalDecimal >= REQUIRED_CONTRIBUTION_YEARS) {
          return item.dataAjustada?.dataFim ?? v.dataFim ?? null;
        }
      }

      return null;
    })();

    const carenciaRequirementDate = this.calculateCarenciaRequirementDate(
      data,
      REQUIRED_CARENCIA_MONTHS,
    );

    let eligibilityDate: Date | null = null;

    if (
      meetsAgeRequirement &&
      meetsContributionRequirement &&
      meetsCarenciaRequirement
    ) {
      const dates = [
        ageRequirementDate,
        contributionRequirementDate,
        carenciaRequirementDate,
      ].filter((d): d is Date => d instanceof Date);

      if (dates.length > 0) {
        eligibilityDate = new Date(Math.max(...dates.map((d) => d.getTime())));
      }
    }

    const actualDate = new Date();

    const monthsToAge = meetsAgeRequirement
      ? 0
      : Math.ceil((requiredAgeAdjusted - age) * this.MONTHS_IN_YEAR);

    const monthsToContribution = meetsContributionRequirement
      ? 0
      : Math.ceil(
          (REQUIRED_CONTRIBUTION_YEARS - calculatedTotals.totalInYears) *
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

    const finalProjectedFulfillmentDate = eligibilityDate
      ? null
      : projectedFulfillmentDate;

    return {
      type: 'Aposentadoria por Idade Híbrida - Regra de Transição - Emenda 103 art. 18',
      totalContributionYears: calculatedTotals.totalInYears,
      totalCarenciaMonths,
      age,
      requirements: {
        requiredAge: requiredAgeAdjusted,
        requiredContributionYears: REQUIRED_CONTRIBUTION_YEARS,
        requiredCarenciaMonths: REQUIRED_CARENCIA_MONTHS,
        meetsAgeRequirement,
        meetsContributionRequirement,
        meetsCarenciaRequirement,
      },
      eligibility: {
        isEligible,
        projectedFulfillmentDate: finalProjectedFulfillmentDate,
        eligibilityDate,
      },
    };
  }

  private aposentadoriaProgramadaComumPrevistaNoArt19(
    data: ConsolidadoRelationInterface[],
    gender: string,
    age: number,
    birthDate: Date | undefined,
  ): AnalysisServiceInterface {
    const REQUIRED_CARENCIA_MONTHS = 180;
    const REQUIRED_AGE_WOMEN = 62;
    const REQUIRED_AGE_MEN = 65;
    const REQUIRED_CONTRIBUTION_MEN = 20;
    const REQUIRED_CONTRIBUTION_WOMEN = 15;
    const REQUIRED_CONTRIBUTION_YEARS =
      gender === 'F' ? REQUIRED_CONTRIBUTION_WOMEN : REQUIRED_CONTRIBUTION_MEN;

    const requiredAge = gender === 'F' ? REQUIRED_AGE_WOMEN : REQUIRED_AGE_MEN;

    const totals = this.calculateTotals(data);

    const totalCarenciaMonths = this.calculateTotalCarencia(data);

    const meetsAgeRequirement = age >= requiredAge;
    const meetsContributionRequirement =
      totals.totalInYears >= REQUIRED_CONTRIBUTION_YEARS;
    const meetsCarenciaRequirement =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS;

    const ageRequirementDate = birthDate
      ? new Date(
          birthDate.getFullYear() + requiredAge,
          birthDate.getMonth(),
          birthDate.getDate(),
        )
      : null;

    const contributionRequirementDate = ((): Date | null => {
      let accYears = 0;
      let accMonths = 0;
      let accDays = 0;

      const add = (v: TimeContributionDataInterface): void => {
        accYears += v.anos;
        accMonths += v.meses;
        accDays += v.dias;

        if (accDays >= this.DAYS_IN_MONTH) {
          accMonths += Math.floor(accDays / this.DAYS_IN_MONTH);
          accDays %= this.DAYS_IN_MONTH;
        }

        if (accMonths >= this.MONTHS_IN_YEAR) {
          accYears += Math.floor(accMonths / this.MONTHS_IN_YEAR);
          accMonths %= this.MONTHS_IN_YEAR;
        }
        return;
      };

      for (const item of data) {
        const v = item.validContributionTime;
        if (!v) {
          continue;
        }

        add(v);

        const totalDecimal =
          accYears +
          accMonths / this.MONTHS_IN_YEAR +
          accDays / this.DAYS_IN_YEAR;

        if (totalDecimal >= REQUIRED_CONTRIBUTION_YEARS) {
          return item.dataAjustada?.dataFim ?? v.dataFim ?? null;
        }
      }

      return null;
    })();

    const carenciaRequirementDate = this.calculateCarenciaRequirementDate(
      data,
      REQUIRED_CARENCIA_MONTHS,
    );

    const allRequirementsMet =
      meetsAgeRequirement &&
      meetsContributionRequirement &&
      meetsCarenciaRequirement;

    const requirementDates = [
      meetsAgeRequirement ? ageRequirementDate : null,
      meetsContributionRequirement ? contributionRequirementDate : null,
      meetsCarenciaRequirement ? carenciaRequirementDate : null,
    ].filter((d): d is Date => d instanceof Date);

    const eligibilityDate =
      allRequirementsMet && requirementDates.length > 0
        ? new Date(Math.max(...requirementDates.map((d) => d.getTime())))
        : null;

    const now = new Date();

    const missingAgeYears = meetsAgeRequirement ? 0 : requiredAge - age;

    const missingContributionYears = meetsContributionRequirement
      ? 0
      : REQUIRED_CONTRIBUTION_YEARS - totals.totalInYears;

    const missingCarenciaMonths = meetsCarenciaRequirement
      ? 0
      : REQUIRED_CARENCIA_MONTHS - totalCarenciaMonths;

    const missingAgeMonths = missingAgeYears * this.MONTHS_IN_YEAR;
    const missingContributionMonths = Math.ceil(
      missingContributionYears * this.MONTHS_IN_YEAR,
    );

    const monthsToFulfill = Math.max(
      missingAgeMonths,
      missingContributionMonths,
      missingCarenciaMonths,
    );

    const projectedFulfillmentDate = allRequirementsMet
      ? eligibilityDate
      : new Date(
          now.getFullYear(),
          now.getMonth() + monthsToFulfill,
          now.getDate(),
        );

    const finalProjectedFulfillmentDate = eligibilityDate
      ? null
      : projectedFulfillmentDate;

    return {
      type: 'Aposentadoria Programada Comum - Emenda 103 art. 19',
      totalContributionYears: totals.totalInYears,
      totalCarenciaMonths,
      age,
      requirements: {
        requiredAge,
        requiredContributionYears: REQUIRED_CONTRIBUTION_YEARS,
        requiredCarenciaMonths: REQUIRED_CARENCIA_MONTHS,
        meetsAgeRequirement,
        meetsContributionRequirement,
        meetsCarenciaRequirement,
      },
      eligibility: {
        isEligible: allRequirementsMet,
        eligibilityDate,
        projectedFulfillmentDate: finalProjectedFulfillmentDate,
      },
    };
  }
}
