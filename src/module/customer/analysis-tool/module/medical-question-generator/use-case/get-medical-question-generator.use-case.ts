import { Injectable, Inject } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { MedicalQuestionGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/medical-question-generator.query.repository.gateway';
import { MedicalQuestionGeneratorId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/value-object/medical-question-generator-id/medical-question-generator-id.value-object';
import { MedicalQuestionGeneratorDocumentTypeEnum } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/enum/medical-question-generator-document-type.enum';
import {
  GetMedicalQuestionGeneratorResponseDto,
  GetMedicalQuestionGeneratorClientResponseDto,
  GetMedicalQuestionGeneratorResultResponseDto,
  GetMedicalQuestionGeneratorResponsibleResponseDto,
  GetMedicalQuestionGeneratorDocumentResponseDto,
} from '@module/customer/analysis-tool/module/medical-question-generator/dto/response/get-medical-question-generator.response.dto';
import { MedicalQuestionGeneratorNotFoundError } from '@module/customer/analysis-tool/module/medical-question-generator/error/medical-question-generator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetMedicalQuestionGeneratorUseCase {
  protected readonly _type = GetMedicalQuestionGeneratorUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(MedicalQuestionGeneratorQueryRepositoryGateway)
    private readonly medicalQuestionGeneratorQueryRepositoryGateway: MedicalQuestionGeneratorQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    medicalQuestionGeneratorId: MedicalQuestionGeneratorId,
  ): Promise<GetMedicalQuestionGeneratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByMedicalQuestionGeneratorIdAndOrganizationIdAndAuthIdentityIdOrFail(
        medicalQuestionGeneratorId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        MedicalQuestionGeneratorNotFoundError,
      );

    const medicalQuestionGeneratorQueryResult =
      await this.medicalQuestionGeneratorQueryRepositoryGateway.findOneByMedicalQuestionGeneratorIdAndOrganizationIdWithRelationsOrFail(
        medicalQuestionGeneratorId,
        organizationSessionData.organizationId,
        MedicalQuestionGeneratorNotFoundError,
      );

    const response = GetMedicalQuestionGeneratorResponseDto.build({
      ...medicalQuestionGeneratorQueryResult,
      status: analysisToolRecordQueryResult.status,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
      createdAt: analysisToolRecordQueryResult.createdAt,
      analysisToolClient: GetMedicalQuestionGeneratorClientResponseDto.build({
        ...analysisToolRecordQueryResult.analysisToolClient,
      }),
      legalProceedingNumber:
        medicalQuestionGeneratorQueryResult.medicalQuestionGeneratorLegalProceeding.map(
          (t) => t.legalProceedingNumber,
        ),
      inssBenefitNumber:
        medicalQuestionGeneratorQueryResult.medicalQuestionGeneratorInssBenefit.map(
          (t) => t.inssBenefitNumber,
        ),
      medicalQuestionGeneratorResult:
        medicalQuestionGeneratorQueryResult.medicalQuestionGeneratorResult !==
        null
          ? GetMedicalQuestionGeneratorResultResponseDto.build({
              ...(medicalQuestionGeneratorQueryResult
                .medicalQuestionGeneratorResult.clientName !== null && {
                clientName:
                  medicalQuestionGeneratorQueryResult
                    .medicalQuestionGeneratorResult.clientName,
              }),
              ...(medicalQuestionGeneratorQueryResult
                .medicalQuestionGeneratorResult.clientFederalDocument !==
                null && {
                clientFederalDocument:
                  medicalQuestionGeneratorQueryResult
                    .medicalQuestionGeneratorResult.clientFederalDocument,
              }),
              ...(medicalQuestionGeneratorQueryResult
                .medicalQuestionGeneratorResult.clientBirthDate !== null && {
                clientBirthDate:
                  medicalQuestionGeneratorQueryResult
                    .medicalQuestionGeneratorResult.clientBirthDate,
              }),
              ...(medicalQuestionGeneratorQueryResult
                .medicalQuestionGeneratorResult.clientLastAffiliationDate !==
                null && {
                clientLastAffiliationDate:
                  medicalQuestionGeneratorQueryResult
                    .medicalQuestionGeneratorResult.clientLastAffiliationDate,
              }),
              ...(medicalQuestionGeneratorQueryResult
                .medicalQuestionGeneratorResult
                .medicalQuestionGeneratorCompleteAnalysis !== null && {
                medicalQuestionGeneratorCompleteAnalysis:
                  medicalQuestionGeneratorQueryResult
                    .medicalQuestionGeneratorResult
                    .medicalQuestionGeneratorCompleteAnalysis,
              }),
              ...(medicalQuestionGeneratorQueryResult
                .medicalQuestionGeneratorResult
                .medicalQuestionGeneratorSimplifiedAnalysis !== null && {
                medicalQuestionGeneratorSimplifiedAnalysis:
                  medicalQuestionGeneratorQueryResult
                    .medicalQuestionGeneratorResult
                    .medicalQuestionGeneratorSimplifiedAnalysis,
              }),
              createdAt:
                medicalQuestionGeneratorQueryResult
                  .medicalQuestionGeneratorResult.createdAt,
              updatedAt:
                medicalQuestionGeneratorQueryResult
                  .medicalQuestionGeneratorResult.updatedAt,
            })
          : null,
      createdBy: GetMedicalQuestionGeneratorResponsibleResponseDto.build({
        ...analysisToolRecordQueryResult.createdBy.customer,
      }),
      updatedBy: GetMedicalQuestionGeneratorResponsibleResponseDto.build({
        ...analysisToolRecordQueryResult.updatedBy.customer,
      }),
    });

    if (
      medicalQuestionGeneratorQueryResult.medicalQuestionGeneratorDocument
        .length > 0
    ) {
      const medicalDocuments =
        medicalQuestionGeneratorQueryResult.medicalQuestionGeneratorDocument.filter(
          (doc) =>
            doc.type === MedicalQuestionGeneratorDocumentTypeEnum.MEDICAL,
        );
      const cnisDocuments =
        medicalQuestionGeneratorQueryResult.medicalQuestionGeneratorDocument.filter(
          (doc) => doc.type === MedicalQuestionGeneratorDocumentTypeEnum.CNIS,
        );

      if (medicalDocuments.length > 0) {
        const medicalDocumentData = await Promise.all(
          medicalDocuments.map(async (document) => {
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
          }),
        );

        response.medicalDocuments = medicalDocumentData.map((document) =>
          GetMedicalQuestionGeneratorDocumentResponseDto.build({
            url: document.url.toString(),
            originalFileName: document.originalFileName.toString(),
            type: MedicalQuestionGeneratorDocumentTypeEnum.MEDICAL,
          }),
        );
      }

      if (cnisDocuments.length > 0) {
        const cnisDocumentData = await Promise.all(
          cnisDocuments.map(async (document) => {
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
          }),
        );

        response.cnisDocuments = cnisDocumentData.map((document) =>
          GetMedicalQuestionGeneratorDocumentResponseDto.build({
            url: document.url.toString(),
            originalFileName: document.originalFileName.toString(),
            type: MedicalQuestionGeneratorDocumentTypeEnum.CNIS,
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
