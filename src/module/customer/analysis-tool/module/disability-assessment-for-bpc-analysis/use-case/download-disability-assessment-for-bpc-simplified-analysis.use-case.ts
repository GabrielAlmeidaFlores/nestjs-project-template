import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { DisabilityAssessmentForBpcAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/disability-assessment-for-bpc-analysis.query.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-result/command/disability-assessment-for-bpc-analysis-result.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/value-object/disability-assessment-for-bpc-analysis-id/disability-assessment-for-bpc-analysis-id.value-object';
import { DisabilityAssessmentForBpcAnalysisResultEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-result/disability-assessment-for-bpc-analysis-result.entity';
import { DisabilityAssessmentForBpcAnalysisDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/error/disability-assessment-for-bpc-analysis-does-not-contain-complete-analysis.error';
import { DisabilityAssessmentForBpcAnalysisDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/error/disability-assessment-for-bpc-analysis-does-not-contain-simplified-analysis.error';
import { DisabilityAssessmentForBpcAnalysisNotFoundError } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/error/disability-assessment-for-bpc-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadDisabilityAssessmentForBpcSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadDisabilityAssessmentForBpcSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityAssessmentForBpcAnalysisQueryRepositoryGateway)
    private readonly disabilityAssessmentForBpcAnalysisQueryRepositoryGateway: DisabilityAssessmentForBpcAnalysisQueryRepositoryGateway,
    @Inject(DisabilityAssessmentForBpcAnalysisResultCommandRepositoryGateway)
    private readonly disabilityAssessmentForBpcAnalysisResultCommandRepositoryGateway: DisabilityAssessmentForBpcAnalysisResultCommandRepositoryGateway,
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
    @Inject(OrganizationCustomizationExportDocumentOptionsResolver)
    private readonly organizationCustomizationExportDocumentOptionsResolver: OrganizationCustomizationExportDocumentOptionsResolver,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityAssessmentForBpcAnalysisId: DisabilityAssessmentForBpcAnalysisId,
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

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const disabilityAssessmentForBpcAnalysisQueryResult =
      await this.disabilityAssessmentForBpcAnalysisQueryRepositoryGateway.findOneByDisabilityAssessmentForBpcAnalysisIdAndOrganizationIdOrFail(
        disabilityAssessmentForBpcAnalysisId,
        organizationSessionData.organizationId,
        DisabilityAssessmentForBpcAnalysisNotFoundError,
      );

    if (
      !disabilityAssessmentForBpcAnalysisQueryResult.disabilityAssessmentForBpcAnalysisResult
    ) {
      throw new DisabilityAssessmentForBpcAnalysisDoesNotContainCompleteAnalysisError();
    }

    if (
      disabilityAssessmentForBpcAnalysisQueryResult
        .disabilityAssessmentForBpcAnalysisResult
        .disabilityAssessmentForBpcCompleteAnalysis === null
    ) {
      throw new DisabilityAssessmentForBpcAnalysisDoesNotContainCompleteAnalysisError();
    }

    let responseAi =
      disabilityAssessmentForBpcAnalysisQueryResult
        .disabilityAssessmentForBpcAnalysisResult
        .disabilityAssessmentForBpcSimplifiedAnalysis;

    if (responseAi === null) {
      const disabilityAssessmentSimplifiedAnalysis =
        await this.analysisProcessorGateway.getDisabilityAssessmentForBpcAnalysisSimplifiedAnalysis(
          promptResponse.prompt,
          [
            Buffer.from(
              disabilityAssessmentForBpcAnalysisQueryResult
                .disabilityAssessmentForBpcAnalysisResult
                .disabilityAssessmentForBpcCompleteAnalysis,
              'utf-8',
            ),
          ],
        );

      const disabilityAssessmentForBpcAnalysisResult =
        new DisabilityAssessmentForBpcAnalysisResultEntity({
          ...disabilityAssessmentForBpcAnalysisQueryResult.disabilityAssessmentForBpcAnalysisResult,
          disabilityAssessmentForBpcSimplifiedAnalysis:
            disabilityAssessmentSimplifiedAnalysis,
        });

      const disabilityAssessmentForBpcAnalysisResultTransaction =
        this.disabilityAssessmentForBpcAnalysisResultCommandRepositoryGateway.updateDisabilityAssessmentForBpcAnalysisResult(
          disabilityAssessmentForBpcAnalysisQueryResult
            .disabilityAssessmentForBpcAnalysisResult.id,
          disabilityAssessmentForBpcAnalysisResult,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        disabilityAssessmentForBpcAnalysisResultTransaction,
      ]);
      await transaction.commit();

      responseAi = disabilityAssessmentSimplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new DisabilityAssessmentForBpcAnalysisDoesNotContainSimplifiedAnalysisError();
    }

    const exportOptions =
      await this.organizationCustomizationExportDocumentOptionsResolver.execute(
        organizationSessionData.organizationId,
      );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_avaliacao_deficiencia_para_bpc',
      exportOptions,
    );
  }
}
