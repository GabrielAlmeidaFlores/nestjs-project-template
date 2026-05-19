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
import { BpcElderlyCessationDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-document/enum/bpc-elderly-cessation-document-type.enum';
import { BpcElderlyCessationResultEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-result/bpc-elderly-cessation-result.entity';
import { CreateBpcElderlyCessationInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/response/create-bpc-elderly-cessation-inss-decision-analysis.response.dto';
import { BpcElderlyCessationAdministrativeProcedureNotPresentError } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/error/bpc-elderly-cessation-administrative-procedure-not-present.error';
import { BpcElderlyCessationNotFoundError } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/error/bpc-elderly-cessation-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateBpcElderlyCessationInssDecisionAnalysisUseCase {
  protected readonly _type =
    CreateBpcElderlyCessationInssDecisionAnalysisUseCase.name;

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
  ): Promise<CreateBpcElderlyCessationInssDecisionAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

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

    const administrativeProcedureDocuments =
      bpcElderlyCessation.bpcElderlyCessationDocument.filter((document) =>
        [
          BpcElderlyCessationDocumentTypeEnum.ADMINISTRATIVE_PROCEDURE,
          BpcElderlyCessationDocumentTypeEnum.CESSATION_OR_SUSPENSION_DECISION,
          BpcElderlyCessationDocumentTypeEnum.SUSPENSION_OR_CESSATION_ADMINISTRATIVE_PROCEDURE,
        ].includes(document.type),
      );

    if (administrativeProcedureDocuments.length === 0) {
      throw new BpcElderlyCessationAdministrativeProcedureNotPresentError();
    }

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.BPC_ELDERLY_CESSATION_INSS_DECISION_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.BPC_ELDERLY_CESSATION_INSS_DECISION_ANALYSIS,
        organizationMember.id,
      );

    const documentBuffers = await Promise.all(
      administrativeProcedureDocuments.map((document) =>
        this.fileProcessorGateway.getFileBuffer(document.document),
      ),
    );

    const inssDecisionAnalysis =
      await this.analysisProcessorGateway.getBpcElderlyCessationInssDecisionAnalysis(
        promptResponse.prompt,
        documentBuffers,
      );

    const existingResult = bpcElderlyCessation.bpcElderlyCessationResult;
    const resultEntity = new BpcElderlyCessationResultEntity({
      ...(existingResult !== null && { id: existingResult.id }),
      inssDecisionAnalysis: inssDecisionAnalysis ?? '',
      firstAnalysis: existingResult?.firstAnalysis ?? null,
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

    return CreateBpcElderlyCessationInssDecisionAnalysisResponseDto.build({
      inssDecisionAnalysis: inssDecisionAnalysis ?? '',
    });
  }
}
