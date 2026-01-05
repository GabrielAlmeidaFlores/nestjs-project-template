import { Inject, Injectable } from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import {
  GetMessagesResponseDto,
  MessageDto,
} from '@module/generic/ai-conversation/dto/response/get-messages.response.dto';
import { ConversationAccessDeniedError } from '@module/generic/ai-conversation/error/conversation-access-denied.error';
import { ConversationNotFoundError } from '@module/generic/ai-conversation/error/conversation-not-found.error';
import { ConversationCacheRepository } from '@module/generic/ai-conversation/repository/conversation-cache.repository';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetMessagesUseCase {
  protected readonly _type = GetMessagesUseCase.name;

  public constructor(
    @Inject(ConversationCacheRepository)
    private readonly conversationCacheRepository: ConversationCacheRepository,
  ) {}

  public async execute(
    conversationId: Guid,
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    limit?: number,
  ): Promise<GetMessagesResponseDto> {
    // Verificar se conversa existe
    const conversation =
      await this.conversationCacheRepository.getConversation(conversationId);

    if (conversation === null) {
      throw new ConversationNotFoundError();
    }

    // Verificar se pertence à organização/conta
    if (
      !conversation.organizationId.equals(
        organizationSessionData.organizationId,
      ) ||
      !conversation.authIdentityId.equals(sessionData.authIdentityId)
    ) {
      throw new ConversationAccessDeniedError();
    }

    const messages = await this.conversationCacheRepository.getMessages(
      conversationId,
      limit,
    );

    return GetMessagesResponseDto.build({
      conversationId,
      messages: messages.map((msg) =>
        MessageDto.build({
          content: msg.content,
          id: msg.id,
          role: msg.role,
          timestamp: msg.timestamp,
        }),
      ),
      total: messages.length,
    });
  }
}
