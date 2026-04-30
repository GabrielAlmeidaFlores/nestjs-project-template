import { Injectable } from '@nestjs/common';

import { TetoInssData } from '@lib/cnis-analyzer/data/teto.inss';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { CnisXRayAnalysisGateway } from '@module/customer/analysis-tool/lib/cnis-x-ray-analysis/cnis-x-ray-analysis.gateway';
import { CnisWorkPeriodCategoryEnum } from '@module/customer/analysis-tool/lib/cnis-x-ray-analysis/enum/cnis-work-period-category.enum';
import { CnisWorkPeriodEarningsHistoryModel } from '@module/customer/analysis-tool/lib/cnis-x-ray-analysis/model/cnis-work-period-earnings-history.model';
import { CnisWorkPeriodModel } from '@module/customer/analysis-tool/lib/cnis-x-ray-analysis/model/cnis-work-period.model';
import { CnisWorkPeriodsResponseModel } from '@module/customer/analysis-tool/lib/cnis-x-ray-analysis/model/cnis-work-periods-response.model';

import type { CnisModel } from '@lib/cnis-processor/model/generic/cnis.model';

interface PeriodAccumulatorInterface {
  carenciaDestravada: boolean;
  contaTempo: boolean;
}

@Injectable()
export class CnisXRayAnalysisService implements CnisXRayAnalysisGateway {
  protected readonly _type = CnisXRayAnalysisService.name;

  private readonly MESES_PARA_PERDA_CI = 15;

  private readonly FERIADOS_NACIONAIS = [
    '01/01',
    '21/04',
    '01/05',
    '07/09',
    '12/10',
    '02/11',
    '15/11',
    '20/11',
    '25/12',
  ];

  private readonly INDICADORES_DE_PENDENCIA = ['PEXT'];

  public analyze(
    cnisModel: CnisModel,
    _analysisToolClient: AnalysisToolClientEntity,
  ): CnisWorkPeriodsResponseModel {
    const workPeriods: CnisWorkPeriodModel[] = [];

    for (const relation of cnisModel.socialSecurityRelations ?? []) {
      const info = relation.socialSecurityAffiliationInfo;

      if (info.dataInicio === undefined) {
        continue;
      }

      const typeOfContribution = this.resolveTypeOfContribution(
        info.origemDoVinculo,
      );

      const contributionAverage = this.calculateContributionAverage(
        relation.socialSecurityAffiliationEarningsHistory,
      );

      const competenceBelowTheMinimum = this.hasAnyCompetenceBelowMinimum(
        relation.socialSecurityAffiliationEarningsHistory,
      );

      const delayPayment = this.hasAnyDelayedPayment(
        relation.socialSecurityAffiliationEarningsHistory,
      );

      const pendencyReason = this.resolvePendencyReason(
        info.dataFim,
        competenceBelowTheMinimum,
        delayPayment,
      );

      const earningsHistory: CnisWorkPeriodEarningsHistoryModel[] = [];

      const accumulator: PeriodAccumulatorInterface = {
        carenciaDestravada: false,
        contaTempo: true,
      };

      relation.socialSecurityAffiliationEarningsHistory.forEach(
        (earning, index) => {
          const competenceBelowTheMinimumForEntry =
            this.isEarningCompetenceBelowMinimum(earning);

          const competence = earning.competencia ?? new Date();
          const dataVencimento = this.calcularDataVencimento(
            competence.getMonth() + 1,
            competence.getFullYear(),
          );

          const paymentDate = earning.dataPgto ?? new Date();
          const paymentOnTime = this.checkPaymentOnTime(
            paymentDate,
            dataVencimento,
          );

          const tipoUpper = (info.origemDoVinculo ?? '').toUpperCase();
          const isEmpregado = this.isEmpregado(tipoUpper);
          const isContribuinteIndividual =
            this.isContribuinteIndividual(tipoUpper);
          const isFacultativo = this.isFacultativo(tipoUpper);

          const indicadores = info.indicadores ?? '';
          const possuiIndicadorImped =
            indicadores.includes('PEXT') || indicadores.includes('PREM-EXT');

          if (index === 0) {
            accumulator.carenciaDestravada = false;
            accumulator.contaTempo = true;
          }

          const result = this.calculateEarningFlags(
            accumulator,
            possuiIndicadorImped,
            isEmpregado,
            isContribuinteIndividual,
            isFacultativo,
            paymentOnTime,
            paymentDate,
            dataVencimento,
          );

          accumulator.carenciaDestravada = result.carenciaDestravada;
          accumulator.contaTempo = result.contaTempo;

          const analysisText = this.buildAnalysisText(
            paymentOnTime,
            result.contaCarencia,
            result.valida,
            result.contribuicaoEmDia,
            result.contaTempo,
          );

          const entry = CnisWorkPeriodEarningsHistoryModel.build({
            ...(earning.competencia !== undefined && {
              competence: earning.competencia,
            }),
            ...(earning.remuneracao !== undefined && {
              remuneration: earning.remuneracao,
            }),
            ...(earning.indicadores !== undefined && {
              indicators: earning.indicadores,
            }),
            ...(earning.dataPgto !== undefined && {
              paymentDate: earning.dataPgto,
            }),
            ...(earning.contribuicao !== undefined && {
              contribution: earning.contribuicao,
            }),
            ...(earning.salarioContribuicao !== undefined && {
              contributionSalary: earning.salarioContribuicao,
            }),
            competenceBelowTheMinimum: competenceBelowTheMinimumForEntry,
            paymentOnTime,
            countsForCarencia: result.contaCarencia,
            validCompetence: result.valida,
            contributionOnTime: result.contribuicaoEmDia,
            countsForContributionTime: result.contaTempo,
            analysis: analysisText,
          });

          if (this.hasEarningPendency(entry)) {
            earningsHistory.push(entry);
          }
        },
      );

      workPeriods.push(
        CnisWorkPeriodModel.build({
          startDate: info.dataInicio,
          ...(info.dataFim !== undefined && { endDate: info.dataFim }),
          category: this.mapOrigemToCategory(info.origemDoVinculo),
          ...(info.origemDoVinculo !== undefined && {
            bondOrigin: info.origemDoVinculo,
          }),
          typeOfContribution,
          isPendency: pendencyReason !== '',
          competenceBelowTheMinimum,
          contributionAverage,
          ...(pendencyReason !== '' && { pendencyReason }),
          status: pendencyReason === '',
          earningsHistory,
        }),
      );
    }

    return CnisWorkPeriodsResponseModel.build({ workPeriods });
  }

