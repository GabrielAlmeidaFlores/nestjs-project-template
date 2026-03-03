import { Injectable } from '@nestjs/common';

import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { calculatePotencialRestrito } from '@lib/cnis-analyzer/calculate-potencial-restrito';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { especiesData } from '@lib/cnis-analyzer/data/especies-data';
import { indicadorsData } from '@lib/cnis-analyzer/data/indicadors-data';
import { ipcaData } from '@lib/cnis-analyzer/data/ipca';
import { TetoInssData } from '@lib/cnis-analyzer/data/teto.inss';
import { AjusteSalarioBeneficioInterface } from '@lib/cnis-analyzer/interface/ajuste-salario-beneficio.interface';
import { AnalisePrevidenciariaInterface } from '@lib/cnis-analyzer/interface/analise-previdenciaria.interface';
import { CarenciaInterface } from '@lib/cnis-analyzer/interface/carencia.interface';
import { CnisClientDataInterface } from '@lib/cnis-analyzer/interface/cnis-client-data.interface';
import { ConcomitanciaDetalhesInterface } from '@lib/cnis-analyzer/interface/concomitancia-detalhes.interface';
import { ConcomitanciaInterface } from '@lib/cnis-analyzer/interface/concomitancia.interface';
import { ConsolidadoRelacaoInterface } from '@lib/cnis-analyzer/interface/consolidado-relation.interface';
import { CorrecaoMonetariaItemInterface } from '@lib/cnis-analyzer/interface/correcao-monetaria-item.interface';
import { DiferencaYmdResultadoInterface } from '@lib/cnis-analyzer/interface/diferenca-ymd-resultado-interface';
import { CnisIndicadoresDePendenciaInterface } from '@lib/cnis-analyzer/interface/indicadores-de-pendencia.interface';
import { ManutencaoQualidadeSeguradoInterface } from '@lib/cnis-analyzer/interface/manutencao-qualidade-segurado.interface';
import { PedagioPosReformaInterface } from '@lib/cnis-analyzer/interface/pedagio-pos-reforma.interface';
import {
  PeriodoDeGracaInterface,
  PeriodoDeGracaResultadoInterface,
} from '@lib/cnis-analyzer/interface/periodo-de-graca-resultado.interface';
import { PessoaCnisIdadeInterface } from '@lib/cnis-analyzer/interface/pessoa-cnis-idade.interface';
import { SalarioTetoInterface } from '@lib/cnis-analyzer/interface/salario-teto.interface';
import { SalarioInterface } from '@lib/cnis-analyzer/interface/salario.interface';
import { SalariosConcomitantesInterface } from '@lib/cnis-analyzer/interface/salarios-concomitantes.interface';
import {
  TempoComRestricaoItemInterface,
  TempoRestricoesContribuicaoTotalInterface,
  TempoTotalComRestricoesInterface,
} from '@lib/cnis-analyzer/interface/tempo-total-com-restricoes.interface';
import {
  TempoDeContribuicaoDetalhesInterface,
  TempoDeContribuicaoInterface,
} from '@lib/cnis-analyzer/interface/time-contribution.interface';
import { CnisAnalysisResultModel } from '@lib/cnis-analyzer/model/generic/cnis-analysis-result.model';
import {
  CnisModel,
  CnisSessionSocialSecurityAffiliationEarningsHistoryModel,
} from '@lib/cnis-processor/model/generic/cnis.model';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';

@Injectable()
export class CnisAnalyzerService implements CnisAnalyzerGateway {
  protected readonly _type = CnisAnalyzerService.name;

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
  private readonly EIGHTY_PERCENT: number;
  private readonly YEAR_2020: number;

  public constructor() {
    this.MONTHS_IN_YEAR = 12;
    this.DAYS_IN_YEAR = 365.25;
    this.REQUIRED_CONTRIBUTION_MEN = 35;
    this.REQUIRED_CONTRIBUTION_WOMEN = 30;
    this.REFORMA_YEAR = 2019;
    this.REFORMA_MONTH = 10;
    this.REFORMA_DAY = 13;
    this.EIGHTY_PERCENT = 0.8;
    this.YEAR_2020 = 2020;
    this.REFORMA_DATE = new Date(
      this.REFORMA_YEAR,
      this.REFORMA_MONTH,
      this.REFORMA_DAY,
    );
    this.CUTOFF_DATE = new Date('2019-11-13');
    this.DAYS_IN_MONTH = 30;
  }

