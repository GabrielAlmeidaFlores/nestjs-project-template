import { Inject, Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { PermanentIncapacityBenefitTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated/query/permanent-incapacity-benefit-terminated.query.repository.gateway';
import { GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated/query/result/get-permanent-incapacity-benefit-terminated-with-relations.query.result';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/enum/permanent-incapacity-benefit-terminated-work-periods-pendency-reason.enum';
import {
  GetPermanentIncapacityBenefitTerminatedAnalysisToolClientResponseDto,
  GetPermanentIncapacityBenefitTerminatedDisabilityAnalysisCidResponseDto,
  GetPermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentResponseDto,
  GetPermanentIncapacityBenefitTerminatedDisabilityAnalysisResponseDto,
  GetPermanentIncapacityBenefitTerminatedDocumentResponseDto,
  GetPermanentIncapacityBenefitTerminatedInsuredStatusDocumentResponseDto,
  GetPermanentIncapacityBenefitTerminatedInsuredStatusResponseDto,
  GetPermanentIncapacityBenefitTerminatedResponseDto,
  GetPermanentIncapacityBenefitTerminatedResultResponseDto,
  GetPermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryResponseDto,
  GetPermanentIncapacityBenefitTerminatedWorkPeriodsResponseDto,
} from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/get-permanent-incapacity-benefit-terminated.response.dto';
import { PermanentIncapacityBenefitTerminatedNotFoundError } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/error/permanent-incapacity-benefit-terminated-not-found.error';
import {
  PermanentIncapacityBenefitTerminatedFirstAnalysisClientDataModel,
  PermanentIncapacityBenefitTerminatedFirstAnalysisEarningsHistoryItemModel,
  PermanentIncapacityBenefitTerminatedFirstAnalysisGracePeriodItemModel,
  PermanentIncapacityBenefitTerminatedFirstAnalysisModel,
  PermanentIncapacityBenefitTerminatedFirstAnalysisPeriodModel,
} from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/model/generic/permanent-incapacity-benefit-terminated-first-analysis.model';

import type { PermanentIncapacityBenefitTerminatedFirstAnalysisInterface } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/model/interface/permanent-incapacity-benefit-terminated-first-analysis.interface';
import type { PermanentIncapacityBenefitTerminatedResultInterface } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/model/interface/permanent-incapacity-benefit-terminated-result.interface';

@Injectable()
export class GetPermanentIncapacityBenefitTerminatedUseCase {
  protected readonly _type =
    GetPermanentIncapacityBenefitTerminatedUseCase.name;

  public constructor(
    @Inject(PermanentIncapacityBenefitTerminatedQueryRepositoryGateway)
    private readonly permanentIncapacityBenefitTerminatedQueryRepositoryGateway: PermanentIncapacityBenefitTerminatedQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
  ): Promise<GetPermanentIncapacityBenefitTerminatedResponseDto> {
    const result =
      await this.permanentIncapacityBenefitTerminatedQueryRepositoryGateway.findOneByPermanentIncapacityBenefitTerminatedIdOrFailWithRelations(
        permanentIncapacityBenefitTerminatedId,
        PermanentIncapacityBenefitTerminatedNotFoundError,
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

    return GetPermanentIncapacityBenefitTerminatedResponseDto.build({
      permanentIncapacityBenefitTerminatedId: result.id,
      analysisToolClient:
        GetPermanentIncapacityBenefitTerminatedAnalysisToolClientResponseDto.build(
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
        permanentIncapacityBenefitTerminatedResult:
          GetPermanentIncapacityBenefitTerminatedResultResponseDto.build({
            ...(result.result.inssDecisionAnalysis !== null && {
              inssDecisionAnalysis: result.result.inssDecisionAnalysis,
            }),
            ...(firstAnalysis !== null && {
              permanentIncapacityBenefitTerminatedFirstAnalysis: firstAnalysis,
            }),
            ...(completeAnalysis !== null && {
              permanentIncapacityBenefitTerminatedCompleteAnalysis:
                completeAnalysis,
            }),
            ...(result.result.simplifiedAnalysis !== null && {
              permanentIncapacityBenefitTerminatedSimplifiedAnalysis:
                result.result.simplifiedAnalysis,
            }),
            ...(completeAnalysisDownloadUrl !== null && {
              permanentIncapacityBenefitTerminatedCompleteAnalysisDownload:
                completeAnalysisDownloadUrl.toString(),
            }),
          }),
      }),
      ...(documents.length > 0 && {
        permanentIncapacityBenefitTerminatedDocument: documents,
      }),
      ...(result.inssBenefits.length > 0 && {
        inssBenefits: result.inssBenefits.map((item) => item.inssBenefit),
      }),
      ...(disabilityAnalysis.length > 0 && {
        permanentIncapacityBenefitTerminatedDisabilityAnalysis:
          disabilityAnalysis,
      }),
      ...(insuredStatusList.length > 0 && {
        permanentIncapacityBenefitTerminatedInsuredStatus: insuredStatusList,
      }),
      ...(workPeriodsList.length > 0 && {
        permanentIncapacityBenefitTerminatedWorkPeriods: workPeriodsList,
      }),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }

  private async buildDocumentsResponse(
    result: GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult,
  ): Promise<GetPermanentIncapacityBenefitTerminatedDocumentResponseDto[]> {
    const documentPromises = result.documents.map(async (doc) => {
      const signedUrl = await this.fileProcessorGateway.getFileSignedUrl(
        doc.fileName,
      );

      return GetPermanentIncapacityBenefitTerminatedDocumentResponseDto.build({
        document: signedUrl.toString(),
        type: doc.type,
      });
    });

    return Promise.all(documentPromises);
  }

  private buildDisabilityAnalysisResponse(
    result: GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult,
  ): GetPermanentIncapacityBenefitTerminatedDisabilityAnalysisResponseDto[] {
    return result.disabilityAnalysis.map((da) =>
      GetPermanentIncapacityBenefitTerminatedDisabilityAnalysisResponseDto.build(
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
              GetPermanentIncapacityBenefitTerminatedDisabilityAnalysisCidResponseDto.build(
                { cidTenId: cid.cidTenId },
              ),
            ),
          }),
          ...(da.documents.length > 0 && {
            documents: da.documents.map((doc) =>
              GetPermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentResponseDto.build(
                { fileName: doc.fileName, type: doc.type },
              ),
            ),
          }),
        },
      ),
    );
  }

  private buildInsuredStatusResponse(
    result: GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult,
  ): GetPermanentIncapacityBenefitTerminatedInsuredStatusResponseDto[] {
    return result.insuredStatus.map((is) =>
      GetPermanentIncapacityBenefitTerminatedInsuredStatusResponseDto.build({
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
            GetPermanentIncapacityBenefitTerminatedInsuredStatusDocumentResponseDto.build(
              { fileName: doc.fileName },
            ),
          ),
        }),
      }),
    );
  }

  private buildWorkPeriodsResponse(
    result: GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult,
  ): GetPermanentIncapacityBenefitTerminatedWorkPeriodsResponseDto[] {
    return result.workPeriods.map((wp) =>
      GetPermanentIncapacityBenefitTerminatedWorkPeriodsResponseDto.build({
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
            GetPermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryResponseDto.build(
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
  ): PermanentIncapacityBenefitTerminatedFirstAnalysisModel | null {
    try {
      const raw = JSON.parse(stored) as Omit<
        PermanentIncapacityBenefitTerminatedFirstAnalysisInterface,
        'clientData' | 'graceExempt' | 'graceValidation' | 'periods'
      > & {
        clientData?: PermanentIncapacityBenefitTerminatedFirstAnalysisInterface['clientData'];
        graceExempt?: boolean;
        graceValidation?: string;
        periods?: PermanentIncapacityBenefitTerminatedFirstAnalysisInterface['periods'];
      };

      const rawClientData = raw.clientData;

      const clientData =
        PermanentIncapacityBenefitTerminatedFirstAnalysisClientDataModel.build({
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
        });

      const periods = (this.hasValue(raw.periods) ? raw.periods : []).map(
        (period) =>
          PermanentIncapacityBenefitTerminatedFirstAnalysisPeriodModel.build({
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
            ...(this.isValidEnum(
              period.pendencyReason,
              PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum,
            ) && {
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
              PermanentIncapacityBenefitTerminatedFirstAnalysisEarningsHistoryItemModel.build(
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

      return PermanentIncapacityBenefitTerminatedFirstAnalysisModel.build({
        clientData,
        insuredStatus: raw.insuredStatus,
        gracePeriodStatus: raw.gracePeriodStatus,
        gracePeriods: raw.gracePeriods.map((item) =>
          PermanentIncapacityBenefitTerminatedFirstAnalysisGracePeriodItemModel.build(
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

  private isValidEnum<T extends Record<string, string>>(
    value: string | null | undefined,
    enumType: T,
  ): value is T[keyof T] {
    if (!this.hasValue(value) || value === '') {
      return false;
    }

    return Object.values(enumType).includes(value);
  }

  private parseStoredCompleteAnalysis(
    stored: string,
  ): PermanentIncapacityBenefitTerminatedResultInterface | null {
    try {
      return JSON.parse(
        stored,
      ) as PermanentIncapacityBenefitTerminatedResultInterface;
    } catch {
      return null;
    }
  }
}
