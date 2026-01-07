import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/implementation/model/input/generate-response.input.model';
import { ConversationCacheGateway } from '@module/customer/ai-conversation/conversation-cache/conversation-cache.gateway';
import { CalculateMessageCreditCostRequestDto } from '@module/customer/ai-conversation/dto/request/calculate-message-credit-cost.request.dto';
import { SendMessageRequestDto } from '@module/customer/ai-conversation/dto/request/send-message.request.dto';
import {
  SendMessageResponseDto,
  MessageItemDto,
} from '@module/customer/ai-conversation/dto/response/send-message.response.dto';
import { ConversationAccessDeniedError } from '@module/customer/ai-conversation/error/conversation-access-denied.error';
import { ConversationNotFoundError } from '@module/customer/ai-conversation/error/conversation-not-found.error';
import { MessageRoleEnum } from '@module/customer/ai-conversation/lib/mcp-tools/enum/message-role.enum';
import { McpToolsGateway } from '@module/customer/ai-conversation/lib/mcp-tools/mcp-tools.gateway';
import { MessageModel } from '@module/customer/ai-conversation/lib/mcp-tools/model/generic/message.model';
import { CalculateMessageCreditCostUseCase } from '@module/customer/ai-conversation/use-case/calculate-message-credit-cost.use-case';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class SendMessageUseCase {
  private static readonly MAX_HISTORY_MESSAGES = 10;

  protected readonly _type = SendMessageUseCase.name;

  public constructor(
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(ConversationCacheGateway)
    private readonly conversationCacheGateway: ConversationCacheGateway,
    @Inject(McpToolsGateway)
    private readonly mcpToolsGateway: McpToolsGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    private readonly calculateMessageCreditCostUseCase: CalculateMessageCreditCostUseCase,
  ) {}

  public async execute(
    conversationId: Guid,
    paymentPlanPaidResourceType: PaymentPlanPaidResourceTypeEnum,
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: SendMessageRequestDto,
  ): Promise<SendMessageResponseDto> {
    const costCalculation =
      await this.calculateMessageCreditCostUseCase.execute(
        CalculateMessageCreditCostRequestDto.build({
          message: dto.message,
          paymentPlanPaidResourceType: paymentPlanPaidResourceType,
        }),
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        paymentPlanPaidResourceType,
        sessionData.authIdentityId,
        costCalculation.token,
      );

    const conversation =
      await this.conversationCacheGateway.getConversation(conversationId);

    if (conversation === null) {
      throw new ConversationNotFoundError();
    }

    if (
      !conversation.organizationId.equals(
        organizationSessionData.organizationId,
      ) ||
      !conversation.authIdentityId.equals(sessionData.authIdentityId)
    ) {
      throw new ConversationAccessDeniedError();
    }

    const userMessage = MessageModel.build({
      id: new Guid(),
      conversationId,
      role: MessageRoleEnum.USER,
      content: dto.message,
      timestamp: new Date(),
    });

    await this.conversationCacheGateway.addMessage(userMessage);

    const history = await this.conversationCacheGateway.getMessageHistory(
      conversationId,
      SendMessageUseCase.MAX_HISTORY_MESSAGES,
    );

    const aiResponse = await this.generateAiResponse(
      dto.message,
      history,
      sessionData,
      organizationSessionData,
      paymentPlanPaidResourceType,
    );

    const assistantMessage = MessageModel.build({
      id: new Guid(),
      conversationId,
      role: MessageRoleEnum.ASSISTANT,
      content: aiResponse,
      timestamp: new Date(),
    });

    await this.conversationCacheGateway.addMessage(assistantMessage);

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
    ]);
    await transaction.commit();

    return SendMessageResponseDto.build({
      assistantMessage: MessageItemDto.build({
        content: assistantMessage.content,
        id: assistantMessage.id,
        role: assistantMessage.role,
        timestamp: assistantMessage.timestamp,
      }),
      userMessage: MessageItemDto.build({
        content: userMessage.content,
        id: userMessage.id,
        role: userMessage.role,
        timestamp: userMessage.timestamp,
      }),
    });
  }

  private async generateAiResponse(
    userMessage: string,
    history: Array<{ content: string; role: string }>,
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    paymentPlanPaidResourceType: PaymentPlanPaidResourceTypeEnum,
  ): Promise<string> {
    const mcpTools = await this.mcpToolsGateway.getAvailableTools();

    const toolHandlers: Record<
      string,
      (params: Record<string, unknown>) => Promise<unknown>
    > = {};

    for (const tool of mcpTools) {
      toolHandlers[tool.name] = async (
        params: Record<string, unknown>,
      ): Promise<unknown> => {
        try {
          const enrichedParams = {
            ...params,
            auth_identity_id: sessionData.authIdentityId.toString(),
            organization_id: organizationSessionData.organizationId.toString(),
          };

          return await this.mcpToolsGateway.executeToolCall(
            tool.name,
            enrichedParams,
          );
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro desconhecido';

          return {
            success: false,
            error: errorMessage,
            message:
              'Não foi possível executar a operação. Por favor, tente novamente.',
          };
        }
      };
    }

    const systemPrompt =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        paymentPlanPaidResourceType,
      );

    const aiResponse =
      await this.generativeIaGateway.generateFlashResponseFromPromptAndFiles(
        GenerateResponseInputModel.build({
          prompt: userMessage,
          promptFiles: [],
          systemInstruction: systemPrompt.prompt,
          conversationHistory: history,
          tools: mcpTools,
          toolHandlers,
        }),
      );

    if (aiResponse === null) {
      return 'Desculpe, não foi possível gerar uma resposta no momento.';
    }

    return aiResponse.trim();
  }
}
