import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { BpcDisabilityGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/query/bpc-disability-grant.query.repository.gateway';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import { BpcDisabilityGrantDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/bpc-disability-grant/error/bpc-disability-grant-does-not-contain-complete-analysis.error';
import { BpcDisabilityGrantNotFoundError } from '@module/customer/analysis-tool/module/bpc-disability-grant/error/bpc-disability-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { BpcDisabilityGrantResultInterface } from '@module/customer/analysis-tool/module/bpc-disability-grant/model/interface/bpc-disability-grant-result.interface';

@Injectable()
export class DownloadBpcDisabilityGrantCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadBpcDisabilityGrantCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BpcDisabilityGrantQueryRepositoryGateway)
    private readonly bpcDisabilityGrantQueryRepositoryGateway: BpcDisabilityGrantQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(OrganizationCustomizationExportDocumentOptionsResolver)
    private readonly organizationCustomizationExportDocumentOptionsResolver: OrganizationCustomizationExportDocumentOptionsResolver,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    bpcDisabilityGrantId: BpcDisabilityGrantId,
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

    const bpcDisabilityGrantQueryResult =
      await this.bpcDisabilityGrantQueryRepositoryGateway.findOneByBpcDisabilityGrantIdAndOrganizationIdOrFail(
        bpcDisabilityGrantId,
        organizationSessionData.organizationId,
        BpcDisabilityGrantNotFoundError,
      );

    const completeAnalysisJson =
      bpcDisabilityGrantQueryResult.BpcDisabilityGrantResult?.completeAnalysis ??
      null;

    if (completeAnalysisJson === null) {
      throw new BpcDisabilityGrantDoesNotContainCompleteAnalysisError();
    }

    const analysisResult = this.extractAnalysisResult(completeAnalysisJson);

    if (analysisResult === null) {
      throw new BpcDisabilityGrantDoesNotContainCompleteAnalysisError();
    }

    const exportOptions =
      await this.organizationCustomizationExportDocumentOptionsResolver.execute(
        organizationSessionData.organizationId,
      );

    const htmlContent =
      await this.exportDocumentGateway.convertMarkdownToHtml(analysisResult);

    return this.exportDocumentGateway.downloadFileAsStreamable(
      htmlContent,
      format,
      'analise_completa_indeferimento_bpc_pcd',
      exportOptions,
    );
  }

  private extractAnalysisResult(raw: string): string | null {
    try {
      let cleanedJson = raw;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const parsed = JSON.parse(cleanedJson) as BpcDisabilityGrantResultInterface;

      return typeof parsed.analysisResult === 'string'
        ? parsed.analysisResult
        : null;
    } catch {
      return null;
    }
  }
}
