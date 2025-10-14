import { Inject, StreamableFile } from '@nestjs/common';
import moment from 'moment';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { CnisFastAnalysisNotFoundError } from '@module/customer/analysis-tool/error/cnis-fast-analysis-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

export class DownloadLegalPleadingSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadLegalPleadingSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(LegalPleadingQueryRepositoryGateway)
    private readonly legalPleadingQueryRepositoryGateway: LegalPleadingQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    legalPleadingId: LegalPleadingId,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const legalPleadingAnalysisQueryResult =
      await this.legalPleadingQueryRepositoryGateway.findOneByLegalPleadingAndOrganizationIdOrFail(
        legalPleadingId,
        organizationSessionData.organizationId,
        CnisFastAnalysisNotFoundError,
      );

    if (!legalPleadingAnalysisQueryResult.legalPleadingResult) {
      throw new CnisFastAnalysisNotFoundError();
    }

    const responseAi =
      legalPleadingAnalysisQueryResult.legalPleadingResult
        .legalPleadingSimplifiedAnalysis;

    if (responseAi === null) {
      throw new CnisFastAnalysisNotFoundError();
    }

    const formatted = moment().format('DD-MM-YYYY');

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      `analise_simplificada_peca_processual_${formatted}`,
    );
  }
}
