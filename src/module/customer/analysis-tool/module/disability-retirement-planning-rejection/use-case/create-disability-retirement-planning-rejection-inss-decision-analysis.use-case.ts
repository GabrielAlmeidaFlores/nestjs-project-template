import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DisabilityRetirementPlanningRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection/command/disability-retirement-planning-rejection.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection/query/disability-retirement-planning-rejection.query.repository.gateway';
import { DisabilityRetirementPlanningRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-result/command/disability-retirement-planning-rejection-result.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { DisabilityRetirementPlanningRejectionResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/disability-retirement-planning-rejection-result.entity';
import { CreateDisabilityRetirementPlanningRejectionInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/create-disability-retirement-planning-rejection-inss-decision-analysis.response.dto';
import { DisabilityRetirementPlanningRejectionNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/disability-retirement-planning-rejection-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateDisabilityRetirementPlanningRejectionInssDecisionAnalysisUseCase {
  protected readonly _type =
    CreateDisabilityRetirementPlanningRejectionInssDecisionAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(DisabilityRetirementPlanningRejectionQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningRejectionQueryRepositoryGateway: DisabilityRetirementPlanningRejectionQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningRejectionCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningRejectionCommandRepositoryGateway: DisabilityRetirementPlanningRejectionCommandRepositoryGateway,
    @Inject(DisabilityRetirementPlanningRejectionResultCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningRejectionResultCommandRepositoryGateway: DisabilityRetirementPlanningRejectionResultCommandRepositoryGateway,
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
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
  ): Promise<CreateDisabilityRetirementPlanningRejectionInssDecisionAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const disabilityRetirementPlanningRejection =
      await this.disabilityRetirementPlanningRejectionQueryRepositoryGateway.findOneByDisabilityRetirementPlanningRejectionIdOrFailWithRelations(
        disabilityRetirementPlanningRejectionId,
        DisabilityRetirementPlanningRejectionNotFoundError,
      );

    const existingResult =
      disabilityRetirementPlanningRejection.disabilityRetirementPlanningRejectionResult;

    const documentBuffers = await this.buildDocumentBuffers(
      disabilityRetirementPlanningRejection,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_INSS_DECISION_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_INSS_DECISION_ANALYSIS,
        organizationMember.id,
      );

    const inssDecisionAnalysis =
      await this.analysisProcessorGateway.getDisabilityRetirementPlanningRejectionInssDecisionAnalysis(
        promptResponse.prompt,
        documentBuffers,
      );

    const inssDecisionAnalysisText = inssDecisionAnalysis ?? '';

    const resultEntity = new DisabilityRetirementPlanningRejectionResultEntity({
      ...(existingResult !== null && { id: existingResult.id }),
      inssDecisionAnalysis: inssDecisionAnalysisText,
      firstAnalysis: existingResult?.firstAnalysis ?? null,
    });

    const resultTransaction =
      existingResult !== null
        ? this.disabilityRetirementPlanningRejectionResultCommandRepositoryGateway.updateDisabilityRetirementPlanningRejectionResult(
            existingResult.id,
            resultEntity,
          )
        : this.disabilityRetirementPlanningRejectionResultCommandRepositoryGateway.createDisabilityRetirementPlanningRejectionResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (existingResult === null) {
      transactionOperations.push(
        this.disabilityRetirementPlanningRejectionCommandRepositoryGateway.updateDisabilityRetirementPlanningRejectionResultId(
          disabilityRetirementPlanningRejectionId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateDisabilityRetirementPlanningRejectionInssDecisionAnalysisResponseDto.build(
      {
        inssDecisionAnalysis: inssDecisionAnalysisText,
      },
    );
  }

  private async buildDocumentBuffers(
    disabilityRetirementPlanningRejection: Awaited<
      ReturnType<
        typeof this.disabilityRetirementPlanningRejectionQueryRepositoryGateway.findOneByDisabilityRetirementPlanningRejectionIdOrFailWithRelations
      >
    >,
  ): Promise<Buffer[]> {
    return Promise.all(
      (
        disabilityRetirementPlanningRejection.disabilityRetirementPlanningRejectionDocument ??
        []
      ).map((document) =>
        this.fileProcessorGateway.getFileBuffer(document.document),
      ),
    );
  }
}
