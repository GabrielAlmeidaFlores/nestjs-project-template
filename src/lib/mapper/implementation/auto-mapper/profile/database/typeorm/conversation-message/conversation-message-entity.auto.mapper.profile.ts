import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { ConversationMessageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-message.typeorm.entity';
import { ConversationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation.typeorm.entity';
import { ConversationEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation/conversation.entity';
import { ConversationId } from '@module/ai/infra/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import { ConversationMessageEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation-message/conversation-message.entity';
import { ConversationMessageId } from '@module/ai/infra/chat/domain/schema/entity/conversation-message/value-object/conversation-message-id/conversation-message-id.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

@Injectable()
export class ConversationMessageEntityAutoMapperProfile {
  protected readonly _type = ConversationMessageEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: ConversationMessageTypeormEntity,
    ): ConversationMessageEntity => {
      return new ConversationMessageEntity({
        ...source,
        id: new ConversationMessageId(source.id),
        conversation: new ConversationEntity({
          id: new ConversationId(source.conversation.id),
          customerId: new CustomerId(source.conversation.customer?.id),
          assistantType: source.conversation.assistantType ?? null,
          status: source.conversation.status ?? null,
          lastAIMessageAt: source.conversation.lastAIMessageAt ?? null,
          archivedAt: source.conversation.archivedAt ?? null,
          createdAt: source.conversation.createdAt,
        }),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      ConversationMessageTypeormEntity,
      ConversationMessageEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: ConversationMessageEntity,
    ): ConversationMessageTypeormEntity => {
      if (source.role === null) {
        throw new Error('ConversationMessageEntity.role is required.');
      }

      if (!source.conversation?.id) {
        throw new Error('ConversationMessageEntity.conversation is required.');
      }

      const conversation = {
        id: source.conversation.id.toString(),
      } as ConversationTypeormEntity;

      return ConversationMessageTypeormEntity.build({
        id: source.id.toString(),
        role: source.role,
        content: source.content ?? null,

        createdAt: source.createdAt,
        updatedAt: new Date(),
        deletedAt: null,

        conversation,
      });
    };

    createMap(
      this.mapper,
      ConversationMessageEntity,
      ConversationMessageTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
