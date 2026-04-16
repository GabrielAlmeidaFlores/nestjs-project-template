import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { GeneralUrbanRetirementDenialCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial/command/general-urban-retirement-denial.command.repository.gateway';
import { GeneralUrbanRetirementDenialQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial/query/general-urban-retirement-denial.query.repository.gateway';
import { GeneralUrbanRetirementDenialResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-result/command/general-urban-retirement-denial-result.command.repository.gateway';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-result/general-urban-retirement-denial-result.entity';
import { CreateGeneralUrbanRetirementDenialInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/create-general-urban-retirement-denial-inss-decision-analysis.response.dto';
import { GeneralUrbanRetirementDenialNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/general-urban-retirement-denial-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateGeneralUrbanRetirementDenialInssDecisionAnalysisUseCase {
  protected readonly _type =
    CreateGeneralUrbanRetirementDenialInssDecisionAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(GeneralUrbanRetirementDenialQueryRepositoryGateway)
    private readonly generalUrbanRetirementDenialQueryRepositoryGateway: GeneralUrbanRetirementDenialQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementDenialCommandRepositoryGateway)
    private readonly generalUrbanRetirementDenialCommandRepositoryGateway: GeneralUrbanRetirementDenialCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementDenialResultCommandRepositoryGateway)
    private readonly generalUrbanRetirementDenialResultCommandRepositoryGateway: GeneralUrbanRetirementDenialResultCommandRepositoryGateway,
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
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
  ): Promise<CreateGeneralUrbanRetirementDenialInssDecisionAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const generalUrbanRetirementDenial =
      await this.generalUrbanRetirementDenialQueryRepositoryGateway.findOneByGeneralUrbanRetirementDenialIdOrFailWithRelations(
        generalUrbanRetirementDenialId,
        GeneralUrbanRetirementDenialNotFoundError,
      );

    const existingResult =
      generalUrbanRetirementDenial.generalUrbanRetirementDenialResult;

    const documentBuffers = await this.buildDocumentBuffers(
      generalUrbanRetirementDenial,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_INSS_DECISION_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_INSS_DECISION_ANALYSIS,
        organizationMember.id,
      );

    const inssDecisionAnalysis =
      await this.analysisProcessorGateway.getGeneralUrbanRetirementDenialInssDecisionAnalysis(
        promptResponse.prompt,
        documentBuffers,
      );

    const inssDecisionAnalysisText = inssDecisionAnalysis ?? '';

    const resultEntity = new GeneralUrbanRetirementDenialResultEntity({
      ...(existingResult !== null && { id: existingResult.id }),
      inssDecisionAnalysis: inssDecisionAnalysisText,
      firstAnalysis: existingResult?.firstAnalysis ?? null,
    });

    const resultTransaction =
      existingResult !== null
        ? this.generalUrbanRetirementDenialResultCommandRepositoryGateway.updateGeneralUrbanRetirementDenialResult(
            existingResult.id,
            resultEntity,
          )
        : this.generalUrbanRetirementDenialResultCommandRepositoryGateway.createGeneralUrbanRetirementDenialResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (existingResult === null) {
      transactionOperations.push(
        this.generalUrbanRetirementDenialCommandRepositoryGateway.updateGeneralUrbanRetirementDenialResultId(
          generalUrbanRetirementDenialId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateGeneralUrbanRetirementDenialInssDecisionAnalysisResponseDto.build(
      {
        inssDecisionAnalysis: inssDecisionAnalysisText,
      },
    );
  }

  private async buildDocumentBuffers(
    generalUrbanRetirementDenial: Awaited<
      ReturnType<
        typeof this.generalUrbanRetirementDenialQueryRepositoryGateway.findOneByGeneralUrbanRetirementDenialIdOrFailWithRelations
      >
    >,
  ): Promise<Buffer[]> {
    return Promise.all(
      (
        generalUrbanRetirementDenial.generalUrbanRetirementDenialDocument ?? []
      ).map((document) =>
        this.fileProcessorGateway.getFileBuffer(document.document),
      ),
    );
  }
}
