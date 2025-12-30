import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { ConversationMessageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-message.typeorm.entity';
import { ConversationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation.typeorm.entity';
import { GetChatMessagesToConversationQueryResult } from '@module/ai/infra/chat/domain/repository/conversation-message/query/result/get-chat-messages-to-conversation.query.result';
import { GetConversationQueryResult } from '@module/ai/infra/chat/domain/repository/conversation/query/result/get-conversation.query.result';
import { ConversationMessageId } from '@module/ai/infra/chat/domain/schema/entity/conversation-message/value-object/conversation-message-id/conversation-message-id.value-object';

@Injectable()
export class GetChatMessagesToConversationQueryResultAutoMapperProfile {
  protected readonly _type =
    GetChatMessagesToConversationQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: ConversationMessageTypeormEntity,
    ): GetChatMessagesToConversationQueryResult => {
      const conversation = this.mapper.map(
        source.conversation,
        ConversationTypeormEntity,
        GetConversationQueryResult,
      );

      return GetChatMessagesToConversationQueryResult.build({
        ...source,
        id: new ConversationMessageId(source.id),
        role: source.role ?? null,
        content: source.content ?? null,
        conversation,
      });
    };

    createMap(
      this.mapper,
      ConversationMessageTypeormEntity,
      GetChatMessagesToConversationQueryResult,
      constructUsing(convert),
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convert = (
      source: GetChatMessagesToConversationQueryResult,
    ): ConversationMessageTypeormEntity => {
      const { id, conversation: conversationSource } = source;

      if (conversationSource === null || conversationSource === undefined) {
        throw new Error(
          'GetChatMessagesToConversationQueryResult.conversation é obrigatório para mapear para ConversationMessageTypeormEntity.',
        );
      }

      const conversation = this.mapper.map(
        conversationSource,
        GetConversationQueryResult,
        ConversationTypeormEntity,
      );

      return ConversationMessageTypeormEntity.build({
        id: id.toString(),
        content: source.content ?? null,
        role: source.role ?? null,
        conversation,
        createdAt: source.createdAt,
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

    createMap(
      this.mapper,
      GetChatMessagesToConversationQueryResult,
      ConversationMessageTypeormEntity,
      constructUsing(convert),
    );
  }
}
