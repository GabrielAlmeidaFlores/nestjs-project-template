import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { TemporaryDisabilityBenefitsGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant/query/temporary-disability-benefits-grant.query.repository.gateway';
import { TemporaryDisabilityBenefitsGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-result/command/temporary-disability-benefits-grant-result.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { TemporaryDisabilityBenefitsGrantResultEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-result/temporary-disability-benefits-grant-result.entity';
import { TemporaryDisabilityBenefitsGrantCompleteAnalysisDownloadNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/error/temporary-disability-benefits-grant-complete-analysis-download-not-found.error';
import { TemporaryDisabilityBenefitsGrantNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/error/temporary-disability-benefits-grant-not-found.error';
import { TemporaryDisabilityBenefitsGrantSimplifiedAnalysisNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/error/temporary-disability-benefits-grant-simplified-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadTemporaryDisabilityBenefitsGrantSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadTemporaryDisabilityBenefitsGrantSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsGrantQueryRepositoryGateway)
    private readonly temporaryDisabilityBenefitsGrantQueryRepositoryGateway: TemporaryDisabilityBenefitsGrantQueryRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsGrantResultCommandRepositoryGateway)
    private readonly temporaryDisabilityBenefitsGrantResultCommandRepositoryGateway: TemporaryDisabilityBenefitsGrantResultCommandRepositoryGateway,
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
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByTemporaryDisabilityBenefitsGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
      temporaryDisabilityBenefitsGrantId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      TemporaryDisabilityBenefitsGrantNotFoundError,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_DISABILITY_BENEFITS_GRANT_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_DISABILITY_BENEFITS_GRANT_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const analysisQueryResult =
      await this.temporaryDisabilityBenefitsGrantQueryRepositoryGateway.findOneByTemporaryDisabilityBenefitsGrantIdOrFailWithRelations(
        temporaryDisabilityBenefitsGrantId,
        TemporaryDisabilityBenefitsGrantNotFoundError,
      );

    const temporaryDisabilityBenefitsGrantResult =
      analysisQueryResult.temporaryDisabilityBenefitsGrantResult;

    if (temporaryDisabilityBenefitsGrantResult === null) {
      throw new TemporaryDisabilityBenefitsGrantCompleteAnalysisDownloadNotFoundError();
    }

    if (temporaryDisabilityBenefitsGrantResult.completeAnalysis === null) {
      throw new TemporaryDisabilityBenefitsGrantCompleteAnalysisDownloadNotFoundError();
    }

    let responseAi = temporaryDisabilityBenefitsGrantResult.simplifiedAnalysis;

    if (responseAi === null) {
      const simplifiedAnalysis =
        await this.analysisProcessorGateway.getTemporaryDisabilityBenefitsGrantSimplifiedAnalysis(
          promptResponse.prompt,
          [
            Buffer.from(
              temporaryDisabilityBenefitsGrantResult.completeAnalysis,
              'utf-8',
            ),
          ],
        );

      const updatedResultEntity =
        new TemporaryDisabilityBenefitsGrantResultEntity({
          ...temporaryDisabilityBenefitsGrantResult,
          simplifiedAnalysis,
        });

      const updateResultTransaction =
        this.temporaryDisabilityBenefitsGrantResultCommandRepositoryGateway.updateTemporaryDisabilityBenefitsGrantResult(
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
      throw new TemporaryDisabilityBenefitsGrantSimplifiedAnalysisNotFoundError();
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_concessao_auxilio_doenca',
    );
  }
}
