import { Inject, Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementDenialQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial/query/general-urban-retirement-denial.query.repository.gateway';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/general-urban-retirement-denial-document.entity';
import { GeneralUrbanRetirementDenialPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/general-urban-retirement-denial-period.entity';
import { GeneralUrbanRetirementDenialPeriodDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-document/general-urban-retirement-denial-period-document.entity';
import { GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-earnings-history/general-urban-retirement-denial-period-earnings-history.entity';
import { GeneralUrbanRetirementDenialResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-result/general-urban-retirement-denial-result.entity';
import {
  GetGeneralUrbanRetirementDenialDocumentResponseDto,
  GetGeneralUrbanRetirementDenialPeriodDocumentResponseDto,
  GetGeneralUrbanRetirementDenialPeriodEarningsHistoryResponseDto,
  GetGeneralUrbanRetirementDenialPeriodResponseDto,
  GetGeneralUrbanRetirementDenialResponseDto,
  GetGeneralUrbanRetirementDenialResultResponseDto,
} from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/get-general-urban-retirement-denial.response.dto';
import { GeneralUrbanRetirementDenialNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/general-urban-retirement-denial-not-found.error';
import { InvalidGeneralUrbanRetirementDenialFirstAnalysisJsonError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/invalid-general-urban-retirement-denial-first-analysis-json.error';
import {
  GeneralUrbanRetirementDenialFirstAnalysisClientDataModel,
  GeneralUrbanRetirementDenialFirstAnalysisEarningsHistoryItemModel,
  GeneralUrbanRetirementDenialFirstAnalysisModel,
  GeneralUrbanRetirementDenialFirstAnalysisPeriodModel,
  GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryModel,
  GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryScenarioModel,
} from '@module/customer/analysis-tool/module/general-urban-retirement-denial/model/generic/general-urban-retirement-denial-first-analysis.model';
import { GeneralUrbanRetirementDenialFirstAnalysisInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/model/interface/general-urban-retirement-denial-first-analysis.interface';

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
  ): GetGeneralUrbanRetirementDenialResultResponseDto {
    const parsedFirstAnalysis =
      result.firstAnalysis !== null
        ? this.parseStoredFirstAnalysis(result.firstAnalysis)
        : null;

    return GetGeneralUrbanRetirementDenialResultResponseDto.build({
      ...(result.inssDecisionAnalysis !== null && {
        inssDecisionAnalysis: result.inssDecisionAnalysis,
      }),
      ...(parsedFirstAnalysis !== null && {
        generalUrbanRetirementDenialFirstAnalysis: parsedFirstAnalysis,
      }),
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
            ...(raw.clientData.cpf !== null && { cpf: raw.clientData.cpf }),
            ...(raw.clientData.nit !== null && { nit: raw.clientData.nit }),
            ...(raw.clientData.birthDate !== null && {
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
        periods: raw.periods.map((period) =>
          GeneralUrbanRetirementDenialFirstAnalysisPeriodModel.build({
            name: period.name,
            startDate: period.startDate,
            ...(period.endDate !== null && { endDate: period.endDate }),
            ...(period.category !== null && { category: period.category }),
            workType: period.workType,
            isPendency: period.isPendency,
            competenceBelowTheMinimum: period.competenceBelowTheMinimum,
            ...(period.pendencyReason !== null && {
              pendencyReason: period.pendencyReason,
            }),
            ...(period.impact !== null && { impact: period.impact }),
            ...(period.periodConsideration !== null && {
              periodConsideration: period.periodConsideration,
            }),
            ...(period.contributionAverage !== null && {
              contributionAverage: new DecimalValue(
                period.contributionAverage.toString(),
              ),
            }),
            earningsHistory: period.earningsHistory.map((item) =>
              GeneralUrbanRetirementDenialFirstAnalysisEarningsHistoryItemModel.build(
                {
                  ...(item.competence !== null && {
                    competence: item.competence,
                  }),
                  ...(item.value !== null && { value: item.value }),
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
}
