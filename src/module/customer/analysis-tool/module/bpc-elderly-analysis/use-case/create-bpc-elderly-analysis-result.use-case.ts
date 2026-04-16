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
import { BpcElderlyAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/command/bpc-elderly-analysis.command.repository.gateway';
import { BpcElderlyAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-result/command/bpc-elderly-analysis-result.command.repository.gateway';
import { BpcElderlyAnalysisEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/bpc-elderly-analysis.entity';
import { BpcElderlyAnalysisCategoryEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/enum/bpc-elderly-analysis-category.enum';
import { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';
import { BpcElderlyAnalysisResultEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-result/bpc-elderly-analysis-result.entity';
import { CreateBpcElderlyAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/dto/response/create-bpc-elderly-analysis-result.response.dto';
import { BpcElderlyAnalysisNotFoundError } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/error/bpc-elderly-analysis-not-found.error';
import { BpcElderlyAnalysisResultInterface } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/model/interface/bpc-elderly-analysis-result.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateBpcElderlyAnalysisResultUseCase {
  protected readonly _type = CreateBpcElderlyAnalysisResultUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BpcElderlyAnalysisResultCommandRepositoryGateway)
    private readonly bpcElderlyAnalysisResultCommandRepositoryGateway: BpcElderlyAnalysisResultCommandRepositoryGateway,
    @Inject(BpcElderlyAnalysisCommandRepositoryGateway)
    private readonly bpcElderlyAnalysisCommandRepositoryGateway: BpcElderlyAnalysisCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
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
    bpcElderlyAnalysisId: BpcElderlyAnalysisId,
  ): Promise<CreateBpcElderlyAnalysisResultResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.BPC_ELDERLY_ANALYSIS_COMPLETE_ANALYSIS,
      );

    const consumeCompleteCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.BPC_ELDERLY_ANALYSIS_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcElderlyAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        bpcElderlyAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        BpcElderlyAnalysisNotFoundError,
      );

    const bpcElderlyAnalysisQueryResult =
      analysisToolRecordQueryResult.bpcElderlyAnalysis;

    if (bpcElderlyAnalysisQueryResult === null) {
      throw new BpcElderlyAnalysisNotFoundError();
    }

    const clientDataBuffer = Buffer.from(
      JSON.stringify(analysisToolRecordQueryResult.analysisToolClient, null, 2),
      'utf-8',
    );

    const documentBuffers: Buffer[] = [];
    for (const doc of bpcElderlyAnalysisQueryResult.bpcElderlyAnalysisDocument) {
      const buffer = await this.fileProcessorGateway.getFileBuffer(
        doc.document,
      );
      documentBuffers.push(buffer);
    }

    const familyMembersData =
      bpcElderlyAnalysisQueryResult.bpcElderlyAnalysisFamilyMember.map(
        (member) => ({
          fullName: member.fullName,
          birthDate: member.birthDate,
          kinship: member.kinship,
          livesInSameResidence: member.livesInSameResidence,
          hasIncome: member.hasIncome,
          monthlyIncomeAmount: member.monthlyIncomeAmount,
          incomeType: member.incomeType,
          documentsCount: member.bpcElderlyAnalysisFamilyMemberDocument.length,
        }),
      );

    const familyMemberDocumentBuffers: Buffer[] = [];
    for (const member of bpcElderlyAnalysisQueryResult.bpcElderlyAnalysisFamilyMember) {
      for (const doc of member.bpcElderlyAnalysisFamilyMemberDocument) {
        const buffer = await this.fileProcessorGateway.getFileBuffer(
          doc.document,
        );
        familyMemberDocumentBuffers.push(buffer);
      }
    }

    const analysisData = {
      client: analysisToolRecordQueryResult.analysisToolClient,
      familyMembers: familyMembersData,
      documentsCount: documentBuffers.length,
      familyMemberDocumentsCount: familyMemberDocumentBuffers.length,
    };

    const analysisDataBuffer = Buffer.from(
      JSON.stringify(analysisData, null, 2),
      'utf-8',
    );

    const completeAnalysisRaw =
      await this.analysisProcessorGateway.getBpcElderlyAnalysisCompleteAnalysis(
        promptResponse.prompt,
        [
          analysisDataBuffer,
          clientDataBuffer,
          ...documentBuffers,
          ...familyMemberDocumentBuffers,
        ],
      );

    const parsedAnalysis = this.parseAnalysisResult(completeAnalysisRaw);

    const existingResult =
      bpcElderlyAnalysisQueryResult.bpcElderlyAnalysisResult;

    const bpcElderlyAnalysisResult = new BpcElderlyAnalysisResultEntity({
      ...(existingResult !== null && { id: existingResult.id }),
      completeAnalysis: completeAnalysisRaw,
      completeAnalysisDownload: parsedAnalysis.analysisDetails,
      simplifiedAnalysis: null,
    });

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolRecordQueryResult.analysisToolClient,
      createdBy: analysisToolRecordQueryResult.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecordQueryResult.analysisToolClient.updatedBy.id,
    });

    const bpcElderlyAnalysis = new BpcElderlyAnalysisEntity({
      id: bpcElderlyAnalysisQueryResult.id,
      ...(parsedAnalysis.category !== null && {
        category: parsedAnalysis.category,
      }),
      bpcElderlyAnalysisResult,
      bpcElderlyAnalysisFamilyMember: [],
      bpcElderlyAnalysisDocument: [],
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: analysisToolRecordQueryResult.updatedBy.id,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      status: AnalysisStatusEnum.COMPLETED,
      analysisToolClient,
      bpcElderlyAnalysis,
      cnisFastAnalysis: null,
      retirementPlanningRpps: null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      retirementPlanningRgps: null,
      specialActivity: null,
      judicialCaseAnalysis: null,
      administrativeProcedureInssAnalysis: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      disabilityAssessmentForBpcAnalysis: null,
    });

    const createOrUpdateBpcElderlyAnalysisResultTransaction =
      existingResult !== null
        ? this.bpcElderlyAnalysisResultCommandRepositoryGateway.updateBpcElderlyAnalysisResult(
            existingResult.id,
            bpcElderlyAnalysisResult,
          )
        : this.bpcElderlyAnalysisResultCommandRepositoryGateway.createBpcElderlyAnalysisResult(
            bpcElderlyAnalysisResult,
            bpcElderlyAnalysis.id,
          );

    const updateBpcElderlyAnalysisTransaction =
      this.bpcElderlyAnalysisCommandRepositoryGateway.updateBpcElderlyAnalysis(
        bpcElderlyAnalysis.id,
        bpcElderlyAnalysis,
      );

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    const transactions = [
      consumeCompleteCreditTransaction,
      createOrUpdateBpcElderlyAnalysisResultTransaction,
      updateBpcElderlyAnalysisTransaction,
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

    const completeAnalysisDownloadAsHtml =
      bpcElderlyAnalysisResult.completeAnalysisDownload !== null
        ? await this.exportDocumentGateway.convertMarkdownToHtml(
            bpcElderlyAnalysisResult.completeAnalysisDownload,
          )
        : null;

    return CreateBpcElderlyAnalysisResultResponseDto.build({
      ...(parsedAnalysis.diagnosis !== null && {
        diagnosis: parsedAnalysis.diagnosis,
      }),
      ...(parsedAnalysis.totalHouseholdIncome !== null && {
        totalHouseholdIncome: parsedAnalysis.totalHouseholdIncome,
      }),
      ...(parsedAnalysis.perCapitaIncome !== null && {
        perCapitaIncome: parsedAnalysis.perCapitaIncome,
      }),
      ...(parsedAnalysis.eligibilityJustification !== null && {
        eligibilityJustification: parsedAnalysis.eligibilityJustification,
      }),
      ...(parsedAnalysis.type !== null && { type: parsedAnalysis.type }),
      ...(parsedAnalysis.benefitStartDate !== null && {
        benefitStartDate: parsedAnalysis.benefitStartDate,
      }),
      ...(parsedAnalysis.amount !== null && { amount: parsedAnalysis.amount }),
      ...(parsedAnalysis.category !== null && {
        category: parsedAnalysis.category,
      }),
      ...(completeAnalysisDownloadAsHtml !== null && {
        bpcElderlyCompleteAnalysisResult: completeAnalysisDownloadAsHtml,
      }),
      ...(parsedAnalysis.legalRequirementsMet !== null && {
        legalRequirementsMet: parsedAnalysis.legalRequirementsMet,
      }),
      ...(parsedAnalysis.perCapitaIncomeBelowQuarterMinimumWage !== null && {
        perCapitaIncomeBelowQuarterMinimumWage:
          parsedAnalysis.perCapitaIncomeBelowQuarterMinimumWage,
      }),
      ...(parsedAnalysis.ageEqualOrAbove65Years !== null && {
        ageEqualOrAbove65Years: parsedAnalysis.ageEqualOrAbove65Years,
      }),
    });
  }

  private parseAnalysisResult(raw: string | null): {
    diagnosis: string | null;
    totalHouseholdIncome: number | null;
    perCapitaIncome: number | null;
    eligibilityJustification: string | null;
    type: string | null;
    benefitStartDate: string | null;
    amount: number | null;
    analysisDetails: string | null;
    category: BpcElderlyAnalysisCategoryEnum | null;
    legalRequirementsMet: string | null;
    perCapitaIncomeBelowQuarterMinimumWage: string | null;
    ageEqualOrAbove65Years: string | null;
  } {
    const empty = {
      diagnosis: null,
      totalHouseholdIncome: null,
      perCapitaIncome: null,
      eligibilityJustification: null,
      type: null,
      benefitStartDate: null,
      amount: null,
      analysisDetails: null,
      category: null,
      legalRequirementsMet: null,
      perCapitaIncomeBelowQuarterMinimumWage: null,
      ageEqualOrAbove65Years: null,
    };

    if (raw === null) {
      return empty;
    }

    try {
      const parsed = JSON.parse(
        raw,
      ) as Partial<BpcElderlyAnalysisResultInterface>;

      return {
        diagnosis: parsed.diagnosis ?? null,
        totalHouseholdIncome: parsed.totalHouseholdIncome ?? null,
        perCapitaIncome: parsed.perCapitaIncome ?? null,
        eligibilityJustification: parsed.eligibilityJustification ?? null,
        type: parsed.type ?? null,
        benefitStartDate: parsed.benefitStartDate ?? null,
        amount: parsed.amount ?? null,
        analysisDetails: parsed.analysisDetails ?? null,
        category: parsed.category ?? null,
        legalRequirementsMet: parsed.legalRequirementsMet ?? null,
        perCapitaIncomeBelowQuarterMinimumWage:
          parsed.perCapitaIncomeBelowQuarterMinimumWage ?? null,
        ageEqualOrAbove65Years: parsed.ageEqualOrAbove65Years ?? null,
      };
    } catch {
      return empty;
    }
  }
}
