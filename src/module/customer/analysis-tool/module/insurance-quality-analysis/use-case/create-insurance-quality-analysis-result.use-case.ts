import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { InsuranceQualityAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis/command/insurance-quality-analysis.command.repository.gateway';
import { InsuranceQualityAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis/query/insurance-quality-analysis.query.repository.gateway';
import { GetInsuranceQualityAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis/query/result/get-insurance-quality-analysis-document.query.result';
import { InsuranceQualityAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-result/command/insurance-quality-analysis-result.command.repository.gateway';
import { InsuranceQualityAnalysisEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/insurance-quality-analysis.entity';
import { InsuranceQualityAnalysisId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/value-object/insurance-quality-analysis-id/insurance-quality-analysis-id.value-object';
import { InsuranceQualityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-document/enum/insurance-quality-analysis-document-type.enum';
import { InsuranceQualityAnalysisResultEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-result/insurance-quality-analysis-result.entity';
import { CreateInsuranceQualityAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/insurance-quality-analysis/dto/response/create-insurance-quality-analysis-result.response.dto';
import { InsuranceQualityAnalysisNotFoundError } from '@module/customer/analysis-tool/module/insurance-quality-analysis/error/insurance-quality-analysis-not-found.error';
import { InsuranceQualityAnalysisResultAlreadyExistsError } from '@module/customer/analysis-tool/module/insurance-quality-analysis/error/insurance-quality-analysis-result-already-exists.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateInsuranceQualityAnalysisResultUseCase {
  protected readonly _type = CreateInsuranceQualityAnalysisResultUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(InsuranceQualityAnalysisCommandRepositoryGateway)
    private readonly insuranceQualityAnalysisCommandRepositoryGateway: InsuranceQualityAnalysisCommandRepositoryGateway,
    @Inject(InsuranceQualityAnalysisQueryRepositoryGateway)
    private readonly insuranceQualityAnalysisQueryRepositoryGateway: InsuranceQualityAnalysisQueryRepositoryGateway,
    @Inject(InsuranceQualityAnalysisResultCommandRepositoryGateway)
    private readonly insuranceQualityAnalysisResultCommandRepositoryGateway: InsuranceQualityAnalysisResultCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    insuranceQualityAnalysisId: InsuranceQualityAnalysisId,
  ): Promise<CreateInsuranceQualityAnalysisResultResponseDto> {
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

    if (insuranceQualityAnalysisQueryResult.insuranceQualityAnalysisResult) {
      throw new InsuranceQualityAnalysisResultAlreadyExistsError();
    }

    const analysisData = {
      data_analise: new Date().toISOString(),
      client: analysisToolRecordQueryResult.analysisToolClient,
    };

    const analysisDataBuffer = Buffer.from(
      JSON.stringify(analysisData, null, 2),
      'utf-8',
    );

    const documentBuffers = await this.getAnalysisDocumentBuffers(
      insuranceQualityAnalysisQueryResult.insuranceQualityAnalysisDocument,
    );

    const clientLastAffiliationDate =
      await this.extractClientLastAffiliationDate(
        insuranceQualityAnalysisQueryResult.insuranceQualityAnalysisDocument,
      );

    const analysisSummary =
      await this.analysisProcessorGateway.getInsuranceQualityAnalysisCompleteAnalysis(
        promptResponse.prompt,
        [analysisDataBuffer, ...documentBuffers],
      );

    const insuranceQualityAnalysisResult =
      new InsuranceQualityAnalysisResultEntity({
        clientName:
          analysisToolRecordQueryResult.analysisToolClient.name ?? null,
        clientFederalDocument:
          analysisToolRecordQueryResult.analysisToolClient.federalDocument ??
          null,
        clientBirthDate:
          analysisToolRecordQueryResult.analysisToolClient.birthDate ?? null,
        clientLastAffiliationDate,
        insuranceQualityConclusion: analysisSummary,
        gracePeriodConclusion: null,
        finalRecommendation: null,
        analysisSummary: analysisSummary,
      });

    const insuranceQualityAnalysis = new InsuranceQualityAnalysisEntity({
      id: insuranceQualityAnalysisId,
      createdAt: insuranceQualityAnalysisQueryResult.createdAt,
      updatedAt: insuranceQualityAnalysisQueryResult.updatedAt,
      analysisToolClientId: analysisToolRecordQueryResult.analysisToolClient.id,
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
      analysisIsWorkAccidentOrSeriousIllness:
        insuranceQualityAnalysisQueryResult.analysisIsWorkAccidentOrSeriousIllness,
      analysisIsSeriousIllnessArt151:
        insuranceQualityAnalysisQueryResult.analysisIsSeriousIllnessArt151,
      analysisSeriousIllnesses:
        insuranceQualityAnalysisQueryResult.analysisSeriousIllnesses,
      analysisOtherSeriousIllness:
        insuranceQualityAnalysisQueryResult.analysisOtherSeriousIllness,
      analysisDiseaseStartDate:
        insuranceQualityAnalysisQueryResult.analysisDiseaseStartDate,
      analysisRuralStartDate:
        insuranceQualityAnalysisQueryResult.analysisRuralStartDate,
      analysisRuralEndDate:
        insuranceQualityAnalysisQueryResult.analysisRuralEndDate,
      analysisHadInvoluntaryUnemployment:
        insuranceQualityAnalysisQueryResult.analysisHadInvoluntaryUnemployment,
      analysisIntendsToProveByTestimony:
        insuranceQualityAnalysisQueryResult.analysisIntendsToProveByTestimony,
      insuranceQualityAnalysisResult,
    });

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolRecordQueryResult.analysisToolClient,
      createdBy: analysisToolRecordQueryResult.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecordQueryResult.analysisToolClient.updatedBy.id,
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
    });

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    const createInsuranceQualityAnalysisResultTransaction =
      this.insuranceQualityAnalysisResultCommandRepositoryGateway.createInsuranceQualityAnalysisResult(
        insuranceQualityAnalysisResult,
      );

    const updateInsuranceQualityAnalysisTransaction =
      this.insuranceQualityAnalysisCommandRepositoryGateway.updateInsuranceQualityAnalysis(
        insuranceQualityAnalysis.id,
        insuranceQualityAnalysis,
      );

    const transactions = [
      consumeCreditTransaction,
      createInsuranceQualityAnalysisResultTransaction,
      updateInsuranceQualityAnalysisTransaction,
      updateAnalysisToolRecordTransaction,
    ];

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.RESULT_ADDED,
        analysisType: analysisToolRecordQueryResult.type,
        organizationMemberId: organizationMember.id,
        analysisToolClientId:
          analysisToolRecordQueryResult.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecordQueryResult.id,
        transactions,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();

    return CreateInsuranceQualityAnalysisResultResponseDto.build({
      insuranceQualityAnalysisResultId: insuranceQualityAnalysisResult.id,
    });
  }

  private async extractClientLastAffiliationDate(
    documents: GetInsuranceQualityAnalysisDocumentQueryResult[],
  ): Promise<Date | null> {
    const cnisDocument = documents.find(
      (doc) => doc.type === InsuranceQualityAnalysisDocumentTypeEnum.CNIS,
    );

    if (!cnisDocument) {
      return null;
    }

    try {
      const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
        cnisDocument.document,
      );
      const cnisDocumentData =
        await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

      return (
        cnisDocumentData.socialSecurityRelations
          ?.filter(
            (relation) =>
              relation.socialSecurityAffiliationInfo.dataFim !== undefined,
          )
          .reduce<Date | null>((latest, relation) => {
            const dataFim =
              relation.socialSecurityAffiliationInfo.dataFim ?? null;
            if (dataFim === null) {
              return latest;
            }
            if (latest === null) {
              return dataFim;
            }
            return dataFim > latest ? dataFim : latest;
          }, null) ?? null
      );
    } catch {
      return null;
    }
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
