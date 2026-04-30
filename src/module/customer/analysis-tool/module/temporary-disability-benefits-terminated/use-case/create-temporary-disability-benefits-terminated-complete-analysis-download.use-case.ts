import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated/query/temporary-disability-benefits-terminated.query.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedCompleteAnalysisDownloadNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/temporary-disability-benefits-terminated-complete-analysis-download-not-found.error';
import { TemporaryDisabilityBenefitsTerminatedNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/temporary-disability-benefits-terminated-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateTemporaryDisabilityBenefitsTerminatedCompleteAnalysisDownloadUseCase {
  protected readonly _type =
    CreateTemporaryDisabilityBenefitsTerminatedCompleteAnalysisDownloadUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway)
    private readonly temporaryDisabilityBenefitsTerminatedQueryRepositoryGateway: TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByTemporaryDisabilityBenefitsTerminatedIdAndOrganizationIdAndAuthIdentityIdOrFail(
      temporaryDisabilityBenefitsTerminatedId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      TemporaryDisabilityBenefitsTerminatedNotFoundError,
    );

    const analysisQueryResult =
      await this.temporaryDisabilityBenefitsTerminatedQueryRepositoryGateway.findOneByTemporaryDisabilityBenefitsTerminatedIdOrFailWithRelations(
        temporaryDisabilityBenefitsTerminatedId,
        TemporaryDisabilityBenefitsTerminatedNotFoundError,
      );

    const completeAnalysisDownloadHtml =
      analysisQueryResult.result?.completeAnalysisDownload ?? null;

    if (completeAnalysisDownloadHtml === null) {
      throw new TemporaryDisabilityBenefitsTerminatedCompleteAnalysisDownloadNotFoundError();
    }

    const htmlContent = await this.exportDocumentGateway.convertMarkdownToHtml(
      completeAnalysisDownloadHtml,
    );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      htmlContent,
      format,
      'analise_completa_indeferimento_auxilio_incapacidade_temporaria',
    );
  }
}
