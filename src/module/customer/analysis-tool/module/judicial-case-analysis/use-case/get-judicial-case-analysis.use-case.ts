import { Injectable, Inject } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { JudicialCaseAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/judicial-case-analysis.query.repository.gateway';
import { JudicialCaseAnalysisId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/value-object/judicial-case-analysis-id/judicial-case-analysis-id.value-object';
import {
  GetJudicialCaseAnalysisResponseDto,
  GetJudicialCaseAnalysisClientResponseDto,
  GetJudicialCaseAnalysisResultResponseDto,
  GetJudicialCaseAnalysisResponsibleResponseDto,
  GetJudicialCaseAnalysisDocumentResponseDto,
} from '@module/customer/analysis-tool/module/judicial-case-analysis/dto/response/get-judicial-case-analysis.response.dto';
import { JudicialCaseAnalysisNotFoundError } from '@module/customer/analysis-tool/module/judicial-case-analysis/error/judicial-case-analysis-not-found.error';
import { JudicialCaseAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/enum/judicial-case-analysis-document-type.enum';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetJudicialCaseAnalysisUseCase {
  protected readonly _type = GetJudicialCaseAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(JudicialCaseAnalysisQueryRepositoryGateway)
    private readonly judicialCaseAnalysisQueryRepositoryGateway: JudicialCaseAnalysisQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    judicialCaseAnalysisId: JudicialCaseAnalysisId,
  ): Promise<GetJudicialCaseAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByJudicialCaseAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        judicialCaseAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        JudicialCaseAnalysisNotFoundError,
      );

    const judicialCaseAnalysisQueryResult =
      await this.judicialCaseAnalysisQueryRepositoryGateway.findOneByJudicialCaseAnalysisIdAndOrganizationIdOrFail(
        judicialCaseAnalysisId,
        organizationSessionData.organizationId,
        JudicialCaseAnalysisNotFoundError,
      );

    const response = GetJudicialCaseAnalysisResponseDto.build({
      ...judicialCaseAnalysisQueryResult,
      status: analysisToolRecordQueryResult.status,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
      createdAt: analysisToolRecordQueryResult.createdAt,
      analysisToolClient:
        GetJudicialCaseAnalysisClientResponseDto.build({
          ...analysisToolRecordQueryResult.analysisToolClient,
        }),
      legalProceedingNumber:
        judicialCaseAnalysisQueryResult.judicialCaseAnalysisLegalProceeding.map(
          (t) => t.legalProceedingNumber,
        ),
      inssBenefitNumber:
        judicialCaseAnalysisQueryResult.judicialCaseAnalysisBenefit.map(
          (t) => t.inssBenefitNumber,
        ),
      judicialCaseAnalysisResult:
        judicialCaseAnalysisQueryResult.judicialCaseAnalysisResult !== null
          ? GetJudicialCaseAnalysisResultResponseDto.build({
              ...judicialCaseAnalysisQueryResult.judicialCaseAnalysisResult,
            })
          : null,
      createdBy:
        GetJudicialCaseAnalysisResponsibleResponseDto.build({
          ...analysisToolRecordQueryResult.createdBy.customer,
        }),
      updatedBy:
        GetJudicialCaseAnalysisResponsibleResponseDto.build({
          ...analysisToolRecordQueryResult.updatedBy.customer,
        }),
    });

    if (
      judicialCaseAnalysisQueryResult.judicialCaseAnalysisDocument.length > 0
    ) {
      const judicialCaseDocuments = judicialCaseAnalysisQueryResult.judicialCaseAnalysisDocument.filter(
        (doc) => doc.type === JudicialCaseAnalysisDocumentTypeEnum.JUDICIAL_CASE,
      );
      const otherDocuments = judicialCaseAnalysisQueryResult.judicialCaseAnalysisDocument.filter(
        (doc) => doc.type === JudicialCaseAnalysisDocumentTypeEnum.OTHER_DOCUMENT,
      );

      if (judicialCaseDocuments.length > 0) {
        const judicialCaseDocumentUrls = await Promise.all(
          judicialCaseDocuments.map(async (document) => {
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

        response.judicialCaseDocuments = judicialCaseDocumentUrls.map(
          (document) =>
            GetJudicialCaseAnalysisDocumentResponseDto.build({
              url: document.url.toString(),
              originalFileName: document.originalFileName.toString(),
            }),
        );
      }

      if (otherDocuments.length > 0) {
        const otherDocumentUrls = await Promise.all(
          otherDocuments.map(async (document) => {
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

        response.otherDocuments = otherDocumentUrls.map(
          (document) =>
            GetJudicialCaseAnalysisDocumentResponseDto.build({
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

