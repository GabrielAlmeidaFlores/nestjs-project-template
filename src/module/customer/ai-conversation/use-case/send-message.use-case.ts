import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { BucketGateway } from '@infra/bucket/bucket.gateway';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/implementation/model/input/generate-response.input.model';
import { ConversationCacheGateway } from '@module/customer/ai-conversation/conversation-cache/conversation-cache.gateway';
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
    @Inject(BucketGateway)
    private readonly bucketGateway: BucketGateway,
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
        paymentPlanPaidResourceType,
        dto,
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
      content: dto.json.message,
      timestamp: new Date(),
    });

    const uploadedFiles: Array<{ fileName: string; url: URL }> = [];
    if (dto.file !== undefined && dto.file.length > 0) {
      for (const file of dto.file) {
        const fileName = await this.bucketGateway.create(file);
        const temporaryUrl = await this.bucketGateway.getSignedUrl(fileName);
        uploadedFiles.push({ fileName, url: temporaryUrl });

        const originalFileName =
          await this.bucketGateway.getOriginalFileName(fileName);
        const fileMessage = MessageModel.build({
          id: new Guid(),
          conversationId,
          role: MessageRoleEnum.USER,
          content: `<a href="${temporaryUrl.toString()}" mimetype="${file.mimeType}" target="_blank">${originalFileName}</a>`,
          timestamp: new Date(),
        });

        await this.conversationCacheGateway.addMessage(fileMessage);
      }
    }

    await this.conversationCacheGateway.addMessage(userMessage);

    const history = await this.conversationCacheGateway.getMessageHistory(
      conversationId,
      SendMessageUseCase.MAX_HISTORY_MESSAGES,
    );

    const aiResponse = await this.generateAiResponse(
      dto,
      uploadedFiles,
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
    dto: SendMessageRequestDto,
    uploadedFiles: Array<{ fileName: string; url: URL }>,
    history: Array<{ content: string; role: string }>,
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    paymentPlanPaidResourceType: PaymentPlanPaidResourceTypeEnum,
  ): Promise<string> {
    const mcpTools = await this.mcpToolsGateway.getAvailableTools();

    dto.json.message = `
${dto.json.message}

organizationId: ${organizationSessionData.organizationId.toString()}
authIdentityId: ${sessionData.authIdentityId.toString()}
`;

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

    const enhancedSystemPrompt = `${systemPrompt.prompt}

**IMPORTANTE - FORMATO DE APRESENTAÇÃO DE DADOS:**
- ❌ NUNCA mencione IDs técnicos (UUIDs) ao usuário - são apenas para uso interno nas ferramentas
- ✅ Para CLIENTES: Use NOME completo e CPF (ex: "João Silva - CPF: 123.456.789-00")
- ✅ Para ANÁLISES: Use o CÓDIGO da análise (ex: "Análise #CNIS-2024-001")
- ✅ Para PETIÇÕES/PEÇAS: Use o CÓDIGO da peça
- ✅ Para DATAS: Formate de forma legível (ex: "07/01/2026 às 10:30")
- ✅ Seja objetivo e apresente informações de forma organizada com bullet points quando listar múltiplos itens
- ✅ Quando pedir informações ao usuário, NUNCA peça IDs técnicos - peça nome, CPF ou código identificador amigável
`;

    const promptFiles: Buffer[] = [];
    for (const uploadedFile of uploadedFiles) {
      const fileBuffer = await this.bucketGateway.getBuffer(
        uploadedFile.fileName,
      );
      promptFiles.push(fileBuffer);
    }

    const aiResponse =
      await this.generativeIaGateway.generateFlashResponseFromPromptAndFiles(
        GenerateResponseInputModel.build({
          prompt: dto.json.message,
          promptFiles: promptFiles,
          systemInstruction: enhancedSystemPrompt,
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
