import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BpcElderlyCessationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/query/bpc-elderly-cessation.query.repository.gateway';
import { BpcElderlyCessationResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-result/command/bpc-elderly-cessation-result.command.repository.gateway';
import { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import { BpcElderlyCessationResultEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-result/bpc-elderly-cessation-result.entity';
import { CreateBpcElderlyCessationFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/response/create-bpc-elderly-cessation-first-analysis.response.dto';
import { BpcElderlyCessationNotFoundError } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/error/bpc-elderly-cessation-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateBpcElderlyCessationFirstAnalysisUseCase {
  protected readonly _type = CreateBpcElderlyCessationFirstAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BpcElderlyCessationQueryRepositoryGateway)
    private readonly bpcElderlyCessationQueryRepositoryGateway: BpcElderlyCessationQueryRepositoryGateway,
    @Inject(BpcElderlyCessationResultCommandRepositoryGateway)
    private readonly bpcElderlyCessationResultCommandRepositoryGateway: BpcElderlyCessationResultCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    bpcElderlyCessationId: BpcElderlyCessationId,
  ): Promise<CreateBpcElderlyCessationFirstAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

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

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.BPC_ELDERLY_CESSATION_FIRST_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.BPC_ELDERLY_CESSATION_FIRST_ANALYSIS,
        organizationMember.id,
      );

    const analysisContext = {
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
      client: analysisToolRecordQueryResult.analysisToolClient,
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
            }
          : null,
    };

    const files = [
      Buffer.from(JSON.stringify(analysisContext, null, 2), 'utf-8'),
      ...(await Promise.all(
        bpcElderlyCessation.bpcElderlyCessationDocument.map((document) =>
          this.fileProcessorGateway.getFileBuffer(document.document),
        ),
      )),
    ];

    const firstAnalysis =
      await this.analysisProcessorGateway.getBpcElderlyCessationFirstAnalysis(
        promptResponse.prompt,
        files,
      );

    const existingResult = bpcElderlyCessation.bpcElderlyCessationResult;
    const resultEntity = new BpcElderlyCessationResultEntity({
      ...(existingResult !== null && { id: existingResult.id }),
      inssDecisionAnalysis: existingResult?.inssDecisionAnalysis ?? null,
      firstAnalysis: firstAnalysis ?? '',
      completeAnalysis: existingResult?.completeAnalysis ?? null,
      completeAnalysisDownload:
        existingResult?.completeAnalysisDownload ?? null,
      simplifiedAnalysis: existingResult?.simplifiedAnalysis ?? null,
      applicableRules: existingResult?.applicableRules ?? null,
      benefitSummaries: existingResult?.benefitSummaries ?? null,
      analysisDetailedText: existingResult?.analysisDetailedText ?? null,
      diagnosis: existingResult?.diagnosis ?? null,
      totalHouseholdIncome: existingResult?.totalHouseholdIncome ?? null,
      perCapitaIncome: existingResult?.perCapitaIncome ?? null,
      legalRequirementsMet: existingResult?.legalRequirementsMet ?? null,
      perCapitaIncomeBelowQuarterMinimumWage:
        existingResult?.perCapitaIncomeBelowQuarterMinimumWage ?? null,
      ageEqualOrAbove65Years: existingResult?.ageEqualOrAbove65Years ?? null,
    });

    const resultTransaction =
      existingResult !== null
        ? this.bpcElderlyCessationResultCommandRepositoryGateway.updateBpcElderlyCessationResult(
            existingResult.id,
            resultEntity,
          )
        : this.bpcElderlyCessationResultCommandRepositoryGateway.createBpcElderlyCessationResult(
            resultEntity,
            bpcElderlyCessationId,
          );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      resultTransaction,
    ]);

    await transaction.commit();

    return CreateBpcElderlyCessationFirstAnalysisResponseDto.build({
      firstAnalysis: firstAnalysis ?? '',
    });
  }
}