  public analyzeCnisDocument(
    data: CnisModel,
    analysisToolClient: AnalysisToolClientEntity,
  ): Promise<CnisAnalysisResultModel> {
    const idade = this.calculateAge(
      data.affiliateIdentification?.dataDeNascimento,
    );
    const tempoDeContribuicao = this.calculateTimeContribution(data);
    const carencia = this.calculateCarenciaTotal(tempoDeContribuicao);
    const carenciaTotal = carencia.reduce((acc, cur) => acc + cur.carencia, 0);
    const concomitancia = this.calculateConcomitancia(data);

    const consolidadoResumido =
      this.calculateConsolidadoTempoContribuicaoECarencia(
        tempoDeContribuicao,
        concomitancia,
        carencia,
        data,
      );

    const beneficios = data.socialSecurityRelations?.filter(
      (beneficio) =>
        beneficio.socialSecurityAffiliationInfo.origemDoVinculo?.includes(
          'Benefício',
        ) ?? false,
    );

    const clientData: CnisClientDataInterface = {
      clientMotherName: data.affiliateIdentification?.nomeDaMae,
      clientNIT: data.affiliateIdentification?.nit,
      clientName: data.affiliateIdentification?.nome,
      clientBirthDate: data.affiliateIdentification?.dataDeNascimento,
      clientFederalDocument: data.affiliateIdentification?.cpf,
    };

    const vinculosNaoConcomitantes = consolidadoResumido.filter(
      (vinculo) => !vinculo.isConcomitante,
    );

    const somaVinculosNaoConcomitantes = vinculosNaoConcomitantes.reduce(
      (accumulator, currentValue) => {
        const startDate = currentValue.validContributionTime?.data?.dataInicio;
        const endDate = currentValue.validContributionTime?.data?.dataFim;
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
        const startDate = currentValue.validContributionTime?.data?.dataInicio;
        const endDate = currentValue.validContributionTime?.data?.dataFim;
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
      somaVinculosNaoConcomitantes + somaVinculosPrincipais;

    const { potencialValido, restritoValido } =
      calculatePotencialRestrito(data);

    const indicadoresDePendencia = this.calculateImpactoLiquidoDePendencias(
      consolidadoResumido,
      data,
    );

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

    const gender = analysisToolClient.gender === GenderEnum.MALE ? 'M' : 'F';

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
        idade.anos,
        data.affiliateIdentification?.dataDeNascimento,
      );

    const aposentadoriaPorIdadeUrbanaComDireitoAdquirido =
      this.aposentadoriaPorIdadeUrbanaComDireitoAdquirido(
        consolidadoResumido,
        gender,
        idade.anos,
        data.affiliateIdentification?.dataDeNascimento,
      );

    const aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoArt15 =
      this.aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoArt15(
        consolidadoResumido,
        gender,
        idade.anos,
        data.affiliateIdentification?.dataDeNascimento,
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
        data.affiliateIdentification?.dataDeNascimento,
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

    const cnis = CnisAnalysisResultModel.build({
      idade,
      clientData,
      beneficios,
      tempoDeContribuicao,
      concomitancia,
      carencia,
      carenciaTotal,
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
    return Promise.resolve(cnis);
  }

  private diffYmdInclusive(
    startDate?: Date | string | number | null,
    endDate?: Date | string | number | null,
  ): DiferencaYmdResultadoInterface {
    const start = this.toDate(startDate);
    const end = this.toDate(endDate);
    const MONTHS_IN_YEAR = 12;
    const THIRTY_DAYS = 30;
    const THIRTY_ONES_DAYS = 31;
    const FEBRUARY_DAYS = 28;
    const LEAP_FEBRUARY_DAYS = 29;

    if (!start || !end) {
      return { years: 0, months: 0, days: 0, formatted: '0a 0m 0d' };
    }

    const YEAR_2019 = 2019;
    const MONTH_NOVEMBER = 10;
    const DAY_FIRST = 1;
    const RULE_START_UTC = Date.UTC(YEAR_2019, MONTH_NOVEMBER, DAY_FIRST);

    const inclusiveEnd = new Date(end);
    inclusiveEnd.setDate(inclusiveEnd.getDate() + 1);

    const startYear = start.getFullYear();
    const startMonth = start.getMonth();
    const startDay = start.getDate();

    const endYear = inclusiveEnd.getFullYear();
    const endMonth = inclusiveEnd.getMonth();
    const endDay = inclusiveEnd.getDate();

    let years = endYear - startYear;
    let months = endMonth - startMonth;
    let days = endDay - startDay;

    if (days < 0) {
      months--;

      const previousMonth = (endMonth - 1 + MONTHS_IN_YEAR) % MONTHS_IN_YEAR;
      const yearOfPreviousMonth = endMonth === 0 ? endYear - 1 : endYear;

      const LEAP_YEAR_DIVISOR = 4;
      const CENTURY_DIVISOR = 100;
      const QUADRICENTENNIAL_DIVISOR = 400;

      const isLeapYear =
        (yearOfPreviousMonth % LEAP_YEAR_DIVISOR === 0 &&
          yearOfPreviousMonth % CENTURY_DIVISOR !== 0) ||
        yearOfPreviousMonth % QUADRICENTENNIAL_DIVISOR === 0;

      const daysInPreviousMonth =
        [
          THIRTY_ONES_DAYS,
          isLeapYear ? LEAP_FEBRUARY_DAYS : FEBRUARY_DAYS,
          THIRTY_ONES_DAYS,
          THIRTY_DAYS,
          THIRTY_ONES_DAYS,
          THIRTY_DAYS,
          THIRTY_ONES_DAYS,
          THIRTY_ONES_DAYS,
          THIRTY_DAYS,
          THIRTY_ONES_DAYS,
          THIRTY_DAYS,
          THIRTY_ONES_DAYS,
        ][previousMonth] ?? THIRTY_ONES_DAYS;
      days += daysInPreviousMonth;
    }

    if (months < 0) {
      years--;
      months += MONTHS_IN_YEAR;
    }

    if (start.getTime() >= RULE_START_UTC || end.getTime() >= RULE_START_UTC) {
      if (days > 0) {
        months += 1;
        days = 0;

        if (months >= MONTHS_IN_YEAR) {
          const extraYears = Math.floor(months / MONTHS_IN_YEAR);
          years += extraYears;
          months = months % MONTHS_IN_YEAR;
        }
      }
    }

    return { years, months, days, formatted: `${years}a ${months}m ${days}d` };
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

    // Agrupa itens que se sobrepõem direta ou indiretamente
    const group: {
      original: ConcomitanciaDetalhesInterface;
      start: Date | null;
      end: Date | null;
    }[] = [];
    const firstItem = items[0];
    if (!firstItem) {
      return resultadoFinal;
    }

    group.push(firstItem);
    let endOfGroup = firstItem.end ? firstItem.end.getTime() : 0;
    let changed = true;

    // Continua adicionando itens enquanto houver sobreposição com o grupo
    // Isso garante que itens que se sobrepõem indiretamente sejam agrupados
    while (changed) {
      changed = false;
      for (let i = 1; i < items.length; i++) {
        const it = items[i];
        if (!it) {
          continue;
        }

        // Verifica se já está no grupo
        const alreadyInGroup = group.some(
          (g) => g.original.seq === it.original.seq,
        );
        if (alreadyInGroup) {
          continue;
        }

        const inicioIt = it.start ? it.start.getTime() : 0;
        const fimIt = it.end ? it.end.getTime() : 0;

        // Verifica se se sobrepõe com algum item do grupo
        const overlaps = group.some((g) => {
          const gStart = g.start ? g.start.getTime() : 0;
          const gEnd = g.end ? g.end.getTime() : 0;
          return inicioIt <= gEnd && fimIt >= gStart;
        });

        if (overlaps) {
          group.push(it);
          if (fimIt > endOfGroup) {
            endOfGroup = fimIt;
          }
          changed = true;
        }
      }
    }

    const diasDeDuracao = (s: Date | null, e: Date | null): number => {
      if (!s || !e) {
        return 0;
      }
      return this.daysBetween(s, e) + 1;
    };

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
      return resultadoFinal;
    }

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
      vinculoPrincipal.contributionTime['dataInicio'] as
        | Date
        | null
        | undefined,
    );
    const fimPrincipal = this.toDate(
      vinculoPrincipal.contributionTime['dataFim'] as Date | null | undefined,
    );
    if (!inicioPrincipal || !fimPrincipal) {
      return resultadoFinal;
    }

    const grupoProcessado: ConcomitanciaDetalhesInterface[] = [];
    grupoProcessado.push(vinculoPrincipal as ConcomitanciaDetalhesInterface);

    const secundariosAjustados: ConcomitanciaDetalhesInterface[] = [];
    for (const membro of group) {
      if (membro === entradaPrincipal) {
        continue;
      }
      const orig = membro.original;
      const s = this.toDate(orig.contributionTime.dataInicio);
      const e = this.toDate(orig.contributionTime.dataFim);

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

      let novoInicio = s;
      let novoFim = e;

      if (
        s.getTime() < inicioPrincipal.getTime() &&
        e.getTime() >= inicioPrincipal.getTime() &&
        e.getTime() <= fimPrincipal.getTime()
      ) {
        // Item começa antes e termina dentro: ajusta apenas o fim
        novoFim = this.daysBeforeOrAfter(inicioPrincipal, 'before');
      } else if (
        s.getTime() >= inicioPrincipal.getTime() &&
        s.getTime() <= fimPrincipal.getTime() &&
        e.getTime() > fimPrincipal.getTime()
      ) {
        // Item começa dentro e termina depois: ajusta apenas o início
        novoInicio = this.daysBeforeOrAfter(fimPrincipal, 'after');
      } else if (
        s.getTime() < inicioPrincipal.getTime() &&
        e.getTime() > fimPrincipal.getTime()
      ) {
        // Item que envolve completamente o principal: cria apenas as partes antes e depois
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
          // Recalcula o tempo para a parte antes
          const recalculadoAntes = this.diffYmdInclusive(s, antesFim);
          parteAntes.contributionTime.anos = recalculadoAntes.years;
          parteAntes.contributionTime.meses = recalculadoAntes.months;
          parteAntes.contributionTime.dias = recalculadoAntes.days;
          parteAntes.contributionTime.abreviado = recalculadoAntes.formatted;
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
          // Recalcula o tempo para a parte depois
          const recalculadoDepois = this.diffYmdInclusive(depoisInicio, e);
          parteDepois.contributionTime.anos = recalculadoDepois.years;
          parteDepois.contributionTime.meses = recalculadoDepois.months;
          parteDepois.contributionTime.dias = recalculadoDepois.days;
          parteDepois.contributionTime.abreviado = recalculadoDepois.formatted;
          secundariosAjustados.push(parteDepois);
        }
        // Não adiciona item zerado, apenas as partes válidas
        continue;
      }

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
        // Recalcula o tempo para o ajustado
        const recalculado = this.diffYmdInclusive(novoInicio, novoFim);
        ajustado.contributionTime.anos = recalculado.years;
        ajustado.contributionTime.meses = recalculado.months;
        ajustado.contributionTime.dias = recalculado.days;
        ajustado.contributionTime.abreviado = recalculado.formatted;
        grupoProcessado.push(ajustado);
        secundariosAjustados.push(ajustado);
      } else {
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

    resultadoFinal.push(...grupoProcessado);

    const restantes = items.slice(group.length).map((it) => it.original);

    const ajustadosParaProximaRodada = secundariosAjustados
      .filter((s) => {
        const st = this.toDate(s.contributionTime.dataInicio);
        const en = this.toDate(s.contributionTime.dataFim);
        return st !== null && en !== null && st.getTime() <= en.getTime();
      })
      .map((s) => {
        const novaDataInicio = this.toDate(s.contributionTime.dataInicio);
        const novaDataFim = this.toDate(s.contributionTime.dataFim);

        if (!novaDataInicio || !novaDataFim) {
          return s;
        }

        const recalculado = this.diffYmdInclusive(novaDataInicio, novaDataFim);

        const { tipo: _tipo, ajustado: _ajustado, ...resto } = s;

        return {
          ...resto,
          contributionTime: {
            ...s.contributionTime,
            anos: recalculado.years,
            meses: recalculado.months,
            dias: recalculado.days,
            abreviado: recalculado.formatted,
          },
        } as ConcomitanciaDetalhesInterface;
      });

    const proximaLista = [...ajustadosParaProximaRodada, ...restantes].sort(
      (a, b) => {
        const aStart = this.toDate(a.contributionTime.dataInicio);
        const bStart = this.toDate(b.contributionTime.dataInicio);
        if (!aStart || !bStart) {
          return 0;
        }
        return aStart.getTime() - bStart.getTime();
      },
    );

    return this.calcularVinculosConcomitantes(proximaLista, resultadoFinal);
  }

  private getRequiredContributionAge(gender: string): number {
    return gender === 'F'
      ? this.REQUIRED_CONTRIBUTION_WOMEN
      : this.REQUIRED_CONTRIBUTION_MEN;
  }

  private calculateTotalCarencia(
    consolidado: ConsolidadoRelacaoInterface[],
    dateCuttoff?: Date,
  ): number {
    if (dateCuttoff) {
      return consolidado.reduce((acc, cur) => {
        const startDate = cur.validContributionTime?.data?.dataInicio;
        const endDate = cur.validContributionTime?.data?.dataFim;

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
    const decimalYears = Math.floor(
      years + months / this.MONTHS_IN_YEAR + days / this.DAYS_IN_YEAR,
    );
    return decimalYears;
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

  private toDate(d?: Date | string | number | null): Date | null {
    if (d === undefined || d === null) {
      return null;
    }
    if (d instanceof Date) {
      return isNaN(d.getTime()) ? null : d;
    }
    const parsed = new Date(d);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  private cleanerListVinculosConcomitantes(
    data: ConcomitanciaDetalhesInterface[],
  ): ConcomitanciaDetalhesInterface[] {
    const rawResult: ConcomitanciaDetalhesInterface[] =
      this.calcularVinculosConcomitantes(Array.isArray(data) ? data : []);

    for (let i = 0; i < rawResult.length; i++) {
      const vinculoA = rawResult[i];
      if (!vinculoA) {
        continue;
      }

      // Usa dataAjustada se existir, senão usa contributionTime (fallback)
      const startA = this.toDate(
        vinculoA.dataAjustada?.dataInicio ??
          vinculoA.contributionTime.dataInicio,
      );
      const endA = this.toDate(
        vinculoA.dataAjustada?.dataFim ?? vinculoA.contributionTime.dataFim,
      );
      if (!startA || !endA) {
        continue;
      }

      for (let j = i + 1; j < rawResult.length; j++) {
        const vinculoB = rawResult[j];
        if (!vinculoB) {
          continue;
        }
        // Usa dataAjustada se existir, senão usa contributionTime (fallback)
        const startB = this.toDate(
          vinculoB.dataAjustada?.dataInicio ??
            vinculoB.contributionTime.dataInicio,
        );
        const endB = this.toDate(
          vinculoB.dataAjustada?.dataFim ?? vinculoB.contributionTime.dataFim,
        );
        if (!startB || !endB) {
          continue;
        }

        // Verifica se há sobreposição
        if (startA <= endB && endA >= startB) {
          const duracaoA = this.daysBetween(startA, endA);
          const duracaoB = this.daysBetween(startB, endB);

          let winnerIsA: boolean;
          if (duracaoA > duracaoB) {
            winnerIsA = true;
          } else if (duracaoA < duracaoB) {
            winnerIsA = false;
          } else {
            if (startA.getTime() !== startB.getTime()) {
              winnerIsA = startA.getTime() < startB.getTime();
            } else {
              const seqA = vinculoA.seq;
              const seqB = vinculoB.seq;
              winnerIsA = seqA <= seqB;
            }
          }

          const winner = winnerIsA ? vinculoA : vinculoB;
          const loser = winnerIsA ? vinculoB : vinculoA;

          const winnerStart = this.toDate(
            winner.dataAjustada?.dataInicio ??
              winner.contributionTime.dataInicio,
          );
          const winnerEnd = this.toDate(
            winner.dataAjustada?.dataFim ?? winner.contributionTime.dataFim,
          );
          const loserStart = this.toDate(
            loser.dataAjustada?.dataInicio ?? loser.contributionTime.dataInicio,
          );
          const loserEnd = this.toDate(
            loser.dataAjustada?.dataFim ?? loser.contributionTime.dataFim,
          );

          if (!winnerStart || !winnerEnd || !loserStart || !loserEnd) {
            continue;
          }

          // Determina o tipo de sobreposição e ajusta o perdedor
          const loserCompletelyInside =
            loserStart.getTime() >= winnerStart.getTime() &&
            loserEnd.getTime() <= winnerEnd.getTime();
          const loserCompletelyOutside =
            loserStart.getTime() < winnerStart.getTime() &&
            loserEnd.getTime() > winnerEnd.getTime();
          const loserBefore =
            loserStart.getTime() < winnerStart.getTime() &&
            loserEnd.getTime() >= winnerStart.getTime() &&
            loserEnd.getTime() <= winnerEnd.getTime();
          const loserAfter =
            loserStart.getTime() >= winnerStart.getTime() &&
            loserStart.getTime() <= winnerEnd.getTime() &&
            loserEnd.getTime() > winnerEnd.getTime();

          if (loserCompletelyInside) {
            // Perdedor totalmente dentro: zera o tempo
            const novoFim = loserStart;
            loser.dataAjustada = {
              dataInicio: novoFim,
              dataFim: novoFim,
            };
            loser.contributionTime.anos = 0;
            loser.contributionTime.meses = 0;
            loser.contributionTime.dias = 0;
            loser.contributionTime.abreviado = '0a 0m 0d';
          } else if (loserCompletelyOutside) {
            // Perdedor envolve completamente: cria duas partes (antes e depois)
            const antesFim = this.daysBeforeOrAfter(winnerStart, 'before');
            const depoisInicio = this.daysBeforeOrAfter(winnerEnd, 'after');

            if (loserStart.getTime() <= antesFim.getTime()) {
              // Parte antes
              loser.dataAjustada = {
                dataInicio: loserStart,
                dataFim: antesFim,
              };
              const recalculadoAntes = this.diffYmdInclusive(
                loserStart,
                antesFim,
              );
              loser.contributionTime.anos = recalculadoAntes.years;
              loser.contributionTime.meses = recalculadoAntes.months;
              loser.contributionTime.dias = recalculadoAntes.days;
              loser.contributionTime.abreviado = recalculadoAntes.formatted;
            } else if (depoisInicio.getTime() <= loserEnd.getTime()) {
              // Parte depois
              loser.dataAjustada = {
                dataInicio: depoisInicio,
                dataFim: loserEnd,
              };
              const recalculadoDepois = this.diffYmdInclusive(
                depoisInicio,
                loserEnd,
              );
              loser.contributionTime.anos = recalculadoDepois.years;
              loser.contributionTime.meses = recalculadoDepois.months;
              loser.contributionTime.dias = recalculadoDepois.days;
              loser.contributionTime.abreviado = recalculadoDepois.formatted;
            } else {
              // Não há partes válidas: zera
              loser.dataAjustada = {
                dataInicio: loserStart,
                dataFim: loserEnd,
              };
              loser.contributionTime.anos = 0;
              loser.contributionTime.meses = 0;
              loser.contributionTime.dias = 0;
              loser.contributionTime.abreviado = '0a 0m 0d';
            }
          } else if (loserBefore) {
            // Perdedor começa antes e termina dentro: ajusta apenas o fim
            const novoFim = this.daysBeforeOrAfter(winnerStart, 'before');
            loser.dataAjustada = {
              dataInicio: loserStart,
              dataFim: novoFim,
            };
            const recalculado = this.diffYmdInclusive(loserStart, novoFim);
            loser.contributionTime.anos = recalculado.years;
            loser.contributionTime.meses = recalculado.months;
            loser.contributionTime.dias = recalculado.days;
            loser.contributionTime.abreviado = recalculado.formatted;
          } else if (loserAfter) {
            // Perdedor começa dentro e termina depois: ajusta apenas o início
            const novoInicio = this.daysBeforeOrAfter(winnerEnd, 'after');
            loser.dataAjustada = {
              dataInicio: novoInicio,
              dataFim: loserEnd,
            };
            const recalculado = this.diffYmdInclusive(novoInicio, loserEnd);
            loser.contributionTime.anos = recalculado.years;
            loser.contributionTime.meses = recalculado.months;
            loser.contributionTime.dias = recalculado.days;
            loser.contributionTime.abreviado = recalculado.formatted;
          }

          // Garante que ajustado está marcado
          loser.ajustado = true;
        }
      }
    }

    return rawResult;
  }

  private calculateAge(birthDate?: Date): PessoaCnisIdadeInterface {
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
    data: CnisModel,
  ): TempoDeContribuicaoInterface[] {
    const calculatedContributionTimesResponse: TempoDeContribuicaoInterface[] =
      [];
    data.socialSecurityRelations?.forEach((relation) => {
      const startDate = relation.socialSecurityAffiliationInfo.dataInicio;
      const endDate = relation.socialSecurityAffiliationInfo.dataFim;
      const lastDateRemun = relation.socialSecurityAffiliationInfo.ultRemun;
      const seq = relation.socialSecurityAffiliationInfo.seq;
      const totalContribuicao = this.calculateTotalContribuicao(
        relation.socialSecurityAffiliationEarningsHistory,
      );

      let calculatedContributionTime: TempoDeContribuicaoInterface = {
        seq: seq ?? 0,
        origemDoVinculo:
          relation.socialSecurityAffiliationInfo.origemDoVinculo ?? '',
        tipoDoVinculo:
          relation.socialSecurityAffiliationInfo.tipoFiliadoNoVinculo ?? '',
        indicadores: relation.socialSecurityAffiliationInfo.indicadores ?? '',
        dados: {
          data: {
            dataInicio: startDate ?? null,
            dataFim: endDate ?? null,
          },
          abreviado: '0a 0m 0d',
          dias: 0,
          meses: 0,
          anos: 0,
          totalContribuicao,
        },
      };

      if (
        startDate instanceof Date &&
        !isNaN(startDate.getTime()) &&
        endDate instanceof Date &&
        !isNaN(endDate.getTime())
      ) {
        const { years, months, days, formatted } = this.diffYmdInclusive(
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
          dados: {
            data: {
              dataInicio: startDate,
              dataFim: endDate,
            },
            abreviado: formatted,
            dias: days,
            meses: months,
            anos: years,
            totalContribuicao,
          },
        };
      }

      if (
        startDate instanceof Date &&
        !isNaN(startDate.getTime()) &&
        !endDate
      ) {
        const { years, months, days, formatted } = this.diffYmdInclusive(
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
          dados: {
            data: {
              dataInicio: startDate,
              dataFim: lastDateRemun,
            },
            abreviado: formatted,
            dias: days,
            meses: months,
            anos: years,
            totalContribuicao,
          },
        };
      }
      calculatedContributionTimesResponse.push(calculatedContributionTime);
    });
    return calculatedContributionTimesResponse;
  }

  private calculateConcomitancia(data: CnisModel): ConcomitanciaInterface[] {
    const concomitancia: ConcomitanciaInterface[] = [];
    const relations = data.socialSecurityRelations ?? [];
    relations.forEach((relationA, indexA) => {
      const startA = relationA.socialSecurityAffiliationInfo.dataInicio;
      const endA =
        relationA.socialSecurityAffiliationInfo.dataFim ??
        relationA.socialSecurityAffiliationInfo.ultRemun;
      const seq = relationA.socialSecurityAffiliationInfo.seq ?? 1;
      let isConcomitante = false;

      relations.forEach((relationB, indexB) => {
        if (indexA !== indexB) {
          const startB = relationB.socialSecurityAffiliationInfo.dataInicio;
          const endB =
            relationB.socialSecurityAffiliationInfo.dataFim ??
            relationB.socialSecurityAffiliationInfo.ultRemun;
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
    temposContribuicao: TempoDeContribuicaoInterface[],
    concomitanciaRelations: ConcomitanciaInterface[],
    carenciaTotal: CarenciaInterface[],
    data: CnisModel,
  ): ConsolidadoRelacaoInterface[] {
    if (!data.socialSecurityRelations) {
      return [];
    }

    const completeData = data.socialSecurityRelations
      .map((relation) => {
        const seq = relation.socialSecurityAffiliationInfo.seq;
        const contributionTime:
          | TempoDeContribuicaoInterface['dados']
          | undefined = temposContribuicao.find(
          (item) => item.seq === seq,
        )?.dados;
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
        data: {
          dataInicio?: Date;
          dataFim?: Date;
        };
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
          dataInicio: item.contributionTime?.data.dataInicio,
          dataFim: item.contributionTime?.data.dataFim,
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
      const totalContribuicao = this.calculateTotalContribuicao(
        relation.socialSecurityAffiliationEarningsHistory,
      );
      const indicadoresRemuneracao =
        relation.socialSecurityAffiliationEarningsHistory
          .map((item) => item.indicadores)
          .filter((v): v is string => typeof v === 'string' && v.trim() !== '');

      const indicadorPrincipal = ((): string => {
        const ind = relation.socialSecurityAffiliationInfo.indicadores;
        if (typeof ind !== 'string' || ind.trim() === '') {
          return '';
        }

        const pendencySet = new Set<string>();
        for (const list of indicadorsData) {
          if (typeof list.sigla === 'string' && list.tipo === 'CsPendencia') {
            if (ind.includes(list.sigla)) {
              pendencySet.add(list.sigla);
            }
          }
        }

        if (ind.includes('PSC-MEN-SM')) {
          pendencySet.add('PSC-MEN-SM');
        }
        if (ind.includes('PREM-EXT')) {
          pendencySet.add('PREM-EXT');
        }

        return Array.from(pendencySet).join(',');
      })();

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
      const isPendencia = this.calculateIsPendencia(
        indicadores,
        relation.socialSecurityAffiliationEarningsHistory,
      );

      const contributionTimeFound = temposContribuicao.find(
        (item) => item.seq === seq,
      )?.dados;
      const contributionTime: TempoDeContribuicaoDetalhesInterface =
        contributionTimeFound ?? {
          data: {
            dataInicio: null,
            dataFim: null,
          },
          abreviado: '0a 0m 0d',
          dias: 0,
          meses: 0,
          anos: 0,
          totalContribuicao: '0',
        };

      const carencia =
        carenciaTotal.find((item) => item.seq === seq)?.carencia ?? 0;

      const isConcomitante = concomitanciaRelations.find(
        (item) => item.seq === seq,
      )?.isConcomitante;
      const concomitanciaDetalhe = concomitanciaListCleaner.find(
        (item) => item.seq === seq,
      );

      const validContributionTime: TempoDeContribuicaoDetalhesInterface =
        concomitanciaDetalhe?.tipo === 'secundario'
          ? (this.calculateConsolidatedTimeContributionAndCarenciaAjustado(
              seq,
              totalContribuicao,
              concomitanciaDetalhe.dataAjustada?.dataInicio ?? undefined,
              concomitanciaDetalhe.dataAjustada?.dataFim ?? undefined,
            ).dados ?? contributionTime)
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
    totalContribuicao: string,
    startDate?: Date,
    endDate?: Date,
  ): TempoDeContribuicaoInterface {
    if (
      startDate instanceof Date &&
      !isNaN(startDate.getTime()) &&
      endDate instanceof Date &&
      !isNaN(endDate.getTime())
    ) {
      const { years, months, days, formatted } = this.diffYmdInclusive(
        startDate,
        endDate,
      );
      return {
        seq,
        dados: {
          data: {
            dataInicio: startDate,
            dataFim: endDate,
          },
          abreviado: formatted,
          dias: days,
          meses: months,
          anos: years,
          totalContribuicao,
        },
      };
    }
    return {
      seq,
      dados: {
        data: {
          dataInicio: null,
          dataFim: null,
        },
        abreviado: '0a 0m 0d',
        dias: 0,
        meses: 0,
        anos: 0,
        totalContribuicao: '0',
      },
    };
  }

  private calculateIsPendencia(
    sigla: string | null | undefined,
    earningsHistory: CnisSessionSocialSecurityAffiliationEarningsHistoryModel[],
  ): boolean {
    if (typeof sigla !== 'string') {
      return false;
    }

    const pendencyCodes = new Set<string>();
    for (const list of indicadorsData) {
      if (typeof list.sigla === 'string' && list.tipo === 'CsPendencia') {
        pendencyCodes.add(list.sigla);
      }
    }

    pendencyCodes.add('PSC-MEN-SM');
    pendencyCodes.add('PREM-EXT');

    for (const earning of earningsHistory) {
      const earnInd = earning.indicadores;
      if (typeof earnInd === 'string' && earnInd.trim() !== '') {
        for (const code of pendencyCodes) {
          if (earnInd.includes(code)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  private calculateImpactoLiquidoDePendencias(
    data: ConsolidadoRelacaoInterface[],
    cnisModel: CnisModel,
  ): CnisIndicadoresDePendenciaInterface[] {
    const sequenciasComPendencia = data.filter((item) => item.isPendencia);

    const tempoTotal = sequenciasComPendencia.map((item) => {
      const relation = cnisModel.socialSecurityRelations?.find(
        (r) => r.socialSecurityAffiliationInfo.seq === item.seq,
      );

      const pendencyCodes = new Set<string>();
      for (const list of indicadorsData) {
        if (typeof list.sigla === 'string' && list.tipo === 'CsPendencia') {
          pendencyCodes.add(list.sigla);
        }
      }
      pendencyCodes.add('PSC-MEN-SM');
      pendencyCodes.add('PREM-EXT');

      if (
        relation &&
        Array.isArray(relation.socialSecurityAffiliationEarningsHistory)
      ) {
        const monthsSet = new Set<string>();
        for (const earning of relation.socialSecurityAffiliationEarningsHistory) {
          const earnInd = earning.indicadores;
          const competencia = earning.competencia;
          if (
            typeof earnInd === 'string' &&
            earnInd.trim() !== '' &&
            competencia instanceof Date &&
            !isNaN(competencia.getTime())
          ) {
            for (const code of pendencyCodes) {
              if (earnInd.includes(code)) {
                const key = `${competencia.getFullYear()}-${String(
                  competencia.getMonth() + 1,
                ).padStart(2, '0')}`;
                monthsSet.add(key);
                break;
              }
            }
          }
        }

        const carenciaCount = monthsSet.size;
        const anos = Math.floor(carenciaCount / this.MONTHS_IN_YEAR);
        const meses = carenciaCount % this.MONTHS_IN_YEAR;
        const dias = 0;

        return {
          seq: item.seq,
          indicadores: item.indicadores,
          dias,
          meses,
          anos,
          carencia: carenciaCount,
        };
      }

      const startDate = item.contributionTime?.data?.dataInicio;
      const endDate = item.contributionTime?.data?.dataFim;
      if (!startDate || !endDate) {
        return {
          seq: item.seq,
          indicadores: item.indicadores,
          dias: 0,
          meses: 0,
          anos: 0,
          carencia: 0,
        };
      }

      const { years, months, days } = this.diffYmdInclusive(startDate, endDate);

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
    consolidado: ConsolidadoRelacaoInterface[],
  ): ConsolidadoRelacaoInterface[] {
    const indicadoresDeIncapacidade = consolidado.filter(
      (item) =>
        item.isBeneficio &&
        item.contributionTime?.data?.dataInicio !== null &&
        item.contributionTime?.data?.dataFim !== null,
    );

    for (const beneficio of indicadoresDeIncapacidade) {
      const dataInicioBeneficio =
        beneficio.contributionTime?.data?.dataInicio ?? null;
      const dataFimBeneficio =
        beneficio.contributionTime?.data?.dataFim ?? null;

      if (!dataInicioBeneficio || !dataFimBeneficio) {
        beneficio.isIntercalado = true;
        continue;
      }

      const hasBefore = consolidado.some((item) => {
        const dataFimItem = item.contributionTime?.data?.dataFim ?? null;
        return (
          item.seq !== beneficio.seq &&
          dataFimItem !== null &&
          dataFimItem < dataInicioBeneficio
        );
      });

      const hasAfter = consolidado.some((item) => {
        const dataInicioItem = item.contributionTime?.data?.dataInicio ?? null;
        return (
          item.seq !== beneficio.seq &&
          dataInicioItem !== null &&
          dataInicioItem > dataFimBeneficio
        );
      });

      beneficio.isIntercalado = hasBefore && hasAfter;

      for (const item of consolidado) {
        if (item.seq === beneficio.seq) {
          if (!beneficio.isIntercalado) {
            item.contributionTime = {
              data: {
                dataInicio: null,
                dataFim: null,
              },
              abreviado: '0a 0m 0d',
              dias: 0,
              meses: 0,
              anos: 0,
              totalContribuicao: '0',
            };
            item.carencia = 0;
          }

          if (beneficio.isIntercalado && item.isConcomitante) {
            item.contributionTime = {
              data: {
                dataInicio: null,
                dataFim: null,
              },
              abreviado: '0a 0m 0d',
              dias: 0,
              meses: 0,
              anos: 0,
              totalContribuicao: '0',
            };
            item.carencia = 0;
          }
          continue;
        }

        const dataInicioItem = item.contributionTime?.data?.dataInicio ?? null;
        const dataFimItem = item.contributionTime?.data?.dataFim ?? null;

        if (!dataInicioItem || !dataFimItem) {
          continue;
        }

        const overlap =
          dataInicioItem <= dataFimBeneficio &&
          dataFimItem >= dataInicioBeneficio;

        if (overlap) {
          item.contributionTime = {
            data: {
              dataInicio: null,
              dataFim: null,
            },
            abreviado: '0a 0m 0d',
            dias: 0,
            meses: 0,
            anos: 0,
            totalContribuicao: '0',
          };
          item.carencia = 0;
        }
      }
    }

    return indicadoresDeIncapacidade;
  }

  private calculatePeriodoDeGraca(
    consolidado: ConsolidadoRelacaoInterface[],
  ): PeriodoDeGracaResultadoInterface {
    const NUMBER_MONTHS_THRESHOLD = 120;

    const buildScenario = (
      items: ConsolidadoRelacaoInterface[],
      typeLabel: string,
    ): PeriodoDeGracaInterface => {
      const seqsConsiderados = items.map((i) => i.seq);
      const totalMonths = items.reduce(
        (acc, cur) => acc + (cur.carencia ?? 0),
        0,
      );
      const validIntervals = items
        .map((it) => ({
          seq: it.seq,
          start: this.toDate(it.contributionTime?.data?.dataInicio),
          end: this.toDate(it.contributionTime?.data?.dataFim),
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
        let prevEnd: Date | undefined = validIntervals[0]?.end;
        for (let i = 1; i < validIntervals.length; i++) {
          const current = validIntervals[i];
          if (!current) {
            continuous = false;
            break;
          }
          if (!prevEnd) {
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
    data: TempoDeContribuicaoInterface[],
  ): CarenciaInterface[] {
    const monthsAssigned = new Set<string>();
    const carenciaSeq: CarenciaInterface[] = [];

    const itemsSorted = [...data].sort((a, b) => a.seq - b.seq);

    for (const item of itemsSorted) {
      const seq = item.seq;
      const startDate = this.toDate(item.dados?.data?.dataInicio);
      const endDate = this.toDate(item.dados?.data?.dataFim);

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

  private calculateRequirementDateByAge(
    idadeRequerida: number,
    currentAge: number,
    birthDate: Date | null,
  ): Date | null {
    const hasValidBirthDate =
      birthDate instanceof Date && !isNaN(birthDate.getTime());

    if (!hasValidBirthDate) {
      return null;
    }

    if (currentAge < idadeRequerida) {
      return null;
    }

    const fullRequiredAge = Math.floor(idadeRequerida);

    return new Date(
      birthDate.getFullYear() + fullRequiredAge,
      birthDate.getMonth(),
      birthDate.getDate(),
    );
  }

  private calculateContributionRequirementDate(
    data: ConsolidadoRelacaoInterface[],
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
      if (!v?.data?.dataFim) {
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
          this.toDate(v.data.dataFim)
        );
      }
    }

    return null;
  }

  private calculateDataFinalDaQualidadedeDeSegurado(
    data: ConsolidadoRelacaoInterface[],
  ): ManutencaoQualidadeSeguradoInterface[] {
    const DECIMO_SEXTO_DIA = 16;
    const PERIODO_DE_GRACA_PADRAO = 12;
    const PERIODO_DE_GRACA_AUMENTADO = 24;
    const CONTRIBUICOES_MINIMAS = 120;

    data.sort((a, b) => {
      const aStart = this.toDate(a.contributionTime?.data?.dataInicio);
      const bStart = this.toDate(b.contributionTime?.data?.dataInicio);
      if (aStart && bStart) {
        return aStart.getTime() - bStart.getTime();
      }
      return 0;
    });

    const resultados: ManutencaoQualidadeSeguradoInterface[] = [];

    for (let i = 0; i < data.length - 1; i++) {
      const vinculoAtual = data[i];
      const vinculoProximo = data[i + 1];

      const dataFimAtual = this.toDate(
        vinculoAtual?.contributionTime?.data?.dataFim,
      );
      const dataInicioProximo = this.toDate(
        vinculoProximo?.contributionTime?.data?.dataInicio,
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

      const register: ManutencaoQualidadeSeguradoInterface = {
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
    data: ConsolidadoRelacaoInterface[],
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
    data: CnisModel,
    concomitancia: ConsolidadoRelacaoInterface[],
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

  private calculateAjusteAoTeto(data: CnisModel): SalarioTetoInterface[] {
    const teto: SalarioTetoInterface[] = [];
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
    data: SalarioTetoInterface[],
  ): CorrecaoMonetariaItemInterface[] {
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
    const YEAR_1994 = 1994;
    const MONTH_JULY = 6;
    const DAY_FIRST = 1;

    const reformaDate = this.REFORMA_DATE;

    const salariosValidos = data.filter((item) => {
      const competenciaDate = new Date(item.competencia);
      return (
        competenciaDate instanceof Date &&
        !isNaN(competenciaDate.getTime()) &&
        competenciaDate >= new Date(YEAR_1994, MONTH_JULY, DAY_FIRST) &&
        competenciaDate <= reformaDate
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
  ): AjusteSalarioBeneficioInterface {
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

  private calculateTotals(data: ConsolidadoRelacaoInterface[]): {
    years: number;
    months: number;
    days: number;
    totalInYears: number;
    carencia: number;
  } {
    const dataFilter = data.filter(
      (item) => item.tipo === 'principal' || item.tipo === undefined,
    );
    const years = dataFilter.reduce((acc, cur) => {
      const anos = cur.validContributionTime?.anos ?? 0;
      return acc + anos;
    }, 0);

    const months = dataFilter.reduce(
      (acc, cur) => acc + (cur.validContributionTime?.meses ?? 0),
      0,
    );

    const days = dataFilter.reduce(
      (acc, cur) => acc + (cur.validContributionTime?.dias ?? 0),
      0,
    );

    const totalInYears = Math.floor(
      years + months / this.MONTHS_IN_YEAR + days / this.DAYS_IN_YEAR,
    );

    const carencia = dataFilter.reduce(
      (acc, cur) => acc + (cur.carencia ?? 0),
      0,
    );

    return { years, months, days, totalInYears, carencia };
  }

  private calculatePontos(
    idade: number,
    data: ConsolidadoRelacaoInterface[],
  ): number {
    const calculatedTotals = this.calculateTotals(data);

    const pontos = Math.floor(idade + calculatedTotals.totalInYears);

    return pontos;
  }

  private calculatePointsRequirementDate(
    data: ConsolidadoRelacaoInterface[],
    pontosRequeridos: number,
    currentAge: number,
    birthDate?: Date,
  ): Date | null {
    if (!Array.isArray(data) || data.length === 0 || !birthDate) {
      return null;
    }

    const totalPoints = this.calculateTotals(data);
    const totalPointsAcquired = currentAge + totalPoints.totalInYears;

    if (totalPointsAcquired < pontosRequeridos) {
      return null;
    }

    const sortedData = [...data]
      .filter((item) => {
        return item.tipo !== 'secundario';
      })
      .filter((item) => {
        const v = item.validContributionTime ?? item.contributionTime;
        return v?.data?.dataInicio;
      })
      .sort((a, b) => {
        const dateA = this.toDate(
          a.validContributionTime?.data?.dataInicio ??
            a.contributionTime?.data?.dataInicio,
        );
        const dateB = this.toDate(
          b.validContributionTime?.data?.dataInicio ??
            b.contributionTime?.data?.dataInicio,
        );
        return (dateA?.getTime() ?? 0) - (dateB?.getTime() ?? 0);
      });

    let accumulatedContributionYears = 0;

    for (const item of sortedData) {
      const v = item.validContributionTime ?? item.contributionTime;
      if (!v) {
        continue;
      }

      const startDate = this.toDate(v.data?.dataInicio);
      const endDate = this.toDate(v.data?.dataFim);

      if (!startDate || !endDate) {
        continue;
      }

      const durationInYears = this.convertToDecimalYears(
        v.anos,
        v.meses,
        v.dias,
      );

      const ageAtStartOfPeriod = this.calculateAgeAtDate(birthDate, startDate);

      const pointsBeforePeriod =
        ageAtStartOfPeriod + accumulatedContributionYears;

      const pointsGainedInPeriod = durationInYears * 2;
      const pointsAtEndOfPeriod = pointsBeforePeriod + pointsGainedInPeriod;

      if (pointsAtEndOfPeriod >= pontosRequeridos) {
        const pointsNeeded = pontosRequeridos - pointsBeforePeriod;

        const yearsNeededForPoints = pointsNeeded / 2;

        const daysNeeded = yearsNeededForPoints * this.DAYS_IN_YEAR;

        const resultDate = new Date(startDate);
        resultDate.setDate(resultDate.getDate() + Math.ceil(daysNeeded));

        if (resultDate <= endDate) {
          return resultDate;
        } else {
          return endDate;
        }
      }

      accumulatedContributionYears += durationInYears;
    }

    return null;
  }

  private calculateAgeAtDate(birthDate: Date, targetDate: Date): number {
    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    let age = target.getFullYear() - birth.getFullYear();
    const monthDiff = target.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && target.getDate() < birth.getDate())
    ) {
      age--;
    }

    return Math.max(0, age);
  }

  private calculateTempoPedagio(
    data: ConsolidadoRelacaoInterface[],
    gender: string,
    percentualPedagio: number,
  ): PedagioPosReformaInterface {
    const anosDeContribuicaoRequeridos =
      this.getRequiredContributionAge(gender);

    let totalContributionYearsAtReforma = 0;
    let totalContributionMonthsAtReforma = 0;
    let totalContributionDaysAtReforma = 0;

    const filteredData = data.filter((item) => item.tipo !== 'secundario');

    filteredData.forEach((item) => {
      const dataInicio = this.toDate(
        item.validContributionTime?.data?.dataInicio,
      );
      const dataFim = this.toDate(item.validContributionTime?.data?.dataFim);

      if (!dataInicio || !dataFim) {
        return;
      }

      // if (dataFim > this.REFORMA_DATE) {
      //   dataFim = this.REFORMA_DATE;
      // }

      if (dataInicio >= this.REFORMA_DATE) {
        return;
      }

      const { years, months, days } = this.diffYmdInclusive(
        dataInicio,
        dataFim,
      );

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
      anosDeContribuicaoRequeridos - totalContributionAtReforma;

    const pedagio = tempoFaltante * percentualPedagio;

    const tempoTotalNecessario = anosDeContribuicaoRequeridos + pedagio;

    return {
      totalContributionAtReforma,
      tempoFaltante,
      pedagio,
      tempoTotalNecessario,
    };
  }

  private calculateCarenciaRequirementDate(
    data: ConsolidadoRelacaoInterface[],
    requiredCarenciaMonths: number,
  ): Date | null {
    let accumulated = 0;
    let maxEndDate: Date | null = null;

    for (const item of data) {
      const carencia = item.carencia ?? 0;
      if (carencia > 0) {
        accumulated += carencia;
      }

      const rawEnd =
        item.dataAjustada?.dataFim ??
        item.validContributionTime?.data?.dataFim ??
        null;

      if (rawEnd !== null) {
        const endDate = this.toDate(rawEnd);
        if (endDate && !isNaN(endDate.getTime())) {
          if (maxEndDate === null || endDate > maxEndDate) {
            maxEndDate = endDate;
          }
        }
      }

      if (accumulated >= requiredCarenciaMonths) {
        return maxEndDate;
      }
    }

    return null;
  }

  private aposentadoriaPorTempoDeContribuicaoComDireitoAdquirido(
    data: ConsolidadoRelacaoInterface[],
    gender: string,
    points: number,
    age: number,
    birthDate: Date | undefined,
  ): AnalisePrevidenciariaInterface {
    const REQUIRED_CARENCIA_MONTHS = 180;
    const POINTS_MEN = 96;
    const POINTS_WOMEN = 86;

    const anosDeContribuicaoRequeridos =
      this.getRequiredContributionAge(gender);

    data.forEach((item) => {
      const dataInicio = this.toDate(
        item.validContributionTime?.data?.dataInicio,
      );
      const dataFim = this.toDate(item.validContributionTime?.data?.dataFim);

      if (!dataInicio || !dataFim) {
        return;
      }

      // if (dataFim > this.REFORMA_DATE) {
      //   dataFim = this.REFORMA_DATE;
      // }

      if (dataInicio >= this.REFORMA_DATE) {
        item.validContributionTime = {
          data: {
            dataInicio: null,
            dataFim: null,
          },
          abreviado: '0a 0m 0d',
          dias: 0,
          meses: 0,
          anos: 0,
          totalContribuicao: '0',
        };
        return;
      }

      const { years, months, days } = this.diffYmdInclusive(
        dataInicio,
        dataFim,
      );
      item.validContributionTime = {
        data: {
          dataInicio,
          dataFim,
        },
        abreviado: `${years}a ${months}m ${days}d`,
        dias: days,
        meses: months,
        anos: years,
        totalContribuicao: undefined,
      };
    });
    const totals = this.calculateTotals(data);

    const totalCarenciaMonths = this.calculateTotalCarencia(data);
    const pontosRequeridos = gender === 'F' ? POINTS_WOMEN : POINTS_MEN;

    const meetsContributionRequirement =
      totals.totalInYears >= anosDeContribuicaoRequeridos;

    const meetsCarenciaRequirement =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS;

    const meetsPointsRequirement = points >= pontosRequeridos;

    const isEligible =
      meetsContributionRequirement &&
      meetsCarenciaRequirement &&
      meetsPointsRequirement;

    const contributionRequirementDate = meetsContributionRequirement
      ? this.calculateContributionRequirementDate(
          data,
          anosDeContribuicaoRequeridos,
        )
      : null;

    const carenciaRequirementDate = this.calculateCarenciaRequirementDate(
      data,
      REQUIRED_CARENCIA_MONTHS,
    );

    const pointsRequirementDate = this.calculatePointsRequirementDate(
      data,
      pontosRequeridos,
      age,
      birthDate,
    );

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

    const today = new Date();

    const monthsToContribution = meetsContributionRequirement
      ? 0
      : Math.ceil(
          (anosDeContribuicaoRequeridos - totals.totalInYears) *
            this.MONTHS_IN_YEAR,
        );

    const monthsToCarencia = meetsCarenciaRequirement
      ? 0
      : REQUIRED_CARENCIA_MONTHS - totalCarenciaMonths;

    const monthsToPoints = meetsPointsRequirement
      ? 0
      : Math.ceil((pontosRequeridos - points) * this.MONTHS_IN_YEAR);

    const monthsToFulfill = Math.max(
      monthsToContribution,
      monthsToCarencia,
      monthsToPoints,
    );

    const dataQueIraAtingirRequisitoDeContribuicao =
      meetsContributionRequirement
        ? null
        : new Date(
            today.getFullYear(),
            today.getMonth() + monthsToContribution,
            today.getDate(),
          );

    const dataQueIraAtingirRequisitoDeCarencia = meetsCarenciaRequirement
      ? null
      : new Date(
          today.getFullYear(),
          today.getMonth() + monthsToCarencia,
          today.getDate(),
        );

    const dataQueIraAtingirRequisitoDePontos = meetsPointsRequirement
      ? null
      : new Date(
          today.getFullYear(),
          today.getMonth() + monthsToPoints,
          today.getDate(),
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

    return {
      type: 'Aposentadoria por Tempo de Contribuição com Direito Adquirido',
      totalCarenciaMonths,
      points,
      requirements: {
        atingiuRequisitoDeContribuicao: meetsContributionRequirement,
        atingiuRequisitoDeCarencia: meetsCarenciaRequirement,
        atingiuRequisitoDePontos: meetsPointsRequirement,
        mesesDeCarenciaRequeridos: REQUIRED_CARENCIA_MONTHS,
        anosDeContribuicaoRequeridos,
        pontosRequeridos,
        dataQueIraAtingirRequisitoDeContribuicao,
        dataQueIraAtingirRequisitoDeCarencia,
        dataQueIraAtingirRequisitoDePontos,
        dataQueAtingiuRequisitoDeCarencia: carenciaRequirementDate,
        dataQueAtingiuRequisitoDeContribuicao: contributionRequirementDate,
        dataQueAtingiuRequisitoDePontos: pointsRequirementDate,
      },
      eligibility: {
        isEligible,
        eligibilityDate,
        projectedFulfillmentDate: finalProjectedFulfillmentDate,
      },
    };
  }

  private aposentadoriaPorIdadeUrbanaComDireitoAdquirido(
    data: ConsolidadoRelacaoInterface[],
    gender: string,
    age: number,
    birthDate: Date | undefined,
  ): AnalisePrevidenciariaInterface {
    const REQUIRED_CARENCIA_MONTHS = 180;
    const REQUIRED_AGE_MEN = 65;
    const REQUIRED_AGE_WOMEN = 60;

    const idadeRequerida =
      gender === 'F' ? REQUIRED_AGE_WOMEN : REQUIRED_AGE_MEN;
    const CUTOFF_DATE = new Date('2019-11-13');

    data.forEach((item) => {
      const dataInicio = this.toDate(
        item.validContributionTime?.data?.dataInicio,
      );
      const dataFim = this.toDate(item.validContributionTime?.data?.dataFim);

      if (!dataInicio || !dataFim) {
        return;
      }

      // if (dataFim > CUTOFF_DATE) {
      //   dataFim = CUTOFF_DATE;
      // }

      if (dataInicio >= CUTOFF_DATE) {
        item.validContributionTime = {
          data: {
            dataInicio: null,
            dataFim: null,
          },
          abreviado: '0a 0m 0d',
          dias: 0,
          meses: 0,
          anos: 0,
          totalContribuicao: '0',
        };
        return;
      }

      const { years, months, days } = this.diffYmdInclusive(
        dataInicio,
        dataFim,
      );

      item.validContributionTime = {
        data: {
          dataInicio,
          dataFim,
        },
        abreviado: `${years}a ${months}m ${days}d`,
        dias: days,
        meses: months,
        anos: years,
        totalContribuicao: undefined,
      };
    });

    const totalCarenciaMonths = this.calculateTotalCarencia(data);

    const meetsAgeRequirement = age >= idadeRequerida;
    const meetsCarenciaRequirement =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS;

    const ageRequirementDate = meetsAgeRequirement
      ? this.calculateRequirementDateByAge(
          idadeRequerida,
          age,
          birthDate ?? null,
        )
      : null;

    const carenciaRequirementDate = this.calculateCarenciaRequirementDate(
      data,
      REQUIRED_CARENCIA_MONTHS,
    );

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

    const today = new Date();

    const monthsToAge = meetsAgeRequirement
      ? 0
      : (idadeRequerida - age) * this.MONTHS_IN_YEAR;

    const monthsToCarencia = meetsCarenciaRequirement
      ? 0
      : REQUIRED_CARENCIA_MONTHS - totalCarenciaMonths;

    const monthsToFulfill = Math.max(monthsToAge, monthsToCarencia);

    const dataQueIraAtingirRequisitoDeIdade = meetsAgeRequirement
      ? null
      : new Date(
          today.getFullYear(),
          today.getMonth() + monthsToAge,
          today.getDate(),
        );

    const dataQueIraAtingirRequisitoDeCarencia = meetsCarenciaRequirement
      ? null
      : new Date(
          today.getFullYear(),
          today.getMonth() + monthsToCarencia,
          today.getDate(),
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

    return {
      type: 'Aposentadoria por Idade Urbana com Direito Adquirido',
      age,
      totalCarenciaMonths,
      requirements: {
        atingiuRequisitoDeIdade: meetsAgeRequirement,
        atingiuRequisitoDeCarencia: meetsCarenciaRequirement,
        idadeRequerida,
        mesesDeCarenciaRequeridos: REQUIRED_CARENCIA_MONTHS,
        dataQueIraAtingirRequisitoDeIdade,
        dataQueIraAtingirRequisitoDeCarencia,
        dataQueAtingiuRequisitoDeIdade: ageRequirementDate,
        dataQueAtingiuRequisitoDeCarencia: carenciaRequirementDate,
      },
      eligibility: {
        isEligible,
        eligibilityDate,
        projectedFulfillmentDate: finalProjectedFulfillmentDate,
      },
    };
  }

  private aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoArt15(
    data: ConsolidadoRelacaoInterface[],
    gender: string,
    age: number,
    birthDate?: Date,
  ): AnalisePrevidenciariaInterface {
    const REQUIRED_CARENCIA_MONTHS = 180;
    const BASE_POINTS_MEN = 70;
    const BASE_POINTS_WOMEN = 86;
    const MAX_POINTS_MEN = 105;
    const MAX_POINTS_WOMEN = 100;

    const anosDeContribuicaoRequeridos =
      this.getRequiredContributionAge(gender);

    const basePoints = gender === 'F' ? BASE_POINTS_WOMEN : BASE_POINTS_MEN;
    const maxPoints = gender === 'F' ? MAX_POINTS_WOMEN : MAX_POINTS_MEN;

    const totals = this.calculateTotals(data);
    const totalCarenciaMonths = this.calculateTotalCarencia(data);

    const currentYear = new Date().getFullYear();
    const pontosRequeridos = Math.min(
      basePoints + Math.max(0, currentYear - this.YEAR_2020),
      maxPoints,
    );

    const pontos = this.calculatePontos(age, data);

    const meetsContributionRequirement =
      totals.totalInYears >= anosDeContribuicaoRequeridos;

    const meetsCarenciaRequirement =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS;

    const meetsPointsRequirement = pontos >= pontosRequeridos;

    const contributionRequirementDate = meetsContributionRequirement
      ? this.calculateContributionRequirementDate(
          data,
          anosDeContribuicaoRequeridos,
        )
      : null;

    const carenciaRequirementDate = this.calculateCarenciaRequirementDate(
      data,
      REQUIRED_CARENCIA_MONTHS,
    );

    const pointsRequirementDate = this.calculatePointsRequirementDate(
      data,
      pontosRequeridos,
      age,
      birthDate,
    );

    const actualDate = new Date();

    const monthsToContribution = meetsContributionRequirement
      ? 0
      : this.monthsRemainingForContribution(
          totals.years,
          totals.months,
          totals.days,
          anosDeContribuicaoRequeridos,
        );

    const monthsToCarencia = meetsCarenciaRequirement
      ? 0
      : REQUIRED_CARENCIA_MONTHS - totalCarenciaMonths;

    const monthsToPoints = meetsPointsRequirement
      ? 0
      : Math.ceil((pontosRequeridos - pontos) * this.MONTHS_IN_YEAR);

    const adjustedMonthsToPoints = Math.max(
      0,
      monthsToPoints - monthsToContribution,
    );

    const monthsToFulfill = Math.max(
      monthsToContribution,
      monthsToCarencia,
      adjustedMonthsToPoints,
    );

    const dataQueIraAtingirRequisitoDeContribuicao =
      meetsContributionRequirement
        ? null
        : new Date(
            actualDate.getFullYear(),
            actualDate.getMonth() + monthsToContribution,
            actualDate.getDate(),
          );

    const dataQueIraAtingirRequisitoDeCarencia = meetsCarenciaRequirement
      ? null
      : new Date(
          actualDate.getFullYear(),
          actualDate.getMonth() + monthsToCarencia,
          actualDate.getDate(),
        );

    const dataQueIraAtingirRequisitoDePontos = meetsPointsRequirement
      ? null
      : new Date(
          actualDate.getFullYear(),
          actualDate.getMonth() + adjustedMonthsToPoints,
          actualDate.getDate(),
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
        anosDeContribuicaoRequeridos,
        mesesDeCarenciaRequeridos: REQUIRED_CARENCIA_MONTHS,
        pontosRequeridos,
        dataQueIraAtingirRequisitoDeContribuicao,
        dataQueIraAtingirRequisitoDeCarencia,
        dataQueIraAtingirRequisitoDePontos,
        atingiuRequisitoDeContribuicao: meetsContributionRequirement,
        atingiuRequisitoDeCarencia: meetsCarenciaRequirement,
        atingiuRequisitoDePontos: meetsPointsRequirement,
        dataQueAtingiuRequisitoDeContribuicao: contributionRequirementDate,
        dataQueAtingiuRequisitoDeCarencia: carenciaRequirementDate,
        dataQueAtingiuRequisitoDePontos: pointsRequirementDate,
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
    consolidadoResumido: ConsolidadoRelacaoInterface[],
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
    data: ConsolidadoRelacaoInterface[],
    age: number,
    gender: string,
    birthDate: Date | undefined,
  ): AnalisePrevidenciariaInterface {
    const REQUIRED_AGE_WOMEN = 57;
    const REQUIRED_AGE_MEN = 60;
    const REQUIRED_CARENCIA_MONTHS = 180;
    const PEDAGIO_PERCENTAGE = 1;

    const idadeRequerida =
      gender === 'F' ? REQUIRED_AGE_WOMEN : REQUIRED_AGE_MEN;
    const requiredContribution = this.getRequiredContributionAge(gender);

    const totalContribution = this.totalContributionType(data);

    const pedagioData = this.calculateTempoPedagio(
      data,
      gender,
      PEDAGIO_PERCENTAGE,
    );

    const totalCarenciaMonths = this.calculateTotalCarencia(data);

    const meetsAgeRequirement = age >= idadeRequerida;
    const meetsContributionRequirement =
      totalContribution >= pedagioData.tempoTotalNecessario;
    const meetsCarenciaRequirement =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS;

    const actualDate = new Date();

    const ageRequirementDate = meetsAgeRequirement
      ? this.calculateRequirementDateByAge(
          idadeRequerida,
          age,
          birthDate ?? null,
        )
      : null;

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
      : Math.ceil((idadeRequerida - age) * this.MONTHS_IN_YEAR);

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

    const dataQueIraAtingirRequisitoDeIdade = meetsAgeRequirement
      ? null
      : new Date(
          actualDate.getFullYear(),
          actualDate.getMonth() + monthsToAge,
          actualDate.getDate(),
        );

    const dataQueIraAtingirRequisitoDeContribuicao =
      meetsContributionRequirement
        ? null
        : new Date(
            actualDate.getFullYear(),
            actualDate.getMonth() + monthsToContribution,
            actualDate.getDate(),
          );

    const dataQueIraAtingirRequisitoDeCarencia = meetsCarenciaRequirement
      ? null
      : new Date(
          actualDate.getFullYear(),
          actualDate.getMonth() + monthsToCarencia,
          actualDate.getDate(),
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
      totalContributionYears: totalContribution,
      totalContributionYearsAtReforma: pedagioData.totalContributionAtReforma,
      totalCarenciaMonths,
      requirements: {
        idadeRequerida,
        anosDeContribuicaoRequeridos: requiredContribution,
        mesesDeCarenciaRequeridos: REQUIRED_CARENCIA_MONTHS,
        dataQueIraAtingirRequisitoDeIdade,
        dataQueIraAtingirRequisitoDeContribuicao,
        dataQueIraAtingirRequisitoDeCarencia,
        atingiuRequisitoDeIdade: meetsAgeRequirement,
        atingiuRequisitoDeContribuicao: meetsContributionRequirement,
        atingiuRequisitoDeCarencia: meetsCarenciaRequirement,
        dataQueAtingiuRequisitoDeIdade: ageRequirementDate,
        dataQueAtingiuRequisitoDeContribuicao: contributionRequirementDate,
        dataQueAtingiuRequisitoDeCarencia: carenciaRequirementDate,
      },
      eligibility: {
        isEligible,
        eligibilityDate,
        projectedFulfillmentDate: finalProjectedFulfillmentDate,
      },
    };
  }

  private aposentadoriaPorTempoDeContribuicaoComBaseNaRegraDeTransicaoDoArt16(
    data: ConsolidadoRelacaoInterface[],
    gender: string,
    age: number,
    birthDate: Date | undefined,
  ): AnalisePrevidenciariaInterface {
    const REQUIRED_CARENCIA_MONTHS = 180;
    const BASE_AGE_MEN = 61;
    const BASE_AGE_WOMEN = 56;
    const MAX_AGE_MEN = 65;
    const MAX_AGE_WOMEN = 62;
    const PEDAGIO_PERCENTAGE = 0.5;
    const YEARS_INCREASE_START = 2020;
    const currentDate = new Date();
    const anosDeContribuicaoRequeridos =
      gender === 'F'
        ? this.REQUIRED_CONTRIBUTION_WOMEN
        : this.REQUIRED_CONTRIBUTION_MEN;

    const baseAge = gender === 'F' ? BASE_AGE_WOMEN : BASE_AGE_MEN;
    const maxAge = gender === 'F' ? MAX_AGE_WOMEN : MAX_AGE_MEN;

    const totals = this.calculateTotals(data);

    const currentYear = new Date().getFullYear();
    const yearsSince2020 = Math.max(0, currentYear - YEARS_INCREASE_START);

    let idadeRequerida = baseAge + yearsSince2020 * PEDAGIO_PERCENTAGE;
    if (idadeRequerida > maxAge) {
      idadeRequerida = maxAge;
    }

    const meetsContributionRequirement =
      totals.totalInYears >= anosDeContribuicaoRequeridos;

    const meetsCarenciaRequirement =
      totals.carencia >= REQUIRED_CARENCIA_MONTHS;

    const meetsAgeRequirement = age >= idadeRequerida;

    const ageRequirementDate = meetsAgeRequirement
      ? this.calculateRequirementDateByAge(
          idadeRequerida,
          age,
          birthDate ?? null,
        )
      : null;

    const contributionRequirementDate = meetsContributionRequirement
      ? this.calculateContributionRequirementDate(
          data,
          anosDeContribuicaoRequeridos,
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
          anosDeContribuicaoRequeridos,
        );

    const monthsToCarencia = meetsCarenciaRequirement
      ? 0
      : REQUIRED_CARENCIA_MONTHS - totals.carencia;

    const monthsToAge = meetsAgeRequirement
      ? 0
      : Math.ceil((idadeRequerida - age) * this.MONTHS_IN_YEAR);

    const monthsToFulfill = Math.max(
      monthsToContribution,
      monthsToCarencia,
      monthsToAge,
    );

    const dataQueIraAtingirRequisitoDeContribuicao =
      meetsContributionRequirement
        ? null
        : new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + monthsToContribution,
            currentDate.getDate(),
          );

    const dataQueIraAtingirRequisitoDeCarencia = meetsCarenciaRequirement
      ? null
      : new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + monthsToCarencia,
          currentDate.getDate(),
        );

    const dataQueIraAtingirRequisitoDeIdade = meetsAgeRequirement
      ? null
      : new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + monthsToAge,
          currentDate.getDate(),
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
        anosDeContribuicaoRequeridos,
        mesesDeCarenciaRequeridos: REQUIRED_CARENCIA_MONTHS,
        idadeRequerida,
        dataQueIraAtingirRequisitoDeContribuicao,
        dataQueIraAtingirRequisitoDeCarencia,
        dataQueIraAtingirRequisitoDeIdade,
        atingiuRequisitoDeContribuicao: meetsContributionRequirement,
        atingiuRequisitoDeCarencia: meetsCarenciaRequirement,
        atingiuRequisitoDeIdade: meetsAgeRequirement,
        dataQueAtingiuRequisitoDeContribuicao: contributionRequirementDate,
        dataQueAtingiuRequisitoDeCarencia: carenciaRequirementDate,
        dataQueAtingiuRequisitoDeIdade: ageRequirementDate,
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
    consolidadoResumido: ConsolidadoRelacaoInterface[],
    gender: string,
    age: number,
  ): AnalisePrevidenciariaInterface {
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

    const dataQueIraAtingirRequisitoDeContribuicao =
      meetsContributionTimeRequirement
        ? null
        : new Date(
            actualDate.getFullYear(),
            actualDate.getMonth() + monthsToContribution,
            actualDate.getDate(),
          );

    const dataQueIraAtingirRequisitoDeCarencia = meetsCarenciaRequirement
      ? null
      : new Date(
          actualDate.getFullYear(),
          actualDate.getMonth() + monthsToCarencia,
          actualDate.getDate(),
        );

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
        anosDeContribuicaoRequeridos: requiredContribution,
        mesesDeCarenciaRequeridos: REQUIRED_CARENCIA_MONTHS,
        dataQueIraAtingirRequisitoDeContribuicao,
        dataQueIraAtingirRequisitoDeCarencia,
        atingiuRequisitoDeContribuicao: meetsContributionTimeRequirement,
        atingiuRequisitoDeCarencia: meetsCarenciaRequirement,
        dataQueAtingiuRequisitoDeContribuicao: contributionRequirementDate,
        dataQueAtingiuRequisitoDeCarencia: carenciaRequirementDate,
      },
      eligibility: {
        isEligible,
        eligibilityDate,
        projectedFulfillmentDate: finalProjectedFulfillmentDate,
      },
    };
  }

  private aposentadoriaPorIdadeHibridaComDireitoAdquirido(
    data: ConsolidadoRelacaoInterface[],
    gender: string,
    age: number,
    birthDate?: Date,
  ): AnalisePrevidenciariaInterface {
    if (!birthDate) {
      throw new Error('birthDate is required for this calculation.');
    }

    const REQUIRED_CARENCIA_MONTHS = 180;
    const REQUIRED_AGE_MEN = 65;
    const REQUIRED_AGE_WOMEN = 60;

    const cutoff = this.CUTOFF_DATE;
    const idadeRequerida =
      gender === 'F' ? REQUIRED_AGE_WOMEN : REQUIRED_AGE_MEN;

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
          idadeRequerida,
          mesesDeCarenciaRequeridos: REQUIRED_CARENCIA_MONTHS,
          atingiuRequisitoDeIdade: false,
          atingiuRequisitoDeCarencia: false,
          dataQueAtingiuRequisitoDeIdade: null,
          dataQueAtingiuRequisitoDeCarencia: null,
        },
        eligibility: {
          isEligible: false,
          projectedFulfillmentDate: null,
          eligibilityDate: null,
        },
      };
    }

    data.forEach((item) => {
      const inicio = this.toDate(item.validContributionTime?.data?.dataInicio);
      let fim = this.toDate(item.validContributionTime?.data?.dataFim);

      if (!inicio) {
        return;
      }

      if (!fim || fim > cutoff) {
        fim = cutoff;
      }

      if (inicio >= cutoff) {
        item.validContributionTime = {
          data: {
            dataInicio: null,
            dataFim: null,
          },
          abreviado: '0a 0m 0d',
          dias: 0,
          meses: 0,
          anos: 0,
          totalContribuicao: '0',
        };
        return;
      }

      const { years, months, days } = this.diffYmdInclusive(inicio, fim);

      item.validContributionTime = {
        data: {
          dataInicio: inicio,
          dataFim: fim,
        },
        abreviado: `${years}a ${months}m ${days}d`,
        dias: days,
        meses: months,
        anos: years,
        totalContribuicao: undefined,
      };
    });

    const totalCarenciaMonths = this.calculateTotalCarencia(data, cutoff);

    const meetsAgeRequirement = age >= idadeRequerida;
    const meetsCarenciaRequirement =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS;

    const isEligible = meetsAgeRequirement && meetsCarenciaRequirement;

    const ageCompletionDate = new Date(
      birthDate.getFullYear() + idadeRequerida,
      birthDate.getMonth(),
      birthDate.getDate(),
    );

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
        idadeRequerida,
        mesesDeCarenciaRequeridos: REQUIRED_CARENCIA_MONTHS,
        atingiuRequisitoDeIdade: meetsAgeRequirement,
        atingiuRequisitoDeCarencia: meetsCarenciaRequirement,
        dataQueAtingiuRequisitoDeIdade: ageCompletionDate,
        dataQueAtingiuRequisitoDeCarencia: carenciaCompletionDate,
      },
      eligibility: {
        isEligible,
        eligibilityDate,
        projectedFulfillmentDate: null,
      },
    };
  }

  private aposentadoriaPorIdadeUrbanaPrevistaNaRegraDeTransicaoDoArt18(
    data: ConsolidadoRelacaoInterface[],
    gender: string,
    age: number,
    birthDate: Date | undefined,
  ): AnalisePrevidenciariaInterface {
    const REQUIRED_CARENCIA_MONTHS = 180;
    const BASE_AGE_MEN = 65;
    const BASE_AGE_WOMEN = 60;
    const MAX_AGE_WOMEN = 62;
    const REQUIRED_CONTRIBUTION_YEARS = 15;
    const HALF_YEAR_AS_DECIMAL = 0.5;
    const YEARS_INCREASE_START = 2020;

    const currentYear = new Date().getFullYear();
    const yearsSince2020 = Math.max(0, currentYear - YEARS_INCREASE_START);

    let idadeRequerida = gender === 'F' ? BASE_AGE_WOMEN : BASE_AGE_MEN;

    if (gender === 'F') {
      idadeRequerida = BASE_AGE_WOMEN + yearsSince2020 * HALF_YEAR_AS_DECIMAL;
      if (idadeRequerida > MAX_AGE_WOMEN) {
        idadeRequerida = MAX_AGE_WOMEN;
      }
    }

    if (gender === 'M') {
      idadeRequerida = BASE_AGE_MEN;
    }

    const totals = this.calculateTotals(data);

    const totalCarenciaMonths = this.calculateTotalCarencia(data);

    const meetsAgeRequirement = age >= idadeRequerida;
    const meetsContributionRequirement =
      totals.totalInYears >= REQUIRED_CONTRIBUTION_YEARS;
    const meetsCarenciaRequirement =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS;

    const allRequirementsMet =
      meetsAgeRequirement &&
      meetsContributionRequirement &&
      meetsCarenciaRequirement;

    const ageRequirementDate = meetsAgeRequirement
      ? this.calculateRequirementDateByAge(
          idadeRequerida,
          age,
          birthDate ?? null,
        )
      : null;

    const contributionRequirementDate =
      this.calculateContributionRequirementDate(
        data,
        REQUIRED_CONTRIBUTION_YEARS,
      );

    const carenciaRequirementDate = this.calculateCarenciaRequirementDate(
      data,
      REQUIRED_CARENCIA_MONTHS,
    );

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
      : Math.ceil((idadeRequerida - age) * this.MONTHS_IN_YEAR);

    const monthsToContribution = meetsContributionRequirement
      ? 0
      : Math.ceil(
          (REQUIRED_CONTRIBUTION_YEARS - totals.totalInYears) *
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

    const dataQueIraAtingirRequisitoDeIdade = meetsAgeRequirement
      ? null
      : new Date(
          now.getFullYear(),
          now.getMonth() + monthsToAge,
          now.getDate(),
        );

    const dataQueIraAtingirRequisitoDeContribuicao =
      meetsContributionRequirement
        ? null
        : new Date(
            now.getFullYear(),
            now.getMonth() + monthsToContribution,
            now.getDate(),
          );

    const dataQueIraAtingirRequisitoDeCarencia = meetsCarenciaRequirement
      ? null
      : new Date(
          now.getFullYear(),
          now.getMonth() + monthsToCarencia,
          now.getDate(),
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
      totalContributionYears: totals.totalInYears,
      totalCarenciaMonths,
      age,
      requirements: {
        idadeRequerida,
        anosDeContribuicaoRequeridos: REQUIRED_CONTRIBUTION_YEARS,
        mesesDeCarenciaRequeridos: REQUIRED_CARENCIA_MONTHS,
        dataQueIraAtingirRequisitoDeIdade,
        dataQueIraAtingirRequisitoDeContribuicao,
        dataQueIraAtingirRequisitoDeCarencia,
        atingiuRequisitoDeIdade: meetsAgeRequirement,
        atingiuRequisitoDeContribuicao: meetsContributionRequirement,
        atingiuRequisitoDeCarencia: meetsCarenciaRequirement,
        dataQueAtingiuRequisitoDeIdade: ageRequirementDate,
        dataQueAtingiuRequisitoDeContribuicao: contributionRequirementDate,
        dataQueAtingiuRequisitoDeCarencia: carenciaRequirementDate,
      },
      eligibility: {
        isEligible: allRequirementsMet,
        eligibilityDate,
        projectedFulfillmentDate: finalProjectedFulfillmentDate,
      },
    };
  }

  private aposentadoriaPorIdadeHibridaPrevistaNaRegraDeTransicaoDoArt18(
    data: ConsolidadoRelacaoInterface[],
    gender: string,
    age: number,
    birthDate: Date | undefined,
  ): AnalisePrevidenciariaInterface {
    const REQUIRED_CARENCIA_MONTHS = 180;
    const BASE_AGE_MEN = 65;
    const BASE_AGE_WOMEN = 60;
    const MAX_AGE_WOMEN = 62;
    const REQUIRED_CONTRIBUTION_YEARS = 15;

    const idadeRequerida = gender === 'F' ? BASE_AGE_WOMEN : BASE_AGE_MEN;
    const calculatedTotals = this.calculateTotals(data);

    const currentYear = new Date().getFullYear();
    const year2020 = 2020;

    const SIX_MONTHS_IN_YEARS_PERCENTUAL = 0.5;

    let requiredAgeAdjusted = idadeRequerida;
    if (gender === 'F') {
      const yearsSince2020 = Math.max(0, currentYear - year2020);
      requiredAgeAdjusted = Math.min(
        idadeRequerida + yearsSince2020 * SIX_MONTHS_IN_YEARS_PERCENTUAL,
        MAX_AGE_WOMEN,
      );
    }
    if (gender === 'M') {
      const yearsSince2020 = Math.max(0, currentYear - year2020);
      requiredAgeAdjusted = Math.min(
        idadeRequerida + yearsSince2020 * SIX_MONTHS_IN_YEARS_PERCENTUAL,
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
          idadeRequerida: requiredAgeAdjusted,
          anosDeContribuicaoRequeridos: REQUIRED_CONTRIBUTION_YEARS,
          mesesDeCarenciaRequeridos: REQUIRED_CARENCIA_MONTHS,
          atingiuRequisitoDeIdade: false,
          atingiuRequisitoDeContribuicao: false,
          atingiuRequisitoDeCarencia: false,
          dataQueAtingiuRequisitoDeIdade: null,
          dataQueAtingiuRequisitoDeContribuicao: null,
          dataQueAtingiuRequisitoDeCarencia: null,
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

    const ageRequirementDate = meetsAgeRequirement
      ? this.calculateRequirementDateByAge(
          idadeRequerida,
          age,
          birthDate ?? null,
        )
      : null;

    const contributionRequirementDate =
      this.calculateContributionRequirementDate(
        data,
        REQUIRED_CONTRIBUTION_YEARS,
      );

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

    const dataQueIraAtingirRequisitoDeIdade = meetsAgeRequirement
      ? null
      : new Date(
          actualDate.getFullYear(),
          actualDate.getMonth() + monthsToAge,
          actualDate.getDate(),
        );

    const dataQueIraAtingirRequisitoDeContribuicao =
      meetsContributionRequirement
        ? null
        : new Date(
            actualDate.getFullYear(),
            actualDate.getMonth() + monthsToContribution,
            actualDate.getDate(),
          );

    const dataQueIraAtingirRequisitoDeCarencia = meetsCarenciaRequirement
      ? null
      : new Date(
          actualDate.getFullYear(),
          actualDate.getMonth() + monthsToCarencia,
          actualDate.getDate(),
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
        idadeRequerida: requiredAgeAdjusted,
        anosDeContribuicaoRequeridos: REQUIRED_CONTRIBUTION_YEARS,
        mesesDeCarenciaRequeridos: REQUIRED_CARENCIA_MONTHS,
        dataQueIraAtingirRequisitoDeIdade,
        dataQueIraAtingirRequisitoDeContribuicao,
        dataQueIraAtingirRequisitoDeCarencia,
        atingiuRequisitoDeIdade: meetsAgeRequirement,
        atingiuRequisitoDeContribuicao: meetsContributionRequirement,
        atingiuRequisitoDeCarencia: meetsCarenciaRequirement,
        dataQueAtingiuRequisitoDeIdade: ageRequirementDate,
        dataQueAtingiuRequisitoDeContribuicao: contributionRequirementDate,
        dataQueAtingiuRequisitoDeCarencia: carenciaRequirementDate,
      },
      eligibility: {
        isEligible,
        eligibilityDate,
        projectedFulfillmentDate: finalProjectedFulfillmentDate,
      },
    };
  }

  private aposentadoriaProgramadaComumPrevistaNoArt19(
    data: ConsolidadoRelacaoInterface[],
    gender: string,
    age: number,
    birthDate: Date | undefined,
  ): AnalisePrevidenciariaInterface {
    const REQUIRED_CARENCIA_MONTHS = 180;
    const REQUIRED_AGE_WOMEN = 62;
    const REQUIRED_AGE_MEN = 65;
    const REQUIRED_CONTRIBUTION_MEN = 20;
    const REQUIRED_CONTRIBUTION_WOMEN = 15;
    const REQUIRED_CONTRIBUTION_YEARS =
      gender === 'F' ? REQUIRED_CONTRIBUTION_WOMEN : REQUIRED_CONTRIBUTION_MEN;

    const idadeRequerida =
      gender === 'F' ? REQUIRED_AGE_WOMEN : REQUIRED_AGE_MEN;

    const totals = this.calculateTotals(data);

    const totalCarenciaMonths = this.calculateTotalCarencia(data);

    const meetsAgeRequirement = age >= idadeRequerida;
    const meetsContributionRequirement =
      totals.totalInYears >= REQUIRED_CONTRIBUTION_YEARS;
    const meetsCarenciaRequirement =
      totalCarenciaMonths >= REQUIRED_CARENCIA_MONTHS;

    const ageRequirementDate = meetsAgeRequirement
      ? this.calculateRequirementDateByAge(
          idadeRequerida,
          age,
          birthDate ?? null,
        )
      : null;

    const contributionRequirementDate =
      this.calculateContributionRequirementDate(
        data,
        REQUIRED_CONTRIBUTION_YEARS,
      );

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

    const missingAgeYears = meetsAgeRequirement ? 0 : idadeRequerida - age;

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

    const dataQueIraAtingirRequisitoDeIdade = meetsAgeRequirement
      ? null
      : new Date(
          now.getFullYear(),
          now.getMonth() + missingAgeMonths,
          now.getDate(),
        );

    const dataQueIraAtingirRequisitoDeContribuicao =
      meetsContributionRequirement
        ? null
        : new Date(
            now.getFullYear(),
            now.getMonth() + missingContributionMonths,
            now.getDate(),
          );

    const dataQueIraAtingirRequisitoDeCarencia = meetsCarenciaRequirement
      ? null
      : new Date(
          now.getFullYear(),
          now.getMonth() + missingCarenciaMonths,
          now.getDate(),
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
        idadeRequerida,
        anosDeContribuicaoRequeridos: REQUIRED_CONTRIBUTION_YEARS,
        mesesDeCarenciaRequeridos: REQUIRED_CARENCIA_MONTHS,
        dataQueIraAtingirRequisitoDeIdade,
        dataQueIraAtingirRequisitoDeContribuicao,
        dataQueIraAtingirRequisitoDeCarencia,
        atingiuRequisitoDeIdade: meetsAgeRequirement,
        atingiuRequisitoDeContribuicao: meetsContributionRequirement,
        atingiuRequisitoDeCarencia: meetsCarenciaRequirement,
        dataQueAtingiuRequisitoDeIdade: ageRequirementDate,
        dataQueAtingiuRequisitoDeContribuicao: contributionRequirementDate,
        dataQueAtingiuRequisitoDeCarencia: carenciaRequirementDate,
      },
      eligibility: {
        isEligible: allRequirementsMet,
        eligibilityDate,
        projectedFulfillmentDate: finalProjectedFulfillmentDate,
      },
    };
  }

  private calculateTotalContribuicao(
    earningsHistory: CnisSessionSocialSecurityAffiliationEarningsHistoryModel[],
  ): string {
    const earningsObj: { salario: number; competencia: string }[] =
      earningsHistory.map((earning) => {
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
            return {
              salario:
                salario > tetoData.tetoInss ? tetoData.tetoInss : salario,
              competencia: dataRemuneracao.toISOString().split('T')[0] ?? '',
            };
          } else {
            return {
              salario,
              competencia: dataRemuneracao.toISOString().split('T')[0] ?? '',
            };
          }
        }
        return {
          salario: 0,
          competencia: '',
        };
      });

    const earnings = earningsObj.reduce((acc, item) => {
      const COMPETENCIA_YEAR_START = 0;
      const COMPETENCIA_YEAR_END = 4;
      const COMPETENCIA_MONTH_START = 5;
      const COMPETENCIA_MONTH_END = 7;

      const competenciaFormatted =
        item.competencia.slice(COMPETENCIA_MONTH_START, COMPETENCIA_MONTH_END) +
        '/' +
        item.competencia.slice(COMPETENCIA_YEAR_START, COMPETENCIA_YEAR_END);
      const fatorData = ipcaData.find(
        (f) => f.competencia === competenciaFormatted,
      );
      const fatorCorrecao = fatorData ? fatorData.fatorSimplificado : 1;

      const valorCorrigido = item.salario * fatorCorrecao;
      return acc + valorCorrigido;
    }, 0);

    return earnings.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
