import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { BpcDisabilityTerminationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/bpc-disability-termination.query.repository.gateway';
import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import { BpcDisabilityTerminationDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/bpc-disability-termination/error/bpc-disability-termination-does-not-contain-complete-analysis.error';
import { BpcDisabilityTerminationNotFoundError } from '@module/customer/analysis-tool/module/bpc-disability-termination/error/bpc-disability-termination-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadBpcDisabilityTerminationCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadBpcDisabilityTerminationCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BpcDisabilityTerminationQueryRepositoryGateway)
    private readonly bpcDisabilityTerminationQueryRepositoryGateway: BpcDisabilityTerminationQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(OrganizationCustomizationExportDocumentOptionsResolver)
    private readonly organizationCustomizationExportDocumentOptionsResolver: OrganizationCustomizationExportDocumentOptionsResolver,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const bpcDisabilityTerminationQueryResult =
      await this.bpcDisabilityTerminationQueryRepositoryGateway.findOneByBpcDisabilityTerminationIdAndOrganizationIdOrFail(
        bpcDisabilityTerminationId,
        organizationSessionData.organizationId,
        BpcDisabilityTerminationNotFoundError,
      );

    if (
      bpcDisabilityTerminationQueryResult.bpcDisabilityTerminationResult ===
      null
    ) {
      throw new BpcDisabilityTerminationDoesNotContainCompleteAnalysisError();
    }

    const completeAnalysis =
      bpcDisabilityTerminationQueryResult.bpcDisabilityTerminationResult
        .completeAnalysisDownload;

    if (completeAnalysis === null) {
      throw new BpcDisabilityTerminationDoesNotContainCompleteAnalysisError();
    }

    const exportOptions =
      await this.organizationCustomizationExportDocumentOptionsResolver.execute(
        organizationSessionData.organizationId,
      );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      completeAnalysis,
      format,
      'analise_completa_cessacao_bpc_pcd',
      exportOptions,
    );
  }
}
