import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { ConversationToolPolicyTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-tool-policy.typeorm.entity';
import { ConversationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation.typeorm.entity';
import { ConversationEntity } from '@module/ai/chat/domain/schema/entity/conversation/conversation.entity';
import { ConversationId } from '@module/ai/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import { ConversationToolPolicyEntity } from '@module/ai/chat/domain/schema/entity/conversation-tool-policy/conversation-tool-policy.entity';
import { ConversationToolPolicyId } from '@module/ai/chat/domain/schema/entity/conversation-tool-policy/value-object/conversation-tool-policy-id/conversation-tool-policy-id.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

@Injectable()
export class ConversationToolPolicyEntityAutoMapperProfile {
  protected readonly _type = ConversationToolPolicyEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: ConversationToolPolicyTypeormEntity,
    ): ConversationToolPolicyEntity => {
      return new ConversationToolPolicyEntity({
        ...source,
        id: new ConversationToolPolicyId(source.id),
        conversation: new ConversationEntity({
          id: new ConversationId(source.conversation.id),
          customerId: new CustomerId(source.conversation.customer?.id),
          assistantType: source.conversation.assistantType ?? null,
          status: source.conversation.status ?? null,
          lastAIMessageAt: source.conversation.lastAIMessageAt ?? null,
          archivedAt: source.conversation.archivedAt ?? null,
          createdAt: source.conversation.createdAt,
        }),
        persona: source.persona ?? null,
        personaPrompt: source.personaPrompt ?? null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      ConversationToolPolicyTypeormEntity,
      ConversationToolPolicyEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: ConversationToolPolicyEntity,
    ): ConversationToolPolicyTypeormEntity => {
      if (!source.conversation?.id) {
        throw new Error(
          'ConversationToolPolicyEntity.conversation is required.',
        );
      }

      const conversation = {
        id: source.conversation.id.toString(),
      } as ConversationTypeormEntity;

      return ConversationToolPolicyTypeormEntity.build({
        id: source.id.toString(),
        toolsEnable: source.toolsEnable ?? null,
        defaultExecutionMode: source.defaultExecutionMode,
        toolPermission: source.toolPermission,
        createdAt: source.createdAt,
        updatedAt: new Date(),
        deletedAt: null,

        persona: source.persona ?? null,
        personaPrompt: source.personaPrompt ?? null,

        conversation,
      });
    };

    createMap(
      this.mapper,
      ConversationToolPolicyEntity,
      ConversationToolPolicyTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
