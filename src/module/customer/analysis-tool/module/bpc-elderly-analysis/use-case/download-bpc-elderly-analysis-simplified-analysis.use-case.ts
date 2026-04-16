import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { BpcElderlyAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/query/bpc-elderly-analysis.query.repository.gateway';
import { BpcElderlyAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-result/command/bpc-elderly-analysis-result.command.repository.gateway';
import { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';
import { BpcElderlyAnalysisResultEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-result/bpc-elderly-analysis-result.entity';
import { BpcElderlyAnalysisDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/error/bpc-elderly-analysis-does-not-contain-complete-analysis.error';
import { BpcElderlyAnalysisDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/error/bpc-elderly-analysis-does-not-contain-simplified-analysis.error';
import { BpcElderlyAnalysisNotFoundError } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/error/bpc-elderly-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadBpcElderlyAnalysisSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadBpcElderlyAnalysisSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BpcElderlyAnalysisQueryRepositoryGateway)
    private readonly bpcElderlyAnalysisQueryRepositoryGateway: BpcElderlyAnalysisQueryRepositoryGateway,
    @Inject(BpcElderlyAnalysisResultCommandRepositoryGateway)
    private readonly bpcElderlyAnalysisResultCommandRepositoryGateway: BpcElderlyAnalysisResultCommandRepositoryGateway,
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
    bpcElderlyAnalysisId: BpcElderlyAnalysisId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcElderlyAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      bpcElderlyAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      BpcElderlyAnalysisNotFoundError,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.BPC_ELDERLY_ANALYSIS_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.BPC_ELDERLY_ANALYSIS_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const bpcElderlyAnalysisQueryResult =
      await this.bpcElderlyAnalysisQueryRepositoryGateway.findOneByBpcElderlyAnalysisIdAndOrganizationIdOrFail(
        bpcElderlyAnalysisId,
        organizationSessionData.organizationId,
        BpcElderlyAnalysisNotFoundError,
      );

    const bpcElderlyAnalysisResult =
      bpcElderlyAnalysisQueryResult.bpcElderlyAnalysisResult;

    if (bpcElderlyAnalysisResult === null) {
      throw new BpcElderlyAnalysisDoesNotContainCompleteAnalysisError();
    }

    if (bpcElderlyAnalysisResult.completeAnalysisDownload === null) {
      throw new BpcElderlyAnalysisDoesNotContainCompleteAnalysisError();
    }

    let responseAi = bpcElderlyAnalysisResult.simplifiedAnalysis;

    if (responseAi === null) {
      const simplifiedAnalysis =
        await this.analysisProcessorGateway.getBpcElderlyAnalysisSimplifiedAnalysis(
          promptResponse.prompt,
          [
            Buffer.from(
              bpcElderlyAnalysisResult.completeAnalysisDownload,
              'utf-8',
            ),
          ],
        );

      const updatedResultEntity = new BpcElderlyAnalysisResultEntity({
        ...bpcElderlyAnalysisResult,
        simplifiedAnalysis,
      });

      const updateResultTransaction =
        this.bpcElderlyAnalysisResultCommandRepositoryGateway.updateBpcElderlyAnalysisResult(
          bpcElderlyAnalysisResult.id,
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
      throw new BpcElderlyAnalysisDoesNotContainSimplifiedAnalysisError();
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_bpc_idoso',
    );
  }
}
