import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { MaternityPayGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant/query/maternity-pay-grant.query.repository.gateway';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantCompleteAnalysisDownloadNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-grant/error/maternity-pay-grant-complete-analysis-download-not-found.error';
import { MaternityPayGrantNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-grant/error/maternity-pay-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { MaternityPayGrantResultInterface } from '@module/customer/analysis-tool/module/maternity-pay-grant/model/interface/maternity-pay-grant-result.interface';

@Injectable()
export class DownloadMaternityPayGrantCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadMaternityPayGrantCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(MaternityPayGrantQueryRepositoryGateway)
    private readonly maternityPayGrantQueryRepositoryGateway: MaternityPayGrantQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    maternityPayGrantId: MaternityPayGrantId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByMaternityPayGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
      maternityPayGrantId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      MaternityPayGrantNotFoundError,
    );

    const analysisQueryResult =
      await this.maternityPayGrantQueryRepositoryGateway.findOneByMaternityPayGrantIdOrFailWithRelations(
        maternityPayGrantId,
        MaternityPayGrantNotFoundError,
      );

    const completeAnalysisJson =
      analysisQueryResult.maternityPayGrantResult?.completeAnalysis ?? null;

    if (completeAnalysisJson === null) {
      throw new MaternityPayGrantCompleteAnalysisDownloadNotFoundError();
    }

    const analysisDescription =
      this.extractAnalysisDescription(completeAnalysisJson);

    if (analysisDescription === null) {
      throw new MaternityPayGrantCompleteAnalysisDownloadNotFoundError();
    }

    const htmlContent =
      await this.exportDocumentGateway.convertMarkdownToHtml(
        analysisDescription,
      );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      htmlContent,
      format,
      'analise_completa_salario_maternidade',
    );
  }

  private extractAnalysisDescription(raw: string): string | null {
    try {
      let cleanedJson = raw;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const parsed = JSON.parse(
        cleanedJson,
      ) as MaternityPayGrantResultInterface;

      return typeof parsed.analysisDescription === 'string'
        ? parsed.analysisDescription
        : null;
    } catch {
      return null;
    }
  }
}
