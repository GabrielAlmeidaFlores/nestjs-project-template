import { Injectable, Inject } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { AudienceQuestionGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/query/audience-question-generator.query.repository.gateway';
import { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';
import {
  GetAudienceQuestionGeneratorResponseDto,
  GetAudienceQuestionGeneratorClientResponseDto,
  GetAudienceQuestionGeneratorResultResponseDto,
  GetAudienceQuestionGeneratorResponsibleResponseDto,
  GetAudienceQuestionGeneratorDocumentResponseDto,
} from '@module/customer/analysis-tool/module/audience-question-generator/dto/response/get-audience-question-generator.response.dto';
import { AudienceQuestionGeneratorNotFoundError } from '@module/customer/analysis-tool/module/audience-question-generator/error/audience-question-generator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetAudienceQuestionGeneratorUseCase {
  protected readonly _type = GetAudienceQuestionGeneratorUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AudienceQuestionGeneratorQueryRepositoryGateway)
    private readonly audienceQuestionGeneratorQueryRepositoryGateway: AudienceQuestionGeneratorQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    audienceQuestionGeneratorId: AudienceQuestionGeneratorId,
  ): Promise<GetAudienceQuestionGeneratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByAudienceQuestionGeneratorIdAndOrganizationIdAndAuthIdentityIdOrFail(
        audienceQuestionGeneratorId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AudienceQuestionGeneratorNotFoundError,
      );

    const audienceQuestionGeneratorQueryResult =
      await this.audienceQuestionGeneratorQueryRepositoryGateway.findOneByAudienceQuestionGeneratorIdAndOrganizationIdOrFail(
        audienceQuestionGeneratorId,
        organizationSessionData.organizationId,
        AudienceQuestionGeneratorNotFoundError,
      );

    const response = GetAudienceQuestionGeneratorResponseDto.build({
      ...audienceQuestionGeneratorQueryResult,
      status: analysisToolRecordQueryResult.status,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
      createdAt: analysisToolRecordQueryResult.createdAt,
      analysisToolClient: GetAudienceQuestionGeneratorClientResponseDto.build({
        ...analysisToolRecordQueryResult.analysisToolClient,
      }),
      audienceQuestionGeneratorResult:
        audienceQuestionGeneratorQueryResult.audienceQuestionGeneratorResult !==
        null
          ? GetAudienceQuestionGeneratorResultResponseDto.build({
              ...audienceQuestionGeneratorQueryResult.audienceQuestionGeneratorResult,
            })
          : null,
      createdBy: GetAudienceQuestionGeneratorResponsibleResponseDto.build({
        ...analysisToolRecordQueryResult.createdBy.customer,
      }),
      updatedBy: GetAudienceQuestionGeneratorResponsibleResponseDto.build({
        ...analysisToolRecordQueryResult.updatedBy.customer,
      }),
      inssBenefitNumber: (
        audienceQuestionGeneratorQueryResult.audienceQuestionGeneratorBenefit ??
        []
      ).map((benefit) => benefit.inssBenefitNumber),
      legalProceedingNumber: (
        audienceQuestionGeneratorQueryResult.audienceQuestionGeneratorLegalProceeding ??
        []
      ).map((legalProceeding) => legalProceeding.legalProceedingNumber),
    });

    if (
      audienceQuestionGeneratorQueryResult.audienceQuestionGeneratorDocument
        .length > 0
    ) {
      const audienceQuestionDocuments = await Promise.all(
        audienceQuestionGeneratorQueryResult.audienceQuestionGeneratorDocument.map(
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

      response.audienceQuestionDocuments = audienceQuestionDocuments.map(
        (document) =>
          GetAudienceQuestionGeneratorDocumentResponseDto.build({
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
