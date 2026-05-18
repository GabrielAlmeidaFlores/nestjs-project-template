import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { ElderlyBpcRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection/query/elderly-bpc-rejection.query.repository.gateway';
import { ElderlyBpcRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection-result/command/elderly-bpc-rejection-result.command.repository.gateway';
import { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import { ElderlyBpcRejectionResultEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-result/elderly-bpc-rejection-result.entity';
import { ElderlyBpcRejectionCompleteAnalysisNotFoundError } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/error/elderly-bpc-rejection-complete-analysis-not-found.error';
import { ElderlyBpcRejectionNotFoundError } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/error/elderly-bpc-rejection-not-found.error';
import { ElderlyBpcRejectionResultNotFoundError } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/error/elderly-bpc-rejection-result-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadElderlyBpcRejectionSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadElderlyBpcRejectionSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(ElderlyBpcRejectionQueryRepositoryGateway)
    private readonly elderlyBpcRejectionQueryRepositoryGateway: ElderlyBpcRejectionQueryRepositoryGateway,
    @Inject(ElderlyBpcRejectionResultCommandRepositoryGateway)
    private readonly elderlyBpcRejectionResultCommandRepositoryGateway: ElderlyBpcRejectionResultCommandRepositoryGateway,
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
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByElderlyBpcRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
      elderlyBpcRejectionId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      ElderlyBpcRejectionNotFoundError,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.ELDERLY_BPC_REJECTION_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.ELDERLY_BPC_REJECTION_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const rejection =
      await this.elderlyBpcRejectionQueryRepositoryGateway.findOneByElderlyBpcRejectionIdOrFailWithRelations(
        elderlyBpcRejectionId,
        ElderlyBpcRejectionNotFoundError,
      );

    const currentResult = rejection.elderlyBpcRejectionResult;

    if (currentResult === null) {
      throw new ElderlyBpcRejectionResultNotFoundError();
    }

    if (currentResult.completeAnalysis === null) {
      throw new ElderlyBpcRejectionCompleteAnalysisNotFoundError();
    }

    let responseAi = currentResult.simplifiedAnalysis;

    if (responseAi === null) {
      const simplifiedAnalysis =
        await this.analysisProcessorGateway.getElderlyBpcRejectionSimplifiedAnalysis(
          promptResponse.prompt,
          [Buffer.from(currentResult.completeAnalysis, 'utf-8')],
          currentResult.completeAnalysis,
        );

      const updatedResult = this.buildUpdatedResultEntity(
        currentResult,
        {
          simplifiedAnalysis,
        },
        elderlyBpcRejectionId,
      );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        this.elderlyBpcRejectionResultCommandRepositoryGateway.updateElderlyBpcRejectionResult(
          updatedResult,
        ),
      ]);

      await transaction.commit();

      responseAi = simplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new ElderlyBpcRejectionCompleteAnalysisNotFoundError();
    }

    const htmlContent =
      await this.exportDocumentGateway.convertMarkdownToHtml(responseAi);

    return this.exportDocumentGateway.downloadFileAsStreamable(
      htmlContent,
      format,
      'analise_simplificada_indeferimento_bpc_idoso',
    );
  }

  private buildUpdatedResultEntity(
    currentResult: ElderlyBpcRejectionResultEntity,
    overrides: {
      simplifiedAnalysis?: string | null;
    },
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
  ): ElderlyBpcRejectionResultEntity {
    return new ElderlyBpcRejectionResultEntity({
      id: currentResult.id,
      inssDecisionAnalysis: currentResult.inssDecisionAnalysis,
      completeAnalysis: currentResult.completeAnalysis,
      simplifiedAnalysis:
        overrides.simplifiedAnalysis ?? currentResult.simplifiedAnalysis,
      elderlyBpcRejectionId,
    });
  }
}
