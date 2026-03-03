import { Injectable, Inject } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DisabilityAssessmentForBpcAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/disability-assessment-for-bpc-analysis.query.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/value-object/disability-assessment-for-bpc-analysis-id/disability-assessment-for-bpc-analysis-id.value-object';
import {
  GetDisabilityAssessmentForBpcAnalysisResponseDto,
  GetDisabilityAssessmentForBpcAnalysisClientResponseDto,
  GetDisabilityAssessmentForBpcAnalysisResultResponseDto,
  GetDisabilityAssessmentForBpcAnalysisResponsibleResponseDto,
  GetDisabilityAssessmentForBpcAnalysisDocumentResponseDto,
} from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/dto/response/get-disability-assessment-for-bpc-analysis.response.dto';
import { DisabilityAssessmentForBpcAnalysisNotFoundError } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/error/disability-assessment-for-bpc-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetDisabilityAssessmentForBpcAnalysisUseCase {
  protected readonly _type = GetDisabilityAssessmentForBpcAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(DisabilityAssessmentForBpcAnalysisQueryRepositoryGateway)
    private readonly disabilityAssessmentForBpcAnalysisQueryRepositoryGateway: DisabilityAssessmentForBpcAnalysisQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityAssessmentForBpcAnalysisId: DisabilityAssessmentForBpcAnalysisId,
  ): Promise<GetDisabilityAssessmentForBpcAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByDisabilityAssessmentForBpcAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        disabilityAssessmentForBpcAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        DisabilityAssessmentForBpcAnalysisNotFoundError,
      );

    const disabilityAssessmentForBpcAnalysisQueryResult =
      await this.disabilityAssessmentForBpcAnalysisQueryRepositoryGateway.findOneByDisabilityAssessmentForBpcAnalysisIdAndOrganizationIdOrFail(
        disabilityAssessmentForBpcAnalysisId,
        organizationSessionData.organizationId,
        DisabilityAssessmentForBpcAnalysisNotFoundError,
      );

    const response = GetDisabilityAssessmentForBpcAnalysisResponseDto.build({
      ...disabilityAssessmentForBpcAnalysisQueryResult,
      status: analysisToolRecordQueryResult.status,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
      createdAt: analysisToolRecordQueryResult.createdAt,
      analysisToolClient:
        GetDisabilityAssessmentForBpcAnalysisClientResponseDto.build({
          ...analysisToolRecordQueryResult.analysisToolClient,
        }),
      legalProceedingNumber:
        disabilityAssessmentForBpcAnalysisQueryResult.disabilityAssessmentForBpcAnalysisLegalProceeding.map(
          (t) => t.legalProceedingNumber,
        ),
      inssBenefitNumber:
        disabilityAssessmentForBpcAnalysisQueryResult.disabilityAssessmentForBpcAnalysisBenefit.map(
          (t) => t.inssBenefitNumber,
        ),
      disabilityAssessmentForBpcAnalysisResult:
        disabilityAssessmentForBpcAnalysisQueryResult.disabilityAssessmentForBpcAnalysisResult !==
        null
          ? GetDisabilityAssessmentForBpcAnalysisResultResponseDto.build({
              ...disabilityAssessmentForBpcAnalysisQueryResult.disabilityAssessmentForBpcAnalysisResult,
            })
          : null,
      createdBy:
        GetDisabilityAssessmentForBpcAnalysisResponsibleResponseDto.build({
          ...analysisToolRecordQueryResult.createdBy.customer,
        }),
      updatedBy:
        GetDisabilityAssessmentForBpcAnalysisResponsibleResponseDto.build({
          ...analysisToolRecordQueryResult.updatedBy.customer,
        }),
    });

    if (
      disabilityAssessmentForBpcAnalysisQueryResult
        .disabilityAssessmentForBpcAnalysisDocument.length > 0
    ) {
      {
        const medicalAndSocialDocuments = await Promise.all(
          disabilityAssessmentForBpcAnalysisQueryResult.disabilityAssessmentForBpcAnalysisDocument.map(
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

        response.medicalAndSocialDocuments = medicalAndSocialDocuments.map(
          (document) =>
            GetDisabilityAssessmentForBpcAnalysisDocumentResponseDto.build({
              url: document.url.toString(),
              originalFileName: document.originalFileName.toString(),
            }),
        );
      }
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
