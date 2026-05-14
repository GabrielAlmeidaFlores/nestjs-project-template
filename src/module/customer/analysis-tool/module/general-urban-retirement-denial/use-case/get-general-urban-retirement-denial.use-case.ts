import { Inject, Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementDenialQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial/query/general-urban-retirement-denial.query.repository.gateway';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/general-urban-retirement-denial-document.entity';
import { GeneralUrbanRetirementDenialPeriodTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-type.enum';
import { GeneralUrbanRetirementDenialPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/general-urban-retirement-denial-period.entity';
import { GeneralUrbanRetirementDenialPeriodDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-document/general-urban-retirement-denial-period-document.entity';
import { GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-earnings-history/general-urban-retirement-denial-period-earnings-history.entity';
import { GeneralUrbanRetirementDenialResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-result/general-urban-retirement-denial-result.entity';
import {
  GetGeneralUrbanRetirementDenialCompleteAnalysisClientDataResponseDto,
  GetGeneralUrbanRetirementDenialCompleteAnalysisResponseDto,
  GetGeneralUrbanRetirementDenialCompleteAnalysisRetirementRuleResponseDto,
  GetGeneralUrbanRetirementDenialCurrentResultResponseDto,
  GetGeneralUrbanRetirementDenialDocumentResponseDto,
  GetGeneralUrbanRetirementDenialPeriodDocumentResponseDto,
  GetGeneralUrbanRetirementDenialPeriodEarningsHistoryResponseDto,
  GetGeneralUrbanRetirementDenialPeriodResponseDto,
  GetGeneralUrbanRetirementDenialResponseDto,
} from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/get-general-urban-retirement-denial.response.dto';
import { GeneralUrbanRetirementDenialNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/general-urban-retirement-denial-not-found.error';
import { InvalidGeneralUrbanRetirementDenialFirstAnalysisJsonError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/invalid-general-urban-retirement-denial-first-analysis-json.error';
import { InvalidGeneralUrbanRetirementDenialResultJsonError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/invalid-general-urban-retirement-denial-result-json.error';
import {
  GeneralUrbanRetirementDenialFirstAnalysisClientDataModel,
  GeneralUrbanRetirementDenialFirstAnalysisEarningsHistoryItemModel,
  GeneralUrbanRetirementDenialFirstAnalysisModel,
  GeneralUrbanRetirementDenialFirstAnalysisPeriodModel,
  GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryModel,
  GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryScenarioModel,
} from '@module/customer/analysis-tool/module/general-urban-retirement-denial/model/generic/general-urban-retirement-denial-first-analysis.model';
import { GeneralUrbanRetirementDenialFirstAnalysisInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/model/interface/general-urban-retirement-denial-first-analysis.interface';
import {
  GeneralUrbanRetirementDenialResultInterface,
  GeneralUrbanRetirementDenialResultRetirementRuleInterface,
} from '@module/customer/analysis-tool/module/general-urban-retirement-denial/model/interface/general-urban-retirement-denial-result.interface';

@Injectable()
export class GetGeneralUrbanRetirementDenialUseCase {
  protected readonly _type = GetGeneralUrbanRetirementDenialUseCase.name;

  public constructor(
    @Inject(GeneralUrbanRetirementDenialQueryRepositoryGateway)
    private readonly generalUrbanRetirementDenialQueryRepositoryGateway: GeneralUrbanRetirementDenialQueryRepositoryGateway,
  ) {}

  public async execute(
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
  ): Promise<GetGeneralUrbanRetirementDenialResponseDto> {
    const denial =
      await this.generalUrbanRetirementDenialQueryRepositoryGateway.findOneByGeneralUrbanRetirementDenialIdOrFailWithRelations(
        generalUrbanRetirementDenialId,
        GeneralUrbanRetirementDenialNotFoundError,
      );

    const periods = denial.generalUrbanRetirementDenialPeriod ?? [];
    const periodDocuments =
      denial.generalUrbanRetirementDenialPeriodDocument ?? [];
    const periodEarningsHistories =
      denial.generalUrbanRetirementDenialPeriodEarningsHistory ?? [];

    const periodResponseDtos = periods.map((period) =>
      this.buildPeriodResponseDto(
        period,
        this.findPeriodDocuments(periodDocuments, period),
        this.findPeriodEarningsHistories(periodEarningsHistories, period),
      ),
    );

    return GetGeneralUrbanRetirementDenialResponseDto.build({
      generalUrbanRetirementDenialId: denial.id,
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
      ...(denial.generalUrbanRetirementDenialInssBenefit !== null &&
        denial.generalUrbanRetirementDenialInssBenefit.length > 0 && {
          inssBenefitNumber: denial.generalUrbanRetirementDenialInssBenefit.map(
            (b) => b.inssBenefit,
          ),
        }),
      ...(denial.generalUrbanRetirementDenialResult !== null && {
        generalUrbanRetirementDenialResult: this.buildResultResponseDto(
          denial.generalUrbanRetirementDenialResult,
        ),
      }),
      ...(denial.generalUrbanRetirementDenialDocument !== null &&
        denial.generalUrbanRetirementDenialDocument.length > 0 && {
          generalUrbanRetirementDenialDocument:
            denial.generalUrbanRetirementDenialDocument.map((doc) =>
              this.buildDocumentResponseDto(doc),
            ),
        }),
      ...(periodResponseDtos.length > 0 && {
        generalUrbanRetirementDenialPeriod: periodResponseDtos,
      }),
      createdAt: denial.createdAt,
      updatedAt: denial.updatedAt,
    });
  }

  private buildResultResponseDto(
    result: GeneralUrbanRetirementDenialResultEntity,
  ): GetGeneralUrbanRetirementDenialCurrentResultResponseDto {
    const parsedFirstAnalysis =
      result.firstAnalysis !== null
        ? this.parseStoredFirstAnalysis(result.firstAnalysis)
        : null;

    const parsedCompleteAnalysis =
      result.completeAnalysis !== null
        ? this.parseStoredCompleteAnalysis(result.completeAnalysis)
        : null;

    return GetGeneralUrbanRetirementDenialCurrentResultResponseDto.build({
      ...(result.inssDecisionAnalysis !== null && {
        inssDecisionAnalysis: result.inssDecisionAnalysis,
      }),
      ...(parsedFirstAnalysis !== null && {
        generalUrbanRetirementDenialFirstAnalysis: parsedFirstAnalysis,
      }),
      ...(parsedCompleteAnalysis !== null && {
        generalUrbanRetirementDenialCompleteAnalysis:
          this.buildCompleteAnalysisResponseDto(parsedCompleteAnalysis),
      }),
    });
  }

  private buildCompleteAnalysisResponseDto(
    parsedCompleteAnalysis: GeneralUrbanRetirementDenialResultInterface,
  ): GetGeneralUrbanRetirementDenialCompleteAnalysisResponseDto {
    return GetGeneralUrbanRetirementDenialCompleteAnalysisResponseDto.build({
      clientData:
        GetGeneralUrbanRetirementDenialCompleteAnalysisClientDataResponseDto.build(
          {
            name: parsedCompleteAnalysis.clientData.name,
            federalDocument: parsedCompleteAnalysis.clientData.federalDocument,
            ...(parsedCompleteAnalysis.clientData.lastAffiliationDate !==
              null && {
              lastAffiliationDate: new Date(
                parsedCompleteAnalysis.clientData.lastAffiliationDate,
              ),
            }),
            ...(parsedCompleteAnalysis.clientData.birthDate !== null && {
              birthDate: new Date(parsedCompleteAnalysis.clientData.birthDate),
            }),
            gender: parsedCompleteAnalysis.clientData.gender,
          },
        ),
      retirementRules: parsedCompleteAnalysis.retirementRules.map(
        (rule: GeneralUrbanRetirementDenialResultRetirementRuleInterface) =>
          GetGeneralUrbanRetirementDenialCompleteAnalysisRetirementRuleResponseDto.build(
            {
              retirementRuleName: rule.retirementRuleName,
              isEligible: rule.isEligible,
              ...(rule.eligibilityAvailableAt !== null && {
                eligibilityAvailableAt: new Date(rule.eligibilityAvailableAt),
              }),
              expectedMonthlyBenefit: rule.expectedMonthlyBenefit,
              isBestRmi: rule.isBestRmi,
              isHighestCauseValue: rule.isHighestCauseValue,
              retirementAnalysis: rule.retirementAnalysis,
            },
          ),
      ),
      analysisResult: parsedCompleteAnalysis.analysisResult,
    });
  }

  private buildDocumentResponseDto(
    document: GeneralUrbanRetirementDenialDocumentEntity,
  ): GetGeneralUrbanRetirementDenialDocumentResponseDto {
    return GetGeneralUrbanRetirementDenialDocumentResponseDto.build({
      document: document.document,
      type: document.type,
    });
  }

  private buildPeriodResponseDto(
    period: GeneralUrbanRetirementDenialPeriodEntity,
    periodDocuments: GeneralUrbanRetirementDenialPeriodDocumentEntity[],
    earningsHistories: GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity[],
  ): GetGeneralUrbanRetirementDenialPeriodResponseDto {
    return GetGeneralUrbanRetirementDenialPeriodResponseDto.build({
      startDate: period.startDate,
      ...(period.endDate !== null && { endDate: period.endDate }),
      workType: period.workType,
      type: period.type,
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
      status: period.status,
      ...(periodDocuments.length > 0 && {
        generalUrbanRetirementDenialPeriodDocument: periodDocuments.map((doc) =>
          GetGeneralUrbanRetirementDenialPeriodDocumentResponseDto.build({
            document: doc.document,
          }),
        ),
      }),
      ...(earningsHistories.length > 0 && {
        earningsHistory: earningsHistories.map((hist) =>
          GetGeneralUrbanRetirementDenialPeriodEarningsHistoryResponseDto.build(
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
    allDocs: GeneralUrbanRetirementDenialPeriodDocumentEntity[],
    period: GeneralUrbanRetirementDenialPeriodEntity,
  ): GeneralUrbanRetirementDenialPeriodDocumentEntity[] {
    return allDocs.filter(
      (doc) =>
        doc.generalUrbanRetirementDenialPeriodId.toString() ===
        period.id.toString(),
    );
  }

  private findPeriodEarningsHistories(
    allHistories: GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity[],
    period: GeneralUrbanRetirementDenialPeriodEntity,
  ): GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity[] {
    return allHistories.filter(
      (hist) =>
        hist.generalUrbanRetirementDenialPeriodId.toString() ===
        period.id.toString(),
    );
  }

  private parseStoredFirstAnalysis(
    jsonString: string,
  ): GeneralUrbanRetirementDenialFirstAnalysisModel | null {
    try {
      const raw = JSON.parse(
        jsonString,
      ) as GeneralUrbanRetirementDenialFirstAnalysisInterface;

      return GeneralUrbanRetirementDenialFirstAnalysisModel.build({
        clientData:
          GeneralUrbanRetirementDenialFirstAnalysisClientDataModel.build({
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
          }),
        timeSummary:
          GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryModel.build({
            contributionTime:
              GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryScenarioModel.build(
                {
                  withoutResolvingPendencies:
                    raw.timeSummary.contributionTime.withoutResolvingPendencies,
                  resolvingPendencies:
                    raw.timeSummary.contributionTime.resolvingPendencies,
                  withTimeAccelerators:
                    raw.timeSummary.contributionTime.withTimeAccelerators,
                },
              ),
            gracePeriod:
              GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryScenarioModel.build(
                {
                  withoutResolvingPendencies:
                    raw.timeSummary.gracePeriod.withoutResolvingPendencies,
                  resolvingPendencies:
                    raw.timeSummary.gracePeriod.resolvingPendencies,
                  withTimeAccelerators:
                    raw.timeSummary.gracePeriod.withTimeAccelerators,
                },
              ),
          }),
        periods: (this.hasValue(raw.periods) ? raw.periods : []).map((period) =>
          GeneralUrbanRetirementDenialFirstAnalysisPeriodModel.build({
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
            type:
              period.type ??
              GeneralUrbanRetirementDenialPeriodTypeEnum.COMMON_PERIOD,
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
            earningsHistory: (this.hasValue(period.earningsHistory)
              ? period.earningsHistory
              : []
            ).map((item) =>
              GeneralUrbanRetirementDenialFirstAnalysisEarningsHistoryItemModel.build(
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
      });
    } catch {
      throw new InvalidGeneralUrbanRetirementDenialFirstAnalysisJsonError();
    }
  }

  private parseStoredCompleteAnalysis(
    jsonString: string,
  ): GeneralUrbanRetirementDenialResultInterface {
    try {
      const parsed: unknown = JSON.parse(jsonString);

      if (!this.isCompleteResultAnalysis(parsed)) {
        throw new InvalidGeneralUrbanRetirementDenialResultJsonError();
      }

      return parsed;
    } catch {
      throw new InvalidGeneralUrbanRetirementDenialResultJsonError();
    }
  }

  private isCompleteResultAnalysis(
    value: unknown,
  ): value is GeneralUrbanRetirementDenialResultInterface {
    if (!this.isRecord(value)) {
      return false;
    }

    return (
      this.isRecord(value['clientData']) &&
      Array.isArray(value['retirementRules']) &&
      typeof value['analysisResult'] === 'string' &&
      typeof value['completeAnalysisDownload'] === 'string'
    );
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  private hasValue<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }
}
