import { Inject, Injectable } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TemporaryDisabilityBenefitsGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant/query/temporary-disability-benefits-grant.query.repository.gateway';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import {
  GetTemporaryDisabilityBenefitsGrantAnalysisToolClientResponseDto,
  GetTemporaryDisabilityBenefitsGrantCnisDocumentResponseDto,
  GetTemporaryDisabilityBenefitsGrantInsuredStatusInGrantResponseDto,
  GetTemporaryDisabilityBenefitsGrantPeriodDocumentInGrantResponseDto,
  GetTemporaryDisabilityBenefitsGrantPeriodInGrantResponseDto,
  GetTemporaryDisabilityBenefitsGrantPreviousBenefitsInGrantResponseDto,
  GetTemporaryDisabilityBenefitsGrantResponseDto,
  GetTemporaryDisabilityBenefitsGrantResultResponseDto,
  GetTemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryInGrantResponseDto,
  GetTemporaryDisabilityBenefitsGrantWorkPeriodsInGrantResponseDto,
} from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/response/get-temporary-disability-benefits-grant.response.dto';
import { TemporaryDisabilityBenefitsGrantNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/error/temporary-disability-benefits-grant-not-found.error';
import {
  TemporaryDisabilityBenefitsGrantFirstAnalysisGracePeriodItemModel,
  TemporaryDisabilityBenefitsGrantFirstAnalysisModel,
} from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/model/generic/temporary-disability-benefits-grant-first-analysis.model';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { TemporaryDisabilityBenefitsGrantFirstAnalysisInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/model/interface/temporary-disability-benefits-grant-first-analysis.interface';
import type { TemporaryDisabilityBenefitsGrantResultInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/model/interface/temporary-disability-benefits-grant-result.interface';

@Injectable()
export class GetTemporaryDisabilityBenefitsGrantUseCase {
  protected readonly _type = GetTemporaryDisabilityBenefitsGrantUseCase.name;

  public constructor(
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsGrantQueryRepositoryGateway)
    private readonly temporaryDisabilityBenefitsGrantQueryRepositoryGateway: TemporaryDisabilityBenefitsGrantQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
  ): Promise<GetTemporaryDisabilityBenefitsGrantResponseDto> {
    const [result, analysisToolRecord] = await Promise.all([
      this.temporaryDisabilityBenefitsGrantQueryRepositoryGateway.findOneByTemporaryDisabilityBenefitsGrantIdOrFailWithRelations(
        temporaryDisabilityBenefitsGrantId,
        TemporaryDisabilityBenefitsGrantNotFoundError,
      ),
      this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByTemporaryDisabilityBenefitsGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        temporaryDisabilityBenefitsGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        TemporaryDisabilityBenefitsGrantNotFoundError,
      ),
    ]);

    const cnisDocumentEntity =
      result.temporaryDisabilityBenefitsGrantDocument?.[0] ?? null;

    const cnisDocument =
      cnisDocumentEntity !== null
        ? await this.buildCnisDocumentResponse(cnisDocumentEntity.fileName)
        : null;

    const firstAnalysis =
      result.temporaryDisabilityBenefitsGrantResult !== null &&
      result.temporaryDisabilityBenefitsGrantResult.firstAnalysis !== null
        ? this.parseStoredFirstAnalysis(
            result.temporaryDisabilityBenefitsGrantResult.firstAnalysis,
          )
        : null;

    const completeAnalysis =
      result.temporaryDisabilityBenefitsGrantResult !== null &&
      result.temporaryDisabilityBenefitsGrantResult.completeAnalysis !== null
        ? this.parseStoredCompleteAnalysis(
            result.temporaryDisabilityBenefitsGrantResult.completeAnalysis,
          )
        : null;

    const periods = (result.temporaryDisabilityBenefitsGrantPeriod ?? []).map(
      (period) => {
        const periodDocuments = (
          result.temporaryDisabilityBenefitsGrantPeriodDocument ?? []
        ).filter(
          (doc) =>
            doc.temporaryDisabilityBenefitsGrantPeriodId.toString() ===
            period.id.toString(),
        );

        const previousBenefits = (
          result.temporaryDisabilityBenefitsGrantPreviousBenefits ?? []
        ).filter(
          (pb) =>
            pb.temporaryDisabilityBenefitsGrantPeriodId.toString() ===
            period.id.toString(),
        );

        return GetTemporaryDisabilityBenefitsGrantPeriodInGrantResponseDto.build(
          {
            startDate: period.startDate,
            ...(period.cidTenId !== null && { cidTenId: period.cidTenId }),
            ...(period.description !== null && {
              description: period.description,
            }),
            jobDerivatedDisability: period.jobDerivatedDisability,
            ...(period.disablingConditionDescription !== null && {
              disablingConditionDescription:
                period.disablingConditionDescription,
            }),
            disabilityFromSevereDisease: period.disabilityFromSevereDisease,
            ...(period.severeDisease !== null && {
              severeDisease: period.severeDisease,
            }),
            ...(period.diseaseStartDate !== null && {
              diseaseStartDate: period.diseaseStartDate,
            }),
            needsConstantAssistanceFromAnotherPerson:
              period.needsConstantAssistanceFromAnotherPerson,
            ...(periodDocuments.length > 0 && {
              documents: periodDocuments.map((doc) =>
                GetTemporaryDisabilityBenefitsGrantPeriodDocumentInGrantResponseDto.build(
                  { fileName: doc.fileName },
                ),
              ),
            }),
            ...(previousBenefits.length > 0 && {
              previousBenefits: previousBenefits.map((pb) =>
                GetTemporaryDisabilityBenefitsGrantPreviousBenefitsInGrantResponseDto.build(
                  { benefitNumber: pb.benefitNumber },
                ),
              ),
            }),
          },
        );
      },
    );

    const insuredStatusList = (
      result.temporaryDisabilityBenefitsGrantInsuredStatus ?? []
    ).map((is) =>
      GetTemporaryDisabilityBenefitsGrantInsuredStatusInGrantResponseDto.build({
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
      }),
    );

    const workPeriodsList = (
      result.temporaryDisabilityBenefitsGrantWorkPeriods ?? []
    ).map((wp) => {
      const earningsHistory = (
        result.temporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistory ?? []
      ).filter(
        (eh) =>
          eh.temporaryDisabilityBenefitsGrantWorkPeriodsId.toString() ===
          wp.id.toString(),
      );

      return GetTemporaryDisabilityBenefitsGrantWorkPeriodsInGrantResponseDto.build(
        {
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
          ...(earningsHistory.length > 0 && {
            earningsHistory: earningsHistory.map((eh) =>
              GetTemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryInGrantResponseDto.build(
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
        },
      );
    });

    return GetTemporaryDisabilityBenefitsGrantResponseDto.build({
      temporaryDisabilityBenefitsGrantId:
        result.temporaryDisabilityBenefitsGrantId,
      category: result.category,
      analysisToolClient:
        GetTemporaryDisabilityBenefitsGrantAnalysisToolClientResponseDto.build({
          analysisToolClientId: analysisToolRecord.analysisToolClient.id,
          ...(analysisToolRecord.analysisToolClient.name !== null && {
            name: analysisToolRecord.analysisToolClient.name,
          }),
          ...(analysisToolRecord.analysisToolClient.federalDocument !==
            null && {
            federalDocument:
              analysisToolRecord.analysisToolClient.federalDocument,
          }),
          ...(analysisToolRecord.analysisToolClient.email !== null && {
            email: analysisToolRecord.analysisToolClient.email,
          }),
          ...(analysisToolRecord.analysisToolClient.corporateEmail !== null && {
            corporateEmail:
              analysisToolRecord.analysisToolClient.corporateEmail,
          }),
          ...(analysisToolRecord.analysisToolClient.phoneNumber !== null && {
            phoneNumber: analysisToolRecord.analysisToolClient.phoneNumber,
          }),
          ...(analysisToolRecord.analysisToolClient.birthDate !== null && {
            birthDate: analysisToolRecord.analysisToolClient.birthDate,
          }),
          ...(analysisToolRecord.analysisToolClient.gender !== null && {
            gender: analysisToolRecord.analysisToolClient.gender,
          }),
          ...(analysisToolRecord.analysisToolClient.clientType !== null && {
            clientType: analysisToolRecord.analysisToolClient.clientType,
          }),
        }),
      ...(result.analysisName !== null && {
        analysisName: result.analysisName,
      }),
      ...(cnisDocument !== null && { cnisDocument }),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      ...(result.temporaryDisabilityBenefitsGrantResult !== null && {
        temporaryDisabilityBenefitsGrantResult:
          GetTemporaryDisabilityBenefitsGrantResultResponseDto.build({
            ...(completeAnalysis !== null && {
              temporaryDisabilityBenefitsGrantCompleteAnalysis:
                completeAnalysis,
            }),
            ...(result.temporaryDisabilityBenefitsGrantResult
              .simplifiedAnalysis !== null && {
              temporaryDisabilityBenefitsGrantSimplifiedAnalysis:
                result.temporaryDisabilityBenefitsGrantResult
                  .simplifiedAnalysis,
            }),
            ...(firstAnalysis !== null && {
              temporaryDisabilityBenefitsGrantFirstAnalysis: firstAnalysis,
            }),
            ...(result.temporaryDisabilityBenefitsGrantResult
              .completeAnalysisDownload !== null && {
              temporaryDisabilityBenefitsGrantCompleteAnalysisDownload:
                result.temporaryDisabilityBenefitsGrantResult
                  .completeAnalysisDownload,
            }),
          }),
      }),
      ...(periods.length > 0 && {
        temporaryDisabilityBenefitsGrantPeriod: periods,
      }),
      ...(insuredStatusList.length > 0 && {
        temporaryDisabilityBenefitsGrantInsuredStatus: insuredStatusList,
      }),
      ...(workPeriodsList.length > 0 && {
        temporaryDisabilityBenefitsGrantWorkPeriods: workPeriodsList,
      }),
      ...((result.temporaryDisabilityBenefitsGrantInssBenefit ?? []).length >
        0 && {
        inssBenefits: (
          result.temporaryDisabilityBenefitsGrantInssBenefit ?? []
        ).map((item) => item.inssBenefit),
      }),
      ...((result.temporaryDisabilityBenefitsGrantLegalProceeding ?? [])
        .length > 0 && {
        legalProceeding: (
          result.temporaryDisabilityBenefitsGrantLegalProceeding ?? []
        ).map((item) => item.legalProceedingNumber),
      }),
    });
  }

  private parseStoredFirstAnalysis(
    stored: string,
  ): TemporaryDisabilityBenefitsGrantFirstAnalysisModel | null {
    try {
      const raw = JSON.parse(
        stored,
      ) as TemporaryDisabilityBenefitsGrantFirstAnalysisInterface;

      return TemporaryDisabilityBenefitsGrantFirstAnalysisModel.build({
        insuredStatus: raw.insuredStatus,
        gracePeriodStatus: raw.gracePeriodStatus,
        gracePeriods: raw.gracePeriods.map((item) =>
          TemporaryDisabilityBenefitsGrantFirstAnalysisGracePeriodItemModel.build(
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
      });
    } catch {
      return null;
    }
  }

  private parseStoredCompleteAnalysis(
    stored: string,
  ): TemporaryDisabilityBenefitsGrantResultInterface | null {
    try {
      return JSON.parse(
        stored,
      ) as TemporaryDisabilityBenefitsGrantResultInterface;
    } catch {
      return null;
    }
  }

  private async buildCnisDocumentResponse(
    documentKey: string,
  ): Promise<GetTemporaryDisabilityBenefitsGrantCnisDocumentResponseDto> {
    const [fileBuffer, originalFileName] = await Promise.all([
      this.fileProcessorGateway.getFileBuffer(documentKey),
      this.fileProcessorGateway.getOriginalFileName(documentKey),
    ]);

    return GetTemporaryDisabilityBenefitsGrantCnisDocumentResponseDto.build({
      document: Base64.encodeBuffer(fileBuffer),
      originalFileName,
    });
  }
}
