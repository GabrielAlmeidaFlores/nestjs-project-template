import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { RuralOrHybridRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis/query/rural-or-hybrid-retirement-analysis.query.repository.gateway';
import { RuralOrHybridRetirementAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-result/command/rural-or-hybrid-retirement-analysis-result.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import { RuralOrHybridRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-result/rural-or-hybrid-retirement-analysis-result.entity';
import { RuralOrHybridRetirementAnalysisCompleteAnalysisDownloadNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/error/rural-or-hybrid-retirement-analysis-complete-analysis-download-not-found.error';
import { RuralOrHybridRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/error/rural-or-hybrid-retirement-analysis-not-found.error';
import { RuralOrHybridRetirementAnalysisResultNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/error/rural-or-hybrid-retirement-analysis-result-not-found.error';
import { RuralOrHybridRetirementAnalysisSimplifiedAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/error/rural-or-hybrid-retirement-analysis-simplified-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadRuralOrHybridRetirementAnalysisSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadRuralOrHybridRetirementAnalysisSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementAnalysisQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisQueryRepositoryGateway: RuralOrHybridRetirementAnalysisQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementAnalysisResultCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisResultCommandRepositoryGateway: RuralOrHybridRetirementAnalysisResultCommandRepositoryGateway,
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
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRuralOrHybridRetirementAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      ruralOrHybridRetirementAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      RuralOrHybridRetirementAnalysisNotFoundError,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const analysis =
      await this.ruralOrHybridRetirementAnalysisQueryRepositoryGateway.findOneByRuralOrHybridRetirementAnalysisIdOrFailWithRelations(
        ruralOrHybridRetirementAnalysisId,
        RuralOrHybridRetirementAnalysisNotFoundError,
      );

    const currentResult = analysis.ruralOrHybridRetirementAnalysisResult;

    if (currentResult === null) {
      throw new RuralOrHybridRetirementAnalysisResultNotFoundError();
    }

    if (currentResult.completeAnalysis === null) {
      throw new RuralOrHybridRetirementAnalysisCompleteAnalysisDownloadNotFoundError();
    }

    let responseAi =
      currentResult.simplifiedAnalysisDownload ??
      currentResult.simplifiedAnalysis;

    if (responseAi === null) {
      const simplifiedAnalysis =
        await this.analysisProcessorGateway.getRuralOrHybridRetirementAnalysisSimplifiedAnalysis(
          promptResponse.prompt,
          [Buffer.from(currentResult.completeAnalysis, 'utf-8')],
        );

      const updatedResult = this.buildUpdatedResultEntity(
        currentResult,
        {
          simplifiedAnalysis,
          simplifiedAnalysisDownload: simplifiedAnalysis,
        },
        ruralOrHybridRetirementAnalysisId,
      );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        this.ruralOrHybridRetirementAnalysisResultCommandRepositoryGateway.updateRuralOrHybridRetirementAnalysisResult(
          updatedResult,
        ),
      ]);

      await transaction.commit();

      responseAi = simplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new RuralOrHybridRetirementAnalysisSimplifiedAnalysisNotFoundError();
    }

    const htmlContent =
      await this.exportDocumentGateway.convertMarkdownToHtml(responseAi);

    return this.exportDocumentGateway.downloadFileAsStreamable(
      htmlContent,
      format,
      'analise_simplificada_analise_aposentadoria_rural_hibrida',
    );
  }

  private buildUpdatedResultEntity(
    currentResult: RuralOrHybridRetirementAnalysisResultEntity,
    overrides: {
      simplifiedAnalysis?: string | null;
      simplifiedAnalysisDownload?: string | null;
    },
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
  ): RuralOrHybridRetirementAnalysisResultEntity {
    return new RuralOrHybridRetirementAnalysisResultEntity({
      id: currentResult.id,
      firstAnalysis: currentResult.firstAnalysis,
      secondAnalysis: currentResult.secondAnalysis,
      completeAnalysis: currentResult.completeAnalysis,
      simplifiedAnalysis:
        overrides.simplifiedAnalysis ?? currentResult.simplifiedAnalysis,
      completeAnalysisDownload: currentResult.completeAnalysisDownload,
      simplifiedAnalysisDownload:
        overrides.simplifiedAnalysisDownload ??
        currentResult.simplifiedAnalysisDownload,
      ruralOrHybridRetirementAnalysisId,
      createdAt: currentResult.createdAt,
      updatedAt: currentResult.updatedAt,
      deletedAt: currentResult.deletedAt,
    });
  }
}
