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
import { BpcDisabilityGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/query/bpc-disability-grant.query.repository.gateway';
import { BpcDisabilityGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-result/command/bpc-disability-grant-result.command.repository.gateway';
import { BpcDisabilityGrantEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/bpc-disability-grant.entity';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import { BpcDisabilityGrantResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-result/bpc-disability-grant-result.entity';
import {
  BpcDisabilityGrantRetirementRuleResponseDto,
  CreateBpcDisabilityGrantResultResponseDto,
} from '@module/customer/analysis-tool/module/bpc-disability-grant/dto/response/create-bpc-disability-grant-result.response.dto';
import { BpcDisabilityGrantNotFoundError } from '@module/customer/analysis-tool/module/bpc-disability-grant/error/bpc-disability-grant-not-found.error';
import { InvalidBpcDisabilityGrantResultJsonError } from '@module/customer/analysis-tool/module/bpc-disability-grant/error/invalid-bpc-disability-grant-result-json.error';
import {
  BpcDisabilityGrantResultInterface,
  BpcDisabilityGrantRetirementRuleInterface,
} from '@module/customer/analysis-tool/module/bpc-disability-grant/model/interface/bpc-disability-grant-result.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';

@Injectable()
export class CreateBpcDisabilityGrantResultUseCase {
  protected readonly _type = CreateBpcDisabilityGrantResultUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BpcDisabilityGrantResultCommandRepositoryGateway)
    private readonly bpcDisabilityGrantResultCommandRepositoryGateway: BpcDisabilityGrantResultCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BpcDisabilityGrantQueryRepositoryGateway)
    private readonly bpcDisabilityGrantQueryRepositoryGateway: BpcDisabilityGrantQueryRepositoryGateway,
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
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    bpcDisabilityGrantId: BpcDisabilityGrantId,
  ): Promise<CreateBpcDisabilityGrantResultResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_GRANT_COMPLETE_ANALYSIS,
      );

    const consumeCompleteCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_GRANT_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcDisabilityGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        bpcDisabilityGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        BpcDisabilityGrantNotFoundError,
      );

    const bpcDisabilityGrant =
      await this.bpcDisabilityGrantQueryRepositoryGateway.findOneByBpcDisabilityGrantIdAndOrganizationIdOrFail(
        bpcDisabilityGrantId,
        organizationSessionData.organizationId,
        BpcDisabilityGrantNotFoundError,
      );

    const currentResult = bpcDisabilityGrant.BpcDisabilityGrantResult;
    const files = await this.buildFiles(
      analysisToolRecordQueryResult.analysisToolClient,
      bpcDisabilityGrant,
    );

    const completeAnalysisRaw =
      await this.analysisProcessorGateway.getBpcDisabilityGrantCompleteAnalysis(
        promptResponse.prompt,
        files,
      );

    const parsedResult = this.parseResultAnalysis(completeAnalysisRaw);

    const bpcDisabilityGrantResult = new BpcDisabilityGrantResultEntity({
      ...(currentResult !== null && { id: currentResult.id }),
      completeAnalysis: completeAnalysisRaw ?? null,
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
      bpcDisabilityGrant: new BpcDisabilityGrantEntity({
        id: bpcDisabilityGrant.id,
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
        ? this.bpcDisabilityGrantResultCommandRepositoryGateway.updateBpcDisabilityGrantResult(
            currentResult.id,
            bpcDisabilityGrantResult,
          )
        : this.bpcDisabilityGrantResultCommandRepositoryGateway.createBpcDisabilityGrantResult(
            bpcDisabilityGrantResult,
            bpcDisabilityGrant.id,
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

    return CreateBpcDisabilityGrantResultResponseDto.build({
      isElligibleForDisabilityBpc: parsedResult.isElligibleForDisabilityBpc,
      totalFamiliarIncome: parsedResult.totalFamiliarIncome,
      perCapitaIncome: parsedResult.perCapitaIncome,
      lessThanOneQuarter: parsedResult.lessThanOneQuarter,
      lessThanHalfAndAboveOneQuarter:
        parsedResult.lessThanHalfAndAboveOneQuarter,
      disabilityProven: parsedResult.disabilityProven,
      retirementRules: parsedResult.retirementRules.map((item) =>
        this.buildRetirementRuleResponseDto(item),
      ),
      analysisResult: parsedResult.analysisResult,
      analysisConclusion: parsedResult.analysisConclusion,
    });
  }

  private buildRetirementRuleResponseDto(
    item: BpcDisabilityGrantRetirementRuleInterface,
  ): BpcDisabilityGrantRetirementRuleResponseDto {
    return BpcDisabilityGrantRetirementRuleResponseDto.build({
      benefitType: item.benefitType,
      result: item.result,
      benefitStartDate: new Date(item.benefitStartDate),
      RMIprevista: item.RMIprevista,
      detaildAnalysis: item.detaildAnalysis,
    });
  }

  private async buildFiles(
    analysisToolClient: GetAnalysisToolClientWithRelationsQueryResult,
    BpcDisabilityGrant: Awaited<
      ReturnType<
        typeof this.bpcDisabilityGrantQueryRepositoryGateway.findOneByBpcDisabilityGrantIdAndOrganizationIdOrFail
      >
    >,
  ): Promise<Buffer[]> {
    const context = {
      client: analysisToolClient,
      analysis: {
        analysisName: BpcDisabilityGrant.analysisName,
        requestEntryDate: BpcDisabilityGrant.requestEntryDate,
        denialDate: BpcDisabilityGrant.denialDate,
        requestedBenefitType: BpcDisabilityGrant.requestedBenefitType,
        category: BpcDisabilityGrant.category,
        denialReason: BpcDisabilityGrant.denialReason,
        denialReasonDescription: BpcDisabilityGrant.denialReasonDescription,
        disabilityType: BpcDisabilityGrant.disabilityType,
        disabilityDegree: BpcDisabilityGrant.disabilityDegree,
        estimatedDisabilityStartDate:
          BpcDisabilityGrant.estimatedDisabilityStartDate,
        attendsSchoolOrTechnicalCourse:
          BpcDisabilityGrant.attendsSchoolOrTechnicalCourse,
        performsLaborActivity: BpcDisabilityGrant.performsLaborActivity,
        needsThirdPartyHelp: BpcDisabilityGrant.needsThirdPartyHelp,
        hasAccessToBasicServices: BpcDisabilityGrant.hasAccessToBasicServices,
        otherBarriersDescription: BpcDisabilityGrant.otherBarriersDescription,
        livesAlone: BpcDisabilityGrant.livesAlone,
      },
      familyMembers: BpcDisabilityGrant.BpcDisabilityGrantFamilyMember.map(
        (member) => ({
          fullName: member.fullName,
          birthDate: member.birthDate,
          kinship: member.kinship,
          livesInSameResidence: member.livesInSameResidence,
          hasIncome: member.hasIncome,
          monthlyIncomeAmount: member.monthlyIncomeAmount,
          incomeType: member.incomeType,
          hasExpenseProofs: member.hasExpenseProofs,
          documents: member.BpcDisabilityGrantFamilyMemberDocument.map(
            (document) => ({
              id: document.id.toString(),
              type: document.type,
            }),
          ),
        }),
      ),
      documents: BpcDisabilityGrant.BpcDisabilityGrantDocument.map(
        (document) => ({
          id: document.id.toString(),
          type: document.type,
        }),
      ),
      inssBenefits: BpcDisabilityGrant.BpcDisabilityGrantInssBenefit.map(
        (item) => item.inssBenefitNumber,
      ),
      legalProceedings:
        BpcDisabilityGrant.BpcDisabilityGrantLegalProceeding.map(
          (item) => item.legalProceedingNumber,
        ),
      currentResult:
        BpcDisabilityGrant.BpcDisabilityGrantResult !== null
          ? {
              completeAnalysis:
                BpcDisabilityGrant.BpcDisabilityGrantResult.completeAnalysis,
            }
          : null,
    };

    const analysisBuffer = Buffer.from(
      JSON.stringify(context, null, 2),
      'utf-8',
    );

    const documentBuffers = await Promise.all(
      BpcDisabilityGrant.BpcDisabilityGrantDocument.map((document) =>
        this.fileProcessorGateway.getFileBuffer(document.document),
      ),
    );

    const familyMemberDocumentBuffers = await Promise.all(
      BpcDisabilityGrant.BpcDisabilityGrantFamilyMember.flatMap((member) =>
        member.BpcDisabilityGrantFamilyMemberDocument.map((document) =>
          this.fileProcessorGateway.getFileBuffer(document.document),
        ),
      ),
    );

    return [analysisBuffer, ...documentBuffers, ...familyMemberDocumentBuffers];
  }

  private parseResultAnalysis(
    raw: string | null,
  ): BpcDisabilityGrantResultInterface {
    if (raw === null) {
      throw new InvalidBpcDisabilityGrantResultJsonError();
    }

    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsed: unknown = JSON.parse(cleanedJson);

    if (!this.isResultAnalysis(parsed)) {
      throw new InvalidBpcDisabilityGrantResultJsonError();
    }

    return parsed;
  }

  private isResultAnalysis(
    value: unknown,
  ): value is BpcDisabilityGrantResultInterface {
    if (!this.isRecord(value)) {
      return false;
    }

    return (
      typeof value['isElligibleForDisabilityBpc'] === 'boolean' &&
      typeof value['totalFamiliarIncome'] === 'string' &&
      typeof value['perCapitaIncome'] === 'string' &&
      typeof value['lessThanOneQuarter'] === 'boolean' &&
      typeof value['lessThanHalfAndAboveOneQuarter'] === 'boolean' &&
      typeof value['disabilityProven'] === 'boolean' &&
      Array.isArray(value['retirementRules']) &&
      typeof value['analysisResult'] === 'string' &&
      this.hasValidRetirementRules(value['retirementRules'])
    );
  }

  private hasValidRetirementRules(value: unknown): boolean {
    if (!Array.isArray(value)) {
      return false;
    }

    return value.every((item) => {
      if (!this.isRecord(item)) {
        return false;
      }

      return (
        typeof item['benefitType'] === 'string' &&
        typeof item['result'] === 'boolean' &&
        typeof item['benefitStartDate'] === 'string' &&
        typeof item['RMIprevista'] === 'string' &&
        typeof item['detaildAnalysis'] === 'string'
      );
    });
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }
}
