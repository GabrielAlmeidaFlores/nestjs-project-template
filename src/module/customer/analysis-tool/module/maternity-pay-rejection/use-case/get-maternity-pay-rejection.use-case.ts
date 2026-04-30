import { Inject, Injectable } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { MaternityPayRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection/query/maternity-pay-rejection.query.repository.gateway';
import { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import { MaternityPayRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-document/enum/maternity-pay-rejection-document-type.enum';
import {
  GetMaternityPayRejectionAnalysisToolClientResponseDto,
  GetMaternityPayRejectionDocumentInResponseDto,
  GetMaternityPayRejectionResponseDto,
  GetMaternityPayRejectionResultResponseDto,
  GetMaternityPayRejectionWorkPeriodDocumentInResponseDto,
  GetMaternityPayRejectionWorkPeriodEarningsHistoryItemInResponseDto,
  GetMaternityPayRejectionWorkPeriodInResponseDto,
} from '@module/customer/analysis-tool/module/maternity-pay-rejection/dto/response/get-maternity-pay-rejection.response.dto';
import { MaternityPayRejectionNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-rejection/error/maternity-pay-rejection-not-found.error';
import {
  MaternityPayRejectionBenefitInformationModel,
  MaternityPayRejectionFirstAnalysisModel,
  MaternityPayRejectionGracePeriodModel,
  MaternityPayRejectionRequirementDeadlineModel,
} from '@module/customer/analysis-tool/module/maternity-pay-rejection/model/generic/maternity-pay-rejection-first-analysis.model';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { MaternityPayRejectionDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-document/maternity-pay-rejection-document.entity';
import type { MaternityPayRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/maternity-pay-rejection-work-period.entity';
import type { MaternityPayRejectionWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-document/enum/maternity-pay-rejection-work-period-document-type.enum';
import type { MaternityPayRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-document/maternity-pay-rejection-work-period-document.entity';
import type { MaternityPayRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-earnings-history/maternity-pay-rejection-work-period-earnings-history.entity';
import type { MaternityPayRejectionFirstAnalysisInterface } from '@module/customer/analysis-tool/module/maternity-pay-rejection/model/interface/maternity-pay-rejection-first-analysis.interface';
import type { MaternityPayRejectionResultInterface } from '@module/customer/analysis-tool/module/maternity-pay-rejection/model/interface/maternity-pay-rejection-result.interface';

@Injectable()
export class GetMaternityPayRejectionUseCase {
  protected readonly _type = GetMaternityPayRejectionUseCase.name;

  public constructor(
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(MaternityPayRejectionQueryRepositoryGateway)
    private readonly maternityPayRejectionQueryRepositoryGateway: MaternityPayRejectionQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    maternityPayRejectionId: MaternityPayRejectionId,
  ): Promise<GetMaternityPayRejectionResponseDto> {
    const [result, analysisToolRecord] = await Promise.all([
      this.maternityPayRejectionQueryRepositoryGateway.findOneByMaternityPayRejectionIdOrFailWithRelations(
        maternityPayRejectionId,
        MaternityPayRejectionNotFoundError,
      ),
      this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByMaternityPayRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        maternityPayRejectionId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        MaternityPayRejectionNotFoundError,
      ),
    ]);

    const rawStoredSecondAnalysis =
      result.maternityPayRejectionResult?.secondAnalysis ?? null;

    const secondAnalysis =
      result.maternityPayRejectionResult !== null &&
      rawStoredSecondAnalysis !== null
        ? this.tryParseStoredSecondAnalysis(rawStoredSecondAnalysis)
        : null;

    const completeAnalysis =
      result.maternityPayRejectionResult !== null &&
      result.maternityPayRejectionResult.completeAnalysis !== null
        ? this.parseStoredCompleteAnalysis(
            result.maternityPayRejectionResult.completeAnalysis,
          )
        : null;

    const documents = await Promise.all(
      (result.maternityPayRejectionDocument ?? [])
        .filter(
          (d: MaternityPayRejectionDocumentEntity) =>
            d.document !== null && d.type !== null,
        )
        .map(async (doc: MaternityPayRejectionDocumentEntity) =>
          this.buildDocumentResponse(
            doc.document as string,
            doc.type as MaternityPayRejectionDocumentTypeEnum,
          ),
        ),
    );

    const workPeriods = await Promise.all(
      (result.maternityPayRejectionWorkPeriod ?? []).map(
        async (wp: MaternityPayRejectionWorkPeriodEntity) => {
          const wpDocuments = (
            result.maternityPayRejectionWorkPeriodDocument ?? []
          ).filter(
            (doc: MaternityPayRejectionWorkPeriodDocumentEntity) =>
              doc.maternityPayRejectionWorkPeriodId !== null &&
              doc.maternityPayRejectionWorkPeriodId.toString() ===
                wp.id.toString() &&
              doc.document !== null &&
              doc.type !== null,
          );

          const wpDocumentDtos = await Promise.all(
            wpDocuments.map(
              async (doc: MaternityPayRejectionWorkPeriodDocumentEntity) =>
                this.buildWorkPeriodDocumentResponse(
                  doc.document as string,
                  doc.type as MaternityPayRejectionWorkPeriodDocumentTypeEnum,
                ),
            ),
          );

          const earningsHistory = (
            result.maternityPayRejectionWorkPeriodEarningsHistory ?? []
          ).filter(
            (eh: MaternityPayRejectionWorkPeriodEarningsHistoryEntity) =>
              eh.maternityPayRejectionWorkPeriodId !== null &&
              eh.maternityPayRejectionWorkPeriodId.toString() ===
                wp.id.toString(),
          );

          const earningsHistoryDtos = earningsHistory.map(
            (eh: MaternityPayRejectionWorkPeriodEarningsHistoryEntity) =>
              GetMaternityPayRejectionWorkPeriodEarningsHistoryItemInResponseDto.build(
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
          );

          return GetMaternityPayRejectionWorkPeriodInResponseDto.build({
            ...(wp.bondOrigin !== null && { bondOrigin: wp.bondOrigin }),
            ...(wp.startDate !== null && { startDate: wp.startDate }),
            ...(wp.endDate !== null && { endDate: wp.endDate }),
            ...(wp.category !== null && { category: wp.category }),
            ...(wp.competenceBelowTheMinimum !== null && {
              competenceBelowTheMinimum: wp.competenceBelowTheMinimum,
            }),
            ...(wp.pendencyReason !== null && {
              pendencyReason: wp.pendencyReason,
            }),
            ...(wp.periodConsideration !== null && {
              periodConsideration: wp.periodConsideration,
            }),
            ...(wp.contributionAverage !== null && {
              contributionAverage: wp.contributionAverage,
            }),
            ...(wp.status !== null && { status: wp.status }),
            ...(wp.gracePeriod !== null && { gracePeriod: wp.gracePeriod }),
            ...(wp.jobType !== null && { jobType: wp.jobType }),
            ...(wp.activityDescription !== null && {
              activityDescription: wp.activityDescription,
            }),
            ...(wpDocumentDtos.length > 0 && { documents: wpDocumentDtos }),
            ...(earningsHistoryDtos.length > 0 && {
              earningsHistory: earningsHistoryDtos,
            }),
          });
        },
      ),
    );

    const inssBenefits = (result.maternityPayRejectionInssBenefit ?? [])
      .map((b) => b.inssBenefit)
      .filter((b): b is string => b !== null);

    const legalProceedingNumbers = (
      result.maternityPayRejectionLegalProceeding ?? []
    )
      .map((lp) => lp.legalProceedingNumber)
      .filter((lp): lp is string => lp !== null);

    const firstAnalysisRaw =
      result.maternityPayRejectionResult?.firstAnalysis ?? null;
    const simplifiedAnalysisRaw =
      result.maternityPayRejectionResult?.simplifiedAnalysis ?? null;

    const resultDto =
      secondAnalysis !== null ||
      firstAnalysisRaw !== null ||
      completeAnalysis !== null ||
      simplifiedAnalysisRaw !== null
        ? GetMaternityPayRejectionResultResponseDto.build({
            ...(firstAnalysisRaw !== null && {
              maternityPayRejectionFirstAnalysis: firstAnalysisRaw,
            }),
            ...(secondAnalysis !== null && {
              maternityPayRejectionSecondAnalysis: secondAnalysis,
            }),
            ...(completeAnalysis !== null && {
              maternityPayRejectionCompleteAnalysis: completeAnalysis,
            }),
            ...(simplifiedAnalysisRaw !== null && {
              maternityPayRejectionSimplifiedAnalysis: simplifiedAnalysisRaw,
            }),
          })
        : null;

    const clientEntity = analysisToolRecord.analysisToolClient;

    const clientDto =
      GetMaternityPayRejectionAnalysisToolClientResponseDto.build({
        analysisToolClientId: clientEntity.id,
        ...(clientEntity.name !== null && { name: clientEntity.name }),
        ...(clientEntity.federalDocument !== null && {
          federalDocument: clientEntity.federalDocument,
        }),
        ...(clientEntity.email !== null && { email: clientEntity.email }),
        ...(clientEntity.corporateEmail !== null && {
          corporateEmail: clientEntity.corporateEmail,
        }),
        ...(clientEntity.phoneNumber !== null && {
          phoneNumber: clientEntity.phoneNumber,
        }),
        ...(clientEntity.birthDate !== null && {
          birthDate: clientEntity.birthDate,
        }),
        ...(clientEntity.gender !== null && { gender: clientEntity.gender }),
        ...(clientEntity.clientType !== null && {
          clientType: clientEntity.clientType,
        }),
      });

    return GetMaternityPayRejectionResponseDto.build({
      maternityPayRejectionId: result.id,
      ...(result.analysisName !== null && {
        analysisName: result.analysisName,
      }),
      ...(result.triggeringEvent !== null && {
        triggeringEvent: result.triggeringEvent,
      }),
      ...(result.triggeringEventDate !== null && {
        triggeringEventDate: result.triggeringEventDate,
      }),
      ...(result.estimatedTriggeringEventDate !== null && {
        estimatedTriggeringEventDate: result.estimatedTriggeringEventDate,
      }),
      ...(result.workAccidentOrSevereDesease !== null && {
        workAccidentOrSevereDesease: result.workAccidentOrSevereDesease,
      }),
      ...(result.clientWasUnemployedOnBenefitOrDisabilityStartDate !== null && {
        clientWasUnemployedOnBenefitOrDisabilityStartDate:
          result.clientWasUnemployedOnBenefitOrDisabilityStartDate,
      }),
      ...(result.clientWasRuralInsuredOnBenefitOrDisabilityStartDate !==
        null && {
        clientWasRuralInsuredOnBenefitOrDisabilityStartDate:
          result.clientWasRuralInsuredOnBenefitOrDisabilityStartDate,
      }),
      ...(result.isCurrentlyUnemployed !== null && {
        isCurrentlyUnemployed: result.isCurrentlyUnemployed,
      }),
      ...(result.category !== null && { category: result.category }),
      ...(result.thirdPartyDocumentRelationDescription !== null && {
        thirdPartyDocumentRelationDescription:
          result.thirdPartyDocumentRelationDescription,
      }),
      ...(inssBenefits.length > 0 && { inssBenefits }),
      ...(legalProceedingNumbers.length > 0 && { legalProceedingNumbers }),
      ...(documents.length > 0 && { documents }),
      ...(workPeriods.length > 0 && { workPeriods }),
      ...(resultDto !== null && { result: resultDto }),
      client: clientDto,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }

  private parseStoredCompleteAnalysis(
    raw: string,
  ): MaternityPayRejectionResultInterface | null {
    try {
      return JSON.parse(raw) as MaternityPayRejectionResultInterface;
    } catch {
      return null;
    }
  }

  private tryParseStoredSecondAnalysis(
    raw: string,
  ): MaternityPayRejectionFirstAnalysisModel | null {
    try {
      const parsed = JSON.parse(
        raw,
      ) as MaternityPayRejectionFirstAnalysisInterface;

      const gracePeriod = MaternityPayRejectionGracePeriodModel.build({
        withinTheGracePeriod: parsed.gracePeriod.withinTheGracePeriod,
        situation: parsed.gracePeriod.situation,
        applicableGracePeriod: parsed.gracePeriod.applicableGracePeriod,
        endOfGracePeriod: parsed.gracePeriod.endOfGracePeriod,
      });

      const benefitInformation =
        MaternityPayRejectionBenefitInformationModel.build({
          situation: parsed.benefitInformation.situation,
          duration: parsed.benefitInformation.duration,
          startDate: parsed.benefitInformation.startDate,
          concessionDate: parsed.benefitInformation.concessionDate,
          startOfTheLeave: parsed.benefitInformation.startOfTheLeave,
          endOfTheLeave: parsed.benefitInformation.endOfTheLeave,
          totalLeaveDuration: parsed.benefitInformation.totalLeaveDuration,
          amountBenefit: parsed.benefitInformation.amountBenefit,
          calculationBasis: parsed.benefitInformation.calculationBasis,
        });

      const requirementDeadline =
        MaternityPayRejectionRequirementDeadlineModel.build({
          triggeringEventDate: parsed.requirementDeadline.triggeringEventDate,
          requirementDate: parsed.requirementDeadline.requirementDate,
          statuoryDeadline: parsed.requirementDeadline.statuoryDeadline,
          details: parsed.requirementDeadline.details,
          justification: parsed.requirementDeadline.justification,
        });

      return MaternityPayRejectionFirstAnalysisModel.build({
        insuredStatusManteined: parsed.insuredStatusManteined,
        insuredStatusAnalysisConclusion: parsed.insuredStatusAnalysisConclusion,
        gracePeriod,
        benefitInformation,
        requirementDeadline,
      });
    } catch {
      return null;
    }
  }

  private async buildDocumentResponse(
    fileName: string,
    type: MaternityPayRejectionDocumentTypeEnum,
  ): Promise<GetMaternityPayRejectionDocumentInResponseDto> {
    const [buffer, originalFileName] = await Promise.all([
      this.fileProcessorGateway.getFileBuffer(fileName),
      this.fileProcessorGateway.getOriginalFileName(fileName),
    ]);

    return GetMaternityPayRejectionDocumentInResponseDto.build({
      document: new Base64(buffer.toString('base64')),
      originalFileName,
      type,
    });
  }

  private async buildWorkPeriodDocumentResponse(
    fileName: string,
    type: MaternityPayRejectionWorkPeriodDocumentTypeEnum,
  ): Promise<GetMaternityPayRejectionWorkPeriodDocumentInResponseDto> {
    const [buffer, originalFileName] = await Promise.all([
      this.fileProcessorGateway.getFileBuffer(fileName),
      this.fileProcessorGateway.getOriginalFileName(fileName),
    ]);

    return GetMaternityPayRejectionWorkPeriodDocumentInResponseDto.build({
      document: new Base64(buffer.toString('base64')),
      originalFileName,
      type,
    });
  }
}
