import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { BpcDisabilityDenialQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/query/bpc-disability-denial.query.repository.gateway';
import { BpcDisabilityDenialResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-result/command/bpc-disability-denial-result.command.repository.gateway';
import { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import { BpcDisabilityDenialResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-result/bpc-disability-denial-result.entity';
import { BpcDisabilityDenialDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/bpc-disability-denial/error/bpc-disability-denial-does-not-contain-complete-analysis.error';
import { BpcDisabilityDenialDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/module/bpc-disability-denial/error/bpc-disability-denial-does-not-contain-simplified-analysis.error';
import { BpcDisabilityDenialNotFoundError } from '@module/customer/analysis-tool/module/bpc-disability-denial/error/bpc-disability-denial-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadBpcDisabilityDenialSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadBpcDisabilityDenialSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BpcDisabilityDenialQueryRepositoryGateway)
    private readonly bpcDisabilityDenialQueryRepositoryGateway: BpcDisabilityDenialQueryRepositoryGateway,
    @Inject(BpcDisabilityDenialResultCommandRepositoryGateway)
    private readonly bpcDisabilityDenialResultCommandRepositoryGateway: BpcDisabilityDenialResultCommandRepositoryGateway,
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
    bpcDisabilityDenialId: BpcDisabilityDenialId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcDisabilityDenialIdAndOrganizationIdAndAuthIdentityIdOrFail(
      bpcDisabilityDenialId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      BpcDisabilityDenialNotFoundError,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_DENIAL_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_DENIAL_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const bpcDisabilityDenialQueryResult =
      await this.bpcDisabilityDenialQueryRepositoryGateway.findOneByBpcDisabilityDenialIdAndOrganizationIdOrFail(
        bpcDisabilityDenialId,
        organizationSessionData.organizationId,
        BpcDisabilityDenialNotFoundError,
      );

    const bpcDisabilityDenialResult =
      bpcDisabilityDenialQueryResult.bpcDisabilityDenialResult;

    if (bpcDisabilityDenialResult === null) {
      throw new BpcDisabilityDenialDoesNotContainCompleteAnalysisError();
    }

    if (bpcDisabilityDenialResult.completeAnalysisDownload === null) {
      throw new BpcDisabilityDenialDoesNotContainCompleteAnalysisError();
    }

    let responseAi = bpcDisabilityDenialResult.simplifiedAnalysis;

    if (responseAi === null) {
      const simplifiedAnalysis =
        await this.analysisProcessorGateway.getBpcDisabilityDenialSimplifiedAnalysis(
          promptResponse.prompt,
          [
            Buffer.from(
              bpcDisabilityDenialResult.completeAnalysisDownload,
              'utf-8',
            ),
          ],
        );

      const updatedResultEntity = new BpcDisabilityDenialResultEntity({
        ...bpcDisabilityDenialResult,
        simplifiedAnalysis,
      });

      const updateResultTransaction =
        this.bpcDisabilityDenialResultCommandRepositoryGateway.updateBpcDisabilityDenialResult(
          bpcDisabilityDenialResult.id,
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
      throw new BpcDisabilityDenialDoesNotContainSimplifiedAnalysisError();
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_indeferimento_bpc_pcd',
    );
  }
}
