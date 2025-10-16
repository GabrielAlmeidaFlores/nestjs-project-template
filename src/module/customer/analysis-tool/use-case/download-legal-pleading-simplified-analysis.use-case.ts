import { Inject, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { LegalPleadingResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-result/command/legal-pleading-result.repository.gateway';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { LegalPleadingResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-result/legal-pleading-result.entity';
import { LegalPleadingDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/error/legal-pleading-does-not-contain-complete-analysis.error';
import { LegalPleadingDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/error/legal-pleading-does-not-contain-simplified-analysis.error';
import { LegalPleadingNotFoundError } from '@module/customer/analysis-tool/error/legal-pleading-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
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
    @Inject(LegalPleadingResultCommandRepositoryGateway)
    private readonly legalPleadingResultCommandRepositoryGateway: LegalPleadingResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
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
        LegalPleadingNotFoundError,
      );

    if (legalPleadingAnalysisQueryResult.legalPleadingResult === null) {
      throw new LegalPleadingDoesNotContainCompleteAnalysisError();
    }

    if (
      legalPleadingAnalysisQueryResult.legalPleadingResult
        .legalPleadingCompleteAnalysis === null
    ) {
      throw new LegalPleadingDoesNotContainCompleteAnalysisError();
    }

    let responseAi =
      legalPleadingAnalysisQueryResult.legalPleadingResult
        .legalPleadingSimplifiedAnalysis;

    if (responseAi === null) {
      const legalPleadingSimplifiedAnalysis =
        await this.analysisProcessorGateway.getLegalPleadingSimplifiedAnalysis([
          Buffer.from(
            legalPleadingAnalysisQueryResult.legalPleadingResult
              .legalPleadingCompleteAnalysis,
            'utf-8',
          ),
        ]);

      const legalPleadingResult = new LegalPleadingResultEntity({
        ...legalPleadingAnalysisQueryResult.legalPleadingResult,
      });

      const legalPleadingResultTransaction =
        this.legalPleadingResultCommandRepositoryGateway.updateLegalPleadingResult(
          legalPleadingAnalysisQueryResult.legalPleadingResult.id,
          legalPleadingResult,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute(
        legalPleadingResultTransaction,
      );
      await transaction.commit();

      responseAi = legalPleadingSimplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new LegalPleadingDoesNotContainSimplifiedAnalysisError();
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_peca_processual',
    );
  }
}
