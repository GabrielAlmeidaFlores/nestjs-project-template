import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/account/error/organization-member-not-found.error';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { RetirementPermanentDisabilityRevisionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision/query/retirement-permanent-disability-revision.query.repository.gateway';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RetirementPermanentDisabilityRevisionCompleteAnalysisDownloadNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/error/retirement-permanent-disability-revision-complete-analysis-download-not-found.error';
import { RetirementPermanentDisabilityRevisionNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/error/retirement-permanent-disability-revision-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadRetirementPermanentDisabilityRevisionCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadRetirementPermanentDisabilityRevisionCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRevisionQueryRepositoryGateway)
    private readonly retirementPermanentDisabilityRevisionQueryRepositoryGateway: RetirementPermanentDisabilityRevisionQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRetirementPermanentDisabilityRevisionIdAndOrganizationIdAndAuthIdentityIdOrFail(
      retirementPermanentDisabilityRevisionId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      RetirementPermanentDisabilityRevisionNotFoundError,
    );

    const analysisQueryResult =
      await this.retirementPermanentDisabilityRevisionQueryRepositoryGateway.findOneByRetirementPermanentDisabilityRevisionIdOrFailWithRelations(
        retirementPermanentDisabilityRevisionId,
        RetirementPermanentDisabilityRevisionNotFoundError,
      );

    const downloadText =
      analysisQueryResult.result
        ?.retirementPermanentDisabilityRevisionCompleteAnalysisDownload ?? null;

    if (downloadText === null) {
      throw new RetirementPermanentDisabilityRevisionCompleteAnalysisDownloadNotFoundError();
    }

    const htmlContent =
      await this.exportDocumentGateway.convertMarkdownToHtml(downloadText);

    return this.exportDocumentGateway.downloadFileAsStreamable(
      htmlContent,
      format,
      'analise_completa_revisao_aposentadoria_invalidez_permanente',
    );
  }
}
