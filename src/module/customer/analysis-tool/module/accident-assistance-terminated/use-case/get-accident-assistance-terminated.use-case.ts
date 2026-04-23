import { Injectable, Inject } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { AccidentAssistanceTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/accident-assistance-terminated.query.repository.gateway';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import {
  GetAccidentAssistanceTerminatedResponseDto,
  GetAccidentAssistanceTerminatedClientResponseDto,
  GetAccidentAssistanceTerminatedResultResponseDto,
  GetAccidentAssistanceTerminatedResponsibleResponseDto,
  GetAccidentAssistanceTerminatedDocumentResponseDto,
} from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/response/get-accident-assistance-terminated.response.dto';
import { AccidentAssistanceTerminatedNotFoundError } from '@module/customer/analysis-tool/module/accident-assistance-terminated/error/accident-assistance-terminated-not-found.error';
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
            createdAt:
              accidentAssistanceTerminatedQueryResult
                .accidentAssistanceTerminatedResult.createdAt,
            updatedAt:
              accidentAssistanceTerminatedQueryResult
                .accidentAssistanceTerminatedResult.updatedAt,
          })
        : null;

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
      benefitCessationReason:
        accidentAssistanceTerminatedQueryResult.benefitCessationReason,
      hadPreviousIncapacityBenefit:
        accidentAssistanceTerminatedQueryResult.hadPreviousIncapacityBenefit,
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
}
