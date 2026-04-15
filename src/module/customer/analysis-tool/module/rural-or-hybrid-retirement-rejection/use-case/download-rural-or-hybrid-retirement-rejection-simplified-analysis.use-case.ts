import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-result/command/rural-or-hybrid-retirement-rejection-result.command.repository.gateway';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionResultEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-result/rural-or-hybrid-retirement-rejection-result.entity';
import { RuralOrHybridRetirementRejectionCompleteAnalysisDownloadNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-complete-analysis-download-not-found.error';
import { RuralOrHybridRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-not-found.error';
import { RuralOrHybridRetirementRejectionResultNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-result-not-found.error';
import { RuralOrHybridRetirementRejectionSimplifiedAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-simplified-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadRuralOrHybridRetirementRejectionSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadRuralOrHybridRetirementRejectionSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionQueryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionResultCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionResultCommandRepositoryGateway: RuralOrHybridRetirementRejectionResultCommandRepositoryGateway,
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
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRuralOrHybridRetirementRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
      ruralOrHybridRetirementRejectionId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      RuralOrHybridRetirementRejectionNotFoundError,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_REJECTION_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_REJECTION_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const rejection =
      await this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations(
        ruralOrHybridRetirementRejectionId,
        RuralOrHybridRetirementRejectionNotFoundError,
      );

    const currentResult = rejection.ruralOrHybridRetirementRejectionResult;

    if (currentResult === null) {
      throw new RuralOrHybridRetirementRejectionResultNotFoundError();
    }

    if (currentResult.completeAnalysis === null) {
      throw new RuralOrHybridRetirementRejectionCompleteAnalysisDownloadNotFoundError();
    }

    let responseAi =
      currentResult.simplifiedAnalysisDownload ?? currentResult.simplifiedAnalysis;

    if (responseAi === null) {
      const simplifiedAnalysis =
        await this.analysisProcessorGateway.getRuralOrHybridRetirementRejectionSimplifiedAnalysis(
          promptResponse.prompt,
          [Buffer.from(currentResult.completeAnalysis, 'utf-8')],
        );

      const updatedResult = this.buildUpdatedResultEntity(currentResult, {
        simplifiedAnalysis,
        simplifiedAnalysisDownload: simplifiedAnalysis,
      });

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        this.ruralOrHybridRetirementRejectionResultCommandRepositoryGateway.updateRuralOrHybridRetirementRejectionResult(
          updatedResult,
        ),
      ]);

      await transaction.commit();

      responseAi = simplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new RuralOrHybridRetirementRejectionSimplifiedAnalysisNotFoundError();
    }

    const htmlContent = await this.exportDocumentGateway.convertMarkdownToHtml(
      responseAi,
    );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      htmlContent,
      format,
      'analise_simplificada_indeferimento_aposentadoria_rural_hibrida',
    );
  }

  private buildUpdatedResultEntity(
    currentResult: RuralOrHybridRetirementRejectionResultEntity,
    overrides: {
      simplifiedAnalysis?: string | null;
      simplifiedAnalysisDownload?: string | null;
    },
  ): RuralOrHybridRetirementRejectionResultEntity {
    return new RuralOrHybridRetirementRejectionResultEntity({
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
      ruralOrHybridRetirementRejectionId:
        currentResult.ruralOrHybridRetirementRejectionId,
      createdAt: currentResult.createdAt,
      updatedAt: currentResult.updatedAt,
      deletedAt: currentResult.deletedAt,
    });
  }
}