import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { PerCapitaIncomeForBpcAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/per-capita-income-for-bpc-analysis.query.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';
import { PerCapitaIncomeForBpcAnalysisDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/error/per-capita-income-for-bpc-analysis-does-not-contain-complete-analysis.error';
import { PerCapitaIncomeForBpcAnalysisNotFoundError } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/error/per-capita-income-for-bpc-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadPerCapitaIncomeForBpcCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadPerCapitaIncomeForBpcCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(PerCapitaIncomeForBpcAnalysisQueryRepositoryGateway)
    private readonly perCapitaIncomeForBpcAnalysisQueryRepositoryGateway: PerCapitaIncomeForBpcAnalysisQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId,
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

    const perCapitaIncomeForBpcAnalysisQueryResult =
      await this.perCapitaIncomeForBpcAnalysisQueryRepositoryGateway.findOneByPerCapitaIncomeForBpcAnalysisIdAndOrganizationIdOrFail(
        perCapitaIncomeForBpcAnalysisId,
        organizationSessionData.organizationId,
        PerCapitaIncomeForBpcAnalysisNotFoundError,
      );

    if (
      !perCapitaIncomeForBpcAnalysisQueryResult.perCapitaIncomeForBpcAnalysisResult
    ) {
      throw new PerCapitaIncomeForBpcAnalysisNotFoundError();
    }

    const responseAi =
      perCapitaIncomeForBpcAnalysisQueryResult
        .perCapitaIncomeForBpcAnalysisResult.completeAnalysis;

    if (responseAi === null) {
      throw new PerCapitaIncomeForBpcAnalysisDoesNotContainCompleteAnalysisError();
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_completa_renda_per_capita_para_bpc',
    );
  }
}
