import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { SurvivorPensionAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result/command/survivor-pension-analysis-result.command.repository.gateway';
import { SurvivorPensionAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result/query/survivor-pension-analysis-result.query.repository.gateway';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisResultEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/survivor-pension-analysis-result.entity';
import { SurvivorPensionAnalysisDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-does-not-contain-complete-analysis.error';
import { SurvivorPensionAnalysisDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-does-not-contain-simplified-analysis.error';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { SurvivorPensionAnalysisResultNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-result-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadSurvivorPensionAnalysisSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadSurvivorPensionAnalysisSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SurvivorPensionAnalysisResultQueryRepositoryGateway)
    private readonly survivorPensionAnalysisResultQueryRepositoryGateway: SurvivorPensionAnalysisResultQueryRepositoryGateway,
    @Inject(SurvivorPensionAnalysisResultCommandRepositoryGateway)
    private readonly survivorPensionAnalysisResultCommandRepositoryGateway: SurvivorPensionAnalysisResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCaseGateway: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCaseGateway: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(OrganizationCustomizationExportDocumentOptionsResolver)
    private readonly organizationCustomizationExportDocumentOptionsResolver: OrganizationCustomizationExportDocumentOptionsResolver,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      survivorPensionAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SurvivorPensionAnalysisNotFoundError,
    );

    const [promptResponse, existingResult] = await Promise.all([
      this.getPaymentPlanPaidResourcePromptUseCaseGateway.execute(
        PaymentPlanPaidResourceTypeEnum.SURVIVOR_PENSION_ANALYSIS_SIMPLIFIED_ANALYSIS_TEXT,
      ),
      this.survivorPensionAnalysisResultQueryRepositoryGateway.findOneBySurvivorPensionAnalysisId(
        survivorPensionAnalysisId,
      ),
    ]);

    if (existingResult === null) {
      throw new SurvivorPensionAnalysisResultNotFoundError();
    }

    if (existingResult.completeAnalysis === null) {
      throw new SurvivorPensionAnalysisDoesNotContainCompleteAnalysisError();
    }

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCaseGateway.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.SURVIVOR_PENSION_ANALYSIS_SIMPLIFIED_ANALYSIS_TEXT,
        organizationMember.id,
      );

    let simplifiedAnalysis = existingResult.simplifiedAnalysis;

    if (simplifiedAnalysis === null) {
      simplifiedAnalysis =
        await this.analysisProcessorGateway.getSurvivorPensionAnalysisSimplifiedAnalysisText(
          promptResponse.prompt,
          [Buffer.from(existingResult.completeAnalysis, 'utf-8')],
        );

      if (simplifiedAnalysis === null) {
        throw new SurvivorPensionAnalysisDoesNotContainSimplifiedAnalysisError();
      }

      const updatedResult = new SurvivorPensionAnalysisResultEntity({
        id: existingResult.id,
        survivorPensionAnalysisId,
        isInsuredStatusConfirmed: existingResult.isInsuredStatusConfirmed,
        insuredStatusSummary: existingResult.insuredStatusSummary,
        isRetirementRightConfirmed: existingResult.isRetirementRightConfirmed,
        retirementRightSummary: existingResult.retirementRightSummary,
        completeAnalysis: existingResult.completeAnalysis,
        simplifiedAnalysis,
      });

      const updateTransaction =
        this.survivorPensionAnalysisResultCommandRepositoryGateway.updateSurvivorPensionAnalysisResult(
          existingResult.id,
          updatedResult,
        );

      const txn = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        updateTransaction,
      ]);

      await txn.commit();
    } else {
      const txn = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
      ]);

      await txn.commit();
    }

    const exportOptions =
      await this.organizationCustomizationExportDocumentOptionsResolver.execute(
        organizationSessionData.organizationId,
      );

    return await this.exportDocumentGateway.downloadFileAsStreamable(
      simplifiedAnalysis,
      format,
      'analise_simplificada_pensao_por_morte',
      exportOptions,
    );
  }
}
