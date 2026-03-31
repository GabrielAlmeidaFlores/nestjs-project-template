import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { InsuranceQualityAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis/command/insurance-quality-analysis.command.repository.gateway';
import { InsuranceQualityAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis/query/insurance-quality-analysis.query.repository.gateway';
import { GetInsuranceQualityAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis/query/result/get-insurance-quality-analysis-document.query.result';
import { InsuranceQualityAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-result/command/insurance-quality-analysis-result.command.repository.gateway';
import { InsuranceQualityAnalysisEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/insurance-quality-analysis.entity';
import { InsuranceQualityAnalysisId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/value-object/insurance-quality-analysis-id/insurance-quality-analysis-id.value-object';
import { InsuranceQualityAnalysisResultEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-result/insurance-quality-analysis-result.entity';
import { InsuranceQualityAnalysisDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/insurance-quality-analysis/error/insurance-quality-analysis-does-not-contain-complete-analysis.error';
import { InsuranceQualityAnalysisNotFoundError } from '@module/customer/analysis-tool/module/insurance-quality-analysis/error/insurance-quality-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadInsuranceQualityAnalysisCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadInsuranceQualityAnalysisCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(InsuranceQualityAnalysisQueryRepositoryGateway)
    private readonly insuranceQualityAnalysisQueryRepositoryGateway: InsuranceQualityAnalysisQueryRepositoryGateway,
    @Inject(InsuranceQualityAnalysisResultCommandRepositoryGateway)
    private readonly insuranceQualityAnalysisResultCommandRepositoryGateway: InsuranceQualityAnalysisResultCommandRepositoryGateway,
    @Inject(InsuranceQualityAnalysisCommandRepositoryGateway)
    private readonly insuranceQualityAnalysisCommandRepositoryGateway: InsuranceQualityAnalysisCommandRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
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
    insuranceQualityAnalysisId: InsuranceQualityAnalysisId,
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
        PaymentPlanPaidResourceTypeEnum.INSURANCE_QUALITY_ANALYSIS_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.INSURANCE_QUALITY_ANALYSIS_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByInsuranceQualityAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        insuranceQualityAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        InsuranceQualityAnalysisNotFoundError,
      );

    const insuranceQualityAnalysisQueryResult =
      await this.insuranceQualityAnalysisQueryRepositoryGateway.findOneByIdOrFail(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        insuranceQualityAnalysisId,
        InsuranceQualityAnalysisNotFoundError,
      );

    let analysisSummary =
      insuranceQualityAnalysisQueryResult.insuranceQualityAnalysisResult
        ?.analysisSummary ?? null;

    if (analysisSummary === null) {
      const clientDataBuffer = Buffer.from(
        JSON.stringify(
          analysisToolRecordQueryResult.analysisToolClient,
          null,
          2,
        ),
        'utf-8',
      );

      const documentBuffers = await this.getAnalysisDocumentBuffers(
        insuranceQualityAnalysisQueryResult.insuranceQualityAnalysisDocument,
      );

      analysisSummary =
        await this.analysisProcessorGateway.getInsuranceQualityAnalysisCompleteAnalysis(
          promptResponse.prompt,
          [clientDataBuffer, ...documentBuffers],
        );

      if (analysisSummary === null) {
        throw new InsuranceQualityAnalysisDoesNotContainCompleteAnalysisError();
      }

      const insuranceQualityAnalysisResult =
        insuranceQualityAnalysisQueryResult.insuranceQualityAnalysisResult !==
        null
          ? new InsuranceQualityAnalysisResultEntity({
              ...insuranceQualityAnalysisQueryResult.insuranceQualityAnalysisResult,
              insuranceQualityConclusion: analysisSummary,
              analysisSummary,
            })
          : new InsuranceQualityAnalysisResultEntity({
              insuranceQualityConclusion: analysisSummary,
              gracePeriodConclusion: null,
              finalRecommendation: null,
              analysisSummary,
            });

      const insuranceQualityAnalysis = new InsuranceQualityAnalysisEntity({
        id: insuranceQualityAnalysisId,
        analysisToolClientId:
          analysisToolRecordQueryResult.analysisToolClient.id,
        createdAt: insuranceQualityAnalysisQueryResult.createdAt,
        updatedAt: insuranceQualityAnalysisQueryResult.updatedAt,
        analysisBenefitNumber:
          insuranceQualityAnalysisQueryResult.analysisBenefitNumber,
        analysisBenefitType:
          insuranceQualityAnalysisQueryResult.analysisBenefitType,
        analysisBenefitConcessionDate:
          insuranceQualityAnalysisQueryResult.analysisBenefitConcessionDate,
        analysisBenefitCessationDate:
          insuranceQualityAnalysisQueryResult.analysisBenefitCessationDate,
        analysisHasPreviousBenefit:
          insuranceQualityAnalysisQueryResult.analysisHasPreviousBenefit,
        analysisPreviousBenefitDetails:
          insuranceQualityAnalysisQueryResult.analysisPreviousBenefitDetails,
        analysisContributionSituation:
          insuranceQualityAnalysisQueryResult.analysisContributionSituation,
        analysisHasRuralActivity:
          insuranceQualityAnalysisQueryResult.analysisHasRuralActivity,
        analysisRuralActivityDetails:
          insuranceQualityAnalysisQueryResult.analysisRuralActivityDetails,
        insuranceQualityAnalysisResult,
      });

      const analysisToolClient = new AnalysisToolClientEntity({
        ...analysisToolRecordQueryResult.analysisToolClient,
        createdBy:
          analysisToolRecordQueryResult.analysisToolClient.createdBy.id,
        updatedBy:
          analysisToolRecordQueryResult.analysisToolClient.updatedBy.id,
      });

      const analysisToolRecord = new AnalysisToolRecordEntity({
        id: analysisToolRecordQueryResult.id,
        code: analysisToolRecordQueryResult.code,
        type: analysisToolRecordQueryResult.type,
        status: AnalysisStatusEnum.COMPLETED,
        analysisToolClient,
        insuranceQualityAnalysis,
        createdBy: analysisToolRecordQueryResult.createdBy.id,
        updatedBy: organizationMember.id,
        cnisFastAnalysis: null,
        retirementPlanningRpps: null,
        retirementPlanningRgps: null,
        administrativeProcedureInssAnalysis: null,
        judicialCaseAnalysis: null,
        medicalQuestionGenerator: null,
        medicalAndSocialReportObjectionGeneratorAnalysis: null,
        specialActivity: null,
        speechGenerator: null,
        disabilityAssessmentForBpcAnalysis: null,
        ruralTimelineAnalysis: null,
        perCapitaIncomeForBpcAnalysis: null,
      });

      const saveResultTransaction =
        insuranceQualityAnalysisQueryResult.insuranceQualityAnalysisResult ===
        null
          ? this.insuranceQualityAnalysisResultCommandRepositoryGateway.createInsuranceQualityAnalysisResult(
              insuranceQualityAnalysisResult,
            )
          : this.insuranceQualityAnalysisResultCommandRepositoryGateway.updateInsuranceQualityAnalysisResult(
              insuranceQualityAnalysisQueryResult.insuranceQualityAnalysisResult
                .id,
              insuranceQualityAnalysisResult,
            );

      const updateInsuranceQualityAnalysisTransaction =
        this.insuranceQualityAnalysisCommandRepositoryGateway.updateInsuranceQualityAnalysis(
          insuranceQualityAnalysis.id,
          insuranceQualityAnalysis,
        );

      const updateAnalysisToolRecordTransaction =
        this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
          analysisToolRecord.id,
          analysisToolRecord,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        saveResultTransaction,
        updateInsuranceQualityAnalysisTransaction,
        updateAnalysisToolRecordTransaction,
      ]);

      await transaction.commit();
    } else {
      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
      ]);
      await transaction.commit();
    }

    const exportOptions =
      await this.organizationCustomizationExportDocumentOptionsResolver.execute(
        organizationSessionData.organizationId,
      );

    return await this.exportDocumentGateway.downloadFileAsStreamable(
      analysisSummary,
      format,
      'analise_completa_qualidade_segurado',
      exportOptions,
    );
  }

  private async getAnalysisDocumentBuffers(
    documents: GetInsuranceQualityAnalysisDocumentQueryResult[],
  ): Promise<Buffer[]> {
    return await Promise.all(
      documents.map(async (document) => {
        return await this.fileProcessorGateway.getFileBuffer(document.document);
      }),
    );
  }
}
