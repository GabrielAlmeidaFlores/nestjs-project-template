import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { ConversationEventTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-event.typeorm.entity';
import { ConversationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation.typeorm.entity';
import { ConversationEntity } from '@module/ai/chat/domain/schema/entity/conversation/conversation.entity';
import { ConversationId } from '@module/ai/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import { ConversationEventEntity } from '@module/ai/chat/domain/schema/entity/conversation-event/conversation-event.entity';
import { ConversationEventPayloadType } from '@module/ai/chat/domain/schema/entity/conversation-event/conversation-event.entity.props.interface';
import { ConversationEventTypeEnum } from '@module/ai/chat/domain/schema/entity/conversation-event/enum/conversation-event-type.enum';
import { ConversationEventId } from '@module/ai/chat/domain/schema/entity/conversation-event/value-object/conversation-event-id/conversation-event-id.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

@Injectable()
export class ConversationEventEntityAutoMapperProfile {
  protected readonly _type = ConversationEventEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: ConversationEventTypeormEntity,
    ): ConversationEventEntity => {
      return new ConversationEventEntity({
        ...source,
        id: new ConversationEventId(source.id),
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
      ConversationEventTypeormEntity,
      ConversationEventEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: ConversationEventEntity,
    ): ConversationEventTypeormEntity => {
      if (!source.conversation?.id) {
        throw new Error('ConversationEventEntity.conversation is required.');
      }

      const conversation = {
        id: source.conversation.id.toString(),
      } as ConversationTypeormEntity;

      return ConversationEventTypeormEntity.build({
        id: source.id.toString(),
        name: source.name ?? '',
        payload: source.payload as ConversationEventPayloadType,
        type: source.type as ConversationEventTypeEnum,
        createdAt: source.createdAt,
        updatedAt: new Date(),
        deletedAt: null,

        conversation,
      });
    };

    createMap(
      this.mapper,
      ConversationEventEntity,
      ConversationEventTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
