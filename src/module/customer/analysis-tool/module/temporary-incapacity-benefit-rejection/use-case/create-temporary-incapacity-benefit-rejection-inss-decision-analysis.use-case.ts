import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TemporaryIncapacityBenefitRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection/command/temporary-incapacity-benefit-rejection.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection/query/temporary-incapacity-benefit-rejection.query.repository.gateway';
import { TemporaryIncapacityBenefitRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-result/command/temporary-incapacity-benefit-rejection-result.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { TemporaryIncapacityBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-result/temporary-incapacity-benefit-rejection-result.entity';
import { TemporaryIncapacityBenefitRejectionResultId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-result/value-object/temporary-incapacity-benefit-rejection-result-id.value-object';
import { CreateTemporaryIncapacityBenefitRejectionInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/create-temporary-incapacity-benefit-rejection-inss-decision-analysis.response.dto';
import { TemporaryIncapacityBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/error/temporary-incapacity-benefit-rejection-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateTemporaryIncapacityBenefitRejectionInssDecisionAnalysisUseCase {
  protected readonly _type =
    CreateTemporaryIncapacityBenefitRejectionInssDecisionAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(TemporaryIncapacityBenefitRejectionQueryRepositoryGateway)
    private readonly temporaryIncapacityBenefitRejectionQueryRepositoryGateway: TemporaryIncapacityBenefitRejectionQueryRepositoryGateway,
    @Inject(TemporaryIncapacityBenefitRejectionCommandRepositoryGateway)
    private readonly temporaryIncapacityBenefitRejectionCommandRepositoryGateway: TemporaryIncapacityBenefitRejectionCommandRepositoryGateway,
    @Inject(TemporaryIncapacityBenefitRejectionResultCommandRepositoryGateway)
    private readonly temporaryIncapacityBenefitRejectionResultCommandRepositoryGateway: TemporaryIncapacityBenefitRejectionResultCommandRepositoryGateway,
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
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
  ): Promise<CreateTemporaryIncapacityBenefitRejectionInssDecisionAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const temporaryIncapacityBenefitRejection =
      await this.temporaryIncapacityBenefitRejectionQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitRejectionIdOrFailWithRelations(
        temporaryIncapacityBenefitRejectionId,
        TemporaryIncapacityBenefitRejectionNotFoundError,
      );

    const existingResult = temporaryIncapacityBenefitRejection.result;

    const documentBuffers = await this.buildDocumentBuffers(
      temporaryIncapacityBenefitRejection,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_INCAPACITY_BENEFIT_REJECTION_INSS_DECISION_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_INCAPACITY_BENEFIT_REJECTION_INSS_DECISION_ANALYSIS,
        organizationMember.id,
      );

    const inssDecisionAnalysis =
      await this.analysisProcessorGateway.getTemporaryIncapacityBenefitRejectionInssDecisionAnalysis(
        promptResponse.prompt,
        documentBuffers,
      );

    const inssDecisionAnalysisText = inssDecisionAnalysis ?? '';
    const resultId =
      existingResult !== null
        ? new TemporaryIncapacityBenefitRejectionResultId(existingResult.id)
        : new TemporaryIncapacityBenefitRejectionResultId();

    const resultEntity = new TemporaryIncapacityBenefitRejectionResultEntity({
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
        ? this.temporaryIncapacityBenefitRejectionResultCommandRepositoryGateway.updateTemporaryIncapacityBenefitRejectionResult(
            resultEntity,
          )
        : this.temporaryIncapacityBenefitRejectionResultCommandRepositoryGateway.createTemporaryIncapacityBenefitRejectionResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (existingResult === null) {
      transactionOperations.push(
        this.temporaryIncapacityBenefitRejectionCommandRepositoryGateway.updateTemporaryIncapacityBenefitRejectionResultId(
          temporaryIncapacityBenefitRejectionId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateTemporaryIncapacityBenefitRejectionInssDecisionAnalysisResponseDto.build(
      {
        temporaryIncapacityBenefitRejectionId,
        inssDecisionAnalysis: inssDecisionAnalysisText,
      },
    );
  }

  private async buildDocumentBuffers(
    temporaryIncapacityBenefitRejection: Awaited<
      ReturnType<
        typeof this.temporaryIncapacityBenefitRejectionQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitRejectionIdOrFailWithRelations
      >
    >,
  ): Promise<Buffer[]> {
    return Promise.all(
      temporaryIncapacityBenefitRejection.documents.map((document) =>
        this.fileProcessorGateway.getFileBuffer(document.fileName),
      ),
    );
  }
}
