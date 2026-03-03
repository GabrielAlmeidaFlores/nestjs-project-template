import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import {
  GetCnisFastAnalysisClientResponseDto,
  GetCnisFastAnalysisResponseDto,
  GetCnisFastAnalysisResponsibleResponseDto,
  GetCnisFastAnalysisResultResponseDto,
} from '@module/customer/analysis-tool/module/cnis-fast-analysis/dto/response/get-cnis-fast-analysis.response.dto';
import { CnisFastAnalysisNotFoundError } from '@module/customer/analysis-tool/module/cnis-fast-analysis/error/cnis-fast-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetCnisFastAnalysisUseCase {
  protected readonly _type = GetCnisFastAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(CnisFastAnalysisQueryRepositoryGateway)
    private readonly cnisFastAnalysisQueryRepositoryGateway: CnisFastAnalysisQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    cnisFastAnalysisId: CnisFastAnalysisId,
  ): Promise<GetCnisFastAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByCnisFastAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        cnisFastAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        CnisFastAnalysisNotFoundError,
      );

    const cnisFastAnalysisQueryResult =
      await this.cnisFastAnalysisQueryRepositoryGateway.findOneByCnisFastAnalysisIdAndOrganizationIdWithRelationsOrFail(
        cnisFastAnalysisId,
        organizationSessionData.organizationId,
        CnisFastAnalysisNotFoundError,
      );

    const cnisCompleteAnalysis =
      cnisFastAnalysisQueryResult.cnisFastAnalysisResult &&
      cnisFastAnalysisQueryResult.cnisFastAnalysisResult
        .cnisCompleteAnalysis !== null
        ? await this.exportDocumentGateway.convertMarkdownToHtml(
            cnisFastAnalysisQueryResult.cnisFastAnalysisResult
              .cnisCompleteAnalysis,
          )
        : null;

    const cnisFastAnalysisResult =
      cnisFastAnalysisQueryResult.cnisFastAnalysisResult &&
      cnisCompleteAnalysis !== null
        ? GetCnisFastAnalysisResultResponseDto.build({
            ...cnisFastAnalysisQueryResult.cnisFastAnalysisResult,
            cnisCompleteAnalysis,
          })
        : null;

    const response = GetCnisFastAnalysisResponseDto.build({
      ...cnisFastAnalysisQueryResult,
      status: analysisToolRecordQueryResult.status,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
      createdAt: analysisToolRecordQueryResult.createdAt,
      analysisToolClient: GetCnisFastAnalysisClientResponseDto.build({
        ...analysisToolRecordQueryResult.analysisToolClient,
      }),
      legalProceedingNumber:
        cnisFastAnalysisQueryResult.cnisFastAnalysisLegalProceeding.map(
          (t) => t.legalProceedingNumber,
        ),
      inssBenefitNumber:
        cnisFastAnalysisQueryResult.cnisFastAnalysisInssBenefit.map(
          (t) => t.inssBenefitNumber,
        ),
      cnisFastAnalysisResult,
      createdBy: GetCnisFastAnalysisResponsibleResponseDto.build({
        ...analysisToolRecordQueryResult.createdBy.customer,
      }),
      updatedBy: GetCnisFastAnalysisResponsibleResponseDto.build({
        ...analysisToolRecordQueryResult.updatedBy.customer,
      }),
    });

    if (cnisFastAnalysisQueryResult.cnisDocument !== null) {
      const cnisDocument = await this.fileProcessorGateway.getFileSignedUrl(
        cnisFastAnalysisQueryResult.cnisDocument,
      );

      const cnisDocumentOriginalFileName =
        await this.fileProcessorGateway.getOriginalFileName(
          cnisFastAnalysisQueryResult.cnisDocument,
        );

      response.cnisDocument = cnisDocument.toString();
      response.cnisDocumentOriginalFileName =
        cnisDocumentOriginalFileName.toString();
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
