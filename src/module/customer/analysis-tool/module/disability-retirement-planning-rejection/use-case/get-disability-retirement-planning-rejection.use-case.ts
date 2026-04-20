import { Inject, Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DisabilityRetirementPlanningRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection/query/disability-retirement-planning-rejection.query.repository.gateway';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { DisabilityRetirementPlanningRejectionDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-document/disability-retirement-planning-rejection-document.entity';
import { DisabilityRetirementPlanningRejectionPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/disability-retirement-planning-rejection-period.entity';
import { DisabilityRetirementPlanningRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-document/disability-retirement-planning-rejection-period-document.entity';
import { DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-earnings-history/disability-retirement-planning-rejection-period-earnings-history.entity';
import { DisabilityRetirementPlanningRejectionResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/disability-retirement-planning-rejection-result.entity';
import {
  GetDisabilityRetirementPlanningRejectionDocumentResponseDto,
  GetDisabilityRetirementPlanningRejectionPeriodDocumentResponseDto,
  GetDisabilityRetirementPlanningRejectionPeriodEarningsHistoryResponseDto,
  GetDisabilityRetirementPlanningRejectionPeriodResponseDto,
  GetDisabilityRetirementPlanningRejectionResponseDto,
  GetDisabilityRetirementPlanningRejectionResultResponseDto,
} from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/get-disability-retirement-planning-rejection.response.dto';
import { DisabilityRetirementPlanningRejectionNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/disability-retirement-planning-rejection-not-found.error';
import { InvalidDisabilityRetirementPlanningRejectionFirstAnalysisJsonError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/invalid-disability-retirement-planning-rejection-first-analysis-json.error';
import {
  DisabilityRetirementPlanningRejectionFirstAnalysisClientDataModel,
  DisabilityRetirementPlanningRejectionFirstAnalysisDisabilityAnalysisModel,
  DisabilityRetirementPlanningRejectionFirstAnalysisDocumentModel,
  DisabilityRetirementPlanningRejectionFirstAnalysisEarningsHistoryItemModel,
  DisabilityRetirementPlanningRejectionFirstAnalysisModel,
  DisabilityRetirementPlanningRejectionFirstAnalysisPeriodModel,
  DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryModel,
  DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioModel,
} from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/model/generic/disability-retirement-planning-rejection-first-analysis.model';
import { DisabilityRetirementPlanningRejectionFirstAnalysisInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/model/interface/disability-retirement-planning-rejection-first-analysis.interface';

@Injectable()
export class GetDisabilityRetirementPlanningRejectionUseCase {
  protected readonly _type =
    GetDisabilityRetirementPlanningRejectionUseCase.name;

  public constructor(
    @Inject(DisabilityRetirementPlanningRejectionQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningRejectionQueryRepositoryGateway: DisabilityRetirementPlanningRejectionQueryRepositoryGateway,
  ) {}

  public async execute(
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
  ): Promise<GetDisabilityRetirementPlanningRejectionResponseDto> {
    const denial =
      await this.disabilityRetirementPlanningRejectionQueryRepositoryGateway.findOneByDisabilityRetirementPlanningRejectionIdOrFailWithRelations(
        disabilityRetirementPlanningRejectionId,
        DisabilityRetirementPlanningRejectionNotFoundError,
      );

    const periods = denial.disabilityRetirementPlanningRejectionPeriod ?? [];
    const periodDocuments =
      denial.disabilityRetirementPlanningRejectionPeriodDocument ?? [];
    const periodEarningsHistories =
      denial.disabilityRetirementPlanningRejectionPeriodEarningsHistory ?? [];

    const periodResponseDtos = periods.map((period) =>
      this.buildPeriodResponseDto(
        period,
        this.findPeriodDocuments(periodDocuments, period),
        this.findPeriodEarningsHistories(periodEarningsHistories, period),
      ),
    );

    return GetDisabilityRetirementPlanningRejectionResponseDto.build({
      disabilityRetirementPlanningRejectionId: denial.id,
      ...(denial.analysisName !== null && {
        analysisName: denial.analysisName,
      }),
      ...(denial.requestEntryDate !== null && {
        requestEntryDate: denial.requestEntryDate,
      }),
      ...(denial.denialDate !== null && { denialDate: denial.denialDate }),
      ...(denial.requestedBenefitType !== null && {
        requestedBenefitType: denial.requestedBenefitType,
      }),
      ...(denial.category !== null && { category: denial.category }),
      ...(denial.retirementType !== null && {
        retirementType: denial.retirementType,
      }),
      ...(denial.denialReason !== null && {
        denialReason: denial.denialReason,
      }),
      ...(denial.denialReasonDescription !== null && {
        denialReasonDescription: denial.denialReasonDescription,
      }),
      ...(denial.disabilityRetirementPlanningRejectionInssBenefit !== null &&
        denial.disabilityRetirementPlanningRejectionInssBenefit.length > 0 && {
          inssBenefitNumber:
            denial.disabilityRetirementPlanningRejectionInssBenefit.map(
              (b) => b.inssBenefit,
            ),
        }),
      ...(denial.disabilityRetirementPlanningRejectionResult !== null && {
        disabilityRetirementPlanningRejectionResult:
          this.buildResultResponseDto(
            denial.disabilityRetirementPlanningRejectionResult,
          ),
      }),
      ...(denial.disabilityRetirementPlanningRejectionDocument !== null &&
        denial.disabilityRetirementPlanningRejectionDocument.length > 0 && {
          disabilityRetirementPlanningRejectionDocument:
            denial.disabilityRetirementPlanningRejectionDocument.map((doc) =>
              this.buildDocumentResponseDto(doc),
            ),
        }),
      ...(periodResponseDtos.length > 0 && {
        disabilityRetirementPlanningRejectionPeriod: periodResponseDtos,
      }),
      createdAt: denial.createdAt,
      updatedAt: denial.updatedAt,
    });
  }

  private buildResultResponseDto(
    result: DisabilityRetirementPlanningRejectionResultEntity,
  ): GetDisabilityRetirementPlanningRejectionResultResponseDto {
    const parsedFirstAnalysis =
      result.firstAnalysis !== null
        ? this.parseStoredFirstAnalysis(result.firstAnalysis)
        : null;

    return GetDisabilityRetirementPlanningRejectionResultResponseDto.build({
      ...(result.inssDecisionAnalysis !== null && {
        inssDecisionAnalysis: result.inssDecisionAnalysis,
      }),
      ...(parsedFirstAnalysis !== null && {
        disabilityRetirementPlanningRejectionFirstAnalysis: parsedFirstAnalysis,
      }),
    });
  }

  private buildDocumentResponseDto(
    document: DisabilityRetirementPlanningRejectionDocumentEntity,
  ): GetDisabilityRetirementPlanningRejectionDocumentResponseDto {
    return GetDisabilityRetirementPlanningRejectionDocumentResponseDto.build({
      document: document.document,
      type: document.type,
    });
  }

  private buildPeriodResponseDto(
    period: DisabilityRetirementPlanningRejectionPeriodEntity,
    periodDocuments: DisabilityRetirementPlanningRejectionPeriodDocumentEntity[],
    earningsHistories: DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity[],
  ): GetDisabilityRetirementPlanningRejectionPeriodResponseDto {
    return GetDisabilityRetirementPlanningRejectionPeriodResponseDto.build({
      startDate: period.startDate,
      ...(period.endDate !== null && { endDate: period.endDate }),
      workType: period.workType,
      ...(period.bondOrigin !== null && { bondOrigin: period.bondOrigin }),
      ...(period.category !== null && { category: period.category }),
      ...(period.activityDescription !== null && {
        activityDescription: period.activityDescription,
      }),
      isPendency: period.isPendency,
      competenceBelowTheMinimum: period.competenceBelowTheMinimum,
      ...(period.pendencyReason !== null && {
        pendencyReason: period.pendencyReason,
      }),
      ...(period.periodConsideration !== null && {
        periodConsideration: period.periodConsideration,
      }),
      ...(period.contributionAverage !== null && {
        contributionAverage: period.contributionAverage,
      }),
      ...(period.wantsToComplementViaMeuINSS !== null && {
        wantsToComplementViaMeuINSS: period.wantsToComplementViaMeuINSS,
      }),
      ...(period.pcdStatus !== null && { pcdStatus: period.pcdStatus }),
      ...(period.local !== null && { local: period.local }),
      status: period.status,
      ...(periodDocuments.length > 0 && {
        disabilityRetirementPlanningRejectionPeriodDocument:
          periodDocuments.map((doc) =>
            GetDisabilityRetirementPlanningRejectionPeriodDocumentResponseDto.build(
              {
                document: doc.document,
              },
            ),
          ),
      }),
      ...(earningsHistories.length > 0 && {
        earningsHistory: earningsHistories.map((hist) =>
          GetDisabilityRetirementPlanningRejectionPeriodEarningsHistoryResponseDto.build(
            {
              ...(hist.competence !== null && { competence: hist.competence }),
              ...(hist.value !== null && { value: hist.value }),
            },
          ),
        ),
      }),
    });
  }

  private findPeriodDocuments(
    allDocs: DisabilityRetirementPlanningRejectionPeriodDocumentEntity[],
    period: DisabilityRetirementPlanningRejectionPeriodEntity,
  ): DisabilityRetirementPlanningRejectionPeriodDocumentEntity[] {
    return allDocs.filter(
      (doc) =>
        doc.disabilityRetirementPlanningRejectionPeriodId.toString() ===
        period.id.toString(),
    );
  }

  private findPeriodEarningsHistories(
    allHistories: DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity[],
    period: DisabilityRetirementPlanningRejectionPeriodEntity,
  ): DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity[] {
    return allHistories.filter(
      (hist) =>
        hist.disabilityRetirementPlanningRejectionPeriodId.toString() ===
        period.id.toString(),
    );
  }

  private parseStoredFirstAnalysis(
    jsonString: string,
  ): DisabilityRetirementPlanningRejectionFirstAnalysisModel | null {
    try {
      const raw = JSON.parse(
        jsonString,
      ) as DisabilityRetirementPlanningRejectionFirstAnalysisInterface;

      return DisabilityRetirementPlanningRejectionFirstAnalysisModel.build({
        clientData:
          DisabilityRetirementPlanningRejectionFirstAnalysisClientDataModel.build(
            {
              name: raw.clientData.name,
              ...(this.hasValue(raw.clientData.cpf) && {
                cpf: raw.clientData.cpf,
              }),
              ...(this.hasValue(raw.clientData.nit) && {
                nit: raw.clientData.nit,
              }),
              ...(this.hasValue(raw.clientData.birthDate) && {
                birthDate: raw.clientData.birthDate,
              }),
            },
          ),
        timeSummary:
          DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryModel.build(
            {
              pcdTime: this.buildTimeSummaryScenario(raw.timeSummary.pcdTime),
              commonTime: this.buildTimeSummaryScenario(
                raw.timeSummary.commonTime,
              ),
              totalTime: this.buildTimeSummaryScenario(
                raw.timeSummary.totalTime,
              ),
              pcdGracePeriod: this.buildTimeSummaryScenario(
                raw.timeSummary.pcdGracePeriod,
              ),
              commonGracePeriod: this.buildTimeSummaryScenario(
                raw.timeSummary.commonGracePeriod,
              ),
              totalGracePeriod: this.buildTimeSummaryScenario(
                raw.timeSummary.totalGracePeriod,
              ),
            },
          ),
        periods: (this.hasValue(raw.periods) ? raw.periods : []).map((period) =>
          DisabilityRetirementPlanningRejectionFirstAnalysisPeriodModel.build({
            ...(this.hasValue(period.bondOrigin) && {
              bondOrigin: period.bondOrigin,
            }),
            ...(this.hasValue(period.category) && {
              category: period.category,
            }),
            ...(this.hasValue(period.activityDescription) && {
              activityDescription: period.activityDescription,
            }),
            startDate: period.startDate,
            ...(this.hasValue(period.endDate) && {
              endDate: period.endDate,
            }),
            workType: period.workType,
            ...(this.hasValue(period.impactMonths) && {
              impactMonths: period.impactMonths,
            }),
            ...(this.hasValue(period.graceMonths) && {
              graceMonths: period.graceMonths,
            }),
            isPendency: period.isPendency,
            competenceBelowTheMinimum: period.competenceBelowTheMinimum,
            ...(this.hasValue(period.contributionAverage) && {
              contributionAverage: new DecimalValue(
                period.contributionAverage.toString(),
              ),
            }),
            ...(this.hasValue(period.pendencyReason) && {
              pendencyReason: period.pendencyReason,
            }),
            ...(this.hasValue(period.periodConsideration) && {
              periodConsideration: period.periodConsideration,
            }),
            ...(this.hasValue(period.wantsToComplementViaMeuINSS) && {
              wantsToComplementViaMeuINSS: period.wantsToComplementViaMeuINSS,
            }),
            status: period.status,
            ...(this.hasValue(period.statusPCD) && {
              statusPCD: period.statusPCD,
            }),
            ...(this.hasValue(period.local) && {
              local: period.local,
            }),
            earningsHistory: (this.hasValue(period.earningsHistory)
              ? period.earningsHistory
              : []
            ).map((item) =>
              DisabilityRetirementPlanningRejectionFirstAnalysisEarningsHistoryItemModel.build(
                {
                  ...(this.hasValue(item.competence) && {
                    competence: item.competence,
                  }),
                  ...(this.hasValue(item.value) && { value: item.value }),
                  ...(this.hasValue(item.pendencyType) && {
                    pendencyType: item.pendencyType,
                  }),
                  ...(this.hasValue(item.collectedAt) && {
                    collectedAt: item.collectedAt,
                  }),
                },
              ),
            ),
          }),
        ),
        disabilityAnalysis:
          DisabilityRetirementPlanningRejectionFirstAnalysisDisabilityAnalysisModel.build(
            {
              predominantDisabilityDegree:
                raw.disabilityAnalysis.predominantDisabilityDegree,
              lightDisabilityPercentage:
                raw.disabilityAnalysis.lightDisabilityPercentage,
              moderateDisabilityPercentage:
                raw.disabilityAnalysis.moderateDisabilityPercentage,
              severeDisabilityPercentage:
                raw.disabilityAnalysis.severeDisabilityPercentage,
              documents: raw.disabilityAnalysis.documents.map((doc) =>
                DisabilityRetirementPlanningRejectionFirstAnalysisDocumentModel.build(
                  {
                    documentName: doc.documentName,
                    viability: doc.viability,
                    cid: doc.cid,
                    degree: doc.degree,
                    date: doc.date,
                    crm: doc.crm,
                    observations: doc.observations,
                  },
                ),
              ),
            },
          ),
      });
    } catch {
      throw new InvalidDisabilityRetirementPlanningRejectionFirstAnalysisJsonError();
    }
  }

  private buildTimeSummaryScenario(
    scenario: DisabilityRetirementPlanningRejectionFirstAnalysisInterface['timeSummary']['pcdTime'],
  ): DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioModel {
    return DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioModel.build(
      {
        withoutResolvingPendencies: scenario.withoutResolvingPendencies,
        resolvingPendencies: scenario.resolvingPendencies,
        withTimeAccelerators: scenario.withTimeAccelerators,
      },
    );
  }

  private hasValue<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }
}
