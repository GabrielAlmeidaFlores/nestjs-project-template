import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { BpcElderlyAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/query/bpc-elderly-analysis.query.repository.gateway';
import { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';
import { BpcElderlyAnalysisDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/error/bpc-elderly-analysis-does-not-contain-complete-analysis.error';
import { BpcElderlyAnalysisDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/error/bpc-elderly-analysis-does-not-contain-simplified-analysis.error';
import { BpcElderlyAnalysisNotFoundError } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/error/bpc-elderly-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadBpcElderlyAnalysisSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadBpcElderlyAnalysisSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BpcElderlyAnalysisQueryRepositoryGateway)
    private readonly bpcElderlyAnalysisQueryRepositoryGateway: BpcElderlyAnalysisQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(OrganizationCustomizationExportDocumentOptionsResolver)
    private readonly organizationCustomizationExportDocumentOptionsResolver: OrganizationCustomizationExportDocumentOptionsResolver,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    bpcElderlyAnalysisId: BpcElderlyAnalysisId,
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

    const bpcElderlyAnalysisQueryResult =
      await this.bpcElderlyAnalysisQueryRepositoryGateway.findOneByBpcElderlyAnalysisIdAndOrganizationIdOrFail(
        bpcElderlyAnalysisId,
        organizationSessionData.organizationId,
        BpcElderlyAnalysisNotFoundError,
      );

    if (bpcElderlyAnalysisQueryResult.bpcElderlyAnalysisResult === null) {
      throw new BpcElderlyAnalysisDoesNotContainCompleteAnalysisError();
    }

    const simplifiedAnalysis =
      bpcElderlyAnalysisQueryResult.bpcElderlyAnalysisResult.simplifiedAnalysis;

    if (simplifiedAnalysis === null) {
      throw new BpcElderlyAnalysisDoesNotContainSimplifiedAnalysisError();
    }

    const exportOptions =
      await this.organizationCustomizationExportDocumentOptionsResolver.execute(
        organizationSessionData.organizationId,
      );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      simplifiedAnalysis,
      format,
      'analise_simplificada_bpc_idoso',
      exportOptions,
    );
  }
}
