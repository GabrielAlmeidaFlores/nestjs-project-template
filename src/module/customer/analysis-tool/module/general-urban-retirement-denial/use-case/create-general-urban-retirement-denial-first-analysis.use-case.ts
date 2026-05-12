import { Inject, Injectable } from '@nestjs/common';
import moment from 'moment';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { TetoInssData } from '@lib/cnis-analyzer/data/teto.inss';
import { CnisAnalysisResultModel } from '@lib/cnis-analyzer/model/generic/cnis-analysis-result.model';
import { CnisModel } from '@lib/cnis-processor/model/generic/cnis.model';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-record-not-found.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/module/cnis-fast-analysis/error/cnis-document-is-not-valid.error';
import { GeneralUrbanRetirementDenialQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial/query/general-urban-retirement-denial.query.repository.gateway';
import { GetGeneralUrbanRetirementDenialTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-time-accelerator/query/result/get-general-urban-retirement-denial-time-accelerator.query.result';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/enum/general-urban-retirement-denial-document-type.enum';
import { GeneralUrbanRetirementDenialPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-consideration.enum';
import { GeneralUrbanRetirementDenialPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-pendency-reason.enum';
import { GeneralUrbanRetirementDenialPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-work-type.enum';
import { CreateGeneralUrbanRetirementDenialFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/create-general-urban-retirement-denial-first-analysis.response.dto';
import { GeneralUrbanRetirementDenialCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/general-urban-retirement-denial-cnis-document-not-found.error';
import { GeneralUrbanRetirementDenialNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/general-urban-retirement-denial-not-found.error';
import {
  GeneralUrbanRetirementDenialFirstAnalysisClientDataModel,
  GeneralUrbanRetirementDenialFirstAnalysisEarningsHistoryItemModel,
  GeneralUrbanRetirementDenialFirstAnalysisModel,
  GeneralUrbanRetirementDenialFirstAnalysisPeriodModel,
  GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryModel,
  GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryScenarioModel,
} from '@module/customer/analysis-tool/module/general-urban-retirement-denial/model/generic/general-urban-retirement-denial-first-analysis.model';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

interface ContributionTimeInterface {
  years: number;
  months: number;
  days: number;
}

@Injectable()
export class CreateGeneralUrbanRetirementDenialFirstAnalysisUseCase {
  protected readonly _type =
    CreateGeneralUrbanRetirementDenialFirstAnalysisUseCase.name;

  private readonly FERIADOS_NACIONAIS: string[];

  public constructor(
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(CnisAnalyzerGateway)
    private readonly cnisAnalyzerGateway: CnisAnalyzerGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(GeneralUrbanRetirementDenialQueryRepositoryGateway)
    private readonly generalUrbanRetirementDenialQueryRepositoryGateway: GeneralUrbanRetirementDenialQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
  ) {
    this.FERIADOS_NACIONAIS = [
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
  }

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
  ): Promise<CreateGeneralUrbanRetirementDenialFirstAnalysisResponseDto> {
    const generalUrbanRetirementDenial =
      await this.generalUrbanRetirementDenialQueryRepositoryGateway.findOneByGeneralUrbanRetirementDenialIdOrFailWithRelations(
        generalUrbanRetirementDenialId,
        GeneralUrbanRetirementDenialNotFoundError,
      );

    const cnisDocument = (
      generalUrbanRetirementDenial.generalUrbanRetirementDenialDocument ?? []
    ).find(
      (doc) => doc.type === GeneralUrbanRetirementDenialDocumentTypeEnum.CNIS,
    );

    if (!cnisDocument) {
      throw new GeneralUrbanRetirementDenialCnisDocumentNotFoundError();
    }

    const analysisToolRecord =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByGeneralUrbanRetirementDenialIdAndOrganizationIdAndAuthIdentityIdOrFail(
        generalUrbanRetirementDenialId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AnalysisToolRecordNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolRecord.analysisToolClient,
      createdBy: analysisToolRecord.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecord.analysisToolClient.updatedBy.id,
    });

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDocument.document,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const analyzedCnis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const timeAccelerators =
      generalUrbanRetirementDenial.generalUrbanRetirementDenialTimeAccelerator ??
      [];

    const clientData = this.buildClientDataFromCnis(analyzedCnis);
    const periods = this.buildPeriodsFromCnis(cnisData, analyzedCnis);
    const timeSummary = this.buildTimeSummary(analyzedCnis, timeAccelerators);

    return CreateGeneralUrbanRetirementDenialFirstAnalysisResponseDto.build({
      generalUrbanRetirementDenialFirstAnalysis:
        GeneralUrbanRetirementDenialFirstAnalysisModel.build({
          clientData,
          timeSummary,
          periods,
        }),
    });
  }

  private buildClientDataFromCnis(
    analyzedCnis: CnisAnalysisResultModel,
  ): GeneralUrbanRetirementDenialFirstAnalysisClientDataModel {
    const { clientData } = analyzedCnis;
    return GeneralUrbanRetirementDenialFirstAnalysisClientDataModel.build({
      name: clientData.clientName ?? '',
      ...(clientData.clientFederalDocument !== undefined && {
        cpf: clientData.clientFederalDocument,
      }),
      ...(clientData.clientNIT !== undefined && { nit: clientData.clientNIT }),
      ...(clientData.clientBirthDate !== undefined && {
        birthDate: this.formatDate(clientData.clientBirthDate),
      }),
    });
  }

  private buildPeriodsFromCnis(
    cnisData: CnisModel,
    analyzedCnis: CnisAnalysisResultModel,
  ): GeneralUrbanRetirementDenialFirstAnalysisPeriodModel[] {
    if (!cnisData.socialSecurityRelations) {
      return [];
    }

    const validRelations = cnisData.socialSecurityRelations.filter(
      (relation) =>
        relation.socialSecurityAffiliationInfo.dataInicio !== undefined,
    );

    return validRelations.map((relation) => {
      const info = relation.socialSecurityAffiliationInfo;
      const earnings = relation.socialSecurityAffiliationEarningsHistory;
      const origemDoVinculo = info.origemDoVinculo ?? '';

      const workType =
        origemDoVinculo === 'PERÍODO DE ATIVIDADE DE SEGURADO ESPECIAL' ||
        origemDoVinculo === 'SEGURADO ESPECIAL'
          ? GeneralUrbanRetirementDenialPeriodWorkTypeEnum.RURAL
          : GeneralUrbanRetirementDenialPeriodWorkTypeEnum.URBAN;

      const contributionTotal = earnings
        .map((e) => this.parseRemunerationString(e.remuneracao) ?? 0)
        .reduce((acc, v) => acc + v, 0);

      const contributionAverage =
        earnings.length > 0 ? contributionTotal / earnings.length : 0;

      const competenceBelowTheMinimum = earnings.some((e) => {
        if (!e.competencia) {
          return false;
        }
        const year = e.competencia.getFullYear();
        const teto = TetoInssData.find((t) => t.ano === year);
        if (!teto) {
          return false;
        }
        const rem = this.parseRemunerationString(e.remuneracao);
        return rem !== null && rem < teto.salarioMinimo;
      });

      const hasPextIndicator = earnings.some(
        (e) => e.indicadores?.includes('PEXT') === true,
      );

      const earningsHistory = this.buildEarningsHistory(
        earnings,
        origemDoVinculo,
      );

      const hasLateContribution = earningsHistory.some(
        (e) =>
          e.pendencyType ===
          GeneralUrbanRetirementDenialPeriodPendencyReasonEnum.LATE_CONTRIBUTION,
      );

      const reasonPendency: GeneralUrbanRetirementDenialPeriodPendencyReasonEnum | null =
        info.dataFim === undefined
          ? GeneralUrbanRetirementDenialPeriodPendencyReasonEnum.LEAVE_DATE
          : competenceBelowTheMinimum
            ? GeneralUrbanRetirementDenialPeriodPendencyReasonEnum.COMPETENCE_BELOW_MINIMUM
            : hasPextIndicator
              ? GeneralUrbanRetirementDenialPeriodPendencyReasonEnum.INCONSISTENT_COMPETENCE
              : hasLateContribution
                ? GeneralUrbanRetirementDenialPeriodPendencyReasonEnum.LATE_CONTRIBUTION
                : null;

      const isPendency = reasonPendency !== null;

      const finalEarningsHistory =
        reasonPendency ===
          GeneralUrbanRetirementDenialPeriodPendencyReasonEnum.LEAVE_DATE &&
        earningsHistory.length === 0
          ? [
              GeneralUrbanRetirementDenialFirstAnalysisEarningsHistoryItemModel.build(
                {
                  ...(info.dataInicio !== undefined && {
                    competence: this.formatDate(info.dataInicio),
                  }),
                  pendencyType:
                    GeneralUrbanRetirementDenialPeriodPendencyReasonEnum.LEAVE_DATE,
                },
              ),
            ]
          : earningsHistory;

      const consolidadoItem = analyzedCnis.consolidadoResumido.find(
        (item) => item.seq === info.seq,
      );

      return GeneralUrbanRetirementDenialFirstAnalysisPeriodModel.build({
        ...(origemDoVinculo.length > 0 && { bondOrigin: origemDoVinculo }),
        startDate: info.dataInicio ? this.formatDate(info.dataInicio) : '',
        ...(info.dataFim !== undefined && {
          endDate: this.formatDate(info.dataFim),
        }),
        workType,
        competenceBelowTheMinimum,
        contributionAverage: new DecimalValue(contributionAverage),
        isPendency,
        ...(reasonPendency !== null && { pendencyReason: reasonPendency }),
        status: !isPendency,
        ...(consolidadoItem?.validContributionTime !== undefined && {
          impactMonths: consolidadoItem.validContributionTime.meses,
        }),
        ...(consolidadoItem?.carencia !== undefined && {
          graceMonths: consolidadoItem.carencia,
        }),
        periodConsideration:
          GeneralUrbanRetirementDenialPeriodConsiderationEnum.NAO,
        wantsToComplementViaMeuINSS: false,
        ...(finalEarningsHistory.length > 0 && {
          earningsHistory: finalEarningsHistory,
        }),
      });
    });
  }

  private buildEarningsHistory(
    earnings: Array<{
      competencia?: Date;
      remuneracao?: string;
      indicadores?: string;
      dataPgto?: Date;
    }>,
    origemDoVinculo: string,
  ): GeneralUrbanRetirementDenialFirstAnalysisEarningsHistoryItemModel[] {
    const tipoUpper = origemDoVinculo.toUpperCase();
    const isEmpregado =
      tipoUpper.includes('EMPREGADO') ||
      tipoUpper.includes('DOMÉSTICO') ||
      tipoUpper.includes('DOMESTICO') ||
      tipoUpper.includes('AVULSO') ||
      tipoUpper.includes('PÚBLICO') ||
      tipoUpper.includes('PUBLICO');

    const result: GeneralUrbanRetirementDenialFirstAnalysisEarningsHistoryItemModel[] =
      [];

    for (const earning of earnings) {
      if (earning.indicadores?.includes('PEXT') === true) {
        result.push(
          GeneralUrbanRetirementDenialFirstAnalysisEarningsHistoryItemModel.build(
            {
              ...(earning.competencia !== undefined && {
                competence: this.formatDate(earning.competencia),
              }),
              ...(earning.remuneracao !== undefined && {
                value: earning.remuneracao,
              }),
              pendencyType:
                GeneralUrbanRetirementDenialPeriodPendencyReasonEnum.INCONSISTENT_COMPETENCE,
            },
          ),
        );
        continue;
      }

      if (earning.competencia !== undefined) {
        const year = earning.competencia.getFullYear();
        const teto = TetoInssData.find((t) => t.ano === year);
        const rem = this.parseRemunerationString(earning.remuneracao);
        if (teto !== undefined && rem !== null && rem < teto.salarioMinimo) {
          result.push(
            GeneralUrbanRetirementDenialFirstAnalysisEarningsHistoryItemModel.build(
              {
                competence: this.formatDate(earning.competencia),
                ...(earning.remuneracao !== undefined && {
                  value: earning.remuneracao,
                }),
                pendencyType:
                  GeneralUrbanRetirementDenialPeriodPendencyReasonEnum.COMPETENCE_BELOW_MINIMUM,
              },
            ),
          );
        }
      }

      if (
        !isEmpregado &&
        earning.competencia !== undefined &&
        earning.dataPgto !== undefined
      ) {
        const month = earning.competencia.getMonth() + 1;
        const year = earning.competencia.getFullYear();
        const dataVencimento = this.calcularDataVencimento(month, year);
        if (!this.checkPaymentOnTime(earning.dataPgto, dataVencimento)) {
          result.push(
            GeneralUrbanRetirementDenialFirstAnalysisEarningsHistoryItemModel.build(
              {
                competence: this.formatDate(earning.competencia),
                ...(earning.remuneracao !== undefined && {
                  value: earning.remuneracao,
                }),
                pendencyType:
                  GeneralUrbanRetirementDenialPeriodPendencyReasonEnum.LATE_CONTRIBUTION,
                collectedAt: this.formatDate(earning.dataPgto),
              },
            ),
          );
        }
      }
    }

    return result;
  }

  private buildTimeSummary(
    analyzedCnis: CnisAnalysisResultModel,
    timeAccelerators: GetGeneralUrbanRetirementDenialTimeAcceleratorQueryResult[],
  ): GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryModel {
    const nonBenefitItems = analyzedCnis.consolidadoResumido.filter(
      (item) => !item.isBeneficio,
    );

    const itemsWithoutPendencies = nonBenefitItems.filter(
      (item) => !item.isPendencia,
    );

    const daysWithoutPendencies = this.sumValidContributionTimeDays(
      itemsWithoutPendencies,
    );
    const daysResolvingPendencies =
      this.sumValidContributionTimeDays(nonBenefitItems);

    const qualifyingAccelerators = timeAccelerators.filter(
      (acc) => acc.affectsQualifyingPeriod,
    );
    const daysAccelerators = this.sumAcceleratorTimeDays(
      qualifyingAccelerators,
    );

    const gracePeriodWithoutPendencies = this.calculateCarenciaTotal(
      itemsWithoutPendencies.map((item) => ({
        dataInicio: item.validContributionTime?.data?.dataInicio ?? null,
        dataFim: item.validContributionTime?.data?.dataFim ?? null,
      })),
    );

    const gracePeriodResolvingPendencies = analyzedCnis.carenciaTotal;

    const gracePeriodAccelerators = this.calculateCarenciaTotal(
      qualifyingAccelerators.map((acc) => ({
        dataInicio: acc.startDate,
        dataFim: acc.endDate,
      })),
    );

    return GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryModel.build({
      contributionTime:
        GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryScenarioModel.build(
          {
            withoutResolvingPendencies: this.formatContributionTime(
              this.daysToContributionTime(daysWithoutPendencies),
            ),
            resolvingPendencies: this.formatContributionTime(
              this.daysToContributionTime(daysResolvingPendencies),
            ),
            withTimeAccelerators: this.formatContributionTime(
              this.daysToContributionTime(
                daysResolvingPendencies + daysAccelerators,
              ),
            ),
          },
        ),
      gracePeriod:
        GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryScenarioModel.build(
          {
            withoutResolvingPendencies: `${gracePeriodWithoutPendencies} contribuições`,
            resolvingPendencies: `${gracePeriodResolvingPendencies} contribuições`,
            withTimeAccelerators: `${gracePeriodResolvingPendencies + gracePeriodAccelerators} contribuições`,
          },
        ),
    });
  }

  private sumValidContributionTimeDays(
    items: Pick<
      CnisAnalysisResultModel['consolidadoResumido'][number],
      'validContributionTime'
    >[],
  ): number {
    let totalDays = 0;
    for (const item of items) {
      const data = item.validContributionTime?.data;
      if (!data?.dataInicio || !data.dataFim) {
        continue;
      }
      const start = moment(data.dataInicio);
      const end = moment(data.dataFim);
      if (!start.isValid() || !end.isValid() || end.isBefore(start)) {
        continue;
      }
      totalDays += end.diff(start, 'days');
    }
    return totalDays;
  }

  private sumAcceleratorTimeDays(
    accelerators: { startDate: Date | null; endDate: Date | null }[],
  ): number {
    let totalDays = 0;
    for (const acc of accelerators) {
      if (!acc.startDate || !acc.endDate) {
        continue;
      }
      const start = moment(acc.startDate);
      const end = moment(acc.endDate);
      if (!start.isValid() || !end.isValid() || end.isBefore(start)) {
        continue;
      }
      totalDays += end.diff(start, 'days');
    }
    return totalDays;
  }

  private daysToContributionTime(totalDays: number): ContributionTimeInterface {
    const duration = moment.duration(totalDays, 'days');
    return {
      years: duration.years(),
      months: duration.months(),
      days: duration.days(),
    };
  }

  private calculateCarenciaTotal(
    periods: {
      dataInicio: Date | null | undefined;
      dataFim: Date | null | undefined;
    }[],
  ): number {
    const monthsAssigned = new Set<string>();
    for (const item of periods) {
      const startDate = this.toDate(item.dataInicio);
      const endDate = this.toDate(item.dataFim);
      if (!startDate || !endDate || startDate.getTime() > endDate.getTime()) {
        continue;
      }
      const current = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        1,
      );
      const end = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
      while (current <= end) {
        const monthKey = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
        monthsAssigned.add(monthKey);
        current.setMonth(current.getMonth() + 1);
      }
    }
    return monthsAssigned.size;
  }

  private formatContributionTime(time: ContributionTimeInterface): string {
    return `${time.years} anos, ${time.months} meses e ${time.days} dias`;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private toDate(value: Date | null | undefined): Date | null {
    if (value === null || value === undefined) {
      return null;
    }
    if (value instanceof Date) {
      return value;
    }
    const parsed = new Date(value as unknown as string);
    return isNaN(parsed.getTime()) ? null : parsed;
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
}
