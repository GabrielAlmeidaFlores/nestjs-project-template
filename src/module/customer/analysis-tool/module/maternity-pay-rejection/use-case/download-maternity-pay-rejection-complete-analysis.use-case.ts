import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { MaternityPayRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection/query/maternity-pay-rejection.query.repository.gateway';
import { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import { MaternityPayRejectionCompleteAnalysisDownloadNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-rejection/error/maternity-pay-rejection-complete-analysis-download-not-found.error';
import { MaternityPayRejectionNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-rejection/error/maternity-pay-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { MaternityPayRejectionResultInterface } from '@module/customer/analysis-tool/module/maternity-pay-rejection/model/interface/maternity-pay-rejection-result.interface';

@Injectable()
export class DownloadMaternityPayRejectionCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadMaternityPayRejectionCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(MaternityPayRejectionQueryRepositoryGateway)
    private readonly maternityPayRejectionQueryRepositoryGateway: MaternityPayRejectionQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    maternityPayRejectionId: MaternityPayRejectionId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByMaternityPayRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
      maternityPayRejectionId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      MaternityPayRejectionNotFoundError,
    );

    const rejection =
      await this.maternityPayRejectionQueryRepositoryGateway.findOneByMaternityPayRejectionIdOrFailWithRelations(
        maternityPayRejectionId,
        MaternityPayRejectionNotFoundError,
      );

    const completeAnalysisJson =
      rejection.maternityPayRejectionResult?.completeAnalysis ?? null;

    if (completeAnalysisJson === null) {
      throw new MaternityPayRejectionCompleteAnalysisDownloadNotFoundError();
    }

    const analysisResult = this.extractAnalysisResult(completeAnalysisJson);

    if (analysisResult === null) {
      throw new MaternityPayRejectionCompleteAnalysisDownloadNotFoundError();
    }

    const htmlContent =
      await this.exportDocumentGateway.convertMarkdownToHtml(analysisResult);

    return this.exportDocumentGateway.downloadFileAsStreamable(
      htmlContent,
      format,
      'analise_completa_indeferimento_salario_maternidade',
    );
  }

  private extractAnalysisResult(raw: string): string | null {
    try {
      let cleanedJson = raw;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const parsed = JSON.parse(
        cleanedJson,
      ) as MaternityPayRejectionResultInterface;

      return typeof parsed.analysisResult === 'string'
        ? parsed.analysisResult
        : null;
    } catch {
      return null;
    }
  }
}
