import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { ConversationCacheGateway } from '@module/customer/ai-conversation/conversation-cache/conversation-cache.gateway';
import { MessageHistoryItemModel } from '@module/customer/ai-conversation/conversation-cache/model/generic/message-history-item.model';
import { MessageRoleEnum } from '@module/customer/ai-conversation/lib/mcp-tools/enum/message-role.enum';
import { ConversationModel } from '@module/customer/ai-conversation/lib/mcp-tools/model/generic/conversation.model';
import { MessageModel } from '@module/customer/ai-conversation/lib/mcp-tools/model/generic/message.model';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

const CONVERSATION_KEY_PREFIX = 'ai:conversation:';
const MESSAGES_KEY_PREFIX = 'ai:messages:';
const CONVERSATION_TTL_SECONDS = 86400;
const MAX_MESSAGES_PER_CONVERSATION = 100;

@Injectable()
export class RedisConversationCacheService implements ConversationCacheGateway {
  protected readonly _type = RedisConversationCacheService.name;

  public constructor(
    @Inject('REDIS_CLIENT')
    private readonly redis: Redis,
  ) {}

  public async createConversation(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    title: string,
  ): Promise<ConversationModel> {
    const conversationId = new Guid();
    const now = new Date();

    const conversation = ConversationModel.build({
      id: conversationId,
      organizationId,
      authIdentityId: authIdentityId,
      title,
      messages: [],
      createdAt: now,
      updatedAt: now,
    });

    await this.redis.setex(
      `${CONVERSATION_KEY_PREFIX}${conversationId.toString()}`,
      CONVERSATION_TTL_SECONDS,
      JSON.stringify({
        id: conversation.id.toString(),
        organizationId: conversation.organizationId.toString(),
        authIdentityId: conversation.authIdentityId.toString(),
        title: conversation.title,
        createdAt: conversation.createdAt.getTime(),
        updatedAt: conversation.updatedAt.getTime(),
      }),
    );

    return conversation;
  }

  public async getConversation(
    conversationId: Guid,
  ): Promise<ConversationModel | null> {
    const data = await this.redis.get(
      `${CONVERSATION_KEY_PREFIX}${conversationId.toString()}`,
    );

    if (data === null) {
      return null;
    }

    const parsed = JSON.parse(data) as {
      id: string;
      organizationId: string;
      authIdentityId: string;
      title: string;
      createdAt: number;
      updatedAt: number;
    };

    const messages = await this.getMessages(conversationId);

    return ConversationModel.build({
      id: new Guid(parsed.id),
      organizationId: new OrganizationId(parsed.organizationId),
      authIdentityId: new AuthIdentityId(parsed.authIdentityId),
      title: parsed.title,
      messages,
      createdAt: new Date(parsed.createdAt),
      updatedAt: new Date(parsed.updatedAt),
    });
  }

  public async updateConversation(
    conversation: ConversationModel,
  ): Promise<void> {
    const now = new Date();

    await this.redis.setex(
      `${CONVERSATION_KEY_PREFIX}${conversation.id.toString()}`,
      CONVERSATION_TTL_SECONDS,
      JSON.stringify({
        id: conversation.id.toString(),
        organizationId: conversation.organizationId.toString(),
        authIdentityId: conversation.authIdentityId.toString(),
        title: conversation.title,
        createdAt: conversation.createdAt.getTime(),
        updatedAt: now.getTime(),
      }),
    );
  }

  public async addMessage(message: MessageModel): Promise<void> {
    const key = `${MESSAGES_KEY_PREFIX}${message.conversationId.toString()}`;

    await this.redis.rpush(
      key,
      JSON.stringify({
        id: message.id.toString(),
        conversationId: message.conversationId.toString(),
        role: message.role,
        content: message.content,
        timestamp: message.timestamp.getTime(),
      }),
    );

    await this.redis.expire(key, CONVERSATION_TTL_SECONDS);

    const length = await this.redis.llen(key);
    if (length > MAX_MESSAGES_PER_CONVERSATION) {
      await this.redis.ltrim(key, -MAX_MESSAGES_PER_CONVERSATION, -1);
    }
  }

  public async getMessages(
    conversationId: Guid,
    limit?: number,
  ): Promise<MessageModel[]> {
    const key = `${MESSAGES_KEY_PREFIX}${conversationId.toString()}`;
    const start = limit !== undefined && limit > 0 ? -limit : 0;
    const messagesData = await this.redis.lrange(key, start, -1);

    return messagesData.map((data) => {
      const parsed = JSON.parse(data) as {
        id: string;
        conversationId: string;
        role: MessageRoleEnum;
        content: string;
        timestamp: number;
      };

      return MessageModel.build({
        id: new Guid(parsed.id),
        conversationId: new Guid(parsed.conversationId),
        role: parsed.role,
        content: parsed.content,
        timestamp: new Date(parsed.timestamp),
      });
    });
  }

  public async getMessageHistory(
    conversationId: Guid,
    maxMessages = 10,
  ): Promise<MessageHistoryItemModel[]> {
    const messages = await this.getMessages(conversationId);

    const recentMessages = messages.slice(-maxMessages);

    return recentMessages.map((msg) =>
      MessageHistoryItemModel.build({
        role: msg.role === MessageRoleEnum.USER ? 'user' : 'model',
        content: msg.content,
      }),
    );
  }
}
