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
import { BpcDisabilityDenialQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/query/bpc-disability-denial.query.repository.gateway';
import { BpcDisabilityDenialResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-result/command/bpc-disability-denial-result.command.repository.gateway';
import { BpcDisabilityDenialEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/bpc-disability-denial.entity';
import { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import { BpcDisabilityDenialResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-result/bpc-disability-denial-result.entity';
import {
  BpcDisabilityDenialApplicableRuleResponseDto,
  BpcDisabilityDenialBenefitSummaryResponseDto,
  CreateBpcDisabilityDenialResultResponseDto,
} from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/response/create-bpc-disability-denial-result.response.dto';
import { BpcDisabilityDenialNotFoundError } from '@module/customer/analysis-tool/module/bpc-disability-denial/error/bpc-disability-denial-not-found.error';
import { InvalidBpcDisabilityDenialResultJsonError } from '@module/customer/analysis-tool/module/bpc-disability-denial/error/invalid-bpc-disability-denial-result-json.error';
import { BpcDisabilityDenialResultInterface } from '@module/customer/analysis-tool/module/bpc-disability-denial/model/interface/bpc-disability-denial-result.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';

@Injectable()
export class CreateBpcDisabilityDenialResultUseCase {
  protected readonly _type = CreateBpcDisabilityDenialResultUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BpcDisabilityDenialResultCommandRepositoryGateway)
    private readonly bpcDisabilityDenialResultCommandRepositoryGateway: BpcDisabilityDenialResultCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BpcDisabilityDenialQueryRepositoryGateway)
    private readonly bpcDisabilityDenialQueryRepositoryGateway: BpcDisabilityDenialQueryRepositoryGateway,
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
    bpcDisabilityDenialId: BpcDisabilityDenialId,
  ): Promise<CreateBpcDisabilityDenialResultResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_DENIAL_COMPLETE_ANALYSIS,
      );

    const consumeCompleteCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_DENIAL_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcDisabilityDenialIdAndOrganizationIdAndAuthIdentityIdOrFail(
        bpcDisabilityDenialId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        BpcDisabilityDenialNotFoundError,
      );

    const bpcDisabilityDenial =
      await this.bpcDisabilityDenialQueryRepositoryGateway.findOneByBpcDisabilityDenialIdAndOrganizationIdOrFail(
        bpcDisabilityDenialId,
        organizationSessionData.organizationId,
        BpcDisabilityDenialNotFoundError,
      );

    const currentResult = bpcDisabilityDenial.bpcDisabilityDenialResult;
    const files = await this.buildFiles(
      analysisToolRecordQueryResult.analysisToolClient,
      bpcDisabilityDenial,
    );

    const completeAnalysisRaw =
      await this.analysisProcessorGateway.getBpcDisabilityDenialCompleteAnalysis(
        promptResponse.prompt,
        files,
      );

    const parsedResult = this.parseResultAnalysis(completeAnalysisRaw);

    const bpcDisabilityDenialResult = new BpcDisabilityDenialResultEntity({
      ...(currentResult !== null && { id: currentResult.id }),
      inssDecisionAnalysis: currentResult?.inssDecisionAnalysis ?? null,
      firstAnalysis: currentResult?.firstAnalysis ?? null,
      completeAnalysis: completeAnalysisRaw ?? null,
      completeAnalysisDownload: parsedResult.completeAnalysisDownload,
      simplifiedAnalysis: currentResult?.simplifiedAnalysis ?? null,
      applicableRules: JSON.stringify(parsedResult.applicableRules),
      benefitSummaries: JSON.stringify(parsedResult.benefitSummaries),
      analysisDetailedText: parsedResult.analysisDetailedText,
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
      bpcDisabilityDenial: new BpcDisabilityDenialEntity({
        id: bpcDisabilityDenial.id,
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
        ? this.bpcDisabilityDenialResultCommandRepositoryGateway.updateBpcDisabilityDenialResult(
            currentResult.id,
            bpcDisabilityDenialResult,
          )
        : this.bpcDisabilityDenialResultCommandRepositoryGateway.createBpcDisabilityDenialResult(
            bpcDisabilityDenialResult,
            bpcDisabilityDenial.id,
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
    const analysisResultHtml =
      await this.exportDocumentGateway.convertMarkdownToHtml(
        parsedResult.analysisResult,
      );
    const analysisDetailedTextHtml =
      await this.exportDocumentGateway.convertMarkdownToHtml(
        parsedResult.analysisDetailedText,
      );

    return CreateBpcDisabilityDenialResultResponseDto.build({
      analysisResult: analysisResultHtml,
      analysisDetailedText: analysisDetailedTextHtml,
      completeAnalysisDownloadHtml,
      applicableRules: parsedResult.applicableRules.map((item) =>
        BpcDisabilityDenialApplicableRuleResponseDto.build({
          title: item.title,
          ...(item.description && { description: item.description }),
          status: item.status,
        }),
      ),
      benefitSummaries: parsedResult.benefitSummaries.map((item) =>
        BpcDisabilityDenialBenefitSummaryResponseDto.build({
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
    bpcDisabilityDenial: Awaited<
      ReturnType<
        typeof this.bpcDisabilityDenialQueryRepositoryGateway.findOneByBpcDisabilityDenialIdAndOrganizationIdOrFail
      >
    >,
  ): Promise<Buffer[]> {
    const context = {
      client: analysisToolClient,
      analysis: {
        analysisName: bpcDisabilityDenial.analysisName,
        requestEntryDate: bpcDisabilityDenial.requestEntryDate,
        denialDate: bpcDisabilityDenial.denialDate,
        requestedBenefitType: bpcDisabilityDenial.requestedBenefitType,
        category: bpcDisabilityDenial.category,
        denialReason: bpcDisabilityDenial.denialReason,
        denialReasonDescription: bpcDisabilityDenial.denialReasonDescription,
        disabilityType: bpcDisabilityDenial.disabilityType,
        disabilityDegree: bpcDisabilityDenial.disabilityDegree,
        estimatedDisabilityStartDate:
          bpcDisabilityDenial.estimatedDisabilityStartDate,
        attendsSchoolOrTechnicalCourse:
          bpcDisabilityDenial.attendsSchoolOrTechnicalCourse,
        performsLaborActivity: bpcDisabilityDenial.performsLaborActivity,
        needsThirdPartyHelp: bpcDisabilityDenial.needsThirdPartyHelp,
        hasAccessToBasicServices: bpcDisabilityDenial.hasAccessToBasicServices,
        otherBarriersDescription: bpcDisabilityDenial.otherBarriersDescription,
        livesAlone: bpcDisabilityDenial.livesAlone,
      },
      familyMembers: bpcDisabilityDenial.bpcDisabilityDenialFamilyMember.map(
        (member) => ({
          fullName: member.fullName,
          birthDate: member.birthDate,
          kinship: member.kinship,
          livesInSameResidence: member.livesInSameResidence,
          hasIncome: member.hasIncome,
          monthlyIncomeAmount: member.monthlyIncomeAmount,
          incomeType: member.incomeType,
          hasExpenseProofs: member.hasExpenseProofs,
          documents: member.bpcDisabilityDenialFamilyMemberDocument.map(
            (document) => ({
              id: document.id.toString(),
              type: document.type,
            }),
          ),
        }),
      ),
      documents: bpcDisabilityDenial.bpcDisabilityDenialDocument.map(
        (document) => ({
          id: document.id.toString(),
          type: document.type,
        }),
      ),
      inssBenefits: bpcDisabilityDenial.bpcDisabilityDenialInssBenefit.map(
        (item) => item.inssBenefitNumber,
      ),
      legalProceedings:
        bpcDisabilityDenial.bpcDisabilityDenialLegalProceeding.map(
          (item) => item.legalProceedingNumber,
        ),
      currentResult:
        bpcDisabilityDenial.bpcDisabilityDenialResult !== null
          ? {
              inssDecisionAnalysis:
                bpcDisabilityDenial.bpcDisabilityDenialResult
                  .inssDecisionAnalysis,
              firstAnalysis:
                bpcDisabilityDenial.bpcDisabilityDenialResult.firstAnalysis,
            }
          : null,
    };

    const analysisBuffer = Buffer.from(
      JSON.stringify(context, null, 2),
      'utf-8',
    );

    const documentBuffers = await Promise.all(
      bpcDisabilityDenial.bpcDisabilityDenialDocument.map((document) =>
        this.fileProcessorGateway.getFileBuffer(document.document),
      ),
    );

    const familyMemberDocumentBuffers = await Promise.all(
      bpcDisabilityDenial.bpcDisabilityDenialFamilyMember.flatMap((member) =>
        member.bpcDisabilityDenialFamilyMemberDocument.map((document) =>
          this.fileProcessorGateway.getFileBuffer(document.document),
        ),
      ),
    );

    return [analysisBuffer, ...documentBuffers, ...familyMemberDocumentBuffers];
  }

  private parseResultAnalysis(
    raw: string | null,
  ): BpcDisabilityDenialResultInterface {
    if (raw === null) {
      throw new InvalidBpcDisabilityDenialResultJsonError();
    }

    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsed: unknown = JSON.parse(cleanedJson);

    if (!this.isResultAnalysis(parsed)) {
      throw new InvalidBpcDisabilityDenialResultJsonError();
    }

    return parsed;
  }

  private isResultAnalysis(
    value: unknown,
  ): value is BpcDisabilityDenialResultInterface {
    if (!this.isRecord(value)) {
      return false;
    }

    return (
      typeof value['analysisResult'] === 'string' &&
      typeof value['analysisDetailedText'] === 'string' &&
      typeof value['completeAnalysisDownload'] === 'string' &&
      Array.isArray(value['applicableRules']) &&
      Array.isArray(value['benefitSummaries'])
    );
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }
}
