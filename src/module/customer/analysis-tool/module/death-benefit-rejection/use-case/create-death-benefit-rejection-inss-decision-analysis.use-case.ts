import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DeathBenefitRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection/command/death-benefit-rejection.command.repository.gateway';
import { DeathBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection/query/death-benefit-rejection.query.repository.gateway';
import { DeathBenefitRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-result/command/death-benefit-rejection-result.command.repository.gateway';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/death-benefit-rejection-result.entity';
import { CreateDeathBenefitRejectionInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/create-death-benefit-rejection-inss-decision-analysis.response.dto';
import { DeathBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-rejection/error/death-benefit-rejection-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { GetDeathBenefitRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection/query/result/get-death-benefit-rejection-with-relations.query.result';

@Injectable()
export class CreateDeathBenefitRejectionInssDecisionAnalysisUseCase {
  protected readonly _type =
    CreateDeathBenefitRejectionInssDecisionAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(DeathBenefitRejectionQueryRepositoryGateway)
    private readonly deathBenefitRejectionQueryRepositoryGateway: DeathBenefitRejectionQueryRepositoryGateway,
    @Inject(DeathBenefitRejectionCommandRepositoryGateway)
    private readonly deathBenefitRejectionCommandRepositoryGateway: DeathBenefitRejectionCommandRepositoryGateway,
    @Inject(DeathBenefitRejectionResultCommandRepositoryGateway)
    private readonly deathBenefitRejectionResultCommandRepositoryGateway: DeathBenefitRejectionResultCommandRepositoryGateway,
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
    deathBenefitRejectionId: DeathBenefitRejectionId,
  ): Promise<CreateDeathBenefitRejectionInssDecisionAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const deathBenefitRejection =
      await this.deathBenefitRejectionQueryRepositoryGateway.findOneByDeathBenefitRejectionIdOrFailWithRelations(
        deathBenefitRejectionId,
        DeathBenefitRejectionNotFoundError,
      );

    const existingResult = deathBenefitRejection.deathBenefitRejectionResult;

    const documentBuffers = await this.buildDocumentBuffers(
      deathBenefitRejection,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_INSS_DECISION_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_INSS_DECISION_ANALYSIS,
        organizationMember.id,
      );

    const inssDecisionAnalysis =
      await this.analysisProcessorGateway.getDeathBenefitRejectionInssDecisionAnalysis(
        promptResponse.prompt,
        documentBuffers,
      );

    const inssDecisionAnalysisText = inssDecisionAnalysis ?? '';

    const resultEntity = new DeathBenefitRejectionResultEntity({
      ...(existingResult !== null && { id: existingResult.id }),
      deathBenefitRejectionInssDecisionAnalysis: inssDecisionAnalysisText,
      deathBenefitRejectionFirstAnalysis:
        existingResult?.deathBenefitRejectionFirstAnalysis ?? null,
      deathBenefitRejectionCompleteAnalysis:
        existingResult?.deathBenefitRejectionCompleteAnalysis ?? null,
      deathBenefitRejectionSimplifiedAnalysis:
        existingResult?.deathBenefitRejectionSimplifiedAnalysis ?? null,
      deathBenefitRejectionCompleteAnalysisDownload:
        existingResult?.deathBenefitRejectionCompleteAnalysisDownload ?? null,
    });

    const resultTransaction =
      existingResult !== null
        ? this.deathBenefitRejectionResultCommandRepositoryGateway.updateDeathBenefitRejectionResult(
            existingResult.id,
            resultEntity,
          )
        : this.deathBenefitRejectionResultCommandRepositoryGateway.createDeathBenefitRejectionResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (existingResult === null) {
      transactionOperations.push(
        this.deathBenefitRejectionCommandRepositoryGateway.updateDeathBenefitRejectionResultId(
          deathBenefitRejectionId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateDeathBenefitRejectionInssDecisionAnalysisResponseDto.build({
      inssDecisionAnalysis: inssDecisionAnalysisText,
    });
  }

  private async buildDocumentBuffers(
    deathBenefitRejection: GetDeathBenefitRejectionWithRelationsQueryResult,
  ): Promise<Buffer[]> {
    return Promise.all(
      (
        deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
          ?.deathBenefitRejectionDocument ?? []
      ).map((document) =>
        this.fileProcessorGateway.getFileBuffer(document.document),
      ),
    );
  }
}
