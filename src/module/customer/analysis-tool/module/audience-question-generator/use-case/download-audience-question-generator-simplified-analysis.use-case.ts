import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { AudienceQuestionGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/query/audience-question-generator.query.repository.gateway';
import { AudienceQuestionGeneratorResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-result/command/audience-question-generator-result.command.repository.gateway';
import { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';
import { AudienceQuestionGeneratorResultEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-result/audience-question-generator-result.entity';
import { AudienceQuestionGeneratorDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/audience-question-generator/error/audience-question-generator-does-not-contain-complete-analysis.error';
import { AudienceQuestionGeneratorDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/module/audience-question-generator/error/audience-question-generator-does-not-contain-simplified-analysis.error';
import { AudienceQuestionGeneratorNotFoundError } from '@module/customer/analysis-tool/module/audience-question-generator/error/audience-question-generator-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadAudienceQuestionGeneratorSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadAudienceQuestionGeneratorSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AudienceQuestionGeneratorQueryRepositoryGateway)
    private readonly audienceQuestionGeneratorQueryRepositoryGateway: AudienceQuestionGeneratorQueryRepositoryGateway,
    @Inject(AudienceQuestionGeneratorResultCommandRepositoryGateway)
    private readonly audienceQuestionGeneratorResultCommandRepositoryGateway: AudienceQuestionGeneratorResultCommandRepositoryGateway,
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
    audienceQuestionGeneratorId: AudienceQuestionGeneratorId,
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
        PaymentPlanPaidResourceTypeEnum.AUDIENCE_QUESTIONS_GENERATOR_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.AUDIENCE_QUESTIONS_GENERATOR_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const audienceQuestionGeneratorQueryResult =
      await this.audienceQuestionGeneratorQueryRepositoryGateway.findOneByAudienceQuestionGeneratorIdAndOrganizationIdOrFail(
        audienceQuestionGeneratorId,
        organizationSessionData.organizationId,
        AudienceQuestionGeneratorNotFoundError,
      );

    if (!audienceQuestionGeneratorQueryResult.audienceQuestionGeneratorResult) {
      throw new AudienceQuestionGeneratorDoesNotContainCompleteAnalysisError();
    }

    if (
      audienceQuestionGeneratorQueryResult.audienceQuestionGeneratorResult
        .audienceQuestionGeneratorCompleteAnalysis === null
    ) {
      throw new AudienceQuestionGeneratorDoesNotContainCompleteAnalysisError();
    }

    let responseAi =
      audienceQuestionGeneratorQueryResult.audienceQuestionGeneratorResult
        .audienceQuestionGeneratorSimplifiedAnalysis;

    if (responseAi === null) {
      const completeAnalysisBuffer = Buffer.from(
        audienceQuestionGeneratorQueryResult.audienceQuestionGeneratorResult
          .audienceQuestionGeneratorCompleteAnalysis,
        'utf-8',
      );

      const audienceQuestionSimplifiedAnalysis =
        await this.analysisProcessorGateway.getAudienceQuestionGeneratorSimplifiedAnalysis(
          promptResponse.prompt,
          [completeAnalysisBuffer],
        );

      const audienceQuestionGeneratorResult =
        new AudienceQuestionGeneratorResultEntity({
          id: audienceQuestionGeneratorQueryResult
            .audienceQuestionGeneratorResult.id,
          audienceQuestionGeneratorCompleteAnalysis:
            audienceQuestionGeneratorQueryResult.audienceQuestionGeneratorResult
              .audienceQuestionGeneratorCompleteAnalysis,
          audienceQuestionGeneratorSimplifiedAnalysis:
            audienceQuestionSimplifiedAnalysis,
        });

      const updateAudienceQuestionGeneratorResultTransaction =
        this.audienceQuestionGeneratorResultCommandRepositoryGateway.updateAudienceQuestionGeneratorResult(
          audienceQuestionGeneratorResult.id,
          audienceQuestionGeneratorResult,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        updateAudienceQuestionGeneratorResultTransaction,
      ]);
      await transaction.commit();

      responseAi = audienceQuestionSimplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new AudienceQuestionGeneratorDoesNotContainSimplifiedAnalysisError();
    }

    const exportOptions =
      await this.organizationCustomizationExportDocumentOptionsResolver.execute(
        organizationSessionData.organizationId,
      );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_gerador_perguntas_audiencia',
      exportOptions,
    );
  }
}
