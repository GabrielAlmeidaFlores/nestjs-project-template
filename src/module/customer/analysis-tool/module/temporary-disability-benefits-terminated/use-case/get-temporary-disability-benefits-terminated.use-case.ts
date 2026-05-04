import { Inject, Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated/query/result/get-temporary-disability-benefits-terminated-with-relations.query.result';
import { TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated/query/temporary-disability-benefits-terminated.query.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import {
  GetTemporaryDisabilityBenefitsTerminatedAnalysisToolClientResponseDto,
  GetTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidResponseDto,
  GetTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentResponseDto,
  GetTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisResponseDto,
  GetTemporaryDisabilityBenefitsTerminatedDocumentResponseDto,
  GetTemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentResponseDto,
  GetTemporaryDisabilityBenefitsTerminatedInsuredStatusResponseDto,
  GetTemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentResponseDto,
  GetTemporaryDisabilityBenefitsTerminatedPreviousBenefitResponseDto,
  GetTemporaryDisabilityBenefitsTerminatedResponseDto,
  GetTemporaryDisabilityBenefitsTerminatedResultResponseDto,
  GetTemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentResponseDto,
  GetTemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryResponseDto,
  GetTemporaryDisabilityBenefitsTerminatedWorkPeriodsResponseDto,
} from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/response/get-temporary-disability-benefits-terminated.response.dto';
import { TemporaryDisabilityBenefitsTerminatedNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/temporary-disability-benefits-terminated-not-found.error';
import {
  TemporaryDisabilityBenefitsTerminatedFirstAnalysisClientDataModel,
  TemporaryDisabilityBenefitsTerminatedFirstAnalysisEarningsHistoryItemModel,
  TemporaryDisabilityBenefitsTerminatedFirstAnalysisGracePeriodItemModel,
  TemporaryDisabilityBenefitsTerminatedFirstAnalysisModel,
  TemporaryDisabilityBenefitsTerminatedFirstAnalysisPeriodModel,
} from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/model/generic/temporary-disability-benefits-terminated-first-analysis.model';

import type { TemporaryDisabilityBenefitsTerminatedFirstAnalysisInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/model/interface/temporary-disability-benefits-terminated-first-analysis.interface';
import type { TemporaryDisabilityBenefitsTerminatedResultInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/model/interface/temporary-disability-benefits-terminated-result.interface';

@Injectable()
export class GetTemporaryDisabilityBenefitsTerminatedUseCase {
  protected readonly _type =
    GetTemporaryDisabilityBenefitsTerminatedUseCase.name;

  public constructor(
    @Inject(TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway)
    private readonly temporaryDisabilityBenefitsTerminatedQueryRepositoryGateway: TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
  ): Promise<GetTemporaryDisabilityBenefitsTerminatedResponseDto> {
    const result =
      await this.temporaryDisabilityBenefitsTerminatedQueryRepositoryGateway.findOneByTemporaryDisabilityBenefitsTerminatedIdOrFailWithRelations(
        temporaryDisabilityBenefitsTerminatedId,
        TemporaryDisabilityBenefitsTerminatedNotFoundError,
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

    return GetTemporaryDisabilityBenefitsTerminatedResponseDto.build({
      temporaryDisabilityBenefitsTerminatedId: result.id,
      analysisToolClient:
        GetTemporaryDisabilityBenefitsTerminatedAnalysisToolClientResponseDto.build(
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
      ...(result.benefitCessationDate !== null && {
        benefitCessationDate: result.benefitCessationDate,
      }),
      ...(result.category !== null && {
        category: result.category,
      }),
      ...(result.myInssPassword !== null && {
        myInssPassword: result.myInssPassword,
      }),
      ...(result.benefitCessationReason !== null && {
        benefitCessationReason: result.benefitCessationReason,
      }),
      ...(result.result !== null && {
        temporaryDisabilityBenefitsTerminatedResult:
          GetTemporaryDisabilityBenefitsTerminatedResultResponseDto.build({
            ...(result.result.inssDecisionAnalysis !== null && {
              inssDecisionAnalysis: result.result.inssDecisionAnalysis,
            }),
            ...(firstAnalysis !== null && {
              temporaryDisabilityBenefitsTerminatedFirstAnalysis: firstAnalysis,
            }),
            ...(completeAnalysis !== null && {
              temporaryDisabilityBenefitsTerminatedCompleteAnalysis:
                completeAnalysis,
            }),
            ...(result.result.simplifiedAnalysis !== null && {
              temporaryDisabilityBenefitsTerminatedSimplifiedAnalysis:
                result.result.simplifiedAnalysis,
            }),
            ...(completeAnalysisDownloadUrl !== null && {
              temporaryDisabilityBenefitsTerminatedCompleteAnalysisDownload:
                completeAnalysisDownloadUrl.toString(),
            }),
          }),
      }),
      ...(documents.length > 0 && {
        temporaryDisabilityBenefitsTerminatedDocument: documents,
      }),
      ...(result.inssBenefits.length > 0 && {
        inssBenefits: result.inssBenefits.map((item) => item.inssBenefit),
      }),
      ...(disabilityAnalysis.length > 0 && {
        temporaryDisabilityBenefitsTerminatedDisabilityAnalysis:
          disabilityAnalysis,
      }),
      ...(insuredStatusList.length > 0 && {
        temporaryDisabilityBenefitsTerminatedInsuredStatus: insuredStatusList,
      }),
      ...(workPeriodsList.length > 0 && {
        temporaryDisabilityBenefitsTerminatedWorkPeriods: workPeriodsList,
      }),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }

  private async buildDocumentsResponse(
    result: GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult,
  ): Promise<GetTemporaryDisabilityBenefitsTerminatedDocumentResponseDto[]> {
    const documentPromises = result.documents.map(async (doc) => {
      const signedUrl = await this.fileProcessorGateway.getFileSignedUrl(
        doc.fileName,
      );

      return GetTemporaryDisabilityBenefitsTerminatedDocumentResponseDto.build({
        document: signedUrl.toString(),
        type: doc.type,
      });
    });

    return Promise.all(documentPromises);
  }

  private buildDisabilityAnalysisResponse(
    result: GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult,
  ): GetTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisResponseDto[] {
    return result.disabilityAnalysis.map((da) =>
      GetTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisResponseDto.build(
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
          ...(da.cids.length > 0 && {
            cids: da.cids.map((cid) =>
              GetTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidResponseDto.build(
                { cidTenId: cid.cidTenId },
              ),
            ),
          }),
          ...(da.documents.length > 0 && {
            documents: da.documents.map((doc) =>
              GetTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentResponseDto.build(
                { fileName: doc.fileName, type: doc.type },
              ),
            ),
          }),
          ...(da.previousBenefits.length > 0 && {
            previousBenefits: da.previousBenefits.map((previousBenefit) =>
              GetTemporaryDisabilityBenefitsTerminatedPreviousBenefitResponseDto.build(
                {
                  benefitNumber: previousBenefit.benefitNumber,
                  ...(previousBenefit.documents.length > 0 && {
                    documents: previousBenefit.documents.map((document) =>
                      GetTemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentResponseDto.build(
                        {
                          fileName: document.fileName,
                          type: document.type,
                        },
                      ),
                    ),
                  }),
                },
              ),
            ),
          }),
        },
      ),
    );
  }

  private buildInsuredStatusResponse(
    result: GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult,
  ): GetTemporaryDisabilityBenefitsTerminatedInsuredStatusResponseDto[] {
    return result.insuredStatus.map((is) =>
      GetTemporaryDisabilityBenefitsTerminatedInsuredStatusResponseDto.build({
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
            GetTemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentResponseDto.build(
              { fileName: doc.fileName },
            ),
          ),
        }),
      }),
    );
  }

  private buildWorkPeriodsResponse(
    result: GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult,
  ): GetTemporaryDisabilityBenefitsTerminatedWorkPeriodsResponseDto[] {
    return result.workPeriods.map((wp) =>
      GetTemporaryDisabilityBenefitsTerminatedWorkPeriodsResponseDto.build({
        ...(wp.bondOrigin !== null && { bondOrigin: wp.bondOrigin }),
        startDate: wp.startDate,
        ...(wp.endDate !== null && { endDate: wp.endDate }),
        ...(wp.category !== null && { category: wp.category }),
        ...(wp.activityDescription !== null && {
          activityDescription: wp.activityDescription,
        }),
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
        ...(wp.impactMonths !== null && {
          impactMonths: wp.impactMonths,
        }),
        status: wp.status,
        ...(wp.gracePeriod !== null && {
          gracePeriod: wp.gracePeriod,
        }),
        isPendency: wp.isPendency,
        ...(wp.wantsToComplementViaMeuINSS !== null && {
          wantsToComplementViaMeuINSS: wp.wantsToComplementViaMeuINSS,
        }),
        isManualPeriod: wp.isManualPeriod,
        ...(wp.documents.length > 0 && {
          documents: wp.documents
            .filter(
              (document) =>
                document.fileName !== null && document.type !== null,
            )
            .map((document) =>
              GetTemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentResponseDto.build(
                {
                  fileName: document.fileName as string,
                  type: document.type as NonNullable<typeof document.type>,
                },
              ),
            ),
        }),
        ...(wp.earningsHistory.length > 0 && {
          earningsHistory: wp.earningsHistory.map((eh) =>
            GetTemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryResponseDto.build(
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
  ): TemporaryDisabilityBenefitsTerminatedFirstAnalysisModel | null {
    try {
      const raw = JSON.parse(stored) as Omit<
        TemporaryDisabilityBenefitsTerminatedFirstAnalysisInterface,
        'clientData' | 'graceExempt' | 'graceValidation' | 'periods'
      > & {
        clientData?: TemporaryDisabilityBenefitsTerminatedFirstAnalysisInterface['clientData'];
        graceExempt?: boolean;
        graceValidation?: string;
        periods?: TemporaryDisabilityBenefitsTerminatedFirstAnalysisInterface['periods'];
      };

      const rawClientData = raw.clientData;

      const clientData =
        TemporaryDisabilityBenefitsTerminatedFirstAnalysisClientDataModel.build(
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
          TemporaryDisabilityBenefitsTerminatedFirstAnalysisPeriodModel.build({
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
              TemporaryDisabilityBenefitsTerminatedFirstAnalysisEarningsHistoryItemModel.build(
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

      return TemporaryDisabilityBenefitsTerminatedFirstAnalysisModel.build({
        clientData,
        insuredStatus: raw.insuredStatus,
        gracePeriodStatus: raw.gracePeriodStatus,
        gracePeriods: raw.gracePeriods.map((item) =>
          TemporaryDisabilityBenefitsTerminatedFirstAnalysisGracePeriodItemModel.build(
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
  ): TemporaryDisabilityBenefitsTerminatedResultInterface | null {
    try {
      return JSON.parse(
        stored,
      ) as TemporaryDisabilityBenefitsTerminatedResultInterface;
    } catch {
      return null;
    }
  }
}
