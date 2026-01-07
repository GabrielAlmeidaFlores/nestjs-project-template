import { Inject, Injectable } from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/implementation/model/input/generate-response.input.model';
import { SendMessageRequestDto } from '@module/generic/ai-conversation/dto/request/send-message.request.dto';
import {
  MessageItemDto,
  SendMessageResponseDto,
} from '@module/generic/ai-conversation/dto/response/send-message.response.dto';
import { ConversationAccessDeniedError } from '@module/generic/ai-conversation/error/conversation-access-denied.error';
import { ConversationNotFoundError } from '@module/generic/ai-conversation/error/conversation-not-found.error';
import { MessageRoleEnum } from '@module/generic/ai-conversation/lib/mcp-tools/enum/message-role.enum';
import { McpToolsService } from '@module/generic/ai-conversation/lib/mcp-tools/mcp-tools.service';
import { MessageModel } from '@module/generic/ai-conversation/lib/mcp-tools/model/generic/message.model';
import { ConversationCacheRepository } from '@module/generic/ai-conversation/repository/conversation-cache.repository';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class SendMessageUseCase {
  private static readonly MAX_HISTORY_MESSAGES = 10;

  protected readonly _type = SendMessageUseCase.name;

  public constructor(
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(ConversationCacheRepository)
    private readonly conversationCacheRepository: ConversationCacheRepository,
    @Inject(McpToolsService)
    private readonly mcpToolsService: McpToolsService,
  ) {}

  public async execute(
    conversationId: Guid,
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: SendMessageRequestDto,
  ): Promise<SendMessageResponseDto> {
    try {
      const conversation =
        await this.conversationCacheRepository.getConversation(conversationId);

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

      await this.conversationCacheRepository.addMessage(userMessage);

      const history = await this.conversationCacheRepository.getMessageHistory(
        conversationId,
        SendMessageUseCase.MAX_HISTORY_MESSAGES,
      );

      const aiResponse = await this.generateAiResponse(
        dto.message,
        history,
        sessionData,
        organizationSessionData,
      );

      const assistantMessage = MessageModel.build({
        id: new Guid(),
        conversationId,
        role: MessageRoleEnum.ASSISTANT,
        content: aiResponse,
        timestamp: new Date(),
      });

      await this.conversationCacheRepository.addMessage(assistantMessage);

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
    } catch (error) {
      throw error;
    }
  }

  private async generateAiResponse(
    userMessage: string,
    history: Array<{ content: string; role: string }>,
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<string> {
    const mcpTools = await this.mcpToolsService.getAvailableTools();

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

          return await this.mcpToolsService.executeToolCall(
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

    const systemPrompt = `Você é um assistente de IA especializado em análise de dados do sistema Agiliza Previ.

**CONTEXTO DO USUÁRIO ATUAL:**
- ID do Usuário Logado: ${sessionData.authIdentityId.toString()}
- ID da Organização: ${organizationSessionData.organizationId.toString()}

Você tem acesso a ferramentas (tools) que permitem consultar e analisar o banco de dados.

**REGRAS IMPORTANTES:**
1. **Contexto Automático**: Quando o usuário disser "minhas", "meus", "minha" ou perguntar sobre dados dele, use AUTOMATICAMENTE o auth_identity_id fornecido acima. NÃO peça o CPF, nome ou outros dados do usuário.

2. **Exemplos de Perguntas que NÃO precisam de dados adicionais:**
   - "quais as minhas peças processuais" → Use auth_identity_id: ${sessionData.authIdentityId.toString()}
   - "mostre minhas análises" → Use auth_identity_id: ${sessionData.authIdentityId.toString()}
   - "qual meu status" → Use auth_identity_id: ${sessionData.authIdentityId.toString()}
   - "meus processos" → Use auth_identity_id: ${sessionData.authIdentityId.toString()}

3. **Segurança Automática**: 
   - TODAS as consultas já são automaticamente filtradas pela organização do usuário atual
   - Os parâmetros auth_identity_id e organization_id são injetados automaticamente nas ferramentas
   - Usuários só podem ver dados da própria organização

**COMO USAR AS FERRAMENTAS:**
- Use as ferramentas disponíveis quando precisar acessar dados
- As ferramentas são executadas automaticamente quando você as solicita
- Apenas queries SELECT são permitidas
- Seja claro e objetivo nas respostas
- Sempre explique os resultados de forma compreensível

Responda de forma profissional e útil aos usuários.`;

    const aiResponse =
      await this.generativeIaGateway.generateFlashResponseFromPromptAndFiles(
        GenerateResponseInputModel.build({
          prompt: userMessage,
          promptFiles: [],
          systemInstruction: systemPrompt,
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
