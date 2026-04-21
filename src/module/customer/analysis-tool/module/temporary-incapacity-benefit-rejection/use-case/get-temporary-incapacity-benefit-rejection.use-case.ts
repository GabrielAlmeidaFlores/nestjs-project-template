import { Inject, Injectable } from '@nestjs/common';

import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection/query/result/get-temporary-incapacity-benefit-rejection-with-relations.query.result';
import { TemporaryIncapacityBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection/query/temporary-incapacity-benefit-rejection.query.repository.gateway';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import {
  GetTemporaryIncapacityBenefitRejectionAnalysisToolClientResponseDto,
  GetTemporaryIncapacityBenefitRejectionDisabilityAnalysisCidResponseDto,
  GetTemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentResponseDto,
  GetTemporaryIncapacityBenefitRejectionDisabilityAnalysisResponseDto,
  GetTemporaryIncapacityBenefitRejectionDocumentResponseDto,
  GetTemporaryIncapacityBenefitRejectionInsuredStatusDocumentResponseDto,
  GetTemporaryIncapacityBenefitRejectionInsuredStatusResponseDto,
  GetTemporaryIncapacityBenefitRejectionResponseDto,
  GetTemporaryIncapacityBenefitRejectionResultResponseDto,
  GetTemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryResponseDto,
  GetTemporaryIncapacityBenefitRejectionWorkPeriodsResponseDto,
} from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/get-temporary-incapacity-benefit-rejection.response.dto';
import { TemporaryIncapacityBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/error/temporary-incapacity-benefit-rejection-not-found.error';
import {
  TemporaryIncapacityBenefitRejectionFirstAnalysisGracePeriodItemModel,
  TemporaryIncapacityBenefitRejectionFirstAnalysisModel,
} from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/model/generic/temporary-incapacity-benefit-rejection-first-analysis.model';

import type { TemporaryIncapacityBenefitRejectionFirstAnalysisInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/model/interface/temporary-incapacity-benefit-rejection-first-analysis.interface';
import type { TemporaryIncapacityBenefitRejectionResultInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/model/interface/temporary-incapacity-benefit-rejection-result.interface';

@Injectable()
export class GetTemporaryIncapacityBenefitRejectionUseCase {
  protected readonly _type = GetTemporaryIncapacityBenefitRejectionUseCase.name;

  public constructor(
    @Inject(TemporaryIncapacityBenefitRejectionQueryRepositoryGateway)
    private readonly temporaryIncapacityBenefitRejectionQueryRepositoryGateway: TemporaryIncapacityBenefitRejectionQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
  ): Promise<GetTemporaryIncapacityBenefitRejectionResponseDto> {
    const result =
      await this.temporaryIncapacityBenefitRejectionQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitRejectionIdOrFailWithRelations(
        temporaryIncapacityBenefitRejectionId,
        TemporaryIncapacityBenefitRejectionNotFoundError,
      );

    const documents = await this.buildDocumentsResponse(result);

    const firstAnalysis =
      result.result !== null && result.result.firstAnalysis !== null
        ? this.parseStoredFirstAnalysis(result.result.firstAnalysis)
        : null;

    const completeAnalysis =
      result.result !== null && result.result.completeAnalysis !== null
        ? this.parseStoredCompleteAnalysis(result.result.completeAnalysis)
        : null;

    const completeAnalysisDownloadUrl =
      result.result !== null && result.result.completeAnalysisDownload !== null
        ? await this.fileProcessorGateway.getFileSignedUrl(
            result.result.completeAnalysisDownload,
          )
        : null;

    const disabilityAnalysis = this.buildDisabilityAnalysisResponse(result);
    const insuredStatusList = this.buildInsuredStatusResponse(result);
    const workPeriodsList = this.buildWorkPeriodsResponse(result);

    return GetTemporaryIncapacityBenefitRejectionResponseDto.build({
      temporaryIncapacityBenefitRejectionId:
        new TemporaryIncapacityBenefitRejectionId(
          result.temporaryIncapacityBenefitRejectionId,
        ),
      analysisToolClient:
        GetTemporaryIncapacityBenefitRejectionAnalysisToolClientResponseDto.build(
          {
            analysisToolClientId: new AnalysisToolClientId(
              result.analysisToolClient.analysisToolClientId,
            ),
            ...(result.analysisToolClient.name !== null && {
              name: result.analysisToolClient.name,
            }),
            ...(result.analysisToolClient.birthDate !== null && {
              birthDate: result.analysisToolClient.birthDate,
            }),
          },
        ),
      ...(result.analysisName !== null && {
        analysisName: result.analysisName,
      }),
      ...(result.requestEntryDate !== null && {
        requestEntryDate: result.requestEntryDate,
      }),
      ...(result.denialDate !== null && {
        denialDate: result.denialDate,
      }),
      ...(result.requestedBenefitType !== null && {
        requestedBenefitType: result.requestedBenefitType,
      }),
      ...(result.category !== null && {
        category: result.category,
      }),
      ...(result.denialReason !== null && {
        denialReason: result.denialReason,
      }),
      ...(result.denialReasonDescription !== null && {
        denialReasonDescription: result.denialReasonDescription,
      }),
      ...(result.condition !== null && {
        condition: result.condition,
      }),
      ...(result.conditionDescription !== null && {
        conditionDescription: result.conditionDescription,
      }),
      ...(result.result !== null && {
        temporaryIncapacityBenefitRejectionResult:
          GetTemporaryIncapacityBenefitRejectionResultResponseDto.build({
            ...(result.result.inssDecisionAnalysis !== null && {
              inssDecisionAnalysis: result.result.inssDecisionAnalysis,
            }),
            ...(firstAnalysis !== null && {
              temporaryIncapacityBenefitRejectionFirstAnalysis: firstAnalysis,
            }),
            ...(completeAnalysis !== null && {
              temporaryIncapacityBenefitRejectionCompleteAnalysis:
                completeAnalysis,
            }),
            ...(result.result.simplifiedAnalysis !== null && {
              temporaryIncapacityBenefitRejectionSimplifiedAnalysis:
                result.result.simplifiedAnalysis,
            }),
            ...(completeAnalysisDownloadUrl !== null && {
              temporaryIncapacityBenefitRejectionCompleteAnalysisDownload:
                completeAnalysisDownloadUrl.toString(),
            }),
          }),
      }),
      ...(documents.length > 0 && {
        temporaryIncapacityBenefitRejectionDocument: documents,
      }),
      ...(result.inssBenefits.length > 0 && {
        inssBenefits: result.inssBenefits.map((item) => item.inssBenefit),
      }),
      ...(disabilityAnalysis.length > 0 && {
        temporaryIncapacityBenefitRejectionDisabilityAnalysis:
          disabilityAnalysis,
      }),
      ...(insuredStatusList.length > 0 && {
        temporaryIncapacityBenefitRejectionInsuredStatus: insuredStatusList,
      }),
      ...(workPeriodsList.length > 0 && {
        temporaryIncapacityBenefitRejectionWorkPeriods: workPeriodsList,
      }),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }

  private async buildDocumentsResponse(
    result: GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult,
  ): Promise<GetTemporaryIncapacityBenefitRejectionDocumentResponseDto[]> {
    const documentPromises = result.documents.map(async (doc) => {
      const signedUrl = await this.fileProcessorGateway.getFileSignedUrl(
        doc.fileName,
      );

      return GetTemporaryIncapacityBenefitRejectionDocumentResponseDto.build({
        document: signedUrl.toString(),
        type: doc.type,
      });
    });

    return Promise.all(documentPromises);
  }

  private buildDisabilityAnalysisResponse(
    result: GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult,
  ): GetTemporaryIncapacityBenefitRejectionDisabilityAnalysisResponseDto[] {
    return result.disabilityAnalysis.map((da) =>
      GetTemporaryIncapacityBenefitRejectionDisabilityAnalysisResponseDto.build(
        {
          estimatedDisabilityStartDate: da.estimatedDisabilityStartDate,
          ...(da.shortDisabilityDescription !== null && {
            shortDisabilityDescription: da.shortDisabilityDescription,
          }),
          disabilityFromAccident: da.disabilityFromAccident,
          ...(da.disablingConditionDescription !== null && {
            disablingConditionDescription: da.disablingConditionDescription,
          }),
          disabilityFromSevereDisease: da.disabilityFromSevereDisease,
          ...(da.severeDisease !== null && {
            severeDisease: da.severeDisease,
          }),
          ...(da.diseaseCustomName !== null && {
            diseaseCustomName: da.diseaseCustomName,
          }),
          ...(da.diseaseStartDate !== null && {
            diseaseStartDate: da.diseaseStartDate,
          }),
          needsConstantAssistanceFromAnotherPerson:
            da.needsConstantAssistanceFromAnotherPerson,
          previousDisabilityBenefit: da.previousDisabilityBenefit,
          ...(da.previousBenefitNumber !== null && {
            previousBenefitNumber: da.previousBenefitNumber,
          }),
          ...(da.cids.length > 0 && {
            cids: da.cids.map((cid) =>
              GetTemporaryIncapacityBenefitRejectionDisabilityAnalysisCidResponseDto.build(
                { cidTenId: cid.cidTenId },
              ),
            ),
          }),
          ...(da.documents.length > 0 && {
            documents: da.documents.map((doc) =>
              GetTemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentResponseDto.build(
                { fileName: doc.fileName, type: doc.type },
              ),
            ),
          }),
        },
      ),
    );
  }

  private buildInsuredStatusResponse(
    result: GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult,
  ): GetTemporaryIncapacityBenefitRejectionInsuredStatusResponseDto[] {
    return result.insuredStatus.map((is) =>
      GetTemporaryIncapacityBenefitRejectionInsuredStatusResponseDto.build({
        involuntaryUnemployment: is.involuntaryUnemployment,
        intentionToProveInvoluntaryUnemployment:
          is.intentionToProveInvoluntaryUnemployment,
        ruralInsuredClient: is.ruralInsuredClient,
        ...(is.ruralPeriodStartDate !== null && {
          ruralPeriodStartDate: is.ruralPeriodStartDate,
        }),
        ...(is.ruralPeriodEndDate !== null && {
          ruralPeriodEndDate: is.ruralPeriodEndDate,
        }),
        ...(is.documentsDescription !== null && {
          documentsDescription: is.documentsDescription,
        }),
        ...(is.documents.length > 0 && {
          documents: is.documents.map((doc) =>
            GetTemporaryIncapacityBenefitRejectionInsuredStatusDocumentResponseDto.build(
              { fileName: doc.fileName },
            ),
          ),
        }),
      }),
    );
  }

  private buildWorkPeriodsResponse(
    result: GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult,
  ): GetTemporaryIncapacityBenefitRejectionWorkPeriodsResponseDto[] {
    return result.workPeriods.map((wp) =>
      GetTemporaryIncapacityBenefitRejectionWorkPeriodsResponseDto.build({
        bondOrigin: wp.bondOrigin,
        startDate: wp.startDate,
        ...(wp.endDate !== null && { endDate: wp.endDate }),
        category: wp.category,
        competenceBelowTheMinimum: wp.competenceBelowTheMinimum,
        ...(wp.pendencyReason !== null && {
          pendencyReason: wp.pendencyReason,
        }),
        ...(wp.periodConsideration !== null && {
          periodConsideration: wp.periodConsideration,
        }),
        ...(wp.contributionAverage !== null && {
          contributionAverage: wp.contributionAverage,
        }),
        status: wp.status,
        gracePeriod: wp.gracePeriod,
        ...(wp.earningsHistory.length > 0 && {
          earningsHistory: wp.earningsHistory.map((eh) =>
            GetTemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryResponseDto.build(
              {
                ...(eh.competence !== null && { competence: eh.competence }),
                ...(eh.remuneration !== null && {
                  remuneration: eh.remuneration,
                }),
                ...(eh.indicators !== null && { indicators: eh.indicators }),
                ...(eh.paymentDate !== null && {
                  paymentDate: eh.paymentDate,
                }),
                ...(eh.contribution !== null && {
                  contribution: eh.contribution,
                }),
                ...(eh.contributionSalary !== null && {
                  contributionSalary: eh.contributionSalary,
                }),
                ...(eh.competenceBelowTheMinimum !== null && {
                  competenceBelowTheMinimum: eh.competenceBelowTheMinimum,
                }),
              },
            ),
          ),
        }),
      }),
    );
  }

  private parseStoredFirstAnalysis(
    stored: string,
  ): TemporaryIncapacityBenefitRejectionFirstAnalysisModel | null {
    try {
      const raw = JSON.parse(
        stored,
      ) as TemporaryIncapacityBenefitRejectionFirstAnalysisInterface;

      return TemporaryIncapacityBenefitRejectionFirstAnalysisModel.build({
        insuredStatus: raw.insuredStatus,
        gracePeriodStatus: raw.gracePeriodStatus,
        gracePeriods: raw.gracePeriods.map((item) =>
          TemporaryIncapacityBenefitRejectionFirstAnalysisGracePeriodItemModel.build(
            {
              event: item.event,
              date: item.date,
              observation: item.observation,
            },
          ),
        ),
        analysisConclusion: raw.analysisConclusion,
        graceExtensionDueToInvoluntaryUnemployment:
          raw.graceExtensionDueToInvoluntaryUnemployment,
        requestToExtendGracePeriod: raw.requestToExtendGracePeriod,
        contributionTimeWithoutResolvingPendencies:
          raw.contributionTimeWithoutResolvingPendencies,
        contributionTimeResolvingPendencies:
          raw.contributionTimeResolvingPendencies,
        contributionTimeWithAccelerators: raw.contributionTimeWithAccelerators,
      });
    } catch {
      return null;
    }
  }

  private parseStoredCompleteAnalysis(
    stored: string,
  ): TemporaryIncapacityBenefitRejectionResultInterface | null {
    try {
      return JSON.parse(
        stored,
      ) as TemporaryIncapacityBenefitRejectionResultInterface;
    } catch {
      return null;
    }
  }
}