  private resolveTypeOfContribution(origemDoVinculo?: string): string {
    const origem = (origemDoVinculo ?? '').toUpperCase();
    const isRural =
      origem === 'PERÍODO DE ATIVIDADE DE SEGURADO ESPECIAL' ||
      origem === 'SEGURADO ESPECIAL';
    return isRural ? 'Rural' : 'Urbano';
  }

  private calculateContributionAverage(
    earningsHistory: Array<{ salarioContribuicao?: string }>,
  ): number {
    const history = earningsHistory;

    const total = history
      .map((e) => {
        const value = this.parseRemunerationString(e.salarioContribuicao);
        return value === null || isNaN(value) ? 0 : value;
      })
      .reduce((acc, curr) => acc + curr, 0);

    return history.length > 0 ? total / history.length : 0;
  }

  private hasAnyCompetenceBelowMinimum(
    earningsHistory: Array<{ competencia?: Date; remuneracao?: string }>,
  ): boolean {
    return earningsHistory.some((earning) => {
      return TetoInssData.some((teto) => {
        if (!earning.competencia) {
          return false;
        }
        if (teto.ano !== earning.competencia.getFullYear()) {
          return false;
        }
        const remuneration = this.parseRemunerationString(earning.remuneracao);
        if (remuneration === null || isNaN(remuneration)) {
          return false;
        }
        return remuneration < teto.salarioMinimo;
      });
    });
  }

  private isEarningCompetenceBelowMinimum(earning: {
    competencia?: Date;
    remuneracao?: string;
  }): boolean {
    if (!earning.competencia) {
      return false;
    }
    const year = earning.competencia.getFullYear();
    const tetoEntry = TetoInssData.find((teto) => teto.ano === year);
    if (!tetoEntry) {
      return false;
    }
    const remuneration = this.parseRemunerationString(earning.remuneracao);
    if (remuneration === null || isNaN(remuneration)) {
      return false;
    }
    return remuneration < tetoEntry.salarioMinimo;
  }

  private hasAnyDelayedPayment(
    earningsHistory: Array<{ indicadores?: string }>,
  ): boolean {
    return earningsHistory.some((earning) => {
      if (earning.indicadores === undefined || earning.indicadores === '') {
        return false;
      }
      return this.INDICADORES_DE_PENDENCIA.includes(earning.indicadores);
    });
  }

