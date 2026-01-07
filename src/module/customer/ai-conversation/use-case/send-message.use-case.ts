import { Inject, Injectable } from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
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
  ) {}

  public async execute(
    conversationId: Guid,
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: SendMessageRequestDto,
  ): Promise<SendMessageResponseDto> {
    try {
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
      );

      const assistantMessage = MessageModel.build({
        id: new Guid(),
        conversationId,
        role: MessageRoleEnum.ASSISTANT,
        content: aiResponse,
        timestamp: new Date(),
      });

      await this.conversationCacheGateway.addMessage(assistantMessage);

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

    const systemPrompt = `Você é um assistente de IA especializado em Direito Previdenciário e análise de dados do sistema Agiliza Previ.

**SUAS CAPACIDADES:**
1. **Conhecimento Previdenciário**: Você pode responder perguntas sobre:
   - Requisitos e critérios para aposentadorias (por idade, tempo de contribuição, especial, etc.)
   - Regras de transição previdenciária
   - Cálculo de benefícios e tempo de contribuição
   - Direitos previdenciários e legislação do INSS
   - Orientações sobre processos administrativos e judiciais previdenciários
   - Análise de CNIS e documentação previdenciária

2. **Análise de Dados**: Você tem acesso a ferramentas (tools) que permitem consultar e analisar dados específicos do sistema para o usuário logado.

**CONTEXTO DO USUÁRIO ATUAL:**
- ID do Usuário Logado: ${sessionData.authIdentityId.toString()}
- ID da Organização: ${organizationSessionData.organizationId.toString()}

**REGRAS IMPORTANTES:**
1. **Responda Perguntas Gerais sobre Previdência**: Quando o usuário perguntar sobre legislação, requisitos, prazos, ou orientações previdenciárias gerais, responda com base no seu conhecimento, SEM usar ferramentas.

2. **Use Ferramentas para Dados Específicos**: Quando o usuário perguntar sobre SEUS dados (análises, processos, documentos pessoais), use as ferramentas disponíveis.

3. **Contexto Automático**: Quando o usuário disser "minhas", "meus", "minha" ou perguntar sobre dados dele, use AUTOMATICAMENTE o auth_identity_id fornecido acima. NÃO peça o CPF, nome ou outros dados do usuário.

4. **Exemplos de Perguntas que NÃO precisam de ferramentas:**
   - "Quais são os critérios da aposentadoria por tempo de contribuição?"
   - "Como funciona a aposentadoria especial?"
   - "Qual o prazo para dar entrada no INSS?"
   - "Quais documentos preciso para aposentadoria?"

5. **Exemplos de Perguntas que PRECISAM de ferramentas:**
   - "Quais as minhas peças processuais?" → Use auth_identity_id
   - "Mostre minhas análises" → Use auth_identity_id
   - "Meus processos" → Use auth_identity_id

6. **Segurança Automática**: 
   - TODAS as consultas já são automaticamente filtradas pela organização do usuário atual
   - Os parâmetros auth_identity_id e organization_id são injetados automaticamente nas ferramentas
   - Usuários só podem ver dados da própria organização

**FORMATO DE APRESENTAÇÃO:**
- ❌ NUNCA mostre IDs (UUIDs) ao usuário - são apenas para uso interno
- ✅ Para CLIENTES: Use NOME completo e CPF (ex: "João Silva - CPF: 123.456.789-00")
- ✅ Para ANÁLISES: Use o CÓDIGO da análise (ex: "Análise #CNIS-2024-001")
- ✅ Para PETIÇÕES/PEÇAS: Use o CÓDIGO da peça
- ✅ Para DATAS: Formate de forma legível (ex: "07/01/2026 às 10:30")
- ✅ Seja objetivo e apresente informações de forma organizada com bullet points quando listar múltiplos itens

**TOM E ESTILO:**
- Seja profissional, claro e acessível
- Use linguagem técnica quando necessário, mas explique termos complexos
- Seja prestativo e educativo
- Cite fontes legais quando relevante (ex: Lei 8.213/91, EC 103/2019)

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
