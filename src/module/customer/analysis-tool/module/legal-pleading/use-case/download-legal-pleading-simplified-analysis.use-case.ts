import { Inject, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { LegalPleadingResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-result/command/legal-pleading-result.repository.gateway';
import { LegalPleadingId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { LegalPleadingResultEntity } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-result/legal-pleading-result.entity';
import { LegalPleadingDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/legal-pleading/error/legal-pleading-does-not-contain-complete-analysis.error';
import { LegalPleadingDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/module/legal-pleading/error/legal-pleading-does-not-contain-simplified-analysis.error';
import { LegalPleadingNotFoundError } from '@module/customer/analysis-tool/module/legal-pleading/error/legal-pleading-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
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
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(OrganizationCustomizationExportDocumentOptionsResolver)
    private readonly organizationCustomizationExportDocumentOptionsResolver: OrganizationCustomizationExportDocumentOptionsResolver,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    legalPleadingId: LegalPleadingId,
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

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.LEGAL_PLEADING_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.LEGAL_PLEADING_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const legalPleadingAnalysisQueryResult =
      await this.legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail(
        legalPleadingId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
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
        await this.analysisProcessorGateway.getLegalPleadingSimplifiedAnalysis(
          promptResponse.prompt,
          [
            Buffer.from(
              legalPleadingAnalysisQueryResult.legalPleadingResult
                .legalPleadingCompleteAnalysis,
              'utf-8',
            ),
          ],
        );

      const legalPleadingResult = new LegalPleadingResultEntity({
        ...legalPleadingAnalysisQueryResult.legalPleadingResult,
        legalPleadingSimplifiedAnalysis,
      });

      const legalPleadingResultTransaction =
        this.legalPleadingResultCommandRepositoryGateway.updateLegalPleadingResult(
          legalPleadingAnalysisQueryResult.legalPleadingResult.id,
          legalPleadingResult,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        legalPleadingResultTransaction,
      ]);
      await transaction.commit();

      responseAi = legalPleadingSimplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new LegalPleadingDoesNotContainSimplifiedAnalysisError();
    }

    const exportOptions =
      await this.organizationCustomizationExportDocumentOptionsResolver.execute(
        organizationSessionData.organizationId,
      );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_peca_processual',
      exportOptions,
    );
  }
}
