import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { BpcDisabilityGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/query/bpc-disability-grant.query.repository.gateway';
import { BpcDisabilityGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-result/command/bpc-disability-grant-result.command.repository.gateway';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import { BpcDisabilityGrantResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-result/bpc-disability-grant-result.entity';
import { BpcDisabilityGrantDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/bpc-disability-grant/error/bpc-disability-grant-does-not-contain-complete-analysis.error';
import { BpcDisabilityGrantDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/module/bpc-disability-grant/error/bpc-disability-grant-does-not-contain-simplified-analysis.error';
import { BpcDisabilityGrantNotFoundError } from '@module/customer/analysis-tool/module/bpc-disability-grant/error/bpc-disability-grant-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadBpcDisabilityGrantSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadBpcDisabilityGrantSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BpcDisabilityGrantQueryRepositoryGateway)
    private readonly bpcDisabilityGrantQueryRepositoryGateway: BpcDisabilityGrantQueryRepositoryGateway,
    @Inject(BpcDisabilityGrantResultCommandRepositoryGateway)
    private readonly bpcDisabilityGrantResultCommandRepositoryGateway: BpcDisabilityGrantResultCommandRepositoryGateway,
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
    bpcDisabilityGrantId: BpcDisabilityGrantId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcDisabilityGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
      bpcDisabilityGrantId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      BpcDisabilityGrantNotFoundError,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_GRANT_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_GRANT_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const bpcDisabilityGrantQueryResult =
      await this.bpcDisabilityGrantQueryRepositoryGateway.findOneByBpcDisabilityGrantIdAndOrganizationIdOrFail(
        bpcDisabilityGrantId,
        organizationSessionData.organizationId,
        BpcDisabilityGrantNotFoundError,
      );

    const bpcDisabilityGrantResult =
      bpcDisabilityGrantQueryResult.BpcDisabilityGrantResult;

    if (bpcDisabilityGrantResult === null) {
      throw new BpcDisabilityGrantDoesNotContainCompleteAnalysisError();
    }

    const completeAnalysis = this.extractAnalysisResult(
      bpcDisabilityGrantResult.completeAnalysis,
    );

    if (completeAnalysis === null) {
      throw new BpcDisabilityGrantDoesNotContainCompleteAnalysisError();
    }

    let responseAi = bpcDisabilityGrantResult.simplifiedAnalysis;

    if (responseAi === null) {
      const simplifiedAnalysis =
        await this.analysisProcessorGateway.getBpcDisabilityGrantSimplifiedAnalysis(
          promptResponse.prompt,
          [Buffer.from(completeAnalysis, 'utf-8')],
        );

      const updatedResultEntity = new BpcDisabilityGrantResultEntity({
        ...bpcDisabilityGrantResult,
        simplifiedAnalysis,
      });

      const updateResultTransaction =
        this.bpcDisabilityGrantResultCommandRepositoryGateway.updateBpcDisabilityGrantResult(
          bpcDisabilityGrantResult.id,
          updatedResultEntity,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        updateResultTransaction,
      ]);
      await transaction.commit();

      responseAi = simplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new BpcDisabilityGrantDoesNotContainSimplifiedAnalysisError();
    }

    const htmlContent =
      await this.exportDocumentGateway.convertMarkdownToHtml(responseAi);

    return this.exportDocumentGateway.downloadFileAsStreamable(
      htmlContent,
      format,
      'analise_simplificada_indeferimento_bpc_pcd',
    );
  }

  private extractAnalysisResult(raw: string | null): string | null {
    if (raw === null) {
      return null;
    }

    try {
      const parsed: unknown = JSON.parse(raw);

      if (typeof parsed !== 'object' || parsed === null) {
        return null;
      }

      const analysisResult = (parsed as Record<string, unknown>)[
        'analysisResult'
      ];

      return typeof analysisResult === 'string' ? analysisResult : null;
    } catch {
      return null;
    }
  }
}