  private resolvePendencyReason(
    dataFim: Date | undefined,
    competenceBelowTheMinimum: boolean,
    delayPayment: boolean,
  ): string {
    if (dataFim === undefined) {
      return 'LEAVE_DATE';
    }
    if (competenceBelowTheMinimum) {
      return 'COMPETENCE_BELOW_MINIMUM';
    }
    if (delayPayment) {
      return 'INCONSISTENT_COMPETENCE';
    }
    return '';
  }

  private calculateEarningFlags(
    accumulator: PeriodAccumulatorInterface,
    possuiIndicadorImped: boolean,
    isEmpregado: boolean,
    isContribuinteIndividual: boolean,
    isFacultativo: boolean,
    paymentOnTime: boolean,
    paymentDate: Date,
    dataVencimento: Date,
  ): {
    carenciaDestravada: boolean;
    contaTempo: boolean;
    contaCarencia: boolean;
    valida: boolean;
    contribuicaoEmDia: boolean;
  } {
    let { carenciaDestravada, contaTempo } = accumulator;
    let contaCarencia = false;
    let valida = false;
    let contribuicaoEmDia = false;

    if (possuiIndicadorImped) {
      return {
        carenciaDestravada,
        contaTempo: false,
        contaCarencia: false,
        valida: false,
        contribuicaoEmDia: false,
      };
    }

    if (isEmpregado) {
      contribuicaoEmDia = true;
      carenciaDestravada = true;
      contaCarencia = true;
      valida = true;
    } else {
      const fatalLimit = this.calcularLimiteFatal(
        dataVencimento,
        this.MESES_PARA_PERDA_CI,
      );

      if (paymentOnTime) {
        carenciaDestravada = true;
        contaCarencia = true;
        valida = true;
      } else if (!carenciaDestravada) {
        if (isContribuinteIndividual) {
          contaCarencia = false;
          valida = true;
        } else if (isFacultativo) {
          contaCarencia = false;
          valida = false;
          contaTempo = false;
        }
      } else {
        if (paymentDate <= fatalLimit) {
          contaCarencia = true;
          valida = true;
        } else {
          contaCarencia = false;
          valida = false;
          contaTempo = false;
          carenciaDestravada = false;
        }
      }
    }

    return {
      carenciaDestravada,
      contaTempo,
      contaCarencia,
      valida,
      contribuicaoEmDia,
    };
  }

  private hasEarningPendency(
    entry: CnisWorkPeriodEarningsHistoryModel,
  ): boolean {
    return (
      entry.competenceBelowTheMinimum ||
      !entry.paymentOnTime ||
      !entry.validCompetence ||
      !entry.countsForContributionTime
    );
  }

  private buildAnalysisText(
    paymentOnTime: boolean,
    contaCarencia: boolean,
    valida: boolean,
    contribuicaoEmDia: boolean,
    contaTempo: boolean,
  ): string {
    return (
      [
        paymentOnTime ? 'Pagamento em dia' : 'Pagamento em atraso',
        contaCarencia ? 'Conta para carência' : 'Não conta para carência',
        valida ? 'Competência válida' : 'Competência inválida',
        contribuicaoEmDia
          ? 'Contribuição considerada em dia'
          : 'Contribuição não considerada em dia',
        contaTempo
          ? 'Conta para tempo de contribuição'
          : 'Não conta para tempo de contribuição',
      ].join('. ') + '.'
    );
  }

  private isEmpregado(tipoUpper: string): boolean {
    return (
      tipoUpper.includes('EMPREGADO') ||
      tipoUpper.includes('DOMÉSTICO') ||
      tipoUpper.includes('DOMESTICO') ||
      tipoUpper.includes('AVULSO') ||
      tipoUpper.includes('PÚBLICO') ||
      tipoUpper.includes('PUBLICO')
    );
  }

  private isContribuinteIndividual(tipoUpper: string): boolean {
    return (
      tipoUpper.includes('CONTRIBUINTE') || tipoUpper.includes('INDIVIDUAL')
    );
  }

  private isFacultativo(tipoUpper: string): boolean {
    return tipoUpper.includes('FACULTATIVO');
  }

