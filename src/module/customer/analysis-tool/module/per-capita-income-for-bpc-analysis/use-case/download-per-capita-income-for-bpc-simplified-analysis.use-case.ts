import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { PerCapitaIncomeForBpcAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/per-capita-income-for-bpc-analysis.query.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-result/command/per-capita-income-for-bpc-analysis-result.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';
import { PerCapitaIncomeForBpcAnalysisResultEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-result/per-capita-income-for-bpc-analysis-result.entity';
import { PerCapitaIncomeForBpcAnalysisDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/error/per-capita-income-for-bpc-analysis-does-not-contain-complete-analysis.error';
import { PerCapitaIncomeForBpcAnalysisDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/error/per-capita-income-for-bpc-analysis-does-not-contain-simplified-analysis.error';
import { PerCapitaIncomeForBpcAnalysisNotFoundError } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/error/per-capita-income-for-bpc-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadPerCapitaIncomeForBpcSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadPerCapitaIncomeForBpcSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(PerCapitaIncomeForBpcAnalysisQueryRepositoryGateway)
    private readonly perCapitaIncomeForBpcAnalysisQueryRepositoryGateway: PerCapitaIncomeForBpcAnalysisQueryRepositoryGateway,
    @Inject(PerCapitaIncomeForBpcAnalysisResultCommandRepositoryGateway)
    private readonly perCapitaIncomeForBpcAnalysisResultCommandRepositoryGateway: PerCapitaIncomeForBpcAnalysisResultCommandRepositoryGateway,
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

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const perCapitaIncomeForBpcAnalysisQueryResult =
      await this.perCapitaIncomeForBpcAnalysisQueryRepositoryGateway.findOneByPerCapitaIncomeForBpcAnalysisIdAndOrganizationIdOrFail(
        perCapitaIncomeForBpcAnalysisId,
        organizationSessionData.organizationId,
        PerCapitaIncomeForBpcAnalysisNotFoundError,
      );

    if (
      !perCapitaIncomeForBpcAnalysisQueryResult.perCapitaIncomeForBpcAnalysisResult
    ) {
      throw new PerCapitaIncomeForBpcAnalysisDoesNotContainCompleteAnalysisError();
    }

    if (
      perCapitaIncomeForBpcAnalysisQueryResult
        .perCapitaIncomeForBpcAnalysisResult.completeAnalysis === null
    ) {
      throw new PerCapitaIncomeForBpcAnalysisDoesNotContainCompleteAnalysisError();
    }

    let responseAi =
      perCapitaIncomeForBpcAnalysisQueryResult
        .perCapitaIncomeForBpcAnalysisResult.simplifiedAnalysis;

    if (responseAi === null) {
      const perCapitaIncomeSimplifiedAnalysis =
        await this.analysisProcessorGateway.getPerCapitaIncomeForBpcSimplifiedAnalysis(
          promptResponse.prompt,
          [
            Buffer.from(
              perCapitaIncomeForBpcAnalysisQueryResult
                .perCapitaIncomeForBpcAnalysisResult.completeAnalysis,
              'utf-8',
            ),
          ],
        );

      const perCapitaIncomeForBpcAnalysisResult =
        new PerCapitaIncomeForBpcAnalysisResultEntity({
          ...perCapitaIncomeForBpcAnalysisQueryResult.perCapitaIncomeForBpcAnalysisResult,
          simplifiedAnalysis: perCapitaIncomeSimplifiedAnalysis,
        });

      const perCapitaIncomeForBpcAnalysisResultTransaction =
        this.perCapitaIncomeForBpcAnalysisResultCommandRepositoryGateway.updatePerCapitaIncomeForBpcAnalysisResult(
          perCapitaIncomeForBpcAnalysisQueryResult
            .perCapitaIncomeForBpcAnalysisResult.id,
          perCapitaIncomeForBpcAnalysisResult,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        perCapitaIncomeForBpcAnalysisResultTransaction,
      ]);
      await transaction.commit();

      responseAi = perCapitaIncomeSimplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new PerCapitaIncomeForBpcAnalysisDoesNotContainSimplifiedAnalysisError();
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_renda_per_capita_para_bpc',
    );
  }
}
