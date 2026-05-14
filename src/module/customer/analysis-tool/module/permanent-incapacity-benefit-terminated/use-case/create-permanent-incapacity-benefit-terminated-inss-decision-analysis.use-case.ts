import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { PermanentIncapacityBenefitTerminatedCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated/command/permanent-incapacity-benefit-terminated.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated/query/permanent-incapacity-benefit-terminated.query.repository.gateway';
import { PermanentIncapacityBenefitTerminatedResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-result/command/permanent-incapacity-benefit-terminated-result.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedResultEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-result/permanent-incapacity-benefit-terminated-result.entity';
import { PermanentIncapacityBenefitTerminatedResultId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-result/value-object/permanent-incapacity-benefit-terminated-result-id.value-object';
import { CreatePermanentIncapacityBenefitTerminatedInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/create-permanent-incapacity-benefit-terminated-inss-decision-analysis.response.dto';
import { PermanentIncapacityBenefitTerminatedNotFoundError } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/error/permanent-incapacity-benefit-terminated-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreatePermanentIncapacityBenefitTerminatedInssDecisionAnalysisUseCase {
  protected readonly _type =
    CreatePermanentIncapacityBenefitTerminatedInssDecisionAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(PermanentIncapacityBenefitTerminatedQueryRepositoryGateway)
    private readonly permanentIncapacityBenefitTerminatedQueryRepositoryGateway: PermanentIncapacityBenefitTerminatedQueryRepositoryGateway,
    @Inject(PermanentIncapacityBenefitTerminatedCommandRepositoryGateway)
    private readonly permanentIncapacityBenefitTerminatedCommandRepositoryGateway: PermanentIncapacityBenefitTerminatedCommandRepositoryGateway,
    @Inject(PermanentIncapacityBenefitTerminatedResultCommandRepositoryGateway)
    private readonly permanentIncapacityBenefitTerminatedResultCommandRepositoryGateway: PermanentIncapacityBenefitTerminatedResultCommandRepositoryGateway,
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
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
  ): Promise<CreatePermanentIncapacityBenefitTerminatedInssDecisionAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const permanentIncapacityBenefitTerminated =
      await this.permanentIncapacityBenefitTerminatedQueryRepositoryGateway.findOneByPermanentIncapacityBenefitTerminatedIdOrFailWithRelations(
        permanentIncapacityBenefitTerminatedId,
        PermanentIncapacityBenefitTerminatedNotFoundError,
      );

    const existingResult = permanentIncapacityBenefitTerminated.result;

    const documentBuffers = await this.buildDocumentBuffers(
      permanentIncapacityBenefitTerminated,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_INSS_DECISION_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_INSS_DECISION_ANALYSIS,
        organizationMember.id,
      );

    const inssDecisionAnalysis =
      await this.analysisProcessorGateway.getPermanentIncapacityBenefitTerminatedInssDecisionAnalysis(
        promptResponse.prompt,
        documentBuffers,
      );

    const inssDecisionAnalysisText = inssDecisionAnalysis ?? '';
    const resultId =
      existingResult !== null
        ? new PermanentIncapacityBenefitTerminatedResultId(existingResult.id)
        : new PermanentIncapacityBenefitTerminatedResultId();

    const resultEntity = new PermanentIncapacityBenefitTerminatedResultEntity({
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
        ? this.permanentIncapacityBenefitTerminatedResultCommandRepositoryGateway.updatePermanentIncapacityBenefitTerminatedResult(
            resultEntity,
          )
        : this.permanentIncapacityBenefitTerminatedResultCommandRepositoryGateway.createPermanentIncapacityBenefitTerminatedResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (existingResult === null) {
      transactionOperations.push(
        this.permanentIncapacityBenefitTerminatedCommandRepositoryGateway.updatePermanentIncapacityBenefitTerminatedResultId(
          permanentIncapacityBenefitTerminatedId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreatePermanentIncapacityBenefitTerminatedInssDecisionAnalysisResponseDto.build(
      {
        permanentIncapacityBenefitTerminatedId,
        inssDecisionAnalysis: inssDecisionAnalysisText,
      },
    );
  }

  private async buildDocumentBuffers(
    permanentIncapacityBenefitTerminated: Awaited<
      ReturnType<
        typeof this.permanentIncapacityBenefitTerminatedQueryRepositoryGateway.findOneByPermanentIncapacityBenefitTerminatedIdOrFailWithRelations
      >
    >,
  ): Promise<Buffer[]> {
    return Promise.all(
      permanentIncapacityBenefitTerminated.documents.map((document) =>
        this.fileProcessorGateway.getFileBuffer(document.fileName),
      ),
    );
  }
}
