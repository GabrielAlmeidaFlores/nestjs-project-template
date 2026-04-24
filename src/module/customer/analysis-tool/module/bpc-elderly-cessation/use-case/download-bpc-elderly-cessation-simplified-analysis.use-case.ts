import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { BpcElderlyCessationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/query/bpc-elderly-cessation.query.repository.gateway';
import { BpcElderlyCessationResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-result/command/bpc-elderly-cessation-result.command.repository.gateway';
import { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import { BpcElderlyCessationResultEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-result/bpc-elderly-cessation-result.entity';
import { BpcElderlyCessationDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/error/bpc-elderly-cessation-does-not-contain-complete-analysis.error';
import { BpcElderlyCessationDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/error/bpc-elderly-cessation-does-not-contain-simplified-analysis.error';
import { BpcElderlyCessationNotFoundError } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/error/bpc-elderly-cessation-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadBpcElderlyCessationSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadBpcElderlyCessationSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BpcElderlyCessationQueryRepositoryGateway)
    private readonly bpcElderlyCessationQueryRepositoryGateway: BpcElderlyCessationQueryRepositoryGateway,
    @Inject(BpcElderlyCessationResultCommandRepositoryGateway)
    private readonly bpcElderlyCessationResultCommandRepositoryGateway: BpcElderlyCessationResultCommandRepositoryGateway,
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
    bpcElderlyCessationId: BpcElderlyCessationId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcElderlyCessationIdAndOrganizationIdAndAuthIdentityIdOrFail(
      bpcElderlyCessationId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      BpcElderlyCessationNotFoundError,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.BPC_ELDERLY_CESSATION_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.BPC_ELDERLY_CESSATION_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const bpcElderlyCessationQueryResult =
      await this.bpcElderlyCessationQueryRepositoryGateway.findOneByBpcElderlyCessationIdAndOrganizationIdOrFail(
        bpcElderlyCessationId,
        organizationSessionData.organizationId,
        BpcElderlyCessationNotFoundError,
      );

    const bpcElderlyCessationResult =
      bpcElderlyCessationQueryResult.bpcElderlyCessationResult;

    if (bpcElderlyCessationResult === null) {
      throw new BpcElderlyCessationDoesNotContainCompleteAnalysisError();
    }

    if (bpcElderlyCessationResult.completeAnalysisDownload === null) {
      throw new BpcElderlyCessationDoesNotContainCompleteAnalysisError();
    }

    let responseAi = bpcElderlyCessationResult.simplifiedAnalysis;

    if (responseAi === null) {
      const simplifiedAnalysis =
        await this.analysisProcessorGateway.getBpcElderlyCessationSimplifiedAnalysis(
          promptResponse.prompt,
          [
            Buffer.from(
              bpcElderlyCessationResult.completeAnalysisDownload,
              'utf-8',
            ),
          ],
        );

      const updatedResultEntity = new BpcElderlyCessationResultEntity({
        ...bpcElderlyCessationResult,
        simplifiedAnalysis,
      });

      const updateResultTransaction =
        this.bpcElderlyCessationResultCommandRepositoryGateway.updateBpcElderlyCessationResult(
          bpcElderlyCessationResult.id,
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
      throw new BpcElderlyCessationDoesNotContainSimplifiedAnalysisError();
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_cessacao_bpc_idoso',
    );
  }
}
