import { Inject, Injectable } from '@nestjs/common';

import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import {
  GetAnalysisToolClientResponseDto,
  GetAnalysisToolClientResponsibleResponseDto,
} from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client.response.dto';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetAnalysisToolClientUseCase {
  protected readonly _type = GetAnalysisToolClientUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(LegalPleadingQueryRepositoryGateway)
    private readonly legalPleadingQueryRepositoryGateway: LegalPleadingQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    analysisToolClientId: AnalysisToolClientId,
  ): Promise<GetAnalysisToolClientResponseDto> {
    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdOrFail(
        analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const analysisCount =
      await this.analysisToolRecordQueryRepositoryGateway.countAnalysisByAnalysisToolClientAndAuthIdentityId(
        organizationSessionData.organizationId,
        analysisToolClientQueryResult.id,
        sessionData.authIdentityId,
      );

    const legalPleadingCount =
      await this.legalPleadingQueryRepositoryGateway.countByLegalPleadingAndOrganizationAndAuthIdentityId(
        organizationSessionData.organizationId,
        analysisToolClientQueryResult.id,
        sessionData.authIdentityId,
      );

    const response = GetAnalysisToolClientResponseDto.build({
      ...analysisToolClientQueryResult,
      analysisCount: analysisCount + legalPleadingCount,
      createdBy: GetAnalysisToolClientResponsibleResponseDto.build({
        ...analysisToolClientQueryResult.createdBy.customer,
      }),
      updatedBy: GetAnalysisToolClientResponsibleResponseDto.build({
        ...analysisToolClientQueryResult.updatedBy.customer,
      }),
      legalProceedingNumber:
        analysisToolClientQueryResult.analysisToolClientLegalProceeding.map(
          (legalProceeding) => legalProceeding.legalProceedingNumber,
        ),
      inssBenefitNumber:
        analysisToolClientQueryResult.analysisToolClientInssBenefit.map(
          (inssBenefit) => inssBenefit.inssBenefitNumber,
        ),
    });

    if (response.createdBy.profilePicture !== undefined) {
      const profilePicture = await this.fileProcessorGateway.getFileSignedUrl(
        response.createdBy.profilePicture,
      );

      response.createdBy.profilePicture = profilePicture.toString();
    }

    if (response.updatedBy.profilePicture !== undefined) {
      const profilePicture = await this.fileProcessorGateway.getFileSignedUrl(
        response.updatedBy.profilePicture,
      );

      response.updatedBy.profilePicture = profilePicture.toString();
    }

    return response;
  }
}
