import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated/query/temporary-disability-benefits-terminated.query.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-result/command/temporary-disability-benefits-terminated-result.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedResultEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-result/temporary-disability-benefits-terminated-result.entity';
import { TemporaryDisabilityBenefitsTerminatedResultId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-result/value-object/temporary-disability-benefits-terminated-result-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedCompleteAnalysisDownloadNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/temporary-disability-benefits-terminated-complete-analysis-download-not-found.error';
import { TemporaryDisabilityBenefitsTerminatedNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/temporary-disability-benefits-terminated-not-found.error';
import { TemporaryDisabilityBenefitsTerminatedSimplifiedAnalysisNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/temporary-disability-benefits-terminated-simplified-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateTemporaryDisabilityBenefitsTerminatedSimplifiedAnalysisDownloadUseCase {
  protected readonly _type =
    CreateTemporaryDisabilityBenefitsTerminatedSimplifiedAnalysisDownloadUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway)
    private readonly temporaryDisabilityBenefitsTerminatedQueryRepositoryGateway: TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsTerminatedResultCommandRepositoryGateway)
    private readonly temporaryDisabilityBenefitsTerminatedResultCommandRepositoryGateway: TemporaryDisabilityBenefitsTerminatedResultCommandRepositoryGateway,
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
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByTemporaryDisabilityBenefitsTerminatedIdAndOrganizationIdAndAuthIdentityIdOrFail(
      temporaryDisabilityBenefitsTerminatedId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      TemporaryDisabilityBenefitsTerminatedNotFoundError,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_DISABILITY_BENEFITS_TERMINATED_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_DISABILITY_BENEFITS_TERMINATED_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const analysisQueryResult =
      await this.temporaryDisabilityBenefitsTerminatedQueryRepositoryGateway.findOneByTemporaryDisabilityBenefitsTerminatedIdOrFailWithRelations(
        temporaryDisabilityBenefitsTerminatedId,
        TemporaryDisabilityBenefitsTerminatedNotFoundError,
      );

    const temporaryDisabilityBenefitsTerminatedResult =
      analysisQueryResult.result;

    if (temporaryDisabilityBenefitsTerminatedResult === null) {
      throw new TemporaryDisabilityBenefitsTerminatedCompleteAnalysisDownloadNotFoundError();
    }

    if (temporaryDisabilityBenefitsTerminatedResult.completeAnalysis === null) {
      throw new TemporaryDisabilityBenefitsTerminatedCompleteAnalysisDownloadNotFoundError();
    }

    let responseAi =
      temporaryDisabilityBenefitsTerminatedResult.simplifiedAnalysis;

    if (responseAi === null) {
      const simplifiedAnalysis =
        await this.analysisProcessorGateway.getTemporaryDisabilityBenefitsTerminatedSimplifiedAnalysis(
          promptResponse.prompt,
          [
            Buffer.from(
              temporaryDisabilityBenefitsTerminatedResult.completeAnalysis,
              'utf-8',
            ),
          ],
        );

      const updatedResultEntity =
        new TemporaryDisabilityBenefitsTerminatedResultEntity({
          ...temporaryDisabilityBenefitsTerminatedResult,
          id: new TemporaryDisabilityBenefitsTerminatedResultId(
            temporaryDisabilityBenefitsTerminatedResult.id,
          ),
          simplifiedAnalysis,
        });

      const updateResultTransaction =
        this.temporaryDisabilityBenefitsTerminatedResultCommandRepositoryGateway.updateTemporaryDisabilityBenefitsTerminatedResult(
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
      throw new TemporaryDisabilityBenefitsTerminatedSimplifiedAnalysisNotFoundError();
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_indeferimento_auxilio_incapacidade_temporaria',
    );
  }
}
