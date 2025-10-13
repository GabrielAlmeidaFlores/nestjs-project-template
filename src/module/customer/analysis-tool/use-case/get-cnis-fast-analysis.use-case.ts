import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import {
  GetCnisFastAnalysisClientResponseDto,
  GetCnisFastAnalysisResponseDto,
  GetCnisFastAnalysisResponsibleResponseDto,
  GetCnisFastAnalysisResultResponseDto,
} from '@module/customer/analysis-tool/dto/response/get-cnis-fast-analysis.response.dto';
import { CnisFastAnalysisNotFoundError } from '@module/customer/analysis-tool/error/cnis-fast-analysis-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
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
    @Inject(CnisFastAnalysisQueryRepositoryGateway)
    private readonly cnisFastAnalysisQueryRepositoryGateway: CnisFastAnalysisQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    cnisFastAnalysisId: CnisFastAnalysisId,
  ): Promise<GetCnisFastAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const cnisFastAnalysisQueryResult =
      await this.cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail(
        cnisFastAnalysisId,
        organizationSessionData.organizationId,
        CnisFastAnalysisNotFoundError,
      );

    const response = GetCnisFastAnalysisResponseDto.build({
      ...cnisFastAnalysisQueryResult,
      analysisToolClient: GetCnisFastAnalysisClientResponseDto.build({
        ...cnisFastAnalysisQueryResult.analysisToolClient,
      }),
      legalProceedingNumber:
        cnisFastAnalysisQueryResult.cnisFastAnalysisLegalProceeding.map(
          (t) => t.legalProceedingNumber,
        ),
      inssBenefitNumber:
        cnisFastAnalysisQueryResult.cnisFastAnalysisInssBenefit.map(
          (t) => t.inssBenefitNumber,
        ),
      cnisFastAnalysisResult:
        cnisFastAnalysisQueryResult.cnisFastAnalysisResult !== null
          ? GetCnisFastAnalysisResultResponseDto.build({
              ...cnisFastAnalysisQueryResult.cnisFastAnalysisResult,
            })
          : null,
      createdBy: GetCnisFastAnalysisResponsibleResponseDto.build({
        ...cnisFastAnalysisQueryResult.createdBy.customer,
      }),
      updatedBy: GetCnisFastAnalysisResponsibleResponseDto.build({
        ...cnisFastAnalysisQueryResult.updatedBy.customer,
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
      cnisFastAnalysisQueryResult.createdBy.customer.profilePicture !== null
    ) {
      const profilePicture = await this.fileProcessorGateway.getFileSignedUrl(
        cnisFastAnalysisQueryResult.createdBy.customer.profilePicture,
      );

      response.createdBy.profilePicture = profilePicture.toString();
    }

    if (
      cnisFastAnalysisQueryResult.updatedBy.customer.profilePicture !== null
    ) {
      const profilePicture = await this.fileProcessorGateway.getFileSignedUrl(
        cnisFastAnalysisQueryResult.updatedBy.customer.profilePicture,
      );

      response.updatedBy.profilePicture = profilePicture.toString();
    }

    return response;
  }
}
