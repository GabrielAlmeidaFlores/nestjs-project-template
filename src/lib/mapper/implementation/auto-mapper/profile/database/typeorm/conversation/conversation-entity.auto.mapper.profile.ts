import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { ConversationEventTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-event.typeorm.entity';
import { ConversationMessageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-message.typeorm.entity';
import { ConversationToolPolicyTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-tool-policy.typeorm.entity';
import { ConversationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { ConversationEventEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation-event/conversation-event.entity';
import { ConversationMessageEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation-message/conversation-message.entity';
import { ConversationToolPolicyEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation-tool-policy/conversation-tool-policy.entity';
import { ConversationEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation/conversation.entity';
import { ConversationId } from '@module/ai/infra/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

@Injectable()
export class ConversationEnitityAutoMapperProfile {
  protected readonly _type = ConversationEnitityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: ConversationTypeormEntity,
    ): ConversationEntity => {
      const customerId =
        source.customer?.id !== undefined
          ? new CustomerId(source.customer.id)
          : null;

      const conversationMessage = this.mapper.mapArray(
        source.conversationMessage ?? [],
        ConversationMessageTypeormEntity,
        ConversationMessageEntity,
      );

      const conversationEvent = this.mapper.mapArray(
        source.conversationEvent ?? [],
        ConversationEventTypeormEntity,
        ConversationEventEntity,
      );

      const conversationToolPolicy = source.conversationToolPolicy
        ? this.mapper.map(
            source.conversationToolPolicy,
            ConversationToolPolicyTypeormEntity,
            ConversationToolPolicyEntity,
          )
        : null;

      return new ConversationEntity({
        ...source,
        id: new ConversationId(source.id),
        title: source.title ?? null,
        conversationMessage,
        conversationEvent,
        conversationToolPolicy,
        customerId,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      ConversationTypeormEntity,
      ConversationEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: ConversationEntity,
    ): ConversationTypeormEntity => {
      const conversationMessage = this.mapper.mapArray(
        source.conversationMessage ?? [],
        ConversationMessageEntity,
        ConversationMessageTypeormEntity,
      );

      const conversationEvent = this.mapper.mapArray(
        source.conversationEvent ?? [],
        ConversationEventEntity,
        ConversationEventTypeormEntity,
      );

      let customer: CustomerTypeormEntity | undefined = undefined;

      if (source.customerId) {
        customer = {
          id: source.customerId.toString(),
        } as CustomerTypeormEntity;
      }

      const conversationToolPolicy = source.conversationToolPolicy
        ? this.mapper.map(
            source.conversationToolPolicy,
            ConversationToolPolicyEntity,
            ConversationToolPolicyTypeormEntity,
          )
        : undefined;

      return ConversationTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        title: source.title ?? null,
        conversationMessage,
        conversationEvent,
        conversationToolPolicy,
        customer,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      ConversationEntity,
      ConversationTypeormEntity,
      mappingFunction,
    );
  }
}
