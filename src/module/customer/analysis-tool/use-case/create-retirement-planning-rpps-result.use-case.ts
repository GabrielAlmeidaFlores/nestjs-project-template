import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { ConversationCommandRepositoryGateway } from '@module/ai/domain/repository/conversation/command/conversation.command.repository.gateway';
import { ConversationEntity } from '@module/ai/domain/schema/entity/conversation/conversation.entity';
import { ChatPersonaTypeEnum } from '@module/ai/domain/schema/entity/conversation-tool-policy/enum/chat-persona-type.enum';
import { GetConversationResponseDto } from '@module/ai/dto/response/get-conversation.response.dto';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { RetirementPlanningRppsCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/command/retirement-planning-rpps.command.repository.gateway';
import { RetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/query/retirement-planning-rpps.query.repository.gateway';
import { RetirementPlanningRppsResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-result/command/retirement-planning-rpps-result.command.repository.gateway';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { RetirementPlanningRppsResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-result/retirement-planning-rpps-result.entity';
import { CreateRetirementPlanningRppsResultResponseDto } from '@module/customer/analysis-tool/dto/response/create-retirement-planning-rpps-result.response.dto';
import { FailedToGenerateRetirementPlanningRppsAnalysisError } from '@module/customer/analysis-tool/error/failed-to-generate-retirement-planning-rpps-analysis.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RetirementPlanningRppsNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rpps-not-found.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateRetirementPlanningRppsResultUseCase {
  protected readonly _type = CreateRetirementPlanningRppsResultUseCase.name;

  public constructor(
    @Inject(AnalysisProcessorGateway)
    protected readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPlanningRppsQueryRepositoryGateway)
    private readonly retirementPlanningRppsQueryRepositoryGateway: RetirementPlanningRppsQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(RetirementPlanningRppsCommandRepositoryGateway)
    private readonly retirementPlanningRppsCommandRepositoryGateway: RetirementPlanningRppsCommandRepositoryGateway,
    @Inject(RetirementPlanningRppsResultCommandRepositoryGateway)
    private readonly retirementPlanningRppsResultCommandRepositoryGateway: RetirementPlanningRppsResultCommandRepositoryGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
    @Inject(ConversationCommandRepositoryGateway)
    private readonly conversationCommandRepositoryGateway: ConversationCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPlanningRppsId: RetirementPlanningRppsId,
  ): Promise<CreateRetirementPlanningRppsResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const customer =
      await this.customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

    const retirementPlanningRppsQueryResult =
      await this.retirementPlanningRppsQueryRepositoryGateway.findOneByRetirementPlanningIdAndOrganizationIdWithRelationsOrFail(
        retirementPlanningRppsId,
        organizationSessionData.organizationId,
        RetirementPlanningRppsNotFoundError,
      );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisData = {
      careerStartDate: retirementPlanningRppsQueryResult.careerStartDate,
      publicServiceStartDate:
        retirementPlanningRppsQueryResult.publicServiceStartDate,
      ctcDocuments: retirementPlanningRppsQueryResult.ctcDocuments,
      periods: retirementPlanningRppsQueryResult.periods,
      remunerations: retirementPlanningRppsQueryResult.remunerations,
    };

    const documentsBuffer: Buffer[] = [
      Buffer.from(JSON.stringify(analysisData, null, 2), 'utf-8'),
    ];

    const retirementPlanningRppsCompleteAnalysis =
      await this.analysisProcessorGateway.getRetirementPlanningRppsCompleteAnalysis(
        promptResponse.prompt,
        documentsBuffer,
      );

    if (retirementPlanningRppsCompleteAnalysis === null) {
      throw new FailedToGenerateRetirementPlanningRppsAnalysisError();
    }

    const retirementPlanningRppsResult = new RetirementPlanningRppsResultEntity(
      {
        retirementPlanningRppsCompleteAnalysis,
        retirementPlanningRppsSimplifiedAnalysis: null,
      },
    );

    const retirementPlanningRpps = new RetirementPlanningRppsEntity({
      id: retirementPlanningRppsQueryResult.id,
      careerStartDate: retirementPlanningRppsQueryResult.careerStartDate,
      publicServiceStartDate:
        retirementPlanningRppsQueryResult.publicServiceStartDate,
      retirementPlanningRppsResult,
    });

    const conversationEntity = new ConversationEntity({
      customerId: new CustomerId(customer.id.toString()),
      assistantType: ChatPersonaTypeEnum.DUVIDAS_PREVIDENCIARIAS,
      status: null,
      lastAIMessageAt: null,
      contextPrompt:
        retirementPlanningRppsResult.retirementPlanningRppsCompleteAnalysis,
      archivedAt: null,
      createdAt: new Date(),
    });

    const createConversationTransaction =
      this.conversationCommandRepositoryGateway.createConversation(
        conversationEntity,
      );

    const retirementPlanningRppsTransaction =
      this.retirementPlanningRppsCommandRepositoryGateway.updateRetirementPlanningRpps(
        retirementPlanningRpps.id,
        retirementPlanningRpps,
      );

    const retirementPlanningRppsResultTransaction =
      this.retirementPlanningRppsResultCommandRepositoryGateway.createRetirementPlanningRppsResult(
        retirementPlanningRppsResult,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      retirementPlanningRppsResultTransaction,
      createConversationTransaction,
      retirementPlanningRppsTransaction,
    ]);

    await transaction.commit();

    const conversation = GetConversationResponseDto.build({
      ...conversationEntity,
    });

    return CreateRetirementPlanningRppsResultResponseDto.build({
      retirementPlanningRppsCompleteAnalysis,
      conversation,
    });
  }
}
