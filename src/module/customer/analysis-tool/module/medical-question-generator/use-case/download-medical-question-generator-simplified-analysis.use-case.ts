import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { MedicalQuestionGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/medical-question-generator.query.repository.gateway';
import { MedicalQuestionGeneratorResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator-result/command/medical-question-generator-result.command.repository.gateway';
import { MedicalQuestionGeneratorId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/value-object/medical-question-generator-id/medical-question-generator-id.value-object';
import { MedicalQuestionGeneratorResultEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-result/medical-question-generator-result.entity';
import { MedicalQuestionGeneratorDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/medical-question-generator/error/medical-question-generator-does-not-contain-complete-analysis.error';
import { MedicalQuestionGeneratorDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/module/medical-question-generator/error/medical-question-generator-does-not-contain-simplified-analysis.error';
import { MedicalQuestionGeneratorNotFoundError } from '@module/customer/analysis-tool/module/medical-question-generator/error/medical-question-generator-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadMedicalQuestionGeneratorSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadMedicalQuestionGeneratorSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(MedicalQuestionGeneratorQueryRepositoryGateway)
    private readonly medicalQuestionGeneratorQueryRepositoryGateway: MedicalQuestionGeneratorQueryRepositoryGateway,
    @Inject(MedicalQuestionGeneratorResultCommandRepositoryGateway)
    private readonly medicalQuestionGeneratorResultCommandRepositoryGateway: MedicalQuestionGeneratorResultCommandRepositoryGateway,
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
    medicalQuestionGeneratorId: MedicalQuestionGeneratorId,
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
        PaymentPlanPaidResourceTypeEnum.MEDICAL_QUESTION_GENERATOR_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.MEDICAL_QUESTION_GENERATOR_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const medicalQuestionGeneratorQueryResult =
      await this.medicalQuestionGeneratorQueryRepositoryGateway.findOneByMedicalQuestionGeneratorIdAndOrganizationIdOrFail(
        medicalQuestionGeneratorId,
        organizationSessionData.organizationId,
        MedicalQuestionGeneratorNotFoundError,
      );

    if (!medicalQuestionGeneratorQueryResult.medicalQuestionGeneratorResult) {
      throw new MedicalQuestionGeneratorDoesNotContainCompleteAnalysisError();
    }

    if (
      medicalQuestionGeneratorQueryResult.medicalQuestionGeneratorResult
        .medicalQuestionGeneratorCompleteAnalysis === null
    ) {
      throw new MedicalQuestionGeneratorDoesNotContainCompleteAnalysisError();
    }

    let responseAi =
      medicalQuestionGeneratorQueryResult.medicalQuestionGeneratorResult
        .medicalQuestionGeneratorSimplifiedAnalysis;

    if (responseAi === null) {
      const medicalQuestionGeneratorSimplifiedAnalysis =
        await this.analysisProcessorGateway.getMedicalQuestionGeneratorSimplifiedAnalysis(
          promptResponse.prompt,
          [
            Buffer.from(
              medicalQuestionGeneratorQueryResult.medicalQuestionGeneratorResult
                .medicalQuestionGeneratorCompleteAnalysis,
              'utf-8',
            ),
          ],
        );

      const medicalQuestionGeneratorResult =
        new MedicalQuestionGeneratorResultEntity({
          ...medicalQuestionGeneratorQueryResult.medicalQuestionGeneratorResult,
          medicalQuestionGeneratorSimplifiedAnalysis:
            medicalQuestionGeneratorSimplifiedAnalysis,
        });

      const medicalQuestionGeneratorResultTransaction =
        this.medicalQuestionGeneratorResultCommandRepositoryGateway.updateMedicalQuestionGeneratorResult(
          medicalQuestionGeneratorQueryResult.medicalQuestionGeneratorResult.id,
          medicalQuestionGeneratorResult,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        medicalQuestionGeneratorResultTransaction,
      ]);
      await transaction.commit();

      responseAi = medicalQuestionGeneratorSimplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new MedicalQuestionGeneratorDoesNotContainSimplifiedAnalysisError();
    }

    const exportOptions =
      await this.organizationCustomizationExportDocumentOptionsResolver.execute(
        organizationSessionData.organizationId,
      );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_gerador_perguntas_medicas',
      exportOptions,
    );
  }
}
