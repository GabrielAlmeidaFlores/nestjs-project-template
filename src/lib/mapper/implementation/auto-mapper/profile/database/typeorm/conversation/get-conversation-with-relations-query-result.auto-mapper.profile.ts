import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { ConversationEventTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-event.typeorm.entity';
import { ConversationMessageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-message.typeorm.entity';
import { ConversationToolPolicyTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-tool-policy.typeorm.entity';
import { ConversationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { GetConversationWithRelationsQueryResult } from '@module/ai/domain/repository/conversation/query/result/get-conversation-with-relation.query.result';
import { GetConversationToolPolicyQueryResult } from '@module/ai/domain/repository/conversation-tool-policy/query/result/get-conversation-tool-policy.query.result';
import { ConversationId } from '@module/ai/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import { GetConversationEventResponseDto } from '@module/ai/dto/response/get-conversation-event.response.dto';
import { GetConversationMessageResponseDto } from '@module/ai/dto/response/get-conversation-message.response.dto';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

@Injectable()
export class GetConversationWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetConversationWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: ConversationTypeormEntity,
    ): GetConversationWithRelationsQueryResult => {
      const conversationMessage = this.mapper.mapArray(
        source.conversationMessage ?? [],
        ConversationMessageTypeormEntity,
        GetConversationMessageResponseDto,
      );

      const conversationEvent = this.mapper.mapArray(
        source.conversationEvent ?? [],
        ConversationEventTypeormEntity,
        GetConversationEventResponseDto,
      );

      const conversationToolPolicy = source.conversationToolPolicy
        ? this.mapper.map(
            source.conversationToolPolicy,
            ConversationToolPolicyTypeormEntity,
            GetConversationToolPolicyQueryResult,
          )
        : null;

      const customer = source.customer
        ? GetCustomerQueryResult.build({
            ...source.customer,
            id: new CustomerId(source.customer.id),
          })
        : null;

      return GetConversationWithRelationsQueryResult.build({
        id: new ConversationId(source.id),
        title: source.title ?? null,
        assistantType: source.assistantType ?? null,
        status: source.status ?? null,
        lastAIMessageAt: source.lastAIMessageAt ?? null,
        archivedAt: source.archivedAt ?? null,
        conversationMessage: conversationMessage.length
          ? conversationMessage
          : [],
        conversationEvent: conversationEvent.length ? conversationEvent : [],
        conversationToolPolicy,
        customer,
      });
    };

    createMap(
      this.mapper,
      ConversationTypeormEntity,
      GetConversationWithRelationsQueryResult,
      constructUsing(convert),
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convert = (
      source: GetConversationWithRelationsQueryResult,
    ): ConversationTypeormEntity => {
      let customer: CustomerTypeormEntity | undefined = undefined;
      if (source.customer?.id) {
        customer = {
          id: source.customer.id.toString(),
        } as CustomerTypeormEntity;
      }

      return ConversationTypeormEntity.build({
        id: source.id.toString(),
        title: source.title ?? null,
        assistantType: source.assistantType ?? null,
        status: source.status ?? null,
        lastAIMessageAt: source.lastAIMessageAt ?? null,
        archivedAt: source.archivedAt ?? null,

        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,

        customer,
      });
    };

    createMap(
      this.mapper,
      GetConversationWithRelationsQueryResult,
      ConversationTypeormEntity,
      constructUsing(convert),
    );
  }
}
