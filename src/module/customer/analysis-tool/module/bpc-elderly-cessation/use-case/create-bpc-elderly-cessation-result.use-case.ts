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
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BpcElderlyCessationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/query/bpc-elderly-cessation.query.repository.gateway';
import { BpcElderlyCessationResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-result/command/bpc-elderly-cessation-result.command.repository.gateway';
import { BpcElderlyCessationEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/bpc-elderly-cessation.entity';
import { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import { BpcElderlyCessationResultEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-result/bpc-elderly-cessation-result.entity';
import {
  BpcElderlyCessationApplicableRuleResponseDto,
  BpcElderlyCessationBenefitSummaryResponseDto,
  CreateBpcElderlyCessationResultResponseDto,
} from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/response/create-bpc-elderly-cessation-result.response.dto';
import { BpcElderlyCessationNotFoundError } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/error/bpc-elderly-cessation-not-found.error';
import { InvalidBpcElderlyCessationResultJsonError } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/error/invalid-bpc-elderly-cessation-result-json.error';
import { BpcElderlyCessationResultInterface } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/model/interface/bpc-elderly-cessation-result.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';

@Injectable()
export class CreateBpcElderlyCessationResultUseCase {
  protected readonly _type = CreateBpcElderlyCessationResultUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BpcElderlyCessationResultCommandRepositoryGateway)
    private readonly bpcElderlyCessationResultCommandRepositoryGateway: BpcElderlyCessationResultCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BpcElderlyCessationQueryRepositoryGateway)
    private readonly bpcElderlyCessationQueryRepositoryGateway: BpcElderlyCessationQueryRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    bpcElderlyCessationId: BpcElderlyCessationId,
  ): Promise<CreateBpcElderlyCessationResultResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.BPC_ELDERLY_CESSATION_COMPLETE_ANALYSIS,
      );

    const consumeCompleteCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.BPC_ELDERLY_CESSATION_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcElderlyCessationIdAndOrganizationIdAndAuthIdentityIdOrFail(
        bpcElderlyCessationId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        BpcElderlyCessationNotFoundError,
      );

    const bpcElderlyCessation =
      await this.bpcElderlyCessationQueryRepositoryGateway.findOneByBpcElderlyCessationIdAndOrganizationIdOrFail(
        bpcElderlyCessationId,
        organizationSessionData.organizationId,
        BpcElderlyCessationNotFoundError,
      );

    const currentResult = bpcElderlyCessation.bpcElderlyCessationResult;
    const files = await this.buildFiles(
      analysisToolRecordQueryResult.analysisToolClient,
      bpcElderlyCessation,
    );

    const completeAnalysisRaw =
      await this.analysisProcessorGateway.getBpcElderlyCessationCompleteAnalysis(
        promptResponse.prompt,
        files,
      );

    const parsedResult = this.parseResultAnalysis(completeAnalysisRaw);

    const bpcElderlyCessationResult = new BpcElderlyCessationResultEntity({
      ...(currentResult !== null && { id: currentResult.id }),
      inssDecisionAnalysis: currentResult?.inssDecisionAnalysis ?? null,
      firstAnalysis: currentResult?.firstAnalysis ?? null,
      completeAnalysis: completeAnalysisRaw ?? null,
      completeAnalysisDownload: parsedResult.completeAnalysisDownload,
      simplifiedAnalysis: currentResult?.simplifiedAnalysis ?? null,
      applicableRules: JSON.stringify(parsedResult.applicableRules),
      benefitSummaries: JSON.stringify(parsedResult.benefitSummaries),
      analysisDetailedText: parsedResult.analysisDetailedText,
      diagnosis: parsedResult.diagnosis,
      totalHouseholdIncome: parsedResult.totalHouseholdIncome ?? null,
      perCapitaIncome: parsedResult.perCapitaIncome ?? null,
      legalRequirementsMet: parsedResult.legalRequirementsMet,
      perCapitaIncomeBelowQuarterMinimumWage:
        parsedResult.perCapitaIncomeBelowQuarterMinimumWage,
      ageEqualOrAbove65Years: parsedResult.ageEqualOrAbove65Years,
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
      bpcElderlyCessation: new BpcElderlyCessationEntity({
        id: bpcElderlyCessation.id,
        createdBy: analysisToolRecordQueryResult.createdBy.id,
        updatedBy: organizationMember.id,
      }),
      cnisFastAnalysis: null,
      retirementPlanningRpps: null,
      retirementPlanningRgps: null,
      specialActivity: null,
      judicialCaseAnalysis: null,
      administrativeProcedureInssAnalysis: null,
      medicalQuestionGenerator: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      speechGenerator: null,
      disabilityAssessmentForBpcAnalysis: null,
      audienceQuestionGenerator: null,
      perCapitaIncomeForBpcAnalysis: null,
      ruralTimelineAnalysis: null,
      insuranceQualityAnalysis: null,
      teacherRetirementPlanning: null,
      disabilityRetirementPlanning: null,
      generalUrbanRetirementGrant: null,
      generalUrbanRetirementAnalysis: null,
      disabilityRetirementPlanningGrant: null,
      temporaryDisabilityBenefitsGrant: null,
      survivorPensionAnalysis: null,
      specialCategoryRetirementAnalysis: null,
      deathBenefitGrant: null,
      specialRetirementGrant: null,
      generalUrbanRetirementDenial: null,
      disabilityRetirementPlanningRejection: null,
      bpcElderlyAnalysis: null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const createOrUpdateResultTransaction =
      currentResult !== null
        ? this.bpcElderlyCessationResultCommandRepositoryGateway.updateBpcElderlyCessationResult(
            currentResult.id,
            bpcElderlyCessationResult,
          )
        : this.bpcElderlyCessationResultCommandRepositoryGateway.createBpcElderlyCessationResult(
            bpcElderlyCessationResult,
            bpcElderlyCessation.id,
          );

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.RESULT_ADDED,
        analysisType: analysisToolRecordQueryResult.type,
        organizationMemberId: organizationMember.id,
        analysisToolClientId:
          analysisToolRecordQueryResult.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecordQueryResult.id,
        transactions: [
          consumeCompleteCreditTransaction,
          createOrUpdateResultTransaction,
          updateAnalysisToolRecordTransaction,
        ],
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();

    const completeAnalysisDownloadHtml =
      await this.exportDocumentGateway.convertMarkdownToHtml(
        parsedResult.completeAnalysisDownload,
      );

    return CreateBpcElderlyCessationResultResponseDto.build({
      analysisResult: parsedResult.analysisResult,
      analysisDetailedText: parsedResult.analysisDetailedText,
      completeAnalysisDownloadHtml,
      diagnosis: parsedResult.diagnosis,
      ...(parsedResult.totalHouseholdIncome !== null &&
        parsedResult.totalHouseholdIncome !== undefined && {
          totalHouseholdIncome: parsedResult.totalHouseholdIncome,
        }),
      ...(parsedResult.perCapitaIncome !== null &&
        parsedResult.perCapitaIncome !== undefined && {
          perCapitaIncome: parsedResult.perCapitaIncome,
        }),
      legalRequirementsMet: parsedResult.legalRequirementsMet,
      perCapitaIncomeBelowQuarterMinimumWage:
        parsedResult.perCapitaIncomeBelowQuarterMinimumWage,
      ageEqualOrAbove65Years: parsedResult.ageEqualOrAbove65Years,
      applicableRules: parsedResult.applicableRules.map((item) =>
        BpcElderlyCessationApplicableRuleResponseDto.build({
          title: item.title,
          ...(item.description && { description: item.description }),
          status: item.status,
        }),
      ),
      benefitSummaries: parsedResult.benefitSummaries.map((item) =>
        BpcElderlyCessationBenefitSummaryResponseDto.build({
          benefitType: item.benefitType,
          result: item.result,
          ...(item.dib !== null && item.dib !== undefined && { dib: item.dib }),
          ...(item.expectedMonthlyBenefit !== null &&
            item.expectedMonthlyBenefit !== undefined && {
              expectedMonthlyBenefit: item.expectedMonthlyBenefit,
            }),
          ...(item.detailedAnalysis !== null &&
            item.detailedAnalysis !== undefined && {
              detailedAnalysis: item.detailedAnalysis,
            }),
        }),
      ),
    });
  }

  private async buildFiles(
    analysisToolClient: GetAnalysisToolClientWithRelationsQueryResult,
    bpcElderlyCessation: Awaited<
      ReturnType<
        typeof this.bpcElderlyCessationQueryRepositoryGateway.findOneByBpcElderlyCessationIdAndOrganizationIdOrFail
      >
    >,
  ): Promise<Buffer[]> {
    const context = {
      client: analysisToolClient,
      analysis: {
        analysisName: bpcElderlyCessation.analysisName,
        decisionDate: bpcElderlyCessation.decisionDate,
        previousInssBenefitNumber:
          bpcElderlyCessation.previousInssBenefitNumber,
        category: bpcElderlyCessation.category,
        cessationReason: bpcElderlyCessation.cessationReason,
        cessationReasonDescription:
          bpcElderlyCessation.cessationReasonDescription,
        isAppealDeadlineExpired: bpcElderlyCessation.isAppealDeadlineExpired,
        civilStatus: bpcElderlyCessation.civilStatus,
        educationLevel: bpcElderlyCessation.educationLevel,
        currentAddress: bpcElderlyCessation.currentAddress,
        previousAddress: bpcElderlyCessation.previousAddress,
        hasAddressChangedSinceDecision:
          bpcElderlyCessation.hasAddressChangedSinceDecision,
        livesAlone: bpcElderlyCessation.livesAlone,
      },
      familyMembers: bpcElderlyCessation.bpcElderlyCessationFamilyMember.map(
        (member) => ({
          fullName: member.fullName,
          birthDate: member.birthDate,
          kinship: member.kinship,
          livesInSameResidence: member.livesInSameResidence,
          hasIncome: member.hasIncome,
          monthlyIncomeAmount: member.monthlyIncomeAmount,
          incomeType: member.incomeType,
          hasExpenseProofs: member.hasExpenseProofs,
          documents: member.bpcElderlyCessationFamilyMemberDocument.map(
            (document) => ({
              id: document.id.toString(),
              type: document.type,
            }),
          ),
        }),
      ),
      documents: bpcElderlyCessation.bpcElderlyCessationDocument.map(
        (document) => ({
          id: document.id.toString(),
          type: document.type,
        }),
      ),
      inssBenefits: bpcElderlyCessation.bpcElderlyCessationInssBenefit.map(
        (item) => item.inssBenefitNumber,
      ),
      legalProceedings:
        bpcElderlyCessation.bpcElderlyCessationLegalProceeding.map(
          (item) => item.legalProceedingNumber,
        ),
      currentResult:
        bpcElderlyCessation.bpcElderlyCessationResult !== null
          ? {
              inssDecisionAnalysis:
                bpcElderlyCessation.bpcElderlyCessationResult
                  .inssDecisionAnalysis,
              firstAnalysis:
                bpcElderlyCessation.bpcElderlyCessationResult.firstAnalysis,
            }
          : null,
    };

    const analysisBuffer = Buffer.from(
      JSON.stringify(context, null, 2),
      'utf-8',
    );

    const documentBuffers = await Promise.all(
      bpcElderlyCessation.bpcElderlyCessationDocument.map((document) =>
        this.fileProcessorGateway.getFileBuffer(document.document),
      ),
    );

    const familyMemberDocumentBuffers = await Promise.all(
      bpcElderlyCessation.bpcElderlyCessationFamilyMember.flatMap((member) =>
        member.bpcElderlyCessationFamilyMemberDocument.map((document) =>
          this.fileProcessorGateway.getFileBuffer(document.document),
        ),
      ),
    );

    return [analysisBuffer, ...documentBuffers, ...familyMemberDocumentBuffers];
  }

  private parseResultAnalysis(
    raw: string | null,
  ): BpcElderlyCessationResultInterface {
    if (raw === null) {
      throw new InvalidBpcElderlyCessationResultJsonError();
    }

    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsed: unknown = JSON.parse(cleanedJson);

    if (!this.isResultAnalysis(parsed)) {
      throw new InvalidBpcElderlyCessationResultJsonError();
    }

    return parsed;
  }

  private isResultAnalysis(
    value: unknown,
  ): value is BpcElderlyCessationResultInterface {
    if (!this.isRecord(value)) {
      return false;
    }

    return (
      typeof value['analysisResult'] === 'string' &&
      typeof value['analysisDetailedText'] === 'string' &&
      typeof value['completeAnalysisDownload'] === 'string' &&
      Array.isArray(value['applicableRules']) &&
      Array.isArray(value['benefitSummaries']) &&
      typeof value['diagnosis'] === 'string' &&
      (typeof value['totalHouseholdIncome'] === 'number' ||
        value['totalHouseholdIncome'] === null ||
        value['totalHouseholdIncome'] === undefined) &&
      (typeof value['perCapitaIncome'] === 'number' ||
        value['perCapitaIncome'] === null ||
        value['perCapitaIncome'] === undefined) &&
      typeof value['legalRequirementsMet'] === 'string' &&
      typeof value['perCapitaIncomeBelowQuarterMinimumWage'] === 'string' &&
      typeof value['ageEqualOrAbove65Years'] === 'string'
    );
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }
}
