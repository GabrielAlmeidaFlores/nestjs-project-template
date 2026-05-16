import { Inject, Injectable } from '@nestjs/common';

import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
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
  TemporaryIncapacityBenefitRejectionFirstAnalysisClientDataModel,
  TemporaryIncapacityBenefitRejectionFirstAnalysisEarningsHistoryItemModel,
  TemporaryIncapacityBenefitRejectionFirstAnalysisGracePeriodItemModel,
  TemporaryIncapacityBenefitRejectionFirstAnalysisModel,
  TemporaryIncapacityBenefitRejectionFirstAnalysisPeriodModel,
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
        ? this.parseStoredFirstAnalysis(
            result.result.firstAnalysis,
            result.analysisToolClient ?? {
              name: null,
              email: null,
              sex: null,
              phone: null,
            },
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

    return GetTemporaryIncapacityBenefitRejectionResponseDto.build({
      temporaryIncapacityBenefitRejectionId: result.id,
      ...(result.analysisToolClient !== null && {
        analysisToolClient:
          GetTemporaryIncapacityBenefitRejectionAnalysisToolClientResponseDto.build(
            {
              analysisToolClientId: new AnalysisToolClientId(
                result.analysisToolClient.analysisToolClientId,
              ),
              ...(result.analysisToolClient.name !== null && {
                name: result.analysisToolClient.name,
              }),
              ...(result.analysisToolClient.federalDocument !== null && {
                federalDocument: new FederalDocument(
                  result.analysisToolClient.federalDocument,
                ),
              }),
              ...(result.analysisToolClient.email !== null && {
                email: new Email(result.analysisToolClient.email),
              }),
              ...(result.analysisToolClient.phone !== null && {
                phoneNumber: new PhoneNumber(result.analysisToolClient.phone),
              }),
              ...(result.analysisToolClient.birthDate !== null && {
                birthDate: result.analysisToolClient.birthDate,
              }),
              ...(result.analysisToolClient.sex !== null && {
                gender: result.analysisToolClient.sex as GenderEnum,
              }),
            },
          ),
      }),
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
    entityClientData: {
      name: string | null;
      email: string | null;
      sex: string | null;
      phone: string | null;
    },
  ): TemporaryIncapacityBenefitRejectionFirstAnalysisModel | null {
    try {
      const raw = JSON.parse(stored) as Omit<
        TemporaryIncapacityBenefitRejectionFirstAnalysisInterface,
        'clientData' | 'graceExempt' | 'graceValidation' | 'periods'
      > & {
        clientData?: TemporaryIncapacityBenefitRejectionFirstAnalysisInterface['clientData'];
        graceExempt?: boolean;
        graceValidation?: string;
        periods?: TemporaryIncapacityBenefitRejectionFirstAnalysisInterface['periods'];
      };

      const rawClientData = raw.clientData;

      const clientData =
        TemporaryIncapacityBenefitRejectionFirstAnalysisClientDataModel.build({
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
          TemporaryIncapacityBenefitRejectionFirstAnalysisPeriodModel.build({
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
              TemporaryIncapacityBenefitRejectionFirstAnalysisEarningsHistoryItemModel.build(
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

      return TemporaryIncapacityBenefitRejectionFirstAnalysisModel.build({
        clientData,
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
