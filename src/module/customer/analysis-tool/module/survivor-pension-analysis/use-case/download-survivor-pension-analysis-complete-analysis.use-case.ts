import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { GetSurvivorPensionAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis/query/result/get-survivor-pension-analysis-with-relations.query.result';
import { SurvivorPensionAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis/query/survivor-pension-analysis.query.repository.gateway';
import { SurvivorPensionAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result/command/survivor-pension-analysis-result.command.repository.gateway';
import { SurvivorPensionAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result/query/survivor-pension-analysis-result.query.repository.gateway';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisResultEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/survivor-pension-analysis-result.entity';
import { SurvivorPensionAnalysisDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-does-not-contain-complete-analysis.error';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { SurvivorPensionAnalysisResultNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-result-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadSurvivorPensionAnalysisCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadSurvivorPensionAnalysisCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SurvivorPensionAnalysisQueryRepositoryGateway)
    private readonly survivorPensionAnalysisQueryRepositoryGateway: SurvivorPensionAnalysisQueryRepositoryGateway,
    @Inject(SurvivorPensionAnalysisResultQueryRepositoryGateway)
    private readonly survivorPensionAnalysisResultQueryRepositoryGateway: SurvivorPensionAnalysisResultQueryRepositoryGateway,
    @Inject(SurvivorPensionAnalysisResultCommandRepositoryGateway)
    private readonly survivorPensionAnalysisResultCommandRepositoryGateway: SurvivorPensionAnalysisResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
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

    const [promptResponse, spaData, existingResult] = await Promise.all([
      this.getPaymentPlanPaidResourcePromptUseCaseGateway.execute(
        PaymentPlanPaidResourceTypeEnum.SURVIVOR_PENSION_ANALYSIS_COMPLETE_ANALYSIS_TEXT,
      ),
      this.survivorPensionAnalysisQueryRepositoryGateway.findOneByIdOrFail(
        survivorPensionAnalysisId,
        SurvivorPensionAnalysisNotFoundError,
      ),
      this.survivorPensionAnalysisResultQueryRepositoryGateway.findOneBySurvivorPensionAnalysisId(
        survivorPensionAnalysisId,
      ),
    ]);

    if (existingResult === null) {
      throw new SurvivorPensionAnalysisResultNotFoundError();
    }

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCaseGateway.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.SURVIVOR_PENSION_ANALYSIS_COMPLETE_ANALYSIS_TEXT,
        organizationMember.id,
      );

    let completeAnalysis = existingResult.completeAnalysis;

    if (completeAnalysis === null) {
      const dataBuffer = this.buildAnalysisDataBuffer(spaData);
      const documentBuffers = await this.getDocumentBuffers(spaData);

      completeAnalysis =
        await this.analysisProcessorGateway.getSurvivorPensionAnalysisCompleteAnalysisText(
          promptResponse.prompt,
          [dataBuffer, ...documentBuffers],
        );

      if (completeAnalysis === null) {
        throw new SurvivorPensionAnalysisDoesNotContainCompleteAnalysisError();
      }

      const updatedResult = new SurvivorPensionAnalysisResultEntity({
        id: existingResult.id,
        survivorPensionAnalysisId,
        isInsuredStatusConfirmed: existingResult.isInsuredStatusConfirmed,
        insuredStatusSummary: existingResult.insuredStatusSummary,
        isRetirementRightConfirmed: existingResult.isRetirementRightConfirmed,
        retirementRightSummary: existingResult.retirementRightSummary,
        completeAnalysis,
        simplifiedAnalysis: existingResult.simplifiedAnalysis,
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
      completeAnalysis,
      format,
      'analise_completa_pensao_por_morte',
      exportOptions,
    );
  }

  private buildAnalysisDataBuffer(
    spaData: GetSurvivorPensionAnalysisWithRelationsQueryResult,
  ): Buffer {
    return Buffer.from(
      JSON.stringify({
        customerProfileIdentification: spaData.customerProfileIdentification
          ? {
              analysisName: spaData.customerProfileIdentification.analysisName,
              analysisPurpose:
                spaData.customerProfileIdentification.analysisPurpose,
              clientJobTitle:
                spaData.customerProfileIdentification.clientJobTitle,
              legalProceedingNumber:
                spaData.customerProfileIdentification.legalProceedingNumber,
              inssBenefitNumber:
                spaData.customerProfileIdentification.inssBenefitNumber,
            }
          : null,
        benefitOriginatorIdentification: spaData.benefitOriginatorIdentification
          ? {
              deathDate: spaData.benefitOriginatorIdentification.deathDate,
              federativeEntity:
                spaData.benefitOriginatorIdentification.federativeEntity,
              stateCode: spaData.benefitOriginatorIdentification.stateCode,
              beneficiaryWasRetired:
                spaData.benefitOriginatorIdentification.beneficiaryWasRetired,
            }
          : null,
        deceasedWorkHistory: spaData.deceasedWorkHistory
          ? {
              startDate: spaData.deceasedWorkHistory.startDate,
              endDate: spaData.deceasedWorkHistory.endDate,
              periods: spaData.deceasedWorkHistory.periods.map((p) => ({
                startDate: p.startDate,
                endDate: p.endDate,
                specialPeriodStartDate: p.specialPeriodStartDate,
                specialPeriodEndDate: p.specialPeriodEndDate,
                specialTimeType: p.specialTimeType,
                jobTitle: p.jobTitle,
                careerName: p.careerName,
                serviceType: p.serviceType,
                department: p.department,
              })),
            }
          : null,
        deceasedBenefitDependents: spaData.deceasedBenefitDependents.map(
          (d) => ({
            dependentFullName: d.dependentFullName,
            dependencyClassificationLevel: d.dependencyClassificationLevel,
            type: d.type,
            gender: d.gender,
            dateOfBirth: d.dateOfBirth,
            hasDisabilityOrInvalidity: d.hasDisabilityOrInvalidity,
            unionCommencementDate: d.unionCommencementDate,
          }),
        ),
        analysisResult: spaData.result
          ? {
              isInsuredStatusConfirmed: spaData.result.isInsuredStatusConfirmed,
              insuredStatusSummary: spaData.result.insuredStatusSummary,
              isRetirementRightConfirmed:
                spaData.result.isRetirementRightConfirmed,
              retirementRightSummary: spaData.result.retirementRightSummary,
              retirementRules: spaData.result.retirementRules.map((rr) => ({
                ruleName: rr.ruleName,
                isRequirementMet: rr.isRequirementMet,
                entitlementDate: rr.entitlementDate,
                estimatedRmi: rr.estimatedRmi,
                isBestRmi: rr.isBestRmi,
                isHighestClaimValue: rr.isHighestClaimValue,
                detailedAnalysis: rr.detailedAnalysis,
              })),
              dependentPensionAnalyses:
                spaData.result.dependentPensionAnalyses.map((dpa) => ({
                  dependentName: dpa.dependentName,
                  dependencyDegree: dpa.dependencyDegree,
                  isDependencyVerified: dpa.isDependencyVerified,
                  pensionStartDate: dpa.pensionStartDate,
                  estimatedPensionDuration: dpa.estimatedPensionDuration,
                })),
            }
          : null,
      }),
      'utf-8',
    );
  }

  private async getDocumentBuffers(
    spaData: GetSurvivorPensionAnalysisWithRelationsQueryResult,
  ): Promise<Buffer[]> {
    const fileNames: string[] = [
      ...(spaData.customerProfileIdentification?.documents.map(
        (d) => d.documentName,
      ) ?? []),
      ...(spaData.benefitOriginatorIdentification?.documents.map(
        (d) => d.documentName,
      ) ?? []),
      ...(spaData.deceasedWorkHistory?.periods.flatMap((p) =>
        p.documents.map((d) => d.documentName),
      ) ?? []),
      ...spaData.deceasedBenefitDependents.flatMap((dbd) =>
        dbd.documents.map((d) => d.documentName),
      ),
    ];

    return await Promise.all(
      fileNames.map((fileName) =>
        this.fileProcessorGateway.getFileBuffer(fileName),
      ),
    );
  }
}
