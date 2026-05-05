import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { SpecialRetirementRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-result/command/special-retirement-rejection-result.command.repository.gateway';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { SpecialRetirementRejectionResultEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-result/special-retirement-rejection-result.entity';
import { SpecialRetirementRejectionDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/special-retirement-rejection/error/special-retirement-rejection-does-not-contain-complete-analysis.error';
import { SpecialRetirementRejectionDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/module/special-retirement-rejection/error/special-retirement-rejection-does-not-contain-simplified-analysis.error';
import { SpecialRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-rejection/error/special-retirement-rejection-not-found.error';
import { SpecialRetirementRejectionResultNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-rejection/error/special-retirement-rejection-result-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadSpecialRetirementRejectionSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadSpecialRetirementRejectionSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SpecialRetirementRejectionResultCommandRepositoryGateway)
    private readonly specialRetirementRejectionResultCommandRepositoryGateway: SpecialRetirementRejectionResultCommandRepositoryGateway,
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
    specialRetirementRejectionId: SpecialRetirementRejectionId,
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

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialRetirementRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialRetirementRejectionId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialRetirementRejectionNotFoundError,
      );

    const specialRetirementRejection =
      analysisToolRecordQueryResult.specialRetirementRejection;

    if (specialRetirementRejection === null) {
      throw new SpecialRetirementRejectionNotFoundError();
    }

    const currentResult =
      specialRetirementRejection.specialRetirementRejectionResult;

    if (currentResult === null) {
      throw new SpecialRetirementRejectionResultNotFoundError();
    }

    if (currentResult.completeAnalysis === null) {
      throw new SpecialRetirementRejectionDoesNotContainCompleteAnalysisError();
    }

    let simplifiedAnalysis = currentResult.simplifiedAnalysis;

    if (simplifiedAnalysis === null) {
      const promptResponse =
        await this.getPaymentPlanPaidResourcePromptUseCase.execute(
          PaymentPlanPaidResourceTypeEnum.SPECIAL_RETIREMENT_REJECTION_SIMPLIFIED_ANALYSIS,
        );

      const consumeCreditTransaction =
        await this.consumeOrganizationCreditUseCase.execute(
          organizationSessionData.organizationId,
          PaymentPlanPaidResourceTypeEnum.SPECIAL_RETIREMENT_REJECTION_SIMPLIFIED_ANALYSIS,
          organizationMember.id,
        );

      simplifiedAnalysis =
        await this.analysisProcessorGateway.getSpecialRetirementRejectionSimplifiedAnalysis(
          promptResponse.prompt,
          [Buffer.from(currentResult.completeAnalysis, 'utf-8')],
        );

      if (simplifiedAnalysis === null) {
        throw new SpecialRetirementRejectionDoesNotContainSimplifiedAnalysisError();
      }

      const updatedResult = this.buildUpdatedResultEntity(
        currentResult,
        simplifiedAnalysis,
      );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        this.specialRetirementRejectionResultCommandRepositoryGateway.updateSpecialRetirementRejectionResult(
          updatedResult,
        ),
      ]);

      await transaction.commit();
    }

    const htmlContent =
      await this.exportDocumentGateway.convertMarkdownToHtml(
        simplifiedAnalysis,
      );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      htmlContent,
      format,
      'analise_simplificada_indeferimento_aposentadoria_especial',
    );
  }

  private buildUpdatedResultEntity(
    currentResult: SpecialRetirementRejectionResultEntity,
    simplifiedAnalysis: string,
  ): SpecialRetirementRejectionResultEntity {
    return new SpecialRetirementRejectionResultEntity({
      id: currentResult.id,
      firstAnalysis: currentResult.firstAnalysis,
      completeAnalysis: currentResult.completeAnalysis,
      simplifiedAnalysis,
      createdAt: currentResult.createdAt,
      updatedAt: currentResult.updatedAt,
      deletedAt: currentResult.deletedAt,
    });
  }
}
