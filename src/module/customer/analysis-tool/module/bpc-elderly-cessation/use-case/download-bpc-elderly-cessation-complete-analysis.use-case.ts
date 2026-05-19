import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { BpcElderlyCessationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/query/bpc-elderly-cessation.query.repository.gateway';
import { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import { BpcElderlyCessationDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/error/bpc-elderly-cessation-does-not-contain-complete-analysis.error';
import { BpcElderlyCessationNotFoundError } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/error/bpc-elderly-cessation-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadBpcElderlyCessationCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadBpcElderlyCessationCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BpcElderlyCessationQueryRepositoryGateway)
    private readonly bpcElderlyCessationQueryRepositoryGateway: BpcElderlyCessationQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(OrganizationCustomizationExportDocumentOptionsResolver)
    private readonly organizationCustomizationExportDocumentOptionsResolver: OrganizationCustomizationExportDocumentOptionsResolver,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    bpcElderlyCessationId: BpcElderlyCessationId,
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

    const bpcElderlyCessationQueryResult =
      await this.bpcElderlyCessationQueryRepositoryGateway.findOneByBpcElderlyCessationIdAndOrganizationIdOrFail(
        bpcElderlyCessationId,
        organizationSessionData.organizationId,
        BpcElderlyCessationNotFoundError,
      );

    if (bpcElderlyCessationQueryResult.bpcElderlyCessationResult === null) {
      throw new BpcElderlyCessationDoesNotContainCompleteAnalysisError();
    }

    const completeAnalysis =
      bpcElderlyCessationQueryResult.bpcElderlyCessationResult
        .completeAnalysisDownload;

    if (completeAnalysis === null) {
      throw new BpcElderlyCessationDoesNotContainCompleteAnalysisError();
    }

    const exportOptions =
      await this.organizationCustomizationExportDocumentOptionsResolver.execute(
        organizationSessionData.organizationId,
      );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      completeAnalysis,
      format,
      'analise_completa_cessacao_bpc_idoso',
      exportOptions,
    );
  }
}
