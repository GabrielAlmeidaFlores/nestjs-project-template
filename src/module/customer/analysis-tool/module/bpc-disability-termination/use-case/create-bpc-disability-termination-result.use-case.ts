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
import { BpcDisabilityTerminationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/bpc-disability-termination.query.repository.gateway';
import { BpcDisabilityTerminationResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-result/command/bpc-disability-termination-result.command.repository.gateway';
import { BpcDisabilityTerminationEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/bpc-disability-termination.entity';
import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import { BpcDisabilityTerminationResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-result/bpc-disability-termination-result.entity';
import {
  BpcDisabilityTerminationApplicableRuleResponseDto,
  BpcDisabilityTerminationBenefitSummaryResponseDto,
  CreateBpcDisabilityTerminationResultResponseDto,
} from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/response/create-bpc-disability-termination-result.response.dto';
import { BpcDisabilityTerminationNotFoundError } from '@module/customer/analysis-tool/module/bpc-disability-termination/error/bpc-disability-termination-not-found.error';
import { InvalidBpcDisabilityTerminationResultJsonError } from '@module/customer/analysis-tool/module/bpc-disability-termination/error/invalid-bpc-disability-termination-result-json.error';
import { BpcDisabilityTerminationResultInterface } from '@module/customer/analysis-tool/module/bpc-disability-termination/interface/bpc-disability-termination-result.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import type { GetBpcDisabilityTerminationWithRelationsQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-with-relations.query.result';

@Injectable()
export class CreateBpcDisabilityTerminationResultUseCase {
  protected readonly _type = CreateBpcDisabilityTerminationResultUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BpcDisabilityTerminationResultCommandRepositoryGateway)
    private readonly bpcDisabilityTerminationResultCommandRepositoryGateway: BpcDisabilityTerminationResultCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BpcDisabilityTerminationQueryRepositoryGateway)
    private readonly bpcDisabilityTerminationQueryRepositoryGateway: BpcDisabilityTerminationQueryRepositoryGateway,
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
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
  ): Promise<CreateBpcDisabilityTerminationResultResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_TERMINATION_COMPLETE_ANALYSIS,
      );

    const consumeCompleteCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_TERMINATION_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcDisabilityTerminationIdAndOrganizationIdAndAuthIdentityIdOrFail(
        bpcDisabilityTerminationId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        BpcDisabilityTerminationNotFoundError,
      );

    const bpcDisabilityTermination =
      await this.bpcDisabilityTerminationQueryRepositoryGateway.findOneByBpcDisabilityTerminationIdAndOrganizationIdOrFail(
        bpcDisabilityTerminationId,
        organizationSessionData.organizationId,
        BpcDisabilityTerminationNotFoundError,
      );

    const currentResult =
      bpcDisabilityTermination.bpcDisabilityTerminationResult;
    const files = await this.buildFiles(
      analysisToolRecordQueryResult.analysisToolClient,
      bpcDisabilityTermination,
    );

    const completeAnalysisRaw =
      await this.analysisProcessorGateway.getBpcDisabilityTerminationCompleteAnalysis(
        promptResponse.prompt,
        files,
      );

    const parsedResult = this.parseResultAnalysis(completeAnalysisRaw);

    const bpcDisabilityTerminationResult =
      new BpcDisabilityTerminationResultEntity({
        ...(currentResult !== null && { id: currentResult.id }),
        inssDecisionAnalysis: currentResult?.inssDecisionAnalysis ?? null,
        completeAnalysis: completeAnalysisRaw ?? null,
        completeAnalysisDownload: parsedResult.completeAnalysisDownload,
        simplifiedAnalysis: currentResult?.simplifiedAnalysis ?? null,
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
      bpcDisabilityTermination: new BpcDisabilityTerminationEntity({
        id: bpcDisabilityTermination.id,
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
      ruralOrHybridRetirementRejection: null,
      ruralOrHybridRetirementAnalysis: null,
      accidentBenefitRejection: null,
      survivorPensionAnalysis: null,
      specialCategoryRetirementAnalysis: null,
      deathBenefitGrant: null,
      deathBenefitRejection: null,
      specialRetirementGrant: null,
      generalUrbanRetirementDenial: null,
      disabilityRetirementPlanningRejection: null,
      bpcDisabilityDenial: null,
      bpcElderlyAnalysis: null,
      temporaryIncapacityBenefitRejection: null,
      maternityPayGrant: null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const createOrUpdateResultTransaction =
      currentResult !== null
        ? this.bpcDisabilityTerminationResultCommandRepositoryGateway.updateBpcDisabilityTerminationResult(
            currentResult.id,
            bpcDisabilityTerminationResult,
          )
        : this.bpcDisabilityTerminationResultCommandRepositoryGateway.createBpcDisabilityTerminationResult(
            bpcDisabilityTerminationResult,
            bpcDisabilityTermination.id,
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

    return CreateBpcDisabilityTerminationResultResponseDto.build({
      analysisResult: parsedResult.analysisResult,
      analysisDetailedText: parsedResult.analysisDetailedText,
      completeAnalysisDownloadHtml,
      applicableRules: parsedResult.applicableRules.map((item) =>
        BpcDisabilityTerminationApplicableRuleResponseDto.build({
          title: item.title,
          ...(item.description && { description: item.description }),
          status: item.status,
        }),
      ),
      benefitSummaries: parsedResult.benefitSummaries.map((item) =>
        BpcDisabilityTerminationBenefitSummaryResponseDto.build({
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
    bpcDisabilityTermination: GetBpcDisabilityTerminationWithRelationsQueryResult,
  ): Promise<Buffer[]> {
    const context = {
      client: analysisToolClient,
      analysis: {
        analysisName: bpcDisabilityTermination.analysisName,
        category: bpcDisabilityTermination.category,
        disabilityType: bpcDisabilityTermination.disabilityType,
        disabilityDegree: bpcDisabilityTermination.disabilityDegree,
        benefitCessationReason: bpcDisabilityTermination.benefitCessationReason,
        livesAlone: bpcDisabilityTermination.livesAlone,
      },
      disabilityAssessment:
        bpcDisabilityTermination.bpcDisabilityTerminationDisabilityAssessment !==
        null
          ? {
              estimatedDisabilityStartDate:
                bpcDisabilityTermination
                  .bpcDisabilityTerminationDisabilityAssessment
                  .estimatedDisabilityStartDate,
              attendsSchoolOrTechnicalCourse:
                bpcDisabilityTermination
                  .bpcDisabilityTerminationDisabilityAssessment
                  .attendsSchoolOrTechnicalCourse,
              performsLaborActivity:
                bpcDisabilityTermination
                  .bpcDisabilityTerminationDisabilityAssessment
                  .performsLaborActivity,
              needsThirdPartyHelp:
                bpcDisabilityTermination
                  .bpcDisabilityTerminationDisabilityAssessment
                  .needsThirdPartyHelp,
              hasAccessToBasicServices:
                bpcDisabilityTermination
                  .bpcDisabilityTerminationDisabilityAssessment
                  .hasAccessToBasicServices,
              otherBarriersDescription:
                bpcDisabilityTermination
                  .bpcDisabilityTerminationDisabilityAssessment
                  .otherBarriersDescription,
            }
          : null,
      familyMembers:
        bpcDisabilityTermination.bpcDisabilityTerminationFamilyMember.map(
          (member) => ({
            fullName: member.fullName,
            birthDate: member.birthDate,
            kinship: member.kinship,
            livesInSameResidence: member.livesInSameResidence,
            hasIncome: member.hasIncome,
            monthlyIncomeAmount: member.monthlyIncomeAmount,
            incomeType: member.incomeType,
            hasExpenseProofs: member.hasExpenseProofs,
            documents: member.bpcDisabilityTerminationFamilyMemberDocument.map(
              (document) => ({
                id: document.id.toString(),
                type: document.type,
              }),
            ),
          }),
        ),
      documents: bpcDisabilityTermination.bpcDisabilityTerminationDocument.map(
        (document) => ({
          id: document.id.toString(),
          type: document.type,
        }),
      ),
      inssBenefits:
        bpcDisabilityTermination.bpcDisabilityTerminationInssBenefit.map(
          (item) => item.inssBenefitNumber,
        ),
      legalProceedings:
        bpcDisabilityTermination.bpcDisabilityTerminationLegalProceeding.map(
          (item) => item.legalProceedingNumber,
        ),
      currentResult:
        bpcDisabilityTermination.bpcDisabilityTerminationResult !== null
          ? {
              inssDecisionAnalysis:
                bpcDisabilityTermination.bpcDisabilityTerminationResult
                  .inssDecisionAnalysis,
            }
          : null,
    };

    const analysisBuffer = Buffer.from(
      JSON.stringify(context, null, 2),
      'utf-8',
    );

    const documentBuffers = await Promise.all(
      bpcDisabilityTermination.bpcDisabilityTerminationDocument.map(
        (document) =>
          this.fileProcessorGateway.getFileBuffer(document.document),
      ),
    );

    const familyMemberDocumentBuffers = await Promise.all(
      bpcDisabilityTermination.bpcDisabilityTerminationFamilyMember.flatMap(
        (member) =>
          member.bpcDisabilityTerminationFamilyMemberDocument.map((document) =>
            this.fileProcessorGateway.getFileBuffer(document.document),
          ),
      ),
    );

    const disabilityAssessmentDocumentBuffers =
      bpcDisabilityTermination.bpcDisabilityTerminationDisabilityAssessment !==
      null
        ? await Promise.all(
            bpcDisabilityTermination.bpcDisabilityTerminationDisabilityAssessment.bpcDisabilityTerminationDisabilityAssessmentDocument.map(
              (document) =>
                this.fileProcessorGateway.getFileBuffer(document.document),
            ),
          )
        : [];

    return [
      analysisBuffer,
      ...documentBuffers,
      ...familyMemberDocumentBuffers,
      ...disabilityAssessmentDocumentBuffers,
    ];
  }

  private parseResultAnalysis(
    raw: string | null,
  ): BpcDisabilityTerminationResultInterface {
    if (raw === null) {
      throw new InvalidBpcDisabilityTerminationResultJsonError();
    }

    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsed: unknown = JSON.parse(cleanedJson);

    if (!this.isResultAnalysis(parsed)) {
      throw new InvalidBpcDisabilityTerminationResultJsonError();
    }

    return parsed;
  }

  private isResultAnalysis(
    value: unknown,
  ): value is BpcDisabilityTerminationResultInterface {
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
