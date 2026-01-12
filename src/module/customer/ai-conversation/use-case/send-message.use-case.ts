import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { BucketGateway } from '@infra/bucket/bucket.gateway';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ConversationCacheGateway } from '@module/customer/ai-conversation/conversation-cache/conversation-cache.gateway';
import { SendMessageRequestDto } from '@module/customer/ai-conversation/dto/request/send-message.request.dto';
import {
  MessageItemResponseDto,
  SendMessageResponseDto,
  FileItemResponseDto,
} from '@module/customer/ai-conversation/dto/response/send-message.response.dto';
import { ConversationAccessDeniedError } from '@module/customer/ai-conversation/error/conversation-access-denied.error';
import { ConversationNotFoundError } from '@module/customer/ai-conversation/error/conversation-not-found.error';
import { MessageRoleEnum } from '@module/customer/ai-conversation/lib/mcp-tools/enum/message-role.enum';
import { MessageTypeEnum } from '@module/customer/ai-conversation/lib/mcp-tools/enum/message-type.enum';
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
        {
          explicitCreditCost: costCalculation.creditCost,
        },
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
      type: MessageTypeEnum.MESSAGE,
      content: dto.json.message,
      timestamp: new Date(),
      paymentPlanPaidResourceType,
      ...(dto.json.context !== undefined ? { context: dto.json.context } : {}),
    });

    const uploadedFiles: Array<{
      fileName: string;
      fileMessage: MessageModel;
    }> = [];
    if (dto.file !== undefined && dto.file.length > 0) {
      for (const file of dto.file) {
        const fileName = await this.bucketGateway.create(file);
        const temporaryUrl = await this.bucketGateway.getSignedUrl(fileName);

        const originalFileName =
          await this.bucketGateway.getOriginalFileName(fileName);
        const content = `<a href="${temporaryUrl.toString()}" mimetype="${file.mimeType}" target="_blank">${originalFileName}</a>`;

        const fileMessage = MessageModel.build({
          id: new Guid(),
          conversationId,
          role: MessageRoleEnum.USER,
          type: MessageTypeEnum.FILE,
          content,
          timestamp: new Date(),
          paymentPlanPaidResourceType,
        });

        uploadedFiles.push({ fileName, fileMessage });

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
      type: MessageTypeEnum.MESSAGE,
      content: aiResponse,
      timestamp: new Date(),
      paymentPlanPaidResourceType,
      creditCost: costCalculation.creditCost,
    });

    await this.conversationCacheGateway.addMessage(assistantMessage);

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
    ]);
    await transaction.commit();

    return SendMessageResponseDto.build({
      assistantMessage: MessageItemResponseDto.build({
        content: assistantMessage.content,
        id: assistantMessage.id,
        role: assistantMessage.role,
        type: assistantMessage.type,
        timestamp: assistantMessage.timestamp,
        creditCost: assistantMessage.creditCost ?? 0,
        ...(assistantMessage.paymentPlanPaidResourceType !== undefined
          ? {
              paymentPlanPaidResourceType:
                assistantMessage.paymentPlanPaidResourceType,
            }
          : {}),
      }),
      userMessage: MessageItemResponseDto.build({
        content: userMessage.content,
        id: userMessage.id,
        role: userMessage.role,
        type: userMessage.type,
        timestamp: userMessage.timestamp,
        ...(userMessage.paymentPlanPaidResourceType !== undefined
          ? {
              paymentPlanPaidResourceType:
                userMessage.paymentPlanPaidResourceType,
            }
          : {}),
      }),
      ...(uploadedFiles.length > 0
        ? {
            files: uploadedFiles.map((file) =>
              FileItemResponseDto.build({
                id: file.fileMessage.id,
                role: file.fileMessage.role,
                type: file.fileMessage.type,
                content: file.fileMessage.content,
                timestamp: file.fileMessage.timestamp,
                ...(file.fileMessage.paymentPlanPaidResourceType !== undefined
                  ? {
                      paymentPlanPaidResourceType:
                        file.fileMessage.paymentPlanPaidResourceType,
                    }
                  : {}),
              }),
            ),
          }
        : {}),
    });
  }

  private async generateAiResponse(
    dto: SendMessageRequestDto,
    uploadedFiles: Array<{ fileName: string; fileMessage: MessageModel }>,
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
context: ${dto.json.context ?? 'N/A'}
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
- ❌ NUNCA peça informações técnicas ao usuário (como IDs, UUIDs, códigos internos do sistema)
- ✅ Quando precisar de identificação, peça nome, CPF ou código identificador amigável

**IMPORTANTE - IDENTIFICAÇÃO POR UUID:**
- Se o usuário enviar um UUID (formato: 8-4-4-4-12 caracteres hexadecimais, ex: "550e8400-e29b-41d4-a716-446655440000"), isso é um identificador técnico
- QUANDO RECEBER UM UUID: SEMPRE busque no banco de dados usando as ferramentas MCP apropriadas
- Exemplos de ferramentas para busca por UUID:
  - get_cnis_analysis_details (para análises CNIS)
  - get_legal_pleading_details (para petições)
  - get_client_details (para clientes)
  - get_retirement_planning_details (para planejamentos RPPS)
- Após buscar os dados, apresente ao usuário de forma amigável (nome, código, etc) - NUNCA mostre o UUID de volta
- Se não souber qual tipo de entidade o UUID representa, tente as ferramentas de busca mais comuns primeiro

**IMPORTANTE - BUSCA POR CÓDIGO:**
- Quando o usuário mencionar um código curto (ex: AN001, PJ001, RPPS001, #AN001), use as ferramentas específicas de busca por código:
  - Para análises CNIS: use "get_cnis_analysis_by_code" (NÃO use get_cnis_analysis_details)
  - Para petições: use "get_legal_pleading_by_code" (NÃO use get_legal_pleading_details)
  - Para planejamentos RPPS: use "get_retirement_planning_by_code"
- Códigos NÃO são UUIDs - não tente validá-los como tal
- Se o usuário disser "análise AN001" ou "como está a análise do AN001", use get_cnis_analysis_by_code com code="AN001"

**IMPORTANTE - ATUALIZAÇÃO DE DADOS (SALVAR NO BANCO):**
- Quando o usuário solicitar MELHORAR, ATUALIZAR, MODIFICAR, SIMPLIFICAR, REESCREVER, EDITAR uma análise, petição, cliente ou qualquer outro dado:
  1. Primeiro, busque os dados atuais usando a ferramenta de busca apropriada (ex: "get_cnis_analysis_by_code")
  2. Procure por ferramentas MCP disponíveis para atualização:
     - Para análises CNIS: "update_cnis_analysis"
     - Para petições: "update_legal_pleading" 
     - Para clientes: "update_client"
     - Para outros: verifique tools disponíveis com prefixo "update_"
  3. Prepare o novo conteúdo/texto melhorado/modificado conforme solicitado pelo usuário
  4. CONFIRME com o usuário: "Preparei o seguinte conteúdo melhorado: [mostrar preview]. Você confirma que deseja SALVAR estas alterações no banco de dados?"
  5. Aguarde confirmação EXPLÍCITA do usuário (ex: "sim", "confirmo", "pode salvar")
  6. Após confirmação, chame a ferramenta MCP de atualização com os novos dados
  7. Informe o sucesso/erro da operação

EXEMPLOS DE AÇÕES QUE REQUEREM ATUALIZAÇÃO:
- "melhorar o resultado da análise AN001" → buscar análise + preparar versão melhorada + confirmar + update_cnis_analysis
- "simplificar para leigo entender" → buscar + simplificar texto + confirmar + atualizar
- "atualizar dados do cliente" → buscar + modificar + confirmar + update_client
- "corrigir conclusão da petição" → buscar + corrigir + confirmar + update_legal_pleading

⚠️ CRÍTICO: Se o usuário pedir para melhorar/modificar algo, você DEVE usar a ferramenta de UPDATE para salvar no banco!
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
