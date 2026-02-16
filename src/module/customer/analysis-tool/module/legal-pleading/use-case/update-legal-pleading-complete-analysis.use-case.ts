import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { LegalPleadingResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-result/command/legal-pleading-result.repository.gateway';
import { LegalPleadingId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { LegalPleadingResultEntity } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-result/legal-pleading-result.entity';
import { UpdateLegalPleadingCompleteAnalysisRequestDto } from '@module/customer/analysis-tool/module/legal-pleading/dto/request/update-legal-pleading-complete-analysis.request.dto';
import { UpdateLegalPleadingCompleteAnalysisResponseDto } from '@module/customer/analysis-tool/module/legal-pleading/dto/response/update-legal-pleading-complete-analysis.response.dto';
import { LegalPleadingDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/legal-pleading/error/legal-pleading-does-not-contain-complete-analysis.error';
import { LegalPleadingNotFoundError } from '@module/customer/analysis-tool/module/legal-pleading/error/legal-pleading-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateLegalPleadingCompleteAnalysisUseCase {
  protected readonly _type = UpdateLegalPleadingCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(LegalPleadingQueryRepositoryGateway)
    private readonly legalPleadingQueryRepositoryGateway: LegalPleadingQueryRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(LegalPleadingResultCommandRepositoryGateway)
    private readonly legalPleadingResultCommandRepositoryGateway: LegalPleadingResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    legalPleadingId: LegalPleadingId,
    dto: UpdateLegalPleadingCompleteAnalysisRequestDto,
  ): Promise<UpdateLegalPleadingCompleteAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const legalPleadingQueryResult =
      await this.legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail(
        legalPleadingId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        LegalPleadingNotFoundError,
      );

    if (
      legalPleadingQueryResult.legalPleadingResult
        ?.legalPleadingCompleteAnalysis === null
    ) {
      throw new LegalPleadingDoesNotContainCompleteAnalysisError();
    }

    const convertHtmlToMarkdown =
      this.exportDocumentGateway.convertHtmlToMarkdown(
        dto.legalPleadingCompleteAnalysis,
      );

    const convertMarkdownToHtml =
      await this.exportDocumentGateway.convertMarkdownToHtml(
        convertHtmlToMarkdown,
      );

    const legalPleadingResult = new LegalPleadingResultEntity({
      ...legalPleadingQueryResult.legalPleadingResult,
      legalPleadingCompleteAnalysis: convertHtmlToMarkdown,
    });

    const legalPleadingResultTransaction =
      this.legalPleadingResultCommandRepositoryGateway.updateLegalPleadingResult(
        legalPleadingResult.id,
        legalPleadingResult,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      legalPleadingResultTransaction,
    );
    await transaction.commit();

    return UpdateLegalPleadingCompleteAnalysisResponseDto.build({
      legalPleadingCompleteAnalysis: convertMarkdownToHtml,
    });
  }
}