  private parseRemunerationString(input?: string): number | null {
    if (input === undefined) {
      return null;
    }
    const raw = input.trim();
    if (!raw) {
      return null;
    }

    let s = raw.replace(/[^\d.,-]/g, '').replace(/\s+/g, '');

    const hasComma = s.includes(',');
    const hasDot = s.includes('.');

    const THOUSANDS_GROUP_LENGTH = 3;

    if (hasComma && hasDot) {
      s = s.replace(/\./g, '').replace(',', '.');
    } else if (hasComma) {
      s = s.replace(',', '.');
    } else if (hasDot) {
      const parts = s.split('.');
      if (!parts.length) {
        return null;
      }
      const lastPart = parts[parts.length - 1];
      if (
        parts.length > 2 ||
        (typeof lastPart === 'string' &&
          lastPart.length === THOUSANDS_GROUP_LENGTH)
      ) {
        s = s.replace(/\./g, '');
      }
    }

    const n = Number(s);
    return Number.isFinite(n) ? n : null;
  }

  private calcularDataVencimento(month: number, year: number): Date {
    const DAY_15 = 15;
    const MONTHS_IN_YEAR = 12;
    let mesVencimento = month + 1;
    let anoVencimento = year;
    if (mesVencimento > MONTHS_IN_YEAR) {
      mesVencimento = 1;
      anoVencimento++;
    }
    const dataBase = new Date(anoVencimento, mesVencimento - 1, DAY_15);
    return this.nextBusinessDay(dataBase);
  }

  private nextBusinessDay(data: Date): Date {
    const novaData = new Date(data);
    while (!this.isDayUtil(novaData)) {
      novaData.setDate(novaData.getDate() + 1);
    }
    return novaData;
  }

  private isDayUtil(data: Date): boolean {
    const DAY_WEEKEND_SATURDAY = 6;
    const DAY_WEEKEND_SUNDAY = 0;
    const diaSemana = data.getDay();
    if (
      diaSemana === DAY_WEEKEND_SUNDAY ||
      diaSemana === DAY_WEEKEND_SATURDAY
    ) {
      return false;
    }
    const diaFormatado = `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}`;
    return !this.FERIADOS_NACIONAIS.includes(diaFormatado);
  }

  private checkPaymentOnTime(paymentDate: Date, dueDate: Date): boolean {
    const pag = new Date(
      paymentDate.getFullYear(),
      paymentDate.getMonth(),
      paymentDate.getDate(),
    );
    const venc = new Date(
      dueDate.getFullYear(),
      dueDate.getMonth(),
      dueDate.getDate(),
    );
    return pag <= venc;
  }

  private calcularLimiteFatal(dataBase: Date, mesesPeriodoGraca: number): Date {
    const DAY_16 = 16;
    const fimPeriodoGraca = new Date(
      dataBase.getFullYear(),
      dataBase.getMonth() + mesesPeriodoGraca,
      1,
    );
    return new Date(
      fimPeriodoGraca.getFullYear(),
      fimPeriodoGraca.getMonth() + 1,
      DAY_16,
    );
  }

  private mapOrigemToCategory(
    origemDoVinculo?: string,
  ): CnisWorkPeriodCategoryEnum {
    const origem = (origemDoVinculo ?? '').toLowerCase();

    if (origem.includes('domest')) {
      return CnisWorkPeriodCategoryEnum.EMPREGO_DOMESTICO;
    }
    if (origem.includes('avulso')) {
      return CnisWorkPeriodCategoryEnum.TRABALHADOR_AVULSO;
    }
    if (origem.includes('mei')) {
      return CnisWorkPeriodCategoryEnum.MEI;
    }
    if (origem.includes('especial')) {
      return CnisWorkPeriodCategoryEnum.SEGURADO_ESPECIAL;
    }
    if (origem.includes('facultat')) {
      return CnisWorkPeriodCategoryEnum.SEGURADO_FACULTATIVO;
    }
    if (origem.includes('individual') && origem.includes('prestador')) {
      return CnisWorkPeriodCategoryEnum.CONTRIBUINTE_INDIVIDUAL_PRESTADOR;
    }
    if (origem.includes('individual')) {
      return CnisWorkPeriodCategoryEnum.CONTRIBUINTE_INDIVIDUAL_AUTONOMO;
    }
    if (origem.includes('rural')) {
      return CnisWorkPeriodCategoryEnum.EMPREGADO_RURAL;
    }
    return CnisWorkPeriodCategoryEnum.EMPREGADO_URBANO;
  }
}
