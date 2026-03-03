import { Injectable, Inject } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/medical-and-social-report-objection-generator-analysis.query.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/value-object/medical-and-social-report-objection-generator-analysis-id/medical-and-social-report-objection-generator-analysis-id.value-object';
import {
  GetMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto,
  GetMedicalAndSocialReportObjectionGeneratorAnalysisClientResponseDto,
  GetMedicalAndSocialReportObjectionGeneratorAnalysisResultResponseDto,
  GetMedicalAndSocialReportObjectionGeneratorAnalysisResponsibleResponseDto,
  GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentResponseDto,
} from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/dto/response/get-medical-and-social-report-objection-generator-analysis.response.dto';
import { MedicalAndSocialReportObjectionGeneratorAnalysisNotFoundError } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/error/medical-and-social-report-objection-generator-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetMedicalAndSocialReportObjectionGeneratorAnalysisUseCase {
  protected readonly _type =
    GetMedicalAndSocialReportObjectionGeneratorAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(
      MedicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway,
    )
    private readonly medicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway: MedicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    medicalAndSocialReportObjectionGeneratorAnalysisId: MedicalAndSocialReportObjectionGeneratorAnalysisId,
  ): Promise<GetMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByMedicalAndSocialReportObjectionGeneratorAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        medicalAndSocialReportObjectionGeneratorAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        MedicalAndSocialReportObjectionGeneratorAnalysisNotFoundError,
      );

    const medicalAndSocialReportObjectionGeneratorAnalysisQueryResult =
      await this.medicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway.findOneByMedicalAndSocialReportObjectionGeneratorAnalysisIdAndOrganizationIdOrFail(
        medicalAndSocialReportObjectionGeneratorAnalysisId,
        organizationSessionData.organizationId,
        MedicalAndSocialReportObjectionGeneratorAnalysisNotFoundError,
      );

    const response =
      GetMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto.build({
        ...medicalAndSocialReportObjectionGeneratorAnalysisQueryResult,
        status: analysisToolRecordQueryResult.status,
        updatedAt: analysisToolRecordQueryResult.updatedAt,
        createdAt: analysisToolRecordQueryResult.createdAt,
        analysisToolClient:
          GetMedicalAndSocialReportObjectionGeneratorAnalysisClientResponseDto.build(
            {
              id: analysisToolRecordQueryResult.analysisToolClient.id,
              ...(analysisToolRecordQueryResult.analysisToolClient.name !==
                null && {
                name: analysisToolRecordQueryResult.analysisToolClient.name,
              }),
              ...(analysisToolRecordQueryResult.analysisToolClient
                .federalDocument !== null && {
                federalDocument:
                  analysisToolRecordQueryResult.analysisToolClient
                    .federalDocument,
              }),
              ...(analysisToolRecordQueryResult.analysisToolClient.email !==
                null && {
                email: analysisToolRecordQueryResult.analysisToolClient.email,
              }),
              ...(analysisToolRecordQueryResult.analysisToolClient
                .corporateEmail !== null && {
                corporateEmail:
                  analysisToolRecordQueryResult.analysisToolClient
                    .corporateEmail,
              }),
              ...(analysisToolRecordQueryResult.analysisToolClient
                .phoneNumber !== null && {
                phoneNumber:
                  analysisToolRecordQueryResult.analysisToolClient.phoneNumber,
              }),
              ...(analysisToolRecordQueryResult.analysisToolClient.birthDate !==
                null && {
                birthDate:
                  analysisToolRecordQueryResult.analysisToolClient.birthDate,
              }),
              ...(analysisToolRecordQueryResult.analysisToolClient.gender !==
                null && {
                gender: analysisToolRecordQueryResult.analysisToolClient.gender,
              }),
              ...(analysisToolRecordQueryResult.analysisToolClient
                .clientType !== null && {
                clientType:
                  analysisToolRecordQueryResult.analysisToolClient.clientType,
              }),
            },
          ),
        medicalAndSocialReportObjectionGeneratorAnalysisResult:
          medicalAndSocialReportObjectionGeneratorAnalysisQueryResult.medicalAndSocialReportObjectionGeneratorAnalysisResult !==
          null
            ? GetMedicalAndSocialReportObjectionGeneratorAnalysisResultResponseDto.build(
                {
                  ...medicalAndSocialReportObjectionGeneratorAnalysisQueryResult.medicalAndSocialReportObjectionGeneratorAnalysisResult,
                },
              )
            : null,
        createdBy:
          GetMedicalAndSocialReportObjectionGeneratorAnalysisResponsibleResponseDto.build(
            {
              ...analysisToolRecordQueryResult.createdBy.customer,
            },
          ),
        updatedBy:
          GetMedicalAndSocialReportObjectionGeneratorAnalysisResponsibleResponseDto.build(
            {
              ...analysisToolRecordQueryResult.updatedBy.customer,
            },
          ),
      });

    if (
      medicalAndSocialReportObjectionGeneratorAnalysisQueryResult
        .medicalAndSocialReportObjectionGeneratorAnalysisDocument.length > 0
    ) {
      {
        const medicalAndSocialReportObjectionGeneratorAnalysisDocuments =
          await Promise.all(
            medicalAndSocialReportObjectionGeneratorAnalysisQueryResult.medicalAndSocialReportObjectionGeneratorAnalysisDocument.map(
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
                  type: document.type,
                };
              },
            ),
          );

        response.medicalAndSocialReportObjectionGeneratorAnalysisDocuments =
          medicalAndSocialReportObjectionGeneratorAnalysisDocuments.map(
            (document) =>
              GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentResponseDto.build(
                {
                  url: document.url.toString(),
                  originalFileName: document.originalFileName.toString(),
                  type: document.type,
                },
              ),
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
