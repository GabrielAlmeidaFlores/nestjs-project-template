import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/medical-and-social-report-objection-generator-analysis.query.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis-result/command/medical-and-social-report-objection-generator-analysis-result.command.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/value-object/medical-and-social-report-objection-generator-analysis-id/medical-and-social-report-objection-generator-analysis-id.value-object';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-result/medical-and-social-report-objection-generator-analysis-result.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/error/medical-and-social-report-objection-generator-analysis-does-not-contain-complete-analysis.error';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/error/medical-and-social-report-objection-generator-analysis-does-not-contain-simplified-analysis.error';
import { MedicalAndSocialReportObjectionGeneratorAnalysisNotFoundError } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/error/medical-and-social-report-objection-generator-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadMedicalAndSocialReportObjectionGeneratorSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadMedicalAndSocialReportObjectionGeneratorSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(
      MedicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway,
    )
    private readonly medicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway: MedicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway,
    @Inject(
      MedicalAndSocialReportObjectionGeneratorAnalysisResultCommandRepositoryGateway,
    )
    private readonly medicalAndSocialReportObjectionGeneratorAnalysisResultCommandRepositoryGateway: MedicalAndSocialReportObjectionGeneratorAnalysisResultCommandRepositoryGateway,
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
    medicalAndSocialReportObjectionGeneratorAnalysisId: MedicalAndSocialReportObjectionGeneratorAnalysisId,
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
        PaymentPlanPaidResourceTypeEnum.MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const medicalAndSocialReportObjectionGeneratorAnalysisQueryResult =
      await this.medicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway.findOneByMedicalAndSocialReportObjectionGeneratorAnalysisIdAndOrganizationIdOrFail(
        medicalAndSocialReportObjectionGeneratorAnalysisId,
        organizationSessionData.organizationId,
        MedicalAndSocialReportObjectionGeneratorAnalysisNotFoundError,
      );

    if (
      !medicalAndSocialReportObjectionGeneratorAnalysisQueryResult.medicalAndSocialReportObjectionGeneratorAnalysisResult
    ) {
      throw new MedicalAndSocialReportObjectionGeneratorAnalysisDoesNotContainCompleteAnalysisError();
    }

    if (
      medicalAndSocialReportObjectionGeneratorAnalysisQueryResult
        .medicalAndSocialReportObjectionGeneratorAnalysisResult
        .medicalAndSocialReportObjectionGeneratorCompleteAnalysis === null
    ) {
      throw new MedicalAndSocialReportObjectionGeneratorAnalysisDoesNotContainCompleteAnalysisError();
    }

    let responseAi =
      medicalAndSocialReportObjectionGeneratorAnalysisQueryResult
        .medicalAndSocialReportObjectionGeneratorAnalysisResult
        .medicalAndSocialReportObjectionGeneratorSimplifiedAnalysis;

    if (responseAi === null) {
      const medicalAndSocialReportObjectionGeneratorSimplifiedAnalysis =
        await this.analysisProcessorGateway.getMedicalAndSocialReportObjectionGeneratorAnalysisSimplifiedAnalysis(
          promptResponse.prompt,
          [
            Buffer.from(
              medicalAndSocialReportObjectionGeneratorAnalysisQueryResult
                .medicalAndSocialReportObjectionGeneratorAnalysisResult
                .medicalAndSocialReportObjectionGeneratorCompleteAnalysis,
              'utf-8',
            ),
          ],
        );

      const medicalAndSocialReportObjectionGeneratorAnalysisResult =
        new MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity({
          ...medicalAndSocialReportObjectionGeneratorAnalysisQueryResult.medicalAndSocialReportObjectionGeneratorAnalysisResult,
          medicalAndSocialReportObjectionGeneratorSimplifiedAnalysis:
            medicalAndSocialReportObjectionGeneratorSimplifiedAnalysis,
        });

      const medicalAndSocialReportObjectionGeneratorAnalysisResultTransaction =
        this.medicalAndSocialReportObjectionGeneratorAnalysisResultCommandRepositoryGateway.updateMedicalAndSocialReportObjectionGeneratorAnalysisResult(
          medicalAndSocialReportObjectionGeneratorAnalysisQueryResult
            .medicalAndSocialReportObjectionGeneratorAnalysisResult.id,
          medicalAndSocialReportObjectionGeneratorAnalysisResult,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        medicalAndSocialReportObjectionGeneratorAnalysisResultTransaction,
      ]);
      await transaction.commit();

      responseAi = medicalAndSocialReportObjectionGeneratorSimplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new MedicalAndSocialReportObjectionGeneratorAnalysisDoesNotContainSimplifiedAnalysisError();
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_geradora_objeção_laudo_medico_social',
    );
  }
}
