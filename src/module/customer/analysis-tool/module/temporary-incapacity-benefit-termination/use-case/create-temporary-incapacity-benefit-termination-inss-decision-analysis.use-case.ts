import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TemporaryIncapacityBenefitTerminationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination/command/temporary-incapacity-benefit-termination.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination/query/temporary-incapacity-benefit-termination.query.repository.gateway';
import { TemporaryIncapacityBenefitTerminationResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-result/command/temporary-incapacity-benefit-termination-result.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { TemporaryIncapacityBenefitTerminationResultEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-result/temporary-incapacity-benefit-termination-result.entity';
import { TemporaryIncapacityBenefitTerminationResultId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-result/value-object/temporary-incapacity-benefit-termination-result-id.value-object';
import { CreateTemporaryIncapacityBenefitTerminationInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/create-temporary-incapacity-benefit-termination-inss-decision-analysis.response.dto';
import { TemporaryIncapacityBenefitTerminationNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/error/temporary-incapacity-benefit-termination-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateTemporaryIncapacityBenefitTerminationInssDecisionAnalysisUseCase {
  protected readonly _type =
    CreateTemporaryIncapacityBenefitTerminationInssDecisionAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(TemporaryIncapacityBenefitTerminationQueryRepositoryGateway)
    private readonly temporaryIncapacityBenefitTerminationQueryRepositoryGateway: TemporaryIncapacityBenefitTerminationQueryRepositoryGateway,
    @Inject(TemporaryIncapacityBenefitTerminationCommandRepositoryGateway)
    private readonly temporaryIncapacityBenefitTerminationCommandRepositoryGateway: TemporaryIncapacityBenefitTerminationCommandRepositoryGateway,
    @Inject(TemporaryIncapacityBenefitTerminationResultCommandRepositoryGateway)
    private readonly temporaryIncapacityBenefitTerminationResultCommandRepositoryGateway: TemporaryIncapacityBenefitTerminationResultCommandRepositoryGateway,
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
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
  ): Promise<CreateTemporaryIncapacityBenefitTerminationInssDecisionAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const temporaryIncapacityBenefitTermination =
      await this.temporaryIncapacityBenefitTerminationQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitTerminationIdOrFailWithRelations(
        temporaryIncapacityBenefitTerminationId,
        TemporaryIncapacityBenefitTerminationNotFoundError,
      );

    const existingResult = temporaryIncapacityBenefitTermination.result;

    const documentBuffers = await this.buildDocumentBuffers(
      temporaryIncapacityBenefitTermination,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_INCAPACITY_BENEFIT_TERMINATION_INSS_DECISION_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_INCAPACITY_BENEFIT_TERMINATION_INSS_DECISION_ANALYSIS,
        organizationMember.id,
      );

    const inssDecisionAnalysis =
      await this.analysisProcessorGateway.getTemporaryIncapacityBenefitTerminationInssDecisionAnalysis(
        promptResponse.prompt,
        documentBuffers,
      );

    const inssDecisionAnalysisText = inssDecisionAnalysis ?? '';
    const resultId =
      existingResult !== null
        ? new TemporaryIncapacityBenefitTerminationResultId(existingResult.id)
        : new TemporaryIncapacityBenefitTerminationResultId();

    const resultEntity = new TemporaryIncapacityBenefitTerminationResultEntity({
      ...(existingResult !== null && { id: existingResult.id }),
      id: resultId,
      inssDecisionAnalysis: inssDecisionAnalysisText,
      firstAnalysis: existingResult?.firstAnalysis ?? null,
      completeAnalysis: existingResult?.completeAnalysis ?? null,
      completeAnalysisDownload:
        existingResult?.completeAnalysisDownload ?? null,
      simplifiedAnalysis: existingResult?.simplifiedAnalysis ?? null,
    });

    const resultTransaction =
      existingResult !== null
        ? this.temporaryIncapacityBenefitTerminationResultCommandRepositoryGateway.updateTemporaryIncapacityBenefitTerminationResult(
            resultEntity,
          )
        : this.temporaryIncapacityBenefitTerminationResultCommandRepositoryGateway.createTemporaryIncapacityBenefitTerminationResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (existingResult === null) {
      transactionOperations.push(
        this.temporaryIncapacityBenefitTerminationCommandRepositoryGateway.updateTemporaryIncapacityBenefitTerminationResultId(
          temporaryIncapacityBenefitTerminationId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateTemporaryIncapacityBenefitTerminationInssDecisionAnalysisResponseDto.build(
      {
        temporaryIncapacityBenefitTerminationId,
        inssDecisionAnalysis: inssDecisionAnalysisText,
      },
    );
  }

  private async buildDocumentBuffers(
    temporaryIncapacityBenefitTermination: Awaited<
      ReturnType<
        typeof this.temporaryIncapacityBenefitTerminationQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitTerminationIdOrFailWithRelations
      >
    >,
  ): Promise<Buffer[]> {
    return Promise.all(
      temporaryIncapacityBenefitTermination.documents.map((document) =>
        this.fileProcessorGateway.getFileBuffer(document.fileName),
      ),
    );
  }
}
