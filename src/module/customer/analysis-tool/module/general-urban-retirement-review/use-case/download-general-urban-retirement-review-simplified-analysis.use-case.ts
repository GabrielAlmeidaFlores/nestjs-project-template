import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { GeneralUrbanRetirementReviewQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/query/general-urban-retirement-review.query.repository.gateway';
import { GeneralUrbanRetirementReviewResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-result/command/general-urban-retirement-review-result.command.repository.gateway';
import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { GeneralUrbanRetirementReviewResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/general-urban-retirement-review-result.entity';
import { GeneralUrbanRetirementReviewNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-not-found.error';
import { GeneralUrbanRetirementReviewSimplifiedAnalysisNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-simplified-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadGeneralUrbanRetirementReviewSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadGeneralUrbanRetirementReviewSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewQueryRepositoryGateway: GeneralUrbanRetirementReviewQueryRepositoryGateway,
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
    @Inject(GeneralUrbanRetirementReviewResultCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewResultCommandRepositoryGateway: GeneralUrbanRetirementReviewResultCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByGeneralUrbanRetirementReviewIdAndOrganizationIdAndAuthIdentityIdOrFail(
      generalUrbanRetirementReviewId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      GeneralUrbanRetirementReviewNotFoundError,
    );

    const generalUrbanRetirementReview =
      await this.generalUrbanRetirementReviewQueryRepositoryGateway.findOneByGeneralUrbanRetirementReviewIdOrFailWithRelations(
        generalUrbanRetirementReviewId,
        GeneralUrbanRetirementReviewNotFoundError,
      );

    const result =
      generalUrbanRetirementReview.generalUrbanRetirementReviewResult;

    if (!result) {
      throw new GeneralUrbanRetirementReviewNotFoundError();
    }

    if (result.generalUrbanRetirementReviewCompleteAnalysis === null) {
      throw new GeneralUrbanRetirementReviewNotFoundError();
    }

    let responseAi =
      result.generalUrbanRetirementReviewSimplifiedAnalysis ?? null;

    if (responseAi === null) {
      const promptResponse =
        await this.getPaymentPlanPaidResourcePromptUseCase.execute(
          PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_SIMPLIFIED_ANALYSIS,
        );

      const consumeCreditTransaction =
        await this.consumeOrganizationCreditUseCase.execute(
          organizationSessionData.organizationId,
          PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_SIMPLIFIED_ANALYSIS,
          organizationMember.id,
        );

      const completeAnalysisContentForPrompt =
        result.generalUrbanRetirementReviewCompleteAnalysisDownload ??
        result.generalUrbanRetirementReviewCompleteAnalysis;

      const generalUrbanRetirementReviewSimplifiedAnalysis =
        await this.analysisProcessorGateway.getGeneralUrbanRetirementSimplifiedAnalysis(
          promptResponse.prompt,
          [Buffer.from(completeAnalysisContentForPrompt, 'utf-8')],
        );

      const generalUrbanRetirementReviewResult =
        new GeneralUrbanRetirementReviewResultEntity({
          ...result,
          generalUrbanRetirementReviewSimplifiedAnalysis,
        });

      const updateGeneralUrbanRetirementReviewResultTransaction =
        this.generalUrbanRetirementReviewResultCommandRepositoryGateway.updateGeneralUrbanRetirementReviewResult(
          result.id,
          generalUrbanRetirementReviewResult,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        updateGeneralUrbanRetirementReviewResultTransaction,
      ]);

      await transaction.commit();
      responseAi = generalUrbanRetirementReviewSimplifiedAnalysis;
    }

    if (responseAi === null || responseAi === '') {
      throw new GeneralUrbanRetirementReviewSimplifiedAnalysisNotFoundError();
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_revisao_aposentadoria_urbana_geral',
    );
  }
}
