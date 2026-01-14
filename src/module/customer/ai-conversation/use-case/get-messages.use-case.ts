import { Injectable, Inject } from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { ConversationCacheGateway } from '@module/customer/ai-conversation/conversation-cache/conversation-cache.gateway';
import {
  GetMessagesResponseDto,
  MessageDto,
} from '@module/customer/ai-conversation/dto/response/get-messages.response.dto';
import { ConversationAccessDeniedError } from '@module/customer/ai-conversation/error/conversation-access-denied.error';
import { ConversationNotFoundError } from '@module/customer/ai-conversation/error/conversation-not-found.error';
import { MarkdownConverterGateway } from '@module/customer/ai-conversation/lib/markdown-converter/markdown-converter.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetMessagesUseCase {
  protected readonly _type = GetMessagesUseCase.name;

  public constructor(
    @Inject(ConversationCacheGateway)
    private readonly conversationCacheGateway: ConversationCacheGateway,
    @Inject(MarkdownConverterGateway)
    private readonly markdownConverterGateway: MarkdownConverterGateway,
  ) {}

  public async execute(
    conversationId: Guid,
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    limit?: number,
  ): Promise<GetMessagesResponseDto> {
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

    const messages = await this.conversationCacheGateway.getMessages(
      conversationId,
      limit,
    );

    const messagesWithHtml = await Promise.all(
      messages.map(async (msg) => ({
        ...msg,
        content: await this.markdownConverterGateway.convertToHtml(msg.content),
      })),
    );

    return GetMessagesResponseDto.build({
      conversationId,
      messages: messagesWithHtml.map((msg) =>
        MessageDto.build({
          content: msg.content,
          id: msg.id,
          role: msg.role,
          type: msg.type,
          timestamp: msg.timestamp,
          ...(msg.paymentPlanPaidResourceType !== undefined
            ? { paymentPlanPaidResourceType: msg.paymentPlanPaidResourceType }
            : {}),
          ...(msg.creditCost !== undefined
            ? { creditCost: msg.creditCost }
            : {}),
          ...(msg.context !== undefined ? { context: msg.context } : {}),
        }),
      ),
      total: messagesWithHtml.length,
    });
  }
}
