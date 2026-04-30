import { Inject, Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination/query/result/get-temporary-incapacity-benefit-termination-with-relations.query.result';
import { TemporaryIncapacityBenefitTerminationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination/query/temporary-incapacity-benefit-termination.query.repository.gateway';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import {
  GetTemporaryIncapacityBenefitTerminationAnalysisToolClientResponseDto,
  GetTemporaryIncapacityBenefitTerminationDisabilityAnalysisCidResponseDto,
  GetTemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentResponseDto,
  GetTemporaryIncapacityBenefitTerminationDisabilityAnalysisResponseDto,
  GetTemporaryIncapacityBenefitTerminationDocumentResponseDto,
  GetTemporaryIncapacityBenefitTerminationInsuredStatusDocumentResponseDto,
  GetTemporaryIncapacityBenefitTerminationInsuredStatusResponseDto,
  GetTemporaryIncapacityBenefitTerminationResponseDto,
  GetTemporaryIncapacityBenefitTerminationResultResponseDto,
  GetTemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryResponseDto,
  GetTemporaryIncapacityBenefitTerminationWorkPeriodsResponseDto,
} from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/get-temporary-incapacity-benefit-termination.response.dto';
import { TemporaryIncapacityBenefitTerminationNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/error/temporary-incapacity-benefit-termination-not-found.error';
import {
  TemporaryIncapacityBenefitTerminationFirstAnalysisClientDataModel,
  TemporaryIncapacityBenefitTerminationFirstAnalysisEarningsHistoryItemModel,
  TemporaryIncapacityBenefitTerminationFirstAnalysisGracePeriodItemModel,
  TemporaryIncapacityBenefitTerminationFirstAnalysisModel,
  TemporaryIncapacityBenefitTerminationFirstAnalysisPeriodModel,
} from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/model/generic/temporary-incapacity-benefit-termination-first-analysis.model';

import type { TemporaryIncapacityBenefitTerminationFirstAnalysisInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/model/interface/temporary-incapacity-benefit-termination-first-analysis.interface';
import type { TemporaryIncapacityBenefitTerminationResultInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/model/interface/temporary-incapacity-benefit-termination-result.interface';

@Injectable()
export class GetTemporaryIncapacityBenefitTerminationUseCase {
  protected readonly _type =
    GetTemporaryIncapacityBenefitTerminationUseCase.name;

  public constructor(
    @Inject(TemporaryIncapacityBenefitTerminationQueryRepositoryGateway)
    private readonly temporaryIncapacityBenefitTerminationQueryRepositoryGateway: TemporaryIncapacityBenefitTerminationQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
  ): Promise<GetTemporaryIncapacityBenefitTerminationResponseDto> {
    const result =
      await this.temporaryIncapacityBenefitTerminationQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitTerminationIdOrFailWithRelations(
        temporaryIncapacityBenefitTerminationId,
        TemporaryIncapacityBenefitTerminationNotFoundError,
      );

    const documents = await this.buildDocumentsResponse(result);

    const firstAnalysis =
      result.result !== null && result.result.firstAnalysis !== null
        ? this.parseStoredFirstAnalysis(
            result.result.firstAnalysis,
            result.analysisToolClient,
          )
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

    return GetTemporaryIncapacityBenefitTerminationResponseDto.build({
      temporaryIncapacityBenefitTerminationId: result.id,
      analysisToolClient:
        GetTemporaryIncapacityBenefitTerminationAnalysisToolClientResponseDto.build(
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
      ...(result.benefitTerminationDate !== null && {
        benefitTerminationDate: result.benefitTerminationDate,
      }),
      ...(result.category !== null && {
        category: result.category,
      }),
      ...(result.terminationReason !== null && {
        terminationReason: result.terminationReason,
      }),
      ...(result.terminationReasonDescription !== null && {
        terminationReasonDescription: result.terminationReasonDescription,
      }),
      ...(result.result !== null && {
        temporaryIncapacityBenefitTerminationResult:
          GetTemporaryIncapacityBenefitTerminationResultResponseDto.build({
            ...(result.result.inssDecisionAnalysis !== null && {
              inssDecisionAnalysis: result.result.inssDecisionAnalysis,
            }),
            ...(firstAnalysis !== null && {
              temporaryIncapacityBenefitTerminationFirstAnalysis: firstAnalysis,
            }),
            ...(completeAnalysis !== null && {
              temporaryIncapacityBenefitTerminationCompleteAnalysis:
                completeAnalysis,
            }),
            ...(result.result.simplifiedAnalysis !== null && {
              temporaryIncapacityBenefitTerminationSimplifiedAnalysis:
                result.result.simplifiedAnalysis,
            }),
            ...(completeAnalysisDownloadUrl !== null && {
              temporaryIncapacityBenefitTerminationCompleteAnalysisDownload:
                completeAnalysisDownloadUrl.toString(),
            }),
          }),
      }),
      ...(documents.length > 0 && {
        temporaryIncapacityBenefitTerminationDocument: documents,
      }),
      ...(result.inssBenefits.length > 0 && {
        inssBenefits: result.inssBenefits.map((item) => item.inssBenefit),
      }),
      ...(disabilityAnalysis.length > 0 && {
        temporaryIncapacityBenefitTerminationDisabilityAnalysis:
          disabilityAnalysis,
      }),
      ...(insuredStatusList.length > 0 && {
        temporaryIncapacityBenefitTerminationInsuredStatus: insuredStatusList,
      }),
      ...(workPeriodsList.length > 0 && {
        temporaryIncapacityBenefitTerminationWorkPeriods: workPeriodsList,
      }),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }

  private async buildDocumentsResponse(
    result: GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult,
  ): Promise<GetTemporaryIncapacityBenefitTerminationDocumentResponseDto[]> {
    const documentPromises = result.documents.map(async (doc) => {
      const signedUrl = await this.fileProcessorGateway.getFileSignedUrl(
        doc.fileName,
      );

      return GetTemporaryIncapacityBenefitTerminationDocumentResponseDto.build({
        document: signedUrl.toString(),
        type: doc.type,
      });
    });

    return Promise.all(documentPromises);
  }

  private buildDisabilityAnalysisResponse(
    result: GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult,
  ): GetTemporaryIncapacityBenefitTerminationDisabilityAnalysisResponseDto[] {
    return result.disabilityAnalysis.map((da) =>
      GetTemporaryIncapacityBenefitTerminationDisabilityAnalysisResponseDto.build(
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
              GetTemporaryIncapacityBenefitTerminationDisabilityAnalysisCidResponseDto.build(
                { cidTenId: cid.cidTenId },
              ),
            ),
          }),
          ...(da.documents.length > 0 && {
            documents: da.documents.map((doc) =>
              GetTemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentResponseDto.build(
                { fileName: doc.fileName, type: doc.type },
              ),
            ),
          }),
        },
      ),
    );
  }

  private buildInsuredStatusResponse(
    result: GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult,
  ): GetTemporaryIncapacityBenefitTerminationInsuredStatusResponseDto[] {
    return result.insuredStatus.map((is) =>
      GetTemporaryIncapacityBenefitTerminationInsuredStatusResponseDto.build({
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
            GetTemporaryIncapacityBenefitTerminationInsuredStatusDocumentResponseDto.build(
              { fileName: doc.fileName },
            ),
          ),
        }),
      }),
    );
  }

  private buildWorkPeriodsResponse(
    result: GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult,
  ): GetTemporaryIncapacityBenefitTerminationWorkPeriodsResponseDto[] {
    return result.workPeriods.map((wp) =>
      GetTemporaryIncapacityBenefitTerminationWorkPeriodsResponseDto.build({
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
            GetTemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryResponseDto.build(
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
    entityClientData: {
      name: string | null;
      email: string | null;
      sex: string | null;
      phone: string | null;
    },
  ): TemporaryIncapacityBenefitTerminationFirstAnalysisModel | null {
    try {
      const raw = JSON.parse(stored) as Omit<
        TemporaryIncapacityBenefitTerminationFirstAnalysisInterface,
        'clientData' | 'graceExempt' | 'graceValidation' | 'periods'
      > & {
        clientData?: TemporaryIncapacityBenefitTerminationFirstAnalysisInterface['clientData'];
        graceExempt?: boolean;
        graceValidation?: string;
        periods?: TemporaryIncapacityBenefitTerminationFirstAnalysisInterface['periods'];
      };

      const rawClientData = raw.clientData;

      const clientData =
        TemporaryIncapacityBenefitTerminationFirstAnalysisClientDataModel.build(
          {
            name: rawClientData?.name ?? entityClientData.name ?? '',
            ...(rawClientData !== undefined &&
              this.hasValue(rawClientData.cpf) && {
                cpf: rawClientData.cpf,
              }),
            ...(rawClientData !== undefined &&
              this.hasValue(rawClientData.birthDate) && {
                birthDate: rawClientData.birthDate,
              }),
            ...(rawClientData !== undefined &&
              this.hasValue(rawClientData.category) && {
                category: rawClientData.category,
              }),
            ...(rawClientData !== undefined &&
              this.hasValue(rawClientData.nb) && {
                nb: rawClientData.nb,
              }),
            ...(rawClientData !== undefined &&
              this.hasValue(rawClientData.judicialProcessNumber) && {
                judicialProcessNumber: rawClientData.judicialProcessNumber,
              }),
            ...(rawClientData !== undefined &&
              this.hasValue(rawClientData.incapacityStartDate) && {
                incapacityStartDate: rawClientData.incapacityStartDate,
              }),
            ...(this.hasValue(entityClientData.sex) && {
              gender: entityClientData.sex,
            }),
            ...(this.hasValue(entityClientData.email) && {
              email: entityClientData.email,
            }),
            ...(this.hasValue(entityClientData.phone) && {
              phone: entityClientData.phone,
            }),
          },
        );

      const periods = (this.hasValue(raw.periods) ? raw.periods : []).map(
        (period) =>
          TemporaryIncapacityBenefitTerminationFirstAnalysisPeriodModel.build({
            startDate: period.startDate,
            isPendency: period.isPendency,
            competenceBelowTheMinimum: period.competenceBelowTheMinimum,
            status: period.status,
            ...(this.hasValue(period.bondOrigin) && {
              bondOrigin: period.bondOrigin,
            }),
            ...(this.hasValue(period.category) && {
              category: period.category,
            }),
            ...(this.hasValue(period.activityDescription) && {
              activityDescription: period.activityDescription,
            }),
            ...(this.hasValue(period.endDate) && {
              endDate: period.endDate,
            }),
            ...(this.hasValue(period.impactMonths) && {
              impactMonths: period.impactMonths,
            }),
            ...(this.hasValue(period.graceMonths) && {
              graceMonths: period.graceMonths,
            }),
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
            earningsHistory: (this.hasValue(period.earningsHistory)
              ? period.earningsHistory
              : []
            ).map((eh) =>
              TemporaryIncapacityBenefitTerminationFirstAnalysisEarningsHistoryItemModel.build(
                {
                  ...(this.hasValue(eh.competence) && {
                    competence: eh.competence,
                  }),
                  ...(this.hasValue(eh.value) && {
                    value: eh.value,
                  }),
                  ...(this.hasValue(eh.pendencyType) && {
                    pendencyType: eh.pendencyType,
                  }),
                  ...(this.hasValue(eh.collectedAt) && {
                    collectedAt: eh.collectedAt,
                  }),
                },
              ),
            ),
          }),
      );

      return TemporaryIncapacityBenefitTerminationFirstAnalysisModel.build({
        clientData,
        insuredStatus: raw.insuredStatus,
        gracePeriodStatus: raw.gracePeriodStatus,
        gracePeriods: raw.gracePeriods.map((item) =>
          TemporaryIncapacityBenefitTerminationFirstAnalysisGracePeriodItemModel.build(
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
        graceExempt: raw.graceExempt ?? false,
        graceValidation: raw.graceValidation ?? '',
        contributionTimeWithoutResolvingPendencies:
          raw.contributionTimeWithoutResolvingPendencies,
        contributionTimeResolvingPendencies:
          raw.contributionTimeResolvingPendencies,
        contributionTimeWithAccelerators: raw.contributionTimeWithAccelerators,
        periods,
      });
    } catch {
      return null;
    }
  }

  private hasValue<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }

  private parseStoredCompleteAnalysis(
    stored: string,
  ): TemporaryIncapacityBenefitTerminationResultInterface | null {
    try {
      return JSON.parse(
        stored,
      ) as TemporaryIncapacityBenefitTerminationResultInterface;
    } catch {
      return null;
    }
  }
}
