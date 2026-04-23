import { Inject, Injectable } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DisabilityRetirementPlanningGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant/query/disability-retirement-planning-grant.query.repository.gateway';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import {
  GetDisabilityRetirementPlanningGrantResponseDto,
  GetDisabilityRetirementPlanningGrantCnisDocumentResponseDto,
  GetDisabilityRetirementPlanningGrantInssBenefitResponseDto,
  GetDisabilityRetirementPlanningGrantLegalProceedingResponseDto,
  GetDisabilityRetirementPlanningGrantResultResponseDto,
  GetDisabilityRetirementPlanningGrantPeriodInGrantResponseDto,
  GetDisabilityRetirementPlanningGrantPeriodEarningsHistoryResponseDto,
  GetDisabilityRetirementPlanningGrantDisabilityPeriodInGrantResponseDto,
  GetDisabilityRetirementPlanningGrantTimeAcceleratorInGrantResponseDto,
} from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/get-disability-retirement-planning-grant.response.dto';
import { DisabilityRetirementPlanningGrantNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/error/disability-retirement-planning-grant-not-found.error';
import {
  DisabilityRetirementPlanningGrantFirstAnalysisBelowMinimumContributionItemModel,
  DisabilityRetirementPlanningGrantFirstAnalysisDisabilityAnalysisModel,
  DisabilityRetirementPlanningGrantFirstAnalysisDocumentModel,
  DisabilityRetirementPlanningGrantFirstAnalysisEarningsHistoryItemModel,
  DisabilityRetirementPlanningGrantFirstAnalysisModel,
  DisabilityRetirementPlanningGrantFirstAnalysisPeriodModel,
  DisabilityRetirementPlanningGrantFirstAnalysisSummaryTableModel,
} from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/model/generic/disability-retirement-planning-grant-first-analysis.model';
import { DisabilityRetirementPlanningGrantFirstAnalysisSourcePeriodInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/model/interface/disability-retirement-planning-grant-first-analysis-source-period.interface';
import { DisabilityRetirementPlanningGrantFirstAnalysisInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/model/interface/disability-retirement-planning-grant-first-analysis.interface';
import { parseDisabilityRetirementPlanningGrantCompleteAnalysis } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/model/interface/disability-retirement-planning-grant-result.interface';

@Injectable()
export class GetDisabilityRetirementPlanningGrantUseCase {
  protected readonly _type = GetDisabilityRetirementPlanningGrantUseCase.name;

  public constructor(
    @Inject(DisabilityRetirementPlanningGrantQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningGrantQueryRepositoryGateway: DisabilityRetirementPlanningGrantQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
  ): Promise<GetDisabilityRetirementPlanningGrantResponseDto> {
    const result =
      await this.disabilityRetirementPlanningGrantQueryRepositoryGateway.findOneByDisabilityRetirementPlanningGrantIdOrFailWithRelations(
        disabilityRetirementPlanningGrantId,
        DisabilityRetirementPlanningGrantNotFoundError,
      );

    const cnisDocumentEntity =
      result.disabilityRetirementPlanningGrantDocument?.[0] ?? null;

    const cnisDocument =
      cnisDocumentEntity !== null
        ? await this.buildCnisDocumentResponse(cnisDocumentEntity.document)
        : null;

    const firstAnalysis =
      result.disabilityRetirementPlanningGrantResult
        ?.disabilityRetirementPlanningGrantFirstAnalysis !== null &&
      result.disabilityRetirementPlanningGrantResult
        ?.disabilityRetirementPlanningGrantFirstAnalysis !== undefined
        ? this.parseStoredFirstAnalysis(
            result.disabilityRetirementPlanningGrantResult
              .disabilityRetirementPlanningGrantFirstAnalysis,
            result.disabilityRetirementPlanningGrantPeriod ?? [],
          )
        : null;

    return GetDisabilityRetirementPlanningGrantResponseDto.build({
      id: result.id,
      category: result.category,
      ...(result.analysisName !== null && {
        analysisName: result.analysisName,
      }),
      longPrizeDisability: result.longPrizeDisability,
      ...(cnisDocument !== null && { cnisDocument }),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      ...(result.disabilityRetirementPlanningGrantResult !== null && {
        disabilityRetirementPlanningGrantResult:
          GetDisabilityRetirementPlanningGrantResultResponseDto.build({
            ...(result.disabilityRetirementPlanningGrantResult
              .disabilityRetirementPlanningGrantCompleteAnalysis !== null && {
              disabilityRetirementPlanningGrantCompleteAnalysis:
                parseDisabilityRetirementPlanningGrantCompleteAnalysis(
                  result.disabilityRetirementPlanningGrantResult
                    .disabilityRetirementPlanningGrantCompleteAnalysis,
                ),
            }),
            ...(result.disabilityRetirementPlanningGrantResult
              .disabilityRetirementPlanningGrantSimplifiedAnalysis !== null && {
              disabilityRetirementPlanningGrantSimplifiedAnalysis:
                result.disabilityRetirementPlanningGrantResult
                  .disabilityRetirementPlanningGrantSimplifiedAnalysis,
            }),
            ...(firstAnalysis !== null && {
              disabilityRetirementPlanningGrantFirstAnalysis: firstAnalysis,
            }),
            ...(result.disabilityRetirementPlanningGrantResult
              .disabilityRetirementPlanningGrantCompleteAnalysisDownload !==
              null && {
              disabilityRetirementPlanningGrantCompleteAnalysisDownload:
                result.disabilityRetirementPlanningGrantResult
                  .disabilityRetirementPlanningGrantCompleteAnalysisDownload,
            }),
          }),
      }),
      ...(result.disabilityRetirementPlanningGrantInssBenefit !== null && {
        disabilityRetirementPlanningGrantInssBenefit:
          result.disabilityRetirementPlanningGrantInssBenefit.map((b) =>
            GetDisabilityRetirementPlanningGrantInssBenefitResponseDto.build({
              inssBenefit: b.inssBenefit,
            }),
          ),
      }),
      ...(result.disabilityRetirementPlanningGrantLegalProceeding !== null && {
        disabilityRetirementPlanningGrantLegalProceeding:
          result.disabilityRetirementPlanningGrantLegalProceeding.map((p) =>
            GetDisabilityRetirementPlanningGrantLegalProceedingResponseDto.build(
              {
                legalProceedingNumber: p.legalProceedingNumber,
              },
            ),
          ),
      }),
      ...(result.disabilityRetirementPlanningGrantPeriod !== null && {
        disabilityRetirementPlanningGrantPeriod:
          result.disabilityRetirementPlanningGrantPeriod.map((p) => {
            const periodEarningsHistory = (
              result.disabilityRetirementPlanningGrantPeriodEarningsHistory ??
              []
            ).filter(
              (eh) =>
                eh.disabilityRetirementPlanningGrantPeriodId.toString() ===
                p.id.toString(),
            );

            return GetDisabilityRetirementPlanningGrantPeriodInGrantResponseDto.build(
              {
                startDate: p.startDate,
                ...(p.endDate !== null && { endDate: p.endDate }),
                category: p.category,
                isPendency: p.isPendency,
                competenceBelowTheMinimum: p.competenceBelowTheMinimum,
                ...(p.pendencyReason !== null && {
                  pendencyReason: p.pendencyReason,
                }),
                ...(p.typeOfContribution !== null && {
                  typeOfContribution: p.typeOfContribution,
                }),
                status: p.status,
                ...(p.disabilityStatus !== null && {
                  disabilityStatus: p.disabilityStatus,
                }),
                ...(p.periodConsideration !== null && {
                  periodConsideration: p.periodConsideration,
                }),
                ...(p.contributionAverage !== null && {
                  contributionAverage: p.contributionAverage,
                }),
                ...(p.bondOrigin !== null && { bondOrigin: p.bondOrigin }),
                ...(periodEarningsHistory.length > 0 && {
                  earningsHistory: periodEarningsHistory.map((eh) =>
                    GetDisabilityRetirementPlanningGrantPeriodEarningsHistoryResponseDto.build(
                      {
                        ...(eh.competence !== null && {
                          competence: eh.competence,
                        }),
                        ...(eh.remuneration !== null && {
                          remuneration: eh.remuneration,
                        }),
                        ...(eh.indicators !== null && {
                          indicators: eh.indicators,
                        }),
                        ...(eh.paymentDate !== null && {
                          paymentDate: eh.paymentDate,
                        }),
                        ...(eh.contribution !== null && {
                          contribution: eh.contribution,
                        }),
                        ...(eh.contributionSalary !== null && {
                          contributionSalary: eh.contributionSalary,
                        }),
                        ...(eh.analysis !== null && { analysis: eh.analysis }),
                        ...(eh.competenceBelowTheMinimum !== null && {
                          competenceBelowTheMinimum:
                            eh.competenceBelowTheMinimum,
                        }),
                      },
                    ),
                  ),
                }),
              },
            );
          }),
      }),
      ...(result.disabilityRetirementPlanningGrantDisabilityPeriod !== null && {
        disabilityRetirementPlanningGrantDisabilityPeriod:
          result.disabilityRetirementPlanningGrantDisabilityPeriod.map((dp) =>
            GetDisabilityRetirementPlanningGrantDisabilityPeriodInGrantResponseDto.build(
              {
                disabilityDegree: dp.disabilityDegree,
                disabilityCategory: dp.disabilityCategory,
                disabilityDescription: dp.disabilityDescription,
                dailyImpact: dp.dailyImpact,
                startDate: dp.startDate,
                ...(dp.endDate !== null && { endDate: dp.endDate }),
                ...(dp.cidTenId !== null && { cidTenId: dp.cidTenId }),
              },
            ),
          ),
      }),
      ...(result.disabilityRetirementPlanningGrantTimeAccelerator !== null && {
        disabilityRetirementPlanningGrantTimeAccelerator:
          result.disabilityRetirementPlanningGrantTimeAccelerator.map((ta) =>
            GetDisabilityRetirementPlanningGrantTimeAcceleratorInGrantResponseDto.build(
              {
                type: ta.type,
                recognitionInss: ta.recognitionInss,
                recognitionJudicial: ta.recognitionJudicial,
                viability: ta.viability,
                ...(ta.technicalNote !== null && {
                  technicalNote: ta.technicalNote,
                }),
                ...(ta.startDate !== null && { startDate: ta.startDate }),
                ...(ta.endDate !== null && { endDate: ta.endDate }),
                ...(ta.institution !== null && {
                  institution: ta.institution,
                }),
                affectsQualifyingPeriod: ta.affectsQualifyingPeriod,
              },
            ),
          ),
      }),
    });
  }

  private parseStoredFirstAnalysis(
    storedFirstAnalysis: string,
    sourcePeriods: DisabilityRetirementPlanningGrantFirstAnalysisSourcePeriodInterface[],
  ): DisabilityRetirementPlanningGrantFirstAnalysisModel {
    try {
      const raw = JSON.parse(
        storedFirstAnalysis,
      ) as DisabilityRetirementPlanningGrantFirstAnalysisInterface;

      const normalizedRaw: DisabilityRetirementPlanningGrantFirstAnalysisInterface =
        {
          ...raw,
          periods: raw.periods.map((period) => {
            const contributionAverage =
              period.contributionAverage ??
              this.findContributionAverageByPeriod(period, sourcePeriods);

            return {
              ...period,
              ...(contributionAverage !== undefined && { contributionAverage }),
            };
          }),
        };

      return DisabilityRetirementPlanningGrantFirstAnalysisModel.build({
        periods: normalizedRaw.periods.map((period) =>
          DisabilityRetirementPlanningGrantFirstAnalysisPeriodModel.build({
            name: period.name,
            startDate: new Date(period.startDate),
            endDate: new Date(period.endDate),
            category: period.category,
            gracePeriod: period.gracePeriod,
            ...(period.statusPCD !== undefined && {
              statusPCD: period.statusPCD,
            }),
            status: period.status,
            isPendency: period.isPendency,
            competenceBelowTheMinimum: period.competenceBelowTheMinimum,
            ...(period.contributionAverage !== undefined &&
              period.contributionAverage !== null && {
                contributionAverage: new DecimalValue(
                  period.contributionAverage.toString(),
                ),
              }),
            belowMinimumContributions: (
              period.belowMinimumContributions ?? []
            ).map((item) =>
              DisabilityRetirementPlanningGrantFirstAnalysisBelowMinimumContributionItemModel.build(
                {
                  contributionDate: new Date(item.contributionDate),
                  contributionValue: item.contributionValue,
                },
              ),
            ),
            ...(period.earningsHistory.length > 0 && {
              earningsHistory: period.earningsHistory.map((eh) =>
                DisabilityRetirementPlanningGrantFirstAnalysisEarningsHistoryItemModel.build(
                  {
                    ...(eh.competence !== null && {
                      competence: new Date(eh.competence),
                    }),
                    ...(eh.remuneration !== null && {
                      remuneration: eh.remuneration,
                    }),
                    ...(eh.indicators !== null && {
                      indicators: eh.indicators,
                    }),
                    ...(eh.paymentDate !== null && {
                      paymentDate: new Date(eh.paymentDate),
                    }),
                    ...(eh.contribution !== null && {
                      contribution: eh.contribution,
                    }),
                    ...(eh.contributionSalary !== null && {
                      contributionSalary: eh.contributionSalary,
                    }),
                    ...(eh.analysis !== null && { analysis: eh.analysis }),
                    ...(eh.competenceBelowTheMinimum !== null && {
                      competenceBelowTheMinimum: eh.competenceBelowTheMinimum,
                    }),
                  },
                ),
              ),
            }),
            ...(period.reasonPendency !== undefined && {
              reasonPendency: period.reasonPendency,
            }),
          }),
        ),
        disabilityAnalysis:
          DisabilityRetirementPlanningGrantFirstAnalysisDisabilityAnalysisModel.build(
            {
              predominantDisabilityDegree:
                normalizedRaw.disabilityAnalysis.predominantDisabilityDegree,
              lightDisabilityPercentage:
                normalizedRaw.disabilityAnalysis.lightDisabilityPercentage,
              moderateDisabilityPercentage:
                normalizedRaw.disabilityAnalysis.moderateDisabilityPercentage,
              severeDisabilityPercentage:
                normalizedRaw.disabilityAnalysis.severeDisabilityPercentage,
              summaryTable:
                DisabilityRetirementPlanningGrantFirstAnalysisSummaryTableModel.build(
                  normalizedRaw.disabilityAnalysis.summaryTable ?? {
                    timeAsDisabledWithoutResolvingPendencies: '',
                    timeAsDisabledResolvingPendencies: '',
                    timeAsDisabledWithAccelerators: '',
                    commonTimeWithoutResolvingPendencies: '',
                    commonTimeResolvingPendencies: '',
                    commonTimeWithAccelerators: '',
                    totalTimeWithoutResolvingPendencies: '',
                    totalTimeResolvingPendencies: '',
                    totalTimeWithAccelerators: '',
                    gracePeriodAsDisabledWithoutResolvingPendencies: '',
                    gracePeriodAsDisabledResolvingPendencies: '',
                    gracePeriodAsDisabledWithAccelerators: '',
                    commonGracePeriodWithoutResolvingPendencies: '',
                    commonGracePeriodResolvingPendencies: '',
                    commonGracePeriodWithAccelerators: '',
                    totalGracePeriodWithoutResolvingPendencies: '',
                    totalGracePeriodResolvingPendencies: '',
                    totalGracePeriodWithAccelerators: '',
                  },
                ),
              documents: (normalizedRaw.disabilityAnalysis.documents ?? []).map(
                (document) =>
                  DisabilityRetirementPlanningGrantFirstAnalysisDocumentModel.build(
                    document,
                  ),
              ),
            },
          ),
      });
    } catch {
      return DisabilityRetirementPlanningGrantFirstAnalysisModel.build({
        periods: [],
        disabilityAnalysis:
          DisabilityRetirementPlanningGrantFirstAnalysisDisabilityAnalysisModel.build(
            {
              predominantDisabilityDegree: '',
              lightDisabilityPercentage: 0,
              moderateDisabilityPercentage: 0,
              severeDisabilityPercentage: 0,
              summaryTable:
                DisabilityRetirementPlanningGrantFirstAnalysisSummaryTableModel.build(
                  {
                    timeAsDisabledWithoutResolvingPendencies: '',
                    timeAsDisabledResolvingPendencies: '',
                    timeAsDisabledWithAccelerators: '',
                    commonTimeWithoutResolvingPendencies: '',
                    commonTimeResolvingPendencies: '',
                    commonTimeWithAccelerators: '',
                    totalTimeWithoutResolvingPendencies: '',
                    totalTimeResolvingPendencies: '',
                    totalTimeWithAccelerators: '',
                    gracePeriodAsDisabledWithoutResolvingPendencies: '',
                    gracePeriodAsDisabledResolvingPendencies: '',
                    gracePeriodAsDisabledWithAccelerators: '',
                    commonGracePeriodWithoutResolvingPendencies: '',
                    commonGracePeriodResolvingPendencies: '',
                    commonGracePeriodWithAccelerators: '',
                    totalGracePeriodWithoutResolvingPendencies: '',
                    totalGracePeriodResolvingPendencies: '',
                    totalGracePeriodWithAccelerators: '',
                  },
                ),
              documents: [],
            },
          ),
      });
    }
  }

  private findContributionAverageByPeriod(
    period: DisabilityRetirementPlanningGrantFirstAnalysisInterface['periods'][number],
    sourcePeriods: DisabilityRetirementPlanningGrantFirstAnalysisSourcePeriodInterface[],
  ): string | undefined {
    const exactMatch = sourcePeriods.find(
      (sourcePeriod) =>
        this.normalizeDate(sourcePeriod.startDate) ===
          this.normalizeDate(period.startDate) &&
        this.normalizeDate(sourcePeriod.endDate) ===
          this.normalizeDate(period.endDate) &&
        sourcePeriod.category === period.category,
    );

    const sourcePeriod =
      exactMatch ??
      sourcePeriods.find(
        (currentSourcePeriod) =>
          this.normalizeDate(currentSourcePeriod.startDate) ===
            this.normalizeDate(period.startDate) &&
          currentSourcePeriod.category === period.category,
      );

    return sourcePeriod?.contributionAverage?.toString();
  }

  private normalizeDate(date: Date | string | null): string | null {
    if (date === null) {
      return null;
    }

    if (date instanceof Date) {
      return date.toISOString().split('T')[0] ?? null;
    }

    return date.split('T')[0] ?? null;
  }

  private async buildCnisDocumentResponse(
    documentKey: string,
  ): Promise<GetDisabilityRetirementPlanningGrantCnisDocumentResponseDto> {
    const fileBuffer =
      await this.fileProcessorGateway.getFileBuffer(documentKey);
    const originalFileName =
      await this.fileProcessorGateway.getOriginalFileName(documentKey);
    return GetDisabilityRetirementPlanningGrantCnisDocumentResponseDto.build({
      document: Base64.encodeBuffer(fileBuffer),
      originalFileName,
    });
  }
}
