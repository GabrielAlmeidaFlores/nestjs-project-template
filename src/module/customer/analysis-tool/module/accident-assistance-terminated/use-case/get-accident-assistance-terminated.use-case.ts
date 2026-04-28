import { Injectable, Inject } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { AccidentAssistanceTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/accident-assistance-terminated.query.repository.gateway';
import { GetAccidentAssistanceTerminatedPeriodQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-period/query/result/get-accident-assistance-terminated-period.query.result';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import {
  GetAccidentAssistanceTerminatedResponseDto,
  GetAccidentAssistanceTerminatedClientResponseDto,
  GetAccidentAssistanceTerminatedResultResponseDto,
  GetAccidentAssistanceTerminatedResponsibleResponseDto,
  GetAccidentAssistanceTerminatedDocumentResponseDto,
  GetAccidentAssistanceTerminatedPeriodResponseDto,
} from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/response/get-accident-assistance-terminated.response.dto';
import { AccidentAssistanceTerminatedNotFoundError } from '@module/customer/analysis-tool/module/accident-assistance-terminated/error/accident-assistance-terminated-not-found.error';
import {
  AccidentAssistanceTerminatedFirstAnalysisAssessmentSequelaeModel,
  AccidentAssistanceTerminatedFirstAnalysisModel,
  AccidentAssistanceTerminatedFirstAnalysisQualitySecurityModel,
} from '@module/customer/analysis-tool/module/accident-assistance-terminated/model/generic/accident-assistance-terminated-first-analysis.model';
import { AccidentAssistanceTerminatedFirstAnalysisInterface } from '@module/customer/analysis-tool/module/accident-assistance-terminated/model/interface/accident-assistance-terminated-first-analysis.interface';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetAccidentAssistanceTerminatedUseCase {
  protected readonly _type = GetAccidentAssistanceTerminatedUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AccidentAssistanceTerminatedQueryRepositoryGateway)
    private readonly accidentAssistanceTerminatedQueryRepositoryGateway: AccidentAssistanceTerminatedQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
  ): Promise<GetAccidentAssistanceTerminatedResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByAccidentAssistanceTerminatedIdAndOrganizationIdAndAuthIdentityIdOrFail(
        accidentAssistanceTerminatedId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AccidentAssistanceTerminatedNotFoundError,
      );

    const accidentAssistanceTerminatedQueryResult =
      await this.accidentAssistanceTerminatedQueryRepositoryGateway.findOneAccidentAssistanceTerminatedByIdOrFail(
        accidentAssistanceTerminatedId,
        AccidentAssistanceTerminatedNotFoundError,
      );

    const firstAnalysisModel = this.parseFirstAnalysis(
      accidentAssistanceTerminatedQueryResult.accidentAssistanceTerminatedResult
        ?.firstAnalysis ?? null,
    );

    const accidentAssistanceTerminatedResultDto =
      accidentAssistanceTerminatedQueryResult.accidentAssistanceTerminatedResult !==
      null
        ? GetAccidentAssistanceTerminatedResultResponseDto.build({
            clientName:
              accidentAssistanceTerminatedQueryResult
                .accidentAssistanceTerminatedResult.clientName,
            accidentAssistanceTerminatedCompleteAnalysis:
              accidentAssistanceTerminatedQueryResult
                .accidentAssistanceTerminatedResult
                .accidentAssistanceTerminatedCompleteAnalysis,
            accidentAssistanceTerminatedSimplifiedAnalysis:
              accidentAssistanceTerminatedQueryResult
                .accidentAssistanceTerminatedResult
                .accidentAssistanceTerminatedSimplifiedAnalysis,
            ...(accidentAssistanceTerminatedQueryResult
              .accidentAssistanceTerminatedResult.decisionDetails !== null && {
              decisionDetails:
                accidentAssistanceTerminatedQueryResult
                  .accidentAssistanceTerminatedResult.decisionDetails,
            }),
            ...(firstAnalysisModel !== null && {
              firstAnalysis: firstAnalysisModel,
            }),
            createdAt:
              accidentAssistanceTerminatedQueryResult
                .accidentAssistanceTerminatedResult.createdAt,
            updatedAt:
              accidentAssistanceTerminatedQueryResult
                .accidentAssistanceTerminatedResult.updatedAt,
          })
        : null;

    const periodDtos = this.buildPeriodDtos(
      accidentAssistanceTerminatedQueryResult.accidentAssistanceTerminatedPeriod,
    );

    const response = GetAccidentAssistanceTerminatedResponseDto.build({
      id: accidentAssistanceTerminatedQueryResult.id,
      status: analysisToolRecordQueryResult.status,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
      createdAt: analysisToolRecordQueryResult.createdAt,
      analysisToolClient:
        GetAccidentAssistanceTerminatedClientResponseDto.build({
          ...analysisToolRecordQueryResult.analysisToolClient,
        }),
      legalProceedingNumber:
        accidentAssistanceTerminatedQueryResult.accidentAssistanceTerminatedLegalProceeding.map(
          (t) => t.legalProceedingNumber,
        ),
      inssBenefitNumber:
        accidentAssistanceTerminatedQueryResult.accidentAssistanceTerminatedBenefit.map(
          (t) => t.inssBenefitNumber,
        ),
      der: accidentAssistanceTerminatedQueryResult.der,
      denialDate: accidentAssistanceTerminatedQueryResult.denialDate,
      category: accidentAssistanceTerminatedQueryResult.category,
      ...(accidentAssistanceTerminatedQueryResult.inssPassword !== null && {
        inssPassword: accidentAssistanceTerminatedQueryResult.inssPassword,
      }),
      ...(accidentAssistanceTerminatedQueryResult.analysisName !== null && {
        analysisName: accidentAssistanceTerminatedQueryResult.analysisName,
      }),
      ...(accidentAssistanceTerminatedQueryResult.benefitCessationReason !==
        undefined && {
        benefitCessationReason:
          accidentAssistanceTerminatedQueryResult.benefitCessationReason,
      }),
      ...(accidentAssistanceTerminatedQueryResult.hadPreviousIncapacityBenefit !==
        null && {
        hadPreviousIncapacityBenefit:
          accidentAssistanceTerminatedQueryResult.hadPreviousIncapacityBenefit,
      }),
      ...(accidentAssistanceTerminatedQueryResult.previousIncapacityBenefitNumber !==
        null && {
        previousIncapacityBenefitNumber:
          accidentAssistanceTerminatedQueryResult.previousIncapacityBenefitNumber,
      }),
      ...(accidentAssistanceTerminatedQueryResult.previousIncapacityBenefitStartDate !==
        null && {
        previousIncapacityBenefitStartDate:
          accidentAssistanceTerminatedQueryResult.previousIncapacityBenefitStartDate,
      }),
      ...(accidentAssistanceTerminatedQueryResult.previousIncapacityBenefitEndDate !==
        null && {
        previousIncapacityBenefitEndDate:
          accidentAssistanceTerminatedQueryResult.previousIncapacityBenefitEndDate,
      }),
      ...(accidentAssistanceTerminatedQueryResult.extensionRequestStatus !==
        null && {
        extensionRequestStatus:
          accidentAssistanceTerminatedQueryResult.extensionRequestStatus,
      }),
      accidentAssistanceTerminatedResult: accidentAssistanceTerminatedResultDto,
      ...(periodDtos.length > 0 && {
        accidentAssistanceTerminatedPeriod: periodDtos,
      }),
      ...(accidentAssistanceTerminatedQueryResult.dib !== null && {
        dib: accidentAssistanceTerminatedQueryResult.dib,
      }),
      ...(accidentAssistanceTerminatedQueryResult.dcb !== null && {
        dcb: accidentAssistanceTerminatedQueryResult.dcb,
      }),
      ...(accidentAssistanceTerminatedQueryResult.inssBenefitNumber !==
        null && {
        mainInssBenefitNumber:
          accidentAssistanceTerminatedQueryResult.inssBenefitNumber,
      }),
      ...(accidentAssistanceTerminatedQueryResult.accidentDate !== null && {
        accidentDate: accidentAssistanceTerminatedQueryResult.accidentDate,
      }),
      ...(accidentAssistanceTerminatedQueryResult.accidentDescription !==
        null && {
        accidentDescription:
          accidentAssistanceTerminatedQueryResult.accidentDescription,
      }),

      createdBy: GetAccidentAssistanceTerminatedResponsibleResponseDto.build({
        ...analysisToolRecordQueryResult.createdBy.customer,
      }),
      updatedBy: GetAccidentAssistanceTerminatedResponsibleResponseDto.build({
        ...analysisToolRecordQueryResult.updatedBy.customer,
      }),
    });

    if (
      accidentAssistanceTerminatedQueryResult
        .accidentAssistanceTerminatedDocument.length > 0
    ) {
      const documents = await Promise.all(
        accidentAssistanceTerminatedQueryResult.accidentAssistanceTerminatedDocument.map(
          async (document) => {
            const url = await this.fileProcessorGateway.getFileSignedUrl(
              document.document,
            );

            const originalFileName =
              await this.fileProcessorGateway.getOriginalFileName(
                document.document,
              );

            return {
              url,
              originalFileName,
            };
          },
        ),
      );

      response.documents = documents.map((document) =>
        GetAccidentAssistanceTerminatedDocumentResponseDto.build({
          url: document.url.toString(),
          originalFileName: document.originalFileName.toString(),
        }),
      );
    }

    if (
      analysisToolRecordQueryResult.createdBy.customer.profilePicture !== null
    ) {
      const profilePicture = await this.fileProcessorGateway.getFileSignedUrl(
        analysisToolRecordQueryResult.createdBy.customer.profilePicture,
      );

      response.createdBy.profilePicture = profilePicture.toString();
    }

    if (
      analysisToolRecordQueryResult.updatedBy.customer.profilePicture !== null
    ) {
      const profilePicture = await this.fileProcessorGateway.getFileSignedUrl(
        analysisToolRecordQueryResult.updatedBy.customer.profilePicture,
      );

      response.updatedBy.profilePicture = profilePicture.toString();
    }

    return response;
  }

  private parseFirstAnalysis(
    firstAnalysisJson: string | null,
  ): AccidentAssistanceTerminatedFirstAnalysisModel | null {
    if (firstAnalysisJson === null) {
      return null;
    }

    try {
      const raw = JSON.parse(
        firstAnalysisJson,
      ) as AccidentAssistanceTerminatedFirstAnalysisInterface;

      return AccidentAssistanceTerminatedFirstAnalysisModel.build({
        qualitySecurity:
          AccidentAssistanceTerminatedFirstAnalysisQualitySecurityModel.build({
            status: raw.qualitySecurity.status,
            description: raw.qualitySecurity.description,
          }),
        assessmentSequelae:
          AccidentAssistanceTerminatedFirstAnalysisAssessmentSequelaeModel.build(
            {
              existsSequelae: raw.assessmentSequelae.existsSequelae,
              sequelaeCompatibility:
                raw.assessmentSequelae.sequelaeCompatibility,
              partialWorkCapacityMaintenance:
                raw.assessmentSequelae.partialWorkCapacityMaintenance,
              description: raw.assessmentSequelae.description,
            },
          ),
      });
    } catch {
      return null;
    }
  }

  private buildPeriodDtos(
    periods: GetAccidentAssistanceTerminatedPeriodQueryResult[],
  ): GetAccidentAssistanceTerminatedPeriodResponseDto[] {
    return periods.map((period) =>
      GetAccidentAssistanceTerminatedPeriodResponseDto.build({
        accidentAssistanceTerminatedPeriodId: period.id,
        ...(period.sequencial !== null && { sequencial: period.sequencial }),
        ...(period.periodName !== null && { periodName: period.periodName }),
        ...(period.periodStart !== null && { periodStart: period.periodStart }),
        ...(period.periodEnd !== null && { periodEnd: period.periodEnd }),
        ...(period.category !== null && { category: period.category }),
        ...(period.isPendency !== null && { isPendency: period.isPendency }),
        ...(period.competenceBelowTheMinimum !== null && {
          competenceBelowTheMinimum: period.competenceBelowTheMinimum,
        }),
        ...(period.contributionAverage !== null && {
          contributionAverage: period.contributionAverage,
        }),
        ...(period.typeOfContribution !== null && {
          typeOfContribution: period.typeOfContribution,
        }),
        ...(period.status !== null && { status: period.status }),
        ...(period.reasonPendency !== null && {
          reasonPendency: period.reasonPendency,
        }),
      }),
    );
  }
}
